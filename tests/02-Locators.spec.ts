import { test, expect } from '@playwright/test';

test('Playwright Locator Examples', async ({ page }) => {

    // Open website
    await page.goto('https://demo.playwright.dev/todomvc');

    // ----------------------------
    // 1. getByPlaceholder()
    // ----------------------------
    const todoInput = page.getByPlaceholder('What needs to be done?');

    await todoInput.fill('Learn Playwright');

    await todoInput.press('Enter');

    await todoInput.fill('Practice TypeScript');

    await todoInput.press('Enter');

    await todoInput.fill('Attend Interview');

    await todoInput.press('Enter');

    // ----------------------------
    // 2. getByText()
    // ----------------------------
    await expect(page.getByText('Learn Playwright')).toBeVisible();

    // ----------------------------
    // 3. locator()
    // ----------------------------
    const allTodos = page.locator('.todo-list li');

    console.log("Total Todos :", await allTodos.count());

    // ----------------------------
    // 4. nth()
    // ----------------------------
    await expect(allTodos.nth(0)).toContainText('Learn Playwright');

    await expect(allTodos.nth(1)).toContainText('Practice TypeScript');

    // ----------------------------
    // 5. first()
    // ----------------------------
    await allTodos.first().click();

    // ----------------------------
    // 6. last()
    // ----------------------------
    await allTodos.last().click();

    // ----------------------------
    // 7. filter()
    // ----------------------------
    const interviewTodo = allTodos.filter({

        hasText: 'Attend Interview'

    });

    await expect(interviewTodo).toBeVisible();

    // ----------------------------
    // 8. locator chaining
    // ----------------------------
    const checkbox = interviewTodo.locator('.toggle');

    await checkbox.check();

    // ----------------------------
    // 9. Verify completed item
    // ----------------------------
    await expect(interviewTodo).toHaveClass(/completed/);

    // ----------------------------
    // 10. Print all Todos
    // ----------------------------
    const count = await allTodos.count();

    for (let i = 0; i < count; i++) {

        console.log(await allTodos.nth(i).textContent());

    }

});