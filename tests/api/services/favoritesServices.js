export class FavoritesService {
    constructor(request) {
        this.request = request;
    };

    // Add a book to user's favorites
    async addBookToFavorites({ usuarioId, livroId }) {
        return await this.request.post('/favoritos', {
            data: { usuarioId, livroId }
        });
    };

    // Get user's favorite books
    async getUserFavorites(userId) {
        return await this.request.get(`/favoritos/${userId}`);
    };

    // Remove a book from user's favorites
    async removeBookFromFavorites({ usuarioId, livroId }) {
        return await this.request.delete('/favoritos', {
            data: { usuarioId, livroId }
        });
    };
};