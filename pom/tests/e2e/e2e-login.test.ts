import { test, expect, Page } from '@playwright/test'
import { getURL } from 'pom/utils/index'
import { UserData } from 'pom/data/index'
import {
    MyAccountPage,
    LoginPopup,
    HeaderPage,
    LoginPage,
    SignUpPage,
} from 'pom/pages/actions/index'
import { AlertsAndToastPopupLocators } from 'pom/pages/locators/index'

// All enum variables
const { _TOAST_SIGNUP_CROSS_ICON_LOCATOR } = AlertsAndToastPopupLocators
const { FIRST_NAME, LAST_NAME, POSTCODE, EMAIL, PASSWORD } = UserData
const NEW_EMAIL = `${Date.now()}${EMAIL}`

test.describe('Successful Login Tests: ', () => {
    // all my pages
    let headers: HeaderPage
    let loginPopup: LoginPopup
    let loginPage: LoginPage
    let myAccount: MyAccountPage
    let page: Page
    let signUp: SignUpPage

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        // create an instance of all the required pages page
        headers = new HeaderPage(page)
        loginPopup = new LoginPopup(page)
        loginPage = new LoginPage(page)
        signUp = new SignUpPage(page)
        myAccount = new MyAccountPage(page)
    })

    test.beforeEach(async () => {
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
    })

    // test sign up functionality with valid creds
    test('New user sign up and sing in with newly created user credentials', async () => {
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
        // close the signup success toaster
        await page.click(_TOAST_SIGNUP_CROSS_ICON_LOCATOR)

        // test login functionality with valid creds
        await headers.clickAccountLink()
        await loginPopup.clickSignInBtnOnAccountPopup()
        // waiting for the login page to be loaded
        await page.waitForNavigation({ url: '**/login**' })
        // validating the current url after clicking on sign in button
        expect(await page.title()).toContain('Sign in')
        // filling the valid credentials
        await loginPage.login(NEW_EMAIL, PASSWORD)
        await page.waitForNavigation()
        await headers.clickAccountLink()
        expect(await myAccount.hiUserWindow()).toContain(`Hi ${FIRST_NAME}`)
        await page.screenshot({
            path: `reports/screenshots/${await myAccount.hiUserWindow()}.png`,
            fullPage: false,
            timeout: 10000,
        })
        await page.close({ runBeforeUnload: true })
    })
})
