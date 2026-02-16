const {test, expect} = require('@playwright/test');

test('Client App Login', async ({browser})=>{
    const email = "TimVitry@gmail.com";
    const context = await  browser.newContext();
    const page = await context.newPage();
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("TimVitry@gmail.com100");
    await page.getByRole("button", {name: 'Login'}).click();
    
    //extracting title of first product
    // console.log(await page.locator(".card-body b").first().textContent());

    await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());

    // const count = await products.count();
    // for(let i=0; i < count; ++i){
    //     if(await products.nth(i).locator("b").textContent() == productName) {
    //         await products.nth(i).locator("text= Add To Cart").click();
    //         break;
    //     }
    // }

    await page.locator(".card-body").filter({hasText:productName}).getByRole("button", {name: 'Add To Cart'}).click();
    
    // await page.locator("[routerlink*='cart']").click();
    await page.getByRole("listitem").getByRole("button" , {name: 'Cart'}).click();

    await page.locator("div li").first().waitFor();
    // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    // expect(bool).toBeTruthy();
    await expect(page.getByText(productName)).toBeVisible();

    // await page.locator("text=Checkout").click();
    await page.getByRole("button", {name:'Checkout'}).click();

    //Personal Info
    // await page.locator(".input.ddl").nth(0).selectOption("05");
    // await page.locator(".input.ddl").nth(1).selectOption("30");
    //Shipping Info
    // await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });
    const options = page.locator("section.ta-results");
    await options.waitFor();
    // const optionsCount = await options.locator("button").count();
    // for(let i=0; i<optionsCount; ++i){
    //      const text = await options.locator("button").nth(i).textContent();
    //      if(text === " India"){
    //         await options.locator("button").nth(i).click();
    //         break;
    //      }
    // }

    await page.getByRole("button", {name:"India"}).nth(1).click();

    expect(page.locator(".user__name label")).toHaveText(email);
    // await page.locator(".action__submit").click();
    await page.getByText("PLACE ORDER").click();
    // await page.pause();
    
    // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    const OrderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(OrderID)

    await page.locator("button[routerlink*='myorders']").click();
    const TotalOrders = page.locator("tbody tr");
    await TotalOrders.first().waitFor();
    const TotalOrdersCount = await TotalOrders.count();
    for(let i=0; i<TotalOrdersCount; ++i){
        const orderIdText = await TotalOrders.locator("th").nth(i).textContent();
        if(OrderID.includes(orderIdText)){
            await TotalOrders.locator("td .btn.btn-primary").nth(i).click();
            break;
        }
    }
    // await page.pause();
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(OrderID.includes(orderIdDetails)).toBeTruthy();
});
