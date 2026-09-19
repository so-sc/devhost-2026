// EmberCanvas.tsx
// Canvas particle system for the clash: hot sparks (fast streaks) + glowing embers (slow, drifting).
// - Time-based physics (dt), so it looks identical on 60Hz / 120Hz / 144Hz screens.
// - Glow is a pre-rendered sprite (no per-particle shadowBlur, which is the #1 cause of janky canvas).
// - The loop only runs while there are live particles, then goes fully idle.
"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const TAU = Math.PI * 2;
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]): T => arr[(Math.random() * arr.length) | 0];

interface Spark {
  kind: 0;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  sprite: SpriteKey;
  phase: number;
}

interface Ember {
  kind: 1;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  sprite: SpriteKey;
  phase: number;
}

type Particle = Spark | Ember;
type SpriteKey = "hot" | "orange" | "red";

const EMBER_SPRITES: SpriteKey[] = ["orange", "orange", "red", "hot"];
const SPARK_SPRITES: SpriteKey[] = ["hot", "orange"];

interface EmitterState {
  left: number;
  total: number;
  rate: number;
  acc: number;
}

interface SimState {
  particles: Particle[];
  emitters: EmitterState[];
  raf: number;
  last: number;
  running: boolean;
  w: number;
  h: number;
  scale: number;
  sprites: Record<SpriteKey, HTMLCanvasElement> | null;
  start: (() => void) | null;
}

