
  # 🚛 TransitOps

  **Smart Fleet & Transportation Management Platform**

  <p align="center">
    <strong>Odoo Hackathon 2026</strong>
  </p>

  <br>

  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
  ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

  <br>
  <br>

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Folder Structure](#-folder-structure)
- [User Roles](#-user-roles)
- [Workflow](#-workflow)
- [Dashboard Preview](#-dashboard-preview)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Demo Credentials](#-demo-credentials)
- [Future Scope](#-future-scope)
- [Team](#-team)
- [License](#-license)

---

## 📖 Project Overview

### Problem Statement

Modern fleet and transportation operations suffer from fragmented tools, manual tracking, and lack of real-time visibility. Dispatchers use spreadsheets, drivers rely on phone calls, and managers get delayed reports. This leads to inefficiencies — increased fuel costs, unplanned downtime, missed deliveries, and compliance risks.

Operations teams need a **unified digital platform** that connects every stakeholder — from the operations lead planning trips to the driver on the road, from the finance team tracking costs to the destination control receiving shipments.

### How TransitOps Solves It

**TransitOps** is a comprehensive fleet and transportation management platform built to digitize and streamline every aspect of fleet operations:

- **Digital Fleet Management** — Track vehicles, drivers, trips, and maintenance in one place with real-time CRUD operations.
- **Role-Based Access Control** — Five distinct roles (Operation Lead, Road Captain, Safety Officer, Finance Hub, Destination Control) each get a tailored dashboard and permissions.
- **End-to-End Trip Lifecycle** — From trip creation and driver assignment to dispatch, completion, and delivery confirmation.
- **Financial Visibility** — Fuel logs, expense tracking, maintenance costs, and analytics dashboards for informed decision-making.
- **Analytics & Reporting** — Fleet utilization, driver performance, revenue analysis, and exportable reports (CSV/PDF).
- **Secure Authentication** — JWT-based auth with hashed passwords and session persistence.

Built for the **Odoo Hackathon 2026**, TransitOps demonstrates how modern web technologies can transform transportation operations into a seamless, data-driven experience.

---

## 🚀 Key Features

| Feature | Description |
|---------|-------------|
| **🔐 Secure Authentication** | JWT-based login/logout with bcrypt password hashing and persistent sessions via localStorage |
| **👥 Role-Based Access Control** | Five roles with distinct dashboards, sidebar navigation, and API-level authorization guards |
| **🚛 Fleet Management** | Full CRUD for vehicles — register, edit, view details, filter by status, search, and pagination |
| **👨‍✈️ Driver Management** | 4-step registration wizard, driver profiles, license tracking, safety scores, and status management |
| **📦 Trip Management** | Create, dispatch, complete, and cancel trips with vehicle/driver assignment and cargo tracking |
| **🔧 Maintenance Management** | Schedule and track vehicle maintenance with cost tracking, status updates, and service history |
| **⛽ Fuel Logs** | Record fuel purchases per vehicle with liters, cost, fuel station, and odometer readings |
| **💰 Expense Management** | Track operational expenses by type (Fuel, Maintenance, Toll, Parking, Insurance, Other) |
| **📍 Destination Control** | Manage receivers, incoming deliveries, proof of delivery, warehouse operations, and inventory |
| **📊 Reports & Analytics** | Fleet, driver, trip, finance, and maintenance reports with interactive charts and CSV/PDF export |
| **🔔 Notifications** | Real-time notification center with unread counter, mark-as-read, and category-based filtering |
| **📱 Responsive Dashboard** | Mobile-optimized interfaces including Driver Cockpit, Safety Command, Finance Command, and Arrival Hub |
| **🔍 Search, Filter & Pagination** | Every list page includes search, status/date filters, sort controls, and paginated results |
| **🔄 Real-Time CRUD** | All create, update, and delete operations reflect immediately with toast notifications and auto-refresh |

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 18** | UI component library |
| **Vite 8** | Build tool and dev server |
| **React Router 6** | Client-side routing with nested layouts and guards |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Page transitions and animations |
| **Axios** | HTTP client with JWT interceptor |
| **Recharts** | Interactive charts (bar, line, area, pie, donut) |
| **lucide-react** | Icon library |
| **react-hook-form** | Form state management and validation |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **Mongoose** | MongoDB ODM with schemas and validation |
| **Joi** | Request validation middleware |
| **bcryptjs** | Password hashing |
| **jsonwebtoken** | JWT generation and verification |
| **json2csv** | CSV report export |
| **pdfkit** | PDF report generation |
| **helmet** | Security headers |
| **morgan** | HTTP request logging |
| **cors** | Cross-origin resource sharing |

### Database

| Technology | Purpose |
|------------|---------|
| **MongoDB** | Document database with flexible schemas |
| **Mongoose** | Schema modeling, population, aggregation |

### Authentication

| Technology | Purpose |
|------------|---------|
| **JWT** | Stateless token-based authentication |
| **bcryptjs** | Salted password hashing (10 rounds) |
| **Role Middleware** | Express middleware for role-based route protection |

### Version Control

| Technology | Purpose |
|------------|---------|
| **Git** | Source code management |
| **GitHub** | Remote repository and collaboration |

### Deployment Ready

- Configured for deployment with environment variables
- CORS configured for production client URL
- Helmet security headers enabled
- Production build via `npm run build`

---

## 📁 Folder Structure

```
transitops/
├── backend/
│   ├── config/
│   │   ├── env.js              # Environment configuration
│   │   └── db.js               # MongoDB connection
│   ├── constants/
│   │   ├── messages.js         # API response messages
│   │   └── roles.js            # Role definitions (OPERATION_LEAD, etc.)
│   ├── controllers/
│   │   ├── auth/               # login, register, profile
│   │   ├── dashboard/          # aggregated dashboard data
│   │   ├── drivers/            # driver CRUD
│   │   ├── vehicles/           # vehicle CRUD + fuel
│   │   ├── trips/              # trip CRUD + dispatch/complete/cancel
│   │   ├── maintenance/        # maintenance CRUD
│   │   ├── finance/            # expense CRUD
│   │   ├── receiver/           # receiver CRUD
│   │   ├── reports/            # overview, fleet, trips, drivers, finance, maintenance
│   │   └── notifications/      # notification CRUD
│   ├── middleware/
│   │   ├── auth.middleware.js  # JWT verification
│   │   ├── role.middleware.js  # Role authorization
│   │   ├── error.middleware.js # Global error handler
│   │   └── validator.middleware.js # Joi validation
│   ├── models/                 # Mongoose schemas (User, Vehicle, Driver, Trip, etc.)
│   ├── routes/
│   │   ├── index.js            # Route aggregator (all mounted under /api)
│   │   ├── auth.routes.js
│   │   ├── vehicle.routes.js
│   │   ├── driver.routes.js
│   │   ├── trip.routes.js
│   │   ├── maintenance.routes.js
│   │   ├── fuel.routes.js
│   │   ├── expense.routes.js
│   │   ├── receiver.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── report.routes.js
│   │   └── notification.routes.js
│   ├── services/               # Business logic layer
│   ├── utils/
│   │   ├── generateToken.js    # JWT signing utility
│   │   └── responseHandler.js  # Standardized API responses
│   ├── validators/             # Joi validation schemas
│   ├── prisma/
│   │   └── seed.js             # Database seeding script
│   ├── app.js                  # Express app setup
│   └── server.js               # Entry point
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/           # ProtectedRoute, RoleGuard
│   │   │   ├── charts/         # BarChart, LineChart, AreaChart, etc.
│   │   │   ├── common/         # Button, Input, Modal, Toast, Card
│   │   │   ├── forms/          # LoginForm, ForgotPasswordForm
│   │   │   ├── layout/         # Sidebar, Topbar, roleConfigs
│   │   │   ├── landing/        # Landing page sections
│   │   │   ├── maps/           # MapWidget (placeholder)
│   │   │   └── notifications/  # NotificationComponents
│   │   ├── config/
│   │   │   └── index.js        # API base URL config
│   │   ├── constants/
│   │   │   └── api.js          # API endpoint constants
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Auth state management
│   │   ├── data/               # Mock data files (fallback only)
│   │   ├── layouts/            # AuthLayout, DashboardLayout, etc.
│   │   ├── pages/
│   │   │   ├── operation-lead/ # Fleet, Drivers, Trips, Maintenance, Fuel, Expenses, Reports
│   │   │   ├── road-captain/   # Driver Cockpit, My Trips, Navigation, Fuel Logs
│   │   │   ├── safety-officer/ # Safety Command, Compliance, Incidents, Inspections
│   │   │   ├── finance-hub/    # Finance Command, Revenue, ROI, Invoices
│   │   │   ├── destination-control/ # Arrival Hub, Warehouse, Inventory, Receivers
│   │   │   ├── reports/        # ReportsDashboard, FleetAnalytics, FuelAnalytics, etc.
│   │   │   └── notifications/  # AllNotifications, AlertDashboard, category alerts
│   │   ├── services/           # API service modules (axios-based)
│   │   ├── utils/              # Utility functions (cn, formatters)
│   │   ├── App.jsx             # Main router with role-based routes
│   │   └── main.jsx            # Entry point
│   ├── .env                    # VITE_API_BASE_URL
│   └── package.json
│
├── README.md
└── package.json
```

---

## 👥 User Roles

TransitOps defines five distinct roles, each with a tailored dashboard and permission set:

| Role | Default Dashboard | Key Permissions |
|------|-------------------|-----------------|
| **Operation Lead** | Mission Control | Full CRUD on all modules — vehicles, drivers, trips, maintenance, fuel, expenses, receivers, reports, notifications |
| **Road Captain** | Driver Cockpit | View assigned trips and vehicle, record fuel logs, complete trips, view navigation |
| **Safety Officer** | Safety Command | View drivers, compliance, licenses, incidents, inspections, training; read-only access to most data |
| **Finance Hub** | Finance Command | Create/update fuel logs and expenses, view financial reports, analytics, invoices, ROI |
| **Destination Control** | Arrival Hub | View incoming/completed deliveries, manage warehouse, inventory, receivers; confirm delivery of trips |

API-level role enforcement is handled by the `authorize()` middleware, which checks the user's JWT role against allowed roles for each endpoint.

---

## 🔄 Workflow

```
                    ┌─────────────────┐
                    │   Login / Auth   │
                    │  (JWT Token)     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Role-Based     │
                    │   Dashboard      │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
     ┌──────────────┐  ┌──────────┐  ┌──────────┐
     │   Vehicles   │  │  Drivers │  │   Trips  │
     │  (CRUD +     │  │ (CRUD +  │  │ (Create, │
     │   Status)    │  │ Licenses)│  │ Dispatch)│
     └──────┬───────┘  └────┬─────┘  └─────┬────┘
            │               │              │
            ▼               ▼              ▼
     ┌──────────────┐  ┌──────────┐  ┌──────────┐
     │ Maintenance  │  │   Fuel   │  │ Expenses │
     │  (Schedule,  │  │  (Logs,  │  │  (Track, │
     │   Track)     │  │  Cost)   │  │  Categorize)
     └──────┬───────┘  └──────────┘  └─────┬────┘
            │                              │
            ▼                              ▼
     ┌──────────────┐              ┌──────────────┐
     │  Destination │              │   Reports &  │
     │   Control    │              │   Analytics  │
     │  (Receivers, │              │  (CSV/PDF)   │
     │   Delivery)  │              └──────────────┘
     └──────────────┘
```

## 🔧 Installation

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** v6 or higher (local or Atlas)
- **npm** v9 or higher

### Clone the Repository

```bash
git clone https://github.com/Mohittt0706/Odoo-Transitops.git
cd Odoo-Transitops
```

### Backend Setup

```bash
cd backend
cp .env.example .env    # Configure your environment variables
npm install
npm run seed            # Seed demo users into the database
npm run dev             # Start development server on port 5000
```

### Frontend Setup

```bash
cd frontend
cp .env.example .env    # Configure API base URL
npm install
npm run dev             # Start development server on port 5173
```

### Environment Variables

**Backend (`backend/.env`)**

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | MongoDB connection string | `mongodb://localhost:27017/fleetpilot` |
| `JWT_SECRET` | Token signing secret | `fleetpilot_jwt_secret_key_2024` |
| `JWT_EXPIRES_IN` | Token expiration | `7d` |
| `CLIENT_URL` | Allowed CORS origin | `http://localhost:5173` |

**Frontend (`frontend/.env`)**

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |

### Production Build

```bash
# Frontend
cd frontend
npm run build           # Output in frontend/dist/

# Backend
cd backend
NODE_ENV=production npm start
```

---

## 🔑 Demo Credentials

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| **Operation Lead** | `admin@transitops.com` | `Admin@123` | Mission Control |
| **Road Captain** | `driver@transitops.com` | `Driver@123` | Driver Cockpit |
| **Safety Officer** | `safety@transitops.com` | `Safety@123` | Safety Command |
| **Finance Hub** | `finance@transitops.com` | `Finance@123` | Finance Command |
| **Destination Control** | `receiver@transitops.com` | `Receiver@123` | Arrival Hub |

> All passwords are hashed using bcryptjs (10 salt rounds) and stored securely in MongoDB.

---

## 🔮 Future Scope

| Feature | Description |
|---------|-------------|
| **🧠 AI Route Optimization** | Machine learning algorithms to suggest optimal routes based on traffic, weather, and historical data |
| **📍 GPS Tracking** | Real-time vehicle tracking with geofencing and ETA predictions |
| **🔗 IoT Integration** | Connect vehicle sensors for real-time telemetry (fuel level, tire pressure, engine diagnostics) |
| **🔧 Predictive Maintenance** | AI-driven analysis of vehicle data to predict failures before they occur |
| **📱 Mobile App** | Native mobile apps for drivers with offline support, push notifications, and barcode scanning |
| **☁️ Cloud Deployment** | Docker containerization and deployment to AWS/GCP/Azure with CI/CD pipelines |
| **📈 Advanced Analytics** | Custom report builder, data export to BI tools, automated scheduled reports via email |

---

## 👥 Team

<div align="center">

| Name | Role | GitHub |
|------|------|--------|
| **Team Member 1** | Full Stack Developer | [@Mohittt0706](https://github.com/Mohittt0706) |
| **Team Member 2** | Frontend Developer | [@Disha9917](https://github.com/Disha9917) |
| **Team Member 3** | Backend Developer | [@Bhagyashree-ce](https://github.com/Bhagyashree-ce) |
| **Team Member 4** | UI/UX Designer | [@innerkidd](https://github.com/innerkidd) |

</div>
---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

  <br>

  **Built with ❤️ for the Odoo Hackathon 2026**

  <br>

  *Empowering smarter fleet operations, one trip at a time.*

  <br>

</div>
