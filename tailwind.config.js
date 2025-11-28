/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: 'var(--bg-vscode)',
          sidebar: 'var(--bg-sidebar)',
          activitybar: 'var(--bg-activitybar)',
          statusbar: 'var(--bg-statusbar)',
          editor: 'var(--bg-editor)',
          text: 'var(--text-primary)',
          hover: '#2a2d2e',
          accent: 'var(--accent-color)',
        }
      },
    },
  },
  plugins: [],
}