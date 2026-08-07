import { test, expect } from '@playwright/test';

test('Playwright Wait Examples', async ({ page }) => {

    // Open Website
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    // Wait for page to finish loading
    await page.waitForLoadState('load');

    // Click Start button
    await page.locator('button').click();

    // Wait for loading spinner to disappear
    await page.locator('#loading').waitFor({
        state: 'hidden'
    });

    // Verify text
    await expect(page.locator('#finish')).toHaveText('Hello World!');

    console.log(await page.locator('#finish').textContent());

});