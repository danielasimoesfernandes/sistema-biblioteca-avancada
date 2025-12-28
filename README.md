
# 📚 Advanced Library Automation

A comprehensive Library Management System designed specifically for advanced test automation practice, covering both API (backend) and UI (frontend) testing with Playwright.

This project simulates real-world application flows and is ideal for QA Engineers and developers who want hands-on experience with end-to-end testing, integration testing, and modern automation strategies using JavaScript.



## 🎯 About the Project

This project serves as a learning and practice environment focused on **QA Engineering and Test Automation**. It provides complex real-world scenarios, including:
* Multi-role authentication flows (Student, Staff, Admin).
* Dynamic data handling (Full Book and User CRUD).
* State-dependent logic (Rental Approvals & Stock Management).
* Conditional UI rendering based on user permissions.
## 🚀 Features Covered

### 🔐 Authentication & Authorization
- **Public registration:** Account creation always as Student.
- **Login:** Email and password authentication.
- **User roles:**
    - Student (type 1)
    - Staff (type 2)
    - Administrator (type 3)
- **User Administration (Admin only):** Dedicated panel where admins can create, edit, and delete staff members and other admins (full CRUD).

### 📖 Book Management
- **Create Book:** Title, author, number of pages, description, cover image, stock, and price.
- **List Books:** Responsive grid with book covers and key information.
- **Details Page:** Dedicated page for viewing detailed book information.
- **Update / Delete:** Full edit and removal operations.

### 📅 Rentals (Loans)
- **Student:**
    - Request a rental by selecting a book by name.
    - View a “My Rentals” list.
- **Employee / Admin:**
    - Rental Approval screen listing all rental requests.
    - Approve or reject requests, with automatic stock updates.

### 🛒 Purchases
- **Student Purchases:**
    - Page to browse available books and register purchases.
    - Separate “My Purchases” page for purchase history.
- **Admin / Employee Purchases:**
    - "Admin Purchases” page listing all purchases.
    - Approve or cancel purchases, with stock control.

### 📊 Dashboard
- **Student View:** Available books, total books, number of students.
- **Employee View:** Pending rentals, available books, number of staff members.
- **Admin View:** Total books and users, plus counts of Students, Staff, and Admins.

### ❤️ Favorites System
- Add or remove books from favorites.
- My Favorites” page displaying only favorited books.

### 🎨 User Interface
- Responsive layout (desktop, tablet, mobile).
- Consistent navigation across all pages.
- Success and error alerts for key actions.
## 🛠️ Technologies 

### Backend
- **Node.js** – JavaScript runtime.
- **Express** – Web framework.
- **CORS** – Cross-origin resource sharing.
- **Swagger UI Express** + **Swagger JSDoc** – Interactive API documentation

### Frontend
- **HTML5** – Semantic structure.
- **CSS3** – Layout using Flexbox and Grid.
- **JavaScript (ES6+)** – Application logic.
- **Fetch API** – Asynchronous HTTP requests.

***

## 📋 Requirements

- Node.js 14+ (LTS recommended).
- npm.
- Git (to clone the repository).

***

## 🚀 How to Run Locally

```bash
git clone https://github.com/danielasimoesfernandes/advanced-library-automation.git
cd advanced-library-automation
npm install
npm start
```

The app will be running at http://localhost:3000

#### Main access points

- Application (login): `http://localhost:3000/login.html`  
- Swagger: `http://localhost:3000/api-docs`  
- API Base URL: `http://localhost:3000`

***
## 📁 Project structure 

```text
advanced-library-automation/
└── 📁.vscode
    ├── settings.json
└── 📁frontend-tests
    ├── login.spec.js
└── 📁public
    └── 📁css
        ├── style.css
    └── 📁js
        ├── admin-usuarios.js
        ├── aprovacoes.js
        ├── arrendamentos.js
        ├── auth.js
        ├── compras-admin.js
        ├── compras.js
        ├── dashboard.js
        ├── detalhes.js
        ├── favoritos.js
        ├── livros.js
        ├── login.js
        ├── registro.js
    ├── admin-usuarios.html
    ├── app.js
    ├── aprovacoes.html
    ├── arrendamentos.html
    ├── compras-admin.html
    ├── compras.html
    ├── dashboard.html
    ├── detalhes.html
    ├── favoritos.html
    ├── index.html
    ├── livros.html
    ├── login.html
    ├── registro.html
└── 📁test cases - apis and frontend
    ├── Casos de Teste – Backend (API).pdf
    ├── Casos de Teste – Frontend (UI).pdf
    ├── Hands-on Lab_ Automação de Testes – Sistema de Biblioteca (CRE).pdf
└── 📁tests
    └── 📁api
        └── 📁factories
            ├── bookFactory.js
            ├── userFactory.js
        └── 📁services
            ├── authenticationService.js
            ├── bookrentalsService.js
            ├── booksService.js
            ├── favoritesServices.js
            ├── purchasesServices.js
            ├── statsServices.js
            ├── usersService.js
        └── 📁specs
            ├── authentication.spec.js
            ├── bookrentals.spec.js
            ├── books.spec.js
            ├── favorites.spec.js
            ├── purchases.spec.js
            ├── stats.spec.js
            ├── users.spec.js
    └── 📁ui
        └── 📁pages
            ├── adminUsersPage.js
            ├── approvalsPage.js
            ├── bookDetailsPage.js
            ├── booksPage.js
            ├── dashboardPage.js
            ├── favoritesPage.js
            ├── loginPage.js
            ├── purchasesPage.js
            ├── registrationPage.js
            ├── rentalsPage.js
        └── 📁specs
            ├── adminUsers.spec.js
            ├── books.spec.js
            ├── dashboard.spec.js
            ├── favorites.spec.js
            ├── logout.spec.js
            ├── navigationsControl.spec.js
            ├── purchases.spec.js
            ├── registrationLogin.spec.js
            ├── rentals.spec.js
├── .DS_Store
├── notes.txt
├── package-lock.json
├── package.json
├── playwright.config.js
├── README.md
└── server.js
```
## 🔌 Endpoints da API (Resumo)

