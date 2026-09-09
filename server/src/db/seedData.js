// Initial Seed Data for SkillSync Nexus Database

export const SEED_DATA = {
  students: [
    {
      id: 'std-2024-8821',
      name: 'Bhavya Gupta',
      email: 'bhavyagupta2906@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      college: 'UIET Panjab University, Chandigarh',
      department: 'Electronics & Communication Engineering (ECE)',
      batchYear: 'Class of 2028 (Expected)',
      cgpa: '8.8',
      phone: '9351175549',
      github: 'https://github.com/bhavya29102006',
      linkedin: 'https://www.linkedin.com/in/bhavya-gupta-1656a2314',
      portfolioHash: '0x9a8f...e31c-VERIFIED',
      lastAssessmentDate: '2026-09-09',
      readinessScore: 82,
      skills: {
        'C / C++': 84,
        'JavaScript / TypeScript': 92,
        'React.js': 94,
        'Tailwind CSS': 90,
        'HTML5 & Modern Web': 96,
        'Appwrite & BaaS Architecture': 92,
        'REST & CRUD APIs': 89,
        'Arduino & Embedded Systems': 96,
        'Power BI & Data Analytics': 88,
        'Vercel Cloud Deployment': 90,
        'Git & GitHub Workflow': 94,
        'Assistive Tech & Problem Solving': 92
      },
      verifiedProjects: [
        {
          id: 'proj-1',
          title: 'MegaBlog - Full-Stack Blogging Web App',
          description: 'Engineered a full-stack blogging platform using React.js, Tailwind CSS, and Appwrite BaaS. Implemented session authentication, error boundaries, and deployed on Vercel.',
          techStack: ['React.js', 'Appwrite', 'Tailwind CSS', 'Vercel'],
          liveUrl: 'https://megablog-eight.vercel.app/',
          verifiedBy: 'Nexus Skill Assessment Engine & Prof. Sharma',
          verificationDate: '2026-08-15',
          grade: 'Top 5% Production Build',
          badge: 'Full-Stack Verified'
        },
        {
          id: 'proj-2',
          title: 'Ultrasonic Obstacle Detection Glasses for Visually Impaired',
          description: 'Designed and fabricated assistive smart wearable glasses using Arduino to assist visually impaired users. Features 3 multi-directional ultrasonic sensors with real-time vibration alerts.',
          techStack: ['Arduino', 'C/C++', 'Ultrasonic Sensors', 'Embedded Systems'],
          liveUrl: 'https://github.com/bhavya29102006/ultrasonic-obstacle-detector',
          verifiedBy: 'UIET Innovation & Robotics Lab',
          verificationDate: '2026-07-20',
          grade: 'Verified Hardware Innovation',
          badge: 'Hardware Patent Track'
        },
        {
          id: 'proj-3',
          title: 'Dynamic Todo Application',
          description: 'Responsive task management client featuring full CRUD lifecycle, localized state persistence, and responsive Tailwind UI.',
          techStack: ['React.js', 'JavaScript', 'CSS3', 'LocalStorage'],
          liveUrl: 'https://github.com/bhavya29102006',
          verifiedBy: 'Nexus Diagnostic Engine',
          verificationDate: '2026-06-10',
          grade: 'Verified Build',
          badge: 'Frontend Verified'
        },
        {
          id: 'proj-4',
          title: 'Power BI Interactive Business Analytics Dashboard',
          description: 'Interactive business intelligence dashboard with custom KPI modeling, dynamic slicing, and executive trend visualizers.',
          techStack: ['Power BI', 'Data Modeling', 'KPI Dashboards', 'Excel'],
          liveUrl: 'https://github.com/bhavya29102006',
          verifiedBy: 'Analytics Consortium',
          verificationDate: '2026-05-18',
          grade: 'Verified Analytics',
          badge: 'Data Visualization'
        }
      ],
      credentials: [
        {
          id: 'cred-1',
          title: 'Full Stack & BaaS Architecture Specialist',
          issuer: 'SkillSync Verified Consortium',
          issuedDate: 'August 2026',
          credentialHash: 'NEXUS-CERT-99214',
          status: 'Verified Certificate'
        },
        {
          id: 'cred-2',
          title: 'Embedded Systems & IoT Innovation Badge',
          issuer: 'UIET Innovation & Robotics Center',
          issuedDate: 'July 2026',
          credentialHash: 'UIET-IOT-8812',
          status: 'Verified by Academic Dean'
        }
      ],
      appliedJobs: [
        { jobId: 'job-1', appliedAt: '2026-08-30', status: 'Interview Shortlisted' }
      ]
    },
    {
      id: 'std-2024-9104',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@nexus.edu',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      college: 'Apex Institute of Technology',
      department: 'Computer Science & Engineering (CSE)',
      batchYear: '2025 (Final Year)',
      cgpa: '8.7',
      portfolioHash: '0x4b7c...f812-VERIFIED',
      lastAssessmentDate: '2026-08-28',
      readinessScore: 76,
      skills: {
        'Python': 80,
        'Docker & Containerization': 75,
        'Cloud Architecture (AWS/GCP)': 70,
        'CI/CD & DevOps': 68,
        'SQL & Database Design': 82,
        'Node.js / Express': 78,
        'JavaScript / TypeScript': 80,
        'System Design & Scalability': 65
      },
      verifiedProjects: [
        {
          id: 'proj-aarav-1',
          title: 'Distributed Microservices E-Commerce API',
          description: 'Engineered a multi-tenant order processing engine with Redis caching, Kafka message queue, and PostgreSQL.',
          techStack: ['Node.js', 'Redis', 'PostgreSQL', 'Docker'],
          liveUrl: 'https://github.com/aarav/ecommerce-engine',
          verifiedBy: 'CloudScale Technologies & Prof. Mehta',
          verificationDate: '2026-07-15',
          grade: 'Top 5% Submission',
          badge: 'Gold Code Quality'
        }
      ],
      credentials: [
        {
          id: 'cred-aarav-1',
          title: 'Backend Architecture Specialist',
          issuer: 'SkillSync Verified Consortium',
          issuedDate: 'July 2026',
          credentialHash: 'NEXUS-CERT-55102',
          status: 'Verified Certificate'
        }
      ],
      appliedJobs: []
    }
  ],

  candidates: [
    {
      id: 'std-2024-8821',
      name: 'Bhavya Gupta',
      college: 'UIET Panjab University, Chandigarh',
      department: 'ECE',
      batchYear: '2028',
      cgpa: '8.8',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      skills: {
        'C / C++': 84,
        'JavaScript / TypeScript': 92,
        'React.js': 94,
        'Tailwind CSS': 90,
        'HTML5 & Modern Web': 96,
        'Appwrite & BaaS Architecture': 92,
        'REST & CRUD APIs': 89,
        'Arduino & Embedded Systems': 96,
        'Power BI & Data Analytics': 88,
        'Vercel Cloud Deployment': 90,
        'Git & GitHub Workflow': 94,
        'Assistive Tech & Problem Solving': 92
      },
      verifiedProjectsCount: 4,
      credentialsCount: 2,
      readinessTier: 'Tier 1 - Industry Ready'
    },
    {
      id: 'std-2024-9104',
      name: 'Aarav Sharma',
      college: 'Apex Institute of Technology',
      department: 'CSE',
      batchYear: '2025',
      cgpa: '8.7',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      skills: {
        'Python': 80,
        'Docker & Containerization': 75,
        'Cloud Architecture (AWS/GCP)': 70,
        'CI/CD & DevOps': 68,
        'SQL & Database Design': 82,
        'Node.js / Express': 78,
        'JavaScript / TypeScript': 80,
        'System Design & Scalability': 65
      },
      verifiedProjectsCount: 2,
      credentialsCount: 2,
      readinessTier: 'Tier 1 - High Potential'
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
