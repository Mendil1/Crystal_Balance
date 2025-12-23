# Crystal  – Personal Finance Tracker with Smart Analytics

## 1. Project Overview

**FinTrack** is a cross-platform personal finance application developed using **Expo (React Native)** for the frontend and **Supabase** for the backend. The application allows users to track their income and expenses, define spending limits per category, and receive intelligent, data-driven insights about their financial behavior.

The goal of the project is to demonstrate the design and implementation of a modern mobile/web application that combines:

* Cloud authentication
* A real relational database
* Financial analytics and data visualization
* Rule-based “smart” insights (Fake AI)

The application works on **Web, Android, and iOS** using a single codebase.

---

## 2. Objectives of the Application

The main objectives of FinTrack are:

* To help users **monitor their expenses and income**
* To encourage **better financial habits** through budgets and feedback
* To transform raw financial data into **clear analytics and insights**
* To demonstrate the use of **modern full-stack technologies** in a practical project

---

## 3. Technologies Used

### Frontend

* **Expo (React Native)** – Cross-platform development
* **JavaScript / React Hooks** – UI and state management
* **Chart libraries** – Data visualization (Pie & Line charts)

### Backend

* **Supabase**

  * Authentication (Email & Password)
  * PostgreSQL database
  * Row Level Security (RLS)

---

## 4. Application Architecture

### General Architecture

```
User Interface (Expo App)
        ↓
Supabase Client (API)
        ↓
PostgreSQL Database
```

### Data Flow

1. User authenticates via Supabase Auth
2. User adds transactions (income or expense)
3. Data is stored securely in the database
4. Aggregation and comparison logic is applied
5. Results are displayed as charts and insights

---

## 5. Main Features

### 5.1 Authentication

* Email & password sign-up and login
* Each user has access only to their own data
* Authentication managed entirely by Supabase

**Purpose:** Security, multi-user support, and personalized data.

---

### 5.2 Transaction Management

Users can:

* Add income or expense transactions
* Specify:

  * Amount
  * Category (Food, Transport, Rent, etc.)
  * Date
  * Optional note
* View recent transactions

**Logic:**
Each transaction is linked to the authenticated user using a `user_id`.

---

### 5.3 Dashboard

The dashboard provides a quick financial overview:

* Total income (current month)
* Total expenses (current month)
* Net balance (income − expenses)
* Recent transactions

**Purpose:** Immediate understanding of the user’s financial situation.

---

### 5.4 Category Spending Limits (Budgeting)

Users can define **monthly spending limits per category**.

For each category, the app shows:

* Monthly limit
* Amount spent
* Percentage of limit used
* Visual status indicator (green / orange / red)

**Status Rules:**

* Less than 70% → Safe
* 70% to 100% → Warning
* Over 100% → Over budget

---

### 5.5 Analytics & Data Visualization

The analytics module transforms transaction data into visual insights.

#### Charts Included

* **Pie Chart:** Expense distribution by category
* **Line Chart:** Expenses over time (daily or monthly)

#### Key Metrics

* Savings rate
* Category contribution
* Spending trends

---

## 6. Smart Analytics (Rule-Based “Fake AI”)

The application includes a rule-based intelligence system that simulates AI behavior using simple calculations and comparisons.

### Examples of Smart Insights

* "You spent 20% less on restaurants this month. Good progress!"
* "Food spending is close to exceeding its monthly limit"
* "Your spending increased compared to last month"

### Logic Used

* Month-to-month comparison
* Budget threshold detection
* Percentage change calculations

**Note:** No machine learning is used. Insights are generated using deterministic rules, making the system reliable and explainable.

---

## 7. Advanced Analytics Features

### Financial Health Score

A score between **0 and 100** summarizing the user’s financial behavior.

The score is influenced by:

* Respecting category limits
* Expenses vs income
* Improvement compared to previous months

### Financial Profile

Based on savings rate, users are classified as:

* Saver
* Balanced
* Spender

---

## 8. Database Design

### Main Tables

#### Transactions

* id
* user_id
* amount
* type (income / expense)
* category
* date
* note
* created_at

#### Category Limits

* id
* user_id
* category
* monthly_limit
* created_at

Row Level Security ensures that users can only access their own records.

---

## 9. User Experience Design

The application focuses on:

* Simple and clean interface
* Card-based layout
* Color-coded indicators
* Icons and emojis for clarity
* Minimal navigation (tabs)

The goal is to keep the app intuitive while still looking professional.

---

## 10. Educational Value of the Project

This project demonstrates:

* Full-stack application development
* Cloud-based authentication and database usage
* Financial data modeling
* Analytics and visualization techniques
* Rule-based decision systems

It is suitable as an academic project due to its real-world relevance and clear technical structure.

---

## 11. Conclusion

FinTrack is a practical and scalable personal finance application that goes beyond basic expense tracking by integrating analytics, budgeting, and intelligent feedback. The project showcases how meaningful insights can be generated from simple rules and well-structured data, making it both technically sound and user-focused.

---

**End of Document**
