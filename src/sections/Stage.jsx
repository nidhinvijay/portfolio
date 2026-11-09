import React, { useMemo, useRef, useState } from 'react';
import { toCanvas } from 'html-to-image';

/**
 * Inline the editor font (Fira Code, latin subset) as data URLs for the snapshot.
 * Done by hand: html-to-image caches a failed lookup if it runs before the
 * Google Fonts stylesheet is readable.
 */
let editorFontCSS = null;
async function embedEditorFont() {
  if (editorFontCSS) return editorFontCSS;
  const css = await fetch('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap').then((r) => r.text());
  const blocks = css.split('/*').filter((b) => b.trimStart().startsWith('latin */'));
  const faces = await Promise.all(blocks.map(async (b) => {
    const face = b.slice(b.indexOf('@font-face'));
    const url = face.match(/url\(([^)]+)\)/)?.[1];
    if (!url) return '';
    const blob = await fetch(url).then((r) => r.blob());
    const data = await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(blob); });
    return face.replace(url, data);
  }));
  const out = faces.join(' ');
  if (!out.includes('data:')) throw new Error('editor font not embeddable');
  editorFontCSS = out;
  return out;
}
import EditorWindow from '../editor/EditorWindow';
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion, scrollToTarget, jumps } from '../lib/motion';
import { createBlackHole } from '../lib/blackhole';
import { profile, projects } from '../data/content';

const bootLines = [
  ['> nv_portfolio@2.0.0 dev', 'text-fg-faint'],
  ['> compiling 3 roles, 8 projects, 40+ tools', 'text-fg-faint'],
  ['✓ ready — opening the editor below', 'text-accent'],
];

