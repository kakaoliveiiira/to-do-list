# List All Tasks

This endpoint fetches all the tasks in your To-Do List.

- **URL:** `/todos`
- **Method:** `GET`

### Successful Response

You’ll get back an array of task objects, each with its details.

**Example response:**

```json
[
  {
    "id": 1,
    "description": "Buy groceries",
    "completed": 0,
    "createdAt": "2025-06-30T18:00:00.000Z",
    "updatedAt": "2025-06-30T18:00:00.000Z"
  },
  {
    "id": 2,
    "description": "Walk the dog",
    "completed": 1,
    "createdAt": "2025-06-29T14:00:00.000Z",
    "updatedAt": "2025-06-30T10:00:00.000Z"
  }
]
```

### Possible Errors

- **500 Internal Server Error:** If something unexpected happens on the server.

```json
{
  "error": "Error message from server."
}
```