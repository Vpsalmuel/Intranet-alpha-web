import React, { useState } from 'react';
import { 
  Video as VideoIcon, 
  Play, 
  Award, 
  CheckCircle, 
  Layers, 
  FileText, 
  ChevronRight, 
  ArrowLeft, 
  Clock, 
  MessageSquare,
  PlusCircle,
  Undo
} from 'lucide-react';
import { Video, User } from '../types';

interface AcculturationViewProps {
  currentUser: User;
  videos: Video[];
  onToggleVideoComplete: (id: string) => void;
  onUpdateVideoProgress: (id: string, pct: number) => void;
  onAddVideo: (vid: Video) => void;
  selectedVideoId: string | null;
  onSelectVideo: (id: string | null) => void;
}

// 1. Initial Courses list for Existing Staff (LMS System)
const INITIAL_LMS_COURSES: Video[] = [
  {
    id: 'lms-1',
    title: 'Advanced Corporate Leadership & Risk Management Solvency',
    category: 'Leadership',
    department: 'Executive Leadership Office',
    speaker: 'Victoria Hawthorne (CEO)',
    duration: '25:00',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=225',
    completed: true,
    progressPercent: 100,
    description: 'Masterclass on leading high-performing teams, modern solvency margins under inflation stress-testing models, and building an organization-wide empathy culture.',
    keyLearnings: [
      'Strategic corporate decision frameworks',
      'Assessing risk margins & solvency levels under simulated audits',
      'Empowering cross-department communication channels'
    ],
    relatedDocs: ['Solvency II Compliance Manifesto', 'Board Leadership Playbook']
  },
  {
    id: 'lms-2',
    title: 'Emotional Intelligence and Personal Growth in Crisis Settings',
    category: 'Personal Growth',
    department: 'People & Culture (HR)',
    speaker: 'Thomas Mueller (HR Head)',
    duration: '18:15',
    thumbnail: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400&h=225',
    completed: false,
    progressPercent: 0,
    description: 'A deep-dive on mindfulness, response boundaries under pressure, feedback alignment, and cultivating resilience in complex operational workflows.',
    keyLearnings: [
      'De-escalating friction in high-priority claim disputes',
      'Active mindfulness techniques for daily task lists',
      'Balancing personal growth targets of personnel with team key metrics'
    ],
    relatedDocs: ['Emotional Intelligence Workspace Workbook']
  },
  {
    id: 'lms-3',
    title: 'Technical Actuarial Modeling & Advanced Claims Assessment',
    category: 'Departmental',
    department: 'Claims Operations',
    speaker: 'Arthur Pendelton (VP Claims)',
    duration: '32:45',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400&h=225',
    completed: false,
    progressPercent: 0,
    description: 'Gain insight into data modeling techniques for identifying predictive claim indicators and fraudulent payout requests before legal and financial authorization.',
    keyLearnings: [
      'Parsing claimant narratives using language patterns',
      'Identifying multi-party auto claims hazards',
      'Integrating external adjusting team registries'
    ],
    relatedDocs: ['Claims Predictive Algorithms v3']
  },
  {
    id: 'lms-4',
    title: 'Designing High-Net-Worth Customized Commercial Policies',
    category: 'Skills Development',
    department: 'Underwriting',
    speaker: 'Rebecca Sterling (Underwriting Desk)',
    duration: '22:10',
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=225',
    completed: false,
    progressPercent: 0,
    description: 'A functional walkthrough on mapping corporate risk exposures, configuring customized property insurance pools, and reviewing liability caps.',
    keyLearnings: [
      'Underwriting commercial complex holdings',
      'Delegation and risk retention limits',
      'Reinsurance pool placement procedures'
    ],
    relatedDocs: ['Commercial Portfolio Exposure Index']
  },
  {
    id: 'lms-5',
    title: 'Mastering Strategic Communication & Presentation Skills',
    category: 'Leadership',
    department: 'Brand & Corporate Communications',
    speaker: 'Elena Rostova (Communications Lead)',
    duration: '15:20',
    thumbnail: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400&h=225',
    completed: false,
    progressPercent: 0,
    description: 'Transform your professional delivery: learn how to structure persuasive, high-impact slideshow presentations, and speak confidently to managing directors and board members.',
    keyLearnings: [
      'The pyramid principles of strategic storytelling',
      'Designing compelling presentation workflows',
      'Techniques to capture and maintain audience focus'
    ],
    relatedDocs: ['Executive Boardroom Slide Template Pack']
  },
  {
    id: 'lms-6',
    title: 'Enterprise Cyber Defense & Risk Audit Preparedness',
    category: 'Skills Development',
    department: 'IT & Digital Infrastructure',
    speaker: 'David Kojo (IT Support Lead)',
    duration: '20:15',
    thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=225',
    completed: false,
    progressPercent: 0,
    description: 'Understand operational compliance obligations. Learn security hygiene under our malware standards, secure VPN client setups, and zero-trust intranet systems.',
    keyLearnings: [
      'Cloud network access configurations',
      'Protecting policyholder databases from system breaches',
      'Managing external partner access certificates securely'
    ],
    relatedDocs: ['Cybersecurity Audit Guidelines 2026']
  }
];

