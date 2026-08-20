const { test, expect } =  require('@playwright/test');

test('Client app login',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const products = page.locator('.card-body '); 
    const productName = "ZARA COAT 3"  
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('pallavi.aspirefox@gmail.com');
    await page.locator("#userPassword").fill('Pallavi@123');
    await page.locator("[value='Login']").click();
    
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    
    const count = await products.count();

    for(let i= 0; i< count; ++i){
        if(await products.nth(i).locator("b").textContent() === productName){           
            await products.nth(i).locator("text= Add To Cart").click(); // add the desired product in the cart.
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const visible = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // check item is present in the cart
    expect(visible).toBeTruthy();

    await page.locator("text=Checkout").click();
    // fill the country name form auto suggestive dropdown
    await page.locator("[placeholder*='Country']").type("ind",{delay:100})  // pressSequentially can be used here to enter value char by char

    const cntryOptions = page.locator('.ta-results');
    await cntryOptions.waitFor();
    const optionCount = await cntryOptions.locator("button").count()

    for(let i= 0; i< optionCount; ++i){
        if(await cntryOptions.locator("button").nth(i).textContent() === ' India'){           
            await cntryOptions.locator("button").nth(i).click(); // add the desired product in the cart.
            break;
        }
    }
   
   expect(page.locator(".user__name [type='text']").first()).toHaveText('pallavi.aspirefox@gmail.com');
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
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