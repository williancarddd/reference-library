"use client"

import { useState } from "react"
import SummaryPanel from "@/components/Menu/TopBar/dashboard/SummaryPanel"
import ChartsPanel from "@/components/Menu/TopBar/dashboard/ChartsPanel"

type Course = {
  id: number
  name: string
}

export default function DashboardPage() {
  const [query, setQuery] = useState("")
  const [course, setCourse] = useState<Course | null>(null)
  const [error, setError] = useState("")

  async function handleSearch() {
    setError("")
    setCourse(null)

    const res = await fetch("http://localhost:3000/course/simple")
    const courses: Course[] = await res.json()

    const found = courses.find(course =>
      course.name.toLowerCase().includes(query.toLowerCase())
    )

    if (!found) {
      setError("Curso não encontrado")
      return
    }

    setCourse(found)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Digite o nome do curso"
          className="border rounded p-2 w-80"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Buscar
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {course && (
        <div className="flex gap-6">
          <SummaryPanel courseId={String(course.id)} />
          <ChartsPanel courseId={String(course.id)} />
        </div>
      )}
    </div>
  )
}