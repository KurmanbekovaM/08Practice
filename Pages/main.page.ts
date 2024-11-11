import { test, expect, Page } from '@playwright/test';

class MainPage {
  private page: Page;
  private loginButton: any;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = this.page.locator('text=Войти•Регистрация');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://lalafo.kg/', { waitUntil: 'networkidle' });
  }

  async goToRegistration(): Promise<void> {
    await this.loginButton.click();
  }
}

class RegistrationPage {
  private page: Page;
  private registrationButton: any;
  private phoneField: any;
  private passwordField: any;
  private submitButton: any;
  private errorText: any;

  constructor(page: Page) {
    this.page = page;
    this.registrationButton = this.page.locator('text=Регистрация');
    this.phoneField = this.page.locator('[placeholder="XXX XXXXXX"]');
    this.passwordField = this.page.locator('[placeholder="Пароль"]');
    this.submitButton = this.page.locator('button:has-text("Регистрация")');
    this.errorText = this.page.locator('text=Пароль минимум 5 символов');
  }

  async fillPhone(phone: string): Promise<void> {
    await this.phoneField.fill(phone);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  async submitRegistration(): Promise<void> {
    await this.submitButton.click();
  }

  async expectPasswordError(): Promise<void> {
    await expect(this.errorText).toBeVisible();
  }
}

test('Пароль должен быть не менее 5 символов', async ({ page }) => {
  const mainPage = new MainPage(page);
  const registrationPage = new RegistrationPage(page);

  await mainPage.navigate();
  await mainPage.goToRegistration();

  await registrationPage.fillPhone('507119001');
  await registrationPage.fillPassword('1234');
  await registrationPage.submitRegistration();
  
  await registrationPage.expectPasswordError();
});
