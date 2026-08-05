import { getSession } from "@/lib/auth/auth-server"
import { getRecipes } from "@/actions/recipes"
import Link from "next/link"
import { redirect } from "next/navigation"
import { logout } from "@/actions/auth"
import { DeleteButton } from "@/components/DeleteButton"
import { Recipe, UserSession } from "@/lib/types"
import AboutModal from "@/components/AboutModal"

export default async function DashboardPage() {
  const user = (await getSession()) as UserSession | null

  if (!user) {
    redirect("/login")
  }

  const recipes: Recipe[] = await getRecipes()

  return (
    <main className="page-dashboard">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="logo-icon"><i className="fas fa-utensils"></i></span>
          <span>MonApp Cuisine</span>
        </div>
        <div className="navbar-profile">
          <span>Bonjour {user.name || user.email}</span>
          <div className="avatar">{user.name?.charAt(0)?.toUpperCase() || "U"}</div>
          <form action={logout} className="inline">
            <button className="btn btn-danger ml-2">
              <i className="fas fa-sign-out-alt"></i> Déconnexion
            </button>
          </form>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="card-dashboard">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="page-title">🍳 Mes Recettes</h1>
              <p className="page-subtitle">Gérez toutes vos recettes en un seul endroit</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <AboutModal />
              <Link href="/recipes/new" className="btn btn-primary">
                <i className="fas fa-plus"></i> Nouvelle Recette
              </Link>
            </div>
          </div>

          {recipes.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-7xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-white mb-2">Aucune recette</h3>
              <p className="text-[#94a3b8] text-lg mb-6">Commencez par créer votre première recette.</p>
              <Link href="/recipes/new" className="btn btn-primary">
                <i className="fas fa-plus"></i> Créer une recette
              </Link>
            </div>
          ) : (
            <div className="resource-grid">
              {recipes.map((recipe: Recipe) => (
                <div key={recipe.id} className="resource-card">
                  <div className="card-header">
                    <div className="flex items-center gap-3">
                      <div className="card-icon">
                        <i className="fas fa-utensils"></i>
                      </div>
                      <div>
                        <div className="card-title">{recipe.title}</div>
                        <div className="card-date">
                          <i className="fas fa-calendar-alt"></i>
                          {new Date(recipe.createdAt).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <span className={`badge-status ${recipe.published ? "published" : "draft"}`}>
                      {recipe.published ? "Publié" : "Brouillon"}
                    </span>
                  </div>
                  <p className="text-[#cbd5e1] text-sm line-clamp-2">{recipe.description}</p>
                  <div className="flex gap-2 mt-2 text-xs text-[#94a3b8]">
                    <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                    <span>•</span>
                    <span>🔥 {recipe.difficulty}</span>
                  </div>
                  <div className="card-actions">
                    <Link href={`/recipes/${recipe.id}`} className="btn-sm btn-sm-view">
                      <i className="fas fa-eye"></i> Voir
                    </Link>
                    <Link href={`/recipes/${recipe.id}/edit`} className="btn-sm btn-sm-edit">
                      <i className="fas fa-pen"></i> Modifier
                    </Link>
                    <DeleteButton id={recipe.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="footer">
          <p>Développé par <span>Mon Général Hilaire</span> © 2026</p>
        </footer>
      </div>
    </main>
  )
}
