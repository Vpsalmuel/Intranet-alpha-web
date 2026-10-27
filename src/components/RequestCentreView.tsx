import React, { useState } from 'react';
import { 
  GitPullRequest, 
  Search, 
  PlusCircle, 
  ArrowLeft, 
  MessageSquare, 
  Clock, 
  User as UserIcon, 
  Paperclip, 
  Send,
  AlertCircle,
  CheckCircle,
  FileText,
  Bookmark,
  TrendingDown,
  XCircle,
  CornerDownRight,
  Sparkles,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { RequestItem, User, RequestStatus, RequestPriority, Comment } from '../types';
import { DEPARTMENTS } from '../data/mockData';

interface RequestCentreViewProps {
  currentUser: User;
  requests: RequestItem[];
  onCreateRequest: (req: RequestItem) => void;
  onUpdateRequest: (req: RequestItem) => void;
  selectedRequestId: string | null;
  onClearSelectedRequest: () => void;
  onSelectRequest: (id: string | null) => void;
}

export default function RequestCentreView({
  currentUser,
  requests,
  onCreateRequest,
  onUpdateRequest,
  selectedRequestId,
  onClearSelectedRequest,
  onSelectRequest
}: RequestCentreViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'mine' | 'assigned' | 'progress' | 'completed' | 'approver'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Submission Form states
  const [title, setTitle] = useState('');
  const [receivingDeptName, setReceivingDeptName] = useState('IT & Digital Infrastructure');
  const [requestType, setRequestType] = useState('Company Resource');
  const [resourceType, setResourceType] = useState('Banner');
  const [quantity, setQuantity] = useState(1);
  const [priority, setPriority] = useState<RequestPriority>('Medium');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [fileAttachment, setFileAttachment] = useState<string>('');

  // Comment section state
  const [commentText, setCommentText] = useState('');

  // Get dynamic request type options based on Selected Receiving Department
  const getRequestTypesForDept = (deptName: string) => {
    let types: string[] = [];
    if (deptName.includes('Brand')) {
      types = [
        'Branded item request',
        'Design request',
        'Campaign support',
        'Event publicity',
        'Internal communication request',
        'Social media request',
        'Brand asset request'
      ];
    } else if (deptName.includes('HR') || deptName.includes('People')) {
      types = [
        'Staff documentation request',
        'Onboarding support',
        'Training request',
        'Welfare request',
        'Employee relations request'
      ];
    } else if (deptName.includes('Finance')) {
      types = [
        'Payment request',
        'Budget support',
        'Reimbursement request',
        'Vendor payment follow-up',
        'Invoice processing'
      ];
    } else if (deptName.includes('Admin') || deptName.includes('Facilities')) {
      types = [
        'Facility request',
        'Office supplies',
        'Meeting room setup',
        'Logistics request',
        'Maintenance request'
      ];
    } else {
      // Default IT
      types = [
        'System access request',
        'Device issue',
        'Email issue',
        'Software installation',
        'Technical support',
        'Password reset',
        'Application access'
      ];
    }
    return ['Company Resource', ...types];
  };

  // Handle department change to automatically align request type selection
  const handleReceivingDeptChange = (dept: string) => {
    setReceivingDeptName(dept);
    const types = getRequestTypesForDept(dept);
    setRequestType(types[0]);
  };

  // Submit Request Handle
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const isCompanyResource = requestType === 'Company Resource';
    const finalTitle = isCompanyResource ? `Company Resource: ${resourceType} x${quantity}` : title;
    
    if (!finalTitle || !dueDate || !description) {
      alert('Please fill out all required fields.');
      return;
    }

    const newReq: RequestItem = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      title: finalTitle,
      requestingDept: currentUser.department,
      receivingDept: receivingDeptName,
      requestType,
      requestedBy: currentUser.name,
      requesterEmail: currentUser.email,
      priority,
      dueDate,
      status: 'Submitted',
      lastUpdated: new Date().toISOString().split('T')[0],
      description,
      attachments: fileAttachment ? [fileAttachment] : [],
      comments: [],
      history: [
        {
          action: 'Request Submitted',
          user: currentUser.name,
          timestamp: new Date().toLocaleString()
        }
      ]
    };

    onCreateRequest(newReq);
    setShowCreateForm(false);
    
    // reset Form
    setTitle('');
    setDescription('');
    setDueDate('');
    setFileAttachment('');
  };

  // Post dynamic Comment
  const handlePostComment = (activeReq: RequestItem) => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: currentUser.name,
      authorRole: currentUser.jobTitle,
      content: commentText,
      timestamp: new Date().toLocaleString()
    };

    const updated: RequestItem = {
      ...activeReq,
      comments: [...activeReq.comments, newComment],
      history: [
        ...activeReq.history,
        {
          action: `Added Comment`,
          user: currentUser.name,
          timestamp: new Date().toLocaleString()
        }
      ]
    };

    onUpdateRequest(updated);
    setCommentText('');
  };

  // Update Status action helper
  const handleUpdateStatus = (activeReq: RequestItem, newStatus: RequestStatus) => {
    const updated: RequestItem = {
      ...activeReq,
      status: newStatus,
      lastUpdated: new Date().toISOString().split('T')[0],
      assignedOwner: newStatus === 'In Progress' && !activeReq.assignedOwner ? currentUser.name : activeReq.assignedOwner,
      history: [
        ...activeReq.history,
        {
          action: `Status marked as: ${newStatus}`,
          user: currentUser.name,
          timestamp: new Date().toLocaleString()
        }
      ]
    };
    onUpdateRequest(updated);
  };

  // Tab Filtering
  const filteredRequests = requests.filter(req => {
    // Search filter
    const matchesSearch = 
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requestedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Tab filter
    if (activeTab === 'mine') {
      return req.requestedBy === currentUser.name;
    }
    if (activeTab === 'assigned') {
      return req.receivingDept === currentUser.department;
    }
    if (activeTab === 'progress') {
      return req.status === 'In Progress' || req.status === 'Pending Review';
    }
    if (activeTab === 'completed') {
      return req.status === 'Completed';
    }
    return true; // all
  });

  const activeRequest = requests.find(r => r.id === selectedRequestId);

  // Status Badge styling helper
  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200/80';
      case 'In Progress':
        return 'bg-amber-50 text-amber-700 border border-amber-200/80';
      case 'Pending Review':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-200/80';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border border-rose-200/80';
      case 'Submitted':
        return 'bg-blue-50 text-blue-700 border border-blue-200/80';
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-200/80';
    }
  };

  const getStatusDot = (status: RequestStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500';
      case 'In Progress':
        return 'bg-amber-500 animate-pulse';
      case 'Pending Review':
        return 'bg-indigo-500';
      case 'Rejected':
        return 'bg-rose-500';
      case 'Submitted':
        return 'bg-blue-500';
      default:
        return 'bg-slate-400';
    }
  };

  // Priority badge styling helper
  const getPriorityBadge = (p: RequestPriority) => {
    switch (p) {
      case 'Urgent': return 'bg-rose-50 text-rose-700 border border-rose-200 font-semibold';
      case 'High': return 'bg-orange-50 text-[#EA580C] border border-orange-200 font-medium';
      case 'Medium': return 'bg-sky-50 text-sky-700 border border-sky-200 font-medium';
      default: return 'bg-slate-50 text-slate-600 border border-slate-200 font-normal';
    }
  };

  // 1. Detailed Request Ticket view
  if (activeRequest) {
    const isReceivingDeptMember = activeRequest.receivingDept === currentUser.department;
    const isRequester = activeRequest.requestedBy === currentUser.name;
    const canManageType = currentUser.isApprover || isReceivingDeptMember || ['it_admin', 'brand_admin', 'hr_admin', 'management'].includes(currentUser.role);

    return (
      <div className="space-y-6 animate-fade-in pb-12">
        <button
          onClick={onClearSelectedRequest}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200/80 rounded-xl px-3.5 py-2 shadow-xs transition-all hover:bg-slate-50"
        >
          <ArrowLeft strokeWidth={1.5} className="w-3.5 h-3.5" /> Back to Request Dashboard
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Main Ticket Info / timeline comments */}
          <div className="xl:col-span-8 space-y-6">
            
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">{activeRequest.id}</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] tracking-wide rounded-full font-mono ${getStatusBadge(activeRequest.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(activeRequest.status)}`} />
                      {activeRequest.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{activeRequest.title}</h3>
                </div>

                <span className={`px-2.5 py-1 text-[11px] font-mono leading-none rounded-lg ${getPriorityBadge(activeRequest.priority)}`}>
                  {activeRequest.priority.toUpperCase()} PRIORITY
                </span>
              </div>

              {/* Subtitle fields */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-3 bg-slate-55 border rounded-xl px-4 text-xs text-gray-600 mb-6 font-sans">
                <div>
                  <span className="text-gray-400 block font-mono text-[9px] uppercase tracking-wider">Submitted By</span>
                  <strong className="text-gray-850 mt-0.5 block">{activeRequest.requestedBy}</strong>
                  <span className="text-[10px] text-gray-400 block">{activeRequest.requestingDept}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-mono text-[9px] uppercase tracking-wider">Assigned Provider</span>
                  <strong className="text-gray-850 mt-0.5 block">{activeRequest.receivingDept}</strong>
                  <span className="text-[10px] text-gray-400 block">Owner: {activeRequest.assignedOwner || 'Unassigned'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-mono text-[9px] uppercase tracking-wider">Required Date</span>
                  <strong className="text-red-600 mt-0.5 block">{activeRequest.dueDate}</strong>
                  <span className="text-[10px] text-gray-400 block">Last Update: {activeRequest.lastUpdated}</span>
                </div>
              </div>

              {/* Description Body */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-bold font-mono text-slate-550 uppercase tracking-wider">Specification Scope</h4>
                <p className="text-xs text-gray-700 leading-relaxed font-sans bg-slate-50 border p-4 rounded-xl whitespace-pre-wrap">
                  {activeRequest.description}
                </p>
              </div>

              {/* Mounted mock files */}
              {activeRequest.attachments && activeRequest.attachments.length > 0 && (
                <div className="border-t border-gray-100 pt-4 mb-6">
                  <h4 className="text-xs font-bold font-mono text-slate-550 uppercase tracking-wider mb-2">Attached Deliverables File</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeRequest.attachments.map((file, idx) => (
                      <div key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 border hover:border-blue-400 rounded-lg bg-gray-50/50 text-xs">
                        <Paperclip className="w-3.5 h-3.5 text-gray-405" />
                        <span className="font-semibold text-gray-750">{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Commentary streams */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h4 className="font-sans font-bold text-gray-900 text-sm mb-4">Interdepartmental Discussion Log</h4>

              <div className="space-y-4 mb-6">
                {activeRequest.comments.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">No comments logged. Coordinate questions or upload specifications here.</p>
                ) : (
                  activeRequest.comments.map((com) => (
                    <div key={com.id} className="p-3.5 bg-slate-50 border rounded-xl relative">
                      <div className="flex justify-between items-center text-[10px] text-gray-400">
                        <span>
                          <strong className="text-gray-800">{com.author}</strong> • {com.authorRole}
                        </span>
                        <span>{com.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-655 mt-1.5 leading-relaxed font-sans">{com.content}</p>
                    </div>
                  ))
                )}
              </div>

              {/* comment box submit */}
              <div className="flex gap-2">
                <input
                  id="ticket-comment-text"
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Ask a clarifying question, post status coordinates or deliver files..."
                  className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3.5 py-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-orange/40 focus:border-brand-orange"
                />
                <button
                  onClick={() => handlePostComment(activeRequest)}
                  className="px-4 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Send strokeWidth={1.5} className="w-3.5 h-3.5" /> Post Comment
                </button>
              </div>
            </div>

          </div>

          {/* Right Action panel */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* Action Panel based on roles */}
            <div className="bg-white border p-6 rounded-2xl shadow-sm">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#1E2D64] mb-3 block">
                Manage Request Pipeline
              </h4>

              {canManageType ? (
                <div className="space-y-2.5">
                  <p className="text-[11px] text-gray-400 mb-2 leading-relaxed">
                    As an authorized approver or member of the assigned receiving department (<strong>{activeRequest.receivingDept}</strong>), you can alter status states directly:
                  </p>

                  <button
                    onClick={() => handleUpdateStatus(activeRequest, 'Approved')}
                    disabled={activeRequest.status === 'Approved' || activeRequest.status === 'Fulfilled'}
                    className="w-full text-center py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-all"
                  >
                    <span>👍 Approve Request</span>
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(activeRequest, 'Fulfilled')}
                    disabled={activeRequest.status === 'Fulfilled'}
                    className="w-full text-center py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" /> Mark as Fulfilled
                  </button>

                  <button
                    onClick={() => {
                      const reason = prompt('Please enter the reason for rejection:');
                      if (reason !== null) {
                        handleUpdateStatus(activeRequest, 'Rejected');
                      }
                    }}
                    disabled={activeRequest.status === 'Rejected'}
                    className="w-full text-center py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-all"
                  >
                    <XCircle className="w-4 h-4" /> Reject/Decline Request
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(activeRequest, 'Pending Review')}
                    disabled={activeRequest.status === 'Pending Review'}
                    className="w-full text-center py-2 border border-slate-205 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Awaiting Line Audit Review</span>
                  </button>
                </div>
              ) : (
                <div className="bg-[#1E2D64]/5 border p-4 rounded-xl text-center">
                  <AlertCircle className="w-8 h-8 text-[#1E2D64] mx-auto mb-2" />
                  <h5 className="text-xs font-bold text-gray-800 leading-tight">View Only Mode Active</h5>
                  <p className="text-[10.5px] text-gray-500 mt-1 leading-relaxed">
                    This request is assigned to <strong>{activeRequest.receivingDept}</strong>. Change your sandbox persona to align with their department to administer resolutions.
                  </p>
                </div>
              )}
            </div>

            {/* Audit History Timeline */}
            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 mb-3 block">
                Activity Audit log
              </h4>
              <div className="space-y-4">
                {activeRequest.history.slice().reverse().map((hist, idx) => (
                  <div key={idx} className="flex gap-2.5 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-1 shrink-0" />
                    <div>
                      <h5 className="font-bold text-gray-800">{hist.action}</h5>
                      <p className="text-[10px] text-gray-400 mt-0.5">By {hist.user} &bull; {hist.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // 2. Submission dynamic creation form
  if (showCreateForm) {
    const activeTypes = getRequestTypesForDept(receivingDeptName);

    return (
      <div className="space-y-6 animate-fade-in pb-12 max-w-2xl">
        <button
          onClick={() => setShowCreateForm(false)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-blue-900 bg-white border rounded px-3 py-1.5 shadow-sm transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h3 className="font-sans font-bold text-gray-900 text-base mb-1">Log Interdepartmental Request</h3>
          <p className="text-xs text-gray-500 mb-6">Create, assign, or request system access, design assets, and payments from other department teams.</p>

          <form onSubmit={handleSubmitRequest} className="space-y-4">
            {requestType !== 'Company Resource' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Request Ticket Summary *</label>
                <input
                  id="req-form-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Developer credentials setup and Claims Operations server access tokens"
                  className="w-full bg-slate-50/50 border border-gray-250 text-gray-850 text-xs rounded-lg px-3 py-2"
                />
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Receiving Department *</label>
                <select
                  id="req-form-receiving-dept"
                  value={receivingDeptName}
                  onChange={(e) => handleReceivingDeptChange(e.target.value)}
                  className="w-full bg-slate-50/50 border border-gray-250 text-gray-850 text-xs rounded-lg px-3 py-2 cursor-pointer"
                >
                  {DEPARTMENTS.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Request Type (Dynamic) *</label>
                <select
                  id="req-form-type"
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full bg-slate-50/50 border border-gray-250 text-gray-850 text-xs rounded-lg px-3 py-2 cursor-pointer"
                >
                  {activeTypes.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {requestType === 'Company Resource' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Resource Type *</label>
                  <select
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value)}
                    className="w-full bg-slate-50/50 border border-gray-250 text-gray-850 text-xs rounded-lg px-3 py-2 cursor-pointer"
                  >
                    <option>Banner</option>
                    <option>Branded Apparel</option>
                    <option>Business Cards</option>
                    <option>Promotional Material</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-50/50 border border-gray-250 text-gray-850 text-xs rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Priority Level *</label>
                <select
                  id="req-form-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as RequestPriority)}
                  className="w-full bg-slate-50/50 border border-gray-250 text-gray-850 text-xs rounded-lg px-3 py-2 cursor-pointer"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Urgent">Urgent Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Required Due Date *</label>
                <input
                  id="req-form-due-date"
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-slate-50/50 border border-gray-205 text-gray-850 text-xs rounded-lg px-3 py-1.5 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Detailed Task Specifications *</label>
              <textarea
                id="req-form-desc"
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="List concrete deliverables, server IP directories or branding references necessary for resolution..."
                className="w-full bg-slate-50/50 border border-gray-205 text-gray-850 text-xs rounded-lg px-3 py-2 focus:bg-white"
              />
            </div>

            {/* Mock Drag drop attachment selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Lodge Specification Files (Supports Doc, excel or images)</label>
              <div className="border border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50">
                <Paperclip className="w-8 h-8 text-slate-300 mx-auto mb-1" />
                <span className="text-xs text-gray-700 font-semibold block">Choose file or drag here</span>
                <span className="text-[10px] text-gray-400 mt-0.5">Maximum attachment limit: 15MB</span>
              </div>
              <input
                id="req-form-attachment-input"
                type="text"
                value={fileAttachment}
                onChange={(e) => setFileAttachment(e.target.value)}
                placeholder="Simulate attachment tag here e.g. DesignRequirementsKit.pdf"
                className="w-full mt-2 bg-slate-50 border text-xs rounded px-2.5 py-1"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle strokeWidth={1.5} className="w-4 h-4" />
                <span>Lodge Support Ticket</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 3. Tab Grid board Listing
  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header board */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <GitPullRequest strokeWidth={1.5} className="w-6 h-6 text-brand-blue" />
            <span>Departmental Collaborative Request Centre</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">Submit assistance requests or resolve incoming operational workflow tickets between company divisions.</p>
        </div>

        <button
          id="lodge-request-trigger-button"
          onClick={() => {
            handleReceivingDeptChange('IT & Digital Infrastructure');
            setShowCreateForm(true);
          }}
          className="px-4 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 self-stretch md:self-auto transition-all cursor-pointer"
        >
          <PlusCircle strokeWidth={1.5} className="w-4 h-4" />
          <span>Log New Request</span>
        </button>
      </div>

      {/* Tabs list filter bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex flex-wrap gap-1.5 border-b border-slate-100 md:border-b-0 pb-3 md:pb-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 text-xs rounded-xl transition-all font-medium ${
              activeTab === 'all' ? 'bg-[#1E2D64] text-white shadow-xs font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Tickets ({requests.length})
          </button>
          {currentUser.isApprover && (
            <button
              onClick={() => setActiveTab('approver')}
              className={`px-3.5 py-1.5 text-xs rounded-xl transition-all font-medium flex items-center gap-1.5 border ${
                activeTab === 'approver' 
                  ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-xs font-semibold' 
                  : 'border-orange-200/80 bg-orange-50/70 text-[#EA580C] hover:bg-orange-100'
              }`}
            >
              <CheckCircle strokeWidth={1.5} className="w-3.5 h-3.5" />
              <span>Approver View</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('mine')}
            className={`px-3.5 py-1.5 text-xs rounded-xl transition-all font-medium ${
              activeTab === 'mine' ? 'bg-[#1E2D64] text-white shadow-xs font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Lodge by me
          </button>
          <button
            onClick={() => setActiveTab('assigned')}
            className={`px-3.5 py-1.5 text-xs rounded-xl transition-all font-medium flex items-center gap-1.5 ${
              activeTab === 'assigned' ? 'bg-[#1E2D64] text-white shadow-xs font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Assigned to My Dept</span>
            <span className="w-2 h-2 bg-[#EA580C] rounded-full inline-block animate-pulse shrink-0" />
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-3.5 py-1.5 text-xs rounded-xl transition-all font-medium ${
              activeTab === 'progress' ? 'bg-[#1E2D64] text-white shadow-xs font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            In-Progress
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3.5 py-1.5 text-xs rounded-xl transition-all font-medium ${
              activeTab === 'completed' ? 'bg-[#1E2D64] text-white shadow-xs font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Resolved Tickets
          </button>
        </div>

        <div className="relative flex-1 max-w-sm">
          <Search strokeWidth={1.5} className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="req-filter-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets by ID, title, requester..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-9 pr-8 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue/30 focus:border-brand-blue"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Grid listing Table layout */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center">
            <GitPullRequest strokeWidth={1.5} className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-slate-800">No Request Tickets Found</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">No tickets match your filter criteria or search terms.</p>
            <button
              onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
              className="mt-4 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs text-slate-700">
              <thead className="bg-slate-50/80 text-slate-500 uppercase text-[10px] tracking-wider font-mono border-b border-slate-200/80">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Ticket ID</th>
                  <th className="px-5 py-3.5 font-semibold">Request Title</th>
                  <th className="px-5 py-3.5 font-semibold">Requester</th>
                  <th className="px-5 py-3.5 font-semibold">Assigned Team</th>
                  <th className="px-5 py-3.5 font-semibold">Priority</th>
                  <th className="px-5 py-3.5 font-semibold">Due Date</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((req) => (
                  <tr 
                    key={req.id} 
                    onClick={() => onSelectRequest(req.id)}
                    className="hover:bg-slate-50/70 cursor-pointer transition-colors group"
                  >
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-mono text-[11px] font-semibold text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-md border border-slate-200/60 group-hover:border-slate-300 transition-colors">
                        {req.id}
                      </span>
                    </td>
                    <td className="px-5 py-4 min-w-[220px]">
                      <h4 className="font-semibold text-slate-900 group-hover:text-[#EA580C] transition-colors leading-snug">
                        {req.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-sans block mt-0.5">
                        {req.requestType}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200/70 text-slate-700 font-semibold text-[10px] flex items-center justify-center shrink-0">
                          {req.requestedBy.charAt(0)}
                        </div>
                        <div>
                          <span className="font-medium block text-slate-800 leading-tight text-xs">{req.requestedBy}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{req.requestingDept}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-medium text-slate-800 block leading-tight text-xs">
                        {req.receivingDept.replace(' Operations', '')}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {req.assignedOwner ? `Owner: ${req.assignedOwner}` : 'Unassigned'}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[10px] border ${getPriorityBadge(req.priority)}`}>
                        {req.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono">
                        <Calendar strokeWidth={1.5} className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{req.dueDate}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10.5px] leading-tight rounded-full font-mono ${getStatusBadge(req.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(req.status)}`} />
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRequest(req.id);
                        }}
                        className="px-3 py-1.5 bg-white hover:bg-[#EA580C] text-slate-700 hover:text-white font-semibold rounded-lg border border-slate-200/80 hover:border-[#EA580C] shadow-2xs transition-all text-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open</span>
                        <ChevronRight strokeWidth={1.5} className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 bg-slate-50/60 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredRequests.length} of {requests.length} tickets</span>
              <span className="text-[11px] text-slate-400">Click any row to view discussion timeline & audit</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
