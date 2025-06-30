# Get Task Details

Fetch the details of a specific task by its ID.

- **URL:** `/todos/:id`
- **Method:** `GET`

### URL Parameters

| Parameter | Type   | Required | Description                  |
|-----------|--------|----------|------------------------------|
| id        | Number | Yes      | The ID of the task you want to retrieve |

### Successful Response

You’ll get the task object back if it exists.

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

- **404 Not Found:** If the task with that ID doesn't exist.

```json
{
  "error": "Task not found."
}
```

- **500 Internal Server Error:** If something fails on the server.

```json
{
  "error": "Error message from server."
}
```