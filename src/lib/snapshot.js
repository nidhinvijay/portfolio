/*
 * Lean DOM snapshot for the black hole.
 *
 * html-to-image copies every computed style property (~500) of every element,
 * which on the editor produced a ~3 MB SVG and froze the page for 0.7–5 s.
 * This copies only the properties that affect how the editor looks, pins each
 * element to its measured size (so text wraps exactly as on screen) and stubs
 * out blocks that are scrolled out of view.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

const PROPS = [
  'display', 'position', 'top', 'right', 'bottom', 'left', 'z-index', 'box-sizing',
  'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
  'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
  'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
  'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
  'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
  'background-color', 'background-image', 'color', 'opacity', 'visibility', 'box-shadow',
  'font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing',
  'font-feature-settings', 'font-variant-ligatures',
  'white-space', 'word-break', 'overflow-wrap', 'text-align', 'text-transform', 'text-overflow',
  'text-decoration-line', 'text-decoration-color', 'vertical-align', 'tab-size',
  'flex-direction', 'flex-wrap', 'flex-grow', 'flex-shrink', 'flex-basis', 'order',
  'align-items', 'align-self', 'align-content', 'justify-content', 'row-gap', 'column-gap',
  'grid-template-columns', 'grid-template-rows', 'grid-column', 'grid-row',
  'overflow-x', 'overflow-y', 'transform', 'transform-origin', 'translate', 'scale', 'rotate',
  'list-style-type', 'list-style-position', 'fill', 'stroke', 'stroke-width',
];

const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CANVAS', 'IFRAME', 'VIDEO', 'AUDIO']);
const BLOCKISH = /^(block|flex|grid|list-item|table)/;

function styleText(cs) {
  let out = '';
  for (const p of PROPS) {
    const v = cs.getPropertyValue(p);
    if (v) out += `${p}:${v};`;
  }
  return out;
}

function cloneTree(src, view) {
  if (src.nodeType === Node.TEXT_NODE) return document.createTextNode(src.data);
  if (src.nodeType !== Node.ELEMENT_NODE || SKIP.has(src.tagName)) return null;

  const cs = getComputedStyle(src);
  if (cs.display === 'none') return null;

  const isSvg = src.namespaceURI === SVG_NS;
  const isField = src.tagName === 'INPUT' || src.tagName === 'TEXTAREA';

  // Block content scrolled completely out of view: keep its box, drop its insides.
  if (!isSvg && BLOCKISH.test(cs.display)) {
    const r = src.getBoundingClientRect();
    if (r.bottom < view.top || r.top > view.bottom || r.right < view.left || r.left > view.right) {
      const stub = document.createElement('div');
      stub.setAttribute('style', `${styleText(cs)}width:${r.width}px;height:${r.height}px;`);
      return stub;
    }
  }

  let el;
  if (isSvg) {
    el = document.createElementNS(SVG_NS, src.tagName);
    for (const a of src.attributes) el.setAttribute(a.name, a.value);
  } else {
    el = document.createElement(isField ? 'div' : src.tagName.toLowerCase());
  }

  let css = styleText(cs);
  // Pin element boxes to their on-screen size so text wraps identically.
  if (!isSvg && cs.display !== 'inline' && cs.display !== 'contents') {
    css += `width:${cs.width};height:${cs.height};`;
  }
  el.setAttribute('style', css);

  if (isField) {
    el.textContent = src.value;
    return el;
  }
  // Scrolled containers: the copy can't scroll, so shift its children by the scroll
  // offset instead (on top of any translate they already have).
  const sl = isSvg ? 0 : src.scrollLeft;
  const st = isSvg ? 0 : src.scrollTop;
  for (const child of src.childNodes) {
    const c = cloneTree(child, view);
    if (!c) continue;
    if ((sl || st) && c.nodeType === Node.ELEMENT_NODE) {
      const [tx = 0, ty = 0] = (getComputedStyle(child).translate.match(/-?[\d.]+/g) || []).map(Number);
      c.style.translate = `${tx - sl}px ${ty - st}px`;
    }
    el.appendChild(c);
  }
  return el;
}

/**
 * Render `node` to a canvas. `fontCSS` is @font-face CSS with data URLs
 * (the snapshot is an isolated image and can't see the page's fonts).
 */
export async function snapshot(node, { pixelRatio = 1, fontCSS = '', background = 'transparent' } = {}) {
  const rect = node.getBoundingClientRect();
  const w = node.offsetWidth;
  const h = node.offsetHeight;
  // getBoundingClientRect includes ancestor transforms; offset* don't. Scale the
  // visibility box back into the node's own layout space.
  const sx = rect.width / w || 1;
  const sy = rect.height / h || 1;
  const view = { left: rect.left - 40 * sx, top: rect.top - 40 * sy, right: rect.right + 40 * sx, bottom: rect.bottom + 40 * sy };

  const clone = cloneTree(node, view);
  // The root sits at the image's origin regardless of where it is on the page.
  clone.style.position = 'relative';
  clone.style.inset = 'auto';
  clone.style.margin = '0';
  clone.style.transform = 'none';
  clone.style.opacity = '1';
  clone.style.visibility = 'visible';
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');

  const html = new XMLSerializer().serializeToString(clone);
  const svg =
    `<svg xmlns="${SVG_NS}" width="${w}" height="${h}">` +
    `<foreignObject x="0" y="0" width="100%" height="100%">` +
    `<style xmlns="http://www.w3.org/1999/xhtml">${fontCSS}</style>${html}` +
    `</foreignObject></svg>`;

  const img = new Image();
  img.decoding = 'async';
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await img.decode();

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(w * pixelRatio);
  canvas.height = Math.round(h * pixelRatio);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.scale(pixelRatio, pixelRatio);
  ctx.drawImage(img, 0, 0, w, h);
  return canvas;
}

/**
 * Inline the editor font (Fira Code, latin subset) as data URLs for the snapshot.
 * Done by hand: html-to-image caches a failed lookup if it runs before the
 * Google Fonts stylesheet is readable.
 */
let editorFontCSS = null;
export async function embedEditorFont() {
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
