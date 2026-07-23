import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "MonApp - Gestion de ressources",
  description: "Application Full Stack Next.js pour gérer vos ressources en toute simplicité",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body className="bg-[#eef2f7] text-[#1e293b] min-h-screen font-['Segoe_UI',system-ui,sans-serif]">
        {children}
      </body>
    </html>
  )
}
