"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import DisciplineForm from "./discipline-form";
import { Discipline } from "@/shared/types/disciplineType";

interface DisciplineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Discipline) => void;
  defaultValues: Discipline | null;
}

const DisciplineModal: React.FC<DisciplineModalProps> = ({ isOpen, onClose, onSubmit, defaultValues }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Edit Discipline" : "Create Discipline"}</DialogTitle>
        </DialogHeader>
        <DisciplineForm onSubmit={onSubmit} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  )
}

export default DisciplineModal;
