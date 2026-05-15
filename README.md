# KazakhBuddy — Buddy-System Management Platform

KazakhBuddy is a web-based platform designed to support the adaptation of international students at universities in Kazakhstan by connecting them with local student buddies.

The platform provides a structured environment where students can find support, communicate with peers, and manage their adaptation process in one place.

---

## Project description

This project was developed as a diploma project at Astana IT University.

The main goal was to solve the problem of fragmented support for international students. In practice, students rely on different sources such as university offices, social media, and informal contacts. There is no single system that combines communication, matching, and adaptation tracking.

KazakhBuddy brings these elements together into one platform.

---

## Main features

* User registration and authentication (JWT)
* Profiles for international students and local buddies
* Buddy matching system
* Buddy request and approval workflow
* Messaging between matched users
* Adaptation checklist with progress tracking
* Events and useful information sections
* Notifications
* Admin dashboard for moderation

---

## AI assistant

The platform includes an AI assistant module available through:

```
POST /api/assistant/chat
```

The assistant:

* works with authenticated users
* uses user profile and checklist data as context
* provides answers related to adaptation (housing, transport, documents, etc.)
* supports English, Russian and Kazakh

---

## Architecture

The system follows a three-tier architecture:

* Frontend: React (Vite)
* Backend: Node.js (Express)
* Database: PostgreSQL (Docker)

The backend is structured using a route–controller–service–repository pattern.

---

## Tech stack

Frontend:

* React
* Vite
* React Router
* i18next

Backend:

* Node.js
* Express

Database:

* PostgreSQL

Other:

* Docker
* JWT (authentication)
* bcrypt (password hashing)

---

## Project structure

```
buddy_project/

frontend/
  src/
    pages/
    components/
    context/
    routes/

backend/
  src/
    routes/
    controllers/
    services/
    repositories/
  database/
    init.sql

docker-compose.yml
```

---

## How it works

1. A user registers as an international student or a local buddy
2. The student browses available buddies
3. A request is sent to a selected buddy
4. The buddy accepts or rejects the request
5. The administrator approves the match
6. After approval, users can communicate in chat
7. The student can track adaptation using the checklist

---

## Setup and run

### 1. Clone repository

```
git clone https://github.com/Aknniyet/buddy_project.git
cd buddy_project
```

---

### 2. Environment variables (backend)

Create a `.env` file:

```
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/diploma-buddy
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173
```

---

### 3. Run database (Docker)

```
docker-compose up -d
```

---

### 4. Start backend

```
cd backend
npm install
npm run dev
```

---

### 5. Start frontend

```
cd frontend
npm install
npm run dev
```

---

## Deployment

The project was deployed using Render:

Frontend:
[https://kazakhbuddy-frontend.onrender.com](https://kazakhbuddy-frontend.onrender.com)

Backend:
REST API service connected to PostgreSQL

---

## Limitations

* Matching is manual (no recommendation algorithm yet)
* Messaging uses polling instead of real-time sockets
* Testing coverage is limited

---

## Future improvements

* Recommendation-based matching
* Real-time messaging (WebSockets)
* Mobile application
* Integration with university systems

---

## Authors

Akniyet Muratbekkyzy
Danel Kanbakova
Darina Kassymbek

Astana IT University, 2026

