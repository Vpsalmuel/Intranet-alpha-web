import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  Play, 
  Clock, 
  CheckSquare, 
  Square, 
  ChevronRight, 
  FileText, 
  ExternalLink, 
  Coins, 
  Cpu, 
  Megaphone, 
  ShieldCheck, 
  AlertCircle,
  TrendingUp,
  UserCheck, Cake,
  Calendar,
  Layers,
  ArrowRight,
  Video as VideoIcon,
  X,
  MessageSquare,
  Plus,
  Heart,
  Award,
  BookOpen,
  Mail,
  Globe,
  HelpCircle,
  MapPin,
  CreditCard,
  Network,
  Search,
  MonitorSmartphone
} from 'lucide-react';
import { 
  User, 
  OnboardingTask, 
  Video, 
  Announcement, 
  RequestItem 
} from '../types';

const getToolIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('email') || n.includes('mail')) return <Mail className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (n.includes('teams') || n.includes('chat') || n.includes('message')) return <MessageSquare className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (n.includes('sharepoint') || n.includes('web') || n.includes('globe')) return <Globe className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (n.includes('handbook') || n.includes('doc') || n.includes('sop') || n.includes('manual') || n.includes('guide') || n.includes('form') || n.includes('file')) return <FileText className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (n.includes('support') || n.includes('help')) return <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (n.includes('kissflow') || n.includes('workflow') || n.includes('matrix') || n.includes('layers')) return <Layers className="w-4 h-4 text-indigo-500 shrink-0" />;
  
  if (n.includes('claim')) return <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (n.includes('investigation') || n.includes('alert') || n.includes('flag')) return <AlertCircle className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (n.includes('rating') || n.includes('pricing') || n.includes('coin') || n.includes('finance') || n.includes('payment') || n.includes('expense') || n.includes('budget')) return <Coins className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (n.includes('approval') || n.includes('award') || n.includes('quality')) return <Award className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (n.includes('calendar') || n.includes('event') || n.includes('leave')) return <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (n.includes('brand') || n.includes('asset') || n.includes('design') || n.includes('spark')) return <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (n.includes('social') || n.includes('media') || n.includes('planner') || n.includes('newsletter') || n.includes('megaphone') || n.includes('bulletin')) return <Megaphone className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (n.includes('hr') || n.includes('directory') || n.includes('colleague') || n.includes('staff') || n.includes('user')) return <UserCheck className="w-4 h-4 text-indigo-500 shrink-0" />;
  if (n.includes('it') || n.includes('tech') || n.includes('system') || n.includes('cpu')) return <Cpu className="w-4 h-4 text-indigo-500 shrink-0" />;

  return <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />;
};

interface HomeDashboardViewProps {
  currentUser: User;
  onboardingTasks: OnboardingTask[];
  onToggleTask: (id: string) => void;
  announcements: Announcement[];
  videos: Video[];
  requests: RequestItem[];
  pinnedTools: string[];
  onTogglePinTool: (tool: string) => void;
  onNavigateToTab: (tab: string) => void;
  onSelectVideo: (videoId: string) => void;
  onSelectAnnouncement: (announcementId: string) => void;
  onSelectRequest: (requestId: string) => void;
}

