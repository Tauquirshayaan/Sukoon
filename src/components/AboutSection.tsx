export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#120806] px-4 sm:px-6 py-16 sm:py-24 scroll-mt-6"
      aria-labelledby="about-heading"
    >
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-amber-400/80 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase">
          About
        </span>
        <h2
          id="about-heading"
          className="font-hindi text-3xl sm:text-5xl text-white font-bold mt-3 mb-8"
        >
          About Sukoon
        </h2>

        <div className="text-white/75 text-sm sm:text-base leading-relaxed sm:leading-loose text-left sm:text-center space-y-5">
          <p>
            Sukoon is a free ambient Quran radio built for one purpose: to let you{" "}
            <strong className="text-white/90 font-semibold">play Quran online</strong>{" "}
            and simply listen — no sign-up, no algorithm, no ads. Open the site and
            you can immediately listen to Quran online free, with a continuous stream
            of recitation playing softly in the background of your day.
          </p>
          <p>
            Every track blends a beautiful recitation with a matching ambient
            atmosphere — gentle rain, a quiet night sky, warm desert wind, or soft
            morning light — so the experience feels less like streaming an app and
            more like sitting somewhere calm. The mood, the calligraphy on screen,
            and the background all shift together with the Surah currently playing.
          </p>
          <p>
            We built Sukoon as a free Quran radio because we believe a moment of
            peace shouldn&apos;t come with a subscription, a paywall, or a feed
            designed to keep you scrolling. There are no advertisements anywhere on
            this site, and we&apos;ve promised ourselves there never will be — see
            our <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-support-modal"))} className="text-amber-300 underline underline-offset-2 hover:text-amber-200">Support</button>{" "}
            page if you&apos;d like to help cover hosting costs instead.
          </p>
          <p>
            Alongside the Quran audio player, Sukoon has a small live chat where
            listeners around the world — each given an anonymous flower-and-number
            name — can share a quiet &quot;Salam&quot; with whoever else happens to
            be listening at the same time. It&apos;s optional, ephemeral, and there
            purely to make an ambient Islamic radio feel a little less solitary.
          </p>
          <p>
            Whether you&apos;re looking for Quran audio online to focus while you
            work, wind down at night, or simply keep gentle recitation on in the
            background, Sukoon is built to stay out of your way and let the
            recitation do the rest.
          </p>
        </div>
      </div>
    </section>
  );
}
