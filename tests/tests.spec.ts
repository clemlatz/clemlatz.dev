import { test, expect } from '@playwright/test';

test('displays home page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Clément Latzarus · développeur web');
  await expect(page.getByRole('heading', { name: 'Clément Latzarus' })).toBeVisible();
});
