'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Search, Plus, Calendar, Play, Pause, Copy, Edit, Trash2, 
  ChevronDown, X, Check, AlertCircle, Zap, Mail, Share2, 
  UserPlus, Clock, Webhook, ChevronRight, MoreVertical, Download, 
  Activity, TrendingUp, Settings, ArrowRight
} from 'lucide-react';

// Types
type WorkflowStatus = 'active' | 'paused';
type TriggerType = 'webhook' | 'scheduled' | 'new_lead';

interface Workflow {
  id: string;
  name: string;
  status: WorkflowStatus;
  trigger: TriggerType;
  lastRun: string;
  successRate: number;
  totalRuns: number;
  actions: string[];
}

interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  apps: string[];
  category: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Mock Data
const mockTemplates: WorkflowTemplate[] = [
  {
    id: 'template-1',
    title: 'Auto Post to Social Media',
    description: 'Automatically share new blog posts across all social platforms',
    apps: ['Instagram', 'Twitter', 'LinkedIn'],
    category: 'Marketing',
    icon: Share2
  },
  {
    id: 'template-2',
    title: 'Lead Follow-up Sequence',
    description: 'Send personalized email sequences to new leads automatically',
    apps: ['Gmail', 'CRM', 'Slack'],
    category: 'Sales',
    icon: Mail
  },
  {
    id: 'template-3',
    title: 'Invoice Reminder',
    description: 'Send payment reminders 3 days before invoice due date',
    apps: ['Stripe', 'Gmail', 'QuickBooks'],
    category: 'Finance',
    icon: Clock
  },
  {
    id: 'template-4',
    title: 'Client Onboarding',
    description: 'Create project, send welcome email, and schedule kickoff call',
    apps: ['Gmail', 'Calendar', 'Asana'],
    category: 'Operations',
    icon: UserPlus
  }
];

const mockWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    name: 'Weekly Newsletter Distribution',
    status: 'active',
    trigger: 'scheduled',
    lastRun: '2025-10-13T10:30:00Z',
    successRate: 98,
    totalRuns: 156,
    actions: ['Send Email', 'Post to Social']
  },
  {
    id: 'wf-2',
    name: 'New Lead Notification',
    status: 'active',
    trigger: 'webhook',
    lastRun: '2025-10-13T14:22:00Z',
    successRate: 100,
    totalRuns: 89,
    actions: ['Send Email', 'Create Project']
  },
  {
    id: 'wf-3',
    name: 'Invoice Generation',
    status: 'paused',
    trigger: 'new_lead',
    lastRun: '2025-10-12T09:15:00Z',
    successRate: 95,
    totalRuns: 234,
    actions: ['Create Invoice', 'Send Email']
  }
];

const mockRunHistory = [
  { date: 'Oct 7', runs: 45, success: 43, failed: 2 },
  { date: 'Oct 8', runs: 52, success: 50, failed: 2 },
  { date: 'Oct 9', runs: 48, success: 48, failed: 0 },
  { date: 'Oct 10', runs: 61, success: 58, failed: 3 },
  { date: 'Oct 11', runs: 55, success: 54, failed: 1 },
  { date: 'Oct 12', runs: 58, success: 56, failed: 2 },
  { date: 'Oct 13', runs: 42, success: 41, failed: 1 }
];

const mockRecentRuns = [
  { id: 'run-1', workflow: 'Weekly Newsletter', status: 'success', timestamp: '2025-10-13T14:30:00Z', duration: '2.3s' },
  { id: 'run-2', workflow: 'Lead Follow-up', status: 'success', timestamp: '2025-10-13T14:22:00Z', duration: '1.8s' },
  { id: 'run-3', workflow: 'Invoice Reminder', status: 'failed', timestamp: '2025-10-13T14:15:00Z', duration: '0.5s', error: 'SMTP connection timeout' }
];

// Template Card Component
const TemplateCard: React.FC<{ template: WorkflowTemplate; onUse: (template: WorkflowTemplate) => void }> = ({ template, onUse }) => {
  const Icon = template.icon;
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-[#111] rounded-xl p-6 border border-[#1f1f24] hover:border-blue-500/30 transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {template.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">{template.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {template.apps.map((app, idx) => (
          <span key={idx} className="px-2.5 py-1 bg-[#111] text-gray-400 rounded-lg text-xs border border-[#2a2a2f]">
            {app}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onUse(template)}
          className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          Use Template
        </button>
        <button className="px-4 py-2.5 bg-[#111] hover:bg-[#25252a] text-gray-300 rounded-xl text-sm font-medium transition-colors border border-[#2a2a2f]">
          Preview
        </button>
      </div>
    </motion.div>
  );
};

