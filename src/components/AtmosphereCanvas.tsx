"use client";

import React, { useEffect, useRef } from "react";
import { EffectKey } from "@/data/effects";

interface AtmosphereCanvasProps {
  isActive: boolean;
  effect: EffectKey;
}

/**
 * The foreground weather/light layer, above the mood background (z-1) and
 * the ambient particle drift of MoodCanvas (z-2). This used to be rain-only;
 * it now hosts four distinct effects (see src/data/effects.ts) so the
 * foreground can actually match what's happening in the background —
 * rain for Water, a dry cross-wind for Dunes, a quiet starfield for the
 * plain Night mood, and soft morning light rays for Dawn. Which one plays
 * is decided in page.tsx (auto by mood, or a manual pick from
 * EffectPicker.tsx) and just passed in as `effect`.
 *
 * All four effects share the same canvas + requestAnimationFrame + resize
 * scaffolding; only the particle class and per-frame draw logic differ,
 * matching the pattern already established here and in MoodCanvas.tsx.
 */
export default function AtmosphereCanvas({ isActive, effect }: AtmosphereCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let animFrameId: number | null = null;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.push(id);
      return id;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    // Populated below, per-effect. `renderFrame` paints exactly one frame —
    // called every tick when animating, or once when reduced-motion is on.
    let renderFrame: () => void = () => {};

    if (effect === "rain") {
      class Drop {
        x!: number;
        y!: number;
        z!: number;
        speed!: number;
        len!: number;
        wind!: number;
        alpha!: number;
        thickness!: number;

        constructor() {
          this.reset(true);
        }
        reset(randomY: boolean) {
          this.x = Math.random() * (width + 200) - 100;
          this.y = randomY ? Math.random() * height : -20 - Math.random() * 50;
          this.z = Math.random() * 0.8 + 0.2;
          this.speed = (18 + Math.random() * 10) * this.z;
          this.len = (15 + Math.random() * 15) * this.z;
          this.wind = -2.5 * this.z;
          this.alpha = 0.2 + this.z * 0.45;
          this.thickness = 0.8 + this.z * 1.1;
        }
        update() {
          this.x += this.wind;
          this.y += this.speed;
          if (this.y > height - 30) this.reset(false);
        }
        draw() {
          ctx!.beginPath();
          ctx!.moveTo(this.x, this.y);
          ctx!.lineTo(this.x + this.wind * 1.5, this.y + this.len);
          ctx!.strokeStyle = `rgba(180, 215, 255, ${this.alpha})`;
          ctx!.lineWidth = this.thickness;
          ctx!.stroke();
        }
      }

      const dropCount = Math.min(300, Math.floor(width * 0.25));
      const drops = Array.from({ length: dropCount }, () => new Drop());

      function triggerLightning() {
        if (!overlayRef.current) return;
        const overlay = overlayRef.current;
        const flashIntensity = 0.65 + Math.random() * 0.35;
        overlay.style.opacity = flashIntensity.toString();
        later(() => {
          overlay.style.opacity = "0.15";
          later(() => {
            overlay.style.opacity = (flashIntensity * 0.8).toString();
            later(() => {
              overlay.style.opacity = "0";
            }, 60);
          }, 45);
        }, 50);
        later(triggerLightning, 5000 + Math.random() * 9000);
      }

      renderFrame = () => {
        ctx.clearRect(0, 0, width, height);
        for (const d of drops) {
          d.update();
          d.draw();
        }
      };
      if (!reduceMotion) later(triggerLightning, 800);
    } else if (effect === "wind") {
      // Dry cross-wind carrying sand/dust — mostly horizontal drift with
      // the occasional stronger gust, for the Dunes mood.
      class Grain {
        x!: number;
        y!: number;
        r!: number;
        speed!: number;
        alpha!: number;
        wobble!: number;

        constructor() {
          this.reset();
        }
        reset() {
          this.x = Math.random() * (width + 300) - 150;
          this.y = Math.random() * height;
          this.r = 0.6 + Math.random() * 1.8;
          this.speed = 1.2 + Math.random() * 2.6;
          this.alpha = 0.15 + Math.random() * 0.35;
          this.wobble = Math.random() * Math.PI * 2;
        }
        update(gust: number) {
          this.wobble += 0.05;
          this.x += this.speed + gust;
          this.y += Math.sin(this.wobble) * 0.4;
          if (this.x > width + 20) {
            this.x = -20;
            this.y = Math.random() * height;
          }
        }
        draw() {
          ctx!.beginPath();
          ctx!.ellipse(this.x, this.y, this.r * 2.2, this.r * 0.6, 0.15, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(214, 178, 128, ${this.alpha})`;
          ctx!.fill();
        }
      }

      const grainCount = Math.min(260, Math.floor(width * 0.2));
      const grains = Array.from({ length: grainCount }, () => new Grain());
      let gust = 0;
      let gustTarget = 0;

      function scheduleGust() {
        gustTarget = 1.5 + Math.random() * 3;
        later(() => {
          gustTarget = 0;
        }, 900 + Math.random() * 700);
        later(scheduleGust, 3500 + Math.random() * 4500);
      }
      if (!reduceMotion) later(scheduleGust, 1200);

      renderFrame = () => {
        ctx.clearRect(0, 0, width, height);
        gust += (gustTarget - gust) * 0.04;
        for (const g of grains) {
          g.update(gust);
          g.draw();
        }
      };
    } else if (effect === "stars") {
      // A quiet, twinkling starfield with an occasional shooting star, for
      // the plain Night mood.
      class Star {
        x!: number;
        y!: number;
        r!: number;
        phase!: number;
        twinkleSpeed!: number;

        constructor() {
          this.reset();
        }
        reset() {
          this.x = Math.random() * width;
          this.y = Math.random() * height * 0.85;
          this.r = 0.6 + Math.random() * 1.6;
          this.phase = Math.random() * Math.PI * 2;
          this.twinkleSpeed = 0.01 + Math.random() * 0.02;
        }
        update() {
          this.phase += this.twinkleSpeed;
        }
        draw() {
          const alpha = 0.35 + Math.sin(this.phase) * 0.35;
          ctx!.beginPath();
          ctx!.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255, 250, 235, ${Math.max(0.1, alpha)})`;
          ctx!.fill();
        }
      }

      const starCount = Math.min(220, Math.floor(width * 0.16));
      const stars = Array.from({ length: starCount }, () => new Star());

      interface ShootingStar {
        x: number;
        y: number;
        vx: number;
        vy: number;
        life: number;
        maxLife: number;
      }
      let shootingStars: ShootingStar[] = [];
      function spawnShootingStar() {
        shootingStars.push({
          x: Math.random() * width * 0.6 + width * 0.2,
          y: Math.random() * height * 0.25,
          vx: 9 + Math.random() * 6,
          vy: 4 + Math.random() * 3,
          life: 0,
          maxLife: 40 + Math.random() * 20,
        });
        later(spawnShootingStar, 6000 + Math.random() * 9000);
      }
      if (!reduceMotion) later(spawnShootingStar, 2500);

      renderFrame = () => {
        ctx.clearRect(0, 0, width, height);
        for (const s of stars) {
          s.update();
          s.draw();
        }
        shootingStars = shootingStars.filter((s) => s.life < s.maxLife);
        for (const s of shootingStars) {
          const t = s.life / s.maxLife;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 4, s.y - s.vy * 4);
          ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - t) * 0.8})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
          s.x += s.vx;
          s.y += s.vy;
          s.life++;
        }
      };
    } else {
      // "rays": soft diagonal light beams drifting across the frame, plus
      // slow-rising dust motes catching the light — for the Dawn mood.
      interface Ray {
        width: number;
        speed: number;
        offset: number;
        alpha: number;
      }
      const rays: Ray[] = Array.from({ length: 4 }, (_, i) => ({
        width: width * (0.12 + Math.random() * 0.08),
        speed: 0.06 + Math.random() * 0.05,
        offset: i * (width / 3),
        alpha: 0.05 + Math.random() * 0.05,
      }));

      class Mote {
        x!: number;
        y!: number;
        r!: number;
        speed!: number;
        phase!: number;

        constructor() {
          this.reset();
        }
        reset() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.r = 1 + Math.random() * 2.2;
          this.speed = 0.15 + Math.random() * 0.25;
          this.phase = Math.random() * Math.PI * 2;
        }
        update() {
          this.y -= this.speed;
          this.x += Math.sin(this.phase) * 0.15;
          this.phase += 0.01;
          if (this.y < -10) {
            this.y = height + 10;
            this.x = Math.random() * width;
          }
        }
        draw() {
          const alpha = 0.3 + Math.sin(this.phase * 2) * 0.2;
          ctx!.beginPath();
          ctx!.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255, 236, 200, ${Math.max(0.1, alpha)})`;
          ctx!.fill();
        }
      }

      const motes = Array.from({ length: 70 }, () => new Mote());
      let rayPhase = 0;

      renderFrame = () => {
        ctx.clearRect(0, 0, width, height);
        rayPhase += 1;
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        for (const r of rays) {
          const x = ((r.offset + rayPhase * r.speed) % (width + r.width * 2)) - r.width;
          ctx.save();
          ctx.translate(x, -height * 0.3);
          ctx.rotate(0.35);
          const grad = ctx.createLinearGradient(0, 0, r.width, 0);
          grad.addColorStop(0, "rgba(255, 232, 190, 0)");
          grad.addColorStop(0.5, `rgba(255, 232, 190, ${r.alpha})`);
          grad.addColorStop(1, "rgba(255, 232, 190, 0)");
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, r.width, height * 1.8);
          ctx.restore();
        }
        ctx.restore();
        for (const m of motes) {
          m.update();
          m.draw();
        }
      };
    }

    function animate() {
      renderFrame();
      animFrameId = requestAnimationFrame(animate);
    }

    if (reduceMotion) {
      renderFrame();
    } else {
      animate();
    }

    const overlayNode = overlayRef.current;
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
      timers.forEach(clearTimeout);
      if (overlayNode) overlayNode.style.opacity = "0";
    };
  }, [isActive, effect]);

  return (
    <>
      {/*
        This used to own a flat, static navy SVG "sky" plus an 80%-opacity
        black overlay, painted at z-0. BackgroundVideo now owns the real
        full-bleed mood background at z-1, so that static layer was both
        redundant and — because it sat *above* the (previously unstyled,
        zero-height) mood layers in effect — the reason mood color barely
        ever read through even once the layout bug above is fixed. This is
        now just a light legibility scrim above the mood layer, at z-2, and
        the weather/light FX above that.
      */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/55 via-black/10 to-black/35 pointer-events-none breathing-scrim"></div>
      <div className="absolute inset-0 z-[4] vignette pointer-events-none"></div>

      <canvas
        ref={canvasRef}
        id="atmosphereCanvas"
        className={isActive ? "active" : ""}
      ></canvas>
      <div ref={overlayRef} id="lightningFlashOverlay"></div>
    </>
  );
}
