'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Instagram,
  Linkedin, Youtube, Twitter, X, Upload, Sparkles, Clock, Edit,
  Copy, Trash2, Hash, Users, Eye, Heart, TrendingUp,
  Grid3x3, ChevronDown, Download, MessageSquare, BarChart3,
  PanelLeft
} from 'lucide-react';

// Types
type Platform = 'instagram' | 'linkedin' | 'twitter' | 'tiktok' | 'youtube';
type PostStatus = 'draft' | 'scheduled' | 'published';

interface Post {
  id: string;
  caption: string;
  platforms: Platform[];
  media: string[];
  scheduledFor?: string;
  publishedAt?: string;
  status: PostStatus;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

// Mock Data
const mockPosts: Post[] = [
  {
    id: '1',
    caption: 'Excited to announce our new product launch! 🚀 #innovation #tech',
    platforms: ['instagram', 'twitter', 'linkedin'],
    media: ['https://images.unsplash.com/photo-1557821552-17105176677c?w=400'],
    scheduledFor: '2025-10-15T10:00:00Z',
    status: 'scheduled',
  },
  {
    id: '2',
    caption: 'Behind the scenes at our office today! #teamwork',
    platforms: ['instagram'],
    media: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400'],
    scheduledFor: '2025-10-14T14:00:00Z',
    status: 'scheduled',
  },
  {
    id: '3',
    caption: 'Check out our latest blog post 📊',
    platforms: ['twitter', 'linkedin'],
    media: [],
    publishedAt: '2025-10-13T09:00:00Z',
    status: 'published',
    engagement: { likes: 234, comments: 45, shares: 67 }
  }
];

const platformIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
  tiktok: '🎵'
};

const platformColors = {
  instagram: 'from-pink-500 to-purple-500',
  linkedin: 'from-blue-500 to-blue-600',
  youtube: 'from-red-500 to-red-600',
  twitter: 'from-sky-400 to-sky-500',
  tiktok: 'from-purple-500 to-pink-500'
};

const analyticsData = [
  { platform: 'Instagram', reach: 45200, engagement: 4580, followers: 12400 },
  { platform: 'LinkedIn', reach: 23400, engagement: 2890, followers: 8900 },
  { platform: 'Twitter', reach: 18900, engagement: 1890, followers: 6700 },
  { platform: 'TikTok', reach: 52300, engagement: 5230, followers: 15200 }
];

const followerGrowth = [
  { date: 'Oct 7', count: 42100 },
  { date: 'Oct 8', count: 42250 },
  { date: 'Oct 9', count: 42400 },
  { date: 'Oct 10', count: 42680 },
  { date: 'Oct 11', count: 42850 },
  { date: 'Oct 12', count: 42980 },
  { date: 'Oct 13', count: 43200 }
];

