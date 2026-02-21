# NutriBuddy

A nutrition tracking application that helps users monitor their daily calorie intake against personalized daily budgets. Built with **Clean Architecture** and **Domain-Driven Design** principles.

## Features

- **User Authentication** — Secure registration and login with bcrypt password hashing and session-based authentication
- **Session Management** — Cookie-based sessions with configurable expiration (24-hour default)
- **Nutrition Tracking** — Log daily nutrition entries with calorie counts (1–10,000) and food descriptions
- **Daily Summaries** — View all nutrition entries for a specific date
- **Calorie Budget Management** — Set personal daily calorie goals (1–7,000 range)
- **Input Validation** — Domain-driven validation through value objects ensures data integrity

## Technology Stack

### Backend

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Strongly typed JavaScript for robust backend code |
| **Node.js** | JavaScript runtime environment |
| **Express.js 5.x** | Web framework for HTTP routing and middleware |
| **SQLite** | Lightweight relational database (3 tables: users, sessions, nutrition_logs) |
| **Bcrypt** | Secure password hashing (10 salt rounds) |

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library for building interactive user interfaces |
| **TypeScript** | Type-safe React development |
| **Vite 7** | Fast development server and build tool |
| **Tailwind CSS 4** | Utility-first CSS framework for styling |
| **DaisyUI 5** | Tailwind CSS component library |
| **Poppins** | Google Fonts typeface used across the app |

## Architecture

This project follows **Clean Architecture** and **Domain-Driven Design** principles, ensuring separation of concerns and maintainability.

### Backend Structure

```
backend/
├── main.ts                          # Entry point (Composition Root)
├── domain/                          # INNERMOST LAYER — Pure business logic
│   ├── DomainError.ts               # Custom error for business rule violations
│   ├── entities/                    # Objects with identity
│   │   ├── User.ts                  # User entity
│   │   └── NutritionLog.ts          # Nutrition log entity
│   ├── valueObjects/                # Immutable, self-validating objects
│   │   ├── UserEmail.ts             # Validates email format
│   │   ├── UserPassword.ts          # Wraps hashed password
│   │   ├── UserCalorieBudget.ts     # Validates 1–7,000 range
│   │   └── NutritionEntry.ts        # Validates calories (1–10,000) and description
│   ├── repositories/                # Interface definitions (abstractions)
│   │   ├── UserRepository.ts
│   │   ├── SessionRepository.ts
│   │   └── NutritionLogRepository.ts
│   └── services/
│       └── PasswordHasher.ts        # Password hashing interface
├── application/useCases/            # APPLICATION LAYER — Orchestrates domain
│   ├── RegisterUser.ts              # User registration flow
│   ├── LoginUser.ts                 # User authentication flow
│   ├── AddNutritionLog.ts           # Create nutrition entry
│   └── GetNutritionLogsByDate.ts    # Fetch logs for a date
├── infrastructure/                  # INFRASTRUCTURE LAYER — Implementations
│   ├── auth/
│   │   ├── BcryptPasswordHasher.ts  # Implements PasswordHasher (bcrypt, 10 rounds)
│   │   ├── cookieConfig.ts          # Session cookie settings (httpOnly, 24h expiry)
│   │   └── sessionMiddleware.ts     # Express middleware for auth
│   ├── database/
│   │   ├── DatabaseClient.ts        # Database interface
│   │   ├── sqliteConnection.ts      # SQLite implementation
│   │   └── initializeDatabase.ts    # Creates tables on startup
│   └── repositories/
│       ├── SQLiteUserRepository.ts
│       ├── SQLiteSessionRepository.ts
│       └── SQLiteNutritionLogRepository.ts
├── interfaces/http/                 # INTERFACE LAYER — HTTP handlers
│   ├── routes.ts                    # Route configuration
│   └── controllers/
│       ├── AuthController.ts        # /api/users endpoints
│       └── NutritionController.ts   # /api/nutrition endpoints
└── types/
    └── express.d.ts                 # Express type augmentation (adds userId to Request)
```

### Frontend Structure

```
frontend/
├── index.html                       # HTML entry point
├── vite.config.ts                   # Vite + React + Tailwind CSS plugin config
├── src/
│   ├── main.tsx                     # React DOM root
│   ├── App.tsx                      # Root component
│   ├── index.css                    # Tailwind CSS imports, DaisyUI plugin, Poppins font
│   ├── api/                         # API client functions (planned)
│   ├── hooks/                       # Custom React hooks (planned)
│   ├── components/
│   │   ├── NavBar.tsx               # Navigation bar with brand logo and action buttons
│   │   └── Hero.tsx                 # Landing hero section with CTA
│   └── pages/
│       └── Home.tsx                 # Home page (NavBar + Hero)
└── public/                          # Static assets
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

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/users/register` | Create new user account | No |
| `POST` | `/api/users/login` | Authenticate and get session | No |
| `POST` | `/api/nutrition` | Add nutrition entry | Yes |
| `GET` | `/api/nutrition?date=YYYY-MM-DD` | Get entries for date | Yes |

### Database

SQLite database is automatically initialized on first run with the following tables:

| Table | Description |
|-------|-------------|
| `users` | User accounts (id, first_name, last_name, email, password_hash, calorie_budget) |
| `sessions` | Active login sessions (id, user_id, expires_at, data) |
| `nutrition_logs` | Nutrition entries (id, user_id, calories, description, date) |

## Key Abstractions

| Interface | Implementation | Purpose |
|-----------|----------------|---------|
| `UserRepository` | `SQLiteUserRepository` | User persistence |
| `SessionRepository` | `SQLiteSessionRepository` | Session management |
| `NutritionLogRepository` | `SQLiteNutritionLogRepository` | Nutrition data |
| `PasswordHasher` | `BcryptPasswordHasher` | Password hashing |
| `DatabaseClient` | `sqliteConnection` | Database operations |
