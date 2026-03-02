import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardFooter } from '@/components/ui/card';
import { Input, Textarea } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Stepper } from '@/components/ui/stepper';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { Avatar } from '@/components/ui/avatar';

const steps = [
  { id: 'patient', label: 'Data Pasien', description: 'Verifikasi identitas pasien' },
  { id: 'service', label: 'Layanan', description: 'Pilih layanan dan poli' },
  { id: 'payment', label: 'Pembayaran', description: 'Jenis pembayaran' },
  { id: 'confirm', label: 'Konfirmasi', description: 'Review dan submit' },
];

const clinics = [
  { value: 'penyakit-dalam', label: 'Poli Penyakit Dalam' },
  { value: 'bedah', label: 'Poli Bedah' },
  { value: 'anak', label: 'Poli Anak' },
  { value: 'kebidanan', label: 'Poli Kebidanan' },
  { value: 'gigi', label: 'Poli Gigi' },
  { value: 'mata', label: 'Poli Mata' },
  { value: 'telinga', label: 'Poli THT' },
  { value: 'kulit', label: 'Poli Kulit' },
  { value: 'jiwa', label: 'Poli Jiwa' },
];

const doctors = [
  { value: 'dr-andi', label: 'dr. Andi Setiawan, Sp.PD' },
  { value: 'dr-budi', label: 'dr. Budi Pratama, Sp.B' },
  { value: 'dr-citra', label: 'dr. Citra Dewi, Sp.A' },
  { value: 'dr-dewi', label: 'dr. Dewi Lestari, Sp.OG' },
];

const timeSlots = [
  { time: '08:00', available: true },
  { time: '08:30', available: true },
  { time: '09:00', available: false },
  { time: '09:30', available: true },
  { time: '10:00', available: true },
  { time: '10:30', available: false },
  { time: '11:00', available: true },
  { time: '11:30', available: true },
  { time: '13:00', available: true },
  { time: '13:30', available: true },
  { time: '14:00', available: false },
  { time: '14:30', available: true },
];

const paymentTypes = [
  { value: 'bpjs', label: 'BPJS Kesehatan' },
  { value: 'tni', label: 'Asuransi TNI' },
  { value: 'mandiri', label: 'Mandiri (Tunai/Debit)' },
  { value: 'perusahaan', label: 'Perusahaan' },
];

