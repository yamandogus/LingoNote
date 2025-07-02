import { Router } from 'express';
import { register, login, getUser, updateProfile } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/user', auth, getUser);
router.put('/auth/user', auth, updateProfile);

export default router; 