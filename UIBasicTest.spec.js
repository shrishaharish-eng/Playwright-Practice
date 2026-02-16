const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

// test('First Playwright Test', async ({page})=>{
//     await page.goto("https://www.google.com/");
//     console.log(await page.title());
//     await expect(page).toHaveTitle("Google");
// });

// Login automation - invalid credentials
test('Login', async ({browser})=>{
    const context = await  browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await page.locator("#signInBtn").click();
    // Playwright will auto wait for the following error text
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //Login with valid credentials and then extracting product text in home page
    await page.locator("#username").fill("");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#signInBtn").click();
    //extracting title of first product
    console.log(await page.locator(".card-body a").first().textContent());
    //extracting title of second product
    console.log(await page.locator(".card-body a").nth(1).textContent());

    //To grab text of all elements in case multiple elements are matching with the locator
    // Note there is no auto wait for allTextContents() as per Playwright Doc
    console.log(await page.locator(".card-body a").allTextContents());
});

test('UI Controls', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    //Handling static dropdown
    await dropdown.selectOption("consult")
    //radio button
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();

    //Check checkbox
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    
    //Uncheck checkbox
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();


    expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test.only('Multiple Tabs', async ({browser})=>{
    const context = await  browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all (
        [
            context.waitForEvent('page'),
            documentLink.click()
        ]
    );

    let text = await newPage.locator("p.red").textContent();
    console.log(text);

    //Splitting text
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    //await page.pause();
});
