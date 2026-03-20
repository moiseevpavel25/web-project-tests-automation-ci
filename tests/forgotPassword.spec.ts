import {test, expect} from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage'
import { ForgotPasswordPage } from '../page-objects/forgotPasswordPage'

test.describe('Forgot password flows', () => {

    test.beforeEach(async({page}) => {
        await page.goto('/')
    })

    test('Reset password with pre-filled email', async({page}) => {
        const loginPage = new LoginPage(page)
        const forgotPasswordPage = new ForgotPasswordPage(page)

        await loginPage.goToForgotPasswordPageWithEmail("test@test.com")
        await expect(forgotPasswordPage.emailInputField).toHaveValue("test@test.com")

        await forgotPasswordPage.ResetPasswordWithPrefilledEmail()
        await expect(forgotPasswordPage.resetPasswordSuccessMessage).toContainText('Please check your mailbox')

        await forgotPasswordPage.ReturntoLoginPage()
        await expect(loginPage.title).toBeVisible() 

    })

    test('Reset password without pre-filled email', async({page}) => {
        const loginPage = new LoginPage(page)
        const forgotPasswordPage = new ForgotPasswordPage(page)

        await loginPage.goToForgotPasswordPageWithoutEmail()
        await expect(forgotPasswordPage.emailInputField).toHaveValue("")

        await forgotPasswordPage.ResetPasswordUsingEmail("test@test.com")
        await expect(forgotPasswordPage.resetPasswordSuccessMessage).toContainText('Please check your mailbox')

        await forgotPasswordPage.ReturntoLoginPage()
        await expect(loginPage.title).toBeVisible() 
    })

    test.describe('Negative Forgot password checks', () => {

        test.beforeEach(async({page}) => {
            await page.goto('/forgot-password')
        })
        
        test('Reset password with invalid email', async({page}) => {
            const forgotPasswordPage = new ForgotPasswordPage(page)

            await forgotPasswordPage.ResetPasswordUsingEmail("test@test1.com")
            await expect(forgotPasswordPage.incorrectEmailError).toHaveText('Incorrect email address.')
        })

        test('Reset password with incorrect email', async({page}) => {
            const forgotPasswordPage = new ForgotPasswordPage(page)

            await forgotPasswordPage.ResetPasswordUsingEmail("test@testcom")
            await expect(forgotPasswordPage.incorrectEmailError).toHaveText('incorrect email format.')
        })

        test('Reset password with empty email field', async({page}) => {
            const forgotPasswordPage = new ForgotPasswordPage(page)

            await forgotPasswordPage.ResetPasswordUsingEmail("")
            await expect (forgotPasswordPage.incorrectEmailError).toHaveText('Please enter your email address.')
        })
    
    })

})