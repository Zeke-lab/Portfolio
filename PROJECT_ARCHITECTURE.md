# Portfolio Project --- Technical Architecture & Workflow

## 1. Purpose

This document is the project reference for the portfolio application.

Its purpose is to keep development controlled and consistent across
ChatGPT, Codex, VS Code, and future development sessions.

**Important rule:** Before making architectural or technical changes,
check this document first.

------------------------------------------------------------------------

## 2. Product Goal

Build a professional personal portfolio for career/job applications.

The portfolio should present:

-   Personal introduction
-   Skills
-   Projects
-   Case studies
-   Professional experience
-   Education
-   Certifications
-   Contact information
-   Resume
-   Professional links

The portfolio is not only a static visual page. It is intended to become
a full-stack application with a database-backed content management
workflow.

------------------------------------------------------------------------

# 3. Confirmed Technology Stack

## Frontend

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   Motion / animation library already used by the project
-   Lucide React for icons

The existing UI design and component structure should be preserved
unless a deliberate redesign is requested.

## Backend

-   Node.js
-   Express
-   TypeScript
-   REST API

The backend follows a layered structure:

``` text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Prisma
```

## Database

-   PostgreSQL
-   Prisma ORM
-   Supabase as the planned PostgreSQL/database platform

The database is part of the intended final architecture.

Do NOT remove the database architecture simply because the current
frontend is temporarily using local content.

## Storage

Supabase Storage is intended for portfolio assets such as project images
and other uploaded media when required.

## Authentication

A private admin area is planned.

Authentication will be used for protected administrative operations.

The planned authentication approach is JWT-based authentication.

------------------------------------------------------------------------

# 4. Target Architecture

The intended final architecture is:

``` text
                         PUBLIC USERS
                              │
                              ▼
                    ┌──────────────────┐
                    │    FRONTEND      │
                    │ React + TS + Vite│
                    └────────┬─────────┘
                             │
                         REST API
                             │
                             ▼
                    ┌──────────────────┐
                    │     EXPRESS      │
                    │     BACKEND      │
                    └────────┬─────────┘
                             │
                       Route / Controller
                             │
                           Service
                             │
                         Repository
                             │
                          Prisma ORM
                             │
                             ▼
                    ┌──────────────────┐
                    │    PostgreSQL    │
                    │     Supabase     │
                    └──────────────────┘


                    ┌──────────────────┐
                    │  ADMIN DASHBOARD │
                    │  Private/Admin   │
                    └────────┬─────────┘
                             │
                         REST API
                             │
                             ▼
                       Express Backend
                             │
                             ▼
                         PostgreSQL
```

------------------------------------------------------------------------

# 5. Current State vs Final State

## Current implementation

The public frontend fetches portfolio section data from the Express API.
The API reads published records through Prisma from PostgreSQL/Supabase.
Mock content has been seeded to validate this integration path.

The retired frontend local-content files remain temporarily and should be
removed only after browser-level verification of the frontend -> API -> database flow.

### Historical baseline

At project creation, the frontend used local/in-repository portfolio content.

For example:

``` text
App.tsx
   ↓
content.ts / service.ts
   ↓
Portfolio UI
```

At that point, the backend existed separately and exposed portfolio routes,
but the frontend was not yet consuming those routes.

At that point, the backend repository layer contained local/in-repository data
rather than active database queries.

Prisma/PostgreSQL were scaffolded but were not yet the active source of
portfolio data.

**This is a temporary implementation state, not the final
architecture.**

## Final implementation

The goal is:

``` text
Frontend
   ↓
REST API
   ↓
Express
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Prisma
   ↓
PostgreSQL / Supabase
```

The frontend should eventually receive portfolio content from the
backend rather than importing the portfolio data directly from local
content files.

------------------------------------------------------------------------

# 6. Content Management Direction

Portfolio content should eventually be database-backed.

Expected database-managed content includes:

-   Profile/About information
-   Skills
-   Projects
-   Project technologies
-   Case studies
-   Experience
-   Education
-   Certifications
-   Professional links
-   Contact messages

Testimonials were intentionally removed from the current portfolio scope
and should not be reintroduced unless explicitly requested.

------------------------------------------------------------------------

# 7. Admin Dashboard

A private admin dashboard is planned for managing portfolio content.

The admin dashboard should eventually allow authorized administration of
relevant content such as:

-   Projects
-   Skills
-   Experience
-   Education
-   Certifications
-   Case studies
-   Profile information
-   Contact messages

Admin operations should go through the backend API.

The admin dashboard must not directly connect to PostgreSQL from the
browser.

Correct:

``` text
Admin Dashboard
      ↓
REST API
      ↓
Express
      ↓
Service
      ↓
Repository
      ↓
Prisma
      ↓
PostgreSQL
```

Incorrect:

``` text
Admin Dashboard
      ↓
PostgreSQL directly
```

------------------------------------------------------------------------

# 8. Contact Form

The portfolio includes a contact form.

The current frontend form may use temporary/local behavior.

The intended final workflow is:

``` text
Visitor
  ↓
Contact Form
  ↓
Frontend
  ↓
POST /api/...
  ↓
Express Backend
  ↓
Validation
  ↓
Service
  ↓
Repository
  ↓
PostgreSQL
```

Contact messages should eventually be stored in the database.

Email notification/sending can be added as a separate concern later if
required.

------------------------------------------------------------------------

# 9. Portfolio Development Workflow

Development must happen incrementally.

## Rule 1 --- One task at a time

Do not give Codex a large collection of unrelated changes.

Use:

``` text
One section
→ edit
→ build
→ verify
→ stop
```

Then move to the next section.

## Rule 2 --- Preserve the existing UI

