import { 
  User, 
  UserRole, 
  RequestItem, 
  Announcement, 
  FileItem, 
  Video, 
  Employee, 
  DepartmentInfo, 
  EventItem, 
  Milestone,
  OnboardingTask,
  KnowledgeArticle 
} from '../types';

export const USERS: Record<UserRole, User> = {
  new_staff: {
    id: 'emp-101',
    name: 'Samuel Adebayo',
    email: 'samuel.adebayo@metropulse-insurance.com',
    role: 'new_staff',
    department: 'Claims Operations',
    jobTitle: 'Junior Claims Analyst',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    joinedDate: '2026-05-24',
    buddyName: 'Sarah Jenkins',
    lineManager: 'Arthur Pendelton',
    completedOnboarding: false,
    walkthroughCompleted: false,
    isApprover: false
  },
  existing_staff: {
    id: 'emp-105',
    name: 'Marcus Vance',
    email: 'marcus.vance@metropulse-insurance.com',
    role: 'existing_staff',
    department: 'Customer Experience',
    jobTitle: 'Senior CX Manager',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    joinedDate: '2022-09-12',
    completedOnboarding: true,
    walkthroughCompleted: true,
    isApprover: false
  },
  claims_staff: {
    id: 'emp-102',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@metropulse-insurance.com',
    role: 'claims_staff',
    department: 'Claims Operations',
    jobTitle: 'Senior Claims Specialist / Buddy Lead',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    joinedDate: '2020-03-15',
    completedOnboarding: true,
    walkthroughCompleted: true,
    isApprover: false
  },
  underwriting_staff: {
    id: 'emp-103',
    name: 'Rebecca Sterling',
    email: 'rebecca.sterling@metropulse-insurance.com',
    role: 'underwriting_staff',
    department: 'Underwriting',
    jobTitle: 'Lead Commercial Underwriter',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    joinedDate: '2019-11-01',
    completedOnboarding: true,
    walkthroughCompleted: true,
    isApprover: false
  },
  finance_staff: {
    id: 'emp-109',
    name: 'Amanda Lin',
    email: 'amanda.lin@metropulse-insurance.com',
    role: 'finance_staff',
    department: 'Finance & Treasury',
    jobTitle: 'Senior Financial Controlling Analyst',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200',
    joinedDate: '2021-04-18',
    completedOnboarding: true,
    walkthroughCompleted: true,
    isApprover: false
  },
  it_admin: {
    id: 'emp-104',
    name: 'David Kojo',
    email: 'david.kojo@metropulse-insurance.com',
    role: 'it_admin',
    department: 'IT & Digital Infrastructure',
    jobTitle: 'IT Support Supervisor & System Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    joinedDate: '2018-05-10',
    completedOnboarding: true,
    walkthroughCompleted: true,
    isApprover: true
  },
  brand_admin: {
    id: 'emp-107',
    name: 'Elena Rostova',
    email: 'elena.rostova@metropulse-insurance.com',
    role: 'brand_admin',
    department: 'Brand & Corporate Communications',
    jobTitle: 'Communications Lead',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    joinedDate: '2021-02-14',
    completedOnboarding: true,
    walkthroughCompleted: true,
    isApprover: false
  },
  hr_admin: {
    id: 'emp-108',
    name: 'Thomas Mueller',
    email: 'thomas.mueller@metropulse-insurance.com',
    role: 'hr_admin',
    department: 'People & Culture (HR)',
    jobTitle: 'Head of Recruitment & Onboarding',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
    joinedDate: '2017-08-20',
    completedOnboarding: true,
    walkthroughCompleted: true,
    isApprover: true
  },
  management: {
    id: 'emp-100',
    name: 'Victoria Hawthorne',
    email: 'v.hawthorne@metropulse-insurance.com',
    role: 'management',
    department: 'Executive Leadership Office',
    jobTitle: 'Managing Director & CEO',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    joinedDate: '2015-01-10',
    completedOnboarding: true,
    walkthroughCompleted: true,
    isApprover: false
  }
};

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'dept-hr',
    name: 'People & Culture (HR)',
    description: 'We drive organizational wellness, recruit top tier industry talent, nurture personnel development, and support employee transition processes.',
    lead: 'Thomas Mueller',
    leadRole: 'Head of HR',
    leadAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'hr.talent@metropulse-insurance.com',
    phone: 'Ext: 201',
    color: 'emerald',
    icon: 'Users',
    quickTools: ['HR Self-Service', 'Leave Portal', 'Welfare Planner', 'Training Hub'],
    team: ['emp-108', 'emp-101'],
    faqs: [
      { q: 'How do I submit my leave request?', a: 'Navigate to the Leave Request Tool, select dates, assign a handover specialist and request approvals.' },
      { q: 'When are performance review assessments held?', a: 'Bi-annual cycles run in June and December. Check the HR Services page for rubric templates.' }
    ]
  },
  {
    id: 'dept-claims',
    name: 'Claims Operations',
    description: 'Serving as the backbone of true client commitment. We manage claimant operations, process fraud prevention audits, investigate liability files, and authorize payout compliance.',
    lead: 'Arthur Pendelton',
    leadRole: 'VP of Claims',
    leadAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'claims.ops@metropulse-insurance.com',
    phone: 'Ext: 305',
    color: 'blue',
    icon: 'ShieldQuestion',
    quickTools: ['Claims Portal', 'Claims SOP Docs', 'Claims Investigation Hub', 'Escalation Matrix'],
    team: ['emp-101', 'emp-102'],
    faqs: [
      { q: 'What is the claims approval delegation matrix?', a: 'Analysts authorize up to $15k, Senior Analysts up to $75k, Line managers up to $250k. Greater amounts require executive VP reviews.' }
    ]
  },
  {
    id: 'dept-underwriting',
    name: 'Underwriting',
    description: 'Managing actuarial assessment paradigms, modeling customized corporate insurance pools, and reviewing specific policy terms across individual and enterprise lines.',
    lead: 'Rebecca Sterling',
    leadRole: 'Chief Commercial Underwriter',
    leadAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'underwriting.desk@metropulse-insurance.com',
    phone: 'Ext: 320',
    color: 'indigo',
    icon: 'FileSpreadsheet',
    quickTools: ['Underwriting Portal', 'Rating Guide Engine', 'Premium Calculator', 'Risk Approval Flow'],
    team: ['emp-103'],
    faqs: [
      { q: 'Where do I access the latest Underwriting Standard SOP?', a: 'Browse the Document Library or visit the Underwriting page to launch the Rating Guide Engine.' }
    ]
  },
  {
    id: 'dept-finance',
    name: 'Finance & Treasury',
    description: 'Guarding solvency ratios, executing accurate vendor payments, processing payroll sheets, facilitating strategic budgeting, and completing annual auditing reports.',
    lead: 'Amanda Lin',
    leadRole: 'Finance Director',
    leadAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'treasury@metropulse-insurance.com',
    phone: 'Ext: 104',
    color: 'amber',
    icon: 'Coins',
    quickTools: ['Payment Request Portal', 'Expense Reimburser', 'Vendor Payment Tracker', 'Solvency Reports'],
    team: ['emp-109'],
    faqs: [
      { q: 'What are the vendor invoice submission deadlines?', a: 'Vendor reconciliation requests are processed on the 10th and 25th of every month.' }
    ]
  },
  {
    id: 'dept-it',
    name: 'IT & Digital Infrastructure',
    description: 'Sustaining high-security core environments. We oversee laptop distributions, VPN setups, database firewall constraints, and system integrations.',
    lead: 'David Kojo',
    leadRole: 'Director of IT',
    leadAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'it-support@metropulse-insurance.com',
    phone: 'Ext: 999',
    color: 'violet',
    icon: 'Cpu',
    quickTools: ['System Access Portal', 'Password Reset Tool', 'MFA Management', 'Hardware Request Portal'],
    team: ['emp-104'],
    faqs: [
      { q: 'How do I set up VPN on Mac or Windows?', a: 'Download the FortiClient app via the Hardware/Software tool, and use your Azure credentials.' }
    ]
  },
  {
    id: 'dept-brand',
    name: 'Brand & Corporate Communications',
    description: 'Curating the stories that describe the company’s vision. We protect brand guidelines, release official press packs, and manage community outreach.',
    lead: 'Elena Rostova',
    leadRole: 'Lead Brand Strategist',
    leadAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'brand@metropulse-insurance.com',
    phone: 'Ext: 112',
    color: 'rose',
    icon: 'Megaphone',
    quickTools: ['Brand Asset Kit', 'Design Request Form', 'PR Templates', 'Design Assets'],
    team: ['emp-107'],
    faqs: [
      { q: 'Where are the company logos and slide templates?', a: 'Launch the Brand Asset Kit under "Tools" to download vectors, brand guides, and slide schemas.' }
    ]
  },
  {
    id: 'dept-cx',
    name: 'Customer Experience Operations',
    description: 'Translating empathy into action. We monitor corporate Net Promoter Scores (NPS), handle consumer complaints boards, and support client touchpoint enhancements.',
    lead: 'Marcus Vance',
    leadRole: 'Senior CX Director',
    leadAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'cx.feedback@metropulse-insurance.com',
    phone: 'Ext: 404',
    color: 'sky',
    icon: 'HeartHandshake',
    quickTools: ['NPS Dashboard', 'Customer Feedback Portal', 'Escalation Logs', 'Quality Matrix'],
    team: ['emp-105'],
    faqs: []
  },
  {
    id: 'dept-sales',
    name: 'Sales & Business Development',
    description: 'Expanding broker networks and consumer portfolios. We structure partner alliances, lead enterprise acquisition campaigns, and map distribution channels.',
    lead: 'Clarissa Montgomery',
    leadRole: 'VP of Sales',
    leadAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'sales-leads@metropulse-insurance.com',
    phone: 'Ext: 550',
    color: 'orange',
    icon: 'TrendingUp',
    quickTools: ['Broker Directory', 'Partner Portal', 'Sales Calculator', 'Commission Tracker'],
    team: [],
    faqs: []
  },
  {
    id: 'dept-risk',
    name: 'Risk & Compliance',
    description: 'Assuring structural integrity with legal standards and local insurance ordinances. We drive anti-money laundering schemes, risk-scoring reviews, and audits.',
    lead: 'Stuart Vance',
    leadRole: 'General Counsel & Risk Lead',
    leadAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'compliance@metropulse-insurance.com',
    phone: 'Ext: 108',
    color: 'neutral',
    icon: 'Scale',
    quickTools: ['AML Portal', 'Policy Audit Logs', 'Conflict of Interest Register'],
    team: [],
    faqs: []
  },
  {
    id: 'dept-reinsurance',
    name: 'Reinsurance Brokerage Operations',
    description: 'Placing excess liability pools with global syndicates to secure balance sheet underwriting limits.',
    lead: 'Franklin Finch',
    leadRole: 'Director of Reinsurance',
    leadAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'reinsurance@metropulse-insurance.com',
    phone: 'Ext: 350',
    color: 'teal',
    icon: 'Layers',
    quickTools: ['Treaty Planner', 'Facultative Calculator', 'Syndicate Directory'],
    team: [],
    faqs: []
  },
  {
    id: 'dept-admin',
    name: 'Admin & Facilities Management',
    description: 'Maintaining a seamless operational workspace, orchestrating logistics, organizing conference room calendars, and handling supply chains.',
    lead: 'Geoffrey Daniels',
    leadRole: 'Facilities Supervisor',
    leadAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    email: 'facilities@metropulse-insurance.com',
    phone: 'Ext: 101',
    color: 'slate',
    icon: 'Building',
    quickTools: ['Meeting Room Booking', 'Access Badge Setup', 'Corporate Fleet Admin', 'Office Supplies Order'],
    team: [],
    faqs: []
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'news-1',
    title: "Q2 Town Hall Scheduled: Managing Director's Vision & Solvency Highlights",
    category: 'Leadership Messages',
    summary: 'Join Victoria Hawthorne and the executive board for the Q2 briefing. Highlighting strategic expansion steps, claims modernization payouts, and broker portal launches.',
    body: `Dear Colleagues,

I am pleased to invite you all to our upcoming Q2 Town Hall meeting, taking place next Wednesday at 10:00 AM in the Main Amphitheater and streaming live on Microsoft Teams.

In this session, we will discuss:
1. Our outstanding financial performance and solvency ratios during the first half of the year.
2. The core launch of our AI-assisted Claims Fast-Track initiative which has already reduced processing timeline by 22%.
3. Celebrating outstanding employee accomplishments and introducing our new cohort of recruits.

Your commitment has been instrumental in Rex Insurance maintaining its status as a market driver in commercial property risk placements. I highly encourage everyone to prepare questions for our open Q&A.

Warm regards,
Victoria Hawthorne 
Managing Director`,
    date: '2026-05-26',
    author: 'Victoria Hawthorne',
    department: 'Executive Leadership Office',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400',
    featured: true,
    visibility: 'Everyone'
  },
  {
    id: 'news-2',
    title: 'New Remote Work Support and Summer Wellness Allowance Guide',
    category: 'HR Updates',
    summary: 'People & Culture has authorized a supplementary stipend for utility support and introduced customized physical wellness plans.',
    body: 'HR is pleased to announce an enhancement of our Flexible Workspace Directive. From next month, a discretionary stipend will cover home high-speed broadband fees. We have also partnered with local health clubs for heavily discounted premium memberships.',
    date: '2026-05-27',
    author: 'Thomas Mueller',
    department: 'People & Culture (HR)',
    featured: false,
    visibility: 'Everyone'
  },
  {
    id: 'news-3',
    title: 'Compulsory Cyber-Security Assessment: MFA Configuration Actions required',
    category: 'Compliance Notices',
    summary: 'All staff must verify security protocols on their office devices before June 15th to maintain backend portal authorization.',
    body: 'To conform with ISO 27001 requirements for insurance provider frameworks, the IT department is implementing automated checks on corporate devices. You must install the security patches detailed in the Documents tab.',
    date: '2026-05-25',
    author: 'David Kojo',
    department: 'IT & Digital Infrastructure',
    featured: false,
    visibility: 'Everyone'
  },
  {
    id: 'news-4',
    title: 'Claims Specialization Bootcamps 2026: Sign Ups Open Now',
    category: 'Department Announcements',
    summary: 'Claims Operations announces virtual and in-person professional development clinics led by our lead actuaries.',
    body: 'Are you looking to cross-train in motor claim investigations or complex marine liability profiles? Claims team members are organizing a three-day bootcamp starting next Monday.',
    date: '2026-05-24',
    author: 'Sarah Jenkins',
    department: 'Claims Operations',
    featured: false,
    visibility: 'Claims Operations'
  },
  {
    id: 'news-5',
    title: 'New Recruits Onboarding Portal Launched: Welcome Samuel and friends!',
    category: 'Staff News',
    summary: 'Let us extend a warm welcome to our Q2 recruits starting this week across claims and digital groups.',
    body: 'We are thrilled to welcome Samuel Adebayo (Claims Operations), alongside three other brilliant hires. Do say hello when you see them exploring the campus!',
    date: '2026-05-24',
    author: 'Thomas Mueller',
    department: 'People & Culture (HR)',
    featured: false,
    visibility: 'New Staff'
  }
];

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 'vid-1',
    title: 'Welcome Message & Company Core Values Statement',
    category: 'Leadership',
    department: 'Executive Leadership Office',
    speaker: 'Victoria Hawthorne (CEO)',
    duration: '3:45',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=225',
    completed: true,
    progressPercent: 100,
    description: 'Get motivated and understand the historical journey of Rex Insurance, our foundational core value pillars (Empathy, Integrity, Precision), and the future coordinates of digital claims scaling.',
    keyLearnings: [
      'The 15-year history of Rex Insurance',
      'The 3 Pillars: Empathy, Integrity, Precision',
      'Modern digital workflows target zero-touch claims approval.'
    ],
    relatedDocs: ['Employee Onboarding Handbook 2026', 'Rex Insurance Strategic Plan']
  },
  {
    id: 'vid-2',
    title: 'Nurturing Inclusive Culture & Diversity Policies',
    category: 'Company Culture',
    department: 'People & Culture (HR)',
    speaker: 'Thomas Mueller (HR Head)',
    duration: '5:20',
    thumbnail: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400&h=225',
    completed: true,
    progressPercent: 100,
    description: 'Learn how our diverse workforce coordinates beautiful client-centric outcomes. HR outlines remote working etiquette, zero-tolerance workspace discrimination thresholds, and staff support services program.',
    keyLearnings: [
      'Code of workspace professional relationships',
      'Flexible remote parameters',
      'Mental well-being programs'
    ],
    relatedDocs: ['HR Leave Policy & Employee Conduct Manual']
  },
  {
    id: 'vid-3',
    title: 'Introduction to Claims Processing Operations',
    category: 'Business Operations',
    department: 'Claims Operations',
    speaker: 'Arthur Pendelton (VP Claims)',
    duration: '7:40',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400&h=225',
    completed: false,
    progressPercent: 65,
    description: 'An ultimate guide to how claims process from submission up to authorization. Covers motor liability, property coverage policies, third-party adjusters coordination, and fraud audits.',
    keyLearnings: [
      'Standard Claims Intake lifecycle',
      'Evaluating liability protocols',
      'Assigning third-party adjustment partners'
    ],
    relatedDocs: ['Motor Claims Settlement SOP']
  },
  {
    id: 'vid-4',
    title: 'Underwriting Fundamentals & Credit Risk Placement',
    category: 'Business Operations',
    department: 'Underwriting',
    speaker: 'Rebecca Sterling (Underwriting Desk)',
    duration: '6:15',
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=225',
    completed: false,
    progressPercent: 0,
    description: 'Explore the risk appetite profiling, rating calculations, validation matrix thresholds, and premium structures that dictate commercial contract eligibility.',
    keyLearnings: [
      'Risk appetite profiles',
      'Pricing policy models',
      'Delegation matrices'
    ],
    relatedDocs: ['Commercial Property Underwriting Guidelines v4.1']
  },
  {
    id: 'vid-5',
    title: 'Information Security Protocols & Malware Resistance',
    category: 'HR & People',
    department: 'IT & Digital Infrastructure',
    speaker: 'David Kojo (IT Support Lead)',
    duration: '4:50',
    thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=225',
    completed: false,
    progressPercent: 0,
    description: 'A critical orientation video outlining the mitigation of phishing threats, MFA verification obligations, and password compliance standards in the cloud workspace.',
    keyLearnings: [
      'Spotting complex phishing maneuvers',
      'Protecting customer sensitive documents',
      'Accessing secure intranet database servers via VPN'
    ],
    relatedDocs: ['Information Security Policy 2026']
  },
  {
    id: 'vid-6',
    title: 'Brand Standards & Communications Excellence',
    category: 'Company Culture',
    department: 'Brand & Corporate Communications',
    speaker: 'Elena Rostova (Communications Lead)',
    duration: '5:05',
    thumbnail: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400&h=225',
    completed: false,
    progressPercent: 0,
    description: 'How to communicate the brand values externally and internally. Discover the correct color swatches, visual layout grids, typography, and PR response mechanics.',
    keyLearnings: [
      'Visual alignment guidelines',
      'Using Rex Insurance preset slide templates',
      'Submitting design assets request flows'
    ],
    relatedDocs: ['Brand Assets Guidelines v2']
  }
];

