import {test, expect} from '../fixtures/base'

test.describe('Profile editing flows', () => {

    test.beforeEach(async({page, loginPage, profilePage}) => {
      
        //logging in before each test to get access to profile page
        await page.goto('/')
        await loginPage.loginWithCredentials("test@test.com", "qwerty123")
        //create a profile before each test to get access to profile editing functionality
        await profilePage.createProfile('Pavel', 'Moiss', '1991-05-10', 'Developer', [
            'Manual testing', 
            'Automation testing', 
            'Performance testing',
        ])
    })

    test('Edit profile with valid data', async({profilePage, summaryPage}) => {
        await summaryPage.goToProfileEditingPage()
        
        //editing profile with new valid data  
        const profile = await profilePage.createProfile('Igor', 'Smith', '1992-06-11', 'CEO', [
            'Localization testing', 
            'API testing',
        ])
       
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
})