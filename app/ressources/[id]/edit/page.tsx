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
      <main className="min-h-screen bg-gradient-to-br from-[#451a03] via-[#78350f] to-[#92400e] flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#451a03] via-[#78350f] to-[#92400e] p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href={`/ressources/${resourceId}`}
            className="btn btn-warning"
          >
            <i className="fas fa-arrow-left"></i> Retour
          </Link>
          <AboutModal />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center text-white shadow-lg text-2xl">
              <i className="fas fa-pen-fancy"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0f172a]">Modifier la ressource</h1>
              <p className="text-[#64748b] text-sm">Modifiez les informations de votre ressource</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm flex items-center gap-2">
                <i className="fas fa-exclamation-circle text-lg"></i>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-[#1e293b] font-semibold text-base">Titre</label>
              <input
                type="text"
                name="title"
                defaultValue={resource.title}
                required
                className="w-full px-5 py-4 border-2 border-[#e2e8f0] rounded-2xl text-lg focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[#1e293b] font-semibold text-base">Contenu</label>
              <textarea
                name="content"
                defaultValue={resource.content}
                required
                rows={8}
                className="w-full px-5 py-4 border-2 border-[#e2e8f0] rounded-2xl text-lg focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                name="published"
                id="published"
                defaultChecked={resource.published}
                className="w-6 h-6 accent-[#2563eb] rounded"
              />
              <label htmlFor="published" className="text-[#1e293b] text-base font-medium cursor-pointer">
                Publier immediatement
              </label>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 min-w-[160px] btn btn-warning text-lg disabled:opacity-50"
                disabled={loading}
              >
                <i className="fas fa-save"></i>
                {loading ? "Modification..." : "Enregistrer"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 min-w-[160px] btn btn-outline text-lg"
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
