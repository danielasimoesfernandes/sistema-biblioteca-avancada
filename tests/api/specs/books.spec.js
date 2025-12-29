// @ts-check
import { test, expect } from '@playwright/test';
import { BooksService } from '../services/booksService.js';
import { BookFactory } from '../factories/bookFactory.js';


test.describe('Books - Listing & Searching', () => {
    test('CT-API-005 - List all books', async ({ request }) => {

        const booksService = new BooksService(request);

        // GET request to the /livros endpoint
        const response = await booksService.getAllBooks();

        // Validate the response status
        expect(response.status()).toBe(200);

        const newUser = await response.json();

        // Validate format of array
        const booksList = await response.json();
        expect(Array.isArray(booksList)).toBe(true);

        // Validate fields of each book
        for (const book of booksList) {
            expect(book).toHaveProperty('id');
            expect(book).toHaveProperty('nome');
            expect(book).toHaveProperty('autor');
            expect(book).toHaveProperty('paginas');
            expect(book).toHaveProperty('descricao');
            expect(book).toHaveProperty('imagemUrl');
            expect(book).toHaveProperty('dataCadastro');
            expect(book).toHaveProperty('estoque');
            expect(book).toHaveProperty('preco');

            // Validate format of paginas field
            expect(Number.isInteger(book.paginas)).toBe(true);
            expect(book.paginas).toBeGreaterThan(0);

            // Validate dataCadastro format
            const entryDate = new Date(book.dataCadastro);
            expect(entryDate.toISOString()).toBe(book.dataCadastro);
        };

        console.log(booksList);
    });

    test('CT-API-006 - List all available books', async ({ request }) => {

        const booksService = new BooksService(request);

        // GET request to the /livros/disponiveis endpoint
        const response = await booksService.getAvailableBooks();

        // Validate the response status
        expect(response.status()).toBe(200);

        const newUser = await response.json();

        // Validate format of array
        const availableBooksList = await response.json();
        expect(Array.isArray(availableBooksList)).toBe(true);

        // Validate fields of each book
        for (const book of availableBooksList) {
            expect(book).toHaveProperty('estoque');
            expect(book.estoque).toBeGreaterThan(0); // Ensure stock is greater than 0
            expect(book).toHaveProperty('disponivel', true);
        };

        console.log(availableBooksList);
    });

    test('CT-API-007 - Search book by existing ID', async ({ request }) => {

        const booksService = new BooksService(request);

        // Create a book to ensure it exists
        const bookFactory = new BookFactory(request);
        const createBookResponse = await bookFactory.createBookTest();
        expect(createBookResponse.status()).toBe(201);
        const createdBook = await createBookResponse.json();
        const createdBookId = createdBook.id;

        // GET request to the /livros/1 endpoint, assuming book with ID 1 exists
        const response = await booksService.getBookById(createdBookId);

        // Validate the response status
        expect(response.status()).toBe(200);

        const book = await response.json();

        // Validate the message
        expect(book).toHaveProperty('id', createdBookId);

        expect(book.nome).not.toBeNull();
        expect(book.autor).not.toBeNull();
        expect(book.paginas).not.toBeNull();

        console.log(book);
    });

    test('CT-API-008 - Search book by nonexistent ID', async ({ request }) => {

        const booksService = new BooksService(request);

        // GET request to the /livros/9999 endpoint, which does not exist
        const response = await booksService.getBookById(9999);

        // Validate the response status
        expect(response.status()).toBe(404);

        const nonexistentBook = await response.json();

        // Validate the message
        expect(nonexistentBook).toHaveProperty('mensagem', 'Livro não encontrado');

        console.log(nonexistentBook);
    });
});

//////////////////////////////////////////////////////////////

