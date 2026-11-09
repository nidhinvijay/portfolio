import React, { useRef } from 'react';
import { gsap, useGSAP, scrollToTarget, shortcutLabel } from '../lib/motion';
import { profile } from '../data/content';

const links = [['Work', '#work'], ['Timeline', '#timeline'], ['Toolbox', '#stack'], ['Contact', '#contact']];

const Nav = () => {
  const bar = useRef(null);

  useGSAP(() => {
    gsap.to(bar.current.querySelector('[data-scroll-progress]'), {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });
  }, { scope: bar });

  const go = (e, href) => {
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <header ref={bar} className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div className="h-[2px] bg-transparent">
        <div data-scroll-progress className="h-full bg-accent origin-left scale-x-0" />
      </div>
      <nav className="flex items-center justify-between px-5 md:px-10 h-14 md:h-16 bg-gradient-to-b from-ink-0 via-ink-0/70 to-transparent" aria-label="Primary">
        <a href="#top" onClick={(e) => go(e, 0)} className="pointer-events-auto font-display font-bold text-xl tracking-[-0.04em]" aria-label={`${profile.name}, back to top`}>
          nv<span className="text-accent">_</span>
        </a>
        <div className="pointer-events-auto flex items-center gap-1 md:gap-2 text-sm">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={(e) => go(e, h)} className="hidden md:inline-flex px-3 py-1.5 rounded-full text-fg-muted hover:text-fg transition-colors">{l}</a>
          ))}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('nv:palette'))}
            className="ml-1 inline-flex items-center gap-2 h-9 pl-3 pr-2 rounded-full border border-line bg-ink-0/80 text-fg-muted hover:text-fg hover:border-fg-faint transition-colors"
            aria-label="Open command palette"
          >
            <span className="hidden md:inline">Search</span>
            <kbd className="font-code text-[11px] px-1.5 py-0.5 rounded-full bg-ink-2 text-fg-muted">{shortcutLabel}</kbd>
          </button>
          <a href={profile.resume} download className="ml-2 inline-flex items-center h-9 px-4 rounded-full border border-line bg-ink-0/80 hover:border-accent hover:text-accent transition-colors">
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
