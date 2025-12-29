import { base } from "@faker-js/faker";
import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginPageTitle = page.locator('h1', { hasText: '📚 Login' });
        this.email = page.locator('input[id = "email"]');
        this.password = page.locator('input[id = "senha"]');
        this.loginButton = page.locator('button[type="submit"]', { hasText: 'Entrar' });
        this.registerLink = page.getByRole('link', { name: 'Registre-se' });
    }

    // Open website on the login page (which is the baseURL) 
    async goToWebsite() {
        await this.page.goto('/login.html');
    };

    // Verify login page title
    async verifyLoginPage() {
        await expect(this.loginPageTitle).toBeVisible();
        await expect(this.page).toHaveURL(/login\.html/);
    };

    // Go to Register page
    async goToRegisterPage() {
        await this.registerLink.click();
    };

    // Simple login with provided email and password
    async logIn(user) {
        await this.email.fill(user.email);
        await this.password.fill(user.password);
        await this.loginButton.click();
    }
    // Log in with Admin user
    async logInAdminUser() {
        await this.email.fill("admin@biblioteca.com");
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

    // Login with personal user// Submit registration 
    async logInPersonalUser() {
        await this.email.click();
        await this.email.fill("dani@gmail.com");
        await this.password.click();
        await this.password.fill("senha123");
        await this.loginButton.click();
    };
};


