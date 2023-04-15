# Documentation for CategoriesRestController
This REST API allows users to perform CRUD (create, read, update, delete) operations on category objects.

## Endpoints
### Get all categories
Returns a list of all categories.

**Request:**
```bash
GET /api/v1/admin/categories
```
**Response:**
```json
Status: 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "name": "Category 1",
    "questions": [
      {
        "id": 1,
        "text": "Question 1",
        "answer": "Answer 1",
        "categoryName": "Category 1"
      },
      ...
    ]
  },
  ...
]
```
### Get category by name
Returns a category with the given name.

**Request:**
```bash
GET /api/v1/admin/categories/{name}
```
**Response:**
```json
Status: 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "Category 1",
  "questions": [
    {
      "id": 1,
      "text": "Question 1",
      "answer": "Answer 1",
      "categoryName": "Category 1"
    },
    ...
  ]
}
```
### Create category
Creates a new category.

**Request:**
```bash
POST /api/v1/admin/categories
Content-Type: application/json

{
  "name": "New Category"
}
```
**Response:**
```json
Status: 201 Created
Content-Type: application/json

{
  "id": 2,
  "name": "New Category",
  "questions": []
}
```
### Update category
Updates a category with the given ID.

**Request:**
```json
PATCH /api/v1/admin/categories/{id}
Content-Type: application/json

{
  "name": "Updated Category"
}
```
**Response:**
```json
Status: 202 Accepted
Content-Type: application/json

{
  "id": 1,
  "name": "Updated Category",
  "questions": [
    {
      "id": 1,
      "text": "Question 1",
      "answer": "Answer 1",
      "categoryName": "Updated Category"
    },
    ...
  ]
}
```
### Delete category
Deletes a category with the given ID.

**Request:**
```bash
DELETE /api/v1/admin/categories/{id}
```
**Response:**
```json
Status: 202 Accepted
Content-Type: application/json

{
  "id": 1,
  "name": "Category 1",
  "questions": [
    {
      "id": 1,
      "text": "Question 1",
      "answer": "Answer 1",
      "categoryName": "Category 1"
    },
    ...
  ]
}
```

## Data models
### CategoryResponse
Represents a category object returned by the API.

**Fields:**

 - `id` (Long): The ID of the category.
 - `name` (String): The name of the category.
 - `questions` (Set<QuestionResponse>): The questions associated with the category.

### QuestionResponse
Represents a question object returned by the API.

**Fields:**

 - `id` (Long): The ID of the question.
 - `text` (String): The text of the question.
 - `answer` (String): The answer to the question.
 - `categoryName` (String): The name of the category that the question belongs to.
