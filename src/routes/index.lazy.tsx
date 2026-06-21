import { createLazyFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

import heroLightLeak from "@/assets/hero-light-leak.jpg";

export const Route = createLazyFileRoute("/")({
  component: Farewell,
});

const SHUTDOWN_AT = new Date("2026-10-20T18:14:00Z");
const SHUTDOWN_HUMAN = "20 Oct 2026 · 11:59 PM NPT";
const LETTER_DATE = "20 Oct 2026";
const YEARS = "Kathmandu University · Jan 2026 to Oct 2026";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function useCountdown(target: Date) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return null;
  const ms = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return { d, h, m, s, done: ms === 0 };
}

function Farewell() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.06]);
  const countdown = useCountdown(SHUTDOWN_AT);

  return (
    <div className="bg-canvas text-ink font-serif selection:bg-neutral-800 selection:text-neutral-100 antialiased">
      <section className="relative h-screen min-h-[680px] flex flex-col items-center justify-center px-6 overflow-hidden grain">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={heroLightLeak}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas/40 via-canvas/20 to-canvas" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
          className="relative z-10 text-center space-y-14"
        >
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-neutral-500">
            {LETTER_DATE} · A letter from KUPID
          </p>

          <h1 className="animate-breathe text-6xl md:text-9xl font-medium tracking-tight leading-none text-balance">
            <span className="italic font-light">KUPID</span>
            <span className="text-neutral-500"> is closing</span>
            <span className="text-neutral-500">.</span>
          </h1>

          <div className="space-y-5 max-w-[44ch] mx-auto">
            <p className="text-lg md:text-xl italic font-light text-neutral-400 text-balance leading-relaxed">
              We built it for the awkward near-moments at KU. Today, we are
              saying it straight.
            </p>
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-neutral-500">
              Last sign-in · {SHUTDOWN_HUMAN}
            </p>
          </div>
        </motion.div>

        <motion.a
          href="#letter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-200 transition-colors duration-700"
        >
          Read the letter ↓
        </motion.a>
      </section>

      <motion.section
        id="letter"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        className="py-32 md:py-56 px-6"
      >
        <div className="max-w-[60ch] mx-auto">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-neutral-500 mb-16 text-center">
            To everyone who ever opened the app
          </p>

          <p className="text-xl md:text-[1.65rem] leading-[1.55] text-neutral-100 text-pretty mb-10">
            <span className="float-left mr-3 mt-2 text-[5.5rem] leading-[0.78] font-medium italic text-neutral-100">
              W
            </span>
            e built KUPID for the quiet almosts at KU. For the person you kept
            seeing near the canteen, in the library, outside class, on the
            stairs, and still could not start a conversation with. That small,
            nervous distance was the whole reason.
          </p>

          <div className="space-y-7 text-lg md:text-xl leading-[1.8] text-neutral-400 text-pretty font-light">
            <p>
              KUPID was never magic. It was a small bridge. Some of you crossed
              it. Some stood there, smiled, and went back. Both mattered to us.
            </p>
            <p>
              We made mistakes too. The app was slow sometimes. Some words tried
              too hard. You told us. Usually, you were right.
            </p>
            <p>
              Still, you trusted us with awkward, precious things like photos,
              prompts, first messages, and second thoughts. We do not take that
              lightly. We never did.
            </p>
            <p>
              Your chats were end-to-end encrypted. We carried them, but we
              could not read them. We are not going to count them now to prove
              KUPID mattered. A private conversation should stay private.
            </p>
            <p>
              After{" "}
              <span className="text-neutral-100 italic">{SHUTDOWN_HUMAN}</span>
              , KUPID will go offline, and production user data will be
              permanently deleted. No private archive. Gone
              means gone.
            </p>
            <p>
              If KUPID was just a strange little app you opened once, thank you
              for giving it a chance. If it gave you someone, or even just the
              courage to say something, keep that with the person. That is where
              it belongs.
            </p>
            <p className="text-neutral-200 italic">See you around campus.</p>
          </div>

          <div className="pt-16">
            <p className="font-sans text-sm text-neutral-300">With care,</p>
            <p className="text-2xl md:text-3xl mt-3 italic font-light">
              The KUPID Team
            </p>
          </div>
        </div>
      </motion.section>

      <Chapter title="What happens next.">
        <div className="mb-16 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-neutral-500 mb-5">
            Time remaining
          </p>
          {countdown ? (
            <div
              className="font-serif text-3xl md:text-5xl tracking-tight text-neutral-100 tabular-nums"
              aria-live="polite"
            >
              <Unit value={countdown.d} label="days" />
              <Sep />
              <Unit value={countdown.h} label="hours" />
              <Sep />
              <Unit value={countdown.m} label="min" />
              <Sep />
              <Unit value={countdown.s} label="sec" />
            </div>
          ) : (
            <div className="font-serif text-3xl md:text-5xl text-neutral-700">
              Soon
            </div>
          )}
        </div>

        <div className="divide-y divide-neutral-900/80 border-y border-neutral-900/80 mb-20">
          <Row when="Now" what="New sign-ups are closed." />
          <Row
            when={`Until ${SHUTDOWN_HUMAN}`}
            what="Existing users can sign in and review their account."
          />
          <Row
            when="After 20 July 2026"
            what="KUPID goes offline. Production data deletion begins."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-x-14 gap-y-16">
          <Value
            title="Small on purpose."
            body="Twelve profiles a day. Enough to pay attention. Not enough to forget that faces are people."
          />
          <Value
            title="Private stayed private."
            body="Chats were end-to-end encrypted. We carried them, but we did not read them."
          />
        </div>

        <div className="mt-20 pt-14 border-t border-neutral-900/80 text-lg md:text-xl leading-[1.8] text-neutral-400 text-pretty font-light max-w-[58ch]">
          <p>
            After shutdown, production user data will be permanently deleted:
            <span className="text-neutral-200">
              {" "}
              profiles, photos, verification files, matches, encrypted chat
              records, and account data.
            </span>
          </p>
          <p className="text-neutral-500 italic mt-7">
            No private archive. Gone means gone.
          </p>
        </div>
      </Chapter>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="py-32 md:py-48 px-6 border-t border-neutral-900/70"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center space-x-4 mb-14">
            <div className="h-px w-10 bg-neutral-800" />
            <div className="size-1.5 rounded-full bg-neutral-700" />
            <div className="h-px w-10 bg-neutral-800" />
          </div>

          <p className="text-2xl md:text-4xl font-light italic text-neutral-200 text-balance leading-[1.35]">
            For every almost. Every first message you nearly didn't send. Every
             hello on a small campus. Thank you.
          </p>
        </div>
      </motion.section>

      <footer
        ref={footerRef}
        className="relative pt-40 pb-20 px-6 overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center space-y-20">
          <motion.div
            style={{ opacity: wordmarkOpacity }}
            className="pointer-events-none"
          >
            <span className="font-sans text-3xl md:text-5xl tracking-[0.55em] uppercase font-extralight text-neutral-100">
              KUPID
            </span>
          </motion.div>

          <div className="text-center space-y-5">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-neutral-600">
              {YEARS}
            </p>
            <p className="font-serif italic text-base md:text-lg text-neutral-500 max-w-md mx-auto text-balance">
              The lights are dimming. Take care of each other.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Chapter({
  number,
  title,
  children,
}: {
  number?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      className="py-28 md:py-40 px-6 border-t border-neutral-900/70"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-baseline gap-6 mb-14">
          {number && (
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-neutral-600">
              {number}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-light italic text-neutral-100 tracking-tight text-balance">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </motion.section>
  );
}

function Row({ when, what }: { when: string; what: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2 md:gap-10 py-7">
      <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-neutral-500">
        {when}
      </p>
      <p className="text-lg md:text-xl text-neutral-200 font-light leading-relaxed text-pretty">
        {what}
      </p>
    </div>
  );
}

function Value({ title, body }: { title: string; body: string }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xl md:text-2xl italic font-light text-neutral-100">
        {title}
      </h3>
      <p className="text-base md:text-lg text-neutral-400 font-light leading-[1.75] text-pretty">
        {body}
      </p>
    </div>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="font-medium">{String(value).padStart(2, "0")}</span>
      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500">
        {label}
      </span>
    </span>
  );
}

function Sep() {
  return <span className="px-3 text-neutral-700">·</span>;
}