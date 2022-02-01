import { test, chromium } from '@playwright/test'
import { getURL } from 'pom/utils/index'

test.describe('Home Page Performance: ', () => {
    // test caseP
    test('Test homepage performance via playwright:', async () => {
        test.setTimeout(500000)
        const browser = await chromium.launch({ headless: true })
        const page = await browser.newPage()
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)

        const performanceTimingJson = await page.evaluate(() =>
            JSON.stringify(window.performance.timing),
        )
        const performanceTiming = JSON.parse(performanceTimingJson)

        console.log(performanceTiming)

        const startToInteractive =
            performanceTiming.domInteractive - performanceTiming.navigationStart
        console.log(
            `Navigation start to DOM interactive: ${startToInteractive}ms`,
        )

        await browser.close()
    })
})