// Calendar Component
const ContentCalendar: React.FC<{ posts: Post[]; onDateClick: (date: Date) => void }> = ({ posts, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const getPostsForDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return posts.filter(post => {
      const postDate = post.scheduledFor ? new Date(post.scheduledFor) : null;
      return postDate && 
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear();
    });
  };

  return (
    <div className="bg-[#0a0a0f] rounded-xl border border-[#1f1f24] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 hover:bg-[#1a1a1f] rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-2 hover:bg-[#1a1a1f] rounded-xl transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs text-gray-500 font-semibold py-3">
            {day}
          </div>
        ))}
        
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayPosts = getPostsForDate(day);
          const isToday = new Date().getDate() === day && 
                         new Date().getMonth() === currentMonth.getMonth();
          
          return (
            <button
              key={day}
              onClick={() => onDateClick(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
              className={`aspect-square p-2 rounded-xl hover:bg-[#1a1a1f] transition-colors text-left relative ${
                isToday ? 'bg-blue-500/10 border-2 border-blue-500/30' : ''
              }`}
            >
              <div className={`text-sm mb-1 font-semibold ${
                isToday ? 'text-blue-400' : 'text-gray-300'
              }`}>
                {day}
              </div>
              {dayPosts.length > 0 && (
                <div className="space-y-1">
                  {dayPosts.slice(0, 2).map(post => (
                    <div
                      key={post.id}
                      className={`h-1.5 rounded-full ${
                        post.status === 'scheduled' ? 'bg-blue-500' :
                        post.status === 'draft' ? 'bg-gray-500' :
                        'bg-emerald-500'
                      }`}
                    />
                  ))}
                  {dayPosts.length > 2 && (
                    <div className="text-[9px] text-gray-500">+{dayPosts.length - 2}</div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Post Composer Modal
const PostComposerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [caption, setCaption] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [generating, setGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setSuggestions([
        '🚀 Excited to share our latest innovation! Join us on this journey. #innovation #tech',
        'Breaking barriers and setting new standards. Here\'s what we\'ve been working on! ✨',
        'The future is here! Check out our newest update. 💡 #innovation #technology'
      ]);
      setGenerating(false);
    }, 1500);
  };

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0a0f] rounded-2xl border border-[#1f1f24] shadow-2xl"
        >
          <div className="sticky top-0 bg-[#0a0a0f] border-b border-[#1f1f24] px-8 py-6 flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-white">Create Post</h2>
              <p className="text-sm text-gray-400 mt-1">Schedule content across your social platforms</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-[#1a1a1f] rounded-xl transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="p-8 space-y-6">
            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Select Platforms
              </label>
              <div className="flex flex-wrap gap-3">
                {(['instagram', 'linkedin', 'twitter', 'tiktok', 'youtube'] as Platform[]).map(platform => {
                  const Icon = platformIcons[platform];
                  const isSelected = selectedPlatforms.includes(platform);
                  return (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`px-4 py-3 rounded-xl font-medium transition-all border-2 flex items-center gap-2 ${
                        isSelected
                          ? `bg-gradient-to-r ${platformColors[platform]} text-white border-transparent shadow-lg`
                          : 'bg-[#1a1a1f] text-gray-400 border-[#1f1f24] hover:border-[#2a2a2f]'
                      }`}
                    >
                      {typeof Icon === 'string' ? (
                        <span className="text-lg">{Icon}</span>
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                      <span className="text-sm capitalize">{platform}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Caption */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-white">Caption</label>
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {generating ? 'Generating...' : 'Generate with AI'}
                </button>
              </div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={5}
                maxLength={2200}
                className="w-full px-4 py-3 bg-[#1a1a1f] border border-[#1f1f24] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write your caption here..."
              />
              <div className="flex items-center justify-between mt-2">
                <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" />
                  Add hashtags
                </button>
                <span className="text-xs text-gray-600">{caption.length} / 2200</span>
              </div>
            </div>

            {/* AI Suggestions */}
            {suggestions.length > 0 && (
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/5 rounded-xl p-5 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h4 className="text-sm font-semibold text-white">AI Suggestions</h4>
                </div>
                <div className="space-y-2">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCaption(suggestion)}
                      className="w-full p-3 bg-[#1a1a1f]/50 hover:bg-[#1f1f24] rounded-lg text-xs text-gray-300 text-left transition-colors border border-[#1f1f24]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-semibold text-white mb-3">Media</label>
              <div className="border-2 border-dashed border-[#1f1f24] rounded-xl p-8 text-center hover:border-[#2a2a2f] transition-colors cursor-pointer">
                <input type="file" id="media-upload" multiple className="hidden" />
                <label htmlFor="media-upload" className="cursor-pointer flex flex-col items-center gap-3">
                  <Upload className="w-10 h-10 text-gray-600" />
                  <div>
                    <span className="text-sm text-gray-300">Drop files here or click to upload</span>
                    <p className="text-xs text-gray-600 mt-1">PNG, JPG, MP4 up to 50MB</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Scheduling */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Schedule Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-[#1a1a1f] border border-[#1f1f24] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Schedule Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-3 bg-[#1a1a1f] border border-[#1f1f24] rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-[#1f1f24]">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-[#1a1a1f] hover:bg-[#25252a] text-gray-300 rounded-xl font-semibold transition-colors border border-[#2a2a2f]"
              >
                Cancel
              </button>
              <button className="px-6 py-3 bg-[#25252a] hover:bg-[#2a2a2f] text-gray-300 rounded-xl font-semibold transition-colors border border-[#2a2a2f]">
                Save Draft
              </button>
              <button
                disabled={!caption || selectedPlatforms.length === 0}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20"
              >
                Schedule Post
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Main Social Media Page
export default function SocialMediaPage() {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [platformFilter, setPlatformFilter] = useState('all');
  const [posts] = useState<Post[]>(mockPosts);

  return (
    <div className="w-full h-full">
      {/* Header */}
      <header className="flex flex-wrap gap-3 min-h-20 py-4 px-4 md:px-6 lg:px-8 shrink-0 items-center transition-all ease-linear border-b">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          <button 
            className="-ms-1 p-2 hover:bg-accent rounded-lg transition-colors" 
            aria-label="Toggle Sidebar"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
          <div className="max-lg:hidden lg:contents">
            <div className="h-4 w-px bg-border me-2" />
            <nav aria-label="breadcrumb">
              <ol className="flex items-center gap-2 text-sm">
                <li className="hidden md:block">
                  <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </a>
                </li>
                <li className="hidden md:block">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </li>
                <li>
                  <span className="font-semibold">Social Media</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-background hover:bg-accent border border-border rounded-lg text-sm transition-colors flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Last 7 days
            <ChevronDown className="w-4 h-4" />
          </button>
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none appearance-none cursor-pointer"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")", backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em', paddingRight: '2.75rem' }}
          >
            <option value="all">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter</option>
            <option value="tiktok">TikTok</option>
          </select>
          <button
            onClick={() => setIsComposerOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-8 py-8 space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold mb-3">Social Media Management</h1>
          <p className="text-lg text-muted-foreground">Create, schedule, and analyze your social media content</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Total Reach</span>
              <Eye className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold mb-1">139.8K</p>
            <p className="text-xs text-emerald-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +18.2% from last week
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Impressions</span>
              <BarChart3 className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold mb-1">220.4K</p>
            <p className="text-xs text-emerald-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12.5% from last week
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Engagement Rate</span>
              <Heart className="w-5 h-5 text-pink-500" />
            </div>
            <p className="text-3xl font-bold mb-1">4.1%</p>
            <p className="text-xs text-muted-foreground">+0.3% from last week</p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Total Followers</span>
              <Users className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold mb-1">43.2K</p>
            <p className="text-xs text-emerald-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +520 this week
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar & Posts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Calendar */}
            <ContentCalendar posts={posts} onDateClick={() => {}} />

            {/* Scheduled Posts */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Scheduled Posts</h2>
                  <p className="text-sm text-muted-foreground">Upcoming content across all platforms</p>
                </div>
              </div>

              <div className="grid gap-4">
                {posts.filter(p => p.status === 'scheduled').map(post => (
                  <div key={post.id} className="bg-card rounded-xl p-6 border border-border hover:border-accent transition-colors">
                    <div className="flex gap-4">
                      {post.media[0] && (
                        <img
                          src={post.media[0]}
                          alt="Post preview"
                          className="w-24 h-24 rounded-xl object-cover"
                        />
                      )}
                      
                      <div className="flex-1">
                        <p className="text-sm mb-3 line-clamp-2">{post.caption}</p>
                        
                        <div className="flex items-center gap-3 mb-3">
                          {post.platforms.map(platform => {
                            const Icon = platformIcons[platform];
                            return (
                              <div
                                key={platform}
                                className={`p-1.5 rounded-lg bg-gradient-to-r ${platformColors[platform]}`}
                              >
                                {typeof Icon === 'string' ? (
                                  <span className="text-xs">{Icon}</span>
                                ) : (
                                  <Icon className="w-3.5 h-3.5 text-white" />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.scheduledFor && new Date(post.scheduledFor).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded-lg border border-blue-500/20">
                            Scheduled
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Follower Growth */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-bold mb-5">Follower Growth</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={followerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))" 
                    style={{ fontSize: '10px' }}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    style={{ fontSize: '10px' }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      fontSize: '11px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Followers</span>
                  <span className="text-xl font-bold">43.2K</span>
                </div>
              </div>
            </div>

            {/* Platform Performance */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-bold mb-5">Platform Performance</h3>
              <div className="space-y-4">
                {analyticsData.map(platform => {
                  const Icon = platformIcons[platform.platform.toLowerCase() as Platform];
                  return (
                    <div key={platform.platform} className="flex items-center justify-between p-4 bg-accent/50 rounded-xl hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${platformColors[platform.platform.toLowerCase() as Platform]}`}>
                          {typeof Icon === 'string' ? (
                            <span className="text-sm">{Icon}</span>
                          ) : (
                            <Icon className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{platform.platform}</div>
                          <div className="text-xs text-muted-foreground">{platform.followers.toLocaleString()} followers</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-emerald-500">{(platform.engagement / platform.reach * 100).toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">engagement</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-4 bg-accent/50 hover:bg-accent rounded-xl text-sm transition-colors">
                  <Grid3x3 className="w-4 h-4 text-blue-500" />
                  Media Library
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-accent/50 hover:bg-accent rounded-xl text-sm transition-colors">
                  <BarChart3 className="w-4 h-4 text-purple-500" />
                  Analytics Dashboard
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-accent/50 hover:bg-accent rounded-xl text-sm transition-colors">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  Inbox & Comments
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Posts */}
        <div className="bg-card rounded-xl border border-border p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Top Performing Posts</h2>
              <p className="text-sm text-muted-foreground">Best performing content this month</p>
            </div>
            <button className="px-4 py-2 bg-accent hover:bg-accent/80 border border-border rounded-xl text-sm transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="platform" 
                stroke="hsl(var(--muted-foreground))" 
                style={{ fontSize: '12px' }}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                style={{ fontSize: '12px' }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Bar dataKey="reach" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Reach" />
              <Bar dataKey="engagement" fill="#10b981" radius={[8, 8, 0, 0]} name="Engagement" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Post Composer Modal */}
      <PostComposerModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
      />
    </div>
  );
}