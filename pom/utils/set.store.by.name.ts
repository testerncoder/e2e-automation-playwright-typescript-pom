import { Page } from '@playwright/test'
import { TestData } from 'pom/data/index'

let { STORE } = TestData

export async function setStoreByName(page: Page, store: string) {
    console.log(await page.$$eval(store, (elements) => elements.length))
}
