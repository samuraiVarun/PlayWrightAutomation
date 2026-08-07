import { test, expect } from '@playwright/test';

test('Handle Native Dropdown', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dropdown');

    // Select by visible text
    await page.locator('#dropdown').selectOption({
        label: 'Option 1'
    });

    await expect(page.locator('#dropdown')).toHaveValue('1');

    // Select by value
    await page.locator('#dropdown').selectOption('2');

    await expect(page.locator('#dropdown')).toHaveValue('2');

    // Select by index
    await page.locator('#dropdown').selectOption({
        index: 1
    });

});

//import { test, expect } from '@playwright/test';

test('Handle Auto Suggestion', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/dropdownsPractise/');

    await page.locator('#autosuggest').fill('Ind');

    const suggestions = page.locator('.ui-menu-item');

    await expect(suggestions.first()).toBeVisible();

    const count = await suggestions.count();

    console.log(`Suggestions Found: ${count}`);

    for (let i = 0; i < count; i++) {

        const suggestion = suggestions.nth(i);

        const text = await suggestion.textContent();

        console.log(text);

        if (text?.trim() === 'India') {

            await suggestion.click();

            break;

        }

    }

    await expect(page.locator('#autosuggest')).toHaveValue('India');

});