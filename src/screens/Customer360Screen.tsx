import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Eye,
  CheckCircle,
  MessageSquare,
  Phone,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  TrendingDown,
  ArrowRight,
  Sparkles,
  FileText,
  Lock,
  ChevronRight
} from 'lucide-react';
import { DEMO_CUSTOMER_360 } from '../data/mockData';
import { ScreenId } from '../types';

interface Customer360ScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onOpenAgentModal: (prompt?: string) => void;
  onShowToast: (msg: string) => void;
}

export const Customer360Screen: React.FC<Customer360ScreenProps> = ({
  onNavigateToScreen,
  onOpenAgentModal,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<
    'ringkasan' | 'produk' | 'layanan' | 'interaksi' | 'keluhan' | 'lokasi' | 'rekomendasi'
  >('ringkasan');
  const [searchQuery, setSearchQuery] = useState('');
  const [customer, setCustomer] = useState(DEMO_CUSTOMER_360);

  const customerList = [
    { id: 'CUST-JTG-008421', name: 'R*** S******', segment: 'High Value — At Risk', risk: 81, val: 88, area: 'Semarang Timur' },
    { id: 'CUST-JTG-007192', name: 'B*** H******', segment: 'High Value Loyal', risk: 24, val: 92, area: 'Kota Surakarta' },
    { id: 'CUST-JTG-006540', name: 'S*** M******', segment: 'Growing Customer', risk: 38, val: 76, area: 'Banyumas' },
    { id: 'CUST-JTG-009104', name: 'A*** W******', segment: 'High Value — At Risk', risk: 79, val: 85, area: 'Kudus Selatan' }
  ];

  const timelineEvents = [
    {
      date: '28 Ags 2026, 14.20 WIB',
      type: 'interaction',
      title: 'WhatsApp Response Terkirim',
      desc: 'Pelanggan membaca dan membalas konfirmasi jadwal konsultasi.',
      badge: 'Respon Positif'
    },
    {
      date: '15 Ags 2026, 09.30 WIB',
      type: 'complaint',
      title: 'Tiket Keluhan #TKT-8842',
      desc: 'Keluhan waktu tunggu antrean di Outlet Semarang Pandanaran (>35 menit).',
      badge: 'Dalam Proses'
    },
    {
      date: '12 Ags 2026, 11.15 WIB',
      type: 'transaction',
      title: 'Transaksi Retail Reguler',
      desc: 'Transaksi senilai Rp4.200.000 (penurunan volume -25% vs rata-rata).',
      badge: 'Selesai'
    },
    {
      date: '24 Jul 2026, 10.00 WIB',
      type: 'campaign',
      title: 'Campaign Pengingat Layanan',
      desc: 'Pesan otomatis disalurkan via WhatsApp Bisnis Terverifikasi.',
      badge: 'Terkirim'
    }
  ];

  const handlePrepareAction = () => {
    onShowToast('Aktivitas disiapkan dan ditambahkan ke draf Campaign & Omnichannel.');
    onNavigateToScreen('campaign-omnichannel');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
              Pelanggan 360
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-[#15324B] font-semibold border border-slate-300 flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#607080]" />
              <span>Data Terbatas · Masking Otomatis</span>
            </span>
          </div>
          <p className="text-xs text-[#607080]">
            Profil identitas aman, riwayat layanan, probabilitas risiko, dan rekomendasi Next Best Action.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateToScreen('explainability')}
            className="px-3 py-2 bg-white border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Lihat Penjelasan SHAP</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Customer Selector (Left 3 cols) + Center Profile (6 cols) + Right Next Best Action (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Customer Search & List (3 cols) */}
        <div className="lg:col-span-3 bg-white border border-[#DDE3EA] rounded-xl p-3.5 flex flex-col h-[640px]">
          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 text-[#607080] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari ID Masking..."
              className="w-full bg-[#F5F7FA] border border-[#DDE3EA] focus:border-[#2563EB] text-xs text-[#17212B] rounded-lg pl-8 pr-3 py-1.5 outline-none transition-all"
            />
          </div>

          <div className="text-[11px] font-semibold text-[#607080] mb-2 px-1">
            DAFTAR SAMPEL PELANGGAN
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {customerList.map((c) => {
              const isSelected = c.id === customer.maskedId;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    if (c.id === DEMO_CUSTOMER_360.maskedId) {
                      setCustomer(DEMO_CUSTOMER_360);
                    }
                  }}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#2563EB] bg-blue-50/50 shadow-2xs'
                      : 'border-[#DDE3EA] bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-[#17212B]">
                    <span>{c.name}</span>
                    <span className="text-[10px] text-[#607080] font-mono">{c.id}</span>
                  </div>
                  <div className="text-[11px] text-[#607080] mt-0.5">{c.segment}</div>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="text-[#607080]">{c.area}</span>
                    <span
                      className={`font-semibold px-1.5 py-0.2 rounded ${
                        c.risk > 70
                          ? 'bg-rose-50 text-[#C73E3A]'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      Risiko Churn: {c.risk}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#DDE3EA] text-[10px] text-[#607080]">
            Format ID dan nama pelanggan otomatis disamarkan sesuai regulasi PDP.
          </div>
        </div>

        {/* Center Column: Main Customer Profile & Tabs (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-[#DDE3EA] rounded-xl flex flex-col h-[640px] overflow-hidden">
          {/* Identity Header */}
          <div className="p-5 border-b border-[#DDE3EA] bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#15324B] text-white flex items-center justify-center font-bold text-base shadow-sm">
                RS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-[#17212B]">{customer.maskedName}</h2>
                  <span className="font-mono text-xs text-[#607080] bg-slate-200/60 px-2 py-0.5 rounded">
                    {customer.maskedId}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#607080] mt-0.5">
                  <span className="flex items-center gap-1 text-[#17212B] font-medium">
                    <MapPin className="w-3 h-3 text-[#2563EB]" />
                    {customer.area}, {customer.kabupaten}
                  </span>
                  <span>·</span>
                  <span>Masa Hubungan: {customer.tenureMonths} Bulan</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-[#D97706] text-xs font-bold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{customer.segment}</span>
              </span>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-4 border-b border-[#DDE3EA] bg-[#F5F7FA] text-xs divide-x divide-[#DDE3EA]">
            <div className="p-2.5 text-center">
              <div className="text-[10px] text-[#607080]">Skor Nilai Pelanggan</div>
              <div className="text-sm font-bold text-[#2563EB] tabular-nums mt-0.5">
                {customer.customerValueScore} / 100
              </div>
            </div>

            <div className="p-2.5 text-center">
              <div className="text-[10px] text-[#607080]">Risiko Churn</div>
              <div className="text-sm font-bold text-[#C73E3A] tabular-nums mt-0.5">
                {customer.retentionRiskScore} (Tinggi)
              </div>
            </div>

            <div className="p-2.5 text-center">
              <div className="text-[10px] text-[#607080]">Kanal Utama</div>
              <div className="text-sm font-semibold text-[#17212B] mt-0.5">
                {customer.preferredChannel}
              </div>
            </div>

            <div className="p-2.5 text-center">
              <div className="text-[10px] text-[#607080]">Izin Kontak (Consent)</div>
              <div className="text-sm font-semibold text-emerald-700 mt-0.5 flex items-center justify-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                {customer.consentStatus}
              </div>
            </div>
          </div>

          {/* 7 Tabs Bar */}
          <div className="flex border-b border-[#DDE3EA] px-3 overflow-x-auto text-xs font-medium text-[#607080] scrollbar-none">
            {[
              { id: 'ringkasan', label: 'Ringkasan' },
              { id: 'produk', label: 'Produk & Transaksi' },
              { id: 'layanan', label: 'Riwayat Layanan' },
              { id: 'interaksi', label: 'Interaksi & Campaign' },
              { id: 'keluhan', label: 'Keluhan' },
              { id: 'lokasi', label: 'Lokasi & Akses' },
              { id: 'rekomendasi', label: 'Rekomendasi' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2.5 border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#2563EB] text-[#2563EB] font-bold'
                    : 'border-transparent hover:text-[#17212B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-5 text-xs">
            {activeTab === 'ringkasan' && (
              <div className="space-y-4">
                {/* Behavioral Alert */}
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2.5">
                  <TrendingDown className="w-4 h-4 text-[#C73E3A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#C73E3A]">Sinyal Penurunan Aktivitas:</strong> Transaksi dalam 60 hari terakhir turun 35% dibandingkan rata-rata riwayat. Terjadi 1 komplain waktu tunggu layanan di cabang terdekat yang masih dalam proses eskalasi.
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="font-bold text-xs text-[#17212B] uppercase tracking-wider mb-3">
                    Lini Masa Aktivitas Pelanggan (Customer Timeline)
                  </h4>

                  <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE3EA]">
                    {timelineEvents.map((evt, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#2563EB] ring-4 ring-white" />
                        <div className="p-2.5 rounded-lg border border-[#DDE3EA] bg-white">
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="font-semibold text-[#17212B]">{evt.title}</span>
                            <span className="text-[#607080] tabular-nums">{evt.date}</span>
                          </div>
                          <p className="text-[11px] text-[#607080]">{evt.desc}</p>
                          <span className="inline-block mt-1 text-[10px] font-medium bg-slate-100 text-[#17212B] px-1.5 py-0.2 rounded">
                            {evt.badge}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'produk' && (
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-[#DDE3EA] bg-white flex justify-between items-center">
                  <div>
                    <div className="font-bold text-xs text-[#17212B]">Paket Solusi Bisnis Platinum</div>
                    <div className="text-[11px] text-[#607080]">Aktif sejak Oktober 2023 · Rata-rata bulanan: Rp4.650.000</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    Aktif
                  </span>
                </div>

                <div className="p-3 rounded-lg border border-[#DDE3EA] bg-white flex justify-between items-center">
                  <div>
                    <div className="font-bold text-xs text-[#17212B]">Merchant POS Terhubung</div>
                    <div className="text-[11px] text-[#607080]">2 Terminal aktif di outlet Semarang Timur</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    Aktif
                  </span>
                </div>
              </div>
            )}

            {activeTab !== 'ringkasan' && activeTab !== 'produk' && (
              <div className="py-8 text-center text-[#607080] space-y-2">
                <p className="text-xs">Data riwayat untuk tab &ldquo;{activeTab}&rdquo; telah dimuat secara teragregasi.</p>
                <div className="text-[11px] text-slate-400">Terakhir disinkronkan: 22 September 2026, 23.45 WIB</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Next Best Action Panel (3 cols) */}
        <div className="lg:col-span-3 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between h-[640px]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#DDE3EA]">
              <div className="p-1.5 rounded-lg bg-blue-50 text-[#2563EB]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-[#17212B]">Next Best Action (AI)</h3>
                <span className="text-[10px] text-emerald-700 font-medium">Model Preskriptif v1.3</span>
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-50/70 to-teal-50/50 border border-blue-200 space-y-2.5">
              <div className="font-bold text-xs text-[#2563EB] leading-snug">
                {customer.nextBestAction.title}
              </div>

              <p className="text-[11px] text-slate-700 leading-relaxed">
                {customer.nextBestAction.reason}
              </p>

              <div className="pt-2 border-t border-blue-200/60 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#607080]">Kanal Rekomendasi:</span>
                  <span className="font-bold text-[#17212B] flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-[#0F7C7B]" />
                    {customer.nextBestAction.recommendedChannel}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#607080]">Waktu Optimal:</span>
                  <span className="font-bold text-[#17212B]">{customer.nextBestAction.recommendedTiming}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#607080]">Estimasi Konversi:</span>
                  <span className="font-bold text-[#14804A]">{customer.nextBestAction.expectedConversionRate}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#607080]">Status Persetujuan:</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-50 text-[#D97706] font-semibold text-[10px]">
                    {customer.nextBestAction.approvalStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Geographic Proximity Insight */}
            <div className="p-3 rounded-lg border border-[#DDE3EA] bg-[#F5F7FA] space-y-1 text-xs">
              <div className="text-[11px] font-semibold text-[#607080]">Aksesibilitas Titik Layanan</div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[#607080]">Outlet Terdekat:</span>
                <span className="font-bold text-[#17212B]">Semarang Pandanaran</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[#607080]">Jarak Est. Tempuh:</span>
                <span className="font-bold text-[#C73E3A] tabular-nums">7,8 km (Celah Layanan)</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#DDE3EA] space-y-2">
            <button
              onClick={handlePrepareAction}
              className="w-full py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>Siapkan Aktivitas Kampanye</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigateToScreen('explainability')}
              className="w-full py-2 px-3 border border-[#DDE3EA] hover:bg-slate-50 text-[#17212B] rounded-lg text-xs font-semibold transition-colors"
            >
              Lihat Penjelasan SHAP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
