import express from 'express';
import { dbStore } from '../db/store.js';

const router = express.Router();

router.get('/metrics', async (req, res) => {
  const metrics = await dbStore.getInstitutionMetrics();
  res.json(metrics);
});

// filterable student directory for college placement cell
router.get('/students', async (req, res) => {
  const { dept, tier, search } = req.query;
  // TODO: add cursor pagination when student list grows
  let candidates = await dbStore.getCandidates();

  if (dept && dept !== 'all') {
    candidates = candidates.filter(c => c.department.toLowerCase() === dept.toLowerCase());
  }

  if (tier && tier !== 'all') {
    candidates = candidates.filter(c => c.readinessTier.toLowerCase().includes(tier.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    candidates = candidates.filter(c => 
      c.name.toLowerCase().includes(q) || c.department.toLowerCase().includes(q)
    );
  }

  res.json(candidates);
});

export default router;
