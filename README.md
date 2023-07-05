# Store API

This is an e-commerce project built using Node.js, Express, PostgreSQL, Docker, Swagger, and Sequelize. The project aims to provide a robust and scalable platform for online shopping.

## Technologies used

- Node.js: A JavaScript runtime environment for server-side development.
- Express: A web framework for Node.js, simplifying the development of the web application.
- Nodemailer: A Node library used for sending emails, facilitating communication with customers regarding order confirmations, shipping updates, etc.
- Passport: A Node library for implementing authentication and authorization mechanisms, securing user access to the platform.
- PostgreSQL: An open-source relational database management system serving as the backend database for storing and managing e-commerce-related data.
- Docker: A containerization platform used to package the application as a lightweight, self-contained unit for easy deployment and scalability.
- Swagger: An open-source tool for designing, building, documenting, and consuming RESTful APIs.
- Sequelize: An ORM (Object-Relational Mapping) library for Node.js, simplifying the interaction with the PostgreSQL database by providing an intuitive way to define and execute database queries.

## Features
- User Registration and Authentication: Users can create accounts, log in, and manage their profiles.
- Product Catalog: Displaying a variety of products available for purchase.
- Order Management: Tracking and managing orders, including order history and status updates.
- Email Notifications: Sending emails to customers regarding order confirmations, shipping updates, etc.
- API Documentation: Providing comprehensive documentation of the RESTful APIs using Swagger.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/nico858/my-store.git`
2. Install dependencies: `npm install`
3. Set up the PostgreSQL database and configure the connection details. You can use docker-compose and env.example files
4. Start the server: `npm start`
5. You can check and try the endpoints with the postman collection (deploy soon).

## API Documentation
The API documentation can be accessed at /docs.
