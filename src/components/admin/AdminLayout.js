"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Image as ImageIcon,
  Layers,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { isAdminAuthenticated, getAdminUser, clearAdminSession } from '@/lib/adminAuth';
import AdminLogin from './AdminLogin';

export default function AdminLayout({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check auth state
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = isAdminAuthenticated();
      setAuthenticated(isAuth);
      if (isAuth) {
        setUser(getAdminUser());
      }
      setLoading(false);
    };

    checkAuth();

    window.addEventListener('admin-auth-change', checkAuth);
    return () => window.removeEventListener('admin-auth-change', checkAuth);
  }, []);

  const handleLogout = () => {
    clearAdminSession();
    setAuthenticated(false);
    router.push('/admin');
  };

  const navItems = [
    {
      label: 'MEDIA',
      sublabel: 'Manage photos & videos by section',
      href: '/admin/media',
      icon: ImageIcon,
      active: pathname.startsWith('/admin/media'),
    },
    {
      label: 'SERVICES',
      sublabel: 'Manage dental services & treatments',
      href: '/admin/services',
      icon: Layers,
      active: pathname.startsWith('/admin/services'),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-teal-700 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            Loading Admin Portal...
          </span>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLoginSuccess={(u) => { setAuthenticated(true); setUser(u); }} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900 font-sans">
      
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white shrink-0 border-r border-slate-800 select-none">
        
        {/* Clinic Brand */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight text-white">
                Dr. Siulik&apos;s
              </h1>
              <span className="text-[10px] font-mono text-teal-400 tracking-wider uppercase block">
                ADMIN PANEL
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Area */}
        <div className="flex-1 px-3 py-6 space-y-1.5">
          <span className="px-3 text-[10px] font-mono font-bold tracking-[0.16em] text-slate-400 uppercase block mb-3">
            MANAGEMENT
          </span>

          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all text-sm font-semibold ${
                  item.active
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${item.active ? 'text-teal-200' : 'text-slate-400'}`} />
                <div className="flex flex-col">
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer Actions / Logout */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* ── MOBILE TOP NAVIGATION & TABS ── */}
      <header className="md:hidden bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-teal-600 flex items-center justify-center text-white">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-xs text-white block leading-tight">
                Dr. Siulik&apos;s Admin
              </span>
              <span className="text-[9px] font-mono text-teal-400 uppercase tracking-wider">
                Internal Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white"
              title="View Public Website"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Tabs */}
        <div className="grid grid-cols-2 border-t border-slate-800 bg-slate-950/60 text-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase border-b-2 transition-all ${
                  item.active
                    ? 'border-teal-400 text-teal-400 bg-teal-950/30'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
