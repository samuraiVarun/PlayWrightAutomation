import { test, expect } from '@playwright/test';

test('Handle JavaScript Alert', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    // Register dialog listener BEFORE clicking
    page.on('dialog', async dialog => {

        console.log("Type :", dialog.type());
        console.log("Message :", dialog.message());

        await dialog.accept();

    });

    await page.getByRole('button', {
        name: 'Click for JS Alert'
    }).click();

    await expect(page.locator('#result'))
        .toHaveText('You successfully clicked an alert');

});

//import { test, expect } from '@playwright/test';

test('Accept Confirmation Dialog', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        console.log(dialog.type());

        console.log(dialog.message());

        await dialog.accept();

    });

    await page.getByRole('button', {
        name: 'Click for JS Confirm'
    }).click();

    await expect(page.locator('#result'))
        .toHaveText('You clicked: Ok');

});

//import { test, expect } from '@playwright/test';

test('Dismiss Confirmation Dialog', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        await dialog.dismiss();

    });

    await page.getByRole('button', {
        name: 'Click for JS Confirm'
    }).click();

    await expect(page.locator('#result'))
        .toHaveText('You clicked: Cancel');

});

//import { test, expect } from '@playwright/test';

test('Handle Prompt Dialog', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        console.log(dialog.type());

        console.log(dialog.message());

        await dialog.accept('Varun');

    });

    await page.getByRole('button', {
        name: 'Click for JS Prompt'
    }).click();

    await expect(page.locator('#result'))
        .toContainText('Varun');

});

//import { test } from '@playwright/test';

test('Dialog Details', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        console.log("==============");

        console.log("Type :", dialog.type());

        console.log("Message :", dialog.message());

        console.log("Default Value :", dialog.defaultValue());

        await dialog.accept();

    });

    await page.locator("text=Click for JS Alert").click();

});