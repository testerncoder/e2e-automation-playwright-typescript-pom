import { Page } from '@playwright/test'
import { KeepInTouchSliderLocators } from 'pom/pages/locators/index'

const { _SLIDER_CROSS_LOCATOR } = KeepInTouchSliderLocators

export class KeepInTouchSlider {
    private page: Page
    constructor(page: Page) {
        this.page = page
    }

    // clicking on the account icon/link on the main header menu
    eleKeepInTouchCloseBtn = async () =>
        await this.page.waitForSelector(_SLIDER_CROSS_LOCATOR)

    public async closeKeepInTouchSlider() {
        const ele = await this.eleKeepInTouchCloseBtn()
        await ele?.isEnabled().then(() => {
            console.log('Closing the slider')
            ele.click()
        })
    }
}
