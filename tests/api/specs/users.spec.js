// @ts-check
import { test, expect } from '@playwright/test';
import { UsersService } from '../services/usersService.js';
import { UserFactory } from '../factories/userFactory.js';

test.describe('Users - Management', () => {
    test('CT-API-029 - List all users', async ({ request }) => {
        const usersService = new UsersService(request);

        const response = await usersService.getUsers();
        expect(response.status()).toBe(200);

        // Validate the reponse body is an array
        const usersList = await response.json();
        expect(Array.isArray(usersList)).toBe(true);

        // Validate fields of each user
        for (const user of usersList) {
            expect(user).toHaveProperty('id');
            expect(typeof user.id).toBe('number');
            expect(user.id).toBeGreaterThan(0);

            expect(user).toHaveProperty('nome');
            expect(typeof user.nome).toBe('string');
            expect(user.nome.length).toBeGreaterThan(0);

            expect(user).toHaveProperty('email');
            expect(typeof user.email).toBe('string');
            expect(user.email.length).toBeGreaterThan(0);

            expect(user).toHaveProperty('tipo');
            expect([1, 2, 3]).toContain(user.tipo); // Assuming 1=Student, 2=Employee, 3=Admin

            expect(user).not.toHaveProperty('senha'); // Password should not be exposed
        }

        console.log(usersList);
    });


    test('CT-API-030 - Update user data', async ({ request }) => {

        const usersService = new UsersService(request);
        const userFactory = new UserFactory(request);

        // Create a user to be updated
        const newUser = await userFactory.registerTestUser();
        const userId = newUser.userId;
        console.log(`Created user: ${newUser.fullName}, with email ${newUser.email} and user ID ${newUser.userId} `);

        const updatedData = {
            nome: "João Atualizado", // "João Funcionário",
            email: "joao.admin@biblio.com", // "func@biblio.com",
            tipo: 2 // Change to Employee
        };

        const response = await request.put(`/usuarios/${userId}`, { data: updatedData });
        expect(response.status()).toBe(200);

        console.log(`User ID ${userId} updated successfully to: `, updatedData);
    });


    test('CT-API-030 - Delete non admin user', async ({ request }) => {
        const usersService = new UsersService(request);
        const userFactory = new UserFactory(request)

        // Create a new user to ensure a deletable user exists
        const newUser = await userFactory.registerTestUser();
        const newUserId = newUser.userId;
        console.log(`New user created with ID ${newUserId} for deletion test.`);

        // Delete the newly created user
        const deleteUserResponse = await usersService.deleteUser(newUserId);
        expect(deleteUserResponse.status()).toBe(200);
        const deleteUser = await deleteUserResponse.json();
        expect(deleteUser).toHaveProperty('mensagem', 'Usuário deletado com sucesso');

        console.log(deleteUser);
    });


    test('CT-API-030 - Delete admin user (Failure)', async ({ request }) => {
        const usersService = new UsersService(request);
        const userId = 1; // User 1 is admin by default and should not be deletable

        const deleteUserResponse = await usersService.deleteUser(userId);
        expect(deleteUserResponse.status()).toBe(403);
        const adminNoDeletdeUser = await deleteUserResponse.json();
        expect(adminNoDeletdeUser).toHaveProperty('mensagem', 'Admin principal não pode ser deletado');

        console.log(adminNoDeletdeUser);
    });
});

