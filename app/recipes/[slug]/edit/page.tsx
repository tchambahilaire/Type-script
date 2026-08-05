"use client"

import { getResource, updateResource } from "@/actions/resources"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Resource, ServerActionResponse } from "@/lib/types"
import Link from "next/link"
import AboutModal from "@/components/AboutModal"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditResourcePage({ params }: PageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [resource, setResource] = useState<Resource | null>(null)
  const [resourceId, setResourceId] = useState<string>("")

  useEffect(() => {
    const loadData = async () => {
      const { id } = await params
      setResourceId(id)
      try {
        const data = await getResource(id)
        setResource(data)
      } catch {
        router.push("/dashboard")
      }
    }
    loadData()
  }, [params, router])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const result = (await updateResource(resourceId, formData)) as ServerActionResponse<Resource>

    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  if (!resource) {
    return (
      <main className="page-edit flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </main>
    )
  }

  return (
    <main className="page-edit flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href={`/ressources/${resourceId}`}
            className="btn btn-warning"
          >
            <i className="fas fa-arrow-left"></i> Retour
          </Link>
          <AboutModal />
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white shadow-lg text-2xl">
              <i className="fas fa-pen-fancy"></i>
            </div>
            <h1 className="text-3xl font-bold text-[#0f172a]">Modifier la ressource</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="text-[#1e293b] font-semibold">Titre</label>
              <input
                type="text"
                name="title"
                defaultValue={resource.title}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-[#1e293b] font-semibold">Contenu</label>
              <textarea
                name="content"
                defaultValue={resource.content}
                required
                rows={6}
              />
            </div>

            <div className="form-group">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  name="published"
                  id="published"
                  defaultChecked={resource.published}
                />
                <label htmlFor="published" className="text-[#1e293b] font-medium">
                  Publier immediatement
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="btn btn-warning flex-1" disabled={loading}>
                <i className="fas fa-save"></i>
                {loading ? "Modification..." : "Enregistrer"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-outline flex-1"
              >
                <i className="fas fa-times"></i> Annuler
              </button>
            </div>
          </form>
        </div>

        <footer className="footer mt-6">
          <p>Developpe par <span>Mon General Hilaire</span> 2026</p>
        </footer>
      </div>
    </main>
  )
}
