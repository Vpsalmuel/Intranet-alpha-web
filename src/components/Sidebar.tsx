import RexLogo from "./RexLogo";
import { 
  Home, 
  Newspaper, 
  Video, 
  GitPullRequest, 
  Grid, 
  Users, 
  Heart, 
  HelpCircle, 
  Activity, 
  Shuffle,
  ChevronRight,
  BookOpen,
  Award,
  Gift,
  Briefcase,
  Lock
} from 'lucide-react';
import { User, UserRole } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: User;
  onSwitchUser: (role: UserRole) => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  onSwitchUser
}: SidebarProps) {

  const isOnboarding = !currentUser.completedOnboarding;

  const handleNavClick = (id: string, requiresAuth: boolean = false) => {
    if (isOnboarding && requiresAuth) {
      return;
    }
    setActiveTab(id);
  };

  const navPillars = [
    {
      title: '📢 Communication',
      items: [
        { id: 'updates', label: 'Company Updates', icon: Newspaper, locked: false },
        { id: 'milestones', label: 'Milestones', icon: Award, locked: false },
      ]
    },
    {
      title: '⚙️ Productivity',
      items: [
        { id: 'requests', label: 'Request Centre', icon: GitPullRequest, locked: true },
        { id: 'hr', label: 'HR Services', icon: Briefcase, locked: false },
        { id: 'wellbeing', label: 'Health & Wellbeing', icon: Heart, locked: false },
      ]
    },
    {
      title: '📚 Knowledge',
      items: [
        { id: 'knowledge', label: 'Knowledge Center', icon: BookOpen, locked: false },
        { id: 'acculturation', label: 'Learning Hub', icon: Video, locked: false },
        { id: 'departments', label: 'Departments Listing', icon: Grid, locked: false },
        { id: 'support', label: 'Help Desk', icon: HelpCircle, locked: false },
      ]
    },
    {
      title: '🤝 Connection',
      items: [
        { id: 'directory', label: 'Staff Directory', icon: Users, locked: false },
        { id: 'celebrations', label: 'People Celebrations', icon: Gift, locked: false },
      ]
    }
  ];

  const adminRoles: UserRole[] = ['it_admin', 'brand_admin', 'hr_admin', 'management'];
  const hasAdminAccess = adminRoles.includes(currentUser.role);

  return (
    <aside id="app-sidebar" className="w-72 bg-white text-slate-700 flex flex-col h-screen fixed inset-y-0 left-0 z-20 border-r border-slate-200/80 shadow-xs">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-200/80 flex flex-col gap-1 cursor-pointer" onClick={() => handleNavClick('home')}>
        <RexLogo className="h-8 w-auto self-start" />
        <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-brand-orange mt-1">Intranet Workspace</p>
      </div>

      {/* User Quick Indicator */}
      <div className="px-6 py-4 bg-slate-50/50 hover:bg-slate-50 border-b border-slate-200/80 flex items-center gap-3">
        <img 
          src={currentUser.avatar} 
          alt={currentUser.name} 
          referrerPolicy="no-referrer"
          className="w-10 h-10 rounded-full border border-brand-blue/30 bg-gray-200 object-cover shadow-xs"
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</h4>
          <p className="text-[10px] text-slate-500 truncate">{currentUser.jobTitle}</p>
          <span className="inline-block mt-1 px-1.5 py-0.5 text-[8px] font-mono bg-brand-blue/10 border border-brand-blue/20 rounded text-brand-blue font-bold">
            {currentUser.role.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6 custom-scrollbar pb-8">
        
        {/* Main Dashboard Link */}
        <button
          id="nav-link-home"
          onClick={() => handleNavClick('home')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group duration-150 ${
            activeTab === 'home'
              ? 'bg-brand-blue/10 text-brand-blue shadow-xs border border-brand-blue/20'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <Home 
              strokeWidth={1.5}
              className={`w-4 h-4 shrink-0 ${activeTab === 'home' ? 'text-brand-blue' : 'text-slate-400 group-hover:text-slate-600'}`} 
            />
            <span>Home Dashboard</span>
          </div>
          {activeTab === 'home' && <ChevronRight strokeWidth={1.5} className="w-3.5 h-3.5 text-brand-blue" />}
        </button>

        {navPillars.map((pillar, pIdx) => (
          <div key={pIdx} className="space-y-1">
            <h3 className="px-3 text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold mb-2">
              {pillar.title}
            </h3>
            {pillar.items.map((item, idx) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              const isLocked = isOnboarding && item.locked;
              
              return (
                <button
                  key={`${item.id}-${idx}`}
                  onClick={() => handleNavClick(item.id, item.locked)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group duration-150 ${
                    isActive
                      ? 'bg-brand-blue/10 text-brand-blue shadow-xs border border-brand-blue/20'
                      : isLocked 
                        ? 'opacity-60 cursor-not-allowed text-slate-500 hover:bg-slate-50'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent 
                      strokeWidth={1.5}
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-brand-blue' : isLocked ? 'text-slate-400' : 'text-slate-400 group-hover:text-slate-600'
                      }`} 
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight strokeWidth={1.5} className="w-3.5 h-3.5 text-brand-blue" />}
                  {isLocked && !isActive && <Lock strokeWidth={1.5} className="w-3.5 h-3.5 text-slate-300" />}
                </button>
              );
            })}
          </div>
        ))}

        {/* Admin Content Area Tab */}
        {hasAdminAccess && (
          <div className="pt-4 mt-4 border-t border-slate-200/80">
            <span className="px-3 text-[10px] uppercase font-mono tracking-wider text-brand-blue font-bold block mb-2">
              Management Portal
            </span>
            <button
              id="nav-link-admin"
              onClick={() => handleNavClick('admin')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                activeTab === 'admin'
                  ? 'bg-brand-blue/10 text-brand-blue shadow-xs border border-brand-blue/20'
                  : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 font-semibold text-brand-blue">
                <Activity strokeWidth={1.5} className="w-4 h-4 shrink-0" />
                <span>Admin Workspace</span>
              </div>
              {activeTab === 'admin' && <ChevronRight strokeWidth={1.5} className="w-3.5 h-3.5 text-brand-blue" />}
            </button>
          </div>
        )}
      </nav>

      {/* Sandbox Persona Switcher */}
      <div className="m-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 text-slate-300 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-brand-orange flex items-center gap-1">
            <Shuffle strokeWidth={1.5} className="w-3 h-3" /> ROLE SANDBOX SWITCHER
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mb-3 leading-tight font-sans">
          Change employee persona to test specialized updates, onboarding checklists, department portals, and admin workflows instantly.
        </p>
        <div className="relative">
          <select
            id="sandbox-role-dropdown"
            value={currentUser.role}
            onChange={(e) => onSwitchUser(e.target.value as UserRole)}
            className="w-full bg-slate-800 text-slate-200 border border-slate-700 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-brand-orange text-left cursor-pointer font-sans"
          >
            <option value="new_staff">Samuel Adebayo (New Staff / Claims)</option>
            <option value="claims_staff">Sarah Jenkins (Claims Specialist / Buddy)</option>
            <option value="underwriting_staff">Rebecca Sterling (Lead Underwriter)</option>
            <option value="finance_staff">Amanda Lin (Finance Controller)</option>
            <option value="brand_admin">Elena Rostova (Brand Comm Admin)</option>
            <option value="it_admin">David Kojo (IT Support Admin)</option>
            <option value="hr_admin">Thomas Mueller (HR Onboarding Lead)</option>
            <option value="management">Victoria Hawthorne (MD / CEO)</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