Unless explicitly requested:

-   Do not redesign the UI.
-   Do not change layout.
-   Do not change colors.
-   Do not change typography.
-   Do not change animations.
-   Do not change responsive behavior.
-   Do not add sections.
-   Do not remove sections.

Content changes should remain content changes.

## Rule 3 --- No unrelated changes

Every Codex task should explicitly state:

> Do not make unrelated changes.

If a change outside the requested scope appears necessary, stop and
explain why before proceeding.

## Rule 4 --- Build after changes

After frontend changes:

``` bash
npm run build
```

The build should pass before moving to the next task.

## Rule 5 --- Inspect before modifying

Before changing architecture, backend, database, or dependencies:

1.  Inspect the current implementation.
2.  Explain what currently exists.
3.  Explain what needs to change.
4.  Make the smallest necessary change.

Do not guess the project structure.

------------------------------------------------------------------------

# 10. Current Content Migration Workflow

The current portfolio is being populated with real information
gradually.

Recommended order:

1.  Hero
2.  About
3.  Skills
4.  Projects
5.  Case Studies
6.  Experience
7.  Education
8.  Certifications
9.  Contact
10. Resume and professional links

Each section should be updated separately and verified with a build.

------------------------------------------------------------------------

# 11. Backend / Database Development Workflow

After the frontend content is stable:

### Phase A --- Inspect

Review:

-   Express server
-   Routes
-   Controllers
-   Services
-   Repositories
-   Prisma schema
-   Environment variables
-   Database configuration

Do not modify during inspection.

### Phase B --- Database

Confirm:

-   PostgreSQL/Supabase connection
-   Prisma configuration
-   Schema
-   Migrations
-   Required tables
-   Relationships

### Phase C --- Backend data layer

Replace temporary repository/local data with Prisma-backed repository
operations.

Keep the layered architecture:

``` text
Route
→ Controller
→ Service
→ Repository
→ Prisma
```

### Phase D --- API

Verify API endpoints independently before connecting the frontend.

### Phase E --- Frontend integration

Replace direct local content imports with API calls where appropriate.

### Phase F --- Admin dashboard

Build the private admin interface after the data/API foundation is
stable.

### Phase G --- Authentication

Add and test protected admin routes.

### Phase H --- Full integration testing

Test:

``` text
Public frontend
→ API
→ Database

Admin dashboard
→ API
→ Database

Contact form
→ API
→ Database
```

------------------------------------------------------------------------

# 12. Deployment Direction

The deployment architecture should preserve the separation between:

-   Frontend
-   Backend
-   Database
-   Storage

The exact hosting/deployment configuration should be decided when
deployment work begins.

Do not introduce a new hosting provider or infrastructure architecture
without discussing it first.

------------------------------------------------------------------------

# 13. Rules for AI/Codex

When asking Codex to modify this project:

### Always include

``` text
Do not make unrelated changes.
Preserve the existing architecture.
Do not redesign the UI unless explicitly requested.
Only modify the files necessary for this task.
Run the appropriate build/test after changes.
Report exactly which files were changed.
Stop after completing the requested task.
```

### For inspection tasks

Use:

``` text
Inspection only.
Do not edit, create, delete, rename, refactor, or migrate anything.
Report findings only.
```

### For architecture changes

Codex must not independently decide to:

-   remove the backend
-   remove Prisma
-   remove PostgreSQL
-   remove Supabase
-   replace the database
-   replace Express
-   replace React
-   replace the existing architecture

Any architectural change must be explicitly approved first.

------------------------------------------------------------------------

# 14. Important Project Principle

The current implementation and the intended architecture are different.

A component or system being unused **right now** does not mean it should
be deleted.

Example:

``` text
Prisma currently unused
        ≠
Prisma is unnecessary
```

The project is being developed in phases.

Temporary local content is acceptable during frontend development
because the final database integration is planned later.

------------------------------------------------------------------------

# 15. Change Control

Before making a significant change, answer:

1.  What problem are we solving?
2.  Which files need to change?
3.  Does this change affect the architecture?
4.  Does it affect the database?
5.  Does it affect the API?
6.  Does it affect the UI?
7.  Can it be done without unrelated changes?
8.  How will we verify it?

If the answer involves an architectural change, stop and ask for
confirmation.

------------------------------------------------------------------------

# 16. Current Development Phase

**Current phase: Frontend/API integration verification and content population**

The immediate goal is:

``` text
Existing UI
    ↓
Replace placeholders
    ↓
Real personal information
    ↓
Verify build
    ↓
Finish frontend content
```

Do not begin database integration until the frontend content phase is
intentionally completed.

------------------------------------------------------------------------

# 17. Non-Negotiable Decisions

These decisions should be treated as confirmed unless explicitly changed
later:

-   React + TypeScript frontend
-   Vite frontend tooling
-   Tailwind CSS
-   Node.js + Express backend
-   TypeScript backend
-   REST API
-   Prisma ORM
-   PostgreSQL database
-   Supabase as the planned database platform
-   Database-backed portfolio content
-   Private admin dashboard
-   JWT-based authentication
-   Contact messages stored in the database
-   Layered backend architecture
-   Incremental development workflow
-   Preserve existing UI unless redesign is explicitly requested
-   No unrelated changes

------------------------------------------------------------------------

# 18. How to Use This Document

This document is the project's technical reference.

When starting a new AI/Codex session:

1.  Read this document first.
2.  Follow the confirmed technology choices.
3.  Follow the current development phase.
4.  Do not change architecture without approval.
5.  Do not make unrelated changes.
6.  Verify changes before moving to the next task.

If a future instruction conflicts with this document, do not silently
choose one.

Instead, identify the conflict and ask for confirmation.
