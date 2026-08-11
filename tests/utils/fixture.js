const base = require('@playwright/test');
const { request } = require('@playwright/test');
const { APIUtils } = require('./APIUtils.js');


// Use your actual EventHub credentials
const loginPayload = { userEmail: "pallavi@yopmail.com", userPassword: "Pallavi@123" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

exports.customTest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto('https://rahulshettyacademy.com/client');
            await page.locator('#userEmail').fill('pallavi@yopmail.com');
            await page.locator("#userPassword").fill('Pallavi@123');
            await page.locator("[value='Login']").click();
            await page.waitForLoadState('networkidle');
            await use(page);
            // tear down all code after use will be ececuted after the test is completed.
            await context.close();

        },
        createOrder: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APIUtils(apiContext, loginPayload);
            const response = await apiUtils.createOrder(orderPayLoad);
            await use(response);
            await apiContext.dispose();
        },

        testDataforOrder: {
            productName: "Adidas",
            country: "India",
        }

    })