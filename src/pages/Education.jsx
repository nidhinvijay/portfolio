import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
  return (
    <div className="p-8 text-vscode-text font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.pre 
          className="p-4 rounded hover:bg-vscode-sidebar border border-transparent hover:border-orange-400 transition-all duration-300"
          whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(251, 146, 60, 0.3)" }}
        >
          <code>
{`{
  "education": [
    {
      "degree": "Master of Computer Application",
      "university": "University of Kerala",
      "expected": "July 2025"
    }
  ],
  "certifications": [
    {
      "name": "Data Analysis with Python",
      "year": "2025"
    },
    {
      "name": "Machine Learning with Python",
      "year": "2024"
    }
  ]
}`}
          </code>
        </motion.pre>
      </motion.div>
    </div>
  );
};

export default Education;