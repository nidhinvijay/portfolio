import React from 'react';

const Contact = () => {
  return (
    <div className="p-8 text-vscode-text font-mono">
      <h1 className="text-2xl font-bold mb-6 text-green-400">/* Get in Touch */</h1>
      <div>
        <p><span className="text-purple-400">.contact-info</span> {'{'}</p>
        <div className="ml-4">
          <p><span className="text-blue-400">email</span>: <a href="mailto:nidhinvijaynv@gmail.com" className="text-orange-400 hover:underline">'nidhinvijaynv@gmail.com'</a>;</p>
          <p><span className="text-blue-400">linkedin</span>: <a href="https://www.linkedin.com/in/nidhin-v-807353341/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">'/in/nidhin-v-807353341'</a>;</p>
          <p><span className="text-blue-400">github</span>: <a href="https://github.com/nidhinvijay" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">'github.com/nidhinvijay'</a>;</p>
          <p><span className="text-blue-400">phone</span>: <a href="tel:+918921879091" className="text-orange-400 hover:underline">'+91 8921879091'</a>;</p>
        </div>
        <p>{'}'}</p>
      </div>
    </div>
  );
};

export default Contact;