import { test, chromium, expect } from '@playwright/test'
import { getURL, getAllWebpageLinks } from 'pom/utils/index'
import { PageTitlesData } from 'pom/data/index'
const { DIY_ADVICE_PAGE_TITLE } = PageTitlesData

test.describe('DIY Advice Page: ', () => {
    // test case
    test('Test All DIY Advice Hyperlinks:', async () => {
        test.setTimeout(500000)
        const browser = await chromium.launch({ headless: true })
        const page = await browser.newPage()
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        // create an instance of all the required pages page
        await page.goto(envUrl + 'diy-advice')
        // wait for page load
        await page.waitForLoadState('domcontentloaded')
        // Verify the DIY Advice Page title
        const pageTitile = await page.title()
        expect(pageTitile).toBe(DIY_ADVICE_PAGE_TITLE)
        // Fetch all the links of DIY Advice Page
        await getAllWebpageLinks(page, 'DIY Advice Page')
        await browser.close()
    })
})
