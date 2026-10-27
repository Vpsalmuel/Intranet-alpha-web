export type UserRole = 'new_staff' | 'existing_staff' | 'claims_staff' | 'underwriting_staff' | 'finance_staff' | 'it_admin' | 'brand_admin' | 'hr_admin' | 'management';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  jobTitle: string;
  avatar: string;
  joinedDate: string;
  extension?: string;
  buddyName?: string;
  lineManager?: string;
  completedOnboarding?: boolean;
  walkthroughCompleted?: boolean;
  isApprover?: boolean;
}

export interface Milestone {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  type: 'Work Anniversary' | 'Promotion' | 'Certification Earned' | 'Retirement' | 'Other';
  message: string;
  date: string;
  reactions: Record<string, number>;
}

export type RequestStatus = 'Draft' | 'Submitted' | 'Pending Review' | 'In Progress' | 'Awaiting Approval' | 'Completed' | 'Rejected' | 'Cancelled' | 'Pending' | 'Approved' | 'Fulfilled';

export type RequestPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Comment {
  id: string;
  author: string;
  authorRole: string;
  content: string;
  timestamp: string;
}

export interface RequestItem {
  id: string;
  title: string;
  requestingDept: string;
  receivingDept: string;
  requestType: string;
  requestedBy: string;
  requesterEmail: string;
  priority: RequestPriority;
  dueDate: string;
  status: RequestStatus;
  lastUpdated: string;
  description: string;
  attachments: string[];
  approver?: string;
  assignedOwner?: string;
  comments: Comment[];
  history: {
    action: string;
    user: string;
    timestamp: string;
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Company News' | 'Leadership Messages' | 'HR Updates' | 'Compliance Notices' | 'Internal Campaigns' | 'Department Announcements' | 'Events' | 'Staff News';
  summary: string;
  body: string;
  date: string;
  author: string;
  department: string;
  image?: string;
  attachments?: string[];
  featured?: boolean;
  visibility: 'Everyone' | 'New Staff' | 'Existing Staff' | 'Management' | string;
}

export interface FileItem {
  id: string;
  title: string;
  category: 'HR Policies' | 'IT Policies' | 'Compliance' | 'Staff Handbook' | 'SOPs' | 'Forms' | 'Templates' | 'Brand Guidelines' | 'Training Materials' | 'Process Documents';
  department: string;
  lastUpdated: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'PPTX' | 'ZIP';
  downloadCount: number;
  description: string;
  version: string;
}

export interface Video {
  id: string;
  title: string;
  category: 'Leadership' | 'Company Culture' | 'HR & People' | 'Business Operations' | string;
  department: string;
  speaker: string;
  duration: string;
  thumbnail: string;
  completed: boolean;
  progressPercent: number;
  description: string;
  keyLearnings: string[];
  relatedDocs: string[];
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  manager: string;
  bio: string;
  skills: string[];
  expertise: string[];
  buddyOf?: string;
  languages?: string[];
  projects?: string[];
  training?: string[];
  certificates?: string[];
  interests?: string[];
  awards?: string[];
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface DepartmentInfo {
  id: string;
  name: string;
  description: string;
  lead: string;
  leadRole: string;
  leadAvatar: string;
  email: string;
  phone: string;
  color: string;
  icon: string;
  quickTools: string[];
  team: string[]; // employee IDs
  faqs?: { q: string; a: string }[];
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Training' | 'Town Hall' | 'Social' | 'Campaign' | 'Birthday' | 'Work Anniversary';
  date: string;
  time?: string;
  location?: string;
  description: string;
  organizer: string;
}

export interface OnboardingTask {
  id: string;
  title: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  dueDate: string;
  description: string;
  ctaText?: string;
  ctaTarget?: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  lastUpdated: string;
  views: number;
  tags: string[];
}
