import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('Download File', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/download');

    // Start waiting BEFORE clicking
    const downloadPromise = page.waitForEvent('download');

    // Click downloadable file
    await page.getByRole('link', {
        name: 'some-file.txt'
    }).click();

    // Capture download object
    const download = await downloadPromise;

    // Save file
    const filePath = path.join(
        process.cwd(),
        'tests/downloads',
        await download.suggestedFilename()
    );

    await download.saveAs(filePath);

    // Verify file exists
    expect(fs.existsSync(filePath)).toBeTruthy();

    console.log(filePath);

});