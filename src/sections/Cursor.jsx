import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from '../lib/motion';

const INTERACTIVE = 'a, button, [role="option"], [role="button"], input, textarea, select, label, summary, .cursor-pointer, [data-cursor="hover"]';

/**
 * The site's pointer: a small singularity. It swells over links and buttons,
 * tightens on click, and grows with the editor's gravity before the black hole.
 * Fine pointers only; touch devices keep their native behaviour.
 */
const Cursor = () => {
  const el = useRef(null);
  const core = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine || !el.current) return undefined;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    const xTo = gsap.quickTo(el.current, 'x', { duration: 0.16, ease: 'power3' });
    const yTo = gsap.quickTo(el.current, 'y', { duration: 0.16, ease: 'power3' });
    const s = { hover: false, down: false, pull: 0, shown: false };

    const apply = () => {
      const scale = (s.hover ? 2.1 : 1) * (s.down ? 0.7 : 1) * (1 + s.pull * 1.4);
      gsap.to(core.current, { scale, duration: 0.35, ease: 'expo.out', overwrite: 'auto' });
      core.current.dataset.hover = s.hover ? 'true' : 'false';
    };

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!s.shown) {
        s.shown = true;
        gsap.set(el.current, { x: e.clientX, y: e.clientY });
        gsap.to(el.current, { opacity: 1, duration: 0.25 });
      }
      const hover = !!e.target.closest?.(INTERACTIVE);
      if (hover !== s.hover) { s.hover = hover; apply(); }
    };
    const onDown = () => { s.down = true; apply(); };
    const onUp = () => { s.down = false; apply(); };
    const onLeave = () => { s.shown = false; gsap.to(el.current, { opacity: 0, duration: 0.2 }); };
    const onGravity = (e) => { s.pull = e.detail.on ? e.detail.k : 0; apply(); };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    window.addEventListener('nv:gravity', onGravity);
    return () => {
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      window.removeEventListener('nv:gravity', onGravity);
    };
  }, []);

  return createPortal(
    <div ref={el} className="fixed left-0 top-0 z-[100] pointer-events-none opacity-0" aria-hidden="true">
      <div
        ref={core}
        data-hover="false"
        className="nv-cursor -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-black"
      />
    </div>,
    document.body
  );
};

export default Cursor;
