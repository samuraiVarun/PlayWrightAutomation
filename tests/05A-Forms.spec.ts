import { test, expect } from '@playwright/test';

test('Forms Automation', async ({ page }) => {

    await page.goto('https://demoqa.com/automation-practice-form');

    // -------------------------
    // Text Boxes
    // -------------------------

    await page.getByPlaceholder('First Name').fill('Varun');

    await page.getByPlaceholder('Last Name').fill('B');

    await page.locator('#userEmail')
        .fill('varun@test.com');

    // -------------------------
    // Radio Button
    // -------------------------

    await page.locator('label[for="gender-radio-1"]')
        .click();

    // -------------------------
    // Mobile Number
    // -------------------------

    await page.locator('#userNumber')
        .fill('9876543210');

    // -------------------------
    // Subjects
    // -------------------------

    await page.locator('#subjectsInput')
        .fill('Computer Science');

    await page.keyboard.press('Enter');

    // -------------------------
    // Checkbox
    // -------------------------

    await page.locator('label[for="hobbies-checkbox-1"]')
        .click();

    await page.locator('label[for="hobbies-checkbox-2"]')
        .click();

    // -------------------------
    // Current Address
    // -------------------------

    await page.locator('#currentAddress')
        .fill('Hyderabad');

    // -------------------------
    // Verify Submit Button
    // -------------------------

    await expect(page.locator('#submit'))
        .toBeEnabled();

});