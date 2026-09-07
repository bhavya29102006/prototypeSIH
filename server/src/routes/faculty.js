import express from 'express';
import { dbStore } from '../db/store.js';

const router = express.Router();

// GET /api/faculty/collaborations - List industry RFPs and grants
router.get('/collaborations', async (req, res) => {
  const collabs = await dbStore.getCollaborations();
  res.json(collabs);
});

// POST /api/faculty/collaborations/:id/apply - Apply for a collaboration project
router.post('/collaborations/:id/apply', async (req, res) => {
  const updated = await dbStore.applyCollaboration(req.params.id);
  if (!updated) {
    return res.status(404).json({ error: 'Collaboration RFP not found' });
  }

  res.json({
    message: 'Proposal successfully routed to Industry Relations lead',
    collaboration: updated
  });
});

export default router;
