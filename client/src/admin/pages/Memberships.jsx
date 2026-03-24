import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as XLSX from 'xlsx';
import {
  Download, Trash2, Eye, RefreshCw, FileSpreadsheet,
  AlertTriangle, Pencil, CheckCircle2, XCircle, Clock,
  Search, ChevronLeft, ChevronRight, ChevronsUpDown,
  ChevronUp, ChevronDown, SlidersHorizontal, X,
} from 'lucide-react';
import Modal from '../components/Modal';
import membershipService from '../services/membership.service';
import templateService from '../services/template.service';
const SERVER = (import.meta.env.VITE_API_BASE_URL || 'https://backend.semi.org.in/api').replace(/\/api\/?$/, '');

/* ─── Status config ─── */
const statusCfg = {
  pending:  { label: 'Pending',   Icon: Clock,         bg: 'bg-amber-50',    text: 'text-amber-700',   border: 'border-amber-200',  dot: 'bg-amber-400' },
  'on-review': { label: 'On Review', Icon: Eye,           bg: 'bg-indigo-50',   text: 'text-indigo-700',  border: 'border-indigo-200', dot: 'bg-indigo-500' },
  approved: { label: 'Approved',  Icon: CheckCircle2,  bg: 'bg-emerald-50',  text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  rejected: { label: 'Rejected',  Icon: XCircle,       bg: 'bg-red-50',      text: 'text-red-600',     border: 'border-red-200',     dot: 'bg-red-500'  },
};

const StatusBadge = ({ status }) => {
  const c = statusCfg[status] || statusCfg.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${c.bg} ${c.text} ${c.border} whitespace-nowrap`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
};

/* ─── Avatar ─── */
const Avatar = ({ photo, name }) => (
  photo
    ? <img src={`${SERVER}/${photo}`} alt={name}
        className="h-9 w-9 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0" />
    : <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">
        {(name || 'M')[0].toUpperCase()}
      </div>
);

/* ─── Sort icon ─── */
const SortIcon = ({ field, sortConfig }) => {
  if (sortConfig.field !== field) return <ChevronsUpDown className="h-3.5 w-3.5 text-gray-300 flex-shrink-0" />;
  return sortConfig.dir === 'asc'
    ? <ChevronUp   className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
    : <ChevronDown className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />;
};

/* ─── Detail row for view modal ─── */
const DetailRow = ({ label, value }) => (
  <div className="py-2.5 border-b border-gray-50 last:border-0 flex flex-col gap-0.5">
    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
    <span className="text-sm text-gray-800 font-medium break-words">{value || '—'}</span>
  </div>
);

const FileLink = ({ url, label }) => {
  if (!url) return <span className="text-gray-300 text-xs italic">Not uploaded</span>;
  const href = url.startsWith('http') ? url : `${SERVER}/${url}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-800 hover:underline transition-colors">
      ↗ {label}
    </a>
  );
};

/* ─── Excel fields ─── */
const EXCEL_FIELDS = [
  ['Date',           m => m.date        ? new Date(m.date).toLocaleDateString()      : ''],
  ['Full Name',      m => m.fullName],
  ['Designation',    m => m.designation],
  ['Office Address', m => m.officeAddress],
  ['Home Address',   m => m.homeAddress],
  ['State',          m => m.state],
  ['Office Phone',   m => m.officePhone],
  ['Mobile Phone',   m => m.mobilePhone],
  ['Email',          m => m.email],
  ['Qualification',  m => m.qualificationType],
  ['MBBS College',   m => m.mbbsCollege],
  ['MBBS Year',      m => m.mbbsYear],
  ['Other Degree',   m => m.otherDegree],
  ['PG Details',     m => m.pgDetails],
  ['Status',         m => m.status],
  ['Applied On',     m => m.createdAt   ? new Date(m.createdAt).toLocaleDateString() : ''],
];

