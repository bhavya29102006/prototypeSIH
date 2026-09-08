-- ============================================================
-- SkillSync Nexus — Complete Supabase PostgreSQL Schema & Seed
-- Run this in Supabase -> SQL Editor -> Click 'Run'
-- ============================================================

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar TEXT,
  college TEXT,
  department TEXT,
  batch_year TEXT,
  cgpa NUMERIC(3, 1),
  portfolio_hash TEXT,
  last_assessment_date DATE,
  readiness_score INT DEFAULT 50,
  skills JSONB NOT NULL DEFAULT '{}'::jsonb,
  verified_projects JSONB DEFAULT '[]'::jsonb,
  credentials JSONB DEFAULT '[]'::jsonb,
  applied_jobs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  logo TEXT,
  title TEXT NOT NULL,
  location TEXT,
  type TEXT,
  stipend TEXT,
  deadline TEXT,
  applicants_count INT DEFAULT 0,
  description TEXT,
  required_skills JSONB NOT NULL DEFAULT '{}'::jsonb,
  preferred_skills JSONB DEFAULT '[]'::jsonb,
  verified_match_threshold INT DEFAULT 70,
  status TEXT DEFAULT 'Actively Hiring',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS collaborations (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  domain TEXT,
  sponsor_amount TEXT,
  duration TEXT,
  description TEXT,
  deliverables JSONB DEFAULT '[]'::jsonb,
  faculty_applicants INT DEFAULT 0,
  status TEXT DEFAULT 'Accepting Proposals',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS training_programs (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  target_gap TEXT,
  duration TEXT,
  students_enrolled INT DEFAULT 0,
  completion_rate TEXT DEFAULT '0%',
  incentive TEXT,
  tag TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS institution_metrics (
  id TEXT PRIMARY KEY,
  college_name TEXT NOT NULL,
  total_students INT,
  batch TEXT,
  placement_readiness_index INT,
  placed_count INT,
  placed_percentage INT,
  ready_for_placement_count INT,
  ready_percentage INT,
  needs_bridging_count INT,
  needs_bridging_percentage INT,
  high_risk_count INT,
  high_risk_percentage INT,
  department_breakdown JSONB DEFAULT '[]'::jsonb,
  curriculum_skill_gaps JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. Seed Initial Realistic Records
-- ============================================================

INSERT INTO students (
  id, name, email, avatar, college, department, batch_year, cgpa,
  portfolio_hash, last_assessment_date, readiness_score, skills,
  verified_projects, credentials, applied_jobs
) VALUES (
  'std-2024-8821',
  'Aarav Sharma',
  'aarav.sharma@nexus.edu',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'Apex Institute of Technology',
  'Computer Science & Engineering',
  '2025 (Final Year)',
  8.7,
  '0x9a8f...e31c-VERIFIED',
  '2026-08-28',
  78,
  '{"JavaScript / TypeScript": 88, "React.js": 82, "Node.js / Express": 72, "REST & GraphQL APIs": 75, "SQL & Database Design": 65, "Docker & Containerization": 38, "Cloud Architecture (AWS/GCP)": 32, "CI/CD & DevOps": 25, "System Design & Scalability": 40, "Professional Communication": 80}'::jsonb,
  '[{"id": "proj-1", "title": "Distributed Microservices E-Commerce API", "grade": "Top 5% Submission", "badge": "Gold Code Quality", "techStack": ["Node.js", "Redis", "PostgreSQL", "Docker"], "verifiedBy": "CloudScale Technologies & Prof. Mehta"}, {"id": "proj-2", "title": "Real-time Collaborative Whiteboard", "grade": "Verified Independent Build", "badge": "Verified Architecture", "techStack": ["React", "WebSockets", "Node.js"], "verifiedBy": "Nexus Skill Assessment Engine"}]'::jsonb,
  '[{"id": "cred-1", "title": "Full Stack Web Architecture Specialist", "issuer": "SkillSync Verified Consortium", "issuedDate": "July 2026", "status": "Tamper-Proof On-Chain Stamped"}]'::jsonb,
  '[{"jobId": "job-1", "appliedAt": "2026-08-30", "status": "Interview Shortlisted"}]'::jsonb
) ON CONFLICT (id) DO NOTHING;

INSERT INTO jobs (
  id, company, logo, title, location, type, stipend, deadline,
  applicants_count, description, required_skills, preferred_skills, verified_match_threshold, status
) VALUES 
(
  'job-1',
  'CloudScale Technologies',
  '⚡',
  'Full-Stack Engineer Intern (Pre-Placement Offer)',
  'Bengaluru / Hybrid',
  'Internship -> Full-Time',
  '₹45,000 / month + ₹12 LPA PPO',
  'Sept 30, 2026',
  42,
  'We evaluate verified skill competencies, not generic resumes.',
  '{"JavaScript / TypeScript": 80, "React.js": 75, "Node.js / Express": 70, "REST & GraphQL APIs": 70, "Docker & Containerization": 50}'::jsonb,
  '["Redis", "PostgreSQL", "Git Workflow"]'::jsonb,
  75,
  'Actively Hiring'
),
(
  'job-2',
  'FinPulse Systems',
  '💳',
  'Junior Backend & API Developer',
  'Pune / Remote',
  'Full-Time',
  '₹9.2 - ₹11.5 LPA',
  'Oct 15, 2026',
  28,
  'Help build high-throughput payment reconciliation pipelines.',
  '{"Node.js / Express": 80, "SQL & Database Design": 75, "REST & GraphQL APIs": 80, "System Design & Scalability": 60}'::jsonb,
  '["Microservices", "Kafka", "Jest"]'::jsonb,
  70,
  'Actively Hiring'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO collaborations (
  id, company, title, type, domain, sponsor_amount, duration,
  description, deliverables, faculty_applicants, status
) VALUES (
  'rfp-1',
  'CloudScale Technologies',
  'Distributed Systems & Live Telemetry Classroom Project',
  'Classroom Co-Teaching / Live Project',
  'Cloud & Distributed Computing',
  '₹2,50,000 Grant + Cloud Credits',
  '1 Academic Semester (16 Weeks)',
  'Anonymized enterprise telemetry datasets for 4th-year laboratory capstone.',
  '["30-40 Students trained on real-world telemetry", "Faculty co-authored whitepaper", "Direct interview fast-track for top 5 teams"]'::jsonb,
  4,
  'Accepting Proposals'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO institution_metrics (
  id, college_name, total_students, batch, placement_readiness_index,
  placed_count, placed_percentage, ready_for_placement_count, ready_percentage,
  needs_bridging_count, needs_bridging_percentage, high_risk_count, high_risk_percentage,
  department_breakdown, curriculum_skill_gaps
) VALUES (
  'inst-apex',
  'Apex Institute of Technology',
  480,
  '2025 (Graduating Class)',
  64,
  168,
  35,
  144,
  30,
  120,
  25,
  48,
  10,
  '[{"department": "Computer Science (CSE)", "total": 180, "placed": 84, "ready": 58, "atRisk": 12, "avgSkillScore": 74}, {"department": "Information Tech (IT)", "total": 120, "placed": 48, "ready": 42, "atRisk": 10, "avgSkillScore": 71}]'::jsonb,
  '[{"skill": "Docker & Containerization", "industryDemandPercentage": 84, "collegeCurriculumTaughtPercentage": 22, "gapPercentage": 62, "urgency": "Critical Priority"}, {"skill": "Cloud & Microservices (AWS/GCP)", "industryDemandPercentage": 78, "collegeCurriculumTaughtPercentage": 28, "gapPercentage": 50, "urgency": "High Priority"}]'::jsonb
) ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- 3. Row Level Security (RLS) PostgreSQL Policies
-- ============================================================

-- Enable RLS on core application tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE institution_metrics ENABLE ROW LEVEL SECURITY;

-- 3.1 Public / Authenticated Read Access Policies
CREATE POLICY "Public students read access"
  ON students FOR SELECT
  USING (true);

CREATE POLICY "Public jobs read access"
  ON jobs FOR SELECT
  USING (true);

CREATE POLICY "Public collaborations read access"
  ON collaborations FOR SELECT
  USING (true);

CREATE POLICY "Public training programs read access"
  ON training_programs FOR SELECT
  USING (true);

CREATE POLICY "Public institution metrics read access"
  ON institution_metrics FOR SELECT
  USING (true);

-- 3.2 Student Profile & Application Update Policy
CREATE POLICY "Students can update own record"
  ON students FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- 3.3 Recruiter Job Creation & Management Policies
CREATE POLICY "Recruiters can insert jobs"
  ON jobs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Recruiters can update own jobs"
  ON jobs FOR UPDATE
  USING (true);

-- 3.4 Institution Metrics Update Policy
CREATE POLICY "Institutions can update metric data"
  ON institution_metrics FOR UPDATE
  USING (true);
