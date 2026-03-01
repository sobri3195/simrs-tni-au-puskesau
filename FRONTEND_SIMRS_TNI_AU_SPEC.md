# Prinsip UX SIMRS TNI AU
Prinsip UX SIMRS TNI AU adalah **cepat, aman, terarah, dan tahan gangguan operasional 24/7**: setiap layar harus meminimalkan klik untuk tugas klinis kritis, menampilkan konteks pasien/unit secara konsisten, mendukung keputusan melalui status visual yang jelas (urgent, normal, blocked), serta menerapkan kontrol akses ketat berbasis peran dengan jejak audit eksplisit (termasuk break-glass) tanpa mengorbankan keterbacaan, aksesibilitas keyboard-first, dan keandalan saat koneksi tidak stabil.

## 0) Setup Siap Vercel (Next.js App Router)
### 0.1 Struktur Folder
- `app/`
  - `(auth)/login`, `(auth)/forgot-password`, `(auth)/mfa`
  - `(app)/dashboard`, `(app)/patients`, `(app)/emr`, `(app)/lab`, `(app)/radiology`, `(app)/pharmacy`, `(app)/billing`, `(app)/claims`, `(app)/logistics`, `(app)/hr`, `(app)/audit`, `(app)/reports`, `(app)/notifications`
  - `api/mock/*` (route handlers mock JSON/in-memory)
  - `api/proxy/*` (route handlers proxy ke API real)
  - `error.tsx`, `loading.tsx`, `not-found.tsx` per segmen
- `components/`
  - `ui/` (shadcn wrapper)
  - `shell/`, `tables/`, `forms/`, `charts/`, `emr/`, `security/`
- `hooks/`
  - `use-session`, `use-rbac`, `use-break-glass`, `use-query-state`, `use-offline-queue`
- `lib/`
  - `query-client`, `rbac-matrix`, `routes`, `formatters`, `audit-events`, `constants`
- `services/`
  - `api-client`, `mock-services`, `adapters`, `feature-services`
- `types/`
  - `auth`, `patient`, `encounter`, `order`, `billing`, `claim`, `inventory`, `audit`

### 0.2 Konvensi Routing
- Auth: `app/(auth)/login`, `app/(auth)/mfa`.
- App shell: `app/(app)/layout` dengan sidebar + topbar.
- Domain route contoh:
  - `app/(app)/dashboard/command`
  - `app/(app)/patients`, `app/(app)/patients/[id]`
  - `app/(app)/registrations/new`
  - `app/(app)/emr/encounters/[encounterId]`
  - `app/(app)/lab/orders`, `app/(app)/lab/results/[resultId]`
  - `app/(app)/radiology/studies/[studyId]`

### 0.3 Strategi Mock API + Switch ENV
- Mode default demo: `NEXT_PUBLIC_API_MODE=mock`.
- `services/api-client` cek mode:
  - `mock`: call `app/api/mock/*`.
  - `real`: call `app/api/proxy/*` atau langsung `NEXT_PUBLIC_API_BASE_URL` untuk endpoint publik aman.
- Route handler `api/proxy/*` untuk token server-only, header signing, penyederhanaan CORS.
- Data mock in-memory + fixture JSON; reset via endpoint admin mock (`/api/mock/reset`).

### 0.4 ENV Wajib
- Publik (client-safe):
  - `NEXT_PUBLIC_APP_NAME`
  - `NEXT_PUBLIC_APP_ENV`
  - `NEXT_PUBLIC_API_MODE` (`mock|real`)
  - `NEXT_PUBLIC_API_BASE_URL`
  - `NEXT_PUBLIC_ENABLE_ANALYTICS`
  - `NEXT_PUBLIC_SESSION_TIMEOUT_MINUTES`
- Server-only:
  - `API_PROXY_TARGET_URL`
  - `API_PROXY_SERVICE_TOKEN`
  - `AUDIT_SIGNING_KEY`
  - `ENCRYPTION_KEY_ID`

### 0.5 Build, SSR/CSR, Vercel Notes
- Build: `next build` langsung kompatibel Vercel tanpa custom server.
- SSR-friendly: dashboard komando, list pasien, laporan snapshot (SEO/internal performance).
- CSR-heavy: editor EMR, triase realtime, bed board drag-drop, notifikasi live.
- Hybrid: gunakan server component untuk initial fetch + client component untuk interaksi form/table.
- Caching: `revalidate` untuk statistik periodik; Query cache untuk user interaction.

## 1) Information Architecture
### 1.1 Sitemap (maks 3 level)
- Dashboard
  - Komando
  - Operasional
- Pasien
  - MPI Search
  - Detail Pasien
- Registrasi & ADT
  - Registrasi Baru
  - Admission/Transfer/Discharge
- Layanan Klinis
  - Rawat Jalan
  - IGD & Triase
  - Rawat Inap
  - EMR
- Penunjang
  - Lab
  - Radiologi
  - Farmasi
- Keuangan
  - Billing & Kasir
  - Klaim & Verifikasi
- Operasional RS
  - Logistik & Stok
  - SDM & Shift
