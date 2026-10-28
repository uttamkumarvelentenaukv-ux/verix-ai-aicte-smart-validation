import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Shell } from './components/layout/Shell';
import { InstitutionDashboard } from './components/institution/InstitutionDashboard';
import { NewApplicationWizard } from './components/institution/NewApplicationWizard';
import { ValidationResultsView } from './components/institution/ValidationResultsView';
import { DocumentCentreView } from './components/institution/DocumentCentreView';
import { OfficerDashboard } from './components/officer/OfficerDashboard';
import { OfficerReviewWorkspace } from './components/officer/OfficerReviewWorkspace';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ClarificationsView } from './components/common/ClarificationsView';
import { AuditTrailView } from './components/common/AuditTrailView';
import { ReportsView } from './components/common/ReportsView';
import { Headphones, Mail, Phone, ExternalLink } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentUser, setSelectedApplicationId, selectedApplication } = useApp();
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <InstitutionDashboard onNavigate={setCurrentTab} />;
      case 'new-application':
        return (
          <NewApplicationWizard
            onComplete={() => setCurrentTab('dashboard')}
            onNavigateToValidation={(appId) => {
              setSelectedApplicationId(appId);
              setCurrentTab('validation-status');
            }}
          />
        );
      case 'my-applications':
      case 'document-upload':
        return <DocumentCentreView />;
      case 'validation-status':
      case 'ai-validation':
      case 'compliance-check':
        return (
          <ValidationResultsView
            onBack={() => setCurrentTab('dashboard')}
            onProceedToReport={() => setCurrentTab('reports')}
          />
        );
      case 'officer-queue':
        return (
          <OfficerDashboard
            onOpenApplication={(appId) => {
              setSelectedApplicationId(appId);
              setCurrentTab('officer-review');
            }}
          />
        );
      case 'officer-review':
        return <OfficerReviewWorkspace onBackToQueue={() => setCurrentTab('officer-queue')} />;
      case 'admin-overview':
      case 'admin-users':
      case 'admin-rules':
      case 'admin-masterdata':
      case 'admin-integrations':
        return <AdminDashboard />;
      case 'clarifications':
        return <ClarificationsView />;
      case 'audit-trail':
        return <AuditTrailView />;
      case 'reports':
        return <ReportsView />;
      case 'help':
        return (
          <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-white p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Headphones className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-slate-800">AICTE Help & Technical Support</h1>
                <p className="text-xs text-slate-500">
                  Assistance with VERIX AI document uploads, OCR extractions, and Approval Process Handbook regulations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span>AICTE Central Support Desk</span>
                </span>
                <p className="text-slate-600">Toll Free: 1800-11-2233 / (011) 2958-1000</p>
                <p className="text-[11px] text-slate-400">Available Monday–Friday: 9:30 AM to 5:30 PM IST</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emerald-600" />
                  <span>Technical Verification Grievances</span>
                </span>
                <p className="text-slate-600">Email: helpdesk-verix@aicte-india.org</p>
                <p className="text-[11px] text-slate-400">Response within 24 business hours</p>
              </div>
            </div>

            <div className="rounded-xl bg-blue-50 p-4 border border-blue-200 text-xs text-blue-900 leading-relaxed">
              <span className="font-bold block mb-1">Approval Process Handbook (2024-27) Reference:</span>
              Institutions are advised to ensure all uploaded land deeds, stability certificates, and faculty appointment letters comply strictly with Chapters I through VIII of the AICTE Approval Process Handbook.
            </div>
          </div>
        );
      default:
        return <InstitutionDashboard onNavigate={setCurrentTab} />;
    }
  };

  return (
    <Shell currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {renderContent()}
    </Shell>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
