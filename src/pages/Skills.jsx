import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  return (
    <div className="p-8 text-vscode-text font-mono h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400">My Technical Skills</h1>
      <div className="grid grid-cols-1 gap-8">
        <div>
          <motion.p className="mb-2 p-2 rounded hover:bg-vscode-sidebar" whileHover={{ scale: 1.02, x: 10 }}><span className="text-blue-400">const</span> <span className="text-green-400">backend</span> = [<span className="text-orange-400">'Django', 'Django REST Framework', 'FastAPI', 'Node.js', 'SQLModel', 'Celery', 'Django Channels', 'JWT', 'Async'</span>];</motion.p>
          <motion.p className="mb-2 p-2 rounded hover:bg-vscode-sidebar" whileHover={{ scale: 1.02, x: 10 }}><span className="text-blue-400">const</span> <span className="text-green-400">frontend</span> = [<span className="text-orange-400">'React.js', 'Next.js', 'Angular', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3', 'Flutter/Dart'</span>];</motion.p>
          <motion.p className="mb-2 p-2 rounded hover:bg-vscode-sidebar" whileHover={{ scale: 1.02, x: 10 }}><span className="text-blue-400">const</span> <span className="text-green-400">cloud_devops</span> = [<span className="text-orange-400">'GCP (Cloud Run, Compute Engine)', 'DigitalOcean VPS', 'Docker', 'Docker Compose', 'PM2', 'Linux'</span>];</motion.p>
          <motion.p className="mb-2 p-2 rounded hover:bg-vscode-sidebar" whileHover={{ scale: 1.02, x: 10 }}><span className="text-blue-400">const</span> <span className="text-green-400">databases</span> = [<span className="text-orange-400">'PostgreSQL', 'NeonDB', 'SQLite', 'Oracle SQL+'</span>];</motion.p>
          <motion.p className="mb-2 p-2 rounded hover:bg-vscode-sidebar" whileHover={{ scale: 1.02, x: 10 }}><span className="text-blue-400">const</span> <span className="text-green-400">apis</span> = [<span className="text-orange-400">'Google Speech-to-Text', 'Gemini API', 'Groq API', 'Perspective API', 'Razorpay API', 'Twilio Voice', 'Agora RTC', 'WebRTC', 'Fyers API', 'Delta API', 'Zerodha API', 'Binance API'</span>];</motion.p>
          <motion.p className="mb-2 p-2 rounded hover:bg-vscode-sidebar" whileHover={{ scale: 1.02, x: 10 }}><span className="text-blue-400">const</span> <span className="text-green-400">languages</span> = [<span className="text-orange-400">'Python', 'JavaScript', 'Java', 'SQL'</span>];</motion.p>
          <motion.p className="mb-2 p-2 rounded hover:bg-vscode-sidebar" whileHover={{ scale: 1.02, x: 10 }}><span className="text-blue-400">const</span> <span className="text-green-400">algo_trading</span> = [<span className="text-orange-400">'PineScript (TradingView)', 'MetaTrader 5 Python API', 'MQL', 'Automated signal generation & backtesting'</span>];</motion.p>
        </div>
      </div>
    </div>
  );
};

export default Skills;