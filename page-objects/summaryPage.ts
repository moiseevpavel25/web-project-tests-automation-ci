import { Locator, Page } from "@playwright/test";

export class SummaryPage {
    readonly page: Page
    readonly title: Locator
    readonly summaryText: Locator
    readonly metaName: Locator
    readonly metaAge: Locator
    readonly metaOccupation: Locator
    readonly metaDateOfBirth: Locator
    readonly metaInterestsList: Locator
    readonly editProfileButton: Locator
    readonly signOutButton: Locator

    constructor (page: Page) {
        this.page = page
        this.title = page.locator('.page-card').getByText('Profile Complete')
        this.summaryText = page.getByTestId('summary-text')
        this.metaName = page.getByTestId('summary-meta-name')
        this.metaAge = page.getByTestId('summary-meta-age')
        this.metaOccupation = page.getByTestId('summary-meta-occupation')
        this.metaDateOfBirth = page.getByTestId('summary-meta-dob')
        this.metaInterestsList = page.getByTestId('summary-interests-chips')
        this.editProfileButton = page.getByTestId('summary-edit-button')
        this.signOutButton = page.getByTestId('summary-logout-button')
    }

    async goToProfileEditingPage() {
        await this.editProfileButton.click()
    }

    async signOut() {
        await this.signOutButton.click()
    }


}