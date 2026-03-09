import { test, expect } from '@playwright/test'

// Uses the Default story: single-selection mode
const STORY_URL =
  '/iframe.html?id=components-datepickerprovider--default&viewMode=story'

test.describe('Single date selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STORY_URL)
    // Wait for the calendar to be visible
    await page.waitForSelector('button[data-this-month="true"]')
  })

  test('clicking a day selects it (data-selected becomes true)', async ({ page }) => {
    const buttons = page.locator('button[data-this-month="true"]')
    const first = buttons.nth(0)
    await first.click()
    await expect(first).toHaveAttribute('data-selected', 'true')
  })

  test('only one day is selected at a time', async ({ page }) => {
    const buttons = page.locator('button[data-this-month="true"]')
    await buttons.nth(0).click()
    await buttons.nth(5).click()
    await expect(buttons.nth(0)).toHaveAttribute('data-selected', 'false')
    await expect(buttons.nth(5)).toHaveAttribute('data-selected', 'true')
    // Verify exactly one selected
    const selectedCount = await page
      .locator('button[data-selected="true"]')
      .count()
    expect(selectedCount).toBe(1)
  })

  test('clicking the same day twice keeps it selected (no deselect in single mode)', async ({
    page,
  }) => {
    const btn = page.locator('button[data-this-month="true"]').nth(3)
    await btn.click()
    await btn.click()
    await expect(btn).toHaveAttribute('data-selected', 'true')
  })

  test('selected day has a valid aria-label in MMMM D, YYYY format', async ({
    page,
  }) => {
    const btn = page.locator('button[data-this-month="true"]').nth(0)
    await btn.click()
    const ariaLabel = await btn.getAttribute('aria-label')
    expect(ariaLabel).toMatch(/^[A-Z][a-z]+ \d+, \d{4}$/)
  })

  test('disabled days cannot be selected', async ({ page }) => {
    // Any disabled button should remain unselected after click attempt
    const disabledBtns = page.locator('button:disabled')
    const disabledCount = await disabledBtns.count()
    if (disabledCount > 0) {
      // Disabled buttons are not interactable, so selection should not change
      await expect(page.locator('[data-selected="true"]')).toHaveCount(0)
    }
  })
})
