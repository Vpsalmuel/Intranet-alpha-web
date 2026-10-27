import React, { useState } from 'react';
import { 
  Heart, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText, 
  ExternalLink,
  Award, 
  ShieldCheck, 
  Smile, 
  LifeBuoy, 
  UserCheck, 
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { User } from '../types';

interface HRServicesViewProps {
  currentUser: User;
  onNavigateToTab: (tab: string) => void;
}

export default function HRServicesView({
  currentUser,
  onNavigateToTab
}: HRServicesViewProps) {
  // Leave Request Submission Simulator states
  const [leaveType, setLeaveType] = useState('Annual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [backupPersonnel, setBackupPersonnel] = useState('');
  const [comment, setComment] = useState('');
  const [submittedLeaveResult, setSubmittedLeaveResult] = useState<any | null>(null);

  const [activeSubTab, setActiveSubTab] = useState<'benefits' | 'leave' | 'handbook'>('benefits');

  const hndleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert('Please select startDate and endDate.');
      return;
    }

    setSubmittedLeaveResult({
      id: `LVE-${Math.floor(2000 + Math.random() * 8000)}`,
      leaveType,
      startDate,
      endDate,
      backupPersonnel,
      status: 'Awaiting Line Manager Approval'
    });

    // Reset Form
    setComment('');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 font-sans">
      {/* 1. Welcoming header info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-gray-950 flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#1E2D64] fill-red-100" /> People & Culture Welfare Centre
          </h2>
          <p className="text-xs text-gray-500 mt-1">Navigate leaves scheduling, staff health benefits trackers, training registries, onboarding, and welfare checklists.</p>
        </div>

        <div className="flex bg-gray-100 p-1.5 rounded-lg border gap-1">
          <button
            onClick={() => setActiveSubTab('benefits')}
            className={`px-3 py-1 text-xs rounded transition-all font-semibold ${
              activeSubTab === 'benefits' ? 'bg-[#1E2D64] text-white shadow' : 'text-slate-650 hover:text-slate-900'
            }`}
          >
            My Benefits & Welfare
          </button>
          <button
            onClick={() => setActiveSubTab('leave')}
            className={`px-3 py-1 text-xs rounded transition-all font-semibold ${
              activeSubTab === 'leave' ? 'bg-[#1E2D64] text-white shadow' : 'text-slate-650 hover:text-slate-900'
            }`}
          >
            Lodge Leave Approval
          </button>
          <button
            onClick={() => setActiveSubTab('handbook')}
            className={`px-3 py-1 text-xs rounded transition-all font-semibold ${
              activeSubTab === 'handbook' ? 'bg-[#1E2D64] text-white shadow' : 'text-slate-650 hover:text-slate-900'
            }`}
          >
            Employee Guides
          </button>
        </div>
      </div>

      {/* SUB-V 1. Benefits & Welfare dashboard */}
      {activeSubTab === 'benefits' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          <div className="xl:col-span-8 space-y-6">
            {/* Quick Benefits Metrics */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h3 className="font-sans font-bold text-gray-901 text-base border-b pb-3 mb-4">My Annual Leave Entitlement</h3>
              <div className="grid grid-cols-3 gap-4 text-center font-sans">
                <div className="p-4 bg-slate-50 border rounded-xl">
                  <span className="text-[10px] font-bold tracking-wider font-mono text-gray-400 block uppercase">Total Allocated</span>
                  <span className="text-2xl font-bold font-sans text-gray-950 mt-1 block">24 days</span>
                  <p className="text-[9px] text-gray-400 mt-1">Full 2026 tenure cycle</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <span className="text-[10px] font-bold tracking-wider font-mono text-blue-400 block uppercase">Approved Out</span>
                  <span className="text-2xl font-bold font-sans text-blue-900 mt-1 block">6 days</span>
                  <p className="text-[9px] text-blue-400 mt-1">Reconciled in system</p>
                </div>
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <span className="text-[10px] font-bold tracking-wider font-mono text-emerald-400 block uppercase">Unused Balance</span>
                  <span className="text-2xl font-bold font-sans text-emerald-700 mt-1 block">18 days</span>
                  <p className="text-[9px] text-emerald-400 mt-1">Available to use</p>
                </div>
              </div>
            </div>

            {/* Comprehensive Insurance Packages */}
            <div className="bg-white border p-6 rounded-2xl shadow-sm">
              <h3 className="font-sans font-bold text-gray-951 text-base mb-2">My Staff Enrolled Health & Wellness Benefits</h3>
              <p className="text-xs text-gray-500 mb-6 font-sans">You are enrolled in the Platinum Corporate Healthcare Scheme. Find key coverage parameters below:</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded-xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-gray-800 leading-tight">Full Medical & Dental Care</h5>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">Covers inpatient hospitalizations, surgical expenditures, dental root processes and full optical lens subsidies with selected corporate clinic networks.</p>
                  </div>
                </div>

                <div className="p-4 border rounded-xl flex items-start gap-3">
                  <Smile className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-gray-800 leading-tight">Mental Health Assistance Plan</h5>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">Includes 6 annual virtual counseling consultations with registered clinical wellness therapists, completely free of charge.</p>
                  </div>
                </div>

                <div className="p-4 border rounded-xl flex items-start gap-3">
                  <Award className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-gray-800 leading-tight">Career Growth & Training Allowance</h5>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">Supplements up to $1,500 annually to cover specialized actuarial certifications or claims operations bootcamp examinations.</p>
                  </div>
                </div>

                <div className="p-4 border rounded-xl flex items-start gap-3">
                  <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-gray-800 leading-tight">Gym & Physical Well-being Subsidy</h5>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">Supplements 50% discount on health club premium memberships. Validate details under the "General Updates" message folders.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right side widgets: Buddy details, Handbooks links */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* Buddy Box details */}
            {currentUser.role === 'new_staff' && (
              <div className="bg-white border p-5 rounded-2xl shadow-sm">
                <span className="text-[9px] uppercase tracking-wider font-mono text-orange-500 font-bold block mb-1">
                  ★ NEW RECRUIT BUDDY ASSIGNMENT
                </span>
                <h4 className="text-xs font-bold text-gray-900 leading-tight">Meet Your Onboarding Buddy</h4>
                <p className="text-[10px] text-gray-400 mt-0.5 mb-4">Sarah is tasked to help you acclimatize withclaims tools & SOP guidelines during week one.</p>

                <div className="p-4 border bg-orange-50/20 text-xs text-gray-600 rounded-xl">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" 
                      alt="Buddy Avatar" 
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full border bg-gray-200 object-cover" 
                    />
                    <div>
                      <h5 className="font-bold text-gray-800">Sarah Jenkins</h5>
                      <span className="text-[10px] text-gray-400 block">{currentUser.department} Lead</span>
                      <a href="mailto:sarah.jenkins@metropulse-insurance.com" className="text-[10px] text-blue-600 font-bold hover:underline mt-1 block">Contact Sarah</a>
                    </div>
                  </div>
                  <blockquote className="mt-3 text-[10px] italic text-gray-500 border-l-2 pl-2">
                    "Excited to have you on the operations team, Samuel! Feel free to mail me for VPN profiles or claims investigations rules audits. Let's conquer the week."
                  </blockquote>
                </div>
              </div>
            )}

            {/* Pension Funds details */}
            <div className="bg-white p-5 border rounded-2xl shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-gray-900 leading-tight">Pension Scheme Details</h4>
              <p className="text-[10.5px] text-gray-400 leading-relaxed font-sans">
                Rex Insurance automatically deposits 8% base salary matching with registered pension fund administrators. Browse details under the Employee Handbook catalog.
              </p>
              <button 
                onClick={() => setActiveSubTab('handbook')}
                className="w-full text-center py-1.5 bg-slate-50 border text-[#1E2D64] hover:bg-slate-100 text-[10px] font-bold rounded-lg transition-all"
              >
                Inspect Pension Manuals
              </button>
            </div>

          </div>

        </div>
      )}

      {/* SUB-V 2. Leave submission request form */}
      {activeSubTab === 'leave' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          <div className="xl:col-span-8">
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h3 className="font-sans font-bold text-gray-900 text-sm mb-1">Schedule Leave Application</h3>
              <p className="text-xs text-gray-400 mb-6">Select dates, provide hand-over staff backup and submit request for Line Manager approval.</p>

              {submittedLeaveResult ? (
                <div className="p-6 bg-emerald-50 border border-emerald-150 rounded-2xl text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 font-sans">Leave Application Submitted!</h4>
                    <span className="text-xs text-emerald-700 font-mono font-bold shrink-0 mt-1 block">TICKET ID: {submittedLeaveResult.id}</span>
                  </div>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Your {submittedLeaveResult.leaveType} spanning from <strong>{submittedLeaveResult.startDate}</strong> to <strong>{submittedLeaveResult.endDate}</strong> with backup hand-over designated to <strong>{backupPersonnel || 'none specified'}</strong> is logged. Notifications were sent to your line manager.
                  </p>
                  <button
                    onClick={() => setSubmittedLeaveResult(null)}
                    className="px-4 py-1.5 bg-slate-100 text-gray-700 text-xs font-semibold rounded"
                  >
                    Lodge Another Leave Ticket
                  </button>
                </div>
              ) : (
                <form onSubmit={hndleSubmitLeave} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Leave Category *</label>
                      <select
                        id="leave-type"
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="w-full bg-slate-50/50 border border-gray-255 text-gray-800 text-xs rounded-lg px-3 py-2 cursor-pointer"
                      >
                        <option value="Annual Leave">Annual Leave</option>
                        <option value="Compassionate Leave">Compassionate Leave</option>
                        <option value="Maternity / Paternity Leave">Maternity / Paternity Leave</option>
                        <option value="Study / Examination Leave">Study / Examination Leave</option>
                        <option value="Sick Medical Leave">Sick / Medical Leave</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Handover Backup Personnel *</label>
                      <input
                        id="leave-backup"
                        type="text"
                        required
                        value={backupPersonnel}
                        onChange={(e) => setBackupPersonnel(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-slate-50/50 border border-gray-255 text-gray-850 text-xs rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Start Date *</label>
                      <input
                        id="leave-start-date"
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-slate-50/50 border border-gray-205 text-gray-850 text-xs rounded-lg px-3 py-1.5 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">End Date *</label>
                      <input
                        id="leave-end-date"
                        type="date"
                        required
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-slate-50/50 border border-gray-205 text-gray-850 text-xs rounded-lg px-3 py-1.5 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Comments & handover instructions for back-up specialist</label>
                    <textarea
                      id="leave-comment"
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="e.g. Will carry out claims investigations folders sync prior to startDate. Contact mobile for urgent system queries."
                      className="w-full bg-slate-50/50 border border-gray-255 text-gray-850 text-xs rounded-lg px-3 py-2"
                    />
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-50">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-blue-900 hover:bg-[#1E2D64] text-white font-bold text-xs rounded-xl"
                    >
                      Lodge Leave Authorization
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="xl:col-span-4 p-5 bg-white border rounded-2xl shadow-sm text-xs font-sans text-gray-500 leading-relaxed space-y-4">
            <h4 className="font-bold text-gray-901">Policy Summary Rule</h4>
            <p>Annual leaves must be requested at least 3 weeks before departure to allow specialized team backup mapping.</p>
            <p>Line managers and backup hand-over specialists will receive notification approval prompts instantly inside the Request Centre boards.</p>
          </div>

        </div>
      )}

      {/* SUB-V 3. Handbook sheets and Policies guidelines */}
      {activeSubTab === 'handbook' && (
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-sans font-bold text-gray-900 text-sm mb-1">Interactive Employee Handbook</h3>
            <p className="text-xs text-gray-400">Discover guidelines, holiday schedules, organizational parameters, and general codes of conduct.</p>
          </div>

          <div className="space-y-4 text-xs font-sans text-gray-700 max-w-4xl">
            <div className="p-4 bg-slate-50 border rounded-xl">
              <h4 className="font-bold text-gray-950 flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-orange-500 font-semibold" /> Section 1: Standard Flexible working parameters</h4>
              <p className="mt-2 text-gray-500 leading-relaxed">
                Core operational baseline frames run from 9:00 AM to 5:00 PM UTC. Work-from-home schedules are designated in coordination with department heads under structural constraints (standard 3 days in-office, 2 days remote models).
              </p>
            </div>

            <div className="p-4 bg-slate-50 border rounded-xl">
              <h4 className="font-bold text-gray-950 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600 font-semibold" /> Section 2: Zero Workspace Discrimination Policy</h4>
              <p className="mt-2 text-gray-500 leading-relaxed">
                Rex Insurance operates a rigorous zero-tolerance threshold towards harassment or discriminative conduct across races, genders, faiths, or political affiliations. Raise files with the General Counsel Stuart Vance or recruit leaders Thomas Mueller under absolute secrecy protections.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border rounded-xl">
              <h4 className="font-bold text-gray-950 flex items-center gap-1.5"><Award className="w-4 h-4 text-blue-600 font-semibold" /> Section 3: Training & Actuarial Certifications Reimbursement</h4>
              <p className="mt-2 text-gray-500 leading-relaxed">
                Professional development examinations and certification booklets are eligible for full tuition reimbursement upon completion. Request backing support under the Request Centre "Training Request" category.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
