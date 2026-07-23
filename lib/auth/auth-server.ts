import { cookies } from 'next/headers'
import { verifyToken } from './jwt'
import { prisma } from '../prisma'
import { UserSession } from '@/lib/types'

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  const payload = verifyToken(token)
  if (!payload) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true },
  })

  return user
}

export async function auth(): Promise<UserSession | null> {
  return getSession()
}
