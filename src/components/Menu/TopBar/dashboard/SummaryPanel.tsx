"use client"

import React from "react"
import { useCourseSummary } from "@/hooks/useReports"

interface SummaryPanelProps {
  courseId: string
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({ courseId }) => {
  const { data, isLoading, error } = useCourseSummary(courseId)

  if (isLoading) {
    return (
      <div className="bg-white border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Visão Geral</h2>
        <div className="space-y-2 text-sm">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between">
              <span className="text-gray-600 bg-gray-200 animate-pulse h-4 w-24 rounded"></span>
              <span className="font-medium bg-gray-200 animate-pulse h-4 w-12 rounded"></span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Visão Geral</h2>
        <div className="text-red-500 text-sm">
          Erro ao carregar dados: {(error as Error).message}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold">
        Visão Geral
      </h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Curso</span>
          <span className="font-medium">{data?.course?.name || `Curso #${courseId}`}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Disciplinas</span>
          <span className="font-medium">{data?.totalDisciplines || 0}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Total de referências</span>
          <span className="font-medium">{data?.totalReferences || 0}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Referências sem livros</span>
          <span className="font-medium text-red-600">
            {data?.referencesWithoutBooks || 0}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SummaryPanel