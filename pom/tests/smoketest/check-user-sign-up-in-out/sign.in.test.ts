// example.spec.ts
import { test, expect, Page } from '@playwright/test'
import { UserData } from 'pom/data/index'
import { getURL } from 'pom/utils/index'
import {
    MyAccountPage,
    LoginPopup,
    HeaderPage,
    LoginPage,
} from 'pom/pages/actions/index'
// All enum variables
const { FIRST_NAME, EMAIL, PASSWORD } = UserData

test.describe('User SignIn Tests: ', () => {
    // all my pages
    let headers: HeaderPage
    let loginPopup: LoginPopup
    let loginPage: LoginPage
    let myAccount: MyAccountPage
    let page: Page

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        // create an instance of all the required pages page
        headers = new HeaderPage(page)
        loginPopup = new LoginPopup(page)
        loginPage = new LoginPage(page)
        myAccount = new MyAccountPage(page)
    })

    test.beforeEach(async () => {
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
    })

    // test login functionality with valid creds
    test('Sign In', async () => {
        try {
            await headers.clickAccountLink()
            await loginPopup.clickSignInBtnOnAccountPopup()
            // waiting for the login page to be loaded
            await page.waitForNavigation({ url: '**/login**' })
            // filling the valid credentials
            await loginPage.login(EMAIL, PASSWORD)
            await page.waitForNavigation()
            await headers.clickAccountLink()
            expect(await myAccount.hiUserWindow()).toContain(`Hi ${FIRST_NAME}`)
            await page.close()
        } catch {
            // Log all uncaught errors to the terminal
            page.on('pageerror', (exception) => {
                console.log(`Uncaught exception: "${exception}"`)
            })
        }
    })
})
