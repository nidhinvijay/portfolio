import React, { useState } from 'react';
import { VscFiles, VscMenu, VscClose, VscChevronDown, VscCheck, VscSymbolColor, VscSettingsGear } from 'react-icons/vsc';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';


// Reusable activity bar icon with hover tooltip
const ActivityIcon = ({ children, label, onClick, active = false }) => (
  <div className="relative group flex items-center w-full justify-center py-2 cursor-pointer" onClick={onClick}>
    <div className={`flex items-center justify-center w-full transition-colors duration-150
      ${active ? 'text-white border-l-2 border-white' : 'text-gray-400 hover:text-white border-l-2 border-transparent'}`}>
      {children}
    </div>
    {/* Tooltip */}
    <div className="pointer-events-none absolute left-full ml-2 px-2 py-1 bg-vscode-sidebar border border-black/20 text-white text-xs rounded shadow-lg whitespace-nowrap
      opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-150 z-50">
      {label}
    </div>
  </div>
);

const Sidebar = ({ onOpenFile, isMobile, onThemeChange, activeTheme }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [show404, setShow404] = useState(false);

  const themes = [
    { label: 'Dark+',        value: '',                   swatch: '#007acc' },
    { label: 'Dracula',      value: 'theme-dracula',      swatch: '#bd93f9' },
    { label: 'GitHub Light', value: 'theme-github-light', swatch: '#0366d6' },
    { label: 'Monokai',      value: 'theme-monokai',      swatch: '#a6e22e' },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleFileClick = (file) => {
    onOpenFile(file);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const SidebarContent = () => (
    <div className="w-64 bg-vscode-sidebar text-vscode-text flex flex-col h-full border-r border-black/20">
      <div className="p-4 text-xs font-bold tracking-widest text-gray-400 flex justify-between items-center">
        <span>EXPLORER</span>
        <VscClose className="md:hidden cursor-pointer" onClick={toggleSidebar} />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="px-2 py-1 text-sm font-bold flex items-center cursor-pointer hover:bg-vscode-hover">
          <VscChevronDown className="mr-1" /> PORTFOLIO
        </div>
        <div className="px-4 py-1 cursor-pointer hover:bg-vscode-hover hover:text-white flex items-center text-sm" onClick={() => handleFileClick('about-me.jsx')}>
          <VscFiles className="mr-2 text-yellow-400" /> about-me.jsx
        </div>
        <div className="px-4 py-1 cursor-pointer hover:bg-vscode-hover hover:text-white flex items-center text-sm" onClick={() => handleFileClick('projects.py')}>
          <VscFiles className="mr-2 text-blue-400" /> projects.py
        </div>
        <div className="px-4 py-1 cursor-pointer hover:bg-vscode-hover hover:text-white flex items-center text-sm" onClick={() => handleFileClick('experience.md')}>
          <VscFiles className="mr-2 text-purple-400" /> experience.md
        </div>
        <div className="px-4 py-1 cursor-pointer hover:bg-vscode-hover hover:text-white flex items-center text-sm" onClick={() => handleFileClick('skills.js')}>
          <VscFiles className="mr-2 text-yellow-300" /> skills.js
        </div>
        <div className="px-4 py-1 cursor-pointer hover:bg-vscode-hover hover:text-white flex items-center text-sm" onClick={() => handleFileClick('education.json')}>
          <VscFiles className="mr-2 text-green-400" /> education.json
        </div>
        <div className="px-4 py-1 cursor-pointer hover:bg-vscode-hover hover:text-white flex items-center text-sm" onClick={() => handleFileClick('contact.css')}>
          <VscFiles className="mr-2 text-pink-400" /> contact.css
        </div>
      </div>
    </div>
  );

  const IconsBar = () => (
    <div className="w-12 bg-vscode-activitybar flex flex-col items-center py-4 space-y-1 text-gray-400 shrink-0 z-20">

      {/* Explorer */}
      <ActivityIcon label="Explorer" onClick={() => isMobile && toggleSidebar()} active>
        <VscFiles className="text-2xl" />
      </ActivityIcon>

      {/* GitHub */}
      <ActivityIcon label="GitHub" onClick={() => window.open('https://github.com/nidhinvijay', '_blank')}>
        <FaGithub className="text-2xl" />
      </ActivityIcon>

      {/* LinkedIn */}
      <ActivityIcon label="LinkedIn" onClick={() => window.open('https://www.linkedin.com/in/nidhin-v-807353341/', '_blank')}>
        <FaLinkedin className="text-2xl" />
      </ActivityIcon>

      {/* Email */}
      <ActivityIcon label="Email Me" onClick={() => window.open('mailto:nidhinvijaynv@gmail.com')}>
        <MdEmail className="text-2xl" />
      </ActivityIcon>

      {/* Theme — inline with the others now */}
      <div className="relative w-full flex flex-col items-center">
        <ActivityIcon label="Color Theme" onClick={() => setShowSettings(!showSettings)}>
          <VscSymbolColor className="text-2xl" />
        </ActivityIcon>
        <AnimatePresence>
          {showSettings && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)} />
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-0 left-full ml-2 w-52 bg-vscode-sidebar border border-black/30 shadow-2xl rounded-md overflow-hidden z-50"
              >
                <div className="px-3 py-2 text-xs font-bold text-gray-500 border-b border-gray-700 tracking-widest uppercase">Color Theme</div>
                {themes.map((t) => (
                  <div
                    key={t.value}
                    className="flex items-center gap-3 hover:bg-vscode-hover px-3 py-2 cursor-pointer text-sm text-white"
                    onClick={() => { onThemeChange(t.value); setShowSettings(false); }}
                  >
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: t.swatch }} />
                    <span className="flex-1">{t.label}</span>
                    {activeTheme === t.value && <VscCheck className="text-vscode-accent" />}
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1" />

      {/* Settings — 404 easter egg */}
      <div className="relative w-full flex flex-col items-center">
        <ActivityIcon label="Settings" onClick={() => setShow404(!show404)}>
          <VscSettingsGear className="text-2xl" />
        </ActivityIcon>
        <AnimatePresence>
          {show404 && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShow404(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute bottom-0 left-full ml-2 w-56 bg-vscode-sidebar border border-black/30 shadow-2xl rounded-md overflow-hidden z-50 p-4 text-center"
              >
                <div className="text-4xl mb-2">⚙️</div>
                <div className="text-vscode-accent font-bold text-lg">404</div>
                <div className="text-gray-400 text-sm mt-1">Nothing here.🙂</div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Header Bar */}
        <div className="h-12 bg-vscode-activitybar flex items-center px-4 md:hidden shrink-0">
          <VscMenu className="text-2xl text-white cursor-pointer" onClick={toggleSidebar} />
          <span className="ml-4 text-white font-bold">Portfolio</span>
        </div>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={toggleSidebar}
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'spring', damping: 20 }}
                className="fixed inset-y-0 left-0 z-50 flex h-full"
              >
                <IconsBar />
                <SidebarContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div className="flex h-full shrink-0">
      <IconsBar />
      <SidebarContent />
    </div>
  );
};

export default Sidebar;