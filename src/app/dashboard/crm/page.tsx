'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Upload, Mail, Phone, MapPin, Building2, DollarSign, 
  Calendar, ChevronRight, X, Edit, Tag, FileText, Clock, TrendingUp, 
  Users, Target, Sparkles, ExternalLink, Send, MessageSquare, Receipt, 
  ChevronDown, Filter, Download, ArrowUpDown, Circle, CheckCircle,
  MoreVertical, Play, User
} from 'lucide-react';

// Types
type ClientStatus = 'lead' | 'active' | 'past';
type DealStage = 'new' | 'contacted' | 'proposal' | 'closed';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: ClientStatus;
  revenue: number;
  lastContact: string;
  tags: string[];
  deals: Deal[];
}

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  probability: number;
}

// Mock Data
const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    status: 'active',
    revenue: 125000,
    lastContact: '2025-10-12',
    tags: ['Enterprise', 'Priority'],
    deals: [{
      id: 'd1',
      title: 'Annual Contract',
      value: 150000,
      stage: 'proposal',
      probability: 75
    }]
  },
  {
    id: '2',
    name: 'Emily Davis',
    email: 'emily@startupco.io',
    phone: '+1 (555) 234-5678',
    company: 'StartupCo',
    status: 'lead',
    revenue: 0,
    lastContact: '2025-10-13',
    tags: ['Startup', 'Hot Lead'],
    deals: [{
      id: 'd2',
      title: 'Initial Package',
      value: 45000,
      stage: 'contacted',
      probability: 40
    }]
  },
  {
    id: '3',
    name: 'Robert Wilson',
    email: 'robert@megacorp.com',
    phone: '+1 (555) 345-6789',
    company: 'MegaCorp',
    status: 'active',
    revenue: 450000,
    lastContact: '2025-10-11',
    tags: ['Enterprise'],
    deals: []
  }
];

