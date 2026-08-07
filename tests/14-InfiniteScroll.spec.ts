import { test } from '@playwright/test';

test('Mouse Wheel Scroll', async ({ page }) => {

    await page.goto(
        'https://the-internet.herokuapp.com/infinite_scroll'
    );

    await page.mouse.wheel(0, 1000);

});

//import { test } from '@playwright/test';

test('Scroll Bottom', async ({ page }) => {

    await page.goto(
        'https://the-internet.herokuapp.com/infinite_scroll'
    );

    await page.evaluate(() => {

        window.scrollTo(

            0,

            document.body.scrollHeight

        );

    });

});

//import { test } from '@playwright/test';

test('Scroll Into View', async ({ page }) => {

    await page.goto(
        'https://playwright.dev'
    );

    await page

        .locator('text=Node.js')

        .scrollIntoViewIfNeeded();

});

//import { test } from '@playwright/test';

test('Infinite Scroll', async ({ page }) => {

    await page.goto(
        'https://the-internet.herokuapp.com/infinite_scroll'
    );

    for (let i = 0; i < 10; i++) {

        await page.mouse.wheel(

            0,

            1500

        );

        await page.waitForTimeout(500);

    }

});