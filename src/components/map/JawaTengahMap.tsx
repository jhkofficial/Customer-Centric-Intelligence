import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  Layers,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Building2,
  Compass,
  AlertTriangle,
  MapPin,
  Shield,
  Target,
  Sparkles,
  Info,
  Map as MapIcon,
  Globe
} from 'lucide-react';
import { StrategyType } from '../../types';
import { REGENCIES_DATA, STRATEGIC_PRIORITIES, CANDIDATE_LOCATIONS } from '../../data/mockData';

export type MapTileProvider = 'openstreetmap' | 'google-roadmap' | 'google-satellite' | 'carto-light' | 'carto-dark';

interface MapProps {
  selectedAreaId?: string;
  onSelectArea?: (areaName: string) => void;
  activeStrategyFilter?: StrategyType | 'ALL';
  showCandidatePins?: boolean;
  activeLayers?: {
    customerDensity?: boolean;
    customerValue?: boolean;
    retentionRisk?: boolean;
    outlets?: boolean;
    competitors?: boolean;
    catchments?: boolean;
  };
  onToggleLayer?: (layerKey: string) => void;
  isSplitCompareMode?: boolean;
  onToggleSplitMode?: () => void;
}

// Real geographic coordinates for Jawa Tengah administrative hubs & strategic areas
const REGENCY_COORDINATES: Record<string, [number, number]> = {
  'Kota Semarang': [-6.9932, 110.4203],
  'Semarang Timur': [-6.9840, 110.4480],
  'Kota Surakarta': [-7.5562, 110.8317],
  'Surakarta Utara': [-7.5400, 110.8250],
  'Banyumas': [-7.4243, 109.2302],
  'Purwokerto Utara': [-7.4025, 109.2458],
  'Kudus': [-6.8048, 110.8405],
  'Kudus Selatan': [-6.8294, 110.8415],
  'Kota Magelang': [-7.4705, 110.2178],
  'Magelang Tengah': [-7.4750, 110.2200],
  'Magelang': [-7.4705, 110.2178],
  'Kota Tegal': [-6.8694, 109.1256],
  'Tegal Selatan': [-6.8856, 109.1245],
  'Demak': [-6.8943, 110.6385],
  'Demak Barat': [-6.8950, 110.5850],
  'Cilacap': [-7.7180, 109.0159],
  'Cilacap Utara': [-7.6833, 109.0250],
  'Kota Pekalongan': [-6.8886, 109.6753],
  'Pekalongan Barat': [-6.8920, 109.6644],
  'Kota Salatiga': [-7.3305, 110.5084],
  'Jepara': [-6.5891, 110.6685],
  'Jepara Kota': [-6.5920, 110.6720],
  'Sukoharjo': [-7.6830, 110.8350],
  'Sukoharjo Timur': [-7.6520, 110.8520],
  'Solo Baru': [-7.5980, 110.8120],
  'Klaten': [-7.7056, 110.6015],
  'Brebes': [-6.8703, 109.0435],
  'Kebumen': [-7.6686, 109.6521],
  'Purworejo': [-7.7144, 110.0093],
  'Pati': [-6.7562, 111.0378],
  'Wonosobo': [-7.3633, 109.9001],
  'Boyolali': [-7.5319, 110.5960],
  'Karanganyar': [-7.5961, 110.9515],
  'Sragen': [-7.4266, 111.0227],
  'Wonogiri': [-7.8139, 110.9256],
  'Kendal': [-6.9249, 110.2038],
  'Batang': [-6.9079, 109.7314],
  'Pemalang': [-6.8932, 109.3813],
  'Purbalingga': [-7.3879, 109.3638],
  'Banjarnegara': [-7.3973, 109.6975],
  'Temanggung': [-7.3167, 110.1764],
  'Blora': [-6.9697, 111.4172],
  'Rembang': [-6.7088, 111.3414],
  'Grobogan': [-7.0869, 110.9168]
};

