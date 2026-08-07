import { test, expect } from '@playwright/test';

test.use({

    storageState: 'tests/auth/user.json'

});

test('Reuse Login Session', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/inventory.html');

    await expect(page.locator('.title'))

        .toHaveText('Products');

    console.log("Login Reused Successfully");

});