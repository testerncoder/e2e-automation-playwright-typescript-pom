export enum LaunchData {
    TEST = 'test',
    UAT = 'uat',
    PROD = 'prod',
}

export type envType = LaunchData.TEST | LaunchData.UAT | LaunchData.PROD
