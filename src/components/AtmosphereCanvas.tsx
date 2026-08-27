"use client";

import React, { useEffect, useRef, useState } from "react";

interface AtmosphereCanvasProps {
  isActive: boolean;
}

export default function AtmosphereCanvas({ isActive }: AtmosphereCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current || !overlayRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let animFrameId: number;
    let lightningTimeout: NodeJS.Timeout;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

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
        if (this.y > height - 30) {
          this.reset(false);
        }
      }
      draw() {
        if(!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.wind * 1.5, this.y + this.len);
        ctx.strokeStyle = `rgba(180, 215, 255, ${this.alpha})`;
        ctx.lineWidth = this.thickness;
        ctx.stroke();
      }
    }

    const dropCount = Math.min(300, Math.floor(width * 0.25));
    const drops = Array.from({ length: dropCount }, () => new Drop());

    function triggerLightning() {
      if (!overlayRef.current) return;
      const overlay = overlayRef.current;
      const flashIntensity = 0.65 + Math.random() * 0.35;
      overlay.style.opacity = flashIntensity.toString();

      setTimeout(() => {
        overlay.style.opacity = "0.15";
        setTimeout(() => {
          overlay.style.opacity = (flashIntensity * 0.8).toString();
          setTimeout(() => {
            overlay.style.opacity = "0";
          }, 60);
        }, 45);
      }, 50);

      const nextDelay = 5000 + Math.random() * 9000;
      lightningTimeout = setTimeout(triggerLightning, nextDelay);
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      for (let i = 0; i < drops.length; i++) {
        drops[i].update();
        drops[i].draw();
      }
      animFrameId = requestAnimationFrame(animate);
    }

    animate();
    lightningTimeout = setTimeout(triggerLightning, 800);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
      clearTimeout(lightningTimeout);
    };
  }, [isActive]);

  return (
    <>
      {/* Background container */}
      <div className="absolute inset-0 z-0">
         <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full object-cover" role="img" aria-label="Sukoon background">
            <defs>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a202c" />
                <stop offset="100%" stopColor="#2d3748" />
              </linearGradient>
            </defs>
            <rect width="1600" height="900" fill="url(#skyGrad)" />
            {/* Can add Islamic geometric patterns here later */}
         </svg>
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none"></div>
      </div>

      <canvas
        ref={canvasRef}
        id="rainCanvas"
        className={isActive ? "active" : ""}
      ></canvas>
      <div
        ref={overlayRef}
        id="lightningFlashOverlay"
      ></div>
    </>
  );
}
