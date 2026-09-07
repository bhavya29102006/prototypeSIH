import express from 'express';
import { dbStore } from '../db/store.js';

const router = express.Router();

// GET /api/training - List all corporate training programs
router.get('/', (req, res) => {
  const programs = dbStore.getTrainingPrograms();
  res.json(programs);
});

// POST /api/training - Post a new corporate training program
router.post('/', (req, res) => {
  const { title, company, targetGap } = req.body;
  if (!title || !company) {
    return res.status(400).json({ error: 'Title and company are required' });
  }

  const newProg = dbStore.addTrainingProgram(req.body);
  res.status(201).json(newProg);
});

export default router;
