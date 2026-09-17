# Rotation Companion

Rotation Companion is a React-based clinical rotation workstation for medical students, residents, and learners. It helps users organize rotation tasks, study topics, cases, skills, quizzes, progress, and AI-assisted preparation from one responsive dashboard.

> Educational use only. Rotation Companion is not a substitute for professional medical judgment, clinical supervision, or institutional policy.

## Features

- Clinical dashboard with daily rotation planning
- Rotation modules for topics, cases, and learning objectives
- Case bank, case detail pages, and personal case tracking
- Skills matrix for clinical competency tracking
- Question bank and quiz workflow
- AI Coach, AI Attending, and Presentation Trainer pages
- Calendar, history, progress, profile, settings, and admin views
- Guest demo mode for quick exploration
- Supabase authentication and database integration with local fallback behavior
- Responsive layout with desktop sidebar and mobile navigation
- Light and dark theme support

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Tailwind CSS 4
- Lucide React
- Supabase
- Oxlint
- Vercel / Netlify deployment configuration

## Project Structure

```text
Rotation Companion/
|-- public/
|-- scratch/
|-- src/
|   |-- components/
|   |-- context/
|   |-- lib/
|   |   |-- ai/
|   |   `-- db/
|   `-- pages/
|-- supabase/
|   `-- schema.sql
|-- .env.example
|-- package.json
|-- vite.config.js
|-- vercel.json
|-- netlify.toml
`-- README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rockeyrithish2/Rotation-Companion.git
cd Rotation-Companion
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

For your own deployment, replace the Supabase values with your project credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Deployment

This project includes configuration files for Vercel and Netlify. Before deploying, add the required Supabase environment variables in the hosting provider's project settings.

## Security Notes

- Do not commit `.env.local` or private API keys.
- Supabase anon keys are intended for frontend use, but database protection must be enforced with proper Row Level Security policies.
- User-entered AI API keys are stored locally in browser settings by the current app flow.

## Author

Rithish Chandra

GitHub: [rockeyrithish2](https://github.com/rockeyrithish2)
