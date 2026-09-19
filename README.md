# SkillSync Nexus

> A platform bridging the gap between student skills, college curriculum, and industry hiring.

- **Live Web App:** [https://skillsync-nexus.vercel.app](https://skillsync-nexus.vercel.app)
- **Demo Video (2 min):** [Watch Demo Video](https://skillsync-nexus.vercel.app/demo-video.mp4)
- **Backend API:** [https://skillsync-nexus-api.onrender.com](https://skillsync-nexus-api.onrender.com)
- **Problem Statement:** SIH 2026 | PS ID: 26044 | Smart Automation

---

## What is SkillSync Nexus?

Every year, thousands of students graduate without industry-ready skills, while recruiters struggle to find candidates who actually know what's written on their resumes. Colleges often have no real-time feedback loop to know which technologies the industry currently demands.

**SkillSync Nexus** brings students, recruiters, faculty, and college administrators together on one platform:

1. **Students** don't just list skills; they get their skills verified through diagnostic quizzes and faculty-approved projects, and see where they stand using an interactive skill radar.
2. **Recruiters** search candidates based on verified skills (not keyword-stuffed resumes) and get a clear explanation for why a student was matched.
3. **Faculty & Colleges** get real-time analytics on what skills are in demand so they can update course modules and stop students from submitting fake project certificates.

---

## Key Features

### 1. Student Portal
* **Resume Parser:** Upload a PDF resume to automatically extract tech stack, frameworks, and project details.
* **Skill Radar Chart:** A visual 12-axis radar comparing the student's current proficiency against target job roles (like Full Stack, DevOps, AI Engineer).
* **Diagnostic Quizzes:** Short adaptive assessments that let students test their knowledge and upgrade their readiness score.
* **Faculty-Verified Projects:** Projects verified directly by college professors with a digital signature to eliminate counterfeit certificates.

### 2. Recruiter / Industry Portal
* **Skill-First Talent Matching:** Filter candidates by actual verified competencies instead of scanning keywords.
* **Explainable Match Score:** Shows a transparent breakdown of why a candidate is ranked high (strong points, minor gaps, and practical project weightage).
* **Quick Actions:** Shortlist candidates or trigger interview invites with one click.

### 3. Faculty & Academic Portal
* **Capstone Project Review:** Professors can evaluate, grade, and digitally co-sign student projects.
* **Corporate RFPs:** Direct access to industry problem statements and student research collaboration grants.

### 4. Institution / Dean Dashboard
* **Placement Readiness Index (PRI):** High-level view of how job-ready each branch/department is.
* **Curriculum Skill Gap Heatmap:** Shows which skills the market is hiring for vs. what the college syllabus is currently teaching.

---

## Tech Stack

* **Frontend:** React 18, Vite, Tailwind CSS, Lucide React
* **Backend:** Node.js, Express.js
* **Database:** Supabase (PostgreSQL) with local fallback support
* **Deployment:** Vercel (Frontend), Render (Backend API)

---

## Project Structure

```text
prototypeSIH/
├── client/              # React frontend (Vite + Tailwind)
│   ├── public/          # Static assets & demo video
│   └── src/
│       ├── components/  # Portals: student, industry, faculty, institution
│       ├── context/     # App state and mock data
│       └── services/    # API calls to backend
├── server/              # Express backend API
│   ├── src/
│   │   ├── db/          # Supabase client setup
│   │   └── routes/      # Student, recruiter, and quiz endpoints
│   └── test-api.js      # Endpoint health tests
└── package.json         # Root scripts to run both client and server
```

---

## Getting Started (Local Setup)

### Prerequisites
* Node.js (v18 or higher recommended)
* npm

### Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/bhavya29102006/prototypeSIH.git
   cd prototypeSIH
   ```

2. **Install all dependencies (root, client, and server):**
   ```bash
   npm run install:all
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `server` folder:
   ```env
   PORT=5000
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   NODE_ENV=development
   ```
   *(Note: If Supabase credentials are not supplied, the backend runs gracefully with local fallback data).*

4. **Start the development servers:**
   ```bash
   npm run dev
   ```
   * Frontend will run at: `http://localhost:3000` (or `http://localhost:5173`)
   * Backend API will run at: `http://localhost:5000`
   * Health check endpoint: `http://localhost:5000/api/health`

---

## Team

* **Team Name:** Nirmaan
* **Event:** Smart India Hackathon (SIH) 2026
* **Problem Statement ID:** 26044
