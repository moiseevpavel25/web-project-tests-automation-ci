import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page
    readonly title: Locator
    readonly emailInputField: Locator
    readonly incorrectEmailError: Locator
    readonly passwordInputField: Locator
    readonly incorrectPasswordError: Locator
    readonly forgotPasswordButton: Locator
    readonly signInButton: Locator

    constructor (page: Page) {
        this.page = page
        this.title = page.getByRole('heading', {name: "Welcome back"})
        this.emailInputField = page.getByTestId('login-email-input')
        this.incorrectEmailError = page.getByTestId('login-email-error')
        this.passwordInputField = page.getByTestId('login-password-input')
        this.incorrectPasswordError = page.getByTestId('login-password-error')
        this.forgotPasswordButton = page.getByTestId('forgot-password-link')
        this.signInButton = page.getByTestId('login-submit-button')
    }

    async loginWithCredentials(email: string, password: string) {
        await this.emailInputField.fill(email)
        await this.passwordInputField.fill(password)
        await this.signInButton.click()
    }

    async checkPlaceholdersInInputFields() {
        await expect (this.emailInputField).toHaveAttribute('placeholder',"Your email")
        await expect (this.passwordInputField).toHaveAttribute('placeholder',"Your password")
    }

    async goToForgotPasswordPageWithEmail(email: string) {
        await this.emailInputField.fill(email)
        await this.forgotPasswordButton.click()
    }

    async goToForgotPasswordPageWithoutEmail() {
        await this.forgotPasswordButton.click()
    }


}