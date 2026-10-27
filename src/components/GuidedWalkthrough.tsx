import React, { useState } from 'react';
import { X, ChevronRight, Check } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export default function GuidedWalkthrough({ onComplete }: Props) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to Rex Intranet',
      description: 'Let us take a quick tour of your new digital workspace.',
      alignment: 'center'
    },
    {
      title: 'Global Sidebar Navigation',
      description: 'Access all your tools, departmental shared folders, and corporate communications here. It is grouped into 4 main pillars: Communication, Productivity, Knowledge, and Connection.',
      alignment: 'left'
    },
    {
      title: 'Unified Search',
      description: 'Find colleagues, policies, and files instantly using the search bar at the top.',
      alignment: 'top'
    },
    {
      title: 'Rex AI Assistant',
      description: 'Got a question? Rex AI is always available in the bottom right to help you navigate compliance or find resources.',
      alignment: 'bottom-right'
    },
    {
      title: 'Your Profile',
      description: 'Manage your settings, notification preferences, and viewing options by clicking your avatar.',
      alignment: 'top-right'
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const getPositionClasses = () => {
    switch (steps[step].alignment) {
      case 'left': return 'top-1/4 left-80 ml-6';
      case 'top': return 'top-20 left-1/2 -translate-x-1/2 mt-4';
      case 'bottom-right': return 'bottom-24 right-8 mb-4';
      case 'top-right': return 'top-20 right-8 mt-4';
      default: return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex pointer-events-none">
      {/* Semi-transparent backdrop with a hole cutout (simulated by full overlay for now) */}
      <div className="absolute inset-0 bg-slate-900/60 pointer-events-auto" />
      
      {/* Tooltip Card */}
      <div className={`absolute bg-white rounded-2xl shadow-2xl p-6 w-[350px] pointer-events-auto transition-all duration-500 animate-fade-in ${getPositionClasses()}`}>
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-mono font-bold text-brand-orange uppercase tracking-wider">
            Tour: Step {step + 1} of {steps.length}
          </span>
          <button onClick={onComplete} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{steps[step].title}</h3>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">{steps[step].description}</p>
        
        <div className="flex justify-between items-center">
          <button 
            onClick={onComplete}
            className="text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            Skip Tour
          </button>
          <div className="flex gap-2">
            {step > 0 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Back
              </button>
            )}
            <button 
              onClick={handleNext}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-brand-blue hover:bg-blue-800 text-white flex items-center gap-1 transition-colors shadow-sm"
            >
              {step === steps.length - 1 ? 'Finish' : 'Next'}
              {step === steps.length - 1 ? <Check className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
