import { test, expect, Page } from '@playwright/test';

test('homepage has title', async ({ page }: { page: Page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
  const title = await page.title();
  console.log('MAXIME - title');
  console.log(title);
  expect(title).toBe('Create Next App');
});

test('homepage renders correctly', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  // Wait for specific elements
  await page.waitForSelector('h1.text-4xl');
  await page.waitForSelector('p.text-lg');
  const mainHeading = await page.locator('h1.text-4xl');
  await expect(mainHeading).toHaveText('Welcome to Breizh Sports');
  const subHeading = await page.locator('p.text-lg');
  await expect(subHeading).toHaveText(
    'Your one stop shop for all things sports'
  );
});
