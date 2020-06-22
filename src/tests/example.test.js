// import puppeteer from "puppeteer";
import { step } from "mocha-steps";
import { expect } from "chai"
import Page from '../builder'
import LoginPage from '../pages/LoginPage'

describe('Mocha steps', () => {
    // let browser
    let page
    // let mobile
    let loginPage

    before(async() => {
    //    browser = await puppeteer.launch({headless: true})
        page = await Page.build('DESKTOP')
        loginPage = await new LoginPage(page)
    //    mobile = await Page.build('MOBILE')
    //    await page.setDefaultTimeout(5000)
    })

    after(async() => {
        await page.close()
        //    await mobile.close()
        //    await browser.close()
    })

    step('should load homepage', async () => {
        await page.goto('http://zero.webappsecurity.com/')
        expect(await page.isElementVisible('#signin_button')).to.be.true
    })

    step('should display login form', async() => {
        await page.waitAndClick('#signin_button')
        expect(await page.isElementVisible('#signin_button')).to.be.false
        expect(await page.isElementVisible('#login_form')).to.be.true
    })

    step('should login to app', async() => {
        await loginPage.login('username', 'password')
        // await page.waitAndType('#user_login', "username")
        // await page.waitAndType('#user_password', "password")
        // await page.waitAndClick('.btn-primary')
        expect(await page.isElementVisible('.nav-tabs')).to.be.true
    })

    step('should have six navbar links', async() => {
        expect(await page.getCount('.nav-tabs li')).to.equal(6)
    })

})