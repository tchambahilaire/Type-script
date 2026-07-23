import { getSession } from "@/lib/auth/auth-server"
import { getResources } from "@/actions/resources"
import Link from "next/link"
import { redirect } from "next/navigation"
import { logout } from "@/actions/auth"
import { DeleteButton } from "@/components/DeleteButton"
import { Resource, UserSession } from "@/lib/types"
import AboutModal from "@/components/AboutModal"
import { ReactNode } from "react"

export default async function DashboardPage(): Promise<ReactNode> {
  const user = (await getSession()) as UserSession | null

  if (!user) {
    redirect("/login")
  }

  const resources: Resource[] = await getResources()

  return (
    <main className="page-dashboard">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="logo-icon"><i className="fas fa-book-open"></i></span>
          <span>MonApp</span>
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
              <h1 className="page-title">Mes Ressources</h1>
              <p className="page-subtitle">Gérez toutes vos ressources en un seul endroit</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <AboutModal />
              <Link href="/ressources/nouveau" className="btn btn-primary">
                <i className="fas fa-plus"></i> Nouvelle Ressource
              </Link>
            </div>
          </div>

          {resources.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-7xl mb-4 text-white">📄</div>
              <h3 className="text-2xl font-bold text-white mb-2">Aucune ressource</h3>
              <p className="text-[#94a3b8] text-lg mb-6">Commencez par créer votre première ressource.</p>
              <Link href="/ressources/nouveau" className="btn btn-primary">
                <i className="fas fa-plus"></i> Créer une ressource
              </Link>
            </div>
          ) : (
            <div className="resource-grid">
              {resources.map((resource: Resource) => (
                <div key={resource.id} className="resource-card">
                  <div className="card-header">
                    <div className="flex items-center gap-3">
                      <div className="card-icon">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <div>
                        <div className="card-title">{resource.title}</div>
                        <div className="card-date">
                          <i className="fas fa-calendar-alt"></i>
                          {new Date(resource.createdAt).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <span className={`badge-status ${resource.published ? "published" : "draft"}`}>
                      {resource.published ? "Publié" : "Brouillon"}
                    </span>
                  </div>
                  <p className="text-[#cbd5e1] text-sm mt-2 line-clamp-2">{resource.content}</p>
                  <div className="card-actions">
                    <Link href={`/ressources/${resource.id}`} className="btn-sm btn-sm-view">
                      <i className="fas fa-eye"></i> Voir
                    </Link>
                    <Link href={`/ressources/${resource.id}/edit`} className="btn-sm btn-sm-edit">
                      <i className="fas fa-pen"></i> Modifier
                    </Link>
                    <DeleteButton id={resource.id} />
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
