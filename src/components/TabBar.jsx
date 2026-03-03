import React from 'react';
import { VscClose } from 'react-icons/vsc';
import { motion } from 'framer-motion';

const TabBar = ({ openFiles, activeFile, onTabClick, onCloseTab }) => {
  const getIconColor = (fileName) => {
    if (fileName.endsWith('.jsx')) return 'text-yellow-400';
    if (fileName.endsWith('.py')) return 'text-blue-400';
    if (fileName.endsWith('.md')) return 'text-purple-400';
    if (fileName.endsWith('.js')) return 'text-yellow-300';
    if (fileName.endsWith('.json')) return 'text-green-400';
    if (fileName.endsWith('.css')) return 'text-pink-400';
    return 'text-gray-400';
  };

  return (
    <div className="flex bg-vscode-activitybar h-9 overflow-x-auto shrink-0 border-b border-black/20 scrollbar-hide">
      {openFiles.map((file) => (
        <motion.div
          key={file}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0 }}
          className={`
            group flex items-center px-3 py-2 min-w-[120px] max-w-[200px] cursor-pointer text-sm border-r border-black/10
            ${activeFile === file ? 'bg-vscode-editor text-white border-t-2 border-t-vscode-accent' : 'bg-vscode-sidebar text-gray-400 hover:bg-vscode-hover'}
          `}
          onClick={() => onTabClick(file)}
        >
          <span className={`mr-2 ${getIconColor(file)}`}>
            {/* Simple icon placeholder based on extension */}
            {file.endsWith('.jsx') ? '⚛' : file.endsWith('.py') ? '🐍' : file.endsWith('.md') ? '📝' : file.endsWith('.json') ? '{}' : file.endsWith('.css') ? '#' : 'JS'}
          </span>
          <span className="truncate flex-1">{file}</span>
          <span 
            className={`ml-2 p-0.5 rounded-sm hover:bg-gray-600 ${activeFile === file ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            onClick={(e) => {
              e.stopPropagation();
              onCloseTab(file);
            }}
          >
            <VscClose />
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default TabBar;
