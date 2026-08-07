// lib/types.ts
export interface Resource {
  id: string
  title: string
  description: string
  content?: string
  createdAt?: Date
  updatedAt?: Date
  imageUrl?: string
  category?: string
  // Ajoute d'autres champs selon ton besoin
}

export interface User {
  id: string
  email: string
  name?: string
  // Ajoute d'autres champs selon ton besoin
}

export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  prepTime?: number
  cookTime?: number
  servings?: number
}
