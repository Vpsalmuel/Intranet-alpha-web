import RexLogo from "./components/RexLogo";
import { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Newspaper, 
  Video, 
  Layers, 
  GitPullRequest, 
  FileText, 
  Grid, 
  Users, 
  Heart, 
  Calendar, 
  HelpCircle, 
  Activity, 
  Shuffle, 
  CornerDownRight, 
  Lock, 
  ChevronRight, 
  File, 
  BookOpen, 
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  AlertOctagon,
  Sparkles,
  X,
  MessageSquare,
  Send
} from 'lucide-react';
import { 
  User, 
  UserRole, 
  Announcement, 
  Video as VideoType, 
  FileItem, 
  RequestItem, 
  OnboardingTask,
  EventItem
} from './types';
import { 
  USERS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_VIDEOS, 
  INITIAL_FILES, 
  INITIAL_REQUESTS, 
  INITIAL_ONBOARDING,
  INITIAL_EVENTS,
  EMPLOYEES,
  KNOWLEDGE_ARTICLES,
  DEPARTMENTS,
  MILESTONES,
  loadFromStorageOrFallback,
  saveToStorage
} from './data/mockData';

// Component Imports
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomeDashboardView from './components/HomeDashboardView';
import UpdatesView from './components/UpdatesView';
import AcculturationView from './components/AcculturationView';
import DirectoryView from './components/DirectoryView';
import KnowledgeCenterView from './components/KnowledgeCenterView';
import GlobalSearchView from './components/GlobalSearchView';
import DepartmentsView from './components/DepartmentsView';
import RequestCentreView from './components/RequestCentreView';
import DocumentsView from './components/DocumentsView';
import StaffDirectoryView from './components/StaffDirectoryView';
import HRServicesView from './components/HRServicesView';
import EventsAndSupportView from './components/EventsAndSupportView';
import ToolsView from './components/ToolsView';
import AboutUsView from './components/AboutUsView';
import MilestonesView from './components/MilestonesView';
import RewardsBenefitsView from './components/RewardsBenefitsView';
import KudosAndRecognitionView from './components/KudosAndRecognitionView';
import HealthWellbeingView from './components/HealthWellbeingView';
import PeopleCelebrationsView from './components/PeopleCelebrationsView';
import StructuredOnboardingFlow from './components/StructuredOnboardingFlow';
import GuidedWalkthrough from './components/GuidedWalkthrough';

