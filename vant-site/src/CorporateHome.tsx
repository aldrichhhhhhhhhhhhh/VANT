import { useEffect, useState, type FormEvent, type PointerEvent } from "react";
import LegalPages from "./LegalPages";
import MoteProductPage from "./MoteProductPage";
import Mote3D from "./Mote3D";
import "./corporate.css";

const WAITLIST_ENDPOINT = "https://formspree.io/f/xeaqydzd";

const products = [
  { number: "01", name: "VANT AI", label: "WORK PLATFORM", description: "Intelligence for the work that moves business forward.", detail: "A workspace for thinking, planning, analyzing, and getting meaningful work done.", href: "https://vant-ai.vercel.app/", tone: "violet", tags: ["AI workspace", "Projects", "CoWork"] },
  { number: "02", name: "VANT Education", label: "LEARNING TECHNOLOGY", description: "Make learning more personal, organized, and effective.", detail: "Purpose-built learning tools for notes, study guides, flashcards, practice, and planning.", href: "#contact", tone: "gold", tags: ["Study tools", "Learning support", "Study planning"] },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="vt-arrow">{diagonal ? "↗" : "→"}</span>;
}

function WindowScene() {
  const [moteMood, setMoteMood] = useState<"idle" | "curious" | "attentive" | "friendly">("idle");
  const [moteStatus, setMoteStatus] = useState("MOTE IS AWARE");
  const [moteMessage, setMoteMessage] = useState("M-01 / IDLE / AWARE");

  useEffect(() => {
    const moods: Array<"idle" | "curious" | "friendly"> = ["idle", "curious", "idle", "friendly"];
    let index = 0;
    const interval = window.setInterval(() => {
      index = (index + 1) % moods.length;
      setMoteMood((current) => current === "attentive" ? current : moods[index]);
      setMoteMessage(moods[index] === "curious" ? "M-01 / CURIOUS" : moods[index] === "friendly" ? "M-01 / FRIENDLY" : "M-01 / IDLE / AWARE");
      setMoteStatus(moods[index] === "curious" ? "SCANNING ENVIRONMENT" : moods[index] === "friendly" ? "READY TO HELP" : "MOTE IS AWARE");
    }, 6200);
    return () => window.clearInterval(interval);
  }, []);

  const handleMotePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    event.currentTarget.style.setProperty("--mote-look-x", `${x * 11}px`);
    event.currentTarget.style.setProperty("--mote-look-y", `${y * 7}px`);
    setMoteMood("attentive");
    setMoteStatus("TRACKING YOUR MOVEMENT");
    setMoteMessage("M-01 / ATTENTIVE");
  };

  const resetMotePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--mote-look-x", "0px");
    event.currentTarget.style.setProperty("--mote-look-y", "0px");
    setMoteMood("idle");
    setMoteStatus("MOTE IS AWARE");
    setMoteMessage("M-01 / IDLE / AWARE");
  };

  const activateMote = () => {
    setMoteMood((current) => {
      const next = current === "friendly" ? "curious" : "friendly";
      setMoteStatus(next === "friendly" ? "HELLO. I'M MOTE." : "WHAT ARE WE EXPLORING?");
      setMoteMessage(next === "friendly" ? "M-01 / FRIENDLY" : "M-01 / CURIOUS");
      return next;
    });
  };

  return (
    <div className={`vt-scene vt-mote-hero vt-mote-mood-${moteMood}`} onPointerMove={handleMotePointer} onPointerLeave={resetMotePointer} onClick={activateMote} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activateMote(); } }} role="button" tabIndex={0} aria-label="Interactive MOTE.EXE mascot. Mote blinks, tracks your cursor, changes moods, and responds when clicked.">
      <div className="vt-mote-kit-label">{moteMessage}</div>
      <div className="vt-mote-render-wrap">
        <Mote3D />
      </div>
      <div className="vt-mote-data mote-data-left"><span className="vt-live-dot"/> {moteStatus}</div>
      <div className="vt-mote-data mote-data-right"><span className="vt-live-dot"/> SIGNAL: <b>STABLE</b></div>
      <div className="vt-mote-caption"><span className="vt-live-dot"/> MOTE.EXE <span>·</span> YOUR WATCHFUL AI COMPANION</div>
    </div>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "VANT Technologies website" }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }
  if (status === "success") return <p className="vt-form-success">✓ You're on the list. Thank you for your interest.</p>;
  return <form className="vt-waitlist-form" onSubmit={submit}>
    <label className="vt-sr-only" htmlFor="vt-email">Email address</label>
    <input id="vt-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" />
    <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending…" : "Request early access"} <Arrow /></button>
    {status === "error" && <p className="vt-form-error">We couldn't send your request right now. Please try again shortly.</p>}
  </form>;
}

