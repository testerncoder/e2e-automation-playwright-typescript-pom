import { test, chromium } from '@playwright/test'
import { getURL } from 'pom/utils/index'

test.describe('Webpage console errors: ', () => {
    // test.skip(true)
    // test case
    test('Find all the console errors in the page:', async () => {
        const browser = await chromium.launch({ headless: false })
        const page = await browser.newPage()
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        // Listen for all console events and handle errors
        page.on('console', (msg) => {
            if (msg.type() === 'error')
                console.log(`Error Message: "${msg.text()}"`)
        })
        // Log all uncaught errors to the terminal
        page.on('pageerror', (exception) => {
            console.log(`Uncaught exception: "${exception}"`)
        })

        // Navigate to a page with an exception.
        await page.goto(envUrl)

        // close the browser
        await browser.close()
    })
})
