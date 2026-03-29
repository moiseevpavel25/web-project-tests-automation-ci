import { Locator, Page } from "@playwright/test";
import { calculateAge } from "../tests/utils/dateHelper";

export class ProfilePage {

    readonly page: Page
    readonly title: Locator
    readonly firstNameInputField: Locator
    readonly lastNameInputField: Locator
    readonly dateOfBirthPicker: Locator
    readonly occupationDropdownList: Locator
    readonly interestsGroupBlock: Locator
    readonly submitProfileButton: Locator

    readonly firstNameError: Locator
    readonly lastNameError: Locator
    readonly dateOfBirthError: Locator
    readonly occupationError: Locator
    readonly interestsError: Locator

    constructor (page: Page) {
        this.page = page
        this.title = page.getByRole('heading', {name: "Please tell us about yourself"})
        this.firstNameInputField = page.getByTestId('profile-first-name-input')
        this.lastNameInputField = page.getByTestId('profile-last-name-input')
        this.dateOfBirthPicker = page.getByTestId('profile-dob-input')
        this.occupationDropdownList = page.getByTestId('profile-occupation-select')
        this.interestsGroupBlock = page.getByTestId('profile-interests-group')
        this.submitProfileButton = page.getByTestId('profile-submit-button')

        this.firstNameError = page.getByTestId('profile-first-name-error')
        this.lastNameError = page.getByTestId('profile-last-name-error')
        this.dateOfBirthError = page.getByTestId('profile-dob-error')
        this.occupationError = page.getByTestId('profile-occupation-error')
        this.interestsError = page.getByTestId('profile-interests-error')
    }

    async createProfile(firstName: string, lastName: string, doB: string, occupation: string, interests: string[]) { 
        await this.firstNameInputField.fill(firstName)
        await this.lastNameInputField.fill(lastName)
        await this.dateOfBirthPicker.fill(doB)
        await this.occupationDropdownList.selectOption(occupation)

        for (const interest of interests) {
            await this.interestsGroupBlock.getByText(interest).check()
        }

        await this.submitProfileButton.click()
        const age = calculateAge(doB)
        return { firstName, lastName, doB, occupation, interests, age }
    }

    async submitEmptyProfile() {
        await this.submitProfileButton.click()
    }

    async submitWithIncorrectFirstName(firstName: string) {
        await this.firstNameInputField.fill(firstName)
        await this.submitProfileButton.click()
    }

    async submitWithIncorrectLastName(lastName: string) {
        await this.lastNameInputField.fill(lastName)
        await this.submitProfileButton.click()
    }
}