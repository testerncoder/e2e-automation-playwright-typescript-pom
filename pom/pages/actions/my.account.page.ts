import { Page } from '@playwright/test'
import { AcountPopupLocators } from 'pom/pages/locators/index'

const { _LOGGED_IN_USER_TITLE_LOCATOR } = AcountPopupLocators

export class MyAccountPage {
    private page: Page
    constructor(page: Page) {
        this.page = page
    }

    // clicking on the my account icon
    eleUserTitle = async () =>
        this.page.waitForSelector(_LOGGED_IN_USER_TITLE_LOCATOR)

    // All the page actions
    public async hiUserWindow() {
        const txt1 = await this.eleUserTitle()
        return await txt1.textContent()
    }
}
