const { chromium } =  require('@playwright/test');
const { test, expect } =  require('@playwright/test');

let context;
let page;
 // hook that is executed once per worker process before all tests.
test.beforeAll(async ({browser}) => {
  context = await browser.newContext();
 
    page = await context.newPage();
});

// hook that is executed once per worker process after all tests.
// test.afterAll(async () => {
//   await context.tracing.stop({ path: 'hooks_trace.zip' });
// });

// test('Hello World',async({})=>{
//     await page.goto('https://playwright.dev/')
//     await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright')
// })

// test('get started link', async ({}) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
