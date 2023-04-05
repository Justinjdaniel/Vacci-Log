import { RequireAuth } from '../contexts/AuthContext';
import AppLayout from '../layouts/AppLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import NotFoundPage from '../pages/NotFoundPage';
import Overview from '../pages/Overview';

const router = [
  {
    path: '/',
    element: <AppLayout />,
    index: true,
    children: [
      { path: '/', element: <Overview />, index: true },
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
    children: [{ path: 'dashboard', element: <Dashboard /> }],
  },
];

export default router;
