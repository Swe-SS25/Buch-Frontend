import { test, expect } from '@playwright/test';

test('Sollte einen Benutzer ausloggen und zur Login-Seite zurückkehren', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('textbox', { name: 'Benutzername' }).fill('admin');
    await page.getByRole('textbox', { name: 'Passwort' }).fill('p');
    await page.getByRole('button', { name: 'Einloggen' }).click();
    
    await expect(page).toHaveURL('http://localhost:5173/search');

    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL('http://localhost:5173/');
    await expect(page.getByRole('button', { name: 'Einloggen' })).toBeVisible();
});