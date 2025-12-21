// @ts-check
import { test, expect } from '@playwright/test';
import { BookrentalsService } from '../services/bookrentalsService.js';
import { BooksService } from '../services/booksService.js';
import { BookFactory } from '../factories/bookFactory.js';
import { UserFactory } from '../factories/userFactory.js';
import { AuthenticationService } from '../services/authenticationService.js';


test.describe('Book Rentals', () => {

    test('CT-API-018 - Valid book rental', async ({ request }) => {

        const bookrentalsService = new BookrentalsService(request);
        const booksService = new BooksService(request);
        const bookFactory = new BookFactory(request);

        // Create book for rental test
        const bookForRentalResponse = await bookFactory.createBookForRentalTest();
        expect(bookForRentalResponse.status()).toBe(201);
        const bookForRental = await bookForRentalResponse.json();
        const bookId = bookForRental.id;

        // Validate book stock before rental
        const bookResponse = await request.get('/livros/' + bookId);
        expect(bookResponse.status()).toBe(200);

        // Ensure the book has stock available
        const bookDetailsBeforeRental = await bookResponse.json();
        if (bookDetailsBeforeRental.estoque <= 0) {
            bookDetailsBeforeRental.estoque = 5; // Adjust stock for test purposes
            await request.put('/livros/' + bookId, { data: bookDetailsBeforeRental });
        }
        expect(bookDetailsBeforeRental.estoque).toBeGreaterThan(0);

        // Input data to book rental
        const body = {
            usuarioId: 3,
            livroId: bookId,
            dataInicio: "2025-12-20",
            dataFim: "2025-12-27"
        };

        // POST request to the /arrendamentos endpoint to rent a book
        const response = await request.post('/arrendamentos', { data: body });
        // Validate the response status
        expect(response.status()).toBe(201);

        // Validate response body
        const rentalBookResponse = await response.json();
        expect(rentalBookResponse).toHaveProperty('id');
        expect(rentalBookResponse).toHaveProperty('usuarioId', body.usuarioId);
        expect(rentalBookResponse).toHaveProperty('livroId', body.livroId);
        expect(rentalBookResponse).toHaveProperty('status', 'PENDENTE');
        expect(rentalBookResponse).toHaveProperty('criadoEm');

        console.log("Rental details: ", rentalBookResponse);
    });


    test('CT-API-019 – Rental a book without stock (Failure)', async ({ request }) => {

        const bookrentalsService = new BookrentalsService(request);
        const booksService = new BooksService(request);
        const bookFactory = new BookFactory(request);

        // Create book for rental test
        const bookForRentalResponse = await bookFactory.createBookForRentalTest();
        expect(bookForRentalResponse.status()).toBe(201);
        const bookForRental = await bookForRentalResponse.json();
        const bookId = bookForRental.id;

        // Validate book stock before rental
        const bookResponse = await booksService.getBookById(bookId);
        expect(bookResponse.status()).toBe(200);

        // Ensure the book has stock available
        const bookDetails = await bookResponse.json();
        if (bookDetails.estoque > 0) {
            bookDetails.estoque = 0; // Adjust stock for test purposes
            await booksService.updateBook(bookId, bookDetails);
        }
        expect(bookDetails.estoque).toBe(0);

        // Input data to book rental
        const body = {
            usuarioId: 3,
            livroId: bookId,
            dataInicio: "2025-12-20",
            dataFim: "2025-12-27"
        };

        // POST request to the /arrendamentos endpoint to rent a book
        const bookWithoutStockResponse = await bookrentalsService.rentBook(body);
        // Validate the response status
        expect(bookWithoutStockResponse.status()).toBe(400);

        // Validate response body
        const rentalBookResponse = await bookWithoutStockResponse.json();
        expect(rentalBookResponse).toHaveProperty('mensagem', 'Livro sem estoque para arrendamento');

        console.log(rentalBookResponse);
    });


    test('CT-API-020 - Update rental status to approved', async ({ request }) => {

        const bookrentalsService = new BookrentalsService(request);
        const booksService = new BooksService(request);
        const bookFactory = new BookFactory(request);

        // Create book for rental test
        const bookForRentalResponse = await bookFactory.createBookForRentalTest();
        expect(bookForRentalResponse.status()).toBe(201);
        const bookForRental = await bookForRentalResponse.json();
        const bookId = bookForRental.id;

        // Validate book stock before rental
        const bookResponse = await booksService.getBookById(bookId);
        expect(bookResponse.status()).toBe(200);

        // Ensure the book has stock available
        const bookDetailsBeforeRental = await bookResponse.json();
        if (bookDetailsBeforeRental.estoque <= 0) {
            bookDetailsBeforeRental.estoque = 5; // Adjust stock for test purposes
            await booksService.updateBook(bookId, bookDetailsBeforeRental);
        }
        expect(bookDetailsBeforeRental.estoque).toBeGreaterThan(0);

        // Save initial stock for later validation
        const stockBeforeRental = bookDetailsBeforeRental.estoque;

        // Input data to book rental
        const bookRentalbody = {
            usuarioId: 3,
            livroId: bookId,
            dataInicio: "2025-12-20",
            dataFim: "2025-12-27"
        };

        // POST request to the /arrendamentos endpoint to rent a book
        const bookRentalResponse = await bookrentalsService.rentBook(bookRentalbody);
        // Validate the response status
        expect(bookRentalResponse.status()).toBe(201);
        const rentedBook = await bookRentalResponse.json();

         // Save rental id and stock after rental for later validation
        const rentalId = rentedBook.id;

        // Input data to update rental status
        const body = {
            status: "APROVADO"
        };

        // PUT request to the /arrendamentos/{id}/status endpoint to rent a book
        const response = await request.put(`/arrendamentos/${rentalId}/status`, { data: body })
        // Validate the response status
        expect(response.status()).toBe(200);

        // Validate book stock after rental
        const bookStockAfterRentalResponse = await booksService.getBookById(bookId);
        expect(bookStockAfterRentalResponse.status()).toBe(200);
        const stockAfterRental = (await bookStockAfterRentalResponse.json()).estoque;

        // Validate that stock decreased by 1
        console.log("Stock before rental: ", stockBeforeRental, " -> Stock after rental: ", stockAfterRental, ".");
        expect(stockAfterRental).toBe(stockBeforeRental - 1);
    });


    test('CT-API-021 - Update rental status to invalid status', async ({ request }) => {

        const bookrentalsService = new BookrentalsService(request);
        const booksService = new BooksService(request);
        const bookFactory = new BookFactory(request);

        // Create book for rental test
        const bookForRentalResponse = await bookFactory.createBookForRentalTest();
        expect(bookForRentalResponse.status()).toBe(201);
        const bookForRental = await bookForRentalResponse.json();
        const bookId = bookForRental.id;

        // Input data to book rental
        const bookRentalbody = {
            usuarioId: 3,
            livroId: bookId,
            dataInicio: "2025-12-20",
            dataFim: "2025-12-27"
        };

        // POST request to the /arrendamentos endpoint to rent a book
        const bookRentalResponse = await bookrentalsService.rentBook(bookRentalbody);
        // Validate the response status
        expect(bookRentalResponse.status()).toBe(201);
        const rentedBook = await bookRentalResponse.json();

         // Save rental id and stock after rental for later validation
        const rentalId = rentedBook.id;

        // Input data to update rental status
        const body = {
            status: "EM_ANALISE"
        };

        // PUT request to the /arrendamentos/{id}/status endpoint to rent a book
        const response = await bookrentalsService.updateRentalStatus(rentalId, body);
        // Validate the response status
        expect(response.status()).toBe(400);

        // Validate message
        const invalidStatusResponse = await response.json();
        expect(invalidStatusResponse).toHaveProperty('mensagem', 'Status inválido');

        console.log(invalidStatusResponse);
    });


    test('CT-API-022 - List all rentals from a user', async ({ request }) => {

        const bookrentalsService = new BookrentalsService(request);
        const booksService = new BooksService(request);
        const bookFactory = new BookFactory(request);
        const userFactory = new UserFactory(request);
        
        // Create user for rental test  
        const userForRentalResponse = await userFactory.registerTestUser();
        const userForRental = await userForRentalResponse.json();
        const userId = userForRental.usuario.id;
        console.log("User ID for rental:", userId);

    
        // Add rentals for the user
        for (let i = 0; i < 3; i++) {
            // Create book for rental test
            const bookForRentalResponse = await bookFactory.createBookForRentalTest();
            expect(bookForRentalResponse.status()).toBe(201);
            const bookForRental = await bookForRentalResponse.json();
            const bookId = bookForRental.id;

            // Ensure the book has stock available
            const bookResponse = await booksService.getBookById(bookId);
            expect(bookResponse.status()).toBe(200);
            const bookDetailsBeforeRental = await bookResponse.json();
            if (bookDetailsBeforeRental.estoque <= 0) {
                bookDetailsBeforeRental.estoque = 5; // Adjust stock for test purposes
                await booksService.updateBook(bookId, bookDetailsBeforeRental);
            }
            expect(bookDetailsBeforeRental.estoque).toBeGreaterThan(0);

            // Input data to book rental    
            const bookRentalbody = {
                usuarioId: userId,
                livroId: bookId,
                dataInicio: "2026-01-10",
                dataFim: "2026-01-20"
            };
            
            // POST request to the /arrendamentos endpoint to rent a book   
            const bookRentalResponse = await bookrentalsService.rentBook(bookRentalbody);
            // Validate the response status    
            expect(bookRentalResponse.status()).toBe(201);
            console.log(`Created rental ${i + 1} for user ID ${userId}`);
        };

        // GET request to the /arrendamentos/me?usuarioId=<userId> endpoint
        const response = await bookrentalsService.getUserRentals(userId);

        // Validate the response status
        expect(response.status()).toBe(200);

        // Validate format of array
        const listOfRentals = await response.json();
        expect(Array.isArray(listOfRentals)).toBe(true);

        // Validate each rental belongs to the user
        for (const rental of listOfRentals) {
            expect(rental).toHaveProperty('usuarioId', userId);
        };

        console.log(listOfRentals);
    });

});