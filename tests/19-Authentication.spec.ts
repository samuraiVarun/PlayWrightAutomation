import { test, expect } from '@playwright/test';

test('Login and Save Authentication State', async ({ page }) => {

    // Using Playwright Codegen demo website
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.locator('#user-name').fill('standard_user');

    await page.locator('#password').fill('secret_sauce');

    await page.locator('#login-button').click();

    // Verify successful login
    await expect(page).toHaveURL(/inventory/);

    await expect(page.locator('.title'))
        .toHaveText('Products');

    // Save login state
    await page.context().storageState({

        path: 'tests/auth/user.json'

    });

    console.log('Authentication State Saved Successfully');

});