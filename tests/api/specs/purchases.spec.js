// @ts-check
import { test, expect } from '@playwright/test';
import { BookFactory } from '../factories/bookFactory.js';
import { PurchasesService } from '../services/purchasesServices.js';
import { AuthenticationService } from '../services/authenticationService.js';
import { BooksService } from '../services/booksService.js';
import { BookrentalsService } from '../services/bookrentalsService.js';


test.describe('Create Purchases', () => {
    test('CT-API-023 - Purchase with stock available', async ({ request }) => {

        const purchasesService = new PurchasesService(request);
        const authService = new AuthenticationService(request);
        const bookFactory = new BookFactory(request);
        const booksService = new BooksService(request);

        // Create a book to be used in purchase tests
        const createBookResponse = await bookFactory.createBookTest();
        expect(createBookResponse.status()).toBe(201);
        const newBookForPurchase = await createBookResponse.json();
        const bookId = newBookForPurchase.id;

        // Create a user to be used in purchase tests
        const registerUserResponse = await authService.registerTestUser();
        expect(registerUserResponse.status()).toBe(201);
        const newUser = await registerUserResponse.json();
        const userId = newUser.id;

        // Input data to book purchase
        const bookPurchaseBody = {
            usuarioId: userId,
            livroId: bookId,
            quantidade: 2
        };

        // Validate book stock before purchase
        const bookResponse = await booksService.getBookById(bookId);
        expect(bookResponse.status()).toBe(200);
        // Ensure the book has stock available
        const bookDetailsBeforePurchase = await bookResponse.json();
        if (bookDetailsBeforePurchase.estoque < bookPurchaseBody.quantidade) {
            bookDetailsBeforePurchase.estoque = 5; // Adjust stock for test purposes
            await booksService.updateBook(bookId, bookDetailsBeforePurchase);
        }
        expect(bookDetailsBeforePurchase.estoque).toBeGreaterThan(0);

        // POST request to the /compras endpoint to rent a book
        const response = await purchasesService.purchaseBook(bookPurchaseBody);
        // Validate the response status
        expect(response.status()).toBe(201);

        // Validate response body
        const purchaseBookResponse = await response.json();
        expect(purchaseBookResponse).toHaveProperty('status', 'PENDENTE');
        expect(purchaseBookResponse).toHaveProperty('total', bookDetailsBeforePurchase.preco * bookPurchaseBody.quantidade);

        console.log("Purchase status: ", purchaseBookResponse.status);
        console.log("Purchase total: ", bookDetailsBeforePurchase.preco, " X ", bookPurchaseBody.quantidade, " = ", purchaseBookResponse.total);

    });


    test('CT-API-024 – Purchase with unsuficiente stock available (Failure)', async ({ request }) => {

        const purchasesService = new PurchasesService(request);
        const authService = new AuthenticationService(request);
        const bookFactory = new BookFactory(request);
        const booksService = new BooksService(request);

        // Create a book to be used in purchase tests
        const createBookResponse = await bookFactory.createBookTest();
        const newBookForPurchase = await createBookResponse.json();
        const bookId = newBookForPurchase.id;

        // Create a user to be used in purchase tests
        const registerUserResponse = await authService.registerTestUser();
        const newUser = await registerUserResponse.json();
        const userId = newUser.id;

        // Validate book stock before purchase
        const bookResponse = await booksService.getBookById(bookId);

        // Input data to book purchase
        const body = {
            usuarioId: userId,
            livroId: bookId,
            quantidade: 100
        };

        // POST request to the /compras endpoint to rent a book
        const response = await purchasesService.purchaseBook(body);

        // Validate response body
        const purchaseBookResponse = await response.json();
        expect(purchaseBookResponse).toHaveProperty('mensagem', 'Estoque insuficiente');

        console.log(purchaseBookResponse);

    });
});

