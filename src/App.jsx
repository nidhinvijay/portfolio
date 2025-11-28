
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import { VscSourceControl, VscWarning } from 'react-icons/vsc';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const App = () => {
  const [page, setPage] = useState('about');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'education':
        return <Education />;
      case 'experience':
        return <Experience />;
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
      case 'experience':
        return 'experience.md';
      case 'contact':
        return 'contact.css';
      case 'about':
      default:
        return 'about-me.jsx';
    }
  }

  const Content = () => (
    <>
      <Sidebar setPage={setPage} isMobile={isMobile} />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <div className="bg-vscode-sidebar h-8 flex items-center px-4 text-sm shrink-0">
           <div className="bg-vscode-editor px-4 py-1">
            {getPageName()}
          </div>
        </div>

        <main className="flex-1 bg-vscode-editor overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <footer className="bg-vscode-statusbar h-8 flex items-center justify-between px-4 text-xs text-white shrink-0">
           <div className="flex items-center space-x-2">
            <VscSourceControl />
            <span>main</span>
          </div>
          <div className="flex items-center space-x-2">
            <VscWarning className="text-yellow-400" />
          </div>
        </footer>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-vscode-bg font-mono relative overflow-hidden">
      {!isMobile ? (
        <Tilt
          className="flex h-full w-full"
          tiltMaxAngleX={1}
          tiltMaxAngleY={1}
          perspective={500}
          scale={0.98}
          transitionSpeed={1000}
          gyroscope={true}
        >
          <Content />
        </Tilt>
      ) : (
        <div className="flex h-full w-full flex-col md:flex-row">
          <Content />
        </div>
      )}
    </div>
  );
};

export default App;