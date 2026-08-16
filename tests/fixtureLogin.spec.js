const {test,expect, request} = require('@playwright/test');
const {customTest} = require('./utils/fixture.js');

customTest('custom Login Fixture', async ({authenticatedPage,createOrder , testDataforOrder }) => {
        await authenticatedPage.goto('https://rahulshettyacademy.com/client');
        await authenticatedPage.locator("button[routerlink*='myorders']").click();
        await authenticatedPage.locator("tbody").waitFor();
        await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
        console.log(testDataforOrder.productName);


});