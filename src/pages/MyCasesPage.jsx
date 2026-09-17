import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  Plus, 
  ShieldAlert, 
  Trash2, 
  Edit3, 
  Search, 
  Calendar, 
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { getLoggedCases, addLoggedCase, updateLoggedCase, deleteLoggedCase, getRotations } from '../lib/db/storage';
import { Modal } from '../components/ui/Modal';
import { useRotation } from '../context/RotationContext';
import { HandDrawnButton } from '../components/ui/HandDrawnButton';
import { HandDrawnCard } from '../components/ui/HandDrawnCard';

export function MyCasesPage() {
  const { progress } = useRotation();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);

  const rotations = getRotations();

  const loadCases = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetched = await getLoggedCases();
      setLogs(Array.isArray(fetched) ? fetched : []);
    } catch (err) {
      console.error('Error loading clinical cases:', err);
      setError('Unable to load clinical cases. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    rotationId: progress?.rotation?.id || 'general-surgery',
    category: 'Acute Abdomen',
    chiefComplaint: '',
    diagnosisCategory: '',
    observed: '',
    learned: '',
    questionsHad: '',
    topicsToReview: ''
  });

  const handleOpenNew = () => {
    setEditingId(null);
    setFormError(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      rotationId: progress?.rotation?.id || 'general-surgery',
      category: 'Acute Abdomen',
      chiefComplaint: '',
      diagnosisCategory: '',
      observed: '',
      learned: '',
      questionsHad: '',
      topicsToReview: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (log) => {
    setEditingId(log.id);
    setFormError(null);
    setFormData({
      date: log.date || new Date().toISOString().split('T')[0],
      rotationId: log.rotationId || progress?.rotation?.id || 'general-surgery',
      category: log.category || 'General Clinical',
      chiefComplaint: log.chiefComplaint || '',
      diagnosisCategory: log.diagnosisCategory || '',
      observed: log.observed || '',
      learned: log.learned || '',
      questionsHad: log.questionsHad || '',
      topicsToReview: Array.isArray(log.topicsToReview) ? log.topicsToReview.join(', ') : (log.topicsToReview || '')
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this clinical case log?')) return;
    try {
      await deleteLoggedCase(id);
      await loadCases();
    } catch (err) {
      console.error('Failed to delete case log:', err);
      alert('Could not delete case log. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!formData.chiefComplaint.trim()) return;

    setSaving(true);
    try {
      const payload = {
        ...formData,
        topicsToReview: formData.topicsToReview 
          ? formData.topicsToReview.split(',').map(s => s.trim()).filter(Boolean)
          : []
      };

      if (editingId) {
        await updateLoggedCase(editingId, payload);
      } else {
        await addLoggedCase(payload);
      }
      setIsModalOpen(false);
      await loadCases();
    } catch (err) {
      console.error('Error saving case log:', err);
      setFormError(err.message || 'Failed to save case log. Please ensure you are signed in.');
    } finally {
      setSaving(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (log.chiefComplaint && log.chiefComplaint.toLowerCase().includes(q)) ||
      (log.diagnosisCategory && log.diagnosisCategory.toLowerCase().includes(q)) ||
      (log.category && log.category.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto space-y-8 font-serif animate-in fade-in duration-150 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <span className="text-xs font-serif font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">04 // Logged Clinical Encounters</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2 mt-0.5">
            <ClipboardList className="w-7 h-7 text-blue-700 dark:text-blue-400" />
            <span>My Clinical Cases</span>
          </h1>
          <p className="text-sm font-serif text-slate-600 dark:text-slate-400 mt-1">
            De-identified patient encounter learning journal for rounds & portfolio.
          </p>
        </div>

        <HandDrawnButton
          onClick={handleOpenNew}
          variant="accent"
          size="md"
          icon={Plus}
        >
          Log Clinical Case
        </HandDrawnButton>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-blue-700 dark:text-blue-400" />
          <input
            type="text"
            placeholder="Search logged cases by complaint or diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-serif text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-xs"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <HandDrawnCard variant="default" className="p-12 text-center space-y-3">
          <Loader2 className="w-10 h-10 text-blue-700 animate-spin mx-auto" />
          <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">Loading your clinical cases...</h3>
          <p className="text-sm font-serif text-slate-500">Retrieving your de-identified encounter logs.</p>
        </HandDrawnCard>
      ) : error ? (
        /* Error State */
        <HandDrawnCard variant="accent" className="p-8 text-center space-y-3 text-white">
          <AlertCircle className="w-10 h-10 mx-auto" />
          <h3 className="text-xl font-serif font-bold">Unable to load clinical cases</h3>
          <p className="text-sm font-serif max-w-md mx-auto">{error}</p>
          <HandDrawnButton
            onClick={loadCases}
            variant="outline"
            size="sm"
            icon={RefreshCw}
          >
            Retry
          </HandDrawnButton>
        </HandDrawnCard>
      ) : filteredLogs.length === 0 ? (
        /* Empty State */
        <HandDrawnCard variant="default" className="p-12 text-center space-y-3">
          <ClipboardList className="w-12 h-12 text-blue-700 mx-auto" />
          <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">No clinical cases logged yet</h3>
          <p className="text-sm font-serif text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Your clinical learning starts here. Log your first de-identified case encounter from rounds or clinic.
          </p>
          <HandDrawnButton
            onClick={handleOpenNew}
            variant="accent"
            size="sm"
          >
            + Add Case
          </HandDrawnButton>
        </HandDrawnCard>
      ) : (
        /* Success Grid State */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredLogs.map((log) => {
            const rot = rotations.find(r => r.id === log.rotationId);

            return (
              <HandDrawnCard
                key={log.id}
                variant="default"
                hoverEffect={true}
                className="space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <span className="text-xs font-serif font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">
                      {rot?.icon} {rot?.name || 'Rotation'} • {log.category}
                    </span>
                    <span className="text-xs font-serif text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-700" /> {log.date}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100">{log.diagnosisCategory || log.chiefComplaint}</h3>
                    <p className="text-xs font-serif text-slate-600 dark:text-slate-400 mt-0.5">Chief Complaint: {log.chiefComplaint}</p>
                  </div>

                  <div className="space-y-2 text-xs font-serif">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                      <p className="font-serif font-bold text-slate-900 dark:text-slate-100">What I Observed:</p>
                      <p className="text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">{log.observed}</p>
                    </div>

                    <div className="p-3 bg-blue-50/80 dark:bg-blue-950/40 rounded-lg border border-blue-200/80 dark:border-blue-900/50 text-blue-950 dark:text-blue-200">
                      <p className="font-serif font-bold text-blue-800 dark:text-blue-300">What I Learned:</p>
                      <p className="mt-0.5 leading-relaxed">{log.learned}</p>
                    </div>

                    {log.questionsHad && (
                      <p className="text-xs font-serif italic text-slate-600 dark:text-slate-400">
                        <strong>Questions I Had:</strong> {log.questionsHad}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(log.topicsToReview) && log.topicsToReview.map((t, topicIdx) => (
                      <span key={topicIdx} className="text-[11px] font-serif font-semibold bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(log)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-xs text-slate-600 dark:text-slate-300"
                      title="Edit Case"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(log.id)}
                      className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-800 bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 hover:bg-rose-100 transition-all shadow-xs"
                      title="Delete Case"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </HandDrawnCard>
            );
          })}
        </div>
      )}

      {/* Add / Edit Case Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Clinical Case Encounter' : 'Log De-Identified Clinical Encounter'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 font-serif">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs font-semibold flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-700" />
              <div className="flex-1">
                <span>{formError}</span>
              </div>
            </div>
          )}

          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 rounded-lg border border-amber-200 dark:border-amber-900/50 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-700" />
            <span>Reminder: Do NOT include patient name, hospital ID, address, or DOB.</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-serif font-bold text-slate-900 dark:text-slate-100 mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-serif text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-slate-900 dark:text-slate-100 mb-1">Rotation</label>
              <select
                value={formData.rotationId}
                onChange={(e) => setFormData({ ...formData, rotationId: e.target.value })}
                className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-serif text-slate-900 dark:text-slate-100"
              >
                {rotations.map(r => (
                  <option key={r.id} value={r.id}>{r.icon} {r.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-serif font-bold text-slate-900 dark:text-slate-100 mb-1">General Category</label>
              <input
                type="text"
                placeholder="e.g. Acute Abdomen, Trauma, Cardiac"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-serif text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-slate-900 dark:text-slate-100 mb-1">Diagnosis Category</label>
              <input
                type="text"
                placeholder="e.g. Acute Appendicitis, SBO"
                value={formData.diagnosisCategory}
                onChange={(e) => setFormData({ ...formData, diagnosisCategory: e.target.value })}
                className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-serif text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-serif font-bold text-slate-900 dark:text-slate-100 mb-1">Chief Complaint / Presentation</label>
            <input
              type="text"
              required
              placeholder="e.g. 22yo male with 18h RLQ pain and anorexia"
              value={formData.chiefComplaint}
              onChange={(e) => setFormData({ ...formData, chiefComplaint: e.target.value })}
              className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-serif text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-bold text-slate-900 dark:text-slate-100 mb-1">What I Observed</label>
            <textarea
              rows={2}
              placeholder="e.g. Observed laparoscopic appendectomy, noted harmonic scalpel mesoappendix division..."
              value={formData.observed}
              onChange={(e) => setFormData({ ...formData, observed: e.target.value })}
              className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-serif text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-bold text-slate-900 dark:text-slate-100 mb-1">What I Learned</label>
            <textarea
              rows={2}
              placeholder="e.g. Alvarado score utility, importance of inspecting Meckel diverticulum if appendix normal..."
              value={formData.learned}
              onChange={(e) => setFormData({ ...formData, learned: e.target.value })}
              className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-serif text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-serif font-bold text-slate-900 dark:text-slate-100 mb-1">Questions I Had</label>
              <input
                type="text"
                placeholder="e.g. When is non-op management indicated?"
                value={formData.questionsHad}
                onChange={(e) => setFormData({ ...formData, questionsHad: e.target.value })}
                className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-serif text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-slate-900 dark:text-slate-100 mb-1">Topics to Review (comma separated)</label>
              <input
                type="text"
                placeholder="Acute Appendicitis, Laparoscopy"
                value={formData.topicsToReview}
                onChange={(e) => setFormData({ ...formData, topicsToReview: e.target.value })}
                className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-serif text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-serif font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              Cancel
            </button>
            <HandDrawnButton
              type="submit"
              disabled={saving}
              variant="accent"
              size="sm"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{saving ? 'Saving...' : 'Save Case Log'}</span>
            </HandDrawnButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
