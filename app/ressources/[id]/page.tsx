import { getResource } from "@/actions/resources"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Resource } from "@/lib/types"
import AboutModal from "@/components/AboutModal"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ResourcePage({ params }: PageProps): Promise<JSX.Element> {
  const { id } = await params

  let resource: Resource

  try {
    resource = await getResource(id)
  } catch {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4c1d95] p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/dashboard"
            className="btn btn-purple"
          >
            <i className="fas fa-arrow-left"></i> Retour au dashboard
          </Link>
          <AboutModal />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#7c3aed] to-[#4c1d95] p-8 md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white break-words">
                {resource.title}
              </h1>
              <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider ${
                resource.published
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full ${
                  resource.published ? "bg-emerald-400" : "bg-amber-400"
                }`}></span>
                {resource.published ? "Publie" : "Brouillon"}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-10 space-y-6">
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#64748b] border-b border-[#e9edf4] pb-6">
              <div className="flex items-center gap-2">
                <i className="fas fa-calendar-alt text-[#7c3aed]"></i>
                <span>Cree le {new Date(resource.createdAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-clock text-[#7c3aed]"></i>
                <span>Modifie le {new Date(resource.updatedAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}</span>
              </div>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl p-6 md:p-8 border border-[#e9edf4] min-h-[200px]">
              <p className="text-[#1e293b] text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
                {resource.content}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-[#e9edf4]">
              <Link
                href={`/ressources/${resource.id}/edit`}
                className="btn btn-purple"
              >
                <i className="fas fa-pen"></i> Modifier
              </Link>
              <Link
                href="/dashboard"
                className="btn btn-outline"
              >
                <i className="fas fa-arrow-left"></i> Retour
              </Link>
            </div>
          </div>
        </div>

        <footer className="footer mt-6">
          <p>Developpe par <span>Mon General Hilaire</span> 2026</p>
        </footer>
      </div>
    </main>
  )
}