- Governance
  - Audit & Compliance
  - Admin Konfigurasi
  - Laporan & Ekspor
- Kolaborasi
  - Notifikasi
  - Task/Handover

### 1.2 Sidebar Menu
- Level-1: Dashboard, Pasien, Registrasi, Layanan Klinis, Penunjang, Keuangan, Operasional RS, Governance, Kolaborasi.
- Level-2/3 hanya saat expand; state tersimpan per user.
- Badge counter: IGD waiting, lab pending, klaim ditolak, stock low.

## 2) Design System
### 2.1 Tokens
- Warna utama: `AirForce Blue`, `Navy`, `Neutral Gray`.
- Status: `Success (hijau)`, `Warning (amber)`, `Danger (merah)`, `Info (biru)`, `Restricted (ungu gelap)`.
- Triase: P1 merah, P2 kuning, P3 hijau, P0 hitam.

### 2.2 Typography
- Heading: Semibold 24/20/18.
- Body: 14/16.
- Data dense table: 12 dengan line-height 16.
- Numeric monospaced untuk vital, billing, stok.

### 2.3 Komponen Dasar
- Button (primary/secondary/destructive/ghost/icon).
- Input, Select, Combobox, DateTime picker.
- Modal (konfirmasi), Drawer (detail cepat), Sheet (filter).
- Table (TanStack) + sticky header + column pinning.
- Badge (status), Toast (global), Tabs, Stepper proses klinis.

### 2.4 State UI
- Loading: skeleton per section + shimmer baris tabel.
- Empty: ilustrasi ringkas + CTA utama.
- Error: pesan ringkas + retry + kode referensi audit.
- Success: toast + inline confirmation.
- Partial: banner “sebagian data gagal dimuat” + retry granular.

## 3) 120+ Fitur Frontend (Backlog)
> Format: **[ID] Nama** | Tujuan | Flow | Komponen | Validasi | States | RBAC | Telemetry

### A. Auth & Session (A01-A07)
- **[A01] Login Username+Password** | Akses aman pengguna | buka login→isi kredensial→submit→redirect dashboard | Form+Card+Alert | wajib isi; min password 8 | loading submit/error invalid | semua user | `auth_login_view/click_submit/success/error`
- **[A02] MFA OTP** | Verifikasi 2 langkah | login sukses→input OTP→verifikasi→masuk app | Input OTP+Timer | 6 digit; expiry | loading resend/error expired | semua user | `mfa_view/resend/verify/error`
- **[A03] Session Timeout Warning** | Cegah logout mendadak | idle→modal countdown→extend/logout | Modal+Button | extend hanya saat token valid | warning+error refresh | semua user | `session_warn/extend/logout/error`
- **[A04] Device Session List** | Kontrol sesi aktif | profil→lihat device→revoke | Table+Action menu | tidak boleh revoke current tanpa konfirmasi | empty/error load | semua user | `session_list_view/revoke/error`
- **[A05] Forced Password Change** | Kepatuhan keamanan | login awal→form ganti pass→success | Stepper+Form | kompleksitas strong | error weak/success toast | semua user | `password_force_view/submit/error`
- **[A06] Break-glass Access Request** | Akses darurat sementara | klik restricted→modal alasan→konfirmasi→akses timed | Modal+Textarea+Timer badge | alasan min 20 karakter | denied/error/active state | dokter senior, kepala ruang, admin on-call | `breakglass_open/submit/approved/denied`
- **[A07] Logout All Sessions** | Isolasi akun kompromi | security tab→logout all→redirect login | Dialog konfirmasi | wajib re-enter password | loading/error | semua user | `logout_all_click/confirm/error`

### B. Shell App & Navigation (B01-B06)
- **[B01] Responsive App Shell** | Navigasi konsisten desktop-tablet | login→shell load→menu adaptif | Sidebar+Topbar+Breadcrumb | n/a | loading skeleton shell | semua user | `shell_view/menu_toggle/error`
- **[B02] Command Palette** | Akses cepat modul | `Ctrl+K`→ketik→enter route | Combobox+Shortcut | min 2 char | empty “tak ditemukan” | semua user sesuai RBAC | `palette_open/search/select`
- **[B03] Global Search Context** | Cari pasien/order cepat | topbar search→hasil grouped→jump | Search overlay+Tabs | format MRN valid | loading/error | role klinis/administratif | `global_search_view/query/open_result`
- **[B04] Recent Pages** | Kembali ke halaman terakhir | topbar→recent list→klik | Dropdown list | max 20 item | empty list | semua user | `recent_view/open`
- **[B05] Theme + Density Switch** | Kenyamanan baca | settings UI→ubah mode | Toggle+Radio | n/a | instant preview | semua user | `ui_pref_change`
- **[B06] Unit Context Switcher** | Ganti unit kerja aktif | pilih unit→refresh permission scope | Select+Badge | unit harus authorized | error unauthorized | multi-unit staff | `unit_switch/open/confirm/error`

