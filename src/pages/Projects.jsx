import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    name: 'AyurCare',
    description: 'Full-stack AI-assisted Ayurvedic telemedicine platform. AI collects and summarizes patient symptoms; doctors review and prescribe. Integrated Agora RTC for real-time doctor–patient video consultations. Built with Django REST API, Next.js frontend, and Groq/LLaMA 3.1 for fast AI inference.',
    stack: ['Django', 'Next.js', 'Groq / LLaMA 3.1', 'Agora RTC', 'Cloudflare Tunnel'],
    isPrivate: true
  },
  {
    name: 'VoiceGuardian',
    description: 'AI Voice Moderation Platform built across 3 platforms — Twilio/Django Channels (browser), WebRTC (peer), Agora RTC + Flutter (mobile). FastAPI + SQLModel backend with JWT auth, friend/call management, Firebase FCM push, Perspective API + Groq LLM for toxicity detection and polite rephrasing.',
    stack: ['FastAPI', 'Django', 'Flutter', 'Agora RTC', 'Firebase', 'Groq', 'Google STT', 'Docker'],
    links: [
      { label: 'Web Backend', url: 'https://github.com/nidhinvijay/voice_guard' },
      { label: 'Mobile Backend', url: 'https://github.com/nidhinvijay/voiceguardian' },
      { label: 'Flutter App', url: 'https://github.com/nidhinvijay/voiceguardian_app' },
    ]
  },
  {
    name: 'Zerodha_Live_Trading_System',
    description: 'Real-money multi-account trading system via Zerodha KiteConnect API. Angular 19 frontend + Node.js + Socket.IO backend. FSM validates paper P&L before going live; dynamic capital-based quantity calculation, hot-reload credentials, TradingView webhook signal injection.',
    stack: ['Angular 19', 'Node.js', 'Socket.IO', 'KiteConnect API', 'PM2', 'Cloudflare Tunnel'],
    link: 'https://github.com/nidhinvijay/Zerodha'
  },
  {
    name: 'Multi_Asset_Paper_Trader',
    description: 'Real-time paper trading engine using Node.js + WebSockets processing 100+ symbol updates/sec. Dual FSM (Long/Short) with crash-safe state persistence. Integrated Binance WebSocket, Fyers OAuth v3, and TradingView webhooks.',
    stack: ['Node.js', 'Express', 'WebSockets', 'Binance API', 'Fyers API', 'Google Cloud VM', 'PM2'],
    link: 'https://github.com/nidhinvijay/BTCUSDT'
  },
  {
    name: 'BookHub',
    description: 'Library Management System with Django. Full Razorpay payment lifecycle (5 stages), Google Books API with 24-hour caching, role-based access decorators, librarian analytics dashboard.',
    stack: ['Django', 'Razorpay', 'Google Books API', 'PostgreSQL'],
    links: [
      { label: 'Live Demo', url: 'https://bookhub-if2m.onrender.com' },
      { label: 'GitHub', url: 'https://github.com/nidhinvijay/BookHub' },
    ]
  },
  {
    name: 'AI_Interview_Bot',
    description: 'Full-stack AI recruitment platform. PDF resume parsing → Gemini API generates 30 MCQs tailored to candidate. Real-time facial emotion detection using TensorFlow/Keras + OpenCV. Multi-stage hiring pipeline.',
    stack: ['React', 'Django', 'Gemini API', 'TensorFlow', 'OpenCV', 'PyPDF2'],
    link: 'https://github.com/nidhinvijay/AI_Interview_Bot'
  },
  {
    name: 'HR_AI_Agent',
    description: 'AI-powered recruitment screening tool. Gemini API parses resumes, scores candidates 1–100, and ranks by relevance. Google Calendar API auto-schedules interviews for shortlisted candidates.',
    stack: ['Django REST Framework', 'Gemini API', 'Google Calendar API', 'PyPDF2'],
    link: 'https://github.com/nidhinvijay/hr-ai-agent'
  },
  {
    name: 'Textlytics',
    description: 'Containerized Text Analysis Platform. Production-ready REST API using Django REST Framework, Celery, Redis, and PostgreSQL with GIN indexing for high-performance text search.',
    stack: ['Django REST Framework', 'Celery', 'Redis', 'PostgreSQL', 'Docker'],
    link: 'https://github.com/nidhinvijay/textlytics'
  }
];

const Projects = () => {
  return (
    <div className="text-vscode-text p-8">
      <h1 className="text-2xl font-bold mb-6"><span className="text-purple-400">class</span> <span className="text-orange-400">MyProjects</span>:</h1>
      <div className="ml-4">
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="mb-6 p-4 rounded-lg border border-transparent hover:border-vscode-accent hover:bg-vscode-sidebar transition-colors duration-300"
            whileHover={{ scale: 1.02, x: 10, boxShadow: "0px 0px 8px rgba(0, 122, 204, 0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-lg"><span className="text-blue-400">def</span> <span className="text-green-400">{project.name}</span>():</p>
            <div className="ml-8 border-l-2 border-gray-600 pl-4">
              <p><span className="text-purple-400">description</span> = <span className="text-yellow-300">"{project.description}"</span></p>
              <p><span className="text-purple-400">stack</span> = <span className="text-yellow-300">{JSON.stringify(project.stack)}</span></p>
              <p>
                <span className="text-purple-400">repo_url</span> ={' '}
                {project.isPrivate ? (
                  <span className="text-gray-500 italic">"private"</span>
                ) : project.links ? (
                  <span className="space-x-2">
                    {project.links.map((l, i) => (
                      <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-vscode-accent">
                        "{l.label}"
                      </a>
                    ))}
                  </span>
                ) : (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-vscode-accent">
                    "{project.link}"
                  </a>
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;