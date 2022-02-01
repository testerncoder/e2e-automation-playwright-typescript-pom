import { Page } from '@playwright/test'
import { ProductDetailPageLocators } from 'pom/pages/locators/index'

const { _PDP_PAGE_TITLE_LOCATOR } = ProductDetailPageLocators

export class ProductDetailPage {
    private page: Page
    constructor(page: Page) {
        this.page = page
    }

    // clicking on the my account icon
    elePageTitle = async () =>
        this.page.waitForSelector(_PDP_PAGE_TITLE_LOCATOR)

    // All the page actions
    public async getPageTitle() {
        const txt1 = await this.elePageTitle()
        return await txt1.textContent()
    }
}