export const INITIAL_FILES: FileItem[] = [
  {
    id: 'file-1',
    title: 'Employee Onboarding Handbook 2026',
    category: 'Staff Handbook',
    department: 'People & Culture (HR)',
    lastUpdated: '2026-05-20',
    fileSize: '4.8 MB',
    fileType: 'PDF',
    downloadCount: 342,
    description: 'The master reference brochure containing organizational structure outlines, parking rules, email etiquettes, wellness allowances, holidays calendars, and contact nodes.',
    version: 'v2026.1'
  },
  {
    id: 'file-2',
    title: 'Motor Claims Settling & Intake Standards SOP',
    category: 'SOPs',
    department: 'Claims Operations',
    lastUpdated: '2026-04-12',
    fileSize: '3.2 MB',
    fileType: 'PDF',
    downloadCount: 154,
    description: 'Standard operating procedures detailing claim assessment lifecycles, claimant identity check verification parameters, and immediate payouts workflows.',
    version: 'v4.22'
  },
  {
    id: 'file-3',
    title: 'Commercial Property Underwriting Risk Rating Guidelines',
    category: 'SOPs',
    department: 'Underwriting',
    lastUpdated: '2026-05-18',
    fileSize: '5.4 MB',
    fileType: 'PDF',
    downloadCount: 98,
    description: 'The definitive reference document detailing rating tables, structural threat profiles, geographic fire risk metrics, and pricing deviation policies.',
    version: 'v3.9'
  },
  {
    id: 'file-4',
    title: 'Information Security Policy 2026',
    category: 'IT Policies',
    department: 'IT & Digital Infrastructure',
    lastUpdated: '2026-05-10',
    fileSize: '1.9 MB',
    fileType: 'PDF',
    downloadCount: 512,
    description: 'Corporate safety policies outlining information classifications, data sanitization protocols, password security standards, and GDPR compliance rules.',
    version: 'v1.1'
  },
  {
    id: 'file-5',
    title: 'Brand Assets Vector Files & Guidelines Pack',
    category: 'Brand Guidelines',
    department: 'Brand & Corporate Communications',
    lastUpdated: '2026-03-01',
    fileSize: '15.4 MB',
    fileType: 'ZIP',
    downloadCount: 220,
    description: 'Contains high-resolution Rex Insurance master logos in dark, light and monochrome styles, along with standard PPT letterheads and fonts.',
    version: 'v2.0'
  },
  {
    id: 'file-6',
    title: 'Corporate Travel and Expense Reimbursement Form',
    category: 'Forms',
    department: 'Finance & Treasury',
    lastUpdated: '2026-01-15',
    fileSize: '240 KB',
    fileType: 'XLSX',
    downloadCount: 651,
    description: 'Use this spreadsheet to catalog expenses, calculate travel per-diem claims, attach physical receipts, and submit to Treasury for reconciliation.',
    version: 'v1.4'
  },
  {
    id: 'file-7',
    title: 'Anti-Money Laundering (AML) Compliance Checklist',
    category: 'Compliance',
    department: 'Risk & Compliance',
    lastUpdated: '2026-05-22',
    fileSize: '1.2 MB',
    fileType: 'PDF',
    downloadCount: 184,
    description: 'Important legal validation parameters required during customer pool setup to satisfy government financial standard audits.',
    version: 'v2.1'
  }
];

