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
  CheckCircle2,
  KeyRound,
  UserCheck
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
  badge: string;
}> = [
  {
    role: 'Administrator',
    name: 'Johanes Admin',
    email: 'johanes.admin@serveon.id',
    title: 'Super Admin',
    badge: 'Akses Penuh'
  },
  {
    role: 'Executive / Management',
    name: 'Dewi Rahmawati',
    email: 'dewi.exec@serveon.id',
    title: 'VP Regional',
    badge: 'Eksekutif'
  },
  {
    role: 'Business / Marketing',
    name: 'Rian Kusuma',
    email: 'rian.mkt@serveon.id',
    title: 'Lead Marketing',
    badge: 'Kampanye'
  },
  {
    role: 'Network Development',
    name: 'Bambang Sudiro',
    email: 'bambang.net@serveon.id',
    title: 'Expansion Strategist',
    badge: 'Lokasi & POI'
  },
  {
    role: 'Data Analyst / Data Scientist',
    name: 'Siti Nurhaliza',
    email: 'siti.data@serveon.id',
    title: 'Geospatial ML',
    badge: 'Model & AI'
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
    setInfoMessage(`Akun disiapkan: ${preset.name} (${preset.title})`);
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
    }, 500);
  };

  const handleQuickDemoAccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole);
    }, 350);
  };

  return (
    <div className="min-h-screen w-full bg-[#060B15] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* High-Contrast Architectural Grid & Glow Backdrops */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#132238_1px,transparent_1px),linear-gradient(to_bottom,#132238_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-blue-600/12 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-teal-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Main Centered Login Card */}
      <div className="relative z-10 w-full max-w-[460px] bg-[#0D1526]/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-teal-400 text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/20 mb-3">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-white font-['Cabinet_Grotesk',sans-serif]">
              SERVEON
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              PILOT JATENG
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Platform Intelijen Spasial &amp; Retensi Pasar Jawa Tengah
          </p>
        </div>

        {/* Status Alerts */}
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

        {/* Demo Role / Persona Selector (Clean & Compact) */}
        <div className="mb-5 p-3 rounded-xl bg-slate-900/90 border border-slate-800/90">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              Pilih Peran Demo:
            </span>
            <span className="text-[10px] font-bold text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/50">
              {currentPreset.role}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1">
            {PRESET_ACCOUNTS.map((preset) => {
              const isSelected = selectedRole === preset.role;
              return (
                <button
                  key={preset.role}
                  type="button"
                  onClick={() => handleSelectRole(preset)}
                  title={`${preset.name} — ${preset.title} (${preset.role})`}
                  className={`py-1.5 px-1 rounded-lg text-center text-[10.5px] transition-all border ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold border-blue-400 shadow-sm shadow-blue-900/40 ring-1 ring-blue-300/30'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="truncate font-semibold">{preset.badge}</div>
                </button>
              );
            })}
          </div>
          <div className="mt-2 text-[10.5px] text-slate-400 flex items-center justify-between px-1">
            <span className="truncate text-slate-300 font-medium">{currentPreset.name}</span>
            <span className="text-slate-500 font-mono text-[10px]">{currentPreset.email}</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Korporat
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@serveon.id"
                required
                className="w-full bg-slate-950/90 border border-slate-700/90 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs text-white rounded-xl pl-10 pr-3 py-2.5 outline-none transition-all placeholder:text-slate-600"
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
                onClick={() => setInfoMessage('Instruksi pemulihan kata sandi telah dikirimkan ke IT Administrator.')}
                className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
              >
                Lupa sandi?
              </button>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-slate-950/90 border border-slate-700/90 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-xs text-white rounded-xl pl-10 pr-10 py-2.5 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-blue-600 bg-slate-950 border-slate-700 focus:ring-0 cursor-pointer"
              />
              <span>Ingat kredensial di perangkat ini</span>
            </label>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Memverifikasi Akses...
              </span>
            ) : (
              <>
                <span>Masuk ke Dashboard ({selectedRole.split(' ')[0]})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-semibold">
            <span className="bg-[#0D1526] px-2 text-slate-500">opsi masuk cepat</span>
          </div>
        </div>

        {/* Direct Bypass Actions */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleQuickDemoAccess}
            className="w-full py-2.5 px-4 bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Akses Cepat Mode Demo Jawa Tengah →</span>
          </button>

          <button
            type="button"
            onClick={() => onLoginSuccess(selectedRole)}
            className="w-full py-2 px-4 bg-slate-900/80 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-xl text-[11px] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-slate-500" />
            <span>Masuk dengan Single Sign-On (SSO) Perusahaan</span>
          </button>
        </div>

        {/* Security & Audit Footer Note */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 text-center space-y-1">
          <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Enkripsi 256-Bit • Sesi Terlindungi ISO 27001</span>
          </div>
          <div className="text-[9.5px] text-slate-500">
            &copy; 2026 SERVEON Pilot Regional Jawa Tengah
          </div>
        </div>

      </div>
    </div>
  );
};
