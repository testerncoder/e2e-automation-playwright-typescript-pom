import { Page } from '@playwright/test'
import { SignUpPageLocators } from 'pom/pages/locators/index'

const {
    _SIGNUP_FORM_TITLE_LOCATOR,
    _FIRSTNAME_LOCATOR,
    _LASTNAME_LOCATOR,
    _POSTCODE_LOCATOR,
    _EMAIL_LOCATOR,
    _PASSWORD_LOCATOR,
    _SEND_ME_LOCATOR,
    _CREATE_ACCOUNT_LOCATOR,
} = SignUpPageLocators

export class SignUpPage {
    private page: Page
    constructor(page: Page) {
        this.page = page
    }

    // waiting for and fetching page locators
    eleSignUpFormTitle = async () =>
        await this.page.waitForSelector(_SIGNUP_FORM_TITLE_LOCATOR)

    eleFirstName = async () =>
        await this.page.waitForSelector(_FIRSTNAME_LOCATOR)

    eleLastName = async () => await this.page.waitForSelector(_LASTNAME_LOCATOR)

    elePostcode = async () => await this.page.waitForSelector(_POSTCODE_LOCATOR)

    eleEmail = async () => await this.page.waitForSelector(_EMAIL_LOCATOR)

    elePassword = async () => await this.page.waitForSelector(_PASSWORD_LOCATOR)

    eleSendMe = async () => await this.page.waitForSelector(_SEND_ME_LOCATOR)

    eleCreateAccount = async () =>
        await this.page.waitForSelector(_CREATE_ACCOUNT_LOCATOR)

    // All the actions of the page
    public async enterFirstName(firstName: string) {
        const ele = await this.eleFirstName()
        await ele?.isEditable().then(() => {
            ele.type(firstName)
        })
    }
    public async enterLastName(lastname: string) {
        const ele = await this.eleLastName()
        await ele?.isEditable().then(() => {
            ele.type(lastname)
        })
    }

    public async enterPostcode(postcode: string) {
        const ele = await this.elePostcode()
        await ele?.isEditable().then(() => {
            ele.type(postcode)
        })
    }

    public async enterEmail(email: string) {
        const ele = await this.eleEmail()
        await ele?.isEditable().then(() => {
            ele.type(email)
        })
    }
    public async enterPasswoed(password: string) {
        const ele = await this.elePassword()
        await ele?.isEditable().then(() => {
            ele.type(password)
        })
    }

    public async clickSendMe() {
        const ele = await this.eleSendMe()
        await ele?.isEditable().then(() => {
            ele.click()
        })
    }

    public async clickCreateAccount() {
        const ele = await this.eleCreateAccount()
        await ele?.isEnabled().then(() => {
            ele.click()
        })
    }
}
