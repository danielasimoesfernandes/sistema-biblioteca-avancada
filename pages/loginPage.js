import { base } from "@faker-js/faker"; 
import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginPageTitle = page.locator('h2', { hasText: '📚 Login' });
        this.email = page.locator('input[id = "email"]');
        this.password = page.locator('input[id = "senha"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.registerLink = page.getByRole('link', { name: 'Registre-se' });
    }

    // Open website on the login page (which is the baseURL) 
    async goToWebsite() {
      await this.page.goto('/login.html');
    };

    // Verify that login page is open
    async verifyLoginPage() {
      await expect(this.loginPageTitle).toBeVisible();
      await expect(this.page).toHaveURL(/login\.html/);
   };

   // Click on the Register link to open Register page
   async goToRegisterPage() {
      await this.registerLink.click();
   };

   // Simple login with provided email and password
   async logIn(email, password) {
        await this.email.click();
        await this.email.fill(email);
        await this.password.click();
        await this.password.fill(password);
        await this.loginButton.click();
    }
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
}
