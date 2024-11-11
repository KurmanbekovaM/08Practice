import { test, expect } from '@playwright/test';

test('Данные должны отправляться через HTTPS', async ({ page }) => {
  await page.goto('https://lalafo.kg/', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Войти•Регистрация', { state: 'visible' });
  await page.getByText('Войти•Регистрация').click();
  await page.waitForSelector('text=Регистрация', { state: 'visible' });
  await page.getByText('Регистрация', { exact: true }).click();
  await page.waitForSelector('[placeholder="XXX XXXXXX"]', { state: 'visible' });
  await page.getByPlaceholder('XXX XXXXXX').fill('507119001');
  await page.waitForSelector('[placeholder="Пароль"]', { state: 'visible' });
  await page.getByPlaceholder('Пароль').fill('12345'); 

  page.on('request', request => {
    const url = request.url();
    expect(url.startsWith('https://')).toBeTruthy();
    console.log(`Отправка данных через: ${url}`);
  });

  await page.waitForSelector('button:has-text("Регистрация")', { state: 'visible' });
  await page.getByRole('button', { name: 'Регистрация' }).click();
  await expect(page.locator('text=Пароль минимум 5 символов')).not.toBeVisible();
});