test.describe('Update Purchases Status', () => {
    test('CT-API-025 - Update purchase status to approved', async ({ request }) => {

        const purchasesService = new PurchasesService(request);
        const authService = new AuthenticationService(request);
        const bookFactory = new BookFactory(request);
        const booksService = new BooksService(request);

        // Create a book to be used in purchase tests
        const createBookResponse = await bookFactory.createBookTest();
        expect(createBookResponse.status()).toBe(201);
        const newBookForPurchase = await createBookResponse.json();
        const bookId = newBookForPurchase.id;

        // Create a user to be used in purchase tests
        const registerUserResponse = await authService.registerTestUser();
        expect(registerUserResponse.status()).toBe(201);
        const newUser = await registerUserResponse.json();
        const userId = newUser.id;

        // Validate book stock before purchase
        const bookResponse = await booksService.getBookById(bookId);
        expect(bookResponse.status()).toBe(200);

        // Ensure the book has stock available
        const bookDetailsBeforePurchase = await bookResponse.json();
        if (bookDetailsBeforePurchase.estoque <= 0) {
            bookDetailsBeforePurchase.estoque = 10; // Adjust stock for test purposes
            await booksService.updateBook(bookId, bookDetailsBeforePurchase);
        }
        expect(bookDetailsBeforePurchase.estoque).toBeGreaterThan(0);

        // Save initial stock for later validation
        const stockBeforePurchase = bookDetailsBeforePurchase.estoque;

        // Input data to book purchase
        const bookPurchasedbody = {
            usuarioId: userId,
            livroId: bookId,
            quantidade: 4
        };

        // POST request to the /compras endpoint to purchase a book
        const bookPurchaseResponse = await purchasesService.purchaseBook(bookPurchasedbody);
        // Validate the response status
        expect(bookPurchaseResponse.status()).toBe(201);
        const purchasedBook = await bookPurchaseResponse.json();
        console.log("Purchase with ID ", purchasedBook.id, " created with status: ", purchasedBook.status);
        const purchaseId = purchasedBook.id;

        // Input data to update rental status
        const updateStatusbody = {
            status: "APROVADA"
        };

        // PUT request to the /compras/{id}/status endpoint to purchase a book
        const response = await request.put(`/compras/${purchaseId}/status`, { data: updateStatusbody });
        // Validate the response status
        expect(response.status()).toBe(200);

        // Validate book stock after purchase
        const bookStockAfterPurchaseResponse = await booksService.getBookById(bookId);
        expect(bookStockAfterPurchaseResponse.status()).toBe(200);
        const stockAfterPurchase = (await bookStockAfterPurchaseResponse.json()).estoque;

        // Validate that stock decreased by purchased quantity
        console.log("Stock before purchase: ", stockBeforePurchase, " -> Stock after purchase: ", stockAfterPurchase, ".");
        expect(stockAfterPurchase).toBe(stockBeforePurchase - bookPurchasedbody.quantidade);
    });


    test('CT-API-026 - Update purchase status to cancelled', async ({ request }) => {

        const purchasesService = new PurchasesService(request);
        const authService = new AuthenticationService(request);
        const bookFactory = new BookFactory(request);
        const booksService = new BooksService(request);

        // Create a book to be used in purchase tests
        const createBookResponse = await bookFactory.createBookTest();
        const newBookForPurchase = await createBookResponse.json();
        const bookId = newBookForPurchase.id;

        // Create a user to be used in purchase tests
        const registerUserResponse = await authService.registerTestUser();
        const newUser = await registerUserResponse.json();
        const userId = newUser.id;

        // Validate book stock before purchase
        const bookResponse = await booksService.getBookById(bookId);
        const bookDetailsBeforePurchase = await bookResponse.json();

        // Save initial stock for later validation
        const stockBeforePurchase = bookDetailsBeforePurchase.estoque;

        // Input data to book purchase
        const bookPurchasedbody = {
            usuarioId: userId,
            livroId: bookId,
            quantidade: 2
        };

        // POST request to the /compras endpoint to purchase a book
        const bookPurchaseResponse = await purchasesService.purchaseBook(bookPurchasedbody);
        const purchasedBook = await bookPurchaseResponse.json();
        console.log("Purchase with ID ", purchasedBook.id, " created with status: ", purchasedBook.status);
        const purchaseId = purchasedBook.id;

        // Input data to update rental status
        const updateStatusbody = {
            status: "CANCELADA"
        };

        // PUT request to the /compras/{id}/status endpoint to purchase a book
        const bookPurchaseCancelledresponse = await request.put(`/compras/${purchaseId}/status`, { data: updateStatusbody });

        // Validate the response status
        expect(bookPurchaseCancelledresponse.status()).toBe(200);
        const purchaseCancelled = await bookPurchaseCancelledresponse.json();
        expect(purchaseCancelled).toHaveProperty('status', 'CANCELADA');
        console.log("Purchase with ID ", purchaseId, " updated to status: ", purchaseCancelled.status);

        // Validate that stock remains the same after purchase cancellation
        const bookStockAfterPurchaseResponse = await booksService.getBookById(bookId);
        const stockAfterPurchase = (await bookStockAfterPurchaseResponse.json()).estoque;
        console.log("Stock before purchase: ", stockBeforePurchase, " -> Stock after purchase cancellation: ", stockAfterPurchase, ".");
        expect(stockAfterPurchase).toBe(stockBeforePurchase);
    });
});


test.describe('List ans Search Purchases', () => {
    test('CT-API-027 - List all purchases from a user', async ({ request }) => {

        const purchasesService = new PurchasesService(request);
        const authService = new AuthenticationService(request);
        const bookFactory = new BookFactory(request);
        const purchaseService = new PurchasesService(request);

        // Create a user to be used in purchase tests
        const registerUserResponse = await authService.registerTestUser();
        const newUser = await registerUserResponse.json();
        const userId = newUser.usuario.id;

        // Create multiple purchases for the user
        for (let i = 0; i < 3; i++) {
            // Create book for purchase test
            const bookForPurchaseResponse = await bookFactory.createBookTest();
            expect(bookForPurchaseResponse.status()).toBe(201);
            const bookForPurchase = await bookForPurchaseResponse.json();
            const bookId = bookForPurchase.id;

            // Add to purchases
            const purchaseBody = {
                usuarioId: userId,
                livroId: bookId,
                quantidade: 1
            };
            const addPurchaseResponse = await purchaseService.purchaseBook(purchaseBody);
            expect([201]).toContain(addPurchaseResponse.status());

            console.log(`Created purchase for book ID ${bookId} for user ID ${userId}.`);
        };

        // GET request to the /compras/me?usuarioId={userId} endpoint
        const response = await purchaseService.getUserPurchases(userId);

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

    test('CT-API-028 - List all purchases', async ({ request }) => {

        const purchasesService = new PurchasesService(request);

        // GET request to the /compras endpoint
        const response = await purchasesService.getPurchases();

        // Validate the response status
        expect(response.status()).toBe(200);

        // Validate format of array
        const listOfPurchases = await response.json();
        expect(Array.isArray(listOfPurchases)).toBe(true);
        for (const purchase of listOfPurchases) {
            expect(purchase).toHaveProperty('id');
            expect(purchase).toHaveProperty('usuarioId');
            expect(purchase).toHaveProperty('livroId');
            expect(purchase).toHaveProperty('quantidade');
            expect(purchase).toHaveProperty('status');
        }

        console.log(listOfPurchases);
    });
});
