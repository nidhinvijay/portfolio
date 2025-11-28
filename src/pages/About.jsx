import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="text-vscode-text p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-2xl font-bold mb-2 text-vscode-accent inline-block"
          whileHover={{ scale: 1.05, color: "#61dafb" }}
        >
          Nidhin V
        </motion.h1>
        
        <motion.div 
          className="mb-6 text-sm text-gray-300 p-4 rounded hover:bg-vscode-sidebar border border-transparent hover:border-blue-400 transition-all duration-300"
          whileHover={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.3)" }}
        >
          <strong>Full Stack Developer & AI Research Intern</strong><br />
          +91 8921879091 | <a href="mailto:nidhinvijaynv@gmail.com" className="text-blue-400 hover:underline">nidhinvijaynv@gmail.com</a> | 
          <a href="https://www.linkedin.com/in/nidhin-v-807353341/" className="text-blue-400 hover:underline ml-1">LinkedIn</a> | 
          <a href="https://github.com/nidhinvijay" className="text-blue-400 hover:underline ml-1">GitHub</a> | 
          <a href="https://portfolio-blond-chi-63.vercel.app/" className="text-blue-400 hover:underline ml-1">Portfolio</a>
        </motion.div>

        <motion.div 
          className="text-lg p-4 rounded hover:bg-vscode-sidebar border border-transparent hover:border-green-400 transition-all duration-300"
          whileHover={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(74, 222, 128, 0.3)" }}
        >
          <TypeAnimation
            sequence={[`// SUMMARY
// Full Stack Developer & AI Research Intern specializing in real-time systems, scalable backend architectures, and AI-driven applications.
// Experienced with Django, FastAPI, Node.js, WebSocket streaming, async pipelines, and containerized cloud deployments.
// Skilled in integrating advanced AI/ML APIs such as Google Gemini, Groq, and Perspective, and building production-grade applications across web and mobile platforms.`,
              1000,
            ]}
            wrapper="pre"
            speed={90}
            style={{ whiteSpace: 'pre-wrap', display: 'inline-block' }}
            repeat={0}
            cursor={true}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
