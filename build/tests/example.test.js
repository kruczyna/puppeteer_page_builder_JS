"use strict";

var _mochaSteps = require("mocha-steps");

var _chai = require("chai");

var _builder = require("../builder");

var _builder2 = _interopRequireDefault(_builder);

var _LoginPage = require("../pages/LoginPage");

var _LoginPage2 = _interopRequireDefault(_LoginPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import puppeteer from "puppeteer";
describe('Mocha steps', function () {
    // let browser
    var page = void 0;
    // let mobile
    var loginPage = void 0;

    before(async function () {
        //    browser = await puppeteer.launch({headless: true})
        page = await _builder2.default.build('DESKTOP');
        loginPage = await new _LoginPage2.default(page);
        //    mobile = await Page.build('MOBILE')
        //    await page.setDefaultTimeout(5000)
    });

    after(async function () {
        await page.close();
        //    await mobile.close()
        //    await browser.close()
    });

    (0, _mochaSteps.step)('should load homepage', async function () {
        await page.goto('http://zero.webappsecurity.com/');
        (0, _chai.expect)((await page.isElementVisible('#signin_button'))).to.be.true;
    });

    (0, _mochaSteps.step)('should display login form', async function () {
        await page.waitAndClick('#signin_button');
        (0, _chai.expect)((await page.isElementVisible('#signin_button'))).to.be.false;
        (0, _chai.expect)((await page.isElementVisible('#login_form'))).to.be.true;
    });

    (0, _mochaSteps.step)('should login to app', async function () {
        await loginPage.login('username', 'password');
        // await page.waitAndType('#user_login', "username")
        // await page.waitAndType('#user_password', "password")
        // await page.waitAndClick('.btn-primary')
        (0, _chai.expect)((await page.isElementVisible('.nav-tabs'))).to.be.true;
    });

    (0, _mochaSteps.step)('should have six navbar links', async function () {
        (0, _chai.expect)((await page.getCount('.nav-tabs li'))).to.equal(6);
    });
});