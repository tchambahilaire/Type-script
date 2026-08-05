"use client"

import { createRecipe } from "@/actions/recipes"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import AboutModal from "@/components/AboutModal"

export default function NewRecipePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const result = await createRecipe(formData)

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
          <Link href="/dashboard" className="btn btn-primary">
            <i className="fas fa-arrow-left"></i> Retour
          </Link>
          <AboutModal />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center text-white shadow-lg text-2xl">
              <i className="fas fa-utensils"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0f172a]">Nouvelle Recette</h1>
              <p className="text-[#64748b] text-sm">Créez une nouvelle recette pour votre collection</p>
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
                placeholder="Nom de votre recette"
                className="w-full px-5 py-4 border-2 border-[#e2e8f0] rounded-2xl text-lg focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[#1e293b] font-semibold text-base">Description</label>
              <textarea
                name="description"
                required
                rows={3}
                placeholder="Décrivez votre recette..."
                className="w-full px-5 py-4 border-2 border-[#e2e8f0] rounded-2xl text-lg focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition outline-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[#1e293b] font-semibold text-base">Ingrédients</label>
              <textarea
                name="ingredients"
                required
                rows={4}
                placeholder="Listez vos ingrédients..."
                className="w-full px-5 py-4 border-2 border-[#e2e8f0] rounded-2xl text-lg focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition outline-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[#1e293b] font-semibold text-base">Instructions</label>
              <textarea
                name="instructions"
                required
                rows={6}
                placeholder="Étape par étape..."
                className="w-full px-5 py-4 border-2 border-[#e2e8f0] rounded-2xl text-lg focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[#1e293b] font-semibold text-base">Préparation (min)</label>
                <input
                  type="number"
                  name="prepTime"
                  required
                  min="1"
                  defaultValue="15"
                  className="w-full px-5 py-4 border-2 border-[#e2e8f0] rounded-2xl text-lg focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[#1e293b] font-semibold text-base">Cuisson (min)</label>
                <input
                  type="number"
                  name="cookTime"
                  required
                  min="0"
                  defaultValue="20"
                  className="w-full px-5 py-4 border-2 border-[#e2e8f0] rounded-2xl text-lg focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[#1e293b] font-semibold text-base">Difficulté</label>
              <select
                name="difficulty"
                required
                className="w-full px-5 py-4 border-2 border-[#e2e8f0] rounded-2xl text-lg focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition outline-none"
              >
                <option value="Facile">Facile</option>
                <option value="Moyen">Moyen</option>
                <option value="Difficile">Difficile</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[#1e293b] font-semibold text-base">Image (URL)</label>
              <input
                type="url"
                name="image"
                placeholder="https://exemple.com/image.jpg"
                className="w-full px-5 py-4 border-2 border-[#e2e8f0] rounded-2xl text-lg focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition outline-none"
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
                Publier immédiatement
              </label>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 min-w-[160px] btn btn-primary text-lg disabled:opacity-50"
                disabled={loading}
              >
                <i className="fas fa-save"></i>
                {loading ? "Création..." : "Créer la recette"}
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
          <p>Développé par <span>Mon Général Hilaire</span> 2026</p>
        </footer>
      </div>
    </main>
  )
}
