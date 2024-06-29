"use client"

import * as React from "react"
import { Course } from "@/shared/types/coursesType"
import { Button } from "@/components/ui/button"
import { useCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from "@/hooks/useCourses"
import { CourseTable } from "@/components/Course/course-table"
import { CourseModal } from "@/components/Course/course-modal"

const CoursePage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null)
  const [page, setPage] = React.useState(1)
  const [perPage] = React.useState(10)

  const { data, isLoading, isError } = useCourses(page, perPage);
  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();
  const deleteCourseMutation = useDeleteCourse();

  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedCourse(null)
  }

  const handleCourseSubmit = async (course: Course) => {
    try {
      if (selectedCourse) {
        await updateCourseMutation.mutateAsync(course)
      } else {
        await createCourseMutation.mutateAsync(course)
      }
      handleModalClose()
    } catch (error) {
      console.error('Failed to save course:', error)
    }
  }

  const handleCourseEdit = (course: Course) => {
    setSelectedCourse(course)
    handleModalOpen()
  }

  const handleCourseDelete = async (id: number) => {
    try {
      await deleteCourseMutation.mutateAsync(id)
    } catch (error) {
      console.error('Failed to delete course:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Button onClick={handleModalOpen}>Create Course</Button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading courses.</div>
      ) : (
        <CourseTable data={data?.data || []} onEdit={handleCourseEdit} onDelete={handleCourseDelete} />
      )}
      <CourseModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleCourseSubmit}
        defaultValues={selectedCourse}
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

export default CoursePage
