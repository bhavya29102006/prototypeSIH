import express from 'express';
import { dbStore } from '../db/store.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const student = await dbStore.getStudent(req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json(student);
});

// submit quiz results and boost verified skills
router.post('/:id/quiz', async (req, res) => {
  const { skillBoosts } = req.body;
  if (!skillBoosts || typeof skillBoosts !== 'object') {
    return res.status(400).json({ error: 'skillBoosts object is required' });
  }

  // TODO: validate question signatures on server in next iteration
  const updatedStudent = await dbStore.updateStudentSkills(req.params.id, skillBoosts);
  if (!updatedStudent) {
    return res.status(404).json({ error: 'Student not found' });
  }

  res.json({
    message: 'Quiz recorded and student skill profile updated',
    student: updatedStudent
  });
});

router.post('/:id/apply', async (req, res) => {
  const { jobId, matchScore } = req.body;
  if (!jobId) {
    return res.status(400).json({ error: 'jobId is required' });
  }

  const result = await dbStore.applyJob(jobId, req.params.id, matchScore);
  if (result.error) {
    return res.status(400).json(result);
  }

  res.json(result);
});

// Update student skills & profile from AI Resume Extractor or profile sync
router.post('/:id/skills', async (req, res) => {
  const { skills, profileUpdates } = req.body;
  if (!skills || typeof skills !== 'object') {
    return res.status(400).json({ error: 'skills object is required' });
  }

  const updatedStudent = await dbStore.setStudentSkills(req.params.id, skills, profileUpdates || {});
  if (!updatedStudent) {
    return res.status(404).json({ error: 'Student not found' });
  }

  res.json({
    message: 'Student skills and profile successfully synced to database',
    student: updatedStudent
  });
});

export default router;
