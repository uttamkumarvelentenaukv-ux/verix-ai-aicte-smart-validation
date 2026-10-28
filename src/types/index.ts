export type UserRole = 'institution' | 'officer' | 'admin';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: UserRole;
  institutionId?: string;
  institutionName?: string;
  assignedScope?: string;
  avatarText?: string;
}

export type ApplicationType = 
  | 'Extension of Approval (EoA)'
  | 'New Institute / New Program Approval'
  | 'Increase in Intake / Additional Course'
  | 'Closure of Course / Institute'
  | 'Change of Site / Location';

export type ApplicationStatus = 
  | 'Draft'
  | 'Submitted'
  | 'Under Validation'
  | 'Validation Completed'
  | 'Under Officer Review'
  | 'Needs Clarification'
  | 'Recommended for Approval'
  | 'Recommended for Physical Inspection'
  | 'Rejected'
  | 'Approved';

export type DocumentType = 
  | 'Land Documents (Ownership/Lease)'
  | 'Building Plan & Fire Safety Certificate'
  | 'Affiliation Letter (University)'
  | 'Faculty Details (AICTE Format)'
  | 'Infrastructure Photos'
  | 'Financial Statements (Last 3 Years)'
  | 'Governing Body Details'
  | 'NBA/NAAC (if applicable)'
  | 'Occupancy Certificate'
  | 'Other Documents';

export type DocumentStatus = 
  | 'Uploaded'
  | 'Uploading'
  | 'Not Uploaded'
  | 'Processing'
  | 'Verified'
  | 'Needs Update'
  | 'Needs Info'
  | 'In Review'
  | 'Mismatch Detected'
  | 'Expired';

export type AICheckStatus = 'passed' | 'review' | 'warning' | 'failed' | 'processing';

export interface DocumentRecord {
  id: string;
  applicationId: string;
  documentType: DocumentType;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  mandatory: boolean;
  status: DocumentStatus;
  aiCheck: AICheckStatus;
  fileHash?: string;
  extractedFields?: Record<string, string | number>;
  previewUrl?: string;
  anomalyDetected?: boolean;
  anomalyDescription?: string;
}

export type FindingSeverity = 'Major' | 'Minor' | 'Warning' | 'Passed';
export type FindingStatus = 'Open' | 'Confirmed' | 'Dismissed' | 'Under Verification' | 'Resolved';

export interface Finding {
  id: string;
  applicationId: string;
  documentId?: string;
  documentName?: string;
  category: 'Document Completeness' | 'Data Consistency' | 'Anomaly Detection' | 'Regulatory Compliance' | 'Issuer Verification';
  severity: FindingSeverity;
  title: string;
  description: string;
  extractedValue?: string;
  expectedValue?: string;
  ruleId?: string;
  clauseReference?: string;
  confidence?: number;
  status: FindingStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  resolutionNotes?: string;
  page?: number;
  bbox?: { x: number; y: number; width: number; height: number };
}

export interface ApplicationRecord {
  id: string;
  referenceNumber: string;
  institutionId: string;
  institutionName: string;
  institutionType: string;
  applicationType: ApplicationType;
  academicYear: string;
  address: string;
  state: string;
  district: string;
  aisheCode?: string;
  status: ApplicationStatus;
  submissionDate: string;
  lastUpdated: string;
  assignedOfficer?: string;
  complianceScore: number;
  documentsCount: {
    total: number;
    uploaded: number;
    pending: number;
    expired: number;
    optional: number;
  };
  metrics: {
    validDocuments: number;
    minorIssues: number;
    majorIssues: number;
    pendingChecks: number;
    ocrAccuracy: number;
    dataMatching: number;
    ruleCompliance: number;
    anomalyCount: number;
  };
  extractedInfo: {
    institutionName: string;
    aisheCode: string;
    address: string;
    yearOfEstablishment: number;
    numberOfPrograms: number;
    totalFaculty: number;
    landAreaAcres: number;
    builtUpAreaSqM: number;
  };
  documents: DocumentRecord[];
  findings: Finding[];
}

export interface ValidationRule {
  id: string;
  name: string;
  category: string;
  checkType: 'Document Presence' | 'Expiry Check' | 'Institutional-Record Match' | 'Verification Requirement' | 'Integrity Check';
  severity: 'High' | 'Medium' | 'Low';
  version: string;
  enabled: boolean;
  clauseReference?: string;
  description?: string;
}

export interface ClarificationRequest {
  id: string;
  applicationId: string;
  applicationRef: string;
  institutionName: string;
  findingId?: string;
  documentName?: string;
  officerName: string;
  question: string;
  status: 'Pending' | 'Answered' | 'Closed';
  createdAt: string;
  response?: string;
  respondedAt?: string;
  responseDocumentName?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'alert' | 'info' | 'success' | 'clarification';
  applicationId?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  applicationId?: string;
  details: string;
  correlationId: string;
}