export default function AcculturationView({
  currentUser,
  videos,
  onToggleVideoComplete,
  onUpdateVideoProgress,
  onAddVideo,
  selectedVideoId,
  onSelectVideo
}: AcculturationViewProps) {
  const isNewStaff = currentUser.role === 'new_staff';
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showAdminForm, setShowAdminForm] = useState(false);
  
  // Local state for LMS courses (existing staff persistence)
  const [lmsCourses, setLmsCourses] = useState<Video[]>(() => {
    try {
      const saved = localStorage.getItem('lms_courses_m1');
      return saved ? JSON.parse(saved) : INITIAL_LMS_COURSES;
    } catch {
      return INITIAL_LMS_COURSES;
    }
  });

  const saveLmsToStorage = (updated: Video[]) => {
    setLmsCourses(updated);
    try {
      localStorage.setItem('lms_courses_m1', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Determine which dataset and functions to utilize based on the role
  const currentCourses = isNewStaff ? videos : lmsCourses;

  const handleToggleLmsCourse = (id: string) => {
    const updated = lmsCourses.map(c => 
      c.id === id 
        ? { ...c, completed: !c.completed, progressPercent: !c.completed ? 100 : 0 } 
        : c
    );
    saveLmsToStorage(updated);
  };

  const handleUpdateLmsProgress = (id: string, pct: number) => {
    const updated = lmsCourses.map(c => 
      c.id === id 
        ? { ...c, progressPercent: pct, completed: pct >= 100 } 
        : c
    );
    saveLmsToStorage(updated);
  };

  const handleAddLmsCourse = (newCourse: Video) => {
    const updated = [...lmsCourses, newCourse];
    saveLmsToStorage(updated);
  };

  const currentToggleAction = isNewStaff ? onToggleVideoComplete : handleToggleLmsCourse;
  const currentUpdateProgress = isNewStaff ? onUpdateVideoProgress : handleUpdateLmsProgress;
  const currentAddAction = isNewStaff ? onAddVideo : handleAddLmsCourse;

  // Simulated commentary list for active video
  const [comments, setComments] = useState<Record<string, { author: string; text: string; date: string }[]>>({
    'vid-1': [
      { author: 'Thomas Mueller', text: 'An essential watch. Highly recommend taking notes on the core client empathy values.', date: '3 days ago' },
      { author: 'Arthur Pendelton', text: 'Spot on introduction to the claims-fast-tracking goals.', date: '2 days ago' }
    ],
    'lms-1': [
      { author: 'Arthur Pendelton', text: 'Excellent overview of the solvency standards here. Essential for senior leadership reviews.', date: '4 days ago' }
    ]
  });
  const [userComment, setUserComment] = useState('');

  // Forms states for Manage Videos Page
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [duration, setDuration] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [videoCategory, setVideoCategory] = useState(isNewStaff ? 'Leadership' : 'Skills Development');
  const [department, setDepartment] = useState('Claims Operations');
  const [description, setDescription] = useState('');

  const completedCount = currentCourses.filter(v => v.completed).length;
  const progressPercent = Math.round((completedCount / currentCourses.length) * 100);

  const activeVideo = currentCourses.find(v => v.id === selectedVideoId);

  // Filter
  const filteredVideos = currentCourses.filter(v => {
    return filterCategory === 'All' || v.category === filterCategory || v.department === filterCategory;
  });

  const categories = isNewStaff 
    ? [
        'All',
        'Leadership',
        'Company Culture',
        'Business Operations',
        'HR & People',
        'Claims Operations',
        'Underwriting',
        'IT & Digital Infrastructure'
      ]
    : [
        'All',
        'Leadership',
        'Personal Growth',
        'Skills Development',
        'Departmental'
      ];

  const handlePostComment = () => {
    if (!userComment || !selectedVideoId) return;
    const list = comments[selectedVideoId] || [];
    const updated = [
      ...list,
      {
        author: currentUser.name,
        text: userComment,
        date: 'Just now'
      }
    ];
    setComments(prev => ({ ...prev, [selectedVideoId]: updated }));
    setUserComment('');
  };

  const handleAddVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !speaker || !duration) {
      alert('Please fill out required course fields.');
      return;
    }

    const newVid: Video = {
      id: `lms-new-${Date.now()}`,
      title,
      category: videoCategory,
      department,
      speaker,
      duration,
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=225',
      completed: false,
      progressPercent: 0,
      description: description || 'No syllabus provided.',
      keyLearnings: ['Understand corporate strategy', 'Establish cross-functional networks', 'Professional performance guidelines'],
      relatedDocs: ['Staff Learning Compendium 2026']
    };

    currentAddAction(newVid);
    setShowAdminForm(false);

    // Reset Form
    setTitle('');
    setSpeaker('');
    setDuration('');
    setThumbnail('');
    setDescription('');
  };

  const isContentAdmin = ['hr_admin', 'brand_admin', 'management'].includes(currentUser.role);

  // 1. Video Detail Workspace
  if (activeVideo) {
    const videoComments = comments[activeVideo.id] || [];

    return (
      <div className="space-y-6 animate-fade-in pb-12">
        <button
          onClick={() => onSelectVideo(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#1E2D64] bg-white border rounded px-3 py-1.5 shadow-sm hover:shadow transition-all animate-fade-in"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to {isNewStaff ? 'Learning Catalog' : 'LMS Course Catalog'}
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Main Simulated Player & Description */}
          <div className="xl:col-span-8 space-y-6">
            
            {/* Interactive Video Player Mockup Container */}
            <div id="video-mockup-player-box" className="bg-slate-950 rounded-2xl overflow-hidden tracking-tight border border-slate-900 shadow-xl relative aspect-video group">
              <img 
                src={activeVideo.thumbnail} 
                alt={activeVideo.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80 animate-fade-in" 
              />
              
              {/* Play overlays overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 flex flex-col justify-between p-6">
                
                {/* Top Video title */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider font-mono bg-orange-500 rounded text-white uppercase select-none">
                      {activeVideo.category} • {activeVideo.department}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-1.5 drop-shadow">
                      {activeVideo.title}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-300 font-mono bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                    Duration: {activeVideo.duration}
                  </span>
                </div>

                {/* Center play state simulation */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-orange-500/90 text-white flex items-center justify-center shadow-lg transition-all scale-100 group-hover:scale-105 duration-200 cursor-pointer hover:bg-orange-600">
                    <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                  </div>
                  <p className="text-[11px] text-gray-300 mt-2 font-mono drop-shadow font-semibold">
                    Simulated Playing Pipeline active (UTC-Live stream)
                  </p>
                </div>

                {/* Bottom Controls panel */}
                <div className="space-y-3">
                  {/* Seek Bar slider */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-300 font-mono">02:14</span>
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-orange-500 rounded-full" style={{ width: '65%' }} />
                    </div>
                    <span className="text-[10px] text-gray-300 font-mono">{activeVideo.duration}</span>
                  </div>

                  {/* Actions suite inside player */}
                  <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => currentToggleAction(activeVideo.id)}
                        className={`text-xs px-3 py-1 font-semibold rounded transition-all select-none ${
                          activeVideo.completed 
                            ? 'bg-emerald-600 text-white border border-emerald-500' 
                            : 'bg-white text-slate-900 hover:bg-slate-105 shadow-md flex items-center gap-1.5'
                        }`}
                      >
                        {activeVideo.completed ? (
                          <span className="flex items-center gap-1">✓ Complete</span>
                        ) : (
                          <span>Mark as Completed</span>
                        )}
                      </button>

                      <button
                        onClick={() => currentUpdateProgress(activeVideo.id, 100)}
                        className="text-[10px] text-gray-400 hover:text-white px-2 py-1 bg-slate-800 rounded whitespace-nowrap transition-all"
                      >
                        ⚡ Fast Forward Watch
                      </button>
                    </div>

                    <div className="text-[10px] text-gray-400 font-mono">
                      Instructor: <strong>{activeVideo.speaker}</strong>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Title description card */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">{activeVideo.title}</h3>
              <p className="text-xs text-gray-400 mt-1">Presented by: <strong>{activeVideo.speaker}</strong> &bull; {activeVideo.department}</p>
              
              <div className="mt-4 prose text-xs text-gray-600 leading-relaxed font-sans border-t border-gray-50 pt-4">
                {activeVideo.description}
              </div>

              {/* Key outcomes bullet points */}
              <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-gray-150">
                <h5 className="text-xs font-bold text-gray-850 mb-2 flex items-center gap-1">
                  <Award className="w-4 h-4 text-orange-500" /> Syllabus Course Checkpoints
                </h5>
                <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-5">
                  {activeVideo.keyLearnings.map((item, id) => (
                    <li key={id}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Comment Section box */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
              <h4 className="font-sans font-bold text-gray-900 text-sm mb-4">Course Discussion board</h4>
              
              <div className="space-y-4 mb-4">
                {videoComments.length === 0 ? (
                  <p className="text-xs text-gray-400 py-2">No questions or answers submitted yet. Start the thread!</p>
                ) : (
                  videoComments.map((com, id) => (
                    <div key={id} className="p-3 border rounded-xl bg-slate-50 relative">
                      <div className="flex justify-between items-center text-[10px] text-gray-400">
                        <span className="font-bold text-gray-700">{com.author}</span>
                        <span>{com.date}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 leading-snug">{com.text}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <input
                  id="video-comment-box"
                  type="text"
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="Ask a technical core question or comment on this module..."
                  className="flex-1 bg-slate-50 border border-gray-250 text-gray-800 text-xs rounded-lg px-3 py-2 focus:bg-white"
                />
                <button
                  onClick={handlePostComment}
                  className="px-4 py-2 bg-[#1E2D64] text-white text-xs font-bold rounded-lg hover:bg-opacity-90"
                >
                  Send
                </button>
              </div>
            </div>

          </div>

          {/* Right Side: Recommended Checklists & Next Video */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* Status Card widget */}
            <div className="bg-white p-5 border rounded-xl shadow-sm">
              <h4 className="text-xs font-bold text-gray-900 mb-3 block">Completion Status</h4>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${activeVideo.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-400'}`}>
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-850">
                    {activeVideo.completed ? 'Course Completed' : 'In Progress'}
                  </h5>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {activeVideo.completed ? 'Milestone satisfy requirements.' : 'Complete content to log certificate.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Related policy files */}
            <div className="bg-white p-5 border rounded-xl shadow-sm">
              <h4 className="text-xs font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-orange-500" /> Syllabus Reference Files
              </h4>
              <div className="space-y-2">
                {activeVideo.relatedDocs.map((doc, id) => (
                  <div key={id} className="p-2 border rounded hover:border-blue-300 transition-all text-xs flex justify-between items-center bg-gray-50/50">
                    <span className="truncate max-w-[200px] text-gray-700 font-medium">{doc}</span>
                    <button className="text-[10px] text-blue-600 hover:underline">Get File</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Recommended course card */}
            <div className="bg-white p-5 border rounded-xl shadow-sm">
              <h4 className="text-xs font-bold text-gray-900 mb-3 block">Continuing path recommendation</h4>
              {currentCourses.filter(v => v.id !== activeVideo.id).slice(0, 1).map((nextV) => (
                <div 
                  key={nextV.id} 
                  onClick={() => onSelectVideo(nextV.id)}
                  className="border rounded-xl overflow-hidden hover:border-orange-505 cursor-pointer shadow-sm group transition-all"
                >
                  <img src={nextV.thumbnail} alt={nextV.title} className="aspect-video w-full object-cover group-hover:scale-105 duration-100 transition-all" />
                  <div className="p-3">
                    <span className="text-[8px] font-bold text-orange-600 uppercase tracking-wider block">{nextV.category}</span>
                    <h5 className="text-xs font-semibold text-gray-850 truncate mt-1 leading-snug">{nextV.title}</h5>
                    <p className="text-[10px] text-gray-400 mt-0.5 flex justify-between">
                      <span>By {nextV.speaker}</span>
                      <span>{nextV.duration} mins</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    );
  }

  // 2. Manage Learning Material Creation Panel
  if (showAdminForm) {
    return (
      <div className="space-y-6 animate-fade-in pb-12 max-w-2xl">
        <button
          onClick={() => setShowAdminForm(false)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-blue-900 bg-white border rounded px-3 py-1.5 shadow-sm transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog List
        </button>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h3 className="font-sans font-bold text-gray-900 text-base mb-1">
            {isNewStaff ? 'Upload & Assign Orientation Video' : 'Add New LMS Course'}
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            {isNewStaff 
              ? 'Provision new orientation videos for training and onboarding workflows.' 
              : 'Add custom learning materials, departmental courses and professional skills training to the LMS.'}
          </p>

          <form onSubmit={handleAddVideoSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Course Title *</label>
              <input
                id="video-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isNewStaff ? "e.g. Underwriting Basics" : "e.g. High-performance Leadership and Personal Growth Principles"}
                className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Instructor / Presenter Name *</label>
                <input
                  id="video-speaker"
                  type="text"
                  required
                  value={speaker}
                  onChange={(e) => setSpeaker(e.target.value)}
                  placeholder="e.g. Rebecca Sterling"
                  className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Course Duration *</label>
                <input
                  id="video-duration"
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 25:00"
                  className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Learning Category *</label>
                <select
                  id="video-category"
                  value={videoCategory}
                  onChange={(e) => setVideoCategory(e.target.value)}
                  className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2 cursor-pointer"
                >
                  {isNewStaff ? (
                    <>
                      <option value="Leadership">Leadership</option>
                      <option value="Company Culture">Company Culture</option>
                      <option value="Business Operations">Business Operations</option>
                      <option value="HR & People">HR & People</option>
                    </>
                  ) : (
                    <>
                      <option value="Leadership">Leadership</option>
                      <option value="Personal Growth">Personal Growth</option>
                      <option value="Skills Development">Skills Development</option>
                      <option value="Departmental">Departmental</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Department Owner *</label>
                <select
                  id="video-dept"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2 cursor-pointer"
                >
                  <option value="Executive Leadership Office">Executive Leadership Office</option>
                  <option value="People & Culture (HR)">People & Culture (HR)</option>
                  <option value="Claims Operations">Claims Operations</option>
                  <option value="Underwriting">Underwriting</option>
                  <option value="IT & Digital Infrastructure">IT & Digital Infrastructure</option>
                  <option value="Brand & Corporate Communications">Brand & Corporate Communications</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Thumbnail URL</label>
              <input
                id="video-thumbnail"
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="e.g. https://images.unsplash.com/photo-1551836022-d5d88e9218df (Leave blank for default)"
                className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Course objectives / Summary Description</label>
              <textarea
                id="video-desc"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe critical skills and learning outcomes..."
                className="w-full bg-slate-50/50 border border-gray-250 text-slate-800 text-xs rounded-lg px-3 py-2 focus:bg-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowAdminForm(false)}
                className="px-4 py-2 border text-gray-700 text-xs font-bold rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-900 border border-blue-950 text-white text-xs font-bold rounded-lg hover:bg-blue-955"
              >
                Save Course
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 3. Catalog Listing Workspace
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header and Statistics area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-gray-950 flex items-center gap-2">
            <VideoIcon className="w-6 h-6 text-[#1E2D64]" /> 
            {isNewStaff ? 'Learning Hub' : 'LMS Learning Hub'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {isNewStaff 
              ? 'Watch leadership messages and department tutorials to understand our operational frameworks and compliance values.'
              : 'Empowering professional excellence. Access many courses across departments, leadership mastery, and personal growth.'}
          </p>
        </div>

        {isContentAdmin && (
          <button
            id="upload-tutorial-video-button"
            onClick={() => setShowAdminForm(true)}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 border border-orange-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow"
          >
            <PlusCircle className="w-4 h-4" /> {isNewStaff ? 'Add Orientation Video' : 'Add LMS Course'}
          </button>
        )}
      </div>

      {/* Progress Track Card dashboard */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl p-6 text-white grid md:grid-cols-3 gap-6 items-center shadow border border-blue-950">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-orange-400">
            {isNewStaff ? 'YOUR PROGRESS STATUS' : 'LMS PROFESSIONAL DEVELOPMENT TRACKER'}
          </span>
          <h3 className="text-xl font-bold font-sans">
            {isNewStaff ? 'Corporate Orientation Course' : 'Skills & Leadership Pathway'}
          </h3>
          <p className="text-[11px] text-gray-300">
            {isNewStaff ? 'Complete required modules before June 15.' : 'Enhance skills and drive insurance innovations at your own pace.'}
          </p>
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-orange-300 font-mono">My Pathway Completion: {progressPercent}%</span>
            <span className="font-mono">{completedCount} of {currentCourses.length} completed</span>
          </div>
          <div className="w-full h-3 bg-blue-950/50 rounded-full border border-blue-800 overflow-hidden relative">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="flex justify-between items-center text-[10px] text-gray-400">
            {progressPercent >= 100 ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">★ Learning Goal Satisfied! Rex Insurance Certificate of Excellence Unlocked.</span>
            ) : (
              <span>Continue learning to satisfy skills assessment goals.</span>
            )}
          </div>
        </div>
      </div>


      {/* Learning & Development Career Tracks merged with Learning Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <VideoIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Core Compliance Training</h3>
          <p className="text-xs text-gray-500 mb-4 line-clamp-3">Mandatory annual compliance training covering AML, Data Privacy, and Information Security.</p>
          <div className="flex items-center justify-between text-xs font-semibold text-blue-600">
            <span>View Courses</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">Leadership Academy</h3>
          <p className="text-xs text-gray-500 mb-4 line-clamp-3">Management and leadership principles for emerging leaders and senior executives.</p>
          <div className="flex items-center justify-between text-xs font-semibold text-orange-600">
            <span>Explore Track</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">Professional Certifications</h3>
          <p className="text-xs text-gray-500 mb-4 line-clamp-3">Access company-sponsored certifications including CRM, Agile, and Risk Assessment.</p>
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-600">
            <span>View Certifications</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Category selection */}
      <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-all font-medium ${
              filterCategory === cat
                ? 'bg-[#1E2D64] text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video listing grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => onSelectVideo(vid.id)}
            className="group bg-white border border-gray-200 hover:border-orange-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-video bg-gray-100 overflow-hidden">
              <img 
                src={vid.thumbnail} 
                alt={vid.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 duration-300 transition-all" 
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow transformation group-hover:scale-110 duration-200">
                  <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-[9px] text-white font-mono rounded">
                {vid.duration} {vid.duration.includes(':') ? '' : 'mins'}
              </span>
              {vid.completed && (
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-600 text-[9px] text-white font-mono font-bold rounded-lg shadow">
                  ✓ COMPLETED
                </span>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold font-mono text-orange-500 uppercase tracking-wider block mb-1">
                  {vid.category}
                </span>
                <h4 className="text-xs font-bold text-gray-950 group-hover:text-blue-900 transition-all line-clamp-2 leading-snug">
                  {vid.title}
                </h4>
                <p className="text-[11px] text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                  {vid.description}
                </p>
              </div>

              <div className="border-t border-gray-100 mt-4 pt-3 flex items-center justify-between text-[10px] text-gray-400">
                <span>By {vid.speaker} ({vid.department.replace('Operations', '').replace(' Infrastructure', '')})</span>
                <span className="text-blue-700 font-semibold group-hover:translate-x-1 duration-200 transition-all flex items-center gap-0.5">
                  Launch Course <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
        {filteredVideos.length === 0 && (
          <div className="col-span-full py-12 text-center text-xs text-gray-400">
            No courses found under this category or department.
          </div>
        )}
      </div>
    </div>
  );
}
