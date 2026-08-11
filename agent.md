# Project Agent Instructions

## Project Scope
- Personal portfolio / Full-Stack Software Engineer portfolio CMS.
- Frontend: React, Vite, TypeScript, Tailwind CSS.
- Backend: Node.js, Express, TypeScript, REST API.
- Database: PostgreSQL, Prisma, Supabase.
- Validation: Zod.
- Authentication: JWT, email/password.
- User model is for admin authentication only.
- Repository: Git, pnpm monorepo where applicable.

## Rules
1. Do not change the technology stack without explicit approval.
2. Do not introduce alternative frameworks without approval.
3. Follow the existing architecture.
4. Inspect existing code before modifying it.
5. Preserve existing good implementations.
6. Do not make unrelated changes.
7. Do not modify the database without explicit approval.
8. Never run `prisma migrate` unless explicitly requested.
9. Never run `prisma db push` unless explicitly requested.
10. Never modify Supabase unless explicitly requested.
11. Do not modify API routes when the task is database/schema-only.
12. Do not modify repositories when the task is database/schema-only.
13. Do not create unnecessary documentation files.
14. Do not change approved architectural decisions without discussion.
15. If requirements are ambiguous, stop and ask before making a significant architectural decision.

## Working Style
- Inspect before modifying.
- Make the smallest necessary change.
- Keep frontend, backend, and database concerns separated.
- Stop after the requested task is complete.
