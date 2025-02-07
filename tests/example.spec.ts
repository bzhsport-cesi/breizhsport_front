import { test, expect, Page } from '@playwright/test';

test('homepage has title', async ({ page }: { page: Page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const content = await page.content();
  console.log('MAXIME - contenu');
  console.log(content);
  console.log('MAXIME - url');
  console.log(page.url());
  const title = await page.title();
  expect(title).toBe('Create Next App');
});

test('homepage renders correctly', async ({ page }) => {
  await page.goto('/');
  const mainHeading = await page.locator('h1.text-4xl');
  await expect(mainHeading).toHaveText('Welcome to Breizh Sports');
  const subHeading = await page.locator('p.text-lg');
  await expect(subHeading).toHaveText(
    'Your one stop shop for all things sports'
  );
});
