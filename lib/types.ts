// lib/types.ts

export interface Resource {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  prepTime?: number
  cookTime?: number
  difficulty?: string
  cookingTime?: number
  servings?: number
  image?: string
  published?: boolean
  userId?: string
  createdAt: Date
  updatedAt: Date
}

export interface UserSession {
  id: string
  email: string
  name?: string
  role?: string
  image?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ServerActionResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface ActionError {
  field?: string
  message: string
}

export interface FormState {
  errors?: ActionError[]
  message?: string
  success?: boolean
}

// Export de tous les types pour faciliter l'import
export type { Recipe as default }
