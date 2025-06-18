import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Benutzername' }).click();
  await page.getByRole('textbox', { name: 'Benutzername' }).fill('admin@acme.com');
  await page.getByRole('textbox', { name: 'Passwort' }).click();
  await page.getByRole('textbox', { name: 'Passwort' }).fill('p');
  await page.getByRole('button', { name: 'Einloggen' }).click();
  await page.getByRole('textbox', { name: 'Nach Title suchen' }).click();
  await page.getByRole('textbox', { name: 'Nach Title suchen' }).fill('Alpha');
  await page.getByRole('button', { name: 'Suchen' }).click();
  await page.locator('div').filter({ hasText: 'TitelUntertitelISBNRatingPreisArtAktionenAlphaalpha978-3-897-22583-1411.' }).nth(2).click();
});