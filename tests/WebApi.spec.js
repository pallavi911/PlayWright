const { test, expect, request } = require('@playwright/test');
const { asyncWrapProviders } = require('async_hooks');
const {APIUtils} = require('./utils/APIUtils');

const loginPayload = { userEmail: "pallavi@yopmail.com", userPassword: "Pallavi@123" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let response ; 
// beforeAll : hook that is executed once per worker process before all tests.
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload)
    // 200, 201
    
    // create order 
     response = await apiUtils.createOrder(orderPayLoad);
})


test.beforeEach(async () => {

});

test.afterAll(async () => {

});


test("API test", async ({ page }) => {

    await page.addInitScript(value => {    // addInitScript is a fun that accept two argument. 1st is the function and 2nd is the parameter. here value accpt the parameter from the token and set it to local storage.
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();

    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});


