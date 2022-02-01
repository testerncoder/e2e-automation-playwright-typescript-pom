import dotenv from 'dotenv'
import { LaunchData, envType } from 'pom/data/index'

dotenv.config()

const { TEST, UAT, PROD } = LaunchData

const { QA_URL, UAT_URL, PROD_URL } = process.env

// launch the retail pom website
export async function getURL(env: envType) {
    switch (env) {
        case TEST:
            return QA_URL
        case UAT:
            return UAT_URL
        case PROD:
            return PROD_URL
        default:
            return QA_URL
    }
}
