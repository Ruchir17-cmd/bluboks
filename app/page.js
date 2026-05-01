"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// ─── UTILS ───────────────────────────────────────────────────────────────────
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function useHover() {
  const [h, set] = useState(false);
  return [h, { onMouseEnter: () => set(true), onMouseLeave: () => set(false) }];
}

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      style={style}>
      {children}
    </motion.div>
  );
}

// ─── BUTTON ──────────────────────────────────────────────────────────────────
function Btn({ children, onClick, variant = "dark", style = {} }) {
  const [hov, hp] = useHover();
  const base = { border: "none", borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: "pointer", transition: "all 0.22s ease", letterSpacing: "-0.01em", padding: "14px 30px", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "inherit" };
  const v = {
    dark:  { background: hov ? "#222" : "#111", color: "#fff", boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.18)" : "0 2px 8px rgba(0,0,0,0.08)", transform: hov ? "translateY(-1px)" : "none" },
    ghost: { background: "transparent", color: hov ? "#111" : "#666", border: "1px solid", borderColor: hov ? "#ccc" : "#e4e4e4", transform: hov ? "translateY(-1px)" : "none" },
    white: { background: hov ? "#f0f0f0" : "#fff", color: "#111", transform: hov ? "translateY(-1px)" : "none", boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.12)" : "none" },
  };
  return <button onClick={onClick} style={{ ...base, ...v[variant], ...style }} {...hp}>{children}</button>;
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ maxWidth: 640, margin: "0 auto", height: 1, background: "linear-gradient(to right, transparent, #ececec, transparent)" }} />;
}

// ─── PULSE RING ──────────────────────────────────────────────────────────────
function PulseRing({ delay = 0 }) {
  return (
    <motion.span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(59,130,246,0.2)" }}
      initial={{ scale: 1, opacity: 0.5 }}
      animate={{ scale: 2.6, opacity: 0 }}
      transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

// ─── ANIMATED SCENE ──────────────────────────────────────────────────────────
function BlueboxScene({ play }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!play) return;
    const t = [setTimeout(() => setStep(1), 400), setTimeout(() => setStep(2), 1600), setTimeout(() => setStep(3), 3200)];
    return () => t.forEach(clearTimeout);
  }, [play]);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 48, padding: "72px 24px", minHeight: 440 }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={step >= 1 ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative", width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {step === 2 && <><PulseRing delay={0} /><PulseRing delay={0.8} /><PulseRing delay={1.6} /></>}
          <div style={{ width: 72, height: 72, borderRadius: 22, background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 40px rgba(0,0,0,0.18)", position: "relative", zIndex: 1 }}>
            <motion.div animate={step >= 2 ? { opacity: [1, 0.2, 1] } : { opacity: 0.35 }} transition={{ duration: 1.8, repeat: step === 2 ? Infinity : 0, ease: "easeInOut" }}
              style={{ width: 9, height: 9, borderRadius: "50%", background: "#3b82f6" }} />
          </div>
        </div>
        <motion.p initial={{ opacity: 0 }} animate={step >= 1 ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ fontSize: 11, color: "#c0c0c0", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0, fontWeight: 500 }}>Bluebox</motion.p>
      </motion.div>
      <AnimatePresence>
        {step === 2 && (
          <motion.p key="obs" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.7 }}
            style={{ fontSize: 13, color: "#c0c0c0", margin: 0, letterSpacing: "0.05em", fontStyle: "italic" }}>Checking your business…</motion.p>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.div key="line" initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ duration: 0.6 }}
            style={{ width: 1, height: 48, background: "linear-gradient(to bottom, #d0d0d0, transparent)", transformOrigin: "top", marginTop: -24, marginBottom: -24 }} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step >= 3 && (
          <motion.div key="card" initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: "#fff", border: "1px solid #ececec", borderRadius: 24, padding: "24px 28px", maxWidth: 380, width: "100%", boxShadow: "0 8px 48px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 15 }}>⚠️</span>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#111", letterSpacing: "-0.02em" }}>Something needs attention</span>
            </div>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, margin: "0 0 10px" }}>Your billing system may be affected due to network instability in the past 10 minutes.</p>
            <p style={{ fontSize: 13, color: "#3b82f6", fontWeight: 500, margin: 0 }}>Check your router — likely a quick fix.</p>
            <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #f2f2f2", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 11, color: "#c8c8c8" }}>Bluebox · Just now</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ROTATING ALERTS ─────────────────────────────────────────────────────────
