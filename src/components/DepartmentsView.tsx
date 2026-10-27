import { useState } from 'react';
import { 
  Building2, 
  Users, 
  ArrowLeft, 
  FolderOpen, 
  GitPullRequest, 
  Link, 
  Mail, 
  Phone, 
  Cpu, 
  Coins, 
  ShieldQuestion, 
  FileSpreadsheet, 
  Megaphone, 
  Scale, 
  Layers, 
  TrendingUp, 
  Building,
  Heart,
  ChevronRight,
  ExternalLink,
  Award,
  Video,
  Play
} from 'lucide-react';
import { DepartmentInfo, User, RequestItem, Announcement, FileItem, Video as VideoType } from '../types';
import { DEPARTMENTS, EMPLOYEES } from '../data/mockData';

interface DepartmentsViewProps {
  currentUser: User;
  announcements: Announcement[];
  files: FileItem[];
  videos: VideoType[];
  requests: RequestItem[];
  onSelectRequest: (id: string) => void;
  onNavigateToTab: (tab: string) => void;
}

export default function DepartmentsView({
  currentUser,
  announcements,
  files,
  videos,
  requests,
  onSelectRequest,
  onNavigateToTab
}: DepartmentsViewProps) {
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);

  // Map icon strings to Lucide icon components
  const iconMap: Record<string, any> = {
    Users: Heart,
    ShieldQuestion: ShieldQuestion,
    FileSpreadsheet: FileSpreadsheet,
    Coins: Coins,
    Cpu: Cpu,
    Megaphone: Megaphone,
    HeartHandshake: Heart,
    TrendingUp: TrendingUp,
    Scale: Scale,
    Layers: Layers,
    Building: Building
  };

  const activeDept = DEPARTMENTS.find(d => d.id === selectedDeptId);

  // Return specific color class based on department color config
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'emerald': return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', text: 'text-emerald-700', border: 'border-emerald-200', btn: 'bg-emerald-600 hover:bg-emerald-700' };
      case 'indigo': return { bg: 'bg-indigo-50 text-indigo-800 border-indigo-200', text: 'text-indigo-700', border: 'border-indigo-200', btn: 'bg-indigo-600 hover:bg-indigo-700' };
      case 'amber': return { bg: 'bg-amber-50 text-amber-800 border-amber-200', text: 'text-amber-700', border: 'border-amber-200', btn: 'bg-amber-600 hover:bg-amber-700' };
      case 'violet': return { bg: 'bg-violet-50 text-violet-800 border-violet-200', text: 'text-violet-700', border: 'border-violet-200', btn: 'bg-violet-600 hover:bg-violet-700' };
      case 'rose': return { bg: 'bg-rose-50 text-rose-805 border-rose-200', text: 'text-rose-700', border: 'border-rose-200', btn: 'bg-rose-600 hover:bg-rose-700' };
      case 'sky': return { bg: 'bg-sky-50 text-sky-800 border-sky-200', text: 'text-sky-700', border: 'border-sky-200', btn: 'bg-[#1E2D64] hover:bg-opacity-90' };
      case 'orange': return { bg: 'bg-orange-50 text-orange-850 border-orange-200', text: 'text-orange-700', border: 'border-orange-200', btn: 'bg-orange-550 hover:bg-orange-600' };
      case 'teal': return { bg: 'bg-teal-50 text-teal-800 border-teal-200', text: 'text-teal-700', border: 'border-teal-200', btn: 'bg-teal-600 hover:bg-teal-700' };
      case 'slate': return { bg: 'bg-slate-50 text-slate-800 border-slate-205', text: 'text-slate-700', border: 'border-slate-200', btn: 'bg-slate-600 hover:bg-slate-700' };
      case 'blue': 
      default: return { bg: 'bg-blue-50 text-blue-800 border-blue-200', text: 'text-blue-700', border: 'border-blue-200', btn: 'bg-[#1E2D64] hover:bg-opacity-90' };
    }
  };

  // 1. Department Portal Detail Workspace Theme
  if (activeDept) {
    const theme = getColorClasses(activeDept.color);
    
    // Department Specific announcements
    const deptAnnouncements = announcements.filter(a => a.department === activeDept.name || a.visibility === activeDept.name);
    
    // Department Specific documents
    const deptDocuments = files.filter(f => f.department === activeDept.name);
    
    // Department Request tracking
    const assignedRequests = requests.filter(r => r.receivingDept === activeDept.name);
    const submittedRequests = requests.filter(r => r.requestingDept === activeDept.name);

    // Department Specific training videos 
    const deptVideos = videos.filter(v => v.department === activeDept.name);

    // Filter staff members belonging to department
    const deptStaff = EMPLOYEES.filter(emp => emp.department === activeDept.name);

    return (
      <div className="space-y-6 animate-fade-in pb-12">
        <button
          onClick={() => setSelectedDeptId(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-blue-905 bg-white border rounded px-3 py-1.5 shadow-sm hover:shadow transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Departments Directory
        </button>

        {/* 1. Header Banner */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 rounded-full bg-slate-50/50 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${theme.bg}`}>
                {activeDept.icon &&(() => {
                  const Icon = iconMap[activeDept.icon] || Building2;
                  return <Icon className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <span className={`px-2 py-0.5 text-[9px] rounded font-mono font-bold border uppercase tracking-wider ${theme.bg}`}>
                  OPERATIONAL SITE
                </span>
                <h2 className="text-xl md:text-2xl font-sans font-bold text-gray-900 mt-1.5">{activeDept.name}</h2>
              </div>
            </div>

            {/* Lead Card info */}
            <div className="p-3 border rounded-xl flex items-center gap-3 bg-slate-50/50">
              <img 
                src={activeDept.leadAvatar} 
                alt={activeDept.lead} 
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full border bg-gray-200 object-cover" 
              />
              <div>
                <h5 className="text-xs font-bold text-gray-800">{activeDept.lead}</h5>
                <p className="text-[10px] text-gray-400 font-mono">{activeDept.leadRole}</p>
                <div className="flex gap-2 text-[9px] text-[#1E2D64] mt-1 font-medium">
                  <a href={`mailto:${activeDept.email}`} className="hover:underline flex items-center gap-0.5"><Mail className="w-2.5 h-2.5" /> Mail</a>
                  <span>•</span>
                  <span>{activeDept.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed font-sans max-w-4xl">
            {activeDept.description}
          </p>
        </div>

        {/* 2. Primary Metrics Row inside Department */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 border rounded-xl shadow-sm text-center">
            <h5 className="text-[10px] font-bold font-mono tracking-wider uppercase text-gray-400">TEAM PERSONNEL</h5>
            <p className="text-2xl font-sans font-bold text-[#1E2D64] mt-1">{deptStaff.length || 2}</p>
            <p className="text-[9px] text-gray-400 mt-0.5">Assigned resource specialists</p>
          </div>
          <div className="bg-white p-4 border rounded-xl shadow-sm text-center animate-pulse-slow">
            <h5 className="text-[10px] font-bold font-mono tracking-wider uppercase text-gray-400">ASSIGNED REQUESTS</h5>
            <p className="text-2xl font-sans font-bold text-orange-500 mt-1">
              {assignedRequests.filter(r => r.status !== 'Completed').length}
            </p>
            <p className="text-[9px] text-gray-400 mt-0.5">Active interdepartmental tickets</p>
          </div>
          <div className="bg-white p-4 border rounded-xl shadow-sm text-center">
            <h5 className="text-[10px] font-bold font-mono tracking-wider uppercase text-gray-400">PORTAL DOCUMENTS</h5>
            <p className="text-2xl font-sans font-bold text-blue-900 mt-1">{deptDocuments.length}</p>
            <p className="text-[9px] text-gray-400 mt-0.5">Standard SOPs, guides, forms</p>
          </div>
          <div className="bg-white p-4 border rounded-xl shadow-sm text-center">
            <h5 className="text-[10px] font-bold font-mono tracking-wider uppercase text-gray-400">ORIENTATION VIDEOS</h5>
            <p className="text-2xl font-sans font-bold text-emerald-600 mt-1">{deptVideos.length}</p>
            <p className="text-[9px] text-gray-400 mt-0.5">Acculturation overview movies</p>
          </div>
        </div>

        {/* 3. Operational columns panel */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left panel: News & Tools */}
          <div className="xl:col-span-8 space-y-6">
            
            {/* Quick Specialized Tools */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h3 className="font-sans font-bold text-gray-900 text-sm mb-4">Departmental Active Utilities</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {activeDept.quickTools.map((tool, idx) => (
                  <div key={idx} className="p-4 border rounded-xl hover:border-blue-300 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between group cursor-pointer">
                    <div>
                      <h5 className="text-xs font-bold text-gray-800">{tool}</h5>
                      <p className="text-[10px] text-gray-400 mt-1 font-sans">Active operational portal module.</p>
                    </div>
                    <span className="text-[10px] text-blue-600 font-bold group-hover:translate-x-1 duration-200 transition-all flex items-center gap-0.5">
                      Open <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Department SOPs & Document manuals */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-sans font-bold text-gray-900 text-sm">Regulatory Policies, SOPs & Guides</h3>
                <button 
                  onClick={() => onNavigateToTab('documents')}
                  className="text-xs text-blue-600 hover:underline font-bold"
                >
                  View all
                </button>
              </div>

              {deptDocuments.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">No specialized regulatory documents matching {activeDept.name} yet.</p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {deptDocuments.map((doc) => (
                    <div key={doc.id} className="py-3 flex items-center justify-between text-xs hover:bg-slate-50 px-2 rounded transition-all">
                      <div className="flex items-center gap-2.5">
                        <FolderOpen className="w-4 h-4 text-red-500 shrink-0" />
                        <div>
                          <h5 className="font-bold text-gray-850 truncate max-w-[300px] md:max-w-md">{doc.title}</h5>
                          <span className="text-[9px] text-gray-400">Updated: {doc.lastUpdated}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#1E2D64] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 font-mono font-semibold">
                        {doc.fileType} • {doc.fileSize}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Department requests queues */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-sans font-bold text-gray-900 text-sm">Assigned Collaborative Requests</h3>
                <span className="text-[10.5px] bg-amber-50 text-amber-800 border border-amber-200 rounded px-2.5 py-0.5 font-mono">
                  Incoming Tickets
                </span>
              </div>

              {assignedRequests.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">Zero pending collaborative requests currently assigned to {activeDept.name}.</p>
              ) : (
                <div className="space-y-3">
                  {assignedRequests.map((req) => (
                    <div 
                      key={req.id}
                      onClick={() => {
                        onSelectRequest(req.id);
                        onNavigateToTab('requests');
                      }}
                      className="p-3 border rounded-xl hover:border-blue-400 bg-slate-50/50 hover:bg-white transition-all cursor-pointer flex justify-between items-center gap-4 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-gray-400">{req.id}</span>
                          <span className={`px-1.5 py-0.5 text-[8px] font-mono rounded ${
                            req.priority === 'High' || req.priority === 'Urgent' ? 'bg-red-150 text-red-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {req.priority}
                          </span>
                        </div>
                        <h5 className="font-bold text-gray-850 truncate mt-1 leading-tight">{req.title}</h5>
                        <p className="text-[10px] text-gray-400 mt-1">Requested by: <strong>{req.requestedBy}</strong> ({req.requestingDept})</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold bg-blue-50 text-blue-700">
                          {req.status}
                        </span>
                        <span className="text-[9px] text-gray-400 block mt-1">Due: {req.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FAQs Specific section */}
            {activeDept.faqs && activeDept.faqs.length > 0 && (
              <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <h3 className="font-sans font-bold text-gray-900 text-sm mb-4">Frequently Asked Queries FAQs</h3>
                <div className="space-y-4">
                  {activeDept.faqs.map((faq, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <h4 className="text-xs font-semibold text-gray-900">{faq.q}</h4>
                      <p className="text-[11px] text-gray-550 mt-1 font-sans leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right panel: Team Contacts & Department videos */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* Team Directory list */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-sans font-bold text-gray-900 text-sm mb-4">Departmental Staff contacts</h3>
              <div className="space-y-4">
                {deptStaff.length === 0 ? (
                  <p className="text-xs text-gray-400 py-3 text-center">Refer to global personnel search or directory.</p>
                ) : (
                  deptStaff.map((staff) => (
                    <div key={staff.id} className="flex items-center gap-2.5 p-1 rounded hover:bg-slate-50 transition-all">
                      <img 
                        src={staff.avatar} 
                        alt={staff.name} 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full bg-gray-200 object-cover shadow-sm shrink-0" 
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold text-gray-800 leading-tight truncate">{staff.name}</h5>
                        <p className="text-[10px] text-gray-400 truncate mt-0.5">{staff.role}</p>
                        <p className="text-[9px] font-mono text-gray-400 mt-1 flex gap-2">
                          <span>{staff.phone}</span>
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Departmental acculturation movies tutorials */}
            {deptVideos.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="font-sans font-bold text-gray-900 text-xs mb-3">Departmental Learning Library</h4>
                <div className="space-y-3">
                  {deptVideos.map((vid) => (
                    <div 
                      key={vid.id}
                      onClick={() => {
                        onSelectRequest(vid.id); // set target active video
                        onNavigateToTab('acculturation');
                      }}
                      className="border border-gray-150 rounded-xl overflow-hidden hover:border-orange-500 transition-all cursor-pointer bg-slate-50/50 group flex items-center p-2 gap-3"
                    >
                      <div className="w-16 h-10 relative bg-gray-200 rounded shrink-0 overflow-hidden">
                        <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <Play className="w-3 h-3 fill-white text-white" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="text-[11px] font-bold text-gray-800 group-hover:text-blue-800 truncate leading-snug">{vid.title}</h5>
                        <p className="text-[9px] text-gray-400 mt-0.5 font-mono">{vid.duration} mins watch</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Department query */}
            <div className="p-4 bg-blue-900 text-white rounded-xl shadow">
              <h4 className="text-xs font-bold leading-tight">Need assistance from {activeDept.name}?</h4>
              <p className="text-[10.5px] text-blue-105 mt-1 font-sans leading-relaxed">
                Coordinate operational workflows quickly by lodging a request directly on their queue.
              </p>
              <button 
                onClick={() => onNavigateToTab('requests')}
                className="mt-3 w-full text-center py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] uppercase tracking-wider rounded transition-all"
              >
                Log inter-dept request
              </button>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // 2. Departments Grid Listing View
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h2 className="text-2xl font-sans font-bold tracking-tight text-gray-950 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-[#1E2D64]" /> Corporate Departments Portal
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Explore specialized agency desks, launch departmental applications, retrieve SOP regulatory papers and collaborate with team specialists.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEPARTMENTS.map((dept) => {
          const theme = getColorClasses(dept.color);
          const deptStaffCount = EMPLOYEES.filter(e => e.department === dept.name).length;
          
          return (
            <div
              key={dept.id}
              onClick={() => setSelectedDeptId(dept.id)}
              className="group bg-white border border-gray-205 hover:border-orange-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 justify-between">
                  {/* Department Icon badge styling */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${theme.bg}`}>
                    {dept.icon &&(() => {
                      const Icon = iconMap[dept.icon] || Building2;
                      return <Icon className="w-5 h-5" />;
                    })()}
                  </div>
                  
                  {/* Staff count pill */}
                  <span className="text-[10px] text-gray-400 font-mono bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-gray-400" /> {deptStaffCount || 2} Staff
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1E2D64] mt-4 tracking-tight leading-tight">
                  {dept.name}
                </h3>
                
                <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                  {dept.description}
                </p>

                {/* Tags lists */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {dept.quickTools.slice(0, 2).map((tool, index) => (
                    <span 
                      key={index} 
                      className="text-[9px] bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-650 rounded px-1.5 py-0.5 font-sans"
                    >
                      {tool}
                    </span>
                  ))}
                  {dept.quickTools.length > 2 && (
                    <span className="text-[9px] bg-slate-100 text-slate-500 rounded px-1.5 py-0.5 font-sans">
                      +{dept.quickTools.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span className="truncate max-w-[200px]">Lead: <strong>{dept.lead}</strong></span>
                <span className="text-blue-700 font-semibold group-hover:translate-x-1 duration-200 transition-all flex items-center gap-0.5">
                  Launch Portal <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
