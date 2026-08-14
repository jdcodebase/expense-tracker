# Expense Tracker

A full-stack **MERN Expense Tracker** that helps users manage their income and expenses, monitor their financial balance, and understand spending patterns through an interactive dashboard and charts.

The application includes secure authentication, complete CRUD operations for income and expenses, transaction history, filtering, financial summaries, and data visualization.

## Live Demo

### Frontend

[Expense Tracker](https://expense-tracker-beige-rho-49.vercel.app/)

### Backend API

[Expense Tracker API](https://expense-tracker-8347.onrender.com/)

---

## Overview

Expense Tracker provides a clean and responsive interface for managing personal finances.

### Main Features

- User authentication
- Financial dashboard
- Income management
- Expense management
- Financial analytics
- Expense category visualization
- Monthly expense chart
- Transaction history
- Transaction filtering and search
- Responsive UI
- Toast notifications
- Loading and empty states
- Protected routes

---

## Features

### Authentication

Users can securely create and manage their accounts.

- User registration
- User login
- User logout
- JWT authentication
- Access token & refresh token
- Protected routes
- Password hashing with bcrypt
- Profile information

The authentication system uses JWT-based authentication with protected API routes.

---

### Dashboard

The dashboard provides an overview of the user's financial activity.

It includes:

- Total Income
- Total Expense
- Total Savings
- Current Balance
- Recent Transactions
- Monthly Expense Analytics
- Expense Category Distribution
- Quick Actions

### Financial Calculation

```text
Balance = Total Income - Total Expense

Savings = Total Income - Total Expense
```

Dashboard data is retrieved from the backend and displayed dynamically rather than using static values.

---

### Income Management

Complete CRUD functionality for income records.

Users can:

- Add income
- View income
- Edit income
- Delete income

Income fields include:

- Title
- Amount
- Date
- Source
- Notes

Example income sources:

- Salary
- Freelance
- Business
- Gift
- Bonus

---

### Expense Management

Complete CRUD functionality for expense records.

Users can:

- Add expense
- View expenses
- Edit expense
- Delete expense

Expense fields include:

- Title
- Amount
- Category
- Date
- Payment Method
- Notes

Available categories include:

- Food
- Travel
- Shopping
- Bills
- Entertainment
- Health
- Education
- Others

---

### Financial Analytics

The application uses MongoDB aggregation to generate financial insights.

Analytics include:

- Monthly income
- Monthly expenses
- Savings
- Balance
- Category-wise expenses
- Monthly expense trends

MongoDB aggregation operations such as `$match`, `$group`, and `$sum` are used for report generation.

---

### Expense Category Chart

An interactive pie chart displays the distribution of expenses across different categories.

Example:

```text
Food
Travel
Shopping
Bills
Entertainment
Health
Education
Others
```

The chart is powered by **Chart.js**.

---

### Monthly Expense Chart

The dashboard also displays monthly expense trends using a bar chart.

This helps users understand how their spending changes over time.

---

### Transaction History

Income and expense records are combined into a single transaction history.

The page includes:

- Transaction date
- Title
- Category / Source
- Amount
- Transaction type
- Edit action
- Delete action

Transactions are sorted by date so the latest activity is easy to find.

---

### Transaction Filters

Transaction history supports filtering and searching.

Available filters include:

- Search
- Transaction Type
- Category
- Date

This makes it easier to find specific financial records.

---

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Tailwind CSS
- Chart.js
- React Chart.js 2
- React Context API
- React Hooks

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- REST API

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB

---

## Project Architecture

```text
expense-tracker/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── charts/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

---

## API Overview

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh-token
GET  /api/v1/auth/profile
```

### Income

```http
GET    /api/v1/income
POST   /api/v1/income
GET    /api/v1/income/:id
PUT    /api/v1/income/:id
DELETE /api/v1/income/:id
```

### Expense

```http
GET    /api/v1/expense
POST   /api/v1/expense
GET    /api/v1/expense/:id
PUT    /api/v1/expense/:id
DELETE /api/v1/expense/:id
```

### Reports

```http
GET /api/v1/reports/monthly
GET /api/v1/reports/expense-by-category
GET /api/v1/reports/monthly-expense-trend
```

> API paths may be prefixed according to the backend route configuration.

---

## Security

The application implements several authentication and security practices:

- JWT-based authentication
- Access and refresh tokens
- HTTP-only authentication cookies
- Protected backend routes
- Password hashing with bcrypt
- User-specific financial records
- Authentication middleware
- Environment variables for sensitive configuration

Passwords are hashed automatically before being stored in MongoDB using Mongoose middleware.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jdcodebase/expense-tracker

cd expense-tracker
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

---

## Environment Variables

### Backend

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRATION=15m

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRATION=7d

NODE_ENV=development
```

### Frontend

Configure the frontend API base URL according to your environment.

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

For production:

```env
VITE_API_BASE_URL=https://expense-tracker-8347.onrender.com/api/v1
```

> Never commit `.env` files or secret keys to GitHub.

---

## Run Locally

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The application will then be available through the local Vite development server.

---

## What I Learned

This project helped me strengthen my understanding of full-stack application development.

### Backend

- Building REST APIs with Express
- MongoDB and Mongoose
- MongoDB aggregation pipelines
- JWT authentication
- Access and refresh token architecture
- Password hashing with bcrypt
- Middleware design
- Controller/service separation
- API error handling
- CRUD operations

### Frontend

- React component architecture
- React Hooks
- Context API
- Protected routes
- Axios API integration
- Reusable components
- Custom hooks
- Form handling
- CRUD UI implementation
- Loading and error states
- Toast notifications
- Chart.js integration
- Responsive UI with Tailwind CSS

### Full-Stack

- Connecting React with Express APIs
- Authentication flow between frontend and backend
- Managing authenticated requests
- Handling CRUD operations end-to-end
- Combining API data for transaction history
- Deploying frontend and backend separately
- Structuring a maintainable MERN application

---

## Project Highlights

This project goes beyond a basic CRUD application by combining:

```text
Authentication
      ↓
REST APIs
      ↓
MongoDB
      ↓
CRUD Operations
      ↓
Aggregation
      ↓
Financial Analytics
      ↓
Charts
      ↓
React Dashboard
```

It demonstrates how a complete full-stack application can transform raw database records into useful financial insights.

---

## Deployment

The application is deployed using separate frontend and backend services.

| Service  | Platform | Link                                                                 |
| -------- | -------- | -------------------------------------------------------------------- |
| Frontend | Vercel   | [Live Application](https://expense-tracker-beige-rho-49.vercel.app/) |
| Backend  | Render   | [Backend API](https://expense-tracker-8347.onrender.com/)            |
| Database | MongoDB  | Cloud Database                                                       |

---

## Author

**Jatin Dhamija**

Built as a full-stack MERN project to practice authentication, CRUD operations, MongoDB aggregation, API integration, data visualization, and production deployment.

---

## If You Like This Project

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## License

This project is available for educational and portfolio purposes.
