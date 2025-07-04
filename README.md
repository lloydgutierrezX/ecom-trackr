# ecom-trackr 🛒

A full-stack inventory and transaction tracking system — starting with a robust backend and soon expanding into a full Angular-based e-commerce dashboard.

# 🧰 Tech Stack

### ✅ Backend (Live)

- Node.js + Express
- TypeScript
- Prisma ORM + PostgreSQL
- Zod (Validation)
- JWT (Authentication)
- dotenv (Config)
- CORS (API middleware)

### 🔜 Frontend (Planned)

- Angular
- Angular Forms / Reactive Forms
- TailwindCSS (UI styling)
- REST API integration

## 📦 Installation & Setup

⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

### 1. Clone the Repository

<pre>
  git clone https://github.com/your-username/ecom-trackr.git
  cd ecom-trackr
</pre>

⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

### 2. Setup Environment Variables

Create a .env file inside server/

<pre>
  DATABASE_URL=postgresql://your_user:your_password@localhost:5432/ecomtrackr
  JWT_SECRET=your_super_secure_secret
</pre>

⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

### 3. Install & Run Backend

<pre>
  cd server
  npm install
  npx prisma generate
  npx prisma migrate dev --name init
  npm run dev
</pre>

⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

🗂️ Project Structure

<pre>
  ecom-trackr/
  ├── client/                   # Angular Frontend
  ├── server/                   # Backend Node/Express API
  │   ├── src/
  │   │   ├── controllers/      # Route controller logic
  │   │   ├── routes/           # Express route handlers
  │   │   ├── validations/      # Zod schemas
  │   │   ├── middleware/       # Auth, logging, error handlers
  │   │   └── utils/            # Custom utility modules
  │   ├── prisma/
  │   │   └── schema.prisma     # Prisma DB schema
  │   ├── .env
  │   ├── index.ts              # Express entry point
  │   └── package.json
</pre>

⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

🔐 Authentication
WT-based system user login and registration.

- POST /api/auth/register: Register admin user
- POST /api/auth/login: Login & receive token

⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

🧾 Modules Overview

<pre>
  📦 Modules (Backend)

    ├── 🔐 Auth (JWT-based)
    │   ├── POST /api/auth/login
    │   └── POST /api/auth/register

    ├── 👤 Users
    │   └── CRUD for internal users (system access)

    ├── 👥 Clients
    │   └── CRUD for customers/buyers

    ├── 📦 Categories
    │   └── CRUD for item groupings

    ├── 📦 Items
    │   ├── Linked to categories
    │   └── Has name, weight

    ├── 💰 Transactions
    │   ├── Each transaction is tied to one client and one item
    │   ├── Stores price, weight, computed total
    │   └── Has status: PENDING | COMPLETED | CANCELLED

    ├── 🧾 Payments
    │   ├── Linked to a transaction
    │   ├── Tracks payments (date, amount, balance)
    │   └── Supports multiple payment modes (GCASH, BPI, etc.)
</pre>

⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

📊 Database Schema (Prisma)

Key relationships:
• One Client → Many Transactions
• One Item → Many Transactions
• One Transaction → Many Payments

Includes enums for PaymentType, PaymentMode, Status (PENDING, COMPLETED, CANCELLED)

⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

📈 Roadmap

✅ Phase 1 – Backend API
• Prisma models and DB schema
• RESTful API for all modules
• Auth (JWT-based)
• Zod validation
• Custom logger
• Soft-delete support

🔜 Phase 2 – Angular Admin Panel
• Angular 17+ setup
• Form validation (Reactive Forms)
• Table views with filters/sorting
• Secure API connection

🔜 Phase 3 – Summary & Reporting
• Export to PDF/Excel
• Income & transaction analytics

🔜 Phase 4 – Optional E-Commerce Storefront
• Product browsing UI
• Checkout + Client interaction

⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻

🤖 API Testing

Use a REST client like Thunder Client (VSCode), Postman, or .rest files to test:

<pre>
  POST http://localhost:5000/api/auth/login
  Content-Type: application/json

  {
    "email": "admin@email.com",
    "password": "YourPassword123"
  }
</pre>
