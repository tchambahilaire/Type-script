// lib/types.ts

// Types pour les ressources
export interface Resource {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}

// Types pour les recettes
export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  cookingTime?: number
  servings?: number
  image?: string
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

// Type générique pour les réponses des actions serveur
export interface ServerActionResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Type pour les erreurs
export interface ActionError {
  field?: string
  message: string
}

// Type pour les formulaires
export interface FormState {
  errors?: ActionError[]
  message?: string
  success?: boolean
}
