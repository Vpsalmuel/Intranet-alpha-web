import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  PlusCircle, 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  Trash, 
  FolderOpen, 
  Sparkles,
  Award,
  Layers,
  ChevronDown
} from 'lucide-react';
import { FileItem, User } from '../types';

interface DocumentsViewProps {
  currentUser: User;
  files: FileItem[];
  onAddFile: (file: FileItem) => void;
}

export default function DocumentsView({
  currentUser,
  files,
  onAddFile
}: DocumentsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDept, setFilterDept] = useState('All');
  
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  // Form states for Upload Document Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<FileItem['category']>('SOPs');
  const [department, setDepartment] = useState('Claims Operations');
  const [fileSize, setFileSize] = useState('1.5 MB');
  const [fileType, setFileType] = useState<FileItem['fileType']>('PDF');
  const [description, setDescription] = useState('');
  const [version, setVersion] = useState('v1.0');

  // Trigger simulated file download
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});
  const [downloadSuccess, setDownloadSuccess] = useState<Record<string, boolean>>({});

  const isStaffAdmin = ['hr_admin', 'brand_admin', 'management', 'it_admin'].includes(currentUser.role);

  // Filter lists
  const categoriesList = [
    'All',
    'HR Policies',
    'IT Policies',
    'Compliance',
    'Staff Handbook',
    'SOPs',
    'Forms',
    'Templates',
    'Brand Guidelines',
    'Training Materials',
    'Process Documents'
  ];

  const deptsList = [
    'All',
    'People & Culture (HR)',
    'Claims Operations',
    'Underwriting',
    'Finance & Treasury',
    'IT & Digital Infrastructure',
    'Brand & Corporate Communications',
    'Risk & Compliance'
  ];

  // Filtering
  const filteredFiles = files.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = filterCategory === 'All' || item.category === filterCategory;
    const matchesDept = filterDept === 'All' || item.department === filterDept;

    return matchesSearch && matchesCat && matchesDept;
  });

  const activeDoc = files.find(f => f.id === selectedFileId);

  // Form submission upload
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Please fill out required document details.');
      return;
    }

    const newDoc: FileItem = {
      id: `file-${Date.now()}`,
      title,
      category,
      department,
      lastUpdated: new Date().toISOString().split('T')[0],
      fileSize: fileSize || '2.4 MB',
      fileType,
      downloadCount: 0,
      description,
      version: version || 'v1.0'
    };

    onAddFile(newDoc);
    setShowUploadForm(false);

    // reset forms
    setTitle('');
    setDescription('');
    setVersion('v1.0');
    setFileSize('1.5 MB');
  };

  // Simulate downloading file logic
  const handleSimulateDownload = (id: string) => {
    if (downloadProgress[id]) return; // already downloading
    setDownloadProgress(prev => ({ ...prev, [id]: 10 }));

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const cur = prev[id] || 0;
        if (cur >= 100) {
          clearInterval(interval);
          setDownloadSuccess(p => ({ ...p, [id]: true }));
          setTimeout(() => {
            // clear success indicator
            setDownloadSuccess(p => ({ ...p, [id]: false }));
            setDownloadProgress(p => {
              const cp = { ...p };
              delete cp[id];
              return cp;
            });
          }, 3000);
          return prev;
        }
        return { ...prev, [id]: cur + 30 };
      });
    }, 400);
  };

  // 1. Document Detail Screen Markup view
  if (activeDoc) {
    return (
      <div className="space-y-6 animate-fade-in pb-12 max-w-3xl">
        <button
          onClick={() => setSelectedFileId(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-655 hover:text-blue-900 bg-white border rounded px-3 py-1.5 shadow-sm transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Files Archive
        </button>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4 border-b border-gray-100 pb-5 mb-5 justify-between">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 bg-red-100 border border-red-200 rounded-xl flex items-center justify-center text-red-750 shrink-0 font-bold select-none text-sm">
                {activeDoc.fileType}
              </div>
              <div>
                <span className="px-2 py-0.5 text-[9px] font-bold font-mono tracking-wider bg-orange-105 border border-orange-205 text-orange-850 rounded uppercase">
                  {activeDoc.category}
                </span>
                <h3 className="text-sm font-bold text-gray-950 mt-1.5">{activeDoc.title}</h3>
                <p className="text-[10px] text-gray-400 mt-1">Version {activeDoc.version} &bull; Authority Desk: <strong>{activeDoc.department}</strong></p>
              </div>
            </div>

            <span className="text-xs bg-slate-100 border px-2.5 py-1 rounded font-mono text-slate-500 shrink-0">
              {activeDoc.fileSize}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-wider font-mono text-slate-450 block">File Description & Scope</h5>
              <p className="text-xs text-gray-700 font-sans mt-1.5 leading-relaxed bg-slate-55 border p-4 rounded-xl">
                {activeDoc.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-gray-100 pt-4 text-xs font-sans text-gray-600">
              <div>
                <span className="text-gray-405 block text-[10px] font-mono uppercase">Last Updated</span>
                <strong className="text-gray-805 block mt-0.5">{activeDoc.lastUpdated}</strong>
              </div>
              <div>
                <span className="text-gray-405 block text-[10px] font-mono uppercase">SOP File Code</span>
                <strong className="text-gray-805 block mt-0.5">SOP-MP-{activeDoc.id.replace('file-', '')}</strong>
              </div>
              <div>
                <span className="text-gray-405 block text-[10px] font-mono uppercase">Download count</span>
                <strong className="text-gray-850 block mt-0.5">{activeDoc.downloadCount + (downloadSuccess[activeDoc.id] ? 1 : 0)} times</strong>
              </div>
            </div>

            {/* Simulated interactive download button */}
            <div className="flex gap-3 pt-6 border-t border-gray-100">
              <button
                onClick={() => handleSimulateDownload(activeDoc.id)}
                className={`flex-1 text-center py-2.5 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all text-white ${
                  downloadSuccess[activeDoc.id] ? 'bg-emerald-600' : 
                  downloadProgress[activeDoc.id] ? 'bg-slate-700' : 'bg-[#1E2D64] hover:bg-opacity-95'
                }`}
              >
                {downloadSuccess[activeDoc.id] ? (
                  <span>✓ Download Complete! Saved to system</span>
                ) : downloadProgress[activeDoc.id] ? (
                  <span>Downloading... {downloadProgress[activeDoc.id]}%</span>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Download Official File
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => alert('Launching full-screen document viewer simulator...')}
                className="px-4 py-2 border border-blue-900 text-[#1E2D64] font-bold text-xs rounded-xl hover:bg-blue-50"
              >
                Launch Viewer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Document Upload Form view
  if (showUploadForm) {
    return (
      <div className="space-y-6 animate-fade-in pb-12 max-w-2xl">
        <button
          onClick={() => setShowUploadForm(false)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-blue-900 bg-white border rounded px-3 py-1.5 shadow-sm transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Files List
        </button>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h3 className="font-sans font-bold text-gray-900 text-base mb-1">Upload Portal Document</h3>
          <p className="text-xs text-gray-500 mb-6">Contribute regulatory checklists, SOP procedures, HR handbook sheets or brand vector assets into the organization archive.</p>

          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Document Title *</label>
              <input
                id="doc-form-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Underwriting Risk Profiling Assessment Matrix SOP"
                className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Administrative Category *</label>
                <select
                  id="doc-form-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FileItem['category'])}
                  className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2 cursor-pointer"
                >
                  {categoriesList.filter(c=>c!=='All').map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Publishing Division *</label>
                <select
                  id="doc-form-dept"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2 cursor-pointer"
                >
                  {deptsList.filter(d=>d!=='All').map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">File Version *</label>
                <input
                  id="doc-form-version"
                  type="text"
                  required
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="e.g. v2.4"
                  className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">File Size *</label>
                <input
                  id="doc-form-file-size"
                  type="text"
                  required
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  placeholder="e.g. 5.4 MB"
                  className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">File type format *</label>
                <select
                  id="doc-form-file-type"
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value as FileItem['fileType'])}
                  className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2 cursor-pointer"
                >
                  <option value="PDF">PDF</option>
                  <option value="DOCX">DOCX Word</option>
                  <option value="XLSX">XLSX Excel</option>
                  <option value="PPTX">PPTX Slide</option>
                  <option value="ZIP">ZIP Archive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Detailed Summary & Document Scope *</label>
              <textarea
                id="doc-form-desc"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what organizational guidelines, policy declarations or compliance metrics this file outlines..."
                className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2 focus:bg-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-4 py-2 border text-gray-750 text-xs font-bold rounded-lg hover:bg-slate-50"
              >
                Discard Draft
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-900 hover:bg-[#1f2e62] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow"
              >
                Upload to Enterprise Cloud
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 3. Document Repository Listing 
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-gray-950 flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-[#1E2D64]" /> Enterprise Document Library
          </h2>
          <p className="text-xs text-gray-500 mt-1">Access policy catalogs, standard operating procedure SOP briefs, administrative forms, and graphic design kits.</p>
        </div>

        {isStaffAdmin && (
          <button
            id="upload-document-button"
            onClick={() => setShowUploadForm(true)}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 border border-orange-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow"
          >
            <PlusCircle className="w-4 h-4" /> Upload Document
          </button>
        )}
      </div>

      {/* Two Columns Search & Filtering Area */}
      <div className="bg-white border p-4 rounded-xl shadow shadow-sm gap-4 grid md:grid-cols-12 items-stretch">
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="doc-library-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents by keywords..."
            className="w-full bg-slate-50 border border-gray-205 text-gray-850 text-xs rounded-lg pl-9 pr-4 py-2 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="md:col-span-3 flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase text-gray-400">Category:</span>
          <select
            id="doc-cat-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="flex-1 bg-slate-50 border border-gray-205 text-gray-850 text-xs rounded-lg px-2.5 py-1.5 cursor-pointer"
          >
            {categoriesList.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-4 flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase text-gray-400">Department:</span>
          <select
            id="doc-dept-select"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="flex-1 bg-slate-50 border border-gray-205 text-gray-850 text-xs rounded-lg px-2.5 py-1.5 cursor-pointer"
          >
            {deptsList.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Files directory listing */}
      <div className="bg-white border rounded-2xl overflow-hidden shadow">
        {filteredFiles.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-sans">
            <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-gray-850">No Manuals Found</h4>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">Try clearing search keyword scopes or adjusting category department parameters.</p>
            <button
              onClick={() => { setSearchQuery(''); setFilterCategory('All'); setFilterDept('All'); }}
              className="mt-4 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-105">
            {filteredFiles.map((doc) => {
              const fileProgress = downloadProgress[doc.id] || 0;
              const hasFileSuccess = downloadSuccess[doc.id] || false;

              return (
                <div 
                  key={doc.id}
                  onClick={() => setSelectedFileId(doc.id)}
                  className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 cursor-pointer transition-all duration-150"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-655 font-bold font-mono text-xs shadow-sm select-none shrink-0">
                      {doc.fileType}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-950 font-sans text-xs truncate max-w-sm md:max-w-md">{doc.title}</h4>
                        <span className="text-[9px] bg-blue-50 text-blue-750 font-mono rounded px-1.5 py-0.5 font-bold border border-blue-100 shrink-0">
                          {doc.version}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1 truncate max-w-xs md:max-w-xlLeading">{doc.description}</p>
                      
                      <div className="flex flex-wrap gap-2.5 items-center mt-2 text-[10px] text-gray-400 font-mono">
                        <span className="bg-slate-50 px-1.5 py-0.5 rounded border">Cat: <strong>{doc.category}</strong></span>
                        <span>•</span>
                        <span>Desk: <strong>{doc.department.replace(' Operations', '')}</strong></span>
                        <span>•</span>
                        <span>Updated: {doc.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
                    <span className="text-xs text-gray-400 font-mono font-semibold">{doc.fileSize}</span>

                    {/* Simulated download click inside list */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSimulateDownload(doc.id);
                      }}
                      className={`px-3 py-1.5 font-bold font-sans text-xs rounded-lg border flex items-center gap-1 shadow-sm transition-all ${
                        hasFileSuccess ? 'bg-emerald-50 text-emerald-805 border-emerald-305' :
                        fileProgress > 0 ? 'bg-slate-100 text-slate-800' : 'bg-white text-blue-900 border-blue-900 hover:bg-slate-50'
                      }`}
                    >
                      {hasFileSuccess ? (
                        <span>✓ Done</span>
                      ) : fileProgress > 0 ? (
                        <span>{fileProgress}%</span>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" /> Get File
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
