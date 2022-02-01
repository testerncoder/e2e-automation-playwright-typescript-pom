import { chromium, test } from '@playwright/test'
import { getURL } from 'pom/utils/index'

test('DIY Advice page', async () => {
    const envUrl = await getURL(process.env.NODE_ENV)
    const browser = await chromium.launch({ headless: false })
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(envUrl)

    // place your code here
    await page.click('.diy-image')
    await page.waitForNavigation()

    await browser.close()
})
