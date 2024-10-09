"use client"

import * as React from "react"
import {
  ColumnDef,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import { Discipline } from "@/shared/types/disciplineType"
import { Reference } from "@/shared/types/referenceType"
import ReferenceModal from "../Rerence/reference-modal"
import { useReferenceStore } from "@/store/references.store"

export type DisciplineTableProps = {
  data: Discipline[]
  onEdit: (discipline: Discipline) => void
  onDelete: (id: number) => void
  courseId: number
}

const generateColumns = (
  onEdit: (discipline: Discipline) => void,
  onDelete: (id: number) => void,
  onViewReferences: (discipline: Discipline) => void
): ColumnDef<Discipline>[] => [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "cargaHoraria",
      header: "Carga Horária",
      cell: ({ row }) => <div>{row.getValue("cargaHoraria")} horas</div>,
    },
    {
      accessorKey: "period",
      header: "Período",
      cell: ({ row }) => <div>{row.getValue("period")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const discipline = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(discipline)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewReferences(discipline)}>
                View References
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDelete(discipline.id as number)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

export function DisciplineTable({ data, onEdit, onDelete, courseId }: DisciplineTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [selectedDiscipline, setSelectedDiscipline] = React.useState<Discipline | null>(null)
  const [isReferenceModalOpen, setIsReferenceModalOpen] = React.useState(false)
  const {
    createReference,
    fetchReferences,
    deleteReference,
    updateReference,
    references,
    getReferenceById,
    selectReference,
    selectedReference } = useReferenceStore()

  const table = useReactTable({
    data,
    columns: generateColumns(onEdit, onDelete, async (discipline: Discipline) => {
      setSelectedDiscipline(discipline)
      setIsReferenceModalOpen(true)
      // Fetch references based on the discipline (mocked for now)
      await fetchReferences(1, 10, discipline.id as number)
    }),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={generateColumns(onEdit, onDelete, () => { }).length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ReferenceModal
        isOpen={isReferenceModalOpen}
        onClose={() => setIsReferenceModalOpen(false)}
        onSubmit={async (data) => {
          console.log(data)
          if (selectedReference) {
            await updateReference(selectedReference.id as number, data)
            selectReference(null)
          } else {
            await createReference({
              ...data,
              disciplineId: selectedDiscipline?.id,
              courseId,
            })
          }
        }}
        defaultValues={selectedReference}
        references={references}
        onEdit={(reference: Reference) => {
          getReferenceById(reference.id as number)
          setSelectedDiscipline(null)
          setIsReferenceModalOpen(true)
        }}
        onDelete={async (id: number) => {
          await deleteReference(id)
        }
        }
      />
    </div>
  )
}