const PAGE_SIZES = [10, 20, 50];

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function Memberships() {
  const [members,      setMembers]      = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig,   setSortConfig]   = useState({ field: 'createdAt', dir: 'desc' });
  const [page,         setPage]         = useState(1);
  const [pageSize,     setPageSize]     = useState(10);
  const [showFilters,  setShowFilters]  = useState(false);
  const [templates,    setTemplates]    = useState([]);

  /* modals */
  const [viewM,   setViewM]   = useState(null);
  const [editM,   setEditM]   = useState(null);
  const [approveM, setApproveM] = useState(null); // New state for approval modal
  const [deleteM, setDeleteM] = useState(null);
  const [dlModal, setDlModal] = useState(false);

  /* edit */
  const [editForm,    setEditForm]    = useState({});
  const [approveForm, setApproveForm] = useState({ paymentLink: '', templateId: '', customMessage: '' });
  const [editErr,     setEditErr]     = useState('');
  const [editLoad,    setEditLoad]    = useState(false);
  const [delLoad,     setDelLoad]     = useState(false);
  const [approveLoad, setApproveLoad] = useState(false);

  /* ── fetch ── */
  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const [membersRes, templatesRes] = await Promise.all([
        membershipService.getAll(),
        templateService.getTemplates().catch(() => ({ data: [] }))
      ]);
      setMembers(membersRes.data || []);
      setTemplates(templatesRes.data || []);
      
      // Auto-select default template
      const defaultT = (templatesRes.data || []).find(t => t.isDefault);
      if (defaultT) setApproveForm(p => ({ ...p, templateId: defaultT._id }));
      else if ((templatesRes.data || []).length > 0) setApproveForm(p => ({ ...p, templateId: templatesRes.data[0]._id }));

    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { fetch(); }, [fetch]);

  /* ── derived data ── */
  const filtered = (() => {
    let arr = [...members];
    if (statusFilter !== 'all') arr = arr.filter(m => m.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      arr = arr.filter(m =>
        [m.fullName, m.email, m.state, m.mobilePhone, m.designation]
          .some(v => (v || '').toLowerCase().includes(q))
      );
    }
    if (sortConfig.field) {
      arr.sort((a, b) => {
        const va = (a[sortConfig.field] || '').toString().toLowerCase();
        const vb = (b[sortConfig.field] || '').toString().toLowerCase();
        return sortConfig.dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      });
    }
    return arr;
  })();

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated  = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (field) => {
    setSortConfig(prev =>
      prev.field === field
        ? { field, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { field, dir: 'asc' }
    );
    setPage(1);
  };

  /* ── edit ── */
  const openEdit = (m) => {
    setEditM(m);
    setEditForm({
      fullName: m.fullName || '',
      designation: m.designation || '',
      officeAddress: m.officeAddress || '',
      homeAddress: m.homeAddress || '',
      state: m.state || '',
      officePhone: m.officePhone || '',
      mobilePhone: m.mobilePhone || '',
      email: m.email || '',
      qualificationType: m.qualificationType || 'MBBS',
      mbbsCollege: m.mbbsCollege || '',
      mbbsYear: m.mbbsYear || '',
      otherDegree: m.otherDegree || '',
      pgDetails: m.pgDetails || '',
      status: m.status || 'pending',
    });
    setEditErr('');
  };

  const saveEdit = async () => {
    setEditLoad(true); setEditErr('');
    try {
      const payload = { ...editForm };
      if (editForm.status === 'approved') {
         // If status is approved in the general edit form, we might want to ensure they provided email fields?
         // For now, let's keep it simple or redirect to the approve modal if they select approved
      }
      const response = await membershipService.update(editM._id, payload);
      setMembers(prev => prev.map(m => m._id === editM._id ? response.data : m));
      setEditM(null);
    } catch (e) { setEditErr(e.message || 'Failed to update.'); }
    finally { setEditLoad(false); }
  };

  /* ── approve ── */
  const doApprove = async () => {
    setApproveLoad(true);
    try {
      const response = await membershipService.update(approveM._id, {
        status: 'approved',
        paymentLink: approveForm.paymentLink,
        templateId: approveForm.templateId,
        customMessage: approveForm.customMessage
      });
      setMembers(prev => prev.map(m => m._id === approveM._id ? response.data : m));
      setApproveM(null);
      // Keep template selection but reset others? Or reset all.
      setApproveForm(p => ({ ...p, paymentLink: '', customMessage: '' }));
    } catch (e) {
      alert(e.message || 'Approval failed.');
    } finally {
      setApproveLoad(false);
    }
  };

  /* ── status quick toggle ── */
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await membershipService.update(id, { status: newStatus });
      const updated = response.data;
      setMembers(prev => prev.map(m => m._id === id ? updated : m));
      // Update active modal states if they refer to this record
      if (editM?._id === id) setEditForm(p => ({ ...p, status: updated.status }));
      if (viewM?._id === id) setViewM(updated);
    } catch (e) {
      alert(e.message || 'Status update failed.');
    }
  };

  /* ── delete ── */
  const doDelete = async () => {
    setDelLoad(true);
    try {
      await membershipService.delete(deleteM._id);
      setMembers(prev => prev.filter(m => m._id !== deleteM._id));
      setDeleteM(null);
    } catch (e) { alert(e.message || 'Delete failed.'); }
    finally { setDelLoad(false); }
  };

  /* ── excel ── */
  const exportXLSX = (scope) => {
    const data = scope === 'all' ? members : filtered;
    const rows = data.map(m => {
      const row = {};
      EXCEL_FIELDS.forEach(([col, fn]) => { row[col] = fn(m); });
      return row;
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = EXCEL_FIELDS.map(() => ({ wch: 22 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Memberships');
    XLSX.writeFile(wb, `SEMI_Members_${new Date().toISOString().slice(0, 10)}.xlsx`);
    setDlModal(false);
  };

  /* ── Th helper ── */
  const Th = ({ label, field, hidden = '' }) => (
    <th
      onClick={() => field && handleSort(field)}
      className={`px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap select-none ${field ? 'cursor-pointer hover:text-primary-600 hover:bg-primary-50/50 transition-colors' : ''} ${hidden}`}
    >
      <span className="inline-flex items-center gap-1.5">
        {label}
        {field && <SortIcon field={field} sortConfig={sortConfig} />}
      </span>
    </th>
  );

  /* ── Paginator pages ── */
  const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce((acc, p, i, arr) => {
      if (i > 0 && arr[i - 1] !== p - 1) acc.push('…');
      acc.push(p);
      return acc;
    }, []);

  /* ════════ RENDER ════════ */
  return (
    <div className="space-y-5">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Memberships</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {loading ? 'Loading…' : `${filtered.length} of ${members.length} records`}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={fetch} title="Refresh"
            className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button onClick={() => setShowFilters(s => !s)}
            className={`flex items-center gap-2 h-9 px-3 rounded-xl border text-sm font-medium transition-all shadow-sm ${
              showFilters || statusFilter !== 'all'
                ? 'bg-primary-50 border-primary-200 text-primary-700'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}>
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {statusFilter !== 'all' && (
              <span className="h-4 w-4 rounded-full bg-primary-600 text-white text-[9px] font-bold flex items-center justify-center">1</span>
            )}
          </button>
          <button onClick={() => setDlModal(true)}
            className="flex items-center gap-2 h-9 px-4 text-sm font-semibold bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-md shadow-primary-200">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* ── Search + Filters row ── */}
      <div className="flex flex-col gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, email, mobile, state, designation…"
            className="w-full h-10 pl-10 pr-10 text-sm border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all placeholder:text-gray-400"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Collapsible filters */}
        {showFilters && (
          <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-xl border border-gray-200 shadow-sm animate-fadeIn">
            <span className="text-xs font-semibold text-gray-500 mr-1">Status:</span>
            {['all', 'pending', 'on-review', 'approved', 'rejected'].map(s => (
              <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`h-7 px-3 rounded-lg text-xs font-semibold capitalize transition-all border ${
                  statusFilter === s
                    ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                }`}>
                {s === 'all' ? 'All' : s}
              </button>
            ))}
            {statusFilter !== 'all' && (
              <button onClick={() => setStatusFilter('all')}
                className="h-7 px-2 rounded-lg text-xs text-gray-400 hover:text-gray-600 transition-colors ml-auto">
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
              <div className="absolute inset-0 rounded-full border-4 border-t-primary-600 animate-spin" />
            </div>
            <p className="text-sm font-medium text-gray-400">Loading memberships…</p>
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-300">
            <FileSpreadsheet className="h-14 w-14 opacity-50" />
            <p className="text-sm font-medium text-gray-400">No records match your search.</p>
            {(search || statusFilter !== 'all') && (
              <button onClick={() => { setSearch(''); setStatusFilter('all'); }}
                className="text-xs font-semibold text-primary-600 hover:underline mt-1">
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* ── Desktop / Tablet table ── */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-100">
                    <Th label="#"             />
                    <Th label="Member"        field="fullName" />
                    <Th label="Contact"       field="email"    hidden="hidden lg:table-cell" />
                    <Th label="State"         field="state"    hidden="hidden xl:table-cell" />
                    <Th label="Qualification" field="qualificationType" hidden="hidden lg:table-cell" />
                    <Th label="Status"        field="status"   />
                    <Th label="Applied"       field="createdAt" hidden="hidden md:table-cell" />
                    <th className="px-4 py-3 text-right text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginated.map((m, idx) => (
                    <tr key={m._id}
                      className="group hover:bg-blue-50/30 transition-colors duration-100">

                      {/* # */}
                      <td className="px-4 py-3.5 w-10">
                        <span className="text-xs font-medium text-gray-300">
                          {(page - 1) * pageSize + idx + 1}
                        </span>
                      </td>

                      {/* Member */}
                      <td className="px-4 py-3.5 min-w-[200px] max-w-[240px]">
                        <div className="flex items-center gap-3">
                          <Avatar photo={m.photograph} name={m.fullName} />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate leading-tight">{m.fullName || '—'}</p>
                            <p className="text-xs text-gray-400 truncate mt-0.5">{m.designation || '—'}</p>
                          </div>
                        </div>
                      </td>

                      {/* Contact — lg+ */}
                      <td className="px-4 py-3.5 min-w-[180px] max-w-[220px] hidden lg:table-cell">
                        <p className="text-sm text-gray-700 truncate">{m.email || '—'}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{m.mobilePhone || '—'}</p>
                      </td>

                      {/* State — xl+ */}
                      <td className="px-4 py-3.5 hidden xl:table-cell">
                        <span className="text-sm text-gray-600 whitespace-nowrap">{m.state || '—'}</span>
                      </td>

                      {/* Qualification — lg+ */}
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-100 whitespace-nowrap">
                          {m.qualificationType || '—'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <StatusBadge status={m.status} />
                      </td>

                      {/* Applied — md+ */}
                      <td className="px-4 py-3.5 hidden md:table-cell whitespace-nowrap">
                        <span className="text-xs text-gray-400">
                          {m.createdAt
                            ? new Date(m.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                            : '—'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="inline-flex items-center gap-1 bg-gray-50 rounded-xl p-1 border border-gray-100 group-hover:border-gray-200 group-hover:bg-white group-hover:shadow-sm transition-all">
                          <button onClick={() => setViewM(m)} title="View"
                            className="h-7 w-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-primary-100 hover:text-primary-700 transition-colors">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => openEdit(m)} title="Edit"
                            className="h-7 w-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-amber-100 hover:text-amber-700 transition-colors">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => setDeleteM(m)} title="Delete"
                            className="h-7 w-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-100 hover:text-red-700 transition-colors">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile card list ── */}
            <div className="sm:hidden divide-y divide-gray-50">
              {paginated.map((m, idx) => (
                <div key={m._id} className="p-4 hover:bg-gray-50/60 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar photo={m.photograph} name={m.fullName} />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{m.fullName || '—'}</p>
                        <p className="text-xs text-gray-400 truncate">{m.designation || '—'}</p>
                      </div>
                    </div>
                    <StatusBadge status={m.status} />
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                    <div>
                      <span className="text-gray-400 block">Email</span>
                      <span className="text-gray-700 font-medium truncate block">{m.email || '—'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Mobile</span>
                      <span className="text-gray-700 font-medium">{m.mobilePhone || '—'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">State</span>
                      <span className="text-gray-700 font-medium">{m.state || '—'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Qualification</span>
                      <span className="text-gray-700 font-medium">{m.qualificationType || '—'}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-gray-300">
                      {m.createdAt ? new Date(m.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                    </span>
                    <div className="flex items-center gap-1 flex-wrap">
                      <button onClick={() => setViewM(m)}
                        className="h-8 px-2 flex items-center gap-1 rounded-lg text-[10px] font-bold text-primary-600 bg-primary-50 border border-primary-100 whitespace-nowrap">
                        <Eye className="h-3 w-3" /> View
                      </button>
                      <button onClick={() => openEdit(m)}
                        className="h-8 px-2 flex items-center gap-1 rounded-lg text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 whitespace-nowrap">
                        <Pencil className="h-3 w-3" /> Edit
                      </button>
                      <button onClick={() => setDeleteM(m)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg text-red-500 bg-red-50 hover:bg-red-100 transition-colors border border-red-100">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Footer: page size + pagination ── */}
        {!loading && filtered.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            {/* Left: count + page size */}
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>
                {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
              </span>
              <select
                value={pageSize}
                onChange={e => { setPageSize(+e.target.value); setPage(1); }}
                className="h-7 px-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-400 cursor-pointer"
              >
                {PAGE_SIZES.map(s => <option key={s} value={s}>{s} / page</option>)}
              </select>
            </div>

            {/* Right: page buttons */}
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="h-7 w-7 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xs">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              {pageNums.map((p, i) =>
                p === '…' ? (
                  <span key={`e${i}`} className="h-7 w-5 flex items-center justify-center text-gray-400 text-xs">…</span>
                ) : (
                  <button key={p} onClick={() => setPage(p)}
                    className={`h-7 w-7 text-xs font-semibold rounded-lg transition-all ${
                      page === p
                        ? 'bg-primary-600 text-white shadow-sm shadow-primary-200'
                        : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
                    }`}>
                    {p}
                  </button>
                )
              )}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="h-7 w-7 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ══ VIEW MODAL ══ */}
      <Modal isOpen={!!viewM} onClose={() => setViewM(null)} title="Member Details" size="2xl"
        footer={viewM && (
          <div className="flex flex-wrap items-center justify-between w-full gap-3">
            <div className="flex items-center gap-2">
              {viewM.status !== 'on-review' && viewM.status !== 'approved' && (
                <button 
                  onClick={() => updateStatus(viewM._id, 'on-review')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" /> Send to Review
                </button>
              )}
              {viewM.status !== 'approved' && (
                <button 
                  onClick={() => { setApproveM(viewM); setViewM(null); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                </button>
              )}
              {viewM.status !== 'rejected' && (
                <button 
                  onClick={() => updateStatus(viewM._id, 'rejected')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <XCircle className="h-3.5 w-3.5" /> Reject
                </button>
              )}
            </div>
            <button onClick={() => setViewM(null)}
              className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              Close
            </button>
          </div>
        )}>
        {viewM && (
          <div className="space-y-6">
            {/* Profile banner */}
            <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border border-primary-100">
              <Avatar photo={viewM.photograph} name={viewM.fullName} />
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate">{viewM.fullName}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{viewM.designation}</p>
                <div className="mt-2"><StatusBadge status={viewM.status} /></div>
              </div>
            </div>

            {/* Detail grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
              <div>
                <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-2">Personal</p>
                <DetailRow label="Email"        value={viewM.email} />
                <DetailRow label="Mobile"       value={viewM.mobilePhone} />
                <DetailRow label="Office Phone" value={viewM.officePhone} />
                <DetailRow label="State"        value={viewM.state} />
                <DetailRow label="Home Address" value={viewM.homeAddress} />
                <DetailRow label="Office Addr." value={viewM.officeAddress} />
              </div>
              <div className="mt-5 sm:mt-0">
                <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-2">Qualification</p>
                <DetailRow label="Type"         value={viewM.qualificationType} />
                <DetailRow label="MBBS College" value={viewM.mbbsCollege} />
                <DetailRow label="MBBS Year"    value={viewM.mbbsYear} />
                <DetailRow label="Other Degree" value={viewM.otherDegree} />
                <DetailRow label="PG Details"   value={viewM.pgDetails} />
                <DetailRow label="Applied On"   value={viewM.createdAt ? new Date(viewM.createdAt).toLocaleDateString('en-IN') : ''} />
              </div>
            </div>

            {/* Documents */}
            <div>
              <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-3">Documents</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[{ label: 'MCI File', path: viewM.mciFile }, { label: 'PG File', path: viewM.pgFile }, { label: 'Photo', path: viewM.photograph }]
                  .map(d => (
                    <div key={d.label} className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                      <p className="text-[10px] font-bold text-gray-400 mb-1.5 uppercase">{d.label}</p>
                      <FileLink url={d.path} label={d.label} />
                    </div>
                  ))}
                {(viewM.otherDocs || []).map((d, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                    <p className="text-[10px] font-bold text-gray-400 mb-1.5 uppercase">Other {i + 1}</p>
                    <FileLink url={d} label={`Doc ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ══ EDIT MODAL ══ */}
      <Modal isOpen={!!editM} onClose={() => setEditM(null)} title={`Edit — ${editM?.fullName || ''}`} size="xl"
        footer={
          <>
            <button onClick={() => setEditM(null)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button onClick={saveEdit} disabled={editLoad}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-60">
              {editLoad && <div className="h-3.5 w-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
              Save Changes
            </button>
          </>
        }>
        {editErr && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm border border-red-100">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />{editErr}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Full Name',      key: 'fullName' },
            { label: 'Designation',    key: 'designation' },
            { label: 'Email',          key: 'email', type: 'email' },
            { label: 'Mobile Phone',   key: 'mobilePhone' },
            { label: 'Office Phone',   key: 'officePhone' },
            { label: 'State',          key: 'state' },
            { label: 'Home Address',   key: 'homeAddress' },
            { label: 'Office Address', key: 'officeAddress' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">{f.label}</label>
              <input type={f.type || 'text'} value={editForm[f.key] || ''}
                onChange={e => setEditForm(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
          ))}

          {/* Qualification Fields */}
          <div className="sm:col-span-2 border-t border-gray-100 pt-4 mt-2">
            <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-3">Qualification Details</p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Qualification Type</label>
            <select value={editForm.qualificationType || 'MBBS'}
              onChange={e => setEditForm(p => ({ ...p, qualificationType: e.target.value }))}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all cursor-pointer">
              <option value="MBBS">MBBS</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {editForm.qualificationType === 'MBBS' ? (
            <>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">MBBS College</label>
                <input type="text" value={editForm.mbbsCollege || ''}
                  onChange={e => setEditForm(p => ({ ...p, mbbsCollege: e.target.value }))}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">MBBS Year</label>
                <input type="text" value={editForm.mbbsYear || ''}
                  onChange={e => setEditForm(p => ({ ...p, mbbsYear: e.target.value }))}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Other Degree</label>
              <input type="text" value={editForm.otherDegree || ''}
                onChange={e => setEditForm(p => ({ ...p, otherDegree: e.target.value }))}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all" />
            </div>
          )}

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">PG Details</label>
            <textarea value={editForm.pgDetails || ''}
              onChange={e => setEditForm(p => ({ ...p, pgDetails: e.target.value }))}
              rows={2}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all resize-none" />
          </div>

          <div className="sm:col-span-2 border-t border-gray-100 pt-5 mt-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-2">Update Application Status</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-400">Current:</span>
                  <StatusBadge status={editForm.status} />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {editForm.status !== 'on-review' && editForm.status !== 'approved' && (
                  <button 
                    type="button"
                    onClick={() => editM && updateStatus(editM._id, 'on-review')}
                    className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100 transition-all shadow-sm"
                  >
                    <Eye className="h-3.5 w-3.5" /> Send to Review
                  </button>
                )}
                {editForm.status !== 'approved' && (
                  <button 
                    type="button"
                    onClick={() => editM && (setApproveM(editM), setEditM(null))}
                    className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-all shadow-sm"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Approve Flow
                  </button>
                )}
                {editForm.status !== 'rejected' && (
                  <button 
                    type="button"
                    onClick={() => editM && updateStatus(editM._id, 'rejected')}
                    className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-all shadow-sm"
                  >
                    <XCircle className="h-3.5 w-3.5" /> Reject
                  </button>
                )}
                {(editForm.status === 'on-review' || editForm.status === 'rejected') && (
                  <button 
                    type="button"
                    onClick={() => editM && updateStatus(editM._id, 'pending')}
                    className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-all shadow-sm"
                  >
                    <Clock className="h-3.5 w-3.5" /> Back to Pending
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* ══ APPROVE MODAL ══ */}
      <Modal isOpen={!!approveM} onClose={() => setApproveM(null)} title="Approve Membership" size="md"
        footer={
          <>
            <button onClick={() => setApproveM(null)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button onClick={doApprove} disabled={approveLoad || !approveForm.paymentLink}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-60">
              {approveLoad && <div className="h-3.5 w-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
              Approve & Send Email
            </button>
          </>
        }>
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Approve Application</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                You are about to approve <span className="font-semibold text-gray-800">{approveM?.fullName}</span>. 
                An automated email with the payment link and details will be sent to <span className="font-semibold text-gray-800">{approveM?.email}</span>.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Select Email Template</label>
              <div className="grid grid-cols-3 gap-3">
                {templates.map(t => (
                  <button
                    key={t._id}
                    type="button"
                    onClick={() => setApproveForm(p => ({ ...p, templateId: t._id }))}
                    className={`px-3 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      approveForm.templateId === t._id
                        ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
              {approveForm.templateId && templates.find(t => t._id === approveForm.templateId) && (
                <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                   <p className="text-[10px] text-gray-400 font-medium">Subject: <span className="text-gray-600 italic">"{templates.find(t => t._id === approveForm.templateId).subject}"</span></p>
                </div>
              )}
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Payment Link (Required)</label>
              <input 
                type="url" 
                value={approveForm.paymentLink}
                onChange={e => setApproveForm(p => ({ ...p, paymentLink: e.target.value }))}
                placeholder="https://payment-link.com/..."
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all font-mono" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Custom Message (Optional)</label>
              <textarea 
                value={approveForm.customMessage}
                onChange={e => setApproveForm(p => ({ ...p, customMessage: e.target.value }))}
                rows={3}
                placeholder="Add a personalized message to the email..."
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all resize-none" 
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* ══ DELETE MODAL ══ */}
      <Modal isOpen={!!deleteM} onClose={() => setDeleteM(null)} title="Confirm Delete" size="sm"
        footer={
          <>
            <button onClick={() => setDeleteM(null)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button onClick={doDelete} disabled={delLoad}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-60">
              {delLoad && <div className="h-3.5 w-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
              Delete Permanently
            </button>
          </>
        }>
        <div className="flex flex-col items-center text-center gap-4 py-3">
          <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <p className="text-base font-bold text-gray-900 mb-1">Are you sure?</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              You are about to permanently delete{' '}
              <span className="font-semibold text-gray-800">{deleteM?.fullName}</span>'s
              membership application along with all associated documents.
              <span className="block mt-1 text-red-500 font-medium text-xs">This action cannot be undone.</span>
            </p>
          </div>
        </div>
      </Modal>

      {/* ══ DOWNLOAD MODAL ══ */}
      <Modal isOpen={dlModal} onClose={() => setDlModal(false)} title="Export to Excel" size="sm">
        <div className="space-y-3 py-1">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100 mb-5">
            <FileSpreadsheet className="h-8 w-8 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-gray-900">Excel Export</p>
              <p className="text-xs text-gray-400">Download membership records as .xlsx</p>
            </div>
          </div>
          {[
            { label: 'All Records',           sub: `${members.length} total`, scope: 'all' },
            { label: 'Current Filtered View', sub: `${filtered.length} records`, scope: 'filtered' },
          ].map(o => (
            <button key={o.scope} onClick={() => exportXLSX(o.scope)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-700 transition-all text-left group">
              <div>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-700">{o.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{o.sub}</p>
              </div>
              <Download className="h-4 w-4 text-gray-300 group-hover:text-primary-500 flex-shrink-0 transition-colors" />
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
