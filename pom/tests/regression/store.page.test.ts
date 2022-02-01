import { test, Page } from '@playwright/test'
import { TestData } from 'pom/data/index'
import { getURL, setStoreByName } from 'pom/utils/index'
import { HeaderPage, StoresPage } from 'pom/pages/actions/index'
import { HeaderLocators, StorePageLocators } from 'pom/pages/locators/index'

const { _STORES_LINK_LOCATOR } = HeaderLocators
const { _FIND_A_STORE_BOX_LOCATOR } = StorePageLocators

test.describe('Search Products: ', () => {
    // All enum variables
    const { STORE } = TestData
    // all my pages
    let header: HeaderPage
    let store: StoresPage
    let page: Page

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage()
        // create an instance of all the required pages page
        // All pages
        header = new HeaderPage(page)
        store = new StoresPage(page)
    })

    test.beforeEach(async () => {
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
    })
    // Set store by autocomplete selection
    test('Set store by autocomplete selection', async () => {
        await header.clickStoresLink()
        await page.click(_FIND_A_STORE_BOX_LOCATOR)
        await store.searchStoreByNameOrPostcode(STORE)
        await store.clickAutoCompleteListItem()
        await store.setStore()
        await page.click(_STORES_LINK_LOCATOR).then(() => {
            page.screenshot({
                path: `reports/screenshots/set-store.png`,
                fullPage: false,
            })
        })
        await page.close()
    })
})
