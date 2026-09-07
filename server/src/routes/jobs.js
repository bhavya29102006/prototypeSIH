import express from 'express';
import { dbStore } from '../db/store.js';
import { calculateMatchScore } from '../utils/matcher.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const jobs = await dbStore.getJobs();
  res.json(jobs);
});

router.post('/', async (req, res) => {
  const { title, company, requiredSkills } = req.body;
  if (!title || !company || !requiredSkills) {
    return res.status(400).json({ error: 'Title, company, and requiredSkills are required' });
  }

  const newJob = await dbStore.addJob(req.body);
  res.status(201).json(newJob);
});

// ranks candidate pool based on verified skill competency match
router.get('/:id/candidates', async (req, res) => {
  const jobs = await dbStore.getJobs();
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ error: 'Job opening not found' });
  }

  const candidates = await dbStore.getCandidates();
  const ranked = candidates.map(cand => {
    const matchScore = calculateMatchScore(cand.skills, job.requiredSkills);
    return {
      ...cand,
      matchScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  res.json({
    job,
    totalCandidates: ranked.length,
    candidates: ranked
  });
});

export default router;
