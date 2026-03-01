export type Role = 'dokter' | 'perawat' | 'admin' | 'kasir' | 'auditor' | 'komando';

export const RBAC_MATRIX: Record<Role, string[]> = {
  dokter: ['emr.read', 'emr.write', 'order.create', 'breakglass.request'],
  perawat: ['emr.read', 'triage.write', 'handover.write'],
  admin: ['mpi.write', 'registration.write', 'config.write'],
  kasir: ['billing.read', 'billing.write'],
  auditor: ['audit.read', 'breakglass.review'],
  komando: ['dashboard.read', 'reports.read']
};