### C. Dashboard Komando/Operasional (C01-C06)
- **[C01] Command KPI Board** | Monitor KPI RS real-time | buka dashboard→filter tanggal→lihat KPI | Card+Recharts+Filters | tanggal valid | partial data banner | komandan/kepala RS read-only | `kpi_view/filter/export`
- **[C02] Bed Occupancy Heatmap** | Lihat okupansi per ruang | dashboard→tab bed→hover detail | Heatmap+Tooltip | n/a | loading chart | manajemen, kepala ruang | `bed_heatmap_view/hover`
- **[C03] IGD Queue Monitor** | Pantau antrean emergensi | tab IGD→sort urgency→open patient | Table+Badge | n/a | empty no queue | IGD, komando | `ed_queue_view/sort/open`
- **[C04] SLA Alert Panel** | Deteksi keterlambatan layanan | panel alert→ack/escalate | List+Action buttons | alasan escalate wajib | error ack | supervisor | `sla_view/ack/escalate/error`
- **[C05] Financial Snapshot** | Ringkasan pendapatan harian | tab finansial→banding target | Cards+Trend chart | n/a | partial unavailable | kasir lead, manajemen | `finance_snapshot_view`
- **[C06] Outbreak Signal Widget** | Waspada lonjakan kasus | widget→lihat diagnosis cluster | Line chart+Map placeholder | n/a | warning data quality | komando, IPCN | `outbreak_widget_view/open`

### D. MPI & Search (D01-D06)
- **[D01] Patient Global Search** | Temukan pasien cepat | input NIK/MRN/nama→hasil→open detail | Search+Table | minimal 3 char | empty/error | semua role klinis/admin | `patient_search_query/open/error`
- **[D02] Duplicate Detection** | Kurangi duplikasi pasien | create pasien→sistem tampil kandidat→merge/new | Modal compare+Table | NIK 16 digit | warning duplicate | pendaftaran | `mpi_duplicate_view/merge/skip`
- **[D03] Patient Summary Card** | Ringkasan identitas/kritis | buka detail→lihat summary sticky | Card+Badges | n/a | fallback data missing | klinis/admin | `patient_summary_view`
- **[D04] Military Affiliation Tagging** | Tandai status kedinasan | edit profil→pilih afiliasi | Form select | wajib pilih kategori | error invalid | pendaftaran/admin | `mil_affiliation_update`
- **[D05] Family/Guarantor Links** | Kelola penjamin keluarga | detail→tab relasi→add/edit | Table+Drawer form | nomor kontak valid | empty relations | pendaftaran/kasir | `guarantor_view/add/edit/error`
- **[D06] Deceased Marker UI** | Hindari layanan salah | status meninggal→banner lock actions | Banner+Locked buttons | alasan status wajib | restricted state | admin medis | `patient_deceased_marked`

### E. Registrasi & ADT (E01-E06)
- **[E01] New Registration Wizard** | Registrasi cepat dan tepat | pilih pasien→isi layanan→konfirmasi | Stepper+Form | field wajib poli/pembayaran | loading submit/error | pendaftaran | `reg_new_start/submit/error`
- **[E02] Appointment Slot Picker** | Pilih jadwal dokter | pilih poli→lihat slot→book | Calendar grid+chips | slot tidak boleh lampau | empty no slot | pendaftaran/pasien desk | `slot_view/book/error`
- **[E03] Admission Request** | Proses rawat inap | encounter→admit→pilih kelas/ruang | Drawer+Bed preview | indikasi wajib | no bed error | dokter, admisi | `admit_request_create/error`
- **[E04] Transfer Antar Ruang** | Mutasi pasien aman | pilih pasien inap→transfer→handover note | Modal+Form | note wajib min 10 char | blocked no permission | perawat, admisi | `transfer_start/submit/error`
- **[E05] Discharge Checklist** | Pulang terkontrol | discharge tab→ceklist→finalisasi | Checklist+Signature placeholder | seluruh item wajib centang | warning item pending | dokter/perawat | `discharge_view/complete/error`
- **[E06] Bed Reservation Queue** | Kelola antrean bed | open queue→prioritas→assign bed | Table drag-sort+action | prioritas numerik valid | empty queue | admisi/kepala ruang | `bed_queue_view/reorder/assign`

### F. Rawat Jalan (F01-F06)
- **[F01] Clinic Queue Board** | Pantau antrean poli | pilih poli→lihat antrian→panggil | Table+status badge | n/a | empty queue | perawat poli/dokter | `clinic_queue_view/call`
- **[F02] Visit Check-in** | Konfirmasi kedatangan | cari pasien→check-in→status hadir | Button action+toast | belum check-in sebelumnya | error duplicate | pendaftaran/poli | `visit_checkin_click/error`
- **[F03] SOAP Quick Entry** | Catatan klinis cepat | buka encounter→isi SOAP→save draft/final | Tabs+Textarea+templates | assessment wajib saat final | draft/saved/error | dokter | `soap_view/save_draft/final/error`
- **[F04] Procedure Consent Capture** | Persetujuan tindakan | pilih tindakan→preview consent→capture | Modal+PDF viewer placeholder | pasien/keluarga wajib isi nama | error incomplete | dokter/perawat | `consent_open/submit/error`
- **[F05] Follow-up Scheduling** | Jadwal kontrol | selesai visit→set kontrol→kirim pengingat | Date picker+select | tanggal > hari ini | warning slot full | dokter/admin poli | `followup_create/error`
- **[F06] Referral Outbound UI** | Rujukan keluar | klik rujuk→isi RS tujuan→generate letter | Form+preview | diagnosis+alasan wajib | error field missing | dokter | `referral_create/print/error`

