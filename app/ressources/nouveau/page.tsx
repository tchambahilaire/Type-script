"use client"

import { createResource } from "@/actions/resources"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import AboutModal from "@/components/AboutModal"

export default function NewResourcePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const result = await createResource(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#172554] via-[#1e3a8a] to-[#1e40af] p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/dashboard"
            className="btn btn-primary"
          >
            <i className="fas fa-arrow-left"></i> Retour au dashboard
          </Link>
          <AboutModal />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#7c3aed] flex items-center justify-center text-white shadow-lg text-2xl">
              <i className="fas fa-plus"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0f172a]">Nouvelle ressource</h1>
              <p className="text-[#64748b] text-sm">Creez une nouvelle ressource pour votre collection</p>
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
                required
                placeholder="Donnez un titre a votre ressource"
                className="w-full px-5 py-4 border-2 border-[#e2e8f0] rounded-2xl text-lg focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[#1e293b] font-semibold text-base">Contenu</label>
              <textarea
                name="content"
                required
                rows={8}
                placeholder="Ecrivez votre contenu ici..."
                className="w-full px-5 py-4 border-2 border-[#e2e8f0] rounded-2xl text-lg focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                name="published"
                id="published"
                className="w-6 h-6 accent-[#2563eb] rounded"
              />
              <label htmlFor="published" className="text-[#1e293b] text-base font-medium cursor-pointer">
                Publier immediatement
              </label>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 min-w-[160px] btn btn-primary text-lg disabled:opacity-50"
                disabled={loading}
              >
                <i className="fas fa-save"></i>
                {loading ? "Creation..." : "Creer la ressource"}
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