const ALERTS = [
  { icon: "📡", title: "Internet connection is unstable", body: "Your office connection has been dropping for the last 8 minutes. This may affect your billing system and calls.", action: "Check your router or call your ISP." },
  { icon: "✅", title: "Everything is running smoothly", body: "All systems checked this morning. No issues found overnight. Your team can start the day without interruptions.", action: "You're all set." },
  { icon: "🧾", title: "Billing system not reachable", body: "Your POS system hasn't responded in the last 5 minutes. Customers may not be able to complete payments.", action: "Restart the billing device or check its connection." },
  { icon: "📷", title: "CCTV camera offline", body: "Camera 2 (entrance) has gone offline. This could be a power issue or a loose cable.", action: "Check the camera's power connection." },
  { icon: "💻", title: "A device is using high bandwidth", body: "One device on your network is consuming unusually high data — this may slow down everything else.", action: "Identify and restart the device if needed." },
];

function AlertCard() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const msg = ALERTS[idx];
  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i + 1) % ALERTS.length); setFade(true); }, 350);
    }, 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: 24, padding: "32px 36px", maxWidth: 520, margin: "0 auto", boxShadow: "0 8px 48px rgba(0,0,0,0.06)", transition: "opacity 0.35s ease", opacity: fade ? 1 : 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 20 }}>{msg.icon}</span>
        <span style={{ fontWeight: 600, fontSize: 15, color: "#111", letterSpacing: "-0.02em" }}>{msg.title}</span>
      </div>
      <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, margin: "0 0 12px" }}>{msg.body}</p>
      <p style={{ fontSize: 14, color: "#3b82f6", fontWeight: 500, margin: 0 }}>{msg.action}</p>
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #f2f2f2", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
        <span style={{ fontSize: 12, color: "#c8c8c8" }}>Bluebox · Just now</span>
      </div>
    </div>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: "🟢", title: "Business uptime", desc: "Know the moment your internet, billing system, or devices go offline — before your customers notice." },
  { icon: "👁️", title: "System awareness", desc: "Bluebox quietly watches your network, devices, and cameras. You don't have to." },
  { icon: "💬", title: "Simple alerts", desc: "No jargon. No dashboards. Just a clear message on WhatsApp or SMS when something needs attention." },
  { icon: "📋", title: "Daily insights", desc: "A short daily summary: what happened, what was fine, and what to keep an eye on." },
];

const USE_CASES = [
  {
    label: "Offices & startups",
    headline: "Run your office without surprises.",
    desc: "Bluebox tells you when your internet is slow, a device is misbehaving, or your team's tools aren't reachable — so you can fix things before they interrupt work.",
    examples: ["Internet going down before a big call", "A laptop using unusual bandwidth", "Your cloud tools becoming unreachable"],
  },
  {
    label: "Shops & retail",
    headline: "Keep your business open and billing.",
    desc: "For any shop that relies on POS, payment terminals, or customer WiFi — Bluebox makes sure you're the first to know when something stops working.",
    examples: ["Billing system going offline", "Payment terminal losing connection", "Customer WiFi dropping"],
  },
  {
    label: "IT service providers",
    headline: "Watch over your clients without being there.",
    desc: "Deploy Bluebox at client sites and get a clear picture of what's happening across all of them. Simple alerts mean less noise, faster response.",
    examples: ["Client network going down", "Device failures across sites", "Bandwidth spikes before they escalate"],
  },
];

