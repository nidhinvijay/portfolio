import React, { useRef, useState } from 'react';
import { FiArrowUpRight, FiCopy, FiCheck, FiDownload } from 'react-icons/fi';
import { VscSourceControl, VscCheck } from 'react-icons/vsc';
import { gsap, useGSAP, scrollToTarget } from '../lib/motion';
import { profile, skills } from '../data/content';

export const Stack = () => {
  const root = useRef(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-row]', {
          y: 28, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.07,
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="stack" ref={root} className="px-5 md:px-10 py-28 md:py-36 border-t border-line" aria-labelledby="stack-title">
      <div className="max-w-[1320px] mx-auto">
        <h2 id="stack-title" className="font-display font-semibold text-[clamp(2.25rem,5vw,4.25rem)] tracking-[-0.03em] leading-[0.95]">
          The toolbox.
        </h2>
        <dl className="mt-14">
          {skills.map((s) => (
            <div key={s.group} data-row className="grid md:grid-cols-[220px_1fr] gap-2 md:gap-10 py-6 border-t border-line">
              <dt className="text-sm text-fg-faint pt-2">{s.group}</dt>
              <dd className="font-display text-[clamp(1.35rem,2.4vw,2rem)] leading-snug tracking-[-0.015em]">
                {s.items.map((it, i) => (
                  <React.Fragment key={it}>
                    <span className="hover:text-accent transition-colors duration-200">{it}</span>
                    {i < s.items.length - 1 && <span className="text-fg-faint/60 mx-2.5" aria-hidden="true">/</span>}
                  </React.Fragment>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked: the mailto link still works */ }
  };

  return (
    <section id="contact" className="px-5 md:px-10 pt-28 md:pt-40 pb-16 border-t border-line" aria-labelledby="contact-title">
      <div className="max-w-[1320px] mx-auto">
        <h2 id="contact-title" className="font-display font-bold text-[clamp(3rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.035em] text-balance max-w-[12ch]">
          Let's build something <span className="text-accent">real-time.</span>
        </h2>

        <div className="mt-14 flex flex-wrap items-center gap-3">
          <a href={`mailto:${profile.email}`} className="font-display text-[clamp(1.25rem,3vw,2.25rem)] tracking-[-0.02em] underline decoration-line hover:decoration-accent underline-offset-[0.18em] transition-colors break-all">
            {profile.email}
          </a>
          <button type="button" onClick={copy} className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-line text-sm text-fg-muted hover:text-fg hover:border-fg-faint transition-colors" aria-live="polite">
            {copied ? <><FiCheck className="text-accent" aria-hidden="true" /> Copied</> : <><FiCopy aria-hidden="true" /> Copy email</>}
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href={profile.resume} download className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-accent text-accent-ink font-medium hover:brightness-110 transition">
            <FiDownload aria-hidden="true" /> Download resume
          </a>
          {[['GitHub', profile.github], ['LinkedIn', profile.linkedin]].map(([l, u]) => (
            <a key={l} href={u} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 h-12 px-6 rounded-full border border-line hover:border-fg-faint transition-colors">
              {l} <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* VS Code status bar, as a footer */}
      <footer className="mt-28 max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-3 font-code text-xs text-fg-faint border-t border-line pt-5">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><VscSourceControl aria-hidden="true" /> main</span>
          <span className="flex items-center gap-1.5"><VscCheck className="text-accent" aria-hidden="true" /> 0 problems</span>
          <span className="hidden sm:inline">React · GSAP · Lenis</span>
        </div>
        <div className="flex items-center gap-4">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <button type="button" onClick={() => scrollToTarget(0, { duration: 3 })} className="hover:text-fg transition-colors">Back to top ↑</button>
        </div>
      </footer>
    </section>
  );
};
