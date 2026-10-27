import { useState, useEffect } from 'react';
import { Search, Bell, Clock, LogIn, Sparkles, Check, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  currentUser: User;
  onSearch: (query: string) => void;
  searchQuery: string;
  onOpenProfile: () => void;
  onSetActiveTab: (tab: string) => void;
}

export default function Header({ 
  currentUser, 
  onSearch, 
  searchQuery, 
  onOpenProfile,
  onSetActiveTab
}: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'n-1',
      title: 'New request assigned to you',
      desc: 'REQ-1002 Claims database SQL access requires Line approval.',
      time: 'Just now',
      read: false,
      refTab: 'requests'
    },
    {
      id: 'n-2',
      title: 'Onboarding Task Reminder',
      desc: '"Read Employee Handbook 2026" is due by end of the week.',
      time: '2 hours ago',
      read: false,
      refTab: 'home'
    },
    {
      id: 'n-3',
      title: 'Company News Published',
      desc: "MD Victoria Hawthorne scheduled Q2 Briefing for Wednesday.",
      time: '1 day ago',
      read: true,
      refTab: 'updates'
    }
  ]);

  // Update current UTC Clock time
  useEffect(() => {
    const updateUTCClock = () => {
      const now = new Date();
      const utcString = now.toUTCString().replace('GMT', 'UTC');
      setCurrentTime(utcString);
    };
    updateUTCClock();
    const interval = setInterval(updateUTCClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (item: typeof notifications[0]) => {
    setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
    setShowNotifications(false);
    onSetActiveTab(item.refTab);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 fixed top-0 right-0 left-72 z-10 flex items-center justify-between px-8 shadow-xs">
      {/* Global Search Bar */}
      <div className="w-1/2">
        <div className="relative">
          <Search strokeWidth={1.5} className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSetActiveTab('search');
              }
            }}
            placeholder="Search policies, tools, staff, announcements, forms, or requests..."
            className="w-full bg-slate-50 border border-slate-200/80 text-slate-800 text-xs rounded-full pl-10 pr-4 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue/30 focus:border-brand-blue/40 transition-all font-sans"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Action Suite */}
      <div className="flex items-center gap-6">
        {/* Real-time UTC clock */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 font-mono bg-slate-50 border border-slate-200/70 rounded-full px-3 py-1">
          <Clock strokeWidth={1.5} className="w-3.5 h-3.5 text-brand-blue" />
          <span>{currentTime || 'Loading UTC time...'}</span>
        </div>

        {/* Dynamic Notification Bell Box */}
        <div className="relative">
          <button
            id="notification-bell-button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full transition-all relative border border-slate-200/60"
          >
            <Bell strokeWidth={1.5} className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#EA580C] rounded-full text-[8px] text-white flex items-center justify-center font-bold font-mono">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 py-2">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800">Notifications ({unreadCount} unread)</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={handleMarkAllRead} 
                    className="text-[10px] text-brand-orange hover:underline font-bold"
                  >
                    Mark read
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-center text-xs text-slate-400">No new updates</p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleNotificationClick(item)}
                      className={`px-4 py-3 hover:bg-slate-50 cursor-pointer transition-all border-b border-slate-50 last:border-0 ${
                        !item.read ? 'bg-orange-50/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2 justify-between">
                        <span className={`font-semibold text-xs ${!item.read ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
                          {item.title}
                        </span>
                        {!item.read && <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{item.desc}</p>
                      <span className="text-[9px] text-slate-400 mt-1.5 block">{item.time}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="px-4 py-1.5 text-center border-t border-slate-100">
                <button 
                  onClick={() => { setShowNotifications(false); onSetActiveTab('home'); }} 
                  className="text-[10px] text-slate-500 hover:text-brand-orange transition-all font-medium inline-block w-full"
                >
                  Configure alerts in profile
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Connected Buddy Indicator for New Staff */}
        {currentUser.buddyName && (
          <div className="hidden xl:flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] rounded-full px-3 py-1 font-sans">
            <Sparkles strokeWidth={1.5} className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Buddy Assigned: <strong>{currentUser.buddyName}</strong></span>
          </div>
        )}

        {/* User Card Trigger */}
        <button
          id="header-user-button"
          onClick={onOpenProfile}
          className="flex items-center gap-2 group hover:bg-slate-50 p-1.5 rounded-xl transition-all text-left"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full border border-slate-200 bg-slate-100 object-cover group-hover:border-brand-orange transition-all"
          />
          <div className="hidden md:block">
            <h5 className="text-xs font-bold text-slate-800 leading-tight group-hover:text-brand-orange transition-all">
              {currentUser.name}
            </h5>
            <p className="text-[10px] text-slate-500 tracking-tight">
              {currentUser.department}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}
