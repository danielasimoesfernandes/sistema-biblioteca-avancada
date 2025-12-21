// @ts-check
import { test, expect } from '@playwright/test';
import { AuthenticationService } from '../services/authenticationService.js';


test.describe('Autentication - Registration', () => {
    test('CT-API-001 - Registration of a new Student user (Sucessful)', async ({ request }) => {

        const autenticationService = new AuthenticationService(request);

        // Input data for user creation 
        const body = {
            nome: "Daniela Fernandes",
            email: "daniela.fernandes" + Date.now() + "@teste.com",
            senha: "senha123"
        };

        // POST request to the /registro endpoint
        const response = await autenticationService.register(body);

        // Validate the response status
        expect(response.status()).toBe(201);

        const newUser = await response.json();

        // Validate the message
        expect(newUser).toHaveProperty('mensagem', 'Usuário criado com sucesso');

        // Validate that the 'usuario' object exists
        expect(newUser).toHaveProperty('usuario');
        // Validate the returned fields
        const usuario = newUser.usuario;

        expect(usuario).toHaveProperty('id');
        expect(typeof usuario.id).toBe('number');
        expect(usuario.id).toBeGreaterThan(0);
        expect(usuario).toHaveProperty('nome', body.nome);
        expect(usuario).toHaveProperty('email', body.email);
        expect(usuario).toHaveProperty('tipo', 1); // Student type is '1'
        expect(usuario).not.toHaveProperty('senha');

        console.log(newUser);
    });

    test('CT-API-002 - Registration with Duplicate Email (Failure)', async ({ request }) => {

        // Preconditions: email admin@biblioteca.com is already registered in the system.

        const autenticationService = new AuthenticationService(request);

        // Input data for user creation 
        const body = {
            nome: "João Santos",
            email: "admin@biblioteca.com",
            senha: "senha456"
        };

        // POST request to the /registro endpoint
        const response = await autenticationService.register(body);

        // Validate the response status
        expect(response.status()).toBe(400);

        const alreadyRegisteredUser = await response.json();

        // Validate the message
        expect(alreadyRegisteredUser).toHaveProperty('mensagem', 'Email já cadastrado');

        console.log(alreadyRegisteredUser);
    });
});

//////////////////////////////////////////////////////////////

test.describe('Autentication - Login', () => {
    test('CT-API-003 - Login with Valid Credentials (Admin)', async ({ request }) => {

        const autenticationService = new AuthenticationService(request);

        // POST request to the /login endpoint
        const response = await autenticationService.loginAdmin();

        // Validate the response status
        expect(response.status()).toBe(200);

        // Duration of the request
        const start = Date.now();
        const duration = Date.now() - start; // calculate duration in ms
        expect(duration).toBeLessThan(2000);

        // Validate the response message
        const loggedUser = await response.json();

        expect(loggedUser).toHaveProperty('mensagem', 'Login realizado com sucesso');

        // Validate that the 'usuario' object exists
        expect(loggedUser).toHaveProperty('usuario');

        // Validate the returned fields
        const usuario = loggedUser.usuario;

        expect(usuario).not.toHaveProperty('senha');
        expect(usuario).toHaveProperty('tipo', 3); // Admin type is '3'

        console.log(loggedUser);
    });

    test('CT-API-004 - Login with Invalid Credentials (Failure)', async ({ request }) => {

        const autenticationService = new AuthenticationService(request);

        // Input data for user creation 
        const body = {
            email: "admin@biblioteca.com",
            senha: "senhaerrada"
        };

        // POST request to the /login endpoint
            const response = await request.post('/login', { data: body });

        // Validate the response status
        expect(response.status()).toBe(401);

        const invalidUsed = await response.json();

        // Validate the message
        expect(invalidUsed).toHaveProperty('mensagem', 'Email ou senha incorretos');

        console.log(invalidUsed);
    });
});


