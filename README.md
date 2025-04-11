cat << 'EOF' > README.md

# 📝 Todo App

A full-stack **Todo App** built with:

- ⚡ **Next.js** (App Router)
- 🛡 **TypeScript**
- 🔐 **NextAuth.js** for authentication
- 🐘 **PostgreSQL** database (via Docker)
- 🔧 **Prisma** ORM

---

## 🚀 Features

- 🔐 User registration & login (NextAuth.js)
- ➕ Add todos
- ❌ Delete todos
- ✅ Mark todos as complete

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Auth:** NextAuth.js
- **Database:** PostgreSQL (Docker container)
- **ORM:** Prisma

---

## 🧪 Getting Started

### 🐳 Prerequisites

- Docker installed
- Node.js & npm

### ⚙️ Installation

\`\`\`bash

# Clone the repo

git clone https://github.com/stefanpython/todo-postgresql.git
cd todo-app

# Install dependencies

npm install

# Create environment variables

cp .env.example .env

# Run PostgreSQL via Docker

docker-compose up -d

# Push Prisma schema to DB

npx prisma db push

# Start development server

npm run dev
\`\`\`

---

## 🔑 Environment Variables

Update your \`.env\` file with the following:

\`\`\`env
DATABASE_URL="postgresql://postgres:password@localhost:5432/todos"
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
\`\`\`

---

## 🗃 Database Schema

Define your schema in \`prisma/schema.prisma\`. Includes \`User\` and \`Todo\` models.

---

## 🔐 Authentication

Uses **NextAuth.js** with **Credentials Provider** or OAuth (e.g., GitHub) — your choice.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---
