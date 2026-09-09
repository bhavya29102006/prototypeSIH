import express from 'express';
import { dbStore } from '../db/store.js';

const router = express.Router();

// Register a new student
router.post('/register', async (req, res) => {
  const { name, email, password, college, department, targetRole } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required for registration' });
  }

  try {
    const result = await dbStore.registerStudent({
      name,
      email,
      password: password || 'demo123',
      college,
      department,
      targetRole
    });

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(201).json({
      message: 'Student account registered and onboarded successfully!',
      user: {
        id: result.student.id,
        name: result.student.name,
        email: result.student.email,
        role: 'student'
      },
      student: result.student,
      token: `nexus-jwt-${Date.now()}`
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to complete registration', message: err.message });
  }
});

// Login user (Student, Industry, Faculty, Institution)
router.post('/login', async (req, res) => {
  const { email, password, role = 'student' } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const result = await dbStore.loginUser({
      email,
      password: password || 'demo123',
      role
    });

    if (result.error) {
      return res.status(401).json({ error: result.error });
    }

    res.json({
      message: 'Authentication successful',
      ...result,
      token: `nexus-jwt-${Date.now()}`
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Failed to process login', message: err.message });
  }
});

export default router;
