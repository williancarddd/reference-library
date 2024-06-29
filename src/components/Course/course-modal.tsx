"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CourseForm } from "./course-form";
import { Course } from "@/shared/types/coursesType";

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Course) => void;
  defaultValues: Course | null;
}

export function CourseModal({ isOpen, onClose, onSubmit, defaultValues }: CourseModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Edit Course" : "Create Course"}</DialogTitle>
        </DialogHeader>
        <CourseForm onSubmit={onSubmit} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  )
}
