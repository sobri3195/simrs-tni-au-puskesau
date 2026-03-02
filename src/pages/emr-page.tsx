import { useMemo, useState } from 'react';
import { Alert } from '@/components/ui/alert';
import { Badge, StatusBadge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader, MetricCard } from '@/components/ui/card';
import { Input, Textarea } from '@/components/ui/input';
import { TabPanel, Tabs } from '@/components/ui/tabs';

const encounters = [
  {
    id: 'ENC-240901',
    rm: 'RM-001245',
    patient: 'Kolonel Pnb. Arif Nugroho',
    age: 49,
    clinic: 'Poli Jantung',
    doctor: 'dr. R. Mahendra, Sp.JP',
    chiefComplaint: 'Nyeri dada saat aktivitas > 2 minggu',
    diagnosis: 'Angina pectoris stabil',
    status: 'Dalam pemeriksaan',
    risk: 'Tinggi',
  },
  {
    id: 'ENC-240902',
    rm: 'RM-001892',
    patient: 'Ny. Dewi Larasati',
    age: 38,
    clinic: 'Poli Penyakit Dalam',
    doctor: 'dr. S. Utami, Sp.PD',
    chiefComplaint: 'Kontrol diabetes, gula darah tidak stabil',
    diagnosis: 'DM Tipe 2 tidak terkontrol',
    status: 'Menunggu verifikasi',
    risk: 'Sedang',
  },
  {
    id: 'ENC-240903',
    rm: 'RM-002103',
    patient: 'Pratu Adi Saputra',
    age: 27,
    clinic: 'Poli Umum',
    doctor: 'dr. Taufik Rahman',
    chiefComplaint: 'Batuk berdahak, demam ringan',
    diagnosis: 'ISPA',
    status: 'Selesai',
    risk: 'Rendah',
  },
];

const suggestedOrders = [
  { name: 'EKG 12 Lead', type: 'Pemeriksaan', priority: 'Urgent' },
  { name: 'Troponin I', type: 'Lab', priority: 'Urgent' },
  { name: 'HbA1c', type: 'Lab', priority: 'Rutin' },
  { name: 'Foto Thorax PA', type: 'Radiologi', priority: 'Rutin' },
];

const medicationTemplates = [
  { name: 'Aspirin 80 mg', dose: '1x1', instruction: 'Sesudah makan' },
  { name: 'Atorvastatin 20 mg', dose: '1x1 malam', instruction: 'Sebelum tidur' },
  { name: 'Metformin 500 mg', dose: '2x1', instruction: 'Sesudah makan' },
];

const followUpChecklist = [
  { id: 'education', label: 'Edukasi pasien dan keluarga', done: true },
  { id: 'control', label: 'Jadwal kontrol 7 hari', done: false },
  { id: 'lab-review', label: 'Review hasil lab lanjutan', done: false },
  { id: 'bp-monitoring', label: 'Monitoring tekanan darah di rumah', done: true },
];

