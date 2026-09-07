// Automated API Test Script for SkillSync Nexus Backend
const BASE_URL = 'http://localhost:5000/api';

const runTests = async () => {
  console.log('Running API endpoint sanity checks...\n');
  let passed = 0;
  let total = 0;

  const test = async (name, fn) => {
    total++;
    try {
      await fn();
      console.log(`  ok - ${name}`);
      passed++;
    } catch (err) {
      console.error(`  not ok - ${name}:`, err.message);
    }
  };

  // Test 1: Health Check
  await test('GET /api/health (Service Health & Uptime)', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== 'healthy') throw new Error('Expected status: healthy');
  });

  // Test 2: Fetch Student Profile
  await test('GET /api/students/std-2024-8821 (Student Profile & Skills)', async () => {
    const res = await fetch(`${BASE_URL}/students/std-2024-8821`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.name || !data.skills) throw new Error('Missing student profile fields');
  });

  // Test 3: List Jobs
  await test('GET /api/jobs (Active Employer Openings)', async () => {
    const res = await fetch(`${BASE_URL}/jobs`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('Expected non-empty jobs array');
  });

  // Test 4: Auto-Match Candidate Ranking Engine
  await test('GET /api/jobs/job-1/candidates (Candidate Skill-Fit Ranker)', async () => {
    const res = await fetch(`${BASE_URL}/jobs/job-1/candidates`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.candidates || data.candidates.length === 0) throw new Error('No candidates ranked');
    if (typeof data.candidates[0].matchScore !== 'number') throw new Error('Missing calculated matchScore');
  });

  // Test 5: Submit Diagnostic Quiz & Upgrade Skills (POST)
  await test('POST /api/students/std-2024-8821/quiz (Record Quiz & Upgrade Skills)', async () => {
    const res = await fetch(`${BASE_URL}/students/std-2024-8821/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        skillBoosts: {
          'Docker & Containerization': 15,
          'CI/CD & DevOps': 10
        }
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.student || !data.student.skills) throw new Error('Student skills not updated');
  });

  // Test 6: Create Benchmark Job Opening (POST)
  await test('POST /api/jobs (Employer Creates Benchmark Opening)', async () => {
    const res = await fetch(`${BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Backend Systems Engineer Intern',
        company: 'Test Scale Corp',
        requiredSkills: {
          'Node.js / Express': 80,
          'SQL & Database Design': 75
        },
        location: 'Remote',
        stipend: '₹40,000 / month',
        deadline: 'Nov 30, 2026'
      })
    });
    if (res.status !== 201) throw new Error(`Expected HTTP 201, got ${res.status}`);
    const data = await res.json();
    if (!data.id) throw new Error('Job was not assigned an ID');
  });

  // Test 7: Institution Metrics
  await test('GET /api/institution/metrics (Placement Readiness & Curriculum Deficits)', async () => {
    const res = await fetch(`${BASE_URL}/institution/metrics`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (typeof data.placementReadinessIndex !== 'number') throw new Error('Missing readiness index');
  });

  console.log(`\nTests finished: ${passed}/${total} passed`);
  if (passed < total) process.exit(1);
};

runTests().catch(err => console.error('Test script error:', err));
