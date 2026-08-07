import { test, expect } from '@playwright/test';

test('Simple Drag and Drop', async ({ page }) => {

    await page.goto('https://demoqa.com/droppable');

    await page.dragAndDrop(
        '#draggable',
        '#droppable'
    );

    await expect(page.locator('#droppable'))
        .toContainText('Dropped!');

});

//import { test } from '@playwright/test';

test('Manual Drag', async ({ page }) => {

    await page.goto('https://demoqa.com/droppable');

    const source = page.locator('#draggable');

    const target = page.locator('#droppable');

    const sourceBox = await source.boundingBox();

    const targetBox = await target.boundingBox();

    if (sourceBox && targetBox) {

        await page.mouse.move(

            sourceBox.x + sourceBox.width / 2,

            sourceBox.y + sourceBox.height / 2

        );

        await page.mouse.down();

        await page.mouse.move(

            targetBox.x + targetBox.width / 2,

            targetBox.y + targetBox.height / 2

        );

        await page.mouse.up();

    }

});

//import { test, expect } from '@playwright/test';

test('jQuery Drag and Drop', async ({ page }) => {

    await page.goto('https://jqueryui.com/droppable/');

    const frame = page.frameLocator('.demo-frame');

    await frame.locator('#draggable')
        .dragTo(frame.locator('#droppable'));

    await expect(frame.locator('#droppable'))
        .toContainText('Dropped!');

});