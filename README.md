# Healthcare Backend API

This project implements a backend system for a healthcare application using Node.js, Express.js, and PostgreSQL. It provides RESTful APIs for managing users, patients, doctors, and patient-doctor assignments.

## Features

*   **User Authentication:**
    *   User registration with secure password hashing (bcrypt).
    *   User login with JWT (JSON Web Token) authentication.
*   **Patient Management:**
    *   Add new patients (authenticated users only).
    *   Retrieve all patients associated with the logged-in user.
    *   Get details of a specific patient.
    *   Update patient details.
    *   Delete a patient record.
*   **Doctor Management:**
    *   Add new doctors (authenticated users only).
    *   Retrieve all doctors.
    *   Get details of a specific doctor.
    *   Update doctor details.
    *   Delete a doctor record.
*   **Patient-Doctor Mapping:**
    *   Assign a doctor to a patient.
    *   Retrieve all patient-doctor mappings.
    *   Get all doctors assigned to a specific patient.
    *   Remove a doctor assignment from a patient.
*   **Database:**
    *   PostgreSQL database.
    *   Sequelize ORM for database interaction.
*   **Security:**
    *   JWT authentication for secure API endpoints.
    *   Input validation using express-validator.
    *   Password hashing using bcrypt.
* **Error Handling:** Comprehensive error handling and validation.
* **Environment Variables:** Uses dotenv for environment variable management.


## Prerequisites

*   Node.js (v14 or later recommended)
*   npm (Node Package Manager)
*   PostgreSQL database

## Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd healthcare-backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file:**

    Create a `.env` file in the root directory of the project and add the following environment variables.  Replace the placeholder values with your actual database credentials and a strong JWT secret.

    ```
    DATABASE_URL=postgres://your_user:your_password@your_host:5432/your_database
    JWT_SECRET=your_super_secret_jwt_key
    PORT=3000
    ```

4.  **Create the PostgreSQL database:**

    Create the PostgreSQL database that you specified in the `DATABASE_URL` environment variable.  You can use a tool like `psql`, pgAdmin, or DBeaver.

5. **Create a `.env.example` file:**
    Create a `.env.example` file in the root directory of the project and add the following environment variables.

    ```
    DATABASE_URL=
    JWT_SECRET=
    PORT=
    ```

## Running the Application

1.  **Start the server:**

    ```bash
    npm start
    ```

    Or, if you have `nodemon` installed globally, you can use:

    ```bash
    npm run dev
    ```

    This will start the server, typically on port 3000 (or the port specified in your `.env` file).

2.  **Database Synchronization:** The application uses Sequelize's `sync()` method to automatically create the necessary database tables based on your models.  It's configured to *not* drop existing tables on restart (`force: false`).

    *   **Initial Setup (or if you change your models):**  During initial setup, or if you significantly modify your models, you might want to *temporarily* set `force: true` in `server.js` to drop and recreate the tables:

        ```javascript
        // server.js
        sequelize.sync({ force: true }) // WARNING: This will drop all tables!
          .then(() => {
            // ...
          });
        ```

        **Important:** After running the server *once* with `force: true`, immediately change it back to `force: false` to avoid data loss on subsequent restarts.

        ```javascript
        // server.js
        sequelize.sync({ force: false }) // Use this for normal operation.
          .then(() => {
            // ...
          });
        ```

## API Endpoints

### 1. Authentication APIs

*   **`POST /api/auth/register`**

    Registers a new user.

    *   **Request Body:**

        ```json
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "securePassword123"
        }
        ```

    *   **Success Response (201 Created):**

        ```json
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

*   **`POST /api/auth/login`**

    Logs in an existing user.

    *   **Request Body:**

        ```json
        {
            "email": "john.doe@example.com",
            "password": "securePassword123"
        }
        ```

    *   **Success Response (200 OK):**

        ```json
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

### 2. Patient Management APIs (Authenticated)

*All patient endpoints require a valid JWT in the `Authorization` header: `Bearer <your_token>`*

*   **`POST /api/patients`**

    Adds a new patient.

    *   **Request Body:**

        ```json
        {
            "name": "Jane Smith",
            "dob": "1990-05-15",
            "gender": "female"
        }
        ```

*   **`GET /api/patients`**

    Retrieves all patients for the authenticated user.

*   **`GET /api/patients/:id`**

    Gets details of a specific patient.

*   **`PUT /api/patients/:id`**

    Updates patient details.

    *   **Request Body:** (Example)

        ```json
        {
            "name": "Jane Doe",
            "dob": "1992-06-20"
        }
        ```

*   **`DELETE /api/patients/:id`**

    Deletes a patient record.

### 3. Doctor Management APIs (Authenticated)

*All doctor endpoints require a valid JWT in the `Authorization` header: `Bearer <your_token>`*

*   **`POST /api/doctors`**

    Adds a new doctor.

    *   **Request Body:**

        ```json
        {
            "name": "Dr. Alice Brown",
            "specialty": "Cardiology"
        }
        ```

*   **`GET /api/doctors`**

    Retrieves all doctors.

*   **`GET /api/doctors/:id`**

    Gets details of a specific doctor.

*   **`PUT /api/doctors/:id`**

    Updates doctor details.

    *   **Request Body:** (Example)

        ```json
        {
            "name": "Dr. Alice Green",
            "specialty": "Neurology"
        }
        ```

*   **`DELETE /api/doctors/:id`**

    Deletes a doctor record.

### 4. Patient-Doctor Mapping APIs (Authenticated)
*All doctor Mapping endpoints require a valid JWT in the `Authorization` header: `Bearer <your_token>`*

*   **`POST /api/mappings`**

    Assigns a doctor to a patient.

    *   **Request Body:**

        ```json
        {
            "patientId": 1,
            "doctorId": 2
        }
        ```
*   **`GET /api/mappings`**

    Retrieves all patient-doctor mappings.

*   **`GET /api/mappings/:patientId`**

    Gets all doctors assigned to a specific patient.

*   **`DELETE /api/mappings/:id`**
    Removes a doctor from a patient.

## Testing

Use a tool like Postman to test the API endpoints.  Remember to include the `Authorization` header with a valid JWT for authenticated routes.

## Error Handling

The API implements comprehensive error handling, including:

*   **400 Bad Request:** For invalid input data.
*   **401 Unauthorized:** For missing or invalid JWTs.
*   **404 Not Found:** For resources that don't exist.
*   **409 Conflict:** For duplicate entries (e.g., assigning the same doctor to a patient twice).
*   **500 Internal Server Error:** For server-side errors.
