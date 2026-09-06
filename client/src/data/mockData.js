// Comprehensive Mock Data for SkillSync Nexus Ecosystem

export const INITIAL_STUDENT = {
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
  readinessScore: 78, // out of 100
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
};

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: 'React & Frontend Architecture',
    skillTarget: 'React.js',
    question: 'When optimizing expensive computations in React components, which hook guarantees that a memoized function instance will only recalculate when specific dependencies change?',
    options: [
      { id: 'a', text: 'useEffect()' },
      { id: 'b', text: 'useMemo()' },
      { id: 'c', text: 'useCallback()' },
      { id: 'd', text: 'useRef()' }
    ],
    correct: 'c',
    explanation: '`useCallback(fn, deps)` returns a memoized version of the callback function that only changes if one of the dependencies has changed.'
  },
  {
    id: 2,
    category: 'Backend & Databases',
    skillTarget: 'SQL & Database Design',
    question: 'Which SQL indexing structure is predominantly used by default in relational engines (like PostgreSQL and MySQL InnoDB) to efficiently support range queries and order-by sorting?',
    options: [
      { id: 'a', text: 'Hash Index' },
      { id: 'b', text: 'B-Tree Index' },
      { id: 'c', text: 'GIN (Generalized Inverted) Index' },
      { id: 'd', text: 'Bitmap Index' }
    ],
    correct: 'b',
    explanation: 'B-Tree indexes maintain sorted keys in a balanced tree hierarchy, making both exact lookups and range scans (BETWEEN, >, <) highly performant.'
  },
  {
    id: 3,
    category: 'Cloud & DevOps',
    skillTarget: 'Docker & Containerization',
    question: 'In a multi-stage Dockerfile, what is the primary architectural benefit of separating the "build" stage from the "production runner" stage?',
    options: [
      { id: 'a', text: 'It automatically grants root permissions to the runner image' },
      { id: 'b', text: 'It minimizes final image size and reduces attack surface by excluding compiler toolchains & source files' },
      { id: 'c', text: 'It disables Docker layer caching to force fresh builds' },
      { id: 'd', text: 'It replaces Docker with native Kubernetes runtime pods' }
    ],
    correct: 'b',
    explanation: 'Multi-stage builds leave behind heavyweight compilers, SDKs, and intermediate artifacts, producing lightweight, hardened production container images.'
  },
  {
    id: 4,
    category: 'Cloud Architecture',
    skillTarget: 'Cloud Architecture (AWS/GCP)',
    question: 'What is the purpose of an API Gateway in a microservices deployment topology?',
    options: [
      { id: 'a', text: 'Directly reads database partitions without services' },
      { id: 'b', text: 'Serves as a single entry point handling reverse routing, SSL termination, rate limiting, and client authentication' },
      { id: 'c', text: 'Replaces container orchestrators like Kubernetes' },
      { id: 'd', text: 'Encrypts source code on the client machine' }
    ],
    correct: 'b',
    explanation: 'An API Gateway acts as the reverse-proxy front door, providing centralized security, telemetry, traffic shaping, and unified routing to internal services.'
  },
  {
    id: 5,
    category: 'DevOps & CI/CD',
    skillTarget: 'CI/CD & DevOps',
    question: 'Which deployment strategy routes a small percentage (e.g. 5%) of live production traffic to a newly deployed version to observe error rates before full rollout?',
    options: [
      { id: 'a', text: 'Canary Deployment' },
      { id: 'b', text: 'Big Bang Deployment' },
      { id: 'c', text: 'Blue/Green Switch' },
      { id: 'd', text: 'Shadow Database Rollback' }
    ],
    correct: 'a',
    explanation: 'Canary deployments safely validate system stability in production against real user traffic before gradually shifting 100% of workloads.'
  },
  {
    id: 6,
    category: 'System Design & Scalability',
    skillTarget: 'System Design & Scalability',
    question: 'Under the CAP theorem, if a distributed database guarantees high availability and partition tolerance during a network partition, what property must it sacrifice?',
    options: [
      { id: 'a', text: 'Strong Consistency' },
      { id: 'b', text: 'Fault Tolerance' },
      { id: 'c', text: 'Latency' },
      { id: 'd', text: 'Durability' }
    ],
    correct: 'a',
    explanation: 'In AP (Available/Partition-Tolerant) systems, nodes continue serving read/write queries during network partitions at the expense of temporary eventual consistency.'
  }
];

