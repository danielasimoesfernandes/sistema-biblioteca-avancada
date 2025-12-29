export class StatsService {
    constructor(request) {
        this.request = request;
    };

    // Get overall statistics
    async getStats() {
        return await this.request.get('/estatisticas');
    };
};