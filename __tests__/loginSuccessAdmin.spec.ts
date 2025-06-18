import { test, expect } from '@playwright/test';

test('Sollte sich als Admin einloggen und zur Suchseite weiterleiten', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Benutzername' }).fill('admin');
  await page.getByRole('textbox', { name: 'Passwort' }).fill('p');
  await page.getByRole('button', { name: 'Einloggen' }).click();

  await expect(page).toHaveURL('http://localhost:5173/search');
  await expect(page.getByPlaceholder('Nach Title suchen')).toBeVisible();
});