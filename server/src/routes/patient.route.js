import { Router } from 'express';
import {
  getPatient,
  registerPatient,
  updatePatient,
} from '../controllers/patient.controller.js';

const router = Router();

router.route('/').get(getPatient).post(registerPatient).patch(updatePatient);

export default router;
