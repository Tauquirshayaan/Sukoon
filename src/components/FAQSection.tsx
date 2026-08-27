const FAQS: { question: string; answer: string }[] = [
  {
    question: "Is Sukoon free to use?",
    answer:
      "Yes — Sukoon is completely free. You can play Quran online and listen for as long as you like with no sign-up, no subscription, and no hidden fees. There are no ads anywhere on the site.",
  },
  {
    question: "How do I play Quran online for free on Sukoon?",
    answer:
      "Just open sukoon.vercel.app and tap \"Tap to Listen.\" Recitation starts immediately and plays continuously — there's no account to create and nothing to download.",
  },
  {
    question: "Which Quran reciters are available?",
    answer:
      "Sukoon streams a curated playlist of recitations, including Idrees Abkar, chosen for a calm, clear reading style that works well as ambient background audio.",
  },
  {
    question: "Can I listen to Quran online on my phone?",
    answer:
      "Yes. Sukoon is fully responsive and works in any mobile browser (iOS and Android) as well as tablets and desktops — no app install required.",
  },
  {
    question: "Does Sukoon have ads or in-app purchases?",
    answer:
      "No. Sukoon has never shown an advertisement and never will. It's funded entirely through optional listener support (see the Support button in the header).",
  },
  {
    question: "How does the ambient atmosphere feature work?",
    answer:
      "Each track plays alongside a matching visual and audio atmosphere — rain, a quiet starfield, desert wind, or soft morning light — which you can toggle or change manually using the Atmosphere and Vibe controls at the bottom of the player.",
  },
  {
    question: "Can I choose a specific Surah?",
    answer:
      "Sukoon currently plays from a curated, continuous stream rather than an on-demand catalog. Use the Shuffle button to jump to a different track in the playlist at any time.",
  },
  {
    question: "What is the live chat, and how does the naming work?",
    answer:
      "The live chat lets everyone currently listening say hello. You're given an anonymous, randomly generated name (a flower plus a number, like \"Bluebell 204\") stored only in your browser — no account or personal information is required.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. Sukoon has no accounts, logins, or passwords. Everything — your listening session and your chat name — works anonymously in your browser.",
  },
  {
    question: "Is my data or listening activity private?",
    answer:
      "Sukoon doesn't track what you listen to or tie any activity to your identity. The only thing stored locally in your browser is your anonymous chat display name.",
  },
];

export default function FAQSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-[#0d0503] px-4 sm:px-6 py-16 sm:py-24 scroll-mt-6"
      aria-labelledby="faq-heading"
    >
      {/* Static, authored JSON-LD only — no user input involved */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-amber-400/80 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="font-hindi text-3xl sm:text-5xl text-white font-bold mt-3"
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="faq-item group bg-white/[0.03] border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 open:bg-white/[0.05]"
            >
              <summary className="faq-summary flex items-center justify-between gap-3 cursor-pointer list-none text-white font-semibold text-sm sm:text-base py-1">
                <span>{faq.question}</span>
                <svg
                  className="w-4 h-4 shrink-0 text-amber-400 transition-transform duration-200 group-open:rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mt-2.5 pr-7">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
