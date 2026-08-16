const chromium = require('@playwright/test');
const { test, expect } =  require('@playwright/test');

// test.only run this test and ignore all other tests
test.only('Login',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signInButton = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
await page.pause();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await userName.fill('rahulshetty');
    await page.locator("[type='password']").fill('Learning@830$3mK2');
    await signInButton.click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInButton.click();
    const allTitiles = await cardTitles.allTextContents();
    console.log(allTitiles);
    
})