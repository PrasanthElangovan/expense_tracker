Expense Tracker API
    An API for tracking income and expenses for authenticated users, built with Node.js, Express, Sequelize (SQLite), and JWT-based authentication.

Features
    User Authentication: Users can register and log in using their email and password.
    Transaction Management: Users can create, update, delete, and view income and expense transactions.
    Summary: Users can view their total income, total expenses, and balance.
    JWT Authentication: Secures endpoints so only logged-in users can access their data.
    

Technologies Used:
    Node.js
    Express.js
    Sequelize ORM
    SQLite Database
    JWT (JSON Web Token)
    bcrypt.js for password hashing


Setup Instructions
    1. Clone the Repository
      git clone https://github.com/PrasanthElangovan/expense_tracker.git
    2. Install Dependencies
      Navigate to the project directory and run:
        npm install
    3. Database Configuration
      Ensure your config/config.json is properly set up. The project uses SQLite for development by default.
        {
          "development": {
            "dialect": "sqlite",
            "storage": "./database/expense_tracker.sqlite"
          },
          "test": {
            "dialect": "sqlite",
            "storage": ":memory:"
          },
          "production": {
            "dialect": "sqlite",
            "storage": "./database/expense_tracker.sqlite"
          }
        }
    4. Run Database Migrations
        Run Sequelize migrations to set up your database schema:
          npx sequelize db:migrate
    5. Start the Server
        Start the server on http://localhost:4000:

        npm start


API Endpoints
User Authentication
    1. Register a New User
      URL: /api/auth/register
      Method: POST
      Body:
        {
          "username": "yourusername",
          "email": "youremail@example.com",
          "password": "yourpassword"
        }
      Description: Registers a new user and returns a success message.
    2. Login User
      URL: /api/auth/login
      Method: POST
      Body:
      {
        "email": "youremail@example.com",
        "password": "yourpassword"
      }
      Description: Logs in the user and returns a JWT token.

Transactions
    3. Create a New Transaction
      URL: /api/transactions
      Method: POST
      Headers:
      Authorization: Bearer <JWT_TOKEN>
      Body:
      {
        "type": "income", // or "expense"
        "category": "Salary",
        "amount": 1000,
        "date": "2024-10-22",
        "description": "Monthly salary",
        "userId": 1
      }
      Description: Adds a new income or expense transaction for the logged-in user.
    4. Get All Transactions for the Logged-in User
      URL: /api/transactions
      Method: GET
      Headers:
      Authorization: Bearer <JWT_TOKEN>
      Description: Retrieves all transactions for the authenticated user.
    5. Update a Transaction
      URL: /api/transactions/:id
      Method: PUT
      Headers:
      Authorization: Bearer <JWT_TOKEN>
      Body:
      {
        "type": "expense",
        "category": "Utilities",
        "amount": 200,
        "date": "2024-10-23",
        "description": "Electric bill"
      }
      Description: Updates an existing transaction for the logged-in user by id.
    6. Delete a Transaction
      URL: /api/transactions/:id
      Method: DELETE
      Headers:
      Authorization: Bearer <JWT_TOKEN>
      Description: Deletes a transaction by id for the authenticated user.
Summary
    7. Get Summary of Total Income, Expenses, and Balance
      URL: /api/transactions/summary
      Method: GET
      Headers:
      Authorization: Bearer <JWT_TOKEN>
      Description: Gets the total income, total expenses, and balance for the authenticated user.
Environment Variables
    Create a .env file in the root of the project and add the following environment variables:
      JWT_SECRET=your_jwt_secret_key
      PORT=4000
        JWT_SECRET: Used for signing and verifying JWT tokens.
        PORT: Define the port for the application (default is 3000).
Running Tests
    To run tests, use:
        npm test
    
Contributing
    Contributions are welcome! Please fork the repository and submit a pull request with your changes.
