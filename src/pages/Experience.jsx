import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <div className="text-vscode-text p-8">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400">Experience</h1>
      
      <motion.div 
        className="mb-8 p-4 rounded-lg border border-transparent hover:border-blue-400 hover:bg-vscode-sidebar transition-colors duration-300"
        whileHover={{ scale: 1.02, x: 10, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2 className="text-xl font-bold text-blue-400">AI Research Developer</h2>
        <h3 className="text-lg text-vscode-accent">EarthMinorRights AI Labs Pvt Ltd | <span className="text-gray-400 text-sm">Sep 2025 – Present</span></h3>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li><strong>VoiceGuard/VoiceGuardian:</strong> Contributing to an AI-powered real-time voice moderation platform with three production versions (Twilio, WebRTC, Agora + Flutter).</li>
          <li><strong>Real-time Transcription:</strong> Built pipelines using Google Cloud Speech-to-Text supporting 100+ concurrent users.</li>
          <li><strong>Hybrid Toxicity Detection:</strong> Implemented detection using Perspective API and intelligent rephrasing using Groq API + Google Gemini API, improving moderation efficiency by 30%.</li>
          <li><strong>Cloud Architecture:</strong> Developed containerized backend architecture using Docker, Google Cloud Run, and Cloud Build CI/CD with ASGI and WebSocket optimization.</li>
          <li><strong>Performance:</strong> Improved system reliability and async streaming performance through backend optimizations.</li>
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
