# Create a Task

This endpoint allows you to create a new task in your To-Do List.

- **URL:** `/todos`
- **Method:** `POST`
- **Headers:**  
  - `Content-Type: application/json`

### Request Body

You need to provide a JSON object with the following field:

| Field       | Type   | Required | Description                  |
|-------------|--------|----------|------------------------------|
| description | String | Yes      | A brief description of the task |

**Example request body:**

```json
{
  "description": "Buy groceries"
}
```

### Successful Response

If the task is created successfully, you'll receive a `201 Created` status with the newly created task object, including its ID and timestamps.

**Example response:**

```json
{
  "id": 1,
  "description": "Buy groceries",
  "completed": 0,
  "createdAt": "2025-06-30T18:00:00.000Z",
  "updatedAt": "2025-06-30T18:00:00.000Z"
}
```

### Possible Errors

- **400 Bad Request:** If you don’t provide a description or it's empty, you'll get an error:

```json
{
  "error": "Task description is required."
}
```

- **500 Internal Server Error:** If something goes wrong on the server side.

```json
{
  "error": "Error message from server."
}
```