function makeSprite(r: number, g: number, b: number): HTMLCanvasElement {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const c2 = c.getContext("2d")!;
  const grad = c2.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.2, `rgba(${r},${g},${b},0.95)`);
  grad.addColorStop(0.55, `rgba(${r},${g},${b},0.25)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  c2.fillStyle = grad;
  c2.fillRect(0, 0, size, size);
  return c;
}

function makeSpark(x: number, y: number, sc: number): Spark {
  const a = rand(0, TAU);
  const speed = rand(800, 3200) * sc;
  return {
    kind: 0,
    x,
    y,
    vx: Math.cos(a) * speed,
    vy: Math.sin(a) * speed - rand(0, 120) * sc,
    life: 0,
    maxLife: rand(0.35, 0.95),
    size: rand(1.2, 2.4) * Math.max(sc, 0.8),
    sprite: pick(SPARK_SPRITES),
    phase: 0,
  };
}

function makeEmber(x: number, y: number, sc: number, big: boolean): Ember {
  const a = rand(0, TAU);
  const speed = big ? rand(300, 1200) * sc : rand(100, 300) * sc;
  return {
    kind: 1,
    x,
    y,
    vx: Math.cos(a) * speed,
    vy: Math.sin(a) * speed - (big ? rand(60, 220) : rand(20, 80)) * sc,
    life: 0,
    maxLife: big ? rand(1.4, 3.0) : rand(1.6, 3.2),
    size: (big ? rand(2, 5) : rand(1.5, 3.5)) * sc,
    sprite: pick(EMBER_SPRITES),
    phase: rand(0, TAU),
  };
}

export interface EmberCanvasHandle {
  burst: (opts?: { sparks?: number; embers?: number }) => void;
  trickle: (seconds?: number, rate?: number) => void;
  clear: () => void;
}

interface EmberCanvasProps {
  originX?: number;
  originY?: number;
  className?: string;
}

const EmberCanvas = forwardRef<EmberCanvasHandle, EmberCanvasProps>(
  function EmberCanvas({ originX = 0.5, originY = 0.5, className = "" }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const origin = useRef({ x: originX, y: originY });
    origin.current = { x: originX, y: originY };

    const sim = useRef<SimState>({
      particles: [],
      emitters: [],
      raf: 0,
      last: 0,
      running: false,
      w: 0,
      h: 0,
      scale: 1,
      sprites: null,
      start: null,
    });

    useImperativeHandle(ref, () => ({
      /** Big one-shot explosion at the clash point. */
      burst({ sparks = 110, embers = 80 } = {}) {
        const s = sim.current;
        if (!s.w) return;
        const ox = origin.current.x * s.w;
        const oy = origin.current.y * s.h;
        for (let i = 0; i < sparks; i++)
          s.particles.push(makeSpark(ox, oy, s.scale));
        for (let i = 0; i < embers; i++)
          s.particles.push(makeEmber(ox, oy, s.scale, true));
        s.start?.();
      },
      /** Lighter falling/drifting embers that fade out over `seconds`. */
      trickle(seconds = 2.8, rate = 40) {
        const s = sim.current;
        s.emitters.push({ left: seconds, total: seconds, rate, acc: 0 });
        s.start?.();
      },
      clear() {
        sim.current.particles.length = 0;
        sim.current.emitters.length = 0;
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const s = sim.current;
      s.sprites = {
        hot: makeSprite(255, 232, 170),
        orange: makeSprite(255, 140, 40),
        red: makeSprite(255, 70, 20),
      };

      const resize = () => {
        const p = canvas.parentElement;
        if (!p) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        s.w = p.clientWidth;
        s.h = p.clientHeight;
        s.scale = Math.min(Math.max(Math.min(s.w, s.h) / 800, 0.55), 1.4);
        canvas.width = Math.round(s.w * dpr);
        canvas.height = Math.round(s.h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      const ro = new ResizeObserver(resize);
      if (canvas.parentElement) ro.observe(canvas.parentElement);

      const frame = (now: number) => {
        const dt = Math.min((now - s.last) / 1000, 0.05); // clamp so a tab-switch never teleports particles
        s.last = now;
        const t = now / 1000;
        const sc = s.scale;

        // emitters (ambient trickle)
        const oy = origin.current.y * s.h;
        for (let i = s.emitters.length - 1; i >= 0; i--) {
          const e = s.emitters[i];
          e.left -= dt;
          if (e.left <= 0) {
            s.emitters.splice(i, 1);
            continue;
          }
          e.acc += e.rate * (e.left / e.total) * dt; // rate fades to 0
          while (e.acc >= 1) {
            e.acc -= 1;
            s.particles.push(
              makeEmber(rand(0, s.w), oy + rand(-200, 200) * sc, sc, false),
            );
          }
        }

        ctx.clearRect(0, 0, s.w, s.h);
        ctx.globalCompositeOperation = "lighter";
        ctx.lineCap = "round";

        for (let i = s.particles.length - 1; i >= 0; i--) {
          const p = s.particles[i];
          p.life += dt;
          if (p.life >= p.maxLife) {
            s.particles.splice(i, 1);
            continue;
          }
          const k = 1 - p.life / p.maxLife; // 1 -> 0 over lifetime

          if (p.kind === 0) {
            // spark: fast, gravity-heavy, drawn as a motion streak
            p.vy += 1100 * sc * dt;
            const d = Math.pow(0.94, dt * 60);
            p.vx *= d;
            p.vy *= d;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            ctx.globalAlpha = Math.min(1, k * 1.6);
            ctx.strokeStyle = k > 0.5 ? "rgb(255,236,190)" : "rgb(255,150,50)";
            ctx.lineWidth = p.size * (0.4 + k);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.vx * 0.03, p.y - p.vy * 0.03);
            ctx.stroke();
            const r = p.size * 3 * (0.5 + k);
            ctx.drawImage(s.sprites![p.sprite], p.x - r, p.y - r, r * 2, r * 2);
          } else {
            // ember: slows quickly, then floats up and sways while flickering
            const d = Math.pow(0.98, dt * 60);
            p.vx *= d;
            p.vy *= d;
            p.vy += -22 * sc * dt;
            p.vx += Math.sin(t * 2.2 + p.phase) * 40 * sc * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            const flicker = 0.65 + 0.35 * Math.sin(t * 14 + p.phase);
            ctx.globalAlpha = Math.max(0, k * flicker);
            const r = p.size * 3 * (0.4 + 0.6 * k);
            ctx.drawImage(s.sprites![p.sprite], p.x - r, p.y - r, r * 2, r * 2);
          }
        }

        ctx.globalAlpha = 1;

        if (s.particles.length === 0 && s.emitters.length === 0) {
          ctx.clearRect(0, 0, s.w, s.h);
          s.running = false; // fully idle until the next burst
          return;
        }
        s.raf = requestAnimationFrame(frame);
      };

      s.start = () => {
        if (s.running) return;
        s.running = true;
        s.last = performance.now();
        s.raf = requestAnimationFrame(frame);
      };

      return () => {
        cancelAnimationFrame(s.raf);
        ro.disconnect();
        s.running = false;
        s.start = null;
        s.particles.length = 0;
        s.emitters.length = 0;
      };
    }, []);

    return <canvas ref={canvasRef} className={className} />;
  },
);

EmberCanvas.displayName = "EmberCanvas";

export default EmberCanvas;
