# KazakhBuddy — Buddy-System Management Platform

KazakhBuddy is a web-based platform designed to support the adaptation of international students at universities in Kazakhstan by connecting them with local student buddies.

The platform combines registration, buddy profiles, matching, requests, messaging, adaptation tracking, community activity, events, notifications, and admin moderation in one system.

---

## Project Description

This project was developed as a diploma project at Astana IT University.

The main goal is to reduce fragmented support for international students. In practice, students often rely on separate sources such as university offices, social media groups, and informal contacts. KazakhBuddy brings communication, matching, adaptation tasks, and moderation into one structured platform.

---

## Main Features

- User registration, login, JWT authentication, and protected role-based routes
- Email verification for registration
- Forgot-password and reset-password flow
- Separate dashboards for international students, local buddies, and admins
- Editable profiles for international students and local buddies
- Local buddy application/profile fields:
  - maximum students
  - preferred meeting mode
  - maximum weekly hours
  - support areas
- Buddy discovery page for international students
- Compatibility scoring based on:
  - study program
  - shared languages
  - shared interests
  - gender preference
  - buddy capacity
  - buddy feedback/rating
  - lightweight NLP support-fit signals
- Buddy request workflow
- Buddy accept/decline workflow
- Admin match management:
  - approve pending requests
  - create manual matches
  - reassign matches
  - complete/cancel/reactivate matches
  - manage buddy profile status
  - add match notes
- Student reassignment requests
- Messaging between matched users
- WebSocket-based realtime updates for messages, notifications, requests, and matches
- Message deletion/clear actions and encrypted message storage support
- Notifications with optional email delivery
- Adaptation checklist with progress tracking, deadlines, custom tasks, edit/delete, and reminders
- Events section for students and buddies
- Admin event management
- Community board with posts, comments, interest toggles, image support, and notifications
- Buddy feedback and rating system
- Admin dashboard and risk monitor for adaptation progress and students who may need attention
- Public pages:
  - home
  - about
  - adaptation guide
- Light/dark theme support
- Custom English, Russian, and Kazakh localization

---

## AI Assistant

The platform includes an authenticated AI assistant endpoint:

```http
POST /api/assistant/chat
```

The assistant:

- works with authenticated users
- uses the user's role and checklist data as context
- answers questions related to adaptation, documents, housing, transport, campus life, events, platform usage, and support resources
- supports English, Russian, and Kazakh responses
- uses Gemini when `GEMINI_API_KEY` is configured
- falls back to the local assistant service when Gemini is unavailable or not configured

---

## Architecture

The system follows a three-tier architecture:

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: PostgreSQL in Docker

The backend uses a route-controller-service-repository structure.

Realtime features are handled with a WebSocket server mounted at:

```http
ws://localhost:5000/ws
```

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Lucide React icons
- Custom i18n context
- CSS modules/stylesheets by page and feature

### Backend

- Node.js
- Express
- JWT
- bcrypt
- PostgreSQL `pg`
- WebSocket `ws`
- Nodemailer
- Google Gemini SDK

### Database / Infrastructure

- PostgreSQL 15
- Docker Compose
- pgAdmin

---

## How It Works

1. A user registers as an international student or a local buddy.
2. The user verifies their email with a code.
3. A local buddy completes buddy profile details such as capacity, meeting mode, weekly hours, and support areas.
4. Admin can review and approve local buddy profiles.
5. An international student browses available approved buddies.
6. The platform calculates compatibility scores and shows match reasons.
7. The student sends a buddy request.
8. The buddy accepts or declines the request.
9. A match can be created through the buddy workflow or managed by admin.
10. Matched users can communicate in Messages.
11. Students track adaptation progress with checklist tasks and deadlines.
12. Users receive realtime notifications for important activity.
13. Admin monitors users, buddy profiles, matches, reassignment requests, events, and adaptation risk.

---

## Setup and Run

### 1. Clone Repository

```bash
git clone https://github.com/Aknniyet/buddy_project.git
cd buddy_project
```

### 2. Install Dependencies

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### 3. Configure Backend Environment

Create `backend/.env`:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/buddy_project
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173

EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=

GEMINI_API_KEY=
MESSAGE_ENCRYPTION_KEY=

ADMIN_NAME=Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password
```

Required for normal local development:

- `DATABASE_URL`
- `JWT_SECRET`
- `FRONTEND_URL`

Optional:

- `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM` for verification, reset, and notification emails
- `GEMINI_API_KEY` for Gemini AI assistant responses
- `MESSAGE_ENCRYPTION_KEY` for encrypted message storage support
- `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` for seeding an admin account

### 4. Configure Frontend Environment

Create `frontend/.env` if you need custom API URLs:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=http://localhost:5000
```

If omitted, the frontend defaults to:

```text
http://localhost:5000/api
```

### 5. Run Database

From the project root:

```bash
docker-compose up -d
```

This starts:

- PostgreSQL on `localhost:5433`
- pgAdmin on `http://localhost:5051`

Default pgAdmin login:

```text
Email: admin@example.com
Password: admin
```

### 6. Initialize Database

From `backend/`:

```bash
npm run db:init
```

### 7. Seed Admin User

From `backend/`:

```bash
npm run db:seed-admin
```

Make sure `ADMIN_EMAIL`, `ADMIN_NAME`, and `ADMIN_PASSWORD` are set in `backend/.env`.

### 8. Start Backend

From `backend/`:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

WebSocket:

```text
ws://localhost:5000/ws
```

### 9. Start Frontend

From `frontend/`:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Useful Scripts

Backend:

```bash
npm run dev
npm start
npm run db:init
npm run db:seed-admin
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

## Deployment

The project can be deployed as separate frontend and backend services.

Frontend:

- Static React/Vite deployment
- Configure `VITE_API_URL`
- Configure `VITE_WS_URL` if the websocket URL differs from the API host

Backend:

- Node.js service
- PostgreSQL database
- Configure `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`, and optional email/Gemini/encryption variables

The project was deployed using Render:

- Frontend: [https://kazakhbuddy-frontend.onrender.com](https://kazakhbuddy-frontend.onrender.com)
- Backend: REST API service connected to PostgreSQL


---

## Authors

Akniyet Muratbekkyzy  
Danel Kanbakova  
Darina Kassymbek

Astana IT University, 2026