export default function HomeDashboardView({
  currentUser,
  onboardingTasks,
  onToggleTask,
  announcements,
  videos,
  requests,
  pinnedTools,
  onTogglePinTool,
  onNavigateToTab,
  onSelectVideo,
  onSelectAnnouncement,
  onSelectRequest
}: HomeDashboardViewProps) {
  // Filter announcements visible to current role
  const visibleAnnouncements = announcements.filter(news => {
    if (news.visibility === 'Everyone') return true;
    if (currentUser.role === 'new_staff' && news.visibility === 'New Staff') return true;
    if (currentUser.role !== 'new_staff' && news.visibility === 'Existing Staff') return true;
    if (news.visibility === currentUser.department) return true;
    return false;
  }).slice(0, 4);

  const featuredNews = announcements.find(news => news.featured) || announcements[0];

  // MD welcome video simulation state
  const [isPlayingMdVideo, setIsPlayingMdVideo] = useState(false);
  const [mdVideoProgress, setMdVideoProgress] = useState(0);
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState(0);

  const mdSubtitles = [
    "Warm greetings to our newest team members. I am Victoria Hawthorne, Managing Director of Rex Insurance.",
    "Your journey starts here. Our alignment to policyholder trust is our absolute sacred covenant.",
    "Claims operations and underwriting require our deepest levels of precision and empathy.",
    "Explore our centralized intranet workspace, utilize our specialized tools, and coordinate closely with your onboarding buddy.",
    "Welcome to Rex Insurance. Let's make an extraordinary impact together. Have an excellent first week!"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingMdVideo) {
      interval = setInterval(() => {
        setMdVideoProgress((prev) => {
          const next = prev + 5;
          if (next >= 100) {
            setIsPlayingMdVideo(false);
            return 100;
          }
          // Cycle subtitles
          const subIdx = Math.min(Math.floor((next / 100) * mdSubtitles.length), mdSubtitles.length - 1);
          setActiveSubtitleIndex(subIdx);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingMdVideo]);

  // Map progress stats for onboarding tasks
  const completedTasks = onboardingTasks.filter(t => t.status === 'Completed').length;
  const onboardingProgress = Math.round((completedTasks / onboardingTasks.length) * 100);

  // Map progress stats for videos
  const completedVideos = videos.filter(v => v.completed).length;
  const videoProgress = Math.round((completedVideos / videos.length) * 100);

  // Today's Meetings State & Adding Event state
  const [meetings, setMeetings] = useState([
    { id: 'meet-1', title: 'Claims Audit & Compliance Review', time: '09:30 AM', location: 'Meeting Room 4B', organizer: 'Sarah Jenkins' },
    { id: 'meet-2', title: 'Q3 Underwriting Forecast & Risk Grids', time: '11:00 AM', location: 'Boardroom East', organizer: 'Rebecca Sterling' },
    { id: 'meet-3', title: 'Finance Reconcile Workshop', time: '02:00 PM', location: 'Virtual Webex', organizer: 'Amanda Lin' },
    { id: 'meet-4', title: 'Weekly Product Alignment Sync', time: '03:30 PM', location: 'Creative Lounge', organizer: 'Elena Rostova' }
  ]);
  const [showAddMeeting, setShowAddMeeting] = useState(false);
  const [newMeetTitle, setNewMeetTitle] = useState('');
  const [newMeetTime, setNewMeetTime] = useState('10:00 AM');
  const [newMeetLocation, setNewMeetLocation] = useState('Meeting Room 3A');
  const [newMeetOrganizer, setNewMeetOrganizer] = useState(currentUser.name);

  const handleAddMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetTitle.trim()) return;
    const newMeet = {
      id: `meet-${Date.now()}`,
      title: newMeetTitle,
      time: newMeetTime,
      location: newMeetLocation,
      organizer: newMeetOrganizer
    };
    setMeetings([...meetings, newMeet]);
    setNewMeetTitle('');
    setShowAddMeeting(false);
    alert(`Meeting "${newMeet.title}" has been successfully scheduled!`);
  };

  // Birthdays & Anniversaries Wish State
  const [wishedUsers, setWishedUsers] = useState<string[]>([]);
  const birthdays = [
    { name: 'Sarah Jenkins', type: 'Birthday 🎂', date: 'Today, June 8' },
    { name: 'Rebecca Sterling', type: '5-Year Work Anniversary 🏅', date: 'Today, June 8' },
    { name: 'Amanda Lin', type: 'Birthday 🎂', date: 'Tomorrow, June 9' },
    { name: 'Thomas Mueller', type: '1-Year Work Anniversary 🎉', date: 'June 11' }
  ];

  const handleWishUser = (name: string) => {
    setWishedUsers([...wishedUsers, name]);
  };

  const defaultTools = [
    { name: 'Email', icon: 'Mail', desc: 'Open Outlook web access' },
    { name: 'Microsoft Teams', icon: 'MessageSquare', desc: 'Access team chats' },
    { name: 'Kissflow Workspace', icon: 'Layers', desc: 'Track external operations workflows' }
  ];

  // My Recent Requests
  const myRequests = requests.filter(r => 
    r.requestedBy === currentUser.name || 
    r.assignedOwner === currentUser.name
  ).slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. Welcome Header Banner */}
      <div className="bg-white rounded-[24px] p-7 md:p-8 text-slate-800 relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-100">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-slate-100/40 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-80 h-40 rounded-full bg-slate-100/30 blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-slate-900">
              Good morning, {currentUser.name.split(' ')[0]} ☀️
            </h2>
            <p className="text-xs text-slate-500 mt-2 max-w-xl font-sans leading-relaxed">
              Welcome to the centralized digital workspace of Rex Insurance. Access department files, launch required tools, log collaboration requests, and watch culture guides.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions Block for all staff */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-sans font-bold text-slate-900 text-lg tracking-tight">Quick Actions</h3>
            <p className="text-xs text-slate-400">Frequently used corporate services and instant portals</p>
          </div>
          <span className="text-[11px] text-slate-500 font-medium font-sans bg-white border border-slate-100 shadow-2xs px-3 py-1 rounded-full">
            Common Tasks
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Apply Leave', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50/80', tag: 'HR Portal', tab: 'hr' },
            { label: 'Raise IT Ticket', icon: Cpu, color: 'text-rose-600', bg: 'bg-rose-50/80', tag: 'IT Support', tab: 'support' },
            { label: 'Book Meeting Room', icon: MapPin, color: 'text-amber-600', bg: 'bg-amber-50/80', tag: 'Office Admin', tab: 'updates' }
          ].map((action, i) => (
            <button 
              key={i} 
              onClick={() => onNavigateToTab(action.tab)}
              className="flex flex-col justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-slate-200 transition-all group text-left min-h-[124px] cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <div className={`w-11 h-11 ${action.bg} ${action.color} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-[9.5px] font-medium text-slate-400 bg-slate-50/80 px-2 py-0.5 rounded-full border border-slate-100">
                  {action.tag}
                </span>
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold text-slate-800 group-hover:text-brand-blue transition-colors leading-snug block">{action.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Tools & Pinning Section */}
      <section id="personalized-quick-tools-card" className="bg-white border border-slate-100 rounded-[24px] p-6 md:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="font-sans font-bold text-slate-900 text-base tracking-tight">My Personal Command Tools</h3>
            <p className="text-xs text-slate-400 mt-0.5">Launch standard administrative resources and tailored department tools.</p>
          </div>
          <span className="text-[11px] bg-brand-blue/5 text-brand-blue border border-brand-blue/15 rounded-full px-3.5 py-1 font-sans font-bold shadow-2xs">
            {currentUser.department} Tools Enabled
          </span>
        </div>

        {/* General Utilities Grid */}
        <div>
          <h4 className="text-[11px] font-bold font-mono uppercase tracking-wider text-slate-400 mb-3.5 block">
            General Workspace Utilities
          </h4>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {defaultTools.map((tool) => (
              <div
                key={tool.name}
                className="px-3.5 py-3 rounded-2xl border border-slate-100 bg-slate-50/40 hover:bg-white hover:border-slate-200/80 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all select-none flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-white shadow-2xs border border-slate-100/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {getToolIcon(tool.name)}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 truncate group-hover:text-brand-blue transition-colors">{tool.name}</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate leading-tight">{tool.desc}</p>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-blue transition-colors shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Main Dashboard Layout Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Side: Widgets (9 out of 12 columns, or 12 of 12 if new staff) */}
        <div className={`${currentUser.role === 'new_staff' ? 'xl:col-span-12' : 'xl:col-span-8'} space-y-8`}>
          
          {/* Featured Hero Update + Headline cards */}
          <section id="featured-announcements-card" className="bg-white border border-slate-100 rounded-[24px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div className="p-6 md:p-7 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-sans font-bold text-slate-900 text-base tracking-tight">CEO Announcements & Company News</h3>
                <p className="text-xs text-slate-400 mt-0.5">Stay updated with general and leadership updates.</p>
              </div>
              <button 
                onClick={() => onNavigateToTab('updates')} 
                className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 bg-slate-50 hover:bg-indigo-50/60 border border-slate-100 px-3 py-1.5 rounded-full transition-all shadow-2xs cursor-pointer"
              >
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 md:p-7">
              {/* Featured Large Hero Card */}
              {featuredNews ? (
                <div 
                  onClick={() => onSelectAnnouncement(featuredNews.id)}
                  className="group border border-slate-100/90 rounded-[22px] overflow-hidden bg-slate-50/40 hover:bg-white hover:border-slate-200 transition-all hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 mb-6 flex flex-col md:flex-row gap-6 p-4 md:p-5 cursor-pointer"
                >
                  {featuredNews.image && (
                    <div className="md:w-2/5 shrink-0 h-44 md:h-auto rounded-2xl overflow-hidden bg-slate-100 shadow-2xs">
                      <img 
                        src={featuredNews.image} 
                        alt={featuredNews.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" 
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-2">
                         <span className="px-2.5 py-0.5 text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100/80 rounded-full uppercase tracking-wider font-mono">
                          {featuredNews.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{featuredNews.date}</span>
                      </div>
                      <h4 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-indigo-600 duration-150 mt-2.5 leading-snug">
                        {featuredNews.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed truncate-2-lines">
                        {featuredNews.summary}
                      </p>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-4 flex items-center gap-1.5 justify-between pt-3 border-t border-slate-100/80">
                      <span>By <strong className="text-slate-700">{featuredNews.author}</strong> • {featuredNews.department}</span>
                      <span className="text-indigo-600 group-hover:translate-x-1 duration-200 transition-all font-bold flex items-center gap-0.5">
                        Read announcement <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 mb-6">
                  No announcements currently featured.
                </div>
              )}

              {/* Smaller Bullet announcement cards */}
              <div className="grid md:grid-cols-2 gap-4">
                {visibleAnnouncements.filter(item => !featuredNews || item.id !== featuredNews.id).map((news) => (
                  <div
                    key={news.id}
                    onClick={() => onSelectAnnouncement(news.id)}
                    className="p-4 border border-slate-100 rounded-[20px] bg-white hover:bg-slate-50/60 hover:border-slate-200 cursor-pointer transition-all hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 text-[8px] font-mono font-bold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100/80">
                          {news.category}
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono">{news.date}</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 line-clamp-2 leading-snug transition-colors">
                        {news.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-1 lines-2-ellipsis leading-relaxed">
                        {news.summary}
                      </p>
                    </div>

                    <div className="text-[10px] text-slate-400 mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="truncate max-w-[120px]">By {news.author}</span>
                      <span className="text-indigo-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 shrink-0">
                        Read more <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Acculturation Learning Progress section */}
          <section id="onboarding-videos-section" className="bg-white border border-slate-100 rounded-[24px] p-6 md:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="font-sans font-bold text-slate-900 text-base tracking-tight">
                  {currentUser.role === 'new_staff' ? 'Continue Your Acculturation Journey' : 'Company Learning Library'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Explore core vision videos and department overviews to align goals.</p>
              </div>
              <div className="flex items-center gap-2.5 bg-slate-50/80 border border-slate-100 px-3 py-1.5 rounded-full shadow-2xs">
                <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden shrink-0">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${videoProgress}%` }} />
                </div>
                <span className="text-xs font-bold font-mono text-emerald-700">
                  {completedVideos} of {videos.length} Done
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => {
                    onSelectVideo(vid.id);
                    onNavigateToTab('acculturation');
                  }}
                  className="group rounded-[22px] border border-slate-100 bg-white hover:border-slate-200 hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all overflow-hidden p-3 flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 mb-3 shadow-2xs">
                    <img 
                      src={vid.thumbnail} 
                      alt={vid.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 duration-200 transition-all" 
                    />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-150">
                      <div className="w-11 h-11 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all">
                        <Play className="w-5 h-5 fill-slate-900 text-slate-900 translate-x-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md text-[10px] text-white font-mono rounded-full">
                      {vid.duration}
                    </span>
                    {vid.completed && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-500/95 backdrop-blur-md text-[8px] text-white font-mono font-bold rounded-full shadow-2xs">
                        COMPLETED
                      </span>
                    )}
                  </div>
                  <div className="px-1 pb-1">
                    <span className="text-[9px] uppercase font-mono tracking-wider text-indigo-600 font-bold block mb-1">
                      {vid.category}
                    </span>
                    <h5 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {vid.title}
                    </h5>
                    <p className="text-[10px] text-slate-400 mt-1 flex justify-between">
                      <span>By {vid.speaker}</span>
                      <span className="text-emerald-600 font-medium">{vid.progressPercent > 0 && vid.progressPercent < 100 ? `${vid.progressPercent}% read` : ''}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Mini Widget Panel (4 out of 12 columns) - Hidden for new staff */}
        {currentUser.role !== 'new_staff' && (
          <div className="xl:col-span-4 space-y-8">
          
          {/* Quick Request Centre Widget */}
          <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
              <div>
                <h4 className="font-sans font-bold text-slate-900 text-sm tracking-tight">Interdepartmental Requests</h4>
                <p className="text-[11px] text-slate-400">Track collaborative tickets assigned or created.</p>
              </div>
              <button
                onClick={() => onNavigateToTab('requests')}
                className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold bg-slate-50 hover:bg-indigo-50/60 border border-slate-100 px-3 py-1 rounded-full transition-all shadow-2xs cursor-pointer"
              >
                Go to hub
              </button>
            </div>

            {myRequests.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-xs text-slate-400">No active request tickets logged</p>
                <button
                  onClick={() => onNavigateToTab('requests')}
                  className="mt-3 px-4 py-2 bg-indigo-600 text-white font-sans text-xs font-bold rounded-xl hover:bg-indigo-700 transition-all inline-block shadow-2xs cursor-pointer"
                >
                  Log New Ticket
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {myRequests.map((req) => (
                  <div 
                    key={req.id}
                    onClick={() => {
                      onSelectRequest(req.id);
                      onNavigateToTab('requests');
                    }}
                    className="p-3.5 border border-slate-100 hover:border-slate-200 rounded-2xl bg-slate-50/40 hover:bg-white cursor-pointer transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400">{req.id}</span>
                      <span className={`px-2 py-0.5 text-[9px] rounded-full font-mono font-bold ${
                        req.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        req.status === 'In Progress' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        req.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800 mt-1.5 truncate leading-tight">
                      {req.title}
                    </h5>
                    <div className="flex justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                      <span>To: <strong>{req.receivingDept.replace(' Operations', '').replace(' & Digital Infrastructure', '')}</strong></span>
                      <span>Priority: <strong className={`${req.priority === 'High' || req.priority === 'Urgent' ? 'text-red-500' : ''}`}>{req.priority}</strong></span>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => onNavigateToTab('requests')}
                  className="w-full text-center py-2.5 border border-dashed border-slate-200 rounded-2xl text-xs text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all cursor-pointer font-bold mt-2"
                >
                  + Lodge Inter-Dept Ticket
                </button>
              </div>
            )}
          </div>

          {/* A: Today's Meetings Calendar Widget */}
          <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-sans font-bold text-slate-900 text-sm tracking-tight">Today's Calendar & Meetings</h4>
                <p className="text-[10px] text-slate-400 font-sans">Track schedules and manage team sessions.</p>
              </div>
              <button 
                onClick={() => setShowAddMeeting(!showAddMeeting)}
                className="px-3 py-1 text-[10px] font-bold bg-brand-blue hover:bg-slate-900 text-white rounded-full flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Event</span>
              </button>
            </div>

            {/* In-line Add Event form */}
            {showAddMeeting && (
              <form onSubmit={handleAddMeetingSubmit} className="bg-slate-50/70 p-4 border border-slate-200/80 rounded-2xl space-y-3 animate-fade-in text-xs">
                <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-indigo-600 block">Schedule New Calendar Event</span>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 block font-bold">Meeting Topic</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Claims Pipeline Sync" 
                    value={newMeetTitle}
                    onChange={(e) => setNewMeetTitle(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none bg-white text-slate-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 block font-bold">Planned Time</label>
                    <input 
                      type="text" 
                      placeholder="e.g., 04:00 PM" 
                      value={newMeetTime}
                      onChange={(e) => setNewMeetTime(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none bg-white text-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 block font-bold">Room / Virtual</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Room 3C" 
                      value={newMeetLocation}
                      onChange={(e) => setNewMeetLocation(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none bg-white text-slate-800"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-1">
                  <button 
                    type="button" 
                    onClick={() => setShowAddMeeting(false)}
                    className="px-3 py-1 hover:bg-slate-100 border text-slate-600 rounded-xl font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-3.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-2xs cursor-pointer"
                  >
                    Schedule
                  </button>
                </div>
              </form>
            )}

            <div className="divide-y divide-slate-100">
              {meetings.map((meet) => (
                <div key={meet.id} className="py-2.5 first:pt-0 last:pb-0 group">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-slate-800 leading-snug group-hover:text-indigo-600 duration-150 transition-all">
                        {meet.title}
                      </h5>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1 font-mono">
                        <span className="flex items-center gap-1 font-semibold text-slate-500">
                          <Clock className="w-3 h-3 text-orange-500" /> {meet.time}
                        </span>
                        <span>•</span>
                        <span>{meet.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* C: Birthdays & Anniversaries Widget */}
          <div className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
            <div>
              <h4 className="font-sans font-bold text-slate-900 text-sm tracking-tight">Birthdays & Anniversaries</h4>
              <p className="text-[10px] text-slate-400 font-sans">Celebrate important moments with your teammates.</p>
            </div>

            <div className="space-y-2.5 font-sans">
              {birthdays.map((bdy) => {
                const hasWished = wishedUsers.includes(bdy.name);
                return (
                  <div key={bdy.name + bdy.type} className="flex justify-between items-center bg-slate-50/40 border border-slate-100/90 rounded-2xl p-3 hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all">
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 leading-tight">{bdy.name}</h5>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <span className="font-medium text-indigo-600">{bdy.type}</span> 
                        <span>•</span> 
                        <span className="text-slate-400 font-mono">{bdy.date}</span>
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handleWishUser(bdy.name)}
                      disabled={hasWished}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-tight transition-all text-center shrink-0 cursor-pointer ${
                        hasWished 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default' 
                          : 'bg-orange-50 hover:bg-orange-600 border border-orange-200/80 text-orange-700 hover:text-white shadow-2xs'
                      }`}
                    >
                      {hasWished ? '✓ Congratulated' : 'Wish Well'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
        )}

      </div>
    </div>
  );
}
