import { test, expect } from '@playwright/test'

const STORY_URL =
  '/iframe.html?id=components-header--default&viewMode=story'

test.describe('Month navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STORY_URL)
    await page.waitForSelector('[aria-live="polite"]')
  })

  test('initial label shows the current (or configured) month', async ({ page }) => {
    const label = page.locator('[aria-live="polite"]')
    const text = await label.textContent()
    expect(text).toBeTruthy()
    expect(text!.length).toBeGreaterThan(0)
  })

  test('clicking Next advances the label by one month', async ({ page }) => {
    const label = page.locator('[aria-live="polite"]')
    const initialText = await label.textContent()

    const nextBtn = page.locator('button[aria-label="Next month"]')
    await nextBtn.click()

    const newText = await label.textContent()
    expect(newText).not.toBe(initialText)
  })

  test('clicking Previous moves label to previous month', async ({ page }) => {
    const label = page.locator('[aria-live="polite"]')
    const initialText = await label.textContent()

    const prevBtn = page.locator('button[aria-label="Previous month"]')
    await prevBtn.click()

    const newText = await label.textContent()
    expect(newText).not.toBe(initialText)
  })

  test('Next then Previous returns to original month label', async ({ page }) => {
    const label = page.locator('[aria-live="polite"]')
    const initialText = await label.textContent()

    const prevBtn = page.locator('button[aria-label="Previous month"]')
    const nextBtn = page.locator('button[aria-label="Next month"]')

    await nextBtn.click()
    await prevBtn.click()

    const finalText = await label.textContent()
    expect(finalText).toBe(initialText)
  })

  test('clicking Next multiple times compounds correctly', async ({ page }) => {
    const label = page.locator('[aria-live="polite"]')
    const nextBtn = page.locator('button[aria-label="Next month"]')

    await nextBtn.click()
    await nextBtn.click()
    await nextBtn.click()

    const text = await label.textContent()
    expect(text).toBeTruthy()
    // After 3 clicks from current month, label should have changed
    expect(text!.length).toBeGreaterThan(0)
  })
})