// Workflow Card Component
const WorkflowCard: React.FC<{
  workflow: Workflow;
  onEdit: (workflow: Workflow) => void;
  onToggleStatus: (workflow: Workflow) => void;
  onRun: (workflow: Workflow) => void;
}> = ({ workflow, onEdit, onToggleStatus, onRun }) => {
  return (
    <div className="bg-[#111] rounded-xl p-6 border border-[#1f1f24] hover:border-[#2a2a2f] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-base font-semibold text-white">{workflow.name}</h3>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${
              workflow.status === 'active' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${
                workflow.status === 'active' ? 'bg-emerald-400' : 'bg-gray-400'
              }`} />
              <span className="text-xs font-medium capitalize">{workflow.status}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Last run: {new Date(workflow.lastRun).toLocaleString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              {workflow.successRate}% success
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {workflow.actions.map((action, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs border border-blue-500/20 font-medium">
                {action}
              </span>
            ))}
          </div>
        </div>

        <button className="p-2 hover:bg-[#111] rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#1f1f24]">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">{workflow.totalRuns} runs</span>
          <span className="text-gray-700">•</span>
          <span className="text-gray-500 uppercase text-xs">{workflow.trigger}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(workflow)}
            className="px-3 py-1.5 bg-[#111] hover:bg-[#25252a] text-gray-300 rounded-lg text-xs font-medium transition-colors border border-[#2a2a2f] flex items-center gap-1.5"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={() => onToggleStatus(workflow)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border flex items-center gap-1.5 ${
              workflow.status === 'active'
                ? 'bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 border-gray-500/20'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
            }`}
          >
            {workflow.status === 'active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {workflow.status === 'active' ? 'Pause' : 'Activate'}
          </button>
          <button
            onClick={() => onRun(workflow)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            Run Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Create Workflow Modal
const CreateWorkflowModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    trigger: 'webhook' as TriggerType,
    actions: [] as string[],
  });

  const availableActions = ['Send Email', 'Post to Social', 'Create Project', 'Add Client', 'Send SMS', 'Create Invoice'];

  const toggleAction = (action: string) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.includes(action)
        ? prev.actions.filter(a => a !== action)
        : [...prev.actions, action]
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0f0f14] rounded-2xl border border-[#1f1f24] shadow-2xl"
        >
          <div className="sticky top-0 bg-[#0f0f14] border-b border-[#1f1f24] px-8 py-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-white">Create Workflow</h2>
              <p className="text-sm text-gray-400 mt-1">Automate your business processes</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#111] rounded-xl transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="p-8 space-y-8">
            {/* Workflow Name */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Workflow Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#111] border border-[#1f1f24] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., New Lead Welcome Sequence"
                required
              />
            </div>

            {/* Trigger Selection */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Choose Trigger
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'webhook' as TriggerType, icon: Webhook, label: 'Webhook', desc: 'HTTP request' },
                  { value: 'new_lead' as TriggerType, icon: UserPlus, label: 'New Lead', desc: 'When lead added' },
                  { value: 'scheduled' as TriggerType, icon: Clock, label: 'Scheduled', desc: 'Time-based' }
                ].map((trigger) => {
                  const Icon = trigger.icon;
                  return (
                    <button
                      key={trigger.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, trigger: trigger.value })}
                      className={`p-5 rounded-xl text-left transition-all border-2 ${
                        formData.trigger === trigger.value
                          ? 'bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/20'
                          : 'bg-[#111] border-[#1f1f24] hover:border-[#2a2a2f]'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-3 ${
                        formData.trigger === trigger.value ? 'text-blue-400' : 'text-gray-400'
                      }`} />
                      <div className={`text-sm font-semibold mb-1 ${
                        formData.trigger === trigger.value ? 'text-white' : 'text-gray-300'
                      }`}>
                        {trigger.label}
                      </div>
                      <div className="text-xs text-gray-500">{trigger.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions Builder */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Select Actions
              </label>
              <div className="grid grid-cols-2 gap-3">
                {availableActions.map((action) => {
                  const isSelected = formData.actions.includes(action);
                  return (
                    <button
                      key={action}
                      type="button"
                      onClick={() => toggleAction(action)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-500/10 border-blue-500/50 text-blue-400'
                          : 'bg-[#111] border-[#1f1f24] text-gray-300 hover:border-[#2a2a2f]'
                      }`}
                    >
                      <span>{action}</span>
                      {isSelected && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>

              {formData.actions.length > 0 && (
                <div className="mt-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                  <div className="flex items-center gap-2 text-sm text-blue-400 mb-2">
                    <Zap className="w-4 h-4" />
                    <span className="font-semibold">Workflow Flow Preview</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="px-3 py-1.5 bg-[#111] border border-[#1f1f24] rounded-lg text-xs text-white font-medium">
                      {formData.trigger.replace('_', ' ')}
                    </div>
                    {formData.actions.map((action, idx) => (
                      <React.Fragment key={idx}>
                        <ArrowRight className="w-4 h-4 text-gray-600" />
                        <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-400 font-medium">
                          {action}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-[#1f1f24]">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-[#111] hover:bg-[#25252a] text-gray-300 rounded-xl font-semibold transition-colors border border-[#2a2a2f]"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-[#25252a] hover:bg-[#2a2a2f] text-gray-300 rounded-xl font-semibold transition-colors border border-[#2a2a2f]"
              >
                Test Workflow
              </button>
              <button
                type="submit"
                disabled={!formData.name || formData.actions.length === 0}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20"
              >
                Create Workflow
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Main Automation Page
export default function AutomationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [searchQuery, setSearchQuery] = useState('');

  const totalRuns = mockRunHistory.reduce((acc, d) => acc + d.runs, 0);
  const successfulRuns = mockRunHistory.reduce((acc, d) => acc + d.success, 0);
  const successRate = ((successfulRuns / totalRuns) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top Nav */}
      <div className="border-b border-white/5 bg-[#111]">
        <div className="max-w-[1800px] mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-[#111] rounded-xl transition-colors">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Dashboard</span>
                <ChevronRight className="w-4 h-4 text-gray-600" />
                <span className="text-white font-semibold">Automation</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 bg-[#111] hover:bg-[#222222] border border-white/5 rounded-xl text-sm text-gray-300 transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Last 7 days
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <Plus className="w-4 h-4" />
                Create Workflow
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-8 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-3">Workflow Automation</h1>
          <p className="text-lg text-gray-400">Build powerful automations to streamline your business processes</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#111] rounded-xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Active Workflows</span>
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">
              {workflows.filter(w => w.status === 'active').length}
            </p>
            <p className="text-xs text-gray-500">of {workflows.length} total workflows</p>
          </div>

          <div className="bg-[#111] rounded-xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Total Runs (7d)</span>
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{totalRuns}</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% from last week
            </p>
          </div>

          <div className="bg-[#111] rounded-xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Success Rate</span>
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{successRate}%</p>
            <p className="text-xs text-gray-500">{successfulRuns} successful runs</p>
          </div>

          <div className="bg-[#111] rounded-xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Failed Runs</span>
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{totalRuns - successfulRuns}</p>
            <p className="text-xs text-gray-500">Last 7 days</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workflows..."
            className="w-full pl-12 pr-4 py-4 bg-[#111] border border-[#1f1f24] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Templates */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Workflow Templates</h2>
              <p className="text-sm text-gray-400">Get started quickly with pre-built automation templates</p>
            </div>
            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
              Browse all templates →
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onUse={() => console.log('Using template:', template.id)}
              />
            ))}
          </div>
        </div>

        {/* Run History Chart */}
        <div className="bg-[#111] rounded-xl p-8 border border-[#1f1f24]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Run History</h3>
              <p className="text-sm text-gray-400">Workflow execution performance over time</p>
            </div>
            <button className="p-2 hover:bg-[#111] rounded-xl transition-colors">
              <Download className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mockRunHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f24" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280" 
                style={{ fontSize: '12px' }}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280" 
                style={{ fontSize: '12px' }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111',
                  border: '1px solid #1f1f24',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="success" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={{ fill: '#10b981', r: 4 }}
                name="Success"
              />
              <Line 
                type="monotone" 
                dataKey="failed" 
                stroke="#ef4444" 
                strokeWidth={3} 
                dot={{ fill: '#ef4444', r: 4 }}
                name="Failed"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-[#1f1f24]">
            <div>
              <div className="text-sm text-gray-400 mb-1">Total Runs</div>
              <div className="text-2xl font-bold text-white">{totalRuns}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Success Rate</div>
              <div className="text-2xl font-bold text-emerald-400">{successRate}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Avg Duration</div>
              <div className="text-2xl font-bold text-white">2.1s</div>
            </div>
          </div>
        </div>

        {/* Recent Runs Table */}
        <div className="bg-[#111] rounded-xl border border-[#1f1f24] overflow-hidden">
          <div className="px-8 py-6 border-b border-[#1f1f24]">
            <h3 className="text-xl font-bold text-white mb-1">Recent Executions</h3>
            <p className="text-sm text-gray-400">Latest workflow runs and their status</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f24]">
                  <th className="text-left px-8 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Workflow
                  </th>
                  <th className="text-left px-8 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-8 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="text-left px-8 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="text-right px-8 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f1f24]">
                {mockRecentRuns.map((run) => (
                  <tr key={run.id} className="hover:bg-[#111] transition-colors">
                    <td className="px-8 py-5">
                      <span className="text-sm font-medium text-white">{run.workflow}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                        run.status === 'success'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {run.status === 'success' ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5" />
                        )}
                        <span className="text-xs font-semibold capitalize">{run.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm text-gray-400">
                        {new Date(run.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm text-gray-400">{run.duration}</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        View Logs
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Workflow Modal */}
      <CreateWorkflowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}