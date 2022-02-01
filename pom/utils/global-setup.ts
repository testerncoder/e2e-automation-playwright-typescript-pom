import { chromium, expect } from '@playwright/test'
import { UserData } from 'pom/data/index'
import { getURL } from 'pom/utils/index'
import { LoginPopup, HeaderPage, LoginPage } from 'pom/pages/actions/index'
// All enum variables
const { EMAIL, PASSWORD } = UserData
// all my pages
let headers: HeaderPage
let loginPopup: LoginPopup
let loginPage: LoginPage

async function globalSetup() {
    const browser = await chromium.launch()
    const page = await browser.newPage()

    // create an instance of all the required pages page
    headers = new HeaderPage(page)
    loginPopup = new LoginPopup(page)
    loginPage = new LoginPage(page)

    // Go to the starting url before each test.
    const envUrl = await getURL(process.env.NODE_ENV)
    await page.goto(envUrl)
    await headers.clickAccountLink()
    await loginPopup.clickSignInBtnOnAccountPopup()
    // waiting for the login page to be loaded
    await page.waitForNavigation({ url: '**/login**' })
    // filling the valid credentials
    await loginPage.login(EMAIL, PASSWORD)
    await page.waitForTimeout(20000)
    // Save storage state into the file.
    await page.context().storageState({ path: 'state.json' })
    await browser.close()
}

export default globalSetup