// 48 Simulated Company Outlets across Jawa Tengah
const COMPANY_OUTLETS: Array<{ id: string; name: string; lat: number; lng: number }> = [
  { id: 'out-1', name: 'Outlet Pandanaran Semarang', lat: -6.9892, lng: 110.4140 },
  { id: 'out-2', name: 'Outlet Pemuda Semarang', lat: -6.9780, lng: 110.4180 },
  { id: 'out-3', name: 'Outlet Majapahit Semarang Timur', lat: -7.0010, lng: 110.4520 },
  { id: 'out-4', name: 'Outlet Slamet Riyadi Solo', lat: -7.5680, lng: 110.8190 },
  { id: 'out-5', name: 'Outlet Urip Sumoharjo Solo', lat: -7.5610, lng: 110.8350 },
  { id: 'out-6', name: 'Outlet HR Soebrantas Purwokerto', lat: -7.4200, lng: 109.2380 },
  { id: 'out-7', name: 'Outlet Ahmad Yani Kudus', lat: -6.8080, lng: 110.8420 },
  { id: 'out-8', name: 'Outlet Diponegoro Salatiga', lat: -7.3290, lng: 110.5050 },
  { id: 'out-9', name: 'Outlet Pahlawan Magelang', lat: -7.4720, lng: 110.2190 },
  { id: 'out-10', name: 'Outlet Gajah Mada Tegal', lat: -6.8710, lng: 109.1310 },
  { id: 'out-11', name: 'Outlet Gatot Subroto Cilacap', lat: -7.7120, lng: 109.0210 },
  { id: 'out-12', name: 'Outlet Hayam Wuruk Pekalongan', lat: -6.8890, lng: 109.6710 },
  { id: 'out-13', name: 'Outlet Pemuda Klaten', lat: -7.7080, lng: 110.6040 },
  { id: 'out-14', name: 'Outlet Kartini Jepara', lat: -6.5910, lng: 110.6690 },
  { id: 'out-15', name: 'Outlet Sudirman Demak', lat: -6.8920, lng: 110.6410 }
];

// 38 Simulated Competitor Locations
const COMPETITOR_OUTLETS: Array<{ id: string; name: string; lat: number; lng: number }> = [
  { id: 'comp-1', name: 'Kompetitor Alpha Semarang Timur', lat: -6.9810, lng: 110.4590 },
  { id: 'comp-2', name: 'Kompetitor Beta Semarang Timur', lat: -6.9920, lng: 110.4430 },
  { id: 'comp-3', name: 'Kompetitor Kudus Sentra', lat: -6.8150, lng: 110.8390 },
  { id: 'comp-4', name: 'Kompetitor Solo Baru', lat: -7.6020, lng: 110.8140 },
  { id: 'comp-5', name: 'Kompetitor Tegal Pantura', lat: -6.8800, lng: 110.1210 },
  { id: 'comp-6', name: 'Kompetitor Demak Jalur Arteri', lat: -6.8980, lng: 110.5920 },
  { id: 'comp-7', name: 'Kompetitor Purwokerto Barat', lat: -7.4110, lng: 109.2290 },
  { id: 'comp-8', name: 'Kompetitor Cilacap Pelabuhan', lat: -7.6950, lng: 109.0320 }
];