### Autenticação

| Method | Endpoint     | Description                              |
|--------|--------------|------------------------------------------|
| POST   | `/registro`  | Create user (student / employee / admin) |
| POST   | `/login`     | Authenticate user                        |

### Users (Admin / CRUD)

| Method | Endpoint         | Description                         |
|--------|------------------|-------------------------------------|
| GET    | `/usuarios`      | List users (without password)       |
| PUT    | `/usuarios/:id`  | Update name / email / role          |
| DELETE | `/usuarios/:id`  | Delete user (except user with id 1) |

### Books

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/livros`                 | List all books                  |
| GET    | `/livros/disponiveis`     | List only books with stock > 0  |
| GET    | `/livros/:id`             | Get book by ID                  |
| POST   | `/livros`                 | Create book                     |
| PUT    | `/livros/:id`             | Update book                     |
| DELETE | `/livros/:id`             | Delete book                     |
| GET    | `/livros/recentes/ultimos`| Get last 5 added bookS          |

### Statistics

| Method | Endpoint        | Description                                           |
|--------|-----------------|------------------------------------------------------|
| GET    | `/estatisticas` | Totals of books, pages, users, and pending requests  |

### Favorites

| Method | Endpoint               | Description                   |
|--------|------------------------|-------------------------------|
| GET    | `/favoritos/:usuarioId`| List user favorites           |
| POST   | `/favoritos`           | Add book to favorites          |
| DELETE | `/favoritos`           | Remove book from favorites     |

### Rentals (Loans)

| Method | Endpoint                   | Description                                            |
|--------|----------------------------|--------------------------------------------------------|
| GET    | `/arrendamentos`           | List all rentals (for approval)                        |
| GET    | `/arrendamentos/me`        | List rentals for a user (usuarioId as query parameter) |
| POST   | `/arrendamentos`           | Request rental                                         |
| PUT    | `/arrendamentos/:id/status`| Update status (APPROVED / CANCELED).                   |

### Purchases

| Method | Endpoint                 | Description                                              |
|--------|--------------------------|----------------------------------------------------------|
| GET    | `/compras`               | List all purchases                                       |
| GET    | `/compras/me`            | List purchases for a user (usuarioId as query parameter) |
| POST   | `/compras`               | Register purchase                                        |
| PUT    | `/compras/:id/status`    | Update status (APPROVED / CANCELED).                     |

***


## 🎓 Automated Testing Usage

This project was designed as a foundation for automated testing practice, covering both API and UI test scenarios.
It is ideal for training and validating:
- API Testing: user registration and login, book CRUD operations, rentals (loans), purchases, validation errors, and state transitions (pending, approved, rejected).
- UI Testing: real user flows such as authentication, role-based navigation, favorites management, purchases, and the admin panel, including form validation and conditional behavior based on user roles.

## 🛠 Suggested Testing Tools
 
- API Testing: Postman, Insomnia, Rest Assured, Playwright, Cypress
- UI Testing: Selenium WebDriver, Cypress, Playwright, Puppeteer

## 💡 Test Data

### Initial Users
- **Admin:**
    - Email: admin@biblioteca.com
    - Password: 123456
- **Employee:**
    - Email: func@biblio.com
    - Password: 123456
- **Student:**
    - Email: aluna@teste.com
    - Password: 123456

⸻

### Initial Books
	1.	Clean Code – Robert C. Martin (464 pages)
	2.	Harry Potter – J.K. Rowling (309 pages)

## 📝 License & Author

Open-source project created for educational and testing purposes by: 
- Author: Bruno Figueiredo
    - GitHub: @brunonf15￼
    - LinkedIn: Bruno Figueiredo￼

Automated tests created by: 
- Author: Daniela Fernandes
    - GitHub: @danielasimoesfernandes
    - LinkedIn: https://www.linkedin.com/in/danielafernandes20/

## 🧪 Note for Test Automation Projects

This project served as the base application for building and validating automated API and UI test suites, focusing on real-world scenarios, role-based access control, and maintainable test design.
