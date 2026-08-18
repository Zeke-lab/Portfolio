# Backend

This package contains the portfolio API and database layer.

## Structure
- `src/api` - Express routes
- `src/services` - application logic
- `src/repositories` - data access
- `src/db` - Prisma client
- `prisma/schema.prisma` - database schema

## Scripts
- `npm run dev` - start the API in watch mode
- `npm run build` - compile TypeScript
- `npm run db:generate` - generate Prisma client
- `npm run db:migrate` - run Prisma migrations
- `npm run db:seed` - seed mock portfolio data

## Environment
Copy `.env.example` to `.env` and set `DATABASE_URL`, `DIRECT_URL`, `PORT`, and `CORS_ORIGIN`.
