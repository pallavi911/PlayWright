const { test, expect } =  require('@playwright/test');

test.only('Client app login',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const products = page.locator('.card-body '); 
    const productName = "ZARA COAT 3"  
    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder('email@example.com').fill('pallavi.aspirefox@gmail.com');
    await page.getByPlaceholder("enter your passsword").fill('Pallavi@123');
    await page.getByRole("button" , {name: 'Login'}).click();
    
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();

    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();

    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button",{name :"Checkout"}).click();
    // fill the country name form auto suggestive dropdown
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button",{name :"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
  
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   console.log(orderIdDetails);
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

   await page.pause();
    // const documentLink = page.locator("[href*='documents-request']");
});