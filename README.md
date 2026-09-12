Personal Portfolio Website

This is the portfolio website of Ye Myat Min.

## Running the project locally

Use npm in the backend and frontend folders separately.

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend API runs on:
- http://localhost:4000
- health check: http://localhost:4000/health

To apply the database migration:

```bash
cd backend
npm run db:migrate
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:
- public portfolio: http://localhost:5173
- admin dashboard: http://localhost:5173/admin
- admin dashboard shortcut: http://localhost:5173/?admin=1

If you are using a custom host alias such as `admin.localhost`, that must be configured manually in your machine hosts file and Vite host settings. It is not required for the default app setup.

### Production build

```bash
cd frontend
npm run build
```
