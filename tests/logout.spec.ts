import {test, expect} from '../fixtures/base'


test.describe('Logout flows', () => {

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

    test('Logout flow', async({loginPage, summaryPage}) => {

        await summaryPage.signOut()
        //checking that user is redirected to login page after logout
        await expect(loginPage.title).toBeVisible()
    })
})