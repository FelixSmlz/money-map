# Money Map Project Plan

## Description

This document provides an overview of the endpoints available in the Money Map API. The API allows users to manage their expenses, categories, budgets, and financial goals. The API is secured using Bearer Tokens, and users must register and log in to access the endpoints.

## Table of Contents

1. [Backend](#backend)
   1. [Authentication](#1-user-registration-and-authentication)
   2. [User profile management](#2-user-profile-management)
   3. [Expenses](#3-expenses)
   4. [Categories](#4-categories)
   5. [Budgets](#5-budgets)
   6. [Goals](#6-goals)
   7. [Libraries](#7-libraries-api)
2. [Frontend](#frontend)
   1. [Site Map](#site-map)
   2. [Libraries](#libraries-client)
3. [Timeline](#timeline)

# Backend

## Endpoints

The API provides the following endpoints for managing users, expenses, categories, budgets, and goals.

### 1. **User Registration and Authentication**

### Register a New User

![Protected](https://img.shields.io/badge/Public-blue)

**POST** `/api/register`

Registers a new user by providing the required information. Ensure that the passwords match in both `password` and `password_confirmation` fields.

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

![Protected](https://img.shields.io/badge/Public-blue)

**POST** `/api/login`

Logs in an existing user. On success, a **Bearer Token** is returned, which must be used to authenticate future API requests.

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
  "token": "your_bearer_token_here",
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Logout a User

![Protected](https://img.shields.io/badge/Protected-red)

**POST** `/api/logout`

Logs out the authenticated user and invalidates the token.

**Response:**

```json
{
  "message": "Successfully logged out"
}
```

### 2. **User profile management**

### Update profile

![Protected](https://img.shields.io/badge/Protected-red)

**PUT** `/api/user/profile`

Allows an authenticated user to update their profile information.

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

![Protected](https://img.shields.io/badge/Protected-red)

**DELETE** `/api/user/delete`

Deletes the user's account and all associated data. Warning: This action is irreversible.

**Response:**

```json
{
  "message": "User account deleted successfully"
}
```

### 3. **Expenses**

![Protected](https://img.shields.io/badge/Protected-red)

#### Create new expense

**POST** `/api/expenses`

Allows users to record a new expense.

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

Retrieves a list of all the user's expenses.

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

Retrieves a single expense by its ID.

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

Allows users to modify an existing expense.

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

Deletes an existing expense.

**Response:**

```json
{
  "message": "Expense deleted successfully"
}
```

### 4. **Categories**

![Protected](https://img.shields.io/badge/Protected-red)

#### Create new category

**POST** `/api/categories`

Allows users to create a new expense category, including assigning a color code for visual organization.

**Request Body:**

```json
{
  "color_code": "#FF0000",
  "name": "Personal"
}
```

**Response:**

```json
{
  "message": "Category created successfully"
}
```

#### Get all categories

**GET** `/api/categories`

Retrieves all categories created by the user.

**Response:**

```json
[
  {
    "id": 1,
    "color_code": "#fd7e14",
    "name": "Work",
    "user_id": 1
  },
  {
    "id": 2,
    "color_code": "#jg7e14",
    "name": "Sports",
    "user_id": 1
  },
  {
    "id": 3,
    "color_code": "#FF0000",
    "name": "Personal",
    "user_id": 1
  },
  {
    "id": 4,
    "color_code": "#dc3545",
    "name": "Entertainment",
    "user_id": 1
  },
  {
    "id": 5,
    "color_code": "#007bff",
    "name": "Health",
    "user_id": 1
  },
  {
    "id": 6,
    "color_code": "#28a745",
    "name": "Food",
    "user_id": 1
  }
]
```

#### Get a specific category

**GET** `/api/categories/{id}`

Allows users to retrieve a specific category by its ID.

**Response:**

```json
{
  "id": 6,
  "color_code": "#28a745",
  "name": "Food",
  "user_id": 1
}
```

#### Update a category

**PUT** `/api/categories/{id}`

Allows users to update the name and color of an existing category.

**Request Body:**

```json
{
  "color_code": "#3b5998",
  "name": "Apartment"
}
```

**Response:**

```json
{
  "message": "Category updated successfully"
}
```

#### Delete a category

**DELETE** `/api/categories/{id}`

Deletes a specific category by its ID.

**Response:**

```json
{
  "message": "Category deleted successfully"
}
```

### 5. **Budgets**

![Protected](https://img.shields.io/badge/Protected-red)

#### Create new budget

**POST** `/api/budgets`

Allows users to create a new budget for a specific category, with a limit, name, duration type, and start date.

**Request Body:**

```json
{
  "category_id": 6,
  "limit": 50,
  "name": "Coffee",
  "duration_type": "weekly",
  "start_date": "2024-10-01"
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

Retrieves all budgets created by the user.

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
    "duration_custom_days": NULL,
    "user_id": 1
  },
  {
    "id": 2,
    "category_id": 6,
    "limit": 50,
    "name": "Coffee",
    "duration_type": "weekly",
    "start_date": "2024-10-01",
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
    "duration_custom_days": NULL,
    "user_id": 1
  }
]
```

#### Get a specific budget

**GET** `/api/budgets/{id}`

Retrieves a specific budget by its ID.

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

#### Update a budget

**PUT** `/api/budgets/{id}`

Allows users to update an existing budget.

**Request Body:**

```json
{
  "category_id": 4,
  "limit": 75,
  "name": "Streaming services",
  "duration_type": "monthly",
  "start_date": "2024-9-01"
}
```

**Response:**

```json
{
  "message": "Budget updated successfully"
}
```

#### Delete a budget

**DELETE** `/api/budgets/{id}`

Deletes a specific budget by its ID.

**Response:**

```json
{
  "message": "Budget deleted successfully"
}
```

### 6. **Goals**

![Protected](https://img.shields.io/badge/Protected-red)

#### Create new goal

**POST** `/api/goals`

Allows users to create a new financial goal, including the category, target date, target amount, current amount, and name.

**Request Body:**

```json
{
  "category_id": 2,
  "target_date": "2024-12-31",
  "target_amount": 1500,
  "current_amount": 100,
  "name": "Bike"
}
```

**Response:**

```json
{
  "message": "Goal created successfully"
}
```

#### Get all goals

**GET** `/api/goals`

Retrieves all goals created by the user.

**Response:**

```json
[
  {
    "id": 1,
    "category_id": 2,
    "target_date": "2024-11-22",
    "target_amount": 1500,
    "current_amount": 100,
    "name": "Bike",
    "user_id": 1
  },
  {
    "id": 2,
    "category_id": 2,
    "target_date": "2024-12-25",
    "target_amount": 700,
    "current_amount": 400,
    "name": "Phone",
    "user_id": 1
  },
  {
    "id": 3,
    "category_id": 4,
    "target_date": "2024-12-11",
    "target_amount": 4500,
    "current_amount": 1100,
    "name": "Car",
    "user_id": 1
  }
]
```

#### Get a specific goal

**GET** `/api/goals/{id}`

Retrieves a specific goal by its ID.

**Response:**

```json
{
  "id": 3,
  "category_id": 4,
  "target_date": "2024-12-11",
  "target_amount": 4500,
  "current_amount": 1100,
  "name": "Car",
  "user_id": 1
}
```

#### New goal entry

**PUT** `/api/goals/{id}`

Allows users to update an existing goal.

**Request Body:**

```json
{
  "category_id": 4,
  "target_date": "2024-12-11",
  "target_amount": 4500,
  "current_amount": 1100,
  "name": "Car"
}
```

**Response:**

```json
{
  "message": "New goal entry created successfully"
}
```

#### Delete a goal

**DELETE** `/api/goals/{id}`

Deletes a specific goal by its ID.

**Response:**

```json
{
  "message": "Goal deleted successfully"
}
```

## Libraries Api

The following libraries could be used to implement the Money Map API:

- **[Sanctum](https://laravel.com/docs/11.x/sanctum)**: Laravel's built-in API token authentication system.‚
- **[Socialite](https://laravel.com/docs/11.x/socialite)**: Laravel's built-in OAuth authentication system.

# Frontend

## Site Map

The following diagram shows the sites of the app and the functionality they provide:

```plaintext
MoneyMap Web App
|
├── Dashboard                      #Protected
│   ├── Overview
│   └── Data Visualizations
|   ├── Manage Widgets
|   |── Logout
|   └── Quick Add Expense/Budget/Goal/Category
|
├── Expenses                       #Protected
│   ├── Add Expense
│   ├── Edit Expense
|   ├── Delete Expense
│   ├── View Expenses
│   ├── Sort Expenses
│   ├── Search Expenses
│   └── Filter Expenses
|
├── Control Center                 #Protected
|   ├── Notifications
│   ├── Add/Edit/Delete/View Budgets
│   ├── Add/Edit/Delete/View Goals
│   └── Add/Edit/Delete/View Categories
|
├── Reports                        #Protected
│   ├── Expense Reports
│   ├── Income Reports
│   ├── Budget vs. Actual
│   └── Goal Progress
|
├── User Profile                   #Protected
|   ├── Edit Profile
│   ├── Delete Account
│   └── Logout
|
├── Settings                       #Protected
│   ├── Currency Settings
│   ├── Notification Settings
|   ├── Privacy Settings
│   ├── Theme Settings
|   |── Timezone Settings
│   └── Language Settings
|
├── Login/Registration              #Public
│   ├── Login
│   ├── Register
│   └── Forgot Password
|
└── Help / Documentation            #Public
    ├── FAQ
    └── Contact Support

```

## Libraries Client

The following libraries could be used to implement the Money Map Client:

- **[Recharts](https://recharts.org/en-US/)**: A composable charting library built on React components.
- **[React Toastify](https://www.npmjs.com/package/react-toastify)**: A React notification library.
- **[Axios](https://axios-http.com/docs/intro)**: A promise-based HTTP client for the browser and Node.js.
- **[Framer Motion](https://www.framer.com/motion/)**: A production-ready motion library for React.
- **[Node](https://nodejs.org/en)**: A JavaScript runtime built on Chrome's V8 JavaScript engine.

# Timeline

The following timeline outlines the development milestones for the Money Map project:

### _**[Link to Linear Project](https://linear.app/felixworkspace/project/moneymap-8fa8ce93979f/issues)**_
