import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Benutzername' }).click();
  await page.getByRole('textbox', { name: 'Benutzername' }).fill('admin');
  await page.getByRole('textbox', { name: 'Passwort' }).click();
  await page.getByRole('textbox', { name: 'Passwort' }).fill('p');
  await page.getByRole('button', { name: 'Einloggen' }).click();
  await page.getByRole('link', { name: 'Buch Anlegen' }).click();
  await page.getByRole('textbox', { name: 'Titel eingeben', exact: true }).click();
  await page.getByRole('textbox', { name: 'Titel eingeben', exact: true }).fill('Titel');
  await page.getByRole('textbox', { name: 'Untertitel eingeben' }).click();
  await page.getByRole('textbox', { name: 'Untertitel eingeben' }).fill('untertitel');
  await page.locator('input[type="date"]').fill('2025-06-18');
  await page.getByRole('textbox', { name: 'z. B. 978-0-007-00644-' }).click();
  await page.getByRole('textbox', { name: 'z. B. 978-0-007-00644-' }).fill('978-0-007-00644-1');
  await page.getByRole('textbox', { name: 'https://yoursite.com' }).click();
  await page.getByRole('textbox', { name: 'https://yoursite.com' }).fill('https://yoursite.com');
  await page.getByRole('textbox', { name: 'Schlagwort' }).fill('Schlagwort');
  await page.getByRole('button', { name: 'Hinzufügen' }).click();
});