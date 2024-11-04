import { test, expect } from '@playwright/test';

test('Пароль должен быть не менее 5 символов', async ({ page }) => {
  await page.goto('https://lalafo.kg/', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Войти•Регистрация', { state: 'visible' });
  await page.getByText('Войти•Регистрация').click();
  await page.waitForSelector('text=Регистрация', { state: 'visible' });
  await page.getByText('Регистрация', { exact: true }).click();
  await page.waitForSelector('[placeholder="XXX XXXXXX"]', { state: 'visible' });
  await page.getByPlaceholder('XXX XXXXXX').fill('507119001');
  await page.waitForSelector('[placeholder="Пароль"]', { state: 'visible' });
  await page.getByPlaceholder('Пароль').fill('1234'); 
  await page.waitForSelector('button:has-text("Регистрация")', { state: 'visible' });
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await page.waitForSelector('text=Пароль минимум 5 символов', { state: 'visible' });
  await expect(page.locator('text=Пароль минимум 5 символов')).toBeVisible();
});
