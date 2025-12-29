export class UsersService {
    constructor(request) {
        this.request = request;
    };

    // Get all users
    async getUsers() {
        return await this.request.get('/usuarios');
    };

    // Update user data
    async updateUserData(nome, email, tipo) {
        return await this.request.put(`/usuarios/${userId}`, {
            data: { nome, email, tipo }
        });
    };

    // Delete a user
    async deleteUser(userId) {
        return await this.request.delete(`/usuarios/${userId}`);
    };
};