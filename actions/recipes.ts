// actions/recipes.ts
"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { Recipe, ServerActionResponse } from "@/lib/types"

// Schéma de validation pour les recettes
const recipeSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  ingredients: z.array(z.string()).min(1, "Au moins un ingrédient est requis"),
  instructions: z.array(z.string()).min(1, "Au moins une instruction est requise"),
  cookingTime: z.number().optional(),
  servings: z.number().optional(),
  image: z.string().optional(),
})

// Créer une recette
export async function createRecipe(
  formData: FormData
): Promise<ServerActionResponse<Recipe>> {
  try {
    // Récupérer les données du formulaire
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const ingredientsRaw = formData.get("ingredients") as string
    const instructionsRaw = formData.get("instructions") as string
    
    // Convertir les chaînes en tableaux
    const ingredients = ingredientsRaw?.split(",").map(i => i.trim()).filter(Boolean) || []
    const instructions = instructionsRaw?.split("\n").map(i => i.trim()).filter(Boolean) || []
    
    const data = {
      title,
      description,
      ingredients,
      instructions,
      cookingTime: formData.get("cookingTime") ? parseInt(formData.get("cookingTime") as string) : undefined,
      servings: formData.get("servings") ? parseInt(formData.get("servings") as string) : undefined,
      image: formData.get("image") as string || undefined,
    }

    // Validation
    const validated = recipeSchema.parse(data)

    // Créer la recette
    const newRecipe: Recipe = {
      id: Math.random().toString(36).substring(7),
      ...validated,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    revalidatePath("/recipes")
    return {
      success: true,
      data: newRecipe,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(e => e.message).join(", "),
      }
    }
    return {
      success: false,
      error: "Erreur lors de la création de la recette",
    }
  }
}

// Mettre à jour une recette
export async function updateRecipe(
  id: string,
  formData: FormData
): Promise<ServerActionResponse<Recipe>> {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const ingredientsRaw = formData.get("ingredients") as string
    const instructionsRaw = formData.get("instructions") as string
    
    const ingredients = ingredientsRaw?.split(",").map(i => i.trim()).filter(Boolean) || []
    const instructions = instructionsRaw?.split("\n").map(i => i.trim()).filter(Boolean) || []
    
    const data = {
      title,
      description,
      ingredients,
      instructions,
      cookingTime: formData.get("cookingTime") ? parseInt(formData.get("cookingTime") as string) : undefined,
      servings: formData.get("servings") ? parseInt(formData.get("servings") as string) : undefined,
      image: formData.get("image") as string || undefined,
    }

    const validated = recipeSchema.parse(data)

    const updatedRecipe: Recipe = {
      id,
      ...validated,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    revalidatePath(`/recipes/${id}`)
    return {
      success: true,
      data: updatedRecipe,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map(e => e.message).join(", "),
      }
    }
    return {
      success: false,
      error: "Erreur lors de la mise à jour de la recette",
    }
  }
}

// Supprimer une recette
export async function deleteRecipe(
  id: string
): Promise<ServerActionResponse<void>> {
  try {
    // TODO: Supprimer de la base de données
    
    revalidatePath("/recipes")
    return {
      success: true,
      data: undefined,
    }
  } catch (error) {
    return {
      success: false,
      error: "Erreur lors de la suppression de la recette",
    }
  }
}

// Récupérer toutes les recettes
export async function getRecipes(): Promise<Recipe[]> {
  // TODO: Récupérer depuis la base de données
  return [
    {
      id: "1",
      title: "Pâtes Carbonara",
      description: "Des pâtes crémeuses avec du lard et du parmesan",
      ingredients: ["Pâtes", "Lardons", "Parmesan", "Œufs", "Sel", "Poivre"],
      instructions: ["Faire cuire les pâtes", "Faire revenir les lardons", "Mélanger avec les œufs", "Servir avec parmesan"],
      cookingTime: 20,
      servings: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Salade César",
      description: "Une salade fraîche avec du poulet grillé",
      ingredients: ["Salade", "Poulet", "Parmesan", "Croûtons", "Sauce César"],
      instructions: ["Griller le poulet", "Laver la salade", "Mélanger tous les ingrédients", "Ajouter la sauce"],
      cookingTime: 15,
      servings: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}

// Récupérer une recette par son ID
export async function getRecipe(id: string): Promise<Recipe | null> {
  const recipes = await getRecipes()
  return recipes.find(recipe => recipe.id === id) || null
}
