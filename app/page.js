"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── HOW IT WORKS — Pulse Ring ───────────────────────────────────────────────
function PulseRing({ delay = 0 }) {
  return (
    <motion.span
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        border: "1px solid rgba(59,130,246,0.25)",
      }}
      initial={{ scale: 1, opacity: 0.6 }}
      animate={{ scale: 2.2, opacity: 0 }}
      transition={{ duration: 2, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

// ─── HOW IT WORKS — Animated Scene ──────────────────────────────────────────
function BlueboxScene({ play }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!play) return;
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 1400),
      setTimeout(() => setStep(3), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [play]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "48px", padding: "64px 24px", minHeight: 420 }}>
      {/* Device */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={step >= 1 ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
      >
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {step === 2 && (<><PulseRing delay={0} /><PulseRing delay={0.7} /><PulseRing delay={1.4} /></>)}
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.14)", position: "relative", zIndex: 1 }}>
            <motion.div
              animate={step >= 2 ? { opacity: [1, 0.3, 1] } : { opacity: 0.4 }}
              transition={{ duration: 1.6, repeat: step === 2 ? Infinity : 0, ease: "easeInOut" }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }}
            />
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={step >= 1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontSize: 12, color: "#aaa", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0, fontWeight: 500 }}
        >
          Bluebox
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {step === 2 && (
          <motion.p key="obs" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.6 }}
            style={{ fontSize: 13, color: "#bbb", margin: 0, letterSpacing: "0.04em" }}>
            Quietly observing…
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.div key="line" initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ duration: 0.5 }}
            style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #e0e0e0, transparent)", transformOrigin: "top", marginTop: -24, marginBottom: -24 }} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.div key="card" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "24px 28px", maxWidth: 360, width: "100%", boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#111", letterSpacing: "-0.01em" }}>Issue detected</span>
            </div>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.65, margin: "0 0 10px" }}>Your internet slowed down due to high usage across multiple devices.</p>
            <p style={{ fontSize: 13, color: "#3b82f6", fontWeight: 500, margin: 0 }}>No immediate action needed.</p>
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 11, color: "#ccc", letterSpacing: "0.03em" }}>Bluebox · Just now</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── HOW IT WORKS — Section ──────────────────────────────────────────────────
function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ padding: "100px 20px", background: "#fafafa", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500, marginBottom: 14 }}>
          How it works
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#0a0a0a", lineHeight: 1.15, margin: "0 0 16px" }}>
          Sits quietly.<br />Speaks simply.
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: 16, color: "#888", lineHeight: 1.65, margin: "0 auto 60px", maxWidth: 420 }}>
          Bluebox watches your office systems in the background and sends you a plain message the moment something needs attention.
        </motion.p>
        <BlueboxScene play={inView} />
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 3.2 }}
          style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: 48, flexWrap: "wrap" }}>
          {[{ num: "01", label: "Plug it in" }, { num: "02", label: "It observes" }, { num: "03", label: "You're informed" }].map(s => (
            <div key={s.num} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 11, color: "#ccc", fontWeight: 600, letterSpacing: "0.08em", margin: "0 0 4px" }}>{s.num}</p>
              <p style={{ fontSize: 13, color: "#888", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── ALERT CARD (rotating) ───────────────────────────────────────────────────
const ALERT_MSGS = [
  { icon: "⚠️", title: "Unusual activity noticed", body: "Your internet connection slowed down due to high usage across multiple devices.", action: "No immediate action needed — normal by evening." },
  { icon: "✅", title: "All systems running smoothly", body: "Everything looks good this morning. No issues detected overnight.", action: "You're all set for the day." },
  { icon: "🔔", title: "Printer offline", body: "The office printer lost its connection about 10 minutes ago.", action: "Try turning it off and on again. That usually does it." },
];

function AlertCard() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const msg = ALERT_MSGS[idx];

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i + 1) % ALERT_MSGS.length); setFade(true); }, 320);
    }, 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "28px 32px", maxWidth: 440, margin: "0 auto", boxShadow: "0 4px 32px rgba(0,0,0,0.07)", transition: "opacity 0.3s ease", opacity: fade ? 1 : 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 18 }}>{msg.icon}</span>
        <span style={{ fontWeight: 600, fontSize: 15, color: "#111", letterSpacing: "-0.01em" }}>{msg.title}</span>
      </div>
      <p style={{ fontSize: 14, color: "#555", lineHeight: 1.65, margin: "0 0 10px" }}>{msg.body}</p>
      <p style={{ fontSize: 13.5, color: "#3b82f6", fontWeight: 500, margin: 0 }}>{msg.action}</p>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
        <span style={{ fontSize: 12, color: "#aaa", letterSpacing: "0.02em" }}>Bluebox · Just now</span>
      </div>
    </div>
  );
}

// ─── FADE IN ON SCROLL ───────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: delay / 1000, ease: "easeOut" }} style={style}>
      {children}
    </motion.div>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const FEATURES = [
  { title: "Instant alerts", desc: "Know the moment something changes — before it becomes a problem." },
  { title: "Plain explanations", desc: "Every message is written like a trusted colleague is talking to you." },
  { title: "Clear next steps", desc: "You always know what to do. Or that you don't need to do anything." },
  { title: "Always on", desc: "Bluebox works around the clock. You don't have to think about it." },
];

const PLANS = [
  {
    name: "Essentials", price: "$29", period: "/mo",
    desc: "For small offices and single locations.",
    items: ["Up to 10 monitored systems", "Instant alerts", "Plain-language explanations", "Email & SMS delivery"],
  },
  {
    name: "Business", price: "$79", period: "/mo",
    desc: "For growing teams across multiple spaces.",
    items: ["Unlimited systems", "Everything in Essentials", "Priority notifications", "Monthly summary reports"],
    highlight: true,
  },
];

