const { test, expect } = require('@playwright/test');
const {hello,helloWorld} = require('./demo/hello')
const { zstdCompress } = require('node:zlib')

console.log(hello())
console.log(helloWorld())

test('Hello World',async({page})=>{
    await page.goto('https://playwright.dev/')
    await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright')
})