export const JawaTengahMap: React.FC<MapProps> = ({
  selectedAreaId = 'Semarang Timur',
  onSelectArea,
  activeStrategyFilter = 'ALL',
  showCandidatePins = false,
  activeLayers = {
    customerDensity: true,
    customerValue: true,
    retentionRisk: true,
    outlets: true,
    competitors: true,
    catchments: true
  },
  onToggleLayer,
  isSplitCompareMode = false,
  onToggleSplitMode
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markerGroupRef = useRef<L.LayerGroup | null>(null);

  const [tileProvider, setTileProvider] = useState<MapTileProvider>('openstreetmap');
  const [showLayerDrawer, setShowLayerDrawer] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize or re-center Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center of Central Java (Jawa Tengah)
      const map = L.map(mapContainerRef.current, {
        center: [-7.150975, 110.140259],
        zoom: 8.4,
        zoomControl: false,
        attributionControl: true
      });

      // Add zoom control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Attribution
      map.attributionControl.setPrefix(
        '<span class="text-[9px] text-slate-500 font-medium">SERVEON Intelijen Spasial Jawa Tengah</span>'
      );

      const markerGroup = L.layerGroup().addTo(map);
      markerGroupRef.current = markerGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer based on tileProvider
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing tile layer
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let tileUrl = '';
    let maxZoom = 19;
    let attribution = '';

    switch (tileProvider) {
      case 'google-roadmap':
        tileUrl = 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
        attribution = '&copy; Google Maps';
        break;
      case 'google-satellite':
        tileUrl = 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
        attribution = '&copy; Google Maps Satelit &amp; Hybrid';
        break;
      case 'carto-light':
        tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
        attribution = '&copy; OpenStreetMap contributors &copy; CARTO';
        break;
      case 'carto-dark':
        tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
        attribution = '&copy; OpenStreetMap contributors &copy; CARTO';
        break;
      case 'openstreetmap':
      default:
        tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
        attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> kontributor';
        break;
    }

    const newTileLayer = L.tileLayer(tileUrl, {
      maxZoom,
      attribution,
      subdomains: 'abcd'
    });

    newTileLayer.addTo(map);
    tileLayerRef.current = newTileLayer;
  }, [tileProvider]);

  // Update Markers, Priorities, Circles & Layers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = markerGroupRef.current;
    if (!map || !group) return;

    // Clear previous markers
    group.clearLayers();

    // 1. Render Regency Circles (Customer Density / Value)
    if (activeLayers.customerDensity || activeLayers.customerValue) {
      REGENCIES_DATA.forEach((reg) => {
        const coords = REGENCY_COORDINATES[reg.name] || REGENCY_COORDINATES[reg.id];
        if (!coords) return;

        const isRisk = reg.activeRate < 77;
        const circleColor = isRisk ? '#EF4444' : '#2563EB';

        const circle = L.circle(coords, {
          radius: 8000 + (reg.totalCustomers / 140000) * 9000,
          color: circleColor,
          weight: 1.5,
          opacity: 0.7,
          fillColor: circleColor,
          fillOpacity: 0.12
        });

        circle.bindTooltip(
          `<strong>${reg.name}</strong><br/>Pelanggan: ${reg.totalCustomers.toLocaleString('id-ID')}<br/>Keaktifan: ${reg.activeRate}%`,
          { direction: 'top', className: 'serveon-leaflet-tooltip' }
        );

        circle.on('click', () => {
          if (onSelectArea) onSelectArea(reg.name);
        });

        circle.addTo(group);
      });
    }

    // 2. Render Strategic Priority Markers (RETAIN, DEFEND, ACQUIRE)
    const visiblePriorities = activeStrategyFilter === 'ALL'
      ? STRATEGIC_PRIORITIES
      : STRATEGIC_PRIORITIES.filter((p) => p.strategy === activeStrategyFilter);

    visiblePriorities.forEach((prio) => {
      const coords = REGENCY_COORDINATES[prio.name] || REGENCY_COORDINATES[prio.kabupaten];
      if (!coords) return;

      const isSelected = selectedAreaId === prio.name;
      const strategyColor =
        prio.strategy === 'DEFEND'
          ? '#C73E3A'
          : prio.strategy === 'RETAIN'
          ? '#D97706'
          : '#0F7C7B';

      const borderColor = isSelected ? '#FFFFFF' : '#FFFFFF';
      const shadowClass = isSelected ? 'ring-4 ring-blue-500/80 scale-110' : 'shadow-md';

      // Custom DivIcon for Priority Pin
      const html = `
        <div class="flex flex-col items-center cursor-pointer transition-transform hover:scale-110 ${shadowClass}">
          <div style="background-color: ${strategyColor}; border: 2px solid ${borderColor};" class="px-2 py-0.5 rounded-full text-white text-[10px] font-black flex items-center gap-1 shadow-sm whitespace-nowrap">
            <span>${prio.strategy}</span>
            <span class="bg-black/30 px-1 py-0.2 rounded font-mono">${prio.score}</span>
          </div>
          <div style="background-color: ${strategyColor}; border: 1.5px solid white;" class="w-2.5 h-2.5 rotate-45 -mt-1.5 shadow-xs"></div>
          <div class="bg-slate-900/90 text-white font-bold text-[9.5px] px-1.5 py-0.5 rounded shadow-sm mt-0.5 whitespace-nowrap border border-slate-700">
            ${prio.name}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html,
        className: 'serveon-custom-pin',
        iconSize: [80, 40],
        iconAnchor: [40, 36]
      });

      const marker = L.marker(coords, { icon: customIcon });

      // Interactive Popup
      const popupContent = `
        <div class="p-2.5 font-['Plus_Jakarta_Sans',sans-serif] text-xs max-w-xs">
          <div class="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5 mb-2">
            <span class="font-bold text-slate-900 text-sm">${prio.name}</span>
            <span style="background-color: ${strategyColor}; color: white;" class="px-2 py-0.5 rounded font-black text-[10px]">
              ${prio.strategy} ${prio.score}
            </span>
          </div>
          <p class="text-[11px] text-slate-600 mb-2 leading-relaxed">${prio.reason}</p>
          <div class="grid grid-cols-2 gap-1.5 text-[10.5px] bg-slate-50 p-2 rounded border border-slate-200 mb-2.5">
            <div>Pelanggan: <strong>${prio.totalCustomers.toLocaleString('id-ID')}</strong></div>
            <div>Peluang: <strong class="text-blue-700">${prio.opportunityValue}</strong></div>
            <div>Keyakinan: <strong class="text-emerald-700">${prio.confidence}%</strong></div>
            <div>Celah: <strong>${prio.coverageGap}</strong></div>
          </div>
          <button id="btn-select-${prio.id}" class="w-full py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded text-xs transition-colors">
            Pilih Area Ini →
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 300 });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-select-${prio.id}`);
        if (btn) {
          btn.onclick = () => {
            if (onSelectArea) onSelectArea(prio.name);
            marker.closePopup();
          };
        }
      });

      marker.on('click', () => {
        if (onSelectArea) onSelectArea(prio.name);
      });

      marker.addTo(group);

      // If selected area, auto pan smoothly
      if (isSelected) {
        map.panTo(coords, { animate: true, duration: 0.6 });
      }
    });

    // 3. Render 15-Minute Catchment Isochrones
    if (activeLayers.catchments) {
      visiblePriorities.slice(0, 3).forEach((prio) => {
        const coords = REGENCY_COORDINATES[prio.name] || REGENCY_COORDINATES[prio.kabupaten];
        if (!coords) return;

        const isochrone = L.circle(coords, {
          radius: 6500, // ~15 mins travel radius
          color: prio.strategy === 'DEFEND' ? '#C73E3A' : '#2563EB',
          weight: 1.5,
          dashArray: '5, 5',
          fillColor: prio.strategy === 'DEFEND' ? '#C73E3A' : '#2563EB',
          fillOpacity: 0.08
        });

        isochrone.bindTooltip(`Catchment 15-Menit: ${prio.name}`, {
          direction: 'center',
          className: 'serveon-leaflet-tooltip'
        });

        isochrone.addTo(group);
      });
    }

    // 4. Render Outlets (Company Service Points)
    if (activeLayers.outlets) {
      COMPANY_OUTLETS.forEach((outlet) => {
        const outletIcon = L.divIcon({
          html: `
            <div class="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center border-2 border-white shadow-md hover:scale-125 transition-transform" title="${outlet.name}">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
            </div>
          `,
          className: 'serveon-outlet-pin',
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([outlet.lat, outlet.lng], { icon: outletIcon });
        marker.bindPopup(`<strong>Outlet Resmi SERVEON</strong><br/>${outlet.name}`);
        marker.addTo(group);
      });
    }

    // 5. Render Competitor Outlets
    if (activeLayers.competitors) {
      COMPETITOR_OUTLETS.forEach((comp) => {
        const compIcon = L.divIcon({
          html: `
            <div class="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center border-2 border-white shadow-md hover:scale-125 transition-transform" title="${comp.name}">
              <span class="text-[9px] font-black">▲</span>
            </div>
          `,
          className: 'serveon-comp-pin',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        const marker = L.marker([comp.lat, comp.lng], { icon: compIcon });
        marker.bindPopup(`<strong>Tekanan Kompetitor</strong><br/>${comp.name}<br/><span class="text-[11px] text-red-600">Survei Lapangan Q3-2026</span>`);
        marker.addTo(group);
      });
    }

    // 6. Render Candidate Locations (Pins A, B, C)
    if (showCandidatePins) {
      CANDIDATE_LOCATIONS.forEach((cand) => {
        const candCoords: [number, number] =
          cand.id === 'cand-1' ? [-6.9840, 110.4480] :
          cand.id === 'cand-2' ? [-7.5980, 110.8120] : [-7.3980, 109.2550];

        const candIcon = L.divIcon({
          html: `
            <div class="flex flex-col items-center cursor-pointer hover:scale-125 transition-transform">
              <div class="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-lg animate-bounce">
                ${cand.id.split('-')[1].toUpperCase()}
              </div>
              <div class="bg-amber-900 text-white text-[9px] font-bold px-1 rounded shadow -mt-0.5 whitespace-nowrap">
                Kandidat ${cand.id.split('-')[1]}
              </div>
            </div>
          `,
          className: 'serveon-cand-pin',
          iconSize: [28, 38],
          iconAnchor: [14, 38]
        });

        const marker = L.marker(candCoords, { icon: candIcon });
        marker.bindPopup(`
          <div class="p-2 text-xs">
            <strong>Kandidat Lokasi: ${cand.name}</strong><br/>
            Skor Kesesuaian: <strong class="text-blue-700">${cand.overallScore}/100</strong><br/>
            Cakupan Pelanggan: <strong>${cand.catchmentCustomers.toLocaleString('id-ID')}</strong><br/>
            Status: <strong class="text-emerald-700">${cand.status}</strong><br/>
            Estimasi Capex: <strong>${cand.estimatedCapex}</strong>
          </div>
        `);
        marker.addTo(group);
      });
    }
  }, [selectedAreaId, activeStrategyFilter, showCandidatePins, activeLayers, onSelectArea]);

  const handleResetZoom = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([-7.150975, 110.140259], 8.4, { animate: true });
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden border border-[#DDE3EA] shadow-2xs select-none transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 h-[calc(100vh-2rem)] bg-white shadow-2xl' : 'h-[520px] bg-slate-100'
      }`}
    >
      {/* 1. Basemap Selector (OpenStreetMap vs Google Maps) */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-wrap items-center gap-2">
        {/* Basemap Switcher Menu */}
        <div className="bg-white/95 backdrop-blur-md border border-[#DDE3EA] rounded-lg p-1 flex items-center gap-1 shadow-xs text-xs">
          <div className="flex items-center gap-1 px-2 text-[#17212B] font-bold border-r border-[#DDE3EA] mr-1">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Peta:</span>
          </div>

          <button
            onClick={() => setTileProvider('openstreetmap')}
            className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
              tileProvider === 'openstreetmap'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
            title="Gunakan OpenStreetMap (Tile Standar)"
          >
            OpenStreetMap
          </button>

          <button
            onClick={() => setTileProvider('google-roadmap')}
            className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
              tileProvider === 'google-roadmap'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
            title="Gunakan Google Maps (Mode Jalan / Roadmap)"
          >
            Google Maps
          </button>

          <button
            onClick={() => setTileProvider('google-satellite')}
            className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
              tileProvider === 'google-satellite'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
            title="Gunakan Google Maps (Satelit & Hybrid)"
          >
            Satelit
          </button>

          <button
            onClick={() => setTileProvider('carto-light')}
            className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors hidden md:block ${
              tileProvider === 'carto-light'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
            title="Mode Terang Minimalis (Positron)"
          >
            Light
          </button>
        </div>

        {/* Layer Toggle Button */}
        <button
          onClick={() => setShowLayerDrawer(!showLayerDrawer)}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 shadow-xs transition-colors ${
            showLayerDrawer
              ? 'bg-[#2563EB] text-white border-blue-600'
              : 'bg-white/95 text-[#17212B] border-[#DDE3EA] hover:bg-slate-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Layer ({Object.values(activeLayers).filter(Boolean).length})</span>
        </button>

        {/* Split Compare Mode Toggle (if available) */}
        {onToggleSplitMode && (
          <button
            onClick={onToggleSplitMode}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors shadow-xs ${
              isSplitCompareMode
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white/95 text-[#17212B] border-[#DDE3EA] hover:bg-slate-50'
            }`}
          >
            Split Compare
          </button>
        )}
      </div>

      {/* 2. Top-Right Control Buttons (Zoom, Reset, Fullscreen) */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-1.5">
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-lg bg-white/95 hover:bg-white text-[#17212B] border border-[#DDE3EA] shadow-xs transition-colors"
          title="Perbesar Peta (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomOut}
          className="p-2 rounded-lg bg-white/95 hover:bg-white text-[#17212B] border border-[#DDE3EA] shadow-xs transition-colors"
          title="Perkecil Peta (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={handleResetZoom}
          className="p-2 rounded-lg bg-white/95 hover:bg-white text-[#17212B] border border-[#DDE3EA] shadow-xs transition-colors"
          title="Reset Tampilan ke Jawa Tengah"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 rounded-lg bg-white/95 hover:bg-white text-[#17212B] border border-[#DDE3EA] shadow-xs transition-colors"
          title={isFullscreen ? 'Keluar Layar Penuh' : 'Perbesar Peta ke Layar Penuh'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 text-blue-600" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* 3. Layer Drawer Modal (Floating Card) */}
      {showLayerDrawer && (
        <div className="absolute top-14 left-3 z-[1000] w-64 bg-white/95 backdrop-blur-md border border-[#DDE3EA] rounded-xl shadow-xl p-3.5 space-y-2.5 text-xs animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-[#DDE3EA]">
            <span className="font-bold text-[#17212B]">Kontrol Layer Spasial</span>
            <button
              onClick={() => setShowLayerDrawer(false)}
              className="text-[#607080] hover:text-[#17212B] font-bold text-xs"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5">
            {[
              { key: 'customerDensity', label: 'Densitas & Nilai Pelanggan' },
              { key: 'retentionRisk', label: 'Rasio Risiko Retensi' },
              { key: 'outlets', label: 'Outlet Resmi (48 Titik)' },
              { key: 'competitors', label: 'Tekanan Kompetitor (38 Titik)' },
              { key: 'catchments', label: 'Radius Catchment 15-Menit' }
            ].map((layer) => {
              const isActive = (activeLayers as any)[layer.key];
              return (
                <label
                  key={layer.key}
                  className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 cursor-pointer"
                >
                  <span className="text-slate-700">{layer.label}</span>
                  <input
                    type="checkbox"
                    checked={Boolean(isActive)}
                    onChange={() => onToggleLayer && onToggleLayer(layer.key)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300"
                  />
                </label>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#DDE3EA] flex justify-between text-[10.5px] text-[#607080]">
            <span>Provider: <strong>{tileProvider}</strong></span>
            <span>Jawa Tengah</span>
          </div>
        </div>
      )}

      {/* 4. Bottom Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-md border border-[#DDE3EA] rounded-lg px-3 py-1.5 flex flex-wrap items-center gap-3 text-[11px] shadow-xs text-slate-800">
        <div className="flex items-center gap-1 font-bold">
          <span>Legenda:</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
          <span>RETAIN (Retensi)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C73E3A]" />
          <span>DEFEND (Pasar)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0F7C7B]" />
          <span>ACQUIRE (Akuisisi)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
          <span>Outlet Perusahaan</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-red-600 font-bold">▲</span>
          <span>Kompetitor</span>
        </div>
      </div>

      {/* 5. The Actual Leaflet Map Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />
    </div>
  );
};
