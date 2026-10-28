import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Eye,
  MoreVertical,
  Check,
  ChevronRight,
  ArrowLeft,
  Download,
  FileCheck,
  RotateCw,
  Sparkles,
  HelpCircle,
  FileQuestion,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Building2,
  Calendar,
  MapPin,
  ShieldCheck,
  Landmark,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DocumentType, DocumentStatus, DocumentRecord } from '../../types';

interface NewApplicationWizardProps {
  onComplete: () => void;
  onNavigateToValidation: (appId: string) => void;
}

export const NewApplicationWizard: React.FC<NewApplicationWizardProps> = ({
  onComplete,
  onNavigateToValidation,
}) => {
  const { createNewApplication, runValidationOnApp } = useApp();

  const [step, setStep] = useState<number>(2); // Default to Step 2 matching the reference image!
  const [applicationType, setApplicationType] = useState('New Institute / New Program Approval');
  const [academicYear, setAcademicYear] = useState('2025-2026');
  const [institutionName, setInstitutionName] = useState('Rungta College of Engineering and Technology');
  const [institutionType, setInstitutionType] = useState('Private - Self Financed');
  const [address, setAddress] = useState('Bhilai, Chhattisgarh');
  const [stateName, setStateName] = useState('Chhattisgarh');
  const [district, setDistrict] = useState('Durg');

  // Document list
  const [documents, setDocuments] = useState<
    {
      id: number;
      type: DocumentType;
      mandatory: boolean;
      status: DocumentStatus;
      fileName: string;
      fileSize: string;
      uploadDate: string;
    }[]
  >([
    {
      id: 1,
      type: 'Land Documents (Ownership/Lease)',
      mandatory: true,
      status: 'Uploaded',
      fileName: 'Land_Deed.pdf',
      fileSize: '2.4 MB',
      uploadDate: '12 Oct 2026, 10:45 AM',
    },
    {
      id: 2,
      type: 'Building Plan & Fire Safety Certificate',
      mandatory: true,
      status: 'Uploaded',
      fileName: 'Building_Plan.pdf',
      fileSize: '2.8 MB',
      uploadDate: '12 Oct 2026, 10:46 AM',
    },
    {
      id: 3,
      type: 'Affiliation Letter (University)',
      mandatory: true,
      status: 'Uploaded',
      fileName: 'Affiliation.pdf',
      fileSize: '1.2 MB',
      uploadDate: '12 Oct 2026, 10:48 AM',
    },
    {
      id: 4,
      type: 'Faculty Details (AICTE Format)',
      mandatory: true,
      status: 'Uploading',
      fileName: 'Faculty_List.pdf',
      fileSize: '856 KB',
      uploadDate: '12 Oct 2026, 10:50 AM',
    },
    {
      id: 5,
      type: 'Infrastructure Photos',
      mandatory: true,
      status: 'Not Uploaded',
      fileName: '-',
      fileSize: '-',
      uploadDate: '-',
    },
    {
      id: 6,
      type: 'Financial Statements (Last 3 Years)',
      mandatory: true,
      status: 'Uploaded',
      fileName: 'Finance_2024.pdf',
      fileSize: '4.2 MB',
      uploadDate: '12 Oct 2026, 10:52 AM',
    },
    {
      id: 7,
      type: 'NBA/NAAC (if applicable)',
      mandatory: false,
      status: 'Not Uploaded',
      fileName: '-',
      fileSize: '-',
      uploadDate: '-',
    },
    {
      id: 8,
      type: 'Other Documents',
      mandatory: false,
      status: 'Uploaded',
      fileName: 'Other_docs.pdf',
      fileSize: '1.9 MB',
      uploadDate: '12 Oct 2026, 10:55 AM',
    },
  ]);

  const [selectedDocId, setSelectedDocId] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [simulatedUploading, setSimulatedUploading] = useState<boolean>(false);
  const [createdAppId, setCreatedAppId] = useState<string>('');
  const [validationRunning, setValidationRunning] = useState<boolean>(false);
  const [pipelineProgress, setPipelineProgress] = useState<number>(0);
  const [pipelineStageText, setPipelineStageText] = useState<string>('');

  const selectedDoc = documents.find((d) => d.id === selectedDocId) || documents[0];

  const handleSimulateUpload = (docId: number) => {
    setDocuments((prev) =>
      prev.map((d) => {
        if (d.id === docId) {
          return {
            ...d,
            status: 'Uploaded',
            fileName: `${d.type.split(' ')[0]}_verified.pdf`,
            fileSize: '2.1 MB',
            uploadDate: 'Just now',
          };
        }
        return d;
      })
    );
    setSelectedDocId(docId);
  };

  const handleDropUpload = (e: React.DragEvent | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSimulatedUploading(true);
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((d) => {
          if (d.status === 'Not Uploaded' && d.mandatory) {
            return {
              ...d,
              status: 'Uploaded',
              fileName: 'Infrastructure_Evidence_Pack.pdf',
              fileSize: '5.4 MB',
              uploadDate: 'Just now',
            };
          }
          return d;
        })
      );
      setSimulatedUploading(false);
    }, 1000);
  };

  const handleFinalSubmit = async () => {
    setStep(4);
    setValidationRunning(true);

    const mappedDocs: DocumentRecord[] = documents
      .filter((d) => d.status === 'Uploaded' || d.status === 'Uploading')
      .map((d) => ({
        id: `DOC-WIZ-${d.id}`,
        applicationId: '',
        documentType: d.type,
        fileName: d.fileName === '-' ? `${d.type}.pdf` : d.fileName,
        fileSize: d.fileSize === '-' ? '2.0 MB' : d.fileSize,
        uploadDate: '12 Oct 2026',
        mandatory: d.mandatory,
        status: 'Verified',
        aiCheck: 'passed',
      }));

    const newAppId = createNewApplication({
      institutionName,
      institutionType,
      applicationType: applicationType as any,
      academicYear,
      address,
      state: stateName,
      district,
      documents: mappedDocs,
    });
    setCreatedAppId(newAppId);

    // Simulate 10-stage AI validation pipeline
    const stages = [
      'Stage 1: File & format verification (SHA-256 integrity hash)...',
      'Stage 2: Skew correction & multi-page OCR extraction...',
      'Stage 3: Classifying document taxonomy against AICTE norms...',
      'Stage 4: Checking document completeness & mandatory clauses...',
      'Stage 5: Expiry & validity audit (Fire safety & Land deeds)...',
      'Stage 6: Reconciling faculty cadre ratio & AISHE records...',
      'Stage 7: Tampering & digital signature discrepancy scan...',
      'Stage 8: Evaluating AICTE Approval Process Handbook (2024-27)...',
      'Stage 9: Querying API Setu & National Repository bridges...',
      'Stage 10: Generating evidence-linked validation report...',
    ];

    for (let i = 0; i < stages.length; i++) {
      setPipelineStageText(stages[i]);
      setPipelineProgress(Math.round(((i + 1) / stages.length) * 100));
      await new Promise((r) => setTimeout(r, 450));
    }

    await runValidationOnApp(newAppId);
    setValidationRunning(false);
    setStep(5);
  };

  const uploadedCount = documents.filter((d) => d.status === 'Uploaded').length;
  const pendingCount = documents.filter((d) => d.status === 'Not Uploaded' || d.status === 'Uploading').length;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Breadcrumb & Header matching reference image */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-800 font-bold">New Application</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">New Application</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Submit your institution details and upload required documents for AICTE approval
            </p>
          </div>
        </div>
      </div>

      {/* Stepper matching screenshot:
          1 Institution Details -> 2 Document Upload -> 3 AI Validation -> 4 Review & Submit -> 5 Confirmation */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="relative flex items-center justify-between max-w-4xl mx-auto">
          {/* Progress track line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-slate-200 z-0" />
          <div
            className="absolute top-1/2 left-6 -translate-y-1/2 h-0.5 bg-blue-600 transition-all duration-300 z-0"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />

          {/* Stepper Nodes */}
          {[
            { num: 1, label: 'Institution Details' },
            { num: 2, label: 'Document Upload' },
            { num: 3, label: 'Review & Submit' },
            { num: 4, label: 'AI Validation' },
            { num: 5, label: 'Confirmation' },
          ].map((item) => (
            <div key={item.num} className="relative z-10 flex flex-col items-center">
              <button
                onClick={() => {
                  if (item.num <= step || step === 5) setStep(item.num);
                }}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  item.num < step
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : item.num === step
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md'
                    : 'bg-white text-slate-400 border border-slate-300'
                }`}
              >
                {item.num < step ? <Check className="h-4 w-4" /> : item.num}
              </button>
              <span
                className={`mt-2 text-xs font-semibold whitespace-nowrap ${
                  item.num === step ? 'text-blue-600 font-bold' : item.num < step ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Institution Details */}
      {step === 1 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-800">Application & Institution Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Application Type *</label>
              <select
                value={applicationType}
                onChange={(e) => setApplicationType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
              >
                <option>New Institute / New Program Approval</option>
                <option>Extension of Approval (EoA)</option>
                <option>Increase in Intake / Additional Course</option>
                <option>Closure of Course / Institute</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Academic Year *</label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
              >
                <option>2025-2026</option>
                <option>2026-2027</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Institution Name *</label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Institution Type *</label>
              <select
                value={institutionType}
                onChange={(e) => setInstitutionType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
              >
                <option>Private - Self Financed</option>
                <option>Government</option>
                <option>Government Aided</option>
                <option>University Managed - Private</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Address *</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">State *</label>
                <input
                  type="text"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">District *</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <span className="text-xs font-bold text-slate-700 block mb-2">Application Category Badges:</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                Engineering
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Existing Institution
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                Private Self Financing
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                Technical Education
              </span>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700"
            >
              <span>Save & Continue</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Document Upload matching WhatsApp_Image_2026-10-28_at_17.16.54__1__7745cb0d.jpeg */}
      {step === 2 && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column (7 cols): Details & Document Upload Table */}
          <div className="xl:col-span-7 space-y-6">
            {/* Application Details Summary Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="font-bold text-slate-800 text-sm">Application Details</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-medium text-slate-400 block">Application Type *</span>
                  <span className="font-bold text-slate-800">{applicationType}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-400 block">Academic Year *</span>
                  <span className="font-bold text-slate-800">{academicYear}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-400 block">Institution Name *</span>
                  <span className="font-bold text-slate-800">{institutionName}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-400 block">Institution Type *</span>
                  <span className="font-bold text-slate-800">{institutionType}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-400 block">Address *</span>
                  <span className="font-bold text-slate-800">{address}</span>
                </div>
                <div className="flex gap-4">
                  <div>
                    <span className="font-medium text-slate-400 block">State *</span>
                    <span className="font-bold text-slate-800">{stateName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-400 block">District *</span>
                    <span className="font-bold text-slate-800">{district}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Upload Table */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <UploadCloud className="h-4 w-4 text-purple-600" />
                    <span className="font-bold text-slate-800 text-sm">Document Upload</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Upload all required documents as per AICTE guidelines (2024-27)
                  </p>
                </div>
                <button
                  onClick={() => alert('AICTE Approval Process Handbook (2024-27) Document Checklist downloaded.')}
                  className="flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/70 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Checklist</span>
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                      <th className="pb-2.5 w-8">#</th>
                      <th className="pb-2.5 pr-4">Document Type</th>
                      <th className="pb-2.5 px-3 w-24">Mandatory</th>
                      <th className="pb-2.5 px-3 w-28">Status</th>
                      <th className="pb-2.5 px-3">File Name</th>
                      <th className="pb-2.5 text-right pl-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {documents.map((doc) => (
                      <tr
                        key={doc.id}
                        onClick={() => setSelectedDocId(doc.id)}
                        className={`cursor-pointer transition-colors ${
                          selectedDocId === doc.id ? 'bg-blue-50/50' : 'hover:bg-slate-50/60'
                        }`}
                      >
                        <td className="py-2.5 font-bold text-slate-500">{doc.id}</td>
                        <td className="py-2.5 font-bold text-slate-800">{doc.type}</td>
                        <td className="py-2.5">
                          {doc.mandatory ? (
                            <span className="text-[11px] font-bold text-red-500">Yes</span>
                          ) : (
                            <span className="text-[11px] font-medium text-slate-400">No</span>
                          )}
                        </td>
                        <td className="py-2.5">
                          {doc.status === 'Uploaded' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Uploaded
                            </span>
                          )}
                          {doc.status === 'Uploading' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1 w-max">
                              <RotateCw className="h-2.5 w-2.5 animate-spin" /> Uploading
                            </span>
                          )}
                          {doc.status === 'Not Uploaded' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                              Not Uploaded
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 text-slate-600 font-mono text-[11px] truncate max-w-[140px]">
                          {doc.fileName}
                        </td>
                        <td className="py-2.5 text-right">
                          {doc.status === 'Not Uploaded' ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSimulateUpload(doc.id);
                              }}
                              className="rounded-lg bg-blue-600 px-3 py-1 text-[11px] font-bold text-white shadow-2xs hover:bg-blue-700"
                            >
                              Upload
                            </button>
                          ) : (
                            <div className="flex items-center justify-end gap-1.5 text-slate-400">
                              <Eye className="h-4 w-4 hover:text-slate-700" />
                              <MoreVertical className="h-4 w-4 hover:text-slate-700" />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Drag and drop upload box */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropUpload}
                className="mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/30 p-6 text-center"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-1.5">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold text-slate-800">Drag & Drop Files Here</p>
                <p className="text-[11px] text-slate-400">or</p>
                <label className="mt-2.5 cursor-pointer rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/25 hover:bg-blue-700">
                  {simulatedUploading ? 'Processing File...' : 'Choose Files'}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleDropUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
                <p className="text-[10px] text-slate-400 mt-2">
                  Supported formats: PDF, JPG, PNG (Max 10MB each)
                </p>
              </div>

              {/* Bottom buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700"
                >
                  <span>Save & Continue</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): AICTE Checklist + Selected Document Preview */}
          <div className="xl:col-span-5 space-y-6">
            {/* Checklist summary widget */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-600 text-white">
                    <FileCheck className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-bold text-slate-800 text-xs">
                    AICTE Document Checklist (2024-27)
                  </span>
                </div>
                <button className="text-xs font-bold text-blue-600 hover:underline">
                  View Guidelines
                </button>
              </div>

              {/* 4 checklist mini cards */}
              <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                <div className="rounded-xl bg-emerald-50/80 border border-emerald-100 p-2.5">
                  <span className="flex items-center justify-center text-xs font-extrabold text-emerald-700 gap-1">
                    <FileCheck className="h-3.5 w-3.5" /> {uploadedCount}/10
                  </span>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Uploaded</p>
                </div>
                <div className="rounded-xl bg-amber-50/80 border border-amber-100 p-2.5">
                  <span className="flex items-center justify-center text-xs font-extrabold text-amber-700 gap-1">
                    <RotateCw className="h-3.5 w-3.5" /> {pendingCount}
                  </span>
                  <p className="text-[10px] text-amber-600 font-semibold mt-0.5">Pending</p>
                </div>
                <div className="rounded-xl bg-red-50/80 border border-red-100 p-2.5">
                  <span className="flex items-center justify-center text-xs font-extrabold text-red-700 gap-1">
                    <AlertTriangle className="h-3.5 w-3.5" /> 0
                  </span>
                  <p className="text-[10px] text-red-600 font-semibold mt-0.5">Expired</p>
                </div>
                <div className="rounded-xl bg-purple-50/80 border border-purple-100 p-2.5">
                  <span className="flex items-center justify-center text-xs font-extrabold text-purple-700 gap-1">
                    <FileText className="h-3.5 w-3.5" /> 1
                  </span>
                  <p className="text-[10px] text-purple-600 font-semibold mt-0.5">Optional</p>
                </div>
              </div>
            </div>

            {/* Selected Document Preview matching screenshot */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="font-bold text-slate-800 text-sm">Selected Document Preview</span>
              </div>

              {/* Realistic Document Paper View */}
              <div className="relative rounded-xl border border-slate-300 bg-slate-900 p-3 shadow-inner flex flex-col items-center">
                <div className="w-full max-w-sm rounded-lg bg-white p-5 text-slate-900 shadow-md min-h-[300px] flex flex-col justify-between border border-slate-200 text-center font-serif">
                  {/* National Emblem & Header */}
                  <div>
                    <div className="mx-auto flex h-10 w-10 items-center justify-center text-amber-800">
                      <Landmark className="h-8 w-8" />
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-700 mt-1">
                      {institutionName}
                    </p>
                    <p className="text-[11px] font-black tracking-wide text-slate-900 border-b border-slate-400 pb-1 mt-1 uppercase">
                      {selectedDoc.type === 'Land Documents (Ownership/Lease)'
                        ? 'LAND OWNERSHIP CERTIFICATE'
                        : selectedDoc.type}
                    </p>
                    <p className="text-[8px] text-slate-500 font-sans mt-2 text-left leading-relaxed">
                      This is to certify that Rungta College of Engineering and Technology holds legal ownership / registered leasehold title to 25.4 Acres of contiguous institutional land in revenue survey district Durg, Chhattisgarh...
                    </p>
                  </div>

                  {/* Stamp & Seal */}
                  <div className="flex items-end justify-between pt-4 font-sans text-[8px] text-slate-600 border-t border-slate-200">
                    <div className="text-left">
                      <p>Khasra No: 142/1, 142/2</p>
                      <p>Built Area: 32,600 sq. m.</p>
                      <p>Date: 12-Oct-2026</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-indigo-600 text-indigo-700 text-[7px] font-bold">
                        SEAL
                      </div>
                      <span className="text-[7px] italic mt-0.5">Authorised Registrar</span>
                    </div>
                  </div>
                </div>

                {/* PDF zoom toolbar */}
                <div className="mt-3 flex items-center justify-between w-full max-w-sm text-slate-300 text-xs px-2">
                  <span>1 / 3</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}>-</button>
                    <span>{zoomLevel}%</span>
                    <button onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}>+</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCw className="h-3 w-3" />
                    <Maximize2 className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Document Information List */}
              <div className="space-y-1.5 text-xs">
                <p className="font-bold text-slate-800 text-xs">Document Information</p>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">File Name</span>
                  <span className="font-semibold text-slate-800">{selectedDoc.fileName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Document Type</span>
                  <span className="font-semibold text-slate-800">{selectedDoc.type}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">File Size</span>
                  <span className="font-semibold text-slate-800">{selectedDoc.fileSize}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Upload Date</span>
                  <span className="font-semibold text-slate-800">{selectedDoc.uploadDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Status</span>
                  <span className="font-bold text-emerald-600">Verified</span>
                </div>
              </div>

              {/* AI Pre-check Result Box matching screenshot */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-bold text-emerald-900 text-xs">Valid Document</span>
                </div>

                <div className="space-y-1 text-xs text-slate-700 pl-7">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Readable text detected</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Document type matched</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>No tampering detected</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>All required fields found</span>
                  </div>
                </div>
              </div>

              {/* Caution banner at bottom matching screenshot */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-[11px] text-amber-800 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  Final verification will be performed during AI validation based on AICTE records and official sources.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileCheck className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-800">Review Application Summary Before Final Submission</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <p className="text-slate-400">Application Type</p>
              <p className="font-bold text-slate-800 mt-0.5">{applicationType}</p>
            </div>
            <div>
              <p className="text-slate-400">Academic Year</p>
              <p className="font-bold text-slate-800 mt-0.5">{academicYear}</p>
            </div>
            <div>
              <p className="text-slate-400">Institution</p>
              <p className="font-bold text-slate-800 mt-0.5">{institutionName}</p>
            </div>
            <div>
              <p className="text-slate-400">Location</p>
              <p className="font-bold text-slate-800 mt-0.5">{district}, {stateName}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Checklist Completion ({uploadedCount} of {documents.length} Uploaded)
            </h3>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
              {documents.map((d) => (
                <div key={d.id} className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {d.status === 'Uploaded' ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    )}
                    <span className="font-bold text-slate-800">{d.type}</span>
                    {d.mandatory && <span className="text-[10px] text-red-500 font-semibold">(Mandatory)</span>}
                  </div>
                  <span className="text-slate-500 font-mono text-[11px]">{d.fileName}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-blue-50/80 border border-blue-200 p-4 text-xs text-blue-900 space-y-2">
            <p className="font-bold">Statutory Scrutiny Declaration</p>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              I hereby certify that all documents submitted are true copies of original records. I understand that VERIX AI provides preliminary automated verification, and final regulatory approval remains subject to statutory scrutiny and physical inspection by authorized AICTE officials.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Documents</span>
            </button>
            <button
              onClick={handleFinalSubmit}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700"
            >
              <Sparkles className="h-4 w-4" />
              <span>Submit & Run AI Validation</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 4: AI Validation Pipeline In-Progress */}
      {step === 4 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs max-w-2xl mx-auto text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-md">
            <Sparkles className="h-8 w-8 animate-pulse" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-800">
              VERIX AI Validation Pipeline Running
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Executing multi-stage documentary scrutiny, OCR extraction, and AICTE rule compliance checks.
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">{pipelineStageText}</span>
              <span className="text-blue-600">{pipelineProgress}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                style={{ width: `${pipelineProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Submission & Validation Confirmation */}
      {step === 5 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs max-w-2xl mx-auto text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-md">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">Application Successfully Submitted!</h2>
            <p className="text-sm font-semibold text-blue-600 mt-1">Reference Number: {createdAppId}</p>
            <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
              Automated AI preliminary checks have completed. Your compliance score and evidence-linked findings have been calculated.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigateToValidation(createdAppId)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700"
            >
              <span>View AI Validation Results</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={onComplete}
              className="w-full sm:w-auto rounded-xl border border-slate-200 px-6 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
