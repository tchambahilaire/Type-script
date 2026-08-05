import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeToggle from '@/components/ThemeToggle'

describe('ThemeToggle', () => {
  it('should render correctly', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeDefined()
  })

  it('should toggle theme on click', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    await user.click(button)

    // Vérifier que le localStorage a été mis à jour
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
