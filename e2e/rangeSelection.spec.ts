import { test, expect } from '@playwright/test'

const STORY_URL =
  '/iframe.html?id=components-datepickerprovider--select-date-range&viewMode=story'

test.describe('Range date selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STORY_URL)
    await page.waitForSelector('button[data-this-month="true"]')
  })

  test('first click sets data-start-range=true', async ({ page }) => {
    const buttons = page.locator('button[data-this-month="true"]')
    await buttons.nth(0).click()
    await expect(buttons.nth(0)).toHaveAttribute('data-start-range', 'true')
  })

  test('second click (later date) sets data-end-range=true', async ({ page }) => {
    const buttons = page.locator('button[data-this-month="true"]')
    await buttons.nth(0).click()
    await buttons.nth(6).click()
    await expect(buttons.nth(6)).toHaveAttribute('data-end-range', 'true')
  })

  test('days between start and end have data-between-range=true', async ({
    page,
  }) => {
    const buttons = page.locator('button[data-this-month="true"]')
    await buttons.nth(0).click()
    await buttons.nth(5).click()
    const betweenCount = await page
      .locator('button[data-between-range="true"]')
      .count()
    expect(betweenCount).toBeGreaterThan(0)
  })

  test('hovering over days during range shows preview (between-range)', async ({
    page,
  }) => {
    const buttons = page.locator('button[data-this-month="true"]')
    await buttons.nth(0).click()
    // Hover over a day further in the month
    await buttons.nth(6).hover()
    const betweenCount = await page
      .locator('button[data-between-range="true"]')
      .count()
    expect(betweenCount).toBeGreaterThan(0)
  })

  test('hover preview stays visible after mouse leaves (sticky until range end is clicked)', async ({ page }) => {
    // The library keeps the hover preview active until the user clicks to set
    // the range end. Moving the mouse off a day does NOT clear the preview.
    const buttons = page.locator('button[data-this-month="true"]')
    await buttons.nth(0).click()
    await buttons.nth(6).hover()
    // Move mouse off the calendar
    await page.mouse.move(0, 0)
    // Preview should still be visible (sticky hover behavior)
    const betweenCount = await page
      .locator('button[data-between-range="true"]')
      .count()
    expect(betweenCount).toBeGreaterThan(0)
  })

  test('completing a range then clicking starts a new range', async ({ page }) => {
    const buttons = page.locator('button[data-this-month="true"]')
    await buttons.nth(0).click()
    await buttons.nth(5).click()
    // Start a new range
    await buttons.nth(10).click()
    await expect(buttons.nth(10)).toHaveAttribute('data-start-range', 'true')
    await expect(buttons.nth(0)).toHaveAttribute('data-start-range', 'false')
    await expect(buttons.nth(5)).toHaveAttribute('data-end-range', 'false')
  })
})
