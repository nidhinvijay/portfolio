// Single source of truth for portfolio content.
// Both the scroll site and the VS Code editor pages read from here.

export const profile = {
  name: 'Nidhin Vijay',
  role: 'Full Stack Developer',
  email: 'nidhinvijaynv@gmail.com',
  phone: '+91 8921879091',
  github: 'https://github.com/nidhinvijay',
  linkedin: 'https://www.linkedin.com/in/nidhin-v-807353341/',
  resume: '/NidhinV_Resume.pdf',
  portfolio: 'https://nv.is-a.dev/',
  location: 'Kerala, India',
};

export const projects = [
  {
    name: 'Clinical EMR',
    file: 'emr.tsx',
    tagline: 'Telemedicine EMR, live in a clinic',
    description:
      'An EMR and telemedicine platform used in production by an allergy and Ayurveda clinic. AI patient intake and clinical summaries on AWS Bedrock, a real-time doctor queue over SSE, Agora video consults, OCR for lab reports, WhatsApp notifications and a Razorpay pharmacy store.',
    stack: ['Next.js', 'TypeScript', 'Django REST', 'PostgreSQL', 'Celery', 'AWS Bedrock', 'Agora RTC', 'Docker'],
    flow: ['Next.js', 'Django REST', 'AWS Bedrock', 'RDS + S3'],
    isPrivate: true,
  },
  {
    name: 'Loan Eligibility Platform',
    file: 'loan_engine.py',
    tagline: 'Lender matching with verified KYC',
    description:
      'Checks loan eligibility and matches borrowers to lenders. A 0–100 readiness score, FOIR and EMI calculations, a what-if simulator and PDF reports, with KYC and credit bureau checks through Decentro.',
    stack: ['FastAPI', 'SQLAlchemy (async)', 'Neon Postgres', 'Redis', 'Next.js', 'Decentro'],
    flow: ['KYC + bureau', 'FOIR / EMI', 'Lender match', 'PDF report'],
    isPrivate: true,
  },
  {
    name: 'Clinical Fitness Platform',
    file: 'fitness.tsx',
    tagline: 'Doctor-led training and nutrition',
    description:
      'Client and doctor portals for a doctor-run fitness programme. MediaPipe pose analysis checks exercise form, meal photos get an AI review, workouts go out as expiring WhatsApp links, and lab reports are tracked over time.',
    stack: ['Next.js', 'FastAPI', 'Celery', 'Neon Postgres', 'MediaPipe', 'WhatsApp'],
    flow: ['Workout link', 'MediaPipe pose', 'AI meal review', 'Doctor hub'],
    isPrivate: true,
  },
  {
    name: 'VoiceGuardian',
    file: 'voice_guardian.py',
    tagline: 'AI voice moderation, three platforms',
    description:
      'Voice calls that moderate themselves. Speech is transcribed, scored for toxicity with Perspective API, and rephrased politely by a Groq LLM. Runs on browser (Twilio / Channels), peer-to-peer (WebRTC) and mobile (Agora + Flutter).',
    stack: ['FastAPI', 'Django', 'Flutter', 'Agora RTC', 'Firebase', 'Groq', 'Google STT', 'Docker'],
    flow: ['Mic stream', 'Google STT', 'Perspective', 'Groq rephrase'],
    links: [
      { label: 'Web backend', url: 'https://github.com/nidhinvijay/voice_guard' },
      { label: 'Mobile backend', url: 'https://github.com/nidhinvijay/voiceguardian' },
      { label: 'Flutter app', url: 'https://github.com/nidhinvijay/voiceguardian_app' },
    ],
  },
  {
    name: 'Zerodha Live Trading',
    file: 'live_trader.ts',
    tagline: 'Real-money, multi-account execution',
    description:
      'Live trading across multiple Zerodha accounts. A state machine validates paper P&L before any order goes live; quantity scales with capital, credentials hot-reload, and TradingView webhooks inject signals.',
    stack: ['Angular 19', 'Node.js', 'Socket.IO', 'KiteConnect', 'PM2', 'Cloudflare Tunnel'],
    flow: ['TradingView', 'FSM gate', 'KiteConnect', 'Angular UI'],
    links: [{ label: 'GitHub', url: 'https://github.com/nidhinvijay/Zerodha' }],
  },
  {
    name: 'Multi-Asset Paper Trader',
    file: 'paper_trader.js',
    tagline: '100+ symbol updates a second',
    description:
      'A real-time paper trading engine on Node.js WebSockets. Dual long/short state machines with crash-safe persistence, fed by Binance streams, Fyers OAuth v3 and TradingView webhooks.',
    stack: ['Node.js', 'Express', 'WebSockets', 'Binance API', 'Fyers API', 'GCP VM', 'PM2'],
    flow: ['Binance WS', 'Dual FSM', 'State store', 'Dashboard'],
    links: [{ label: 'GitHub', url: 'https://github.com/nidhinvijay/BTCUSDT' }],
  },
  {
    name: 'BookHub',
    file: 'bookhub.py',
    tagline: 'Library management with payments',
    description:
      'A Django library system with a full five-stage Razorpay payment lifecycle, Google Books API responses cached for 24 hours, role-based access and a librarian analytics dashboard.',
    stack: ['Django', 'Razorpay', 'Google Books API', 'PostgreSQL'],
    flow: ['Django', 'Razorpay', 'Books API cache', 'PostgreSQL'],
    links: [
      { label: 'Live demo', url: 'https://bookhub-if2m.onrender.com' },
      { label: 'GitHub', url: 'https://github.com/nidhinvijay/BookHub' },
    ],
  },
  {
    name: 'AI Interview Bot',
    file: 'interview_bot.jsx',
    tagline: 'Resume in, tailored interview out',
    description:
      'Upload a resume and Gemini writes 30 questions tailored to the candidate. TensorFlow and OpenCV read facial emotion in real time during the session, feeding a multi-stage hiring pipeline.',
    stack: ['React', 'Django', 'Gemini API', 'TensorFlow', 'OpenCV', 'PyPDF2'],
    flow: ['PDF resume', 'Gemini', 'Live webcam', 'Score'],
    links: [{ label: 'GitHub', url: 'https://github.com/nidhinvijay/AI_Interview_Bot' }],
  },
  {
    name: 'HR AI Agent',
    file: 'hr_agent.py',
    tagline: 'Screening and scheduling, automated',
    description:
      'Gemini parses resumes, scores candidates from 1 to 100 and ranks them. Shortlisted candidates get interviews booked automatically through the Google Calendar API.',
    stack: ['Django REST', 'Gemini API', 'Google Calendar API', 'PyPDF2'],
    flow: ['Resumes', 'Gemini score', 'Rank', 'Calendar'],
    links: [{ label: 'GitHub', url: 'https://github.com/nidhinvijay/hr-ai-agent' }],
  },
  {
    name: 'Textlytics',
    file: 'textlytics.py',
    tagline: 'Containerised text analysis API',
    description:
      'A production-ready text analysis REST API. Celery and Redis handle background jobs; PostgreSQL GIN indexes keep full-text search fast.',
    stack: ['Django REST', 'Celery', 'Redis', 'PostgreSQL', 'Docker'],
    flow: ['REST API', 'Celery', 'Redis', 'PostgreSQL GIN'],
    links: [{ label: 'GitHub', url: 'https://github.com/nidhinvijay/textlytics' }],
  },
];

