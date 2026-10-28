import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ApplicationRecord,
  ValidationRule,
  ClarificationRequest,
  NotificationItem,
  AuditEvent,
  UserProfile,
  UserRole,
  DocumentRecord,
  Finding,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_RULES,
  INITIAL_APPLICATIONS,
  INITIAL_CLARIFICATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_EVENTS,
} from '../data/seedData';
import { runValidationPipeline, computeFileHash } from '../utils/validationEngine';

interface AppContextType {
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  applications: ApplicationRecord[];
  selectedApplication: ApplicationRecord;
  setSelectedApplicationId: (id: string) => void;
  rules: ValidationRule[];
  toggleRule: (id: string) => void;
  addRule: (rule: Omit<ValidationRule, 'id'>) => void;
  clarifications: ClarificationRequest[];
  createClarification: (req: Omit<ClarificationRequest, 'id' | 'createdAt' | 'status'>) => void;
  respondClarification: (id: string, responseText: string, docName?: string) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  auditEvents: AuditEvent[];
  addAuditEvent: (action: string, target: string, details: string, appId?: string) => void;
  createNewApplication: (data: Partial<ApplicationRecord>) => string;
  updateApplicationDocuments: (appId: string, docs: DocumentRecord[]) => void;
  runValidationOnApp: (appId: string) => Promise<void>;
  updateFindingStatus: (appId: string, findingId: string, status: Finding['status'], notes?: string) => void;
  updateApplicationStatus: (appId: string, status: ApplicationRecord['status']) => void;
  resetToDemoDefaults: () => void;
  mockIntegrationStatus: {
    aicteRecords: 'Connected' | 'Testing' | 'Error';
    issuingAuthority: 'Connected' | 'Testing' | 'Source Unavailable';
    lastTestTime: string;
  };
  testAicteRecordsConnection: () => Promise<void>;
  retryIssuingAuthorityVerification: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user state
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('verix_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0];
  });

  // Applications
  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    const saved = localStorage.getItem('verix_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [selectedAppId, setSelectedAppId] = useState<string>(() => {
    return applications[0]?.id || 'VERIX-2025-00124';
  });

  // Rules
  const [rules, setRules] = useState<ValidationRule[]>(() => {
    const saved = localStorage.getItem('verix_rules');
    return saved ? JSON.parse(saved) : INITIAL_RULES;
  });

  // Clarifications
  const [clarifications, setClarifications] = useState<ClarificationRequest[]>(() => {
    const saved = localStorage.getItem('verix_clarifications');
    return saved ? JSON.parse(saved) : INITIAL_CLARIFICATIONS;
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('verix_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Audit Events
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(() => {
    const saved = localStorage.getItem('verix_audits');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_EVENTS;
  });

  // Mock Integration Status
  const [mockIntegrationStatus, setMockIntegrationStatus] = useState<{
    aicteRecords: 'Connected' | 'Testing' | 'Error';
    issuingAuthority: 'Connected' | 'Testing' | 'Source Unavailable';
    lastTestTime: string;
  }>({
    aicteRecords: 'Connected',
    issuingAuthority: 'Source Unavailable',
    lastTestTime: 'today 09:40',
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('verix_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('verix_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('verix_rules', JSON.stringify(rules));
  }, [rules]);

  useEffect(() => {
    localStorage.setItem('verix_clarifications', JSON.stringify(clarifications));
  }, [clarifications]);

  useEffect(() => {
    localStorage.setItem('verix_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('verix_audits', JSON.stringify(auditEvents));
  }, [auditEvents]);

  const switchRole = (role: UserRole) => {
    const target = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(target);
    addAuditEvent('ROLE_SWITCH', `User switched to ${role} view`, `Switched active profile to ${target.displayName}`);
  };

  const selectedApplication = applications.find((a) => a.id === selectedAppId) || applications[0];

  const addAuditEvent = (action: string, target: string, details: string, appId?: string) => {
    const newEvent: AuditEvent = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      actor: `${currentUser.displayName} (${currentUser.role})`,
      role: currentUser.role,
      action,
      target,
      applicationId: appId,
      details,
      correlationId: `tx_${Math.random().toString(36).substring(2, 10)}`,
    };
    setAuditEvents((prev) => [newEvent, ...prev]);
  };

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updated = { ...r, enabled: !r.enabled };
          addAuditEvent('RULE_TOGGLED', `Rule ${r.id}`, `Rule "${r.name}" set to ${updated.enabled ? 'Enabled' : 'Disabled'}`);
          return updated;
        }
        return r;
      })
    );
  };

  const addRule = (newRuleData: Omit<ValidationRule, 'id'>) => {
    const newId = `R-00${rules.length + 1}`;
    const newRule: ValidationRule = {
      ...newRuleData,
      id: newId,
    };
    setRules((prev) => [...prev, newRule]);
    addAuditEvent('RULE_CREATED', `Rule ${newId}`, `Created custom validation rule "${newRule.name}"`);
  };

  const createClarification = (req: Omit<ClarificationRequest, 'id' | 'createdAt' | 'status'>) => {
    const newClarification: ClarificationRequest = {
      ...req,
      id: `CLR-${Date.now().toString().slice(-3)}`,
      status: 'Pending',
      createdAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setClarifications((prev) => [newClarification, ...prev]);

    // Update app status
    updateApplicationStatus(req.applicationId, 'Needs Clarification');

    // Notify institution
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Clarification Requested by AICTE Officer',
      message: `${req.officerName} requested clarification: "${req.question.slice(0, 70)}..."`,
      timestamp: 'Just now',
      read: false,
      type: 'clarification',
      applicationId: req.applicationId,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    addAuditEvent('CLARIFICATION_ISSUED', `Clarification ${newClarification.id}`, req.question, req.applicationId);
  };

  const respondClarification = (id: string, responseText: string, docName?: string) => {
    setClarifications((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            status: 'Answered',
            response: responseText,
            respondedAt: new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            responseDocumentName: docName,
          };
        }
        return c;
      })
    );

    const clr = clarifications.find((c) => c.id === id);
    if (clr) {
      addAuditEvent('CLARIFICATION_RESPONDED', `Clarification ${id}`, responseText, clr.applicationId);
      const newNotif: NotificationItem = {
        id: `NOTIF-${Date.now()}`,
        title: 'Institution Responded to Clarification',
        message: `${clr.institutionName} submitted clarification for ${clr.documentName || 'finding'}.`,
        timestamp: 'Just now',
        read: false,
        type: 'info',
        applicationId: clr.applicationId,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const createNewApplication = (data: Partial<ApplicationRecord>): string => {
    const year = data.academicYear?.split('-')[0] || '2026';
    const randomSeq = Math.floor(100 + Math.random() * 900);
    const newRef = `VERIX-${year}-00${randomSeq}`;

    const newApp: ApplicationRecord = {
      id: newRef,
      referenceNumber: newRef,
      institutionId: currentUser.institutionId || 'INST-001',
      institutionName: data.institutionName || currentUser.institutionName || 'Rungta College of Engineering and Technology',
      institutionType: data.institutionType || 'Private - Self Financed',
      applicationType: data.applicationType || 'Extension of Approval (EoA)',
      academicYear: data.academicYear || '2026-2027',
      address: data.address || 'Bhilai, Chhattisgarh',
      state: data.state || 'Chhattisgarh',
      district: data.district || 'Durg',
      aisheCode: data.aisheCode || 'C-12345',
      status: 'Submitted',
      submissionDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      lastUpdated: 'Just now',
      assignedOfficer: 'Dr. Rajesh Sharma',
      complianceScore: 85,
      documentsCount: {
        total: data.documents?.length || 8,
        uploaded: data.documents?.filter((d) => d.status === 'Uploaded' || d.status === 'Verified').length || 8,
        pending: 0,
        expired: 0,
        optional: 1,
      },
      metrics: {
        validDocuments: data.documents?.length || 8,
        minorIssues: 1,
        majorIssues: 0,
        pendingChecks: 0,
        ocrAccuracy: 98.4,
        dataMatching: 95.1,
        ruleCompliance: 92.7,
        anomalyCount: 0,
      },
      extractedInfo: {
        institutionName: data.institutionName || 'Rungta College of Engineering and Technology',
        aisheCode: data.aisheCode || 'C-12345',
        address: data.address || 'Bhilai, Chhattisgarh',
        yearOfEstablishment: 2003,
        numberOfPrograms: 12,
        totalFaculty: 156,
        landAreaAcres: 25.4,
        builtUpAreaSqM: 32600,
      },
      documents: data.documents || [],
      findings: [],
    };

    setApplications((prev) => [newApp, ...prev]);
    setSelectedAppId(newApp.id);
    addAuditEvent('APPLICATION_CREATED', `Application ${newRef}`, `Created by ${currentUser.displayName}`, newRef);

    return newRef;
  };

  const updateApplicationDocuments = (appId: string, docs: DocumentRecord[]) => {
    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === appId) {
          return {
            ...a,
            documents: docs,
            documentsCount: {
              ...a.documentsCount,
              uploaded: docs.filter((d) => d.status === 'Uploaded' || d.status === 'Verified').length,
            },
          };
        }
        return a;
      })
    );
  };

  const runValidationOnApp = async (appId: string) => {
    const targetApp = applications.find((a) => a.id === appId);
    if (!targetApp) return;

    // Simulate pipeline execution
    const pipelineResult = runValidationPipeline(targetApp, rules);

    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === appId) {
          return {
            ...a,
            status: 'Validation Completed',
            complianceScore: pipelineResult.complianceScore,
            metrics: pipelineResult.metrics,
            findings: pipelineResult.findings,
            lastUpdated: 'Just now',
          };
        }
        return a;
      })
    );

    addAuditEvent('AI_VALIDATION_COMPLETED', `Application ${appId}`, `Analyzed ${targetApp.documents.length} documents. Compliance score: ${pipelineResult.complianceScore}%`, appId);
  };

  const updateFindingStatus = (appId: string, findingId: string, status: Finding['status'], notes?: string) => {
    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === appId) {
          return {
            ...a,
            findings: a.findings.map((f) => {
              if (f.id === findingId) {
                return {
                  ...f,
                  status,
                  reviewedBy: currentUser.displayName,
                  reviewedAt: new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                  resolutionNotes: notes || f.resolutionNotes,
                };
              }
              return f;
            }),
          };
        }
        return a;
      })
    );

    addAuditEvent('FINDING_REVIEWED', `Finding ${findingId}`, `Status changed to ${status} by ${currentUser.displayName}${notes ? `: ${notes}` : ''}`, appId);
  };

  const updateApplicationStatus = (appId: string, status: ApplicationRecord['status']) => {
    setApplications((prev) =>
      prev.map((a) => {
        if (a.id === appId) {
          return { ...a, status, lastUpdated: 'Just now' };
        }
        return a;
      })
    );
    addAuditEvent('STATUS_CHANGED', `Application ${appId}`, `Status updated to ${status}`, appId);
  };

  const testAicteRecordsConnection = async () => {
    setMockIntegrationStatus((prev) => ({ ...prev, aicteRecords: 'Testing' }));
    await new Promise((r) => setTimeout(r, 1200));
    setMockIntegrationStatus((prev) => ({
      ...prev,
      aicteRecords: 'Connected',
      lastTestTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }));
    addAuditEvent('INTEGRATION_TEST', 'AICTE Institutional Records', 'Mock connection ping verified successfully (Latency: 42ms)');
  };

  const retryIssuingAuthorityVerification = async () => {
    setMockIntegrationStatus((prev) => ({ ...prev, issuingAuthority: 'Testing' }));
    await new Promise((r) => setTimeout(r, 1500));
    setMockIntegrationStatus((prev) => ({
      ...prev,
      issuingAuthority: 'Connected',
      lastTestTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }));
    addAuditEvent('INTEGRATION_TEST', 'Issuing-Authority Verification', 'Demo gateway re-established connection with API Setu simulation');
  };

  const resetToDemoDefaults = () => {
    localStorage.clear();
    setApplications(INITIAL_APPLICATIONS);
    setRules(INITIAL_RULES);
    setClarifications(INITIAL_CLARIFICATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditEvents(INITIAL_AUDIT_EVENTS);
    setCurrentUser(INITIAL_USERS[0]);
    setSelectedAppId(INITIAL_APPLICATIONS[0].id);
    addAuditEvent('SYSTEM_RESET', 'Demo Database', 'Reset all state collections to reference demonstration baseline');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchRole,
        applications,
        selectedApplication,
        setSelectedApplicationId: setSelectedAppId,
        rules,
        toggleRule,
        addRule,
        clarifications,
        createClarification,
        respondClarification,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        auditEvents,
        addAuditEvent,
        createNewApplication,
        updateApplicationDocuments,
        runValidationOnApp,
        updateFindingStatus,
        updateApplicationStatus,
        resetToDemoDefaults,
        mockIntegrationStatus,
        testAicteRecordsConnection,
        retryIssuingAuthorityVerification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
};