### G. IGD & Triase (G01-G06)
- **[G01] Triage Form ESI** | Prioritas pasien IGD | pasien masuk→isi triase→set level | Form+color badge | vital wajib | critical warning | perawat IGD | `triage_open/submit/error`
- **[G02] Trauma Checklist** | Standardisasi trauma | pilih protokol→cek item→mark selesai | Checklist+timer | item kritis wajib | partial pending | dokter/perawat IGD | `trauma_checklist_view/complete`
- **[G03] Resus Timeline** | Catat tindakan detik-menit | resus mode→add event→timeline update | Timeline+quick buttons | timestamp otomatis | offline queue | tim IGD | `resus_event_add/error`
- **[G04] Emergency Lab/Rad Fast Order** | Pesan penunjang cepat | klik fast order→pilih panel→submit | Drawer+chips | minimal 1 order | loading submit | dokter IGD | `fast_order_open/submit/error`
- **[G05] Critical Alert Broadcast** | Notifikasi pasien kritis | flag critical→kirim ke unit terkait | Modal+recipient chips | alasan wajib | retry failed recipients | IGD supervisor | `critical_alert_send/error`
- **[G06] IGD Disposition** | Tentukan tindak lanjut | selesai evaluasi→pilih pulang/rawat/rujuk | Radio cards+summary | keputusan wajib | warning pending order | dokter IGD | `ed_disposition_submit/error`

### H. Rawat Inap & Bed Management (H01-H06)
- **[H01] Ward Census Board** | Lihat status pasien per ruang | buka ward→filter ruangan→open bed | Kanban bed+table | n/a | loading | kepala ruang/perawat | `ward_board_view/filter`
- **[H02] Bed Cleaning Status** | Sinkron housekeeping | discharge→status dirty→mark clean | Badge cycle+actions | transisi status valid | blocked invalid transition | housekeeping, admisi | `bed_clean_update/error`
- **[H03] Nurse Handover Sheet** | Operan shift akurat | pilih shift→isi handover→submit | Form+accordion pasien | mandatory high-risk notes | draft/error | perawat | `handover_view/submit/error`
- **[H04] Isolation Room Indicator** | Kontrol infeksi | pasien isolasi→icon khusus+rules | Badge+tooltip | n/a | restricted warning | klinis/logistik | `isolation_flag_view`
- **[H05] Daily Rounding List** | Daftar visit harian | generate list→cek pasien→mark visited | Checklist table | n/a | empty no patients | dokter/perawat | `rounding_list_view/mark`
- **[H06] Fall Risk Board** | Pencegahan jatuh | skor risiko→badge→task pencegahan | Score badge+tasks | skala risiko valid | alert high risk | perawat | `fallrisk_view/update`

### I. EMR (I01-I06)
- **[I01] Problem List Manager** | Kelola diagnosis aktif | tab problem→add/edit/resolve | Table+drawer form | ICD required | empty/error | dokter | `problemlist_view/add/resolve`
- **[I02] Medication Reconciliation** | Cegah mismatch obat | masuk/keluar→bandingkan obat→konfirmasi | Compare table+toggle | status tiap item wajib | warning conflicts | dokter/apoteker | `medrec_view/confirm/error`
- **[I03] Order Entry CPOE** | Entry order terstruktur | pilih order set→edit parameter→submit | Form+search+panels | dosis/frekuensi wajib | submit error inline | dokter | `cpoe_open/submit/error`
- **[I04] Vital Signs Trend** | Pantau tren vital | tab vital→pilih rentang→lihat chart | Recharts line+table | n/a | no data | dokter/perawat | `vital_trend_view/filter`
- **[I05] Clinical Notes Versioning** | Lacak revisi catatan | buka note→history→compare version | Diff viewer+timeline | alasan revisi wajib | error load history | dokter | `note_history_view/restore`
- **[I06] Discharge Summary Composer** | Ringkasan pulang standar | template auto→edit→sign | Rich text minimal+sections | diagnosis/followup wajib | draft/final states | dokter | `discharge_summary_view/sign/error`

