import { Page } from '@playwright/test'
import { AcountPopupLocators } from 'pom/pages/locators/index'

const { _SIGNUP_LINK_LOCATOR, _SIGNIN_BUTTON_LOCATOR } = AcountPopupLocators

export class LoginPopup {
    private page: Page
    constructor(page: Page) {
        this.page = page
    }

    // page locators
    eleSignInBtnOnAccountPopup = async () =>
        await this.page.waitForSelector(_SIGNIN_BUTTON_LOCATOR)

    eleSignUpLinkOnAccountPopup = async () =>
        await this.page.waitForSelector(_SIGNUP_LINK_LOCATOR)

    // Page actions on locators
    public async clickSignInBtnOnAccountPopup() {
        const ele = await this.eleSignInBtnOnAccountPopup()
        await ele?.isEnabled().then(() => {
            ele.click()
        })
    }

    public async clickSignUpLinkOnAccountPopup() {
        const ele = await this.eleSignUpLinkOnAccountPopup()
        await ele?.isEnabled().then(() => {
            ele.click()
        })
    }
}
