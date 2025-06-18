import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Benutzername' }).click();
  await page.getByRole('textbox', { name: 'Benutzername' }).fill('admin');
  await page.getByRole('textbox', { name: 'Passwort' }).click();
  await page.getByRole('textbox', { name: 'Passwort' }).fill('q');
  await page.getByRole('button', { name: 'Einloggen' }).click();
  await expect(page.getByText('FehlerLogin fehlgeschlagen.')).toBeVisible();
  await expect(page.locator('form')).toContainText('FehlerLogin fehlgeschlagen. Bitte überprüfe deine Eingaben. Falscher Benutzername oder falsches Passwort');
});