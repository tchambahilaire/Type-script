import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DeleteButton } from '@/components/DeleteButton'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

vi.mock('@/actions/resources', () => ({
  deleteResource: vi.fn(),
}))

describe('DeleteButton', () => {
  it('should render correctly', () => {
    render(<DeleteButton id="test-id" />)
    expect(screen.getByText('Supprimer')).toBeDefined()
  })

  it('should show confirmation dialog on click', async () => {
    const user = userEvent.setup()
    const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => false)

    render(<DeleteButton id="test-id" />)
    await user.click(screen.getByText('Supprimer'))

    expect(confirmSpy).toHaveBeenCalledWith('Êtes-vous sûr de vouloir supprimer cette ressource ?')
  })
})
