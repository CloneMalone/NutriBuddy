# NutriBuddy

A full-stack nutrition tracking application that helps users monitor their daily calorie intake against personalized daily budgets. Built with **Clean Architecture** and **Domain-Driven Design** principles.

## Features

- **User Registration & Login** — Secure account creation with password strength enforcement (8+ chars, uppercase, number, special character) and bcrypt hashing (10 salt rounds)
- **Session Management** — Cookie-based sessions (`httpOnly`, `sameSite: lax`) with 24-hour expiration; automatic session guard on protected routes
- **Nutrition Logging (Full CRUD)** — Create, view, edit, and delete food entries with emoji icons, descriptions (max 50 chars), and calorie counts (1–10,000)
- **Daily Dashboard** — View all nutrition entries for a selected date with calorie budget vs. consumed stats; date picker prevents future date selection
- **Calorie Budget Management** — Set and update a personal daily calorie goal (1–7,000 range) from the profile page
- **Theme Switching** — Choose from 35 DaisyUI themes via the settings page, persisted in `localStorage`
- **Domain-Driven Validation** — Immutable value objects enforce business rules at the domain layer (email format, password strength, calorie ranges, description length)
- **Responsive Design** — Mobile-first layout with bottom navigation dock on authenticated pages, card-based desktop layout
- **Toast Notifications** — Auto-dismissing success/error toasts (5s display + 300ms fade animation) for user feedback across page navigations

## Technology Stack

### Backend

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Strongly typed JavaScript for robust backend code |
| **Node.js** | JavaScript runtime environment |
| **Express.js 5.x** | Web framework for HTTP routing and middleware |
| **SQLite** | Lightweight relational database (3 tables: `users`, `sessions`, `nutrition_logs`) |
| **Bcrypt** | Secure password hashing (10 salt rounds) |

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library with functional components and hooks |
| **TypeScript** | Type-safe React development |
| **React Router 7** | Client-side routing with route state for cross-page messages |
| **Vite 7** | Fast development server with API proxy and build tool |
| **Tailwind CSS 4** | Utility-first CSS framework for styling |
| **DaisyUI 5** | Tailwind CSS component library (cards, modals, docks, stats, avatars, skeletons) |
| **Cally** | Native web component for the date picker |
| **Poppins** | Google Fonts typeface used across the app |

## Architecture

This project follows **Clean Architecture** and **Domain-Driven Design** principles, ensuring separation of concerns and maintainability.

### Backend Structure

```
backend/
├── main.ts                     # Entry point (Composition Root)
├── domain/                     # INNERMOST LAYER — Pure business logic
│   ├── entities/               # User and NutritionLog entities
│   ├── valueObjects/           # Immutable, self-validating objects (EmailAddress, PlainPassword, HashedPassword, CalorieBudget, NutritionEntry)
│   ├── repositories/           # Interface definitions (UserRepository, SessionRepository, NutritionLogRepository)
│   └── services/               # PasswordHasher interface
├── application/useCases/       # APPLICATION LAYER — 10 use cases orchestrating domain logic
├── infrastructure/             # INFRASTRUCTURE LAYER — Concrete implementations
│   ├── auth/                   # BcryptPasswordHasher, cookie config, session middleware
│   ├── database/               # DatabaseClient interface, SQLite connection, table initialization
│   └── repositories/           # SQLite implementations of domain repository interfaces
├── interfaces/http/            # INTERFACE LAYER — HTTP handlers
│   ├── routes.ts               # Route configuration
│   └── controllers/            # AuthController and NutritionController
├── utils/                      # Date formatting utility
└── types/                      # Express type augmentation (adds userId to Request)
```

### Frontend Structure

```
frontend/
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite + React + Tailwind CSS plugin config + API proxy
├── src/
│   ├── main.tsx                # React DOM root with BrowserRouter
│   ├── App.tsx                 # Route definitions (8 routes)
│   ├── index.css               # Tailwind CSS imports, DaisyUI plugin, Poppins font
│   ├── api/                    # 11 fetch wrappers (one per API endpoint, credentials: "include")
│   ├── hooks/                  # 11 custom React hooks (one per feature: auth, CRUD, theme, etc.)
│   ├── layouts/                # AuthLayout — session guard wrapper with nav bars
│   ├── pages/                  # 8 pages (Home, Register, Login, Dashboard, AddEntry, EditEntry, Profile, Settings)
│   ├── components/             # 18 presentational components (forms, modals, toasts, nav, dashboard UI)
│   └── utils/                  # Date formatting helpers
└── public/                     # Static assets
```

### Layer Responsibilities

| Layer | Responsibility |
|-------|----------------|
| **Domain** | Core business logic, entities, value objects, and repository interfaces. Has ZERO external dependencies. |
| **Application** | Use cases that orchestrate domain objects. No knowledge of HTTP or databases. |
| **Infrastructure** | Implements domain interfaces with concrete technology (SQLite, bcrypt). |
| **Interface** | HTTP controllers that parse requests and call use cases. |

### Dependency Rule

Dependencies only point **inward** toward the domain layer. The domain layer knows nothing about databases, frameworks, or external libraries.

### Frontend Patterns

| Pattern | Description |
|---------|-------------|
| **Smart/Dumb Components** | Pages own state via hooks; components are purely presentational |
| **Custom Hooks** | One hook per feature encapsulates API calls, form state, and navigation logic |
| **API Layer** | Thin `fetch` wrappers per endpoint with `credentials: "include"` for cookie auth |
| **No Global State** | Each page independently fetches what it needs; React Router state carries one-time messages |
| **Session Guard** | `useSessionGuard` hook redirects based on auth state (protect routes or redirect logged-in users) |

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/users/register` | Create new user account | No |
| `POST` | `/api/users/login` | Authenticate and create session | No |
| `POST` | `/api/users/logout` | Destroy session and clear cookie | Yes |
| `GET` | `/api/users/check-session` | Check if session cookie is valid | No |
| `GET` | `/api/users/me` | Get authenticated user's profile | Yes |
| `PUT` | `/api/users/me/calorie-budget` | Update daily calorie budget | Yes |
| `POST` | `/api/nutrition` | Add nutrition entry | Yes |
| `GET` | `/api/nutrition?date=YYYY-MM-DD` | Get entries for a date | Yes |
| `GET` | `/api/nutrition/:logId` | Get a specific entry by ID | Yes |
| `PUT` | `/api/nutrition/:logId` | Update an existing entry | Yes |
| `DELETE` | `/api/nutrition/:logId` | Delete an entry | Yes |

## Database

SQLite database is automatically initialized on first run with the following tables:

| Table | Columns |
|-------|---------|
| `users` | `id`, `first_name`, `last_name`, `email` (unique), `password_hash`, `calorie_budget` |
| `sessions` | `id`, `user_id` (FK → users), `expires_at`, `data` |
| `nutrition_logs` | `id`, `user_id` (FK → users), `calories`, `description`, `emoji_icon`, `date` |

## Key Abstractions

| Interface | Implementation | Purpose |
|-----------|----------------|---------|
| `UserRepository` | `SQLiteUserRepository` | User persistence (save, find, update budget) |
| `SessionRepository` | `SQLiteSessionRepository` | Session lifecycle (create, find, delete, cleanup) |
| `NutritionLogRepository` | `SQLiteNutritionLogRepository` | Nutrition log CRUD operations |
| `PasswordHasher` | `BcryptPasswordHasher` | Password hashing and verification |
| `DatabaseClient` | `sqliteConnection` | Database query execution |
