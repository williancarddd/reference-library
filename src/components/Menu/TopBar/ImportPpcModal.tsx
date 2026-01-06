"use client"

import * as React from "react"

interface ImportPpcModalProps {
  onClose: () => void
}

const ImportPpcModal: React.FC<ImportPpcModalProps> = ({ onClose }) => {
  const [file, setFile] = React.useState<File | null>(null)
  const [name, setName] = React.useState("")
  const [ppc, setPpc] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  async function handleImport() {
    if (!file) {
      alert("Selecione um arquivo CSV")
      return
    }

    if (!name || !ppc) {
      alert("Preencha nome e PPC")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("file", file)
      formData.append("name", name)
      formData.append("ppc", ppc)
      formData.append("description", description)

      const response = await fetch(
        "http://localhost:3333/imports/upload-ppc",
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error("Erro ao importar PPC")
      }

      alert("PPC importado com sucesso")
      onClose()
    } catch (error) {
      console.error(error)
      alert("Erro ao importar PPC")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[420px] p-6 space-y-4">
        <h2 className="text-xl font-bold">Importar PPC</h2>

        <input
          type="text"
          placeholder="Nome do curso"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="text"
          placeholder="PPC"
          value={ppc}
          onChange={(e) => setPpc(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
        />

        <div className="flex justify-end space-x-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            onClick={handleImport}
            className="px-4 py-2 bg-gray-800 text-white rounded"
            disabled={loading}
          >
            {loading ? "Importando..." : "Importar"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImportPpcModal