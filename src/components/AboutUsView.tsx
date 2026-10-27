import { Sparkles, Target, Compass, Heart, Shield, Award, Users, MapPin, Building, Globe } from 'lucide-react';
import { User } from '../types';

interface AboutUsViewProps {
  currentUser: User;
}

export default function AboutUsView({ currentUser }: AboutUsViewProps) {
  const coreValues = [
    {
      icon: Heart,
      title: 'Empathy First',
      color: 'text-rose-500 bg-rose-50 border-rose-100',
      description: 'We treat every claim as a human story, not a ledger entry. Our commitment to policyholders is built on deep compassion and support when they need us most.'
    },
    {
      icon: Shield,
      title: 'Uncompromising Integrity',
      color: 'text-emerald-500 bg-emerald-50 border-emerald-100',
      description: 'Honesty is our ultimate compliance standard. We operate with absolute transparency, securing private trust and regulatory alignment across all operations.'
    },
    {
      icon: Target,
      title: 'Absolute Precision',
      color: 'text-amber-500 bg-amber-50 border-amber-100',
      description: 'Through modern digital actuarial models and structured risk assessments, we execute our underwriting and claim processes with unparalleled accuracy.'
    },
    {
      icon: Users,
      title: 'Collective Strength',
      color: 'text-indigo-500 bg-indigo-50 border-indigo-100',
      description: 'We cooperate cross-functionally across claims, underwriting, and IT, combining our perspectives to foster a world-class workspace.'
    }
  ];

  return (
    <div id="about-us-container" className="space-y-8 animate-fade-in pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-orange-600 via-red-650 to-[#2e1065] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-80 h-40 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="px-3 py-1 text-[10px] font-bold bg-white/10 text-orange-200 border border-white/10 rounded-full tracking-wider uppercase inline-flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3 h-3 text-orange-300 fill-orange-200 animate-pulse" /> 
            Our Sacred Covenant
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
            Protecting What Matters, Driven by Humility & Precision
          </h2>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-2xl pt-2">
            Rex Insurance represents over fifteen years of financial stewardship, combining state-of-the-art technological risk-rating with deeply empathetic claims settlement.
          </p>
        </div>
      </div>

      {/* Mission & Vision Bento Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Mission Statement Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-bold text-slate-900 text-xl tracking-tight">Our Mission</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              To provide robust, resilient financial security and protective underwriting to families and enterprises, delivering lightning-fast, high-integrity claim settlements through specialized digital workflow systems, enabling policyholders to pursue their potential without fear.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-450 font-mono">
            <span>Guiding Directive #MX-109</span>
            <span className="text-orange-600 font-bold uppercase tracking-wider">Strategic Intent</span>
          </div>
        </div>

        {/* Vision Statement Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-bold text-slate-900 text-xl tracking-tight">Our Vision</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              To be recognized as the premier technology-driven multi-line insurer in the hemisphere, leading on transaction transparent audits, reducing actuarial approval timescales by our smart claim routing systems, and cultivating a diverse workspace where staff excel and customer trust remains unshakeable.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-450 font-mono">
            <span>Corporate Vision Horizon 2030</span>
            <span className="text-indigo-600 font-bold uppercase tracking-wider">Future Coordinates</span>
          </div>
        </div>
      </div>

      {/* Core values block */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-[10px] uppercase font-mono tracking-wider text-orange-600 font-bold block">Constitutional Foundation</span>
          <h3 className="font-sans font-bold text-slate-905 text-2xl tracking-tight">Our Foundational Core Values</h3>
          <p className="text-slate-450 text-xs font-sans">
            These four pillars drive every calculation, every policy wording, and every team communication at Rex Insurance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="p-6 border border-slate-150 rounded-xl hover:border-orange-200 transition-all bg-slate-50/20 group">
                <div className={`w-10 h-10 rounded-xl mb-4 border flex items-center justify-center ${val.color} group-hover:scale-105 duration-150 transition-all`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-sans font-bold text-sm text-slate-900 mb-2">{val.title}</h4>
                <p className="text-[11px] text-slate-505 leading-relaxed font-sans">{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive corporate profile block / Office Locations */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 flex items-start gap-4">
          <Building className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
          <div>
            <h4 className="font-bold text-xs text-slate-800 font-mono uppercase tracking-wider">Central Headquarters</h4>
            <p className="text-xs text-slate-500 mt-1">Rex Plaza, Floors 4-10, Financial District</p>
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 flex items-start gap-4">
          <MapPin className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
          <div>
            <h4 className="font-bold text-xs text-slate-800 font-mono uppercase tracking-wider">Claims Processing Center</h4>
            <p className="text-xs text-slate-500 mt-1">Sovereign Building, Business Park South</p>
          </div>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 flex items-start gap-4">
          <Globe className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
          <div>
            <h4 className="font-bold text-xs text-slate-800 font-mono uppercase tracking-wider">Digital Infrastructure Desk</h4>
            <p className="text-xs text-slate-500 mt-1">Cloud hosting tunnel, Intranet Ingress</p>
          </div>
        </div>
      </div>
    </div>
  );
}
