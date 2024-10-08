# MoneyMap API Documentation

## Overview

MoneyMap is an expense tracker that allows users to manage their personal finances, including tracking expenses, budgets, goals, and overall financial health. The API provides endpoints to create, read, update, and delete expenses, budgets, and goals for authenticated users. Users can also manage their accounts and update their profiles.

## Authentication

All API requests require a **Bearer Token** for authentication. Users must log in to retrieve the token, which should be passed in the header of every request.

### Authentication Header Example:

## Endpoints

### 1. **User Registration and Authentication**

### Register a New User

**POST** `/api/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret",
  "password_confirmation": "secret"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login a New User

**POST** `/api/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "secret"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Logout a User

**POST** `/api/logout`

**Response:**

```json
{
  "message": "Successfully logged out"
}
```

### 2. **User profile management**

### Update profile

**PUT** `/api/user/profile`

**Request Body:**

```json
{
  "name": "John Doe Updated",
  "email": "john_updated@example.com"
}
```

**Response:**

```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "name": "John Doe Updated",
    "email": "john_updated@example.com"
  }
}
```

### Delete user account

**DELETE** `/api/user/delete`

**Response:**

```json
{
  "message": "User account deleted successfully"
}
```

### 3. **Expenses**

#### Create new expense

**POST** `/api/expenses`

**Request Body:**

```json
{
  "amount": 100,
  "category_id": 1,
  "date": "2024-10-04",
  "name": "Groceries"
}
```

**Response:**

```json
{
  "message": "Expense created successfully"
}
```

#### Get all expenses

**GET** `/api/expenses`

**Response:**

```json
[
  {
    "id": 1,
    "amount": 100,
    "category_id": 1,
    "date": "2024-10-04",
    "name": "Groceries",
    "user_id": 1
  },
  {
    "id": 2,
    "amount": 4500,
    "category_id": 1,
    "date": "2024-09-01",
    "name": "Car",
    "user_id": 1
  },
  {
    "id": 3,
    "amount": 50,
    "category_id": 1,
    "date": "2024-10-10",
    "name": "Pan",
    "user_id": 1
  }
]
```

#### Get a specific expense

**GET** `/api/expenses/{id}`

**Response:**

```json
{
  "id": 1,
  "amount": 100,
  "category_id": 1,
  "date": "2024-10-04",
  "name": "Groceries",
  "user_id": 1
}
```

#### Update an expense

**PUT** `/api/expenses/{id}`

**Request Body:**

```json
{
  "amount": 120,
  "category_id": 1,
  "date": "2024-10-04",
  "name": "Groceries"
}
```

**Response:**

```json
{
  "message": "Expense updated successfully"
}
```

#### Delete an expense

**DELETE** `/api/expenses/{id}`

**Response:**

```json
{
  "message": "Expense deleted successfully"
}
```

### 4. **Budgets**

#### Create new budget

**POST** `/api/budgets`

**Request Body:**

```json
{
  "category_id": 6,
  "limit": 50,
  "name": "Coffee",
  "duration_type": "weekly"
}
```

**Response:**

```json
{
  "message": "Budget created successfully"
}
```

#### Get all budgets

**GET** `/api/budgets`

**Response:**

```json
[
  {
    "id": 1,
    "category_id": 1,
    "limit": 500,
    "name": "Groceries",
    "duration_type": "custom",
    "start_date": "2024-10-01",
    "end_date": "2024-10-22",
    "duration_custom_days": NULL,
    "user_id": 1
  },
  {
    "id": 2,
    "category_id": 6,
    "limit": 50,
    "name": "Coffee",
    "duration_type": "weekly",
    "start_date": NULL,
    "end_date": NULL,
    "duration_custom_days": NULL,
    "user_id": 1
  },
  {
    "id": 3,
    "category_id": 4,
    "limit": 100,
    "name": "Streaming services",
    "duration_type": "monthly",
"start_date": "2024-10-01",
    "end_date": NULL,
    "duration_custom_days": NULL,
    "user_id": 1
  }
]
```

#### Get a specific budget

**GET** `/api/budgets/{id}`

**Response:**

```json
{
    "id": 3,
    "category_id": 4,
    "limit": 100,
    "name": "Streaming services",
    "duration_type": "monthly",
    "start_date": "2024-10-01",
    "end_date": NULL,
    "duration_custom_days": NULL,
    "user_id": 1
  }
```

#### Update an budget

**PUT** `/api/budgets/{id}`

**Request Body:**

```json
{
  "category_id": 4,
  "limit": 75,
  "name": "Streaming services",
  "duration_type": "monthly"
}
```

**Response:**

```json
{
  "message": "Budget updated successfully"
}
```

#### Delete an budget

**DELETE** `/api/budgets/{id}`

**Response:**

```json
{
  "message": "Budget deleted successfully"
}
```
