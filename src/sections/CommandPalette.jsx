import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { VscArrowRight, VscFile, VscSymbolColor, VscTerminal, VscGithub, VscMail, VscCopy, VscCloudDownload, VscLinkExternal } from 'react-icons/vsc';
import { gsap, getLenis, jumps, scrollToTarget, shortcutLabel } from '../lib/motion';
import { profile, projects } from '../data/content';


/** Subsequence match with a bonus for word starts and contiguous runs. */
function score(query, text) {
  if (!query) return 1;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let ti = 0, s = 0, run = 0;
  for (const ch of q) {
    const found = t.indexOf(ch, ti);
    if (found === -1) return 0;
    run = found === ti ? run + 1 : 0;
    s += 1 + run * 2 + (found === 0 || /[\s_\-./]/.test(t[found - 1]) ? 3 : 0);
    ti = found + 1;
  }
  return s - t.length * 0.01;
}

const go = (target, duration = 2.4) => {
  const y = typeof target === 'function' ? target() : target;
  if (y == null) return;
  scrollToTarget(y, { duration, force: true });
};

const Toast = ({ text }) =>
  createPortal(
    <div role="status" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] px-4 py-2 rounded-full bg-ink-2 outline outline-1 outline-line text-sm text-fg shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)]">
      {text}
    </div>,
    document.body
  );

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const panelRef = useRef(null);
  const lastFocus = useRef(null);

  const notify = useCallback((text) => {
    setToast(text);
    clearTimeout(notify.t);
    notify.t = setTimeout(() => setToast(null), 1800);
  }, []);

  const commands = useMemo(() => {
    const theme = (label, value) => ({
      group: 'Editor theme', label: `Theme: ${label}`, icon: VscSymbolColor,
      run: () => { window.dispatchEvent(new CustomEvent('nv:theme', { detail: value })); notify(`Editor theme: ${label}`); },
    });
    return [
      { group: 'Go to', label: 'Top', hint: 'intro', icon: VscArrowRight, run: () => go(0, 2.8) },
      { group: 'Go to', label: 'Open the editor', hint: 'live VS Code', icon: VscTerminal, run: () => go(jumps.editor) },
      { group: 'Go to', label: 'Fall into the black hole', hint: 'skip to work', icon: VscArrowRight, run: () => go('#work', 3.2) },
      { group: 'Go to', label: 'Timeline', hint: 'git log', icon: VscArrowRight, run: () => go('#timeline') },
      { group: 'Go to', label: 'Toolbox', hint: 'skills', icon: VscArrowRight, run: () => go('#stack') },
      { group: 'Go to', label: 'Contact', icon: VscArrowRight, run: () => go('#contact') },
      ...projects.map((p, i) => ({
        group: 'Projects', label: p.name, hint: p.file, icon: VscFile,
        run: () => go(() => jumps.project?.(i) ?? '#work'),
      })),
      {
        group: 'Actions', label: 'Copy email', hint: profile.email, icon: VscCopy,
        run: async () => {
          try { await navigator.clipboard.writeText(profile.email); notify('Email copied'); }
          catch { notify(profile.email); }
        },
      },
      { group: 'Actions', label: 'Download resume', hint: 'PDF', icon: VscCloudDownload, run: () => { const a = document.createElement('a'); a.href = profile.resume; a.download = ''; a.click(); } },
      { group: 'Actions', label: 'Send an email', icon: VscMail, run: () => { window.location.href = `mailto:${profile.email}`; } },
      { group: 'Actions', label: 'Open GitHub', hint: 'github.com/nidhinvijay', icon: VscGithub, run: () => window.open(profile.github, '_blank', 'noopener') },
      { group: 'Actions', label: 'Open LinkedIn', icon: VscLinkExternal, run: () => window.open(profile.linkedin, '_blank', 'noopener') },
      theme('Midnight', ''),
      theme('Dark+', 'theme-dark-plus'),
      theme('Dracula', 'theme-dracula'),
      theme('Monokai', 'theme-monokai'),
      theme('GitHub Light', 'theme-github-light'),
    ];
  }, [notify]);

  const results = useMemo(() => {
    const q = query.trim().replace(/^>\s*/, '');
    return commands
      .map((c) => ({ c, s: Math.max(score(q, c.label), score(q, `${c.group} ${c.label}`) * 0.8, c.hint ? score(q, c.hint) * 0.6 : 0) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => (q ? b.s - a.s : 0))
      .map((r) => r.c);
  }, [commands, query]);

  const close = useCallback(() => setOpen(false), []);

  // Open / close shortcuts, plus the editor title-bar button.
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (((e.ctrlKey || e.metaKey) && k === 'k') || ((e.ctrlKey || e.metaKey) && e.shiftKey && k === 'p')) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('nv:palette', onOpen);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('nv:palette', onOpen); };
  }, []);

  // Freeze page scroll, focus the input, animate in; restore on close.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lastFocus.current = document.activeElement;
      setQuery('');
      setActive(0);
      lenis?.stop();
      requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
      gsap.fromTo(panelRef.current, { y: -12, scale: 0.98, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.35, ease: 'expo.out' });
    } else {
      lenis?.start();
      lastFocus.current?.focus?.({ preventScroll: true });
    }
  }, [open]);

  useEffect(() => { setActive(0); }, [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = (cmd) => {
    if (!cmd) return;
    setOpen(false);
    // Let the palette close (and scrolling resume) before moving the page.
    requestAnimationFrame(() => cmd.run());
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); run(results[active]); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'Tab') { e.preventDefault(); }
  };

  let lastGroup = null;

  return (
    <>
      {open && createPortal(
        <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[14vh] px-4" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="absolute inset-0 bg-ink-0/60 pointer-events-none" aria-hidden="true" />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-[640px] rounded-xl bg-ink-1 outline outline-1 outline-line shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden font-code"
          >
            <div className="flex items-center gap-3 px-4 h-14 border-b border-line">
              <span className="text-accent text-sm" aria-hidden="true">&gt;</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Jump to a section, project or action…"
                className="flex-1 bg-transparent outline-none text-[15px] text-fg placeholder:text-fg-faint"
                role="combobox"
                aria-expanded="true"
                aria-controls="nv-palette-list"
                aria-activedescendant={results[active] ? `nv-cmd-${active}` : undefined}
                spellCheck="false"
                autoComplete="off"
              />
              <kbd className="text-[11px] text-fg-faint px-1.5 py-0.5 rounded border border-line">esc</kbd>
            </div>

            <ul id="nv-palette-list" ref={listRef} role="listbox" className="max-h-[52vh] overflow-y-auto py-2" data-lenis-prevent>
              {results.length === 0 && (
                <li className="px-4 py-6 text-sm text-fg-muted">No matches for “{query}”. Try “projects”, “theme” or “resume”.</li>
              )}
              {results.map((c, i) => {
                const header = !query && c.group !== lastGroup ? c.group : null;
                lastGroup = c.group;
                const Icon = c.icon;
                return (
                  <React.Fragment key={`${c.group}-${c.label}`}>
                    {header && <li role="presentation" className="px-4 pt-3 pb-1 text-[11px] text-fg-faint">{header}</li>}
                    <li
                      id={`nv-cmd-${i}`}
                      data-idx={i}
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => run(c)}
                      className={`mx-2 px-3 h-10 rounded-md flex items-center gap-3 text-sm cursor-pointer ${i === active ? 'bg-ink-2 text-fg' : 'text-fg-muted'}`}
                    >
                      <Icon className={`shrink-0 ${i === active ? 'text-accent' : 'text-fg-faint'}`} aria-hidden="true" />
                      <span className="truncate">{c.label}</span>
                      {c.hint && <span className="ml-auto pl-4 truncate text-xs text-fg-faint">{c.hint}</span>}
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 px-4 h-10 border-t border-line text-[11px] text-fg-faint">
              <span>↑↓ navigate</span><span>↵ select</span><span className="ml-auto">{shortcutLabel} to toggle</span>
            </div>
          </div>
        </div>,
        document.body
      )}
      {toast && <Toast text={toast} />}
    </>
  );
};

export default CommandPalette;
