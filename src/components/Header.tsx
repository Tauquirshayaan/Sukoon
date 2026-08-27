"use client";

import React, { useEffect, useState } from "react";

export default function Header() {
  const [onlineCount, setOnlineCount] = useState(1050);

  useEffect(() => {
    setOnlineCount(Math.floor(Math.random() * 200) + 950);
    const interval = setInterval(() => {
      setOnlineCount((prev) => {
        const isIncrease = Math.random() > 0.4;
        const fluctuate = Math.floor(Math.random() * 7) + 1;
        let newCount = isIncrease ? prev + fluctuate : prev - fluctuate;
        if (newCount < 800) newCount = 800 + fluctuate;
        return newCount;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="absolute top-2.5 sm:top-4 left-0 right-0 z-30 px-2.5 xs:px-3 sm:px-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between gap-1.5 xs:gap-2 sm:gap-3 w-full">
        {/* 1. Online Counter Badge */}
        <div className="header-pill flex-1 sm:flex-initial sm:min-w-[105px] px-2 xs:px-3 text-emerald-400 gap-1.5 shrink-0 select-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
          <span className="text-white/95 font-mono font-bold tracking-tight">{onlineCount}</span>
          <span className="text-white/60 text-[10px] font-normal">online</span>
        </div>


        {/* 3. Right side: About, FAQ, Support */}
        <nav aria-label="Primary" className="flex items-center gap-1.5 xs:gap-2 flex-1 sm:flex-initial justify-end shrink-0">
          <button 
            type="button" 
            onClick={() => window.dispatchEvent(new CustomEvent("open-about-modal"))}
            className="hidden sm:inline-flex header-pill px-3.5"
          >
            About
          </button>
          <button 
            type="button" 
            onClick={() => window.dispatchEvent(new CustomEvent("open-faq-modal"))}
            className="hidden sm:inline-flex header-pill px-3.5"
          >
            FAQ
          </button>

          <button
            type="button"
            aria-label="Open support modal"
            className="header-pill w-full sm:w-auto px-2 xs:px-3 sm:px-3.5 gap-1.5 hover:border-amber-400/50 hover:text-amber-200"
            onClick={() => window.dispatchEvent(new CustomEvent("open-support-modal"))}
          >
            <span className="text-xs text-red-400 animate-pulse shrink-0" aria-hidden="true">
              ❤️
            </span>
            <span className="font-semibold text-white/90 text-[11px] xs:text-xs">Support</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
