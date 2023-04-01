import { Router } from 'express';
import docsRoute from './docs.route.js';
import patientRoute from './patient.route.js';
import userRoute from './user.route.js';

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
    route: patientRoute,
  },
  {
    path: '/vaccinator',
    route: patientRoute,
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
