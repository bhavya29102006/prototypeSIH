# SkillSync Nexus

> Problem statement: Engineering colleges teach syllabus X, while tech companies hire for skills Y. Students waste months learning outdated tech, colleges don't know where the syllabus is lacking, and recruiters end up filtering thousands of generic resumes with zero verified proof.

SkillSync Nexus is an industry-academia bridge built for our internal Smart India Hackathon round. It connects 4 core user roles into a single workflow:
1. **Students**: Take quick diagnostic quizzes, view their skill gap radar chart against real industry benchmarks (SDE-1, Cloud, DevOps), and maintain an instructor/company-verified project portfolio.
2. **Recruiters & Industry**: Post job benchmarks with minimum required skill thresholds. The platform auto-ranks applicants by verified skills instead of keyword matching on PDFs.
3. **Faculty / Academics**: Pick up industry capstone projects and submit research proposals (RFPs) directly to partner companies.
4. **Colleges / TPO**: Macro analytics dashboard showing placement readiness index, departmental skill deficits, and curriculum gap audit reports.

---

## Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, Lucide Icons, Canvas Confetti
- **Backend**: Node.js, Express, REST APIs
- **Database**: Supabase PostgreSQL (Cloud) with a local JSON fallback (`db.json`) so the demo works even if the venue Wi-Fi drops.

---

## Running Locally

### 1. Install dependencies
```bash
# from the root folder:
npm run install:all
```
*(or just `npm install` inside `client/` and `server/` separately)*

### 2. Environment Setup
Create a `.env` file inside `server/` (or copy `.env.example`):
```env
PORT=5000
SUPABASE_URL=https://sxdtrhzqtugzfnnoyqrg.supabase.co
SUPABASE_KEY=your_supabase_publishable_or_anon_key
```

### 3. Run the project
```bash
npm run dev
```
This runs both the client and server concurrently:
- Web App: `http://localhost:3000`
- API Server: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

---

## Hackathon Status & Roadmap

- [x] Multi-role portal switching (Student, Recruiter, Faculty, College)
- [x] Custom SVG Skill Radar Chart (visualizes student level vs job benchmark)
- [x] Interactive skill diagnostic quiz with dynamic skill level upgrades
- [x] Candidate auto-ranking engine based on verified skill competency
- [x] Express REST backend with Supabase PostgreSQL connection
- [x] Offline-safe fallback cache for stage presentations
- [ ] Bulk student roster CSV import for college TPO
- [ ] PDF export for verified skill transcript
