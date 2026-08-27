"use client";

import React, { useEffect, useRef } from "react";

interface MoodCanvasProps {
  mood: string;
}

/**
 * Guarantees the "video mood" feeling exists even with zero real footage in
 * /public/videos/. Real mp4 loops (see BackgroundVideo.tsx) are the premium
 * path when they exist; this is a small procedural layer of drifting light
 * on top of the mesh-gradient fallback, in the same z-index band (z-2, above
 * the mood color at z-1, below the legibility scrim at z-3). It reuses the
 * same canvas + requestAnimationFrame + resize pattern already established
 * in AtmosphereCanvas.tsx for the rain effect, so the two stay consistent.
 *
 * Each mood gets its own drift direction, palette, and particle shape —
 * these are deliberately subtle (this sits *behind* the calligraphy and
 * player) rather than a foreground effect like the rain.
 */

type MoodKey = "dawn" | "dunes" | "water" | "default";

interface MoodConfig {
  colors: string[];
  size: [number, number];
  speed: [number, number];
  drift: [number, number]; // x, y drift per frame, before per-particle jitter
  glow: string | null; // optional radial glow color, screen-blended
  twinkle: boolean;
}

// Every mood shares one particle count (below) — only palette, motion, and
// glow differ, which is what actually reads as a distinct "mood" without
// needing to re-allocate the particle pool when the track (and therefore
// the mood) changes.
const MOODS: Record<MoodKey, MoodConfig> = {
  dawn: {
    colors: ["#f3d9a4", "#f8c97a", "#ffe9c2"],
    size: [1, 3],
    speed: [0.12, 0.3],
    drift: [0.02, -0.18], // motes rise, like warm light
    glow: "rgba(248, 201, 122, 0.16)",
    twinkle: true,
  },
  dunes: {
    colors: ["#e8a765", "#c97a3f", "#f2c48a"],
    size: [1, 2.4],
    speed: [0.06, 0.16],
    drift: [-0.22, 0.01], // heat-haze drift, mostly horizontal
    glow: "rgba(201, 122, 63, 0.14)",
    twinkle: false,
  },
  water: {
    colors: ["#bfe3e0", "#8fc9c4", "#e7f6f3"],
    size: [1, 2.6],
    speed: [0.08, 0.2],
    drift: [0.05, 0.14], // light drifting down through water
    glow: "rgba(143, 201, 196, 0.14)",
    twinkle: true,
  },
  default: {
    colors: ["#cfcac0", "#e7e2d6"],
    size: [1, 2],
    speed: [0.05, 0.12],
    drift: [0, -0.05],
    glow: null,
    twinkle: false,
  },
};

const PARTICLE_COUNT = 60;

export default function MoodCanvas({ mood }: MoodCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const moodRef = useRef<MoodKey>("default");

  useEffect(() => {
    moodRef.current = (mood in MOODS ? mood : "default") as MoodKey;
  }, [mood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    class Mote {
      x = 0;
      y = 0;
      r = 0;
      color = "#fff";
      speed = 0;
      angle = 0;
      phase = Math.random() * Math.PI * 2;

      reset() {
        const cfg = MOODS[moodRef.current];
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.r = cfg.size[0] + Math.random() * (cfg.size[1] - cfg.size[0]);
        this.color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
        this.speed = cfg.speed[0] + Math.random() * (cfg.speed[1] - cfg.speed[0]);
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        const cfg = MOODS[moodRef.current];
        this.x += cfg.drift[0] + Math.cos(this.angle) * this.speed * 0.4;
        this.y += cfg.drift[1] + Math.sin(this.angle) * this.speed * 0.4;
        this.phase += 0.01;

        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;
      }

      draw() {
        if (!ctx) return;
        const cfg = MOODS[moodRef.current];
        const alpha = cfg.twinkle ? 0.35 + Math.sin(this.phase) * 0.25 : 0.4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0.05, alpha);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const motes = Array.from({ length: PARTICLE_COUNT }, () => {
      const m = new Mote();
      m.reset();
      return m;
    });

    let animFrameId: number;

    function paintGlow() {
      if (!ctx) return;
      const cfg = MOODS[moodRef.current];
      if (!cfg.glow) return;
      const prevOp = ctx.globalCompositeOperation;
      ctx.globalCompositeOperation = "screen";
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        0,
        width * 0.5,
        height * 0.35,
        Math.max(width, height) * 0.6
      );
      grad.addColorStop(0, cfg.glow);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = prevOp;
    }

    function frame() {
      ctx!.clearRect(0, 0, width, height);
      paintGlow();
      for (const m of motes) {
        m.update();
        m.draw();
      }
      animFrameId = requestAnimationFrame(frame);
    }

    if (reduceMotion) {
      // Paint a single static frame instead of animating.
      motes.forEach((m) => m.draw());
      paintGlow();
    } else {
      frame();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[2] pointer-events-none"
      aria-hidden="true"
    />
  );
}