export const EMPLOYEES: Employee[] = [
  {
    id: 'emp-101',
    name: 'Samuel Adebayo',
    role: 'Junior Claims Analyst',
    department: 'Claims Operations',
    email: 'samuel.adebayo@metropulse-insurance.com',
    phone: 'Ext: 312',
    location: 'Lagos Main Campus, Block C',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    manager: 'Arthur Pendelton',
    bio: 'Joined the company this May. Driven to optimize claimant fast-tracking algorithms while learning core underwriting assessment portfolios.',
    skills: ['Communication', 'Analysis', 'Insurance Logic'],
    expertise: ['Risk Assessment', 'Client Relations'],
    languages: ['English', 'French', 'Yoruba'],
    projects: ['Claims Automation System', 'Q3 Risk Analysis'],
    training: ['Advanced AML Compliance', 'Data Privacy Fundamentals'],
    certificates: ['Certified Risk Manager (CRM)', 'Agile Practitioner'],
    interests: ['Photography', 'Tennis', 'Behavioral Economics'],
    awards: ['Employee of the Month (Feb 2026)'],
    emergencyContact: { name: 'Rebecca Jenkins', relation: 'Spouse', phone: '080-555-0199' }
  },
  {
    id: 'emp-102',
    name: 'Sarah Jenkins',
    role: 'Senior Claims Specialist / Onboarding Buddy',
    department: 'Claims Operations',
    email: 'sarah.jenkins@metropulse-insurance.com',
    phone: 'Ext: 309',
    location: 'Lagos Main Campus, Block C',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    manager: 'Arthur Pendelton',
    bio: 'Dedicated claims investigator with over 5 years of tenure. Onboarding Buddy supporting Samuel Adebayo’s learning track.',
    skills: ['Communication', 'Analysis', 'Insurance Logic'],
    expertise: ['Risk Assessment', 'Client Relations']
  },
  {
    id: 'emp-201',
    name: 'Arthur Pendelton',
    role: 'VP of Claims',
    department: 'Claims Operations',
    email: 'arthur.pendelton@metropulse-insurance.com',
    phone: 'Ext: 300',
    location: 'Lagos Main Campus, Block C Executive',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    manager: 'Victoria Hawthorne',
    bio: 'Oversees all claims operations across motor, property, and general liability portfolios.',
    skills: ['Leadership', 'Strategic Planning', 'Risk Mitigation'],
    expertise: ['Claims Management', 'Executive Leadership']
  },
  {
    id: 'emp-202',
    name: 'John Davis',
    role: 'Motor Claims Assessor',
    department: 'Claims Operations',
    email: 'john.davis@metropulse-insurance.com',
    phone: 'Ext: 314',
    location: 'Lagos Main Campus, Block C',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    manager: 'Arthur Pendelton',
    bio: 'Specialist in motor vehicle accident assessments and third-party property damage negotiations.',
    skills: ['Automotive Appraisal', 'Negotiation', 'Conflict Resolution'],
    expertise: ['Motor Insurance', 'Fraud Detection']
  },
  {
    id: 'emp-203',
    name: 'Chloe Chen',
    role: 'Fire & Property Loss Adjuster',
    department: 'Claims Operations',
    email: 'chloe.chen@metropulse-insurance.com',
    phone: 'Ext: 315',
    location: 'Lagos Main Campus, Block C',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    manager: 'Arthur Pendelton',
    bio: 'Handles large-scale commercial property claims and fire damage assessments.',
    skills: ['Property Valuation', 'Investigation', 'Reporting'],
    expertise: ['Fire Insurance', 'Commercial Property']
  },
  {
    id: 'emp-204',
    name: 'Fatima Bello',
    role: 'Claims Auditor',
    department: 'Claims Operations',
    email: 'fatima.bello@metropulse-insurance.com',
    phone: 'Ext: 316',
    location: 'Lagos Main Campus, Block C',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&q=80&w=200&h=200',
    manager: 'Arthur Pendelton',
    bio: 'Ensures claims processing compliance with internal SLA and regulatory standards.',
    skills: ['Auditing', 'Compliance', 'Data Analysis'],
    expertise: ['Regulatory Compliance', 'Internal Audits']
  },
  {
    id: 'emp-205',
    name: 'Michael Okoro',
    role: 'Dispute Resolution Specialist',
    department: 'Claims Operations',
    email: 'michael.okoro@metropulse-insurance.com',
    phone: 'Ext: 317',
    location: 'Lagos Main Campus, Block C',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
    manager: 'Arthur Pendelton',
    bio: 'Manages complex and escalated claims disputes requiring alternative resolution or legal review.',
    skills: ['Mediation', 'Legal Analysis', 'Customer Service'],
    expertise: ['Dispute Resolution', 'Customer Retention']
  },
  {
    id: 'emp-103',
    name: 'Rebecca Sterling',
    role: 'Lead Commercial Underwriter',
    department: 'Underwriting',
    email: 'rebecca.sterling@metropulse-insurance.com',
    phone: 'Ext: 320',
    location: 'Lagos Main Campus, Block B',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    manager: 'Victoria Hawthorne',
    bio: 'Managing underwriting checklists for commercial assets. Fan of risk mitigation structures and deep compliance audits.',
    skills: ['Communication', 'Analysis', 'Insurance Logic'],
    expertise: ['Risk Assessment', 'Client Relations']
  },
  {
    id: 'emp-104',
    name: 'David Kojo',
    role: 'IT Support Supervisor & System Admin',
    department: 'IT & Digital Infrastructure',
    email: 'david.kojo@metropulse-insurance.com',
    phone: 'Ext: 999',
    location: 'IT Command Suite, Basement 1',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    manager: 'Victoria Hawthorne',
    bio: 'Solving hardware configuration bottlenecks and securing network systems. Submit tickets to me for any access/credential disruptions!',
    skills: ['Communication', 'Analysis', 'Insurance Logic'],
    expertise: ['Risk Assessment', 'Client Relations']
  },
  {
    id: 'emp-105',
    name: 'Marcus Vance',
    role: 'Senior CX Manager',
    department: 'Customer Experience Operations',
    email: 'marcus.vance@metropulse-insurance.com',
    phone: 'Ext: 404',
    location: 'Lagos Main Campus, Block A',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    manager: 'Victoria Hawthorne',
    bio: 'Passionate about translating customer complaints metrics into actionable process upgrades.',
    skills: ['Communication', 'Analysis', 'Insurance Logic'],
    expertise: ['Risk Assessment', 'Client Relations']
  },
  {
    id: 'emp-107',
    name: 'Elena Rostova',
    role: 'Communications Lead',
    department: 'Brand & Corporate Communications',
    email: 'elena.rostova@metropulse-insurance.com',
    phone: 'Ext: 112',
    location: 'Creative Hub, Penthouse Flat',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    manager: 'Victoria Hawthorne',
    bio: 'Overseeing graphic alignments and public relations. Contact me for brand asset folders or custom flyer creation support.',
    skills: ['Communication', 'Analysis', 'Insurance Logic'],
    expertise: ['Risk Assessment', 'Client Relations']
  },
  {
    id: 'emp-108',
    name: 'Thomas Mueller',
    role: 'Head of Recruitment & Onboarding',
    department: 'People & Culture (HR)',
    email: 'thomas.mueller@metropulse-insurance.com',
    phone: 'Ext: 201',
    location: 'Lagos Main Campus, Block A',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
    manager: 'Victoria Hawthorne',
    bio: 'Welcoming talent, structuring professional health policies, and guiding onboarding journeys across the enterprise.',
    skills: ['Communication', 'Analysis', 'Insurance Logic'],
    expertise: ['Risk Assessment', 'Client Relations']
  },
  {
    id: 'emp-109',
    name: 'Amanda Lin',
    role: 'Senior Financial Controlling Analyst',
    department: 'Finance & Treasury',
    email: 'amanda.lin@metropulse-insurance.com',
    phone: 'Ext: 104',
    location: 'Business Advisory Wing, Block A',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200',
    manager: 'Victoria Hawthorne',
    bio: 'Budget tracker, reimbursement auditor, and absolute excel formula champion.',
    skills: ['Communication', 'Analysis', 'Insurance Logic'],
    expertise: ['Risk Assessment', 'Client Relations']
  }
];

