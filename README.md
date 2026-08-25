# Expense Tracker

A modern, responsive expense management application designed to make personal expense tracking simple, organized, and easy to analyze.

The application allows users to record their expenses, manage existing entries, search and filter transactions, and get a quick overview of their spending patterns.

---

## ✨ Features

* **Add Expenses** — Create a new expense with relevant details such as description, category, amount, and date.
* **Edit Expenses** — Update an existing expense whenever information changes.
* **Delete Expenses** — Remove unwanted or incorrect transactions.
* **View Expenses** — View all recorded expenses in an organized interface.
* **Category Filtering** — Filter expenses based on their category.
* **Search** — Quickly find expenses using their description.
* **Total Spending** — Calculate and display the overall amount spent.
* **Category-wise Spending** — Understand how spending is distributed across different categories.
* **Responsive UI** — Designed to work across desktop and smaller screen sizes.
* **Reusable Components** — UI and application logic are organized into reusable modules.

---

## 🛠️ Tech Stack

| Technology    | Purpose                                       |
| ------------- | --------------------------------------------- |
| React         | Building the user interface                   |
| TypeScript    | Type-safe application development             |
| Vite          | Development server and build tooling          |
| CSS           | Application styling                           |
| JavaScript    | Utility and calculation logic                 |
| React Context | Managing shared application state             |
| Local Storage | Persisting client-side data, where applicable |

---

## 📁 Project Structure

```text
expense-tracker/
│
├── assets/                  # Static assets used by the application
│
├── src/
│   ├── components/          # Reusable UI components
│   │
│   ├── context/             # Shared application state
│   │
│   ├── data/                # Application data / constants
│   │
│   ├── pages/                # Application pages/views
│   │
│   ├── utils/
│   │   ├── calculations.js  # Expense and spending calculations
│   │   ├── formatters.js    # Formatting/helper functions
│   │   └── storage.js       # Client-side storage utilities
│   │
│   ├── App.tsx              # Root application component
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
│
├── .env.example             # Example environment configuration
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🧠 Application Architecture

The project follows a component-based architecture to keep the application maintainable and easy to extend.

### Components

Reusable interface elements are separated into individual components instead of placing the entire UI inside one file.

### Context

Shared expense-related state is managed through React Context so that different parts of the application can access and update the same data without unnecessary prop drilling.

### Pages

Application views are organized separately from reusable UI components, making the project easier to navigate and maintain.

### Utilities

Business logic and helper functions are kept outside the UI layer.

For example:

* `calculations.js` → spending calculations
* `formatters.js` → formatting values for display
* `storage.js` → handling client-side data persistence

This separation keeps UI code cleaner and makes individual functions easier to test and modify.

---

## 🔄 How It Works

The basic application flow is:

```text
User Action
    ↓
Expense Form
    ↓
Application State
    ↓
Expense Data
    ↓
Calculations / Filtering / Search
    ↓
Updated UI
```

When a user adds, edits, or deletes an expense, the application updates the expense state and recalculates the relevant spending information.

Search and category filters operate on the expense data to display only the transactions matching the selected criteria.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### 2. Navigate to the project

```bash
cd expense-tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

---



Previews the production build locally.


The application is designed as a lightweight expense management solution without requiring a complex backend for its core functionality.

---

## 🔮 Future Improvements

The current application can be extended with:

* User authentication
* Cloud-based data synchronization
* Backend REST API
* Database integration
* Monthly and yearly expense reports
* Budget tracking
* Expense charts and visual analytics
* CSV/PDF export
* Recurring expenses
* Dark/light theme customization
* Automated testing
* Improved accessibility

---

## 📌 Project Highlights

This project demonstrates practical experience with:

* React component architecture
* TypeScript
* State management
* CRUD operations
* Data filtering and searching
* Derived data calculations
* Reusable utility functions
* Responsive interface development
* Client-side data persistence
* Modern frontend project organization

---

## 👩‍💻 Author

**Priya Parihar**

B.Tech Computer Science & Engineering

Interested in Software Development, Cloud & DevOps, and building practical web applications.

---

## 📄 License

This project is created for learning, development, and portfolio purposes.
