import { useEffect, useState, type FormEvent } from "react";
import "./corporate.css";

const WAITLIST_ENDPOINT = "https://formspree.io/f/xeaqydzd";
const SUPPORT_EMAIL = "VantTech.Support@gmail.com";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="vt-arrow">{diagonal ? "↗" : "→"}</span>;
}

function EarlyAccessForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("VANT AI");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), interest, source: "VANT Technologies — Gain Early Access" }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") return <p className="vt-form-success">✓ Your early-access request has been received. Thank you for your interest in VANT.</p>;

  return <form className="vt-connect-form" onSubmit={submit}>
    <label htmlFor="vt-access-name">Name <span>OPTIONAL</span></label>
    <input id="vt-access-name" name="name" value={name} onChange={event => setName(event.target.value)} placeholder="Your name" />
    <label htmlFor="vt-access-email">Email address</label>
    <input id="vt-access-email" name="email" type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" />
    <label htmlFor="vt-access-interest">What are you interested in?</label>
    <select id="vt-access-interest" name="interest" value={interest} onChange={event => setInterest(event.target.value)}>
      <option>VANT AI</option><option>VANT Education</option><option>MOTE.EXE</option><option>VANT ecosystem updates</option><option>Multiple products</option>
    </select>
    <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending request…" : "Request early access"} <Arrow /></button>
    {status === "error" && <p className="vt-form-error">We couldn't send your request. Please try again.</p>}
    <small>Submitting this form expresses interest only. It does not guarantee or activate product access.</small>
  </form>;
}

export default function ConnectPage() {
  useEffect(() => { document.title = "Connect with VANT — Support & Early Access"; }, []);
  const subject = encodeURIComponent("VANT Technologies — Talk to the Team");
  const body = encodeURIComponent("Hello VANT Team,\n\nI’m reaching out regarding:\n\n[Please describe your question or concern]\n\nRelevant product/account (if applicable):\n\nThank you.");
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SUPPORT_EMAIL)}&su=${subject}&body=${body}`;

  return <div className="vt-site vt-connect-page">
    <header className="vt-header">
      <a className="vt-brand" href="/" aria-label="VANT Technologies home"><span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span></a>
      <nav className="vt-nav" aria-label="Connect navigation"><a href="/">Home</a><a href="/libraries">Libraries</a><a className="vt-nav-cta" href={gmailCompose} target="_blank" rel="noopener noreferrer">Talk to the Team <Arrow diagonal /></a></nav>
    </header>
    <main className="vt-connect-main">
      <section className="vt-connect-hero">
        <p className="vt-connect-kicker"><span className="vt-live-dot" /> VANT TECHNOLOGIES / CONTACT</p>
        <h1>Every conversation<br/>has a <em>starting point.</em></h1>
        <p>Choose the right channel and we’ll make sure your message is directed to the right place.</p>
        <div className="vt-connect-float" aria-hidden="true">
          <span className="vt-connect-float-avatar">
            <svg viewBox="0 0 24 24" fill="none"><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="8" r="4" /></svg>
          </span>
          <span className="vt-connect-float-message">
            <small>YOUR MESSAGE</small>
            <strong>Hello, VANT Team.</strong>
            <span>Let’s start a conversation.</span>
          </span>
          <span className="vt-connect-float-send">
            <svg viewBox="0 0 24 24" fill="none"><path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4 20-7Z" /></svg>
          </span>
          <i className="vt-connect-float-orbit" />
        </div>
      </section>
      <section className="vt-connect-grid" aria-label="Contact options">
        <article className="vt-connect-card vt-connect-support">
          <div className="vt-connect-card-top"><span>01 / DIRECT CORRESPONDENCE</span><span className="vt-connect-icon">↗</span></div>
          <p className="vt-connect-overline">TALK TO THE TEAM</p>
          <h2>For questions that<br/><em>need a person.</em></h2>
          <p className="vt-connect-description">Reach our team for customer care, account matters, technical concerns, and other issues that call for direct communication.</p>
          <div className="vt-connect-topics">
            <div><b>Customer care</b><span>General assistance, service questions, and guidance.</span></div>
            <div><b>Accounts & plans</b><span>Account access, subscriptions, tiers, billing, and plan questions.</span></div>
            <div><b>Technical support</b><span>Sign-in issues, errors, bugs, and product troubleshooting.</span></div>
            <div><b>Business & partnerships</b><span>Company inquiries, collaborations, vendors, and enterprise discussions.</span></div>
            <div><b>Privacy & other concerns</b><span>Data requests, accessibility, feedback, and matters needing personal attention.</span></div>
          </div>
          <a className="vt-connect-primary" href={gmailCompose} target="_blank" rel="noopener noreferrer">Open Gmail to contact VANT <Arrow diagonal /></a>
          <small className="vt-connect-address">{SUPPORT_EMAIL}</small>
          <a className="vt-connect-email-fallback" href={mailto}>Prefer another email app? Use your default email app.</a>
        </article>
        <article className="vt-connect-card vt-connect-access">
          <div className="vt-connect-card-top"><span>02 / UPCOMING LAUNCH</span><span className="vt-connect-icon">＋</span></div>
          <p className="vt-connect-overline">GAIN EARLY ACCESS</p>
          <h2>Be there<br/><em>from the beginning.</em></h2>
          <p className="vt-connect-description">Tell us where you’d like to start. Join the early-access interest list for product announcements and launch availability.</p>
          <EarlyAccessForm />
        </article>
      </section>
      <p className="vt-connect-footnote">For account security, never include passwords, one-time codes, API keys, or other confidential credentials in an email or form.</p>
    </main>
    <footer className="vt-footer"><a className="vt-brand" href="/"><span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span></a><p>Intelligence in motion.</p><div className="vt-footer-links"><a href="/">Home</a><a href="/libraries">Libraries</a><a href={mailto}>Support</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div><span className="vt-copyright">© {new Date().getFullYear()} VANT TECHNOLOGIES</span></footer>
  </div>;
}