export const INITIAL_REQUESTS: RequestItem[] = [
  {
    id: 'REQ-1001',
    title: 'Onboarding Welcome Packs & Branded Items for June Cohort',
    requestingDept: 'People & Culture (HR)',
    receivingDept: 'Brand & Corporate Communications',
    requestType: 'Company Resource',
    requestedBy: 'Thomas Mueller',
    requesterEmail: 'thomas.mueller@metropulse-insurance.com',
    priority: 'High',
    dueDate: '2026-06-05',
    status: 'Pending Review',
    lastUpdated: '2026-05-28',
    description: 'We need to arrange 8 brand kits including customized heavy-weave notebook, metal water bottle, and canvas tote bags for the incoming trainees arriving on June 5th.',
    attachments: ['RecruitsBadgeList.csv'],
    approver: 'Elena Rostova',
    comments: [
      {
        id: 'c-1',
        author: 'Elena Rostova',
        authorRole: 'Brand Lead',
        content: 'We currently have notebook templates in the workspace. However, the water bottle orders require 3 working days from suppliers.',
        timestamp: '2026-05-28 10:14 AM'
      }
    ],
    history: [
      { action: 'Request Submitted', user: 'Thomas Mueller', timestamp: '2026-05-28 09:00 AM' }
    ]
  },
  {
    id: 'REQ-1002',
    title: 'Claims Database SQL Server Access Profile Creation',
    requestingDept: 'Claims Operations',
    receivingDept: 'IT & Digital Infrastructure',
    requestType: 'System access request',
    requestedBy: 'Samuel Adebayo',
    requesterEmail: 'samuel.adebayo@metropulse-insurance.com',
    priority: 'Medium',
    dueDate: '2026-05-30',
    status: 'In Progress',
    lastUpdated: '2026-05-28',
    description: 'Need configuration of read-write SQL credentials for claims operations to complete motor liability data modeling exercises. Standard claims analyst role profiles apply.',
    attachments: [],
    assignedOwner: 'David Kojo',
    comments: [
      {
        id: 'c-2',
        author: 'David Kojo',
        authorRole: 'IT Support Supervisor',
        content: 'Active profiling is created. I have assigned this to myself and am waiting for line manager verification approval.',
        timestamp: '2026-05-28 11:30 AM'
      }
    ],
    history: [
      { action: 'Request Created', user: 'Samuel Adebayo', timestamp: '2026-05-27 02:40 PM' },
      { action: 'Assigned to David Kojo', user: 'David Kojo', timestamp: '2026-05-28 11:00 AM' }
    ]
  },
  {
    id: 'REQ-1003',
    title: 'Budget Allocation Sign-off for Brand Campaign Flyers',
    requestingDept: 'Brand & Corporate Communications',
    receivingDept: 'Finance & Treasury',
    requestType: 'Company Resource',
    requestedBy: 'Elena Rostova',
    requesterEmail: 'elena.rostova@metropulse-insurance.com',
    priority: 'Medium',
    dueDate: '2026-06-01',
    status: 'Completed',
    lastUpdated: '2026-05-27',
    description: 'Seeking reimbursement authorization for hiring local printing company to build 500 gloss flyers for our new Motor Insurance Package rollout.',
    attachments: ['PrintingInvoice.docx'],
    comments: [],
    history: [
      { action: 'Created', user: 'Elena Rostova', timestamp: '2026-05-25 08:30 AM' },
      { action: 'Marked Completed', user: 'Amanda Lin', timestamp: '2026-05-27 03:00 PM' }
    ]
  },
  {
    id: 'REQ-1004',
    title: 'Faulty Monitor Screen Replacement at Deck 32',
    requestingDept: 'Underwriting',
    receivingDept: 'IT & Digital Infrastructure',
    requestType: 'Device issue',
    requestedBy: 'Rebecca Sterling',
    requesterEmail: 'rebecca.sterling@metropulse-insurance.com',
    priority: 'Low',
    dueDate: '2026-06-10',
    status: 'Submitted',
    lastUpdated: '2026-05-28',
    description: 'The horizontal aspect display flickers intermittently when utilizing dynamic spreadsheet scales. Standard HDMI cable replace already tested and failed.',
    attachments: [],
    comments: [],
    history: [
      { action: 'Request Submitted', user: 'Rebecca Sterling', timestamp: '2026-05-28 01:10 PM' }
    ]
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    title: 'MD’s Q2 Business Review Town Hall Address',
    category: 'Town Hall',
    date: '2026-06-03',
    time: '10:00 AM - 11:30 AM',
    location: 'Main Amphitheater & MS Teams',
    description: 'Leadership update outlining H1 performance milestones, underwriting compliance parameters and claims fast-tracking innovations.',
    organizer: 'Victoria Hawthorne'
  },
  {
    id: 'ev-2',
    title: 'Claims Investigation Advanced Fraud Auditing Seminar',
    category: 'Training',
    date: '2026-06-08',
    time: '2:00 PM - 4:00 PM',
    location: 'Virtual Zoom Room 3',
    description: 'Deep dive training regarding state liability rules and motor policy discrepancy indexing schemas.',
    organizer: 'Sarah Jenkins'
  },
  {
    id: 'ev-3',
    title: 'June Recruits Welcome Cohort Cocktail Hour',
    category: 'Social',
    date: '2026-06-05',
    time: '4:30 PM - 6:00 PM',
    location: 'Creative Hub Rooftop Lounge',
    description: 'An informal opportunity to meet incoming personnel joining claims, underwriting and branding teams.',
    organizer: 'Thomas Mueller'
  },
  {
    id: 'ev-4',
    title: 'Annual AML Certification Compliance Training',
    category: 'Training',
    date: '2026-06-12',
    time: '11:00 AM - 12:30 PM',
    location: 'Training Hall B & Teams',
    description: 'Regulatory audit workflows necessary to comply with modern insurance and financial underwriting policy laws.',
    organizer: 'Stuart Vance'
  }
];

