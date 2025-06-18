import { test, expect } from '@playwright/test';

test('Sollte Ergebnisse für eine einfache Textsuche anzeigen', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Benutzername' }).fill('admin');
  await page.getByRole('textbox', { name: 'Passwort' }).fill('p');
  await page.getByRole('button', { name: 'Einloggen' }).click();

  await page.getByPlaceholder('Nach Title suchen').fill('Alpha');
  await page.getByRole('button', { name: 'Suchen' }).click();
  
  const firstRow = page.locator('table tbody tr').first();
  await expect(firstRow).toBeVisible();
  
  await expect(firstRow).toContainText('Alpha');
});