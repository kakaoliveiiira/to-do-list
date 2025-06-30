# Delete a Task

This endpoint deletes a task by its ID.

- **URL:** `/todos/:id`
- **Method:** `DELETE`

### URL Parameters

| Parameter | Type   | Required | Description             |
|-----------|--------|----------|-------------------------|
| id        | Number | Yes      | The ID of the task you want to delete |

### Successful Response

If the task is deleted successfully, you’ll receive a confirmation message.

**Example response:**

```json
{
  "message": "Task deleted successfully."
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