/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Hanken Grotesk', 'system-ui', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        code: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        mono: ['"Fira Code"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: { 0: 'var(--ink-0)', 1: 'var(--ink-1)', 2: 'var(--ink-2)' },
        fg: { DEFAULT: 'var(--fg)', muted: 'var(--fg-muted)', faint: 'var(--fg-faint)' },
        line: 'var(--line)',
        accent: { DEFAULT: 'var(--accent)', ink: 'var(--accent-ink)' },
        vscode: {
          bg: 'var(--bg-vscode)',
          sidebar: 'var(--bg-sidebar)',
          activitybar: 'var(--bg-activitybar)',
          statusbar: 'var(--bg-statusbar)',
          editor: 'var(--bg-editor)',
          text: 'var(--text-primary)',
          hover: 'var(--bg-hover, #2a2d2e)',
          accent: 'var(--accent-color)',
        }
      },
    },
  },
  plugins: [],
}