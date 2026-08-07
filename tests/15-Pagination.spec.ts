import { test } from '@playwright/test';

test('Count Pagination', async ({ page }) => {

    await page.goto(
        'https://testautomationpractice.blogspot.com/'
    );

    const pages = page.locator('#pagination li');

    console.log(

        "Pages :",

        await pages.count()

    );

});

//import { test } from '@playwright/test';

test('Visit All Pages', async ({ page }) => {

    await page.goto(
        'https://testautomationpractice.blogspot.com/'
    );

    const pages = page.locator('#pagination li');

    const total = await pages.count();

    for (let i = 1; i <= total; i++) {

        await page.locator(

            `#pagination li:nth-child(${i}) a`

        ).click();

        console.log(

            "Visited Page",

            i

        );

    }

});