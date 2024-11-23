import {test, expect} from '@playwright/test';

test('displays home page', async ({page}) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Clément Latzarus · développeur web');
  await expect(page.getByRole('heading', {name: 'Clément Latzarus'})).toBeVisible();
});

test('displays projects page', async ({page}) => {
  await page.goto('/projects');

  await expect(page).toHaveTitle('Projets · Clément Latzarus · développeur web');
  await expect(page.getByRole('heading', {name: 'Projets'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Biblys'})).toBeVisible();
});

test('displays blog page', async ({page}) => {
  await page.goto('/blog');

  await expect(page).toHaveTitle('Blog · Clément Latzarus · développeur web');
});

test('displays blog post page', async ({page}) => {
  await page.goto('blog/how-to-run-matomo-in-a-docker-container-while-passing-database-credentials-as-environment-variables/');

  await expect(page).toHaveTitle(
    'How to run Matomo in a Docker container while passing database credentials as environment variables · Blog · Clément Latzarus · développeur web'
  );
  await expect(page.getByRole('heading', {
    name:
      'How to run Matomo in a Docker container while passing database credentials as environment variables'
  })).toBeVisible();
});
