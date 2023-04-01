import { Router } from 'express';
import {
  getVaccine,
  registerVaccine,
} from '../controllers/vaccine.controller.js';

const router = Router();

router.route('/').get(getVaccine).post(registerVaccine);

export default router;
