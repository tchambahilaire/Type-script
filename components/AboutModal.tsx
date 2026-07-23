"use client"

import { useState } from "react"

export default function AboutModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState<"fr" | "en">("fr")

  const content = {
    fr: {
      title: "A propos de MonApp",
      description: "MonApp est une application Full Stack moderne developpee avec Next.js 16, Prisma et PostgreSQL. Elle permet de gerer des ressources de maniere simple et efficace.",
      features: [
        "Authentification securisee (JWT)",
        "CRUD complet des ressources",
        "Design moderne et responsive",
        "Base de donnees PostgreSQL sur Neon",
        "Deploiement sur Vercel"
      ],
      tech: "Technologies : Next.js 16 · TypeScript · Prisma · PostgreSQL · Tailwind CSS",
      author: "Developpe par Mon General Hilaire"
    },
    en: {
      title: "About MonApp",
      description: "MonApp is a modern Full Stack application built with Next.js 16, Prisma and PostgreSQL. It allows you to manage resources simply and efficiently.",
      features: [
        "Secure authentication (JWT)",
        "Complete CRUD for resources",
        "Modern and responsive design",
        "PostgreSQL database on Neon",
        "Deployed on Vercel"
      ],
      tech: "Technologies: Next.js 16 · TypeScript · Prisma · PostgreSQL · Tailwind CSS",
      author: "Developed by Mon General Hilaire"
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-purple"
      >
        <i className="fas fa-info-circle"></i>
        A propos
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#7c3aed] flex items-center justify-center text-white text-2xl shadow-lg">
                  <i className="fas fa-info-circle"></i>
                </div>
                <h2 className="text-3xl font-bold text-[#0f172a]">
                  {content[language].title}
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-xl bg-[#ef4444] text-white hover:bg-[#dc2626] transition flex items-center justify-center shadow-lg"
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setLanguage("fr")}
                className={`flex-1 py-4 rounded-xl font-bold text-lg transition ${
                  language === "fr"
                    ? "btn btn-primary"
                    : "btn btn-outline"
                }`}
              >
                FRANCAIS
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`flex-1 py-4 rounded-xl font-bold text-lg transition ${
                  language === "en"
                    ? "btn btn-primary"
                    : "btn btn-outline"
                }`}
              >
                ENGLISH
              </button>
            </div>

            <div className="space-y-6">
              <p className="text-[#1e293b] text-xl leading-relaxed">
                {content[language].description}
              </p>

              <div className="bg-[#f8fafc] rounded-2xl p-6 space-y-3 border border-[#e9edf4]">
                {content[language].features.map((feature, index) => (
                  <div key={index} className="text-[#1e293b] text-lg">
                    {feature}
                  </div>
                ))}
              </div>

              <p className="text-[#64748b] text-base">
                {content[language].tech}
              </p>

              <div className="pt-6 border-t border-[#e9edf4] flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2563eb] to-[#7c3aed] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  M
                </div>
                <div>
                  <p className="text-[#1e293b] font-bold text-lg">
                    {content[language].author}
                  </p>
                  <p className="text-[#64748b]">2026 MonApp</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-8 btn btn-primary text-lg py-4"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  )
}
