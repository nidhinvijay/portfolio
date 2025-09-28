import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const About = () => {
  return (
    <div className="text-vscode-text">
      <h1 className="text-2xl font-bold mb-4 text-vscode-accent">NIDHIN V</h1>
      <div className="text-lg">
        <TypeAnimation
          sequence={[
            `// Full Stack Developer with internship experience specializing in the Python-Django ecosystem.
// Proven ability to build, test, and deploy full-stack web applications, with a strong focus on creating efficient backend systems and responsive user interfaces.`,
            1000,
          ]}
          wrapper="pre"
          speed={50}
          style={{ whiteSpace: 'pre-wrap', display: 'inline-block' }}
          repeat={0}
          cursor={true}
        />
      </div>
    </div>
  );
};

export default About;