export const TARGET_ROLE_BENCHMARKS = [
  {
    roleId: 'role-fullstack',
    title: 'Full-Stack Software Engineer (Industry Baseline)',
    companyExample: 'FinTech & SaaS Scale-Ups',
    averagePackage: '₹8.5 - ₹16 LPA / $22 - $35/hr',
    description: 'Builds end-to-end web applications with modern frontend frameworks, scalable backends, resilient databases, and containerized deployments.',
    requiredSkills: {
      'JavaScript / TypeScript': 85,
      'React.js': 80,
      'Node.js / Express': 75,
      'REST & GraphQL APIs': 80,
      'SQL & Database Design': 70,
      'Docker & Containerization': 70,
      'Cloud Architecture (AWS/GCP)': 65,
      'CI/CD & DevOps': 60,
      'System Design & Scalability': 65,
      'Professional Communication': 75
    },
    gapAnalysisSummary: 'You have solid Frontend and API fundamentals! The main critical gaps preventing top-tier shortlisting are Docker containerization (-32%) and CI/CD pipelines (-35%).',
    suggestedRoadmap: [
      {
        skill: 'Docker & Containerization',
        action: 'Build a Dockerized microservice and push to DockerHub with automated GitHub Actions.',
        estimatedHours: '12 hrs',
        tag: 'High Priority Gap'
      },
      {
        skill: 'CI/CD & DevOps',
        action: 'Configure automated linting, test pipelines, and staging deployment on Vercel/Render.',
        estimatedHours: '8 hrs',
        tag: 'Critical Gap'
      },
      {
        skill: 'Cloud Architecture (AWS/GCP)',
        action: 'Complete AWS Cloud Practitioner hands-on lab on S3, EC2, and IAM security.',
        estimatedHours: '15 hrs',
        tag: 'Recommended'
      }
    ]
  },
  {
    roleId: 'role-devops',
    title: 'Cloud & Platform DevOps Engineer',
    companyExample: 'Enterprise Infrastructure & Cloud Ops',
    averagePackage: '₹10 - ₹18 LPA',
    description: 'Automates infrastructure provisioning, manages Kubernetes clusters, enforces zero-downtime releases, and monitors distributed microservices.',
    requiredSkills: {
      'JavaScript / TypeScript': 50,
      'React.js': 30,
      'Node.js / Express': 60,
      'REST & GraphQL APIs': 65,
      'SQL & Database Design': 60,
      'Docker & Containerization': 90,
      'Cloud Architecture (AWS/GCP)': 85,
      'CI/CD & DevOps': 90,
      'System Design & Scalability': 80,
      'Professional Communication': 70
    },
    gapAnalysisSummary: 'Significant platform infrastructure training required. Your strongest asset is scripting and API familiarity, but Cloud, Docker, and CI/CD need targeted bootcamps.',
    suggestedRoadmap: [
      {
        skill: 'Docker & Containerization',
        action: 'Complete Docker deep dive: multi-stage builds, compose networks, and volume persistence.',
        estimatedHours: '16 hrs',
        tag: 'Immediate Need'
      },
      {
        skill: 'Cloud Architecture (AWS/GCP)',
        action: 'Deploy Terraform automated VPC and ECS cluster on AWS.',
        estimatedHours: '24 hrs',
        tag: 'Core Requirement'
      }
    ]
  },
  {
    roleId: 'role-frontend',
    title: 'Senior Frontend Product Engineer',
    companyExample: 'Consumer Tech & Design-Led Product Orgs',
    averagePackage: '₹7.5 - ₹14 LPA',
    description: 'Crafts accessible, high-performance user interfaces, optimizes client bundle size, and collaborates closely with design systems.',
    requiredSkills: {
      'JavaScript / TypeScript': 90,
      'React.js': 90,
      'Node.js / Express': 55,
      'REST & GraphQL APIs': 75,
      'SQL & Database Design': 45,
      'Docker & Containerization': 50,
      'Cloud Architecture (AWS/GCP)': 40,
      'CI/CD & DevOps': 50,
      'System Design & Scalability': 60,
      'Professional Communication': 85
    },
    gapAnalysisSummary: 'You are very close to job readiness (88% match)! Slight polish needed in advanced TypeScript patterns and state architecture.',
    suggestedRoadmap: [
      {
        skill: 'React.js & Performance',
        action: 'Audit Core Web Vitals and implement Code Splitting / Lazy Loading on a production app.',
        estimatedHours: '6 hrs',
        tag: 'Final Polish'
      }
    ]
  }
];

export const INDUSTRY_JOBS = [
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
];

export const CANDIDATES_POOL = [
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
];

export const FACULTY_COLLABORATIONS = [
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
];

export const CORPORATE_TRAINING_PROGRAMS = [
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
];

export const INSTITUTION_METRICS = {
  collegeName: 'Apex Institute of Technology',
  totalStudents: 480,
  batch: '2025 (Graduating Class)',
  placementReadinessIndex: 64, // out of 100
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
};
