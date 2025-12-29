
# 📚 Advanced Library Automation

## 🎯 About the Project

This repository is a **Playwright-based test automation project** built on top of a real **Library Management System** application, designed specifically for advanced **API and UI testing practice**.

It focuses on real-world testing scenarios, including role-based access control, state-driven business logic, and end-to-end user flows, making it ideal for QA Engineers and developers seeking hands-on experience with modern test automation using JavaScript.

***

## ⚙️ Why Playwright?

Playwright was chosen for this project due to:
- Native support for API and UI testing in a single framework
- Fast and reliable execution with built-in waiting mechanisms
- Powerful test isolation and parallel execution
- Strong support for modern JavaScript and TypeScript projects
- Excellent reporting and debugging capabilities

***

## 🚀 Features Covered

### 🔐 Authentication & Authorization
- **Public registration:** Account creation always as Student.
- **Login:** Email and password authentication.
- **User roles:**
    - Student (type 1)
    - Employee (type 2)
    - Administrator (type 3)
- **User Administration (Admin only):** Dedicated panel where admins can create, edit, and delete Employee members and other admins (full CRUD).

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
    - "Admin Purchases" page listing all purchases.
    - Approve or cancel purchases, with stock control.

### 📊 Dashboard
- **Student View:** Available books, total books, number of students.
- **Employee View:** Pending rentals, available books, number of employee members.
- **Admin View:** Total books and users, plus counts of Students, Employees, and Admins.

### ❤️ Favorites System
- Add or remove books from favorites.
- "My Favorites” page displaying only favorited books.

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

## Test Coverage

### API Tests (32 tests)
- ✅ Authentication and user management (11 tests)
- ✅ Book management (3 tests)
- ✅ Favorites (4 tests)
- ✅ Rentals (6 tests)
- ✅ Purchases (8 tests)

### E2E Tests (24 tests)
- ✅ Registration (2 tests)
- ✅ Login (3 tests)
- ✅ Menu validation (2 tests)
- ✅ Dashboard (2 tests)
- ✅ Books (3 tests)
- ✅ Favorites (3 tests)
- ✅ Rentals (2 tests)
- ✅ Purchases (2 tests)
- ✅ User administration (4 tests)
- ✅ Logout (1 test)

**Total: 56 tests** - 100% coverage of specifications

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

### Run tests
- Run all tests: 
```bash 
    npx playwright test 
 ```   
- Run only API tests: 
```bash 
    npx playwright test tests/api
 ```   
 - Run only UI tests: 
```bash 
    npx playwright test tests/ui 
 ```   
  - Open Playwright report: 
```bash 
    npx playwright show-report 
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

***

## 🔌 Endpoints da API (Summary)

### Registration and authentication  

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
| GET    | `/livros/recentes/ultimos`| Get last 5 added books          |

### Statistics

| Method | Endpoint        | Description                                           |
|--------|-----------------|------------------------------------------------------|
| GET    | `/estatisticas` | Totals of books, pages, users, and pending requests  |

### Favorites

| Method | Endpoint               | Description                   |
|--------|------------------------|-------------------------------|
| GET    | `/favoritos/:usuarioId`| List user favorites           |
| POST   | `/favoritos`           | Add book to favorites         |
| DELETE | `/favoritos`           | Remove book from favorites    |

### Rentals (Loans)

| Method | Endpoint                   | Description                                            |
|--------|----------------------------|--------------------------------------------------------|
| GET    | `/arrendamentos`           | List all rentals (for approval)                        |
| GET    | `/arrendamentos/me`        | List rentals for a user (usuarioId as query parameter) |
| POST   | `/arrendamentos`           | Request rental                                         |
| PUT    | `/arrendamentos/:id/status`| Update status (APPROVED / REJECTED).                   |

### Purchases

| Method | Endpoint                 | Description                                              |
|--------|--------------------------|----------------------------------------------------------|
| GET    | `/compras`               | List all purchases                                       |
| GET    | `/compras/me`            | List purchases for a user (usuarioId as query parameter) |
| POST   | `/compras`               | Register purchase                                        |
| PUT    | `/compras/:id/status`    | Update status (APPROVED / CANCELED).                     |

***

## 🧠 Testing Strategy

The testing strategy focuses on validating business-critical flows through a balanced combination of API and UI tests.
The approach prioritizes:
- Comprehensive validation of business rules and user flows.
- Extensive code documentation to improve readability and maintainability.
- Fully independent tests, designed to run in any order and in isolation.
- Dynamic creation of test data (users, books, rentals, purchases), avoiding any dependency on manually pre-created data.
- Test data generation is handled through factory methods, ensuring consistent, reusable, and randomized data creation across test suites.

Key principles:
- API tests validate business logic, data integrity, error handling, and state transitions, providing fast and reliable feedback.
- UI tests validate real end-to-end user journeys, role-based access control, and conditional UI behavior.
- API tests are preferred whenever possible for speed and stability, while UI tests focus on critical user-facing scenarios.

This strategy ensures reliable execution, supports parallel testing, and prevents flaky behavior caused by shared state or data dependencies.

***

## 🎓 Automated Testing Usage

This project was designed as a foundation for automated testing practice, covering both API and UI test scenarios.
It is ideal for training and validating:
- API Testing: user registration and login, book CRUD operations, rentals (loans), purchases, validation errors, and state transitions (pending, approved, rejected).
- UI Testing: real user flows such as authentication, role-based navigation, favorites management, purchases, and the admin panel, including form validation and conditional behavior based on user roles.

***

## 🧪 Test Architecture

### API Tests (Playwright)
API tests are implemented using Playwright Test, following the AAA (Arrange, Act, Assert) pattern to ensure clarity and maintainability.

Key characteristics:
- Tests organized by feature and endpoint
- Clear separation between setup, execution, and assertions
- Full validation of HTTP status codes and response bodies
- Reusable constants and helper functions for test data
- Authentication handled via API context when required

______

### E2E Tests (Playwright)
End-to-end tests are built using Playwright and follow the Page Object Model (POM) to promote reusability and scalability.

Structure highlights:
- Page Objects: Encapsulate selectors and page actions
- Test Specs: Feature-based test files covering complete user journeys
- Tests organized by functionality with clear section comments
- Validation of UI behavior, navigation, and conditional rendering
- Coverage of role-based flows (Student, Employee, Admin)

_____

### Test Independence & Data Management
All tests are designed to be fully **independent and isolated**.

Test data is created dynamically when required (users, books, rentals, purchases), ensuring that:
- Tests do not rely on pre-existing data
- No execution order dependency exists
- Tests can be run individually or in parallel
- Flaky behavior caused by shared state is avoided

**This approach improves test reliability, maintainability, and scalability**.

***

## 🛠 Troubleshooting

#### ❌ Error: ECONNREFUSED
The application is not running or is not accessible:
- Make sure the application is running at: http://localhost:3000

_____

#### ⏱ Error: Timeout
- Verify that the application is responding correctly
- Check if the server is slow or under heavy load
- Increase Playwright timeouts in playwright.config.js if necessary

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

***

## 📝 License & Author

Automated tests created by: 
- Author: **Daniela Fernandes**
    - GitHub: @danielasimoesfernandes
    - LinkedIn: https://www.linkedin.com/in/danielafernandes20/
- Certification Project - Rumos
- Date: 2025

This project served as the base application for building and validating automated API and UI test suites, focusing on real-world scenarios, role-based access control, and maintainable test design, as part of the Rumos certification program. 
