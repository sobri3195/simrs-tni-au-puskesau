import { apiClient } from '@/services/api-client';
import type { Patient } from '@/types/patient';

export async function getPatients() {
  return apiClient<Patient[]>('/patients');
}
