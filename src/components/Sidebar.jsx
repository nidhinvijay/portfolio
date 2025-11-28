import React, { useState } from 'react';
import { VscFiles, VscSearch, VscSourceControl, VscDebugAlt, VscExtensions, VscAccount, VscSettingsGear, VscMenu, VscClose, VscChevronRight, VscChevronDown } from 'react-icons/vsc';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ onOpenFile, isMobile, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

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
    <div className="w-12 bg-vscode-activitybar flex flex-col items-center py-4 space-y-4 text-gray-400 shrink-0 z-20">
      <VscFiles className="text-2xl text-white cursor-pointer border-l-2 border-white pl-2" onClick={() => isMobile && toggleSidebar()} />
      <VscSearch className="text-2xl hover:text-white cursor-pointer opacity-50" />
      <VscSourceControl className="text-2xl hover:text-white cursor-pointer opacity-50" />
      <VscDebugAlt className="text-2xl hover:text-white cursor-pointer opacity-50" />
      <VscExtensions className="text-2xl hover:text-white cursor-pointer opacity-50" />
      <div className="flex-1"></div>
      <VscAccount className="text-2xl hover:text-white cursor-pointer opacity-50" />
      
      <div className="relative">
        <VscSettingsGear 
          className="text-2xl hover:text-white cursor-pointer" 
          onClick={() => setShowSettings(!showSettings)}
        />
        {showSettings && (
          <div className="absolute bottom-8 left-8 w-48 bg-vscode-sidebar border border-black/20 shadow-xl rounded-md overflow-hidden z-50">
            <div className="p-2 text-xs font-bold text-gray-500 border-b border-gray-700">Color Theme</div>
            <div className="hover:bg-vscode-hover px-4 py-2 cursor-pointer text-sm text-white" onClick={() => { onThemeChange(''); setShowSettings(false); }}>Dark+ (Default)</div>
            <div className="hover:bg-vscode-hover px-4 py-2 cursor-pointer text-sm text-white" onClick={() => { onThemeChange('theme-dracula'); setShowSettings(false); }}>Dracula</div>
            <div className="hover:bg-vscode-hover px-4 py-2 cursor-pointer text-sm text-white" onClick={() => { onThemeChange('theme-github-light'); setShowSettings(false); }}>GitHub Light</div>
            <div className="hover:bg-vscode-hover px-4 py-2 cursor-pointer text-sm text-white" onClick={() => { onThemeChange('theme-monokai'); setShowSettings(false); }}>Monokai</div>
          </div>
        )}
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