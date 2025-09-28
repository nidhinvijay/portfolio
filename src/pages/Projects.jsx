import React from 'react';

const projects = [
  {
    name: 'BookHub',
    description: 'Developed a full-featured library management system with Django, featuring secure user authentication and Google Books API integration.',
    stack: ['Django', 'Google Books API', 'SQLite'],
    link: 'https://github.com/nidhinvijay/BookHub'
  },
  {
    name: 'AI_Interview_Bot',
    description: 'Engineered an intelligent recruitment platform using React and Django to automate initial candidate interviews with AI/ML.',
    stack: ['React', 'Django', 'AI/ML', 'NLP'],
    link: 'https://github.com/nidhinvijay/AI_Interview_Bot'
  },
  {
    name: 'voice_guard',
    description: 'A real-time voice authentication system using WebRTC for live audio capture and machine learning for speaker verification, deployed on Google Cloud.',
    stack: ['Python', 'WebRTC', 'Machine Learning', 'Google Cloud'],
    link: 'https://github.com/nidhinvijay/voice_guard'
  },
   {
    name: 'Textlytics',
    description: 'A web application for text analysis, providing insights and statistics about any given text.',
    stack: ['Python', 'Django', 'NLTK'],
    link: 'https://github.com/nidhinvijay/Textlytics'
  },
  {
    name: 'hr-ai-agent',
    description: 'An intelligent HR agent designed to assist with recruitment and employee management tasks using AI.',
    stack: ['Python', 'AI', 'NLP'],
    link: 'https://github.com/nidhinvijay/hr-ai-agent'
  },
  {
    name: 'meapi',
    description: 'A personal REST API service providing my data in a structured JSON format.',
    stack: ['Django', 'REST Framework'],
    link: 'https://github.com/nidhinvijay/meapi'
  },
  {
    name: 'PollSystem',
    description: 'A simple and effective polling system built with Django.',
    stack: ['Django', 'HTML', 'CSS'],
    link: 'https://github.com/nidhinvijay/PollSystem'
  },
    {
    name: 'URL_Shortener',
    description: 'A web service to shorten long URLs, similar to Bitly.',
    stack: ['Django', 'HTML', 'SQLite'],
    link: 'https://github.com/nidhinvijay/URL_Shortener'
  }
];

const Projects = () => {
  return (
    <div className="text-vscode-text">
      <h1 className="text-2xl font-bold mb-6"><span className="text-purple-400">class</span> <span className="text-yellow-400">MyProjects</span>:</h1>
      <div className="ml-4">
        {projects.map((project, index) => (
          <div key={index} className="mb-6">
            <p className="text-lg"><span className="text-blue-400">def</span> <span className="text-green-400">{project.name}</span>():</p>
            <div className="ml-8 border-l-2 border-gray-600 pl-4">
              <p><span className="text-purple-400">description</span> = <span className="text-orange-400">"{project.description}"</span></p>
              <p><span className="text-purple-400">stack</span> = <span className="text-orange-400">{JSON.stringify(project.stack)}</span></p>
              <p><span className="text-purple-400">repo_url</span> = <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-orange-400 underline hover:text-vscode-accent">"{project.link}"</a></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;