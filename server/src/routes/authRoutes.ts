import express from 'express';
import { registerUser, loginUser, verifyEmail, forgotPassword, resetPassword, refreshAccessToken, logoutUser } from '../controllers/authController';
import { authencicateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/verify-email', verifyEmail);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', logoutUser);

router.get('/test', authencicateToken, (req, res) => {
  res.status(200).json({ message: 'Test route accessed successfully', user: (req as any).user });
});

export default router;