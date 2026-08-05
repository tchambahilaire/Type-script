import { describe, it, expect } from 'vitest'
import { registerSchema, loginSchema, resourceSchema } from '@/lib/validations'

describe('Validations', () => {
  describe('registerSchema', () => {
    it('should validate correct data', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      }
      const result = registerSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should fail with invalid email', () => {
      const data = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
      }
      const result = registerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('should fail with short password', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '12345',
      }
      const result = registerSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })

  describe('resourceSchema', () => {
    it('should validate correct resource data', () => {
      const data = {
        title: 'Test Resource',
        content: 'This is a test resource content',
        published: true,
      }
      const result = resourceSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('should fail with short title', () => {
      const data = {
        title: 'Te',
        content: 'This is a test resource content',
      }
      const result = resourceSchema.safeParse(data)
      expect(result.success).toBe(false)
    })
  })
})
