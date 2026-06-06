# KazakhBuddy

KazakhBuddy is a buddy-system management platform created to support international students in Kazakhstan. It connects international students with local student buddies and brings the main adaptation flow into one place: matching, communication, events, community, and progress tracking.

This project was developed as a diploma project at Astana IT University.

Live website: [kazakhbuddy-frontend.onrender.com](https://kazakhbuddy-frontend.onrender.com)

## Overview

The platform is built around three roles:

- `international` - international students looking for support
- `local` - local student buddies
- `admin` - platform administrators

KazakhBuddy helps universities organize student support in a more structured way instead of relying on scattered chats, manual coordination, and separate information channels.

## Core Features

- registration, login, and role-based access
- student and buddy profiles
- buddy search, requests, and matching
- direct messaging between matched users
- adaptation checklist and progress tracking
- events, notifications, and community posts
- admin dashboard and moderation tools
- multilingual interface in English, Russian, and Kazakh
- built-in assistant for adaptation-related questions

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Lucide React

### Backend

- Node.js
- Express
- PostgreSQL
- JWT
- Nodemailer
- Google Gemini API

### Infrastructure

- Docker Compose
- PostgreSQL 15
- pgAdmin

## Project Structure

```text
buddy_project/
|- frontend/
|- backend/
|- docker-compose.yml
\- README.md
```

## Local Run

### 1. Start the database

From the project root:

```bash
docker compose up -d
```

### 2. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

### 3. Initialize the database

From `backend`:

```bash
npm run db:init
```

### 4. Start the backend

From `backend`:

```bash
npm run dev
```

Default local backend URL:

`http://localhost:5001`

### 5. Start the frontend

From `frontend`:

```bash
npm run dev
```

Default local frontend URL:

`http://localhost:5174`

## Scripts

### Backend

```bash
npm run dev
npm run start
npm run db:init
npm run db:seed-admin
```

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Main Modules

- authentication and profile management
- buddy matching and request workflow
- messaging and notifications
- adaptation checklist
- events and community board
- admin dashboard and moderation
- assistant support

## Authors

Akniyet Muratbekkyzy  
Danel Kanbakova  
Darina Kassymbek

Astana IT University, 2026
