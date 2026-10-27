import React, { useMemo } from 'react';
import { Employee, FileItem, KnowledgeArticle, Announcement, Video } from '../types';
import { Search, Users, FileText, BookOpen, Megaphone, Video as VideoIcon, ChevronRight } from 'lucide-react';

interface GlobalSearchViewProps {
  searchQuery: string;
  employees: Employee[];
  files: FileItem[];
  knowledge: KnowledgeArticle[];
  announcements: Announcement[];
  videos: Video[];
  onNavigateToTab: (tab: string) => void;
}

export default function GlobalSearchView({ 
  searchQuery, 
  employees, 
  files, 
  knowledge, 
  announcements,
  videos,
  onNavigateToTab 
}: GlobalSearchViewProps) {
  
  const q = searchQuery.toLowerCase();

  const results = useMemo(() => {
    if (!q.trim()) return null;

    const matchedEmployees = employees.filter(e => 
      e.name.toLowerCase().includes(q) || 
      e.role.toLowerCase().includes(q) || 
      e.department.toLowerCase().includes(q) ||
      (e.skills && e.skills.some(s => s.toLowerCase().includes(q)))
    );

    const matchedFiles = files.filter(f => 
      f.title.toLowerCase().includes(q) || 
      f.category.toLowerCase().includes(q) || 
      f.description.toLowerCase().includes(q)
    );

    const matchedKnowledge = knowledge.filter(k => 
      k.title.toLowerCase().includes(q) || 
      k.excerpt.toLowerCase().includes(q) || 
      k.tags.some(t => t.toLowerCase().includes(q))
    );

    const matchedAnnouncements = announcements.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.summary.toLowerCase().includes(q)
    );

    const matchedVideos = videos.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q)
    );

    return {
      employees: matchedEmployees,
      files: matchedFiles,
      knowledge: matchedKnowledge,
      announcements: matchedAnnouncements,
      videos: matchedVideos,
      total: matchedEmployees.length + matchedFiles.length + matchedKnowledge.length + matchedAnnouncements.length + matchedVideos.length
    };
  }, [q, employees, files, knowledge, announcements, videos]);

  if (!q.trim()) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Global Search</h2>
        <p className="text-slate-500">Type in the top search bar to find employees, documents, knowledge base articles, news, and more.</p>
      </div>
    );
  }

  if (results && results.total === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center animate-fade-in">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">No results found for "{searchQuery}"</h2>
        <p className="text-slate-500">Try adjusting your keywords or checking for typos.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12 font-sans">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-2xl font-bold text-slate-900">Search Results for "{searchQuery}"</h2>
        <p className="text-sm text-slate-500 mt-1">Found {results?.total} results across all modules.</p>
      </div>

      {results && results.employees.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-blue" /> People & Directory ({results.employees.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.employees.map(emp => (
              <div key={emp.id} onClick={() => onNavigateToTab('directory')} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{emp.name}</h4>
                  <p className="text-xs text-brand-blue font-medium truncate">{emp.role}</p>
                  <p className="text-[10px] text-slate-500 truncate">{emp.department}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            ))}
          </div>
        </div>
      )}

      {results && results.knowledge.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-orange" /> Knowledge Center & FAQs ({results.knowledge.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.knowledge.map(art => (
              <div key={art.id} onClick={() => onNavigateToTab('knowledge')} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-brand-orange/40 hover:shadow-md transition-all cursor-pointer">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded mb-2 inline-block">
                  {art.category}
                </span>
                <h4 className="font-bold text-slate-900 mb-1">{art.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{art.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {results && results.files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" /> Documents, Forms & SOPs ({results.files.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.files.map(file => (
              <div key={file.id} onClick={() => onNavigateToTab('documents')} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{file.title}</h4>
                  <p className="text-xs text-slate-500 truncate">{file.category}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{file.fileType}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {results && results.announcements.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-emerald-500" /> News & Announcements ({results.announcements.length})
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {results.announcements.map(ann => (
              <div key={ann.id} onClick={() => onNavigateToTab('news')} className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="font-bold text-slate-900 mb-1">{ann.title}</h4>
                <p className="text-sm text-slate-600 line-clamp-2">{ann.summary}</p>
                <div className="mt-2 text-xs text-slate-400 font-medium">By {ann.author} • {ann.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {results && results.videos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <VideoIcon className="w-5 h-5 text-fuchsia-500" /> Tutorials & Acculturation ({results.videos.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.videos.map(vid => (
              <div key={vid.id} onClick={() => onNavigateToTab('acculturation')} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                <img src={vid.thumbnail} alt={vid.title} className="w-20 h-14 object-cover rounded-md shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{vid.title}</h4>
                  <p className="text-[10px] text-slate-500 truncate mt-1">{vid.speaker}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
