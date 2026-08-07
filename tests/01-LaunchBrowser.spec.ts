import { test, expect } from '@playwright/test';

test('Handle Alerts', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        console.log("Alert Message:", dialog.message());

        expect(dialog.message()).toContain("I am a JS Alert");

        await dialog.accept();

    });

    await page.locator("text=Click for JS Alert").click();

    await expect(page.locator("#result")).toHaveText(
        "You successfully clicked an alert"
    );

});