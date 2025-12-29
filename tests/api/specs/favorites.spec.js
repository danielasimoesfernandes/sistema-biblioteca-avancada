// @ts-check
import { test, expect } from '@playwright/test';
import { FavoritesService } from '../services/favoritesServices.js';
import { BookFactory } from '../factories/bookFactory.js';
import { UserFactory } from '../factories/userFactory.js';
import { fa } from 'faker/lib/locales.js';


test.describe('Favorites Management', () => {

    test('CT-API-014 - Add a book to favorites', async ({ request }) => {

        const favoritesService = new FavoritesService(request);
        const bookFactory = new BookFactory(request);
        const userFactory = new UserFactory(request);

        // Create a new user to ensure it exists for adding favorites
        const newUserForFavorites = await userFactory.registerTestUser();
        const newUserId = newUserForFavorites.userId;

        // Create a new book to ensure it exists for adding to favorites
        const createBookResponse = await bookFactory.createBookTest();
        expect(createBookResponse.status()).toBe(201);
        const newBookForFavorites = await createBookResponse.json();
        const newBookId = newBookForFavorites.id;

        // Input data to add favorite
        const body = {
            usuarioId: newUserId,
            livroId: newBookId
        };

        // Add to favorites - ensure clean state
        const addFavoriteResponse = await favoritesService.addBookToFavorites(body);
        expect([201]).toContain(addFavoriteResponse.status());

        // DELETE request to the /favoritos endpoint to ensure clean state
        const deleteResponse = await favoritesService.removeBookFromFavorites(body);
        // Accept 200 (deleted), or 404 (not found) beecause it may or not be in favorites
        expect([200, 404]).toContain(deleteResponse.status());

        // POST request to the /favoritos endpoint
        const response = await request.post('/favoritos', { data: body });

        // Validate the response status
        expect(response.status()).toBe(201);

        const favoriteBook = await response.json();

        // Validate the message
        expect(favoriteBook).toHaveProperty('mensagem', 'Livro adicionado aos favoritos');

        console.log(favoriteBook);
    });


    test('CT-API-015 – Add a book already in favorites (Failure)', async ({ request }) => {

        const favoritesService = new FavoritesService(request);
        const bookFactory = new BookFactory(request);
        const userFactory = new UserFactory(request);

        // Create a new user to ensure it exists for adding favorites
        const newUserForFavorites = await userFactory.registerTestUser();
        const newUserId = newUserForFavorites.userId;

        // Create a new book to ensure it exists for adding to favorites
        const createBookResponse = await bookFactory.createBookTest();
        expect(createBookResponse.status()).toBe(201);
        const newBookForFavorites = await createBookResponse.json();
        const newBookId = newBookForFavorites.id;

        // Input data to add favorite
        const body = {
            usuarioId: newUserId,
            livroId: newBookId
        };

        // DELETE request to the /favoritos endpoint to ensure clean state
        const deleteResponse = await favoritesService.removeBookFromFavorites(body);
        // Accept 200 (deleted), or 404 (not found) beecause it may or not be in favorites
        expect([200, 404]).toContain(deleteResponse.status());

        // POST request to the /favoritos endpoint to add the book first time
        const firstAddResponse = await favoritesService.addBookToFavorites(body);
        expect(firstAddResponse.status()).toBe(201);

        // POST request to the /favoritos endpoint to try to add the same book again to favorites 
        const secondAddResponse = await favoritesService.addBookToFavorites(body);
        expect(secondAddResponse.status()).toBe(400);

        // Validate the message
        const errorResponse = await secondAddResponse.json();
        expect(errorResponse).toHaveProperty('mensagem', 'Já está nos favoritos');

        console.log(errorResponse);
    });


    test('CT-API-016 - List user favorites', async ({ request }) => {

        const favoritesService = new FavoritesService(request);
        const bookFactory = new BookFactory(request);
        const userFactory = new UserFactory(request);

        // Create a new user to ensure it exists for adding favorites
        const newUserForFavorites = await userFactory.registerTestUser();
        const newUserId = newUserForFavorites.userId;

        // Add favorites for the user
        for (let i = 0; i < 3; i++) {
            // Create book for rental test
            const bookForFavoritesResponse = await bookFactory.createBookTest();
            expect(bookForFavoritesResponse.status()).toBe(201);
            const bookForFavorites = await bookForFavoritesResponse.json();
            const bookId = bookForFavorites.id;

            // Add to favorites - ensure clean state
            const addFavoriteResponse = await favoritesService.addBookToFavorites({ usuarioId: newUserId, livroId: bookId });
            expect([201]).toContain(addFavoriteResponse.status());

            console.log(`Added book ID ${bookId} to favorites for user ID ${newUserId}.`);
        };

        // GET request to the /favoritos/1 endpoint to get favorites for user with ID 1
        const response = await favoritesService.getUserFavorites(newUserId);
        // Validate the response status
        expect(response.status()).toBe(200);

        // Validate format of array
        const userFavorites = await response.json();
        expect(Array.isArray(userFavorites)).toBe(true);

        // Validate all favorites belong to the user
        if (userFavorites.length > 0) {
            for (const book of userFavorites) {
                expect(book).toHaveProperty('id');
                expect(book).toHaveProperty('nome');
                expect(book).toHaveProperty('autor');
                expect(book).toHaveProperty('paginas');
                expect(book).toHaveProperty('descricao');
                expect(book).toHaveProperty('imagemUrl');
                expect(book).toHaveProperty('dataCadastro');
                expect(book).toHaveProperty('estoque');
                expect(book).toHaveProperty('preco');
            }
        } else {
            console.log('User has no favorite books.');
        }

        console.log(userFavorites);
    });

    test('CT-API-017 - Remove book from favorites', async ({ request }) => {

        const favoritesService = new FavoritesService(request);
        const bookFactory = new BookFactory(request);
        const userFactory = new UserFactory(request);

        // Create a new user to ensure it exists for testing
        const newUserForFavorites = await userFactory.registerTestUser();
        const newUserId = newUserForFavorites.userId;

        // Create a new book to ensure it exists for testing
        const createBookResponse = await bookFactory.createBookTest();
        expect(createBookResponse.status()).toBe(201);
        const newBookForFavorites = await createBookResponse.json();
        const newBookId = newBookForFavorites.id;

        // Input data to add and remove from favorites
        const body = {
            usuarioId: newUserId,
            livroId: newBookId
        };

        // Add to favorites - ensure clean state
        const addFavoriteResponse = await favoritesService.addBookToFavorites(body);
        expect([201]).toContain(addFavoriteResponse.status());

        // DELETE request to the /favoritos endpoint to ensure clean state
        const deleteResponse = await favoritesService.removeBookFromFavorites(body);
        // Accept 200 (deleted), or 404 (not found) beecause it may or not be in favorites
        expect([200, 404]).toContain(deleteResponse.status());

        // Validate the message
        const deleteFromFavoritesResponse = await deleteResponse.json();
        expect(deleteFromFavoritesResponse).toHaveProperty('mensagem', 'Livro removido dos favoritos');

        console.log(deleteFromFavoritesResponse);
    });
});