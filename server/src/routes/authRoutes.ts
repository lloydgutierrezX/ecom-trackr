import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { authencicateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

router.get('/test', authencicateToken, (req, res) => {
  res.status(200).json({ message: 'Test route accessed successfully', user: (req as any).user });
});

export default router;