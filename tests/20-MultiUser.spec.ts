import { test, expect } from '@playwright/test';

test('Multi User Browser Context Example', async ({ browser }) => {

    // -----------------------------
    // Create Admin Context
    // -----------------------------
    const adminContext = await browser.newContext();

    const adminPage = await adminContext.newPage();

    // -----------------------------
    // Create User Context
    // -----------------------------
    const userContext = await browser.newContext();

    const userPage = await userContext.newPage();

    // -----------------------------
    // Open SauceDemo in both contexts
    // -----------------------------
    await adminPage.goto('https://www.saucedemo.com/');

    await userPage.goto('https://www.saucedemo.com/');

    // -----------------------------
    // Login Admin
    // -----------------------------
    await adminPage.fill('#user-name', 'standard_user');

    await adminPage.fill('#password', 'secret_sauce');

    await adminPage.click('#login-button');

    await expect(adminPage.locator('.title'))
        .toHaveText('Products');

    console.log('Admin Logged In');

    // -----------------------------
    // Login User
    // -----------------------------
    await userPage.fill('#user-name', 'problem_user');

    await userPage.fill('#password', 'secret_sauce');

    await userPage.click('#login-button');

    await expect(userPage.locator('.title'))
        .toHaveText('Products');

    console.log('User Logged In');

    // -----------------------------
    // Verify Different URLs
    // -----------------------------
    console.log("Admin URL :", adminPage.url());

    console.log("User URL  :", userPage.url());

    // -----------------------------
    // Close Contexts
    // -----------------------------
    await adminContext.close();

    await userContext.close();

});


//import { test, expect } from '@playwright/test';

test('Context Isolation', async ({ browser }) => {

    const context1 = await browser.newContext();

    const context2 = await browser.newContext();

    const page1 = await context1.newPage();

    const page2 = await context2.newPage();

    await page1.goto('https://example.com');

    await page2.goto('https://example.com');

    await page1.evaluate(() => {

        localStorage.setItem("username", "Admin");

    });

    const value = await page2.evaluate(() => {

        return localStorage.getItem("username");

    });

    expect(value).toBeNull();

    await context1.close();

    await context2.close();

});

//import { test, expect } from '@playwright/test';

test('Multiple Authenticated Users', async ({ browser }) => {

    const adminContext = await browser.newContext({

        storageState: 'tests/auth/admin.json'

    });

    const userContext = await browser.newContext({

        storageState: 'tests/auth/user.json'

    });

    const admin = await adminContext.newPage();

    const user = await userContext.newPage();

    await admin.goto('https://www.saucedemo.com/inventory.html');

    await user.goto('https://www.saucedemo.com/inventory.html');

    await expect(admin.locator('.title'))
        .toHaveText('Products');

    await expect(user.locator('.title'))
        .toHaveText('Products');

    await adminContext.close();

    await userContext.close();

});