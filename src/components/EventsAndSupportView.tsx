import React, { useState } from 'react';
import { 
  Calendar, 
  HelpCircle, 
  Clock, 
  MapPin, 
  User as UserIcon, 
  Settings, 
  Cpu, 
  ShieldCheck, 
  Sliders, 
  Activity, 
  FileText, 
  PlusCircle, 
  Power, 
  CheckCircle,
  TrendingUp,
  Inbox,
  AlertTriangle,
  Megaphone
} from 'lucide-react';
import { User, EventItem, FileItem, RequestItem, Announcement } from '../types';
import { INITIAL_EVENTS } from '../data/mockData';

interface EventsAndSupportViewProps {
  currentUser: User;
  onNavigateToTab: (tab: string) => void;
  subViewType: 'events' | 'support' | 'profile' | 'admin';
  files: FileItem[];
  requests: RequestItem[];
  announcements: Announcement[];
  pinnedTools: string[];
  onTogglePinTool: (tool: string) => void;
  onTriggerLogOut: () => void;
}

export default function EventsAndSupportView({
  currentUser,
  onNavigateToTab,
  subViewType,
  files,
  requests,
  announcements,
  pinnedTools,
  onTogglePinTool,
  onTriggerLogOut
}: EventsAndSupportViewProps) {
  // Support ticket form submission simulators
  const [supportCategory, setSupportCategory] = useState('IT Technical Support');
  const [supportDesc, setSupportDesc] = useState('');
  const [submittedSupportTicket, setSubmittedSupportTicket] = useState<any | null>(null);

  // Settings profile configurations
  const [themeMode, setThemeMode] = useState('Standard Blue');
  const [notificationsAlerts, setNotificationsAlerts] = useState(true);

  // FAQs
  const faqList = [
    { q: 'How do I authenticate with Azure corporate email SSO?', a: 'Just launch Microsoft Outlook Web or click the SSO authenticate. Ensure FortiClient VPN operates if launching server details off-campus.' },
    { q: 'When do vendor payment invoices clear?', a: 'Finance processes vendor reconciliation files on the 10th and 25th of every month upon executive approvals.' },
    { q: 'How do I claim broadband remote utilities stipend?', a: 'People & Culture offers wellness allowances. Submit invoice receipts using the payment reimbursement form under Documents.' },
    { q: 'Where do I find the latest underwriting risk standard matrix?', a: 'Launch the Rating Guide Engine inside Underwriting portal or download standard SOPs under Documents tab.' }
  ];

  // Submit Help-desk Support ticket
  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportDesc) return;
    
    setSubmittedSupportTicket({
      id: `TKT-${Math.floor(8000 + Math.random() * 1999)}`,
      category: supportCategory,
      description: supportDesc,
      status: 'Open - Assigned to IT support desk'
    });
    setSupportDesc('');
  };

  const isPortalAdmin = ['it_admin', 'brand_admin', 'hr_admin', 'management'].includes(currentUser.role);

  // RENDER SUB-V: Upcoming events & announcements
  if (subViewType === 'events') {
    return (
      <div className="space-y-8 animate-fade-in pb-12 font-sans">
        <div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-gray-950 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#1E2D64]" /> Corporate Events & Announcements
          </h2>
          <p className="text-xs text-gray-500 mt-1">Official corporate announcements, upcoming town halls, executive briefings, and firm-wide notices.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          <div className="xl:col-span-8 space-y-4">
            {INITIAL_EVENTS.map((ev) => (
              <div key={ev.id} className="p-5 bg-white border border-slate-200/70 rounded-2xl shadow-sm transition-all flex flex-col gap-3">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 border border-blue-150 text-blue-900 flex flex-col items-center justify-center font-mono font-bold leading-none select-none">
                    <span className="text-[10px] uppercase font-semibold text-gray-400">JUN</span>
                    <span className="text-lg font-bold mt-1">{ev.date.split('-')[2] || '03'}</span>
                  </div>

                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[8px] font-mono font-bold uppercase rounded bg-orange-100 border border-orange-200 text-orange-850">
                        {ev.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Official Notice</span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">{ev.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">{ev.description}</p>
                    
                    <div className="flex flex-wrap gap-4 pt-1.5 text-[11px] text-gray-500 font-sans">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> {ev.time || '10:00 AM - 11:30 AM'}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {ev.location || 'Lagos Main Campus'}</span>
                      <span className="flex items-center gap-1.5"><UserIcon className="w-3.5 h-3.5 text-slate-400" /> Organizer: <strong className="text-slate-700">{ev.organizer}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="xl:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200/70 rounded-2xl p-5 shadow-sm">
              <h4 className="text-xs font-bold text-gray-900 uppercase font-mono tracking-wider mb-3">Celebrations & Anniversaries</h4>
              <div className="space-y-4 text-xs font-sans text-gray-600">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold shrink-0">🎂</div>
                  <div>
                    <h5 className="font-bold text-gray-800">Rebecca Sterling</h5>
                    <p className="text-[10px] text-gray-400">Underwriting • Celebrating Birthday today!</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0">🏆</div>
                  <div>
                    <h5 className="font-bold text-gray-800">David Kojo</h5>
                    <p className="text-[10px] text-gray-400">IT supervisor • Celebrating 8 Year work anniversary!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // RENDER SUB-V: Help & Support ticketing desk
  if (subViewType === 'support') {
    return (
      <div className="space-y-8 animate-fade-in pb-12 font-sans">
        <div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-gray-950 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#1E2D64]" /> Administrative FAQs & Help Desk
          </h2>
          <p className="text-xs text-gray-500 mt-1">Resolve device configurations glitches, VPN breakdowns, wellness allowance claims questions rapidly.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          <div className="xl:col-span-8 space-y-6">
            
            {/* FAQs List accordion style */}
            <div className="bg-white border p-6 rounded-2xl shadow-sm">
              <h3 className="font-sans font-bold text-gray-901 text-sm mb-4">Frequently Asked Questions FAQs</h3>
              <div className="space-y-4">
                {faqList.map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <h4 className="text-xs font-bold text-[#1E2D64]">{faq.q}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-sans">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Support Request form widget */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h3 className="font-sans font-bold text-gray-900 text-sm mb-1">Queue Support Ticket</h3>
              <p className="text-xs text-gray-400 mb-6">Encountered locked logins or broken workstation hardware? Post incident specifications.</p>

              {submittedSupportTicket ? (
                <div className="p-4 bg-emerald-50 border border-emerald-150 rounded-xl text-center space-y-2">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-xs font-bold text-slate-800">Support Ticket Logged!</h4>
                  <span className="text-[10px] text-emerald-700 font-mono font-semibold block">ID: {submittedSupportTicket.id} &bull; {submittedSupportTicket.status}</span>
                  <p className="text-[11px] text-gray-500 max-w-sm mx-auto">IT Support personnel will reach out to extension 999 shortly.</p>
                  <button onClick={() => setSubmittedSupportTicket(null)} className="mt-2 text-xs text-blue-600 font-bold hover:underline">Log Another Issue</button>
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-4 flex flex-col items-stretch">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 font-sans">Support Category *</label>
                    <select
                      id="support-cat"
                      value={supportCategory}
                      onChange={(e) => setSupportCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-205 text-gray-800 text-xs rounded-lg px-3 py-2 cursor-pointer font-sans"
                    >
                      <option value="IT Technical Support">IT Technical Support</option>
                      <option value="HR Talent Assistance">HR Talent Assistance</option>
                      <option value="Finance Billing Inquiry">Finance Billing Inquiry</option>
                      <option value="Admin Office Supplies Setup">Admin Office Supplies Setup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 font-sans">Describe support query incident *</label>
                    <textarea
                      id="support-desc"
                      required
                      rows={3}
                      value={supportDesc}
                      onChange={(e) => setSupportDesc(e.target.value)}
                      placeholder="e.g. Broken monitor display, VPN token authentication failures, or missing payroll slip receipts..."
                      className="w-full bg-slate-50 border border-gray-205 text-xs text-gray-800 rounded-lg px-3 py-2 font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="self-end px-5 py-2 bg-[#1E2D64] hover:bg-opacity-95 text-white font-bold text-xs rounded-xl"
                  >
                    Lodge Emergency Ticket
                  </button>
                </form>
              )}
            </div>

          </div>

          <div className="xl:col-span-4 p-5 bg-white border rounded-2xl shadow-sm text-xs font-sans text-gray-500 leading-relaxed space-y-4">
            <h4 className="font-bold text-gray-901">24 Hour IT Hotline</h4>
            <p>For high risk downtime instances, call the IT Command Suite directly on extension <strong>999</strong>.</p>
            <p>Standard help tickets are resolved within 2 operating working hours.</p>
          </div>

        </div>
      </div>
    );
  }

  // RENDER SUB-V: Profile & settings manager
  if (subViewType === 'profile') {
    return (
      <div className="space-y-8 animate-fade-in pb-12 font-sans">
        <div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-gray-950 flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#1E2D64]" /> Profile & Security Settings
          </h2>
          <p className="text-xs text-gray-500 mt-1">Manage single sign-on parameters, profile details, alerts triggers, and pinned home screen favorite metrics.</p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm max-w-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-gray-100">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full border bg-gray-200 object-cover" 
            />
            <div className="text-center sm:text-left">
              <h3 className="text-base font-bold text-gray-950 leading-tight">{currentUser.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{currentUser.jobTitle} &bull; {currentUser.department}</p>
              <p className="text-[10px] text-gray-400 font-mono mt-1">Email: {currentUser.email}</p>
            </div>
          </div>

          <div className="space-y-6 text-xs font-sans">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 font-sans">Active Visual Slate Theme</label>
                <select
                  id="theme-select"
                  value={themeMode}
                  onChange={(e) => {
                    setThemeMode(e.target.value);
                    alert(`Visual Theme overridden to ${e.target.value}. Styling guidelines strictly adhered standard palette.`);
                  }}
                  className="w-full bg-slate-50 border text-xs rounded-lg px-3 py-2 cursor-pointer"
                >
                  <option value="Standard Blue">Standard Blue (Default Primary #1E2D64)</option>
                  <option value="Cosmic Slate">Cosmic Slate Dark Theme Mock</option>
                  <option value="Metropulse Orange Theme">Rex Insurance Orange Highlights</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 font-sans">SSO Active Authorization Protocol</label>
                <div className="p-2 border rounded-lg bg-emerald-50 text-emerald-805 border-emerald-150 font-mono font-bold leading-none">
                  Authenticated: Azure SSO Active
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <div>
                <h5 className="font-bold text-gray-901 leading-tight">Notification Alerts Triggers</h5>
                <p className="text-[10.5px] text-gray-400">Receive browser alerts for newly assigned tickets in your cue.</p>
              </div>
              <input
                id="notifications-alert-checkbox"
                type="checkbox"
                checked={notificationsAlerts}
                onChange={(e) => setNotificationsAlerts(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="pt-4 flex justify-between gap-4 border-t border-gray-100">
              <button
                onClick={onTriggerLogOut}
                className="px-4 py-2 bg-red-100 text-red-700 font-bold border border-red-200 rounded-lg flex items-center gap-1 hover:bg-red-200"
              >
                <Power className="w-3.5 h-3.5" /> Logout Session
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER SUB-V: Admin / Content Management dashboard
  const deptAssignedQueue = requests.filter(r => r.receivingDept === currentUser.department);
  const totalCompletedCount = requests.filter(r => r.status === 'Completed').length;

  return (
    <div className="space-y-8 animate-fade-in pb-12 font-sans">
      <div>
        <h2 className="text-2xl font-sans font-bold tracking-tight text-gray-950 flex items-center gap-2">
          <Activity className="w-6 h-6 text-[#1E2D64]" /> Administrative Content & Operational Controls
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Monitor overall intranet metrics, configure content visibilities rules, browse pending support queues and audit organizational alignments.
        </p>
      </div>

      {/* Metrics board */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border rounded-xl text-center shadow-sm">
          <h5 className="text-[10px] font-mono tracking-wider font-bold text-slate-450 uppercase">TOTAL SYSTEM REQUESTS</h5>
          <strong className="text-2xl text-blue-900 font-sans block mt-1">{requests.length}</strong>
          <span className="text-[9px] text-gray-400 font-mono mt-0.5 block">{totalCompletedCount} resolved tickets</span>
        </div>
        <div className="p-4 bg-white border rounded-xl text-center shadow-sm">
          <h5 className="text-[10px] font-mono tracking-wider font-bold text-slate-450 uppercase">ACTIVE BULLETINS</h5>
          <strong className="text-2xl text-orange-500 font-sans block mt-1">{announcements.length}</strong>
          <span className="text-[9px] text-gray-400 font-mono mt-0.5 block">2 featured layout banners</span>
        </div>
        <div className="p-4 bg-white border rounded-xl text-center shadow-sm">
          <h5 className="text-[10px] font-mono tracking-wider font-bold text-slate-450 uppercase">PUBLISHED FILES</h5>
          <strong className="text-2xl text-indigo-900 font-sans block mt-1">{files.length}</strong>
          <span className="text-[9px] text-gray-400 font-mono mt-0.5 block">3 regulatory standard SOP reviews</span>
        </div>
        <div className="p-4 bg-white border rounded-xl text-center shadow-sm">
          <h5 className="text-[10px] font-mono tracking-wider font-bold text-slate-450 uppercase">DEPARTMENT QUEUE</h5>
          <strong className="text-2xl text-emerald-600 font-sans block mt-1">{deptAssignedQueue.length}</strong>
          <span className="text-[9px] text-gray-400 font-mono mt-0.5 block">Pending approvals review</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left side checklist */}
        <div className="xl:col-span-8 bg-white border p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-sans font-bold text-gray-900 text-sm">Regulatory Visibility & Security Checklists Matricies</h3>
          <p className="text-xs text-gray-400 font-sansLeading">
            Rex Insurance conforms with ISO 27001 document audits standards. Manage compliance metrics and visibility states:
          </p>

          <div className="divide-y divide-gray-105 text-xs text-gray-655 font-sans">
            <div className="py-3 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-gray-801">MFA Enforcement Audits</h5>
                <p className="text-[10px] text-gray-400 mt-0.5">Enforcement parameters required before June 15.</p>
              </div>
              <span className="text-[10px] text-emerald-800 bg-emerald-50 border font-mono px-2 py-0.5 rounded uppercase">Verified active</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-gray-801">AML Compliance certification logs</h5>
                <p className="text-[10px] text-gray-400 mt-0.5">Underwriting policy assessments audit matching.</p>
              </div>
              <span className="text-[10px] text-orange-850 bg-orange-100 border border-orange-200 font-mono px-2 py-0.5 rounded uppercase">Under review</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-gray-801">Claims Operational Settlement SOPs</h5>
                <p className="text-[10px] text-gray-400 mt-0.5">Assess verification files limits and pathways.</p>
              </div>
              <span className="text-[10px] text-emerald-800 bg-emerald-50 border font-mono px-2 py-0.5 rounded uppercase">Verified active</span>
            </div>
          </div>
        </div>

        {/* Right side helper info */}
        <div className="xl:col-span-4 p-5 bg-slate-900 text-slate-300 rounded-2xl border border-blue-950 space-y-4">
          <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider font-mono">Administration guidelines</h4>
          <p className="text-xs text-gray-450 leading-relaxed font-sans">
            As content owner, keep manuals and tutorials up to date to support onboarding teams acculturation paths correctly.
          </p>
          <div className="pt-2 border-t border-slate-800">
            <button 
              onClick={() => onNavigateToTab('updates')}
              className="text-xs text-white bg-orange-550 hover:bg-orange-600 px-4 py-1.5 font-bold rounded shadow-sm w-full text-center"
            >
              Post Announcements
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
