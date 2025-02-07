import { test, expect, Page } from '@playwright/test';

test('homepage has title', async ({ page }: { page: Page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('load');
  const title = await page.title();
  expect(title).toBe('Create Next App');
});

test('homepage renders correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const mainHeading = await page.locator('h1.text-4xl');
  await expect(mainHeading).toHaveText('Welcome to Breizh Sports');
  const subHeading = await page.locator('p.text-lg');
  await expect(subHeading).toHaveText(
    'Your one stop shop for all things sports'
  );
});