const Stage = () => {
  const root = useRef(null);
  const [reduced] = useState(prefersReducedMotion);
  const nameChars = useMemo(() => profile.name.split(''), []);
  const handleExit = () => scrollToTarget('#work');

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      // 1 — Boot sequence on load (time-based, not scroll).
      if (!reduced) {
        const cmd = '$ npm run nv_portfolio';
        const typed = { n: 0 };
        const boot = gsap.timeline({
          delay: 0.25,
          defaults: { ease: 'expo.out' },
          // The window is fully visible now: grab the texture for the black hole early.
          onComplete: () => window.dispatchEvent(new Event('nv:boot-done')),
        });
        boot
          .to(typed, {
            n: cmd.length, duration: 0.9, ease: 'none',
            onUpdate: () => { const el = q('[data-cmd]')[0]; if (el) el.textContent = cmd.slice(0, Math.round(typed.n)); },
          })
          .from(q('[data-boot]'), { autoAlpha: 0, y: 6, duration: 0.5, stagger: 0.22 }, '+=0.15')
          .from(q('[data-char]'), { yPercent: 110, duration: 1.2, stagger: 0.045 }, '-=0.35')
          .from(q('[data-hero-fade]'), { autoAlpha: 0, y: 18, duration: 1, stagger: 0.1 }, '-=0.9')
          .from(q('[data-frame]'), { opacity: 0, duration: 1.2, ease: 'power2.out' }, '<');
      }

      if (reduced) return;

      // 2 — Scroll scene: hero out, editor rises, holds, then falls into a singularity.
      const live = q('[data-live]')[0];
      // Fresh canvas per run: a WebGL context can't be reused after dispose.
      const canvas = document.createElement('canvas');
      canvas.className = 'absolute inset-0 w-full h-full';
      canvas.style.visibility = 'hidden';
      q('[data-bh-host]')[0].appendChild(canvas);
      let bh = null;
      try { bh = createBlackHole(canvas); } catch { bh = null; } // no WebGL: CSS fallback below

      const state = { p: 0 };
      let shown = null;
      let fontCSS = null;
      let capturing = false;
      let captured = false;
      let stale = true; // the snapshot no longer matches the live window

      const measure = () => {
        if (!bh) return;
        const s = root.current.getBoundingClientRect();
        const r = live.getBoundingClientRect();
        bh.resize(s.width, s.height);
        bh.setRect({ x: r.left - s.left, y: r.top - s.top, width: r.width, height: r.height });
      };

      const capture = async () => {
        if (!bh || capturing) return false;
        if (gravity.on) return false; // never bake the cursor pull into the snapshot
        gravity.reset();
        capturing = true;
        stale = false;
        try {
          // The snapshot must use the real editor font, or lines re-wrap and the swap snaps.
          if (!fontCSS) fontCSS = await embedEditorFont();
          const img = await toCanvas(live, {
            pixelRatio: Math.min(window.devicePixelRatio || 1, 1.75),
            fontEmbedCSS: fontCSS,
            backgroundColor: getComputedStyle(live.firstElementChild).backgroundColor,
            // Capture the window as laid out, never mid-transition.
            style: { transform: 'none', filter: 'none', opacity: '1', visibility: 'visible' },
          });
          bh.setTexture(img);
          captured = true;
          draw();
          return true;
        } catch (err) {
          stale = true;
          console.warn('[event-horizon] capture failed, using fallback', err);
          return false;
        } finally {
          capturing = false;
        }
      };

      const draw = () => {
        const p = state.p;
        const webgl = bh?.ready;
        const active = p > 0.0005;
        // No texture (yet) or no WebGL: spiral the live window away instead of leaving it stuck.
        const mode = !active ? 'live' : webgl ? 'gl' : 'css';
        if (active && bh && !webgl && !captured) capture();
        if (mode !== shown) {
          if (mode === 'gl') measure();
          // Opacity, not visibility: a hidden ancestor would make the capture come out empty.
          gsap.set(live, { opacity: 1, pointerEvents: mode === 'gl' ? 'none' : 'auto' });
          gsap.set(canvas, { autoAlpha: mode === 'gl' ? 1 : 0 });
          if (mode !== 'css') gsap.set(live, { clearProps: 'transform,filter' });
          shown = mode;
        }
        if (mode === 'gl') {
          bh.render(p);
          // Cross-fade: the snapshot fades in over the live window before it hides.
          live.style.opacity = p < 0.07 ? '1' : '0';
        }
        if (mode === 'css') {
          // Fallback: spiral the window down to nothing.
          gsap.set(live, { scale: Math.max(0, 1 - p * 1.3), rotation: p * 120, filter: `blur(${p * 8}px)`, opacity: 1 - Math.min(1, p * 1.25) });
        }
      };


      // Anything that changes what the window shows makes the snapshot stale.
      let recapture;
      const dirty = () => {
        stale = true;
        clearTimeout(recapture);
        recapture = setTimeout(() => { if (state.p === 0 && !gravity.on) capture(); }, 600);
      };
      const observer = new MutationObserver(dirty);
      observer.observe(live, { subtree: true, childList: true, characterData: true });
      live.addEventListener('scroll', dirty, true);
      live.addEventListener('pointerup', dirty);
      // First capture as soon as the boot intro has settled (retry until the window is visible).
      let first;
      const tryFirst = () => capture().then((ok) => { if (!ok && !captured) first = setTimeout(tryFirst, 400); });
      window.addEventListener('nv:boot-done', tryFirst, { once: true });
      first = setTimeout(tryFirst, 4000);
      live.addEventListener('keyup', dirty);
      // Cursor gravity: during the hold, text leans toward the pointer, and the pull
      // strengthens as the singularity approaches. Desktop pointers only.
      const SEL = 'main h1, main h2, main h3, main p, main li, main pre, main dd, main code';
      const gravity = {
        on: false, inside: false, k: 0, mx: 0, my: 0, items: [], running: false,
        collect() {
          this.reset();
          this.items = [...live.querySelectorAll(SEL)].map((el) => ({ el, x: 0, y: 0, tx: 0, ty: 0 }));
        },
        aim() {
          const strength = 5 + 13 * this.k;
          for (const it of this.items) {
            if (!this.on) { it.tx = 0; it.ty = 0; continue; }
            const r = it.el.getBoundingClientRect();
            // Nearest point of the element (minus our own offset) to the cursor.
            const nx = Math.max(r.left - it.x, Math.min(this.mx, r.right - it.x));
            const ny = Math.max(r.top - it.y, Math.min(this.my, r.bottom - it.y));
            const dx = this.mx - nx, dy = this.my - ny;
            const dist = Math.hypot(dx, dy);
            const f = strength * Math.exp(-(dist * dist) / (2 * 150 * 150));
            const len = dist || 1;
            it.tx = (dx / len) * f;
            it.ty = (dy / len) * f;
          }
          this.start();
        },
        start() {
          if (this.running) return;
          this.running = true;
          gsap.ticker.add(this.step);
        },
        step: () => {
          let moving = false;
          for (const it of gravity.items) {
            it.x += (it.tx - it.x) * 0.16;
            it.y += (it.ty - it.y) * 0.16;
            if (Math.abs(it.tx - it.x) > 0.03 || Math.abs(it.ty - it.y) > 0.03) moving = true;
            it.el.style.translate = Math.abs(it.x) < 0.01 && Math.abs(it.y) < 0.01 ? '' : `${it.x.toFixed(2)}px ${it.y.toFixed(2)}px`;
          }
          if (!moving) { gsap.ticker.remove(gravity.step); gravity.running = false; } // idle = no work
        },
        reset() {
          for (const it of this.items) { it.x = it.y = it.tx = it.ty = 0; it.el.style.translate = ''; }
        },
        sync() {
          // Gravity lets go a little before the singularity so the snapshot can be taken clean.
          const on = this.inside && this.k >= 0 && this.k < 0.82;
          if (on !== this.on) {
            this.on = on;
            if (on) this.collect();
          }
          // The site cursor grows with the pull.
          window.dispatchEvent(new CustomEvent('nv:gravity', { detail: { on: this.inside && this.k >= 0 && this.k < 1, k: Math.max(0, Math.min(1, this.k)) } }));
          this.aim();
        },
      };
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      let frame = 0;
      const onMove = (e) => {
        const s = root.current.getBoundingClientRect();
        gravity.mx = e.clientX; gravity.my = e.clientY;
        bh?.setOrigin({ x: e.clientX - s.left, y: e.clientY - s.top });
        if (!frame) frame = requestAnimationFrame(() => { frame = 0; gravity.aim(); });
      };
      const onEnter = (e) => { gravity.inside = true; onMove(e); gravity.sync(); };
      // Keep the last cursor point as the birthplace (GL mode makes the window drop the pointer).
      const onLeave = () => { gravity.inside = false; gravity.sync(); };
      if (fine) {
        live.addEventListener('pointerenter', onEnter);
        live.addEventListener('pointermove', onMove);
        live.addEventListener('pointerleave', onLeave);
      }
      // New file opened: new lines to pull on.
      const onFiles = () => setTimeout(() => { if (gravity.on) { gravity.collect(); gravity.aim(); } }, 320);
      live.addEventListener('click', onFiles);

      const onRefresh = () => measure();
      ScrollTrigger.addEventListener('refresh', onRefresh);

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=450%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * tl.duration();
            const hold = tl.labels.hold;
            if (t < hold - 1) stale = true;
            // Gravity lives in the hold; k = how close the singularity is (0 → 1).
            const k = (t - hold) / (tl.labels.singularity - hold);
            if (Math.abs(k - gravity.k) > 0.01 || (k >= 1) !== (gravity.k >= 1)) { gravity.k = k; gravity.sync(); }
            // Final, fresh snapshot just before the singularity, once the pull has let go.
            if (k >= 0.86 && k < 1 && stale && !capturing) capture();
          },
        },
      });

      tl.addLabel('rise', 0)
        .to(q('[data-hero]'), { y: '-22vh', autoAlpha: 0, filter: 'blur(10px)', duration: 1.6, ease: 'power1.in' }, 'rise')
        .fromTo(q('[data-frame]'),
          { y: () => window.innerHeight * 0.74, scale: 0.6, rotationX: 34 },
          { y: 0, scale: 1, rotationX: 0, duration: 2.6, ease: 'power2.out' }, 'rise')
        .to(q('[data-hint]'), { autoAlpha: 1, y: 0, duration: 0.4 }, 'rise+=2.4')
        .addLabel('hold', 'rise+=2.8')
        .to(q('[data-hint]'), { autoAlpha: 0, duration: 0.3 }, 'hold+=2.2')
        .addLabel('singularity', 'hold+=2.4')
        .to(state, { p: 1, duration: 4.4, ease: 'none', onUpdate: draw }, 'singularity')
        .fromTo(q('[data-reveal]'),
          { autoAlpha: 0, scale: 0.35, filter: 'blur(18px)' },
          { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'expo.out' }, 'singularity+=3.35')
        .to({}, { duration: 0.6 });

      // Palette destination: the editor fully risen and held.
      jumps.editor = () => {
        const st = tl.scrollTrigger;
        return st.start + (st.end - st.start) * ((tl.labels.hold + 0.8) / tl.duration());
      };

      return () => {
        clearTimeout(recapture);
        clearTimeout(first);
        window.removeEventListener('nv:boot-done', tryFirst);
        live.removeEventListener('pointerup', dirty);
        live.removeEventListener('scroll', dirty, true);
        observer.disconnect();
        window.dispatchEvent(new CustomEvent('nv:gravity', { detail: { on: false, k: 0 } }));
        live.removeEventListener('pointerenter', onEnter);
        live.removeEventListener('pointermove', onMove);
        live.removeEventListener('pointerleave', onLeave);
        live.removeEventListener('click', onFiles);
        cancelAnimationFrame(frame);
        gsap.ticker.remove(gravity.step);
        gravity.reset();
        live.removeEventListener('keyup', dirty);
        ScrollTrigger.removeEventListener('refresh', onRefresh);
        bh?.dispose();
        canvas.remove();
      };
    },
    { scope: root, dependencies: [reduced] }
  );

  if (reduced) {
    return (
      <section ref={root} className="relative px-4 md:px-10 pt-28 pb-20">
        <HeroCopy nameChars={nameChars} staticCmd />
        <div className="mt-16 h-[85svh] rounded-xl overflow-hidden outline outline-1 outline-white/10">
          <EditorWindow onExit={handleExit} />
        </div>
      </section>
    );
  }

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden" aria-label="Introduction and live editor">
      {/* Revealed after the shatter */}
      <div data-reveal className="invisible absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <p className="font-display font-semibold text-[clamp(2.6rem,7.5vw,6.5rem)] leading-[0.95] tracking-[-0.03em] text-balance">
          {projects.length} projects.<br /><span className="text-fg-muted">Built end to end.</span>
        </p>
        <p className="mt-7 font-code text-xs md:text-sm tracking-[0.08em] text-fg-faint">
          healthcare <span className="text-accent/70 mx-2">·</span> live trading <span className="text-accent/70 mx-2">·</span> voice ai <span className="text-accent/70 mx-2">·</span> hiring automation
        </p>
      </div>

      <div data-hero className="absolute inset-0 px-5 md:px-10 pt-24 md:pt-28 pb-[24svh] flex flex-col justify-center">
        <HeroCopy nameChars={nameChars} />
      </div>

      {/* The singularity is drawn here, over everything in the scene */}
      <div data-bh-host className="absolute inset-0 pointer-events-none z-10" aria-hidden="true" />

      {/* Editor frame */}
      <div
        data-frame
        className="absolute left-2.5 right-2.5 top-16 bottom-16 md:left-[max(2rem,calc((100vw-1320px)/2))] md:right-[max(2rem,calc((100vw-1320px)/2))] md:top-20 md:bottom-[4.5rem]"
        style={{ transformOrigin: '50% 0%', transformPerspective: 1600 }}
      >
        <div data-live className="absolute inset-0 rounded-xl overflow-hidden outline outline-1 outline-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
          <EditorWindow onExit={handleExit} />
        </div>

      </div>

      <p data-hint className="invisible absolute bottom-5 left-0 right-0 text-center font-code text-xs md:text-[13px] text-fg-muted px-4 translate-y-2">
        It's live. Open files, type <span className="text-accent">help</span> in the terminal, or keep scrolling to fall in.
      </p>
    </section>
  );
};

