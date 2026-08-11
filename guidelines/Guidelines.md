**Add your own guidelines here**
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
# Project Development Rules

## Project

Personal portfolio / Full-Stack Software Engineer portfolio CMS.

## Frontend

- React
- Vite
- TypeScript
- Tailwind CSS

## Backend

- Node.js
- Express
- TypeScript
- REST API

## Backend Architecture

Route
→ Controller
→ Service
→ Repository
→ Database

## Database

- PostgreSQL
- Prisma
- Supabase

## Validation

- Zod

## Authentication

- JWT
- Email/password
- User model is for admin authentication only

## Repository

- Git
- pnpm monorepo where applicable

## Important Rules

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