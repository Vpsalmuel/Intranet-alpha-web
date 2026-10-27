import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { EMPLOYEES } from '../data/mockData';
import { PlayCircle, ShieldCheck, Map, Users, Info, CheckCircle, ChevronRight, ChevronLeft, Check, Heart, Shield, TrendingUp, MessageSquare, Briefcase, Car, Flame, Tractor, Zap, Wrench, Plane, PlaneTakeoff, X } from 'lucide-react';

interface Props {
  currentUser: User;
  onComplete: () => void;
  onBackToHome?: () => void;
}

export default function StructuredOnboardingFlow({ currentUser, onComplete, onBackToHome }: Props) {
  // Try to load progress from localStorage, or start at step 0
  const storageKey = `onboarding_progress_${currentUser.id}`;
  const savedStep = parseInt(localStorage.getItem(storageKey) || '0', 10);
  
  const [currentStep, setCurrentStep] = useState(savedStep);

  const insuranceProducts = [
    {
      id: 'motor',
      title: 'Motor Insurance',
      icon: Car,
      color: 'text-blue-600',
      variants: 'Third-party, Comprehensive, Royal silver and Bronze',
      description: 'Comprehensive and specialized motor insurance packages designed to protect private and commercial vehicles against accident, theft, and third-party liabilities. Provides 24/7 roadside assistance and rapid claims processing.'
    },
    {
      id: 'fire',
      title: 'Fire Insurance',
      icon: Flame,
      color: 'text-orange-600',
      variants: 'Standard Fire, Special Perils',
      description: 'Protects commercial and residential properties against loss or damage caused by fire, lightning, and other specified perils.'
    },
    {
      id: 'agric',
      title: 'Agric Insurance',
      icon: Tractor,
      color: 'text-emerald-600',
      variants: 'Crop, Livestock, Poultry, Fish Farm',
      description: 'Specialized coverage for farmers and agricultural businesses protecting against natural disasters, diseases, and other risks affecting yields.'
    },
    {
      id: 'energy',
      title: 'Energy Insurance',
      icon: Zap,
      color: 'text-yellow-600',
      variants: 'Oil & Gas, Renewable, Power Generation',
      description: 'Robust risk management solutions for the energy sector including offshore/onshore operations, renewable energy, and power generation facilities.'
    },
    {
      id: 'engineering',
      title: 'Engineering Insurance',
      icon: Wrench,
      color: 'text-slate-600',
      variants: 'Contractors All Risk, Erection All Risk, Plant & Machinery',
      description: 'Coverage for construction projects, installation of machinery, and operational equipment against physical loss or damage.'
    },
    {
      id: 'travel',
      title: 'Travel Insurance',
      icon: Plane,
      color: 'text-indigo-600',
      variants: 'Local, International, Student, Pilgrimage',
      description: 'Comprehensive travel protection covering medical emergencies, trip cancellations, lost baggage, and travel delays.'
    },
    {
      id: 'aviation',
      title: 'Aviation Insurance',
      icon: PlaneTakeoff,
      color: 'text-cyan-600',
      variants: 'Hull All Risks, Passenger Liability, Airport Operators Liability',
      description: 'Specialized insurance for aircraft hull, passenger, and third-party liability covering commercial airlines, private jets, and aviation operations.'
    }
  ];

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Policy sign-offs state
  const [policiesSigned, setPoliciesSigned] = useState<Record<string, boolean>>({
    conduct: false,
    it: false,
    privacy: false,
    health: false
  });

  const steps = [
    { id: 'welcome', title: 'MD Welcome Video', icon: PlayCircle },
    { id: 'overview', title: 'Company Overview', icon: Info },
    { id: 'culture', title: 'Company Culture', icon: Heart },
    { id: 'products', title: 'Insurance Products', icon: Shield },
    { id: 'locations', title: 'Department Locations', icon: Map },
    { id: 'team', title: 'Meet Your Team', icon: Users },
    { id: 'acculturation', title: 'Acculturation Videos', icon: PlayCircle },
    { id: 'policies', title: 'HR & IT Policies', icon: ShieldCheck },
    { id: 'performance', title: 'Performance Management', icon: TrendingUp },
    { id: 'buddy', title: 'Schedule Feedback', icon: MessageSquare }
  ];

  // Save progress whenever step changes
  useEffect(() => {
    localStorage.setItem(storageKey, currentStep.toString());
  }, [currentStep, storageKey]);

  const allPoliciesSigned = Object.values(policiesSigned).every(Boolean);

  const currentStepId = steps[currentStep]?.id || steps[0].id;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleFinish = () => {
    // Clear progress so it doesn't reappear if we somehow get back
    localStorage.removeItem(storageKey);
    onComplete();
  };

  if (showConfirmation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fade-in text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">You're all set — welcome to the team!</h2>
        
        <div className="w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative mb-10 border-4 border-white">
          <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&h=675" className="w-full h-full object-cover opacity-60" alt="Welcome Video" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="flex flex-col items-center">
               <div className="w-20 h-20 bg-brand-orange/90 rounded-full flex items-center justify-center mb-4 shadow-lg cursor-pointer hover:scale-105 transition-transform">
                 <PlayCircle className="w-10 h-10 text-white" />
               </div>
               <span className="text-white font-bold text-lg drop-shadow-md">Play Final Welcome</span>
             </div>
          </div>
        </div>

        <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
          Welcome aboard, {currentUser.name.split(' ')[0]}. You now have full access to the intranet, department tools, and collaboration spaces.
        </p>
        <button
          onClick={handleFinish}
          className="px-10 py-4 bg-brand-blue hover:bg-blue-800 text-white font-bold text-lg rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          Enter Workspace Dashboard <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-fade-in font-sans">
      
            {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 mt-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">New Staff Onboarding</h1>
          <p className="text-slate-500 text-sm mt-1">Complete your required track modules to access the command centre.</p>
        </div>
        {onBackToHome && (
          <button 
            onClick={onBackToHome}
            className="px-4 py-2 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-brand-blue flex items-center gap-2 transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Homepage
          </button>
        )}
      </div>

      {/* Buddy Notification Banner */}
      {currentUser.buddyName && (
        <div className="bg-brand-blue/10 border border-brand-blue/20 p-4 rounded-xl mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-brand-blue text-sm">Buddy Assigned</h4>
            <p className="text-xs text-brand-blue/80 font-medium">Your onboarding buddy is <strong className="font-bold text-brand-blue">{currentUser.buddyName}</strong>. They will help guide you through your first weeks.</p>
          </div>
        </div>
      )}

      {/* Progress Tracker */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Onboarding Progress</h2>
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 z-0">
            <div 
              className="h-full bg-brand-orange transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  isCompleted ? 'bg-brand-orange border-brand-orange text-white' :
                  isCurrent ? 'bg-white border-brand-orange text-brand-orange' :
                  'bg-white border-slate-200 text-slate-400'
                }`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <span className={`text-[10px] font-bold text-center max-w-[80px] ${isCurrent ? 'text-brand-orange' : isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Step Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-sm">
            {React.createElement(steps[currentStep].icon, { className: "w-6 h-6 text-brand-orange" })}
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Step {currentStep + 1} of {steps.length}
            </span>
            <h1 className="text-2xl font-bold text-slate-900">{steps[currentStep].title}</h1>
          </div>
        </div>

        {/* Step Body */}
        <div className="flex-1 p-8">
          
          {currentStepId === 'welcome' && (
            <div className="space-y-6">
              <p className="text-slate-600">Please watch the mandatory welcome message from our Managing Director & CEO, Victoria Hawthorne.</p>
              <div className="aspect-video bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center group shadow-md border border-slate-200">
                 <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200&h=675" alt="MD Welcome" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                 <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer group-hover:bg-white/40 transition-all border border-white/30">
                    <PlayCircle className="w-8 h-8 text-white" />
                 </div>
              </div>
            </div>
          )}

          {currentStepId === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Our History & Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                Founded in 2010, Rex Insurance has grown into a leading provider of innovative risk management solutions. Our mission is to secure the futures of our clients through transparent, robust, and accessible insurance products.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                 {['Integrity First', 'Client Empathy', 'Digital Precision'].map(val => (
                   <div key={val} className="p-4 border border-brand-orange/20 bg-orange-50/50 rounded-xl text-center">
                     <span className="font-bold text-brand-orange">{val}</span>
                   </div>
                 ))}
              </div>
            </div>
          )}

          
          {currentStepId === 'culture' && (
            <div className="space-y-8">
              {/* Culture & Core Values */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Our Company Culture</h3>
                  <p className="text-slate-600 text-sm mt-1">At Rex Insurance, our culture is built on transparency, empathy, and innovation. We believe in taking care of our people so they can take care of our clients.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                    <Heart className="w-6 h-6 text-brand-orange mb-2" />
                    <h4 className="font-bold text-slate-800">Empathy First</h4>
                    <p className="text-sm text-slate-600 mt-1">We listen and act with compassion in every interaction.</p>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                    <TrendingUp className="w-6 h-6 text-brand-blue mb-2" />
                    <h4 className="font-bold text-slate-800">Continuous Growth</h4>
                    <p className="text-sm text-slate-600 mt-1">We invest heavily in the personal and professional growth of our team.</p>
                  </div>
                </div>
              </div>

              {/* Dress Code & Workplace Norms nested under Company Culture */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-orange" />
                    <h3 className="text-lg font-bold text-slate-900">Dress Code & Workplace Norms</h3>
                  </div>
                  <p className="text-slate-600 text-sm mt-1">Guidelines for in-office and remote collaboration across all departments.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                      <h4 className="font-bold text-slate-800 text-sm">Office Days (Tue–Thu)</h4>
                    </div>
                    <p className="text-sm text-slate-600">Business casual. Client-facing roles require full business attire during scheduled meetings.</p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
                      <h4 className="font-bold text-slate-800 text-sm">Remote Days (Mon & Fri)</h4>
                    </div>
                    <p className="text-sm text-slate-600">Casual but presentable for video calls. Ensure a quiet background with a professional virtual background if needed.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          
          {currentStepId === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Our Insurance Products</h3>
                  <p className="text-slate-600">Click on any product to view details and variants.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-2">
                {insuranceProducts.map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="p-4 border border-slate-200 rounded-xl flex items-start gap-4 cursor-pointer hover:border-brand-blue/40 hover:shadow-md transition-all group bg-white"
                  >
                    <product.icon className={`w-6 h-6 ${product.color} shrink-0 mt-1 group-hover:scale-110 transition-transform`} />
                    <div>
                      <h4 className="font-bold text-slate-800 group-hover:text-brand-blue transition-colors">{product.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{product.variants}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {currentStepId === 'locations' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Navigating the Headquarters</h3>
              <p className="text-slate-600">Get familiar with our floor plan at the central office.</p>
              <div className="bg-slate-100 h-64 rounded-xl flex items-center justify-center border border-slate-200 relative overflow-hidden">
                <Map className="w-12 h-12 text-slate-300 absolute" />
                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 w-full h-full">
                   <div className="bg-white/80 p-3 rounded shadow-sm text-xs font-bold text-center flex flex-col justify-center">Floor 4: Exec & HR</div>
                   <div className="bg-white/80 p-3 rounded shadow-sm text-xs font-bold text-center flex flex-col justify-center">Floor 3: Claims</div>
                   <div className="bg-white/80 p-3 rounded shadow-sm text-xs font-bold text-center flex flex-col justify-center">Floor 2: Underwriting</div>
                   <div className="bg-white/80 p-3 rounded shadow-sm text-xs font-bold text-center flex flex-col justify-center">Floor 1: IT & CX</div>
                </div>
              </div>
            </div>
          )}

          
          {currentStepId === 'team' && (() => {
            const departmentTeam = EMPLOYEES.filter(emp => emp.department === currentUser.department && emp.id !== currentUser.id);
            const currentUserEmployeeRecord = EMPLOYEES.find(emp => emp.email === currentUser.email);
            const managerName = currentUserEmployeeRecord?.manager;
            const manager = departmentTeam.find(emp => emp.name === managerName) || departmentTeam.find(emp => emp.role.toLowerCase().includes('head') || emp.role.toLowerCase().includes('manager'));
            const buddy = departmentTeam.find(emp => emp.name === currentUser.buddyName) || departmentTeam[1];
            const others = departmentTeam.filter(emp => emp.name !== manager?.name && emp.name !== buddy?.name);

            return (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Meet Your Team</h3>
                  <p className="text-slate-600">Get to know the {currentUser.department} department.</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Leadership & Guides</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {manager && (
                      <div className="border border-slate-200 rounded-xl p-4 flex items-center gap-4 bg-slate-50">
                        <img src={manager.avatar} className="w-14 h-14 rounded-full object-cover shrink-0" alt="Manager" />
                        <div>
                          <h4 className="font-bold text-slate-800">{manager.name}</h4>
                          <p className="text-xs text-brand-blue font-medium">{manager.role}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-slate-200 text-slate-700 text-[9px] font-bold uppercase rounded">Manager</span>
                        </div>
                      </div>
                    )}
                    {buddy && (
                      <div className="border border-brand-blue/30 rounded-xl p-4 flex items-center gap-4 bg-brand-blue/5">
                        <img src={buddy.avatar} className="w-14 h-14 rounded-full object-cover shrink-0" alt="Buddy" />
                        <div>
                          <h4 className="font-bold text-slate-800">{buddy.name}</h4>
                          <p className="text-xs text-brand-blue font-medium">{buddy.role}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-brand-blue text-white text-[9px] font-bold uppercase rounded">Onboarding Buddy</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {others.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Department Colleagues</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[35vh] overflow-y-auto pr-2">
                      {others.map(member => (
                        <div key={member.id} className="border border-slate-200 rounded-xl p-3 flex items-center gap-3 bg-white">
                          <img src={member.avatar} className="w-10 h-10 rounded-full object-cover shrink-0" alt={member.name} />
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{member.name}</h4>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
          {currentStepId === 'acculturation' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Department Acculturation</h3>
              <p className="text-slate-600">Learn from the department heads about how our company operates cross-functionally.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Claims Process Overview", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&h=200" },
                  { title: "Risk & Underwriting Matrix", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&h=200" }
                ].map(v => (
                  <div key={v.title} className="border border-slate-200 rounded-xl overflow-hidden group cursor-pointer">
                    <div className="h-32 bg-slate-200 relative overflow-hidden">
                      <img src={v.img} className="w-full h-full object-cover" alt={v.title} />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <PlayCircle className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="p-3 bg-white">
                      <h4 className="text-sm font-bold text-slate-800">{v.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStepId === 'policies' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Mandatory Policy Acknowledgements</h3>
              <p className="text-slate-600 mb-4">Please read and acknowledge the following corporate policies to proceed.</p>
              
              <div className="space-y-3">
                {[
                  { id: 'conduct', title: 'Employee Code of Conduct (2026)' },
                  { id: 'it', title: 'IT Acceptable Use Policy' },
                  { id: 'privacy', title: 'Data Privacy & GDPR Compliance' },
                  { id: 'health', title: 'Workplace Health & Safety' }
                ].map(policy => (
                  <div key={policy.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <span className="font-semibold text-slate-800 text-sm">{policy.title}</span>
                    </div>
                    <button
                      onClick={() => setPoliciesSigned(prev => ({ ...prev, [policy.id]: true }))}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        policiesSigned[policy.id] 
                          ? 'bg-green-100 text-green-700 border border-green-200 cursor-default'
                          : 'bg-white border border-brand-blue text-brand-blue hover:bg-brand-blue/5'
                      }`}
                    >
                      {policiesSigned[policy.id] ? 'Acknowledged ✓' : 'Read & Acknowledge'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          
          {currentStepId === 'performance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Performance Management</h3>
              <p className="text-slate-600">How we measure success, set goals, and handle quarterly reviews.</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li><strong>Quarterly OKRs:</strong> Objectives and Key Results are set at the start of every quarter.</li>
                <li><strong>Weekly 1:1s:</strong> You'll have dedicated time with your manager to unblock tasks and discuss progress.</li>
                <li><strong>360 Reviews:</strong> Conducted annually to provide holistic feedback from peers, managers, and direct reports.</li>
              </ul>
              <div className="p-4 bg-brand-blue/5 border border-brand-blue/20 rounded-xl mt-4">
                <p className="text-sm text-brand-blue font-medium">Your first performance check-in will be scheduled at the end of your 30-day onboarding period.</p>
              </div>
            </div>
          )}
          {currentStepId === 'buddy' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Schedule First Week Feedback</h3>
              <p className="text-slate-600 mb-6">
                Your assigned Buddy, <strong>{currentUser.buddyName || 'your department guide'}</strong>, is ready to meet with you. Please select a time slot for your feedback session.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 max-w-md mx-auto">
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Select Date</label>
                  <input type="date" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm" defaultValue="2026-07-25" />
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Select Time</label>
                  <select className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white">
                    <option>10:00 AM</option>
                    <option>11:30 AM</option>
                    <option>2:00 PM</option>
                    <option>4:00 PM</option>
                  </select>
                </div>
                <button className="w-full py-3 bg-brand-blue text-white rounded-lg font-bold text-sm hover:bg-blue-800 transition-colors">
                  Confirm Meeting
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-slate-200'
            }`}
          >
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentStepId === 'policies' && !allPoliciesSigned}
            className="px-6 py-2.5 bg-brand-blue hover:bg-blue-800 text-white font-bold text-sm rounded-xl flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {currentStep === steps.length - 1 ? 'Finish Onboarding' : 'Next Step'}
            {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <selectedProduct.icon className={`w-6 h-6 ${selectedProduct.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedProduct.title}</h3>
                  <p className="text-xs font-bold text-brand-blue uppercase tracking-wider mt-1">Core Product</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-2">Available Variants</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.variants.split(', ').map((variant: string, idx: number) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 font-medium text-xs rounded-lg border border-slate-200">
                      {variant}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-2">Description</h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {selectedProduct.description}
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-6 py-2 bg-[#1E2D64] hover:bg-[#141F45] text-white font-bold rounded-lg transition-all"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Temporary import for the icon that was missing in the scope
function FileText(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>;
}
