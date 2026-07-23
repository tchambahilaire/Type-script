import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-[#1f2a50] py-6 px-4 mt-auto">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-[#5a6a8a] font-['Inter',sans-serif]">
          Développé par{" "}
          <Link href="/developpe-par" className="text-[#00f0ff] hover:text-[#b47aff] transition-colors">
            Mon Général
          </Link>
          {" "}© {new Date().getFullYear()}
        </p>
        <p className="text-xs text-[#3a4a6a] mt-1">
          ✦ Next.js 16 · Prisma · Neon · Full Stack ✦
        </p>
      </div>
    </footer>
  )
}
