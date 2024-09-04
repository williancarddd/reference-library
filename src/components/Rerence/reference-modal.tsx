"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ReferenceForm from "./reference-form";
import { Reference } from "@/shared/types/referenceType";
import { ReferenceTable } from "./reference-table";

interface ReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Reference) => void;
  defaultValues: Reference | null;
  references: Reference[];
  onEdit: (reference: Reference) => void;
  onDelete: (id: number) => void;
}

const ReferenceModal: React.FC<ReferenceModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  defaultValues, 
  references, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Edit Reference" : "Create Reference"}</DialogTitle>
        </DialogHeader>

        {/* Formulário para criar ou editar a referência */}
        <ReferenceForm onSubmit={onSubmit} defaultValues={defaultValues} />

        {/* Tabela de referências exibida logo abaixo do formulário */}
        <div className="mt-8">
          <ReferenceTable data={references} onEdit={onEdit} onDelete={onDelete} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReferenceModal;
