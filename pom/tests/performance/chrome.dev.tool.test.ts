import { test, chromium } from '@playwright/test'
import { getURL } from 'pom/utils/index'

test.describe('Chrome DevTools for performance test - Home Page: ', () => {
    // test case: through which we can simulate the experience of users accessing our page with different network conditions:
    test('Network throttling', async () => {
        const browser = await chromium.launch({ headless: true })
        const page = await browser.newPage()
        const client = await page.context().newCDPSession(page)
        await client.send('Network.enable')
        await client.send('Network.emulateNetworkConditions', {
            offline: false,
            downloadThroughput: (4 * 1024 * 1024) / 8,
            uploadThroughput: (3 * 1024 * 1024) / 8,
            latency: 20,
        })
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
        await browser.close()
    })
})