function CorporateHomeView() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.title = "VANT Technologies — Intelligence in motion";
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("vt-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".vt-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return <div className="vt-site">
    <header className="vt-header">
      <a className="vt-brand" href="#top" onClick={closeMenu} aria-label="VANT Technologies home"><span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span></a>
      <button className="vt-menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
      <nav className={menuOpen ? "vt-nav vt-nav-open" : "vt-nav"} aria-label="Main navigation">
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#products" onClick={closeMenu}>Products <span className="vt-nav-caret">⌄</span></a>
        <a href="#partners" onClick={closeMenu}>Powered by VANT</a>
        <a href="#journey" onClick={closeMenu}>Our Journey</a>
        <a className="vt-nav-cta" href="#contact" onClick={closeMenu}>Let's connect <Arrow diagonal /></a>
      </nav>
    </header>

    <main id="top">
      <section className="vt-hero">
        <div className="vt-hero-copy">
          <div className="vt-eyebrow"><span className="vt-eyebrow-line" /> OUR NEWEST INTELLIGENCE</div>
          <h1>Mote<span>.exe</span></h1>
          <p className="vt-hero-lede">Your personal AI Guardian — quietly watchful, ready to help, and built to bring intelligence wherever your work takes you.</p>
          <div className="vt-mote-version">VERSION 1.0 <span className="vt-live-dot" /> INTRODUCING MOTE.EXE</div>
          <div className="vt-hero-actions"><a className="vt-button-primary" href="/mote-exe">Read More <Arrow /></a><a className="vt-text-link vt-chat-mote-link" href="/mote-exe#interactive">Chat with Mote <Arrow diagonal /></a></div>
          <div className="vt-hero-foot"><span className="vt-live-dot" /> A VANT Technologies intelligence companion</div>
        </div>
        <WindowScene />
        <div className="vt-hero-bottom"><span>01 / A NEW WAY FORWARD</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>


      <section id="about" className="vt-about vt-section">
        <div className="vt-section-kicker vt-reveal"><span>01</span> / ABOUT VANT TECHNOLOGIES</div>
        <div className="vt-about-grid">
          <h2 className="vt-reveal">Technology should move <em>people forward.</em></h2>
          <div className="vt-about-copy vt-reveal"><p>VANT Technologies is building a connected ecosystem of intelligent applications and technology experiences for the way people work, learn, and build.</p><p>We believe the best technology does more than answer a question. It helps turn intent into progress — with tools designed around real needs and real possibilities.</p><a className="vt-inline-link" href="#journey">The thinking behind VANT <Arrow /></a></div>
        </div>
        <div className="vt-principles vt-reveal"><div><span>01</span><strong>Useful by design</strong><p>Built around real problems, not technology for its own sake.</p></div><div><span>02</span><strong>Intelligence with purpose</strong><p>AI and software applied where they can make a meaningful difference.</p></div><div><span>03</span><strong>Open to possibility</strong><p>Our products, partnerships, and ideas are designed to grow.</p></div></div>
      </section>

      <section id="products" className="vt-products vt-section">
        <div className="vt-section-heading vt-reveal"><div><div className="vt-section-kicker"><span>02</span> / THE APPLICATIONS</div><h2>Built by VANT.<br /><em>Made for momentum.</em></h2></div><p>Different experiences. One shared belief: technology should help you do more with what matters.</p></div>
        <div className="vt-product-list">{products.map(product => <article key={product.number} className={"vt-product vt-product-" + product.tone + " vt-reveal"}>
          <div className="vt-product-copy"><div className="vt-product-meta"><span>{product.number}</span><span>{product.label}</span></div><h3>{product.name}</h3><h4>{product.description}</h4><p>{product.detail}</p><div className="vt-tags">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="vt-product-link" href={product.href}>{product.number === "01" ? "Explore VANT AI" : "Discover VANT Education"} <Arrow diagonal /></a></div>
          <div className="vt-product-visual">{product.number === "01" ? <div className="vt-app-window"><div className="vt-app-top"><span className="vt-mini-mark">V</span><span>VANT WORKSPACE</span><span className="vt-app-status">● READY</span></div><div className="vt-app-layout"><div className="vt-app-sidebar"><i/><i/><i/><i/><i/></div><div className="vt-app-main"><small>YOUR WORKSPACE</small><strong>Good work starts<br/>with a clear next step.</strong><div className="vt-app-prompt">What would you like to move forward today? <span>↗</span></div><div className="vt-app-mini-grid"><div><small>PROJECTS</small><b>03 active</b></div><div><small>AI ASSISTANCE</small><b>Ready when you are</b></div></div></div></div></div> : <div className="vt-education-visual"><div className="vt-study-orb">V<span>EDU</span></div><div className="vt-study-card study-card-a"><small>STUDY SESSION</small><b>Biology · Cell structure</b><span>＋ 12 flashcards ready</span></div><div className="vt-study-card study-card-b"><small>YOUR LEARNING PATH</small><b>One step at a time.</b><div className="vt-study-bars"><i/><i/><i/><i/><i/></div></div><div className="vt-edu-label">LEARN WITH INTENTION</div></div>}</div>
        </article>)}</div>
        <p className="vt-future-note vt-reveal"><span>+</span> The ecosystem is growing. More VANT applications will be introduced as they are ready.</p>
      </section>

      <section id="partners" className="vt-partners vt-section">
        <div className="vt-section-kicker vt-reveal"><span>03</span> / POWERED BY VANT</div>
        <div className="vt-partners-grid"><div className="vt-reveal"><h2>Good technology<br />goes <em>beyond itself.</em></h2><p>We see a future where VANT intelligence can support experiences beyond our own products. Through selected collaborations, we aim to help partners bring more capable, more thoughtful technology to the people they serve.</p><a className="vt-inline-link" href="#contact">Explore a partnership <Arrow /></a></div><article className="vt-partner-card vt-reveal"><div className="vt-partner-top"><span className="vt-partner-symbol">S</span><span className="vt-partner-status">ECOSYSTEM SPOTLIGHT</span></div><div className="vt-partner-wordmark">SELLSPACE<span>COMMERCE, REIMAGINED.</span></div><p>A separate commerce venture exploring a more intelligent everyday marketplace, with VANT technology envisioned as part of its future AI capabilities.</p><div className="vt-partner-divider"/><div className="vt-partner-bottom"><span><i className="vt-live-dot"/> FUTURE INTEGRATION</span><a href="https://sellspace-corporate.vercel.app/" target="_blank" rel="noreferrer">Visit SELLSPACE <Arrow diagonal /></a></div></article></div>
        <p className="vt-disclaimer vt-reveal">Partnership and integration details are presented transparently. Planned capabilities are identified as future integrations and are not represented as live services.</p>
      </section>

      <section id="journey" className="vt-journey vt-section">
        <div className="vt-section-kicker vt-reveal"><span>04</span> / THE JOURNEY</div><div className="vt-journey-grid"><h2 className="vt-reveal">Not a finish line.<br /><em>A direction.</em></h2><div className="vt-journey-copy vt-reveal"><p>VANT is being built with a long view: create useful products, learn from the people who use them, and grow through thoughtful technology and collaboration.</p><div className="vt-journey-stages"><div><span>NOW</span><p>Building and refining core applications</p></div><div><span>NEXT</span><p>Growing the ecosystem and listening to users</p></div><div><span>ALWAYS</span><p>Exploring new ways technology can help</p></div></div><small>Our roadmap evolves as products develop and opportunities become real.</small></div></div>
      </section>

      <section id="contact" className="vt-contact vt-section"><div className="vt-contact-glow"/><div className="vt-section-kicker vt-reveal"><span>05</span> / THE NEXT CONVERSATION</div><div className="vt-contact-grid"><div className="vt-reveal"><h2>Have something<br />in <em>mind?</em></h2><p>Whether you're exploring our products, considering a collaboration, or curious about what we're building, we'd like to hear from you.</p><a className="vt-contact-email" href="mailto:VANT.CLIENSUPPORT@GMAIL.COM">VANT.CLIENSUPPORT@GMAIL.COM <Arrow diagonal /></a></div><div className="vt-access-card vt-reveal"><span className="vt-access-label">STAY CLOSE TO WHAT'S NEXT</span><h3>Be part of the next chapter.</h3><p>Request early access and follow the evolution of VANT's applications.</p><WaitlistForm/><small>Product access and availability may vary by application.</small></div></div></section>
    </main>
    <footer className="vt-footer"><a className="vt-brand" href="#top"><span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span></a><p>Intelligence in motion.</p><div className="vt-footer-links"><a href="#about">About</a><a href="#products">Applications</a><a href="#partners">Partnerships</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div><span className="vt-copyright">© {new Date().getFullYear()} VANT TECHNOLOGIES</span></footer>
  </div>;
}

export default function CorporateHome() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/mote-exe" || path === "/mote") return <MoteProductPage />;
  if (path === "/privacy" || path === "/privacy-policy") return <LegalPages page="privacy" />;
  if (path === "/terms" || path === "/terms-of-service") return <LegalPages page="terms" />;
  return <CorporateHomeView />;
}
