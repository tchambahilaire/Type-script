// ========================================
// TYPES UTILISATEUR
// ========================================

export interface User {
  id: string
  email: string
  name: string | null
  password?: string
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

// ========================================
// TYPES RESSOURCE
// ========================================

export interface Resource {
  id: string
  title: string
  content: string
  published: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface ResourceInput {
  title: string
  content: string
  published?: boolean
}

// ========================================
// TYPES SERVER ACTIONS
// ========================================

export interface ServerActionResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}
