import React, { useState } from 'react';
import {
  Building2,
  Users,
  GraduationCap,
  Bus,
  TrendingUp,
  MapPin,
  CheckCircle,
  Clock,
  Layers,
  BarChart3
} from 'lucide-react';
import { JawaTengahMap } from '../components/map/JawaTengahMap';
import { REGENCIES_DATA } from '../data/mockData';
import { ScreenId } from '../types';

interface MarketPoiDemographicsScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const MarketPoiDemographicsScreen: React.FC<MarketPoiDemographicsScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  const [selectedRegencyName, setSelectedRegencyName] = useState('Kota Semarang');
  const [activeCategory, setActiveCategory] = useState<'demografi' | 'poi' | 'ekonomi'>('demografi');

  const selectedReg = REGENCIES_DATA.find((r) => r.name === selectedRegencyName) || REGENCIES_DATA[0];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
            Pasar, POI &amp; Demografi Eksternal
          </h1>
          <p className="text-xs text-[#607080]">
            Intelijen pasar eksternal: densitas populasi, proporsi usia produktif, proxy pengeluaran rumah tangga, dan titik minat (POI).
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-white border border-[#DDE3EA] rounded-xl text-xs">
          {[
            { id: 'demografi', label: 'Profil Demografi' },
            { id: 'poi', label: 'Komposisi POI' },
            { id: 'ekonomi', label: 'Proxy Pengeluaran' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#2563EB] text-white shadow-2xs'
                  : 'text-[#607080] hover:text-[#17212B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Map & Selected Demographic Profile */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-8 bg-white border border-[#DDE3EA] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-[#17212B]">Peta Konsentrasi POI &amp; Demografi Eksternal</span>
            <span className="text-[#607080]">Area aktif: <strong>{selectedReg.name}</strong></span>
          </div>

          <JawaTengahMap
            selectedAreaId={selectedRegencyName}
            onSelectArea={(name) => setSelectedRegencyName(name)}
          />

          <div className="mt-3 pt-3 border-t border-[#DDE3EA] flex items-center justify-between text-[11px] text-[#607080]">
            <span>Sumber Data: BPS Jawa Tengah &amp; Agregasi POI Komersial 2026</span>
            <span className="text-emerald-700 font-semibold">Tingkat Validitas: 97,4%</span>
          </div>
        </div>

        {/* Right Demographic & POI Card (4 cols) */}
        <div className="xl:col-span-4 bg-white border border-[#DDE3EA] rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-[#DDE3EA]">
              <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                Indikator Pasar Terpilih
              </span>
              <h2 className="text-base font-bold text-[#17212B]">{selectedReg.name}</h2>
              <div className="text-[11px] text-[#607080]">{selectedReg.category} · Jawa Tengah</div>
            </div>

            {/* Demography Metrics */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                <div className="text-[11px] text-[#607080]">Populasi Penduduk</div>
                <div className="text-sm font-bold text-[#17212B] mt-0.5 tabular-nums">
                  {selectedReg.population.toLocaleString('id-ID')}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA]">
                <div className="text-[11px] text-[#607080]">Usia Produktif (15-64)</div>
                <div className="text-sm font-bold text-emerald-700 mt-0.5 tabular-nums">
                  {selectedReg.productiveAgeRate}%
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#DDE3EA] col-span-2">
                <div className="text-[11px] text-[#607080]">Rata-rata Pengeluaran Bulanan</div>
                <div className="text-base font-bold text-[#2563EB] mt-0.5 tabular-nums">
                  {selectedReg.avgMonthlyExpenditure}
                </div>
              </div>
            </div>

            {/* POI Composition */}
            <div>
              <div className="text-[11px] font-bold text-[#17212B] uppercase tracking-wider mb-2">
                Komposisi Point of Interest (POI)
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-[#DDE3EA]">
                  <span className="flex items-center gap-1.5 text-[#17212B]">
                    <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
                    POI Komersial &amp; Retail
                  </span>
                  <span className="font-bold tabular-nums">{selectedReg.commercialPoiCount} Titik</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-[#DDE3EA]">
                  <span className="flex items-center gap-1.5 text-[#17212B]">
                    <GraduationCap className="w-3.5 h-3.5 text-[#0F7C7B]" />
                    Pendidikan &amp; Kampus
                  </span>
                  <span className="font-bold tabular-nums">{selectedReg.educationPoiCount} Titik</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-[#DDE3EA]">
                  <span className="flex items-center gap-1.5 text-[#17212B]">
                    <Bus className="w-3.5 h-3.5 text-[#D97706]" />
                    Hub Transportasi (Stasiun/Terminal)
                  </span>
                  <span className="font-bold tabular-nums">{selectedReg.transportHubs} Titik</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DDE3EA] space-y-2">
            <button
              onClick={() => onNavigateToScreen('akuisisi')}
              className="w-full py-2.5 px-3 bg-[#0F7C7B] hover:bg-teal-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>Lihat Potensi Akuisisi Area Ini</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
