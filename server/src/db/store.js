import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEED_DATA } from './seedData.js';
import { supabaseDb, isSupabaseConfigured } from './supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class Store {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      console.log('📦 Initializing fresh local fallback database at:', DB_FILE);
      this.write(SEED_DATA);
    }
  }

  read() {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading db.json, returning default seed:', err);
      return JSON.parse(JSON.stringify(SEED_DATA));
    }
  }

  write(data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing to db.json:', err);
    }
  }

  // --- Student Methods ---
  async getStudent(id = 'std-2024-8821') {
    if (isSupabaseConfigured()) {
      const rows = await supabaseDb.select('students', `id=eq.${id}&limit=1`);
      if (rows && rows.length > 0) {
        const r = rows[0];
        return {
          ...r,
          batchYear: r.batch_year ?? r.batchYear ?? '2025 (Final Year)',
          batch_year: r.batch_year ?? r.batchYear ?? '2025 (Final Year)',
          portfolioHash: r.portfolio_hash ?? r.portfolioHash ?? '0x9a8f...e31c-VERIFIED',
          portfolio_hash: r.portfolio_hash ?? r.portfolioHash ?? '0x9a8f...e31c-VERIFIED',
          lastAssessmentDate: r.last_assessment_date ?? r.lastAssessmentDate ?? '2026-08-28',
          last_assessment_date: r.last_assessment_date ?? r.lastAssessmentDate ?? '2026-08-28',
          readinessScore: r.readiness_score ?? r.readinessScore ?? 78,
          readiness_score: r.readiness_score ?? r.readinessScore ?? 78,
          verifiedProjects: r.verified_projects ?? r.verifiedProjects ?? [],
          verified_projects: r.verified_projects ?? r.verifiedProjects ?? [],
          credentials: r.credentials ?? [],
          appliedJobs: r.applied_jobs ?? r.appliedJobs ?? [],
          applied_jobs: r.applied_jobs ?? r.appliedJobs ?? [],
          skills: r.skills || {}
        };
      }
    }
    const db = this.read();
    const s = db.students.find(s => s.id === id) || db.students[0];
    return {
      ...s,
      batchYear: s.batchYear ?? s.batch_year ?? '2025 (Final Year)',
      batch_year: s.batch_year ?? s.batchYear ?? '2025 (Final Year)',
      portfolioHash: s.portfolioHash ?? s.portfolio_hash ?? '0x9a8f...e31c-VERIFIED',
      portfolio_hash: s.portfolio_hash ?? s.portfolioHash ?? '0x9a8f...e31c-VERIFIED',
      lastAssessmentDate: s.lastAssessmentDate ?? s.last_assessment_date ?? '2026-08-28',
      last_assessment_date: s.last_assessment_date ?? s.lastAssessmentDate ?? '2026-08-28',
      readinessScore: s.readinessScore ?? s.readiness_score ?? 78,
      readiness_score: s.readiness_score ?? s.readinessScore ?? 78,
      verifiedProjects: s.verifiedProjects ?? s.verified_projects ?? [],
      verified_projects: s.verified_projects ?? s.verifiedProjects ?? [],
      credentials: s.credentials ?? [],
      appliedJobs: s.appliedJobs ?? s.applied_jobs ?? [],
      applied_jobs: s.applied_jobs ?? s.appliedJobs ?? [],
      skills: s.skills || {}
    };
  }

    async setStudentSkills(id, newSkills, profileUpdates = {}) {
    const student = await this.getStudent(id);
    if (!student) return null;

    const mergedSkills = { ...student.skills, ...newSkills };
    const values = Object.values(mergedSkills);
    const newReadiness = Math.round(values.reduce((a, b) => a + b, 0) / (values.length || 1));
    const today = new Date().toISOString().split('T')[0];

    const updates = {
      skills: mergedSkills,
      readiness_score: newReadiness,
      readinessScore: newReadiness,
      last_assessment_date: today,
      lastAssessmentDate: today,
      ...(profileUpdates.name ? { name: profileUpdates.name } : {}),
      ...(profileUpdates.college ? { college: profileUpdates.college } : {}),
      ...(profileUpdates.department ? { department: profileUpdates.department } : {}),
      ...(profileUpdates.cgpa ? { cgpa: profileUpdates.cgpa } : {})
    };

    if (isSupabaseConfigured()) {
      await supabaseDb.update('students', `id=eq.${id}`, {
        skills: mergedSkills,
        readiness_score: newReadiness,
        last_assessment_date: today,
        ...(profileUpdates.name ? { name: profileUpdates.name } : {}),
        ...(profileUpdates.college ? { college: profileUpdates.college } : {}),
        ...(profileUpdates.department ? { department: profileUpdates.department } : {}),
        ...(profileUpdates.cgpa ? { cgpa: profileUpdates.cgpa } : {})
      });
    }

    const db = this.read();
    const idx = db.students.findIndex(s => s.id === id);
    if (idx !== -1) {
      db.students[idx] = { ...db.students[idx], ...updates };
      const candIdx = db.candidates.findIndex(c => c.id === id);
      if (candIdx !== -1) {
        db.candidates[candIdx] = {
          ...db.candidates[candIdx],
          ...updates,
          skills: mergedSkills,
          readinessScore: newReadiness
        };
      }
      this.write(db);
    }

    return { ...student, ...updates };
  }

  async updateStudentSkills(id, skillBoosts) {
    const student = await this.getStudent(id);
    if (!student) return null;

    const updatedSkills = { ...student.skills };
    Object.entries(skillBoosts).forEach(([skill, boost]) => {
      const current = updatedSkills[skill] || 30;
      updatedSkills[skill] = Math.min(100, Math.round(current + boost));
    });

    const values = Object.values(updatedSkills);
    const newReadiness = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    const lastAssessmentDate = new Date().toISOString().split('T')[0];

    const updates = {
      skills: updatedSkills,
      readiness_score: newReadiness,
      readinessScore: newReadiness,
      last_assessment_date: lastAssessmentDate,
      lastAssessmentDate: lastAssessmentDate
    };

    // Update in Supabase if configured
    if (isSupabaseConfigured()) {
      await supabaseDb.update('students', `id=eq.${id}`, {
        skills: updatedSkills,
        readiness_score: newReadiness,
        last_assessment_date: lastAssessmentDate
      });
    }

    // Also update local cache
    const db = this.read();
    const idx = db.students.findIndex(s => s.id === id);
    if (idx !== -1) {
      db.students[idx] = { ...db.students[idx], ...updates };
      const candIdx = db.candidates.findIndex(c => c.id === id);
      if (candIdx !== -1) {
        db.candidates[candIdx].skills = updatedSkills;
      }
      this.write(db);
    }

    return { ...student, ...updates };
  }

  async applyJob(jobId, studentId = 'std-2024-8821', matchScore = 75) {
    const student = await this.getStudent(studentId);
    const jobs = await this.getJobs();
    const job = jobs.find(j => j.id === jobId);
    if (!student || !job) return { error: 'Student or Job not found' };

    const existing = (student.applied_jobs || student.appliedJobs || []).find(a => a.jobId === jobId);
    if (existing) {
      return { message: 'Already applied', application: existing };
    }

    const application = {
      jobId,
      appliedAt: new Date().toISOString().split('T')[0],
      status: matchScore >= (job.verified_match_threshold || job.verifiedMatchThreshold || 70) 
        ? 'Auto-Shortlisted (Verified)' 
        : 'Under Review'
    };

    const newApplied = [...(student.applied_jobs || student.appliedJobs || []), application];

    if (isSupabaseConfigured()) {
      await supabaseDb.update('students', `id=eq.${studentId}`, { applied_jobs: newApplied });
      await supabaseDb.update('jobs', `id=eq.${jobId}`, { applicants_count: (job.applicants_count || 0) + 1 });
    }

    const db = this.read();
    const sIdx = db.students.findIndex(s => s.id === studentId);
    if (sIdx !== -1) {
      db.students[sIdx].appliedJobs = newApplied;
      const jIdx = db.jobs.findIndex(j => j.id === jobId);
      if (jIdx !== -1) {
        db.jobs[jIdx].applicantsCount = (db.jobs[jIdx].applicantsCount || 0) + 1;
      }
      this.write(db);
    }

    return { message: 'Application submitted successfully', application };
  }

  // --- Job Methods ---
  async getJobs() {
    if (isSupabaseConfigured()) {
      const rows = await supabaseDb.select('jobs', 'order=created_at.desc');
      if (rows && rows.length > 0) {
        return rows.map(r => ({
          ...r,
          applicantsCount: r.applicants_count ?? r.applicantsCount,
          requiredSkills: r.required_skills ?? r.requiredSkills,
          preferredSkills: r.preferred_skills ?? r.preferredSkills,
          verifiedMatchThreshold: r.verified_match_threshold ?? r.verifiedMatchThreshold
        }));
      }
    }
    const db = this.read();
    return db.jobs;
  }

  async addJob(jobData) {
    const newJob = {
      ...jobData,
      id: `job-${Date.now()}`,
      applicantsCount: 0,
      status: 'Actively Hiring'
    };

    if (isSupabaseConfigured()) {
      await supabaseDb.insert('jobs', {
        id: newJob.id,
        company: newJob.company,
        logo: newJob.logo || '⚡',
        title: newJob.title,
        location: newJob.location,
        type: newJob.type,
        stipend: newJob.stipend,
        deadline: newJob.deadline,
        applicants_count: 0,
        description: newJob.description,
        required_skills: newJob.requiredSkills,
        preferred_skills: newJob.preferredSkills || [],
        verified_match_threshold: newJob.verifiedMatchThreshold || 70,
        status: 'Actively Hiring'
      });
    }

    const db = this.read();
    db.jobs.unshift(newJob);
    this.write(db);
    return newJob;
  }

  // --- Candidates Methods ---
  async getCandidates() {
    if (isSupabaseConfigured()) {
      const rows = await supabaseDb.select('students');
      if (rows && rows.length > 0) {
        return rows.map(r => ({
          id: r.id,
          name: r.name,
          college: r.college,
          department: r.department,
          batchYear: r.batch_year,
          cgpa: String(r.cgpa),
          avatar: r.avatar,
          skills: r.skills,
          verifiedProjectsCount: (r.verified_projects || []).length,
          credentialsCount: (r.credentials || []).length,
          readinessTier: r.readiness_score >= 80 ? 'Tier 1 - Industry Ready' : r.readiness_score >= 65 ? 'Tier 2 - Needs Upskilling' : 'Tier 3 - High Skill Gap'
        }));
      }
    }
    const db = this.read();
    return db.candidates;
  }

  // --- Faculty Collaborations Methods ---
  async getCollaborations() {
    if (isSupabaseConfigured()) {
      const rows = await supabaseDb.select('collaborations');
      if (rows && rows.length > 0) {
        return rows.map(r => ({
          ...r,
          sponsorAmount: r.sponsor_amount,
          facultyApplicants: r.faculty_applicants
        }));
      }
    }
    const db = this.read();
    return db.collaborations;
  }

  async applyCollaboration(rfpId) {
    if (isSupabaseConfigured()) {
      const rows = await supabaseDb.select('collaborations', `id=eq.${rfpId}&limit=1`);
      if (rows && rows.length > 0) {
        const count = (rows[0].faculty_applicants || 0) + 1;
        await supabaseDb.update('collaborations', `id=eq.${rfpId}`, { faculty_applicants: count });
        return { ...rows[0], faculty_applicants: count };
      }
    }

    const db = this.read();
    const rfp = db.collaborations.find(c => c.id === rfpId);
    if (!rfp) return null;
    rfp.facultyApplicants = (rfp.facultyApplicants || 0) + 1;
    this.write(db);
    return rfp;
  }

  // --- Training Programs Methods ---
  async getTrainingPrograms() {
    if (isSupabaseConfigured()) {
      const rows = await supabaseDb.select('training_programs');
      if (rows && rows.length > 0) {
        return rows.map(r => ({
          ...r,
          targetGap: r.target_gap,
          studentsEnrolled: r.students_enrolled,
          completionRate: r.completion_rate
        }));
      }
    }
    const db = this.read();
    return db.trainingPrograms;
  }

  // --- Institution Analytics ---
  async getInstitutionMetrics() {
    if (isSupabaseConfigured()) {
      const rows = await supabaseDb.select('institution_metrics', 'limit=1');
      if (rows && rows.length > 0) {
        const r = rows[0];
        return {
          collegeName: r.college_name,
          totalStudents: r.total_students,
          batch: r.batch,
          placementReadinessIndex: r.placement_readiness_index,
          placedCount: r.placed_count,
          placedPercentage: r.placed_percentage,
          readyForPlacementCount: r.ready_for_placement_count,
          readyPercentage: r.ready_percentage,
          needsBridgingCount: r.needs_bridging_count,
          needsBridgingPercentage: r.needs_bridging_percentage,
          highRiskCount: r.high_risk_count,
          highRiskPercentage: r.high_risk_percentage,
          departmentBreakdown: r.department_breakdown,
          curriculumSkillGaps: r.curriculum_skill_gaps
        };
      }
    }
    const db = this.read();
    return db.institutionMetrics;
  }

  // --- Authentication Methods ---
  async registerStudent({ name, email, password, college, department, targetRole }) {
    const db = this.read();
    if (!db.students) db.students = [];

    const existing = db.students.find(s => s.email && s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { error: 'An account with this email already exists' };
    }

    const id = `std-${Date.now().toString().slice(-6)}`;
    const newStudent = {
      id,
      name: name || 'New Student',
      email: email.toLowerCase(),
      password: password || 'demo123',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      college: college || 'Apex Institute of Technology',
      department: department || 'Computer Science & Engineering',
      batchYear: '2026',
      cgpa: '8.4',
      portfolioHash: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 6)}-VERIFIED`,
      lastAssessmentDate: new Date().toISOString().split('T')[0],
      readinessScore: 68,
      skills: {
        'JavaScript / TypeScript': 74,
        'React.js': 72,
        'Node.js / Express': 66,
        'REST & GraphQL APIs': 68,
        'SQL & Database Design': 60,
        'Docker & Containerization': 44,
        'Cloud Architecture (AWS/GCP)': 38,
        'CI/CD & DevOps': 34,
        'System Design & Scalability': 42,
        'Professional Communication': 76
      },
      verifiedProjects: [
        {
          id: `proj-${Date.now()}`,
          title: `${targetRole || 'Full Stack'} Starter Application`,
          description: 'Verified onboarding project demonstrating fundamentals and modern architecture standards.',
          techStack: ['React', 'Node.js', 'Express', 'TailwindCSS'],
          liveUrl: 'https://github.com/student/nexus-starter',
          verifiedBy: 'Nexus Skill Assessment Engine',
          verificationDate: new Date().toISOString().split('T')[0],
          grade: 'Verified Independent Build',
          badge: 'Verified Architecture'
        }
      ],
      credentials: [
        {
          id: `cred-${Date.now()}`,
          title: 'SkillSync Verified Student Credential',
          issuer: 'SkillSync Verified Consortium',
          issuedDate: 'August 2026',
          credentialHash: `NEXUS-ID-${Math.floor(10000 + Math.random() * 90000)}`,
          status: 'Active Student'
        }
      ],
      appliedJobs: []
    };

    db.students.push(newStudent);
    this.write(db);

    if (isSupabaseConfigured()) {
      try {
        await supabaseDb.insert('students', {
          id: newStudent.id,
          name: newStudent.name,
          email: newStudent.email,
          college: newStudent.college,
          readiness_score: newStudent.readinessScore,
          portfolio_hash: newStudent.portfolioHash,
          skills: newStudent.skills
        });
      } catch (err) {
        console.warn('Supabase sync for new registered student skipped:', err.message);
      }
    }

    return { student: newStudent };
  }

  async loginUser({ email, password, role = 'student' }) {
    const db = this.read();
    if (role === 'student') {
      const student = db.students.find(s => s.email && s.email.toLowerCase() === email.toLowerCase());
      if (!student) {
        const defaultStudent = db.students[0];
        return {
          user: {
            id: defaultStudent.id,
            name: defaultStudent.name,
            email: defaultStudent.email,
            role: 'student'
          },
          student: defaultStudent
        };
      }
      return {
        user: {
          id: student.id,
          name: student.name,
          email: student.email,
          role: 'student'
        },
        student
      };
    }

    return {
      user: {
        id: `user-${role}-demo`,
        name: role === 'industry' ? 'TechCorp Recruiter' : role === 'faculty' ? 'Prof. Sarah Jenkins' : 'Dean Dr. R. Verma',
        email: email || `${role}@nexus.edu`,
        role
      }
    };
  }

  // --- Reset Store ---
  reset() {
    this.write(SEED_DATA);
    return { message: 'Database reset to initial seed state successfully' };
  }
}

export const dbStore = new Store();
