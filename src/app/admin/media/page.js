"use client";

import { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Trash2,
  RefreshCw,
  Upload,
  Check,
  AlertCircle,
  X,
  Star,
  Film,
  Image as ImageIcon,
  Sparkles,
  Award,
  Layers,
  Camera,
  Play,
  CheckCircle2,
} from 'lucide-react';
import {
  fetchMedia,
  createMedia,
  updateMedia,
  deleteMedia,
  uploadMediaFile,
} from '@/lib/api';

const SECTIONS = [
  'Hero',
  'Doctor',
  'Mentor',
  'Clinic',
  'Technology',
  'Before & After',
  'Achievements',
  'Certificates',
  'Gallery',
  'Testimonials',
];

const GALLERY_CATEGORIES = [
  'Reception',
  'Waiting',
  'Treatment',
  'Equipment',
  'Interior',
  'Branding',
];

export default function MediaManagerPage() {
  const [activeSection, setActiveSection] = useState('Hero');
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: '' }

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalItem, setEditModalItem] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(null); // { item, title, message }

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    type: 'image',
    category: 'Reception',
    // Before & After
    caseName: '',
    beforeImage: '',
    afterImage: '',
    beforeLabel: 'Midline Space',
    afterLabel: 'Aesthetic Closure',
    isActive: true,
    tag: '',
    // Achievements & Certificates
    name: '',
    year: new Date().getFullYear().toString(),
    issuer: '',
    description: '',
    isFeatured: false,
    // Hero & Testimonials
    posterImage: '',
    label: 'PATIENT STORY',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedBeforeFile, setSelectedBeforeFile] = useState(null);
  const [selectedAfterFile, setSelectedAfterFile] = useState(null);
  const [selectedPosterFile, setSelectedPosterFile] = useState(null);
  const fileInputRef = useRef(null);

  // Load media items for the active section
  const loadSectionMedia = async (section) => {
    setLoading(true);
    try {
      const res = await fetchMedia(section);
      if (res && res.data) {
        setMediaList(res.data);
      }
    } catch (err) {
      showToast('error', 'Failed to load media. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSectionMedia(activeSection);
  }, [activeSection]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      url: '',
      type: activeSection === 'Hero' || activeSection === 'Testimonials' ? 'video' : 'image',
      category: 'Reception',
      caseName: '',
      beforeImage: '',
      afterImage: '',
      beforeLabel: 'BEFORE',
      afterLabel: 'AFTER',
      isActive: true,
      tag: '',
      name: '',
      year: new Date().getFullYear().toString(),
      issuer: '',
      description: '',
      isFeatured: false,
      posterImage: '',
      label: 'PATIENT STORY',
    });
    setSelectedFile(null);
    setSelectedBeforeFile(null);
    setSelectedAfterFile(null);
    setSelectedPosterFile(null);
    setEditModalItem(null);
  };

  const openAddModal = () => {
    resetForm();
    setAddModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditModalItem(item);
    setFormData({
      title: item.title || '',
      url: item.url || '',
      type: item.type || (activeSection === 'Hero' ? 'video' : 'image'),
      category: item.category || 'Reception',
      caseName: item.caseName || item.title || '',
      beforeImage: item.beforeImage || '',
      afterImage: item.afterImage || '',
      beforeLabel: item.beforeLabel || 'BEFORE',
      afterLabel: item.afterLabel || 'AFTER',
      isActive: item.isActive !== undefined ? item.isActive : true,
      tag: item.tag || '',
      name: item.name || '',
      year: item.year || new Date().getFullYear().toString(),
      issuer: item.issuer || '',
      description: item.description || '',
      isFeatured: Boolean(item.isFeatured),
      posterImage: item.posterImage || '',
      label: item.label || 'PATIENT STORY',
    });
    setSelectedFile(null);
    setSelectedBeforeFile(null);
    setSelectedAfterFile(null);
    setSelectedPosterFile(null);
    setAddModalOpen(true);
  };

  // Upload helper
  const handleUploadFile = async (file) => {
    if (!file) return null;
    try {
      const res = await uploadMediaFile(file);
      return res.data?.url || null;
    } catch (err) {
      throw new Error(`Upload failed: ${err.message}`);
    }
  };

  // Submit Add or Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      let finalUrl = formData.url;
      let finalBeforeImage = formData.beforeImage;
      let finalAfterImage = formData.afterImage;
      let finalPosterImage = formData.posterImage;

      // Handle file uploads if selected
      if (selectedFile) {
        showToast('info', 'Uploading media file...');
        finalUrl = await handleUploadFile(selectedFile);
      }
      if (selectedBeforeFile) {
        finalBeforeImage = await handleUploadFile(selectedBeforeFile);
      }
      if (selectedAfterFile) {
        finalAfterImage = await handleUploadFile(selectedAfterFile);
      }
      if (selectedPosterFile) {
        finalPosterImage = await handleUploadFile(selectedPosterFile);
      }

      // Validation for Before & After
      if (activeSection === 'Before & After') {
        if (!finalBeforeImage || !finalAfterImage) {
          showToast('error', 'Both Before and After images are required for a complete case.');
          setActionLoading(false);
          return;
        }
      }

      const payload = {
        section: activeSection,
        title: formData.title || formData.caseName || `${activeSection} Media`,
        url: finalUrl,
        type: formData.type || (activeSection === 'Hero' || activeSection === 'Testimonials' ? 'video' : 'image'),
        category: formData.category,
        caseName: formData.caseName,
        beforeImage: finalBeforeImage,
        afterImage: finalAfterImage,
        beforeLabel: formData.beforeLabel,
        afterLabel: formData.afterLabel,
        isActive: formData.isActive,
        tag: formData.tag,
        name: formData.name,
        year: formData.year,
        issuer: formData.issuer,
        description: formData.description,
        isFeatured: formData.isFeatured,
        posterImage: finalPosterImage,
        label: formData.label,
      };

      if (editModalItem) {
        await updateMedia(editModalItem._id, payload);
        showToast('success', `${activeSection} item updated successfully.`);
      } else {
        await createMedia(payload);
        showToast('success', `${activeSection} item added successfully.`);
      }

      setAddModalOpen(false);
      resetForm();
      loadSectionMedia(activeSection);
    } catch (err) {
      showToast('error', err.message || 'Operation failed.');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete handler
  const handleDeleteConfirm = async () => {
    if (!confirmDeleteModal?.item) return;
    setActionLoading(true);

    try {
      await deleteMedia(confirmDeleteModal.item._id);
      showToast('success', 'Media removed successfully.');
      setConfirmDeleteModal(null);
      loadSectionMedia(activeSection);
    } catch (err) {
      showToast('error', err.message || 'Delete failed.');
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle Feature on Achievement
  const handleToggleFeatured = async (item) => {
    try {
      const nextFeatured = !item.isFeatured;
      await updateMedia(item._id, { ...item, isFeatured: nextFeatured });
      showToast('success', nextFeatured ? 'Marked as Featured' : 'Removed from Featured');
      loadSectionMedia(activeSection);
    } catch (err) {
      showToast('error', 'Could not update featured state.');
    }
  };

  // Quick Replace image trigger
  const handleDirectReplace = async (item, file) => {
    if (!file) return;
    setActionLoading(true);
    showToast('info', 'Uploading replacement file...');
    try {
      const uploadedUrl = await handleUploadFile(file);
      await updateMedia(item._id, { ...item, url: uploadedUrl });
      showToast('success', 'Image replaced successfully.');
      loadSectionMedia(activeSection);
    } catch (err) {
      showToast('error', err.message || 'Replace failed.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium flex items-center gap-2.5 transition-all animate-bounce ${
            toast.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : toast.type === 'info'
              ? 'bg-blue-50 border-blue-200 text-blue-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-teal-700 uppercase block mb-1">
            MEDIA ASSET MANAGEMENT
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Manage Photos &amp; Media
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Select a public website section below to view, add, replace, or remove media assets.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media</span>
        </button>
      </div>

      {/* Section Selector Rail / Horizontal Tabs */}
      <div className="mb-6">
        <label className="block text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
          CHOOSE SECTION ({SECTIONS.length}):
        </label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section;
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-3.5 py-2 min-h-[38px] rounded-lg text-xs font-bold tracking-wide whitespace-nowrap transition-all touch-manipulation border ${
                  isActive
                    ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-teal-500 hover:text-slate-900'
                }`}
              >
                {section}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Section Info Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {activeSection} Section
            </h2>
            <span className="text-[11px] text-slate-500 font-mono">
              {mediaList.length} {mediaList.length === 1 ? 'item' : 'items'} currently configured
            </span>
          </div>
        </div>

        <button
          onClick={() => loadSectionMedia(activeSection)}
          disabled={loading}
          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* ── MEDIA LIST / GRID CONTENT ── */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <div className="w-8 h-8 border-2 border-teal-700 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono text-slate-500">Loading {activeSection} media items...</p>
        </div>
      ) : mediaList.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No media configured for {activeSection}</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Click &quot;Add Media&quot; above to upload or link an image for this section.
          </p>
          <button
            onClick={openAddModal}
            className="mt-4 px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold uppercase tracking-wider"
          >
            Add First {activeSection} Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {mediaList.map((item, index) => {
            const isVideo = item.type === 'video' || item.section === 'Hero' || item.section === 'Testimonials';
            const isBeforeAfter = item.section === 'Before & After';
            const isAchievement = item.section === 'Achievements';
            const isCertificate = item.section === 'Certificates';
            const isGallery = item.section === 'Gallery';

            return (
              <div
                key={item._id || index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* ── Thumbnail Frame ── */}
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden group">
                  {isBeforeAfter ? (
                    <div className="w-full h-full grid grid-cols-2 gap-0.5 bg-slate-800">
                      <div className="relative w-full h-full">
                        <img
                          src={item.beforeImage || '/assets/before-after/diastema-before.webp'}
                          alt="Before"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 left-1 bg-black/70 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded">
                          BEFORE
                        </span>
                      </div>
                      <div className="relative w-full h-full">
                        <img
                          src={item.afterImage || '/assets/before-after/diastema-after.webp'}
                          alt="After"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 bg-teal-700 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded">
                          AFTER
                        </span>
                      </div>
                    </div>
                  ) : isVideo ? (
                    <div className="w-full h-full relative flex items-center justify-center bg-slate-950">
                      {item.posterImage && (
                        <img
                          src={item.posterImage}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                      )}
                      <div className="w-10 h-10 rounded-full bg-teal-500/90 text-slate-950 flex items-center justify-center relative z-10">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[9px] uppercase">
                        VIDEO
                      </span>
                    </div>
                  ) : (
                    <img
                      src={item.url || item.image}
                      alt={item.title || item.name || 'Media'}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    {isAchievement && (
                      <button
                        onClick={() => handleToggleFeatured(item)}
                        className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                          item.isFeatured
                            ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                            : 'bg-black/50 text-white/70 hover:text-amber-300'
                        }`}
                        title={item.isFeatured ? 'Featured Achievement' : 'Click to Set as Featured'}
                      >
                        <Star className={`w-3.5 h-3.5 ${item.isFeatured ? 'fill-current' : ''}`} />
                      </button>
                    )}
                    {isGallery && item.category && (
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-teal-300 font-mono text-[9px] font-bold uppercase">
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* ── Metadata Area ── */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                      <span className="uppercase font-bold text-teal-700">
                        {item.section}
                      </span>
                      {item.year && <span>{item.year}</span>}
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                      {item.caseName || item.title || item.name || 'Media Item'}
                    </h3>

                    {item.issuer && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {item.issuer}
                      </p>
                    )}

                    {item.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {isBeforeAfter && (
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            item.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}
                        >
                          {item.isActive ? 'Active in Public Slider' : 'Inactive'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ── Action Buttons (Replace, Edit, Delete) ── */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-teal-600 hover:text-teal-700 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Edit / Replace</span>
                    </button>

                    <button
                      onClick={() => {
                        const isHeroVideo = item.section === 'Hero' && item.type === 'video';
                        setConfirmDeleteModal({
                          item,
                          title: isHeroVideo ? 'Confirm Hero Video Removal' : `Delete ${item.title || 'Media Item'}?`,
                          message: isHeroVideo
                            ? 'Are you sure you want to remove the Hero video? The website will fall back to displaying the poster image.'
                            : 'Are you sure you want to delete this media item? This action will update the public website.',
                        });
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ── ADD / EDIT MEDIA MODAL ── */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-5 sm:p-7 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-teal-700 uppercase">
                  {activeSection} SECTION
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {editModalItem ? 'Edit / Replace Media' : `Add ${activeSection} Media`}
                </h3>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Title / Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {activeSection === 'Before & After' ? 'Case Name / Title *' : activeSection === 'Achievements' ? 'Doctor / Mentor Name *' : 'Title / Label *'}
                </label>
                <input
                  type="text"
                  required
                  value={activeSection === 'Before & After' ? formData.caseName : activeSection === 'Achievements' ? formData.name : formData.title}
                  onChange={(e) => {
                    if (activeSection === 'Before & After') setFormData({ ...formData, caseName: e.target.value, title: e.target.value });
                    else if (activeSection === 'Achievements') setFormData({ ...formData, name: e.target.value });
                    else setFormData({ ...formData, title: e.target.value });
                  }}
                  placeholder={activeSection === 'Before & After' ? 'e.g. Diastema Closure' : 'e.g. Dr. Siulik Badajena'}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
                />
              </div>

              {/* Special Fields for Achievements */}
              {activeSection === 'Achievements' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Achievement / Workshop Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Implant Dentistry — Clinical Workshop"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                      <input
                        type="text"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        placeholder="2025"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Issuer / Academy</label>
                      <input
                        type="text"
                        value={formData.issuer}
                        onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                        placeholder="e.g. IAECD / IDA"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description (Optional)</label>
                    <textarea
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief note on certification..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isFeaturedCheck"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                    />
                    <label htmlFor="isFeaturedCheck" className="text-xs font-semibold text-slate-800 cursor-pointer">
                      Set as Featured Achievement
                    </label>
                  </div>
                </>
              )}

              {/* Special Fields for Certificates */}
              {activeSection === 'Certificates' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="2025"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Issuer</label>
                    <input
                      type="text"
                      value={formData.issuer}
                      onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                      placeholder="e.g. IDA Odisha"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Special Fields for Gallery */}
              {activeSection === 'Gallery' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gallery Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
                  >
                    {GALLERY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Special Fields for Before & After */}
              {activeSection === 'Before & After' ? (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Before Image */}
                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <label className="block text-xs font-bold text-slate-800">1. Before Image *</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedBeforeFile(e.target.files[0] || null)}
                        className="text-xs text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-teal-700 file:text-white"
                      />
                      <input
                        type="text"
                        placeholder="Or Before Image URL"
                        value={formData.beforeImage}
                        onChange={(e) => setFormData({ ...formData, beforeImage: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Before Label (e.g. Midline Space)"
                        value={formData.beforeLabel}
                        onChange={(e) => setFormData({ ...formData, beforeLabel: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                      />
                    </div>

                    {/* After Image */}
                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <label className="block text-xs font-bold text-slate-800">2. After Image *</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedAfterFile(e.target.files[0] || null)}
                        className="text-xs text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-teal-700 file:text-white"
                      />
                      <input
                        type="text"
                        placeholder="Or After Image URL"
                        value={formData.afterImage}
                        onChange={(e) => setFormData({ ...formData, afterImage: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                      />
                      <input
                        type="text"
                        placeholder="After Label (e.g. Aesthetic Closure)"
                        value={formData.afterLabel}
                        onChange={(e) => setFormData({ ...formData, afterLabel: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isActiveCase"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                    />
                    <label htmlFor="isActiveCase" className="text-xs font-semibold text-slate-800 cursor-pointer">
                      Display as Active Case in Public Website Comparison Slider
                    </label>
                  </div>
                </div>
              ) : (
                /* Standard Single Upload (Image or Video) */
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Upload File {activeSection === 'Hero' ? '(Video or Poster Image)' : '(Image)'}
                    </label>
                    <input
                      type="file"
                      accept={activeSection === 'Hero' || activeSection === 'Testimonials' ? 'video/mp4,image/*' : 'image/*'}
                      onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                      className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-700 file:text-white hover:file:bg-teal-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Or Direct Media URL / Path
                    </label>
                    <input
                      type="text"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="/assets/clinic/..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
                    />
                  </div>

                  {/* Optional Poster for Video (Hero or Testimonials) */}
                  {(activeSection === 'Hero' || activeSection === 'Testimonials') && (
                    <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <label className="block text-xs font-bold text-slate-800">
                        Video Fallback / Poster Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedPosterFile(e.target.files[0] || null)}
                        className="text-xs text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-white"
                      />
                      <input
                        type="text"
                        placeholder="Poster Image URL (e.g. /assets/hero/images/image.png)"
                        value={formData.posterImage}
                        onChange={(e) => setFormData({ ...formData, posterImage: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50 flex items-center gap-1.5"
                >
                  {actionLoading ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{editModalItem ? 'Save Changes' : 'Add to Section'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ── CONFIRM DELETE MODAL ── */}
      {confirmDeleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {confirmDeleteModal.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              {confirmDeleteModal.message}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setConfirmDeleteModal(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50"
              >
                {actionLoading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
