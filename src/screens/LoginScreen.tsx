import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Layers,
  AlertCircle,
  Building2,
  TrendingUp,
  MapPin,
  CheckCircle2,
  KeyRound,
  Compass,
  Cpu
} from 'lucide-react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (selectedRole?: UserRole) => void;
  initialRole?: UserRole;
}

const PRESET_ACCOUNTS: Array<{
  role: UserRole;
  name: string;
  email: string;
  title: string;
  accessBadge: string;
}> = [
  {
    role: 'Administrator',
    name: 'Johanes Pratama',
    email: 'johanes.admin@serveon.id',
    title: 'Super Admin Sistem',
    accessBadge: 'Akses Penuh 35 Kab/Kota'
  },
  {
    role: 'Executive / Management',
    name: 'Dewi Rahmawati',
    email: 'dewi.exec@serveon.id',
    title: 'VP Regional Business',
    accessBadge: 'Ringkasan Eksekutif & Otorisasi'
  },
  {
    role: 'Business / Marketing',
    name: 'Rian Kusuma',
    email: 'rian.mkt@serveon.id',
    title: 'Lead Campaign Specialist',
    accessBadge: 'Kampanye & Segmentasi'
  },
  {
    role: 'Network Development',
    name: 'Bambang Sudiro',
    email: 'bambang.net@serveon.id',
    title: 'Sr. Expansion Strategist',
    accessBadge: 'Kandidat Lokasi & POI'
  },
  {
    role: 'Data Analyst / Data Scientist',
    name: 'Siti Nurhaliza',
    email: 'siti.data@serveon.id',
    title: 'ML & Geospatial Analyst',
    accessBadge: 'Monitoring Model & Explainability'
  }
];

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  initialRole = 'Administrator'
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('johanes.admin@serveon.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const currentPreset = PRESET_ACCOUNTS.find((p) => p.role === selectedRole) || PRESET_ACCOUNTS[0];

  const handleSelectRole = (preset: typeof PRESET_ACCOUNTS[0]) => {
    setSelectedRole(preset.role);
    setEmail(preset.email);
    setPassword('password123');
    setErrorMessage('');
    setInfoMessage(`Profil aktif beralih ke: ${preset.name} (${preset.title})`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Harap masukkan alamat email dan kata sandi Anda.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setInfoMessage('');

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole);
    }, 550);
  };

  const handleQuickDemoAccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole);
    }, 350);
  };

  return (
    <div className="min-h-screen w-full bg-[#050A14] text-slate-100 flex flex-col justify-between relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* High-Contrast Architectural Grid & Glow Backdrops */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#132238_1px,transparent_1px),linear-gradient(to_bottom,#132238_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[130px]" />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white font-['Cabinet_Grotesk',sans-serif]">
                SERVEON
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                PRO PILOT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Geospatial Intelligence &amp; Regional Market Defense — Jawa Tengah
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">Server Operasional: Wilayah Jateng</span>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Enkripsi 256-bit Terverifikasi</span>
          </div>
        </div>
      </header>

      {/* Main High-Contrast Content Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 lg:py-12 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: High-Value Enterprise Pitch (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold text-teal-300 shadow-inner">
              <Compass className="w-3.5 h-3.5 text-teal-400" />
              <span>Platform Analitik Spasial &amp; Strategi Multi-Kabupaten</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Kuasai Pasar &amp; Amankan Pelanggan dengan{' '}
                <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  Presisi Spasial Nyata.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
                Satu platform terpadu untuk memetakan risiko retensi pelanggan, menganalisis tekanan kompetitor di 35 Kabupaten/Kota Jawa Tengah, dan mengeksekusi strategi <strong className="text-white">RETAIN</strong>, <strong className="text-white">DEFEND</strong>, dan <strong className="text-white">ACQUIRE</strong> dengan ROI terukur.
              </p>
            </div>

            {/* Visual Geospatial Preview Card */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/80 shadow-2xl group">
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <img
                  src="/src/assets/images/serveon_geospatial_hq_1790203053877.jpg"
                  alt="Peta Spasial Digital Twin Jawa Tengah SERVEON"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Graceful fallback to CSS gradient
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091120] via-[#091120]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#091120]/80 via-transparent to-transparent" />

                {/* Floating Intelligence Overlays on Map */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[11px] font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Jawa Tengah Geospatial Grid</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80">
                    <span className="text-slate-400">Fokus Strategis:</span>
                    <span className="font-bold text-amber-400">Semarang Timur</span>
                    <span className="text-slate-500">·</span>
                    <span className="font-bold text-red-400">Solo Baru</span>
                    <span className="text-slate-500">·</span>
                    <span className="font-bold text-teal-400">Purwokerto</span>
                  </div>
                  <div className="text-[11px] text-slate-300 bg-blue-900/60 border border-blue-600/40 px-2.5 py-1 rounded-md">
                    Catchment 15-Menit Aktif
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Executive Proof Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-left">
                <div className="text-xl sm:text-2xl font-black text-white tabular-nums font-mono">
                  1.248.560
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Pelanggan Terpetakan</div>
                <div className="text-[10px] text-teal-400 font-semibold mt-1">35 Kabupaten/Kota</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-left">
                <div className="text-xl sm:text-2xl font-black text-white tabular-nums font-mono">
                  48 Outlet
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Jaringan Titik Layanan</div>
                <div className="text-[10px] text-blue-400 font-semibold mt-1">38 Titik Kompetitor</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-left">
                <div className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums font-mono">
                  96,2%
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Akurasi Rekomendasi</div>
                <div className="text-[10px] text-emerald-300 font-semibold mt-1">Validasi SHAP &amp; LIME</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Contrast Elevated Login Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="w-full bg-[#0C1527]/95 backdrop-blur-xl border border-slate-700/90 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 relative">
              
              {/* Header inside Card */}
              <div className="mb-6 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Masuk ke Platform
                  </h2>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                    Akses Aman
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Gunakan kredensial internal atau pilih peran demo untuk eksplorasi instan.
                </p>
              </div>

              {/* Status & Error Messages */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-800 text-xs text-red-200 flex items-center gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {infoMessage && (
                <div className="mb-4 p-3 rounded-xl bg-blue-950/70 border border-blue-700 text-xs text-blue-200 flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-400" />
                  <span>{infoMessage}</span>
                </div>
              )}

              {/* Persona / Demo Role Selector (High-Contrast Segmented Selector) */}
              <div className="mb-5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300 tracking-wide uppercase">
                    Pilih Peran Demo Pengguna:
                  </span>
                  <span className="text-[10.5px] font-bold text-blue-300">
                    {currentPreset.role}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  {PRESET_ACCOUNTS.map((preset) => {
                    const isSelected = selectedRole === preset.role;
                    return (
                      <button
                        key={preset.role}
                        type="button"
                        onClick={() => handleSelectRole(preset)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between border ${
                          isSelected
                            ? 'bg-blue-600 text-white font-bold border-blue-400 shadow-md shadow-blue-900/40 ring-1 ring-blue-300/40'
                            : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <div className="truncate">
                          <span className="font-semibold block truncate">{preset.name}</span>
                          <span className={`text-[10px] block truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                            {preset.title}
                          </span>
                        </div>
                        <span
                          className={`text-[9.5px] px-1.5 py-0.5 rounded whitespace-nowrap shrink-0 ml-2 ${
                            isSelected
                              ? 'bg-blue-900/80 text-blue-100 border border-blue-400/40 font-bold'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {preset.accessBadge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Alamat Email Perusahaan
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@serveon.id"
                      required
                      className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs text-white rounded-xl pl-9 pr-3 py-2.5 outline-none transition-all placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={() => setInfoMessage('Tautan pemulihan kata sandi telah dikirimkan ke IT Administrator SERVEON.')}
                      className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Lupa sandi?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs text-white rounded-xl pl-9 pr-10 py-2.5 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 bg-slate-950 border-slate-700 focus:ring-0"
                    />
                    <span>Ingat kredensial di sesi ini</span>
                  </label>
                </div>

                {/* Primary High-Impact CTA Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Memverifikasi Otorisasi...
                    </span>
                  ) : (
                    <>
                      <span>Masuk ke Dashboard ({selectedRole})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* High-Contrast Quick Enterprise Access Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800" />
                </div>
                <div className="relative flex justify-center text-[10.5px] uppercase font-semibold">
                  <span className="bg-[#0C1527] px-2 text-slate-400">opsi akses instan</span>
                </div>
              </div>

              {/* Direct 1-Click Access Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleQuickDemoAccess}
                  className="w-full py-2.5 px-4 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Akses Cepat Mode Demo Jawa Tengah →</span>
                </button>

                <button
                  type="button"
                  onClick={() => onLoginSuccess(selectedRole)}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800/90 text-slate-300 border border-slate-700/80 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                  <span>Masuk dengan Single Sign-On (SSO) Korporat</span>
                </button>
              </div>

              {/* Security & Audit Footer */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 text-center space-y-1">
                <p className="text-[10.5px] text-slate-400">
                  Seluruh data dan riwayat interaksi terikat kebijakan kepatuhan ISO 27001.
                </p>
                <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Sesi terenkripsi untuk: <strong className="text-slate-200">{currentPreset.email}</strong></span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer Strip */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div>
          &copy; 2026 SERVEON Inc. Platform Intelijen Spasial, Retensi &amp; Eksekusi Pasar Jawa Tengah.
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="hover:text-slate-300 cursor-pointer">Panduan Keamanan Data</span>
          <span>·</span>
          <span className="hover:text-slate-300 cursor-pointer">SLA Ketersediaan 99.9%</span>
          <span>·</span>
          <span className="text-teal-400 font-semibold">Versi Produksi Pilot 2.4</span>
        </div>
      </footer>
    </div>
  );
};
