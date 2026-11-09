import React, { useEffect } from 'react';
import Nav from './sections/Nav';
import CommandPalette from './sections/CommandPalette';
import Cursor from './sections/Cursor';
import Stage from './sections/Stage';
import Work from './sections/Work';
import Timeline from './sections/Timeline';
import { Stack, Contact } from './sections/Closing';
import { initSmoothScroll, ScrollTrigger } from './lib/motion';

const App = () => {
  useEffect(() => {
    // Always start at the top so the intro and the editor scene play in order.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const stop = initSmoothScroll();
    // Fonts change line heights and therefore trigger positions.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return stop;
  }, []);

  return (
    <>
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-accent focus:text-accent-ink">
        Skip to work
      </a>
      <Nav />
      <CommandPalette />
      <Cursor />
      <main id="top">
        <Stage />
        <Work />
        <Timeline />
        <Stack />
        <Contact />
      </main>
    </>
  );
};

export default App;