### J. Penunjang Lab (J01-J06)
- **[J01] Lab Order Worklist** | Kelola order lab | buka worklist→filter status→ambil order | Table+filters | n/a | empty | analis lab | `lab_worklist_view/filter/open`
- **[J02] Specimen Collection Tracking** | Lacak sampel | collect→label print placeholder→status transit | Stepper+status chips | waktu koleksi wajib | delay warning | perawat/lab | `specimen_collect/update/error`
- **[J03] Result Entry Form** | Input hasil terstruktur | open order→isi parameter→validasi | Dynamic form table | range numeric valid | error invalid range | analis lab | `lab_result_entry/submit/error`
- **[J04] Critical Value Alert** | Eskalasi hasil kritis | nilai kritis detect→modal konfirmasi call | Alert modal+log form | penerima + waktu wajib | retry notification | lab supervisor | `critical_value_detect/notify/error`
- **[J05] Result Validation Queue** | Verifikasi sebelum rilis | queue→review→approve/reject | Table+drawer | alasan reject wajib | empty queue | dokter patologi klinik | `lab_validate_view/approve/reject`
- **[J06] Trend Comparison Viewer** | Bandingkan hasil historis | open result→tab trend | Chart+table toggle | n/a | no prior data | dokter | `lab_trend_view`

### K. Radiologi (K01-K06)
- **[K01] RIS Order List** | Daftar order radiologi | list order→assign modality | Table+action menu | modality wajib | loading/error | radiografer | `ris_order_view/assign`
- **[K02] Study Scheduling Board** | Atur jadwal pemeriksaan | calendar view→drag slot→confirm | Calendar+drawer | jadwal conflict check | warning overlap | radiologi admin | `study_schedule_view/move/error`
- **[K03] Prep Checklist** | Persiapan pasien aman | open study→cek kontraindikasi | Checklist+badge | item wajib sesuai modality | blocked if incomplete | radiografer | `prep_checklist_complete/error`
- **[K04] Viewer Placeholder + Metadata** | Tampilkan info studi | open study→viewer placeholder→metadata | Split panel+tabs | n/a | no image placeholder | radiolog/dokter | `study_view_open`
- **[K05] Report Dictation Template** | Laporan cepat | pilih template→isi impression→sign | Form+template chips | impression wajib | draft/error | radiolog | `rad_report_create/sign/error`
- **[K06] Critical Finding Notification** | Notif temuan gawat | flag critical→pilih penerima→kirim | Modal+recipient list | alasan wajib | retry failed | radiolog | `critical_finding_send/error`

### L. Farmasi (L01-L06)
- **[L01] Prescription Queue** | Antrian resep farmasi | list resep→prioritaskan→proses | Table+priority badge | n/a | empty | apoteker | `rx_queue_view/prioritize`
- **[L02] Drug Interaction Checker UI** | Cek interaksi obat | open resep→jalankan checker→lihat alert | Panel+badges | n/a | warning severity | apoteker/dokter | `interaction_check_run/open_alert`
- **[L03] Dispensing Workflow** | Penyerahan obat akurat | verifikasi→pick-pack→dispense | Stepper+scan input | qty >0; batch required | error mismatch | apoteker | `dispense_start/complete/error`
- **[L04] Substitute Suggestion** | Alternatif stok kosong | item OOS→lihat substitusi→approve | Modal+table | substitusi setara wajib | blocked if no substitute | apoteker/dokter | `substitute_view/approve`
- **[L05] Counseling Record** | Dokumentasi edukasi obat | setelah dispense→isi counseling | Form+checkbox | poin edukasi wajib 3+ | incomplete warning | apoteker | `counseling_submit/error`
- **[L06] Controlled Drug Log UI** | Pengawasan obat ketat | tab narkotika→input keluar/retur | Ledger table+form | alasan + nomor dok wajib | audit warning | apoteker supervisor | `controlled_drug_log_add/error`

### M. Billing & Kasir (M01-M06)
- **[M01] Charge Capture Timeline** | Lihat sumber biaya | open encounter billing→timeline item | Timeline+table | n/a | partial charge warning | kasir, verifikator | `charge_timeline_view`
- **[M02] Invoice Draft & Finalize** | Buat tagihan final | review item→apply discount→finalize | Table+summary card | diskon perlu otorisasi | error unauthorized | kasir | `invoice_finalize/error`
- **[M03] Payment Multi-Method** | Terima pembayaran fleksibel | pilih metode→input nominal→submit | Tabs+form | total harus match | error insufficient | kasir | `payment_submit/error`
- **[M04] Deposit Management** | Kelola deposit pasien | top-up/refund→konfirmasi | Form+ledger | nominal >0 | warning low balance | kasir | `deposit_update/error`
- **[M05] Receipt Reprint Control** | Cetak ulang terkontrol | cari transaksi→reprint→alasan | Table+dialog | alasan wajib | audit prompt | kasir supervisor | `receipt_reprint/error`
- **[M06] Financial Exception Queue** | Tangani anomali tagihan | queue→review mismatch→resolve | Table+drawer | resolution note wajib | empty queue | kasir lead/auditor | `finance_exception_view/resolve`

