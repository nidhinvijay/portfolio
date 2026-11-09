import React from 'react';
import { motion } from 'framer-motion';

import { projects } from '../data/content';

const Projects = () => {
  return (
    <div className="text-vscode-text p-8">
      <h1 className="text-2xl font-bold mb-6"><span className="text-purple-400">class</span> <span className="text-orange-400">MyProjects</span>:</h1>
      <div className="ml-4">
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="mb-6 p-4 rounded-lg border border-transparent hover:border-vscode-accent hover:bg-vscode-sidebar transition-colors duration-300"
            whileHover={{ scale: 1.02, x: 10, boxShadow: "0px 0px 8px rgba(0, 122, 204, 0.5)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-lg"><span className="text-blue-400">def</span> <span className="text-green-400">{project.name.replace(/\W+/g, '_')}</span>():</p>
            <div className="ml-8 border-l-2 border-gray-600 pl-4">
              <p><span className="text-purple-400">description</span> = <span className="text-yellow-300">"{project.description}"</span></p>
              <p><span className="text-purple-400">stack</span> = <span className="text-yellow-300">{JSON.stringify(project.stack)}</span></p>
              <p>
                <span className="text-purple-400">repo_url</span> ={' '}
                {project.isPrivate ? (
                  <span className="text-gray-500 italic">"private"</span>
                ) : project.links ? (
                  <span className="space-x-2">
                    {project.links.map((l, i) => (
                      <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-vscode-accent">
                        "{l.label}"
                      </a>
                    ))}
                  </span>
                ) : (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-vscode-accent">
                    "{project.link}"
                  </a>
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;