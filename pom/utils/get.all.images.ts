import { Page } from '@playwright/test'
import { Const } from 'pom/data/index'
var rimraf = require('rimraf')

rimraf('smoke-results/screenshots-images', () => null)
let { COUNT } = Const

export async function getAllWebpageImages(page: Page, webpage: string) {
    const imgs = await page.evaluate(() => {
        return Array.from(document.images).map(
            (item) => item.src || item.dataset.src,
        )
    })

    console.log(`Total Images Found in the ${webpage}:`, imgs.length)
    rimraf('screenshots-images', () => null)
    if (imgs.length) {
        for (const img of imgs) {
            try {
                img && (await page.goto(img))
                const endpoint = page.url().split('?').pop()
                COUNT++
                console.log(COUNT, endpoint)
                await page.screenshot({
                    path: `reports/screenshots/all-images/screenshot-${endpoint}-${Date.now()}.png`,
                    fullPage: false,
                    timeout: 10000,
                })
            } catch (e) {
                console.log('***Error Found Visiting Image Source***:', img, e)
                /**The reason is page.goto returns a Promise but as it waits for the load event to resolve it: the navigation to the 2nd page (index2.htm) happens earlier than the load event could happen.
                 * So the result is an UnhandledPromiseRejectionWarning.[N]avigating to "http://localhost:1234/index1.htm",
                 * waiting until "load" gives a hint about this also.
                Handled: The process with PID 143008 (child process of PID 130952) could not be terminated. **/
            }
        }
    }
}
