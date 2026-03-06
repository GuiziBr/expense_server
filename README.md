# Expenses Server

This is the backend server for an expense tracking application. It is a NestJS-based application using TypeScript, Prisma, and PostgreSQL.

## Features

- User authentication with JWT
- CRUD operations for banks, categories, payment types, and stores
- Expense tracking with details like amount, date, category, etc.
- Statement period management
- Balance calculation

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or higher)
- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/) (optional)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/expenses-server.git
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```bash
    DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase?schema=public"
    JWT_SECRET="your-secret-key"
    ```

4.  Start the database:

    ```bash
    docker-compose up -d
    ```

5.  Run database migrations:

    ```bash
    npm run migrate
    ```

### Running the Application

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

## API Endpoints

The following are the main API endpoints:

- `POST /auth/login`: Authenticate a user and get a JWT token.
- `POST /users`: Create a new user.
- `GET /balance`: Get the user's balance.
- `/banks`: CRUD operations for banks.
- `/categories`: CRUD operations for categories.
- `/expenses`: CRUD operations for expenses.
- `/payment-types`: CRUD operations for payment types.
- `/statement-periods`: CRUD operations for statement periods.
- `/stores`: CRUD operations for stores.

For detailed information about the API, please refer to the code.

## Scripts

- `npm run build`: Build the application.
- `npm run format`: Format the code.
- `npm run start`: Start the application.
- `npm run start:dev`: Start the application in watch mode.
- `npm run start:debug`: Start the application in debug mode.
- `npm run start:prod`: Start the application in production mode.
- `npm run lint`: Lint the code.
- `npm run migrate`: Run database migrations.
- `npm run test`: Run unit tests.
- `npm run test:watch`: Run unit tests in watch mode.
- `npm run test:cov`: Run unit tests with coverage.
- `npm run test:debug`: Run unit tests in debug mode.
- `npm run test:e2e`: Run end-to-end tests.

## Database Schema

The database schema is defined in the `prisma/schema.prisma` file. It consists of the following models:

- `User`
- `Bank`
- `Category`
- `PaymentType`
- `StatementPeriod`
- `Store`
- `Expense`

## Environment Variables

- `DATABASE_URL`: The connection string for the PostgreSQL database.
- `PORT`: The port on which the application will run (default: 3000).
- `JWT_SECRET`: The secret key for signing JWT tokens.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the UNLICENSED License.