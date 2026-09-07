import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/students.js';
import jobRoutes from './routes/jobs.js';
import facultyRoutes from './routes/faculty.js';
import institutionRoutes from './routes/institution.js';
import trainingRoutes from './routes/training.js';
import { dbStore } from './db/store.js';
import { isSupabaseConfigured } from './db/supabaseClient.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// quick dev request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// health check used by frontend to verify backend connection status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'SkillSync Nexus Backend API',
    version: '1.0.0',
    database: isSupabaseConfigured() ? 'Supabase PostgreSQL (Cloud Active)' : 'Local File-Backed Database (db.json)',
    supabaseConfigured: isSupabaseConfigured(),
    timestamp: new Date().toISOString()
  });
});

app.use('/api/students', studentRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/institution', institutionRoutes);
app.use('/api/training', trainingRoutes);

// reset route to restore fresh seed data if needed during demo
app.post('/api/reset', (req, res) => {
  const result = dbStore.reset();
  res.json(result);
});

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`SkillSync API server listening on http://localhost:${PORT}`);
});
