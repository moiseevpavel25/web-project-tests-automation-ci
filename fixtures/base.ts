import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/loginPage'
import { ProfilePage } from '../page-objects/profilePage'
import { ForgotPasswordPage } from '../page-objects/forgotPasswordPage';
import { SummaryPage } from '../page-objects/summaryPage';

type MyFixtures = {
    loginPage: LoginPage
    profilePage: ProfilePage
    forgotPasswordPage: ForgotPasswordPage
    summaryPage: SummaryPage
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },
    profilePage: async ({page}, use) => {
        const profilePage = new ProfilePage(page)
        await use(profilePage)
    },
    forgotPasswordPage: async ({page}, use) => {
        const forgotPasswordPage = new ForgotPasswordPage(page)
        await use(forgotPasswordPage)
    },
    summaryPage: async ({page}, use) => {
        const summaryPage = new SummaryPage(page)
        await use(summaryPage)
    }
})

export { expect } from '@playwright/test'