const PLANS = [
  {
    name: "Bluebox",
    price: "₹12,999",
    period: "device",
    sub: "then ₹1,999 / month",
    desc: "For offices, shops, and startups that want to stay informed without complexity.",
    items: ["1 Bluebox device", "Network & device monitoring", "WhatsApp + SMS alerts", "Daily business summary", "Plain-language insights"],
    highlight: false,
  },
  {
    name: "Bluebox + Assist",
    price: "₹12,999",
    period: "device",
    sub: "then ₹3,499 / month",
    desc: "Everything in Bluebox, plus a team that steps in when something goes wrong.",
    items: ["Everything in Bluebox", "Assisted response (SOC-lite)", "Priority escalation", "Monthly review call", "Multi-site support"],
    highlight: true,
  },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function BlueboxPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCase, setActiveCase] = useState(0);
  const sceneRef = useRef(null);
  const sceneInView = useInView(sceneRef, { once: true, margin: "-80px" });
  const router = useRouter();
  const go = () => router.push("/get-started");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: "#fff", color: "#111", margin: 0, padding: 0, lineHeight: 1.6, overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: 64, background: scrolled ? "rgba(255,255,255,0.9)" : "#fff", backdropFilter: "blur(16px)", borderBottom: `1px solid ${scrolled ? "#f0f0f0" : "transparent"}`, transition: "all 0.4s ease" }}>
        <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.04em", color: "#0a0a0a" }}>Bluebox</span>
        <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
          {[["How it works", "how-it-works"], ["Features", "features"], ["Use cases", "use-cases"], ["Pricing", "pricing"]].map(([label, id]) => {
            const [hov, hp] = useHover();
            return (
              <li key={id}><a onClick={() => scrollTo(id)} {...hp} style={{ fontSize: 14, color: hov ? "#111" : "#888", textDecoration: "none", cursor: "pointer", transition: "color 0.2s", letterSpacing: "-0.01em" }}>{label}</a></li>
            );
          })}
        </ul>
        <Btn onClick={go} variant="dark" style={{ padding: "9px 20px", fontSize: 13, borderRadius: 10 }}>Get started</Btn>
      </motion.nav>

      {/* ── HERO ── */}
      <section style={{ textAlign: "center", padding: "150px 24px 110px", maxWidth: 780, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", fontWeight: 500, marginBottom: 32 }}>
            Business awareness, simplified
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.06, margin: "0 0 28px", color: "#0a0a0a" }}>
            Know what's happening<br />in your business —<br />before it becomes a problem.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontSize: 19, color: "#888", maxWidth: 480, margin: "0 auto 52px", lineHeight: 1.65, letterSpacing: "-0.01em" }}>
            No dashboards. No complexity. Just clear alerts when something in your office needs attention.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={go} variant="dark">Get started →</Btn>
            <Btn onClick={() => scrollTo("how-it-works")} variant="ghost">See how it works</Btn>
          </motion.div>
        </motion.div>
      </section>

      <Divider />

      {/* ── ALERT EXAMPLES ── */}
      <div style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", fontWeight: 500, marginBottom: 20 }}>What Bluebox tells you</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.035em", color: "#0a0a0a", lineHeight: 1.1, margin: 0 }}>
              Plain words.<br />Exactly when it matters.
            </h2>
          </Reveal>
          <Reveal delay={120}><AlertCard /></Reveal>
        </div>
      </div>

      <Divider />

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" ref={sceneRef} style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", fontWeight: 500, marginBottom: 20 }}>How it works</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.035em", color: "#0a0a0a", lineHeight: 1.1, margin: "0 0 20px" }}>
              Plug it in.<br />That's the hard part.
            </h2>
            <p style={{ fontSize: 17, color: "#999", lineHeight: 1.7, margin: "0 auto", maxWidth: 400, letterSpacing: "-0.01em" }}>
              Bluebox connects to your existing setup and quietly monitors what matters — then tells you when something needs your attention.
            </p>
          </Reveal>
          <BlueboxScene play={sceneInView} />
          <Reveal delay={3400}>
            <div style={{ display: "flex", justifyContent: "center", gap: 52, flexWrap: "wrap", marginTop: 16 }}>
              {[["01", "Plug it in"], ["02", "It connects & watches"], ["03", "You get clear updates"]].map(([n, l]) => (
                <div key={n} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 10, color: "#d0d0d0", fontWeight: 600, letterSpacing: "0.1em", margin: "0 0 6px" }}>{n}</p>
                  <p style={{ fontSize: 13, color: "#999", margin: 0 }}>{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 72 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", fontWeight: 500, marginBottom: 20 }}>Features</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.035em", color: "#0a0a0a", lineHeight: 1.1, margin: 0 }}>
              Everything you need<br />to stay in control.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 24 }}>
            {FEATURES.map((f, i) => {
              const [hov, hp] = useHover();
              return (
                <Reveal key={f.title} delay={i * 80}>
                  <div {...hp} style={{ background: hov ? "#fafafa" : "#fff", border: "1px solid", borderColor: hov ? "#e0e0e0" : "#f0f0f0", borderRadius: 20, padding: "32px 28px", transition: "all 0.25s ease", transform: hov ? "translateY(-2px)" : "none", boxShadow: hov ? "0 8px 32px rgba(0,0,0,0.05)" : "none" }}>
                    <p style={{ fontSize: 22, margin: "0 0 16px" }}>{f.icon}</p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "#111", margin: "0 0 10px", letterSpacing: "-0.02em" }}>{f.title}</p>
                    <p style={{ fontSize: 14, color: "#999", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── USE CASES ── */}
      <section id="use-cases" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", fontWeight: 500, marginBottom: 20 }}>Who it's for</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.035em", color: "#0a0a0a", lineHeight: 1.1, margin: 0 }}>
              Built for businesses<br />that can't afford surprises.
            </h2>
          </Reveal>

          {/* Tab selector */}
          <Reveal>
            <div style={{ display: "flex", gap: 8, marginBottom: 48, flexWrap: "wrap" }}>
              {USE_CASES.map((uc, i) => {
                const active = activeCase === i;
                return (
                  <button key={uc.label} onClick={() => setActiveCase(i)}
                    style={{ padding: "10px 20px", borderRadius: 100, border: `1px solid ${active ? "#111" : "#e8e8e8"}`, background: active ? "#111" : "transparent", color: active ? "#fff" : "#888", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s ease", fontFamily: "inherit", letterSpacing: "-0.01em" }}>
                    {uc.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div key={activeCase}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
              <div>
                <h3 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#0a0a0a", margin: "0 0 16px", lineHeight: 1.15 }}>
                  {USE_CASES[activeCase].headline}
                </h3>
                <p style={{ fontSize: 16, color: "#888", lineHeight: 1.7, margin: "0 0 32px", letterSpacing: "-0.01em" }}>
                  {USE_CASES[activeCase].desc}
                </p>
                <Btn onClick={go} variant="dark" style={{ fontSize: 14, padding: "12px 24px" }}>Get Bluebox →</Btn>
              </div>
              <div style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 20, padding: "28px 32px" }}>
                <p style={{ fontSize: 12, color: "#bbb", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 20px", fontWeight: 500 }}>Bluebox catches things like</p>
                {USE_CASES[activeCase].examples.map((ex, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0", borderBottom: i < USE_CASES[activeCase].examples.length - 1 ? "1px solid #ebebeb" : "none" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b82f6", flexShrink: 0, marginTop: 6 }} />
                    <p style={{ fontSize: 14, color: "#555", margin: 0, lineHeight: 1.6 }}>{ex}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Divider />

      {/* ── DAILY SUMMARY TEASER ── */}
      <div style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <Reveal style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", fontWeight: 500, marginBottom: 20 }}>Daily summary</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.035em", color: "#0a0a0a", lineHeight: 1.1, margin: 0 }}>
              Start every morning<br />already in the know.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ background: "#fff", border: "1px solid #ececec", borderRadius: 24, padding: "32px 36px", textAlign: "left", boxShadow: "0 8px 48px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontSize: 12, color: "#bbb", letterSpacing: "0.02em" }}>Bluebox · Daily Summary · Thursday, 8:00 AM</span>
              </div>
              <p style={{ fontSize: 16, fontWeight: 600, color: "#111", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Good morning. Here's how your business did yesterday.</p>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.75, margin: "0 0 20px" }}>
                Your office ran smoothly for <strong style={{ color: "#111" }}>21 hours and 40 minutes</strong>. There was a brief internet slowdown at 2:14 PM that lasted about 8 minutes — your billing system was unaffected. Everything is working normally right now.
              </p>
              <div style={{ borderTop: "1px solid #f2f2f2", paddingTop: 16 }}>
                <p style={{ fontSize: 13, color: "#3b82f6", fontWeight: 500, margin: 0 }}>One thing to watch today: Your backup connection hasn't been tested in 14 days.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Divider />

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 72 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", fontWeight: 500, marginBottom: 20 }}>Pricing</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.035em", color: "#0a0a0a", lineHeight: 1.1, margin: 0 }}>
              Simple pricing.<br />No surprises.
            </h2>
          </Reveal>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {PLANS.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 120} style={{ flex: "1 1 300px" }}>
                <div style={{ background: plan.highlight ? "#0a0a0a" : "#fff", border: `1px solid ${plan.highlight ? "transparent" : "#f0f0f0"}`, borderRadius: 24, padding: "44px 40px", height: "100%", boxShadow: plan.highlight ? "0 24px 64px rgba(0,0,0,0.14)" : "none" }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: plan.highlight ? "#555" : "#bbb", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 24px" }}>{plan.name}</p>
                  <div style={{ margin: "0 0 4px" }}>
                    <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, color: plan.highlight ? "#fff" : "#0a0a0a" }}>{plan.price}</span>
                    <span style={{ fontSize: 13, color: plan.highlight ? "#555" : "#bbb", marginLeft: 4 }}>device</span>
                  </div>
                  <p style={{ fontSize: 13, color: plan.highlight ? "#555" : "#bbb", margin: "0 0 12px" }}>{plan.sub}</p>
                  <p style={{ fontSize: 14, color: plan.highlight ? "#666" : "#aaa", margin: "0 0 32px", letterSpacing: "-0.01em", lineHeight: 1.6 }}>{plan.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px" }}>
                    {plan.items.map(item => (
                      <li key={item} style={{ fontSize: 14, color: plan.highlight ? "#aaa" : "#666", padding: "10px 0", borderBottom: `1px solid ${plan.highlight ? "#1a1a1a" : "#f5f5f5"}`, display: "flex", gap: 12, alignItems: "center" }}>
                        <span style={{ color: plan.highlight ? "#3b82f6" : "#22c55e", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
                      </li>
                    ))}
                  </ul>
                  <Btn onClick={go} variant={plan.highlight ? "white" : "ghost"} style={{ width: "100%", justifyContent: "center", borderRadius: 12 }}>
                    Get started
                  </Btn>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p style={{ textAlign: "center", fontSize: 13, color: "#d0d0d0", marginTop: 32 }}>No commitment. Cancel anytime. Device ships within 3 business days.</p>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <div style={{ background: "#0a0a0a", padding: "140px 24px" }}>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 20px", lineHeight: 1.06 }}>
              Your business is<br />always on. So is Bluebox.
            </h2>
            <p style={{ fontSize: 17, color: "#555", margin: "0 0 48px", lineHeight: 1.65, letterSpacing: "-0.01em" }}>
              Know what's happening. Fix things before they matter. Run your business with confidence.
            </p>
            <Btn onClick={go} variant="white" style={{ fontSize: 15, padding: "14px 32px" }}>Get started →</Btn>
          </div>
        </Reveal>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ textAlign: "center", padding: "48px 24px", borderTop: "1px solid #f0f0f0" }}>
        <p style={{ fontSize: 13, color: "#d0d0d0", margin: 0 }}>© {new Date().getFullYear()} Bluebox. All rights reserved.</p>
      </footer>

    </div>
  );
}