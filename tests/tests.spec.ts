import { test, expect } from '@playwright/test';

test('displays home page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Clément Latzarus · développeur web');
  await expect(page.getByRole('heading', { name: 'Clément Latzarus' })).toBeVisible();
});

test('displays projects page', async ({ page }) => {
  await page.goto('/projects');

  await expect(page).toHaveTitle('Projets · Clément Latzarus · développeur web');
  await expect(page.getByRole('heading', { name: 'Projets' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Biblys'})).toBeVisible();
});
