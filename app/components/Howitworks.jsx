"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Pulse ring around the device ───────────────────────────────────────────
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

// ─── The animated scene ──────────────────────────────────────────────────────
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
        padding: "64px 24px",
        minHeight: 420,
      }}
    >
      {/* ── Device ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={step >= 1 ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
      >
        {/* device body */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* pulse rings — only during step 2 */}
          {step === 2 && (
            <>
              <PulseRing delay={0} />
              <PulseRing delay={0.7} />
              <PulseRing delay={1.4} />
            </>
          )}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* LED dot */}
            <motion.div
              animate={step >= 2 ? { opacity: [1, 0.3, 1] } : { opacity: 0.4 }}
              transition={{ duration: 1.6, repeat: step === 2 ? Infinity : 0, ease: "easeInOut" }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }}
            />
          </div>
        </div>

        {/* label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={step >= 1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontSize: 12, color: "#aaa", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0, fontWeight: 500 }}
        >
          Bluebox
        </motion.p>
      </motion.div>

      {/* ── Observing label ── */}
      <AnimatePresence>
        {step === 2 && (
          <motion.p
            key="observing"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ fontSize: 13, color: "#bbb", margin: 0, letterSpacing: "0.04em" }}
          >
            Quietly observing…
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Connector line ── */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            key="line"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, #e0e0e0, transparent)",
              transformOrigin: "top",
              marginTop: -24,
              marginBottom: -24,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Alert card ── */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "#fff",
              border: "1px solid #e8e8e8",
              borderRadius: 20,
              padding: "24px 28px",
              maxWidth: 360,
              width: "100%",
              boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#111", letterSpacing: "-0.01em" }}>
                Issue detected
              </span>
            </div>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.65, margin: "0 0 10px" }}>
              Your internet slowed down due to high usage across multiple devices.
            </p>
            <p style={{ fontSize: 13, color: "#3b82f6", fontWeight: 500, margin: 0 }}>
              No immediate action needed.
            </p>
            <div
              style={{
                marginTop: 16,
                paddingTop: 14,
                borderTop: "1px solid #f0f0f0",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 11, color: "#ccc", letterSpacing: "0.03em" }}>
                Bluebox · Just now
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main exported component ─────────────────────────────────────────────────
export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "100px 20px",
        background: "#fafafa",
        borderTop: "1px solid #f0f0f0",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#aaa",
            fontWeight: 500,
            marginBottom: 14,
          }}
        >
          How it works
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "clamp(26px, 4vw, 38px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#0a0a0a",
            lineHeight: 1.15,
            margin: "0 0 16px",
          }}
        >
          Sits quietly.<br />Speaks simply.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontSize: 16,
            color: "#888",
            lineHeight: 1.65,
            margin: "0 0 60px",
            maxWidth: 420,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Bluebox watches your office systems in the background and sends you a plain message the moment something needs attention.
        </motion.p>

        {/* Animated scene */}
        <BlueboxScene play={inView} />

        {/* Step labels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 3.2 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            marginTop: 48,
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "01", label: "Plug it in" },
            { num: "02", label: "It observes" },
            { num: "03", label: "You're informed" },
          ].map((s) => (
            <div key={s.num} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 11, color: "#ccc", fontWeight: 600, letterSpacing: "0.08em", margin: "0 0 4px" }}>
                {s.num}
              </p>
              <p style={{ fontSize: 13, color: "#888", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}