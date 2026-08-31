# WorkHub

## Deploy the frontend to Vercel

1. Import this repository into Vercel and set **Root Directory** to `frontend`. The included `frontend/vercel.json` configures the Vite build and React Router fallback automatically.
2. Add the environment variable `VITE_API_URL` with the deployed backend API base URL, including `/api`, for example `https://your-backend.example.com/api`.
3. Deploy. Set the backend's `CLIENT_URL` to the Vercel deployment URL so API requests are accepted by CORS.

The Express backend is configured for the existing Render deployment in `render.yaml`. Deploy it separately, then use its public URL for `VITE_API_URL`.
# Jagran WorkHub

An enterprise-oriented internal task and project delivery platform for Dainik Jagran. It uses a React/Vite client, RESTful Express API, MongoDB persistence, JWT authentication, and database-backed operational dashboards.

## Included

- Role-gated admin, manager, and employee workspaces
- Auth with bcrypt password hashes, JWT sessions, rate-limited login, Helmet, CORS and backend authorization
- Department/team/user structure; paginated user, team, project, and task APIs
- Kanban board persisted through task status API; automatic overdue detection and project completion calculation
- Task comments, attachments (validated type/5MB limit), activity log, in-app notifications, CSV reporting
- Responsive corporate interface with dashboard focus queue, project health/progress, accessible labels and loading/error states

## Quick start

1. Install MongoDB locally, or provide a MongoDB connection string.
2. Copy `.env.example` to `.env` and set `MONGO_URI` and a strong `JWT_SECRET`.
3. Run `npm install` in the root, then `npm install --prefix frontend` and `npm install --prefix backend` if dependencies were not installed already.
4. Seed data: `npm run seed`.
5. Start both applications: `npm run dev`.
6. Open `http://localhost:5173`.

## Demo credentials

All seeded accounts use password `WorkHub@2026`.

| Role | Email |
|---|---|
| Administrator | admin@jagran.com |
| Project manager | manager.tech@jagran.com |
| Project manager | manager.digital@jagran.com |
| Employee | employee1@jagran.com |

## Environment

`MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT`, `CLIENT_URL`, and `UPLOAD_DIR` are described in `.env.example`. Do not use seed credentials in a production deployment.

## Architecture

```
frontend/  React routes, UI, API client and responsive design system
backend/   Express routes, Mongoose models, auth middleware, seed script
```

Models: User, Department, Team, Project, Task, Comment, Notification, Audit. Database indexes cover user identity/role, task project/assignee/status/priority/due-date and project manager/status queries.

## Primary API

- `POST /api/auth/login`, `GET /api/auth/me`, `PUT /api/auth/change-password`
- `GET|POST /api/users`, `PATCH /api/users/:id/status`
- `GET|POST /api/projects`, `GET|PUT /api/projects/:id`
- `GET|POST /api/tasks`, `GET|PUT|DELETE /api/tasks/:id`, `PATCH /api/tasks/:id/status`
- `POST /api/tasks/:id/comments`, `POST /api/tasks/:id/attachments`
- `GET /api/dashboard`, `/api/notifications`, `/api/reports/tasks?format=csv`, `/api/audit-logs`

All API responses use `{ success, message, data }`; list responses additionally include `pagination`.

## Health and workload logic

Project progress is calculated from persisted task status: `completed / total * 100` (zero tasks returns 0). A non-completed task past its due date is automatically overdue. Project health is surfaced through the dashboard’s at-risk focus via overdue work; a production extension can add weighted deadline/progress thresholds. Workload is supported by each task’s `estimatedHours` and active assignment fields.

## Testing

`npm test` runs the currently included backend contract smoke test. Integration tests should be run against a dedicated MongoDB test URI before deployment; this repository does not claim a complete test suite.

## Remaining production hardening

Password-reset email delivery, cloud/object attachment storage with antivirus scanning, PDF rendering, drag-and-drop interaction, and complete CRUD modals for every admin entity are intentionally future expansion areas. The operational API layer and interface are ready to extend without replacing the core architecture.