const dealStages: { id: DealStage; label: string; color: string }[] = [
  { id: 'new', label: 'New', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
  { id: 'contacted', label: 'Contacted', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { id: 'proposal', label: 'Proposal', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  { id: 'closed', label: 'Closed', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' }
];

// Client Detail Panel
const ClientPanel: React.FC<{
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}> = ({ client, isOpen, onClose }) => {
  const [summarizing, setSummarizing] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-full sm:w-[540px] bg-[#0f0f14] border-l border-[#1f1f24] shadow-2xl z-50 overflow-y-auto"
      >
        <div className="sticky top-0 bg-[#0f0f14] border-b border-[#1f1f24] px-8 py-6 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Client Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-[#111] rounded-xl transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Client Header */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {client.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{client.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{client.company}</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${
                  client.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  client.status === 'lead' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    client.status === 'active' ? 'bg-emerald-400' :
                    client.status === 'lead' ? 'bg-blue-400' : 'bg-gray-400'
                  }`} />
                  <span className="text-xs font-semibold capitalize">{client.status}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${client.email}`} className="text-sm text-blue-400 hover:text-blue-300">
                  {client.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">{client.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold text-emerald-400">
                  ${client.revenue.toLocaleString()} total revenue
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {client.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-lg text-xs font-medium border border-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-3 bg-[#111] hover:bg-[#111] border border-[#1f1f24] rounded-xl text-sm font-semibold text-gray-300 transition-colors flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Send Email
            </button>
            <button className="px-4 py-3 bg-[#111] hover:bg-[#111] border border-[#1f1f24] rounded-xl text-sm font-semibold text-gray-300 transition-colors flex items-center justify-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Message
            </button>
            <button className="px-4 py-3 bg-[#111] hover:bg-[#111] border border-[#1f1f24] rounded-xl text-sm font-semibold text-gray-300 transition-colors flex items-center justify-center gap-2">
              <Receipt className="w-4 h-4" />
              Invoice
            </button>
            <button className="px-4 py-3 bg-[#111] hover:bg-[#111] border border-[#1f1f24] rounded-xl text-sm font-semibold text-gray-300 transition-colors flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule
            </button>
          </div>

          {/* Deals Pipeline */}
          {client.deals.length > 0 && (
            <div className="bg-[#14141a] rounded-xl p-6 border border-[#1f1f24]">
              <h4 className="text-lg font-bold text-white mb-4">Active Deals</h4>
              {client.deals.map(deal => (
                <div key={deal.id} className="p-5 bg-[#111] rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="text-base font-semibold text-white mb-1">{deal.title}</h5>
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold border ${
                        dealStages.find(s => s.id === deal.stage)?.color
                      }`}>
                        {dealStages.find(s => s.id === deal.stage)?.label}
                      </span>
                    </div>
                    <span className="text-xl font-bold text-emerald-400">
                      ${deal.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Probability</span>
                    <span className="font-semibold text-blue-400">{deal.probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* AI Summary */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h4 className="text-base font-bold text-white">AI Summary</h4>
              </div>
              <button
                onClick={() => {
                  setSummarizing(true);
                  setTimeout(() => setSummarizing(false), 1500);
                }}
                disabled={summarizing}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl text-xs font-semibold text-white transition-all shadow-lg shadow-purple-500/20"
              >
                {summarizing ? 'Generating...' : 'Summarize Notes'}
              </button>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              High-value {client.status} client with ${client.revenue.toLocaleString()} in total revenue. 
              {client.deals.length > 0 && ` Currently has ${client.deals.length} active deal(s) in pipeline.`}
              {' '}Last contacted on {new Date(client.lastContact).toLocaleDateString()}.
              {client.status === 'lead' && ' Recommend follow-up within 3-5 business days.'}
            </p>
          </div>

          {/* Activity */}
          <div className="bg-[#111] rounded-xl p-6 border border-[#1f1f24]">
            <h4 className="text-lg font-bold text-white mb-4">Recent Activity</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium">Discovery call completed</p>
                  <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium">Proposal sent</p>
                  <p className="text-xs text-gray-500 mt-1">5 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
      />
    </AnimatePresence>
  );
};

// Pipeline Board
const PipelineBoard: React.FC<{ clients: Client[] }> = ({ clients }) => {
  const getDealsForStage = (stage: DealStage) => {
    const deals: Array<Deal & { clientName: string; clientId: string }> = [];
    clients.forEach(client => {
      client.deals
        .filter(deal => deal.stage === stage)
        .forEach(deal => deals.push({ ...deal, clientName: client.name, clientId: client.id }));
    });
    return deals;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dealStages.map(stage => {
        const deals = getDealsForStage(stage.id);
        const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);

        return (
          <div key={stage.id} className="bg-[#111] rounded-xl p-5 border border-[#1f1f24]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">{stage.label}</h3>
              <span className="text-xs text-gray-500 font-semibold">{deals.length} deals</span>
            </div>
            <div className="text-sm text-gray-400 mb-5 font-semibold">
              ${totalValue.toLocaleString()}
            </div>
            <div className="space-y-3">
              {deals.map(deal => (
                <div
                  key={deal.id}
                  className="p-4 bg-[#111] hover:bg-[#111] rounded-xl border border-[#2a2a2f] cursor-move transition-colors"
                  draggable
                >
                  <h4 className="text-sm font-semibold text-white mb-1">{deal.clientName}</h4>
                  <p className="text-xs text-gray-400 mb-3">{deal.title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-400">
                      ${deal.value.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">{deal.probability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Main CRM Page
export default function ClientsPage() {
  const [clients] = useState<Client[]>(mockClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'pipeline'>('list');

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: clients.length,
    leads: clients.filter(c => c.status === 'lead').length,
    revenue: clients.reduce((sum, c) => sum + c.revenue, 0)
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Top Nav */}
      <div className="border-b border-[#111] bg-[#0f0f14]">
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
                <span className="text-white font-semibold">Clients</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 bg-[#111] hover:bg-[#25252a] border border-[#2a2a2f] rounded-xl text-sm text-gray-300 transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Import CSV
              </button>
              <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
                <Plus className="w-4 h-4" />
                Add Client
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-8 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-3">Client Management</h1>
          <p className="text-lg text-gray-400">Manage your clients, leads, and sales pipeline</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-[#111] rounded-xl p-6 border border-[#1f1f24]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Total Clients</span>
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stats.total}</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8 this month
            </p>
          </div>

          <div className="bg-[#111] rounded-xl p-6 border border-[#1f1f24]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Active Leads</span>
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stats.leads}</p>
            <p className="text-xs text-gray-400">25% conversion rate</p>
          </div>

          <div className="bg-[#111] rounded-xl p-6 border border-[#1f1f24]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Total Revenue</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">${(stats.revenue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +15.2% from last month
            </p>
          </div>
        </div>

        {/* Search & View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients by name, email, or company..."
              className="w-full pl-12 pr-4 py-4 bg-[#111] border border-[#1f1f24] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-[#111] border border-[#1f1f24] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")", backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '2.75rem' }}
            >
              <option value="all">All Status</option>
              <option value="lead">Leads</option>
              <option value="active">Active</option>
              <option value="past">Past</option>
            </select>

            <div className="flex gap-2 border border-[#1f1f24] rounded-xl overflow-hidden bg-[#111]">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 text-sm font-semibold transition-all ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('pipeline')}
                className={`px-4 py-3 text-sm font-semibold transition-all ${
                  viewMode === 'pipeline'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Pipeline
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'list' ? (
          <div className="bg-[#111] rounded-xl border border-[#1f1f24] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1f1f24]">
                    <th className="text-left px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Client Name
                    </th>
                    <th className="text-left px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="text-left px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Last Contact
                    </th>
                    <th className="text-left px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="text-right px-8 py-5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f24]">
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center">
                        <Users className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                        <p className="text-sm text-gray-500">No clients found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map(client => (
                      <tr
                        key={client.id}
                        onClick={() => setSelectedClient(client)}
                        className="hover:bg-[#111] transition-colors cursor-pointer"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                              {client.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-white">{client.name}</div>
                              <div className="text-xs text-gray-500">{client.company}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-sm text-gray-300">{client.email}</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${
                            client.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            client.status === 'lead' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                            'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              client.status === 'active' ? 'bg-emerald-400' :
                              client.status === 'lead' ? 'bg-blue-400' : 'bg-gray-400'
                            }`} />
                            <span className="text-xs font-semibold capitalize">{client.status}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-sm text-gray-400">
                            {new Date(client.lastContact).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-sm font-bold text-emerald-400">
                            ${client.revenue.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedClient(client);
                              }}
                              className="p-2 hover:bg-[#111] rounded-lg transition-colors"
                              title="Open"
                            >
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            </button>
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 hover:bg-[#111] rounded-lg transition-colors"
                              title="Message"
                            >
                              <MessageSquare className="w-4 h-4 text-gray-400" />
                            </button>
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 hover:bg-[#111] rounded-lg transition-colors"
                              title="Invoice"
                            >
                              <Receipt className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <PipelineBoard clients={filteredClients} />
        )}

        {/* Integrations */}
        <div className="bg-[#111] rounded-xl p-8 border border-[#1f1f24]">
          <h3 className="text-xl font-bold text-white mb-6">Quick Integrations</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <button className="flex items-center gap-4 p-5 bg-[#111] hover:bg-[#111] rounded-xl border border-[#2a2a2f] transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Sync Gmail</div>
                <div className="text-xs text-gray-500">Import contacts</div>
              </div>
            </button>
            
            <button className="flex items-center gap-4 p-5 bg-[#111] hover:bg-[#111] rounded-xl border border-[#2a2a2f] transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Connect Calendar</div>
                <div className="text-xs text-gray-500">Sync meetings</div>
              </div>
            </button>
            
            <button className="flex items-center gap-4 p-5 bg-[#111] hover:bg-[#111] rounded-xl border border-[#2a2a2f] transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Setup Invoicing</div>
                <div className="text-xs text-gray-500">Automate billing</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Client Detail Panel */}
      <ClientPanel
        client={selectedClient!}
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
      />
    </div>
  );
}