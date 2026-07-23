"use client"

import { login } from "@/actions/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import AboutModal from "@/components/AboutModal"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    try {
      const result = await login(formData)

      if (result?.error) {
        setError(result.error)
        setLoading(false)
        return
      }

      router.push("/dashboard")
    } catch (err) {
      setError("Une erreur est survenue")
      setLoading(false)
    }
  }

  return (
    <main className="page-login flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link href="/" className="btn btn-outline">
            <i className="fas fa-arrow-left"></i> Accueil
          </Link>
          <AboutModal />
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg text-2xl">
              <i className="fas fa-lock"></i>
            </div>
            <h1 className="text-3xl font-bold text-[#0f172a]">Connexion</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="text-[#1e293b] font-semibold">Email</label>
              <div className="input-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="exemple@domaine.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="text-[#1e293b] font-semibold">Mot de passe</label>
              <div className="input-icon">
                <i className="fas fa-key"></i>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full justify-center"
              disabled={loading}
            >
              <i className="fas fa-arrow-right"></i>
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <div className="form-link mt-4">
              Pas encore de compte ?{" "}
              <Link href="/register" className="text-[#2563eb] font-semibold">
                S'inscrire
              </Link>
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
