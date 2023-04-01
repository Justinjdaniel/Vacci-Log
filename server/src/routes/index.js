import { Router } from 'express';
import docsRoute from './docs.route.js';
import patientRoute from './patient.route.js';
import userRoute from './user.route.js';
import vaccinatorRoute from './vaccinator.route.js';
import vaccineRoute from './vaccine.route.js';

const router = Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/patient',
    route: patientRoute,
  },
  {
    path: '/vaccine',
    route: vaccineRoute,
  },
  {
    path: '/vaccinator',
    route: vaccinatorRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (process.env.NODE_ENV === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