export function RegistrationPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('patient');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [patientSearch, setPatientSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string;
    name: string;
    nik: string;
    age: number;
    gender: string;
    militaryStatus: string;
  } | null>(null);
  const [selectedClinic, setSelectedClinic] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [notes, setNotes] = useState('');

  const mockPatientSearch = [
    { id: 'P001', name: 'Ahmad Wijaya', nik: '3201234567890001', age: 45, gender: 'L', militaryStatus: 'Aktif' },
    { id: 'P002', name: 'Siti Rahayu', nik: '3201234567890002', age: 32, gender: 'P', militaryStatus: 'Keluarga' },
    { id: 'P003', name: 'Budi Santoso', nik: '3201234567890003', age: 28, gender: 'L', militaryStatus: 'Purnawirawan' },
  ];

  const handleNext = () => {
    const stepOrder = steps.map(s => s.id);
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder = steps.map(s => s.id);
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/patients');
  };

  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <section style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="page-header-card" style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '8px' }}>Registrasi Pasien Baru</h1>
        <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
          Daftarkan pasien untuk kunjungan rawat jalan, IGD, atau rawat inap.
        </p>
      </div>

      {/* Stepper */}
      <Card style={{ marginBottom: '24px' }}>
        <CardBody>
          <Stepper steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
        </CardBody>
      </Card>

      {/* Step Content */}
      {currentStep === 'patient' && (
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0 }}>Cari & Verifikasi Pasien</h3>
          </CardHeader>
          <CardBody>
            <Alert variant="info" style={{ marginBottom: '20px' }}>
              Masukkan NIK, MRN, atau nama pasien untuk mencari data yang sudah terdaftar.
            </Alert>

            <Input
              label="Cari Pasien"
              placeholder="Masukkan NIK / MRN / Nama..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              }
            />

            {patientSearch.length >= 3 && (
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: 'var(--fg-secondary)' }}>
                  Hasil Pencarian
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {mockPatientSearch
                    .filter(p => p.name.toLowerCase().includes(patientSearch.toLowerCase()) || 
                                 p.nik.includes(patientSearch) || 
                                 p.id.toLowerCase().includes(patientSearch.toLowerCase()))
                    .map((patient) => (
                      <div
                        key={patient.id}
                        onClick={() => setSelectedPatient(patient)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '14px 16px',
                          borderRadius: 'var(--radius)',
                          border: `2px solid ${selectedPatient?.id === patient.id ? 'var(--airforce-blue)' : 'var(--line)'}`,
                          background: selectedPatient?.id === patient.id ? 'rgba(61, 90, 128, 0.04)' : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <Avatar name={patient.name} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600 }}>{patient.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--neutral)' }}>
                            {patient.id} • NIK: {patient.nik} • {patient.age} tahun
                          </div>
                        </div>
                        <Badge variant={patient.militaryStatus === 'Aktif' ? 'success' : 'warning'}>
                          {patient.militaryStatus}
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {selectedPatient && (
              <div style={{ marginTop: '20px', padding: '16px', background: 'var(--success-light)', borderRadius: 'var(--radius)', border: '1px solid var(--success-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: 600 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Pasien terverifikasi: {selectedPatient.name}
                </div>
              </div>
            )}
          </CardBody>
          <CardFooter>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Button variant="secondary" onClick={() => navigate('/patients')}>
                Batal
              </Button>
              <Button onClick={handleNext} disabled={!selectedPatient}>
                Lanjutkan
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {currentStep === 'service' && (
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0 }}>Pilih Layanan</h3>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <Select
                label="Poliklinik"
                required
                value={selectedClinic}
                onChange={(e) => setSelectedClinic(e.target.value)}
                options={clinics}
                placeholder="Pilih poliklinik"
              />
              <Select
                label="Dokter"
                required
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                options={doctors}
                placeholder="Pilih dokter"
              />
            </div>

            <div style={{ marginTop: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>
                Pilih Jadwal <span style={{ color: 'var(--danger)' }}>*</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '8px' }}>
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    style={{
                      padding: '12px 8px',
                      border: `2px solid ${selectedTime === slot.time ? 'var(--airforce-blue)' : 'var(--line)'}`,
                      borderRadius: 'var(--radius)',
                      background: selectedTime === slot.time ? 'var(--airforce-blue)' : 
                                  !slot.available ? 'var(--bg-secondary)' : 'white',
                      color: selectedTime === slot.time ? 'white' : 
                             !slot.available ? 'var(--neutral)' : 'var(--fg)',
                      cursor: slot.available ? 'pointer' : 'not-allowed',
                      fontWeight: 600,
                      fontSize: '13px',
                      opacity: slot.available ? 1 : 0.5,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <Button variant="secondary" onClick={handleBack}>
                Kembali
              </Button>
              <Button onClick={handleNext} disabled={!selectedClinic || !selectedDoctor || !selectedTime}>
                Lanjutkan
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {currentStep === 'payment' && (
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0 }}>Metode Pembayaran</h3>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {paymentTypes.map((payment) => (
                <label
                  key={payment.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    borderRadius: 'var(--radius)',
                    border: `2px solid ${selectedPayment === payment.value ? 'var(--airforce-blue)' : 'var(--line)'}`,
                    background: selectedPayment === payment.value ? 'rgba(61, 90, 128, 0.04)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={payment.value}
                    checked={selectedPayment === payment.value}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span style={{ fontWeight: 500 }}>{payment.label}</span>
                </label>
              ))}
            </div>

            <div style={{ marginTop: '20px' }}>
              <Textarea
                label="Catatan (Opsional)"
                placeholder="Tambahkan catatan untuk kunjungan ini..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </CardBody>
          <CardFooter>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <Button variant="secondary" onClick={handleBack}>
                Kembali
              </Button>
              <Button onClick={handleNext} disabled={!selectedPayment}>
                Lanjutkan
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {currentStep === 'confirm' && (
        <Card>
          <CardHeader>
            <h3 style={{ margin: 0 }}>Konfirmasi Registrasi</h3>
          </CardHeader>
          <CardBody>
            <Alert variant="info" style={{ marginBottom: '20px' }}>
              Periksa kembali data registrasi sebelum mengkonfirmasi.
            </Alert>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--neutral)' }}>Data Pasien</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'var(--surface-secondary)', borderRadius: 'var(--radius)' }}>
                  <Avatar name={selectedPatient?.name || ''} size="lg" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '16px' }}>{selectedPatient?.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--neutral)' }}>
                      {selectedPatient?.id} • {selectedPatient?.age} tahun
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--neutral)' }}>Jadwal Kunjungan</h4>
                <div style={{ padding: '16px', background: 'var(--surface-secondary)', borderRadius: 'var(--radius)' }}>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                    {clinics.find(c => c.value === selectedClinic)?.label}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--neutral)' }}>
                    {doctors.find(d => d.value === selectedDoctor)?.label}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--airforce-blue)', fontWeight: 600, marginTop: '8px' }}>
                    Hari ini, {selectedTime}
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--neutral)' }}>Pembayaran</h4>
                <div style={{ padding: '16px', background: 'var(--surface-secondary)', borderRadius: 'var(--radius)' }}>
                  <Badge variant="info">{paymentTypes.find(p => p.value === selectedPayment)?.label}</Badge>
                </div>
              </div>

              {notes && (
                <div>
                  <h4 style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--neutral)' }}>Catatan</h4>
                  <div style={{ padding: '16px', background: 'var(--surface-secondary)', borderRadius: 'var(--radius)', fontSize: '13px' }}>
                    {notes}
                  </div>
                </div>
              )}
            </div>
          </CardBody>
          <CardFooter>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <Button variant="secondary" onClick={handleBack}>
                Kembali
              </Button>
              <Button onClick={handleSubmit} loading={isSubmitting}>
                Konfirmasi Registrasi
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </section>
  );
}
