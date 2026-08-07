import { test, expect } from '@playwright/test';

test('Hover Example', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/hovers');

    const secondImage = page.locator('.figure').nth(1);

    await secondImage.hover();

    const profileLink = secondImage.getByRole('link', {
        name: 'View profile'
    });

    await expect(profileLink).toBeVisible();

    await profileLink.click();

    await expect(page).toHaveURL(/users\/2/);

});

//import { test, expect } from '@playwright/test';

test('Right Click Example', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/context_menu');

    page.on('dialog', async dialog => {

        console.log(dialog.message());

        await dialog.accept();

    });

    await page.locator('#hot-spot').click({

        button: 'right'

    });

});

//import { test, expect } from '@playwright/test';

test('Double Click Example', async ({ page }) => {

    await page.goto('https://demoqa.com/buttons');

    const button = page.getByRole('button', {

        name: 'Double Click'

    });

    await button.dblclick();

    await expect(page.locator('#doubleClickMessage'))

        .toContainText('double click');

});

//import { test } from '@playwright/test';

test('Coordinate Click', async ({ page }) => {

    await page.goto('https://demoqa.com/buttons');

    await page.mouse.click(

        300,

        250

    );

});

//import { test } from '@playwright/test';

test('Mouse Move', async ({ page }) => {

    await page.goto('https://playwright.dev');

    await page.mouse.move(

        200,

        400

    );

});

//import { test } from '@playwright/test';

test('Mouse Down Up', async ({ page }) => {

    await page.goto('https://playwright.dev');

    await page.mouse.move(200,200);

    await page.mouse.down();

    await page.mouse.move(400,200);

    await page.mouse.up();

});

//import { test } from '@playwright/test';

test('Slider Example', async ({ page }) => {

    await page.goto('https://demoqa.com/slider');

    const slider = page.locator('.range-slider');

    await slider.click();

    await slider.press('ArrowRight');

    await slider.press('ArrowRight');

    await slider.press('ArrowRight');

});

//import { test } from '@playwright/test';

test('Canvas Drawing', async ({ page }) => {

    await page.goto('https://paint.js.org/');

    await page.mouse.move(300,300);

    await page.mouse.down();

    await page.mouse.move(350,300);

    await page.mouse.move(400,320);

    await page.mouse.move(450,350);

    await page.mouse.up();

});