

# Icustomer Project Setup

## Project Setup

1. **Clone the Git Repository**:
   ```bash
   git clone https://github.com/Achu-Worifung/Icustomer.git
   ```

2. **Install Dependencies**:
   - **For Backend**:
     ```bash
     cd ./server && npm install
     ```
   - **For Frontend**:
     ```bash
     cd ./client && npm install
     ```

---

## Database Setup

1. **Create an Azure Flexible PostgreSQL Database**.

2. **Create a Table in the PostgreSQL Database**:
   Create a table named `b2b` with the following columns:
   - `id`
   - `data category`
   - `Record count`
   - `fields`

3. **Populate the Database with Sample Data**.

4. **Copy Database Connection Details into `.env`**:
   In the `server` directory, create a `.env` file with the following variables:
   ```plaintext
   DB_HOST=your-db-host
   DB_USER=your-db-user
   DB_PORT=5432
   DB_DATABASE=your-database-name
   DB_PASSWORD=your-db-password
   ```

---

## Environmental Variables Setup

1. **Backend (Server)**:
   - Add the database connection details to the `.env` file.
   - Add a secret key (`SECRET_KEY`) that will be used to generate a token.

---

## Running the Application

1. **For Backend**:
   ```bash
   cd ./server && npm run start
   ```

2. **For Frontend**:
   ```bash
   cd ./client && npm run start
   ```

   - Access the application at [http://localhost:3000](http://localhost:3000) (or the respective port).

---

## Authentication Details

- **To Concerned Personnel**: Environmental variables and login credentials will be provided through the appropriate channels for testing.

