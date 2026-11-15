// ==========================================
// EDIT YOUR PORTFOLIO CONTENT HERE
// Screenshots live in src/assets/projects/<image>.webp. Any file you drop
// there with a matching name shows up automatically.
// ==========================================

const shots = import.meta.glob("../assets/projects/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const shot = (name?: string) => (name ? shots[`../assets/projects/${name}.webp`] : undefined);

export const profile = {
  name: "Edrian Christian C. Reyes",
  firstName: "Edrian",
  lastName: "Reyes",
  role: "Full-Stack Developer",
  location: "Bulacan, Philippines",
  email: "edrianreyes.basc@gmail.com",
  phone: "+63 963 366 1334",
  phoneHref: "tel:+639633661334",
  github: "https://github.com/edwiyan",
  onlinejobs: "https://www.onlinejobs.ph/jobseekers/info/4695271",
  // One-page PDF built from resume/resume.html (see resume/README.md).
  resume: `${import.meta.env.BASE_URL}resume.pdf`,
  tagline:
    "I turn spreadsheets, paper forms and manual processes into web systems people actually use every day.",
};

export const about = {
  statement:
    "I build web systems that replace spreadsheets, paper forms and manual processes, from production systems for a government office to AI tools of my own.",
  paragraphs: [
    "Most recently I was a developer in the ICT Unit of DepEd's Schools Division of Bulacan (July to November 2026), where I built six systems for HR, supply, procurement and records and deployed three of them to production. I own projects end to end: requirements, database design, a Laravel or FastAPI back end, a React front end, and deployment with domains, SSL and DNS.",
    "I've grown a lot in the past few months. I went from front-end work in React to full-stack Laravel, PHP 8.4, TypeScript and Python, automated Microsoft 365 workflows with Power Automate, and started building with AI, both as a tool (Claude Code) and inside my products (OpenAI, PyTorch).",
  ],
  stats: [
    { value: 11, suffix: "", label: "Projects built" },
    { value: 3, suffix: "", label: "Systems live in production" },
    { value: 4, suffix: "", label: "Roles in IT and development" },
    { value: 2, suffix: "", label: "AI-powered apps" },
  ],
  education: {
    degree: "BS Information Technology",
    school: "Bulacan Agricultural State College",
    years: "2021 – 2025",
  },
};

export type Project = {
  id: string;
  title: string;
  short: string;
  description: string;
  stack: string[];
  year: string;
  status: "Live" | "Deployed on-site" | "In progress" | "Completed" | "Personal";
  url?: string;
  urlLabel?: string;
  image?: string;
  mobileImage?: string;
  /** Browser-bar text shown above the screenshot */
  frameUrl?: string;
  /** Shown instead of a link when the system is not public */
  note?: string;
};

/** Selected work: shown in the pinned horizontal gallery. A mix of government, client and personal projects. */
export const featured: Project[] = [
  {
    id: "icsms",
    title: "ICSMS / PSIR",
    short: "Property & inventory custodian slips",
    description:
      "Replaces hand-filled property forms for the supply office. It generates official ICS and PAR forms, per-item property cards and QR stickers, and lets staff do the physical count by scanning QR codes with a phone camera. Covers 31 districts and 515 schools.",
    stack: ["React 19", "Tailwind v4", "Laravel 13", "MySQL", "QR scanning", "cPanel"],
    year: "2026",
    status: "Live",
    url: "https://psir.bulacandeped.com.ph",
    urlLabel: "psir.bulacandeped.com.ph",
    image: shot("icsms"),
    frameUrl: "psir.bulacandeped.com.ph",
  },
  {
    id: "sipra",
    title: "SIPRA",
    short: "AI song-learning helper for guitarists",
    description:
      "A personal tool that separates guitar and bass from any song with AI on the GPU, slows down and loops sections without changing pitch, shows notes, chords and tabs in sync, and listens through the mic to check your playing.",
    stack: ["Python", "FastAPI", "PyTorch (CUDA)", "React", "TypeScript", "Web Audio"],
    year: "2026",
    status: "Personal",
    image: shot("sipra"),
    frameUrl: "sipra.local",
    note: "Personal project · runs locally on a GPU laptop",
  },
  {
    id: "pmis",
    title: "PMIS — HR Management System v3",
    short: "Appointment tracking from signing to salary",
    description:
      "Rebuilds HR's VBA/Excel appointment tracker as a web system. Each appointment moves through a tested seven-stage workflow, from signing to release to salary, with email alerts, overdue reminders, school and payroll accounts, and a dashboard for top management.",
    stack: ["Laravel 13", "Inertia", "React 19", "TypeScript", "shadcn/ui", "MySQL", "Resend"],
    year: "2026",
    status: "Live",
    url: "https://pmis.bulacandeped.com.ph",
    urlLabel: "pmis.bulacandeped.com.ph",
    image: shot("pmis"),
    frameUrl: "pmis.bulacandeped.com.ph",
  },
  {
    id: "barangay",
    title: "Barangay Tibag Management System",
    short: "Mobile-first barangay operations",
    description:
      "An installable, mobile-first web app for a barangay: resident profiling with fuzzy duplicate detection, certificate issuance with PDF output, blotter case management, service requests and announcements, behind role-based access and an audit trail.",
    stack: ["Laravel 13", "Inertia", "React", "Tailwind", "MySQL", "PWA", "Pest"],
    year: "2026",
    status: "In progress",
    image: shot("barangay"),
    frameUrl: "tibag.barangay.local",
  },
  {
    id: "kiosk",
    title: "SDO Bulacan Kiosk",
    short: "Lobby touchscreen information hub",
    description:
      "A 40-inch touchscreen in the SDO Bulacan lobby. Visitors browse the Citizen's Charter, org chart, calendar, news and videos, and rate the office through the government's standard client satisfaction survey (ARTA-compliant). Staff manage everything from a Filament admin panel.",
    stack: ["React 19", "TypeScript", "Tailwind v4", "Laravel 13", "Filament", "MariaDB"],
    year: "2026",
    status: "Deployed on-site",
    image: shot("kiosk"),
    mobileImage: shot("kiosk-phone"),
    frameUrl: "kiosk.sdo-bulacan",
    note: "Runs on-site in the SDO Bulacan lobby",
  },
  {
    id: "ailas",
    title: "AILAS",
    short: "AI-assisted learning analytics (capstone)",
    description:
      "Helps teachers catch at-risk students early. Teachers upload a syllabus and grades; GPT-4o-mini maps each question to a syllabus competency, a risk model flags struggling students, and dashboards recommend remedial resources. Built for BTECH Baliwag.",
    stack: ["FastAPI", "React", "TypeScript", "PostgreSQL", "OpenAI", "scikit-learn"],
    year: "2026",
    status: "Completed",
    image: shot("ailas"),
    frameUrl: "ailas.btech.edu.ph",
    note: "Capstone project for BTECH Baliwag",
  },
];

/** Other projects. Shown in the grid below the gallery. */
export const projects: Project[] = [
  {
    id: "procurement",
    title: "Procurement System",
    short: "APP, purchase requests & budget realignment",
    description:
      "Moves the Annual Procurement Plan, purchase requests and budget realignment off Excel. Google sign-in, role-based approvals, live budget charts, and printable PDFs with a QR code on every request.",
    stack: ["React 19", "TypeScript", "TanStack Query", "Recharts", "Laravel 13", "Sanctum", "Google SSO"],
    year: "2026",
    status: "In progress",
    image: shot("procurement"),
    frameUrl: "procurement.sdo-bulacan",
    note: "Internal system · in development",
  },
  {
    id: "publication",
    title: "SDO Publication",
    short: "Document log & memo publisher",
    description:
      "Logs incoming documents, tracks how fast they reach the division website, and publishes signed memos to WordPress with the signature automatically redacted. Includes user accounts and an append-only audit log.",
    stack: ["Python", "React", "WordPress REST API", "SQLite", "PDF processing"],
    year: "2026",
    status: "Live",
    url: "https://publications.bulacandeped.com.ph",
    urlLabel: "publications.bulacandeped.com.ph",
    image: shot("publication"),
    frameUrl: "publications.bulacandeped.com.ph",
  },
  {
    id: "besh",
    title: "BESH — Bulacan EduServe Hub",
    short: "Coaching & information system in Microsoft Teams",
    description:
      "A coaching-session and information system that lives entirely inside Microsoft Teams, with a channel for every district in the division. Microsoft Forms collect submissions, and Power Automate flows feed them into Microsoft Lists so the School Governance and Operations Division can track them in one place.",
    stack: ["Microsoft Teams", "Power Automate", "Microsoft Lists", "Microsoft Forms", "Loop"],
    year: "2026",
    status: "Live",
    image: shot("besh"),
    frameUrl: "teams.microsoft.com",
    note: "Private Microsoft Teams workspace for DepEd Bulacan",
  },
  {
    id: "nueva-ecija",
    title: "Nueva Ecija Explorer",
    short: "Tourism web platform",
    description:
      "A tourism site for Nueva Ecija's hidden gems, with guides to tourist spots, local delicacies and travel resources.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    year: "2025",
    status: "Live",
    url: "https://nuevaecijaexplorer.com/",
    urlLabel: "nuevaecijaexplorer.com",
    image: shot("nueva-ecija"),
  },
  {
    id: "928-credit",
    title: "928 Credit Concept Lending",
    short: "Lending management system",
    description:
      "A lending management system that handles loan processing, payment tracking, customer records and automated reports, with role-based logins for each office.",
    stack: ["Python", "React", "JavaScript", "Tailwind"],
    year: "2025",
    status: "Completed",
    image: shot("928-credit"),
  },
];

export type Job = {
  title: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  bullets?: string[];
  tags: string[];
};

export const experience: Job[] = [
  {
    title: "Technical Assistant II — Developer",
    company: "DepEd Schools Division of Bulacan · ICT Unit",
    location: "Bulacan, Philippines",
    period: "Jul – Nov 2026",
    summary:
      "Developer for the division's internal systems. Turned manual, Excel-based processes into web applications, from requirements and database design to production deployment.",
    bullets: [
      "Built and deployed ICSMS/PSIR, PMIS and SDO Publication to bulacandeped.com.ph through cPanel, including domains, SSL and DNS.",
      "Automated BESH, the division's coaching hub in Microsoft Teams, with Forms, Lists and Power Automate.",
      "Ran QA reviews, wrote user guides and testing scripts, and shipped updates with zero downtime.",
    ],
    tags: ["Laravel", "React 19", "TypeScript", "Python", "MySQL", "Power Automate", "cPanel"],
  },
  {
    title: "Claude Code Developer (Contract)",
    company: "Center Court",
    location: "Cleveland, Ohio, USA · Remote",
    period: "2026",
    summary:
      "Worked on a remote, AI-assisted development team. Debugged and optimized web applications, cleaned up UI/UX, built data-collection pipelines for ticketing platforms, and analyzed how third-party systems behave to plan integrations. Delivered a detailed written report every day.",
    tags: ["Claude Code", "Debugging", "UI/UX", "Data pipelines", "System analysis"],
  },
  {
    title: "Front-End Developer",
    company: "RBS Software Solutions",
    location: "Philippines",
    period: "2025 – 2026",
    summary:
      "Built and maintained React front ends with responsive layouts in Tailwind CSS and Bootstrap, integrated REST APIs with the backend team, and joined code reviews.",
    tags: ["React", "Tailwind CSS", "Bootstrap", "API integration"],
  },
  {
    title: "IT Support Staff",
    company: "Bulacan Agricultural State College · MIS Office",
    location: "San Ildefonso, Bulacan",
    period: "2025 · 2 months",
    summary:
      "Troubleshot and maintained computers and the campus network, and designed visual assets for the office.",
    tags: ["Technical support", "Networking", "Graphic design"],
  },
];

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Front end",
    items: ["React 19", "TypeScript", "JavaScript", "Tailwind CSS v4", "Inertia.js", "shadcn/ui", "Vite", "HTML & CSS", "Bootstrap"],
  },
  {
    title: "Back end",
    items: ["Laravel 13", "PHP 8.4", "Python", "FastAPI", "Filament", "REST APIs", "Sanctum & Google SSO"],
  },
  {
    title: "Data",
    items: ["MySQL", "MariaDB", "PostgreSQL", "SQLite", "Microsoft Lists"],
  },
  {
    title: "Automation & M365",
    items: ["Power Automate", "Microsoft Forms", "Microsoft Teams", "WordPress REST API", "Resend email"],
  },
  {
    title: "AI",
    items: ["Claude Code", "OpenAI API", "PyTorch", "scikit-learn"],
  },
  {
    title: "Ship & operate",
    items: ["Git & GitHub", "cPanel", "SSL & DNS", "Cloudflare Tunnel", "PWA", "Pest & PHPUnit", "Playwright"],
  },
];

export const marquee = [
  "React",
  "Laravel",
  "TypeScript",
  "Python",
  "Power Automate",
  "Tailwind",
  "FastAPI",
  "MySQL",
  "Inertia",
  "Filament",
  "PyTorch",
  "Claude Code",
];
