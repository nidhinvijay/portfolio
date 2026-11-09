import React from 'react';
import { motion } from 'framer-motion';
import { timeline } from '../data/content';

const colors = ['text-green-400', 'text-blue-400', 'text-purple-400'];

// Markdown-flavoured view of the same roles the timeline shows.
const Experience = () => {
  const roles = timeline.filter((j) => j.branch !== 'education');
  return (
    <div className="text-vscode-text p-8">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400"># Experience</h1>
      {roles.map((job, i) => (
        <motion.div
          key={job.branch}
          className="mb-8 p-4 rounded-lg border border-transparent hover:border-vscode-accent hover:bg-vscode-sidebar hover:shadow-[0_0_10px_rgba(198,242,90,0.15)] transition-[background-color,border-color,box-shadow] duration-300"
        >
          <h2 className={`text-xl font-bold ${colors[i % colors.length]}`}>## {job.role}</h2>
          <h3 className="text-lg text-vscode-accent">
            {job.org} | <span className="text-gray-400 text-sm">{job.period}</span>
          </h3>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
            {job.commits.map((c) => (
              <li key={c}>{c.replace(/^\w+:\s*/, '')}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default Experience;
