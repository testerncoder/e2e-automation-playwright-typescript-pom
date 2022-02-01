import { test, chromium, expect } from '@playwright/test'
import { getURL, getAllWebpageLinks } from 'pom/utils/index'
import { PageTitlesData } from 'pom/data/index'

const { SERVICES_PAGE_TITLE } = PageTitlesData

test.describe('Services Page: ', () => {
    // test case
    test('Test Services Page hyperlinks', async () => {
        test.setTimeout(850000)
        // create an instance of all the required pages page
        const browser = await chromium.launch({ headless: true })
        const page = await browser.newPage()
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl + 'services')
        // wait for page load
        await page.waitForLoadState('domcontentloaded')
        // Verify the Services Page title
        const pageTitile = await page.title()
        expect(pageTitile).toBe(SERVICES_PAGE_TITLE)
        // Fetch all the links of Services Page
        await getAllWebpageLinks(page, 'Services Page')
        await browser.close()
    })
})
