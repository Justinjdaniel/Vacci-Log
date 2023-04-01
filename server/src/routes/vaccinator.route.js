import { Router } from 'express';
import {
  getVaccinator,
  registerVaccinator,
} from '../controllers/vaccinator.controller.js';

const router = Router();

router.route('/').get(getVaccinator).post(registerVaccinator);

export default router;
