import Link from "next/link"
import { auth } from "@/lib/auth/auth-server"
import { UserSession } from "@/lib/types"
import AboutModal from "@/components/AboutModal"

export default async function Home(): Promise<JSX.Element> {
  const user = (await auth()) as UserSession | null

  return (
    <main className="page-landing flex flex-col">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="logo-icon"><i className="fas fa-book-open"></i></span>
          <span>MonApp</span>
        </div>
        <div className="navbar-profile">
          {user ? (
            <>
              <span>Bonjour {user.name || user.email}</span>
              <div className="avatar">{user.name?.charAt(0)?.toUpperCase() || "U"}</div>
            </>
          ) : (
            <>
              <span>Invite</span>
              <div className="avatar">I</div>
            </>
          )}
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="hero">
          <h1>🚀 Simplifiez votre <br />gestion de ressources</h1>
          <p>Une application Full Stack moderne pour gerer, organiser et suivre vos ressources en toute simplicite.</p>
          <div className="hero-buttons">
            {user ? (
              <Link href="/dashboard" className="btn btn-primary">
                <i className="fas fa-home"></i> Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn btn-primary">
                  <i className="fas fa-sign-in-alt"></i> Se connecter
                </Link>
                <Link href="/register" className="btn btn-success">
                  <i className="fas fa-user-plus"></i> S'inscrire
                </Link>
                <AboutModal />
              </>
            )}
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>Developpe par <span>Mon General Hilaire</span> 2026</p>
      </footer>
    </main>
  )
}
