import { expect } from "@playwright/test";

export class ApprovalsPage {
    constructor(page) {
        this.page = page;
        this.approvalsPageTitle = page.locator('h1', { hasText: '✅ Aprovação de Arrendamentos' });
        this.approvalsGrid = page.locator('#lista-pendentes .book-card');
        this.approvalCard = (userId, bookID, rentalId) =>
            page.locator('.book-card')
                .filter({ hasText: `Arrendamento #${rentalId}` })
                .filter({ hasText: `Usuário ID: ${userId}` })
                .filter({ hasText: `Livro ID: ${bookID}` })
                .first();
        this.approvalButton = (userId, bookID, rentalId) => this.approvalCard(userId, bookID, rentalId).getByRole('button', { name: 'Aprovar' });
        this.rejectionButton = (userId, bookID, rentalId) => this.approvalCard(userId, bookID, rentalId).getByRole('button', { name: 'Rejeitar' });
    };

    // Verify approvals user page title
    async verifyApprovalsTitle() {
        await expect(this.approvalsPageTitle).toBeVisible();
        await expect(this.page).toHaveURL(/aprovacoes\.html$/);
    };

    // Approve rental
    async approveRental(userId, bookID, rentalId) {
        await this.approvalButton(userId, bookID, rentalId).scrollIntoViewIfNeeded();
        await this.approvalButton(userId, bookID, rentalId).click();
    };

    // Reject rental
    async rejectRental(userId, bookID, rentalId) {
        await this.rejectionButton(userId, bookID, rentalId).scrollIntoViewIfNeeded();
        await this.rejectionButton(userId, bookID, rentalId).click();
    };
};