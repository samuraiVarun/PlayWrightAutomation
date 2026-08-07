import { test, expect } from '@playwright/test';

test('Native Date Picker', async ({ page }) => {

    await page.goto('https://demoqa.com/date-picker');

    await page.locator('#datePickerMonthYearInput')

        .fill('12/25/2026');

    await page.keyboard.press('Enter');

    await expect(

        page.locator('#datePickerMonthYearInput')

    ).toHaveValue('12/25/2026');

});

//import { test } from '@playwright/test';

test('React Calendar', async ({ page }) => {

    await page.goto(

        'https://demoqa.com/date-picker'

    );

    await page.locator(

        '#datePickerMonthYearInput'

    ).click();

    await page.locator(

        '.react-datepicker__year-select'

    ).selectOption('2028');

    await page.locator(

        '.react-datepicker__month-select'

    ).selectOption('2');

    await page.locator(

        '.react-datepicker__day--015'

    ).click();

});

//import { test } from '@playwright/test';

test('Calendar Example', async ({ page }) => {

    await page.goto(

        'https://rahulshettyacademy.com/seleniumPractise/#/offers'

    );

    await page.locator(

        '.react-date-picker__inputGroup'

    ).click();

    while (

        await page.locator(

            '.react-calendar__navigation__label'

        ).textContent()

        !== 'November 2027'

    ) {

        await page.locator(

            '.react-calendar__navigation__next-button'

        ).click();

    }

    await page.getByText('20', {

        exact: true

    }).click();

});