import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/motion';
import { timeline, shortHash } from '../data/content';

const BRANCH_COLORS = ['var(--accent)', '#5fd4e8', '#f4b860', '#ff8a6b'];

/** Curve joining the main rail (x=12) to a branch rail (x=44). */
const Curve = ({ color, flip }) => (
  <svg width="48" height="32" viewBox="0 0 48 32" className="block" aria-hidden="true">
    <path
      d={flip ? 'M12 0 C12 20, 44 12, 44 32' : 'M44 0 C44 20, 12 12, 12 32'}
      fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
    />
  </svg>
);

const Timeline = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          root.current.querySelector('[data-rail]'),
          { scaleY: 0 },
          {
            scaleY: 1, ease: 'none',
            scrollTrigger: { trigger: root.current.querySelector('[data-graph]'), start: 'top 70%', end: 'bottom 70%', scrub: 0.5 },
          }
        );
        gsap.utils.toArray('[data-branch]', root.current).forEach((b) => {
          gsap.fromTo(b.querySelector('[data-branch-line]'), { scaleY: 0 }, {
            scaleY: 1, ease: 'none',
            scrollTrigger: { trigger: b, start: 'top 72%', end: 'bottom 72%', scrub: 0.5 },
          });
          gsap.from(b.querySelectorAll('[data-commit], [data-head]'), {
            autoAlpha: 0, x: -16, duration: 0.8, ease: 'expo.out', stagger: 0.08,
            scrollTrigger: { trigger: b, start: 'top 75%' },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="timeline" ref={root} className="px-5 md:px-10 py-28 md:py-40" aria-labelledby="timeline-title">
      <div className="max-w-[1100px] mx-auto">
        <h2 id="timeline-title" className="font-display font-semibold text-[clamp(2.25rem,5vw,4.25rem)] tracking-[-0.03em] leading-[0.95] text-balance max-w-[16ch]">
          Experience
        </h2>

        <div data-graph className="relative mt-16 font-code">
          <p className="text-sm text-fg-muted mb-8"><span className="text-accent">$</span> git log --graph --oneline</p>

          {/* main rail */}
          <div className="absolute left-[11px] top-14 bottom-0 w-[2px] bg-line" aria-hidden="true" />
          <div data-rail className="absolute left-[11px] top-14 bottom-0 w-[2px] bg-fg-faint origin-top" aria-hidden="true" />

          <ol className="relative">
            {timeline.map((job, j) => {
              const color = BRANCH_COLORS[j % BRANCH_COLORS.length];
              return (
                <li key={job.branch} data-branch className="relative pb-12 last:pb-0">
                  {/* merge commit on main */}
                  <div data-head className="flex items-start gap-5">
                    <span className="relative z-10 mt-1.5 h-6 w-6 shrink-0 rounded-full border-2 bg-ink-0 grid place-items-center" style={{ borderColor: color }}>
                      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        <span className="text-fg-faint tabular">{shortHash(job.org)}</span>
                        {job.head && <span className="px-1.5 py-0.5 rounded border border-accent/50 text-accent">HEAD → main</span>}
                        <span className="px-1.5 py-0.5 rounded border border-line" style={{ color }}>{job.branch}</span>
                        <span className="text-fg-faint">{job.period}</span>
                      </div>
                      <h3 className="mt-2 font-display font-semibold text-[clamp(1.5rem,2.8vw,2.25rem)] tracking-[-0.02em] leading-tight">
                        {job.role}
                      </h3>
                      <p className="font-sans text-fg-muted">{job.org}</p>
                    </div>
                  </div>

                  {/* branch */}
                  <div className="relative mt-2">
                    <Curve color={color} flip />
                    <div className="relative">
                      <div data-branch-line className="absolute left-[43px] top-0 bottom-0 w-[2px] origin-top" style={{ background: color }} aria-hidden="true" />
                      <ul>
                        {job.commits.map((c) => (
                          <li key={c} data-commit className="relative flex items-start gap-4 pl-[38px] py-2.5">
                            <span className="relative z-10 mt-[7px] h-3 w-3 shrink-0 rounded-full bg-ink-0 border-2" style={{ borderColor: color }} aria-hidden="true" />
                            <span className="text-[13px] md:text-sm leading-relaxed">
                              <span className="text-fg-faint mr-3 tabular">{shortHash(c)}</span>
                              <span className="text-fg/90">{c}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Curve color={color} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
