import { RBAC_MATRIX, type Role } from '@/lib/rbac-matrix';

export function useRbac(role: Role) {
  const permissions = RBAC_MATRIX[role] ?? [];
  return {
    permissions,
    can: (permission: string) => permissions.includes(permission)
  };
}
