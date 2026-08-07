import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');



  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();



  await page.screenshot({ path: 'tests/screenshots/screenshot.png' });

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  await page.screenshot({ path: 'tests/screenshots/scrrenshot2.png' })
});


test('This is for Uploads', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/upload-download-test/');


  await page.locator('#fileinput').setInputFiles('tests/Book1.xlsx');

  const [FileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    await page.locator('#fileinput').click()
  ]);

  await FileChooser.setFiles('tests/Book1.xlsx');


});

test('automates the Web Table Example', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  const table = page.locator("table#product[name='courses']");
  await expect(table).toBeVisible();

  const headerCells = table.locator('tbody tr th');
  await expect(headerCells.nth(1)).toHaveText('Course');
  await expect(headerCells.nth(0)).toHaveText('Instructor');
  await expect(headerCells.nth(2)).toHaveText('Price');

  const rows = table.locator('tbody tr');
  const rowCount = await rows.count();
  expect(rowCount).toBeGreaterThan(0);

  await expect(rows.nth(1).locator('td').nth(1)).toContainText('Selenium');
  await expect(rows.nth(1).locator('td').nth(2)).toContainText(/\d+/);
});

test('Handle iframe', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  // Locate the iframe
  const frameElement = page.locator('#courses-iframe');

  // Scroll until iframe is visible
  await frameElement.scrollIntoViewIfNeeded();

  // Access the frame
  const frame = page.frameLocator('#courses-iframe ');

  // Perform actions inside iframe
  await frame.getByRole('link', { name: 'All Access Plan' }).click();
   //  await frame.locator("a[href='lifetime-access']").click();
});

//import { test, expect } from '@playwright/test';

test('Switch Tab Example', async ({ page, context }) => {

  // Navigate to application
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  // Wait for the new tab while clicking
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('#opentab').click()
  ]);

  // Wait until the new page loads
  await newPage.waitForLoadState();

  // Verify URL
  await expect(newPage).toHaveURL(/qaclickacademy/);

  // Verify Title
  await expect(newPage).toHaveTitle(/QAClick Academy - A Testing Academy to Learn, Earn and Shine/);

  // Verify heading exists
  await expect(
    newPage.locator('h2').filter({ hasText: 'Featured Courses' })
  ).toBeVisible();

  // Close the new tab
  await newPage.close();

  // Verify original page is still active
  await expect(page).toHaveURL(
    'https://rahulshettyacademy.com/AutomationPractice/'
  );
});

//import { test, expect } from '@playwright/test';

test('Switch Window Example', async ({ page, context }) => {

  // Navigate to application
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  // Wait for the new window while clicking
  const [newWindow] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('#openwindow').click()
  ]);

  // Wait for the new window to load
  // await newWindow.waitForLoadState('domcontentloaded');
  await newWindow.waitForLoadState();

  // Verify URL
  await expect(newWindow).toHaveURL(/qaclickacademy/);

  // Verify Title
  await expect(newWindow).toHaveTitle(
    /QAClick Academy - A Testing Academy to Learn, Earn and Shine/
  );

  // Verify heading
  await expect(
    newWindow.locator('h2').filter({ hasText: 'Featured Courses' })
  ).toBeVisible();

  // Close the new window
  await newWindow.close();

  // Verify original page is still active
  await expect(page).toHaveURL(
    'https://rahulshettyacademy.com/AutomationPractice/'
  );

  await expect(page.locator('#openwindow')).toBeVisible();
});

//import { test, expect } from '@playwright/test';

test('OAuth API Flow', async ({ request }) => {

  // Step 1: Generate Access Token
  const tokenResponse = await request.post(
    'https://rahulshettyacademy.com/oauthapi/oauth2/resourceOwner/token',
    {
      form: {
        client_id: '692183103107-p0m7ent2hk7suguv4vq22hjcfhcr43pj.apps.googleusercontent.com',
        client_secret: 'erZOWM9g3UtwNRj340YYaK_W',
        grant_type: 'client_credentials',
        scope: 'trust'
      }
    }
  );

  expect(tokenResponse.ok()).toBeTruthy();

  const tokenJson = await tokenResponse.json();

  console.log(tokenJson);

  const accessToken = tokenJson.access_token;

  console.log("Access Token : ", accessToken);

  // Step 2: Call Protected API

  const courseResponse = await request.get(
    `https://rahulshettyacademy.com/oauthapi/getCourseDetails?access_token=${accessToken}`
  );

  console.log("Status Code:", courseResponse.status());
  console.log("Status Text:", courseResponse.statusText());

  const responseText = await courseResponse.text();
  console.log(responseText);



  const courseJson = await courseResponse.json();

  console.log(courseJson);

  // Step 3: Assertions

  expect(courseJson).toHaveProperty('courses');

  expect(courseJson.courses.webAutomation[0].courseTitle)
    .toBe('Selenium Webdriver Java');

});


//import { test, expect } from '@playwright/test';

test('Select future departure date', async ({ page }) => {

  const day = '15';
  const month = 'December';
  const year = '2026';

  await page.goto('https://rahulshettyacademy.com/dropdownsPractise/');

  await page.locator('#ctl00_mainContent_view_date1').click();

  while (true) {

    const currentMonth =
      await page.locator('.ui-datepicker-month').first().textContent();

    const currentYear =
      await page.locator('.ui-datepicker-year').first().textContent();

    if (currentMonth === month && currentYear === year)
      break;

    await page.locator('.ui-datepicker-next').click();
  }

  const leftCalendar = page.locator('.ui-datepicker-group').first();

  await leftCalendar.locator(`a:text-is("${day}")`).click();
});