import React, { useState } from 'react';
import { User } from '../types';
import { Gift, Calendar, Award, UserPlus, TrendingUp, Search, ChevronRight, Heart, MapPin, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PeopleCelebrationsViewProps {
  currentUser: User;
}

export default function PeopleCelebrationsView({ currentUser }: PeopleCelebrationsViewProps) {
  const [activeTab, setActiveTab] = useState<'birthdays' | 'anniversaries' | 'promotions' | 'new_joiners'>('birthdays');

  const tabs = [
    { id: 'birthdays', label: 'Birthdays', icon: Gift },
    { id: 'anniversaries', label: 'Work Anniversaries', icon: Award },
    { id: 'promotions', label: 'Promotions', icon: TrendingUp },
    { id: 'new_joiners', label: 'New Joiners', icon: UserPlus },
  ] as const;

  return (
    <div className="space-y-8 animate-fade-in pb-12 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-gray-950 flex items-center gap-2">
            <Gift className="w-6 h-6 text-brand-orange" /> People Celebrations
          </h2>
          <p className="text-xs text-gray-500 mt-1">Celebrate birthdays, work anniversaries, promotions, and welcome new joiners.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-mono tracking-wide rounded-t-lg transition-all ${
                isActive
                  ? 'bg-white text-brand-orange border border-slate-200 border-b-white translate-y-px'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'birthdays' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Today's Birthdays Hero */}
                <div className="lg:col-span-2 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden shrink-0 shadow-xl bg-white">
                      <img 
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256" 
                        alt="John Doe" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center md:text-left flex-1 space-y-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider font-mono">
                        <Gift className="w-3.5 h-3.5" /> Today's Birthday
                      </div>
                      <h3 className="text-3xl font-bold font-sans">🎉 Happy Birthday!</h3>
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-1">John Doe</h4>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-white/90 font-medium">
                          <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 opacity-75" /> Claims Officer</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4 opacity-75" /> Lagos Branch</span>
                        </div>
                      </div>
                      <button className="mt-4 bg-white text-rose-500 hover:bg-slate-50 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-colors flex items-center justify-center md:justify-start gap-2 w-full md:w-auto">
                        <Heart className="w-4 h-4 fill-rose-500" /> Wish Happy Birthday
                      </button>
                    </div>
                  </div>
                </div>

                {/* This Week / Month Sidebar */}
                <div className="space-y-6 flex flex-col h-full">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex-1">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                      <Calendar className="w-4 h-4 text-brand-blue" /> This Week
                    </h3>
                    <div className="space-y-4">
                      {[
                        { date: '22 Aug', name: 'Sarah James', dept: 'Finance' },
                        { date: '23 Aug', name: 'Victor', dept: 'IT' },
                        { date: '24 Aug', name: 'Mercy', dept: 'HR' },
                      ].map((person, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-12 py-1.5 bg-slate-50 rounded text-center border border-slate-100 flex-shrink-0">
                            <span className="block text-xs font-bold text-slate-900">{person.date.split(' ')[0]}</span>
                            <span className="block text-[9px] uppercase font-bold text-slate-500">{person.date.split(' ')[1]}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-800">{person.name}</h4>
                            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{person.dept}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center justify-between group cursor-pointer hover:bg-slate-100 transition-colors">
                    <div>
                      <h4 className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">This Month (August)</h4>
                      <p className="text-xl font-bold text-slate-900 mt-1">15 Birthdays</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Employee Card Grid (General list example) */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-4 font-sans">Upcoming This Month</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[
                    { name: 'Elena Rostova', pos: 'Brand Comm Admin', dept: 'Marketing', branch: 'Abuja Branch', years: 2, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150' },
                    { name: 'Michael Chen', pos: 'Lead Developer', dept: 'IT', branch: 'Lagos Branch', years: 4, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150' },
                    { name: 'Sarah James', pos: 'Financial Analyst', dept: 'Finance', branch: 'Port Harcourt', years: 3, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150' },
                    { name: 'Victor', pos: 'Systems Admin', dept: 'IT', branch: 'Lagos Branch', years: 1, photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150&h=150' },
                  ].map((emp, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-center">
                      <img src={emp.photo} alt={emp.name} className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-slate-50 mb-3" />
                      <h4 className="font-bold text-slate-900 text-sm">{emp.name}</h4>
                      <p className="text-xs text-brand-blue font-semibold mb-1">{emp.pos}</p>
                      
                      <div className="flex flex-col gap-1 mt-3 text-[10px] text-slate-500 font-medium">
                        <span className="bg-slate-50 py-1 px-2 rounded">{emp.dept} • {emp.branch}</span>
                        <span className="bg-slate-50 py-1 px-2 rounded">{emp.years} Years at Rex</span>
                      </div>
                      
                      <button className="mt-4 w-full bg-slate-50 hover:bg-brand-orange hover:text-white text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-2">
                        <Gift className="w-3.5 h-3.5" /> Send Wishes
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'anniversaries' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
              <Award className="w-12 h-12 text-brand-orange mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Work Anniversaries</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Celebrate the dedication and milestones of our long-term team members.</p>
              {/* Similar grid to birthdays can be placed here */}
            </div>
          )}

          {activeTab === 'promotions' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
              <TrendingUp className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Recent Promotions</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Congratulate peers who have recently taken on new roles and responsibilities.</p>
            </div>
          )}

          {activeTab === 'new_joiners' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
              <UserPlus className="w-12 h-12 text-brand-blue mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Welcome New Joiners</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Say hello to the newest members of the Rex Insurance family.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
