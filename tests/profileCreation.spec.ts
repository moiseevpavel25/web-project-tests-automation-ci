import {test, expect} from '../fixtures/base'

test.describe('Profile creation flows', () => {

    test.beforeEach(async({page, loginPage}) => {

        await page.goto('/')
        await loginPage.loginWithCredentials("test@test.com", "qwerty123")
    })

    test('Create profile with all selected interests', async({profilePage, summaryPage}) => {
        //creating profile with all available intersts
        const profile = await profilePage.createProfile('Pavel', 'Moiss', '1991-05-10', 'Developer', [
            'Manual testing', 
            'Automation testing', 
            'Performance testing',
            'Localization testing',
            'API testing',
        ])

        //checking that summary page is displayed
        await expect(summaryPage.title).toBeVisible()

        //checking that all profile info is correct in summary text
        await expect(summaryPage.summaryText).toContainText(`${profile.firstName} ${profile.lastName}`)
        await expect(summaryPage.summaryText).toContainText(profile.age.toString())
        await expect(summaryPage.summaryText).toContainText(profile.occupation)
        
        for (const interest of profile.interests) {
            await expect(summaryPage.summaryText).toContainText(interest)
        }

        //checking that all profile info is correct in page metadata
        await expect(summaryPage.metaName).toContainText(`${profile.firstName} ${profile.lastName}`)
        await expect(summaryPage.metaAge).toContainText(profile.age.toString())
        await expect(summaryPage.metaOccupation).toContainText(profile.occupation)
        await expect(summaryPage.metaDateOfBirth).toContainText(profile.doB) 
        
        for (const interest of profile.interests) {
            await expect(summaryPage.metaInterestsList).toContainText(interest)
        }
    })


    test('Create profile with only one selected interest', async({profilePage, summaryPage}) => {
        //creating profile with only one selected interest
        const profile = await profilePage.createProfile('Pavel', 'Moiss', '1991-05-10', 'Developer', [
            'Manual testing', 
        ])

        //checking that summary page is displayed
        await expect(summaryPage.title).toBeVisible()

        //checking that all profile info is correct in summary text
        await expect(summaryPage.summaryText).toContainText(`${profile.firstName} ${profile.lastName}`)
        await expect(summaryPage.summaryText).toContainText(profile.age.toString())
        await expect(summaryPage.summaryText).toContainText(profile.occupation)
        
        for (const interest of profile.interests) {
            await expect(summaryPage.summaryText).toContainText(interest)
        }

        //checking that all profile info is correct in page metadata
        await expect(summaryPage.metaName).toContainText(`${profile.firstName} ${profile.lastName}`)
        await expect(summaryPage.metaAge).toContainText(profile.age.toString())
        await expect(summaryPage.metaOccupation).toContainText(profile.occupation)
        await expect(summaryPage.metaDateOfBirth).toContainText(profile.doB) 
        
        for (const interest of profile.interests) {
            await expect(summaryPage.metaInterestsList).toContainText(interest)
        }
    })

    test('Verify occupation dropdown contains all required options', async({profilePage}) => {
        //checking that occupation dropdown contains all required options
        await expect(profilePage.occupationDropdownList.locator('option')).toHaveText([
            "Your occupation", 
            "Writer", 
            "Engineer", 
            "Developer", 
            "Marketing", 
            "CEO", 
            "Designer", 
            "Doctor"
        ])
    })

    test.describe('Negative profile creation scenarios', () => {

        test('Check the empty input fields validation', async({profilePage}) => {
            //creating profile with empty input fields
            await profilePage.submitEmptyProfile()

            //checking that all validation messages are correct
            await expect(profilePage.firstNameError).toHaveText('Please enter your First name.')
            await expect(profilePage.lastNameError).toHaveText('Please enter your Last name.')
            await expect(profilePage.dateOfBirthError).toHaveText('Please enter your birth date.')
            await expect(profilePage.occupationError).toHaveText('Please enter your occupation.')
            await expect(profilePage.interestsError).toHaveText('Please choose at least one interest.')
        })

        //data driven test for incorrect first name validation
        const invalidFirstNameCases: { value: string, description: string }[] = [
        { value: 'Pavel De', description: 'spaces' },
        { value: 'Pavel123', description: 'numbers' },
        { value: 'Pavel@', description: 'special characters' },
    ]
        invalidFirstNameCases.forEach(({ value, description }) => {
        test(`Check the incorrect first name validation with ${description}`, async({ profilePage }) => {
            await profilePage.submitWithIncorrectFirstName(value)
            await expect(profilePage.firstNameError).toHaveText('Invalid First name format.')
        })
    })

        //data driven test for incorrect last name validation
        const invalidLastNameCases: { value: string, description: string }[] = [
        { value: 'Pavel De', description: 'spaces' },
        { value: 'Pavel123', description: 'numbers' },
        { value: 'Pavel@', description: 'special characters' },
    ]
        invalidLastNameCases.forEach(({ value, description }) => {
        test(`Check the incorrect last name validation with ${description}`, async({ profilePage }) => {
            await profilePage.submitWithIncorrectLastName(value)
            await expect(profilePage.lastNameError).toHaveText('Invalid Last name format.')
        })
    })
    })

})