### N. Klaim/Verifikasi (N01-N06)
- **[N01] Claim Document Checklist** | Kelengkapan berkas klaim | buka klaim→cek dokumen→mark lengkap | Checklist+status badge | item mandatory | warning missing docs | verifikator klaim | `claim_checklist_view/complete`
- **[N02] Coding Review UI** | Validasi coding diagnosis/tindakan | bandingkan EMR vs coding | Split table+highlights | code format valid | error invalid code | coder/verifikator | `coding_review_submit/error`
- **[N03] Claim Submission Batch** | Kirim klaim massal | pilih klaim→submit batch | Table select+progress | hanya status ready | partial failed items | verifikator | `claim_batch_submit/error`
- **[N04] Rejection Handling Board** | Tindak klaim ditolak | tab rejection→assign task→resubmit | Kanban+drawer | alasan resubmit wajib | retry state | verifikator/head | `claim_reject_view/resubmit`
- **[N05] Dispute Timeline** | Lacak sengketa klaim | open claim→timeline komunikasi | Timeline+attachments | note wajib saat update | empty timeline | verifikator/manajemen | `claim_dispute_view/update`
- **[N06] Payer SLA Monitor** | Pantau SLA per penjamin | dashboard SLA→filter payer | Chart+table | n/a | partial data | manajemen klaim | `payer_sla_view/filter`

### O. Logistik & Stok (O01-O06)
- **[O01] Inventory Dashboard** | Pantau stok kritis | open logistik→lihat KPI stok | Cards+charts | n/a | loading | logistik, manajemen | `inventory_dashboard_view`
- **[O02] Stock Card Ledger** | Riwayat mutasi barang | pilih item→lihat ledger | Table+filters | date range valid | empty ledger | logistik | `stock_ledger_view/filter`
- **[O03] Purchase Request UI** | Ajukan pengadaan | create PR→isi item→submit | Form+table item | qty/justification wajib | error invalid qty | unit requester | `purchase_request_submit/error`
- **[O04] Inter-Unit Transfer** | Pindah stok antar unit | pilih sumber/tujuan→item→approve | Stepper+table | stok cukup | blocked insufficient | logistik supervisor | `stock_transfer_submit/error`
- **[O05] Expiry Watchlist** | Cegah barang kedaluwarsa | tab expiry→sort by date→create action | Table+badges | n/a | warning near-expiry | logistik/farmasi | `expiry_watchlist_view/action`
- **[O06] Stock Opname Session** | Stok opname periodik | start session→count→reconcile | Wizard+variance table | count non-negative | mismatch warning | logistik auditor | `stock_opname_start/reconcile`

### P. SDM & Jadwal Shift (P01-P06)
- **[P01] Shift Roster Calendar** | Susun jadwal shift | pilih unit→drag assign staff | Calendar+drawer | konflik jam dicek | warning overlap | kepala ruang/HR | `roster_view/assign/error`
- **[P02] Leave Request Approval** | Persetujuan cuti | queue request→approve/reject | Table+actions | alasan reject wajib | empty queue | atasan/HR | `leave_approve/reject/error`
- **[P03] Competency Matrix View** | Cek kompetensi staf | pilih staf→lihat sertifikasi | Matrix table+badges | n/a | missing data state | kepala unit/HR | `competency_view`
- **[P04] On-call Assignment** | Atur petugas jaga | on-call tab→assign→publish | Form+timeline | minimal 1 per shift | error publish | kepala unit | `oncall_assign/publish/error`
- **[P05] Attendance Correction UI** | Koreksi absensi | pilih record→ajukan koreksi | Form+attachment | alasan wajib | pending approval | staff/HR | `attendance_correction_submit`
- **[P06] Shift Handover Compliance** | Audit operan shift | dashboard→lihat completion rate | Chart+table | n/a | partial data | kepala ruang/auditor | `handover_compliance_view`

### Q. Audit & Compliance (Q01-Q06)
- **[Q01] Audit Trail Explorer** | Telusur aktivitas user | filter user/waktu→lihat event | Table+advanced filters | date range required | empty result | auditor/IT admin | `audit_explorer_view/filter/export`
- **[Q02] Sensitive Field Access Log** | Pantau akses data sensitif | tab sensitive access→review | Table+severity badges | n/a | alert high volume | auditor | `sensitive_log_view`
- **[Q03] Break-glass Review Queue** | Tinjau akses darurat | queue→approve/flag misuse | Table+detail drawer | review note wajib | empty queue | auditor, komando | `breakglass_review/flag`
- **[Q04] Policy Acknowledgement Prompt** | Kepatuhan kebijakan | login→modal kebijakan→accept | Modal+checkbox | wajib centang | block access if reject | semua user | `policy_prompt_accept/reject`
- **[Q05] Data Export Approval Gate** | Kontrol ekspor data | user minta export→approval flow | Dialog+status tracker | alasan bisnis wajib | pending state | supervisor/auditor | `export_request_submit/approve`
- **[Q06] Incident Log UI** | Catat insiden keamanan | create incident→assign severity | Form+timeline | severity wajib | error submit | IT admin/auditor | `incident_create/update/error`

