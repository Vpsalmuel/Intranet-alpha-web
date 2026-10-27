import { useState } from 'react';
import { 
  Sparkles, 
  Coins, 
  TrendingUp, 
  Award, 
  Compass, 
  ChevronRight, 
  ShieldCheck, 
  Briefcase, 
  Heart,
  DollarSign,
  Lock,
  ArrowRight
} from 'lucide-react';
import { User } from '../types';

interface RewardsBenefitsViewProps {
  currentUser: User;
}

export default function RewardsBenefitsView({ currentUser }: RewardsBenefitsViewProps) {
  const [selectedTrack, setSelectedTrack] = useState<'claims' | 'underwriting' | 'general'>('claims');

  const benefitPerks = [
    {
      title: 'Pension Scheme matching',
      desc: 'Rex Insurance matches employee pension contributions up to 8% base salary to secure your comfortable retirement foundation.',
      icon: Lock,
      color: 'bg-orange-50 border-orange-100 text-orange-600'
    },
    {
      title: 'Annual Performance Bonuses',
      desc: 'A discretionary multiplier ranging between 5% to 20% of base salary, calculated based on corporate precision and individual milestones met.',
      icon: Coins,
      color: 'bg-emerald-50 border-emerald-100 text-emerald-600'
    },
    {
      title: 'Fast-Track Promotions',
      desc: 'Our peer-reviewed bi-annual appraisal cycles highlight top performing staff for accelerated corporate tier advancement.',
      icon: TrendingUp,
      color: 'bg-indigo-50 border-indigo-100 text-indigo-600'
    }
  ];

  const careerSteps = {
    claims: [
      { level: 'Tier 1', title: 'Junior Claims Analyst', requirement: 'Complete guided onboarding checklist and 3 standard LMS modules.' },
      { level: 'Tier 2', title: 'Claims Assessor / Specialist', requirement: 'Manage an average processing timeline of under 4 days with 98% audit compliance score.' },
      { level: 'Tier 3', title: 'Senior Claims Underwriter', requirement: 'Lead complex large-commercial property settlements ($200k+) and buddy junior analysts.' },
      { level: 'Tier 4', title: 'Claims Team Operations Lead', requirement: 'Direct corporate policyholder strategies and coordinate fast-track digital routing systems.' }
    ],
    underwriting: [
      { level: 'Tier 1', title: 'Underwriting Associate', requirement: 'Configure standard actuarial rating tools and pass basic compliance ratings.' },
      { level: 'Tier 2', title: 'Risk Analyst Assessor', requirement: 'Structure standard liability risk weights with direct underwriting authority up to $100k.' },
      { level: 'Tier 3', title: 'Director of Risk Placements', requirement: 'Formulate macro actuarial pricing directives, managing reinsurance broker tunnels.' }
    ],
    general: [
      { level: 'Tier 1', title: 'Support & Associates', requirement: 'Successfully fulfill initial role responsibilities and departmental compliance milestones.' },
      { level: 'Tier 2', title: 'Senior Officers / Specialists', requirement: 'Maintain strong internal ratings, driving team projects and operational efficiency.' },
      { level: 'Tier 3', title: 'Principal Executive Lead', requirement: 'Direct interdepartmental workflows, budget reconcile audits, and leadership portfolios.' }
    ]
  };

  return (
    <div id="rewards-benefits-container" className="space-y-8 animate-fade-in pb-12">
      {/* Upper Banner Accent */}
      <div className="bg-white border rounded-2xl p-8 relative overflow-hidden shadow-sm border-slate-200">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="px-3 py-1 text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-150 rounded-full tracking-wider uppercase inline-flex items-center gap-1.5 shadow-sm mb-3">
              <Award className="w-3" /> COMPENSATION & BENCHMARKS
            </span>
            <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-slate-900">
              Your Rewards & Welfare Hub
            </h2>
            <p className="text-xs text-slate-500 mt-2 max-w-xl font-sans leading-relaxed">
              Explore your corporate salary benchmarks, active pension funds, discretionary performance bonuses, and our clear multi-tiered career promotion paths.
            </p>
          </div>

          <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl flex items-center gap-4 shadow-sm shrink-0">
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900 leading-tight">Pay Review Cycle</h5>
              <p className="text-[10px] text-slate-400 mt-0.5">Next scheduled audit: October 2026</p>
              <span className="text-[9px] text-[#1E2D64] font-bold block mt-1">• bi-annual appraisal system</span>
            </div>
          </div>
        </div>
      </div>

      {/* Welfare Pillars row */}
      <div className="grid md:grid-cols-3 gap-6">
        {benefitPerks.map((perk, index) => {
          const Icon = perk.icon;
          return (
            <div key={index} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${perk.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold font-sans text-slate-950 text-sm">{perk.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{perk.desc}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-4 text-[10px] text-slate-400 font-mono">
                SECURE COMPENSATION CLAUSE
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Career Progression pathways */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b">
          <div>
            <h3 className="font-sans font-bold text-slate-900 text-base">Corporate Growth & Promotion Tracks</h3>
            <p className="text-xs text-slate-505">Select a career track below to map out the exact progression tiers and promotion criteria.</p>
          </div>
          
          <div className="flex gap-2.5 bg-slate-100 p-1 rounded-xl">
            {(['claims', 'underwriting', 'general'] as const).map((track) => (
              <button
                key={track}
                onClick={() => setSelectedTrack(track)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all capitalize cursor-pointer ${
                  selectedTrack === track 
                    ? 'bg-white shadow text-slate-900' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        {/* Timelines progression indicator */}
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <div className="relative border-l border-slate-200 pl-6 ml-4 space-y-6">
              {careerSteps[selectedTrack].map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Circle locator */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border bg-white group-hover:scale-110 duration-150 transition-all flex items-center justify-center border-orange-500">
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                  </div>
                  
                  <div className="p-4 border rounded-xl bg-slate-50/10 hover:bg-slate-50/65 border-slate-200 transition-all">
                    <div className="flex justify-between items-center text-[10px] font-mono mb-1 text-slate-450 uppercase">
                      <span>{step.level}</span>
                      {currentUser.jobTitle === step.title && (
                        <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-150 text-indigo-700 font-bold rounded">your current tier</span>
                      )}
                    </div>
                    <h4 className="font-sans font-bold text-slate-900 text-sm flex items-center gap-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-normal mt-1 max-w-2xl font-sans">
                      <strong className="text-slate-700 block mb-0.5">Qualification Target:</strong> {step.requirement}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <span className="inline-block px-2.5 py-0.5 bg-orange-500/10 text-orange-700 border border-orange-200 text-[9px] font-bold font-mono tracking-wider uppercase rounded-full">
              PROMOTION AUDIT ADVISORY
            </span>
            <p className="text-xs text-slate-500 leading-normal">
              Our appraisal committees meet every June and December. Ensure your self-appraisals are submitted of record under the general HR portal, backed by claims compliance logs.
            </p>
            <div className="p-3 bg-white border border-slate-150 rounded-xl space-y-1.5 font-mono text-[10px] leading-relaxed">
              <span className="block text-slate-450">APPRAISAL KEYWORD MARKS:</span>
              <span className="block text-emerald-600 font-bold">✓ Compliance Check: Complete</span>
              <span className="block text-emerald-600 font-bold">✓ Training Progress: Satisfactory</span>
              <span className="block text-slate-650">✓ Peer Buddy recommendation: Yes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
