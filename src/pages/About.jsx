import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const About = () => {
  return (
    <div className="text-vscode-text">
      <h1 className="text-2xl font-bold mb-4 text-vscode-accent">NIDHIN V</h1>
      <div className="text-lg">
        <TypeAnimation
          sequence={[`// Full Stack Developer & AI Research Intern with experience building scalable web applications and AI-driven solutions.
// Skilled in Python, Django, React, SQL, and cloud-based integrations.
// Experienced in leveraging AI/ML research and modern APIs to create data-driven digital products.`,
            1000,
          ]}
          wrapper="pre"
          speed={80}
          style={{ whiteSpace: 'pre-wrap', display: 'inline-block' }}
          repeat={0}
          cursor={true}
        />
      </div>
    </div>
  );
};

export default About;



