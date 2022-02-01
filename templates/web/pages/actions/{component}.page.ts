import { Page } from '@playwright/test'
import * as locator from 'pom/pages/locators/index'

export default class DemoPage {
    private page: Page
    constructor(page: Page) {
        this.page = page
    }

    // clicking on the account icon/link on the main header menu
    public get elelocator() {
        return this.page.waitForSelector('_LOCATOR')
    }

    public async clickOnLocator() {
        const ele = await this.elelocator
        await ele?.isEnabled().then(() => {
            ele.click()
        })
    }
}
