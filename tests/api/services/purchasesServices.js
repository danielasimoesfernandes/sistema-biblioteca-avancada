export class PurchasesService {
    constructor(request) {
        this.request = request;
    };

    // Purchase a book with given details
    async purchaseBook({ usuarioId, livroId, quantidade, }) {
        return await this.request.post('/compras', {
            data: { usuarioId, livroId, quantidade }
        });
    };

    // Get all purchases
    async getPurchases() {
        return await this.request.get('/compras');
    };

    // Get purchases for a specific user
    async getUserPurchases(usuarioId) {
        return await this.request.get('/compras/me', {
            params: { usuarioId }
        });
    };

    // Update purchase status
    async updatePurchaseStatus(purchaseId, status) {
        return await this.request.put(`/compras/${purchaseId}/status`, {
            data: { status }
        });
    };
};