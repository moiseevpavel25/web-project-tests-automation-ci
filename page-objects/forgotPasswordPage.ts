import { expect, Locator, Page } from "@playwright/test";

export class ForgotPasswordPage {

    readonly page: Page
    readonly title: Locator
    readonly emailInputField: Locator
    readonly resetPasswordSuccessMessage: Locator
    readonly incorrectEmailError: Locator
    readonly resetPasswordButton: Locator
    readonly backToLoginPageButton: Locator

    constructor (page: Page) {
        this.page = page
        this.title = page.getByRole('heading', {name: "Reset password"})
        this.emailInputField = page.getByTestId('forgot-email-input')
        this.resetPasswordSuccessMessage = page.getByTestId('reset-success-message')
        this.incorrectEmailError = page.getByTestId('forgot-email-error')
        this.resetPasswordButton = page.getByTestId('reset-password-button')
        this.backToLoginPageButton = page.getByTestId('back-to-login-button')
    }

    async resetPasswordWithPrefilledEmail() {
        await expect(this.title).toBeVisible()
        await this.resetPasswordButton.click()
    }

    async resetPasswordUsingEmail(email: string) {
        await expect(this.title).toBeVisible()
        await this.emailInputField.fill(email)
        await this.resetPasswordButton.click()
    }

    async returnToLoginPage() {
        await this.backToLoginPageButton.click()
    }



}