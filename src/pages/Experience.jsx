import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <div className="text-vscode-text p-8">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400">Experience</h1>
      
      <motion.div
        className="mb-8 p-4 rounded-lg border border-transparent hover:border-green-400 hover:bg-vscode-sidebar transition-colors duration-300"
        whileHover={{ scale: 1.02, x: 10, boxShadow: "0px 0px 8px rgba(74, 222, 128, 0.5)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="text-xl font-bold text-green-400">Software Developer</h2>
        <h3 className="text-lg text-vscode-accent">Dewdas Technology Pvt. Ltd. | <span className="text-gray-400 text-sm">Mar 2026 – Present</span></h3>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li><strong>AyurCare Platform:</strong> Building a full-stack AI-assisted Ayurvedic telemedicine platform — AI collects and summarizes patient symptoms, doctors review and prescribe.</li>
          <li><strong>Video Consultations:</strong> Integrated Agora RTC for real-time doctor–patient video calls within the platform.</li>
          <li><strong>Stack:</strong> Django REST API backend, Next.js frontend, Groq/LLaMA 3.1 for AI inference, Agora RTC, Cloudflare Tunnel for secure routing.</li>
        </ul>
      </motion.div>

      <motion.div 
        className="mb-8 p-4 rounded-lg border border-transparent hover:border-blue-400 hover:bg-vscode-sidebar transition-colors duration-300"
        whileHover={{ scale: 1.02, x: 10, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="text-xl font-bold text-blue-400">Full Stack Developer</h2>
        <h3 className="text-lg text-vscode-accent">EarthMinorRights AI Labs Pvt Ltd | <span className="text-gray-400 text-sm">Sep 2025 – Feb 2026</span></h3>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li><strong>VoiceGuardian:</strong> Built across 3 platforms — Twilio/Django Channels (browser), WebRTC (peer), Agora RTC + Flutter (mobile); FastAPI + SQLModel backend with JWT auth, friend/call management, Alembic migrations, and WebSocket PCM streaming to Google Speech-to-Text.</li>
          <li><strong>AI Moderation:</strong> Perspective API for toxicity scoring + Groq LLM for polite rephrasing; Firebase FCM push for background incoming-call UI; designed to support 100+ concurrent users via WebSocket + ASGI.</li>
          <li><strong>Algorithmic Trading:</strong> Built two production trading platforms — Multi-Asset Paper Trader (Node.js + WebSockets, Dual FSM, Binance/Fyers/TradingView, Cloud VM + PM2) and Zerodha Live Trading System (Angular 19 + Node.js + Socket.IO, real-money multi-account execution via KiteConnect, PM2 + Cloudflare Tunnel).</li>
        </ul>
      </motion.div>

      <motion.div 
        className="mb-8 p-4 rounded-lg border border-transparent hover:border-blue-400 hover:bg-vscode-sidebar transition-colors duration-300"
        whileHover={{ scale: 1.02, x: 10, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="text-xl font-bold text-blue-400">Python Full Stack Developer Intern</h2>
        <h3 className="text-lg text-vscode-accent">Srishti Innovative Technopark | <span className="text-gray-400 text-sm">Jan 2025 – Aug 2025</span></h3>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li><strong>Full Lifecycle Development:</strong> Spearheaded development of <strong>AI Interview Bot</strong> and <strong>BookHub</strong> using Django and React from design to deployment.</li>
          <li><strong>API Engineering:</strong> Built secure REST APIs with role-based authentication, handling heavy request loads efficiently.</li>
          <li><strong>Integrations:</strong> Integrated Razorpay and Google Books API for real-world payment and catalog functionality.</li>
          <li><strong>Optimization:</strong> Improved backend performance with optimized queries and API response caching, reducing page load times by 25%.</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Experience;
