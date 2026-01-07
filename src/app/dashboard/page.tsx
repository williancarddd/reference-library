"use client"

import ChartsPanel from "../../components/Menu/TopBar/dashboard/ChartsPanel"
import SummaryPanel from "../../components/Menu/TopBar/dashboard/SummaryPanel"

export default function DashboardPage({ params }: { params: { id: string } }) {
  return (
    <div style={{ padding: 32 }}>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: 24 }}>
        <SummaryPanel courseId={params.id} />
        <ChartsPanel courseId={params.id} />
      </div>
    </div>
  )
}