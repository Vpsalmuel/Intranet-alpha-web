import { useState } from 'react';
import { 
  Heart, 
  Activity, 
  Smile, 
  Dumbbell, 
  Sparkles, 
  Calendar, 
  PhoneCall, 
  CheckCircle, 
  User, 
  ChevronRight,
  ShieldAlert,
  Clock
} from 'lucide-react';
import { User as UserType } from '../types';

interface HealthWellbeingViewProps {
  currentUser: UserType;
}

export default function HealthWellbeingView({ currentUser }: HealthWellbeingViewProps) {
  const [activeTab, setActiveTab] = useState<'hmo' | 'mental' | 'fitness'>('hmo');

  const mindfulnessChecklist = [
    { text: 'Complete a brief 5-minute deep diaphragmatic breathing loop between workloads.' },
    { text: 'Step away from screen light for a quiet 10-minute courtyard walk.' },
    { text: 'Acknowledge at least one personal achievement or peer support moment today.' },
    { text: 'Maintain physical hydration — drink at least 2.5 litres of clear water.' }
  ];

  return (
    <div id="health-wellbeing-container" className="space-y-8 animate-fade-in pb-12">
      {/* Immersive Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-650 to-indigo-950 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-80 h-32 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="px-3 py-1 text-[10px] font-bold bg-white/10 text-emerald-250 border border-white/10 rounded-full tracking-wider uppercase inline-flex items-center gap-1.5 font-mono">
            <Heart className="w-3 text-emerald-300" /> Rex Welfare Focus
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white leading-none">
            Holistic Health & Wellbeing
          </h2>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans max-w-xl pt-1">
            Welfare at Rex Insurance spans across complete bodily security, proactive HMO management, dedicated gym days, and fully confidential, free one-on-one clinical therapy.
          </p>
        </div>
      </div>

      {/* Selector Navigation Tiles */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { id: 'hmo', label: 'HMO & Bodily Care', icon: Activity, color: 'text-emerald-600 border-emerald-100 hover:border-emerald-300' },
          { id: 'mental', label: 'Confidential Mental Health', icon: Smile, color: 'text-teal-600 border-teal-100 hover:border-teal-300' },
          { id: 'fitness', label: 'Gym Days & Run Club', icon: Dumbbell, color: 'text-indigo-600 border-indigo-100 hover:border-indigo-300' }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`p-4 md:p-6 border rounded-2xl shadow-sm text-center flex flex-col items-center justify-center gap-2 duration-150 transition-all cursor-pointer ${
                isActive 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                  : `bg-white ${item.color} text-slate-700`
              }`}
            >
              <Icon className="w-6 h-6 shrink-0" />
              <span className="text-xs font-bold font-sans tracking-tight block mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content panel based on selection */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        {activeTab === 'hmo' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b">
              <div>
                <h3 className="font-sans font-bold text-slate-900 text-base">HMO Medical Coverage & Full-Body Screenings</h3>
                <p className="text-xs text-slate-505">Every Rex Insurance employee is standard registered under our Premium medical tier.</p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold font-mono px-3 py-1 border border-emerald-150 rounded-full">
                PLAN STATUS: ACTIVE
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <h4 className="font-sans font-bold text-slate-900 text-sm">HMO Scheme Perks Includes:</h4>
                <ul className="space-y-3 text-xs text-slate-650">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-650 mt-0.5 shrink-0" />
                    <span><strong>100% Specialist Consultations:</strong> Consult qualified pediatricians, cardiologists, and ophthalmologists across 12 approved medical partner hubs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-650 mt-0.5 shrink-0" />
                    <span><strong>Full Bodily Checkups:</strong> Secure an annual comprehensive blood, screening, and diagnostic profile, 100% pre-paid of record.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-650 mt-0.5 shrink-0" />
                    <span><strong>Extended Pharmacy Allocation:</strong> Prescribed chronic drugs, medications, and therapeutic supplies are fully covered via card scan.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Need a Physical Care Approval?</h4>
                <p className="text-xs text-[#1E2D64] leading-relaxed">
                  Log on to the official partner medical portal, enter your personal employee identity number listed on your profile card, and request immediate authorization.
                </p>
                
                <div className="p-4 bg-white rounded-xl border border-slate-150 space-y-2 text-[11px] text-slate-550 leading-normal">
                  <span className="block font-bold text-slate-800">Support Primary Ingress:</span>
                  <span className="block italic">HMO Provider helpline: +234-REX-HEALTH</span>
                  <span className="block text-slate-450 uppercase font-mono tracking-wider text-[9px] mt-1">Provider Admin: Reliance HMO Premium Core</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mental' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b">
              <div>
                <h3 className="font-sans font-bold text-slate-900 text-base">Free, 100% Private Clinical Therapy Support</h3>
                <p className="text-xs text-slate-505">Your cognitive peace and stress management is of extreme priority. No records are shared with HR.</p>
              </div>
              <span className="bg-teal-50 text-teal-800 text-[10px] font-bold font-mono px-3 py-1 border border-teal-150 rounded-full">
                CONFIDENTIALITY GUARANTEED
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Self-Guided Stress relief checklists:</h4>
                <div className="space-y-3">
                  {mindfulnessChecklist.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border rounded-xl flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-650 mt-0.5 shrink-0" />
                      <span className="text-xs font-sans text-slate-650 leading-tight">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-teal-50/25 rounded-2xl border border-teal-150 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 bg-teal-100 text-teal-800 border border-teal-200 text-[9px] font-bold font-mono uppercase rounded-full">
                    EMERGENCY THERAPY ROUTE
                  </span>
                  <h4 className="font-sans font-semibold text-slate-900 text-sm">Speak with our Corporate Psychologist</h4>
                  <p className="text-xs text-slate-505 leading-relaxed font-sans">
                    Therapy routes are fully outsourced to a partner third-party counseling firm, meaning no record logs can ever be accessed by internal HR managers. 
                  </p>
                </div>
                
                <div className="mt-4 p-4 bg-white/70 backdrop-blur rounded-xl border border-teal-100/70 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold block text-slate-800">Support Counselor Hotline</span>
                    <span className="text-xs font-mono font-bold text-teal-700 block mt-0.5">Ext: 884-PEACE</span>
                  </div>
                  <a href="tel:+234-884-PEACE" className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-sm cursor-pointer inline-flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5" /> Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fitness' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b">
              <div>
                <h3 className="font-sans font-bold text-slate-900 text-base">Corporate Gym Partner Discounts & Run Club</h3>
                <p className="text-xs text-slate-505">We provide corporate funding and matching to keep you physically fit and energized.</p>
              </div>
              <span className="bg-indigo-50 text-indigo-800 text-[10px] font-bold font-mono px-3 py-1 border border-indigo-150 rounded-full">
                EVERY WEDNESDAY & FRIDAY
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Our Fitness Partnerships:</h4>
                <div className="space-y-3">
                  <div className="p-4 border rounded-xl flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-650 flex items-center justify-center shrink-0">
                      <Dumbbell className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">75% Gym Membership Match</h5>
                      <p className="text-[11px] text-slate-455 mt-1 leading-relaxed font-sans">
                        Enjoy deep corporate subsidies at registered partner fitness centers (SkyFit Luxury, Extreme Gym, and Elite Wellness Centers). Speak to HR to activate your access key.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border rounded-xl flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-650 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">Weekly Wednesday Run Club</h5>
                      <p className="text-[11px] text-slate-455 mt-1 leading-relaxed font-sans">
                        Join your peer colleagues at 5:15 PM every Wednesday evening for flat 5K and 3K wellness routes in the financial estate. Bottled drinks, hydration packs, and merchandise provided!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-wider text-indigo-600 font-bold block mb-1">
                    ★ NEXT FITNESS ADVENTURE
                  </span>
                  <h4 className="font-sans font-bold text-slate-900 text-sm">Monthly Hiking Challenge (Lekki Conservation)</h4>
                  <p className="text-xs text-slate-505 leading-relaxed mt-2 font-sans">
                    Our monthly hiking, outdoor team bonding and fitness coordination event takes place this Saturday! Book your seat on the corporate commuter shuttle.
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-600" /> Saturday, June 13, 07:40 AM</span>
                    <span className="text-indigo-600 font-bold">12 slots left</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 rounded-xl border flex items-center gap-3">
        <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
        <p className="text-[11px] text-slate-500 font-sans">
          Rex Intranet health guidelines are audited and matched against national workplace occupational safety standards. If you are experiencing sudden workplace injury or extreme stress, reach out immediately to David Kojo or Sarah Jenkins on extension 999.
        </p>
      </div>

    </div>
  );
}
