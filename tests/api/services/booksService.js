export class BooksService {
    constructor(request) {
        this.request = request;
    };

    // Create a new book with given details
    async createBook({ nome, autor, paginas, descricao, imagemUrl, estoque, preco }) {
        return await this.request.post('/livros', {
            data: { nome, autor, paginas, descricao, imagemUrl, estoque, preco }
        });
    };

    // Create a new book with mandatory fields missing (failing case - missing fields)
    async createBookMissingFields({ nome, autor, paginas }) {
        return await this.request.post('/livros', {
            data: { nome, autor, paginas }
        });
    };

    // Get all books
    async getAllBooks() {
        return await this.request.get('/livros');
    };

    // Get all available books
    async getAvailableBooks() {
        return await this.request.get('/livros/disponiveis');
    };

    // Get a book by its ID
    async getBookById(bookId) {
        return await this.request.get('/livros/' + bookId);
    };

    // Update a book by its ID with given details
    async updateBook(bookId, bookData) {
        return await this.request.put('/livros/' + bookId, {
            data: bookData
        });
    };

    // Delete a book by its ID
    async deleteBook(bookId) {
        return await this.request.delete('/livros/' + bookId);
    };

    // Get recent books - last 5 added books
    async getRecentBooks() {
        return await this.request.get('/livros/recentes/ultimos');
    };
};