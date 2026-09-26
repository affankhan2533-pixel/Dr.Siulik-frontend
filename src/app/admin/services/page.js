"use client";

import { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Activity,
} from 'lucide-react';
import {
  fetchServices,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
  addTreatmentToCategory,
  updateTreatmentInCategory,
  deleteTreatmentFromCategory,
} from '@/lib/api';

export default function ServicesManagerPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: '' }
  const [expandedCategories, setExpandedCategories] = useState({});

  // Category Modal State
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    title: '',
    description: '',
    tagline: '',
  });

  // Treatment Modal State
  const [treatmentModalOpen, setTreatmentModalOpen] = useState(false);
  const [targetCategoryId, setTargetCategoryId] = useState(null);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [treatmentForm, setTreatmentForm] = useState({
    name: '',
    desc: '',
    isActive: true,
  });

  // Delete Confirmation Modal State
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(null); // { type: 'category' | 'treatment', categoryId, treatmentId, title, message }

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await fetchServices();
      if (res && res.data) {
        setCategories(res.data);
        // Expand first category by default if none expanded
        if (Object.keys(expandedCategories).length === 0 && res.data.length > 0) {
          setExpandedCategories({ [res.data[0]._id || res.data[0].categoryId]: true });
        }
      }
    } catch (err) {
      showToast('error', 'Failed to load services. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const toggleExpand = (catId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // ========================================================
  // CATEGORY ACTIONS
  // ========================================================

  const openAddCategoryModal = () => {
    setEditingCategory(null);
    setCategoryForm({
      title: '',
      description: '',
      tagline: '',
    });
    setCategoryModalOpen(true);
  };

  const openEditCategoryModal = (cat) => {
    setEditingCategory(cat);
    setCategoryForm({
      title: cat.title || '',
      description: cat.description || '',
      tagline: cat.tagline || '',
    });
    setCategoryModalOpen(true);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!categoryForm.title.trim()) {
      showToast('error', 'Category Name is required.');
      return;
    }

    setActionLoading(true);
    try {
      if (editingCategory) {
        await updateServiceCategory(editingCategory._id, categoryForm);
        showToast('success', 'Service category updated successfully.');
      } else {
        await createServiceCategory(categoryForm);
        showToast('success', 'New service category added successfully.');
      }
      setCategoryModalOpen(false);
      loadServices();
    } catch (err) {
      showToast('error', err.message || 'Category action failed.');
    } finally {
      setActionLoading(false);
    }
  };

  // ========================================================
  // TREATMENT ACTIONS
  // ========================================================

  const openAddTreatmentModal = (categoryId) => {
    setTargetCategoryId(categoryId);
    setEditingTreatment(null);
    setTreatmentForm({
      name: '',
      desc: '',
      isActive: true,
    });
    setTreatmentModalOpen(true);
  };

  const openEditTreatmentModal = (categoryId, treatment) => {
    setTargetCategoryId(categoryId);
    setEditingTreatment(treatment);
    setTreatmentForm({
      name: treatment.name || '',
      desc: treatment.desc || '',
      isActive: treatment.isActive !== undefined ? treatment.isActive : true,
    });
    setTreatmentModalOpen(true);
  };

  const handleTreatmentSubmit = async (e) => {
    e.preventDefault();
    if (!treatmentForm.name.trim()) {
      showToast('error', 'Treatment Name is required.');
      return;
    }

    setActionLoading(true);
    try {
      if (editingTreatment) {
        await updateTreatmentInCategory(targetCategoryId, editingTreatment._id, treatmentForm);
        showToast('success', 'Treatment updated successfully.');
      } else {
        await addTreatmentToCategory(targetCategoryId, treatmentForm);
        showToast('success', 'New treatment added to category.');
      }
      setTreatmentModalOpen(false);
      loadServices();
    } catch (err) {
      showToast('error', err.message || 'Treatment action failed.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleTreatmentActive = async (categoryId, treatment) => {
    try {
      const nextActive = !treatment.isActive;
      await updateTreatmentInCategory(categoryId, treatment._id, {
        ...treatment,
        isActive: nextActive,
      });
      showToast('success', nextActive ? 'Treatment set to Active' : 'Treatment set to Inactive');
      loadServices();
    } catch (err) {
      showToast('error', 'Could not update treatment status.');
    }
  };

  // ========================================================
  // DELETE ACTIONS WITH CONFIRMATION
  // ========================================================

  const handleDeleteConfirm = async () => {
    if (!confirmDeleteModal) return;
    setActionLoading(true);

    try {
      if (confirmDeleteModal.type === 'category') {
        await deleteServiceCategory(confirmDeleteModal.categoryId);
        showToast('success', 'Service category removed.');
      } else if (confirmDeleteModal.type === 'treatment') {
        await deleteTreatmentFromCategory(confirmDeleteModal.categoryId, confirmDeleteModal.treatmentId);
        showToast('success', 'Treatment removed from category.');
      }
      setConfirmDeleteModal(null);
      loadServices();
    } catch (err) {
      showToast('error', err.message || 'Delete operation failed.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium flex items-center gap-2.5 transition-all animate-bounce ${
            toast.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
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
            CLINICAL DISCIPLINES
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Services &amp; Treatments Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage dental service categories and specific treatments shown on the public website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadServices}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            title="Refresh Services"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={openAddCategoryModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* ── CATEGORIES LIST ── */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <div className="w-8 h-8 border-2 border-teal-700 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono text-slate-500">Loading service categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No service categories found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Click &quot;Add Category&quot; to set up your first clinical discipline.
          </p>
          <button
            onClick={openAddCategoryModal}
            className="mt-4 px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold uppercase tracking-wider"
          >
            Add First Category
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((cat, index) => {
            const catId = cat._id || cat.categoryId;
            const isExpanded = Boolean(expandedCategories[catId]);
            const treatments = cat.treatments || [];
            const activeTreatmentsCount = treatments.filter((t) => t.isActive).length;

            return (
              <div
                key={catId}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                {/* ── Category Header Accordion Bar ── */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 bg-slate-50/50">
                  <div
                    onClick={() => toggleExpand(catId)}
                    className="flex items-start sm:items-center gap-3 cursor-pointer select-none flex-1"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-700 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      {cat.num || String(index + 1).padStart(2, '0')}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-base text-slate-900">
                          {cat.title}
                        </h2>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                          {activeTreatmentsCount} / {treatments.length} Active
                        </span>
                      </div>
                      {cat.description && (
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 max-w-xl">
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions for Category */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                    <button
                      onClick={() => openAddTreatmentModal(catId)}
                      className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Treatment</span>
                    </button>

                    <button
                      onClick={() => openEditCategoryModal(cat)}
                      className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-teal-700 hover:bg-slate-100 transition-colors"
                      title="Edit Category"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        setConfirmDeleteModal({
                          type: 'category',
                          categoryId: catId,
                          title: `Delete Category "${cat.title}"?`,
                          message: `Are you sure you want to delete this service category and its ${treatments.length} treatments? This will update the public website.`,
                        });
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => toggleExpand(catId)}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-700"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* ── Treatments Table / List (Collapsible) ── */}
                {isExpanded && (
                  <div className="p-4 sm:p-5">
                    {treatments.length === 0 ? (
                      <div className="p-6 text-center border border-dashed border-slate-200 rounded-xl">
                        <p className="text-xs text-slate-500">No treatments listed under this category yet.</p>
                        <button
                          onClick={() => openAddTreatmentModal(catId)}
                          className="mt-2 text-xs font-bold text-teal-700 hover:underline"
                        >
                          + Add First Treatment
                        </button>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                        {treatments.map((treatment, tIdx) => (
                          <div
                            key={treatment._id || tIdx}
                            className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-start gap-3 min-w-0 flex-1">
                              <span className="font-mono text-xs font-bold text-slate-400 pt-0.5 shrink-0">
                                {String(tIdx + 1).padStart(2, '0')}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-sm text-slate-900 truncate">
                                    {treatment.name}
                                  </h3>
                                  <span
                                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                                      treatment.isActive
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                                    }`}
                                  >
                                    {treatment.isActive ? 'Active' : 'Inactive'}
                                  </span>
                                </div>
                                {treatment.desc && (
                                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                    {treatment.desc}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Actions for Treatment */}
                            <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                              <button
                                onClick={() => handleToggleTreatmentActive(catId, treatment)}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition-colors ${
                                  treatment.isActive
                                    ? 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                                    : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                                }`}
                              >
                                {treatment.isActive ? 'Set Inactive' : 'Set Active'}
                              </button>

                              <button
                                onClick={() => openEditTreatmentModal(catId, treatment)}
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-teal-700 hover:bg-slate-50"
                                title="Edit Treatment"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => {
                                  setConfirmDeleteModal({
                                    type: 'treatment',
                                    categoryId: catId,
                                    treatmentId: treatment._id,
                                    title: `Delete Treatment "${treatment.name}"?`,
                                    message: `Are you sure you want to remove this treatment from "${cat.title}"?`,
                                  });
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                title="Delete Treatment"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* ── ADD / EDIT CATEGORY MODAL ── */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {editingCategory ? 'Edit Service Category' : 'Add Service Category'}
              </h3>
              <button
                onClick={() => setCategoryModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={categoryForm.title}
                  onChange={(e) => setCategoryForm({ ...categoryForm, title: e.target.value })}
                  placeholder="e.g. Cosmetic Dentistry"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tagline / Subheadline (Optional)
                </label>
                <input
                  type="text"
                  value={categoryForm.tagline}
                  onChange={(e) => setCategoryForm({ ...categoryForm, tagline: e.target.value })}
                  placeholder="e.g. Enhancing the natural beauty of your smile"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  placeholder="Concise overview of this dental discipline..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ── ADD / EDIT TREATMENT MODAL ── */}
      {treatmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {editingTreatment ? 'Edit Treatment' : 'Add Treatment'}
              </h3>
              <button
                onClick={() => setTreatmentModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTreatmentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Treatment Name *
                </label>
                <input
                  type="text"
                  required
                  value={treatmentForm.name}
                  onChange={(e) => setTreatmentForm({ ...treatmentForm, name: e.target.value })}
                  placeholder="e.g. Tooth-coloured Fillings"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Optional Short Description
                </label>
                <textarea
                  rows={2}
                  value={treatmentForm.desc}
                  onChange={(e) => setTreatmentForm({ ...treatmentForm, desc: e.target.value })}
                  placeholder="e.g. Shade-matched biocompatible composite resins."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="treatmentActiveCheck"
                  checked={treatmentForm.isActive}
                  onChange={(e) => setTreatmentForm({ ...treatmentForm, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="treatmentActiveCheck" className="text-xs font-semibold text-slate-800 cursor-pointer">
                  Active (Visible in public treatment index)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setTreatmentModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {actionLoading ? 'Saving...' : editingTreatment ? 'Save Changes' : 'Add Treatment'}
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
