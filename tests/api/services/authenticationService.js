export class AuthenticationService {
    constructor(request) {
        this.request = request;
    };

    // Register a new user with given details
    async register({ nome, email, senha }) {
        return await this.request.post('/registro', {
            data: { nome, email, senha }
        });
    };

    // Register a test user with random details for testing
    async registerTestUser() {
        return await this.request.post('/registro', {
            data: {
                nome: "Dani Simões",
                email: "dani.simoes" + Date.now() + "@teste.com",
                senha: "senha123"
            }
        });
    };

    // Login user with given credentials
    async login({ email, senha }) {
        return await this.request.post('/login', {
            data: { email, senha }
        });
    };

    // Users default for test purposes
    async loginAdmin() {
        return await this.request.post('/login', {
            data: { email: "admin@biblioteca.com", senha: "123456" }
        });
    };

    async loginEmployee() {
        return await this.request.post('/login', {
            data: { email: "func@biblio.com", senha: "123456" }
        });
    };

    async loginStudent() {
        return await this.request.post('/login', {
            data: { email: "aluna@teste.com", senha: "123456" }
        });
    };
};