export default function App() {
  // Authentication check lock state
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(true);
  const [activeUserRole, setActiveUserRole] = useState<UserRole>('new_staff');
  const [currentUser, setCurrentUser] = useState<User>(USERS['new_staff']);

  // Core navigation configurations
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persistent corporate state loaded from storage or fallback defaults
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>([]);
  const [pinnedTools, setPinnedTools] = useState<string[]>(['Email', 'Microsoft Teams']);

  // Selection references for specific viewing detail boards
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<string | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  // Rex AI states
  const [isRexAiOpen, setIsRexAiOpen] = useState(false);
  const [rexAiInput, setRexAiInput] = useState("");
  const [rexAiMessages, setRexAiMessages] = useState<Array<{ sender: 'user' | 'ai', text: string, timestamp: string }>>([]);
  const [isRexAiResponding, setIsRexAiResponding] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize Rex AI welcomes whenever user switches role
  useEffect(() => {
    setRexAiMessages([
      { 
        sender: 'ai', 
        text: `Hi **${currentUser.name.split(' ')[0]}**! I am **Rex AI**, your digital corporate guide here at **Rex Insurance**. ` +
              `How can I assist you with your workload, orientation checklists, departmental tools, or filing policies today?`, 
        timestamp: 'Just now' 
      }
    ]);
  }, [currentUser]);

  // Scroll to bottom whenever messages list grows
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [rexAiMessages, isRexAiOpen]);

  const handleSendRexAiMessage = async () => {
    if (!rexAiInput.trim()) return;
    const userMsg = rexAiInput;
    setRexAiInput("");
    
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setRexAiMessages(prev => [...prev, { sender: 'user', text: userMsg, timestamp: timeString }]);
    setIsRexAiResponding(true);

    try {
      const chatHistory = rexAiMessages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: chatHistory.slice(-6), // keep context size lightweight
          userName: currentUser.name,
          userRole: currentUser.role,
          userDept: currentUser.department
        })
      });

      const data = await res.json();
      const aiResponseText = data?.text || data?.error || "I was unable to communicate with my core intelligence registry.";
      
      setRexAiMessages(prev => [...prev, { 
        sender: 'ai', 
        text: aiResponseText, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);

    } catch (e: any) {
      console.error("Rex AI Message Communication error:", e);
      setRexAiMessages(prev => [...prev, { 
        sender: 'ai', 
        text: "My communications link with the main Rex Intranet Router timed out. Please double-check network coordinates.", 
        timestamp: 'Just now' 
      }]);
    } finally {
      setIsRexAiResponding(false);
    }
  };

  // Initialize data on mount
  useEffect(() => {
    setAnnouncements(loadFromStorageOrFallback('announcements', INITIAL_ANNOUNCEMENTS));
    setEvents(loadFromStorageOrFallback('events', INITIAL_EVENTS));
    setVideos(loadFromStorageOrFallback('videos', INITIAL_VIDEOS));
    setFiles(loadFromStorageOrFallback('files', INITIAL_FILES));
    setRequests(loadFromStorageOrFallback('requests', INITIAL_REQUESTS));
    setOnboardingTasks(loadFromStorageOrFallback('onboarding', INITIAL_ONBOARDING));
    setPinnedTools(loadFromStorageOrFallback('pinned_tools', ['Email', 'Microsoft Teams', 'HR Self-Service']));
  }, []);

  // Sync state modifications back to local storage
  const handleAnnouncementsChange = (updater: Announcement[]) => {
    setAnnouncements(updater);
    saveToStorage('announcements', updater);
  };

  const handleEventsChange = (updater: EventItem[]) => {
    setEvents(updater);
    saveToStorage('events', updater);
  };

  const handleVideosChange = (updater: VideoType[]) => {
    setVideos(updater);
    saveToStorage('videos', updater);
  };

  const handleFilesChange = (updater: FileItem[]) => {
    setFiles(updater);
    saveToStorage('files', updater);
  };

  const handleRequestsChange = (updater: RequestItem[]) => {
    setRequests(updater);
    saveToStorage('requests', updater);
  };

  const handleOnboardingChange = (updater: OnboardingTask[]) => {
    setOnboardingTasks(updater);
    saveToStorage('onboarding', updater);
  };

  // Toggle checklist checkboxes
  const handleToggleOnboardingTask = (id: string) => {
    const updated = onboardingTasks.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'Completed' ? 'Not Started' : 'Completed' as any };
      }
      return t;
    });
    handleOnboardingChange(updated);
  };

  // Video completing states trackers
  const handleToggleVideoComplete = (id: string) => {
    const updated = videos.map(v => {
      if (v.id === id) {
        return { ...v, completed: !v.completed, progressPercent: !v.completed ? 100 : 0 };
      }
      return v;
    });
    handleVideosChange(updated);
  };

  const handleUpdateVideoProgress = (id: string, pct: number) => {
    const updated = videos.map(v => {
      if (v.id === id) {
        return { ...v, progressPercent: pct, completed: pct >= 100 };
      }
      return v;
    });
    handleVideosChange(updated);
  };

  // Handle toggling favorites pins
  const handleTogglePinTool = (tool: string) => {
    const isPinned = pinnedTools.includes(tool);
    const updated = isPinned 
      ? pinnedTools.filter(t => t !== tool)
      : [...pinnedTools, tool];
    setPinnedTools(updated);
    saveToStorage('pinned_tools', updated);
  };

  // Sandbox user profile switcher logic
  const handleSwitchUserRole = (role: UserRole) => {
    setActiveUserRole(role);
    setCurrentUser(USERS[role]);
    
    // reset drill Selection nodes
    setSelectedAnnouncementId(null);
    setSelectedVideoId(null);
    setSelectedRequestId(null);
    setSearchQuery('');
    setActiveTab('home');
  };

  // Trigger Logout action
  const handleTriggerLogOut = () => {
    setIsLoggedOut(true);
  };

  const handleTriggerLogIn = (role: UserRole) => {
    handleSwitchUserRole(role);
    setIsLoggedOut(false);
  };

  // Master Search Matrix handler across documents, people, announcements, systems and processes
  const performAppSearchGroupings = () => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();

    const matchedNews = announcements.filter(a => a.title.toLowerCase().includes(query) || a.summary.toLowerCase().includes(query));
    const matchedDocs = files.filter(f => f.title.toLowerCase().includes(query) || f.description.toLowerCase().includes(query));
    const matchedPeople = EMPLOYEES.filter(e => e.name.toLowerCase().includes(query) || e.role.toLowerCase().includes(query));
    const matchedDepts = DEPARTMENTS.filter(d => d.name.toLowerCase().includes(query) || d.description.toLowerCase().includes(query));
    const matchedRequests = requests.filter(r => r.id.toLowerCase().includes(query) || r.title.toLowerCase().includes(query));
    const matchedVideos = videos.filter(v => v.title.toLowerCase().includes(query) || v.description.toLowerCase().includes(query));

    return {
      news: matchedNews,
      docs: matchedDocs,
      people: matchedPeople,
      depts: matchedDepts,
      requests: matchedRequests,
      videos: matchedVideos
    };
  };

  const queryResults = performAppSearchGroupings();

  // render view router selector
  const renderActiveView = () => {
    // If search active
    // Default views switch routes
    switch (activeTab) {
      case 'home':
        return (
          <HomeDashboardView
            currentUser={currentUser}
            onboardingTasks={onboardingTasks}
            onToggleTask={handleToggleOnboardingTask}
            announcements={announcements}
            videos={videos}
            requests={requests}
            pinnedTools={pinnedTools}
            onTogglePinTool={handleTogglePinTool}
            onNavigateToTab={setActiveTab}
            onSelectVideo={setSelectedVideoId}
            onSelectAnnouncement={setSelectedAnnouncementId}
            onSelectRequest={setSelectedRequestId}
          />
        );
      case 'updates':
        return (
          <UpdatesView
            currentUser={currentUser}
            announcements={announcements}
            events={events}
            onAddAnnouncement={(newN) => {
              const updated = [newN, ...announcements];
              handleAnnouncementsChange(updated);
            }}
            onAddEvent={(newE) => {
              const updated = [newE, ...events];
              handleEventsChange(updated);
            }}
            selectedAnnouncementId={selectedAnnouncementId}
            onClearSelectedAnnouncement={() => setSelectedAnnouncementId(null)}
            onSelectAnnouncement={setSelectedAnnouncementId}
            initialSubTab="updates"
          />
        );
      
      case 'directory':
        return <DirectoryView employees={EMPLOYEES} />;
      case 'knowledge':
        return <KnowledgeCenterView articles={KNOWLEDGE_ARTICLES} />;
      case 'search':
        return (
          <GlobalSearchView
            searchQuery={searchQuery}
            employees={EMPLOYEES}
            files={files}
            knowledge={KNOWLEDGE_ARTICLES}
            announcements={announcements}
            videos={videos}
            onNavigateToTab={setActiveTab}
          />
        );
      case 'acculturation':

        return (
          <AcculturationView
            currentUser={currentUser}
            videos={videos}
            onToggleVideoComplete={handleToggleVideoComplete}
            onUpdateVideoProgress={handleUpdateVideoProgress}
            onAddVideo={(newV) => {
              const updated = [...videos, newV];
              handleVideosChange(updated);
            }}
            selectedVideoId={selectedVideoId}
            onSelectVideo={setSelectedVideoId}
          />
        );
      case 'departments':
        return (
          <DepartmentsView
            currentUser={currentUser}
            announcements={announcements}
            files={files}
            videos={videos}
            requests={requests}
            onSelectRequest={(id) => { setSelectedRequestId(id); setActiveTab('requests'); }}
            onNavigateToTab={setActiveTab}
          />
        );
      case 'requests':
        return (
          <RequestCentreView
            currentUser={currentUser}
            requests={requests}
            onCreateRequest={(newR) => {
              const updated = [newR, ...requests];
              handleRequestsChange(updated);
            }}
            onUpdateRequest={(updatedR) => {
              const updated = requests.map(r => r.id === updatedR.id ? updatedR : r);
              handleRequestsChange(updated);
            }}
            selectedRequestId={selectedRequestId}
            onClearSelectedRequest={() => setSelectedRequestId(null)}
            onSelectRequest={setSelectedRequestId}
          />
        );
      case 'documents':
        return (
          <DocumentsView
            currentUser={currentUser}
            files={files}
            onAddFile={(newF) => {
              const updated = [newF, ...files];
              handleFilesChange(updated);
            }}
          />
        );
      case 'tools':
        return (
          <ToolsView
            currentUser={currentUser}
            pinnedTools={pinnedTools}
            onTogglePinTool={handleTogglePinTool}
            onNavigateToTab={setActiveTab}
          />
        );
      case 'directory':
        return (
          <StaffDirectoryView
            currentUser={currentUser}
            onNavigateToTab={setActiveTab}
          />
        );
      case 'hr':
        return (
          <HRServicesView
            currentUser={currentUser}
            onNavigateToTab={setActiveTab}
          />
        );
      case 'about-us':
        return (
          <AboutUsView
            currentUser={currentUser}
          />
        );
            case 'milestones':
        return <MilestonesView milestones={MILESTONES} currentUser={currentUser} />;
      case 'rewards':
        return (
          <RewardsBenefitsView
            currentUser={currentUser}
          />
        );
      case 'kudos':
        return (
          <KudosAndRecognitionView
            currentUser={currentUser}
          />
        );
      
            case 'celebrations':
        return (
          <PeopleCelebrationsView
            currentUser={currentUser}
          />
        );
      case 'wellbeing':
        return (
          <HealthWellbeingView
            currentUser={currentUser}
          />
        );
      case 'events':
        return (
          <UpdatesView
            currentUser={currentUser}
            announcements={announcements}
            events={events}
            onAddAnnouncement={(newN) => {
              const updated = [newN, ...announcements];
              handleAnnouncementsChange(updated);
            }}
            onAddEvent={(newE) => {
              const updated = [newE, ...events];
              handleEventsChange(updated);
            }}
            selectedAnnouncementId={selectedAnnouncementId}
            onClearSelectedAnnouncement={() => setSelectedAnnouncementId(null)}
            onSelectAnnouncement={setSelectedAnnouncementId}
            initialSubTab="events"
          />
        );
      case 'support':
        return (
          <EventsAndSupportView
            currentUser={currentUser}
            subViewType="support"
            onNavigateToTab={setActiveTab}
            files={files}
            requests={requests}
            announcements={announcements}
            pinnedTools={pinnedTools}
            onTogglePinTool={handleTogglePinTool}
            onTriggerLogOut={handleTriggerLogOut}
          />
        );
      case 'admin':
        return (
          <EventsAndSupportView
            currentUser={currentUser}
            subViewType="admin"
            onNavigateToTab={setActiveTab}
            files={files}
            requests={requests}
            announcements={announcements}
            pinnedTools={pinnedTools}
            onTogglePinTool={handleTogglePinTool}
            onTriggerLogOut={handleTriggerLogOut}
          />
        );
      case 'profile':
        return (
          <EventsAndSupportView
            currentUser={currentUser}
            subViewType="profile"
            onNavigateToTab={setActiveTab}
            files={files}
            requests={requests}
            announcements={announcements}
            pinnedTools={pinnedTools}
            onTogglePinTool={handleTogglePinTool}
            onTriggerLogOut={handleTriggerLogOut}
          />
        );
      default:
        return <div className="text-gray-550 text-xs p-6 uppercase font-mono">Error matching view target code active in system.</div>;
    }
  };

  // Login Screen interface 
  if (isLoggedOut) {
    return (
      <div id="rex-login-screen" className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden relative">
        <div className="w-full max-w-7xl bg-white rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col min-h-[700px]">
          
          {/* Top Navigation */}
          <div className="flex justify-end items-center px-8 md:px-12 py-6 relative z-20">
            <div className="flex items-center gap-3">
              <RexLogo className="h-12 w-auto" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col lg:flex-row items-center relative z-10 px-8 md:px-12 py-12 lg:py-0">
            
            {/* Left Content (Text & CTAs) */}
            <div className="w-full lg:w-1/2 lg:pr-12 text-left z-20">
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Your digital workspace: connect and collaborate – fast
              </h1>
              <p className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed">
                Meet your new intranet directory. It's your digital hub, allowing you to browse employee profiles, visualize your organization's structure, and access tools in seconds.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    handleSwitchUserRole('new_staff');
                    setIsLoggedOut(false);
                  }}
                  className="px-8 py-3.5 bg-[#1E2D64] hover:bg-[#141F45] text-white font-bold rounded-lg transition-all shadow-lg shadow-[#1E2D64]/30 hover:-translate-y-0.5"
                >
                  Start Onboarding
                </button>
                <button
                  onClick={() => {
                    if (activeUserRole === 'new_staff') {
                      handleSwitchUserRole('claims_staff');
                    }
                    setIsLoggedOut(false);
                  }}
                  className="px-8 py-3.5 bg-white hover:bg-slate-50 text-[#1E2D64] font-bold border-2 border-[#1E2D64] rounded-lg transition-all hover:-translate-y-0.5"
                >
                  Existing Staff Login
                </button>
              </div>
            </div>

            {/* Right Content (Floating Elements) */}
            <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px] mt-16 lg:mt-0 z-10 hidden md:block">
              
              {/* Central abstract faded circle (optional background detail) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-slate-50 rounded-full mix-blend-multiply" />

              {/* Floating Element 1 - Large Orange Avatar */}
              <div className="absolute top-[20%] right-[15%] flex flex-col items-center gap-2 animate-[float_6s_ease-in-out_infinite]">
                <div className="w-24 h-24 rounded-full bg-orange-400 border-4 border-white shadow-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=150&h=150" alt="Avatar" className="w-full h-full object-cover" />
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
                </div>
              </div>

              {/* Floating Element 2 - Teal Avatar with Tag */}
              <div className="absolute bottom-[35%] left-[10%] flex flex-col items-end gap-2 animate-[float_5s_ease-in-out_infinite_1s]">
                <div className="w-28 h-28 rounded-full bg-[#1E2D64] border-4 border-white shadow-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&q=80&w=150&h=150" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Floating Element 3 - Purple Avatar */}
              <div className="absolute top-[45%] left-[35%] animate-[float_7s_ease-in-out_infinite_0.5s]">
                <div className="w-24 h-24 rounded-full bg-purple-500 border-4 border-white shadow-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=150&h=150" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Floating Element 4 - Yellow Large Avatar */}
              <div className="absolute bottom-[10%] right-[10%] flex flex-col items-start gap-2 animate-[float_6s_ease-in-out_infinite_2s]">
                <div className="w-32 h-32 rounded-full bg-amber-400 border-4 border-white shadow-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=150&h=150" alt="Avatar" className="w-full h-full object-cover pt-4" />
                </div>
                <div className="bg-[#1E90FF] text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm -ml-4">Jack</div>
              </div>

              {/* Floating Element 5 - Pink small Avatar */}
              <div className="absolute bottom-[20%] left-[45%] animate-[float_5.5s_ease-in-out_infinite_1.5s]">
                <div className="w-20 h-20 rounded-full bg-rose-400 border-4 border-white shadow-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1574701148212-8518049c7b2c?auto=format&fit=crop&q=80&w=150&h=150" alt="Avatar" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
                </div>
              </div>

              {/* Floating Element 6 - Blue small Avatar bottom right */}
              <div className="absolute bottom-[5%] left-[65%] animate-[float_6.5s_ease-in-out_infinite_0.8s]">
                <div className="w-16 h-16 rounded-full bg-[#1E90FF] border-4 border-white shadow-xl overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1507038732509-8b1a9623223a?auto=format&fit=crop&q=80&w=150&h=150" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Tool Icon - Chat Bubble */}
              <div className="absolute bottom-[15%] left-[25%] animate-[float_4s_ease-in-out_infinite_0.3s]">
                <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center">
                  <div className="w-8 h-8 rounded bg-green-500 opacity-80" />
                </div>
              </div>

              {/* Tool Icon - Video Call */}
              <div className="absolute top-[65%] right-[30%] animate-[float_5s_ease-in-out_infinite_1.2s]">
                <div className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center relative">
                  <div className="w-6 h-4 bg-blue-500 rounded-sm" />
                </div>
              </div>
              
              {/* Tool Icon - Google Workspace-like Icon top */}
              <div className="absolute top-[30%] left-[50%] animate-[float_6s_ease-in-out_infinite_2.5s]">
                <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center">
                   <div className="w-6 h-6 border-4 border-yellow-400 border-l-green-500 border-t-red-500 border-r-blue-500" />
                </div>
              </div>

              {/* Name Tags */}
              <div className="absolute top-[25%] right-[30%] bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm animate-[float_6s_ease-in-out_infinite]">
                Patrick
                <div className="w-0.5 h-6 bg-green-500 absolute -bottom-6 left-2" />
              </div>

              <div className="absolute top-[40%] right-[10%] bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm animate-[float_7s_ease-in-out_infinite_0.5s]">
                Thomas
                <div className="w-0.5 h-6 bg-red-500 absolute -bottom-6 left-2" />
              </div>

            </div>
          </div>
        </div>
        
        {/* Basic CSS for floating animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
        `}} />
      </div>
    );
  }

  // 1. Fully Blocking Onboarding Flow for New Hires
  if (!currentUser.completedOnboarding) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased text-sm">
        <StructuredOnboardingFlow 
          currentUser={currentUser} 
          onComplete={() => {
            setCurrentUser(prev => ({ ...prev, completedOnboarding: true }));
          }} 
          onBackToHome={() => setCurrentUser(prev => ({ ...prev, completedOnboarding: true }))}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased text-sm relative">
      {/* 1. Global Left Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          // Clear query if navigating tabs
          if (tab !== 'search') setSearchQuery('');
          setActiveTab(tab);
        }} 
        currentUser={currentUser}
        onSwitchUser={handleSwitchUserRole}
      />

      {/* 2. Global Top Header */}
      <Header 
        currentUser={currentUser}
        searchQuery={searchQuery}
        onSearch={(query) => {
          setSearchQuery(query);
          if (query) setActiveTab('search');
          else setActiveTab('home');
        }}
        onOpenProfile={() => setActiveTab('profile')}
        onSetActiveTab={(tab) => {
          setActiveTab(tab);
        }}
      />

      {/* 3. Main content workspace area */}
      <main className="pl-80 pr-8 pt-24 min-h-screen">
        {renderActiveView()}
      </main>

      {!currentUser.walkthroughCompleted && currentUser.completedOnboarding && (
        <GuidedWalkthrough onComplete={() => setCurrentUser(prev => ({ ...prev, walkthroughCompleted: true }))} />
      )}

      {/* REX AI Chat Widget - Global Floating Element */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {isRexAiOpen ? (
          <div id="rex-ai-chat-board" className="w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-in">
            {/* Header / Brand Rail */}
            <div className="bg-gradient-to-r from-orange-600 to-red-650 p-4 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-sm tracking-wide">
                  <Sparkles className="w-4 h-4 text-orange-200 fill-orange-200 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-xs font-sans text-white leading-tight">Rex AI Assistant</h4>
                  <p className="text-[9px] uppercase tracking-wider text-orange-200 font-mono font-bold leading-normal">Active Intranet Oracle</p>
                </div>
              </div>
              <button 
                onClick={() => setIsRexAiOpen(false)}
                className="w-7 h-7 rounded-full bg-black/10 hover:bg-black/25 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Scroller */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
              {rexAiMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-orange-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none font-sans'
                  }`}>
                    {msg.sender === 'ai' ? (
                      <div className="whitespace-pre-line prose-sm prose">
                        {msg.text.split('**').map((chunk, idx) => 
                          idx % 2 === 1 ? <strong key={idx} className="font-bold text-slate-950">{chunk}</strong> : chunk
                        )}
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                  <span className="text-[8px] text-slate-400 mt-1 font-mono tracking-wider px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              
              {isRexAiResponding && (
                <div className="flex items-center gap-2 text-slate-450 text-[10px] italic font-mono px-1">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-spin" />
                  <span>Rex AI is analyzing compliance guides ...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested prompts chips */}
            {rexAiMessages.length === 1 && (
              <div className="p-2 border-t border-slate-100 bg-white flex flex-wrap gap-1.5 justify-center">
                {[
                  "What is my onboarding task?",
                  "Show corporate policies",
                  "Tell me about existing staff LMS"
                ].map((sug, sidx) => (
                  <button 
                    key={sidx}
                    onClick={() => { setRexAiInput(sug); }}
                    className="text-[9px] bg-slate-50 border border-slate-200 hover:border-orange-300 text-slate-650 hover:text-orange-700 font-medium px-2.5 py-1 rounded-full text-center transition-all cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input interface */}
            <div className="p-3 border-t border-slate-150 bg-white flex gap-2 items-center">
              <input 
                id="rex-ai-chat-input"
                type="text"
                placeholder="Ask Rex AI about policies, checklists..."
                value={rexAiInput}
                onChange={(e) => setRexAiInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendRexAiMessage(); }}
                className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 text-slate-800"
              />
              <button 
                id="rex-ai-chat-sendbtn"
                onClick={handleSendRexAiMessage}
                disabled={!rexAiInput.trim() || isRexAiResponding}
                className="w-8 h-8 rounded-xl bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center disabled:opacity-40 disabled:hover:bg-orange-600 transition-all cursor-pointer shadow"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <button 
            id="rex-ai-trigger-bubble"
            onClick={() => setIsRexAiOpen(true)}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-red-650 hover:from-orange-700 hover:to-red-700 text-white shadow-2xl flex items-center gap-2 text-xs font-bold transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-orange-500/30"
          >
            <Sparkles className="w-4 h-4 fill-white text-white animate-pulse" />
            <span>Ask Rex AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-ping" />
          </button>
        )}
      </div>

    </div>
  );
}