### R. Admin Konfigurasi (R01-R06)
- **[R01] Role & Permission Matrix** | Kelola RBAC granular | pilih role→toggle permission→save | Matrix table+sticky cols | minimal 1 permission | error conflicts | IT admin | `rbac_matrix_view/save/error`
- **[R02] Master Data Dictionary** | Atur referensi sistem | tab master→CRUD item | Table+drawer form | kode unik wajib | duplicate error | admin konfigurasi | `masterdata_crud/error`
- **[R03] Clinic Schedule Settings** | Atur jadwal poli | pilih poli→set jam & kuota | Form+calendar | jam akhir > jam awal | overlap warning | admin pendaftaran | `clinic_schedule_save/error`
- **[R04] Notification Template Manager** | Kelola template notifikasi | list template→edit preview→publish | Editor+preview | placeholder valid | error invalid token | admin komunikasi | `notif_template_publish/error`
- **[R05] Feature Flag Console** | Aktif/nonaktif fitur | tab flags→toggle env | Table+switch | critical flag need confirm | loading state | IT admin | `feature_flag_toggle/error`
- **[R06] Integration Endpoint Health UI** | Cek status integrasi | health dashboard→lihat endpoint | Status cards+history | n/a | degraded warning | IT admin | `integration_health_view`

### S. Laporan & Ekspor (S01-S06)
- **[S01] Report Catalog** | Akses laporan terstruktur | buka laporan→pilih kategori | Card grid+filters | n/a | empty no access | manajemen/auditor | `report_catalog_view/open`
- **[S02] Parameterized Report Builder** | Atur parameter laporan | pilih report→isi parameter→generate | Form+preview | periode wajib | error invalid period | authorized users | `report_generate/error`
- **[S03] Scheduled Export Setup** | Jadwalkan export periodik | create schedule→set kanal→save | Form+cron-like UI | frekuensi valid | warning timezone | manajemen/IT | `schedule_export_save/error`
- **[S04] Large Export Progress** | Pantau progress export besar | start export→lihat progress→download | Progress bar+toast | n/a | fail retry | authorized users | `export_start/progress/download/error`
- **[S05] Executive Dashboard PDF Snapshot** | Snapshot untuk pimpinan | dashboard→generate PDF | Button+status | n/a | partial render warning | komandan/kepala RS | `exec_pdf_generate/error`
- **[S06] Data Lineage Note Panel** | Transparansi asal data | open report→lihat lineage | Side panel+table | n/a | missing source warning | auditor/manajemen | `lineage_panel_view`

### T. Notifikasi & Task/Handover (T01-T06)
- **[T01] Notification Center** | Pusat notifikasi lintas modul | bell icon→list notif→open context | List+tabs+badges | n/a | empty inbox | semua user | `notif_center_view/open_item`
- **[T02] Ack Notification** | Konfirmasi baca kritis | notif critical→ack dengan catatan | Modal+textarea | catatan wajib utk critical | retry ack | role penerima | `notif_ack_submit/error`
- **[T03] Task Assignment Board** | Delegasi tugas antar role | create task→assign→track status | Kanban+drawer | due date wajib | overdue warning | supervisor/unit lead | `task_create/assign/complete`
- **[T04] Shift Handover Inbox** | Terima tugas antar shift | masuk shift→lihat handover→accept | Inbox list+actions | n/a | empty state | perawat/dokter jaga | `handover_inbox_view/accept`
- **[T05] Escalation Rules UI** | Atur eskalasi otomatis | settings→buat rule→aktifkan | Form builder+table | target role wajib | conflict warning | admin/unit lead | `escalation_rule_save/error`
- **[T06] Personal Reminder Panel** | Pengingat tindakan pribadi | my reminders→snooze/done | List+quick actions | n/a | empty reminders | semua user | `reminder_view/snooze/done`

> Total fitur: **120 fitur** (20 modul × 6 fitur).

## 4) UX Flows End-to-End (10)
1. **Registrasi Rawat Jalan Lengkap**: Login → MPI Search → Registrasi Baru → Queue Poli → SOAP → Order Lab → Hasil Lab → Resep → Billing → Checkout Pulang. CTA: `Daftarkan`, `Simpan SOAP`, `Order`, `Finalisasi Tagihan`.
2. **IGD Kritis**: IGD Queue → Triase ESI → Resus Timeline → Fast Order Lab/Rad → Disposition (admit) → Bed Assignment. CTA: `Set ESI`, `Tambah Event`, `Admit`.
3. **Rawat Inap Transfer**: Ward Board → Transfer Request → Bed Queue → Handover Sheet → Confirm Transfer. CTA: `Transfer`, `Kirim Operan`.
4. **Lab Kritis**: Lab Worklist → Result Entry → Critical Value Alert → Dokter Ack → EMR update. CTA: `Validasi`, `Kirim Alert`, `Acknowledge`.
5. **Radiologi Hingga Laporan**: RIS Order List → Schedule → Prep Checklist → Study Viewer → Report Sign → Notify Critical Finding. CTA: `Assign`, `Sign Report`.
6. **Farmasi Dispensing**: Prescription Queue → Interaction Check → Substitute (jika OOS) → Dispense → Counseling Record. CTA: `Proses Resep`, `Dispense`.
7. **Billing Multimetode**: Charge Timeline → Invoice Finalize → Payment Multi-Method → Receipt/Reprint Control. CTA: `Finalisasi`, `Bayar`, `Cetak`.
8. **Klaim Ditolak**: Claim Rejection Board → Coding Review → Resubmit Batch → Dispute Timeline Update. CTA: `Perbaiki`, `Resubmit`.
9. **Audit Break-Glass**: Sensitive Record Open → Break-glass Modal → Timed Access → Break-glass Review Queue. CTA: `Minta Akses`, `Review`.
10. **Komando Harian**: Dashboard Komando → Bed Heatmap → SLA Alerts Ack → Export Executive Snapshot. CTA: `Ack Alert`, `Ekspor PDF`.

