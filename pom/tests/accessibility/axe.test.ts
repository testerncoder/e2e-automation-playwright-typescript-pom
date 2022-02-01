import { test, chromium, Browser, Page } from '@playwright/test'
import { getURL } from 'pom/utils/index'
import { injectAxe, checkA11y, getViolations } from 'axe-playwright'
import { createHtmlReport } from 'axe-html-reporter'

let browser: Browser
let page: Page

test.describe('Playwright web page accessibility test', () => {
    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: true })
        page = await browser.newPage()
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
        await injectAxe(page)
    })

    test.only('get a detailed report on violations', async () => {
        test.setTimeout(300000)
        const violations = await getViolations(page, undefined, {
            axeOptions: {
                runOnly: {
                    type: 'tag',
                    values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
                },
            },
        })

        if (violations.length > 0) {
            createHtmlReport({
                // from axe-html-reporter
                results: {
                    violations: violations,
                },
                options: {
                    outputDir: 'reports/accessibility-results',
                    reportFileName: `Accessibility-Test-${
                        process.env.NODE_ENV
                    }-${new Date().getTime()}.html`, //defaults to `lighthouse-${new Date().getTime()}`',
                },
            })
        }
    })

    // Same as above, but includes the html of the offending node
    test('print out a detailed report on violations', async () =>
        // @ts-ignore
        await checkA11y(page, null, {
            detailedReport: true,
            detailedReportOptions: { html: true },
        }))

    // close the browser
    test.afterAll(async () => {
        await browser.close()
    })
})
