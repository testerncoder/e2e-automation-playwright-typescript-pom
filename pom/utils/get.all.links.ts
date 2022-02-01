import { Page } from '@playwright/test'
import { Const } from 'pom/data/index'

let { COUNT } = Const

export async function getAllWebpageLinks(page: Page, webpage: string) {
    const hrefs = await page.evaluate(() => {
        return Array.from(document.links).map((item) => item.href)
    })
    console.log(`Total Hyperlinks Found in the ${webpage}:`, hrefs.length)
    if (hrefs.length) {
        for (const link of hrefs) {
            try {
                await page.goto(link)
                COUNT++
                console.log(COUNT, link)
            } catch (e) {
                console.log('Error Found Navigating Link:', link, e)
                /**The reason is page.goto returns a Promise but as it waits for the load event to resolve it: the navigation to the 2nd page (index2.htm) happens earlier than the load event could happen. 
                 * So the result is an UnhandledPromiseRejectionWarning.[N]avigating to "http://localhost:1234/index1.htm", 
                 * waiting until "load" gives a hint about this also.
                Handled: The process with PID 143008 (child process of PID 130952) could not be terminated. **/
            }
        }
    }
}
