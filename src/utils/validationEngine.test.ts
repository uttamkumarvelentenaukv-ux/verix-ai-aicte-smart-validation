import test from 'node:test';
import assert from 'node:assert/strict';
import { runValidationPipeline, computeFileHash } from './validationEngine';
import { ApplicationRecord, ValidationRule } from '../types';

test('computeFileHash produces deterministic sha256 formatted string', () => {
  const hash1 = computeFileHash('Sample Document Content 2026');
  const hash2 = computeFileHash('Sample Document Content 2026');
  const hash3 = computeFileHash('Different Document Content');

  assert.equal(hash1, hash2);
  assert.notEqual(hash1, hash3);
  assert.ok(hash1.startsWith('sha256_'));
});

test('runValidationPipeline identifies anomalies and computes compliance score correctly', () => {
  const mockApplication: ApplicationRecord = {
    id: 'VERIX-2025-00124',
    referenceNumber: 'VERIX-2025-00124',
    institutionId: 'INST-001',
    institutionName: 'Rungta College of Engineering and Technology',
    institutionType: 'Private - Self Financed',
    applicationType: 'New Institute / New Program Approval',
    academicYear: '2025-2026',
    address: 'Bhilai, Chhattisgarh',
    state: 'Chhattisgarh',
    district: 'Durg',
    aisheCode: 'C-12345',
    status: 'Under Validation',
    submissionDate: '12 Oct 2026, 10:45 AM',
    lastUpdated: '12 Oct 2026, 11:30 AM',
    complianceScore: 87,
    documentsCount: {
      total: 10,
      uploaded: 8,
      pending: 2,
      expired: 0,
      optional: 1,
    },
    metrics: {
      validDocuments: 12,
      minorIssues: 2,
      majorIssues: 1,
      pendingChecks: 0,
      ocrAccuracy: 98.4,
      dataMatching: 95.1,
      ruleCompliance: 92.7,
      anomalyCount: 1,
    },
    extractedInfo: {
      institutionName: 'Rungta College of Engineering and Technology',
      aisheCode: 'C-12345',
      address: 'Kohka, Bhilai, Chhattisgarh - 490026',
      yearOfEstablishment: 2003,
      numberOfPrograms: 12,
      totalFaculty: 156,
      landAreaAcres: 25.4,
      builtUpAreaSqM: 32600,
    },
    documents: [
      {
        id: 'DOC-1',
        applicationId: 'VERIX-2025-00124',
        documentType: 'Affiliation Letter (University)',
        fileName: 'Affiliation_Letter.pdf',
        fileSize: '1.2 MB',
        uploadDate: '12 Oct 2026',
        mandatory: true,
        status: 'Verified',
        aiCheck: 'passed',
      },
      {
        id: 'DOC-2',
        applicationId: 'VERIX-2025-00124',
        documentType: 'Building Plan & Fire Safety Certificate',
        fileName: 'Building_Plan.pdf',
        fileSize: '2.8 MB',
        uploadDate: '12 Oct 2026',
        mandatory: true,
        status: 'Verified',
        aiCheck: 'passed',
      },
      {
        id: 'DOC-3',
        applicationId: 'VERIX-2025-00124',
        documentType: 'Faculty Details (AICTE Format)',
        fileName: 'Faculty_List.pdf',
        fileSize: '856 KB',
        uploadDate: '12 Oct 2026',
        mandatory: true,
        status: 'In Review',
        aiCheck: 'review',
      },
      {
        id: 'DOC-4',
        applicationId: 'VERIX-2025-00124',
        documentType: 'Land Documents (Ownership/Lease)',
        fileName: 'Land_Deed.pdf',
        fileSize: '3.1 MB',
        uploadDate: '12 Oct 2026',
        mandatory: true,
        status: 'Verified',
        aiCheck: 'passed',
      },
    ],
    findings: [],
  };

  const mockRules: ValidationRule[] = [
    {
      id: 'R-001',
      name: 'Undertaking present',
      category: 'Mandatory Checklist',
      checkType: 'Document Presence',
      severity: 'High',
      version: 'v1.2',
      enabled: true,
    },
    {
      id: 'R-002',
      name: 'Certificate validity',
      category: 'Validity & Expiry',
      checkType: 'Expiry Check',
      severity: 'Medium',
      version: 'v1.0',
      enabled: true,
    },
    {
      id: 'R-003',
      name: 'Faculty count match',
      category: 'Norms Verification',
      checkType: 'Institutional-Record Match',
      severity: 'Medium',
      version: 'v2.1',
      enabled: true,
    },
    {
      id: 'R-004',
      name: 'QR verification',
      category: 'Security & Integrity',
      checkType: 'Verification Requirement',
      severity: 'Low',
      version: 'v1.0',
      enabled: true,
    },
  ];

  const result = runValidationPipeline(mockApplication, mockRules);

  assert.ok(result.complianceScore > 0 && result.complianceScore <= 100);
  assert.ok(result.findings.length > 0);

  // Check for the signature mismatch anomaly
  const signatureFinding = result.findings.find((f) => f.id === 'F-ANM-1');
  assert.ok(signatureFinding, 'Should have flagged signature anomaly');
  assert.equal(signatureFinding?.severity, 'Major');
  assert.equal(signatureFinding?.category, 'Anomaly Detection');

  // Check for expiry alert
  const expiryFinding = result.findings.find((f) => f.id === 'F-EXP-1');
  assert.ok(expiryFinding, 'Should flag upcoming expiry');
  assert.equal(expiryFinding?.severity, 'Minor');
});
