import React, { useState, useMemo } from 'react';
import { 
  Grid, 
  Search, 
  Star, 
  ExternalLink, 
  Calculator, 
  ShieldCheck, 
  CreditCard, 
  Key, 
  Palette, 
  Calendar as CalendarIcon, 
  ChevronRight, 
  Maximize2, 
  X, 
  Check, 
  Sparkles, 
  Clock, 
  Plus, 
  Trash2, 
  Copy, 
  Download, 
  AlertCircle,
  HelpCircle,
  UserCheck,
  Briefcase
} from 'lucide-react';
import { User } from '../types';

interface ToolsViewProps {
  currentUser: User;
  pinnedTools: string[];
  onTogglePinTool: (tool: string) => void;
  onNavigateToTab: (tab: string) => void;
}

interface ToolItem {
  name: string;
  category: string;
  deptKey: string;
  desc: string;
  icon: any;
  interactiveKey: string;
  requiresMfa?: boolean;
}

export default function ToolsView({
  currentUser,
  pinnedTools,
  onTogglePinTool,
  onNavigateToTab
}: ToolsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'claims' | 'underwriting' | 'finance' | 'it' | 'brand' | 'hr' | 'workspace'>('all');
  const [activeInteractiveTool, setActiveInteractiveTool] = useState<string | null>(null);

  // CATEGORIZED TOOLS DATA
  const ALL_TOOLS: ToolItem[] = [
    // Claims
    { name: 'Claims Portal', category: 'Claims Ops', deptKey: 'claims', desc: 'Central portal to process customer claims, investigate payouts, and run fraud risk audits.', icon: ShieldCheck, interactiveKey: 'claims-portal' },
    { name: 'Claims SOP Docs', category: 'Claims Ops', deptKey: 'claims', desc: 'Browse the latest claims settlement standards and corporate compliance parameters.', icon: ShieldCheck, interactiveKey: 'documents' },
    { name: 'Claims Investigation Hub', category: 'Claims Ops', deptKey: 'claims', desc: 'Flag suspicious underwriting parameters or audit third-party legal files.', icon: ShieldCheck, interactiveKey: 'claims-investigation' },
    { name: 'Escalation Matrix', category: 'Claims Ops', deptKey: 'claims', desc: 'Verify authority delegation limit paths and department approval rules.', icon: ShieldCheck, interactiveKey: 'escalation' },
    
    // Underwriting
    { name: 'Underwriting Portal', category: 'Underwriting', deptKey: 'underwriting', desc: 'Examine corporate enterprise risks, set policy riders, and manage corporate pools.', icon: Calculator, interactiveKey: 'underwriting-portal' },
    { name: 'Rating Guide Engine', category: 'Underwriting', deptKey: 'underwriting', desc: 'Calculate premium rates dynamically using the authorized actuarial pricing models.', icon: Calculator, interactiveKey: 'rating-engine' },
    { name: 'Premium Assessment Tool', category: 'Underwriting', deptKey: 'underwriting', desc: 'Evaluate specific property risk factors and design multi-tiered policy quotes.', icon: Calculator, interactiveKey: 'premium-calc' },
    { name: 'Risk Approval Flow', category: 'Underwriting', deptKey: 'underwriting', desc: 'Route high-exposure risk portfolios to senior actuarial executives for consent.', icon: Calculator, interactiveKey: 'risk-flow' },

    // Finance & Treasury
    { name: 'Payment Request Portal', category: 'Finance', deptKey: 'finance', desc: 'Lodge and monitor vendor invoice payouts, treasury reports, and broker payments.', icon: CreditCard, interactiveKey: 'payment-req' },
    { name: 'Expense Reimburser', category: 'Finance', deptKey: 'finance', desc: 'Lodge interdepartmental expenses, calculate per-diems, and track VAT processing.', icon: CreditCard, interactiveKey: 'expense-calc' },
    { name: 'Vendor Payment Tracker', category: 'Finance', deptKey: 'finance', desc: 'Check automated processing cycles for external insurers and partner brokers.', icon: CreditCard, interactiveKey: 'vendor-tracker' },
    { name: 'Solvency Reports Tool', category: 'Finance', deptKey: 'finance', desc: 'Review solvency margins and underwriting ratios compliant with regulatory codes.', icon: CreditCard, interactiveKey: 'solvency' },

    // IT & Security Services
    { name: 'System Access Portal', category: 'IT & Security', deptKey: 'it', desc: 'Provision directory login accesses and manage remote VPN server environments.', icon: Key, interactiveKey: 'sys-access', requiresMfa: true },
    { name: 'Password Reset & AD Tool', category: 'IT & Security', deptKey: 'it', desc: 'Unlock active directory profiles, sync Azure accounts, and verify credential strength.', icon: Key, interactiveKey: 'password-reset' },
    { name: 'MFA Management', category: 'IT & Security', deptKey: 'it', desc: 'Setup physical authenticator devices and configure backup verification numbers.', icon: Key, interactiveKey: 'mfa' },
    { name: 'Hardware Procurement Portal', category: 'IT & Security', deptKey: 'it', desc: 'Submit specifications for core developer laptops, keyboards, and server hardware.', icon: Key, interactiveKey: 'hardware' },

    // Brand, Design & PR
    { name: 'Brand Asset Kit', category: 'Brand & PR', deptKey: 'brand', desc: 'Direct secure archive containing SVG vector logo swatches, fonts, and presentation themes.', icon: Palette, interactiveKey: 'brand-kit' },
    { name: 'Design Request Form', category: 'Brand & PR', deptKey: 'brand', desc: 'Queue corporate flyers, banners, and digital collateral for creative reviews.', icon: Palette, interactiveKey: 'design-request' },
    { name: 'PR Templates', category: 'Brand & PR', deptKey: 'brand', desc: 'Official copy bulletins, press formats, and standard marketing statements.', icon: Palette, interactiveKey: 'pr-templates' },
    { name: 'Design Assets Store', category: 'Brand & PR', deptKey: 'brand', desc: 'Browse imagery, visual models, and illustration packs cleared for social campaigns.', icon: Palette, interactiveKey: 'brand-assets' },

    // HR & Welfare
    { name: 'HR Self-Service', category: 'HR & Welfare', deptKey: 'hr', desc: 'Inspect professional payroll receipts, track corporate tax filings, and view annual reviews.', icon: UserCheck, interactiveKey: 'hr' },
    { name: 'Leave Portal', category: 'HR & Welfare', deptKey: 'hr', desc: 'Submit upcoming annual leaves, request handovers, and coordinate manager consents.', icon: UserCheck, interactiveKey: 'hr' },
    { name: 'Welfare Planner', category: 'HR & Welfare', deptKey: 'hr', desc: 'Inspect custom health check opportunities and request wellness gym passes.', icon: UserCheck, interactiveKey: 'hr' },
    { name: 'Training Hub', category: 'HR & Welfare', deptKey: 'hr', desc: 'Complete mandatory courses, security certificates, and general onboarding tracks.', icon: UserCheck, interactiveKey: 'acculturation' },

    // Workspace Services
    { name: 'Meeting Room Booking', category: 'Workspace', deptKey: 'workspace', desc: 'Reserve corporate boardroom spaces and schedule digital video coordinates.', icon: CalendarIcon, interactiveKey: 'meeting-booker' },
    { name: 'Access Badge Setup', category: 'Workspace', deptKey: 'workspace', desc: 'Provision physical NFC keycards and update access clearance to server locations.', icon: CalendarIcon, interactiveKey: 'badge-ops' },
    { name: 'Corporate Fleet Admin', category: 'Workspace', deptKey: 'workspace', desc: 'Schedule field assessment vehicles and reconcile refueling receipts.', icon: CalendarIcon, interactiveKey: 'fleet' },
    { name: 'Office Supplies Order', category: 'Workspace', deptKey: 'workspace', desc: 'Requisition stationeries, printing materials, and physical office accessories.', icon: CalendarIcon, interactiveKey: 'supplies' }
  ];

  // Search and selector filters
  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tool.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.deptKey === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Grouped Tools count
  const categoryCounts = useMemo(() => {
    const counts = { all: ALL_TOOLS.length, claims: 0, underwriting: 0, finance: 0, it: 0, brand: 0, hr: 0, workspace: 0 };
    ALL_TOOLS.forEach(tool => {
      const key = tool.deptKey as keyof typeof counts;
      if (counts[key] !== undefined) {
        counts[key]++;
      }
    });
    return counts;
  }, []);

  // Filter keys matching departments roughly
  const currentDeptKey = useMemo(() => {
    const dept = currentUser.department.toLowerCase();
    if (dept.includes('claims')) return 'claims';
    if (dept.includes('underwriting')) return 'underwriting';
    if (dept.includes('finance')) return 'finance';
    if (dept.includes('it') || dept.includes('infrastructure')) return 'it';
    if (dept.includes('brand') || dept.includes('communication')) return 'brand';
    if (dept.includes('people') || dept.includes('culture') || dept.includes('hr')) return 'hr';
    return null;
  }, [currentUser.department]);

  // Handle launch redirect or simulation
  const handleLaunchTool = (tool: ToolItem) => {
    // If it links directly to a tab in our sidebar
    if (['documents', 'acculturation', 'hr', 'requests'].includes(tool.interactiveKey)) {
      onNavigateToTab(tool.interactiveKey);
      return;
    }
    // Launch interactive simulation console
    setActiveInteractiveTool(tool.interactiveKey);
  };

  // -------------------------------------------------------------
  // SIMULATOR 1 COMPONENT: RATING GUIDE ENGINE (Underwriting)
  // -------------------------------------------------------------
  const [riskClass, setRiskClass] = useState<'Commercial Property' | 'Corporate Fleet Motor' | 'Cyber Security' | 'Marine Hull' | 'Director Indemnity'>('Commercial Property');
  const [sumInsured, setSumInsured] = useState(1500000);
  const [riskComplexity, setRiskComplexity] = useState<'low' | 'medium' | 'high'>('medium');
  const [priorClaims, setPriorClaims] = useState(0);
  const [calculatedPremium, setCalculatedPremium] = useState<any | null>(null);

  const handleCalculatePremium = () => {
    let baseRate = 0.015; // 1.5% base
    if (riskClass === 'Corporate Fleet Motor') baseRate = 0.022;
    if (riskClass === 'Cyber Security') baseRate = 0.038;
    if (riskClass === 'Marine Hull') baseRate = 0.027;
    if (riskClass === 'Director Indemnity') baseRate = 0.012;

    const modifierComplexity = riskComplexity === 'low' ? 0.8 : riskComplexity === 'high' ? 1.4 : 1.0;
    const modifierClaims = 1 + (priorClaims * 0.15); // +15% per claim

    const premium = sumInsured * baseRate * modifierComplexity * modifierClaims;
    const brokerComm = premium * 0.085; // 8.5%
    const reinsurerShare = premium * 0.60; // 60% treaty cession
    
    setCalculatedPremium({
      totalAnnual: Math.round(premium),
      brokerCommission: Math.round(brokerComm),
      allocatedCession: Math.round(reinsurerShare),
      safetyScore: Math.round(100 - (priorClaims * 15 + (riskComplexity === 'high' ? 30 : riskComplexity === 'medium' ? 10 : 0))),
      approvedAuthorityLevel: premium > 150000 ? 'Executive Board Approval Required' : premium > 50000 ? 'Senior Controller Approval' : 'Automatic Analyst Consent'
    });
  };

  // -------------------------------------------------------------
  // SIMULATOR 2 COMPONENT: EXPENSE REIMBURSER (Finance)
  // -------------------------------------------------------------
  const [receipts, setReceipts] = useState<Array<{ id: string; desc: string; category: string; amount: number; isCompliant: boolean }>>([
    { id: 'REC-01', desc: 'Site visit travel taxi fare', category: 'Transportation', amount: 45, isCompliant: true },
    { id: 'REC-02', desc: 'Overnight client assessment lodging', category: 'Lodging', amount: 180, isCompliant: true }
  ]);
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState('Transportation');
  const [newAmount, setNewAmount] = useState('');
  const [expenseSaved, setExpenseSaved] = useState(false);

  const handleAddReceipt = () => {
    if (!newDesc || !newAmount) return;
    const amt = parseFloat(newAmount);
    if (isNaN(amt) || amt <= 0) return;
    const compliance = amt <= 250; // Rex Insurance corporate single receipt limit is $250
    const rec = {
      id: `REC-0${receipts.length + 1}`,
      desc: newDesc,
      category: newCat,
      amount: amt,
      isCompliant: compliance
    };
    setReceipts([...receipts, rec]);
    setNewDesc('');
    setNewAmount('');
  };

  const handleRemoveReceipt = (id: string) => {
    setReceipts(receipts.filter(r => r.id !== id));
  };

  const totalExpenseAmount = receipts.reduce((sum, r) => sum + r.amount, 0);
  const anyNonCompliant = receipts.some(r => !r.isCompliant);

  // -------------------------------------------------------------
  // SIMULATOR 3 COMPONENT: MEETING ROOM BOOKER (Workspace)
  // -------------------------------------------------------------
  const [selectedRoom, setSelectedRoom] = useState('Silicon Amphitheatre');
  const [bookDate, setBookDate] = useState('2026-06-01');
  const [bookTime, setBookTime] = useState('11:00 AM');
  const [meetingAgenda, setMeetingAgenda] = useState('');
  const [attendeeCount, setAttendeeCount] = useState(8);
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);

  const handleBookRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingAgenda) return;
    setBookingSuccess({
      reservationId: `RES-MR-${Math.floor(1000 + Math.random() * 9000)}`,
      room: selectedRoom,
      date: bookDate,
      time: bookTime,
      hostEmail: currentUser.email,
      inviteesCount: attendeeCount,
      mfaCode: Math.floor(100000 + Math.random() * 900000)
    });
  };

  // -------------------------------------------------------------
  // SIMULATOR 4 COMPONENT: BRAND ASSET KIT (Brand & PR)
  // -------------------------------------------------------------
  const BRAND_COLORS = [
    { name: 'Heritage Navy', hex: '#1E2D64', usage: 'Primary corporate branding, layout headers.' },
    { name: 'Rex Indigo', hex: '#6366F1', usage: 'Interactive status indicators, active links, focus rings.' },
    { name: 'Warm Amber', hex: '#F59E0B', usage: 'Onboarding trackers, notices, important highlights.' },
    { name: 'Cool Slate', hex: '#64748B', usage: 'Subheadings, auxiliary text colors, borders.' },
    { name: 'Welfare Emerald', hex: '#10B981', usage: 'Completed states, safe audits, wellness indicators.' }
  ];
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  // -------------------------------------------------------------
  // SIMULATOR 5 COMPONENT: PASSWORD & MFA SECURITY CONTROL (IT)
  // -------------------------------------------------------------
  const [targetPassword, setTargetPassword] = useState('');
  const [isCopiedMfa, setIsCopiedMfa] = useState(false);

  const passwordValidationRules = useMemo(() => {
    return {
      length: targetPassword.length >= 10,
      hasUpper: /[A-Z]/.test(targetPassword),
      hasLower: /[a-z]/.test(targetPassword),
      hasNumber: /[0-9]/.test(targetPassword),
      hasSpecial: /[^A-Za-z0-9]/.test(targetPassword),
    };
  }, [targetPassword]);

  const passwordScore = useMemo(() => {
    let score = 0;
    if (passwordValidationRules.length) score += 20;
    if (passwordValidationRules.hasUpper) score += 20;
    if (passwordValidationRules.hasLower) score += 20;
    if (passwordValidationRules.hasNumber) score += 20;
    if (passwordValidationRules.hasSpecial) score += 20;
    return score;
  }, [passwordValidationRules]);

  return (
    <div className="space-y-8 animate-fade-in pb-12 font-sans">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Grid className="w-6 h-6 text-indigo-600" /> Rex Insurance App Store & Workspace Tools
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Browse and coordinate core operational utilities, configure security key rings, evaluate commercial premiums, or audit expense logs.
          </p>
        </div>

        {/* Quick Back-to-Dashboard */}
        <button 
          onClick={() => onNavigateToTab('home')}
          className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 font-sans text-xs font-bold rounded-lg hover:bg-slate-50 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <span>← Back to Dashboard & News</span>
        </button>
      </div>

      {/* 2. Pinned Quick-Launch Strip */}
      <div className="bg-gradient-to-tr from-indigo-50/20 to-slate-50/50 p-6 rounded-2xl border border-indigo-100 shadow-sm">
        <h4 className="text-xs font-bold font-mono text-indigo-700 tracking-wider uppercase mb-3 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-indigo-200 text-indigo-600" /> MY PINNED FAVORITES ({pinnedTools.length})
        </h4>
        {pinnedTools.length === 0 ? (
          <p className="text-xs text-slate-500 italic pb-1">
            No custom tools pinned yet. Hover over any application card below and click the star to pin it to your primary dashboard launcher.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {ALL_TOOLS.filter(t => pinnedTools.includes(t.name)).map((tool) => {
              const IconComp = tool.icon;
              return (
                <div 
                  key={tool.name}
                  className="bg-white p-4 rounded-xl border border-indigo-100 shadow-xs flex flex-col justify-between hover:shadow-sm transition-all relative group"
                >
                  <button 
                    onClick={() => onTogglePinTool(tool.name)}
                    className="absolute top-3 right-3 text-indigo-600 hover:text-slate-400 font-bold text-sm"
                    title="Unpin tool"
                  >
                    <Star className="w-4 h-4 fill-indigo-600 text-indigo-600" />
                  </button>
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100/50">
                      {tool.category}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 mt-2.5 flex items-center gap-2">
                      <IconComp className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{tool.name}</span>
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-1.5 leading-tight line-clamp-2">
                      {tool.desc}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleLaunchTool(tool)}
                    className="mt-4 w-full py-1.5 bg-slate-50 hover:bg-indigo-50 text-indigo-700 font-bold rounded-lg border border-slate-200 hover:border-indigo-200 text-[10px] transition-all flex items-center justify-center gap-1"
                  >
                    <span>Launch Utility</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Filter Hub & Search Area */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between border-b border-slate-100 pb-5">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
          {[
            { id: 'all', label: 'All Utilities', count: categoryCounts.all },
            { id: 'claims', label: 'Claims Ops', count: categoryCounts.claims, recommended: currentDeptKey === 'claims' },
            { id: 'underwriting', label: 'Underwriting', count: categoryCounts.underwriting, recommended: currentDeptKey === 'underwriting' },
            { id: 'finance', label: 'Finance & Treasury', count: categoryCounts.finance, recommended: currentDeptKey === 'finance' },
            { id: 'it', label: 'IT & Security', count: categoryCounts.it, recommended: currentDeptKey === 'it' },
            { id: 'brand', label: 'Brand & PR', count: categoryCounts.brand, recommended: currentDeptKey === 'brand' },
            { id: 'hr', label: 'HR & Welfare', count: categoryCounts.hr, recommended: currentDeptKey === 'hr' },
            { id: 'workspace', label: 'Workspace', count: categoryCounts.workspace }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative ${
                selectedCategory === cat.id 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="mr-1.5">{cat.label}</span>
              <span className={`text-[10px] font-mono font-bold ${selectedCategory === cat.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                {cat.count}
              </span>
              {cat.recommended && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-80 shrink-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search workspace tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-[10px]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* 4. Tools Main Catalog Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
          <Grid className="w-12 h-12 text-slate-300 mx-auto stroke-1 mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No matching tools detected</h3>
          <p className="text-xs text-slate-450 mt-1 max-w-sm mx-auto">We couldn't locate any tools matching "{searchQuery}" check again or reset category filters.</p>
          <button 
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-4 px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-all font-sans cursor-pointer"
          >
            Reset Catalog Grid
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => {
            const IconComponent = tool.icon;
            const isPinned = pinnedTools.includes(tool.name);
            const isRecommend = tool.deptKey === currentDeptKey;

            return (
              <div
                key={tool.name}
                className={`bg-white border rounded-2xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between relative group ${
                  isRecommend ? 'border-indigo-100 bg-gradient-to-tr from-white to-slate-50/20' : 'border-slate-200'
                }`}
              >
                {/* Visual Recommendation badge */}
                {isRecommend && (
                  <span className="absolute -top-2.5 left-4 px-2 py-0.5 text-[8px] font-mono font-bold uppercase bg-indigo-100 border border-indigo-200 rounded-md text-indigo-805 shadow-xs">
                    DEPARTMENT ESSENTIAL
                  </span>
                )}

                {/* Pin trigger */}
                <button
                  onClick={() => onTogglePinTool(tool.name)}
                  className={`absolute top-4 right-4 p-1.5 rounded-lg border hover:bg-slate-50 transition-all cursor-pointer ${
                    isPinned 
                      ? 'border-amber-250 bg-amber-50/40 text-amber-500' 
                      : 'border-slate-100 text-slate-300 group-hover:text-slate-400'
                  }`}
                  title={isPinned ? 'Unpin from dashboard' : 'Pin to dashboard'}
                >
                  <Star className={`w-3.5 h-3.5 ${isPinned ? 'fill-amber-400 text-amber-500' : ''}`} />
                </button>

                <div className="pt-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-indigo-650 shrink-0 select-none">
                      <IconComponent className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                        {tool.name}
                      </h4>
                      <span className="text-[9px] text-slate-400 font-mono font-bold uppercase">
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-505 mt-4 leading-relaxed font-sans">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-50">
                  <button
                    onClick={() => handleLaunchTool(tool)}
                    className="w-full px-3 py-2 bg-indigo-50 text-indigo-700 border border-indigo-100/50 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                  >
                    <span>Launch Application</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* -------------------------------------------------------------
          INTERACTIVE SIMULATOR DRAWER / OVERLAY
      ------------------------------------------------------------- */}
      {activeInteractiveTool && (
        <div className="fixed inset-0 z-55 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-950 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
                  <Grid className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm tracking-tight">
                    Simulated Console: {ALL_TOOLS.find(t => t.interactiveKey === activeInteractiveTool)?.name}
                  </h3>
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-indigo-400">
                    Sovereign Rex Insurance Sandbox Environment
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveInteractiveTool(null);
                  setCalculatedPremium(null);
                  setBookingSuccess(null);
                  setExpenseSaved(false);
                }}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Simulator body */}
            <div className="p-6 flex-1 overflow-y-auto bg-slate-50/50">

              {/* 1. RATING ENGINE (UNDERWRITING) */}
              {activeInteractiveTool === 'rating-engine' && (
                <div className="space-y-6">
                  <div className="bg-indigo-50 p-4 border border-indigo-100 rounded-xl text-indigo-805 text-xs">
                    <p className="font-bold flex items-center gap-1.5 mb-1 text-slate-905">
                      <Sparkles className="w-4 h-4 text-indigo-600" /> Rex Insurance Actuarial Rating Guidelines (Directive v4.2)
                    </p>
                    Evaluate premium requirements based on selected class of risk, sum insured volume, and history of claim events. Modifiers are automatically calibrated based on compliance risk weights.
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">RISK CHARACTERISTICS</h4>
                      
                      <div>
                        <label className="text-[10px] font-bold text-slate-550 block mb-1 font-mono uppercase">Class of Insurance Pool</label>
                        <select
                          value={riskClass}
                          onChange={(e: any) => setRiskClass(e.target.value)}
                          className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded px-2.5 py-1.5 font-sans"
                        >
                          <option value="Commercial Property">Commercial Property (Fire & Spill)</option>
                          <option value="Corporate Fleet Motor">Corporate Fleet Motor (Mass Transport)</option>
                          <option value="Cyber Security">Cyber Security (Ransomware & Breach)</option>
                          <option value="Marine Hull">Marine Hull & Cargo Cargo</option>
                          <option value="Director Indemnity">Director & Officer Indemnity Risk</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-550 block mb-1 font-mono uppercase">Sum Insured Pool ($)</label>
                        <input
                          type="number"
                          value={sumInsured}
                          onChange={(e) => setSumInsured(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded px-2.5 py-1.5 font-sans"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-550 block mb-1 font-mono uppercase">Risk Complexity</label>
                          <div className="flex gap-1.5">
                            {(['low', 'medium', 'high'] as const).map((r) => (
                              <button
                                key={r}
                                onClick={() => setRiskComplexity(r)}
                                className={`flex-1 py-1 text-[10px] font-bold uppercase rounded ${
                                  riskComplexity === r ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-550 block mb-1 font-mono uppercase">Prior Claims (3 yrs)</label>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={priorClaims}
                            onChange={(e) => setPriorClaims(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded px-2.5 py-1.5 font-sans"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleCalculatePremium}
                        className="w-full py-2 bg-indigo-600 hover:bg-slate-900 text-white rounded-lg text-xs font-bold mt-4 transition-all"
                      >
                        Run System Risk Assessment
                      </button>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-3">ACTUARIAL SUMMARY REPORTS</h4>
                        
                        {!calculatedPremium ? (
                          <div className="text-center py-10">
                            <Calculator className="w-10 h-10 text-slate-300 mx-auto stroke-1" />
                            <p className="text-[10px] text-slate-450 mt-2">Adjust details and launch assessment calculations above.</p>
                          </div>
                        ) : (
                          <div className="space-y-4 font-mono text-xs">
                            <div className="p-3 bg-slate-50 border rounded border-slate-100 flex justify-between items-center">
                              <span>ANNUAL DECLARED PREMIUM:</span>
                              <strong className="text-sm text-indigo-650">${calculatedPremium.totalAnnual.toLocaleString()}</strong>
                            </div>

                            <div className="border-b border-dashed border-slate-150 pb-2 space-y-1.5 text-[10px] text-slate-505">
                              <div className="flex justify-between">
                                <span>Core Broker Commission (8.5%):</span>
                                <strong className="text-slate-700">${calculatedPremium.brokerCommission.toLocaleString()}</strong>
                              </div>
                              <div className="flex justify-between">
                                <span>Treaty Reinsurance Cession Share (60%):</span>
                                <strong className="text-slate-700">${calculatedPremium.allocatedCession.toLocaleString()}</strong>
                              </div>
                              <div className="flex justify-between">
                                <span>Safety Score Weight:</span>
                                <strong className={calculatedPremium.safetyScore < 60 ? 'text-red-650' : 'text-emerald-650'}>
                                  {calculatedPremium.safetyScore}/100
                                </strong>
                              </div>
                            </div>

                            <div className="p-2.5 border rounded border-indigo-150 bg-indigo-50/20 text-[10px]">
                              <span className="block text-indigo-705 uppercase tracking-wider text-[8px] font-bold mb-0.5">Approval Hierarchy:</span>
                              <strong className="text-indigo-905">{calculatedPremium.approvedAuthorityLevel}</strong>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="text-[10px] text-slate-450 mt-4 leading-normal">
                        Rating Guide Simulator calibrated on Lloyd's liability indexes for UK and Nigeria risk tables.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. EXPENSE REIMBURSER (FINANCE) */}
              {activeInteractiveTool === 'expense-calc' && (
                <div className="space-y-6">
                  <div className="bg-amber-50 p-4 border border-amber-100 rounded-xl text-amber-900 text-xs">
                    <p className="font-bold mb-1">Rex Insurance Inter-Dept Expense Reconciliation Policy</p>
                    Staff can log travel, taxi, client catering, and physical supplies expenses. Non-compliant receipts (over $250 limit) will require mandatory manager audit before reimbursement approval.
                  </div>

                  <div className="grid md:grid-cols-12 gap-6">
                    {/* Add list and items */}
                    <div className="md:col-span-7 bg-white p-5 rounded-xl border border-slate-205 space-y-4">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-2">ADD EXPENDITURE RECEIPT</h4>
                      
                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-6">
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Receipt Description</label>
                          <input
                            type="text"
                            placeholder="e.g. Lunch with Broker"
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                            className="w-full text-xs text-slate-850 bg-white border border-slate-200 rounded px-2.5 py-1.5 font-sans"
                          />
                        </div>
                        <div className="col-span-3">
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Category</label>
                          <select
                            value={newCat}
                            onChange={(e) => setNewCat(e.target.value)}
                            className="w-full text-xs text-slate-850 bg-white border border-slate-200 rounded px-2 py-1.5 font-sans"
                          >
                            <option value="Transportation">Transportation</option>
                            <option value="Lodging">Lodging</option>
                            <option value="Catering">Catering</option>
                            <option value="Supplies">Supplies</option>
                          </select>
                        </div>
                        <div className="col-span-3">
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Amount ($)</label>
                          <input
                            type="number"
                            placeholder="Amount"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                            className="w-full text-xs text-slate-850 bg-white border border-slate-200 rounded px-2 py-1.5 font-sans"
                          />
                        </div>
                      </div>
                      
                      <button
                        onClick={handleAddReceipt}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer font-sans"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Register Expenditure Item</span>
                      </button>

                      {/* Item list */}
                      <div className="space-y-2 mt-4">
                        <h4 className="text-[10px] font-bold text-slate-550 uppercase tracking-wider font-mono">LODGED RECEIPT ITEMS ({receipts.length})</h4>
                        {receipts.length === 0 ? (
                          <div className="text-center py-6 text-slate-400 text-xs">No receipts added. Complete form above.</div>
                        ) : (
                          <div className="max-h-52 overflow-y-auto space-y-1.5">
                            {receipts.map((rec) => (
                              <div key={rec.id} className="p-3 border border-slate-100 rounded-lg flex items-center justify-between text-xs bg-slate-50/50">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-[9px] text-slate-400">{rec.id}</span>
                                    <strong className="text-slate-800 truncate">{rec.desc}</strong>
                                    <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-[9px] text-slate-500">{rec.category}</span>
                                  </div>
                                  <div className="text-[10px] mt-1 text-slate-400">
                                    Limit Status: <span className={rec.isCompliant ? 'text-emerald-650 font-bold' : 'text-red-650 font-bold'}>
                                      {rec.isCompliant ? 'Compliant' : 'Requires Manager Out-off-policy Waiver'}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 ml-2">
                                  <strong className="text-slate-900">${rec.amount}</strong>
                                  <button onClick={() => handleRemoveReceipt(rec.id)} className="text-red-500 hover:text-red-700">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Total compliance and Submit status */}
                    <div className="md:col-span-5 bg-white p-5 rounded-xl border border-slate-205 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-3">RECONCILIATION SUMMARY</h4>
                        
                        <div className="p-4 bg-slate-50 rounded-xl space-y-4">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-mono text-slate-500">Total Claimable Sum:</span>
                            <strong className="text-lg text-slate-900 font-mono">${totalExpenseAmount.toLocaleString()}</strong>
                          </div>

                          <div className="text-[10px]">
                            <span className="block text-slate-500 font-bold mb-1">Compliance Health Flag:</span>
                            {anyNonCompliant ? (
                              <div className="p-2 border border-red-200 bg-red-50 rounded text-red-750 flex items-start gap-1.5">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>High Value Items Detect. This sheet will flag manual compliance audits on manager console.</span>
                              </div>
                            ) : (
                              <div className="p-2 border border-emerald-200 bg-emerald-50 rounded text-emerald-850 flex items-start gap-1.5">
                                <Check className="w-4 h-4 shrink-0" />
                                <span>All items comply with single voucher spending limits. Automatic disbursement approved after post.</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {expenseSaved ? (
                          <div className="p-3 border border-emerald-150 bg-emerald-50/20 text-emerald-800 rounded-lg text-xs mt-4 flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-emerald-650 shrink-0" />
                            <span>Expense claim sheet successfully posted to Treasury router! Process index ID: EXP-{Math.floor(22000 + Math.random() * 5000)}</span>
                          </div>
                        ) : (
                          <button
                            disabled={receipts.length === 0}
                            onClick={() => setExpenseSaved(true)}
                            className="w-full py-2 bg-indigo-605 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all text-xs font-bold mt-4 cursor-pointer disabled:opacity-50"
                          >
                            Post Voucher to Finance Ledger
                          </button>
                        )}
                      </div>

                      <div className="text-[9px] text-slate-400 mt-4 leading-normal font-mono uppercase">
                        AUTHORIZED REIMBURSEMENT SYSTEM V2.6 • METROPULSE FINANCIAL GROUP
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. MEETING ROOM BOOKER (WORKSPACE) */}
              {activeInteractiveTool === 'meeting-booker' && (
                <div className="space-y-6">
                  <div className="bg-indigo-50 p-4 border border-indigo-100 rounded-xl text-indigo-805 text-xs">
                    <p className="font-bold mb-1">Corporate Room Scheduling Rules</p>
                    Reserve physical office rooms or creative lounges. Scheduled bookings generate direct Microsoft Teams conference identifiers and coordinate badge clearance for visitors automatically.
                  </div>

                  <form onSubmit={handleBookRoom} className="grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-7 bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">RESERVATION SPECS</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Conference Room Location</label>
                          <select
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                            className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded px-2.5 py-1.5 font-sans"
                          >
                            <option>Boardroom Alpha (16 seats)</option>
                            <option>Silicon Amphitheatre (50 seats)</option>
                            <option>Creative Lab 305 (8 seats)</option>
                            <option>Quiet Focus Annex (4 seats)</option>
                            <option>Victoria Hawthorne's Lounge (6 seats)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Guest Attendance Limit</label>
                          <input
                            type="number"
                            min="2"
                            max="60"
                            value={attendeeCount}
                            onChange={(e) => setAttendeeCount(Math.max(2, parseInt(e.target.value) || 2))}
                            className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded px-2.5 py-1.5 font-sans"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Target Reservation Date</label>
                          <input
                            type="date"
                            value={bookDate}
                            onChange={(e) => setBookDate(e.target.value)}
                            className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded px-2.5 py-1.5 font-sans"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase">Hourly Slot Session</label>
                          <select
                            value={bookTime}
                            onChange={(e) => setBookTime(e.target.value)}
                            className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded px-2.5 py-1.5 font-sans"
                          >
                            <option>09:00 AM - 10:00 AM</option>
                            <option>10:00 AM - 11:30 AM</option>
                            <option>11:30 AM - 01:00 PM</option>
                            <option>01:00 PM - 02:00 PM</option>
                            <option>02:00 PM - 03:30 PM</option>
                            <option>03:30 PM - 05:00 PM</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-500 block mb-0.5 uppercase font-mono">Meeting Agenda & Handover Notes</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Provide descriptive agenda for attendees..."
                          value={meetingAgenda}
                          onChange={(e) => setMeetingAgenda(e.target.value)}
                          className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded px-2.5 py-1.5 font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-indigo-650 hover:bg-indigo-700 text-indigo-705 text-xs font-bold font-sans rounded-lg transition-all border border-indigo-200 hover:text-white hover:border-indigo-600 block cursor-pointer"
                      >
                        Consent & Reserve Boardroom
                      </button>
                    </div>

                    <div className="md:col-span-5 bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-3">CONFERENCE LOG</h4>
                        
                        {!bookingSuccess ? (
                          <div className="text-center py-12">
                            <CalendarIcon className="w-10 h-10 text-slate-300 mx-auto stroke-1" />
                            <p className="text-[10px] text-slate-450 mt-2">Adjust details and launch reserving sessions above.</p>
                          </div>
                        ) : (
                          <div className="space-y-4 text-xs font-mono">
                            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800">
                              <div className="flex items-center gap-1.5 font-bold mb-1">
                                <Check className="w-4 h-4 text-emerald-600" /> Room Reserved Successfully!
                              </div>
                              Reservation ID: <strong className="font-bold">{bookingSuccess.reservationId}</strong>
                            </div>

                            <div className="space-y-1.5 text-[10px] border-b border-dashed pb-3 text-slate-505">
                              <div><strong>Assigned Location:</strong> {bookingSuccess.room}</div>
                              <div><strong>Schedule:</strong> {bookingSuccess.date} at {bookingSuccess.time}</div>
                              <div><strong>Requested Host:</strong> {bookingSuccess.hostEmail}</div>
                              <div><strong>Attendees Limit:</strong> {bookingSuccess.inviteesCount} invites generated</div>
                            </div>

                            <div className="bg-slate-50 border border-slate-100 p-2 text-center rounded">
                              <span className="block text-[8px] text-slate-405 uppercase font-mono tracking-wider">Screen QR Badge Entry PIN</span>
                              <strong className="text-slate-800 text-sm tracking-widest">{bookingSuccess.mfaCode}</strong>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="text-[9px] text-slate-400 mt-4 font-mono">
                        METROPULSE INTRANET CALENDAR SERVICES
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* 4. BRAND ASSET KIT (BRAND & PR) */}
              {activeInteractiveTool === 'brand-kit' && (
                <div className="space-y-6">
                  <div className="bg-slate-900 p-4 text-slate-100 rounded-xl text-xs">
                    <p className="font-bold text-indigo-400 mb-1">Rex Corporate Brand Identity Library</p>
                    Ensure legal visual compliance across all external flyers, claims spreadsheets, and marketing materials. Below are approved hex values and active assets.
                  </div>

                  <div className="space-y-5">
                    {/* Colors */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-3">APPROVED BRAND COLOR PALETTE</h4>
                      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-3">
                        {BRAND_COLORS.map((col) => (
                          <div key={col.name} className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-between h-34 shadow-xs relative group">
                            <div>
                              <div className="h-10 w-full rounded border border-slate-100" style={{ backgroundColor: col.hex }} />
                              <h5 className="text-[10px] font-bold text-slate-800 mt-2 truncate">{col.name}</h5>
                              <code className="text-[9px] text-slate-400 block font-mono mt-0.5">{col.hex}</code>
                            </div>
                            <button
                              onClick={() => handleCopyColor(col.hex)}
                              className="mt-2 w-full py-1 bg-slate-50 hover:bg-slate-105 text-[9px] hover:text-indigo-650 font-bold font-mono rounded border border-slate-200 flex items-center justify-center gap-1 transition-all"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedColor === col.hex ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Logos and Mock download */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-3">VECTOR LOGO PACKS</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                          <div>
                            <strong className="text-slate-800 block">Rex Primary Logo (High-Res)</strong>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Vector SVG and PNG 300dpi • Transparent background</span>
                          </div>
                          <button 
                            onClick={() => alert('Mocking Download: metropulse_logo_pack.zip successfully saved to temporary folder!')}
                            className="p-2 bg-indigo-50 border border-indigo-100 hover:bg-indigo-600 hover:text-white rounded-lg text-indigo-700 transition-all cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                          <div>
                            <strong className="text-slate-800 block">Keynote & PPT Slide Templates v2.6</strong>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Ready-to-use Corporate presentation slide deck format</span>
                          </div>
                          <button 
                            onClick={() => alert('Mocking Download: metropulse_pitch_template_2026.potx saved successfully!')}
                            className="p-2 bg-indigo-50 border border-indigo-100 hover:bg-indigo-600 hover:text-white rounded-lg text-indigo-700 transition-all cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. PASSWORDS & SECURITY CONTROL (IT) */}
              {activeInteractiveTool === 'password-reset' && (
                <div className="space-y-6">
                  <div className="bg-slate-900 p-4 text-slate-100 rounded-xl text-xs">
                    <p className="font-bold text-rose-450 mb-1">Rex Corporate Password Audit Station</p>
                    All active passwords must possess minimum 10 characters, combining special items, digits, and capitalizations. Test your password resilience rating below before pushing to active directory.
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">ENTER EXPERIMENTAL KEY</h4>
                      <div>
                        <label className="text-[10px] font-bold text-slate-550 block mb-1 font-mono uppercase">Experimental AD Password</label>
                        <input
                          type="text"
                          placeholder="Type simulated password..."
                          value={targetPassword}
                          onChange={(e) => setTargetPassword(e.target.value)}
                          className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                        />
                      </div>

                      {/* Rules checks */}
                      <div className="space-y-1.5 text-[11px] font-mono text-slate-600">
                        <div className="flex items-center gap-2">
                          <span className={passwordValidationRules.length ? 'text-emerald-600' : 'text-slate-450'}>
                            {passwordValidationRules.length ? '✓' : '✗'} Contains 10+ characters
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={passwordValidationRules.hasUpper ? 'text-emerald-600' : 'text-slate-450'}>
                            {passwordValidationRules.hasUpper ? '✓' : '✗'} Contains Uppercase [A-Z]
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={passwordValidationRules.hasLower ? 'text-emerald-605' : 'text-slate-450'}>
                            {passwordValidationRules.hasLower ? '✓' : '✗'} Contains Lowercase [a-z]
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={passwordValidationRules.hasNumber ? 'text-emerald-605' : 'text-slate-450'}>
                            {passwordValidationRules.hasNumber ? '✓' : '✗'} Contains Numbers [0-9]
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={passwordValidationRules.hasSpecial ? 'text-emerald-605' : 'text-slate-450'}>
                            {passwordValidationRules.hasSpecial ? '✓' : '✗'} Contains Special Character (e.g. !@#$)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-3">SECURITY RATING REPORT</h4>
                        <div className="p-4 bg-slate-50 rounded-xl space-y-4">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-mono text-slate-500">Resilience Index Score:</span>
                            <strong className={`text-sm font-mono ${passwordScore >= 100 ? 'text-emerald-650' : passwordScore >= 60 ? 'text-amber-650' : 'text-rose-650'}`}>
                              {passwordScore}%
                            </strong>
                          </div>

                          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${passwordScore >= 100 ? 'bg-emerald-500' : passwordScore >= 60 ? 'bg-amber-400' : 'bg-rose-500'}`} 
                              style={{ width: `${passwordScore}%` }} 
                            />
                          </div>

                          <div className="text-[10px] text-slate-405 mt-2 leading-relaxed font-sans">
                            {passwordScore >= 100 ? (
                              <span className="text-emerald-700 font-bold block">Strong password compliant with 2026 ISO IT and GDPR active directories. Eligible for push!</span>
                            ) : (
                              <span className="text-rose-700 font-bold block">Insecure password. Push blocks active. Re-verify specifications rules left.</span>
                            )}
                          </div>
                        </div>

                        {passwordScore >= 100 && (
                          <button
                            onClick={() => {
                              alert('Active Directory Mock status: Key rotated successfully across Rex SSO.');
                              setTargetPassword('');
                            }}
                            className="mt-4 w-full py-2 bg-indigo-650 hover:bg-indigo-700 text-indigo-705 text-xs font-bold rounded-lg border border-indigo-200 hover:text-white hover:border-indigo-600 transition-all cursor-pointer font-sans"
                          >
                            Commit Rotated Key to Microsoft Azure
                          </button>
                        )}
                      </div>

                      <div className="text-[8px] text-slate-450 mt-4 leading-normal font-mono">
                        SYSTEM ACCESS WORKSPACE SECURITY MODULES
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MOCK GENERIC FALLBACK SIMULATOR */}
              {['claims-portal', 'claims-investigation', 'escalation', 'underwriting-portal', 'risk-flow', 'premium-calc', 'vendor-tracker', 'solvency', 'sys-access', 'mfa', 'hardware', 'design-request', 'pr-templates', 'brand-assets', 'badge-ops', 'fleet', 'supplies', 'payment-req'].includes(activeInteractiveTool) && (
                <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto stroke-1 mb-3" />
                  <h4 className="text-sm font-bold text-slate-800">Operational Utility Launched</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    The requested internal system link "<strong>{ALL_TOOLS.find(t => t.interactiveKey === activeInteractiveTool)?.name}</strong>" is fully active on the Rex Virtual intranet router.
                  </p>
                  
                  <div className="my-6 p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 font-mono text-left inline-block max-w-sm">
                    <div className="text-[10px] text-slate-450 uppercase">Environment Telemetry Data</div>
                    <div className="text-[11px] text-slate-700">Target URL Key: https://rexinsurance.internal/apps/{activeInteractiveTool}</div>
                    <div className="text-[11px] text-slate-705">Authorized Role Context: {currentUser.role.toUpperCase()}</div>
                    <div className="text-[11px] text-slate-705">System Ingress Port: 3000 SSL (Proxy Secure Router)</div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => alert(`Redirect simulation active: Initializing iframe tunneling key to https://metropulse.internal/apps/${activeInteractiveTool}`)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-750 text-white font-sans text-xs font-bold rounded-lg shadow-sm cursor-pointer"
                    >
                      Authenticate SSO Port Ingress
                    </button>
                    <button
                      onClick={() => {
                        setActiveInteractiveTool(null);
                      }}
                      className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-sans text-xs font-bold rounded-lg hover:bg-slate-50 shadow-xs cursor-pointer"
                    >
                      Close Connection
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
              <span>Rex Intranet SSO Active (Token Expires: 4h)</span>
              <span>Secure Client Tunnel (Nginx Router)</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
