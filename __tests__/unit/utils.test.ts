import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names', () => {
      const result = cn('class1', 'class2', { class3: true, class4: false })
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle undefined and null', () => {
      const result = cn('class1', undefined, null, 'class2')
      expect(result).toBe('class1 class2')
    })
  })
})