export const INITIAL_ONBOARDING: OnboardingTask[] = [
  {
    id: 'task-1',
    title: 'Watch MD Welcome Video & Vision Statement',
    status: 'Completed',
    dueDate: '2026-05-26',
    description: 'Acquaint yourself with Victoria Hawthorne’s core corporate vision presentation.',
    ctaText: 'Go to Video',
    ctaTarget: 'vid-1'
  },
  {
    id: 'task-2',
    title: 'Read Employee Handbook 2026',
    status: 'In Progress',
    dueDate: '2026-05-28',
    description: 'Browse through organizational frameworks, parking rules, email codes of conduct, and support points.',
    ctaText: 'Get Document',
    ctaTarget: 'file-1'
  },
  {
    id: 'task-3',
    title: 'Watch HR Orientation Acculturation video',
    status: 'Completed',
    dueDate: '2026-05-27',
    description: 'Study our core remote and in-office schedules, wellness budgets, and reporting structures.',
    ctaText: 'Watch Video',
    ctaTarget: 'vid-2'
  },
  {
    id: 'task-4',
    title: 'Watch Claims Department Overview Video',
    status: 'In Progress',
    dueDate: '2026-05-29',
    description: 'Essential review showing customer intake loops, liability rules, and payment checkmarks.',
    ctaText: 'Watch Video',
    ctaTarget: 'vid-3'
  },
  {
    id: 'task-5',
    title: 'Request Developer SQL and System Access Profile',
    status: 'In Progress',
    dueDate: '2026-05-30',
    description: 'Submit an active token assignment request in the Request Centre to unlock internal claims database.',
    ctaText: 'Create Access Request',
    ctaTarget: 'REQ-1002'
  },
  {
    id: 'task-6',
    title: 'Schedule First Week Feedback with Buddy',
    status: 'Not Started',
    dueDate: '2026-06-01',
    description: 'Meet up with Sarah Jenkins inside the workspace to review operational hurdles and check progress tools.',
    ctaText: 'Contact Buddy',
    ctaTarget: 'emp-102'
  }
];

