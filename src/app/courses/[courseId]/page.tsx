"use client"

import ChartsPanel from "@/components/Menu/TopBar/dashboard/ChartsPanel"
import SummaryPanel from "@/components/Menu/TopBar/dashboard/SummaryPanel"
import { useParams } from "next/navigation"

export default function DashboardPage() {
  const { courseId } = useParams()

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">
        Dashboard do Curso {courseId}
      </h1>

      <div className="flex gap-6">
        <SummaryPanel courseId={String(courseId)} />
        <ChartsPanel courseId={String(courseId)} />
      </div>
    </div>
  )
}
