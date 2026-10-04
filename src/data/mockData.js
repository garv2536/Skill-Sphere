export const INITIAL_GIGS = [
  {
    id: 'gig-101',
    title: 'Migrate SaaS Dashboard from Next.js Pages to App Router & Supabase Auth',
    category: 'Web Development',
    subcategory: 'Full-Stack Engineering',
    budget: { min: 45000, max: 70000, type: 'fixed' },
    deadline: '2026-06-25',
    experienceLevel: 'Senior',
    projectScope: 'Medium (2-4 weeks)',
    location: 'Bengaluru (Remote OK)',
    isRemote: true,
    skills: ['Next.js 14', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PostgreSQL'],
    proposalsCount: 6,
    featured: true,
    client: {
      name: 'Karthik Raman',
      company: 'OrbitPay Technologies',
      rating: 4.9,
      totalSpent: '₹4.8 Lakhs',
      hires: 14,
      location: 'Bengaluru, Karnataka',
      paymentVerified: true,
      memberSince: 'Mar 2024'
    },
    description: `We are refactoring our B2B fintech analytics dashboard from Next.js 12 (pages router) to Next.js 14 App Router with React Server Components. The app currently uses legacy auth which needs to be replaced with Supabase Auth (SSO + MFA).

Key Deliverables:
- Clean migration of 14 core dashboard views to Server/Client components.
- Implement Supabase Auth with Row-Level Security (RLS) policies.
- Optimize bundle size and achieve Lighthouse score > 90.
- Unit tests for critical payment query hooks using Vitest.

Requirements:
- Strong experience with Next.js 13/14 App router paradigms (Server Actions, Parallel routes).
- Prior experience with Supabase and Postgres RLS policies is mandatory.`,
    postedAt: '3 hours ago'
  },
  {
    id: 'gig-102',
    title: 'Figma UI/UX Redesign for Quick-Commerce Delivery Rider App',
    category: 'UI/UX Design',
    subcategory: 'Mobile App Design',
    budget: { min: 30000, max: 50000, type: 'fixed' },
    deadline: '2026-06-18',
    experienceLevel: 'Intermediate',
    projectScope: 'Small (< 2 weeks)',
    location: 'Gurgaon, NCR',
    isRemote: true,
    skills: ['Figma', 'Design Systems', 'User Research', 'Mobile Prototyping', 'Hindi UI'],
    proposalsCount: 11,
    featured: true,
    client: {
      name: 'Pooja Agarwal',
      company: 'KwikKart Logistics',
      rating: 4.8,
      totalSpent: '₹8.2 Lakhs',
      hires: 22,
      location: 'Gurgaon, Haryana',
      paymentVerified: true,
      memberSince: 'Jan 2023'
    },
    description: `Our 10-minute delivery rider app needs a ground-up redesign focusing on extreme usability under harsh outdoor sunlight and one-handed thumb navigation. 

Scope of Work:
- Conduct quick user interviews with 4-5 delivery partners in NCR.
- Create 18 mobile screens (Order alert, Turn-by-turn navigation overlay, OTP proof of delivery, Daily earnings ledger).
- Build interactive micro-prototypes in Figma with haptic cues.
- Support both English and vernacular Hindi typography hierarchy.`,
    postedAt: '5 hours ago'
  },
  {
    id: 'gig-103',
    title: 'Fine-tune Llama 3 8B on Indian Legal & GST Compliance Documents',
    category: 'AI & Data Science',
    subcategory: 'LLMs & Machine Learning',
    budget: { min: 80000, max: 140000, type: 'fixed' },
    deadline: '2026-07-10',
    experienceLevel: 'Expert',
    projectScope: 'Large (1-2 months)',
    location: 'Mumbai, Maharashtra',
    isRemote: true,
    skills: ['PyTorch', 'Hugging Face', 'LoRA / QLoRA', 'LangChain', 'FastAPI', 'Vector DB'],
    proposalsCount: 4,
    featured: false,
    client: {
      name: 'Adv. Suresh Mehta',
      company: 'NyayaAI Labs',
      rating: 5.0,
      totalSpent: '₹12.5 Lakhs',
      hires: 8,
      location: 'Mumbai, Maharashtra',
      paymentVerified: true,
      memberSince: 'Nov 2023'
    },
    description: `We are building an AI co-pilot for Indian chartered accountants and advocates. We require an applied ML specialist to fine-tune Llama-3 8B Instruct using QLoRA on a curated corpus of GST rulings and ITAT case laws.

Deliverables:
- Data pre-processing pipeline for Indian GST tribunal PDF judgements.
- LoRA fine-tuning script with wandb evaluation metrics.
- Deploy an inference endpoint on AWS EC2 (g5.2xlarge) via vLLM and FastAPI.
- Benchmark accuracy against baseline GPT-4o on our validation benchmark.`,
    postedAt: '1 day ago'
  },
  {
    id: 'gig-104',
    title: 'Cross-Platform React Native App for IoT Smart Energy Meters',
    category: 'Mobile Apps',
    subcategory: 'React Native / Bluetooth',
    budget: { min: 60000, max: 95000, type: 'fixed' },
    deadline: '2026-07-02',
    experienceLevel: 'Senior',
    projectScope: 'Medium (1 month)',
    location: 'Pune, Maharashtra',
    isRemote: true,
    skills: ['React Native', 'BLE (Bluetooth)', 'Zustand', 'ChartKit', 'iOS / Android'],
    proposalsCount: 8,
    featured: false,
    client: {
      name: 'Rohan Deshmukh',
      company: 'UrjaGrid Systems',
      rating: 4.7,
      totalSpent: '₹3.1 Lakhs',
      hires: 6,
      location: 'Pune, Maharashtra',
      paymentVerified: true,
      memberSince: 'Aug 2024'
    },
    description: `UrjaGrid is looking for an experienced React Native engineer to build our commercial solar & smart meter companion app. The app communicates directly with ESP32 hardware over Bluetooth Low Energy (BLE) and syncs telemetry to AWS IoT Core.

Responsibilities:
- Build reliable BLE connection handling with automatic reconnection logic.
- Real-time voltage & power factor telemetry graphs rendering at 60fps.
- Native background sync for time-of-day tariff calculations.`,
    postedAt: '1 day ago'
  },
  {
    id: 'gig-105',
    title: 'Technical B2B SEO & Content Engine for Developer Tooling Startup',
    category: 'Content & Growth',
    subcategory: 'Technical Writing & SEO',
    budget: { min: 25000, max: 40000, type: 'fixed' },
    deadline: '2026-06-20',
    experienceLevel: 'Intermediate',
    projectScope: 'Ongoing Retainer',
    location: 'Hyderabad, Telangana',
    isRemote: true,
    skills: ['Technical SEO', 'Developer Marketing', 'Ahrefs', 'Kubernetes / DevOps', 'Ghost CMS'],
    proposalsCount: 14,
    featured: false,
    client: {
      name: 'Divya Nambiar',
      company: 'ScaleOps.io',
      rating: 4.9,
      totalSpent: '₹6.4 Lakhs',
      hires: 18,
      location: 'Hyderabad, Telangana',
      paymentVerified: true,
      memberSince: 'May 2023'
    },
    description: `We are scaling organic developer acquisition for our Kubernetes log streaming platform. Looking for a developer-turned-writer or technical marketer who can craft high-intent architectural tutorials.

Deliverables:
- 4 in-depth articles per month (~2,200 words each with runnable code samples).
- Keyword research and cluster mapping targeting 'vector database vs elasticsearch', 'ebpf monitoring guide'.
- On-page technical SEO optimization and distribution on Hacker News & Reddit.`,
    postedAt: '2 days ago'
  },
  {
    id: 'gig-106',
    title: 'Custom Shopify Plus Theme & WhatsApp Checkout Integration',
    category: 'Web Development',
    subcategory: 'E-commerce & Liquid',
    budget: { min: 35000, max: 55000, type: 'fixed' },
    deadline: '2026-06-22',
    experienceLevel: 'Intermediate',
    projectScope: 'Small (< 2 weeks)',
    location: 'Jaipur, Rajasthan',
    isRemote: true,
    skills: ['Shopify Liquid', 'JavaScript', 'WhatsApp Cloud API', 'Tailwind', 'Klaviyo'],
    proposalsCount: 9,
    featured: false,
    client: {
      name: 'Aditya Shekhawat',
      company: 'RoyalMarwar Decor',
      rating: 4.6,
      totalSpent: '₹1.9 Lakhs',
      hires: 5,
      location: 'Jaipur, Rajasthan',
      paymentVerified: true,
      memberSince: 'Feb 2025'
    },
    description: `We run a D2C handicraft brand and need our Shopify store overhauled. We require custom section blocks, quick-buy drawer, and an automated 1-click WhatsApp order confirmation flow using WhatsApp Business Cloud API.`,
    postedAt: '2 days ago'
  }
];

export const INITIAL_FREELANCERS = [
  {
    id: 'fl-201',
    name: 'Aarav Nair',
    headline: 'Senior Full-Stack Architect · Next.js, Node & Distributed Systems',
    location: 'Bengaluru, India',
    isRemote: true,
    hourlyRate: 2400,
    rating: 4.95,
    reviewsCount: 54,
    completedProjects: 72,
    badge: 'Top Rated Plus',
    verified: true,
    availability: 'Available (20 hrs/wk)',
    responseTime: '< 1 hour',
    bio: 'Ex-Lead Engineer at Razorpay & early engineer at a YC-backed logistics startup. I help founders build resilient full-stack applications from day 0 to scale. Specialise in TypeScript, Next.js, GraphQL, PostgreSQL, and AWS.',
    skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    avatarInitials: 'AN',
    avatarBg: 'bg-indigo-600',
    experienceYears: 7,
    portfolio: [
      { title: 'FinFlow Merchant Portal', tag: 'Fintech', link: '#' },
      { title: 'DocuSync Realtime Workspace', tag: 'SaaS', link: '#' },
      { title: 'HyperRoute Logistics Engine', tag: 'Logistics', link: '#' }
    ],
    reviews: [
      {
        author: 'Karthik Raman',
        company: 'OrbitPay',
        rating: 5,
        date: 'May 2026',
        comment: 'Aarav is an absolute rockstar. Migrated our core transaction engine ahead of deadline with zero downtime. Will definitely hire again.'
      },
      {
        author: 'Vikram Sethi',
        company: 'NeoStack',
        rating: 5,
        date: 'Apr 2026',
        comment: 'Super proactive communication and rock-solid code quality. Saved our team at least 3 weeks of architectural confusion.'
      }
    ]
  },
  {
    id: 'fl-202',
    name: 'Tanvi Kulkarni',
    headline: 'Product Designer (UI/UX) · Design Systems & SaaS Products',
    location: 'Pune, India',
    isRemote: true,
    hourlyRate: 1800,
    rating: 4.92,
    reviewsCount: 41,
    completedProjects: 58,
    badge: 'Top Rated',
    verified: true,
    availability: 'Available for Projects',
    responseTime: '< 2 hours',
    bio: 'Product designer with 5+ years crafting high-converting web apps and intuitive mobile experiences. I bridge the gap between user delight and business metrics. Proficient in Figma, design systems, and rapid interactive prototyping.',
    skills: ['Figma', 'Design Systems', 'UI/UX Design', 'User Research', 'Wireframing', 'Prototyping'],
    avatarInitials: 'TK',
    avatarBg: 'bg-purple-600',
    experienceYears: 5,
    portfolio: [
      { title: 'HealthPulse Patient EHR App', tag: 'HealthTech', link: '#' },
      { title: 'VaultPay Crypto Wallet UI', tag: 'Web3 / Fintech', link: '#' },
      { title: 'Kavach Security Dashboard', tag: 'B2B SaaS', link: '#' }
    ],
    reviews: [
      {
        author: 'Pooja Agarwal',
        company: 'KwikKart',
        rating: 5,
        date: 'May 2026',
        comment: 'Tanvi transformed our cluttered driver interface into an intuitive work of art. Our driver drop-off time dropped by 28%!'
      }
    ]
  },
  {
    id: 'fl-203',
    name: 'Siddharth Varma',
    headline: 'AI & ML Engineer · LLM Fine-Tuning, RAG Pipelines & CV',
    location: 'Hyderabad, India',
    isRemote: true,
    hourlyRate: 3200,
    rating: 4.88,
    reviewsCount: 31,
    completedProjects: 39,
    badge: 'Top Rated',
    verified: true,
    availability: 'Busy (Next slot: July)',
    responseTime: '< 4 hours',
    bio: 'IIT Madras alumnus focusing on Applied Generative AI. Built production RAG systems processing millions of legal and financial documents. Specialising in LoRA/QLoRA, vLLM, LangChain, Vector databases, and low-latency inference.',
    skills: ['Python', 'PyTorch', 'LLMs', 'RAG', 'LangChain', 'FastAPI', 'Qdrant', 'Hugging Face'],
    avatarInitials: 'SV',
    avatarBg: 'bg-emerald-600',
    experienceYears: 6,
    portfolio: [
      { title: 'NyayaBot Legal RAG Copilot', tag: 'GenAI', link: '#' },
      { title: 'RetailVision Edge Defect Detection', tag: 'Computer Vision', link: '#' }
    ],
    reviews: [
      {
        author: 'Adv. Suresh Mehta',
        company: 'NyayaAI Labs',
        rating: 5,
        date: 'Apr 2026',
        comment: 'Siddharth understands LLM fine-tuning deeply. His evaluation methodology is thorough and rigorous.'
      }
    ]
  },
  {
    id: 'fl-204',
    name: 'Meghna Roy',
    headline: 'Cross-Platform Mobile Engineer · Flutter & React Native',
    location: 'Kolkata, India',
    isRemote: true,
    hourlyRate: 1950,
    rating: 4.89,
    reviewsCount: 49,
    completedProjects: 63,
    badge: 'Top Rated',
    verified: true,
    availability: 'Available (Full-time)',
    responseTime: '< 30 mins',
    bio: 'Mobile specialist with 6 apps published on the App Store & Google Play. Obsessed with 60fps animations, seamless offline persistence, and battery-friendly background services. Strong background in Firebase, SQLite & BLE.',
    skills: ['Flutter', 'React Native', 'Dart', 'Firebase', 'State Management', 'REST / GraphQL', 'BLE'],
    avatarInitials: 'MR',
    avatarBg: 'bg-rose-600',
    experienceYears: 5,
    portfolio: [
      { title: 'Aura Meditation Audio App', tag: 'Consumer App', link: '#' },
      { title: 'FleetTrack Delivery Partner App', tag: 'Logistics', link: '#' }
    ],
    reviews: [
      {
        author: 'Rohan Deshmukh',
        company: 'UrjaGrid',
        rating: 5,
        date: 'Mar 2026',
        comment: 'Meghna wrote some of the cleanest BLE state machines we have ever seen. Highly recommended for mobile hardware apps.'
      }
    ]
  },
  {
    id: 'fl-205',
    name: 'Kabir Sengupta',
    headline: 'DevOps & Cloud Infrastructure Engineer · AWS, K8s & Terraform',
    location: 'Noida, NCR',
    isRemote: true,
    hourlyRate: 2800,
    rating: 4.82,
    reviewsCount: 26,
    completedProjects: 34,
    badge: 'Verified Specialist',
    verified: true,
    availability: 'Available (15 hrs/wk)',
    responseTime: '< 2 hours',
    bio: 'AWS Certified Solutions Architect with 8 years in high-traffic infrastructure. Specialized in zero-downtime CI/CD pipelines, Kubernetes cluster hardening, cost reduction (average 35% AWS bill cuts), and SOC2 compliance automation.',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub Actions', 'Prometheus', 'Docker'],
    avatarInitials: 'KS',
    avatarBg: 'bg-slate-700',
    experienceYears: 8,
    portfolio: [
      { title: 'Auto-scaling EKS Multi-region Cluster', tag: 'DevOps', link: '#' },
      { title: 'Fintech SOC2 Infra As Code', tag: 'Security', link: '#' }
    ],
    reviews: [
      {
        author: 'Gaurav Jain',
        company: 'QuickPay',
        rating: 5,
        date: 'Feb 2026',
        comment: 'Kabir brought down our AWS monthly bill from $8,400 to $5,100 without degrading single-node throughput.'
      }
    ]
  },
  {
    id: 'fl-206',
    name: 'Nisha Sundaram',
    headline: 'Technical Content Strategist & Developer Advocate',
    location: 'Chennai, India',
    isRemote: true,
    hourlyRate: 1400,
    rating: 4.96,
    reviewsCount: 38,
    completedProjects: 51,
    badge: 'Top Rated',
    verified: true,
    availability: 'Available for Retainers',
    responseTime: '< 1 hour',
    bio: 'Former developer who writes articles that developers actually read. Helping B2B SaaS and developer-tool companies build organic search moats. Work featured on Hacker News frontpage, Smashing Magazine, and FreeCodeCamp.',
    skills: ['Technical Writing', 'Developer Relations', 'SEO Strategy', 'Content Clustering', 'TypeScript / Python'],
    avatarInitials: 'NS',
    avatarBg: 'bg-teal-600',
    experienceYears: 4,
    portfolio: [
      { title: 'Complete Guide to Zero-Knowledge Proofs', tag: 'Deep Tech', link: '#' },
      { title: 'Building Event-Driven Microservices in Go', tag: 'Architecture', link: '#' }
    ],
    reviews: [
      {
        author: 'Divya Nambiar',
        company: 'ScaleOps.io',
        rating: 5,
        date: 'May 2026',
        comment: 'Nisha’s technical articles rank on Page 1 of Google for 8 of our highest intent keywords. Incredible return on investment.'
      }
    ]
  }
];

export const CATEGORIES_LIST = [
  { id: 'web', name: 'Web Development', count: '480+ gigs', iconName: 'Code', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'design', name: 'UI/UX Design', count: '310+ gigs', iconName: 'Palette', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'ai', name: 'AI & Data Science', count: '190+ gigs', iconName: 'Cpu', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'mobile', name: 'Mobile Apps', count: '240+ gigs', iconName: 'Smartphone', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'devops', name: 'Cloud & DevOps', count: '130+ gigs', iconName: 'Server', color: 'bg-slate-100 text-slate-700 border-slate-300' },
  { id: 'content', name: 'Content & Growth', count: '175+ gigs', iconName: 'PenTool', color: 'bg-rose-50 text-rose-700 border-rose-200' }
];

export const HOW_IT_WORKS_STEPS = {
  client: [
    {
      step: '01',
      title: 'Post your project scope',
      desc: 'Define your technical requirements, budget, deliverables, and timeline in under 2 minutes.'
    },
    {
      step: '02',
      title: 'Review verified talent',
      desc: 'Receive tailored proposals from vetted engineers and designers with transparent pricing and past reviews.'
    },
    {
      step: '03',
      title: 'Fund milestones safely',
      desc: 'Deposit milestone funds into escrow. Release payments only when you review and approve the submitted code or designs.'
    }
  ],
  freelancer: [
    {
      step: '01',
      title: 'Create your portfolio',
      desc: 'Highlight your tech stack, past production projects, Github/Figma proof of work, and hourly or fixed rates.'
    },
    {
      step: '02',
      title: 'Submit high-signal bids',
      desc: 'Pitch directly to verified founders and engineering managers with realistic timelines and milestone breakdowns.'
    },
    {
      step: '03',
      title: 'Guaranteed payouts',
      desc: 'Deliver work with confidence knowing milestone funds are already secured in escrow before you write the first line of code.'
    }
  ]
};