// Helper functions for LocalStorage management
export const MILESTONES: Milestone[] = [
  {
    id: 'milestone-1',
    employeeId: 'emp-103',
    employeeName: 'Rebecca Sterling',
    employeeAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
    type: 'Promotion',
    message: 'Promoted to Lead Commercial Underwriter! Incredible work expanding our commercial portfolio over the last year.',
    date: '2026-07-20',
    reactions: { '🎉': 24, '👏': 15, '❤️': 8 }
  },
  {
    id: 'milestone-2',
    employeeId: 'emp-105',
    employeeName: 'Marcus Vance',
    employeeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    type: 'Work Anniversary',
    message: 'Celebrating 4 years at Rex Insurance! Marcus has revolutionized our Customer Experience department.',
    date: '2026-07-15',
    reactions: { '🎉': 32, '🎂': 12, '🔥': 5 }
  },
  {
    id: 'milestone-3',
    employeeId: 'emp-107',
    employeeName: 'Elena Rostova',
    employeeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    type: 'Certification Earned',
    message: 'Completed the Advanced Corporate Communications Certification from CIPR. Fantastic dedication to professional development!',
    date: '2026-07-10',
    reactions: { '🎓': 18, '👏': 22, '💡': 4 }
  },
  {
    id: 'milestone-4',
    employeeId: 'emp-100',
    employeeName: 'Victoria Hawthorne',
    employeeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    type: 'Work Anniversary',
    message: 'Celebrating 11 incredible years leading Rex Insurance. Thank you for your continued visionary leadership!',
    date: '2026-06-25',
    reactions: { '🎉': 85, '👑': 12, '❤️': 45 }
  }
];

