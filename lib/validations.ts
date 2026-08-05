import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export const recipeSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  ingredients: z.string().min(5, "Les ingrédients doivent être renseignés"),
  instructions: z.string().min(10, "Les instructions doivent contenir au moins 10 caractères"),
  prepTime: z.number().min(1, "Le temps de préparation doit être d'au moins 1 minute"),
  cookTime: z.number().min(0, "Le temps de cuisson doit être positif"),
  difficulty: z.enum(["Facile", "Moyen", "Difficile"]),
  image: z.string().optional(),
  published: z.boolean().optional().default(false),
})
