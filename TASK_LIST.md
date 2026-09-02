# Portfolio Task List

## Current status

The project foundation is in place.

- [x] React, TypeScript, Vite, Tailwind, and the portfolio UI are set up.
- [x] Public sections exist: navigation, hero, about, skills, projects, case study, experience, education, technology stack, contact, and footer.
- [x] Light/dark mode and motion effects are implemented.
- [x] Express API scaffolding, a portfolio route, service, and repository layers exist.
- [x] Prisma, a PostgreSQL schema, and initial migrations are present.
- [x] The intended final architecture is documented: frontend -> API -> Express -> Prisma -> PostgreSQL/Supabase.
- [x] Supabase environment variables are configured for the backend.
- [x] Mock portfolio data has been seeded into Supabase.
- [x] The backend repository reads published portfolio data through Prisma.
- [x] The backend compiles successfully after the Prisma integration.
- [x] The frontend fetches portfolio section data from the public API and includes loading/error states.
- [x] The frontend production build passes after API integration.
- [x] The site still contains personal-content placeholders.
- [x] The frontend portfolio sections no longer use local `content.ts` data.
- [x] The contact form currently simulates success; it does not send or store messages.
- [x] An admin dashboard and JWT authentication are implemented for portfolio content management.

## Phase 1 — Populate the public portfolio

Do these one section at a time, then run the frontend build after each task.

- [x] **Hero:** replace name, headline, short introduction, availability, email, and primary call-to-action links. Resume link remains pending until after deployment.
- [x] **About:** add your real biography, strengths, location, and professional focus.
- [ ] **Skills and tech stack:** list only technologies you can confidently discuss; organize them by category.
- [ ] **Projects:** replace the four project placeholders with real titles, summaries, technology tags, images, live links, repository links, and measurable outcomes.
- [ ] **Case study:** select your strongest project and document problem, research, solution, architecture, delivery process, and results.
- [ ] **Experience:** replace the three entries with real company, role, dates, location, achievements, and technology details.
- [ ] **Education:** add degree, institution, dates, and key areas of study.
- [ ] **Certifications:** add real certifications, issuing organizations, years, and credential links where available.
- [ ] **Contact and footer:** replace email, LinkedIn, GitHub, website, location, footer name, and copyright name; remove all `#` social links.
- [ ] **Resume:** add a final PDF resume and connect every resume/download button to it after deployment.

## Phase 2 — Quality-check the public site

- [ ] Test navigation and every external/download link.
- [ ] Check the layout at mobile, tablet, and desktop widths.
- [ ] Review content for spelling, concise achievement-focused writing, and consistent dates.
- [ ] Add descriptive alt text for project images and verify keyboard navigation.
- [x] Run `npm run build` in `frontend` and fix any errors.

## Phase 3 — Activate backend and database

Start this only after Phase 1 content is approved and stable.

- [x] Configure Supabase and backend environment variables (`DATABASE_URL`, `DIRECT_URL`, `PORT`, `CORS_ORIGIN`).
- [x] Review the existing Prisma schema against the mock content model; no schema changes were made.
- [x] Create and run a reusable mock-data seed script.
- [x] Replace the backend's temporary/local repository data with Prisma queries, preserving route -> service -> repository -> Prisma separation.
- [ ] Replace mock database records with approved personal portfolio content after Phase 1 is complete.
- [x] Test public portfolio API responses independently (Postman: health, content, projects, skills, and experience all returned HTTP 200).
- [x] Replace frontend local content imports with API calls, including loading and error states.
- [x] Verify the running frontend can load Supabase-backed API content, then delete the retired local `content.ts`, `repository.ts`, and `service.ts` files.
- [x] Implement contact-message validation and a real API endpoint that stores messages.
- [x] Test the complete public flow: frontend -> API -> database.

## Phase 4 — Private content management

- [x] Define the required admin workflows and fields before building the dashboard.
- [x] Implement admin login with email/password and JWT-based protection.
- [x] Add protected API operations for profile, projects, skills, case studies, experience, education, certifications, resumes, and contact messages.
- [x] Build the private admin dashboard that consumes only the backend API.
- [x] Add media upload/storage through Supabase Storage when image or resume management is needed.
- [x] Test authorization, validation, and CRUD workflows end to end.
- [x] Admin project form includes case study link field.
- [x] Admin education and certification forms support month-only date selection (dates normalized to first day of month).
- [x] Public portfolio education section is wired to database-backed values (replaces placeholders).
- [x] Location field removed from education display on public portfolio.
- [x] Profile admin inputs split Hero introduction from the detailed About biography.
- [x] Project and experience textareas preserve separate lines on the public portfolio.

### Remaining work
- [ ] Add a location field to admin education form (currently stored in DB but not editable via admin UI).
- [ ] Replace the browser-native month picker with a custom styled month picker for consistent dark theme.
- [ ] Replace placeholder public portfolio content with approved personal data for every section.
- [ ] Add the final resume PDF and connect the resume URL/buttons after deployment.
- [ ] Final hosting, environment, and production deployment setup.
- [ ] Final QA for accessibility, mobile layout, and links before launch.
- [ ] tech skill what worth with and tech stack are similar , how to fix
- [ ] Final QA for accessibility, mobile layout, and links before launch.




## Phase 5 — Launch preparation

- [ ] Choose hosting for frontend and backend, then configure production environment variables and CORS.
- [ ] Deploy the database, API, and frontend separately.
- [ ] Add a custom domain, metadata, social sharing image, favicon, and analytics if wanted.
- [ ] Perform a final cross-browser, mobile, accessibility, and link check.
- [ ] Verify the deployed contact form and admin authentication.

## Recommended next task

Run the backend and frontend together, then confirm the browser displays the mock API data. If it does, remove the retired local content files.
