import { expect } from "@playwright/test";

export class BooksPage {
    constructor(page) {
        this.page = page;
        this.booksPageTitle = page.locator('h1', { hasText: '📚 Gerenciar Livros' });
        this.bookNameField = page.locator('input[type="text"][id="nome"]');
        this.authorNameField = page.locator('input[type="text"][id="autor"]');
        this.pagesField = page.locator('input[type="number"][id="paginas"]');
        this.descriptionField = page.locator('textarea[id="descricao"]');
        this.urlImageField = page.locator('input[type="text"][id="imagemUrl"]');
        this.stockField = page.locator('input[type="number"][id="estoque"]');
        this.priceField = page.locator('input[type="number"][id="preco"]');
        this.addBookButton = page.locator('button[type="submit"]', { hasText: 'Adicionar Livro' });
        this.deleteButton = page.locator('button[class="btn btn-danger"]', { hasText: '🗑️ Deletar Livro' })
        // Function to locate a book card by title and author
        this.bookCard = (title, author) =>
            this.page.locator('.book-card')
                .filter({ hasText: title })
                .filter({ hasText: author });
    }

    // Verify books page title
    async verifyBooksTitle() {
        await expect(this.booksPageTitle).toBeVisible();
        await expect(this.page).toHaveURL(/livros\.html$/);
    };

    // Add a book with given info
    async fillFormToAddBook(book) {
        await this.bookNameField.fill(book.bookName);
        await this.authorNameField.fill(book.authorName);
        await this.pagesField.fill(book.pages);
        await this.descriptionField.fill(book.description);
        await this.urlImageField.fill(book.urlImage);
        await this.stockField.fill(book.stock);
        await this.priceField.fill(book.price);
        await this.addBookButton.click();
    };

    // Validate info after submitting
    async validatAddBookFieldsAfterSubmit() {
        await expect(this.bookNameField).toBeEmpty();
        await expect(this.authorNameField).toBeEmpty();
        await expect(this.pagesField).toBeEmpty();
        await expect(this.descriptionField).toBeEmpty();
        await expect(this.urlImageField).toBeEmpty();
        await expect(this.stockField).toHaveValue('1');
        await expect(this.priceField).toHaveValue('0');
    };

    // Get book by title
    getBookByTitle(title) {
        return this.page.locator('.book-card', { hasText: title });
    };

    // Click on a book card
    async clickOnBookCard(bookCard) {
        await bookCard.click()
    };

    // Validate book info card
    async verifyBookInfoInCard(bookCard, book) {
        await expect(bookCard.locator('h3', { hasText: book.nome })).toBeVisible();
        await expect(bookCard.locator('p', { hasText: `Autor: ${book.autor}` })).toBeVisible();
        await expect(bookCard.locator('p', { hasText: `Páginas: ${book.paginas}` })).toBeVisible();
        await expect(bookCard.locator('p', { hasText: `Estoque: ${book.estoque}` })).toBeVisible();
        await expect(bookCard.locator('p', { hasText: `Preço: R$ ${book.preco}` })).toBeVisible();
    };
};
