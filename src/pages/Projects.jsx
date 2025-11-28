import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    name: 'VoiceGuard_VoiceGuardian',
    description: 'AI Voice Moderation Platform. Multi-Platform Development (Twilio, WebRTC, Agora + Flutter). Real-time transcription with Google Speech-to-Text and hybrid toxicity detection.',
    stack: ['Django', 'Twilio', 'WebRTC', 'Agora', 'Flutter', 'Google Cloud Run', 'Docker'],
    link: 'https://github.com/nidhinvijay'
  },
  {
    name: 'Multi_Asset_Real_Time_Trading_Bot',
    description: 'Real-time paper trading engine using Node.js, Express, and WebSockets. Dual Finite State Machine (Long/Short) with crash-safe state persistence.',
    stack: ['Node.js', 'Express', 'WebSockets', 'Binance API', 'Fyers API', 'Google Cloud VM'],
    link: 'https://github.com/nidhinvijay'
  },
  {
    name: 'AI_Interview_Bot',
    description: 'Full-stack recruitment platform using React + Django. AI chatbot for preliminary screening and facial expression analysis.',
    stack: ['React', 'Django', 'AI/ML', 'NLP'],
    link: 'https://github.com/nidhinvijay'
  },
  {
    name: 'BookHub',
    description: 'Library Management System with Django. Role-based access, borrowing workflows, Razorpay integration, and Google Books API automation.',
    stack: ['Django', 'Razorpay', 'Google Books API', 'Redis'],
    link: 'https://github.com/nidhinvijay'
  },
  {
    name: 'Textlytics',
    description: 'Containerized Text Analysis Platform. Production-ready API using Django REST Framework, Celery, Redis, and PostgreSQL.',
    stack: ['Django REST Framework', 'Celery', 'Redis', 'PostgreSQL', 'Docker'],
    link: 'https://github.com/nidhinvijay'
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
              <p><span className="text-purple-400">repo_url</span> = <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-vscode-accent">"{project.link}"</a></p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;