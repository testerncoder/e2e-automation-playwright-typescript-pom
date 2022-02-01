import { Page } from '@playwright/test'
import { LoginPageLocators } from 'pom/pages/locators/index'

const {
    _SIGNIN_FORM_TITLE_LOCATOR,
    _EMAIL_LOCATOR,
    _PASSWORD_LOCATOR,
    _REMEMBER_ME_LOCATOR,
    _OKTA_SIGNIN_BTN_LOCATOR,
} = LoginPageLocators

export class LoginPage {
    private page: Page
    constructor(page: Page) {
        this.page = page
    }

    // All the Page element locators
    eleSignInFormTitle = async () =>
        await this.page.waitForSelector(_SIGNIN_FORM_TITLE_LOCATOR)

    eleEmail = async () => await this.page.waitForSelector(_EMAIL_LOCATOR)

    elePassword = async () => await this.page.waitForSelector(_PASSWORD_LOCATOR)

    eleRememberMe = async () =>
        await this.page.waitForSelector(_REMEMBER_ME_LOCATOR)

    eleOktaSignIn = async () =>
        await this.page.waitForSelector(_OKTA_SIGNIN_BTN_LOCATOR)

    /** All the Page action functions, which will be using the above locators */

    // filling the credentials and clicking on okta sign in button

    public async login(email: string, password: string) {
        await this.enterEmail(email)
        await this.enterPassword(password)
        await this.checkRememberMe()
        await this.clickOktaSignInBtn()
    }

    public async enterEmail(email: string) {
        const txt1 = await this.eleEmail()
        await txt1?.isEditable().then(() => {
            txt1.type(email)
        })
    }

    public async enterPassword(password: string) {
        const txt2 = await this.elePassword()
        await txt2?.isEditable().then(() => {
            txt2.type(password)
        })
    }

    public async checkRememberMe() {
        const ele = await this.eleRememberMe()
        await ele?.isEditable().then(() => {
            ele.click()
        })
    }

    public async clickOktaSignInBtn() {
        const ele = await this.eleOktaSignIn()
        await ele?.isEnabled().then(() => {
            ele.click()
        })
    }
}
