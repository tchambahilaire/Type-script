"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { signToken } from "@/lib/auth/jwt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
})

const registerSchema = z.object({
  name: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
})

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("🔑 Tentative de connexion pour:", email)

  try {
    const validated = loginSchema.parse({ email, password })

    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    })

    if (!user) {
      console.log("❌ Utilisateur non trouvé:", validated.email)
      return { error: "Email ou mot de passe incorrect" }
    }

    const isValid = await bcrypt.compare(validated.password, user.password)

    if (!isValid) {
      console.log("❌ Mot de passe incorrect pour:", validated.email)
      return { error: "Email ou mot de passe incorrect" }
    }

    const token = signToken(user.id)

    const cookieStore = await cookies()
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 30,
      path: "/",
    })

    console.log("✅ Connexion réussie pour:", validated.email)

    return { success: true }
  } catch (error) {
    console.error("❌ Erreur de connexion:", error)
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]?.message || "Données invalides"
      return { error: firstError }
    }
    return { error: "Une erreur est survenue lors de la connexion" }
  }
}

export async function register(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("📝 Tentative d'inscription pour:", email)

  try {
    const validated = registerSchema.parse({ name, email, password })

    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    })

    if (existingUser) {
      console.log("❌ Email déjà utilisé:", validated.email)
      return { error: "Cet email est déjà utilisé" }
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10)

    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
      },
      select: { id: true, email: true, name: true },
    })

    console.log("✅ Inscription réussie pour:", validated.email)
    return { success: true }
  } catch (error) {
    console.error("❌ Erreur d'inscription:", error)
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]?.message || "Données invalides"
      return { error: firstError }
    }
    return { error: "Une erreur est survenue lors de l'inscription" }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("token")
  redirect("/")
}