export const loadFromStorageOrFallback = <T>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(`insurhub_${key}`);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    console.error('Error loading state from localStorage:', e);
    return fallback;
  }
};

export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(`insurhub_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving state to localStorage:', e);
  }
};

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'kb-1',
    title: 'How to Apply for Leave',
    category: 'HR Policies',
    excerpt: 'Step-by-step guide to requesting annual, sick, or maternity/paternity leave in Kissflow.',
    content: 'All leave applications must be filed via Kissflow...',
    author: 'Elena Rostova',
    lastUpdated: '2026-01-15',
    views: 1245,
    tags: ['leave', 'HR', 'kissflow', 'absence']
  },
  {
    id: 'kb-2',
    title: 'Travel Policy',
    category: 'Corporate Policies',
    excerpt: 'Guidelines for booking flights, hotels, and claiming expenses for business travel.',
    content: 'Business travel must be approved by your Line Manager...',
    author: 'Finance Team',
    lastUpdated: '2026-03-22',
    views: 890,
    tags: ['travel', 'expenses', 'finance']
  },
  {
    id: 'kb-3',
    title: 'Claims Standard Operating Procedure (SOP)',
    category: 'SOPs',
    excerpt: 'Core procedure for evaluating and approving auto and commercial liability claims.',
    content: 'The claims process begins when a client submits a First Notice of Loss...',
    author: 'Arthur Pendelton',
    lastUpdated: '2026-05-10',
    views: 3410,
    tags: ['claims', 'sop', 'operations']
  },
  {
    id: 'kb-4',
    title: 'Sales Process Overview',
    category: 'Process Guides',
    excerpt: 'The unified 5-step sales process for acquiring and onboarding new B2B accounts.',
    content: '1. Lead Qualification\\n2. Discovery Call\\n3. Proposal... ',
    author: 'Marcus Oje',
    lastUpdated: '2026-02-11',
    views: 2150,
    tags: ['sales', 'B2B', 'process']
  },
  {
    id: 'kb-5',
    title: 'Brand Assets & Usage Guide',
    category: 'Brand Assets',
    excerpt: 'Downloadable logos, letterheads, and guidelines for external communications.',
    content: 'Always use the vectorized SVG logo for high-resolution prints...',
    author: 'Creative Team',
    lastUpdated: '2026-06-01',
    views: 450,
    tags: ['brand', 'logo', 'marketing']
  },
  {
    id: 'kb-6',
    title: 'Insurance Products Portfolio',
    category: 'Products',
    excerpt: 'Detailed breakdowns of all active personal and commercial insurance policies offered.',
    content: 'Rex Insurance currently underwrites the following main lines...',
    author: 'Underwriting Dept',
    lastUpdated: '2026-07-20',
    views: 5200,
    tags: ['products', 'portfolio', 'underwriting']
  },
  {
    id: 'kb-7',
    title: 'General Office FAQs',
    category: 'FAQs',
    excerpt: 'Frequently asked questions regarding parking, cafeteria, dress code, and building access.',
    content: 'Q: What time does the cafeteria open? A: 7:30 AM...',
    author: 'HR Dept',
    lastUpdated: '2026-08-01',
    views: 1800,
    tags: ['faq', 'office', 'parking']
  }
];
