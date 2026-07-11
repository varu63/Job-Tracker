# 🚀 Job Tracker – Smart Job Application Management Platform

Job Tracker is a modern full-stack web application designed to help job seekers organize, manage, and monitor their job applications throughout the hiring process. Instead of tracking applications in spreadsheets or notes, users can manage everything from a single dashboard with real-time insights and visual analytics.

The platform allows users to securely authenticate, create and manage job applications, update their application status, and monitor their overall job search progress. Each application stores important details such as the company name, job role, application date, job location, salary, application link, and personal notes.

An interactive dashboard provides a comprehensive overview of the user's job search by displaying statistics and charts that summarize application progress. Users can quickly identify how many jobs they have saved, applied for, interviewed with, received offers from, accepted, or been rejected from. Search, filtering, and sorting features make it easy to manage a growing list of applications efficiently.

## ✨ Features

* 🔐 Secure authentication using Better Auth.js
* ➕ Create, edit, and delete job applications
* 📋 Track every application from Saved to Accepted
* 📊 Interactive dashboard with charts and analytics
* 🔍 Search applications by company or job role
* 🎯 Filter applications by status
* 📅 Store application dates and interview schedules
* 📝 Add notes for each application
* 📱 Fully responsive design for desktop, tablet, and mobile
* 🎨 Modern UI built with Tailwind CSS and shadcn/ui

## 📊 Application Workflow

```text
Saved
   │
   ▼
Applied
   │
   ▼
Interview
   │
   ├──────────────┐
   ▼              ▼
Offer         Rejected
   │
   ▼
Accepted
```

## 📈 Dashboard

The dashboard provides real-time insights into the user's job search, including:

* Total Applications
* Saved Jobs
* Applied Jobs
* Interviews Scheduled
* Offers Received
* Accepted Offers
* Rejected Applications
* Monthly Application Trends
* Application Status Distribution
* Recent Activity

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

### Backend

* Next.js API Routes
* Prisma ORM
* Better Auth.js

### Database

* Neon PostgreSQL

### Authentication

* Better Auth.js

### Deployment

* Vercel
* Neon PostgreSQL

## 🎯 Project Goal

The primary goal of Job Tracker is to simplify the job application process by providing a centralized platform where users can organize applications, monitor hiring progress, visualize their job search through analytics, and stay focused throughout their career journey.
template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
