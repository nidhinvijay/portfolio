import React from 'react';

const Skills = () => {
  return (
    <div className="p-8 text-vscode-text font-mono">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400">My Technical Skills</h1>
      <div>
        <p><span className="text-blue-400">const</span> <span className="text-green-400">backend</span> = [<span className="text-orange-400">'Django', 'Django REST Framework', 'JWT Authentication', 'Celery', 'Machine Learning', 'NLP', 'Firebase'</span>];</p>
        <p><span className="text-blue-400">const</span> <span className="text-green-400">frontend</span> = [<span className="text-orange-400">'HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS'</span>];</p>
        <p><span className="text-blue-400">const</span> <span className="text-green-400">databases</span> = [<span className="text-orange-400">'SQLite', 'PostgreSQL', 'Oracle (SQL*Plus)'</span>];</p>
        <p><span className="text-blue-400">const</span> <span className="text-green-400">languages</span> = [<span className="text-orange-400">'Python', 'Java' ,'SQL'</span>];</p>
        <p><span className="text-blue-400">const</span> <span className="text-green-400">tools</span> = [<span className="text-orange-400">'Git', 'GitHub', 'Docker', 'API Integration', 'Twilio', 'WebRTC', 'Google Cloud', 'Postman'</span>];</p>
      </div>
    </div>
  );
};

export default Skills;