### `README.md`

```md
# Express API

This project is a simple Express API that provides health check functionality and user creation.

## API Endpoints

### 1. Health Check

- **URL**: `/health`
- **Method**: `GET`
- **Description**: Returns the status of the API.

#### Example Request:

```bash
curl http://localhost:1337/health
```

#### Example Response:

```json
{
  "status": "OK"
}
```

---

### 2. Create User

- **URL**: `/api/users`
- **Method**: `POST`
- **Description**: Creates a new user with the provided data.

#### Example Request:

```bash
curl -X POST http://localhost:1337/api/users \
    -H "Content-Type: application/json" \
    -d '{"name": "John Doe", "email": "john@example.com", "password": "123456", "passwordConfirm": "123456"}'
```

#### Example Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "passwordConfirm": "123456"
}
```

#### Example Response (Success):

```json
{
  "id": "some-generated-id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Example Response (Error, if email already exists):

```json
{
  "message": "User already exists"
}
```

---

## How to Run the Server

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the server:

   ```bash
   pnpm run dev or pnpm dev
   ```

3. The server will run on `http://localhost:1337`.

---

## Running Tests

To test the API, you can use tools like `curl` or Postman to send requests and check the responses.
```

### Breakdown:

- **API Endpoints**: Lists the two endpoints (`/health` and `/api/users`) with details about the request method and description.
- **Example Request and Response**: Shows how to use `curl` to interact with the API and the expected responses for both successful and error cases.
- **How to Run the Server**: Basic instructions on how to install dependencies and run the server.
- **Running Tests**: Mentions using `curl` or Postman to test the API.