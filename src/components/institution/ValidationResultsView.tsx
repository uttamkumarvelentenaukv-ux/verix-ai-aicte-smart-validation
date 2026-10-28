import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  FileCode,
  FileText,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Clock,
  ChevronRight,
  Eye,
  Check,
  Building2,
  Landmark,
  GraduationCap,
  Scale,
  Users,
  ShieldAlert,
  FileCheck,
  X,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Finding } from '../../types';

interface ValidationResultsViewProps {
  onBack: () => void;
  onProceedToReport: () => void;
}

export const ValidationResultsView: React.FC<ValidationResultsViewProps> = ({
  onBack,
  onProceedToReport,
}) => {
  const { selectedApplication } = useApp();

  const [activeTab, setActiveTab] = useState<string>('summary');
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);
  const [showRawJsonModal, setShowRawJsonModal] = useState<boolean>(false);

  const handleDownloadReportCsv = () => {
    const rows = [
      ['Finding ID', 'Category', 'Severity', 'Title', 'Description', 'Clause Reference', 'Status'],
      ...selectedApplication.findings.map((f) => [
        f.id,
        f.category,
        f.severity,
        `"${f.title.replace(/"/g, '""')}"`,
        `"${f.description.replace(/"/g, '""')}"`,
        `"${f.clauseReference || ''}"`,
        f.status,
      ]),
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedApplication.referenceNumber}_Validation_Findings.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Top Header Buttons matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Applications</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadReportCsv}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </button>
          <button
            onClick={() => setShowRawJsonModal(true)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <FileCode className="h-4 w-4" />
            <span>View Raw Data</span>
          </button>
        </div>
      </div>

      {/* Application ID Main Card matching screenshot */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-xs">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight">
                  Application ID: {selectedApplication.referenceNumber}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Validation Completed
                </span>
              </div>
              <p className="text-sm font-bold text-slate-700 mt-1">
                {selectedApplication.institutionName}
              </p>
              <p className="text-xs text-slate-500">
                {selectedApplication.applicationType} • Academic Year: {selectedApplication.academicYear}
              </p>
            </div>
          </div>

          <div className="text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 text-xs">
            <span className="text-slate-400 block">Submitted on</span>
            <span className="font-bold text-slate-800">{selectedApplication.submissionDate}</span>
          </div>
        </div>
      </div>

      {/* 5 Metric Summary Cards matching screenshot:
          87% Compliance Score | 12 Valid Documents | 2 Minor Issues | 1 Major Issue | 0 Pending */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Metric 1: 87% Compliance Score */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center gap-3.5">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.6"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray="87, 100"
                strokeWidth="3.6"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-extrabold text-slate-800">
              {selectedApplication.complianceScore}%
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 leading-tight">Compliance Score</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Overall AICTE Norms</p>
          </div>
        </div>

        {/* Metric 2: 12 Valid Documents */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800">
              {selectedApplication.metrics.validDocuments}
            </p>
            <p className="text-xs font-medium text-slate-500">Valid Documents</p>
          </div>
        </div>

        {/* Metric 3: 2 Minor Issues */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800">
              {selectedApplication.metrics.minorIssues}
            </p>
            <p className="text-xs font-medium text-slate-500">Minor Issues</p>
          </div>
        </div>

        {/* Metric 4: 1 Major Issue */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800">
              {selectedApplication.metrics.majorIssues}
            </p>
            <p className="text-xs font-medium text-slate-500">Major Issue</p>
          </div>
        </div>

        {/* Metric 5: 0 Pending */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center gap-3 col-span-2 md:col-span-1">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-800">
              {selectedApplication.metrics.pendingChecks}
            </p>
            <p className="text-xs font-medium text-slate-500">Pending</p>
          </div>
        </div>
      </div>

      {/* Tabs Row matching screenshot */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'summary', label: 'AI Validation Summary' },
            { id: 'analysis', label: 'Document Analysis' },
            { id: 'cross', label: 'Cross-Verification' },
            { id: 'compliance', label: 'Compliance Check' },
            { id: 'evidence', label: 'Evidence & Report' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-bold whitespace-nowrap rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1: AI Findings Overview & Detected Issues */}
        <div className="space-y-6">
          {/* AI Findings Overview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-800 text-sm">AI Findings Overview</span>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5">
                View Details <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 -mt-2">
              Summary of AI analysis results across all documents
            </p>

            <div className="space-y-3 text-xs">
              {/* Completeness */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Document Completeness</p>
                    <p className="text-[11px] text-slate-500">All required documents found</p>
                  </div>
                </div>
                <span className="font-bold text-slate-800 font-mono">12/12</span>
              </div>

              {/* Data Consistency */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Data Consistency</p>
                    <p className="text-[11px] text-slate-500">Information matches across documents</p>
                  </div>
                </div>
                <span className="font-bold text-slate-800 font-mono">98.4%</span>
              </div>

              {/* Anomaly Detection */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-amber-900">Anomaly Detection</p>
                    <p className="text-[11px] text-amber-700">1 potential issue detected</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFinding(selectedApplication.findings[0])}
                  className="rounded-lg bg-white px-3 py-1 text-[11px] font-bold text-amber-900 border border-amber-300 shadow-2xs hover:bg-amber-100"
                >
                  View
                </button>
              </div>

              {/* Regulatory Compliance */}
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Rule Compliance (AICTE 2024-27)</p>
                    <p className="text-[11px] text-slate-500">Meets regulatory guidelines</p>
                  </div>
                </div>
                <span className="font-bold text-slate-800 font-mono">92.7%</span>
              </div>
            </div>
          </div>

          {/* Detected Issues List matching screenshot */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-800 text-sm">Detected Issues</span>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5">
                View All Issues <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Major Issue: Signature Mismatch Detected */}
              <div className="rounded-xl border border-red-200 bg-red-50/40 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="font-bold text-red-900 text-xs">Signature Mismatch Detected</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                    Major
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  The signature in the Affiliation Letter does not match with the authorized signatory record in AICTE database.
                </p>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">
                    Document: affiliation_letter.pdf
                  </span>
                  <button
                    onClick={() => setSelectedFinding(selectedApplication.findings[0])}
                    className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-red-700 border border-red-200 shadow-2xs hover:bg-red-50"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Minor Issue: Document Expiry Alert */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span className="font-bold text-amber-900 text-xs">Document Expiry Alert</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                    Minor
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  The Fire Safety Certificate will expire in 45 days.
                </p>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">
                    Document: fire_safety.pdf
                  </span>
                  <button
                    onClick={() => setSelectedFinding(selectedApplication.findings[1] || selectedApplication.findings[0])}
                    className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200 shadow-2xs hover:bg-amber-50"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Document Category Status & AI Extracted Information */}
        <div className="space-y-6">
          {/* Document Category Status */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-800 text-sm">Document Category Status</span>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5">
                View All <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  <span>Institution Details</span>
                </div>
                <span className="font-bold text-emerald-600">Valid</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  <span>Land & Building</span>
                </div>
                <span className="font-bold text-emerald-600">Valid</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <Landmark className="h-4 w-4 text-slate-400" />
                  <span>Infrastructure & Facilities</span>
                </div>
                <span className="font-bold text-emerald-600">Valid</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <GraduationCap className="h-4 w-4 text-slate-400" />
                  <span>Faculty Information</span>
                </div>
                <span className="font-bold text-emerald-600">Valid</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <FileText className="h-4 w-4 text-slate-400" />
                  <span>Financial Documents</span>
                </div>
                <span className="font-bold text-amber-600">Minor Issue</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span>Governing Body</span>
                </div>
                <span className="font-bold text-red-600">Major Issue</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700">
                  <FileCheck className="h-4 w-4 text-slate-400" />
                  <span>Other Documents</span>
                </div>
                <span className="font-bold text-emerald-600">Valid</span>
              </div>
            </div>
          </div>

          {/* AI Extracted Information Card matching screenshot */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="font-bold text-slate-800 text-sm">AI Extracted Information</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Institution Name</span>
                <span className="font-bold text-slate-800 text-right">{selectedApplication.extractedInfo.institutionName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">AISHE Code</span>
                <span className="font-bold text-slate-800 font-mono">{selectedApplication.extractedInfo.aisheCode}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Address</span>
                <span className="font-bold text-slate-800 text-right">{selectedApplication.extractedInfo.address}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Year of Establishment</span>
                <span className="font-bold text-slate-800">{selectedApplication.extractedInfo.yearOfEstablishment}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Number of Programs</span>
                <span className="font-bold text-slate-800">{selectedApplication.extractedInfo.numberOfPrograms}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Total Faculty</span>
                <span className="font-bold text-slate-800">{selectedApplication.extractedInfo.totalFaculty}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Land Area</span>
                <span className="font-bold text-slate-800">{selectedApplication.extractedInfo.landAreaAcres} Acres</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Built-up Area</span>
                <span className="font-bold text-slate-800">{selectedApplication.extractedInfo.builtUpAreaSqM.toLocaleString()} sq. m.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Alert & Action Banner matching screenshot */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
            <Check className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-emerald-950 text-sm">AI Validation Completed</p>
            <p className="text-xs text-emerald-800 mt-0.5">
              Your application has been analyzed using AI and cross-verified with AICTE records. Please review the findings and take necessary action.
            </p>
          </div>
        </div>

        <button
          onClick={onProceedToReport}
          className="w-full md:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700 transition-colors"
        >
          <span>Proceed to Compliance Report</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Evidence Modal when user inspects an anomaly or finding */}
      {selectedFinding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{selectedFinding.title}</h3>
                  <span className="text-[11px] text-slate-400">Finding ID: {selectedFinding.id} • Rule: {selectedFinding.ruleId}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedFinding(null)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Document Bounding Box Visualizer */}
            <div className="relative rounded-xl border border-slate-300 bg-slate-900 p-4 text-center">
              <p className="text-[10px] text-slate-400 font-mono mb-2">
                Document Excerpt: {selectedFinding.documentName || 'affiliation_letter.pdf'} (Page {selectedFinding.page || 1})
              </p>
              <div className="relative mx-auto max-w-md rounded-lg bg-white p-6 text-left font-serif text-slate-800 shadow-lg border border-slate-200">
                <div className="text-[9px] uppercase tracking-wide text-slate-500 border-b pb-1 font-bold">
                  CHHATTISGARH SWAMI VIVEKANAND TECHNICAL UNIVERSITY
                </div>
                <p className="text-[8px] text-slate-600 mt-2">
                  No. CSVTU/Affil/2026/891: This is to certify that provisional affiliation for academic year 2025-26 is hereby granted to Rungta College of Engineering & Technology...
                </p>

                {/* Highlighted Bounding Box Area */}
                <div className="mt-4 relative rounded border-2 border-red-500 bg-red-500/10 p-2 text-right">
                  <span className="absolute -top-2.5 right-2 rounded bg-red-600 px-1.5 py-0.5 text-[8px] font-bold text-white uppercase tracking-wider">
                    Discrepancy Highlighted [Conf: {Math.round((selectedFinding.confidence || 0.88) * 100)}%]
                  </span>
                  <div className="text-[8px] italic text-red-900 font-mono">
                    {selectedFinding.extractedValue || 'Digital Signature Hash [SIG-7712-UNVERIFIED]'}
                  </div>
                  <span className="text-[7px] text-slate-500 block">Registrar, CSVTU Bhilai</span>
                </div>
              </div>
            </div>

            {/* Evidence comparison details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                <span className="text-slate-400 font-medium block">Extracted / Submitted Value</span>
                <span className="font-bold text-red-600 mt-1 block">{selectedFinding.extractedValue}</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                <span className="text-slate-400 font-medium block">Expected Regulatory Value</span>
                <span className="font-bold text-emerald-600 mt-1 block">{selectedFinding.expectedValue}</span>
              </div>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 border border-blue-100 text-xs text-blue-900">
              <span className="font-bold block">Applicable Regulatory Clause:</span>
              <span className="font-mono text-[11px]">{selectedFinding.clauseReference}</span>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedFinding(null)}
                className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700"
              >
                Close Evidence Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Raw JSON Modal */}
      {showRawJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-slate-800 text-sm">
                Raw Structured Validation Output ({selectedApplication.referenceNumber})
              </h3>
              <button onClick={() => setShowRawJsonModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <pre className="flex-1 overflow-auto rounded-xl bg-slate-900 p-4 font-mono text-[11px] text-emerald-400 leading-relaxed">
              {JSON.stringify(selectedApplication, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
