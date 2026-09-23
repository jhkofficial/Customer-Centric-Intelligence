import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Layers, AlertCircle, UserCheck } from 'lucide-react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (selectedRole?: UserRole) => void;
  initialRole?: UserRole;
}

const PRESET_ACCOUNTS: Array<{ role: UserRole; name: string; email: string; tag: string }> = [
  { role: 'Administrator', name: 'Johanes Admin', email: 'johanes.admin@serveon.id', tag: 'Akses Penuh' },
  { role: 'Executive / Management', name: 'Dewi Direktur', email: 'dewi.exec@serveon.id', tag: 'Ringkasan & Approval' },
  { role: 'Business / Marketing', name: 'Rian Marketing', email: 'rian.mkt@serveon.id', tag: 'Campaign & Segmentasi' },
  { role: 'Network Development', name: 'Bambang Network', email: 'bambang.net@serveon.id', tag: 'Kandidat Lokasi & Peta' },
  { role: 'Data Analyst / Data Scientist', name: 'Siti Analyst', email: 'siti.data@serveon.id', tag: 'Model & Explainability' },
];

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, initialRole = 'Administrator' }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('johanes.admin@serveon.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleSelectPreset = (preset: typeof PRESET_ACCOUNTS[0]) => {
    setSelectedRole(preset.role);
    setEmail(preset.email);
    setPassword('password123');
    setErrorMessage('');
    setInfoMessage(`Akun disiapkan: ${preset.name} (${preset.role})`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Harap isi alamat email dan kata sandi Anda.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setInfoMessage('');

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F5F7FA] text-[#17212B]">
      {/* Left Visual Half (55%) */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-[#15324B] overflow-hidden flex-col justify-between p-12 text-white">
        {/* Abstract Geospatial Visual Asset */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/jawa_tengah_geospatial_network_1790178728022.jpg"
            alt="Jawa Tengah Geospatial Network Visualization"
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105 transition-transform duration-1000"
            onError={(e) => {
              // Graceful fallback container
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#15324B] via-[#15324B]/70 to-[#15324B]/40" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent to-[#15324B]/90" />
        </div>

        {/* Top Branding */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F7C7B] to-[#2563EB] flex items-center justify-center text-white shadow-md">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xl font-bold tracking-wider text-white">SERVEON</div>
            <div className="text-xs text-slate-300">Customer, Location &amp; Engagement Intelligence Platform</div>
          </div>
        </div>

        {/* Center Strategic Narrative */}
        <div className="relative z-10 max-w-lg space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F7C7B]/30 border border-[#0F7C7B]/50 text-xs font-semibold text-teal-200">
            <span>Pilot Regional: Jawa Tengah</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Keputusan Berbasis Data &amp; Kecerdasan Spasial Terpadu
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Menghubungkan profil pelanggan, titik layanan, ancaman kompetitor, dan orkestrasi kanal secara presisi. Dari prediksi risiko hingga eksekusi terukur.
          </p>

          <div className="pt-2 flex items-center gap-6 text-xs text-slate-300">
            <div>
              <div className="text-lg font-bold text-white tabular-nums">1.248.560</div>
              <div className="text-[11px] text-slate-400">Total Pelanggan Terpetakan</div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <div className="text-lg font-bold text-white tabular-nums">48 Outlet</div>
              <div className="text-[11px] text-slate-400">Jaringan Titik Layanan</div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <div className="text-lg font-bold text-teal-400 tabular-nums">96,2%</div>
              <div className="text-[11px] text-slate-400">Indeks Kualitas Data</div>
            </div>
          </div>
        </div>

        {/* Bottom Security Note */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/60 pt-4">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Keamanan Data Perusahaan &amp; Tata Kelola AI Terotentikasi
          </span>
          <span>v1.0 • Pilot Jawa Tengah</span>
        </div>
      </div>

      {/* Right Login Panel (45%) */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-bold text-lg text-[#15324B]">SERVEON</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#17212B]">
              Selamat Datang di SERVEON
            </h2>
            <p className="text-xs text-[#607080] mt-1.5">
              Customer, Location &amp; Engagement Intelligence Platform
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-[#C73E3A] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {infoMessage && (
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-blue-600" />
              <span>{infoMessage}</span>
            </div>
          )}

          {/* Quick Persona Selector for Demo Testing */}
          <div className="bg-slate-50 border border-[#DDE3EA] rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#17212B] uppercase tracking-wider">
                Pilih Akun Demo / Peran:
              </span>
              <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                {selectedRole}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {PRESET_ACCOUNTS.map((preset) => (
                <button
                  key={preset.role}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`text-left p-2 rounded-lg border text-[11px] transition-all ${
                    selectedRole === preset.role
                      ? 'bg-white border-[#2563EB] text-[#2563EB] shadow-xs font-bold ring-1 ring-[#2563EB]'
                      : 'bg-white/80 border-[#DDE3EA] text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="truncate font-semibold">{preset.name}</div>
                  <div className="text-[9.5px] opacity-75 truncate">{preset.tag}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#17212B] mb-1.5">
                Alamat Email Kantor
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-[#607080] absolute left-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@perusahaan.co.id"
                  required
                  className="w-full bg-[#F5F7FA] border border-[#DDE3EA] focus:border-[#2563EB] focus:bg-white text-xs text-[#17212B] rounded-lg pl-9 pr-3 py-2.5 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#17212B]">
                  Kata Sandi
                </label>
                <button
                  type="button"
                  onClick={() => setInfoMessage('Tautan pemulihan kata sandi telah dikirimkan ke administrator IT SERVEON.')}
                  className="text-[11px] text-[#2563EB] hover:underline"
                >
                  Lupa kata sandi?
                </button>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-[#607080] absolute left-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#F5F7FA] border border-[#DDE3EA] focus:border-[#2563EB] focus:bg-white text-xs text-[#17212B] rounded-lg pl-9 pr-10 py-2.5 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#607080] hover:text-[#17212B]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#17212B]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#2563EB] border-[#DDE3EA] focus:ring-0"
                />
                <span>Ingat saya di perangkat ini</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
            >
              {isLoading ? (
                <span>Memverifikasi kredensial...</span>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Enterprise SSO Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DDE3EA]" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase">
              <span className="bg-white px-2 text-[#607080]">atau</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => onLoginSuccess(selectedRole)}
              className="w-full py-2 px-4 border border-[#DDE3EA] hover:bg-slate-50 text-xs font-semibold text-[#17212B] rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Masuk dengan Akun Perusahaan (SSO)</span>
            </button>

            <button
              type="button"
              onClick={() => onLoginSuccess(selectedRole)}
              className="w-full py-2 px-4 bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold text-emerald-800 border border-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Lanjutkan ke Dashboard SERVEON ({selectedRole}) →</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#DDE3EA] text-center space-y-2">
            <p className="text-[11px] text-[#607080]">
              Akses dilindungi dan seluruh aktivitas tercatat dalam log audit.
            </p>
            <div className="text-[10px] text-slate-400">
              Role aktif terpilih: <strong className="text-[#17212B]">{selectedRole}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
