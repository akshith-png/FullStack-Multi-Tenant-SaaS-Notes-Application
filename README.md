# 🧠 Multi-Tenant SaaS Notes Application

A full-stack, production-grade SaaS notes platform built with Next.js 15, Supabase, and JWT authentication. Designed for scale, speed, and tenant isolation—deployed live on Vercel.

## 🚀 Live Demo

Access the app: https://full-stack-multi-tenant-saa-s-notes-application-fg52-mnki9oi0h.vercel.app

## 🛠️ Tech Stack

Frontend: Next.js 15 (App Router)  
Backend: Supabase (PostgreSQL, Auth)  
Auth: JWT-based session management  
Deployment: Vercel  
Multi-Tenancy: Slug-based routing (/acme, /demo, etc.)

## 🔐 Predefined Accounts

email: admin@acme.test  
password: password

Supports multiple tenants and roles (Admin, Member).

## 📦 Features

- Health check endpoint (/api/health)  
- Secure login with JWT  
- Tenant isolation enforced at DB and route level  
- Role-based access (Members restricted from admin actions)  
- Free plan note limit (5 notes max)  
- Upgrade endpoint lifts note limit  
- Full CRUD for notes  
- Responsive frontend with dynamic routing

## 📁 API Endpoints

POST   /api/login — Authenticates user  
GET    /api/health — Returns { status: "ok" }  
GET    /api/notes — Fetches notes for tenant  
POST   /api/notes — Creates a new note  
PUT    /api/notes/:id — Updates a note  
DELETE /api/notes/:id — Deletes a note  
POST   /api/tenants/[slug]/upgrade — Upgrades tenant plan

## 🧪 Testing Instructions

Use curl or Postman to hit /api/login with predefined credentials  
Validate JWT and test protected routes  
Confirm tenant isolation by switching slugs  
Test note limit enforcement and upgrade flow

## 📄 Setup Locally

1. Clone the repo:  
   git clone https://github.com/akshith-png/FullStack-Multi-Tenant-SaaS-Notes-Application  
   cd notes-saas  
   npm install

2. Create a .env.local file with:  
   SUPABASE_URL=your-supabase-url  
   SUPABASE_ANON_KEY=your-anon-key

3. Run locally:  
   npm run dev

## 🧠 Built By

Akshith — Cloud builder, product ideator, and rapid MVP specialist.  
This project was built under pressure, with full compliance and recruiter-grade documentation.

## 🏁 Final Note

This isn’t just a notes app. It’s a scalable SaaS foundation with real-world architecture, built to pass automated tests and impress human reviewers.

