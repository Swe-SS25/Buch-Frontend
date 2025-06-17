import { test } from '@playwright/test';

test.describe('Login as admin', () => {
  test('test', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('textbox', { name: 'Benutzername' }).click();
    await page.getByRole('textbox', { name: 'Benutzername' }).fill('admin@acme.com');
    await page.getByRole('textbox', { name: 'Passwort' }).click();
    await page.getByRole('textbox', { name: 'Passwort' }).fill('p');
    await page.getByRole('button', { name: 'Einloggen' }).click();
  });
});
