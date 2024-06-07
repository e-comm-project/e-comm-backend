# AboutShe Backend

**AboutShe Backend** is the server-side application for the AboutShe E-commerce platform. It provides APIs for user authentication, product management, order processing, and more. This backend is built using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the AboutShe backend, follow these steps:

Clone the repository:

```bash
git clone https://github.com/e-comm-project/e-comm-backend
```

Navigate to the project directory:

```bash
cd e-comm-backend
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and add your environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Start the development server:

```bash
npm run dev
```

## Usage

- **User Authentication**: APIs for user registration, login, and profile management.
- **Product Management**: APIs for adding, updating, deleting, and fetching products.
- **Order Processing**: APIs for creating and managing orders.
- **Admin Operations**: APIs for admin-specific tasks like managing products and users.

## Features

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing product, user, and order data.
- **JWT**: JSON Web Tokens for secure authentication.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Multer**: Middleware for handling file uploads.

## Directory Structure

### Config Directory

- **db/index.js**: MongoDB connection setup.

### Error Handling Directory

- **index.js**: Custom error handling middleware.

### Middleware Directory

- **jwt.middleware.js**: Middleware for verifying JWT tokens.

### Models Directory

- **Order.model.js**: Mongoose model for orders.
- **Product.model.js**: Mongoose model for products.
- **User.model.js**: Mongoose model for users.

### Routes Directory

- **adminproduct.routes.js**: Routes for admin product management.
- **auth.routes.js**: Routes for user authentication.
- **index.routes.js**: Main entry point for routes.
- **order.routes.js**: Routes for order management.
- **product.routes.js**: Routes for product management.
- **user.routes.js**: Routes for user management.

### Uploads Directory

- **uploads/**: Directory for storing uploaded files.

### Root Files

- **.env**: Environment variables.
- **.gitignore**: Git ignore file.
- **app.js**: Express application setup.
- **package-lock.json**: Lockfile for npm dependencies.
- **package.json**: Project metadata and dependencies.
- **server.js**: Entry point for the Node.js server.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
