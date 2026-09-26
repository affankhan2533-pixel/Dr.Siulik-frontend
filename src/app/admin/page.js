"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Image as ImageIcon, Layers, ArrowRight } from 'lucide-react';

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to /admin/media
    router.replace('/admin/media');
  }, [router]);

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <span className="text-xs font-mono font-bold tracking-widest text-teal-700 uppercase block mb-1">
          DR. SIULIK&apos;S DENTAL CARE
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Choose a management area below:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Link
          href="/admin/media"
          className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-teal-600 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
              MEDIA MANAGER
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Manage photos and videos across Hero, Doctor, Mentor, Clinic, Technology, Before &amp; After, Achievements, Certificates, and Gallery.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider">
            <span>Open Media</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/admin/services"
          className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-teal-600 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
              <Layers className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
              SERVICES MANAGER
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Manage the 7 dental clinical categories, short descriptions, and treatment lists.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider">
            <span>Open Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
