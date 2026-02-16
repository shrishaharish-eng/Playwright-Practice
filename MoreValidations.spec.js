import { test, expect } from '@playwright/test';

test('Popup Validations', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //accepts any dialog/alerts
    page.on('dialog', dialog => dialog.accept());

    // page.on('dialog', dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click()

    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
})
