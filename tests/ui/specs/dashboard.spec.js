// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/dashboardPage';

test.describe('Dashboard Tests', () => {
    test('CT-FE-008 - Dashboard – Admin vision', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // Clear localStorage
        await page.goto('http://localhost:3000/login.html'); // ou qualquer página da sua app
        await page.evaluate(() => localStorage.clear());

        // Try to navigate directly to dashboard page 
        await page.goto('http://localhost:3000/dashboard.html');

        // Redirect to login page 
        await page.waitForURL(/login\.html$/, { timeout: 30000 });
        await loginPage.verifyLoginPage();
    });
}); 