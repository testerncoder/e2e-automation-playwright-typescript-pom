// example.spec.ts
import { test, Page, expect } from '@playwright/test'
import { getURL, clickElementByText } from 'pom/utils/index'
import { AcountPopupLocators } from 'pom/pages/locators/index'
import { HeaderPage } from 'pom/pages/actions/index'
// All enum variables

const { _ACCOUNT_POPUP_TITLE_TEXT, _SIGN_OUT_LINK_TEXT } = AcountPopupLocators

test.describe('User SignOut Tests: ', () => {
    // all my pages
    let headers: HeaderPage
    let page: Page

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        // create an instance of all the required pages page
        headers = new HeaderPage(page)
    })

    test.beforeEach(async () => {
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
    })

    // using storage state of logged in user
    test.use({ storageState: 'state.json' })
    test('User sign out', async () => {
        try {
            // Pre condition- user login: using storage state
            // user sign out
            await headers.clickAccountLink()
            await page.screenshot({
                path: `reports/screenshots/user-signout.png`,
                fullPage: false,
            })
            await clickElementByText(page, _SIGN_OUT_LINK_TEXT)
            await page.waitForNavigation()
            // validate account popup title for logged out user
            await headers.clickAccountLink()
            const locator = page
                .locator(`text=${_ACCOUNT_POPUP_TITLE_TEXT}`)
                .first()
                .textContent()
            expect(locator).toContain('Sign in to your account')
            await page.close()
        } catch {
            // Log all uncaught errors to the terminal
            page.on('pageerror', (exception) => {
                console.log(`Uncaught exception: "${exception}"`)
            })
        }
    })
})
