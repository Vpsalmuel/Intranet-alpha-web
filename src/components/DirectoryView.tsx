import React, { useState, useMemo } from 'react';
import { Employee } from '../types';
import { Search, Mail, Phone, MapPin, Briefcase, ChevronRight, Users, Network, Target, X, BookOpen, Award, Shield, User, Heart, AlertCircle, Languages, LayoutDashboard } from 'lucide-react';

interface DirectoryViewProps {
  employees: Employee[];
}

export default function DirectoryView({ employees }: DirectoryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'org'>('grid');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  const departments = ['All', ...Array.from(new Set(employees.map(e => e.department)))];

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (emp.skills && emp.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [employees, searchTerm, selectedDept]);

  // Helper for Org Chart Mode
  const getDirectReports = (managerName: string) => {
    return employees.filter(e => e.manager === managerName && e.name !== managerName);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in font-sans pb-12 relative">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Organization Directory</h2>
          <p className="text-sm text-slate-500 mt-1">Find colleagues, view reporting structures, and discover expertise.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-brand-blue' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Users className="w-4 h-4" /> Directory
          </button>
          <button 
            onClick={() => setViewMode('org')}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'org' ? 'bg-white shadow-sm text-brand-blue' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Network className="w-4 h-4" /> Reporting Structure
          </button>
        </div>
      </div>

      {viewMode === 'grid' && (
        <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search by name, role, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>
            <select 
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEmployees.map(emp => (
              <div 
                key={emp.id} 
                onClick={() => setSelectedEmployee(emp)}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all group flex flex-col h-full cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={emp.avatar} alt={emp.name} className="w-16 h-16 rounded-full object-cover border border-slate-200" />
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-brand-blue transition-colors">{emp.name}</h3>
                    <p className="text-xs text-brand-blue font-medium">{emp.role}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-0.5">{emp.department}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4 flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{emp.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{emp.location}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1"><Briefcase className="w-3 h-3" /> Reports To</p>
                    <div className="flex items-center gap-2 text-sm text-slate-800 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(emp.manager)}&background=random`} alt="" className="w-5 h-5 rounded-full" />
                      {emp.manager}
                    </div>
                  </div>
                  
                  {(emp.skills || emp.expertise) && (
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1"><Target className="w-3 h-3" /> Top Skills & Expertise</p>
                      <div className="flex flex-wrap gap-1">
                        {[...(emp.skills || []), ...(emp.expertise || [])].slice(0, 3).map(skill => (
                          <span key={skill} className="px-2 py-0.5 bg-brand-orange/10 text-brand-orange border border-brand-orange/20 text-[9px] font-bold rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {filteredEmployees.length === 0 && (
            <div className="text-center py-20">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No employees found</h3>
              <p className="text-slate-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </>
      )}

      {viewMode === 'org' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[600px]">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><Network className="w-5 h-5 text-brand-blue" /> Reporting Structure</h3>
          
          <div className="space-y-6">
            {/* Simple hierarchical visualization based on the data */}
            {employees.filter(e => !employees.find(m => m.name === e.manager)).map(topLeader => (
              <div key={topLeader.id} className="border border-slate-200 rounded-xl p-6 bg-slate-50">
                <div 
                  className="flex items-center gap-4 mb-6 cursor-pointer group"
                  onClick={() => setSelectedEmployee(topLeader)}
                >
                  <img src={topLeader.avatar} alt={topLeader.name} className="w-14 h-14 rounded-full border-2 border-brand-blue shadow-sm group-hover:scale-105 transition-transform" />
                  <div>
                    <h4 className="font-bold text-lg text-slate-900 group-hover:text-brand-blue transition-colors">{topLeader.name}</h4>
                    <p className="text-sm font-medium text-brand-blue">{topLeader.role}</p>
                  </div>
                </div>
                
                <div className="pl-6 ml-6 border-l-2 border-slate-200 space-y-6">
                  {getDirectReports(topLeader.name).map(report => (
                    <div key={report.id} className="relative">
                      <div className="absolute -left-6 top-6 w-6 h-0.5 bg-slate-200" />
                      <div 
                        className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-brand-blue/30 hover:shadow-md transition-all cursor-pointer group"
                        onClick={() => setSelectedEmployee(report)}
                      >
                        <div className="flex items-center gap-3">
                          <img src={report.avatar} alt={report.name} className="w-10 h-10 rounded-full group-hover:scale-105 transition-transform" />
                          <div>
                            <h5 className="font-bold text-slate-900 group-hover:text-brand-blue transition-colors">{report.name}</h5>
                            <p className="text-xs font-medium text-slate-600">{report.role}</p>
                          </div>
                        </div>
                        
                        {getDirectReports(report.name).length > 0 && (
                          <div className="mt-4 pl-4 ml-4 border-l border-slate-100 space-y-3">
                            {getDirectReports(report.name).map(subReport => (
                              <div 
                                key={subReport.id} 
                                className="relative flex items-center gap-2 cursor-pointer group/sub hover:bg-slate-50 p-1.5 -ml-1.5 rounded-lg"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEmployee(subReport);
                                }}
                              >
                                <div className="absolute -left-4 top-1/2 w-4 h-px bg-slate-100" />
                                <img src={subReport.avatar} alt={subReport.name} className="w-6 h-6 rounded-full group-hover/sub:scale-110 transition-transform" />
                                <div>
                                  <h6 className="text-xs font-bold text-slate-800 group-hover/sub:text-brand-blue transition-colors">{subReport.name}</h6>
                                  <p className="text-[10px] text-slate-500">{subReport.role}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Employee Profile Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="relative h-32 bg-gradient-to-r from-brand-blue to-indigo-800 shrink-0">
              <button 
                onClick={() => setSelectedEmployee(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-0 relative">
              {/* Profile Top Section */}
              <div className="flex flex-col sm:flex-row gap-6 -mt-16 mb-8 relative z-10">
                <img 
                  src={selectedEmployee.avatar} 
                  alt={selectedEmployee.name} 
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg bg-white shrink-0" 
                />
                <div className="pt-16 sm:pt-20">
                  <h2 className="text-3xl font-bold text-slate-900">{selectedEmployee.name}</h2>
                  <p className="text-lg font-medium text-brand-blue">{selectedEmployee.role}</p>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">{selectedEmployee.department}</p>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8 p-5 bg-slate-50 border border-slate-100 rounded-xl">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-slate-400" /> About
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedEmployee.bio}</p>
              </div>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Contact Info */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-slate-400" /> Contact & Location
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-slate-700 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="font-medium break-all">{selectedEmployee.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-700 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{selectedEmployee.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-700 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{selectedEmployee.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Manager */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Network className="w-4 h-4 text-slate-400" /> Reports To
                    </h4>
                    <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedEmployee.manager)}&background=random`} alt="" className="w-12 h-12 rounded-full" />
                      <div>
                        <h5 className="font-bold text-slate-900">{selectedEmployee.manager}</h5>
                        <p className="text-xs text-slate-500">Line Manager</p>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  {selectedEmployee.emergencyContact && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-red-400" /> Emergency Contact
                      </h4>
                      <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                        <h5 className="font-bold text-slate-900">{selectedEmployee.emergencyContact.name}</h5>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-slate-600">{selectedEmployee.emergencyContact.relation}</p>
                          <p className="text-sm font-bold text-red-600">{selectedEmployee.emergencyContact.phone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Languages */}
                  {selectedEmployee.languages && selectedEmployee.languages.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <Languages className="w-4 h-4 text-slate-400" /> Languages
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.languages.map(lang => (
                          <span key={lang} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-lg border border-indigo-100">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Skills & Expertise */}
                  {(selectedEmployee.skills?.length > 0 || selectedEmployee.expertise?.length > 0) && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-slate-400" /> Skills & Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.expertise?.map(exp => (
                          <span key={exp} className="px-3 py-1.5 bg-brand-orange/10 text-brand-orange font-bold text-xs rounded-lg border border-brand-orange/20">
                            {exp}
                          </span>
                        ))}
                        {selectedEmployee.skills?.map(skill => (
                          <span key={skill} className="px-3 py-1.5 bg-slate-100 text-slate-700 font-medium text-xs rounded-lg border border-slate-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {selectedEmployee.projects && selectedEmployee.projects.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <LayoutDashboard className="w-4 h-4 text-slate-400" /> Key Projects
                      </h4>
                      <ul className="space-y-2">
                        {selectedEmployee.projects.map(proj => (
                          <li key={proj} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="text-brand-blue mt-1">•</span> {proj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Training & Certificates */}
                  {(selectedEmployee.training?.length > 0 || selectedEmployee.certificates?.length > 0) && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-slate-400" /> Training & Certifications
                      </h4>
                      <div className="space-y-3">
                        {selectedEmployee.certificates?.map(cert => (
                          <div key={cert} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                              <Award className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-slate-800">{cert}</span>
                          </div>
                        ))}
                        {selectedEmployee.training?.map(train => (
                          <div key={train} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium text-slate-700">{train}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Awards */}
                  {selectedEmployee.awards && selectedEmployee.awards.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-slate-400" /> Awards & Recognition
                      </h4>
                      <div className="space-y-3">
                        {selectedEmployee.awards.map(award => (
                          <div key={award} className="flex items-center gap-3 p-3 bg-white border border-amber-200 rounded-xl shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                              <Shield className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-bold text-slate-800">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interests */}
                  {selectedEmployee.interests && selectedEmployee.interests.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-slate-400" /> Personal Interests
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.interests.map(interest => (
                          <span key={interest} className="px-3 py-1 bg-rose-50 text-rose-600 font-medium text-xs rounded-full border border-rose-100">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
