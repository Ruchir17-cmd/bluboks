"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

// ─── UTILS ───────────────────────────────────────────────────────────────────
function useHover() {
  const [hov, set] = useState(false);
  return [hov, { onMouseEnter: () => set(true), onMouseLeave: () => set(false) }];
}

// ─── INPUT ───────────────────────────────────────────────────────────────────
function Field({ label, type = "text", placeholder, value, onChange, optional }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: "#666", letterSpacing: "-0.01em" }}>
        {label}{optional && <span style={{ color: "#c0c0c0", fontWeight: 400, marginLeft: 6 }}>optional</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: "14px 18px",
          borderRadius: 12,
          border: `1px solid ${focused ? "#aaa" : "#e8e8e8"}`,
          fontSize: 15,
          color: "#111",
          background: "#fff",
          outline: "none",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: focused ? "0 0 0 3px rgba(0,0,0,0.04)" : "none",
          fontFamily: "inherit",
          letterSpacing: "-0.01em",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

// ─── STEP ────────────────────────────────────────────────────────────────────
function Step({ num, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
    >
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#aaa", letterSpacing: "0.02em" }}>{num}</span>
      </div>
      <div>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#111", margin: "0 0 4px", letterSpacing: "-0.02em" }}>{title}</p>
        <p style={{ fontSize: 14, color: "#999", margin: 0, lineHeight: 1.65, letterSpacing: "-0.01em" }}>{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── SUCCESS STATE ────────────────────────────────────────────────────────────
function Success({ name }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.97, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: "center", padding: "64px 40px" }}
    >
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
        <span style={{ fontSize: 22 }}>✓</span>
      </div>
      <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.035em", color: "#0a0a0a", margin: "0 0 12px" }}>
        You're on your way, {name.split(" ")[0]}.
      </h2>
      <p style={{ fontSize: 16, color: "#999", lineHeight: 1.65, margin: "0 auto", maxWidth: 340, letterSpacing: "-0.01em" }}>
        We'll be in touch within one business day to get your Bluebox shipped.
      </p>
      <p style={{ fontSize: 13, color: "#c8c8c8", marginTop: 32 }}>Check your inbox for a confirmation.</p>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function GetStarted() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hovBtn, btnProps] = useHover();

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const valid = form.name.trim() && form.email.includes("@") && form.company.trim();

async function handleSubmit() {
  if (!valid || loading) return;

  setLoading(true);

  const { error } = await supabase.from("leads").insert([
    {
      name: form.name,
      email: form.email,
      company: form.company,
      phone: form.phone,
    },
  ]);

  setLoading(false);

  if (error) {
    console.error(error);
    alert("Something went wrong. Try again.");
    return;
  }

  setSubmitted(true);
}

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: "#fff", minHeight: "100vh", color: "#111", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: 64, borderBottom: "1px solid #f5f5f5" }}>
        <a href="/" style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.04em", color: "#0a0a0a", textDecoration: "none" }}>Bluebox</a>
        <span style={{ fontSize: 13, color: "#c0c0c0", letterSpacing: "-0.01em" }}>Getting started</span>
      </motion.nav>

      {/* ── LAYOUT ── */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", maxWidth: 1100, margin: "0 auto" }}>

        {/* ── LEFT PANEL ── */}
        <div style={{ flex: "0 0 420px", padding: "80px 64px 80px 48px", borderRight: "1px solid #f5f5f5", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c0c0c0", fontWeight: 500, marginBottom: 20 }}>Setup</p>
              <h1 style={{ fontSize: "clamp(28px, 3.5vw, 38px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 16px", color: "#0a0a0a" }}>
                Let's get your<br />office set up.
              </h1>
              <p style={{ fontSize: 16, color: "#999", margin: "0 0 64px", lineHeight: 1.65, letterSpacing: "-0.01em" }}>
                Takes less than 5 minutes.<br />No disruption.
              </p>
            </motion.div>

            {/* Steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <Step num="01" title="We ship your Bluebox" desc="Your device arrives within 2–3 business days, ready to go." delay={0.2} />
              <Step num="02" title="You plug it in" desc="One cable. Any desk or shelf. No configuration needed." delay={0.32} />
              <Step num="03" title="You start receiving updates" desc="Plain messages on your phone or email, whenever something needs attention." delay={0.44} />
            </div>
          </div>

          {/* Reassurance */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
            style={{ marginTop: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
              <p style={{ fontSize: 13, color: "#aaa", margin: 0, letterSpacing: "-0.01em" }}>No commitment. Cancel anytime.</p>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{ flex: 1, padding: "80px 64px", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 440 }}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <Success key="done" name={form.name} />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 24, padding: "44px 40px", boxShadow: "0 8px 48px rgba(0,0,0,0.05)" }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em", color: "#0a0a0a", margin: "0 0 32px" }}>Your details</h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <Field label="Full name" placeholder="Jane Smith" value={form.name} onChange={set("name")} />
                      <Field label="Work email" type="email" placeholder="jane@company.com" value={form.email} onChange={set("email")} />
                      <Field label="Company" placeholder="Acme Inc." value={form.company} onChange={set("company")} />
                      <Field label="Phone number" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set("phone")} optional />
                    </div>

                    {/* CTA */}
                    <button
                      onClick={handleSubmit}
                      disabled={!valid || loading}
                      {...btnProps}
                      style={{
                        marginTop: 32,
                        width: "100%",
                        padding: "15px 24px",
                        borderRadius: 12,
                        border: "none",
                        background: valid ? (hovBtn ? "#222" : "#111") : "#f0f0f0",
                        color: valid ? "#fff" : "#ccc",
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: valid ? "pointer" : "not-allowed",
                        transition: "all 0.25s ease",
                        letterSpacing: "-0.02em",
                        transform: valid && hovBtn ? "translateY(-1px)" : "none",
                        boxShadow: valid && hovBtn ? "0 8px 24px rgba(0,0,0,0.16)" : "none",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}>
                      {loading ? (
                        <motion.span
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          style={{ fontSize: 14 }}>
                          Setting up…
                        </motion.span>
                      ) : "Start setup →"}
                    </button>

                    <p style={{ fontSize: 12, color: "#c8c8c8", textAlign: "center", margin: "20px 0 0", letterSpacing: "-0.01em" }}>
                      No commitment. Cancel anytime.
                    </p>
                  </div>

                  {/* Trust line */}
                  <p style={{ fontSize: 12, color: "#d4d4d4", textAlign: "center", marginTop: 24, letterSpacing: "-0.01em" }}>
                    Your information is never shared or sold.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}