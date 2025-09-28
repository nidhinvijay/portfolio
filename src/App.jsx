
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Education from './pages/Education';
import Contact from './pages/Contact';
import { VscSourceControl } from 'react-icons/vsc';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [page, setPage] = useState('about');

  const renderPage = () => {
    switch (page) {
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'education':
        return <Education />;
      case 'contact':
        return <Contact />;
      case 'about':
      default:
        return <About />;
    }
  };

  const getPageName = () => {
    switch (page) {
      case 'projects':
        return 'projects.py';
      case 'skills':
        return 'skills.js';
      case 'education':
        return 'education.json';
      case 'contact':
        return 'contact.css';
      case 'about':
      default:
        return 'about-me.jsx';
    }
  }

  return (
    <div className="flex h-screen bg-vscode-bg font-mono">
      <Sidebar setPage={setPage} />
      <div className="flex flex-col flex-1">
        <div className="bg-vscode-sidebar h-8 flex items-center px-4 text-sm">
\          <div className="bg-vscode-editor px-4 py-1">
            {getPageName()}
          </div>
        </div>

        <main className="flex-1 bg-vscode-editor overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={page} // The key is crucial for AnimatePresence to track component changes
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <footer className="bg-vscode-statusbar h-6 flex items-center justify-between px-4 text-xs text-white">
           <div className="flex items-center space-x-2">
            <VscSourceControl />
            <span>main</span>
          </div>
          <div className="flex items-center space-x-2">
            <VscWarning className="text-yellow-400" />
            <span>Browser caching for that React icon in the tab is a feature, not a bug. 🙂</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;