// git log, newest first. Each branch = a role, commits = what shipped.
export const timeline = [
  {
    branch: 'dewdas',
    role: 'Software Developer',
    org: 'Dewdas Technology Pvt. Ltd.',
    period: 'Mar 2026 – Present',
    head: true,
    commits: [
      'feat: clinical EMR + telemedicine platform, live in a clinic (Next.js, Django REST)',
      'feat: AI patient intake and clinical summaries on AWS Bedrock',
      'feat: real-time doctor queue over SSE, Agora video consults, OCR for lab reports',
      'ops: keyless AWS (EC2, private RDS, S3 pre-signed URLs, SES), Cloudflare WAF, GitHub Actions',
      'feat: loan eligibility platform with Decentro KYC and credit bureau checks',
      'feat: clinical fitness platform with MediaPipe form checks and WhatsApp workouts',
      'chore: sprint planning and PR reviews for a team of interns and developers',
    ],
  },
  {
    branch: 'earthminorrights',
    role: 'Full Stack Developer',
    org: 'EarthMinorRights AI Labs Pvt Ltd',
    period: 'Sep 2025 – Feb 2026',
    commits: [
      'feat: VoiceGuardian AI voice moderation on FastAPI, WebSockets and WebRTC',
      'perf: paper + live trading engines at 100+ symbol updates/sec',
      'feat: FSM-validated P&L before live order routing',
      'ops: deploy on Google Cloud VMs with PM2 and Cloudflare',
    ],
  },
  {
    branch: 'srishti',
    role: 'Python Full Stack Intern',
    org: 'Srishti Innovative Technopark',
    period: 'Feb 2025 – Aug 2025',
    commits: [
      'feat: BookHub LMS with multi-stage Razorpay lifecycle',
      'feat: AI Interview Bot with Gemini questions and emotion detection',
    ],
  },
  {
    branch: 'education',
    role: 'Master of Computer Applications',
    org: 'University of Kerala',
    period: '2025',
    commits: [
      'cert: Data Analysis with Python (2025)',
      'cert: Machine Learning with Python (2024)',
    ],
  },
];

export const skills = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'Dart'] },
  { group: 'Backend', items: ['Django', 'DRF', 'FastAPI', 'Node.js', 'Express', 'SQLAlchemy', 'Celery', 'Redis', 'WebSockets', 'SSE', 'JWT', 'OAuth 2.0 (Google Sign-In)'] },
  { group: 'Frontend & Mobile', items: ['React', 'Next.js', 'Angular', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Flutter'] },
  { group: 'Cloud & DevOps', items: ['AWS (EC2, S3, SES, RDS, Bedrock, IAM, SSM)', 'GCP', 'Docker', 'Nginx', 'Cloudflare', 'PM2', 'GitHub Actions', 'Linux'] },
  { group: 'Data', items: ['PostgreSQL', 'AWS RDS', 'Neon', 'SQLite', 'Oracle SQL'] },
  { group: 'AI & ML', items: ['AWS Bedrock', 'Gemini', 'Groq', 'OCR (Tesseract)', 'MediaPipe', 'TensorFlow / Keras'] },
  { group: 'Integrations', items: ['Agora RTC', 'WebRTC', 'Twilio', 'WhatsApp Cloud API', 'Razorpay', 'Decentro KYC', 'Google APIs'] },
  { group: 'Testing', items: ['pytest', 'Playwright'] },
];

// Deterministic short "commit hash" for display only.
export const shortHash = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
};
