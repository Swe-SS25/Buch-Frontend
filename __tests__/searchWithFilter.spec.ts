import { test, expect } from '@playwright/test';

test('Sollte Ergebnisse basierend auf den gesetzten Filtern anzeigen', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Benutzername' }).fill('admin');
  await page.getByRole('textbox', { name: 'Passwort' }).fill('p');
  await page.getByRole('button', { name: 'Einloggen' }).click();

  await page.getByLabel('Anzeigen').click();
  await page.getByRole('combobox').selectOption('EPUB');
  await page.getByRole('button', { name: 'Save Filter' }).click();
  
  const firstRow = page.locator('table tbody tr').first();
  await expect(firstRow).toBeVisible();
  await expect(firstRow).toContainText('EPUB');
});