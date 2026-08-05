"use server"

import { getSession } from "@/lib/auth/auth-server"
import { prisma } from "@/lib/prisma"
import { recipeSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { Recipe, ServerActionResponse } from "@/lib/types"

export async function createRecipe(
  formData: FormData
): Promise<ServerActionResponse<Recipe>> {
  const user = await getSession()
  if (!user) {
    return { success: false, error: "Non authentifié" }
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const ingredients = formData.get("ingredients") as string
  const instructions = formData.get("instructions") as string
  const prepTime = parseInt(formData.get("prepTime") as string) || 0
  const cookTime = parseInt(formData.get("cookTime") as string) || 0
  const difficulty = formData.get("difficulty") as string
  const image = formData.get("image") as string
  const published = formData.get("published") === "on"

  try {
    const validated = recipeSchema.parse({
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      difficulty,
      image,
      published,
    })

    const recipe = await prisma.recipe.create({
      data: {
        title: validated.title,
        description: validated.description,
        ingredients: validated.ingredients,
        instructions: validated.instructions,
        prepTime: validated.prepTime,
        cookTime: validated.cookTime,
        difficulty: validated.difficulty,
        image: validated.image || null,
        published: validated.published ?? false,
        userId: user.id,
      },
    })

    revalidatePath("/dashboard")
    return { success: true, data: recipe }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues?.[0]?.message || "Données invalides"
      return { success: false, error: firstError }
    }
    return { success: false, error: "Erreur lors de la création" }
  }
}

export async function getRecipes(): Promise<Recipe[]> {
  const user = await getSession()
  if (!user) return []

  return await prisma.recipe.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  })
}

export async function getRecipe(id: string): Promise<Recipe> {
  const user = await getSession()
  if (!user) throw new Error("Non authentifié")

  const recipe = await prisma.recipe.findUnique({
    where: { id },
  })

  if (!recipe) throw new Error("Recette non trouvée")
  if (recipe.userId !== user.id) throw new Error("Accès non autorisé")

  return recipe
}

export async function updateRecipe(
  id: string,
  formData: FormData
): Promise<ServerActionResponse<Recipe>> {
  const user = await getSession()
  if (!user) {
    return { success: false, error: "Non authentifié" }
  }

  const recipe = await prisma.recipe.findUnique({ where: { id } })
  if (!recipe || recipe.userId !== user.id) {
    return { success: false, error: "Accès non autorisé" }
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const ingredients = formData.get("ingredients") as string
  const instructions = formData.get("instructions") as string
  const prepTime = parseInt(formData.get("prepTime") as string) || 0
  const cookTime = parseInt(formData.get("cookTime") as string) || 0
  const difficulty = formData.get("difficulty") as string
  const image = formData.get("image") as string
  const published = formData.get("published") === "on"

  try {
    const validated = recipeSchema.parse({
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      difficulty,
      image,
      published,
    })

    const updated = await prisma.recipe.update({
      where: { id },
      data: {
        title: validated.title,
        description: validated.description,
        ingredients: validated.ingredients,
        instructions: validated.instructions,
        prepTime: validated.prepTime,
        cookTime: validated.cookTime,
        difficulty: validated.difficulty,
        image: validated.image || null,
        published: validated.published ?? false,
      },
    })

    revalidatePath("/dashboard")
    revalidatePath(`/recipes/${id}`)
    return { success: true, data: updated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues?.[0]?.message || "Données invalides"
      return { success: false, error: firstError }
    }
    return { success: false, error: "Erreur lors de la modification" }
  }
}

export async function deleteRecipe(
  id: string
): Promise<ServerActionResponse> {
  const user = await getSession()
  if (!user) {
    return { success: false, error: "Non authentifié" }
  }

  const recipe = await prisma.recipe.findUnique({ where: { id } })
  if (!recipe || recipe.userId !== user.id) {
    return { success: false, error: "Accès non autorisé" }
  }

  await prisma.recipe.delete({ where: { id } })

  revalidatePath("/dashboard")
  return { success: true }
}