export function EmrPage() {
  const [activeTab, setActiveTab] = useState('soap');
  const [selectedEncounterId, setSelectedEncounterId] = useState(encounters[0].id);
  const [soap, setSoap] = useState({
    subjective: 'Nyeri dada menjalar ke lengan kiri saat aktivitas berat. Skala nyeri 4/10.',
    objective: 'TD 150/95 mmHg, Nadi 96x/menit, SpO2 98%, EKG awal menunjukkan ST depresi ringan.',
    assessment: 'Suspek angina stabil dengan faktor risiko hipertensi dan dislipidemia.',
    plan: 'Lanjut evaluasi EKG serial, troponin I, edukasi modifikasi faktor risiko, observasi 2 jam.',
  });
  const [savedAt, setSavedAt] = useState('09:42');
  const [dischargePlan, setDischargePlan] = useState('Lanjutkan terapi anti-platelet, statin, dan kontrol faktor risiko.');
  const [selectedChecklist, setSelectedChecklist] = useState<string[]>(followUpChecklist.filter((item) => item.done).map((item) => item.id));

  const selectedEncounter = useMemo(
    () => encounters.find((item) => item.id === selectedEncounterId) ?? encounters[0],
    [selectedEncounterId],
  );

  const handleSave = () => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setSavedAt(time);
  };

  const toggleChecklist = (id: string) => {
    setSelectedChecklist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <section style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div className="page-header-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ marginBottom: '8px' }}>EMR Rawat Jalan</h1>
            <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
              Dokumentasi SOAP, order klinis, dan rencana terapi dalam satu workflow.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="secondary">Cetak Ringkasan</Button>
            <Button>Finalisasi Encounter</Button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <MetricCard title="Encounter Aktif" value={encounters.length} iconColor="blue" />
        <MetricCard title="Perlu Verifikasi" value="4" iconColor="amber" />
        <MetricCard title="Order Hari Ini" value="18" iconColor="purple" />
        <MetricCard title="Medication Error" value="0" iconColor="green" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '16px' }}>
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0 }}>Daftar Encounter</h3>
          </CardHeader>
          <CardBody style={{ padding: '8px' }}>
            {encounters.map((encounter) => (
              <button
                key={encounter.id}
                onClick={() => setSelectedEncounterId(encounter.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px',
                  marginBottom: '8px',
                  borderRadius: 'var(--radius)',
                  border: selectedEncounter.id === encounter.id ? '1px solid var(--airforce-blue)' : '1px solid var(--line)',
                  background: selectedEncounter.id === encounter.id ? 'var(--info-light)' : 'var(--surface)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong style={{ fontSize: '14px' }}>{encounter.patient}</strong>
                  <Badge variant={encounter.risk === 'Tinggi' ? 'danger' : encounter.risk === 'Sedang' ? 'warning' : 'success'}>{encounter.risk}</Badge>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--fg-secondary)', marginBottom: '6px' }}>
                  {encounter.id} • {encounter.rm} • {encounter.age} tahun
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--neutral)' }}>{encounter.clinic}</span>
                  <StatusBadge
                    status={encounter.status === 'Selesai' ? 'completed' : encounter.status === 'Menunggu verifikasi' ? 'pending' : 'active'}
                    label={encounter.status}
                  />
                </div>
              </button>
            ))}
          </CardBody>
        </Card>

        <div>
          <Card style={{ marginBottom: '16px' }}>
            <CardBody style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Dokter PJ</div>
                <div style={{ fontWeight: 600 }}>{selectedEncounter.doctor}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Keluhan Utama</div>
                <div style={{ fontWeight: 600 }}>{selectedEncounter.chiefComplaint}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>Diagnosis Kerja</div>
                <div style={{ fontWeight: 600 }}>{selectedEncounter.diagnosis}</div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Tabs
                tabs={[
                  { id: 'soap', label: 'SOAP' },
                  { id: 'orders', label: 'Order Klinis', count: suggestedOrders.length },
                  { id: 'therapy', label: 'Terapi', count: medicationTemplates.length },
                  { id: 'followup', label: 'Rencana Lanjut', count: followUpChecklist.length },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
            </CardHeader>
            <CardBody>
              <TabPanel activeTab={activeTab} tabId="soap">
                <div style={{ display: 'grid', gap: '12px' }}>
                  <Textarea label="S - Subjective" value={soap.subjective} onChange={(e) => setSoap((prev) => ({ ...prev, subjective: e.target.value }))} rows={3} />
                  <Textarea label="O - Objective" value={soap.objective} onChange={(e) => setSoap((prev) => ({ ...prev, objective: e.target.value }))} rows={3} />
                  <Textarea label="A - Assessment" value={soap.assessment} onChange={(e) => setSoap((prev) => ({ ...prev, assessment: e.target.value }))} rows={3} />
                  <Textarea label="P - Plan" value={soap.plan} onChange={(e) => setSoap((prev) => ({ ...prev, plan: e.target.value }))} rows={3} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--neutral)' }}>Auto-save terakhir: {savedAt}</span>
                    <Button onClick={handleSave}>Simpan SOAP</Button>
                  </div>
                </div>
              </TabPanel>

              <TabPanel activeTab={activeTab} tabId="orders">
                <Alert variant="info" title="Clinical Decision Support">
                  Rekomendasi order disesuaikan dengan diagnosis kerja dan profil risiko pasien.
                </Alert>
                <div style={{ marginTop: '12px', display: 'grid', gap: '10px' }}>
                  {suggestedOrders.map((order) => (
                    <div key={order.name} style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{order.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>{order.type}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Badge variant={order.priority === 'Urgent' ? 'warning' : 'info'}>{order.priority}</Badge>
                        <Button size="sm" variant="secondary">Tambahkan</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>

              <TabPanel activeTab={activeTab} tabId="therapy">
                <div style={{ display: 'grid', gap: '10px' }}>
                  {medicationTemplates.map((item) => (
                    <div key={item.name} style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '12px' }}>
                      <div style={{ fontWeight: 600, marginBottom: '6px' }}>{item.name}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                        <Input label="Dosis" value={item.dose} readOnly />
                        <Input label="Instruksi" value={item.instruction} readOnly />
                        <Button style={{ alignSelf: 'end' }}>Buat Resep</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabPanel>

              <TabPanel activeTab={activeTab} tabId="followup">
                <Alert variant="success" title="Discharge & Follow-up Planner">
                  Susun rencana pulang pasien, edukasi, dan target kontrol dari encounter yang sedang berjalan.
                </Alert>
                <div style={{ marginTop: '12px', display: 'grid', gap: '12px' }}>
                  <Textarea
                    label="Ringkasan rencana tindak lanjut"
                    value={dischargePlan}
                    onChange={(e) => setDischargePlan(e.target.value)}
                    rows={3}
                  />

                  <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '12px' }}>
                    <div style={{ fontWeight: 600, marginBottom: '8px' }}>Checklist transisi perawatan</div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {followUpChecklist.map((item) => (
                        <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input type="checkbox" checked={selectedChecklist.includes(item.id)} onChange={() => toggleChecklist(item.id)} />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--neutral)' }}>
                      {selectedChecklist.length}/{followUpChecklist.length} checklist selesai
                    </span>
                    <Button variant="secondary">Kirim ke Instruksi Pulang</Button>
                  </div>
                </div>
              </TabPanel>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
