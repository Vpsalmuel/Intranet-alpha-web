import React, { useState } from 'react';
import { 
  Megaphone, 
  Search, 
  PlusCircle, 
  ArrowLeft, 
  Calendar, 
  User as UserIcon, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Eye, 
  CheckCircle, 
  FileText, 
  ExternalLink,
  Check,
  Sparkles,
  CalendarCheck
} from 'lucide-react';
import { Announcement, EventItem, User } from '../types';

interface UpdatesViewProps {
  currentUser: User;
  announcements: Announcement[];
  events?: EventItem[];
  onAddAnnouncement: (announcement: Announcement) => void;
  onAddEvent?: (event: EventItem) => void;
  selectedAnnouncementId: string | null;
  onClearSelectedAnnouncement: () => void;
  onSelectAnnouncement: (id: string | null) => void;
  initialSubTab?: 'updates' | 'events';
}

export default function UpdatesView({
  currentUser,
  announcements,
  events = [],
  onAddAnnouncement,
  onAddEvent,
  selectedAnnouncementId,
  onClearSelectedAnnouncement,
  onSelectAnnouncement,
  initialSubTab = 'updates'
}: UpdatesViewProps) {
  // Main view switcher: 'updates' is primary, 'events' is merged alongside
  const [activeSubTab, setActiveSubTab] = useState<'updates' | 'events'>(initialSubTab);

  // Updates filtering and search
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  // Events filtering and search
  const [eventCategoryFilter, setEventCategoryFilter] = useState<string>('All');
  const [eventSearchQuery, setEventSearchQuery] = useState<string>('');
  const [showCreateEventForm, setShowCreateEventForm] = useState<boolean>(false);
  const [savedEventIds, setSavedEventIds] = useState<Record<string, boolean>>({});

  // Announcement Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Announcement['category']>('Company News');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [visibility, setVisibility] = useState('Everyone');
  const [image, setImage] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  // Event Form states
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<EventItem['category']>('Town Hall');
  const [eventDate, setEventDate] = useState('2026-06-15');
  const [eventTime, setEventTime] = useState('10:00 AM - 11:30 AM');
  const [eventLocation, setEventLocation] = useState('Main Amphitheater & Virtual MS Teams');
  const [eventDescription, setEventDescription] = useState('');
  const [eventOrganizer, setEventOrganizer] = useState(currentUser.name);

  const adminRoles = ['brand_admin', 'hr_admin', 'management', 'it_admin'];
  const canPublish = adminRoles.includes(currentUser.role);

  // Categories for Announcements
  const categoriesList = [
    'All',
    'Company News',
    'Leadership Messages',
    'HR Updates',
    'Compliance Notices',
    'Department Announcements',
    'Events',
    'Staff News'
  ];

  // Categories for Events
  const eventCategoriesList = ['All', 'Town Hall', 'Training', 'Social', 'Campaign'];

  // Filtering Announcements
  const filteredAnnouncements = announcements.filter(news => {
    const matchesCategory = filterCategory === 'All' || news.category === filterCategory;
    const matchesSearch = 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filtering Events
  const filteredEvents = events.filter(ev => {
    const matchesCategory = eventCategoryFilter === 'All' || ev.category === eventCategoryFilter;
    const matchesSearch = 
      ev.title.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
      ev.organizer.toLowerCase().includes(eventSearchQuery.toLowerCase()) ||
      (ev.location && ev.location.toLowerCase().includes(eventSearchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const selectedAnnouncement = announcements.find(a => a.id === selectedAnnouncementId);

  // Toggle calendar save for events
  const handleToggleSaveEvent = (id: string) => {
    setSavedEventIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Submit announcement
  const handleSubmitAnnouncementForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body || !summary) {
      alert('Please fill out all required fields.');
      return;
    }

    const newAnnouncement: Announcement = {
      id: `news-${Date.now()}`,
      title,
      category,
      summary,
      body,
      date: new Date().toISOString().split('T')[0],
      author: currentUser.name,
      department: currentUser.department,
      featured: isFeatured,
      image: image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600&h=300',
      visibility
    };

    onAddAnnouncement(newAnnouncement);
    setShowCreateForm(false);
    
    // Reset Form
    setTitle('');
    setSummary('');
    setBody('');
    setImage('');
    setIsFeatured(false);
    setVisibility('Everyone');
  };

  // Submit event
  const handleSubmitEventForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDescription) {
      alert('Please provide event title and description.');
      return;
    }

    const newEvent: EventItem = {
      id: `ev-${Date.now()}`,
      title: eventTitle,
      category: eventCategory,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      description: eventDescription,
      organizer: eventOrganizer
    };

    if (onAddEvent) {
      onAddEvent(newEvent);
    }
    setShowCreateEventForm(false);

    // Reset Form
    setEventTitle('');
    setEventDescription('');
  };

  // Helper to parse date for display badge
  const formatEventDateBadge = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        const day = date.getDate();
        return { month, day: String(day).padStart(2, '0') };
      }
    } catch {
      // Fallback
    }
    return { month: 'JUN', day: '03' };
  };

  // 1. Single Announcement Detailed View
  if (selectedAnnouncement) {
    return (
      <div className="space-y-6 animate-fade-in pb-12 font-sans">
        <button
          onClick={onClearSelectedAnnouncement}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#1E2D64] bg-white border border-slate-200/70 rounded-lg px-3 py-1.5 shadow-xs hover:shadow-sm transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Company Updates
        </button>

        <div className="bg-white border border-slate-200/70 rounded-2xl overflow-hidden shadow-xs max-w-4xl">
          {selectedAnnouncement.image && (
            <div className="w-full h-80 relative bg-slate-100">
              <img 
                src={selectedAnnouncement.image} 
                alt={selectedAnnouncement.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white max-w-3xl pr-6">
                <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-[#EA580C] rounded font-mono shadow-xs">
                  {selectedAnnouncement.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-tight mt-3 text-white drop-shadow-xs">
                  {selectedAnnouncement.title}
                </h2>
              </div>
            </div>
          )}

          <div className="p-8">
            {/* Metadata Info Bar */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-6 mb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-[#1E2D64] flex items-center justify-center font-bold font-mono">
                  {selectedAnnouncement.author.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{selectedAnnouncement.author}</h5>
                  <p className="text-[10px] text-slate-500">{selectedAnnouncement.department}</p>
                </div>
              </div>

              <div className="flex gap-4 text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Published: {selectedAnnouncement.date}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/70 rounded-md px-2 py-0.5">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>Audience: <strong>{selectedAnnouncement.visibility}</strong></span>
                </div>
              </div>
            </div>

            {/* Markdown/Text Body */}
            <div className="prose max-w-none text-xs text-slate-700 leading-relaxed space-y-6 whitespace-pre-wrap font-sans">
              {selectedAnnouncement.body}
            </div>

            {/* Attachments Section */}
            {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#EA580C]" /> Attached Publications & Resources
                </h4>
                <div className="flex flex-wrap gap-3">
                  {selectedAnnouncement.attachments.map((file, idx) => (
                    <div 
                      key={idx} 
                      className="inline-flex items-center gap-2 px-3 py-2 border border-slate-200/70 hover:border-blue-400 rounded-lg bg-slate-50/50 hover:bg-blue-50/20 text-xs transition-all cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-rose-500" />
                      <span className="font-medium text-slate-700">{file}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 ml-1.5" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Read Next Sidebar Recs Widget */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/70 max-w-4xl">
          <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 mb-3 block">
            More Corporate Updates
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            {announcements.filter(a => a.id !== selectedAnnouncementId).slice(0, 3).map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectAnnouncement(item.id)}
                className="p-4 border border-slate-200/70 bg-white rounded-xl hover:border-blue-300 transition-all cursor-pointer hover:shadow-xs"
              >
                <span className="text-[8px] font-mono font-bold uppercase text-[#EA580C] block mb-1">
                  {item.category}
                </span>
                <h5 className="text-xs font-bold text-slate-900 line-clamp-1 truncate">{item.title}</h5>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{item.summary}</p>
                <span className="text-[9px] text-[#1E2D64] font-semibold block mt-3">Read now →</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. Add New Announcement Form View
  if (showCreateForm) {
    return (
      <div className="space-y-6 animate-fade-in pb-12 max-w-2xl font-sans">
        <div className="flex items-center gap-2 justify-between">
          <button
            onClick={() => setShowCreateForm(false)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#1E2D64] bg-white border border-slate-200/70 rounded-lg px-3 py-1.5 shadow-xs hover:shadow-sm transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Company Updates
          </button>
          <span className="text-xs text-slate-500 font-mono">
            Publishing as: <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.department})
          </span>
        </div>

        <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-xs">
          <h3 className="font-sans font-bold text-slate-900 text-base mb-1">Publish Corporate Update</h3>
          <p className="text-xs text-slate-500 mb-6">Create announcements, news bulletins, leadership messages, or compliance notices visible across the firm.</p>

          <form onSubmit={handleSubmitAnnouncementForm} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Announcement Title *</label>
              <input
                id="announcement-form-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mandatory Information Security Guidelines and Compliance Mandates"
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E2D64] focus:border-[#1E2D64]"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">News Category *</label>
                <select
                  id="announcement-form-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Announcement['category'])}
                  className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 cursor-pointer focus:bg-white"
                >
                  <option value="Company News">Company News</option>
                  <option value="Leadership Messages">Leadership Messages</option>
                  <option value="HR Updates">HR Updates</option>
                  <option value="Compliance Notices">Compliance Notices</option>
                  <option value="Department Announcements">Department Announcements</option>
                  <option value="Events">Events</option>
                  <option value="Staff News">Staff News</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Visibility Audience *</label>
                <select
                  id="announcement-form-visibility"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 cursor-pointer focus:bg-white"
                >
                  <option value="Everyone">Everyone</option>
                  <option value="New Staff">New Staff Only</option>
                  <option value="Existing Staff">Existing Staff Only</option>
                  <option value="Management">Management / Executive Only</option>
                  <option value="Claims Operations">Claims Operations Only</option>
                  <option value="Underwriting">Underwriting Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Brief Summary Pitch *</label>
              <input
                id="announcement-form-summary"
                type="text"
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="A high-level 1-line hook explaining the update summary..."
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E2D64] focus:border-[#1E2D64]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Body Narrative *</label>
              <textarea
                id="announcement-form-body"
                required
                rows={8}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write the complete bulletin messaging here..."
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E2D64] focus:border-[#1E2D64] font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Banner Image URL (optional)</label>
              <input
                id="announcement-form-img"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/... (Leave empty for standard brand image)"
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E2D64] focus:border-[#1E2D64]"
              />
            </div>

            <div className="flex items-center gap-2 py-2 select-none">
              <input
                id="announcement-form-featured"
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-[#1E2D64] border-slate-300 rounded focus:ring-[#1E2D64] cursor-pointer"
              />
              <label htmlFor="announcement-form-featured" className="text-xs text-slate-700 font-bold cursor-pointer">
                Set as Featured Headline Banner (occupies top position on dashboard)
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Discard Draft
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#1E2D64] border border-[#141e43] text-white text-xs font-bold rounded-lg hover:bg-[#152046] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <CheckCircle className="w-4 h-4" /> Publish Live Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 3. Add New Event Form View
  if (showCreateEventForm) {
    return (
      <div className="space-y-6 animate-fade-in pb-12 max-w-2xl font-sans">
        <div className="flex items-center gap-2 justify-between">
          <button
            onClick={() => setShowCreateEventForm(false)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#1E2D64] bg-white border border-slate-200/70 rounded-lg px-3 py-1.5 shadow-xs hover:shadow-sm transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Company Updates
          </button>
          <span className="text-xs text-slate-500 font-mono">
            Scheduling as: <strong className="text-slate-800">{currentUser.name}</strong>
          </span>
        </div>

        <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-xs">
          <h3 className="font-sans font-bold text-slate-900 text-base mb-1">Schedule Corporate Event / Town Hall</h3>
          <p className="text-xs text-slate-500 mb-6">Add an official corporate event or session notice visible to all staff on the company calendar.</p>

          <form onSubmit={handleSubmitEventForm} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Event Title *</label>
              <input
                id="event-form-title"
                type="text"
                required
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="e.g. Q3 All-Hands Executive Briefing & Strategy Alignment"
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E2D64] focus:border-[#1E2D64]"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Event Category *</label>
                <select
                  id="event-form-category"
                  value={eventCategory}
                  onChange={(e) => setEventCategory(e.target.value as EventItem['category'])}
                  className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 cursor-pointer focus:bg-white"
                >
                  <option value="Town Hall">Town Hall</option>
                  <option value="Training">Training & Upskilling</option>
                  <option value="Social">Social & Welcoming</option>
                  <option value="Campaign">Internal Campaign</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Date *</label>
                <input
                  id="event-form-date"
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E2D64] focus:border-[#1E2D64]"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Time / Duration *</label>
                <input
                  id="event-form-time"
                  type="text"
                  required
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  placeholder="e.g. 10:00 AM - 11:30 AM"
                  className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E2D64] focus:border-[#1E2D64]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Location / Meeting Room *</label>
                <input
                  id="event-form-location"
                  type="text"
                  required
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="e.g. Main Amphitheater & Virtual MS Teams"
                  className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E2D64] focus:border-[#1E2D64]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Organizer / Lead Name</label>
              <input
                id="event-form-organizer"
                type="text"
                value={eventOrganizer}
                onChange={(e) => setEventOrganizer(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E2D64] focus:border-[#1E2D64]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Event Description & Agenda *</label>
              <textarea
                id="event-form-desc"
                required
                rows={5}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Outline the meeting purpose, agenda, keynote speakers, and participating departments..."
                className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E2D64] focus:border-[#1E2D64]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCreateEventForm(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#1E2D64] border border-[#141e43] text-white text-xs font-bold rounded-lg hover:bg-[#152046] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <CheckCircle className="w-4 h-4" /> Save Corporate Event
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 4. Main Integrated View (Company Updates Primary + Company Events Merged)
  return (
    <div className="space-y-8 animate-fade-in pb-12 font-sans">
      {/* Header and Action Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-sans font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-[#1E2D64]" /> Company Updates
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Centralized corporate bulletins, leadership notices, regulatory announcements, and official company events.
          </p>
        </div>

        {canPublish && (
          <div className="flex items-center gap-2 self-stretch md:self-auto">
            {activeSubTab === 'updates' ? (
              <button
                id="create-announcement-button"
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-[#EA580C] text-white text-xs font-bold rounded-xl hover:bg-[#c2410c] shadow-xs flex items-center gap-1.5 flex-1 md:flex-initial justify-center cursor-pointer transition-colors"
              >
                <PlusCircle className="w-4 h-4" /> Publish Update
              </button>
            ) : (
              <button
                id="schedule-event-button"
                onClick={() => setShowCreateEventForm(true)}
                className="px-4 py-2 bg-[#1E2D64] text-white text-xs font-bold rounded-xl hover:bg-[#152046] shadow-xs flex items-center gap-1.5 flex-1 md:flex-initial justify-center cursor-pointer transition-colors"
              >
                <Calendar className="w-4 h-4" /> Schedule Event
              </button>
            )}
          </div>
        )}
      </div>

      {/* Primary Navigation Switcher: Company Updates is primary */}
      <div className="flex items-center gap-2 p-1 bg-slate-100/80 rounded-xl max-w-md border border-slate-200/60">
        <button
          onClick={() => setActiveSubTab('updates')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'updates'
              ? 'bg-white text-[#1E2D64] shadow-xs border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Megaphone className="w-3.5 h-3.5" />
          <span>Bulletins & Notices</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
            activeSubTab === 'updates' ? 'bg-blue-50 text-[#1E2D64]' : 'bg-slate-200/70 text-slate-600'
          }`}>
            {announcements.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('events')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'events'
              ? 'bg-white text-[#1E2D64] shadow-xs border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Company Events</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
            activeSubTab === 'events' ? 'bg-blue-50 text-[#1E2D64]' : 'bg-slate-200/70 text-slate-600'
          }`}>
            {events.length}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW A: COMPANY BULLETINS & NOTICES (PRIMARY)                             */}
      {/* ========================================================================= */}
      {activeSubTab === 'updates' && (
        <div className="space-y-6">
          {/* Upcoming Events Spotlight Banner embedded inside Company Updates */}
          {events.length > 0 && (
            <div className="bg-gradient-to-r from-slate-900 to-[#1E2D64] rounded-2xl p-6 text-white shadow-xs relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-orange-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                      Upcoming Corporate Events & Town Halls
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#EA580C] text-white">Live Calendar</span>
                    </h3>
                    <p className="text-[11px] text-slate-300">Synchronize your schedule with official executive briefings and training seminars.</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveSubTab('events')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg border border-white/20 transition-all self-start lg:self-auto cursor-pointer"
                >
                  View Full Event Schedule ({events.length}) <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Event highlight cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {events.slice(0, 4).map((ev) => {
                  const dateInfo = formatEventDateBadge(ev.date);
                  return (
                    <div 
                      key={ev.id} 
                      onClick={() => setActiveSubTab('events')}
                      className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl p-3.5 transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/20 text-white font-bold">
                            {ev.category}
                          </span>
                          <span className="text-[10px] font-mono text-orange-300 font-bold">
                            {dateInfo.month} {dateInfo.day}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-orange-200 transition-colors">
                          {ev.title}
                        </h4>
                        <p className="text-[10px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                          {ev.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9.5px] text-slate-300">
                        <span className="truncate max-w-[110px]">{ev.time || '10:00 AM'}</span>
                        <span className="text-orange-300 group-hover:translate-x-0.5 transition-transform">Details →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Category Filter Pills & Search */}
          <div className="bg-white border border-slate-200/70 rounded-2xl p-4 shadow-xs space-y-4">
            <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded-xl transition-all font-medium cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-[#1E2D64] text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="bulletin-search-bar"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bulletins by headlines, authors, content descriptions..."
                className="w-full bg-slate-50/80 border border-slate-200/70 text-slate-800 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E2D64]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Main Bulletin Cards */}
          {filteredAnnouncements.length === 0 ? (
            <div className="bg-white border border-slate-200/70 rounded-2xl p-12 text-center shadow-xs">
              <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-800">No Announcements Found</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">There are no bulletins currently matching your category filters or search keywords.</p>
              <button 
                onClick={() => { setFilterCategory('All'); setSearchQuery(''); }} 
                className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200 cursor-pointer"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredAnnouncements.map((news) => (
                <div
                  key={news.id}
                  onClick={() => onSelectAnnouncement(news.id)}
                  className={`bg-white border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                    news.featured ? 'border-orange-300/80 ring-1 ring-orange-200/50 shadow-xs' : 'border-slate-200/70 shadow-xs'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 justify-between">
                      {news.featured ? (
                        <span className="px-2.5 py-0.5 text-[8px] font-mono font-bold uppercase rounded-md bg-[#EA580C] text-white shadow-2xs flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> FEATURED HEADLINE
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 text-[8px] font-mono font-bold uppercase rounded-md bg-blue-50 border border-blue-100 text-[#1E2D64]">
                          {news.category}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-mono">{news.date}</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1E2D64] transition-colors leading-snug mt-3">
                      {news.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
                      {news.summary}
                    </p>
                  </div>

                  <div className="px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>By <strong>{news.author}</strong></span>
                    <span className="text-[#1E2D64] font-semibold flex items-center gap-0.5 group-hover:translate-x-1 duration-200 transition-all">
                      Read Bulletin <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW B: CORPORATE EVENTS & TOWN HALLS (MERGED ANNOUNCEMENT VIEW)           */}
      {/* ========================================================================= */}
      {activeSubTab === 'events' && (
        <div className="space-y-6">
          {/* Events Sub-header & Filtering */}
          <div className="bg-white border border-slate-200/70 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1E2D64]" /> Corporate Events Bulletin
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Firm-wide briefings, department training seminars, and official celebrations.</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {eventCategoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setEventCategoryFilter(cat)}
                    className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all cursor-pointer ${
                      eventCategoryFilter === cat
                        ? 'bg-[#1E2D64] text-white shadow-xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={eventSearchQuery}
                onChange={(e) => setEventSearchQuery(e.target.value)}
                placeholder="Search events by title, organizer, location, or agenda..."
                className="w-full bg-slate-50/80 border border-slate-200/70 text-slate-800 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1E2D64]"
              />
              {eventSearchQuery && (
                <button 
                  onClick={() => setEventSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Event Listings as Clean Announcement Cards (No comments or reactions) */}
          {filteredEvents.length === 0 ? (
            <div className="bg-white border border-slate-200/70 rounded-2xl p-12 text-center shadow-xs">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-800">No Events Scheduled</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">There are no company events matching this category or keyword query.</p>
              <button 
                onClick={() => { setEventCategoryFilter('All'); setEventSearchQuery(''); }} 
                className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200 cursor-pointer"
              >
                Reset Event Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((ev) => {
                const dateInfo = formatEventDateBadge(ev.date);
                const isSaved = !!savedEventIds[ev.id];

                return (
                  <div 
                    key={ev.id} 
                    className="p-6 bg-white border border-slate-200/70 rounded-2xl shadow-xs transition-all flex flex-col md:flex-row items-start gap-5 hover:border-slate-300"
                  >
                    {/* Date Block */}
                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-blue-50/80 border border-blue-100 text-[#1E2D64] flex flex-col items-center justify-center font-mono leading-tight select-none shadow-2xs">
                      <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">{dateInfo.month}</span>
                      <span className="text-xl font-extrabold text-[#1E2D64]">{dateInfo.day}</span>
                    </div>

                    {/* Main Event Info */}
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 text-[8.5px] font-mono font-bold uppercase rounded-md bg-orange-100 border border-orange-200 text-orange-900">
                          {ev.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Official Corporate Event</span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900">{ev.title}</h4>
                      
                      <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-3xl">
                        {ev.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-2 text-[11px] text-slate-500 font-sans border-t border-slate-100">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> 
                          {ev.time || '10:00 AM - 11:30 AM'}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" /> 
                          {ev.location || 'Lagos Main Campus & Virtual'}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <UserIcon className="w-3.5 h-3.5 text-slate-400" /> 
                          Organizer: <strong className="text-slate-700">{ev.organizer}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Calendar Action */}
                    <div className="shrink-0 self-stretch md:self-center flex md:flex-col items-center justify-end gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5">
                      <button
                        onClick={() => handleToggleSaveEvent(ev.id)}
                        className={`w-full md:w-auto px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                          isSaved 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isSaved ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" /> Saved to Calendar
                          </>
                        ) : (
                          <>
                            <CalendarCheck className="w-3.5 h-3.5 text-slate-500" /> Add to Calendar
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
      )}
    </div>
  );
}
