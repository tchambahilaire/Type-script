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
  cookingTime?: number
  servings?: number
  image?: string
  published?: boolean  // 👈 AJOUTE CETTE PROPRIÉTÉ
  userId?: string      // 👈 AJOUTE AUSSI userId (si utilisé)
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
