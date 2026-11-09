import React, { useState, useEffect, useRef } from 'react';
import { VscChromeClose } from 'react-icons/vsc';

const Terminal = ({ isOpen, onClose, onCommand }) => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Nidhin\'s Portfolio Terminal 🚀' },
    { type: 'output', content: '' },
    { type: 'output', content: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // Keep the log pinned to the bottom without scrolling the page itself.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [isOpen, history]);

  const handleCommand = (cmd) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    const param = args.slice(1).join(' ');

    let output = '';

    switch (command) {
      case 'help':
        output = `Available commands:
  help            - Show this help message
  clear           - Clear terminal history
  ls              - List available pages
  open [page]     - Open a page (e.g., "open projects")
  theme [name]    - Switch theme (midnight, dark, dracula, github, monokai)
  about           - Show about info
  whoami          - Display current user
  npm run nv_portfolio - Rebuild the portfolio
  exit            - Close the editor and see the work`;
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'ls':
        output = 'about-me.jsx  projects.py  experience.md  skills.js  education.json  contact.css';
        break;
      case 'open':
        if (onCommand('open', param)) {
          output = `Opening ${param}...`;
        } else {
          output = `Page "${param}" not found. Type "ls" to see available pages.`;
        }
        break;
      case 'theme':
        if (onCommand('theme', param)) {
          output = `Switched theme to ${param}.`;
        } else {
          output = `Theme "${param}" not found. Available: midnight, dark, dracula, github, monokai.`;
        }
        break;
      case 'npm':
        output = param.trim() === 'run nv_portfolio'
          ? `> nv_portfolio@2.0.0 dev
> vite

  ready in 312 ms  ->  you are already looking at it.`
          : `npm: unknown command "${param}". Try "npm run nv_portfolio".`;
        break;
      case 'exit':
        onCommand('exit');
        output = 'Closing editor...';
        break;
      case 'whoami':
        output = 'visitor@portfolio';
        break;
      case 'about':
        output = 'Nidhin Vijay - Full Stack Developer';
        break;
      case '':
        break;
      default:
        output = `'${command}' is not recognized as an internal or external command.`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', content: `visitor@portfolio:~$ ${cmd}` },
      { type: 'output', content: output }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="h-44 bg-vscode-sidebar border-t border-vscode-activitybar flex flex-col text-vscode-text font-mono text-sm">
      <div className="flex justify-between items-center px-4 py-1 bg-vscode-activitybar text-xs uppercase tracking-wider">
        <span>Terminal</span>
        <VscChromeClose className="cursor-pointer hover:text-white" onClick={onClose} />
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
        {history.map((line, i) => (
          <div key={i} className={`mb-1 ${line.type === 'input' ? 'text-vscode-text' : 'text-gray-400 whitespace-pre-wrap'}`}>
            {line.content}
          </div>
        ))}
        <div className="flex items-center">
          <span className="mr-2 text-green-400">visitor@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-vscode-text"
            spellCheck="false"
            autoComplete="off"
            aria-label="Terminal command"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
