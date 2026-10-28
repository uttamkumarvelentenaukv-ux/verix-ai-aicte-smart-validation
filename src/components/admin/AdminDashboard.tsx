import React, { useState } from 'react';
import {
  FileText,
  Users,
  BarChart2,
  AlertTriangle,
  RotateCw,
  Plus,
  CheckCircle2,
  X,
  ShieldCheck,
  ChevronRight,
  Database,
  Link2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ValidationRule } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    rules,
    toggleRule,
    addRule,
    mockIntegrationStatus,
    testAicteRecordsConnection,
    retryIssuingAuthorityVerification,
  } = useApp();

  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleCategory, setNewRuleCategory] = useState('Safety & Compliance');
  const [newRuleCheckType, setNewRuleCheckType] = useState<ValidationRule['checkType']>('Document Presence');
  const [newRuleSeverity, setNewRuleSeverity] = useState<ValidationRule['severity']>('Medium');
  const [newRuleClause, setNewRuleClause] = useState('AICTE APH 2024-27 Clause 3.2.1');
  const [newRuleDesc, setNewRuleDesc] = useState('');

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;

    addRule({
      name: newRuleName,
      category: newRuleCategory,
      checkType: newRuleCheckType,
      severity: newRuleSeverity,
      version: 'v1.0',
      enabled: true,
      clauseReference: newRuleClause,
      description: newRuleDesc,
    });

    setNewRuleName('');
    setNewRuleDesc('');
    setShowAddRuleModal(false);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header & Breadcrumb matching screenshot */}
      <div>
        <p className="text-xs text-slate-500 font-medium">Admin / Validation Rules</p>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-1">
          System Administration
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage illustrative validation rules, master data, and mock integrations.
        </p>
      </div>

      {/* 4 Stat Cards matching screenshot:
          46 Total Applications | 21 Active Users | 58 Validation Jobs | 2 Failed Jobs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: 46 Total Applications */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800">46</p>
            <p className="text-xs font-medium text-slate-500">Total Applications</p>
          </div>
        </div>

        {/* Card 2: 21 Active Users */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800">21</p>
            <p className="text-xs font-medium text-slate-500">Active Users</p>
          </div>
        </div>

        {/* Card 3: 58 Validation Jobs */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
            <BarChart2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800">58</p>
            <p className="text-xs font-medium text-slate-500">Validation Jobs</p>
          </div>
        </div>

        {/* Card 4: 2 Failed Jobs */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800">2</p>
            <p className="text-xs font-medium text-slate-500">Failed Jobs</p>
          </div>
        </div>
      </div>

      {/* Validation Rules Table Card matching screenshot */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-800">Validation rules</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-slate-400">
              • Illustrative, not official requirements
            </span>
            <button
              onClick={() => setShowAddRuleModal(true)}
              className="flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700 shadow-2xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Rule</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="pb-3 w-24">Rule</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Check type</th>
                <th className="pb-3">Severity</th>
                <th className="pb-3">Version</th>
                <th className="pb-3 text-right">Enabled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 font-bold text-slate-800 font-mono">{rule.id}</td>
                  <td className="py-3.5 font-semibold text-slate-800">{rule.name}</td>
                  <td className="py-3.5 text-slate-600">{rule.checkType}</td>
                  <td className="py-3.5">
                    {rule.severity === 'High' && (
                      <span className="flex items-center gap-1.5 font-bold text-red-600">
                        <span className="h-2 w-2 rounded-full bg-red-500" /> High
                      </span>
                    )}
                    {rule.severity === 'Medium' && (
                      <span className="flex items-center gap-1.5 font-bold text-amber-600">
                        <span className="h-2 w-2 rounded-full bg-amber-500" /> Medium
                      </span>
                    )}
                    {rule.severity === 'Low' && (
                      <span className="flex items-center gap-1.5 font-bold text-indigo-600">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" /> Low
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 font-mono text-slate-500">{rule.version}</td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => toggleRule(rule.id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        rule.enabled ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                      role="switch"
                      aria-checked={rule.enabled}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          rule.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom 2 Integration Cards matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Authorized Institutional Records */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">
              Authorized Institutional Records
            </h3>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                • Mock Integration
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                • Connected (demo)
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Last test: {mockIntegrationStatus.lastTestTime}
            </p>
          </div>

          <div>
            <button
              onClick={testAicteRecordsConnection}
              disabled={mockIntegrationStatus.aicteRecords === 'Testing'}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-2xs"
            >
              {mockIntegrationStatus.aicteRecords === 'Testing' && (
                <RotateCw className="h-3.5 w-3.5 animate-spin text-blue-600" />
              )}
              <span>Test connection</span>
            </button>
          </div>
        </div>

        {/* Card 2: Issuing-Authority Verification */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">
              Issuing-Authority Verification
            </h3>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                • Mock Integration
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                mockIntegrationStatus.issuingAuthority === 'Connected'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                • {mockIntegrationStatus.issuingAuthority === 'Connected' ? 'Connected (demo)' : 'Source Unavailable'}
              </span>
            </div>

            <p className="text-xs text-slate-500">
              {mockIntegrationStatus.issuingAuthority === 'Connected'
                ? 'Mock service healthy'
                : 'Last error: demo service timeout'}
            </p>
          </div>

          <div>
            <button
              onClick={retryIssuingAuthorityVerification}
              disabled={mockIntegrationStatus.issuingAuthority === 'Testing'}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-2xs"
            >
              {mockIntegrationStatus.issuingAuthority === 'Testing' && (
                <RotateCw className="h-3.5 w-3.5 animate-spin text-blue-600" />
              )}
              <span>Retry demo verification</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer Footer matching screenshot */}
      <div className="pt-2 text-center">
        <p className="text-[11px] text-slate-400 max-w-4xl mx-auto leading-relaxed">
          <span className="font-bold text-slate-600">Prototype · demonstration data.</span> Not connected to AICTE systems. AI-generated findings are advisory. They do not establish fraud or determine final regulatory approval. Official scrutiny and final decisions remain with the competent authorities.
        </p>
      </div>

      {/* Add Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-slate-800 text-sm">Add New AICTE Validation Rule</h3>
              <button onClick={() => setShowAddRuleModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Rule Name *</label>
                <input
                  type="text"
                  required
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  placeholder="e.g. Fire NOC Periodic Validity Check"
                  className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Check Type</label>
                  <select
                    value={newRuleCheckType}
                    onChange={(e) => setNewRuleCheckType(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 p-2.5"
                  >
                    <option value="Document Presence">Document Presence</option>
                    <option value="Expiry Check">Expiry Check</option>
                    <option value="Institutional-Record Match">Institutional-Record Match</option>
                    <option value="Verification Requirement">Verification Requirement</option>
                    <option value="Integrity Check">Integrity Check</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Severity</label>
                  <select
                    value={newRuleSeverity}
                    onChange={(e) => setNewRuleSeverity(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 p-2.5"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Regulatory Clause Reference</label>
                <input
                  type="text"
                  value={newRuleClause}
                  onChange={(e) => setNewRuleClause(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Rule Description</label>
                <textarea
                  rows={2}
                  value={newRuleDesc}
                  onChange={(e) => setNewRuleDesc(e.target.value)}
                  placeholder="Explains what this rule inspects in the uploaded evidence..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddRuleModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 font-bold text-white hover:bg-blue-700"
                >
                  Create Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
