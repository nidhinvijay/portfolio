import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/content';

const toIdent = (g) => g.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

const Skills = () => (
  <div className="p-8 text-vscode-text font-mono h-full flex flex-col">
    <h1 className="text-2xl font-bold mb-6 text-yellow-400">My Technical Skills</h1>
    <div>
      {skills.map((s) => (
        <motion.p key={s.group} className="mb-2 p-2 rounded hover:bg-vscode-sidebar">
          <span className="text-blue-400">const</span> <span className="text-green-400">{toIdent(s.group)}</span> = [
          <span className="text-orange-400">{s.items.map((it) => `'${it}'`).join(', ')}</span>];
        </motion.p>
      ))}
    </div>
  </div>
);

export default Skills;
