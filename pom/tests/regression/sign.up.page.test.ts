import { test, expect, Page } from '@playwright/test'
import { HeaderPage, LoginPopup, SignUpPage } from 'pom/pages/actions/index'
import { getURL } from 'pom/utils/index'
import { UserData } from 'pom/data/index'

// All enum variables
const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, POSTCODE } = UserData
const NEW_EMAIL = `${Date.now()}${EMAIL}`

test.describe('Create Account: ', () => {
    // all my pages
    let headers: HeaderPage
    let loginPopup: LoginPopup
    let signUp: SignUpPage
    let page: Page

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        // create an instance of all the required pages page
        headers = new HeaderPage(page)
        loginPopup = new LoginPopup(page)
        signUp = new SignUpPage(page)
    })

    test.beforeEach(async () => {
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
    })
    // test sign up functionality with valid creds
    test('New user sign up', async () => {
        await headers.clickAccountLink()
        await loginPopup.clickSignUpLinkOnAccountPopup()
        await page.waitForNavigation({ url: '**/register' })
        // validating the current url after clicking on sign in button
        const pageTitle = await signUp.eleSignUpFormTitle()
        expect(await pageTitle?.textContent()).toContain('Sign up')
        // Fill out the form to sign up
        await signUp.enterFirstName(FIRST_NAME)
        await signUp.enterLastName(LAST_NAME)
        await signUp.enterPostcode(POSTCODE)
        await signUp.enterEmail(NEW_EMAIL)
        await signUp.enterPasswoed(PASSWORD)
        await signUp.clickSendMe()
        await signUp.clickCreateAccount()
        await page.close()
    })
})
