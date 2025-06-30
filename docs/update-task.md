# Mark Task as Completed

Use this endpoint to mark a specific task as completed.

- **URL:** `/todos/:id`
- **Method:** `PUT`

### URL Parameters

| Parameter | Type   | Required | Description           |
|-----------|--------|----------|-----------------------|
| id        | Number | Yes      | The ID of the task you want to mark as completed |

### Successful Response

If the update is successful, you’ll get a message confirming it.

**Example response:**

```json
{
  "message": "Task marked as completed."
}
```

### Possible Errors

- **404 Not Found:** If the task ID does not exist.

```json
{
  "error": "Task not found."
}
```

- **500 Internal Server Error:** If something goes wrong on the server.

```json
{
  "error": "Error message from server."
}
```