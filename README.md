# NutriBuddy

A nutrition tracking application that helps users monitor their daily calorie intake against personalized daily budgets.

## Features

- **User Authentication** - Secure registration and login with bcrypt password hashing
- **Nutrition Tracking** - Log daily nutrition entries with calorie counts and food descriptions
- **Daily Summaries** - View all nutrition entries for a specific date
- **Calorie Budget Management** - Set and track personal daily calorie goals

## Technology Stack

### Backend
- **TypeScript** - Strongly typed JavaScript for robust backend code
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for HTTP routing and middleware
- **SQLite** - Lightweight relational database
- **Bcrypt** - Secure password hashing library

### Frontend
- **React** - UI library for building interactive user interfaces
- **TypeScript** - Type-safe React development
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Shadcn** - High-quality, reusable React components

## Architecture

This project follows **Clean Architecture** and **Domain-Driven Design** principles:

- **Domain Layer** - Core business logic, entities, and value objects
- **Application Layer** - Use cases that orchestrate domain logic
- **Infrastructure Layer** - Database repositories and external integrations
- **Interfaces Layer** - HTTP controllers and route handlers
