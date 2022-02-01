import { Page } from '@playwright/test'
import { HeaderLocators } from 'pom/pages/locators/index'

const {
    _LOGO_LOCATOR,
    _DIY_ADVICE_LINK_LOCATOR,
    _STORES_LINK_LOCATOR,
    _SERVICES_LINK_LOCATOR,
    _SIGNUP_LINK_LOCATOR,
    _ACCOUNT_LINK_LOCATOR,
    _SEARCH_BOX_LOCATOR,
    _SEARCH_BUTTON_LOCATOR,
} = HeaderLocators
export class HeaderPage {
    private page: Page
    constructor(page: Page) {
        this.page = page
    }
    // Waiting for and feteching page locators
    eleLogo = async () => await this.page.waitForSelector(_LOGO_LOCATOR)
    eleDiyAdviceLink = async () =>
        await this.page.waitForSelector(_DIY_ADVICE_LINK_LOCATOR)
    eleStoresLink = async () => this.page.waitForSelector(_STORES_LINK_LOCATOR)
    eleServicesLink = async () =>
        this.page.waitForSelector(_SERVICES_LINK_LOCATOR)
    eleSignUpLink = async () => this.page.waitForSelector(_SIGNUP_LINK_LOCATOR)
    eleSearchBox = async () =>
        await this.page.waitForSelector(_SEARCH_BOX_LOCATOR)
    eleSearchBtn = async () =>
        await this.page.waitForSelector(_SEARCH_BUTTON_LOCATOR)
    eleAccountLink = async () =>
        await this.page.waitForSelector(_ACCOUNT_LINK_LOCATOR)

    // All the page actions
    public async clickpomLogo() {
        const ele = await this.eleLogo()
        await ele?.isEnabled().then(() => {
            ele.click()
        })
    }
    public async clickDiyAdviceLink() {
        const ele = await this.eleDiyAdviceLink()
        await ele?.isEnabled().then(() => {
            ele.click()
        })
    }
    public async clickStoresLink() {
        const ele = await this.eleStoresLink()
        await ele?.isEnabled().then(() => {
            ele.click()
        })
    }
    public async clickServicesLink() {
        const ele = await this.eleServicesLink()
        await ele?.isEnabled().then(() => {
            ele.click()
        })
    }
    public async clickSignUpLink() {
        const ele = await this.eleSignUpLink()
        await ele?.isEnabled().then(() => {
            ele.click()
        })
    }

    public async clickAccountLink() {
        const ele = await this.eleAccountLink()
        await ele?.isEnabled().then(() => {
            ele.click()
        })
    }
    public async typeSearchTerm(term: string) {
        const ele = await this.eleSearchBox()
        await ele?.isEnabled().then(() => {
            ele.type(term)
        })
    }
    public async clickSearchBtn() {
        const ele = await this.eleSearchBtn()
        await ele?.isEnabled().then(() => {
            ele.click()
        })
    }
}
