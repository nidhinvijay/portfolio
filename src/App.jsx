import React, { useState, useEffect, useRef, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TabBar from './components/TabBar';
import Terminal from './components/Terminal';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import { VscSourceControl, VscWarning } from 'react-icons/vsc';
import { motion, AnimatePresence } from 'framer-motion';


const App = () => {
  const [openFiles, setOpenFiles] = useState(['about-me.jsx']);
  const [activeFile, setActiveFile] = useState('about-me.jsx');
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState(''); // Default theme
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const glowRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.background =
            `radial-gradient(700px circle at ${mouseRef.current.x}px ${mouseRef.current.y}px, rgba(0,122,204,0.07), transparent 70%)`;
        }
        rafRef.current = null;
      });
    }
  }, []);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOpenFile = (fileName) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles([...openFiles, fileName]);
    }
    setActiveFile(fileName);
  };

  const handleCloseTab = (fileName) => {
    const newFiles = openFiles.filter(f => f !== fileName);
    setOpenFiles(newFiles);
    
    if (activeFile === fileName) {
      if (newFiles.length > 0) {
        setActiveFile(newFiles[newFiles.length - 1]);
      } else {
        setActiveFile(null);
      }
    }
  };

  const handleTerminalCommand = (command, param) => {
    if (command === 'open') {
      const pageMap = {
        'projects': 'projects.py',
        'about': 'about-me.jsx',
        'skills': 'skills.js',
        'education': 'education.json',
        'experience': 'experience.md',
        'contact': 'contact.css'
      };
      
      const fileName = pageMap[param.toLowerCase()] || param;
      
      // Check if it's a valid file
      const validFiles = Object.values(pageMap);
      if (validFiles.includes(fileName)) {
        handleOpenFile(fileName);
        return true;
      }
      return false;
    }
    
    if (command === 'theme') {
      const themeMap = {
        'dracula': 'theme-dracula',
        'github': 'theme-github-light',
        'monokai': 'theme-monokai',
        'dark': ''
      };
      
      if (themeMap.hasOwnProperty(param.toLowerCase())) {
        setTheme(themeMap[param.toLowerCase()]);
        return true;
      }
      return false;
    }
    return false;
  };

  const renderPage = () => {
    if (!activeFile) return <div className="flex items-center justify-center h-full text-gray-500">No file is open</div>;

    switch (activeFile) {
      case 'projects.py':
        return <Projects />;
      case 'skills.js':
        return <Skills />;
      case 'education.json':
        return <Education />;
      case 'experience.md':
        return <Experience />;
      case 'contact.css':
        return <Contact />;
      case 'about-me.jsx':
      default:
        return <About />;
    }
  };

  const Content = () => (
    <>
      <Sidebar onOpenFile={handleOpenFile} isMobile={isMobile} onThemeChange={setTheme} />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <TabBar 
          openFiles={openFiles} 
          activeFile={activeFile} 
          onTabClick={setActiveFile} 
          onCloseTab={handleCloseTab} 
        />

        <div className="bg-vscode-sidebar h-6 flex items-center px-4 text-xs text-gray-400 shrink-0">
           {activeFile ? `src > pages > ${activeFile}` : ''}
        </div>

        <main className="flex-1 bg-vscode-editor overflow-y-auto p-4 md:p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFile}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <Terminal 
          isOpen={isTerminalOpen} 
          onClose={() => setIsTerminalOpen(false)} 
          onCommand={handleTerminalCommand}
        />

        <footer className="bg-vscode-statusbar h-6 flex items-center justify-between px-4 text-xs text-white shrink-0 select-none cursor-default">
           <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 hover:bg-white/20 px-1 rounded cursor-pointer">
              <VscSourceControl />
              <span>main*</span>
            </div>
            <div className="flex items-center space-x-1 hover:bg-white/20 px-1 rounded cursor-pointer">
              <VscWarning />
              <span>0</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:bg-white/20 px-1 rounded cursor-pointer" onClick={() => setIsTerminalOpen(!isTerminalOpen)}>
              {isTerminalOpen ? 'Hide Terminal' : 'Show Terminal'}
            </span>
            <span className="hover:bg-white/20 px-1 rounded cursor-pointer">Ln 12, Col 45</span>
            <span className="hover:bg-white/20 px-1 rounded cursor-pointer">UTF-8</span>
            <span className="hover:bg-white/20 px-1 rounded cursor-pointer">JavaScript React</span>
          </div>
        </footer>
      </div>
    </>
  );

  return (
    <div
      className={`flex h-screen bg-vscode-bg font-mono relative overflow-hidden ${theme}`}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
    >
      {/* Spotlight glow overlay — pointer-events:none so it never blocks clicks */}
      {!isMobile && (
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        />
      )}
      <Content />
    </div>
  );
};

export default App;