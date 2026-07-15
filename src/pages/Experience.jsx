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
          <li>Architected and built a high-performance telemedicine and EMR SaaS platform using Next.js (App Router), TypeScript, Django REST Framework, and PostgreSQL.</li>
          <li>Developed a real-time waitlist triage system using Server-Sent Events (SSE), Agora RTC video consultations, and server-side Tesseract OCR for automated clinical document ingestion.</li>
          <li>Configured keyless AWS S3 storage (via IAM Profiles) and SES mail routing; containerized applications with Docker and deployed them to AWS EC2 behind Nginx and Cloudflare.</li>
          <li>Integrated Google OAuth 2.0 with secure HTTP-only cookies, and built an apothecary storefront module featuring Razorpay payment processing.</li>
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
          <li>Built <strong>VoiceGuardian</strong> — an AI-powered voice moderation platform using FastAPI, WebSockets, WebRTC, and Groq/Perspective API integrations.</li>
          <li>Engineered high-throughput <strong>paper and live algorithmic trading systems</strong> executing 100+ symbol updates/sec using Node.js, Angular, Socket.IO, and FSM-validated P&L calculations.</li>
          <li>Deployed trading applications on Google Cloud VMs using PM2 and Cloudflare for secure routing.</li>
        </ul>
      </motion.div>

      <motion.div 
        className="mb-8 p-4 rounded-lg border border-transparent hover:border-blue-400 hover:bg-vscode-sidebar transition-colors duration-300"
        whileHover={{ scale: 1.02, x: 10, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="text-xl font-bold text-blue-400">Python Full Stack Developer Intern</h2>
        <h3 className="text-lg text-vscode-accent">Srishti Innovative Technopark | <span className="text-gray-400 text-sm">Feb 2025 – Aug 2025</span></h3>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li>Developed <strong>BookHub — LMS</strong> using Django, implementing a multi-stage Razorpay payment gateway lifecycle and Google Books API caching.</li>
          <li>Built an <strong>AI Interview Bot</strong> using React and Gemini API, featuring PyPDF2 resume parsing and real-time facial emotion detection (TensorFlow/Keras).</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Experience;
