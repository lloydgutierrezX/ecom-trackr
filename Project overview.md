🧱 Project Blueprint: E-Commerce Admin Panel (Angular + Node + Prisma)

🖼️ Core Features (must-have)
	1.	Authentication
	•	Login/logout (JWT)
	•	Role-based access: Admin vs. Staff
	•	Angular guards + interceptors
	2.	Product Management
	•	Add/edit/delete products
	•	Categories, tags, stock quantity, price
	•	Upload product images (with preview)
	•	Search/filter/sort products
	3.	Order Management
	•	View orders list with status (Pending, Shipped, Completed)
	•	View order details
	•	Update order status
	•	Optional: Export to CSV/PDF
	4.	Inventory Reports
	•	Dashboard with stock levels, low-stock alerts
	•	Basic chart (e.g., product category distribution or sales over time)
	5.	User Management
	•	CRUD for admin/staff users
	•	Role assignment
	•	Password reset

⸻

🛠️ Tech Stack

Frontend (Angular):
	•	Angular 17+ (modular routing)
	•	Angular Material or Tailwind UI
	•	Reactive Forms
	•	HttpClient with interceptors
	•	Route guards
	•	State (signal-based store or BehaviorSubject service layer)

Backend (Node.js):
	•	Express
	•	PostgreSQL (hosted or local)
	•	Prisma ORM
	•	JWT auth (login + token validation)
	•	REST API (or GraphQL if you want to flex)

Optional Tools:
	•	File uploads: Cloudinary, S3, or local (via Multer)
	•	Charts: ngx-charts or Chart.js
	•	Deployment: Firebase for frontend, Railway/Render for backend

⸻

🚀 Extras (to impress):
	•	Dark mode toggle
	•	Admin audit logs
	•	Responsive layout (mobile-friendly)
	•	Use Angular standalone components (modern feature)
	•	GitHub Actions for CI/CD (even if simple)