import { test, expect, Page } from '@playwright/test';

test('homepage has title', async ({ page }: { page: Page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('load');
  const title = await page.title();
  expect(title).toBe('Create Next App');
});
