import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TabBar from '../components/TabBar';
import Terminal from '../components/Terminal';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Skills from '../pages/Skills';
import Education from '../pages/Education';
import Experience from '../pages/Experience';
import Contact from '../pages/Contact';
import { VscSourceControl, VscWarning, VscSearch, VscChromeMinimize, VscChromeMaximize, VscChromeClose } from 'react-icons/vsc';
import { motion, AnimatePresence } from 'framer-motion';

const pageMap = {
  projects: 'projects.py',
  about: 'about-me.jsx',
  skills: 'skills.js',
  education: 'education.json',
  experience: 'experience.md',
  contact: 'contact.css',
};

const themeMap = {
  dracula: 'theme-dracula',
  github: 'theme-github-light',
  monokai: 'theme-monokai',
  midnight: '',
  dark: 'theme-dark-plus',
  'dark+': 'theme-dark-plus',
};

/**
 * The interactive VS Code window. Fills whatever box it is placed in.
 * `onExit` is called by the terminal `exit` command (scrolls past the editor).
 */
const EditorWindow = ({ onExit }) => {
  const [openFiles, setOpenFiles] = useState(['about-me.jsx']);
  const [activeFile, setActiveFile] = useState('about-me.jsx');
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState('');
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  // The command palette can switch the editor theme from anywhere on the page.
  useEffect(() => {
    const onTheme = (e) => setTheme(e.detail ?? '');
    window.addEventListener('nv:theme', onTheme);
    return () => window.removeEventListener('nv:theme', onTheme);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOpenFile = (fileName) => {
    if (!openFiles.includes(fileName)) setOpenFiles([...openFiles, fileName]);
    setActiveFile(fileName);
  };

  const handleCloseTab = (fileName) => {
    const newFiles = openFiles.filter((f) => f !== fileName);
    setOpenFiles(newFiles);
    if (activeFile === fileName) setActiveFile(newFiles.length ? newFiles[newFiles.length - 1] : null);
  };

  const handleTerminalCommand = (command, param) => {
    if (command === 'open') {
      const fileName = pageMap[param.toLowerCase()] || param;
      if (Object.values(pageMap).includes(fileName)) {
        handleOpenFile(fileName);
        return true;
      }
      return false;
    }
    if (command === 'theme') {
      const key = param.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(themeMap, key)) {
        setTheme(themeMap[key]);
        return true;
      }
      return false;
    }
    if (command === 'exit') {
      onExit?.();
      return true;
    }
    return false;
  };

  const renderPage = () => {
    if (!activeFile) return <div className="flex items-center justify-center h-full text-gray-500">No file is open</div>;
    switch (activeFile) {
      case 'projects.py': return <Projects />;
      case 'skills.js': return <Skills />;
      case 'education.json': return <Education />;
      case 'experience.md': return <Experience />;
      case 'contact.css': return <Contact />;
      default: return <About />;
    }
  };

  const language = activeFile?.endsWith('.py') ? 'Python'
    : activeFile?.endsWith('.md') ? 'Markdown'
    : activeFile?.endsWith('.json') ? 'JSON'
    : activeFile?.endsWith('.css') ? 'CSS'
    : 'JavaScript React';

  return (
    <div className={`editor-root flex flex-col h-full w-full bg-vscode-bg font-mono relative overflow-hidden text-vscode-text ${theme}`}>
      {/* Title bar */}
      <div className="h-9 shrink-0 bg-vscode-activitybar flex items-center justify-between pl-3 text-xs text-gray-400 select-none border-b border-black/30">
        <div className="hidden md:flex items-center gap-4">
          {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map((m) => (
            <span key={m} className="hover:text-white cursor-default">{m}</span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event('nv:palette'))}
          className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 hover:border-white/25 hover:text-gray-200 transition-colors min-w-0 md:min-w-[260px] justify-center"
          aria-label="Open command palette"
        >
          <VscSearch className="shrink-0" />
          <span className="truncate">nv_portfolio</span>
          <kbd className="hidden md:inline ml-2 text-[10px] text-gray-500">Ctrl K</kbd>
        </button>
        <div className="flex items-center h-full" aria-hidden="true">
          <span className="h-full px-3 flex items-center hover:bg-white/10"><VscChromeMinimize /></span>
          <span className="h-full px-3 flex items-center hover:bg-white/10"><VscChromeMaximize /></span>
          <span className="h-full px-3 flex items-center hover:bg-red-600 hover:text-white"><VscChromeClose /></span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1 min-h-0 relative">
        <Sidebar onOpenFile={handleOpenFile} isMobile={isMobile} onThemeChange={setTheme} activeTheme={theme} />
        <div className="flex flex-col flex-1 min-h-0 min-w-0">
          <TabBar openFiles={openFiles} activeFile={activeFile} onTabClick={setActiveFile} onCloseTab={handleCloseTab} />

          <div className="bg-vscode-sidebar h-6 flex items-center px-4 text-xs text-gray-400 shrink-0">
            {activeFile ? `src > pages > ${activeFile}` : ''}
          </div>

          <main className="flex-1 bg-vscode-editor overflow-y-auto p-2 md:p-6 relative">
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

          <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} onCommand={handleTerminalCommand} />
        </div>
      </div>

      <footer className="bg-vscode-statusbar h-6 flex items-center justify-between px-3 text-xs text-white shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><VscSourceControl /> main</span>
          <span className="flex items-center gap-1"><VscWarning /> 0</span>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="hover:bg-white/20 px-1 rounded" onClick={() => setIsTerminalOpen(!isTerminalOpen)}>
            {isTerminalOpen ? 'Hide Terminal' : 'Show Terminal'}
          </button>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden sm:inline">{language}</span>
        </div>
      </footer>
    </div>
  );
};

export default EditorWindow;
