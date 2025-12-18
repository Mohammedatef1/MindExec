## MindExec – Visual Web Vulnerability Workflow Builder

MindExec is a **visual workflow builder for web vulnerability scanning**.  
It lets security engineers, penetration testers, and bug bounty hunters **design scan workflows as a mind map**, configure each step, and generate executable commands/scripts from those workflows.

The app is built with **React + Vite**, styled with **Tailwind CSS**, and uses **Supabase** for authentication and user management.

---

## Table of Contents

- **Overview**
- **Core Features**
- **Architecture & Tech Stack**
- **Environment Configuration**
- **Getting Started**
- **Available Scripts**
- **Build & Deployment**
- **Project Structure**
- **Security Notes**
- **Contributing**
- **License**

---

## Overview

MindExec provides:

- A **marketing / landing page** that explains the product and its value.
- An authenticated **dashboard** that summarizes latest runs and workflows.
- A powerful **Editor** where users build workflows visually using a mind map interface.
- A **command-generation engine** that converts nodes in the mind map into final tool commands ready for execution in your own environment.

<!-- > MindExec itself does **not** execute vulnerability scans on your infrastructure; it focuses on **orchestration, visualization, and script generation**. Execution of generated commands is intentionally left to your own controlled environment. -->

---

## Core Features

- **User Authentication**
  - Email/password authentication powered by Supabase.
  - Registration, login, logout, and session handling.

- **Dashboard**
  - Personalized view with user metadata (name/initials).
  - Quick access to:
    - **Latest Runs** (conceptual view).
    - **Recent Workflows** 

- **Visual Workflow Editor (Mind Map)**
  - Built on top of `reactflow` / `react-flow-renderer`.
  - Three-pane layout:
    - **Left frame**: node library / tools.
    - **Center**: mind map canvas.
    - **Right frame**: node/tool configuration.
  - Toggleable left/right panels for focused editing.

- **Command / Script Generation**
  - Each `mindExecNode` holds a `tool.command` definition.
  - The engine:
    - Starts from an initial command (`initialComand`).
    - Iterates through configured options and flags.
    - Memoizes identical configurations for efficiency.
    - Appends an output path (`out/<node-id>/output.txt`).
  - Result: a **fully composed command string** stored on each node to be executed.

- **Responsive, Production-Ready UI**
  - Tailwind CSS with a custom theme and typography scale.
  - Dark UI tailored for security tooling.
  - Animations and micro-interactions with Framer Motion and icon systems.

- **Routing & Navigation**
  - Client-side routing via `react-router-dom`.
  - Protected routes for:
    - `/dashboard`
    - `/editor`
  - Public routes:
    - `/` (Home)
    - `/login`
    - `/register`

---

## Architecture & Tech Stack

- **Frontend**
  - `React 18`
  - `Vite`
  - `reactflow` / `react-flow-renderer`
  - `React Router DOM`
  - `Tailwind CSS` 
  - `Framer Motion`
  - `lucide-react`
  - `react-hook-form`
  - `react-hot-toast`

- **Backend as a Service**
  - `@supabase/supabase-js`

---

## Environment Configuration

MindExec relies on Supabase for auth. Configure the following environment variables in a `.env` file at the project root:

```bash
VITE_SUPABASE_URL=<your-supabase-project-url>
VITE_SUPABASE_KEY=<your-supabase-anon-or-service-key>
```

**Notes**

- For local development, `.env` is sufficient; Vite exposes any variable prefixed with `VITE_` to the client.
- For production deployments (Vercel, Netlify, etc.), define the **same variable names** in your platform’s environment settings.
- Never commit real secrets to version control. The public `anon` key is typically used in frontend apps, but you should still treat it carefully and enforce proper security rules in Supabase.

---

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended; e.g. `>= 18.x`)
- **pnpm** or **npm** (the project includes a `packageManager` entry for `pnpm`, but you can also use npm)

### 1. Clone the repository

```bash
git clone <YOUR_REPO_URL>
cd MindExec
```

### 2. Install dependencies

Using `pnpm` (recommended):

```bash
pnpm install
```

Or using `npm`:

```bash
npm install
```

### 3. Configure environment

Create `.env` at the root and add:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_KEY=...
```

### 4. Run the development server

```bash
pnpm dev
# or
npm run dev
```

The app will be available at something like `http://localhost:5173/` (Vite’s default).

---

## Available Scripts

Defined in `package.json`:

- **`pnpm dev` / `npm run dev`**
  - Starts the Vite development server with hot module replacement.

- **`pnpm build` / `npm run build`**
  - Creates an optimized production build in the `dist` directory.

- **`pnpm preview` / `npm run preview`**
  - Serves the production build locally for testing.

- **`pnpm lint` / `npm run lint`**
  - Runs ESLint on `.js` and `.jsx` files.

- **`pnpm deploy` / `npm run deploy`**
  - Builds and deploys the project to GitHub Pages using `gh-pages`, serving from `dist`.

---

## Project Structure

High-level structure (simplified):

```text
MindExec/
  ├─ public/               # Static assets (favicons, hero images, etc.)
  ├─ src/
  │  ├─ App.jsx            # Root app & routing definition
  │  ├─ main.jsx           # ReactDOM entry (Vite)
  │  ├─ client.js          # Supabase client configuration
  │  ├─ AppContext.jsx     # Global React context
  │  ├─ AppProvider.jsx    # Context provider + React Flow state & command generator
  │  ├─ components/
  │  │  ├─ Home/           # Landing page sections (hero, features, FAQ, etc.)
  │  │  ├─ layout/         # Editor layout (Nav, LeftFrame, MindMap, RightFrame)
  │  │  ├─ icons/          # SVG/icon components
  │  │  └─ ui/             # Reusable UI components (nodes, buttons, inputs)
  │  ├─ pages/
  │  │  ├─ Home.jsx        # Public landing page
  │  │  ├─ Login.jsx       # Auth: login
  │  │  ├─ Register.jsx    # Auth: signup
  │  │  ├─ Dashboard.jsx   # Authenticated dashboard
  │  │  ├─ Editor.jsx      # Workflow editor (mind map)
  │  │  ├─ ProtectedRoute.jsx
  │  │  └─ ProtectedSignRoute.jsx
  │  ├─ hooks/
  │  │  └─ useActiveUser.jsx  # Current user logic via Supabase
  │  ├─ lib/
  │  │  └─ utils.js        # Utility helpers
  │  └─ index.css          # Global styles + Tailwind layers
  ├─ tailwind.config.js    # Tailwind configuration & custom plugin
  ├─ vite.config.js        # Vite + React + path aliases
  ├─ vercel.json           # SPA rewrites for Vercel
  └─ package.json
```

---

## Security Notes

- **Execution Boundary**
  - MindExec is intended to **generate and orchestrate commands**, not to execute arbitrary commands on shared infrastructure.
  - Always execute generated commands in **isolated, authorized environments** under your control.

- **Supabase Rules**
  - Restrict access via **RLS (Row-Level Security)** policies in Supabase.
  - Ensure only authenticated users can access their own data.

---

## Contributing

Contributions are welcome. For teams using this in production:

- **Open an issue** or internal ticket describing the enhancement or bug.
- **Create a feature branch** from `main`.
- Add tests or basic coverage where reasonable.
- Run `pnpm lint` (or `npm run lint`) and fix any reported issues.
- Open a pull request and request review.


