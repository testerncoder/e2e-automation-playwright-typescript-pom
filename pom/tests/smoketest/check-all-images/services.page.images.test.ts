import { test, chromium, expect } from '@playwright/test'
import { getURL, getAllWebpageImages } from 'pom/utils/index'
import { PageTitlesData } from 'pom/data/index'

const { SERVICES_PAGE_TITLE } = PageTitlesData

test.describe('Services Page: ', () => {
    // test case
    test('Test All Services Page Images', async () => {
        test.setTimeout(850000)
        // create an instance of all the required pages page
        const browser = await chromium.launch({ headless: true })
        const page = await browser.newPage()
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
        // wait for page load
        await page.waitForLoadState('domcontentloaded')
        // Verify the Services Page title
        const pageTitile = await page.title()
        expect(pageTitile).toBe(SERVICES_PAGE_TITLE)
        // Fetch all the images of Services Page
        await getAllWebpageImages(page, 'Services Page')
        await browser.close()
    })
})
