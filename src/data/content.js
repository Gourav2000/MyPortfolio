// ─────────────────────────────────────────────────────────────
// Single source of truth for every section of the portfolio.
// Used by both the 3D city panels and the 2D fallback site.
// Content sourced from Resume (2026) + previous portfolio site.
// ─────────────────────────────────────────────────────────────

import ME from '../assets/me.png'
import ME_ABOUT from '../assets/me-about.jpg'
import DEVFORGE_COVER from '../assets/devforge-cover.svg'
import GLIMPSEDESK_COVER from '../assets/glimpsedesk-cover.svg'
import IMG_COVID from '../assets/portfolio1.jpg'
import IMG_DOCSCAN from '../assets/portfolio2.jpg'
import IMG_S2F from '../assets/portfolio3.jpg'
import IMG_TOX from '../assets/portfolio4.jpg'
import IMG_KEYLOG from '../assets/portfolio5.jpg'
import IMG_WIFI from '../assets/portfolio6.jpg'
import IMG_CHAT from '../assets/portfolio7.jpg'
import IMG_MORSE from '../assets/portfolio8.jpg'
import IMG_AUTOTYPE from '../assets/portfolio9.jpg'
import BADGE_PCA from '../assets/pca.png'
import BADGE_ACE from '../assets/ace.png'
import BADGE_AZ900 from '../assets/az900.png'
import AVTR1 from '../assets/avatar1.jpg'
import AVTR2 from '../assets/avatar2.jpg'
import AVTR3 from '../assets/avatar3.jpg'
import AVTR4 from '../assets/avatar4.jpg'

export const PROFILE = {
  photo: ME,
  aboutPhoto: ME_ABOUT,
  name: 'GOURAV SARKAR',
  role: 'Software Engineer @ ServiceNow',
  tagline: 'Backend · Cloud · AI Agents',
  email: 'gouravsarkar67@gmail.com',
  phone: '+91 9433058880',
  whatsapp: 'https://api.whatsapp.com/send?phone=919433058880',
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/gourav-sarkar-439026191/' },
    { label: 'GitHub', url: 'https://github.com/Gourav2000' },
    { label: 'Google Scholar', url: 'https://scholar.google.com/scholar?q=Gourav+Sarkar+CopperNet' },
    { label: 'HackerRank', url: 'https://www.hackerrank.com/sarkargourav000' },
  ],
}

