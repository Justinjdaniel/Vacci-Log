import { Router } from 'express';
import {
  addVaccineDose,
  getPatient,
  registerPatient,
} from '../controllers/patient.controller.js';

const router = Router();

router.route('/').get(getPatient).post(registerPatient).patch(addVaccineDose);

export default router;
