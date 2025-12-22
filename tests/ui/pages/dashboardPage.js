import { expect } from "@playwright/test";

export class DashboardPage {
    constructor(page) {
        this.page = page;
        this.dashboardPageTitle = page.locator('h1', { hasText: '📚 Minha Biblioteca' });
        this.username = page.locator('#nomeUsuario');
        this.logoutButton = page.locator('button[class="nav-btn logout"]', { hasText: 'Sair' });
        this.dashboardMenuButton = page.locator('a.nav-btn[href="dashboard.html"]');
        this.booksMenuButton = page.locator('a.nav-btn[href="livros.html"]');
        this.favoritesMenuButton = page.locator('a.nav-btn[href="favoritos.html"]');
        this.myRentalsMenuButton = page.locator('a.nav-btn[href="arrendamentos.html"]');
        this.purchasesMenuButton = page.locator('a.nav-btn[href="compras.html"]');
        this.myPurchasesMenuButton = page.locator('a.nav-btn[href="minhas-compras.html"]');
        this.aprovalsMenuButton = page.locator('a.nav-btn[href="aprovacoes.html"]');
        this.adminPurchasesMenuButton = page.locator('a.nav-btn[href="compras-admin.html"]');
        this.usersMenuButton = page.locator('a.nav-btn[href="admin-usuarios.html"]');
        this.dashboardMessage = page.locator('input[id = "msg-tipo"]')
        this.registerLink = page.getByRole('link', { name: 'Registre-se' });
    };

    async getUsername() {
        return await this.username.textContent();
    };

    async usernameDisplayed() {
        return await this.username.isVisible();
    };

    async verifyDashboardTitle() {
        await expect(this.dashboardPageTitle).toBeVisible();
        await expect(this.page).toHaveURL(/dashboard\.html$/);
    };

    async verifyUserInLocalStorage(expectedEmail, expectedId, expectedName, expectedTipo) {
        const savedUser = await this.page.evaluate(() => JSON.parse(localStorage.getItem('usuario')));
        expect(savedUser).not.toBeNull();
        expect(savedUser.email).toBe(expectedEmail);
        expect(savedUser.id).toBe(expectedId);
        expect(savedUser.nome).toBe(expectedName);
        expect(savedUser.tipo).toBe(expectedTipo);
    };
};




