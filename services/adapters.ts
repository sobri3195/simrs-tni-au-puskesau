import type { Patient } from '@/types/patient';

export function toPatientSummary(patient: Patient) {
  return `${patient.mrn} - ${patient.name} (${patient.triage})`;
}
