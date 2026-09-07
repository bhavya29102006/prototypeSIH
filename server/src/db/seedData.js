// Initial Seed Data for SkillSync Nexus Database

export const SEED_DATA = {
  students: [
    {
      id: 'std-2024-8821',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@nexus.edu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      college: 'Apex Institute of Technology',
      department: 'Computer Science & Engineering',
      batchYear: '2025 (Final Year)',
      cgpa: '8.7',
      portfolioHash: '0x9a8f...e31c-VERIFIED',
      lastAssessmentDate: '2026-08-28',
      readinessScore: 78,
      skills: {
        'JavaScript / TypeScript': 88,
        'React.js': 82,
        'Node.js / Express': 72,
        'REST & GraphQL APIs': 75,
        'SQL & Database Design': 65,
        'Docker & Containerization': 38,
        'Cloud Architecture (AWS/GCP)': 32,
        'CI/CD & DevOps': 25,
        'System Design & Scalability': 40,
        'Professional Communication': 80
      },
      verifiedProjects: [
        {
          id: 'proj-1',
          title: 'Distributed Microservices E-Commerce API',
          description: 'Engineered a multi-tenant order processing engine with Redis caching, Kafka message queue, and PostgreSQL.',
          techStack: ['Node.js', 'Redis', 'PostgreSQL', 'Docker'],
          liveUrl: 'https://github.com/aarav/ecommerce-engine',
          verifiedBy: 'CloudScale Technologies & Prof. Mehta',
          verificationDate: '2026-07-15',
          grade: 'Top 5% Submission',
          badge: 'Gold Code Quality'
        },
        {
          id: 'proj-2',
          title: 'Real-time Collaborative Whiteboard',
          description: 'Full-duplex WebSocket canvas application with operational transformation and multi-room canvas synchronization.',
          techStack: ['React', 'WebSockets', 'TailwindCSS', 'Node.js'],
          liveUrl: 'https://canvas-sync.demo.app',
          verifiedBy: 'Nexus Skill Assessment Engine',
          verificationDate: '2026-06-02',
          grade: 'Verified Independent Build',
          badge: 'Verified Architecture'
        }
      ],
      credentials: [
        {
          id: 'cred-1',
          title: 'Full Stack Web Architecture Specialist',
          issuer: 'SkillSync Verified Consortium',
          issuedDate: 'July 2026',
          credentialHash: 'NEXUS-CERT-99214',
          status: 'Verified Certificate'
        },
        {
          id: 'cred-2',
          title: 'Database Normalization & Performance Tuning',
          issuer: 'Apex Center of Excellence',
          issuedDate: 'May 2026',
          credentialHash: 'APEX-COE-4019',
          status: 'Verified by Academic Dean'
        }
      ],
      appliedJobs: [
        { jobId: 'job-1', appliedAt: '2026-08-30', status: 'Interview Shortlisted' }
      ]
    }
  ],

  candidates: [
    {
      id: 'std-2024-8821',
      name: 'Aarav Sharma',
      college: 'Apex Institute of Technology',
      department: 'CSE',
      batchYear: '2025',
      cgpa: '8.7',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      skills: {
        'JavaScript / TypeScript': 88,
        'React.js': 82,
        'Node.js / Express': 72,
        'REST & GraphQL APIs': 75,
        'SQL & Database Design': 65,
        'Docker & Containerization': 38,
        'Cloud Architecture (AWS/GCP)': 32,
        'CI/CD & DevOps': 25,
        'System Design & Scalability': 40,
        'Professional Communication': 80
      },
      verifiedProjectsCount: 2,
      credentialsCount: 2,
      readinessTier: 'Tier 1 - High Potential'
    },
    {
      id: 'std-2024-9104',
      name: 'Priya Iyer',
      college: 'Apex Institute of Technology',
      department: 'IT',
      batchYear: '2025',
      cgpa: '9.2',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      skills: {
        'JavaScript / TypeScript': 92,
        'React.js': 90,
        'Node.js / Express': 85,
        'REST & GraphQL APIs': 88,
        'SQL & Database Design': 80,
        'Docker & Containerization': 78,
        'Cloud Architecture (AWS/GCP)': 72,
        'CI/CD & DevOps': 68,
        'System Design & Scalability': 70,
        'Professional Communication': 85
      },
      verifiedProjectsCount: 4,
      credentialsCount: 3,
      readinessTier: 'Tier 1 - Industry Ready'
    },
    {
      id: 'std-2024-3412',
      name: 'Rohan Deshmukh',
      college: 'Apex Institute of Technology',
      department: 'AI & Data Science',
      batchYear: '2025',
      cgpa: '7.9',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      skills: {
        'JavaScript / TypeScript': 65,
        'React.js': 60,
        'Node.js / Express': 68,
        'REST & GraphQL APIs': 62,
        'SQL & Database Design': 85,
        'Docker & Containerization': 30,
        'Cloud Architecture (AWS/GCP)': 45,
        'CI/CD & DevOps': 20,
        'System Design & Scalability': 50,
        'Professional Communication': 70
      },
      verifiedProjectsCount: 1,
      credentialsCount: 1,
      readinessTier: 'Tier 2 - Needs Upskilling'
    },
    {
      id: 'std-2024-1189',
      name: 'Neha Verma',
      college: 'Apex Institute of Technology',
      department: 'ECE',
      batchYear: '2025',
      cgpa: '8.4',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
      skills: {
        'JavaScript / TypeScript': 45,
        'React.js': 40,
        'Node.js / Express': 50,
        'REST & GraphQL APIs': 55,
        'SQL & Database Design': 60,
        'Docker & Containerization': 20,
        'Cloud Architecture (AWS/GCP)': 25,
        'CI/CD & DevOps': 15,
        'System Design & Scalability': 35,
        'Professional Communication': 75
      },
      verifiedProjectsCount: 1,
      credentialsCount: 0,
      readinessTier: 'Tier 3 - High Skill Gap'
    }
  ],

  jobs: [
    {
      id: 'job-1',
      company: 'CloudScale Technologies',
      logo: '⚡',
      title: 'Full-Stack Engineer Intern (Pre-Placement Offer)',
      location: 'Bengaluru / Hybrid',
      type: 'Internship -> Full-Time',
      stipend: '₹45,000 / month + ₹12 LPA PPO',
      deadline: 'Sept 30, 2026',
      applicantsCount: 42,
      description: 'We are seeking passionate engineers to work on our real-time streaming analytics platform. We evaluate verified skill competencies, not generic resumes.',
      requiredSkills: {
        'JavaScript / TypeScript': 80,
        'React.js': 75,
        'Node.js / Express': 70,
        'REST & GraphQL APIs': 70,
        'Docker & Containerization': 50
      },
      preferredSkills: ['Redis', 'PostgreSQL', 'Git Workflow'],
      verifiedMatchThreshold: 75,
      status: 'Actively Hiring'
    },
    {
      id: 'job-2',
      company: 'FinPulse Systems',
      logo: '💳',
      title: 'Junior Backend & API Developer',
      location: 'Pune / Remote',
      type: 'Full-Time',
      stipend: '₹9.2 - ₹11.5 LPA',
      deadline: 'Oct 15, 2026',
      applicantsCount: 28,
      description: 'Help build high-throughput payment reconciliation pipelines. Verified SQL performance and REST design skills are strictly validated via SkillSync.',
      requiredSkills: {
        'Node.js / Express': 80,
        'SQL & Database Design': 75,
        'REST & GraphQL APIs': 80,
        'System Design & Scalability': 60
      },
      preferredSkills: ['Microservices', 'Kafka', 'Jest'],
      verifiedMatchThreshold: 70,
      status: 'Actively Hiring'
    },
    {
      id: 'job-3',
      company: 'Veloce AI Labs',
      logo: '🧠',
      title: 'Frontend Product Engineering Intern',
      location: 'Hyderabad / On-site',
      type: '6-Month Internship',
      stipend: '₹35,000 / month',
      deadline: 'Oct 05, 2026',
      applicantsCount: 65,
      description: 'Work directly alongside our founding engineers building interactive AI dashboards with React and Tailwind.',
      requiredSkills: {
        'JavaScript / TypeScript': 80,
        'React.js': 80,
        'Professional Communication': 70
      },
      preferredSkills: ['TailwindCSS', 'Zustand', 'Data Visualization'],
      verifiedMatchThreshold: 80,
      status: 'Actively Hiring'
    },
    {
      id: 'job-4',
      company: 'AeroCloud Infrastructure',
      logo: '☁️',
      title: 'Associate Cloud DevOps Engineer',
      location: 'Gurugram / Hybrid',
      type: 'Full-Time',
      stipend: '₹10.5 - ₹13 LPA',
      deadline: 'Oct 20, 2026',
      applicantsCount: 19,
      description: 'Automate deployment pipelines and manage multi-region cloud infrastructure for enterprise customers.',
      requiredSkills: {
        'Docker & Containerization': 80,
        'Cloud Architecture (AWS/GCP)': 75,
        'CI/CD & DevOps': 80
      },
      preferredSkills: ['Kubernetes', 'Terraform', 'Linux Shell'],
      verifiedMatchThreshold: 70,
      status: 'Actively Hiring'
    }
  ],

  collaborations: [
    {
      id: 'rfp-1',
      company: 'CloudScale Technologies',
      title: 'Distributed Systems & Live Telemetry Classroom Project',
      type: 'Classroom Co-Teaching / Live Project',
      domain: 'Cloud & Distributed Computing',
      sponsorAmount: '₹2,50,000 Grant + Cloud Credits',
      duration: '1 Academic Semester (16 Weeks)',
      description: 'We are seeking Computer Science faculty to introduce our anonymized enterprise telemetry datasets as a 4th-year laboratory capstone. Our engineering leads will co-mentor student cohorts.',
      deliverables: [
        '30-40 Students trained on real-world telemetry analysis',
        'Faculty co-authoring case study whitepaper',
        'Direct interview fast-track for top 5 student teams'
      ],
      facultyApplicants: 4,
      status: 'Accepting Proposals'
    },
    {
      id: 'rfp-2',
      company: 'FinPulse Systems',
      title: 'Industry Consultancy: High-Concurrency ACID Transaction Analysis',
      type: 'Faculty Consultancy / Joint R&D',
      domain: 'FinTech Database Performance',
      sponsorAmount: '₹4,00,000 Consultancy Honorarium',
      duration: '3 Months',
      description: 'Seeking senior database faculty to audit and benchmark distributed locking algorithms for financial microservices.',
      deliverables: [
        'Comparative latency benchmark report',
        'Curriculum integration recommendations for Transaction Processing',
        'Joint seminar with FinPulse engineering group'
      ],
      facultyApplicants: 2,
      status: 'Reviewing Applications'
    },
    {
      id: 'rfp-3',
      company: 'Veloce AI Labs',
      title: 'Faculty Upskilling: Generative AI & LLM Systems in Modern Curricula',
      type: 'Faculty Development Program (FDP)',
      domain: 'Artificial Intelligence & LLM Ops',
      sponsorAmount: 'Fully Sponsored by Veloce AI',
      duration: '2-Week Intensive Bootcamp',
      description: 'Hands-on summer immersion for college professors to update syllabus modules from legacy ML to modern transformer fine-tuning, RAG, and vector databases.',
      deliverables: [
        'Accredited Industry Faculty Certification',
        'Turnkey syllabus modules & lab exercise packs',
        '500 Free GPU hours for college lab machines'
      ],
      facultyApplicants: 18,
      status: 'Open Enrollment'
    }
  ],

  trainingPrograms: [
    {
      id: 'train-1',
      company: 'CloudScale Technologies',
      title: 'Production Docker & Kubernetes Mastery Sprint',
      targetGap: 'Docker & Containerization, Cloud Architecture',
      duration: '3 Weeks • Self-Paced + Live Office Hours',
      studentsEnrolled: 142,
      completionRate: '86%',
      incentive: 'Direct Internship Interview for all students scoring >85%',
      tag: 'Closes Critical Gap'
    },
    {
      id: 'train-2',
      company: 'FinPulse Systems',
      title: 'Modern Database Indexing & Scalable Query Tuning',
      targetGap: 'SQL & Database Design, System Scalability',
      duration: '2 Weeks • Hands-on SQL Labs',
      studentsEnrolled: 89,
      completionRate: '91%',
      incentive: 'Verified Industry Skill Badge on Digital Portfolio',
      tag: 'High Placement Impact'
    }
  ],

  institutionMetrics: {
    collegeName: 'Apex Institute of Technology',
    totalStudents: 480,
    batch: '2025 (Graduating Class)',
    placementReadinessIndex: 64,
    placedCount: 168,
    placedPercentage: 35,
    readyForPlacementCount: 144,
    readyPercentage: 30,
    needsBridgingCount: 120,
    needsBridgingPercentage: 25,
    highRiskCount: 48,
    highRiskPercentage: 10,
    departmentBreakdown: [
      { department: 'Computer Science (CSE)', total: 180, placed: 84, ready: 58, atRisk: 12, avgSkillScore: 74 },
      { department: 'Information Tech (IT)', total: 120, placed: 48, ready: 42, atRisk: 10, avgSkillScore: 71 },
      { department: 'AI & Data Science (AI-DS)', total: 100, placed: 26, ready: 34, atRisk: 14, avgSkillScore: 68 },
      { department: 'Electronics & Comm (ECE)', total: 80, placed: 10, ready: 10, atRisk: 12, avgSkillScore: 54 }
    ],
    curriculumSkillGaps: [
      {
        skill: 'Docker & Containerization',
        industryDemandPercentage: 84,
        collegeCurriculumTaughtPercentage: 22,
        gapPercentage: 62,
        recommendation: 'Replace legacy monolithic deployment lab with Docker multi-stage containerization lab in Semester 6.',
        urgency: 'Critical Priority'
      },
      {
        skill: 'Cloud & Microservices (AWS/GCP)',
        industryDemandPercentage: 78,
        collegeCurriculumTaughtPercentage: 28,
        gapPercentage: 50,
        recommendation: 'Incorporate Cloud Architecture into elective modules; sponsor AWS Academy sandbox credits.',
        urgency: 'High Priority'
      },
      {
        skill: 'CI/CD & DevOps Automation',
        industryDemandPercentage: 72,
        collegeCurriculumTaughtPercentage: 15,
        gapPercentage: 57,
        recommendation: 'Mandate GitHub Actions automated testing in Software Engineering laboratory.',
        urgency: 'Critical Priority'
      },
      {
        skill: 'System Design & Scalability',
        industryDemandPercentage: 68,
        collegeCurriculumTaughtPercentage: 32,
        gapPercentage: 36,
        recommendation: 'Introduce case studies on caching, message queues, and horizontal partitioning in Distributed Systems course.',
        urgency: 'Medium Priority'
      }
    ]
  }
};
