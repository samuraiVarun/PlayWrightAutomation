import { test, expect } from '@playwright/test';

test('Handle New Tab', async ({ page }) => {

    await page.goto('https://playwright.dev');

    const [newPage] = await Promise.all([

        page.waitForEvent('popup'),

        page.getByRole('link', { name: 'GitHub repository' }).click()

    ]);

    await newPage.waitForLoadState();

    console.log("Parent URL :", page.url());

    console.log("Child URL :", newPage.url());

    await expect(newPage).toHaveURL(/github/);

});

//import { test, expect } from '@playwright/test';

test('New Page From Context', async ({ context, page }) => {

    await page.goto('https://playwright.dev');

    const [childPage] = await Promise.all([

        context.waitForEvent('page'),

        page.getByRole('link', {
            name: 'GitHub repository'
        }).click()

    ]);

    await childPage.waitForLoadState();

    console.log(childPage.url());

});

//import { test } from '@playwright/test';

test('Switch Tabs', async ({ page }) => {

    await page.goto('https://playwright.dev');

    const [child] = await Promise.all([

        page.waitForEvent('popup'),

        page.getByRole('link', {
            name: 'GitHub repository'
        }).click()

    ]);

    await child.waitForLoadState();

    console.log("Parent:", await page.title());

    console.log("Child :", await child.title());

    // Close child tab
    await child.close();

    // Parent is still active
    await page.bringToFront();

    console.log(await page.title());

});

//import { test } from '@playwright/test';

test('Count Pages', async ({ context, page }) => {

    await page.goto('https://playwright.dev');

    console.log(context.pages().length);

});

//import { test } from '@playwright/test';

test('Print All Open Pages', async ({ context }) => {

    const pages = context.pages();

    for (const page of pages) {

        console.log(await page.title());

    }

});

//import { test } from '@playwright/test';

test('Read Child Page Title', async ({ page }) => {

    await page.goto('https://playwright.dev');

    const [child] = await Promise.all([

        page.waitForEvent('popup'),

        page.getByRole('link', {
            name: 'GitHub repository'
        }).click()

    ]);

    await child.waitForLoadState();

    const title = await child.title();

    console.log(title);

    await child.close();

    console.log(await page.title());

});