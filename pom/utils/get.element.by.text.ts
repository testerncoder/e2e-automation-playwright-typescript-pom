import { Page } from '@playwright/test'

// Use this function when the element text is unique, and matching to a particular element
export async function clickElementByText(page: Page, eleText: string) {
    // locate the element by text
    const locator = page.locator(`text=${eleText}`)
    // Hover over on element located
    await locator.hover()
    // Click on element located
    await locator.click()
}
