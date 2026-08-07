import { test, expect } from '@playwright/test';

test('Intercept Network Requests and Mock API Response', async ({ page }) => {

    // Intercept all API requests to users endpoint
    await page.route('https://jsonplaceholder.typicode.com/users', async route => {

        console.log('Original Request URL:', route.request().url());

        // Mock response
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([
                {
                    id: 1,
                    name: 'Varun',
                    username: 'varunb',
                    email: 'varun@test.com'
                },
                {
                    id: 2,
                    name: 'Playwright User',
                    username: 'pwuser',
                    email: 'playwright@test.com'
                }
            ])
        });

    });

    // Create a simple HTML page
    await page.setContent(`
        <!DOCTYPE html>
        <html>
        <body>

            <button id="loadUsers">Load Users</button>

            <ul id="users"></ul>

            <script>

                document.getElementById('loadUsers').addEventListener('click', async () => {

                    const response = await fetch('https://jsonplaceholder.typicode.com/users');

                    const users = await response.json();

                    const list = document.getElementById('users');

                    list.innerHTML = '';

                    users.forEach(user => {

                        const li = document.createElement('li');

                        li.textContent = user.name + ' - ' + user.email;

                        list.appendChild(li);

                    });

                });

            </script>

        </body>
        </html>
    `);

    // Click button to trigger API call
    await page.locator('#loadUsers').click();

    // Verify mocked data appears
    await expect(page.locator('#users li')).toHaveCount(2);

    await expect(page.locator('#users')).toContainText('Varun');

    await expect(page.locator('#users')).toContainText('Playwright User');

    console.log('Network interception successful.');

});