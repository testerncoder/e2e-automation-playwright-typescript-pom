import 'module-alias/register' // for resolving alias
import { expect, PlaywrightTestConfig, devices } from '@playwright/test'
import { matchers } from 'expect-axe-playwright'

expect.extend(matchers)
const config: PlaywrightTestConfig = {
    // test dir
    testDir: 'pom/tests',
    // globle-setup.ts to resuse the auth state
    globalSetup: '@utils/global-setup',
    // Each test is given 60 seconds
    timeout: 300000,
    retries: 0,
    reporter: [['line'], ['allure-playwright']],
    use: {
        headless: true,
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'Chromium',
            use: {
                // Configure the browser to use.
                browserName: 'chromium',
                // Any Chromium-specific options.
                viewport: { width: 1280, height: 800 },
            },
        },
        {
            name: 'Firefox',
            use: { browserName: 'firefox' },
        },

        {
            name: 'WebKit',
            use: { browserName: 'webkit' },
        },
    ],
}
export default config
