import {test, expect} from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage'
import { ProfilePage } from '../page-objects/profilePage'

test.describe('Login flows', () => {

    test.beforeEach(async({page}) => {
        await page.goto('/')
    })

    test('Login with valid creds', async({page}) => {
        const loginPage = new LoginPage(page)
        const profilePage = new ProfilePage(page)

        await loginPage.checkPlaceholdersInInputFields()
        await loginPage.loginWithCredentials("test@test.com", "qwerty123")
        await expect (profilePage.title).toBeVisible()
    })

    test.describe('Negative login scenarios', () => {

        test('Login with invalid email', async({page}) => {
            const loginPage = new LoginPage(page)

            await loginPage.loginWithCredentials("test1@test.com", "qwerty123")
            await expect (loginPage.incorrectEmailError).toContainText('Incorrect email address.') 
        })

        test('Login with incorrect email format', async({page}) => {
            const loginPage = new LoginPage(page)

            await loginPage.loginWithCredentials("testtest.com", "qwerty123")
            await expect (loginPage.incorrectEmailError).toContainText('incorrect email format.') 
        })

        test('Login with invalid password', async({page}) => {
            const loginPage = new LoginPage(page)

            await loginPage.loginWithCredentials("test@test.com", "qwerty12")
            await expect (loginPage.incorrectPasswordError).toContainText('Incorrect password.') 
        })

        test('Login with empty input fields', async({page}) => {
            const loginPage = new LoginPage(page)

            await loginPage.loginWithCredentials("", "")
            await expect (loginPage.incorrectEmailError).toContainText('Please enter your email address.')
            await expect (loginPage.incorrectPasswordError).toContainText('Please enter your password.') 
        })

    })

})