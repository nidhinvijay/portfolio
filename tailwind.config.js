/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // A few VS Code theme colors
        vscode: {
          bg: '#1e1e1e',
          sidebar: '#252526',
          editor: '#1e1e1e',
          activitybar: '#333333',
          statusbar: '#007acc',
          text: '#d4d4d4',
          accent: '#007acc',
        }
      }
    },
  },
  plugins: [],
}