## 5) Keamanan Frontend (SIMRS Militer)
- **Masking sensitif**: NIK/nomor kontak default masked (`****1234`), unmask dengan hover+permission check + log event.
- **Auto-logout**: idle timer + warning 2 menit; lock screen sebelum logout final.
- **Session renewal UI**: silent refresh indicator kecil; jika gagal tampil modal “Sesi berakhir, login ulang”.
- **Break-glass modal**: wajib alasan min 20 karakter, durasi akses tampil countdown badge, prompt konfirmasi audit.
- **Audit prompt**: aksi sensitif (reprint, export, unmask) selalu minta alasan singkat.
- **Restricted field UI**: field terkunci tampil ikon `lock` + label “Restricted by Role” + tooltip alasan kebijakan.
- **Clipboard control UX**: tombol copy data sensitif dinonaktifkan bila role tidak sesuai, tampil helper text.
- **Watermark sesi**: username+unit pada layar sensitif untuk deterrence screenshot.

## 6) Performance & Reliability (Vercel-friendly)
- Skeleton loading granular (card, tabel, form section).
- Pagination server-style + virtualized table untuk dataset besar.
- React Query strategy:
  - staleTime: master data 10 menit, queue 30 detik, dashboard 15 detik.
  - retry: 2x exponential backoff untuk read; write no auto-retry kecuali idempotent.
  - background refetch saat window focus untuk queue kritis.
- Optimistic update: ack notifikasi, mark task done, reorder queue.
- Offline-friendly minimal: queue draft (SOAP, handover, note audit) di local storage terenkripsi ringan; flush saat online.
- Error handling:
  - `error.tsx` per route segment.
  - Global toast error bus dengan kode error.
  - Retry button inline untuk section gagal.
  - Fallback readonly mode bila endpoint write down.

## 7) Deliverables
### 7.1 Contoh Backlog Epic → Feature → User Story (2 Epic)
**Epic 1: Frontend Clinical Workflow IGD-to-Discharge**
- Feature: Triase ESI Form, Resus Timeline, Fast Order, Disposition.
- User Story:
  - Sebagai perawat IGD, saya ingin menetapkan level triase dalam <60 detik agar pasien kritis diprioritaskan.
  - Sebagai dokter IGD, saya ingin membuat fast order lab/rad dari satu panel agar waktu tunggu keputusan klinis turun.
  - Sebagai kepala ruang, saya ingin melihat permintaan admit realtime agar penempatan bed lebih cepat.

**Epic 2: Frontend Governance & Security Assurance**
- Feature: Break-glass Modal, Audit Explorer, Sensitive Field Masking, Export Approval.
- User Story:
  - Sebagai auditor, saya ingin melihat semua akses break-glass beserta alasan agar kepatuhan terjaga.
  - Sebagai IT admin, saya ingin menerapkan matrix permission granular agar data sensitif tidak bocor lintas unit.
  - Sebagai kepala RS, saya ingin hanya melihat dashboard read-only agar keputusan strategis tetap aman.

### 7.2 Definition of Done (Frontend)
- UI sesuai design tokens + komponen standar.
- Semua state (loading/empty/error/success/partial) tersedia.
- Validasi form RHF+Zod lengkap + pesan error jelas.
- RBAC guard route + komponen aksi tervalidasi.
- Event telemetry view/click/submit/error terpasang.
- A11y minimum: navigasi keyboard, label ARIA dasar, kontras AA.
- Error boundary per route dan global toast bekerja.
- Mock API mode berjalan end-to-end untuk demo.
- Dokumentasi route & env diperbarui.
- UAT role utama (dokter/perawat/admin/kasir/auditor/komando) lulus.

### 7.3 Checklist QA UI (20 poin)
1. Login, MFA, logout normal.
2. Timeout warning muncul tepat waktu.
3. Sidebar collapse/expand konsisten.
4. Command palette berfungsi keyboard-only.
5. Semua form wajib tampil error inline.
6. Tabel besar tetap smooth saat scroll.
7. Sorting/filter/pagination konsisten.
8. Badge status sesuai semantic color.
9. Empty state punya CTA relevan.
10. Error state punya retry.
11. Break-glass wajib alasan.
12. Restricted field terkunci + tooltip alasan.
13. Audit prompt tampil pada aksi sensitif.
14. Notifikasi critical wajib ack.
15. Optimistic update rollback saat gagal.
16. Offline draft tersimpan & sinkron saat online.
17. Route error boundary menampilkan fallback benar.
18. Tablet layout tidak pecah pada modul utama.
19. Kontras teks memenuhi minimal AA.
20. Telemetry event tercatat untuk view/click/submit/error.
