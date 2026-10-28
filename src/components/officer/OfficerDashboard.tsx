import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Filter,
  Eye,
  Search,
  Building,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApplicationStatus } from '../../types';

interface OfficerDashboardProps {
  onOpenApplication: (appId: string) => void;
}

export const OfficerDashboard: React.FC<OfficerDashboardProps> = ({ onOpenApplication }) => {
  const { applications, setSelectedApplicationId } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch =
      app.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const awaitingReviewCount = applications.filter((a) => a.status === 'Under Officer Review' || a.status === 'Validation Completed').length;
  const needClarificationCount = applications.filter((a) => a.status === 'Needs Clarification').length;
  const approvedCount = applications.filter((a) => a.status === 'Approved' || a.status === 'Recommended for Approval').length;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          AICTE Scrutiny Officer Workstation
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review automated preliminary validation results, examine documentary discrepancies, and record regulatory decisions.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Assigned Applications</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-800 mt-2">{applications.length}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Western & Central Region</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Awaiting Scrutiny</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-800 mt-2">{awaitingReviewCount}</p>
          <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Priority Queue</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Clarification Active</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-800 mt-2">{needClarificationCount}</p>
          <p className="text-[11px] text-red-500 font-semibold mt-0.5">Institution Reply Pending</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Approved / Recommended</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-800 mt-2">{approvedCount}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Ready for AICTE Council</p>
        </div>
      </div>

      {/* Scrutiny Queue Table Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-800">Assigned Application Queue</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any application to launch the evidence-linked scrutiny workspace
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  statusFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                }`}
              >
                All ({applications.length})
              </button>
              <button
                onClick={() => setStatusFilter('Validation Completed')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  statusFilter === 'Validation Completed' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                }`}
              >
                Validated
              </button>
              <button
                onClick={() => setStatusFilter('Needs Clarification')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  statusFilter === 'Needs Clarification' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                }`}
              >
                Clarifications
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="pb-3">Reference No.</th>
                <th className="pb-3">Institution Name</th>
                <th className="pb-3">Application Category</th>
                <th className="pb-3">Compliance</th>
                <th className="pb-3">Discrepancies</th>
                <th className="pb-3">Workflow Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map((app) => {
                const majorCount = app.findings.filter((f) => f.severity === 'Major').length;
                return (
                  <tr
                    key={app.id}
                    onClick={() => {
                      setSelectedApplicationId(app.id);
                      onOpenApplication(app.id);
                    }}
                    className="cursor-pointer hover:bg-blue-50/40 transition-colors"
                  >
                    <td className="py-3.5 font-bold font-mono text-blue-600">{app.referenceNumber}</td>
                    <td className="py-3.5 font-semibold text-slate-800">
                      <div>
                        <p>{app.institutionName}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{app.district}, {app.state}</p>
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-600">{app.applicationType}</td>
                    <td className="py-3.5">
                      <span className="font-bold text-slate-800">{app.complianceScore}%</span>
                    </td>
                    <td className="py-3.5">
                      {majorCount > 0 ? (
                        <span className="flex items-center gap-1 font-bold text-red-600">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>{majorCount} Major</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 font-semibold text-emerald-600">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>0 Major</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          app.status === 'Approved' || app.status === 'Recommended for Approval'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : app.status === 'Needs Clarification'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApplicationId(app.id);
                          onOpenApplication(app.id);
                        }}
                        className="rounded-xl bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-2xs hover:bg-blue-700 inline-flex items-center gap-1"
                      >
                        <span>Scrutinize</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
