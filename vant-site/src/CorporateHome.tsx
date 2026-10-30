import { useEffect, useState, type FormEvent, type PointerEvent } from "react";
import LegalPages from "./LegalPages";
import MoteProductPage from "./MoteProductPage";
import LibrariesPage from "./LibrariesPage";
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
  const [moteMood, setMoteMood] = useState<"calm" | "working" | "error" | "idle">("calm");

  useEffect(() => {
    const states: Array<"calm" | "working" | "idle"> = ["calm", "working", "calm", "idle"];
    let index = 0;
    const interval = window.setInterval(() => {
      index = (index + 1) % states.length;
      const next = states[index];
      setMoteMood((current) => current === "error" ? current : next);
    }, 6500);
    return () => window.clearInterval(interval);
  }, []);

  const handleMotePointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    event.currentTarget.style.setProperty("--mote-look-x", `${x * 5}px`);
    event.currentTarget.style.setProperty("--mote-look-y", `${y * 3}px`);
  };

  const resetMotePointer = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--mote-look-x", "0px");
    event.currentTarget.style.setProperty("--mote-look-y", "0px");
  };

  const activateMote = () => {
    setMoteMood((current) => {
      const next = current === "working" ? "calm" : "working";
      return next;
    });
  };

  return (
    <div className={`vt-scene vt-mote-hero vt-mote-state-${moteMood}`} onPointerMove={handleMotePointer} onPointerLeave={resetMotePointer} onClick={activateMote} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activateMote(); } }} role="button" tabIndex={0} aria-label="Interactive MOTE.EXE vector mascot. Move your cursor to engage MOTE or click to toggle its working state.">
      <div className="vt-mote-vector-stage" aria-hidden="true">
        <div className="vt-mote-vector-aura" />
        <div className="vt-mote-orbit-path vt-mote-orbit-path-one" />
        <div className="vt-mote-orbit-path vt-mote-orbit-path-two" />
        <div className="vt-mote-vector-ring vt-mote-vector-ring-outer" />
        <div className="vt-mote-vector-ring vt-mote-vector-ring-inner" />
        <svg className="vt-mote-vector" viewBox="0 0 240 250">
          <g className="vt-mote-vector-ears" fill="#08090b" stroke="#9da1aa" strokeWidth="2.5" strokeLinejoin="round">
            <polygon points="84,100 62,36 112,80" />
            <polygon points="156,100 178,36 128,80" />
          </g>
          <circle cx="120" cy="136" r="58" fill="#08090b" stroke="#d5d7dc" strokeWidth="3" />
          <polygon className="vt-mote-vector-eye" points="76,130 164,120 152,150 92,154" fill="#f4f5f7" />
          <rect className="vt-mote-vector-pupil" x="115" y="126" width="10" height="26" fill="#08090b" />
          <g className="vt-mote-vector-glitch" stroke="#d8dbe0" strokeWidth="2">
            <path d="M176 75 h23 M185 61 h15 M194 49 h8" />
            <path d="M32 166 h16" opacity=".45" />
          </g>
        </svg>
      </div>
      <div className="vt-mote-status-stack" aria-label="MOTE live workflow status">
        <div className="vt-mote-status-chip vt-mote-status-secured">
          <span className="vt-mote-status-icon" aria-hidden="true">✓</span>
          <span className="vt-mote-status-copy"><b>SECURED</b><small>MFA ACTIVE</small></span>
          <span className="vt-mote-status-indicator" aria-hidden="true" />
        </div>
        <div className="vt-mote-status-chip vt-mote-status-cowork">
          <span className="vt-mote-status-icon" aria-hidden="true">↗</span>
          <span className="vt-mote-status-copy"><b>COWORK</b><small>TASK COMPLETE</small></span>
          <span className="vt-mote-status-indicator" aria-hidden="true" />
        </div>
        <div className="vt-mote-status-chip vt-mote-status-integration">
          <span className="vt-mote-status-icon" aria-hidden="true">↔</span>
          <span className="vt-mote-status-copy"><b>INTEGRATION</b><small>CONNECTED</small></span>
          <span className="vt-mote-status-indicator" aria-hidden="true" />
        </div>
      </div>
      <div className="vt-mote-caption"><span className="vt-live-dot" /> MOTE.EXE <span>·</span> WORKFLOW RESPONSIBILITY CHANNELS</div>
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
        <a href="/libraries" onClick={closeMenu}>Libraries</a>
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
          <div className="vt-hero-actions"><a className="vt-button-primary" href="/mote-exe">Read More <Arrow /></a><a className="vt-text-link vt-chat-mote-link" href="/mote-exe">Chat with Mote <Arrow diagonal /></a></div>
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
        <div className="vt-partners-grid"><div className="vt-reveal"><h2>Good technology<br />goes <em>beyond itself.</em></h2><p>We see a future where VANT intelligence can support experiences beyond our own products. Through selected collaborations, we aim to help partners bring more capable, more thoughtful technology to the people they serve.</p><a className="vt-inline-link" href="#contact">Explore a partnership <Arrow /></a></div><article className="vt-partner-card vt-reveal"><div className="vt-partner-top"><img className="vt-partner-logo" src="data:image/webp;base64,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" alt="SELLSPACE logo" /><span className="vt-partner-status">ECOSYSTEM SPOTLIGHT</span></div><div className="vt-partner-wordmark">SELLSPACE<span>COMMERCE, REIMAGINED.</span></div><p>A separate commerce venture exploring a more intelligent everyday marketplace, with VANT technology envisioned as part of its future AI capabilities.</p><div className="vt-partner-divider"/><div className="vt-partner-bottom"><span><i className="vt-live-dot"/> FUTURE INTEGRATION</span><a className="vt-sellspace-cta" href="https://sellspace-corporate.vercel.app/" target="_blank" rel="noreferrer">Explore SELLSPACE <Arrow diagonal /></a></div></article></div>
        <p className="vt-disclaimer vt-reveal">Partnership and integration details are presented transparently. Planned capabilities are identified as future integrations and are not represented as live services.</p>
      </section>

      <section id="journey" className="vt-journey vt-section">
        <div className="vt-section-kicker vt-reveal"><span>04</span> / THE JOURNEY</div><div className="vt-journey-grid"><h2 className="vt-reveal">Not a finish line.<br /><em>A direction.</em></h2><div className="vt-journey-copy vt-reveal"><p>VANT is being built with a long view: create useful products, learn from the people who use them, and grow through thoughtful technology and collaboration.</p><div className="vt-journey-stages"><div><span>NOW</span><p>Building and refining core applications</p></div><div><span>NEXT</span><p>Growing the ecosystem and listening to users</p></div><div><span>ALWAYS</span><p>Exploring new ways technology can help</p></div></div><small>Our roadmap evolves as products develop and opportunities become real.</small></div></div>
      </section>

      <section id="contact" className="vt-contact vt-section"><div className="vt-contact-glow"/><div className="vt-section-kicker vt-reveal"><span>06</span> / THE NEXT CONVERSATION</div><div className="vt-contact-grid"><div className="vt-reveal"><h2>Have something<br />in <em>mind?</em></h2><p>Whether you're exploring our products, considering a collaboration, or curious about what we're building, we'd like to hear from you.</p><a className="vt-contact-email" href="mailto:VANT.CLIENSUPPORT@GMAIL.COM">VANT.CLIENSUPPORT@GMAIL.COM <Arrow diagonal /></a></div><div className="vt-access-card vt-reveal"><span className="vt-access-label">STAY CLOSE TO WHAT'S NEXT</span><h3>Be part of the next chapter.</h3><p>Request early access and follow the evolution of VANT's applications.</p><WaitlistForm/><small>Product access and availability may vary by application.</small></div></div></section>
    </main>
    <footer className="vt-footer"><a className="vt-brand" href="#top"><span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span></a><p>Intelligence in motion.</p><div className="vt-footer-links"><a href="#about">About</a><a href="#products">Applications</a><a href="#partners">Partnerships</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div><span className="vt-copyright">© {new Date().getFullYear()} VANT TECHNOLOGIES</span></footer>
  </div>;
}

export default function CorporateHome() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/mote-exe" || path === "/mote") return <MoteProductPage />;
  if (path === "/libraries") return <LibrariesPage />;
  if (path === "/privacy" || path === "/privacy-policy") return <LegalPages page="privacy" />;
  if (path === "/terms" || path === "/terms-of-service") return <LegalPages page="terms" />;
  return <CorporateHomeView />;
}
