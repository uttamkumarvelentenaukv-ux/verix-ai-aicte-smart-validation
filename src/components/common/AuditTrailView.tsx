import React, { useState } from 'react';
import { ScrollText, Search, Filter, ShieldCheck, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuditTrailView: React.FC = () => {
  const { auditEvents } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredEvents = auditEvents.filter((ev) => {
    const matchesRole = roleFilter === 'all' || ev.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesSearch =
      ev.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ev.applicationId && ev.applicationId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const exportAuditCsv = () => {
    const rows = [
      ['Event ID', 'Timestamp', 'Actor', 'Role', 'Action', 'Target', 'Details', 'Correlation ID'],
      ...filteredEvents.map((e) => [
        e.id,
        `"${e.timestamp}"`,
        `"${e.actor}"`,
        e.role,
        e.action,
        `"${e.target}"`,
        `"${e.details.replace(/"/g, '""')}"`,
        e.correlationId,
      ]),
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VERIX_AI_Audit_Log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Immutable Regulatory Audit Log
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically correlated, append-only traceability of all validation events, human scrutiny decisions, and rule modifications.
          </p>
        </div>

        <button
          onClick={exportAuditCsv}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          <span>Export Audit Trail (CSV)</span>
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by action, actor, or ID..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
            {['all', 'institution', 'officer', 'system'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  roleFilter === r ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="pb-3 w-28">Timestamp</th>
                <th className="pb-3">Actor & Role</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Target</th>
                <th className="pb-3">Details</th>
                <th className="pb-3 text-right">Correlation ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEvents.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-50/50">
                  <td className="py-3 text-slate-500 whitespace-nowrap">{ev.timestamp}</td>
                  <td className="py-3">
                    <p className="font-bold text-slate-800">{ev.actor}</p>
                    <span className="text-[10px] text-slate-400 capitalize">{ev.role}</span>
                  </td>
                  <td className="py-3">
                    <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                      {ev.action}
                    </span>
                  </td>
                  <td className="py-3 font-semibold text-slate-700">{ev.target}</td>
                  <td className="py-3 text-slate-600 max-w-xs truncate">{ev.details}</td>
                  <td className="py-3 text-right font-mono text-[10px] text-slate-400">
                    {ev.correlationId}
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
