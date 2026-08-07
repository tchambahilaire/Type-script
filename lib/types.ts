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
  prepTime: z.number().optional(),
  cookTime: z.number().optional(),
  difficulty: z.string().optional(),
  cookingTime: z.number().optional(),
  servings: z.number().optional(),
  image: z.string().optional(),
  published: z.boolean().optional(),
  userId: z.string().optional(),
})

// Créer une recette
export async function createRecipe(
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
      prepTime: formData.get("prepTime") ? parseInt(formData.get("prepTime") as string) : undefined,
      cookTime: formData.get("cookTime") ? parseInt(formData.get("cookTime") as string) : undefined,
      difficulty: formData.get("difficulty") as string || undefined,
      cookingTime: formData.get("cookingTime") ? parseInt(formData.get("cookingTime") as string) : undefined,
      servings: formData.get("servings") ? parseInt(formData.get("servings") as string) : undefined,
      image: formData.get("image") as string || undefined,
      published: formData.get("published") === "true",
      userId: formData.get("userId") as string || undefined,
    }

    const validated = recipeSchema.parse(data)

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
      prepTime: formData.get("prepTime") ? parseInt(formData.get("prepTime") as string) : undefined,
      cookTime: formData.get("cookTime") ? parseInt(formData.get("cookTime") as string) : undefined,
      difficulty: formData.get("difficulty") as string || undefined,
      cookingTime: formData.get("cookingTime") ? parseInt(formData.get("cookingTime") as string) : undefined,
      servings: formData.get("servings") ? parseInt(formData.get("servings") as string) : undefined,
      image: formData.get("image") as string || undefined,
      published: formData.get("published") === "true",
      userId: formData.get("userId") as string || undefined,
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
  return [
    {
      id: "1",
      title: "Pâtes Carbonara",
      description: "Des pâtes crémeuses avec du lard et du parmesan",
      ingredients: ["Pâtes", "Lardons", "Parmesan", "Œufs", "Sel", "Poivre"],
      instructions: [
        "Faire cuire les pâtes",
        "Faire revenir les lardons",
        "Mélanger avec les œufs",
        "Servir avec parmesan"
      ],
      prepTime: 10,
      cookTime: 15,
      difficulty: "Facile",
      cookingTime: 20,
      servings: 4,
      image: "/images/carbonara.jpg",
      published: true,
      userId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Salade César",
      description: "Une salade fraîche avec du poulet grillé",
      ingredients: ["Salade", "Poulet", "Parmesan", "Croûtons", "Sauce César"],
      instructions: [
        "Griller le poulet",
        "Laver la salade",
        "Mélanger tous les ingrédients",
        "Ajouter la sauce"
      ],
      prepTime: 5,
      cookTime: 10,
      difficulty: "Moyen",
      cookingTime: 15,
      servings: 2,
      image: "/images/cesar.jpg",
      published: false,
      userId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      title: "Ratatouille",
      description: "Un délicieux mélange de légumes méditerranéens",
      ingredients: ["Courgettes", "Aubergines", "Poivrons", "Tomates", "Oignons", "Ail", "Herbes de Provence"],
      instructions: [
        "Couper tous les légumes en dés",
        "Faire revenir l'ail et les oignons",
        "Ajouter les légumes et laisser mijoter",
        "Assaisonner avec les herbes de Provence"
      ],
      prepTime: 20,
      cookTime: 35,
      difficulty: "Facile",
      cookingTime: 35,
      servings: 6,
      image: "/images/ratatouille.jpg",
      published: true,
      userId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      title: "Tarte Tatin",
      description: "Une tarte aux pommes caramélisées renversée",
      ingredients: ["Pommes", "Sucre", "Beurre", "Pâte feuilletée", "Cannelle"],
      instructions: [
        "Caraméliser le sucre et le beurre",
        "Disposer les pommes dans le caramel",
        "Couvrir avec la pâte feuilletée",
        "Cuire au four et retourner"
      ],
      prepTime: 15,
      cookTime: 30,
      difficulty: "Difficile",
      cookingTime: 30,
      servings: 8,
      image: "/images/tatin.jpg",
      published: false,
      userId: "1",
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

// Récupérer les recettes d'un utilisateur
export async function getUserRecipes(userId: string): Promise<Recipe[]> {
  const recipes = await getRecipes()
  return recipes.filter(recipe => recipe.userId === userId)
}

// Récupérer les recettes publiées
export async function getPublishedRecipes(): Promise<Recipe[]> {
  const recipes = await getRecipes()
  return recipes.filter(recipe => recipe.published === true)
}

