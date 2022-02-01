// example.spec.ts
import { test, expect } from '@playwright/test'
import { HeaderPage } from 'pom/pages/actions/index'
import { TestData } from 'pom/data/index'
import { getURL } from 'pom/utils/index'

test.describe('Search Products: ', () => {
    // All enum variables
    const { SEARCH_TERM } = TestData
    // all my pages
    let headers: HeaderPage

    test.beforeEach(async ({ page }) => {
        headers = new HeaderPage(page)
        // Go to the starting url before each test.
        const envUrl = await getURL(process.env.NODE_ENV)
        await page.goto(envUrl)
    })

    // saerch test case
    test('search product by keywords', async ({ page }) => {
        await headers.typeSearchTerm(SEARCH_TERM)
        await headers.clickSearchBtn()
        await page.waitForNavigation()
        expect(page.url()).toContain(`search/products?q=${SEARCH_TERM}`)
        const pageTitle = await page.title()
        console.log('Page title: ', pageTitle)
        await page.close()
    })
})
