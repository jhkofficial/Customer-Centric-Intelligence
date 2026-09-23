import React, { useState } from 'react';
import {
  Layers,
  Eye,
  Sliders,
  Maximize2,
  Info,
  Building2,
  Sparkles,
  MapPin,
  TrendingUp,
  Download
} from 'lucide-react';
import { JawaTengahMap } from '../components/map/JawaTengahMap';
import { ScreenId } from '../types';

interface MapDensityScreenProps {
  onNavigateToScreen: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const MapDensityScreen: React.FC<MapDensityScreenProps> = ({
  onNavigateToScreen,
  onShowToast
}) => {
  const [layers, setLayers] = useState({
    customerDensity: true,
    customerValue: true,
    retentionRisk: false,
    outlets: true,
    competitors: true,
    catchments: true
  });

  const [opacity, setOpacity] = useState(75);
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [showInsightDrawer, setShowInsightDrawer] = useState(true);

  const toggleLayer = (key: string) => {
    setLayers((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#17212B]">
            Peta &amp; Kepadatan Spasial
          </h1>
          <p className="text-xs text-[#607080]">
            Analisis multi-layer spasial: konsentrasi densitas pelanggan, nilai ekonomi, dan sebaran jaringan kompetitor.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSplitMode(!isSplitMode)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              isSplitMode
                ? 'bg-[#0F7C7B] text-white border-teal-600 shadow-2xs'
                : 'bg-white border-[#DDE3EA] hover:bg-slate-50 text-[#17212B]'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{isSplitMode ? 'Tutup Bandingkan' : 'Bandingkan Dua Layer'}</span>
          </button>
        </div>
      </div>

      {/* Main Map Workspace with Overlay Controls */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Map Viewport (8 or 9 cols) */}
        <div className={`transition-all duration-300 ${showInsightDrawer ? 'xl:col-span-8' : 'xl:col-span-12'}`}>
          <div className="bg-white border border-[#DDE3EA] rounded-xl p-4 space-y-4">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#17212B]">Opasitas Layer Spasial:</span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-28 accent-[#2563EB] cursor-pointer"
                />
                <span className="font-mono text-[#607080] tabular-nums">{opacity}%</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#607080]">Pembaruan: 22 Sep 2026, 23.45 WIB</span>
                <button
                  onClick={() => setShowInsightDrawer(!showInsightDrawer)}
                  className="text-xs text-[#2563EB] font-semibold hover:underline"
                >
                  {showInsightDrawer ? 'Sembunyikan Insight' : 'Buka Panel Insight'}
                </button>
              </div>
            </div>

            {/* Split Mode or Single Map */}
            {isSplitMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-[#17212B] bg-slate-100 px-2.5 py-1 rounded">
                    Layer A: Kepadatan Pelanggan Aktif
                  </div>
                  <JawaTengahMap
                    activeLayers={{
                      customerDensity: true,
                      customerValue: false,
                      retentionRisk: false,
                      outlets: true,
                      competitors: false,
                      catchments: false
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-[#17212B] bg-slate-100 px-2.5 py-1 rounded">
                    Layer B: Nilai Pelanggan &amp; Tekanan Kompetitor
                  </div>
                  <JawaTengahMap
                    activeLayers={{
                      customerDensity: false,
                      customerValue: true,
                      retentionRisk: false,
                      outlets: false,
                      competitors: true,
                      catchments: true
                    }}
                  />
                </div>
              </div>
            ) : (
              <JawaTengahMap
                activeLayers={layers}
                onToggleLayer={toggleLayer}
                isSplitCompareMode={isSplitMode}
                onToggleSplitMode={() => setIsSplitMode(!isSplitMode)}
              />
            )}
          </div>
        </div>

        {/* Right Insight Drawer (4 cols) */}
        {showInsightDrawer && (
          <div className="xl:col-span-4 bg-white border border-[#DDE3EA] rounded-xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="pb-3 border-b border-[#DDE3EA]">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#0F7C7B]" />
                  <h3 className="font-bold text-xs text-[#17212B] uppercase tracking-wider">
                    Insight Spasial &amp; Metodologi
                  </h3>
                </div>
                <p className="text-[11px] text-[#607080]">
                  Membedakan antara Densitas Pelanggan vs. Potensi Pasar Tersembunyi.
                </p>
              </div>

              {/* Distinction Box */}
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 text-xs space-y-2">
                <div className="font-bold text-[#2563EB]">
                  Densitas Pelanggan ≠ Potensi Pasar
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Wilayah dengan densitas pelanggan tinggi (seperti Semarang Tengah) seringkali telah mendekati titik jenuh penetrasi. Sebaliknya, wilayah sub-urban seperti <strong>Purwokerto Utara</strong> menunjukkan densitas nasabah eksisting rendah namun memiliki potensi demografi produktif yang sangat besar (White Space).
                </p>
              </div>

              {/* Layer Controls Quick Checklist */}
              <div>
                <div className="text-[11px] font-bold text-[#17212B] uppercase tracking-wider mb-2">
                  Layer Aktif Saat Ini
                </div>
                <div className="space-y-1.5 text-xs">
                  {[
                    { key: 'customerDensity', label: 'Densitas Pelanggan (Kernel Density Estimation)' },
                    { key: 'customerValue', label: 'Kluster Nilai Pelanggan Finansial' },
                    { key: 'retentionRisk', label: 'Peta Risiko Churning' },
                    { key: 'outlets', label: '48 Titik Layanan Operasional' },
                    { key: 'competitors', label: 'Titik Tekanan Kompetitor' }
                  ].map((l) => (
                    <label key={l.key} className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(layers as any)[l.key]}
                        onChange={() => toggleLayer(l.key)}
                        className="rounded text-[#2563EB] focus:ring-0"
                      />
                      <span className="text-[#17212B] text-[11px]">{l.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DDE3EA] space-y-2">
              <button
                onClick={() => onNavigateToScreen('jaringan-cakupan')}
                className="w-full py-2.5 px-3 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>Evaluasi Jaringan &amp; Cakupan</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
