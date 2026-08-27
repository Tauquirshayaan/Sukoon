"use client";

import React, { useEffect, useState, useRef } from "react";
import { ref, onValue, push, set, query, orderByChild, limitToLast } from "firebase/database";
import { db } from "../lib/firebase";
import { cleanMessage } from "../lib/profanityFilter";

interface ChatMessage {
  id: string;
  name: string;
  text: string;
  timestamp: number;
}

const FLOWER_NAMES = [
  "Rose", "Jasmine", "Lily", "Orchid", "Tulip", "Iris", "Daisy", "Lotus", 
  "Peony", "Daffodil", "Violet", "Marigold", "Lavender", "Bluebell", 
  "Snowdrop", "Poppy", "Hydrangea", "Camellia", "Magnolia", "Azalea",
  "Aster", "Begonia", "Carnation", "Chrysanthemum", "Clematis", "Crocus",
  "Dahlia", "Freesia", "Geranium", "Hibiscus", "Hyacinth", "Lilac"
];

export default function Modals() {
  const [activeModal, setActiveModal] = useState<"support" | "chat" | "about" | "faq" | null>(null);
  
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("Anonymous");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate or retrieve user name. Appending a random 3-digit suffix
    // keeps collisions rare even with thousands of concurrent visitors
    // sharing the same 32-name pool (localStorage has no way to check
    // what names other visitors are already using).
    let storedName = localStorage.getItem('sukoon_chat_name');
    if (!storedName) {
      const flower = FLOWER_NAMES[Math.floor(Math.random() * FLOWER_NAMES.length)];
      const suffix = Math.floor(Math.random() * 900) + 100;
      storedName = `${flower} ${suffix}`;
      localStorage.setItem('sukoon_chat_name', storedName);
    }
    setUserName(storedName);

    const handleOpenSupport = () => setActiveModal("support");
    const handleOpenChat = () => setActiveModal("chat");
    const handleOpenAbout = () => setActiveModal("about");
    const handleOpenFaq = () => setActiveModal("faq");
    
    window.addEventListener("open-support-modal", handleOpenSupport);
    window.addEventListener("open-chat-modal", handleOpenChat);
    window.addEventListener("open-about-modal", handleOpenAbout);
    window.addEventListener("open-faq-modal", handleOpenFaq);

    return () => {
      window.removeEventListener("open-support-modal", handleOpenSupport);
      window.removeEventListener("open-chat-modal", handleOpenChat);
      window.removeEventListener("open-about-modal", handleOpenAbout);
      window.removeEventListener("open-faq-modal", handleOpenFaq);
    };
  }, []);

  // Close any open modal on Escape key
  useEffect(() => {
    if (!activeModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [activeModal]);

  // Listen for messages via Firebase Realtime Database
  useEffect(() => {
    if (activeModal === "chat") {
      // Query the last 100 messages ordered by timestamp
      const messagesRef = query(
        ref(db, 'chatMessages'),
        orderByChild('timestamp'),
        limitToLast(100)
      );
      
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert the object map into an array and sort by timestamp
          const messageList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          })).sort((a, b) => a.timestamp - b.timestamp);
          setMessages(messageList as ChatMessage[]);
        } else {
          setMessages([]);
        }
      });

      // Cleanup listener when modal closes or component unmounts
      return () => unsubscribe();
    }
  }, [activeModal]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (activeModal === "chat" && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeModal]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!inputText.trim()) return;

    setIsLoading(true);
    
    try {
      const cleanText = cleanMessage(inputText.trim());
      
      const messagesRef = ref(db, 'chatMessages');
      const newMessageRef = push(messagesRef);
      
      await set(newMessageRef, {
        name: userName,
        text: cleanText,
        timestamp: Date.now()
      });

      setInputText("");
    } catch (e) {
      console.error(e);
      setErrorMsg("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    let hours = d.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} ${ampm}`;
  };

  if (!activeModal) return null;

  return (
    <>
      {activeModal === "support" && (
        <div className="app-modal open" role="dialog" aria-modal="true" onClick={() => setActiveModal(null)}>
          <div className="app-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xl flex items-center justify-center transition-colors"
              onClick={() => setActiveModal(null)}
            >
              &times;
            </button>

            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto mb-3 text-2xl">
              ❤️
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Support Sukoon</h2>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-5 max-w-md mx-auto">
              Sukoon is a free ambient radio to help you find peace. We promise to never put ads on this platform. If you'd like to support the hosting costs, please consider donating.
            </p>

            <button
              type="button"
              className="mt-4 text-xs text-white/50 hover:text-white underline"
              onClick={() => setActiveModal(null)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {activeModal === "about" && (
        <div className="app-modal open" role="dialog" aria-modal="true" onClick={() => setActiveModal(null)}>
          <div className="app-modal-card text-left" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xl flex items-center justify-center transition-colors"
              onClick={() => setActiveModal(null)}
            >
              &times;
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">About Sukoon</h2>
            <div className="space-y-4">
              <p className="text-white/80 text-sm leading-relaxed text-center px-2">
                Sukoon is a carefully curated ambient radio experience designed to help you find peace and tranquility. We blend beautiful recitations of the Quran with soothing atmospheric sounds like rain and gentle waves.
              </p>
              <p className="text-white/80 text-sm leading-relaxed text-center px-2">
                Our mission is to create a frictionless, zero-distraction environment where you can listen, reflect, and relax without interruptions or advertisements.
              </p>
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                className="text-xs text-white/50 hover:text-white underline"
                onClick={() => setActiveModal(null)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "faq" && (
        <div className="app-modal open" role="dialog" aria-modal="true" onClick={() => setActiveModal(null)}>
          <div className="app-modal-card text-left" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xl flex items-center justify-center transition-colors"
              onClick={() => setActiveModal(null)}
            >
              &times;
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-5 px-2">
              <div>
                <h3 className="text-white font-bold text-sm mb-1">Is Sukoon free to use?</h3>
                <p className="text-white/70 text-xs leading-relaxed">Yes, Sukoon is entirely free. There are no ads, subscriptions, or hidden fees.</p>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1">How does the background atmosphere work?</h3>
                <p className="text-white/70 text-xs leading-relaxed">You can toggle ambient sounds (like rain or lightning) using the Atmosphere button at the bottom. It overlays naturally with the recitations.</p>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1">Can I request a specific Surah?</h3>
                <p className="text-white/70 text-xs leading-relaxed">Currently, the radio plays from a curated selection of calming recitations. You can use the Shuffle button to jump to a random track.</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                className="text-xs text-white/50 hover:text-white underline"
                onClick={() => setActiveModal(null)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "chat" && (
        <div id="liveChatPanel" className="app-modal open" role="dialog" aria-modal="true" onClick={() => setActiveModal(null)}>
          <div className="chat-card flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" aria-hidden="true"></span>
                  <h2 className="text-white font-bold text-sm">Live Chat</h2>
                </div>
                <p className="text-white/40 text-[10px] pl-4">You&apos;re chatting as <span className="text-amber-300 font-semibold">{userName}</span></p>
              </div>
              <button
                type="button"
                aria-label="Close live chat"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-lg flex items-center justify-center transition-colors"
                onClick={() => setActiveModal(null)}
              >
                &times;
              </button>
            </div>
            
            <div className="chat-messages flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.length === 0 && (
                <div className="text-center text-white/50 text-xs mt-4">No messages yet. Be the first to say Salam!</div>
              )}
              {messages.map((msg) => {
                const isAdmin = msg.name === 'Admin';
                const isOwn = !isAdmin && msg.name === userName;
                return (
                  <div key={msg.id} className={`chat-msg-row flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`chat-msg rounded-xl p-3 max-w-[85%] text-sm border ${
                        isAdmin
                          ? 'bg-amber-500/15 border-amber-400/40'
                          : isOwn
                            ? 'bg-amber-500/10 border-amber-400/25'
                            : 'bg-black/40 border-white/10'
                      }`}
                    >
                      <span className="chat-msg-name font-bold block mb-1 text-xs" style={{ color: isAdmin ? "#fbbf24" : isOwn ? "#fcd34d" : "#9ca3af" }}>
                        {isOwn ? "You" : msg.name}:
                      </span>
                      <span className="text-white/90 break-words">{msg.text}</span>
                      <span className="chat-msg-time block text-[10px] text-white/40 mt-1 text-right">{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {errorMsg && (
              <div className="px-3 py-2 bg-red-500/20 border-t border-red-500/40 text-red-200 text-xs text-center shrink-0">
                ⚠️ {errorMsg}
              </div>
            )}

            <form className="flex items-center gap-2 px-3 py-3 border-t border-white/10 shrink-0" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={200}
                disabled={isLoading}
                className="flex-1 px-3 py-2 rounded-xl bg-black/50 border border-white/15 focus:border-amber-400 focus:outline-none text-white placeholder-white/40 text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="w-10 h-10 shrink-0 rounded-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-black flex items-center justify-center transition-all active:scale-95"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
