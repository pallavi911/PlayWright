const { chromium } =  require('@playwright/test');
const { test, expect } =  require('@playwright/test');

test('record 2 demo',async ({ page,context }) => {
  // await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  // await page.locator('[data-test="password"]').press('Enter');
await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="item-4-title-link"]').click();
  await page.locator('[data-test="back-to-products"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  // await context.tracing.stop({ path: 'record_trace.zip' });
  // ---------------------
 
  
});