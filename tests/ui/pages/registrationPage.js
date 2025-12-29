import { base } from "@faker-js/faker";
import { expect } from "@playwright/test";

export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.registrationPageTitle = page.locator('h1', { hasText: '📚 Criar Conta' });
    this.name = page.locator('input[id = "nome"]');
    this.email = page.locator('input[id = "email"]');
    this.password = page.locator('input[id = "senha"]');
    this.confirmPassword = page.locator('input[id = "confirmarSenha"]');
    this.registerButton = page.locator('button[type="submit"]', { hasText: 'Registrar' });
    this.loginLink = page.getByRole('link', { name: 'Entrar' });
  };

  // Verify register page title
  async verifyRegisterPage() {
    await expect(this.registrationPageTitle).toBeVisible();
    await expect(this.page).toHaveURL(/registro\.html/);
  };

  // Submit registration 
  async registerNewUser({ name, email, password, confirmPassword }) {
    await this.name.fill(name);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.confirmPassword.fill(confirmPassword);
    await this.registerButton.click();
  };

  // Register Personal user
  async registerPersonalUser() {
    await this.name.fill("Daniela");
    await this.email.fill("dani@gmail.com");
    await this.password.fill("senha123");
    await this.confirmPassword.fill("senha123");
    await this.registerButton.click();
  };

};


