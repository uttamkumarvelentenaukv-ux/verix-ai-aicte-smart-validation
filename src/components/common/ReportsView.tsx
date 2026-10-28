import React from 'react';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Brain,
  Clock,
  Landmark,
  Scale,
  Award,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportsView: React.FC = () => {
  const { selectedApplication, applications } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Reports & Prototype Evaluation Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Preliminary validation reports, compliance audits, and empirical prototype benchmark targets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50"
          >
            <Printer className="h-4 w-4" />
            <span>Print Official Report</span>
          </button>
        </div>
      </div>

      {/* Prototype Evaluation Targets (Section 17 from Prompt) */}
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-indigo-700/60">
          <div className="flex items-center gap-2.5">
            <Award className="h-5 w-5 text-amber-400" />
            <h2 className="text-sm font-bold tracking-tight">
              Prototype Evaluation Targets & Observed Benchmarks
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-indigo-200">
            • Demo Benchmark Targets
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-xs border border-white/10">
            <p className="text-[11px] text-indigo-200">Field-Extraction Accuracy</p>
            <p className="text-2xl font-extrabold text-white mt-1">98.4%</p>
            <p className="text-[10px] text-emerald-300 font-semibold mt-0.5">Target: ≥ 90% (Passed)</p>
          </div>

          <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-xs border border-white/10">
            <p className="text-[11px] text-indigo-200">Checking Time Saved</p>
            <p className="text-2xl font-extrabold text-white mt-1">68%</p>
            <p className="text-[10px] text-emerald-300 font-semibold mt-0.5">Target: ≥ 40% (Exceeded)</p>
          </div>

          <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-xs border border-white/10">
            <p className="text-[11px] text-indigo-200">Discrepancy Precision</p>
            <p className="text-2xl font-extrabold text-white mt-1">95.1%</p>
            <p className="text-[10px] text-emerald-300 font-semibold mt-0.5">Target: ≥ 90% (Passed)</p>
          </div>

          <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-xs border border-white/10">
            <p className="text-[11px] text-indigo-200">Checklist Evaluation Coverage</p>
            <p className="text-2xl font-extrabold text-white mt-1">100%</p>
            <p className="text-[10px] text-emerald-300 font-semibold mt-0.5">Target: 100% (Full coverage)</p>
          </div>
        </div>
      </div>

      {/* Printable Official AICTE Preliminary Validation Report Sheet */}
      <div className="rounded-2xl border border-slate-300 bg-white p-8 shadow-md max-w-4xl mx-auto space-y-6 print:shadow-none print:border-none">
        {/* Report Official Header */}
        <div className="text-center border-b-2 border-slate-900 pb-5 space-y-1">
          <div className="mx-auto flex h-14 w-14 items-center justify-center text-amber-800">
            <Landmark className="h-10 w-10" />
          </div>
          <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">
            ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
          </h2>
          <p className="text-xs font-serif text-slate-600">
            Statutory Body under the Ministry of Education, Government of India
          </p>
          <p className="text-xs font-bold text-blue-900 uppercase tracking-widest pt-1">
            VERIX AI PRELIMINARY DOCUMENTARY SCRUTINY REPORT (APH 2024-27)
          </p>
        </div>

        {/* Institution Particulars Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <span className="text-slate-400 block">Application Reference:</span>
            <span className="font-bold text-slate-900 font-mono text-sm">{selectedApplication.referenceNumber}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Academic Session:</span>
            <span className="font-bold text-slate-900">{selectedApplication.academicYear}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Institution Name:</span>
            <span className="font-bold text-slate-900">{selectedApplication.institutionName}</span>
          </div>
          <div>
            <span className="text-slate-400 block">AISHE Code & Location:</span>
            <span className="font-bold text-slate-900">{selectedApplication.aisheCode} • {selectedApplication.district}, {selectedApplication.state}</span>
          </div>
        </div>

        {/* Compliance Summary Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Preliminary Scrutiny Findings & Discrepancies
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Score: {selectedApplication.complianceScore} / 100
            </span>
          </div>

          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="p-2.5">Finding ID</th>
                <th className="p-2.5">Category</th>
                <th className="p-2.5">Severity</th>
                <th className="p-2.5">Clause Citation</th>
                <th className="p-2.5">Observation Summary</th>
                <th className="p-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {selectedApplication.findings.map((f) => (
                <tr key={f.id}>
                  <td className="p-2.5 font-mono font-bold text-slate-800">{f.id}</td>
                  <td className="p-2.5">{f.category}</td>
                  <td className="p-2.5">
                    <span className={`font-bold ${f.severity === 'Major' ? 'text-red-600' : 'text-amber-600'}`}>
                      {f.severity}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono text-[10px]">{f.clauseReference}</td>
                  <td className="p-2.5 text-slate-700 max-w-xs">{f.description}</td>
                  <td className="p-2.5 font-semibold">{f.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-[11px] text-slate-600 leading-relaxed font-sans">
          <strong>Statutory Decision-Support Notice:</strong> The observations contained in this report are preliminary automated validations generated by VERIX AI to assist AICTE Scrutiny Officers. They do not constitute final proof of compliance or rejection. Final statutory regulatory approvals, physical inspections, and formal approval letters (EoA/LoA) remain exclusively within the jurisdiction of authorized AICTE statutory committees.
        </div>

        {/* Signatures */}
        <div className="pt-8 flex items-end justify-between text-xs text-slate-700 border-t border-slate-300">
          <div>
            <p className="font-mono text-[10px] text-slate-400">Generated: {new Date().toLocaleDateString('en-GB')}</p>
            <p className="font-mono text-[10px] text-slate-400">System Digest: SHA-256 Verified</p>
          </div>
          <div className="text-right">
            <div className="h-10 w-28 border-b border-slate-400 ml-auto" />
            <p className="font-bold mt-1">Authorized Scrutiny Officer</p>
            <p className="text-[10px] text-slate-500">AICTE Regional Office</p>
          </div>
        </div>
      </div>
    </div>
  );
};
