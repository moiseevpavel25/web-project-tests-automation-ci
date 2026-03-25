import {test, expect} from '../fixtures/base'

test.describe('Forgot password flows', () => {

    test.beforeEach(async({page}) => {
        await page.goto('/')
    })

    test('Reset password with pre-filled email', async({loginPage, forgotPasswordPage}) => {
        await loginPage.goToForgotPasswordPageWithEmail("test@test.com")
        await expect(forgotPasswordPage.emailInputField).toHaveValue("test@test.com")

        await forgotPasswordPage.resetPasswordWithPrefilledEmail()
        await expect(forgotPasswordPage.resetPasswordSuccessMessage).toContainText('Please check your mailbox')

        await forgotPasswordPage.returnToLoginPage()
        await expect(loginPage.title).toBeVisible() 

    })

    test('Reset password without pre-filled email', async({loginPage, forgotPasswordPage}) => {
        await loginPage.goToForgotPasswordPageWithoutEmail()
        await expect(forgotPasswordPage.emailInputField).toHaveValue("")

        await forgotPasswordPage.resetPasswordUsingEmail("test@test.com")
        await expect(forgotPasswordPage.resetPasswordSuccessMessage).toContainText('Please check your mailbox')

        await forgotPasswordPage.returnToLoginPage()
        await expect(loginPage.title).toBeVisible() 
    })

    test.describe('Negative Forgot password scenarios', () => {

        test.beforeEach(async({page}) => {
            await page.goto('/forgot-password')
        })
        
        test('Reset password with invalid email', async({forgotPasswordPage}) => {
            await forgotPasswordPage.resetPasswordUsingEmail("test@test1.com")
            await expect(forgotPasswordPage.incorrectEmailError).toHaveText('Incorrect email address.')
        })

        test('Reset password with incorrect email', async({forgotPasswordPage}) => {
            await forgotPasswordPage.resetPasswordUsingEmail("test@testcom")
            await expect(forgotPasswordPage.incorrectEmailError).toHaveText('incorrect email format.')
        })

        test('Reset password with empty email field', async({forgotPasswordPage}) => {
            await forgotPasswordPage.resetPasswordUsingEmail("")
            await expect (forgotPasswordPage.incorrectEmailError).toHaveText('Please enter your email address.')
        })
    
    })

})