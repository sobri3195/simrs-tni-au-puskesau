export const APP_MENU = [
  { label: 'Dashboard', href: '/dashboard/command' },
  { label: 'Pasien', href: '/patients' },
  { label: 'Registrasi', href: '/registrations/new' },
  { label: 'Layanan Klinis', href: '/emr/encounters/demo' },
  { label: 'Penunjang', href: '/lab/orders' },
  { label: 'Keuangan', href: '/billing' },
  { label: 'Operasional RS', href: '/logistics' },
  { label: 'Governance', href: '/audit' },
  { label: 'Kolaborasi', href: '/notifications' }
] as const;
