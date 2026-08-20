 const {test, expect} = require('@playwright/test');
 const {POManager} = require('../page object/POManager.js');


 test('Client App login 1', async ({page})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
   
     const username = "pallavi@yopmail.com";
     const password = "Pallavi@123"
     const productName = 'Zara Coat 4';
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goToPage();
     await loginPage.validLogin(username,password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(productName);
     await dashboardPage.navigateToCart();

  

 });
 

 



 

