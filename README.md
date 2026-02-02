# CRUDTASK 

A task management app I built to practice JavaScript and learn about SPAs (Single Page Applications).

## About

This project is a school assignment where I had to create a CRUD application without using frameworks like React or Vue. The goal was to understand how SPAs work under the hood - routing, state management, API calls, etc.

## Features

### Authentication
- Login and registration system
- Role-based access (Admin / User)
- Session persistence with localStorage
- Protected routes

### For Admins
- View all tasks in the system
- Create, edit and delete any task
- See dashboard with stats (total, completed, pending)
- View registered users

### For Users
- View only their own tasks
- Create new tasks
- Edit and delete their tasks
- Change task status: Pending → In Progress → Completed
- Personal dashboard with their stats

### General
- Form validation
- Loading states
- Error handling with alerts
- Responsive design
- Date validation (can't set past dates)

## How to run it

1. Clone the repo
2. Install dependencies:

```bash
npm install
```

3. Start both servers:

```bash
npm run start
```

This runs:
- Frontend at http://localhost:5173
- API at http://localhost:3001

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Only frontend (Vite) |
| `npm run server` | Only API (json-server) |
| `npm run build` | Build for production |

## Test accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@crudtask.edu | admin123 |
| User | juan@crudtask.edu | 123456 |

You can also register a new account from the login page.

## Project structure

```
src/
├── components/    → Reusable UI pieces (task cards, forms, loading)
├── controllers/   → Event handlers and business logic
├── router/        → Client-side navigation system
├── services/      → API communication layer
├── styles/        → CSS files for each view
├── utils/         → Helper functions (validation, alerts, storage)
└── views/         → HTML templates for each page
```

## Tech stack

| Technology | Purpose |
|------------|---------|
| Vanilla JS | Main language (ES6+) |
| Vite | Dev server and bundling |
| json-server | Fake REST API |
| Axios | HTTP requests |
| SweetAlert2 | Nice looking alerts |
| Lucide | Icons |

## What I learned

- Building a SPA from scratch without frameworks
- Implementing client-side routing with history API
- Managing authentication and protected routes
- Working with async/await and handling API errors
- Organizing code with MVC-like pattern
- Using localStorage for session persistence
- Form validation and user feedback

## Future improvements

Some things I'd like to add if I have time:

- [ ] Dark mode
- [ ] Task filters by date
- [ ] Export tasks to PDF
- [ ] Email notifications
- [ ] Better mobile experience

---

Made by **Juan Pablo Vélez** | 2026
