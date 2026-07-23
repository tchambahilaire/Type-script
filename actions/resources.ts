"use server"

import { getSession } from "@/lib/auth/auth-server"
import { prisma } from "@/lib/prisma"
import { resourceSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { Resource, ServerActionResponse } from "@/lib/types"

export async function createResource(
  formData: FormData
): Promise<ServerActionResponse<Resource>> {
  const user = await getSession()
  if (!user) {
    return { success: false, error: "Non authentifié" }
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "on"

  try {
    const validated = resourceSchema.parse({ title, content, published })

    const resource = await prisma.resource.create({
      data: {
        title: validated.title,
        content: validated.content,
        published: validated.published ?? false,
        userId: user.id,
      },
    })

    revalidatePath("/dashboard")
    return { success: true, data: resource }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues?.[0]?.message || "Données invalides"
      return { success: false, error: firstError }
    }
    return { success: false, error: "Erreur lors de la création" }
  }
}

export async function getResources(): Promise<Resource[]> {
  const user = await getSession()
  if (!user) return []

  return await prisma.resource.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  })
}

export async function getResource(id: string): Promise<Resource> {
  const user = await getSession()
  if (!user) throw new Error("Non authentifié")

  const resource = await prisma.resource.findUnique({
    where: { id },
  })

  if (!resource) throw new Error("Ressource non trouvée")
  if (resource.userId !== user.id) throw new Error("Accès non autorisé")

  return resource
}

export async function updateResource(
  id: string,
  formData: FormData
): Promise<ServerActionResponse<Resource>> {
  const user = await getSession()
  if (!user) {
    return { success: false, error: "Non authentifié" }
  }

  const resource = await prisma.resource.findUnique({ where: { id } })
  if (!resource || resource.userId !== user.id) {
    return { success: false, error: "Accès non autorisé" }
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "on"

  try {
    const validated = resourceSchema.parse({ title, content, published })

    const updated = await prisma.resource.update({
      where: { id },
      data: {
        title: validated.title,
        content: validated.content,
        published: validated.published ?? false,
      },
    })

    revalidatePath("/dashboard")
    revalidatePath(`/ressources/${id}`)
    return { success: true, data: updated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues?.[0]?.message || "Données invalides"
      return { success: false, error: firstError }
    }
    return { success: false, error: "Erreur lors de la modification" }
  }
}

export async function deleteResource(
  id: string
): Promise<ServerActionResponse> {
  const user = await getSession()
  if (!user) {
    return { success: false, error: "Non authentifié" }
  }

  const resource = await prisma.resource.findUnique({ where: { id } })
  if (!resource || resource.userId !== user.id) {
    return { success: false, error: "Accès non autorisé" }
  }

  await prisma.resource.delete({ where: { id } })

  revalidatePath("/dashboard")
  return { success: true }
}
