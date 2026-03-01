export type Triage = 'P0' | 'P1' | 'P2' | 'P3';

export type Patient = {
  id: string;
  mrn: string;
  name: string;
  triage: Triage;
};
