import { Router } from 'express';
import {
  createUser,
  getUser,
  loginUser,
} from '../controllers/user.controller.js';

const router = Router();

router.route('/').get(getUser).post(createUser);
router.get('/login', loginUser);

export default router;
