# SkillSync Nexus 🚀

<div align="center">

[![Live Web App](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://skillsync-nexus.vercel.app)
[![Video Walkthrough](https://img.shields.io/badge/Video_Demo-Watch_2m_HD-E11D48?style=for-the-badge&logo=quicktime)](https://skillsync-nexus.vercel.app/demo-video.mp4)
[![Live Backend API](https://img.shields.io/badge/Backend_API-Render-46E3B7?style=for-the-badge&logo=render)](https://skillsync-nexus-api.onrender.com/api/health)
[![Database](https://img.shields.io/badge/Database-Supabase_PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Smart India Hackathon](https://img.shields.io/badge/SIH_2026-Problem_Statement_26044-orange?style=for-the-badge)](https://sih.gov.in)

**A Unified Closed-Loop AI Platform for Academia-Industry Collaboration, Skill Mapping, and Placement Automation**

[🌐 Launch Live Web App](https://skillsync-nexus.vercel.app) • [🎬 Watch Full Prototype Video Demo](https://skillsync-nexus.vercel.app/demo-video.mp4) • [⚙️ Live API Health Check](https://skillsync-nexus-api.onrender.com/api/health)

</div>

---

## 📌 Problem Statement & The "Why"
* **Problem Statement ID:** 26044
* **Theme:** Smart Automation | **Category:** Software
* **Team:** Nirmaan

> **The Core Problem:** Every year, over 1.5 million engineers graduate in India, yet according to national employability reports (NASSCOM, Wheebox), **over 80% struggle to find industry-ready roles**. 
> - **Students** stuff resumes with unverified buzzwords, with zero proof of competency.
> - **Colleges** teach static curricula without real-time market feedback.
> - **Recruiters** waste thousands of hours filtering spam resumes instead of authentic talent.

**SkillSync Nexus solves this by moving from unverified resume claims to verified digital competency benchmarks.**

---

## 🏛️ The 4-Pillar Unified Ecosystem

| Portal | Target User | Key Capabilities |
|---|---|---|
| **🎓 Portal 1: Student Growth & Verification Hub** | Undergraduates | • **AI Resume NLP Extractor:** Parses PDF resumes & maps technical competencies.<br>• **Live 12-Axis Skill Radar:** Real-time visual comparison against role benchmarks.<br>• **Adaptive Diagnostic Engine:** Instant skill score upgrades & tamper-proof cryptographic trust hash (`0x9a8f...e31c-VERIFIED`).<br>• **1-Click Auto-Shortlisted Applications.** |
| **💼 Portal 2: Industry & Recruiter Portal** | Talent Acquisition | • **Zero-Keyword Matching:** Candidates ranked purely by verified skill scores.<br>• **Explainable AI (XAI) Rationale:** Transparent mathematical breakdown of candidate strengths and skill deficits.<br>• **Instant Calendar & Interview Dispatches.** |
| **📚 Portal 3: Academician & Faculty Portal** | Professors & Researchers | • **Capstone Project Co-Signing:** Reviews and grades student lab projects (e.g. MegaBlog, Ultrasonic Smart Glasses), permanently ending counterfeit certificates.<br>• **Corporate RFP Bidding:** Direct access to industry-funded research grants & enterprise datasets. |
| **🏛️ Portal 4: Institution & Dean Dashboard** | TPO / Leadership | • **Placement Readiness Index (PRI):** Macro analytics across departments.<br>• **Live Curriculum Skill Gap Heatmap:** Identifies industry demand vs. college curriculum gaps (e.g., Docker 84% demand vs. 22% taught) to update syllabi on time. |

---

## 🛠️ Technology Stack & Architecture

```
┌────────────────────────────────────────────────────────┐
│               SKILLSYNC NEXUS ARCHITECTURE             │
└────────────────────────────────────────────────────────┘
       │                                     │
       ▼                                     ▼
[ Client (Vercel) ]                 [ Server (Render) ]
• React 18 SPA (Vite)               • Node.js & Express REST API
• Tailwind CSS & Lucide Icons       • Explainable AI (XAI) Engine
• SVG Skill Radar Visualizers       • CORS & Input Payload Sanitizers
• Client-Side NLP PDF Parsing       • Circuit Breaker Fault Tolerance
       │                                     │
       └──────────────────┬──────────────────┘
                          ▼
             [ Cloud Database (Supabase) ]
             • PostgreSQL Relational Engine
             • Row-Level Security (RLS) Policies
             • Semi-Structured JSONB Skill Ledgers
             • Automated Local Cache Fallback
```

* **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
* **Backend:** Node.js, Express.js RESTful API, Non-blocking asynchronous I/O.
* **Database:** Supabase Cloud PostgreSQL (with Row-Level Security) + Resilient Local Circuit Breaker fallback (`db.json`).
* **AI & NLP:** In-browser and server NLP entity extraction, Deterministic Feature Attribution (SHAP/LIME principles) for Explainable AI.

---

## 🚀 Live Deployments

* **Frontend Web App (Vercel):** [https://skillsync-nexus.vercel.app](https://skillsync-nexus.vercel.app)
* **Backend REST API (Render):** [https://skillsync-nexus-api.onrender.com](https://skillsync-nexus-api.onrender.com)
* **Database (Supabase):** Cloud PostgreSQL Instance (Active)

---

## 💻 Running Locally

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/bhavya29102006/prototypeSIH.git
cd prototypeSIH
npm run install:all
```

### 2. Environment Configuration
Create a `.env` file inside the `server/` directory:
```env
PORT=5000
SUPABASE_URL=https://sxdtrhzqtugzfnnoyqrg.supabase.co
SUPABASE_KEY=your_supabase_publishable_or_anon_key
NODE_ENV=development
```

### 3. Launch Development Servers
```bash
npm run dev
```
* **Frontend Web App:** `http://localhost:3000`
* **Backend Express API:** `http://localhost:5000`
* **API Health Check:** `http://localhost:5000/api/health`

---

## 📜 National Policy & Research Alignment

* **National Education Policy (NEP 2020 - Clause 18 & 20):** Direct integration with experiential learning mandates and Academic Bank of Credits (ABC).
* **AICTE National Internship Policy:** Enforces mandatory verified practical project hours, eliminating counterfeit certificate mills.
* **IEEE Explainable AI Standards:** Transparent, non-discriminatory algorithmic talent scoring.
* **DPDP Act (India 2023):** Privacy-first architecture with candidate data anonymization during discovery phases.

---

## 📄 Production Blueprint

For enterprise deployment guidelines (including `bcrypt` salt-hashing, PgBouncer connection pooling, Redis caching, and containerization), view our [Complete Production Roadmap (PDF)](./SkillSync_Nexus_Production_Roadmap.pdf).

---

<div align="center">
Built with ❤️ for <strong>Smart India Hackathon 2026</strong> by <strong>Team Nirmaan</strong>
</div>
