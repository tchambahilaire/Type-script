import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('should register a new user', async ({ page }) => {
    await page.goto('/register')

    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', `test-${Date.now()}@example.com`)
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL(/.*login/)
  })

  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL(/.*dashboard/)
  })
})
