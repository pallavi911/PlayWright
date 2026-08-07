const { test, expect } =  require('@playwright/test');

test('alert',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on("dialog", dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    
});