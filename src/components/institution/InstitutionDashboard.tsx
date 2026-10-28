import React from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Brain,
  UploadCloud,
  ChevronRight,
  Eye,
  MoreVertical,
  Check,
  AlertTriangle,
  RotateCw,
  FileCheck,
  Building2,
  GraduationCap,
  Landmark,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface InstitutionDashboardProps {
  onNavigate: (tab: string) => void;
}

export const InstitutionDashboard: React.FC<InstitutionDashboardProps> = ({ onNavigate }) => {
  const { selectedApplication, applications } = useApp();

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* 5 Stat Cards Row matching reference screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Applications */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Applications</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-800">248</span>
            <span className="flex items-center text-xs font-bold text-emerald-600">
              <ArrowUpRight className="h-3 w-3" /> 12%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">This Month</p>
        </div>

        {/* Card 2: Under Validation */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Under Validation</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-800">56</span>
            <span className="flex items-center text-xs font-bold text-amber-600">
              <ArrowUpRight className="h-3 w-3" /> 8%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Pending Review</p>
        </div>

        {/* Card 3: Approved */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Approved</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-800">162</span>
            <span className="flex items-center text-xs font-bold text-emerald-600">
              <ArrowUpRight className="h-3 w-3" /> 18%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">AICTE Approved</p>
        </div>

        {/* Card 4: Needs Clarification */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Needs Clarification</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-800">24</span>
            <span className="flex items-center text-xs font-bold text-red-500">
              <ArrowDownRight className="h-3 w-3" /> 6%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">Action Required</p>
        </div>

        {/* Card 5: AI Accuracy */}
        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-700 to-blue-700 p-4 shadow-md text-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-100">AI Accuracy</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-xs">
              <Brain className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">96.2%</span>
          </div>
          <p className="text-[11px] text-indigo-200 mt-0.5">Validation Accuracy</p>
        </div>
      </div>

      {/* Banner matching reference screenshot */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 z-10">
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
                Welcome to <span className="text-blue-600">VERIX AI</span>
              </span>
            </div>
            <p className="text-sm md:text-base font-semibold text-slate-700">
              AI-Powered Document Validation for AICTE Approvals
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Secure
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Transparent
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> AI-Driven
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Efficient
              </span>
            </div>
          </div>

          {/* AICTE emblem & visual badge */}
          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700">
              <Landmark className="h-8 w-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">All India Council for Technical Education</p>
              <p className="text-[11px] text-slate-500">अखिल भारतीय तकनीकी शिक्षा परिषद्</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Approval Cycle 2025-27 Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Start New Application */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>Start New Application</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Upload documents and let AI validate your application
            </p>

            <div
              onClick={() => onNavigate('new-application')}
              className="mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-6 text-center cursor-pointer hover:bg-blue-50/80 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-2">
                <UploadCloud className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-800">Drag & Drop your documents here</p>
              <p className="text-[11px] text-slate-400 mt-0.5">or</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('new-application');
                }}
                className="mt-3 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/25 hover:bg-blue-700 transition-colors"
              >
                Choose Files
              </button>
              <p className="text-[10px] text-slate-400 mt-2">
                Supported formats: PDF, JPG, PNG (Max 10MB each)
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Application Progress (Step 2 of 5) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 text-sm">Application Progress</span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              Step 2 of 5
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {/* Step 1 */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-[11px]">
                  ✓
                </span>
                <span className="font-semibold text-slate-800">Institution Details</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600">Completed</span>
            </div>

            {/* Step 2 */}
            <div className="flex items-center justify-between text-xs bg-blue-50/60 p-2 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-[11px]">
                  2
                </span>
                <span className="font-bold text-blue-900">Document Upload</span>
              </div>
              <span className="text-[11px] font-bold text-blue-600">In Progress</span>
            </div>

            {/* Step 3 */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold text-[11px]">
                  3
                </span>
                <span>AI Validation</span>
              </div>
              <span className="text-[11px]">Pending</span>
            </div>

            {/* Step 4 */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold text-[11px]">
                  4
                </span>
                <span>Compliance Check</span>
              </div>
              <span className="text-[11px]">Pending</span>
            </div>

            {/* Step 5 */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold text-[11px]">
                  5
                </span>
                <span>Final Submission</span>
              </div>
              <span className="text-[11px]">Pending</span>
            </div>
          </div>
        </div>

        {/* Column 3: AI Preliminary Findings */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white text-[11px] font-bold">
                  AI
                </div>
                <span className="font-bold text-slate-800 text-sm">AI Preliminary Findings</span>
              </div>
              <button
                onClick={() => onNavigate('validation-status')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
              >
                View Details <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {/* Finding 1 */}
              <div className="flex items-start gap-2.5 text-xs">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Document Completeness</p>
                  <p className="text-[11px] text-slate-500">All required documents found</p>
                </div>
              </div>

              {/* Finding 2 */}
              <div className="flex items-start gap-2.5 text-xs">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Data Consistency</p>
                  <p className="text-[11px] text-slate-500">Information matches across documents</p>
                </div>
              </div>

              {/* Finding 3 - Anomaly */}
              <div className="flex items-start justify-between gap-2 text-xs bg-amber-50/70 p-2 rounded-xl border border-amber-200">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 mt-0.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-bold text-amber-900">Anomaly Detection</p>
                    <p className="text-[11px] text-amber-700">1 potential issue detected</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('validation-status')}
                  className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-amber-800 border border-amber-300 shadow-2xs hover:bg-amber-100"
                >
                  Review
                </button>
              </div>

              {/* Finding 4 */}
              <div className="flex items-start gap-2.5 text-xs">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">Regulatory Compliance</p>
                  <p className="text-[11px] text-slate-500">Meets AICTE guidelines (2024-27)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3-Column Row matching reference screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Uploaded Documents Table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-800 text-sm">Uploaded Documents</span>
              <button
                onClick={() => onNavigate('document-upload')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Add More
              </button>
            </div>

            <div className="mt-3 divide-y divide-slate-100">
              {selectedApplication.documents.slice(0, 5).map((doc) => (
                <div key={doc.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-slate-800 truncate">{doc.fileName}</p>
                      <p className="text-[11px] text-slate-400">{doc.fileSize} • PDF</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.status === 'Verified'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : doc.status === 'In Review'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {doc.status}
                    </span>

                    <div className="text-slate-400">
                      {doc.aiCheck === 'passed' && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      )}
                      {doc.aiCheck === 'review' && (
                        <RotateCw className="h-4 w-4 text-blue-500 animate-spin" />
                      )}
                      {doc.aiCheck === 'warning' && (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                    </div>

                    <button
                      onClick={() => onNavigate('validation-status')}
                      className="p-1 text-slate-400 hover:text-slate-600"
                      aria-label="View document details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Validation Results Donut & Sub-metrics */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-800 text-sm">AI Validation Results</span>
              <button
                onClick={() => onNavigate('validation-status')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
              >
                View Full Report <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-around">
              {/* Donut chart ring */}
              <div className="relative flex h-28 w-28 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    className="text-slate-100"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Foreground Circle - 87% */}
                  <path
                    className="text-emerald-500"
                    strokeDasharray="87, 100"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-extrabold text-slate-800">87%</span>
                  <span className="text-[9px] font-medium text-slate-400 text-center leading-tight">
                    Documents<br />Validated
                  </span>
                </div>
              </div>

              {/* Breakdown Legend */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-600">Valid Documents:</span>
                  <span className="font-bold text-slate-800">12</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="text-slate-600">Minor Issues:</span>
                  <span className="font-bold text-slate-800">2</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="text-slate-600">Major Issues:</span>
                  <span className="font-bold text-slate-800">1</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="text-slate-600">Pending:</span>
                  <span className="font-bold text-slate-800">0</span>
                </div>
              </div>
            </div>

            {/* Sub-metrics 4-col box */}
            <div className="mt-5 grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-center">
              <div>
                <p className="text-[10px] text-slate-400 font-medium">OCR Extraction</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">98.4%</p>
                <p className="text-[9px] text-slate-400">Text accuracy</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Data Matching</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">95.1%</p>
                <p className="text-[9px] text-slate-400">Cross-document</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Rule Compliance</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">92.7%</p>
                <p className="text-[9px] text-slate-400">AICTE guidelines</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Anomaly</p>
                <p className="text-xs font-bold text-amber-600 mt-0.5">1</p>
                <p className="text-[9px] text-slate-400">Item flagged</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Summary Column */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-800 text-sm">Compliance Summary</span>
            </div>

            <div className="mt-3 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  <span>Institution Details</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600">Compliant</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <Landmark className="h-4 w-4 text-slate-400" />
                  <span>Infrastructure & Facilities</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600">Compliant</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <GraduationCap className="h-4 w-4 text-slate-400" />
                  <span>Faculty Information</span>
                </div>
                <span className="text-[11px] font-bold text-amber-600">Minor Issues</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <FileText className="h-4 w-4 text-slate-400" />
                  <span>Financial Documents</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600">Compliant</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  <span>Land & Building Documents</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600">Compliant</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <FileCheck className="h-4 w-4 text-slate-400" />
                  <span>Regulatory Requirements</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600">Compliant</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('reports')}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-sm shadow-blue-500/25 hover:bg-blue-700 transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span>Generate Full Compliance Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
