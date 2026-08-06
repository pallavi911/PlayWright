const chromium = require('@playwright/test');
const {test, expect} = require('@playwright/test');

test('UI controls',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signInButton = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userName.fill('rahulshetty');
    await page.locator("[type='password']").fill('Learning@830$3mK2');

    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
   // assertion for checking that radiobtn is checked or not?
   console.log(await page.locator('.radiotextsty').last().isChecked());
   await expect(page.locator('.radiotextsty').last()).toBeChecked();
   
   await page.locator('#terms').click();
   await expect(page.locator('#terms')).toBeChecked();

   await expect(documentLink).toHaveAttribute('class', 'blinkingText'); // toHaveAttribute check that blinkingtext class is present or not
   await signInButton.click();
    await page.pause();
});

test.only('Handle Child window',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
//     const signInButton = page.locator('#signInBtn');
//     const cardTitles = page.locator('.card-body a');   
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), // listen for new page created. Either pending or rejected or fullfilled
            documentLink.click()
        ]); //newPage is opened these two steps are performed parallelly and retruns newPage when promises are fullfilled successfully
    //console.log(await newPage.locator(".red").textContent());
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split(" ")[0];

    await page.locator('#username').type(domain);
    
    await page.pause();


})
