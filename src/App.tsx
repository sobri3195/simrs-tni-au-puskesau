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
import { EmrPage } from '@/pages/emr-page';

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
      { path: '/queue-management', element: <SimplePage title="Manajemen Antrian" /> },
      { path: '/referrals', element: <SimplePage title="Rujukan" /> },
      { path: '/appointments-online', element: <SimplePage title="Appointment Online" /> },
      
      // Clinical Services
      { path: '/clinical', element: <Navigate to="/clinical/emergency" replace /> },
      { path: '/clinical/outpatient', element: <SimplePage title="Rawat Jalan" /> },
      { path: '/clinical/emergency', element: <EmergencyPage /> },
      { path: '/clinical/inpatient', element: <SimplePage title="Rawat Inap" /> },
      { path: '/clinical/emr', element: <EmrPage /> },
      { path: '/emr/encounters/demo', element: <SimplePage title="EMR Encounter" /> },
      { path: '/icu', element: <SimplePage title="ICU & HDU" /> },
      { path: '/operating-room', element: <SimplePage title="Kamar Operasi" /> },
      { path: '/telemedicine', element: <SimplePage title="Telemedicine" /> },
      { path: '/nutrition', element: <SimplePage title="Gizi Klinik" /> },
      
      // Support Services
      { path: '/support', element: <Navigate to="/lab" replace /> },
      { path: '/lab', element: <LabPage /> },
      { path: '/lab/orders', element: <LabPage /> },
      { path: '/lab/results/:resultId', element: <SimplePage title="Hasil Lab" /> },
      { path: '/radiology', element: <SimplePage title="Radiologi" /> },
      { path: '/pharmacy', element: <PharmacyPage /> },
      { path: '/rehabilitation', element: <SimplePage title="Rehabilitasi Medik" /> },
      { path: '/blood-bank', element: <SimplePage title="Bank Darah" /> },
      { path: '/hemodialysis', element: <SimplePage title="Hemodialisa" /> },
      
      // Finance
      { path: '/finance', element: <Navigate to="/billing" replace /> },
      { path: '/billing', element: <BillingPage /> },
      { path: '/cashier', element: <BillingPage /> },
      { path: '/claims', element: <SimplePage title="Klaim" /> },
      { path: '/tariff-management', element: <SimplePage title="Manajemen Tarif" /> },
      { path: '/cost-accounting', element: <SimplePage title="Akuntansi Biaya" /> },
      { path: '/finance-dashboard', element: <SimplePage title="Dashboard Keuangan" /> },
      
      // Operations
      { path: '/operations', element: <Navigate to="/logistics" replace /> },
      { path: '/logistics', element: <SimplePage title="Logistik & Stok" /> },
      { path: '/hr', element: <SimplePage title="SDM & Shift" /> },
      { path: '/beds', element: <SimplePage title="Bed Management" /> },
      { path: '/asset-management', element: <SimplePage title="Asset Management" /> },
      { path: '/maintenance', element: <SimplePage title="Maintenance" /> },
      { path: '/ambulance', element: <SimplePage title="Ambulance Dispatch" /> },
      
      // Governance
      { path: '/governance', element: <Navigate to="/audit" replace /> },
      { path: '/audit', element: <SimplePage title="Audit Trail" /> },
      { path: '/reports', element: <SimplePage title="Laporan" /> },
      { path: '/settings', element: <SimplePage title="Konfigurasi" /> },
      { path: '/clinical-governance', element: <SimplePage title="Clinical Governance" /> },
      { path: '/quality-indicators', element: <SimplePage title="Indikator Mutu" /> },
      { path: '/document-control', element: <SimplePage title="Kontrol Dokumen" /> },
      
      // Collaboration
      { path: '/collaboration', element: <Navigate to="/notifications" replace /> },
      { path: '/notifications', element: <SimplePage title="Notifikasi" /> },
      { path: '/tasks', element: <SimplePage title="Task & Handover" /> },
      { path: '/internal-chat', element: <SimplePage title="Internal Chat" /> },
      { path: '/incident-report', element: <SimplePage title="Laporan Insiden" /> },
      
      // Modules
      { path: '/simrs/modules', element: <SimrsModulesPage /> },

      // New navigation modules

      { path: '/patient-services', element: <Navigate to="/registrations/new" replace /> },
      { path: '/medical-support', element: <Navigate to="/lab" replace /> },
      { path: '/clinic-management', element: <Navigate to="/clinical/emr" replace /> },
      { path: '/finance-claims', element: <Navigate to="/cashier" replace /> },
      { path: '/reports-analytics', element: <Navigate to="/reports" replace /> },
      { path: '/system-settings', element: <Navigate to="/admin-panel" replace /> },
      { path: '/others', element: <Navigate to="/user-profile" replace /> },

      { path: '/central-surgery', element: <SimplePage title="Bedah Sentral" /> },
      { path: '/cssd', element: <SimplePage title="CSSD" /> },
      { path: '/medical-records-management', element: <SimplePage title="Manajemen Rekam Medik" /> },
      { path: '/infection-control', element: <SimplePage title="Kontrol Infeksi (PPI)" /> },
      { path: '/pharmacy-warehouse', element: <SimplePage title="Gudang Farmasi" /> },
      { path: '/general-warehouse', element: <SimplePage title="Gudang Umum" /> },
      { path: '/biomedical-equipment', element: <SimplePage title="Alat Biomedis" /> },
      { path: '/procurement-purchasing', element: <SimplePage title="Pengadaan & Pembelian" /> },
      { path: '/accounting', element: <SimplePage title="Akuntansi" /> },
      { path: '/reports/special-tni-au', element: <SimplePage title="Laporan Khusus (TNI AU)" /> },
      { path: '/admin-panel', element: <SimplePage title="Panel Admin" /> },
      { path: '/system-bridging', element: <SimplePage title="Bridging Sistem" /> },
      { path: '/referral-generator-ai', element: <SimplePage title="Referral Generator (AI)" /> },
      { path: '/user-profile', element: <SimplePage title="Profil Pengguna" /> },
      
      // 404
      { path: '*', element: <SimplePage title="Halaman tidak ditemukan" /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
