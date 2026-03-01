import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/layouts/app-layout';
import { AuthLayout } from '@/layouts/auth-layout';
import { LoginPage } from '@/pages/login-page';
import { PatientsPage } from '@/pages/patients-page';
import { SimplePage } from '@/pages/simple-page';
import { DashboardPage } from '@/pages/dashboard-page';
import { SimrsModulesPage } from '@/pages/simrs-modules-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard/command" replace />
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/forgot-password', element: <SimplePage title="Lupa Password" /> }
    ]
  },
  {
    element: <AppLayout />,
    children: [
      { path: '/dashboard/command', element: <DashboardPage /> },
      { path: '/patients', element: <PatientsPage /> },
      { path: '/simrs/modules', element: <SimrsModulesPage /> },
      { path: '/billing', element: <SimplePage title="Billing" /> },
      { path: '/logistics', element: <SimplePage title="Logistik" /> },
      { path: '/audit', element: <SimplePage title="Audit" /> },
      { path: '/notifications', element: <SimplePage title="Notifikasi" /> },
      { path: '*', element: <SimplePage title="Halaman tidak ditemukan" /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
