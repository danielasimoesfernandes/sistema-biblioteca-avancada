export class BookrentalsService {
    constructor(request) {
        this.request = request;
    };

    // Rent a book with given details
    async rentBook({ usuarioId, livroId, dataInicio, dataFim }) {
        return await this.request.post('/arrendamentos', {
            data: { usuarioId, livroId, dataInicio, dataFim }
        });
    };

    // Get all rentals
    async getRentals() {
        return await this.request.get('/arrendamentos');
    };

    // Update rental status
    async updateRentalStatus(rentalId, status) {
        return await this.request.put(`/arrendamentos/${rentalId}/status`, {
            data: { status }
        });
    };

    // Get rentals for a specific user
    async getUserRentals(userId) {
        return await this.request.get('/arrendamentos/me', {
            params: {
                usuarioId: userId
            }
        });
    };
};
