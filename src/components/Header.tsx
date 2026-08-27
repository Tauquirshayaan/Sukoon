"use client";

import { useEffect, useState } from "react";
import { ref, onValue, set, push, remove, onDisconnect } from "firebase/database";
import { db } from "@/lib/firebase";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Header() {
  const [onlineCount, setOnlineCount] = useState(0);

  // Real presence count via Firebase RTDB: each open tab claims a
  // `presence/{connectionId}` entry while `.info/connected` is true, and
  // Firebase's own onDisconnect hook removes it the moment the socket
  // drops (tab close, network loss, refresh) — no server code required.
  useEffect(() => {
    const presenceListRef = ref(db, "presence");
    const myPresenceRef = push(presenceListRef);
    const connectedRef = ref(db, ".info/connected");

    const unsubscribeConnected = onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        onDisconnect(myPresenceRef).remove();
        set(myPresenceRef, true);
      }
    });

    const unsubscribeCount = onValue(presenceListRef, (snap) => {
      setOnlineCount(snap.exists() ? Object.keys(snap.val()).length : 0);
    });

    return () => {
      unsubscribeConnected();
      unsubscribeCount();
      remove(myPresenceRef);
    };
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
            onClick={() => scrollToSection("about")}
            className="header-pill px-2 xs:px-2.5 sm:px-3.5 text-[11px] xs:text-xs shrink-0"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("faq")}
            className="header-pill px-2 xs:px-2.5 sm:px-3.5 text-[11px] xs:text-xs shrink-0"
          >
            FAQ
          </button>

          <button
            type="button"
            aria-label="Open support modal"
            className="header-pill px-2 xs:px-2.5 sm:px-3.5 gap-1.5 hover:border-amber-400/50 hover:text-amber-200 shrink-0"
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
