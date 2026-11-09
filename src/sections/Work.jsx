import React, { useRef, useState } from 'react';
import { FiArrowUpRight, FiLock } from 'react-icons/fi';
import { gsap, useGSAP, ScrollTrigger, jumps } from '../lib/motion';
import { projects } from '../data/content';

const Flow = ({ steps }) => (
  <ol className="flex flex-col items-start" aria-label="Architecture flow">
    {steps.map((s, i) => (
      <li key={s} className="flex flex-col items-start">
        <span
          className={`font-code text-[13px] px-3.5 py-2 rounded-lg border ${
            i === steps.length - 1 ? 'border-accent/60 text-accent' : 'border-line text-fg'
          } bg-ink-0`}
        >
          {s}
        </span>
        {i < steps.length - 1 && (
          <span className="relative ml-6 h-10 w-px bg-line overflow-visible" aria-hidden="true">
            <span
              className="packet absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full bg-accent"
              style={{ '--travel': '34px', animationDelay: `${i * 0.35}s` }}
            />
          </span>
        )}
      </li>
    ))}
  </ol>
);

const Panel = ({ p, i, total }) => {
  const links = p.links ?? [];
  return (
    <article
      data-panel
      className="shrink-0 w-full md:w-[min(1080px,80vw)] md:h-[min(620px,70svh)] rounded-2xl bg-ink-1 outline outline-1 outline-line flex flex-col overflow-hidden"
    >
      <header className="flex items-center justify-between px-5 md:px-8 h-12 border-b border-line font-code text-xs text-fg-muted">
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{p.file}</span>
        <span className="tabular">{String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </header>

      <div className="flex-1 grid md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] min-h-0">
        <div className="p-6 md:p-10 flex flex-col">
          <h3 className="font-display font-semibold text-[clamp(2rem,4.4vw,3.75rem)] leading-[0.95] tracking-[-0.03em] text-balance">{p.name}</h3>
          <p className="mt-3 text-fg-muted text-lg">{p.tagline}</p>
          <p className="mt-6 max-w-[58ch] text-fg/90 text-pretty">{p.description}</p>

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
            {p.stack.map((t) => (
              <li key={t} className="font-code text-xs px-2.5 py-1 rounded-md border border-line text-fg-muted">{t}</li>
            ))}
          </ul>

          <div className="mt-auto pt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {p.isPrivate && (
              <span className="inline-flex items-center gap-2 text-fg-faint"><FiLock aria-hidden="true" /> Private codebase</span>
            )}
            {links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-fg hover:text-accent transition-colors">
                {l.label}
                <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex border-l border-line p-10 items-center justify-center bg-[radial-gradient(120%_80%_at_70%_20%,rgba(198,242,90,0.06),transparent_60%)]">
          <Flow steps={p.flow} />
        </div>
      </div>
    </article>
  );
};

const Work = () => {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const track = root.current.querySelector('[data-track]');
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current.querySelector('[data-pin]'),
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            id: 'work-h',
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.round(self.progress * (projects.length - 1));
              setActive((cur) => (cur === idx ? cur : idx));
              gsap.set(root.current.querySelector('[data-progress]'), { scaleX: self.progress });
            },
          },
        });
      });
      // Jump straight to project i (palette). Desktop: a point along the horizontal scroll.
      jumps.project = (i) => {
        const st = ScrollTrigger.getById('work-h');
        if (st) return st.start + (st.end - st.start) * (i / (projects.length - 1));
        return root.current.querySelectorAll('[data-panel]')[i];
      };
      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('[data-panel]', root.current).forEach((el) => {
          gsap.from(el, { y: 40, autoAlpha: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="work" ref={root} aria-labelledby="work-title">
      <div data-pin className="md:h-[100svh] flex flex-col justify-center md:overflow-hidden py-20 md:pt-20 md:pb-6">
        <div className="px-5 md:px-10 mb-8 md:mb-10 flex items-end justify-between gap-6 max-w-[100vw]">
          <h2 id="work-title" className="font-display font-semibold text-[clamp(2rem,3.6vw,3rem)] tracking-[-0.03em] leading-none">Selected work</h2>
          <ul className="hidden lg:flex gap-1 font-code text-xs" aria-hidden="true">
            {projects.map((p, i) => (
              <li key={p.file} className={`px-2.5 py-1.5 rounded-md transition-colors duration-300 ${i === active ? 'bg-ink-2 text-fg' : 'text-fg-faint'}`}>
                {p.file}
              </li>
            ))}
          </ul>
        </div>

        <div data-track className="flex flex-col md:flex-row gap-5 md:gap-8 px-5 md:px-10 md:w-max will-change-transform">
          {projects.map((p, i) => <Panel key={p.name} p={p} i={i} total={projects.length} />)}
        </div>

        <div className="hidden md:block mx-10 mt-10 h-px bg-line">
          <div data-progress className="h-px bg-accent origin-left scale-x-0" />
        </div>
      </div>
    </section>
  );
};

export default Work;
