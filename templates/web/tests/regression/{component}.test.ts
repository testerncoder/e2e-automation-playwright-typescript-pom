import { test, Page } from '@playwright/test'
import { getURL } from 'pom/utils/index'

test.describe('Create Account: ', () => {
    // all my pages
    let page: Page
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
    })

    test.beforeEach(async () => {
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
    })
    test('accessibility snap of current page- internal', async () => {
        const snapshot = await page.accessibility.snapshot()
        console.log(snapshot)
    })
    test.afterAll(async () => {
        await page.close()
    })
})
