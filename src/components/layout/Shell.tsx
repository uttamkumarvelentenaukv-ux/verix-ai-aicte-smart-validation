import React, { useState } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  FolderOpen,
  UploadCloud,
  ShieldCheck,
  Sparkles,
  ClipboardCheck,
  FileBarChart,
  Bell,
  MessageSquare,
  Headphones,
  Search,
  CheckCircle2,
  Users,
  Settings,
  Database,
  Link2,
  ScrollText,
  ChevronDown,
  RefreshCw,
  Sliders,
  FileText,
  AlertTriangle,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface ShellProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ currentTab, setCurrentTab, children }) => {
  const {
    currentUser,
    switchRole,
    notifications,
    markAllNotificationsRead,
    resetToDemoDefaults,
    selectedApplication,
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    setRoleMenuOpen(false);
    if (role === 'admin') {
      setCurrentTab('admin-rules');
    } else if (role === 'officer') {
      setCurrentTab('officer-queue');
    } else {
      setCurrentTab('dashboard');
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f4f7fb] text-slate-800 font-sans overflow-hidden">
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Persistent Left Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#0b1329] text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-0 max-lg:-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800/80">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 shadow-lg shadow-blue-500/25">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white">VERIX AI</span>
            </div>
            <p className="text-[11px] font-medium tracking-wide text-slate-400 uppercase">
              {currentUser.role === 'admin' ? 'AI-Powered Application Validation' : 'AICTE Smart Validation'}
            </p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 text-sm">
          {currentUser.role === 'institution' && (
            <>
              {/* Primary Dashboard */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setCurrentTab('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-all ${
                    currentTab === 'dashboard'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
              </div>

              {/* APPLICATION Section */}
              <div className="space-y-1">
                <p className="px-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">Application</p>
                <button
                  onClick={() => {
                    setCurrentTab('new-application');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'new-application'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>New Application</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('my-applications');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'my-applications'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <FolderOpen className="h-4 w-4" />
                  <span>My Applications</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('document-upload');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'document-upload'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <UploadCloud className="h-4 w-4" />
                  <span>Document Upload</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('validation-status');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'validation-status'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Validation Status</span>
                </button>
              </div>

              {/* AI ANALYSIS Section */}
              <div className="space-y-1">
                <p className="px-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">AI Analysis</p>
                <button
                  onClick={() => {
                    setCurrentTab('ai-validation');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'ai-validation'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>AI Validation</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('compliance-check');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'compliance-check'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <ClipboardCheck className="h-4 w-4" />
                  <span>Compliance Check</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('reports');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'reports'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <FileBarChart className="h-4 w-4" />
                  <span>Report & Findings</span>
                </button>
              </div>

              {/* COMMUNICATION Section */}
              <div className="space-y-1">
                <p className="px-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">Communication</p>
                <button
                  onClick={() => {
                    setCurrentTab('notifications');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'notifications'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </div>
                  {unreadNotifs > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {unreadNotifs}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('clarifications');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'clarifications'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Clarifications</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('audit-trail');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'audit-trail'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <ScrollText className="h-4 w-4" />
                  <span>Audit Trail</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('help');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'help'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Headphones className="h-4 w-4" />
                  <span>Help & Support</span>
                </button>
              </div>

              {/* Bottom Integration Status Widget */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>AICTE Integration</span>
                </div>
                <p className="text-[11px] text-emerald-400 font-medium">Connected</p>
                <div className="pt-1.5 space-y-1.5 border-t border-slate-800/60 text-[11px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>DigiLocker</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>API Setu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>AICTE Records</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentUser.role === 'officer' && (
            <>
              {/* Officer Navigation */}
              <div className="space-y-1">
                <p className="px-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase">Scrutiny Officer</p>
                <button
                  onClick={() => {
                    setCurrentTab('officer-queue');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-all ${
                    currentTab === 'officer-queue'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Officer Queue</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('officer-review');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'officer-review'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Scrutiny Workspace</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('clarifications');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'clarifications'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Clarification Requests</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('ai-validation');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'ai-validation'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>AI Validation Engine</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('reports');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'reports'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <FileBarChart className="h-4 w-4" />
                  <span>Scrutiny Analytics</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('audit-trail');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'audit-trail'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <ScrollText className="h-4 w-4" />
                  <span>Audit Trail</span>
                </button>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 space-y-2 text-xs">
                <p className="font-semibold text-slate-200">Jurisdiction Scope</p>
                <p className="text-[11px] text-slate-300">Western & Central Region</p>
                <p className="text-[10px] text-slate-400">Assigned: Madhya Pradesh & Chhattisgarh institutions</p>
              </div>
            </>
          )}

          {currentUser.role === 'admin' && (
            <>
              {/* Admin Navigation matching WhatsApp_Image_2026-10-28_at_17.16.54_ef32d7c1.jpeg */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setCurrentTab('admin-overview');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'admin-overview'
                      ? 'bg-white text-slate-900 font-semibold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <FileBarChart className="h-4 w-4" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('admin-users');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'admin-users'
                      ? 'bg-white text-slate-900 font-semibold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('admin-rules');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'admin-rules'
                      ? 'bg-white text-slate-900 font-semibold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Sliders className="h-4 w-4" />
                  <span>Validation Rules</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('admin-masterdata');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'admin-masterdata'
                      ? 'bg-white text-slate-900 font-semibold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Database className="h-4 w-4" />
                  <span>Master Data</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('admin-integrations');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'admin-integrations'
                      ? 'bg-white text-slate-900 font-semibold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Link2 className="h-4 w-4" />
                  <span>Integrations</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('audit-trail');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 font-medium transition-all ${
                    currentTab === 'audit-trail'
                      ? 'bg-white text-slate-900 font-semibold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <ScrollText className="h-4 w-4" />
                  <span>Audit Logs</span>
                </button>
              </div>

              {/* Demo mode badge at bottom matching reference image */}
              <div className="mt-auto rounded-xl bg-slate-900/90 border border-slate-800 p-4">
                <p className="text-xs font-semibold text-white">Demo mode</p>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Simulated data. Roles are for demonstration only.
                </p>
                <button
                  onClick={resetToDemoDefaults}
                  className="mt-3 flex items-center gap-1.5 text-[11px] text-blue-400 hover:text-blue-300 font-medium"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Reset Demo Baseline</span>
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Main App Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8 shadow-xs">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Sub-header or search bar */}
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-medium text-slate-500">
                AI-Powered Document Validation for Transparent and Efficient AICTE Approvals
              </span>
            </div>

            {/* Global Search Box */}
            <div className="relative max-w-md w-full ml-auto md:ml-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search applications, institutions, documents..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2 text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Right Header Icons & User Dropdown */}
          <div className="flex items-center gap-3 ml-4">
            {/* Notifications Menu */}
            <div className="relative">
              <button
                onClick={() => setNotifMenuOpen(!notifMenuOpen)}
                className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              {notifMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Notifications ({unreadNotifs})</span>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] font-medium text-blue-600 hover:underline"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl text-xs transition-colors ${
                          n.read ? 'bg-slate-50/60' : 'bg-blue-50/80 border border-blue-100'
                        }`}
                      >
                        <p className="font-semibold text-slate-800">{n.title}</p>
                        <p className="text-slate-600 text-[11px] mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher & User Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50/80 py-1 pl-1.5 pr-3 hover:bg-slate-100 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-bold text-xs text-white shadow-xs">
                  {currentUser.avatarText || 'SK'}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser.displayName}</p>
                  <p className="text-[10px] font-medium text-slate-500 capitalize leading-tight">
                    {currentUser.role === 'institution'
                      ? 'Institution User'
                      : currentUser.role === 'officer'
                      ? 'AICTE Scrutiny Officer'
                      : 'System Administrator'}
                  </p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-0.5" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 text-xs">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Persona (Demo)</p>
                    <p className="text-xs text-slate-600 mt-0.5">Toggle roles to experience all perspectives</p>
                  </div>
                  <div className="py-1 space-y-0.5">
                    <button
                      onClick={() => handleRoleChange('institution')}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-left font-medium transition-colors ${
                        currentUser.role === 'institution' ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <p className="font-bold">Institution User</p>
                        <p className="text-[10px] text-slate-500">Sanjeet Kumar · Rungta College</p>
                      </div>
                      {currentUser.role === 'institution' && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                    </button>
                    <button
                      onClick={() => handleRoleChange('officer')}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-left font-medium transition-colors ${
                        currentUser.role === 'officer' ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <p className="font-bold">AICTE Scrutiny Officer</p>
                        <p className="text-[10px] text-slate-500">Dr. Rajesh Sharma · Regional Officer</p>
                      </div>
                      {currentUser.role === 'officer' && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                    </button>
                    <button
                      onClick={() => handleRoleChange('admin')}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-xl text-left font-medium transition-colors ${
                        currentUser.role === 'admin' ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <p className="font-bold">System Administrator</p>
                        <p className="text-[10px] text-slate-500">Admin Demo · System Settings</p>
                      </div>
                      {currentUser.role === 'admin' && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                    </button>
                  </div>
                  <div className="pt-1 mt-1 border-t border-slate-100 px-2 py-1">
                    <button
                      onClick={() => {
                        resetToDemoDefaults();
                        setRoleMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-1.5 px-2 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-[11px]"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Reset Demo Data Baseline</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto bg-[#f4f7fb] p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
