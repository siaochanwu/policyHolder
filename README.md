# policyHolder

The Policyholder Introduction System is designed to manage the relationships between policyholders in a binary tree structure. It supports adding new policyholders, querying existing policyholders, and maintaining the hierarchical introduction relationships.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)

## Features

- Manage policyholders in a binary tree structure.
- Support unlimited introductions for each policyholder.
- Maintain direct and indirect introduction relationships.
- Query policyholder information and their introduction relationships up to 4 levels.

## Technologies Used

- Node.js
- Express
- TypeScript
- Sequelize (with MySQL)
- Jest (for testing)
- Swagger (for API documentation)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/siaochanwu/policyHolder.git
   cd policyHolder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file and set up the MySQL database and configure the connection in .env file:
   ```dotenv
   DB_NAME=your_database
   DB_USER=your_username
   DB_PASSWORD=your_password
   TEST_DB_NAME=your_test_database
   TEST_DB_USER=your_test_username
   TEST_DB_PASSWORD=your_test_password
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Usage

Once the server is running, you can access the API at http://localhost:3000. You can also view the Swagger documentation at http://localhost:3000/api-docs.

## API Endpoints

### Create a new Policyholder

- Endpoint: `api/policyholder`
- Method: POST
- Request Body:
  - name(string, required): policyholder name
  - id_number(string, required): policyholder id number
  - introducer_code(string): introducer code

### Get All Policyholders

- Endpoint: `api/policyholders`
- Method: GET
- Response:

```json
[
  {
    "code": "string",
    "name": "string",
    "id_number": "string",
    "registration_date": "date",
    "introducer_code": "string",
    "l": [
      {
        "code": "string",
        "name": "string",
        "registration_date": "date",
        "introducer_code": "string",
        "relationship": "string"
      }
    ],
    "r": [
      {
        "code": "string",
        "name": "string",
        "registration_date": "date",
        "introducer_code": "string",
        "relationship": "string"
      }
    ]
  }
]
```

### Get Policyholder By Code
- Endpoint: `api/policyholders/{code}`
- Method: GET
- Parameters:
  - code(string, required): policyholder code
- Response:
```json
  {
    "code": "string",
    "name": "string",
    "id_number": "string",
    "registration_date": "date",
    "introducer_code": "string",
    "l": [
      {
        "code": "string",
        "name": "string",
        "registration_date": "date",
        "introducer_code": "string",
        "relationship": "string"
      }
    ],
    "r": [
      {
        "code": "string",
        "name": "string",
        "registration_date": "date",
        "introducer_code": "string",
        "relationship": "string"
      }
    ]
  }
```

### GET Policyholder's Top Introducer
- Endpoint: `api/policyholders/{code}/top`
- Method: GET
- Parameters:
  - code(string, required): policyholder code
- Response:
```json
  {
    "code": "string",
    "name": "string",
    "id_number": "string",
    "registration_date": "date",
    "introducer_code": "string",
    "l": [
      {
        "code": "string",
        "name": "string",
        "registration_date": "date",
        "introducer_code": "string",
        "relationship": "string"
      }
    ],
    "r": [
      {
        "code": "string",
        "name": "string",
        "registration_date": "date",
        "introducer_code": "string",
        "relationship": "string"
      }
    ]
  }
```

## Database Schema
The Policyholder model schema includes the following fields:

```
|  name              | type     |    
|--------------------|----------|
|  code              | string   |
|  name              | string   |
|  registration_date | datetime |
|  introducer_code   | string   |
|  l                 | JSON     |
|  r                 | JSON     |
```

## Testing
Run tests using Jest
```bash
npm test
```