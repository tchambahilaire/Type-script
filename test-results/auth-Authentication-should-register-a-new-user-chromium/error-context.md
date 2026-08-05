# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Authentication >> should register a new user
- Location: __tests__/e2e/auth.spec.ts:4:7

# Error details

```
Error: page.goto: Test ended.
Call log:
  - navigating to "http://localhost:3000/register", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | 
  3  | test.describe('Authentication', () => {
  4  |   test('should register a new user', async ({ page }) => {
> 5  |     await page.goto('/register')
     |                ^ Error: page.goto: Test ended.
  6  | 
  7  |     await page.fill('input[name="name"]', 'Test User')
  8  |     await page.fill('input[name="email"]', `test-${Date.now()}@example.com`)
  9  |     await page.fill('input[name="password"]', 'password123')
  10 |     await page.click('button[type="submit"]')
  11 | 
  12 |     await expect(page).toHaveURL(/.*login/)
  13 |   })
  14 | 
  15 |   test('should login with valid credentials', async ({ page }) => {
  16 |     await page.goto('/login')
  17 | 
  18 |     await page.fill('input[name="email"]', 'test@example.com')
  19 |     await page.fill('input[name="password"]', 'password123')
  20 |     await page.click('button[type="submit"]')
  21 | 
  22 |     await expect(page).toHaveURL(/.*dashboard/)
  23 |   })
  24 | })
  25 | 
```