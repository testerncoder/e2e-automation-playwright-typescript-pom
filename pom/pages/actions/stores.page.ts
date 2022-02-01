import { Page } from '@playwright/test'
import { StorePageLocators } from 'pom/pages/locators/index'

const {
    _FIND_A_STORE_BOX_LOCATOR,
    _AUTO_COMP_LIST_LOCATOR,
    _STORE_NAME_LOCATOR,
    _FIRST_STORE_LOCATOR,
    _FIND_STORE_LIST_LOCATOR,
} = StorePageLocators

export class StoresPage {
    private page: Page
    constructor(page: Page) {
        this.page = page
    }

    // clicking on the my account icon
    eleFindAStoreInputBox = async () =>
        await this.page.waitForSelector(_FIND_A_STORE_BOX_LOCATOR)

    eleAutoCompleteList = async () =>
        await this.page.waitForSelector(_AUTO_COMP_LIST_LOCATOR)

    eleFindStore = async () => await this.page.$(_STORE_NAME_LOCATOR)

    eleFindAllStore = async () => await this.page.$$(_FIND_STORE_LIST_LOCATOR)

    eleFirstStoreOntheList = async () =>
        await this.page.waitForSelector(_FIRST_STORE_LOCATOR)

    // Fill the store number or name
    public async searchStoreByNameOrPostcode(store: string) {
        const ele = await this.eleFindAStoreInputBox()
        await ele?.isEditable().then(() => {
            ele.type(store)
        })
    }

    // click on store search box
    public async setStore() {
        const ele = await this.eleFirstStoreOntheList()
        await ele?.isVisible().then(() => {
            ele.click()
        })
    }
    public async clickAutoCompleteListItem() {
        const ele = await this.eleAutoCompleteList()
        await ele?.isEnabled().then(() => {
            ele.click()
        })
    }
}
