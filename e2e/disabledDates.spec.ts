import { test, expect } from '@playwright/test'

const STORY_URL =
  '/iframe.html?id=components-datepickerprovider--disabled-dates&viewMode=story'

test.describe('Disabled dates', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STORY_URL)
    await page.waitForSelector('button[data-this-month="true"]')
  })

  test('disabled days have the HTML disabled attribute', async ({ page }) => {
    const disabledBtns = page.locator('button:disabled')
    const count = await disabledBtns.count()
    // The DisabledDates story has weekday 1 & 6, specific days, and a date range disabled
    expect(count).toBeGreaterThan(0)
  })

  test('disabled day buttons cannot be clicked to change selection', async ({
    page,
  }) => {
    const disabledBtns = page.locator('button:disabled')
    const count = await disabledBtns.count()
    if (count === 0) return // skip if story has no disabled dates

    // Playwright's click on a disabled element: we use force to try, but
    // the event handler should not trigger selection
    const firstDisabled = disabledBtns.first()
    await firstDisabled.click({ force: true })

    // No button in the calendar should become 'selected' from clicking a disabled btn
    const selected = page.locator('[data-selected="true"]')
    const selectedCount = await selected.count()
    expect(selectedCount).toBe(0)
  })

  test('disabled days are not part of any selection state', async ({ page }) => {
    const disabledBtns = page.locator('button:disabled')
    const count = await disabledBtns.count()
    for (let i = 0; i < Math.min(count, 3); i++) {
      await expect(disabledBtns.nth(i)).toHaveAttribute('data-selected', 'false')
    }
  })
})
