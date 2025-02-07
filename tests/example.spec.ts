import { test, expect, Page } from '@playwright/test';

test('homepage has title', async ({ page }: { page: Page }) => {
  await page.goto('http://localhost:3000'); // Replace with your app's URL
  const title = await page.title();
  expect(title).toBe('Create Next App'); // Replace with your expected title
});
