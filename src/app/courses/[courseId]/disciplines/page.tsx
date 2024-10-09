"use client"

import * as React from "react"
import { usePathname, useSearchParams, useParams } from 'next/navigation'

import { Discipline } from "@/shared/types/disciplineType"
import { Button } from "@/components/ui/button"
import { useDisciplines, useCreateDiscipline, useUpdateDiscipline, useDeleteDiscipline } from "@/hooks/useDisciplines"
import { DisciplineTable } from "@/components/Discipline/discipline-table"
import DisciplineModal from "@/components/Discipline/discipline-modal"

const DisciplinesPage = () => {

  const { courseId } = useParams()

  const [isDisciplineModalOpen, setIsDisciplineModalOpen] = React.useState(false)
  const [selectedDiscipline, setSelectedDiscipline] = React.useState<Discipline | null>(null)
  const [page, setPage] = React.useState(1)
  const [perPage] = React.useState(10)

  const { data, isLoading, isError } = useDisciplines(Number(courseId), page, perPage)
  const createDisciplineMutation = useCreateDiscipline()
  const updateDisciplineMutation = useUpdateDiscipline()
  const deleteDisciplineMutation = useDeleteDiscipline()

  const handleDisciplineModalOpen = () => setIsDisciplineModalOpen(true)
  const handleDisciplineModalClose = () => {
    setIsDisciplineModalOpen(false)
    setSelectedDiscipline(null)
  }

  const handleDisciplineSubmit = async (discipline: Discipline) => {
    console.log(discipline)
    try {
      if (selectedDiscipline) {
        await updateDisciplineMutation.mutateAsync(discipline)
      } else {
        await createDisciplineMutation.mutateAsync({
          ...discipline,
          courseId: Number(courseId),
        })
      }
      handleDisciplineModalClose()
    } catch (error) {
      console.error('Failed to save discipline:', error)
    }
  }

  const handleDisciplineEdit = (discipline: Discipline) => {
    setSelectedDiscipline(discipline)
    handleDisciplineModalOpen()
  }

  const handleDisciplineDelete = async (id: number) => {
    try {
      await deleteDisciplineMutation.mutateAsync(id)
    } catch (error) {
      console.error('Failed to delete discipline:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Disciplines</h1>
        <Button onClick={handleDisciplineModalOpen}>Create Discipline</Button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading disciplines.</div>
      ) : (
        <DisciplineTable data={data?.data || []} onEdit={handleDisciplineEdit} onDelete={handleDisciplineDelete} courseId={Number(courseId)} />
      )}
      <DisciplineModal
        isOpen={isDisciplineModalOpen}
        onClose={handleDisciplineModalClose}
        onSubmit={handleDisciplineSubmit}
        defaultValues={selectedDiscipline}
      />
      <div className="flex items-center justify-between py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          Page {page} of {data?.meta.lastPage || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.min(prev + 1, data?.meta.lastPage || 1))}
          disabled={page === data?.meta.lastPage}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default DisciplinesPage
