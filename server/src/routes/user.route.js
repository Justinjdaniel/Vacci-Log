import { Router } from 'express';
import { addUser, getUser, loginUser } from '../controllers/user.controller.js';

const router = Router();

// router.route('/').get(getUser).post(addUser);
router.get('/', getUser);
router.post('/', addUser);
router.get('/login', loginUser);

export default router;
