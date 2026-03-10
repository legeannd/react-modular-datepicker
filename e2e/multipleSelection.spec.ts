import { test, expect } from '@playwright/test'

const STORY_URL =
  '/iframe.html?id=components-datepickerprovider--select-multiple-dates&viewMode=story'

test.describe('Multiple date selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(STORY_URL)
    await page.waitForSelector('button[data-this-month="true"]')
  })

  test('clicking three different days selects all three', async ({ page }) => {
    const buttons = page.locator('button[data-this-month="true"]')
    await buttons.nth(0).click()
    await buttons.nth(5).click()
    await buttons.nth(10).click()
    await expect(buttons.nth(0)).toHaveAttribute('data-selected', 'true')
    await expect(buttons.nth(5)).toHaveAttribute('data-selected', 'true')
    await expect(buttons.nth(10)).toHaveAttribute('data-selected', 'true')
    const selectedCount = await page
      .locator('button[data-selected="true"]')
      .count()
    expect(selectedCount).toBe(3)
  })

  test('clicking an already-selected day deselects it', async ({ page }) => {
    const btn = page.locator('button[data-this-month="true"]').nth(0)
    await btn.click()
    await expect(btn).toHaveAttribute('data-selected', 'true')
    await btn.click()
    await expect(btn).toHaveAttribute('data-selected', 'false')
  })

  test('selection of 2 then deselect 1 leaves exactly 1 selected', async ({
    page,
  }) => {
    const buttons = page.locator('button[data-this-month="true"]')
    await buttons.nth(2).click()
    await buttons.nth(6).click()
    await buttons.nth(2).click() // deselect first
    const selectedCount = await page
      .locator('button[data-selected="true"]')
      .count()
    expect(selectedCount).toBe(1)
    await expect(buttons.nth(6)).toHaveAttribute('data-selected', 'true')
  })
})
