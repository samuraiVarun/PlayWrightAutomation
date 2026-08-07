import { test, expect } from '@playwright/test';

test('Web Table Operations', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/tables');

    // Locate the first table
    const table = page.locator('#table1');

    // Locate rows
    const rows = table.locator('tbody tr');

    // Locate headers
    const headers = table.locator('thead th');

    console.log('Total Rows :', await rows.count());
    console.log('Total Columns :', await headers.count());

    // Print Header Names
    console.log('------ HEADERS ------');

    const headerCount = await headers.count();

    for (let i = 0; i < headerCount; i++) {

        console.log(await headers.nth(i).textContent());

    }

    // Print Entire Table
    console.log('------ TABLE DATA ------');

    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {

        const cells = rows.nth(i).locator('td');

        const columnCount = await cells.count();

        let rowText = '';

        for (let j = 0; j < columnCount; j++) {

            rowText += await cells.nth(j).textContent() + ' | ';

        }

        console.log(rowText);

    }

});


//import { test } from '@playwright/test';

test('Find Specific Row', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/tables');

    const rows = page.locator('#table1 tbody tr');

    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {

        const row = rows.nth(i);

        const text = await row.textContent();

        if (text?.includes('Jason')) {

            console.log(await row.locator('td').nth(2).textContent());

            break;

        }

    }

});

//import { test } from '@playwright/test';

test('Click Edit', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/tables');

    const rows = page.locator('#table1 tbody tr');

    const count = await rows.count();

    for (let i = 0; i < count; i++) {

        const row = rows.nth(i);

        if ((await row.textContent())?.includes('Frank')) {

            await row.getByRole('link', { name: 'edit' }).click();

            break;

        }

    }

});

//import { test } from '@playwright/test';

test('Delete Specific User', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/tables');

    const rows = page.locator('#table1 tbody tr');

    const count = await rows.count();

    for (let i = 0; i < count; i++) {

        const row = rows.nth(i);

        if ((await row.textContent())?.includes('Jason')) {

            await row.getByRole('link', { name: 'delete' }).click();

            break;

        }

    }

});

//import { test } from '@playwright/test';

test('Calculate Total Due', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/tables');

    const rows = page.locator('#table1 tbody tr');

    const count = await rows.count();

    let total = 0;

    for (let i = 0; i < count; i++) {

        const amount = await rows.nth(i).locator('td').nth(3).textContent();

        const value = Number(amount?.replace('$', ''));

        total += value;

    }

    console.log("Total Due =", total);

});