const NAV_LINKS = ["How it works", "Features", "Pricing"];

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function BlueboxPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif", background: "#fff", color: "#111", margin: 0, padding: 0, lineHeight: 1.6, overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 60, background: scrolled ? "rgba(255,255,255,0.92)" : "#fff", backdropFilter: "blur(12px)", borderBottom: scrolled ? "1px solid #f0f0f0" : "1px solid transparent", transition: "all 0.3s ease" }}>
        <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.03em" }}>Bluebox</span>
        <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
          {NAV_LINKS.map(l => <li key={l}><a style={{ fontSize: 14, color: "#555", textDecoration: "none", cursor: "pointer" }}>{l}</a></li>)}
        </ul>
        <button style={{ background: "#111", color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
          Get started
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ textAlign: "center", padding: "110px 20px 80px", maxWidth: 700, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <p style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500, marginBottom: 14 }}>Calm office intelligence</p>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.1, margin: "0 0 24px", color: "#0a0a0a" }}>
            Your office, always<br />under quiet watch.
          </h1>
          <p style={{ fontSize: 18, color: "#666", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.6 }}>
            A small device. A clear message when something's off. Nothing more to learn.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: "#111", color: "#fff", border: "none", borderRadius: 10, padding: "13px 28px", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
              Order Bluebox →
            </button>
            <button style={{ background: "transparent", color: "#555", border: "1px solid #e0e0e0", borderRadius: 10, padding: "13px 24px", fontSize: 15, cursor: "pointer" }}>
              See how it works
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── ALERT PREVIEW ── */}
      <div style={{ background: "#fafafa", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0", padding: "80px 20px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500, textAlign: "center", marginBottom: 8 }}>Real messages from Bluebox</p>
            <p style={{ textAlign: "center", fontSize: 15, color: "#999", margin: "0 0 48px" }}>This is what it actually looks like when Bluebox reaches out.</p>
          </FadeIn>
          <FadeIn delay={100}><AlertCard /></FadeIn>
        </div>
      </div>

      {/* ── HOW IT WORKS (animated) ── */}
      <HowItWorks />

      {/* ── FEATURES ── */}
      <div style={{ background: "#fafafa", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0", padding: "80px 20px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500, marginBottom: 14 }}>Features</p>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 48px", color: "#0a0a0a" }}>
              Built for people,<br />not IT teams.
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 80}>
                <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 16, padding: "24px 22px" }}>
                  <p style={{ fontSize: 16, fontWeight: 600, color: "#111", margin: "0 0 8px", letterSpacing: "-0.01em" }}>{f.title}</p>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRICING ── */}
      <section style={{ padding: "90px 20px", maxWidth: 960, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", fontWeight: 500, marginBottom: 14 }}>Pricing</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 60px", color: "#0a0a0a" }}>
            Simple pricing,<br />no surprises.
          </h2>
        </FadeIn>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {PLANS.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 120} style={{ flex: "1 1 260px" }}>
              <div style={{ background: plan.highlight ? "#0a0a0a" : "#fff", border: plan.highlight ? "none" : "1px solid #e8e8e8", borderRadius: 20, padding: "36px 32px", height: "100%" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: plan.highlight ? "#888" : "#aaa", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 20px" }}>{plan.name}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2, margin: "0 0 6px" }}>
                  <span style={{ fontSize: 42, fontWeight: 700, letterSpacing: "-0.04em", color: plan.highlight ? "#fff" : "#111" }}>{plan.price}</span>
                  <span style={{ fontSize: 14, color: plan.highlight ? "#666" : "#aaa" }}>{plan.period}</span>
                </div>
                <p style={{ fontSize: 14, color: plan.highlight ? "#777" : "#999", margin: "0 0 28px" }}>{plan.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
                  {plan.items.map(item => (
                    <li key={item} style={{ fontSize: 14, color: plan.highlight ? "#ccc" : "#555", padding: "7px 0", borderBottom: `1px solid ${plan.highlight ? "#222" : "#f5f5f5"}`, display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ color: plan.highlight ? "#3b82f6" : "#22c55e", fontSize: 13, fontWeight: 700 }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
                <button style={{ width: "100%", padding: "13px", borderRadius: 10, border: plan.highlight ? "none" : "1px solid #e0e0e0", background: plan.highlight ? "#fff" : "transparent", color: "#111", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Get started
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <div style={{ background: "#0a0a0a", padding: "100px 20px" }}>
        <FadeIn>
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, letterSpacing: "-0.035em", color: "#fff", margin: "0 0 18px", lineHeight: 1.12 }}>
              Stop wondering.<br />Start knowing.
            </h2>
            <p style={{ fontSize: 16, color: "#666", margin: "0 0 40px" }}>
              Bluebox sits quietly in your office, so you never have to worry about what's happening behind the scenes.
            </p>
            <button style={{ background: "#fff", color: "#111", border: "none", borderRadius: 12, padding: "15px 34px", fontSize: 16, fontWeight: 600, cursor: "pointer", letterSpacing: "-0.02em" }}>
              Order Bluebox →
            </button>
          </div>
        </FadeIn>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ textAlign: "center", padding: "40px 20px", borderTop: "1px solid #f0f0f0", color: "#ccc", fontSize: 13 }}>
        © {new Date().getFullYear()} Bluebox. All rights reserved.
      </footer>

    </div>
  );
}