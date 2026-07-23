"use client"

import { deleteResource } from "@/actions/resources"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface DeleteButtonProps {
  id: string
}

export function DeleteButton({ id }: DeleteButtonProps): JSX.Element {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleDelete(): Promise<void> {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette ressource ?")) {
      return
    }

    setIsLoading(true)
    try {
      await deleteResource(id)
      router.push("/dashboard")
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition text-sm font-medium min-h-[44px]"
    >
      <i className="fas fa-trash-alt"></i>
      {isLoading ? "..." : "Supprimer"}
    </button>
  )
}
