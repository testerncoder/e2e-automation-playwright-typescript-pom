import { test, chromium, expect } from '@playwright/test'
import { getURL, getAllWebpageLinks } from 'pom/utils/index'
import { PageTitlesData } from 'pom/data/index'

const { STORES_PAGE_TITLE } = PageTitlesData

test.describe('Stores Page: ', () => {
    // test case
    test('Test Al Stores Page Hyperlinks', async () => {
        test.setTimeout(850000)
        // create an instance of all the required pages page
        const browser = await chromium.launch({ headless: true })
        const page = await browser.newPage()
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl + 'stores')
        // wait for page load
        await page.waitForLoadState('domcontentloaded')
        // Verify the Stores Page title
        const pageTitile = await page.title()
        expect(pageTitile).toBe(STORES_PAGE_TITLE)
        // Fetch all the links of Stores Page
        await getAllWebpageLinks(page, 'Stores Page')
        await browser.close()
    })
})
