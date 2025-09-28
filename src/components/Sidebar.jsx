// src/components/Sidebar.jsx

import React from 'react';
import { VscFiles, VscGithub, VscMail } from 'react-icons/vsc';
import { FaPython, FaReact, FaHtml5, FaCss3 } from 'react-icons/fa';
import { DiJavascript1 } from 'react-icons/di';
import { SiJson } from 'react-icons/si';

const Sidebar = ({ setPage }) => {
  return (
    <div className="w-64 bg-vscode-sidebar h-full flex">
      <div className="w-12 bg-vscode-activitybar flex flex-col items-center py-4 space-y-6">
        <VscFiles size={30} className="text-vscode-text cursor-pointer" onClick={() => setPage('about')} />
        <a href="https://github.com/nidhinvijay" target="_blank" rel="noopener noreferrer">
          <VscGithub size={30} className="text-vscode-text hover:text-vscode-accent" />
        </a>
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-sm font-bold mb-4">EXPLORER</h2>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-2">Portfolio</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-1 rounded transition-colors duration-200" onClick={() => setPage('about')}>
              <FaReact className="text-blue-400" />
              <span>about-me.jsx</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-1 rounded transition-colors duration-200" onClick={() => setPage('projects')}>
              <FaPython className="text-yellow-400" />
              <span>projects.py</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-1 rounded transition-colors duration-200" onClick={() => setPage('skills')}>
              <DiJavascript1 className="text-yellow-400" />
              <span>skills.js</span>
            </div>
             <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-1 rounded transition-colors duration-200" onClick={() => setPage('education')}>
              <SiJson className="text-orange-400" />
              <span>education.json</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-1 rounded transition-colors duration-200" onClick={() => setPage('contact')}>
              <FaCss3 className="text-blue-500" />
              <span>contact.css</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;