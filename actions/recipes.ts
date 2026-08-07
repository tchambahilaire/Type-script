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
  published: z.boolean().optional(),
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
      published: formData.get("published") === "true",
    }

    // Validation
    const validated = recipeSchema.parse(data)

    // Créer la recette
    const newRecipe: Recipe = {
      id: Math.random().toString(36).substring(7),
      ...validated,
      userId: "1", // À remplacer par l'ID de l'utilisateur connecté
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    revalidatePath("/recipes")
    revalidatePath("/dashboard")
    
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
      published: formData.get("published") === "true",
    }

    const validated = recipeSchema.parse(data)

    const updatedRecipe: Recipe = {
      id,
      ...validated,
      userId: "1", // À remplacer par l'ID de l'utilisateur connecté
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    revalidatePath(`/recipes/${id}`)
    revalidatePath("/dashboard")
    
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
    revalidatePath("/dashboard")
    
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
      instructions: [
        "Faire cuire les pâtes al dente",
        "Faire revenir les lardons dans une poêle",
        "Mélanger les œufs avec le parmesan",
        "Mélanger tous les ingrédients à feu doux",
        "Servir avec du parmesan frais"
      ],
      cookingTime: 20,
      servings: 4,
      image: "/images/carbonara.jpg",
      published: true,
      userId: "1",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "Salade César",
      description: "Une salade fraîche avec du poulet grillé et des croûtons maison",
      ingredients: ["Salade Romaine", "Poulet", "Parmesan", "Croûtons", "Sauce César"],
      instructions: [
        "Griller le poulet avec des épices",
        "Laver et couper la salade",
        "Préparer les croûtons maison",
        "Mélanger tous les ingrédients",
        "Ajouter la sauce César au moment de servir"
      ],
      cookingTime: 15,
      servings: 2,
      image: "/images/cesar.jpg",
      published: false,
      userId: "1",
      createdAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-01-20"),
    },
    {
      id: "3",
      title: "Tarte Tatin",
      description: "Une délicieuse tarte renversée aux pommes caramélisées",
      ingredients: ["Pommes", "Sucre", "Beurre", "Pâte feuilletée", "Cannelle"],
      instructions: [
        "Peler et couper les pommes en quartiers",
        "Caraméliser le sucre et le beurre dans un moule",
        "Disposer les pommes dans le caramel",
        "Recouvrir avec la pâte feuilletée",
        "Cuire au four à 180°C pendant 30 minutes",
        "Retourner la tarte à la sortie du four"
      ],
      cookingTime: 45,
      servings: 6,
      image: "/images/tatin.jpg",
      published: true,
      userId: "1",
      createdAt: new Date("2024-02-01"),
      updatedAt: new Date("2024-02-01"),
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

// Publier une recette
export async function publishRecipe(
  id: string
): Promise<ServerActionResponse<Recipe>> {
  try {
    const recipe = await getRecipe(id)
    if (!recipe) {
      return {
        success: false,
        error: "Recette non trouvée",
      }
    }

    const updatedRecipe: Recipe = {
      ...recipe,
      published: true,
      updatedAt: new Date(),
    }

    revalidatePath(`/recipes/${id}`)
    revalidatePath("/dashboard")
    
    return {
      success: true,
      data: updatedRecipe,
    }
  } catch (error) {
    return {
      success: false,
      error: "Erreur lors de la publication",
    }
  }
}

// Dépublier une recette
export async function unpublishRecipe(
  id: string
): Promise<ServerActionResponse<Recipe>> {
  try {
    const recipe = await getRecipe(id)
    if (!recipe) {
      return {
        success: false,
        error: "Recette non trouvée",
      }
    }

    const updatedRecipe: Recipe = {
      ...recipe,
      published: false,
      updatedAt: new Date(),
    }

    revalidatePath(`/recipes/${id}`)
    revalidatePath("/dashboard")
    
    return {
      success: true,
      data: updatedRecipe,
    }
  } catch (error) {
    return {
      success: false,
      error: "Erreur lors du dépublier",
    }
  }
}
