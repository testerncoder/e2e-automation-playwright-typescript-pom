import { test, expect, Page } from '@playwright/test'
import {
    HeaderPage,
    StoresPage,
    KeepInTouchSlider,
} from 'pom/pages/actions/index'
import { TestData } from 'pom/data/index'
import { getURL } from 'pom/utils/index'
import {
    StorePageLocators,
    SearchResultsPageLocators,
    ProductDetailPageLocators,
    CartPageLocators,
} from 'pom/pages/locators/index'

const { _FIND_A_STORE_BOX_LOCATOR } = StorePageLocators
const {
    _STORE_AVAILABILITY_FILTER_LOCATOR,
    _STORE_SELECTED_FILTER_LOCATOR,
    _DELIVERY_FILTER_LOCATOR,
    _FIRST_PRODUCT_LOCATOR,
} = SearchResultsPageLocators
const { _ADD_TO_CART_BUTTON_LOCATOR, _REVIEW_AND_CHECKOUT_BUTTON_LOCATOR } =
    ProductDetailPageLocators

const {
    _CONTINUE_CUSTOMER_DETAILS_BUTTON_LOCATOR,
    _CONTINUE_CHECKOUT_AS_GUEST_BUTTON_LOCTOR,
    _TOTAL_CART_ITEM_LOCATOR,
} = CartPageLocators

test.describe('Add to Cart: ', () => {
    // All enum variables
    const { SEARCH_TERM, STORE } = TestData
    // all my pages
    let headers: HeaderPage
    let store: StoresPage
    let popup: KeepInTouchSlider

    test.beforeEach(async ({ page }) => {
        headers = new HeaderPage(page)
        store = new StoresPage(page)
        popup = new KeepInTouchSlider(page)
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
    })

    // saerch test case
    test('Delievery product checkout test as guest user', async ({ page }) => {
        // home page: header links
        await headers.clickStoresLink()
        // store page: set store
        await page.click(_FIND_A_STORE_BOX_LOCATOR)
        await store.searchStoreByNameOrPostcode(STORE)
        await store.clickAutoCompleteListItem()
        await store.setStore()
        // clicking on logo to get back to home page
        await headers.clickpomLogo()
        await page.waitForNavigation()
        // home page: search a product
        await headers.typeSearchTerm(SEARCH_TERM)
        await headers.clickSearchBtn()
        // navigating to search results page
        await page.waitForNavigation()
        expect(page.url()).toContain(`${SEARCH_TERM}`)
        // search results page: filter search results by set store
        await page.click(_STORE_AVAILABILITY_FILTER_LOCATOR)
        await page.click(_STORE_SELECTED_FILTER_LOCATOR)
        await page.click(_DELIVERY_FILTER_LOCATOR)
        await page.click(_FIRST_PRODUCT_LOCATOR)
        // product details page: add product to cart
        await page.click(_ADD_TO_CART_BUTTON_LOCATOR)
        await page.click(_REVIEW_AND_CHECKOUT_BUTTON_LOCATOR)
        // cart page: continue to checkout
        await page.click(_CONTINUE_CUSTOMER_DETAILS_BUTTON_LOCATOR)
        await page.click(_CONTINUE_CHECKOUT_AS_GUEST_BUTTON_LOCTOR)
        const TotalItemsAdded = await (
            await page.waitForSelector(_TOTAL_CART_ITEM_LOCATOR)
        ).textContent()
        expect(TotalItemsAdded).toContain('1')
        await page.close()
    })
})
