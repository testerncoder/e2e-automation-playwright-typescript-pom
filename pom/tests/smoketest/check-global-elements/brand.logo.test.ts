import { test, chromium } from '@playwright/test'
import { getURL } from 'pom/utils/index'

test.describe('Check Website Logo: ', () => {
    // test caseP
    test('First <a> element happens to be our logo, which links right back to our homepage', async () => {
        const browser = await chromium.launch({ headless: true })
        const page = await browser.newPage()
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
        const url = await page.$eval('a', (el) => el.href)
        console.log(url)
        await browser.close()
    })
})
