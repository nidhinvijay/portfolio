import * as THREE from 'three';

/*
 * Event horizon effect.
 * The editor window is captured once into a texture and redrawn here, bent by a
 * lensing field around a growing singularity. A single `p` (0 → 1, scroll-driven)
 * moves it through: appear → pull + lensing → collapse to a point → shockwave.
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const frag = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform vec2 uRes;      // canvas size, css px
  uniform float uDpr;
  uniform vec4 uRect;     // window rect: x, y, w, h (css px, top-left origin)
  uniform vec2 uC;        // singularity centre, css px
  uniform float uP;       // progress 0..1
  uniform float uTime;
  uniform float uCorner;
  uniform float uSize;    // min(w, h) of the window
  uniform vec3 uAccent;
  uniform float uFade;    // cross-fade in from the live window

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float sdRound(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  // Premultiplied sample of the captured window at a css-px position.
  vec4 sampleWin(vec2 s) {
    vec2 local = s - uRect.xy;
    vec2 hs = uRect.zw * 0.5;
    float d = sdRound(local - hs, hs, uCorner);
    if (d > 1.0) return vec4(0.0);
    vec2 uv = local / uRect.zw;
    uv.y = 1.0 - uv.y;
    vec3 c = texture2D(uTex, uv).rgb;
    float a = clamp(0.5 - d, 0.0, 1.0);
    return vec4(c * a, a);
  }

  // Where a pixel at (radius r, angle ang) actually sees, after gravity.
  vec2 bend(float r, float ang, float E, float suck, float twist, float k) {
    float rs = r * (1.0 + suck * k / (r + k * 0.6)); // pulled inward, stretched near centre
    rs += (E * E) / r;                                // lensing
    float a = ang + twist * (uSize * 0.12) / (r + uSize * 0.03);
    return uC + rs * vec2(cos(a), sin(a));
  }

  void main() {
    vec2 P = vec2(gl_FragCoord.x, uRes.y * uDpr - gl_FragCoord.y) / uDpr;
    vec2 d = P - uC;
    float r = length(d) + 1e-3;
    float ang = atan(d.y, d.x);

    float appear   = smoothstep(0.0, 0.12, uP);
    float pull     = smoothstep(0.06, 0.62, uP);
    float collapse = smoothstep(0.52, 0.76, uP);
    float gone     = smoothstep(0.72, 0.78, uP);
    float burst    = smoothstep(0.76, 1.0, uP);

    float Rh = uSize * (0.035 * appear + 0.075 * pull) * (1.0 - collapse);
    float E = Rh * 1.7;
    float suck = pull * pull * 0.35 + collapse * collapse * 60.0;
    float twist = pull * 1.1 + collapse * 7.0 + uTime * 0.12 * pull;
    vec2 dir = d / r; // angle-periodic coords: no seam where atan wraps
    float k = uSize * 0.4;

    // Chromatic split grows with the pull.
    float ca = 0.012 * pull + 0.06 * collapse;
    vec4 sr = sampleWin(bend(r, ang, E, suck, twist, k));
    vec4 sg = sampleWin(bend(r * (1.0 + ca), ang, E, suck, twist, k));
    vec4 sb = sampleWin(bend(r * (1.0 + ca * 2.0), ang, E, suck, twist, k));
    // The last crushed scraps of window fade as they cross the horizon.
    float keep = 1.0 - smoothstep(0.5, 0.68, uP);
    vec3 col = vec3(sr.r, sg.g, sb.b) * keep;
    float alpha = max(sr.a, max(sg.a, sb.a)) * keep;

    // Light dims as it nears the horizon.
    float dim = smoothstep(Rh * 0.95, Rh * 2.6 + 1.0, r);
    col *= mix(1.0, dim, appear);

    // The shadow.
    float shadow = (1.0 - smoothstep(Rh * 0.94, Rh * 1.02, r)) * step(0.5, Rh);
    col *= 1.0 - shadow;
    alpha = max(alpha, shadow);

    float live = appear * (1.0 - gone);

    // Accretion ring, brighter on the approaching side.
    float ringR = Rh * 1.6;
    float ringW = Rh * 0.16 + 1.0;
    float ring = exp(-pow((r - ringR) / ringW, 2.0));
    // Smooth, seamless shimmer (pure angular waves: no grid seams).
    float turb = 0.55 + 0.25 * sin(3.0 * ang + uTime * 1.6 - log(r) * 5.0) + 0.2 * sin(7.0 * ang - uTime * 1.1 + log(r) * 3.0);
    float doppler = 0.45 + 0.55 * (0.5 + 0.5 * cos(ang + 2.4));
    float ringI = ring * (0.3 + 0.7 * turb) * (0.25 + doppler) * live * 0.8;

    // Thin photon ring hugging the shadow.
    float photon = exp(-pow((r - Rh * 1.05) / (1.0 + Rh * 0.03), 2.0)) * live;

    vec3 hot = mix(mix(uAccent, vec3(1.0, 0.96, 0.86), 0.35), vec3(1.0, 0.98, 0.92), clamp(ring * 0.6 + photon, 0.0, 1.0));
    float glow = ringI * 1.2 + photon * 1.0;
    col += hot * glow;
    alpha = max(alpha, clamp(glow, 0.0, 1.0));

    // Collapse: everything left becomes one point of light.
    float pinch = smoothstep(0.68, 0.76, uP) * (1.0 - smoothstep(0.78, 0.84, uP));
    float pt = exp(-r / (1.5 + 10.0 * (1.0 - smoothstep(0.68, 0.77, uP)))) * pinch * 1.6;

    // Shockwave on release, with a chromatic edge.
    float diag = length(uRes);
    float bw = 6.0 + 50.0 * burst;
    float fade = (1.0 - burst) * step(0.001, burst);
    vec3 shock = vec3(
      exp(-pow((r - burst * diag * 0.705) / bw, 2.0)),
      exp(-pow((r - burst * diag * 0.700) / bw, 2.0)),
      exp(-pow((r - burst * diag * 0.695) / bw, 2.0))
    ) * fade * 0.55;
    shock *= mix(vec3(1.0), uAccent, 0.5);

    col += vec3(pt) + shock;
    alpha = max(alpha, clamp(pt + max(shock.r, max(shock.g, shock.b)), 0.0, 1.0));

    gl_FragColor = vec4(col, alpha) * uFade;
  }
`;

export function createBlackHole(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, premultipliedAlpha: true });
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);

  const texture = new THREE.Texture();
  texture.colorSpace = THREE.NoColorSpace; // shader passes colours through untouched
  // Mipmaps stop the squeezed code from shimmering into moiré rings.
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 8;

  const uniforms = {
    uTex: { value: texture },
    uRes: { value: new THREE.Vector2(1, 1) },
    uDpr: { value: dpr },
    uRect: { value: new THREE.Vector4(0, 0, 1, 1) },
    uC: { value: new THREE.Vector2(0, 0) },
    uP: { value: 0 },
    uTime: { value: 0 },
    uCorner: { value: 12 },
    uSize: { value: 1 },
    uAccent: { value: new THREE.Color('#c6f25a') },
    uFade: { value: 1 },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader: vert, fragmentShader: frag, uniforms,
    transparent: true, premultipliedAlpha: true, depthTest: false, depthWrite: false,
  });
  const scene = new THREE.Scene();
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  let hasTexture = false;
  const centre = { x: 0, y: 0 };
  let origin = null; // where the hole is born (the visitor's cursor), if known

  return {
    get ready() { return hasTexture; },
    resize(w, h) {
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
      centre.x = w / 2; // it settles at dead centre of the screen
      centre.y = h / 2;
    },
    setTexture(source) {
      texture.image = source;
      texture.needsUpdate = true;
      hasTexture = true;
    },
    setRect({ x, y, width, height }) {
      uniforms.uRect.value.set(x, y, width, height);
      uniforms.uSize.value = Math.min(width, height);
    },
    setOrigin(pt) { origin = pt; },
    render(p) {
      // Born at the cursor, then drifts to the centre over the first third.
      const k = origin ? Math.min(1, p / 0.35) : 1;
      const e = k * k * (3 - 2 * k);
      const o = origin ?? centre;
      uniforms.uC.value.set(o.x + (centre.x - o.x) * e, o.y + (centre.y - o.y) * e);
      uniforms.uP.value = p;
      const f = Math.min(1, p / 0.06);
      uniforms.uFade.value = f * f * (3 - 2 * f);
      uniforms.uTime.value = p * 12; // motion is driven by scroll only
      renderer.render(scene, camera);
    },
    dispose() {
      material.dispose();
      texture.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
