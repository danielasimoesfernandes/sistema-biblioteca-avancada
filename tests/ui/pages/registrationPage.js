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
        this.registerButton = page.locator('button[type="submit"]', { hasText: 'Registrar'}); 
        this.loginLink = page.getByRole('link', { name: 'Entrar' });
    };

    // Verify that registration page is open
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

    // Log in with Admin user
    async logInAdminUser() {
        await this.email.click();
        await this.email.fill("admin@biblioteca.com");
        await this.password.click();
        await this.password.fill("123456");
        await this.loginButton.click();
    };

    // Log in with Employee user
    async logInEmployeeUser() {
        await this.email.click();
        await this.email.fill("func@biblio.com");
        await this.password.click();
        await this.password.fill("123456");
        await this.loginButton.click();
    };

    // Log in with Student user
    async logInStudentUser() {
        await this.email.click();
        await this.email.fill("aluna@teste.com");
        await this.password.click();
        await this.password.fill("123456");
        await this.loginButton.click();
    };

    // Log in with invalid user
    async logInInvalidData() {
        await this.email.click();
        await this.email.fill("invalid@invalid.com");
        await this.password.click();
        await this.password.fill("invalid");
        await this.loginButton.click();
    };
};


