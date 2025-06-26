import { Router } from 'express';
import { register, login, getUser } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.get("/profile", auth, getUser);

export default router; 