test.describe('Books - Adding, Updating and Deleting', () => {
    test('CT-API-009 - Add a New Book', async ({ request }) => {

        const booksService = new BooksService(request);

        // Input data for book creation 
        const body = {
            nome: "Código Limpo",
            autor: "Robert C. Martin",
            paginas: 425,
            descricao: "Manual de boas práticas",
            imagemUrl: "https://exemplo.com/imagem.jpg",
            estoque: 10,
            preco: 59.9
        };

        // POST request to the /livros endpoint
        const response = await booksService.createBook(body);

        // Validate the response status
        expect(response.status()).toBe(201);

        const newBook = await response.json();

        // Validate that the 'id' is generated for the new book 
        expect(newBook).toHaveProperty('id');
        expect(typeof newBook.id).toBe('number');

        // Validate that dataCadastro is a valid date
        expect(newBook).toHaveProperty('dataCadastro');
        const data = new Date(newBook.dataCadastro);
        expect(data.toISOString()).toBe(newBook.dataCadastro);

        // Validate that returned fields match input data
        expect(newBook.nome).toBe(body.nome);
        expect(newBook.autor).toBe(body.autor);
        expect(newBook.paginas).toBe(body.paginas);
        expect(newBook.descricao).toBe(body.descricao);
        expect(newBook.imagemUrl).toBe(body.imagemUrl);
        expect(newBook.estoque).toBe(body.estoque);
        expect(newBook.preco).toBe(body.preco);

        console.log(newBook);
    });

    test('CT-API-010 - Add a New Book without Mandated Fields (Failure)', async ({ request }) => {

        const booksService = new BooksService(request);

        // Input data for book creation with missing fields
        const body = {
            nome: "",
            autor: "",
            paginas: null
        }

        // POST request to the /livros endpoint
        const response = await booksService.createBookMissingFields(body);
        // Validate the response status
        expect(response.status()).toBe(400);

        const invalidBook = await response.json();

        // Validate the message
        expect(invalidBook).toHaveProperty('mensagem', 'Nome, autor e páginas são obrigatórios');

        console.log(invalidBook);
    });

    test('CT-API-011 - Update existent book', async ({ request }) => {

        const booksService = new BooksService(request);


        // Create a book to ensure it exists
        const bookFactory = new BookFactory(request);
        const createBookResponse = await bookFactory.createBookTest();
        expect(createBookResponse.status()).toBe(201);
        const createdBook = await createBookResponse.json();
        const createdBookId = createdBook.id;
        console.log('Created book name for Update:', createdBook.nome, 'with ID:', createdBookId);

        // Input data for book update
        const body = {
            nome: "Clean Code - Edição Atualizada",
            autor: "Robert C. Martin",
            paginas: 464,
            descricao: "Guia completo atualizado",
            imagemUrl: "https://exemplo.com/nova-imagem.jpg",
            estoque: 7,
            preco: 79.9
        };

        // PUT request to the /livros/1 endpoint
        const response = await booksService.updateBook(createdBookId, body);

        // Validate the response status
        expect(response.status()).toBe(200);

        const updatedBook = await response.json();

        // Validate that the 'id' remains the same
        expect(updatedBook).toHaveProperty('id', createdBookId);

        // Validate that returned fields match input data
        expect(updatedBook.nome).toBe(body.nome);
        expect(updatedBook.autor).toBe(body.autor);
        expect(updatedBook.paginas).toBe(body.paginas);
        expect(updatedBook.descricao).toBe(body.descricao);
        expect(updatedBook.imagemUrl).toBe(body.imagemUrl);
        expect(updatedBook.estoque).toBe(body.estoque);
        expect(updatedBook.preco).toBe(body.preco);

        console.log(updatedBook);
    });

    test('CT-API-012 - Delete a book', async ({ request }) => {

        const booksService = new BooksService(request);
        const bookFactory = new BookFactory(request);


        // Create a new book to ensure it exists for deletion
        const createBookToDelete = await bookFactory.createBookTest();
        expect(createBookToDelete.status()).toBe(201);
        const bookToDelete = await createBookToDelete.json();
        const bookId = bookToDelete.id;

        // DELETE request to the /livros/{bookId} endpoint
        const response = await booksService.deleteBook(bookId);

        // Validate the response status
        expect(response.status()).toBe(200);

        const deletedBook = await response.json();

        // Validate the message
        expect(deletedBook).toHaveProperty('mensagem', 'Livro removido');

        console.log(deletedBook);

        // GET request to the /livros/{bookId} endpoint
        const searchResponse = await booksService.getBookById(bookId);
        expect(searchResponse.status()).toBe(404);
    });
});





