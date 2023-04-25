import { RequireAuth } from '../contexts/AuthContext';
import AppLayout from '../layouts/AppLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import { lazy } from 'react';
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/Login'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const Welcome = lazy(() => import('../pages/Welcome'));


const router = [
  {
    path: '/',
    element: <AppLayout />,
    index: true,
    children: [
      { path: '/', element: <Welcome />, index: true },
      { path: 'login', element: <Login /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: 'user',
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    index: true,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'vaccine', element: <Dashboard /> },
      { path: 'vaccinator', element: <Dashboard /> },
      { path: 'patient', element: <Dashboard /> },
    ],
  },
];

export default router;
