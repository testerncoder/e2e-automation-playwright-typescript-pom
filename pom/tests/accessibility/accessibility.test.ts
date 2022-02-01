import { test, expect } from '@playwright/test'
import { getURL } from 'pom/utils/index'

test.describe('Accessibility checks: ', () => {
    test.beforeEach(async ({ page }) => {
        // create an instance of all the required pages page
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
    })
    test('accessibility snap of current page- internal', async ({ page }) => {
        test.setTimeout(300000)
        const snapshot = await page.accessibility.snapshot()
        console.log(snapshot)
        await page.close()
    })
    test('axe accessibility run - external: with expect module', async ({
        page,
    }) => {
        test.setTimeout(300000)
        await expect(page).toBeAccessible() // Page
        await page.close()
    })
})
