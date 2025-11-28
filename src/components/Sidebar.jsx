import React, { useState } from 'react';
import { VscFiles, VscSearch, VscSourceControl, VscDebugAlt, VscExtensions, VscAccount, VscSettingsGear, VscMenu, VscClose } from 'react-icons/vsc';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ setPage, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handlePageChange = (page) => {
    setPage(page);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const SidebarContent = () => (
    <div className="w-64 bg-vscode-sidebar text-vscode-text flex flex-col h-full border-r border-black/20">
      <div className="p-4 text-xs font-bold tracking-widest text-gray-400">EXPLORER</div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-1 cursor-pointer hover:bg-vscode-hover hover:text-white flex items-center" onClick={() => handlePageChange('about')}>
          <VscFiles className="mr-2 text-yellow-400" /> about-me.jsx
        </div>
        <div className="px-4 py-1 cursor-pointer hover:bg-vscode-hover hover:text-white flex items-center" onClick={() => handlePageChange('projects')}>
          <VscFiles className="mr-2 text-blue-400" /> projects.py
        </div>
        <div className="px-4 py-1 cursor-pointer hover:bg-vscode-hover hover:text-white flex items-center" onClick={() => handlePageChange('experience')}>
          <VscFiles className="mr-2 text-purple-400" /> experience.md
        </div>
        <div className="px-4 py-1 cursor-pointer hover:bg-vscode-hover hover:text-white flex items-center" onClick={() => handlePageChange('skills')}>
          <VscFiles className="mr-2 text-yellow-300" /> skills.js
        </div>
        <div className="px-4 py-1 cursor-pointer hover:bg-vscode-hover hover:text-white flex items-center" onClick={() => handlePageChange('education')}>
          <VscFiles className="mr-2 text-green-400" /> education.json
        </div>
        <div className="px-4 py-1 cursor-pointer hover:bg-vscode-hover hover:text-white flex items-center" onClick={() => handlePageChange('contact')}>
          <VscFiles className="mr-2 text-pink-400" /> contact.css
        </div>
      </div>
    </div>
  );

  const IconsBar = () => (
    <div className="w-12 bg-vscode-activitybar flex flex-col items-center py-4 space-y-4 text-gray-400">
      <VscFiles className="text-2xl text-white cursor-pointer" onClick={() => isMobile && toggleSidebar()} />
      <VscSearch className="text-2xl hover:text-white cursor-pointer" />
      <VscSourceControl className="text-2xl hover:text-white cursor-pointer" />
      <VscDebugAlt className="text-2xl hover:text-white cursor-pointer" />
      <VscExtensions className="text-2xl hover:text-white cursor-pointer" />
      <div className="flex-1"></div>
      <VscAccount className="text-2xl hover:text-white cursor-pointer" />
      <VscSettingsGear className="text-2xl hover:text-white cursor-pointer" />
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