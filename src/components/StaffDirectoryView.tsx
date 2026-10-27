import { useState } from 'react';
import { 
  Users, 
  Search, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  UserCheck,
  Building,
  Bookmark
} from 'lucide-react';
import { Employee, User } from '../types';
import { EMPLOYEES } from '../data/mockData';

interface StaffDirectoryViewProps {
  currentUser: User;
  onNavigateToTab: (tab: string) => void;
}

export default function StaffDirectoryView({
  currentUser,
  onNavigateToTab
}: StaffDirectoryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);

  const deptsLists = [
    'All',
    'People & Culture (HR)',
    'Claims Operations',
    'Underwriting',
    'Finance & Treasury',
    'IT & Digital Infrastructure',
    'Brand & Corporate Communications',
    'Customer Experience Operations'
  ];

  // Filtering
  const filteredEmployees = EMPLOYEES.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = filterDept === 'All' || emp.department === filterDept;

    return matchesSearch && matchesDept;
  });

  const activeStaff = EMPLOYEES.find(e => e.id === selectedStaffId);

  // 1. Detailed Profile Screen view
  if (activeStaff) {
    // Find manager if available
    const managerEmp = EMPLOYEES.find(e => e.name === activeStaff.manager);

    return (
      <div className="space-y-6 animate-fade-in pb-12 max-w-3xl">
        <button
          onClick={() => setSelectedStaffId(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-655 hover:text-blue-900 bg-white border rounded px-3 py-1.5 shadow-sm transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Staff Contacts directory
        </button>

        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
          {/* Cover background */}
          <div className="h-32 bg-gradient-to-r from-blue-905 via-[#1E2D64] to-indigo-950 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-orange-500/10 blur-xl pointer-events-none" />
          </div>

          <div className="p-6 relative -mt-16 border-b border-gray-100 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-5 justify-between">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
                <img 
                  src={activeStaff.avatar} 
                  alt={activeStaff.name} 
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-full border-4 border-white bg-slate-200 object-cover shadow-md shrink-0" 
                />
                <div className="pb-1">
                  <h3 className="text-lg font-bold text-gray-950">{activeStaff.name}</h3>
                  <p className="text-xs text-gray-450 mt-0.5">{activeStaff.role}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 text-[9px] bg-blue-50 border border-blue-100 text-blue-700 font-mono font-bold rounded">
                    {activeStaff.department.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Action buttons on profile */}
              <div className="flex gap-2 justify-center">
                <a 
                  href={`mailto:${activeStaff.email}`}
                  className="px-4 py-2 bg-[#1E2D64] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 hover:bg-opacity-90"
                >
                  <Mail className="w-3.5 h-3.5" /> Direct Email
                </a>
                <button
                  onClick={() => alert(`Dialing extension ${activeStaff.phone} through simulated corporate softphone...`)}
                  className="px-4 py-2 border border-secondary text-gray-700 text-xs font-semibold rounded-lg hover:bg-slate-50 flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-gray-400" /> Dial {activeStaff.phone.replace('Ext: ', '')}
                </button>
              </div>
            </div>

            {/* General Description */}
            <div className="mt-8">
              <h5 className="text-[10px] font-bold font-mono uppercase text-slate-450 block">Bio & Work Summary</h5>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed font-sans max-w-2xl bg-slate-50/50 border p-4 rounded-xl">
                {activeStaff.bio}
              </p>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-600 font-sans">
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 border-b pb-1.5 font-sans">Corporate Information</h4>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Office Location: <strong>{activeStaff.location}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Job Function Desk: <strong>{activeStaff.role}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-400 shrink-0" />
                <span>Target Node: <strong>{activeStaff.department}</strong></span>
              </div>
            </div>

            {/* Hierarchical structural management link */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 border-b pb-1.5 font-sans font-sans">Reporting Hierarchy Lines</h4>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-10 border-l-2 border-dashed border-gray-205 ml-3 relative" />
                <div className="flex items-center gap-2 p-1.5 border rounded-lg bg-slate-50/50 hover:bg-slate-50 cursor-pointer w-full transition-all"
                  onClick={() => {
                    if (managerEmp) setSelectedStaffId(managerEmp.id);
                    else alert(`victoria Hawthorne's profile is at the senior executive leadership baseline already.`);
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-mono font-bold text-[#1E2D64]">
                    M
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-400 block font-mono">REPORTING LINE MANAGER</span>
                    <strong className="text-gray-805 leading-none block">{activeStaff.manager}</strong>
                  </div>
                </div>
              </div>

              {activeStaff.id === 'emp-102' && (
                <div className="pt-2 border-t border-gray-100 flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded bg-emerald-500 shrink-0" />
                  <span className="text-[11px] text-gray-500 font-sans leading-tight">
                    Sarah Jenkins serves as the dedicated <strong>Onboarding Buddy</strong> supervising recruit Samuel Adebayo.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Directory list
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h2 className="text-2xl font-sans font-bold tracking-tight text-gray-950 flex items-center gap-2">
          <Users className="w-6 h-6 text-[#1E2D64]" /> Enterprise Staff Directory
        </h2>
        <p className="text-xs text-gray-500 mt-1">Search or browse colleagues, locate department lead nodes and communicate instantly with operational partners.</p>
      </div>

      {/* Filters search area */}
      <div className="bg-white border rounded-xl p-4 shadow-sm grid md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="directory-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search colleagues by names, job title desk, email contacts..."
            className="w-full bg-slate-50 border border-gray-205 text-gray-850 text-xs rounded-lg pl-9 pr-4 py-2 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase text-gray-400">Department:</span>
          <select
            id="directory-dept-select"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="flex-1 bg-slate-50 border border-gray-205 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 cursor-pointer"
          >
            {deptsLists.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Directory Grid cards */}
      {filteredEmployees.length === 0 ? (
        <div className="p-12 text-center bg-white border rounded-xl">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-gray-800 font-sans">No Employees Found</h4>
          <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">Verify spelling keywords or clear active department limits.</p>
          <button 
            onClick={() => { setSearchQuery(''); setFilterDept('All'); }} 
            className="mt-4 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((staff) => (
            <div
              key={staff.id}
              onClick={() => setSelectedStaffId(staff.id)}
              className="bg-white border rounded-2xl p-5 hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="text-center pb-4 border-b border-gray-100">
                <img 
                  src={staff.avatar} 
                  alt={staff.name} 
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full mx-auto object-cover border bg-gray-100 group-hover:scale-105 transition-all duration-300" 
                />
                <h4 className="text-xs font-bold text-gray-950 mt-3 group-hover:text-blue-800 duration-150 truncate leading-tight">
                  {staff.name}
                </h4>
                <p className="text-[10px] text-gray-400 mt-0.5 truncate leading-tight">{staff.role}</p>
                <span className="inline-block mt-2 px-1.5 py-0.5 text-[8px] bg-slate-100 text-slate-600 font-mono rounded">
                  {staff.department.replace(' Operations', '').replace(' & Digital Infrastructure', '')}
                </span>
              </div>

              <div className="pt-4 text-[11px] text-gray-500 font-sans space-y-1">
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{staff.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>{staff.phone}</span>
                </div>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStaffId(staff.id);
                }}
                className="w-full text-center mt-4 py-1.5 bg-slate-50 hover:bg-slate-100 border text-[#1E2D64] font-bold text-[10.5px] rounded-lg shadow-sm transition-all"
              >
                View Staff Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