export const SECTIONS = {
  about: {
    id: 'about',
    label: 'ABOUT',
    sub: 'Identity Core',
    accent: '#4db5ff',
    intro:
      "I'm a software engineer specializing in scalable backend systems and, more recently, production AI agents. " +
      'At ServiceNow I work on Workforce Management — time-series forecasting, shift planning infrastructure and ' +
      'LLM-powered agents used by 100+ Fortune 500 companies. I love problems where distributed systems, data and ' +
      'AI meet, and I care about shipping things that are reliable, measured and fast.',
    facts: [
      { k: '4+ years', v: 'Engineering experience' },
      { k: '3', v: 'Research publications' },
      { k: '3x', v: 'Cloud certified (GCP × 2, Azure)' },
      { k: '100+', v: 'Fortune 500 customers running my code' },
      { k: '9.39 / 10', v: 'B.Tech CGPA' },
      { k: '80+', v: 'Projects built' },
    ],
  },

  experience: {
    id: 'experience',
    label: 'EXPERIENCE',
    sub: 'Career Towers',
    accent: '#00e5ff',
    jobs: [
      {
        company: 'ServiceNow',
        title: 'Software Engineer',
        place: 'Hyderabad, India',
        time: '11/2023 – Present',
        points: [
          'Resolved a heap memory bottleneck surfaced by AT&T (18,000+ assignment groups, 155M+ data points), cutting historical data processing time 61% (18h → 7h) via time-series data model redesign and batch processing — fix deployed across 100+ Fortune 500 customers.',
          'Improved forecast granularity 4× (hourly → 15-min intervals) and reduced agent idle time by 30% by introducing TTR-based staffing forecasting with granular headcount predictions.',
          "Redesigned time-series interval anchoring to fix a UTC-offset defect raised by DHL (e.g. Nepal's +5:45), re-anchoring the aggregation grid to local wall-clock time — correcting 15/30/60-min forecasts across all global timezones.",
          'Reduced manual shift planning overhead ~50% for thousands of enterprise managers by building production LLM-powered forecast & shift-planning AI agents for natural-language staffing operations.',
          'Led cross-team integration of Workforce Management AI agents into a unified conversational interface consolidating 5+ WFM operations for 100+ Fortune 500 customers.',
          'Delivered real-time operational visibility to 25,000+ enterprise teams: recurring events, timezone-aware holiday calendars and 10+ manager dashboard widgets (CSAT, SLA, P1, utilization) refreshing every 30s — dashboard load time down 40%.',
        ],
      },
      {
        company: 'Persistent Systems',
        title: 'Software Engineer',
        place: 'Pune, India',
        time: '02/2022 – 10/2023',
        points: [
          'Built scalable Java/Spring Boot APIs and MySQL backend for NORC at the University of Chicago, integrating Excel-based survey data for US federal agencies (CDC, NIH, VA) with automated Cron scheduling.',
          'Maintained production reliability through CI/CD pipelines, load/stress testing and query optimization; ensured data integrity and security across federal agency deployments.',
        ],
      },
      {
        company: 'Applore Technologies',
        title: 'Software Developer Intern',
        place: 'Noida, India',
        time: '03/2021 – 09/2021',
        points: [
          'Adorae: social fashion networking app (Flutter / Android Native) — users share outfit photos, tag brands and shop from linked stores.',
          'JK Maintenance App: internal dashboard for JK Tyres employees (Flutter / React / MongoDB / Node.js) — tasks, checklists, calendars and tickets in one place.',
        ],
      },
      {
        company: 'Bizamps',
        title: 'Backend Developer Intern',
        place: 'Kolkata, India',
        time: '12/2020 – 03/2021',
        points: [
          'Researched and architected an internal tool generating personalized first lines for cold emails from LinkedIn profiles.',
          'Led a team of frontend + backend interns to ship an end-to-end product deployed on GCP.',
        ],
      },
    ],
  },

  skills: {
    id: 'skills',
    label: 'SKILLS',
    sub: 'Crystal Garden',
    accent: '#b44dff',
    groups: [
      { name: 'Languages', items: ['Java', 'JavaScript', 'Python', 'C++', 'C'] },
      { name: 'Frameworks', items: ['Spring Boot', 'Node.js', 'React', 'Flutter', 'Flask', 'Express.js'] },
      { name: 'Cloud & Tools', items: ['GCP', 'Azure', 'Docker', 'Git', 'Jenkins', 'CI/CD', 'MySQL', 'NoSQL', 'Firebase'] },
      { name: 'AI / ML', items: ['AI Agents', 'LLMs', 'RAG', 'Distributed Systems', 'Vector Databases', 'Prompt Engineering'] },
    ],
  },

  projects: {
    id: 'projects',
    label: 'PROJECTS',
    sub: 'Billboard Alley',
    accent: '#ff9d00',
    featured: [
      {
        title: 'DevForge',
        desc:
          'Local-first CLI that keeps your entire codebase queryable in natural language — no API keys, no internet. ' +
          'Chunks repos into ~2000-char segments, hybrid BM25 + vector retrieval with SHA-256 delta indexing, ' +
          'returns cited answers (file:line-range) via any Ollama-compatible model. Zero cloud dependency.',
        tags: ['Python', 'RAG', 'BM25 + Vectors', 'Ollama', 'CLI'],
        github: 'https://github.com/Gourav2000/DevForge',
        image: DEVFORGE_COVER,
      },
      {
        title: 'GlimpseDesk',
        desc:
          'VS Code-style desktop media & file explorer built with Electron. Multi-tab, multi-window interface with ' +
          'native OS folder picker, video preview and markdown rendering. Fully local, no cloud dependency.',
        tags: ['Electron', 'JavaScript', 'Desktop'],
        github: 'https://github.com/Gourav2000/GlimpseDesk',
        image: GLIMPSEDESK_COVER,
      },
    ],
    more: [
      { title: 'Spring2Flask', desc: 'Migration toolkit / bridge between Spring and Flask services.', github: 'https://github.com/Gourav2000/Spring2Flask', image: IMG_S2F },
      { title: 'Api_toxicity', desc: 'Toxicity detection API for user-generated content.', github: 'https://github.com/Gourav2000/Api_toxicity', image: IMG_TOX },
      { title: 'doc_scanner', desc: 'Computer-vision document scanner.', github: 'https://github.com/Gourav2000/doc_scanner', image: IMG_DOCSCAN },
      { title: 'Chat-app using Firebase', desc: 'Realtime chat application on Firebase.', github: 'https://github.com/Gourav2000/Chat-app_using_firebase', image: IMG_CHAT },
      { title: 'Covid-19 Status', desc: 'Live COVID-19 tracking dashboard.', github: 'https://github.com/Gourav2000/Covid-19_status', image: IMG_COVID },
      { title: 'KeyLogger (Python)', desc: 'Security research: keylogger/spyware proof-of-concept.', github: 'https://github.com/Gourav2000/KeyLogger-Spyware--Python', image: IMG_KEYLOG },
      { title: 'WiFi Password Extraction', desc: 'Windows saved-WiFi credential extraction tool.', github: 'https://github.com/Gourav2000/Windows_Wifi_Password_Extraction', image: IMG_WIFI },
      { title: 'MorseCode Translator', desc: 'Bidirectional Morse code translator.', github: 'https://github.com/Gourav2000/MorseCode_translator', image: IMG_MORSE },
      { title: 'autotype', desc: 'Automation tool that types for you.', github: 'https://github.com/Gourav2000/autotype', image: IMG_AUTOTYPE },
    ],
  },

  publications: {
    id: 'publications',
    label: 'PUBLICATIONS',
    sub: 'The Archive',
    accent: '#4dff9d',
    papers: [
      {
        title: 'CopperNet: Hybrid Deep Learning and LLM-Based Optimization for Copper Refining Processes',
        authors: 'Gourav Sarkar et al.',
        venue: 'ICAART 2026 · Marbella, Spain',
        status: 'Published',
        year: '2026',
      },
      {
        title: 'Agentic AI for Industrial Cooling Systems: Deep RL-Based Optimization with LLM-Enhanced Decision Support',
        authors: 'Gourav Sarkar et al.',
        venue: 'ISUW 2026 · New Delhi, India',
        status: 'Accepted',
        year: '2026',
      },
      {
        title: 'Multi-Severity Corrosion Classification Using Computer Vision',
        authors: 'Dhargawe S., De Sarker A., Jose A., Sarkar G.',
        venue: 'ICSOT-INDIA 2023',
        status: 'Published',
        year: '2024',
      },
    ],
    scholar: 'https://scholar.google.com/scholar?q=Gourav+Sarkar+CopperNet',
  },

  achievements: {
    id: 'achievements',
    label: 'ACHIEVEMENTS',
    sub: 'Trophy Plaza',
    accent: '#ffd24d',
    items: [
      {
        title: 'All India Automobile Hackathon — 2nd Prize',
        desc: 'Won 2nd prize out of 1,862 teams nationwide for a VR application. Organized by NEC, Mitsubishi Corporation and Isuzu Motors.',
        time: '03/2022',
        big: '2nd / 1,862',
      },
      {
        title: 'Code in production at 100+ Fortune 500 companies',
        desc: 'Time-series data model redesign at ServiceNow deployed fleet-wide, cutting processing time from 18 hours to 7.',
        time: 'ServiceNow',
        big: '−61% runtime',
      },
      {
        title: '3 peer-reviewed publications',
        desc: 'Deep learning, agentic AI and computer vision research published at ICAART, ISUW and ICSOT.',
        time: '2023 – 2026',
        big: '3 papers',
      },
      {
        title: 'B.Tech CGPA 9.39 / 10',
        desc: 'Computer Science & Engineering, West Bengal University of Technology.',
        time: '2018 – 2022',
        big: '9.39',
      },
    ],
  },

  certifications: {
    id: 'certifications',
    label: 'CERTIFICATIONS',
    sub: 'Badge Vault',
    accent: '#4d7dff',
    certs: [
      {
        title: 'GCP Professional Cloud Architect',
        issuer: 'Google Cloud',
        image: BADGE_PCA,
        time: 'Jan 2023',
        credId: '8fHaXo',
        url: 'https://www.credential.net/9aea7dd8-d5cd-4f2e-be63-2ad89c41094e?key=52d7eb4ee4e65d14ad8f6130e3491de45fe6ea46d9840cc126f98cb6325d9f85#gs.nb9l40',
      },
      {
        title: 'GCP Associate Cloud Engineer',
        issuer: 'Google Cloud',
        image: BADGE_ACE,
        time: 'Oct 2022',
        credId: '60698263',
        url: 'https://www.credential.net/5924425b-2751-4cc2-91b0-87813c028790',
      },
      {
        title: 'Microsoft Azure Fundamentals (AZ-900)',
        issuer: 'Microsoft',
        image: BADGE_AZ900,
        time: 'Jun 2022',
        credId: '288236bc-8735-4358-b522-824c92885118',
        url: 'https://www.credly.com/badges/da9c5793-ec36-44f8-ab0c-46ed871a391b',
      },
    ],
  },

  education: {
    id: 'education',
    label: 'EDUCATION',
    sub: 'The Academy',
    accent: '#ff4d88',
    schools: [
      {
        school: 'West Bengal University of Technology',
        degree: 'Bachelor of Technology, Computer Science & Engineering',
        place: 'Kolkata, India',
        time: '07/2018 – 06/2022',
        detail: 'CGPA 9.39 / 10',
      },
    ],
  },

  testimonials: {
    id: 'testimonials',
    label: 'TESTIMONIALS',
    sub: 'Hall of Allies',
    accent: '#ff6ec7',
    reviews: [
      {
        avatar: AVTR1,
        name: 'Cladius Fernando',
        review:
          'I interviewed Gourav for a fitment into my project. Halfway into the interview I realized that he is quite passionate about technology and had the attitude required to wrestle with a problem and come out as a victor. He picked up very fast and did a splendid job. I was pleased to work with him. Gourav continues to upskill himself by learning. This coupled with his attitude towards work will take him far in his career.',
      },
      {
        avatar: AVTR2,
        name: 'Paraj Bhattacharya',
        review:
          'I had the privilege of being acquainted with Gourav during our time in college, where he consistently demonstrated a strong work ethic, exceptional communication skills, and an unyielding commitment to achieving excellence.',
      },
      {
        avatar: AVTR3,
        name: 'Tathagata Nandi',
        review:
          "I had the pleasure of working with Gourav in a hackathon, where he served as the lead for our team's project. I was impressed with Gourav's technical skills, leadership abilities, and creativity. He took charge of the project's architecture from the outset and led us through its development, ensuring that our code was modular and efficient. Gourav quickly grasped the project requirements and offered innovative solutions to challenges that arose during the hackathon. His attention to detail and dedication to the project's success was evident throughout, and he was always willing to go the extra mile to ensure that our team delivered a quality product. Overall, I was impressed with his ability to work collaboratively with the team and his passion for technologies.",
      },
      {
        avatar: AVTR4,
        name: 'Earnest Achiever',
        review:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam illo distinctio asperiores autem consequuntur reiciendis odio voluptatem molestias. Ex, temporibus.',
      },
    ],
  },

  contact: {
    id: 'contact',
    label: 'CONTACT',
    sub: 'Signal Tower',
    accent: '#00ffcc',
    emailjs: {
      serviceId: 'service_ej5e3th',
      templateId: 'template_5danxiy',
      publicKey: '0KGGdCNDJojhhuGfz',
    },
  },
}

// Order of zones around the city ring (hero plaza is the center).
export const ZONE_ORDER = [
  'about',
  'experience',
  'skills',
  'projects',
  'publications',
  'achievements',
  'testimonials',
  'certifications',
  'education',
  'contact',
]
