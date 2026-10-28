import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Eye,
  Download,
  UploadCloud,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DocumentCentreView: React.FC = () => {
  const { selectedApplication } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDocs = selectedApplication.documents.filter((d) => {
    const matchesSearch =
      d.fileName.toLowerCase().includes(search.toLowerCase()) ||
      d.documentType.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Document Centre
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Centralized repository of submitted technical institution credentials, land deeds, and compliance affidavits.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents by name or category..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
            {['all', 'Verified', 'In Review', 'Needs Info'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  statusFilter === s ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                }`}
              >
                {s === 'all' ? 'All Documents' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="pb-3">Document Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">File Size</th>
                <th className="pb-3">Upload Date</th>
                <th className="pb-3">Verification Status</th>
                <th className="pb-3">AI Pre-check</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/60">
                  <td className="py-3 font-bold font-mono text-slate-800">{doc.fileName}</td>
                  <td className="py-3 text-slate-600">{doc.documentType}</td>
                  <td className="py-3 text-slate-500">{doc.fileSize}</td>
                  <td className="py-3 text-slate-500">{doc.uploadDate}</td>
                  <td className="py-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.status === 'Verified'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : doc.status === 'In Review'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3">
                    {doc.aiCheck === 'passed' && (
                      <span className="flex items-center gap-1 font-bold text-emerald-600">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Passed
                      </span>
                    )}
                    {doc.aiCheck === 'review' && (
                      <span className="flex items-center gap-1 font-bold text-blue-600">
                        <RotateCw className="h-3.5 w-3.5 animate-spin" /> In Review
                      </span>
                    )}
                    {doc.aiCheck === 'warning' && (
                      <span className="flex items-center gap-1 font-bold text-amber-600">
                        <AlertTriangle className="h-3.5 w-3.5" /> Action Req
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => alert(`Opening preview for ${doc.fileName}...`)}
                      className="rounded-lg border border-slate-200 px-2.5 py-1 text-slate-700 hover:bg-slate-50 font-bold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
