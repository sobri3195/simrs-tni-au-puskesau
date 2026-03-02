import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/layouts/app-layout';
import { AuthLayout } from '@/layouts/auth-layout';
import { LoginPage } from '@/pages/login-page';
import { PatientsPage } from '@/pages/patients-page';
import { SimplePage } from '@/pages/simple-page';
import { DashboardPage } from '@/pages/dashboard-page';
import { SimrsModulesPage } from '@/pages/simrs-modules-page';
import { RegistrationPage } from '@/pages/registration-page';
import { EmergencyPage } from '@/pages/emergency-page';
import { LabPage } from '@/pages/lab-page';
import { PharmacyPage } from '@/pages/pharmacy-page';
import { BillingPage } from '@/pages/billing-page';

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
      // Dashboard
      { path: '/dashboard/command', element: <DashboardPage /> },
      
      // Patients
      { path: '/patients', element: <PatientsPage /> },
      { path: '/patients/:id', element: <SimplePage title="Detail Pasien" /> },
      
      // Registration & ADT
      { path: '/registrations', element: <Navigate to="/registrations/new" replace /> },
      { path: '/registrations/new', element: <RegistrationPage /> },
      { path: '/registrations/appointments', element: <SimplePage title="Jadwal Appointment" /> },
      { path: '/registrations/admission', element: <SimplePage title="Admission" /> },
      { path: '/registrations/transfer', element: <SimplePage title="Transfer" /> },
      { path: '/registrations/discharge', element: <SimplePage title="Discharge" /> },
      
      // Clinical Services
      { path: '/clinical', element: <Navigate to="/clinical/emergency" replace /> },
      { path: '/clinical/outpatient', element: <SimplePage title="Rawat Jalan" /> },
      { path: '/clinical/emergency', element: <EmergencyPage /> },
      { path: '/clinical/inpatient', element: <SimplePage title="Rawat Inap" /> },
      { path: '/clinical/emr', element: <SimplePage title="EMR" /> },
      { path: '/emr/encounters/demo', element: <SimplePage title="EMR Encounter" /> },
      
      // Support Services
      { path: '/support', element: <Navigate to="/lab" replace /> },
      { path: '/lab', element: <LabPage /> },
      { path: '/lab/orders', element: <LabPage /> },
      { path: '/lab/results/:resultId', element: <SimplePage title="Hasil Lab" /> },
      { path: '/radiology', element: <SimplePage title="Radiologi" /> },
      { path: '/pharmacy', element: <PharmacyPage /> },
      
      // Finance
      { path: '/finance', element: <Navigate to="/billing" replace /> },
      { path: '/billing', element: <BillingPage /> },
      { path: '/cashier', element: <BillingPage /> },
      { path: '/claims', element: <SimplePage title="Klaim" /> },
      
      // Operations
      { path: '/operations', element: <Navigate to="/logistics" replace /> },
      { path: '/logistics', element: <SimplePage title="Logistik & Stok" /> },
      { path: '/hr', element: <SimplePage title="SDM & Shift" /> },
      { path: '/beds', element: <SimplePage title="Bed Management" /> },
      
      // Governance
      { path: '/governance', element: <Navigate to="/audit" replace /> },
      { path: '/audit', element: <SimplePage title="Audit Trail" /> },
      { path: '/reports', element: <SimplePage title="Laporan" /> },
      { path: '/settings', element: <SimplePage title="Konfigurasi" /> },
      
      // Collaboration
      { path: '/collaboration', element: <Navigate to="/notifications" replace /> },
      { path: '/notifications', element: <SimplePage title="Notifikasi" /> },
      { path: '/tasks', element: <SimplePage title="Task & Handover" /> },
      
      // Modules
      { path: '/simrs/modules', element: <SimrsModulesPage /> },
      
      // 404
      { path: '*', element: <SimplePage title="Halaman tidak ditemukan" /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
