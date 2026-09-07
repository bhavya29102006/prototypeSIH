// API Client for SkillSync Nexus Express Backend

const BASE_URL = '/api';

export const api = {
  // Health check
  async checkHealth() {
    try {
      const res = await fetch(`${BASE_URL}/health`);
      return await res.json();
    } catch (err) {
      console.warn('Backend server not reachable, using fallback local mode:', err);
      return null;
    }
  },

  // Student endpoints
  async getStudent(id = 'std-2024-8821') {
    const res = await fetch(`${BASE_URL}/students/${id}`);
    if (!res.ok) throw new Error('Failed to fetch student profile');
    return await res.json();
  },

  async submitQuiz(id = 'std-2024-8821', skillBoosts) {
    const res = await fetch(`${BASE_URL}/students/${id}/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skillBoosts })
    });
    if (!res.ok) throw new Error('Failed to submit quiz score');
    return await res.json();
  },

  async applyJob(id = 'std-2024-8821', jobId, matchScore) {
    const res = await fetch(`${BASE_URL}/students/${id}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, matchScore })
    });
    if (!res.ok) throw new Error('Failed to apply for job');
    return await res.json();
  },

  // Jobs endpoints
  async getJobs() {
    const res = await fetch(`${BASE_URL}/jobs`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return await res.json();
  },

  async postJob(jobData) {
    const res = await fetch(`${BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });
    if (!res.ok) throw new Error('Failed to post job');
    return await res.json();
  },

  async getRankedCandidates(jobId) {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}/candidates`);
    if (!res.ok) throw new Error('Failed to fetch ranked candidates');
    return await res.json();
  },

  // Faculty endpoints
  async getCollaborations() {
    const res = await fetch(`${BASE_URL}/faculty/collaborations`);
    if (!res.ok) throw new Error('Failed to fetch collaborations');
    return await res.json();
  },

  async applyCollaboration(rfpId) {
    const res = await fetch(`${BASE_URL}/faculty/collaborations/${rfpId}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to submit collaboration proposal');
    return await res.json();
  },

  // Training endpoints
  async getTraining() {
    const res = await fetch(`${BASE_URL}/training`);
    if (!res.ok) throw new Error('Failed to fetch training programs');
    return await res.json();
  },

  async postTraining(trainingData) {
    const res = await fetch(`${BASE_URL}/training`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trainingData)
    });
    if (!res.ok) throw new Error('Failed to post training track');
    return await res.json();
  },

  // Institution endpoints
  async getInstitutionMetrics() {
    const res = await fetch(`${BASE_URL}/institution/metrics`);
    if (!res.ok) throw new Error('Failed to fetch institution metrics');
    return await res.json();
  },

  async getInstitutionStudents(query = {}) {
    const params = new URLSearchParams(query).toString();
    const res = await fetch(`${BASE_URL}/institution/students${params ? `?${params}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch student directory');
    return await res.json();
  },

  // Reset database
  async resetDatabase() {
    const res = await fetch(`${BASE_URL}/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to reset database');
    return await res.json();
  }
};
