import React, { useState } from 'react';
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  Send,
  Upload,
  FileText,
  Building,
  User,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ClarificationsView: React.FC = () => {
  const { clarifications, respondClarification, currentUser } = useApp();

  const [selectedClarificationId, setSelectedClarificationId] = useState<string>(
    clarifications[0]?.id || ''
  );
  const [responseText, setResponseText] = useState<string>('');
  const [responseFile, setResponseFile] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const activeClarification =
    clarifications.find((c) => c.id === selectedClarificationId) || clarifications[0];

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeClarification || !responseText.trim()) return;

    respondClarification(activeClarification.id, responseText, responseFile || 'Clarification_Response_Pack.pdf');
    setSuccessMsg('Clarification response submitted to AICTE Scrutiny Officer.');
    setResponseText('');
    setResponseFile('');
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Clarifications & Regulatory Queries
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Two-way official communication between AICTE Scrutiny Officers and Institutions for resolving documentary discrepancies.
        </p>
      </div>

      {successMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Clarification List (4 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block mb-3 pb-2 border-b">
              Clarification Threads ({clarifications.length})
            </span>

            <div className="space-y-2">
              {clarifications.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedClarificationId(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs ${
                    activeClarification?.id === item.id
                      ? 'bg-blue-50/80 border-blue-300 shadow-2xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold font-mono text-blue-600">{item.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'Answered'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-800 mt-1 line-clamp-1">{item.question}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{item.institutionName}</span>
                    <span>{item.createdAt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Thread Details & Reply Box (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {activeClarification ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
              {/* Thread Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-800">
                      Query Ref: {activeClarification.id} ({activeClarification.applicationRef})
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Target Document: {activeClarification.documentName || 'Institutional Record'}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      activeClarification.status === 'Answered'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {activeClarification.status}
                  </span>
                </div>
              </div>

              {/* Officer Inquiry Bubble */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <User className="h-4 w-4 text-blue-600" />
                  <span>AICTE Scrutiny Officer ({activeClarification.officerName})</span>
                  <span className="text-[10px] font-normal text-slate-400 ml-auto">
                    {activeClarification.createdAt}
                  </span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {activeClarification.question}
                </p>
              </div>

              {/* Institution Response Bubble if already answered */}
              {activeClarification.status === 'Answered' && (
                <div className="rounded-2xl bg-blue-50/60 border border-blue-200 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                    <Building className="h-4 w-4 text-emerald-600" />
                    <span>Institution Response ({activeClarification.institutionName})</span>
                    <span className="text-[10px] font-normal text-slate-400 ml-auto">
                      {activeClarification.respondedAt}
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {activeClarification.response}
                  </p>
                  {activeClarification.responseDocumentName && (
                    <div className="flex items-center gap-2 pt-2 border-t border-blue-100 text-[11px] font-mono text-blue-700">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Attached: {activeClarification.responseDocumentName}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Reply Form (Available for Institution user or anyone to test in demo mode) */}
              {activeClarification.status === 'Pending' && (
                <form onSubmit={handleSendResponse} className="space-y-4 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-xs">Draft Institution Response:</span>
                    <span className="text-[10px] text-slate-400">Response will be routed to Scrutiny Officer</span>
                  </div>

                  <textarea
                    required
                    rows={4}
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Provide detailed explanation or counter-clarification against the finding..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100">
                        <Upload className="h-3.5 w-3.5" />
                        <span>{responseFile ? responseFile : 'Attach Supporting Document'}</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) setResponseFile(e.target.files[0].name);
                          }}
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit Official Response</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-400">
              Select a clarification thread to view inquiry details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
