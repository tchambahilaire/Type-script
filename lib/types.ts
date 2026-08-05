export interface User {
  id: string
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

export interface UserPublic {
  id: string
  email: string
  name: string | null
}

export interface UserSession {
  id: string
  email: string
  name: string | null
}

export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string
  instructions: string
  prepTime: number
  cookTime: number
  difficulty: string
  image: string | null
  published: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface RecipeInput {
  title: string
  description: string
  ingredients: string
  instructions: string
  prepTime: number
  cookTime: number
  difficulty: string
  image?: string
  published?: boolean
}

export interface ServerActionResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}
