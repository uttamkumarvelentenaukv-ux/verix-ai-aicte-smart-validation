import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Eye,
  MessageSquare,
  Check,
  X,
  FileSearch,
  Landmark,
  Scale,
  Send,
  Building,
  RotateCw,
  Maximize2,
  ChevronRight,
  ArrowLeft,
  Calendar,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApplicationRecord, DocumentRecord, Finding } from '../../types';

interface OfficerReviewWorkspaceProps {
  onBackToQueue: () => void;
}

export const OfficerReviewWorkspace: React.FC<OfficerReviewWorkspaceProps> = ({ onBackToQueue }) => {
  const {
    selectedApplication,
    updateFindingStatus,
    updateApplicationStatus,
    createClarification,
    currentUser,
  } = useApp();

  const [selectedDocId, setSelectedDocId] = useState<string>(
    selectedApplication.documents[0]?.id || 'DOC-01'
  );
  const [selectedFindingId, setSelectedFindingId] = useState<string>(
    selectedApplication.findings[0]?.id || ''
  );
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [dismissReasonModal, setDismissReasonModal] = useState<boolean>(false);
  const [dismissReasonText, setDismissReasonText] = useState<string>('');
  const [clarificationModal, setClarificationModal] = useState<boolean>(false);
  const [clarificationQuestion, setClarificationQuestion] = useState<string>(
    'Please submit original attested verification from CSVTU University Portal regarding the signature on page 1 of Affiliation_Letter.pdf.'
  );
  const [officerNotes, setOfficerNotes] = useState<string>('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string>('');

  const selectedDoc =
    selectedApplication.documents.find((d) => d.id === selectedDocId) ||
    selectedApplication.documents[0];

  const selectedFinding =
    selectedApplication.findings.find((f) => f.id === selectedFindingId) ||
    selectedApplication.findings[0];

  const handleConfirmFinding = () => {
    if (!selectedFinding) return;
    updateFindingStatus(selectedApplication.id, selectedFinding.id, 'Confirmed', 'Confirmed by Scrutiny Officer during preliminary assessment.');
    setActionSuccessMsg(`Finding ${selectedFinding.id} marked as Confirmed.`);
    setTimeout(() => setActionSuccessMsg(''), 3000);
  };

  const handleOpenDismissModal = () => {
    setDismissReasonText('');
    setDismissReasonModal(true);
  };

  const handleConfirmDismissal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFinding || !dismissReasonText.trim()) return;
    updateFindingStatus(
      selectedApplication.id,
      selectedFinding.id,
      'Dismissed',
      `Officer Dismissal Reason: ${dismissReasonText}`
    );
    setDismissReasonModal(false);
    setActionSuccessMsg(`Finding ${selectedFinding.id} dismissed with mandatory officer rationale.`);
    setTimeout(() => setActionSuccessMsg(''), 3000);
  };

  const handleSendClarification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clarificationQuestion.trim()) return;

    createClarification({
      applicationId: selectedApplication.id,
      applicationRef: selectedApplication.referenceNumber,
      institutionName: selectedApplication.institutionName,
      findingId: selectedFinding?.id,
      documentName: selectedDoc?.fileName,
      officerName: currentUser.displayName,
      question: clarificationQuestion,
    });

    setClarificationModal(false);
    setActionSuccessMsg(`Clarification request dispatched to ${selectedApplication.institutionName}.`);
    setTimeout(() => setActionSuccessMsg(''), 3000);
  };

  const handleRecommendApproval = () => {
    updateApplicationStatus(selectedApplication.id, 'Recommended for Approval');
    setActionSuccessMsg(`Application ${selectedApplication.referenceNumber} recommended for official approval.`);
    setTimeout(() => setActionSuccessMsg(''), 3000);
  };

  const handleRecommendInspection = () => {
    updateApplicationStatus(selectedApplication.id, 'Recommended for Physical Inspection');
    setActionSuccessMsg(`Application ${selectedApplication.referenceNumber} flagged for physical inspection committee visit.`);
    setTimeout(() => setActionSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Top Bar with Application Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <button
            onClick={onBackToQueue}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Scrutiny Queue</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
              Scrutiny Workspace: {selectedApplication.referenceNumber}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {selectedApplication.status}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {selectedApplication.institutionName} • Region: Western & Central • AISHE: {selectedApplication.aisheCode}
          </p>
        </div>

        {/* Global Officer Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setClarificationModal(true)}
            className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100 shadow-2xs"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Request Clarification</span>
          </button>
          <button
            onClick={handleRecommendInspection}
            className="flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3.5 py-2 text-xs font-bold text-purple-800 hover:bg-purple-100 shadow-2xs"
          >
            <Building className="h-3.5 w-3.5" />
            <span>Recommend Physical Inspection</span>
          </button>
          <button
            onClick={handleRecommendApproval}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/25"
          >
            <UserCheck className="h-3.5 w-3.5" />
            <span>Recommend for Approval</span>
          </button>
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* 3-Pane Scrutiny Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Pane 1: Left Document List (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Submitted Documents ({selectedApplication.documents.length})
              </span>
            </div>

            <div className="mt-3 space-y-1.5">
              {selectedApplication.documents.map((doc) => {
                const hasAnomaly = selectedApplication.findings.some(
                  (f) => f.documentName === doc.fileName && f.category === 'Anomaly Detection'
                );
                return (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setSelectedDocId(doc.id);
                      const matchingFinding = selectedApplication.findings.find(
                        (f) => f.documentName === doc.fileName
                      );
                      if (matchingFinding) setSelectedFindingId(matchingFinding.id);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors border ${
                      selectedDoc?.id === doc.id
                        ? 'bg-blue-50/80 border-blue-200 text-blue-900 font-bold'
                        : 'border-transparent hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <div className="truncate">
                        <p className="truncate font-semibold">{doc.fileName}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{doc.documentType}</p>
                      </div>
                      {hasAnomaly && (
                        <span className="shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-red-600">
                          <AlertTriangle className="h-2.5 w-2.5" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats on Scope */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs text-xs space-y-2">
            <span className="font-bold text-slate-800 text-xs">AI Preliminary Metrics</span>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Compliance Score</span>
              <span className="font-bold text-slate-800">{selectedApplication.complianceScore}%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">OCR Extraction</span>
              <span className="font-bold text-emerald-600">{selectedApplication.metrics.ocrAccuracy}%</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Open Findings</span>
              <span className="font-bold text-amber-600">
                {selectedApplication.findings.filter((f) => f.status === 'Open').length}
              </span>
            </div>
          </div>
        </div>

        {/* Pane 2: Center Document Viewer with Pan/Zoom & Bounding Box (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <div>
                <span className="font-bold text-slate-800">{selectedDoc?.fileName}</span>
                <span className="text-slate-400 block text-[10px]">
                  {selectedDoc?.documentType} • Size: {selectedDoc?.fileSize}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel(Math.max(60, zoomLevel - 15))}
                  className="rounded-lg border px-2 py-1 hover:bg-slate-50 text-[11px]"
                >
                  -
                </button>
                <span className="font-mono text-[11px] text-slate-600">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel(Math.min(160, zoomLevel + 15))}
                  className="rounded-lg border px-2 py-1 hover:bg-slate-50 text-[11px]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Document Canvas Preview with Bounding Box Overlay */}
            <div className="mt-3 relative rounded-xl border border-slate-300 bg-slate-900 p-4 min-h-[460px] flex items-center justify-center overflow-auto">
              <div
                className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl border border-slate-200 text-slate-900 font-serif text-center transition-transform"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              >
                {/* Document Header */}
                <div className="border-b border-slate-300 pb-2">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center text-amber-800">
                    <Landmark className="h-8 w-8" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-800 mt-1">
                    CHHATTISGARH SWAMI VIVEKANAND TECHNICAL UNIVERSITY
                  </p>
                  <p className="text-[8px] text-slate-500 font-sans">
                    Newai, P.O.-Newai, District-Durg, Chhattisgarh, PIN-491107
                  </p>
                </div>

                {/* Content */}
                <div className="py-4 text-left font-sans text-[8px] text-slate-700 space-y-2 leading-relaxed">
                  <p className="font-bold">Ref: CSVTU/Affil/2026/Approval/891</p>
                  <p className="font-bold">TO WHOMSOEVER IT MAY CONCERN</p>
                  <p>
                    This is to certify that provisional affiliation for the academic session 2025-2026 is hereby granted to <strong>Rungta College of Engineering and Technology, Bhilai</strong> for conducting the technical undergraduate engineering courses specified herein under AICTE norms...
                  </p>
                  <p>
                    Total Approved Courses: 12 Programs | Approved Annual Intake: 720 Seats.
                  </p>
                </div>

                {/* Bounding Box on Anomaly / Signature */}
                {selectedFinding && selectedFinding.category === 'Anomaly Detection' && (
                  <div className="relative mt-2 rounded border-2 border-dashed border-red-500 bg-red-50/50 p-2 text-right">
                    <div className="absolute -top-3 right-2 rounded bg-red-600 px-2 py-0.5 text-[7px] font-bold text-white uppercase tracking-wider">
                      AI Anomaly Flag: Signature Variant
                    </div>
                    <div className="font-mono text-[8px] italic text-red-900">
                      [Digital Signature Hash: SIG-7712-UNVERIFIED]
                    </div>
                    <p className="text-[7px] text-slate-500 mt-1 font-sans">
                      Registrar, CSVTU University
                    </p>
                  </div>
                )}

                {/* Document Footer */}
                <div className="mt-4 pt-2 border-t border-slate-200 flex justify-between text-[7px] text-slate-400 font-mono">
                  <span>Page 1 of 3</span>
                  <span>Document Hash: {selectedDoc?.fileHash || 'sha256_8f99c1e'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pane 3: Right Finding Scrutiny & Decisions (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Scrutiny Observations & Finding
              </span>
              {selectedFinding && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    selectedFinding.status === 'Confirmed'
                      ? 'bg-red-50 text-red-700'
                      : selectedFinding.status === 'Dismissed'
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {selectedFinding.status}
                </span>
              )}
            </div>

            {selectedFinding ? (
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <h3 className="font-bold text-slate-900">{selectedFinding.title}</h3>
                  </div>
                  <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                    {selectedFinding.description}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 border border-slate-200 space-y-1.5 text-[11px]">
                  <div>
                    <span className="text-slate-400 font-medium">Extracted Value:</span>
                    <p className="font-mono font-bold text-red-600">{selectedFinding.extractedValue}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Expected Value:</span>
                    <p className="font-mono font-bold text-emerald-600">{selectedFinding.expectedValue}</p>
                  </div>
                </div>

                <div className="rounded-xl bg-blue-50 p-2.5 border border-blue-100 text-[11px] text-blue-900">
                  <span className="font-bold block">Statutory Rule & Clause:</span>
                  <span className="font-mono">{selectedFinding.clauseReference}</span>
                </div>

                {/* Officer Action Buttons for this Finding */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="font-bold text-slate-700 text-xs block">
                    Record Statutory Scrutiny Action:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleConfirmFinding}
                      className="rounded-xl bg-red-600 py-2 text-center text-xs font-bold text-white hover:bg-red-700 shadow-2xs"
                    >
                      Confirm Discrepancy
                    </button>
                    <button
                      onClick={handleOpenDismissModal}
                      className="rounded-xl border border-slate-200 py-2 text-center text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs"
                    >
                      Dismiss with Reason
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Select a document to review its findings.</p>
            )}
          </div>

          {/* Add Scrutiny Notes */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
              Official Scrutiny Note
            </span>
            <textarea
              rows={3}
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              placeholder="Record remarks for AICTE approval committee..."
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={() => {
                if (officerNotes.trim()) {
                  setActionSuccessMsg('Official note appended to application audit trail.');
                  setOfficerNotes('');
                  setTimeout(() => setActionSuccessMsg(''), 3000);
                }
              }}
              className="w-full rounded-xl bg-slate-800 py-2 text-xs font-bold text-white hover:bg-slate-900"
            >
              Save Scrutiny Note
            </button>
          </div>
        </div>
      </div>

      {/* Dismiss Finding Modal with Mandatory Rationale */}
      {dismissReasonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-slate-800 text-sm">Dismiss Finding: Mandatory Rationale</h3>
              <button onClick={() => setDismissReasonModal(false)} className="text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleConfirmDismissal} className="space-y-3 text-xs">
              <p className="text-slate-600">
                As an AICTE Scrutiny Officer, you must record a clear justification before dismissing an automated finding. This rationale will be permanently logged in the audit trail.
              </p>
              <textarea
                required
                rows={3}
                value={dismissReasonText}
                onChange={(e) => setDismissReasonText(e.target.value)}
                placeholder="e.g. Verified manually against State Gazette decree No. 448; signature is legitimate digital variation..."
                className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-blue-500 focus:outline-none"
              />
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setDismissReasonModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-5 py-2 font-bold text-white hover:bg-black"
                >
                  Confirm Dismissal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request Clarification Modal */}
      {clarificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-amber-500" />
                <h3 className="font-bold text-slate-800 text-sm">
                  Issue Clarification Request to Institution
                </h3>
              </div>
              <button onClick={() => setClarificationModal(false)} className="text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSendClarification} className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Recipient Institution:</span>
                <span className="font-bold text-slate-800">{selectedApplication.institutionName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Related Document:</span>
                <span className="font-bold text-slate-800">{selectedDoc?.fileName}</span>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Clarification Inquiry *</label>
                <textarea
                  required
                  rows={4}
                  value={clarificationQuestion}
                  onChange={(e) => setClarificationQuestion(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setClarificationModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 font-bold text-white hover:bg-blue-700 flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Clarification Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