const HeroCopy = ({ nameChars, staticCmd = false }) => (
  <div className="max-w-[1320px] w-full mx-auto">
    <div className="font-code text-[13px] md:text-sm leading-7 mb-8 md:mb-10" aria-hidden="true">
      <div className="text-fg">
        <span data-cmd>{staticCmd ? '$ npm run nv_portfolio' : ''}</span>
        <span className="caret inline-block w-2 h-4 bg-accent ml-1 align-[-2px]" />
      </div>
      {bootLines.map(([t, c]) => (
        <div key={t} data-boot className={c}>{t}</div>
      ))}
    </div>

    <h1 className="font-display font-bold leading-[0.86] tracking-[-0.035em] text-[clamp(3rem,9.5vw,9rem)]" aria-label={profile.name}>
      <span className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
        {nameChars.map((c, i) => (
          <span key={i} data-char className="inline-block">{c === ' ' ? ' ' : c}</span>
        ))}
      </span>
    </h1>

    <div className="mt-8 md:mt-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
      <p data-hero-fade className="text-[clamp(1.15rem,1.9vw,1.6rem)] leading-snug max-w-[34ch] text-fg text-pretty">
        Full-stack developer building real-time systems, AI products and the infrastructure underneath them.
      </p>
      <dl data-hero-fade className="text-sm text-fg-muted grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
        <dt className="text-fg-faint">Now</dt><dd>Software Developer, Dewdas Technology</dd>
        <dt className="text-fg-faint">Based</dt><dd>{profile.location}</dd>
      </dl>
    </div>
  </div>
);

export default Stage;
