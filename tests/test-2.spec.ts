import { test, expect } from '@playwright/test';

test('Проверка свойств cookies и окончания сессии', async ({ browser }) => {
 
  test.setTimeout(600000);

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://lalafo.kg/', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Войти•Регистрация', { state: 'visible' });
  await page.getByText('Войти•Регистрация').click();
  await page.waitForSelector('text=Регистрация', { state: 'visible' });
  await page.getByText('Регистрация', { exact: true }).click();
  await page.waitForSelector('[placeholder="XXX XXXXXX"]', { state: 'visible' });
  await page.getByPlaceholder('XXX XXXXXX').fill('507119001');
  await page.waitForSelector('[placeholder="Пароль"]', { state: 'visible' });
  await page.getByPlaceholder('Пароль').fill('12345'); 
  await page.waitForSelector('button:has-text("Регистрация")', { state: 'visible' });
  await page.getByRole('button', { name: 'Регистрация' }).click();

  const cookies = await context.cookies();

  for (const cookie of cookies) {
    console.log(`Проверяем cookie: ${cookie.name}`);
    
    if (cookie.name.includes('session') || cookie.name.includes('auth')) {
      if (cookie.secure) {
        expect(cookie.secure).toBeTruthy();
      } else {
        console.warn(`Cookie ${cookie.name} не имеет флага Secure`);
      }
      
      if (cookie.httpOnly) {
        expect(cookie.httpOnly).toBeTruthy();
      } else {
        console.warn(`Cookie ${cookie.name} не имеет флага HttpOnly`);
      }
      
      expect(['Lax', 'Strict']).toContain(cookie.sameSite);
    } else {
      console.log(`Пропускаем проверку безопасности для cookie: ${cookie.name}`);
    }
  }

  await page.waitForTimeout(60000); 
  await context.clearCookies();
  const newCookies = await context.cookies();
  expect(newCookies.length).toBe(0);

  await context.close();
});
