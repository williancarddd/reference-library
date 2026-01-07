"use client"

import React from "react"
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts'
import {
  useCopiesByReference,
  useCopiesByDiscipline,
  useCoverageByDiscipline,
  useSharedReferences
} from "@/hooks/useReports"

interface ChartsPanelProps {
  courseId: string
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const ChartsPanel: React.FC<ChartsPanelProps> = ({ courseId }) => {
  const { data: copiesByRef, isLoading: loadingRefs } = useCopiesByReference(courseId)
  const { data: copiesByDisc, isLoading: loadingDisc } = useCopiesByDiscipline(courseId)
  const { data: coverageData, isLoading: loadingCoverage } = useCoverageByDiscipline(courseId)
  const { data: sharedRefs, isLoading: loadingShared } = useSharedReferences(courseId)

  const isLoading = loadingRefs || loadingDisc || loadingCoverage || loadingShared

  // Dados para gráfico de exemplares por referência (top 10)
  const copiesByReferenceChartData = copiesByRef?.details
    .sort((a, b) => b.totalCopies - a.totalCopies)
    .slice(0, 10)
    .map(ref => ({
      name: ref.referenceTitle.length > 20 
        ? `${ref.referenceTitle.substring(0, 20)}...` 
        : ref.referenceTitle,
      value: ref.totalCopies
    })) || []

  // Dados para gráfico de exemplares por disciplina
  const copiesByDisciplineChartData = copiesByDisc?.map(disc => ({
    name: disc.disciplineName.length > 15
      ? `${disc.disciplineName.substring(0, 15)}...`
      : disc.disciplineName,
    value: disc.totalBooks
  })) || []

  // Dados para gráfico de cobertura (%)
  const coverageChartData = coverageData?.map(disc => ({
    name: disc.disciplineName.length > 15
      ? `${disc.disciplineName.substring(0, 15)}...`
      : disc.disciplineName,
    value: disc.coveragePercentage
  })) || []

  // Dados para gráfico de referências compartilhadas
  const sharedReferencesChartData = sharedRefs?.sharedReferences
    .slice(0, 10)
    .map(ref => ({
      name: ref.referenceTitle.length > 20
        ? `${ref.referenceTitle.substring(0, 20)}...`
        : ref.referenceTitle,
      value: ref.sharedBy
    })) || []

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
            </h3>
            <div className="h-48 flex items-center justify-center">
              <div className="h-40 w-full bg-gray-100 animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Gráfico 1: Exemplares por Referência */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">
          Exemplares por Referência (Top 10)
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={copiesByReferenceChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Exemplares" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Total de referências: {copiesByRef?.totalReferences || 0} | 
          Sem livros: {copiesByRef?.referencesWithoutBooks || 0}
        </div>
      </div>

      {/* Gráfico 2: Exemplares por Disciplina */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">
          Exemplares por Disciplina
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={copiesByDisciplineChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => 
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {copiesByDisciplineChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} exemplares`, 'Quantidade']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico 3: Cobertura das Ementas (%) */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">
          Cobertura das Ementas (%)
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={coverageChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Cobertura']} />
              <Legend />
              <Bar dataKey="value" name="% Cobertura" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Média: {coverageChartData.length > 0 
            ? (coverageChartData.reduce((a, b) => a + b.value, 0) / coverageChartData.length).toFixed(1)
            : 0}%
        </div>
      </div>

      {/* Gráfico 4: Referências Compartilhadas */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">
          Referências Compartilhadas (Top 10)
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sharedReferencesChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} disciplinas`, 'Compartilhada por']} />
              <Legend />
              <Bar dataKey="value" name="Disciplinas" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Total compartilhadas: {sharedRefs?.totalSharedReferences || 0}
        </div>
      </div>
    </div>
  )
}

export default ChartsPanel