import { test, expect } from '@playwright/test'

test.describe('Resource Management', () => {
  test('should create a new resource', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')

    await page.waitForURL('/dashboard')
    await page.click('text=Nouvelle Ressource')

    const title = `Test Resource ${Date.now()}`
    await page.fill('input[name="title"]', title)
    await page.fill('textarea[name="content"]', 'Test content for resource')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/dashboard')
    await expect(page.getByText(title)).toBeVisible()
  })
})
