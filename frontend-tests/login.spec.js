// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';

test.describe('Login Page Tests', () => {

  test('Open Login page and verify the title', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goToWebsite();
    await loginPage.verifyLoginPage(); // 
  });

    test('Navigate to Register page from Login page', async ({ page }) => {

        const loginPage = new LoginPage(page);
        
        await loginPage.goToWebsite();
        await loginPage.goToRegisterPage();
        await expect(page).toHaveURL(/register.html/);
    });

    test('Log in with Admin user', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goToWebsite();
        await loginPage.logInAdminUser();
    });

    test('Log in with Employee user', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goToWebsite();
        await loginPage.logInEmployeeUser();
    });

    test('Log in with Student user', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goToWebsite();
        await loginPage.logInStudentUser();
    });

    test('Log in with invalid user data', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goToWebsite();

        page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Email ou senha incorretos');
        await dialog.accept(); // closes the dialog 
        });

        await loginPage.logInInvalidData();
    });
});