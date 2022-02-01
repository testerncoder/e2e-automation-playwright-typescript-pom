import { playAudit } from 'playwright-lighthouse'
import { test, chromium } from '@playwright/test'
import { getURL } from 'pom/utils/index'

test.describe('light house test', () => {
    test('open browser', async () => {
        test.setTimeout(500000)
        const browser = await chromium.launch({
            args: ['--remote-debugging-port=9222'],
            headless: true,
        })
        const page = await browser.newPage()
        // Go to the starting url before test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
        // Sometimes it's important to pass a parameter disableStorageReset as false
        const opts = {
            disableStorageReset: false,
        }
        //If you don't provide any threshold argument to the playAudit command, the test will fail if at least one of your metrics is under 100.
        await playAudit({
            page: page,
            thresholds: {
                performance: 80,
                accessibility: 100,
                'best-practices': 75,
                seo: 80,
                pwa: 80,
            },
            port: 9222,
            opts,

            /* ... other configurations */
            reports: {
                formats: {
                    html: true, //defaults to false
                },
                name: `lighthouse-${
                    process.env.NODE_ENV
                }-${new Date().getTime()}`, //defaults to `lighthouse-${new Date().getTime()}`
                directory: './reports/perf-report', //defaults to `${process.cwd()}/lighthouse`
            },
        })

        // close the browser
        await browser.close()
    })
})
