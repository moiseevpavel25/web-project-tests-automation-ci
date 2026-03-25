import {test, expect} from '../fixtures/base'

test.describe('Login flows', () => {

    test.beforeEach(async({page}) => {
        await page.goto('/')
    })

    test('Login with valid creds', async({loginPage, profilePage}) => {
        await loginPage.loginWithCredentials("test@test.com", "qwerty123")
        await expect (profilePage.title).toBeVisible()
    })

    test('Check login input fields placeholders', async({loginPage}) => {
        await expect (loginPage.emailInputField).toHaveAttribute('placeholder',"Your email")
        await expect (loginPage.passwordInputField).toHaveAttribute('placeholder',"Your password")
    })

    test.describe('Negative login scenarios', () => {

        test('Login with invalid email', async({loginPage}) => {
            await loginPage.loginWithCredentials("test1@test.com", "qwerty123")
            await expect (loginPage.incorrectEmailError).toContainText('Incorrect email address.') 
        })

        test('Login with incorrect email format', async({loginPage}) => {
            await loginPage.loginWithCredentials("testtest.com", "qwerty123")
            await expect (loginPage.incorrectEmailError).toContainText('incorrect email format.') 
        })

        test('Login with invalid password', async({loginPage}) => {
            await loginPage.loginWithCredentials("test@test.com", "qwerty12")
            await expect (loginPage.incorrectPasswordError).toContainText('Incorrect password.') 
        })

        test('Login with empty input fields', async({loginPage}) => {
            await loginPage.loginWithCredentials("", "")
            await expect (loginPage.incorrectEmailError).toContainText('Please enter your email address.')
            await expect (loginPage.incorrectPasswordError).toContainText('Please enter your password.') 
        })

    })

})