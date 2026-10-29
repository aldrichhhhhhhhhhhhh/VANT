import { useEffect, useState, type FormEvent } from "react";
import LegalPages from "./LegalPages";
import MoteSection from "./MoteSection";
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
  return (
    <div className="vt-scene vt-intelligence-scene vt-light-trails" aria-hidden="true">
      <div className="vt-trail-cloud" />
      <div className="vt-trail vt-trail-a" />
      <div className="vt-trail vt-trail-b" />
      <div className="vt-trail vt-trail-c" />
      <div className="vt-trail vt-trail-d" />
      <div className="vt-trail vt-trail-e" />
      <div className="vt-trail vt-trail-f" />
      <div className="vt-trail-glow" />
      <div className="vt-trail-particle vt-particle-a" />
      <div className="vt-trail-particle vt-particle-b" />
      <div className="vt-trail-particle vt-particle-c" />
      <div className="vt-trail-particle vt-particle-d" />
      <div className="vt-architecture-system">
        <div className="vt-architecture-label"><span className="vt-architecture-live" /> VANT INTELLIGENCE / SYSTEM MAP</div>
        <div className="vt-architecture-node vt-architecture-node-core"><span className="vt-architecture-node-icon">V</span><b>VANT CORE</b><small>INTELLIGENCE LAYER</small><i className="vt-architecture-node-pulse" /></div>
        <div className="vt-architecture-node vt-architecture-node-work"><span className="vt-architecture-glyph">↗</span><b>WORK</b><small>PRODUCTIVITY</small></div>
        <div className="vt-architecture-node vt-architecture-node-learn"><span className="vt-architecture-glyph">⌘</span><b>LEARNING</b><small>EDUCATION</small></div>
        <div className="vt-architecture-node vt-architecture-node-build"><span className="vt-architecture-glyph">⌁</span><b>INTEGRATIONS</b><small>BUSINESS SYSTEMS</small></div>
        <i className="vt-architecture-connector vt-architecture-connector-a" />
        <i className="vt-architecture-connector vt-architecture-connector-b" />
        <i className="vt-architecture-connector vt-architecture-connector-c" />
        <div className="vt-architecture-readout vt-architecture-readout-a"><small>CORE STATUS</small><b><span /> OPERATIONAL</b></div>
        <div className="vt-architecture-readout vt-architecture-readout-b"><small>DESIGN PRINCIPLE</small><b>ONE CORE / MANY PATHS</b></div>
        <div className="vt-architecture-scanline" />
      </div>
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
      <a className="vt-brand vt-brand-reference" href="#top" onClick={closeMenu} aria-label="VANT Technologies home"><span>VANT<span className="vt-brand-period">.</span></span></a>
      <button className="vt-menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
      <nav className={menuOpen ? "vt-nav vt-nav-open" : "vt-nav"} aria-label="Main navigation">
        <a href="#products" onClick={closeMenu}>Ecosystem</a>
        <a href="#mote" onClick={closeMenu}>MOTE.EXE</a>
        <a href="#partners" onClick={closeMenu}>Partners</a>
        <a href="#about" onClick={closeMenu}>Our Thinking</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a className="vt-nav-signin" href="https://vant-ai.vercel.app/">Sign in <span className="vt-nav-external">↗</span></a>
      </nav>
    </header>

    <main id="top">
      <section className="vt-hero">
        <div className="vt-hero-copy">
          <div className="vt-eyebrow"><span className="vt-eyebrow-line" /> INDEPENDENT TECHNOLOGY COMPANY</div>
          <h1>VANT<br /><span>TECHNOLOGIES</span></h1>
          <p className="vt-hero-lede">One AI core powering products for work, learning, and business.</p>
          <div className="vt-hero-actions"><a className="vt-button-primary" href="#products">Explore our ecosystem <Arrow /></a><a className="vt-text-link" href="#partners">Partner with us <Arrow diagonal /></a></div>
          <div className="vt-hero-foot"><span className="vt-eyebrow-line" /> INTELLIGENCE · SYSTEMS · POSSIBILITY</div>
        </div>
        <WindowScene />
        <div className="vt-hero-bottom"><span>01 / A NEW WAY FORWARD</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>


      <section id="core" className="vt-core-section vt-section">
        <div className="vt-section-kicker vt-reveal"><span>01</span> / THE VANT CORE</div>
        <div className="vt-core-grid">
          <div className="vt-core-copy vt-reveal"><h2>One core.<br/><em>Many possibilities.</em></h2><p>VANT is building a shared intelligence layer designed to support a growing family of products and tailored business integrations. Each experience serves a different need, connected by a common technology vision.</p><a className="vt-inline-link" href="#products">Explore the ecosystem <Arrow /></a></div>
          <div className="vt-core-diagram vt-reveal" aria-label="Diagram showing VANT AI core connected to work platform, education, and business integrations">
            <div className="vt-core-ring vt-core-ring-a"/><div className="vt-core-ring vt-core-ring-b"/>
            <div className="vt-core-node vt-core-main"><span>V</span><b>VANT AI CORE</b><small>SHARED INTELLIGENCE</small></div>
            <div className="vt-core-node vt-core-work"><b>WORK</b><small>Platform</small></div>
            <div className="vt-core-node vt-core-edu"><b>LEARN</b><small>Education</small></div>
            <div className="vt-core-node vt-core-business"><b>BUILD</b><small>Integrations</small></div>
            <i className="vt-core-link vt-core-link-a"/><i className="vt-core-link vt-core-link-b"/><i className="vt-core-link vt-core-link-c"/>
          </div>
        </div>
      </section>

      <MoteSection />

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
          <div className="vt-product-copy"><div className="vt-product-meta"><span>{product.number}</span><span>{product.label}</span><span className={"vt-status vt-status-" + (product.number === "01" ? "live" : "soon")}>{product.number === "01" ? "LIVE" : "WAITLIST OPEN"}</span></div><h3>{product.name}</h3><h4>{product.description}</h4><p>{product.detail}</p><div className="vt-tags">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="vt-product-link" href={product.href}>{product.number === "01" ? "Launch Work Platform" : "Join the waitlist"} <Arrow diagonal /></a></div>
          <div className="vt-product-visual">{product.number === "01" ? <div className="vt-app-window"><div className="vt-app-top"><span className="vt-mini-mark">V</span><span>VANT WORKSPACE</span><span className="vt-app-status">● READY</span></div><div className="vt-app-layout"><div className="vt-app-sidebar"><i/><i/><i/><i/><i/></div><div className="vt-app-main"><small>YOUR WORKSPACE</small><strong>Good work starts<br/>with a clear next step.</strong><div className="vt-app-prompt">What would you like to move forward today? <span>↗</span></div><div className="vt-app-mini-grid"><div><small>PROJECTS</small><b>03 active</b></div><div><small>AI ASSISTANCE</small><b>Ready when you are</b></div></div></div></div></div> : <div className="vt-education-visual"><div className="vt-study-orb">V<span>EDU</span></div><div className="vt-study-card study-card-a"><small>STUDY SESSION</small><b>Biology · Cell structure</b><span>＋ 12 flashcards ready</span></div><div className="vt-study-card study-card-b"><small>YOUR LEARNING PATH</small><b>One step at a time.</b><div className="vt-study-bars"><i/><i/><i/><i/><i/></div></div><div className="vt-edu-label">LEARN WITH INTENTION</div></div>}</div>
        </article>)}</div>
        <p className="vt-future-note vt-reveal"><span>+</span> The ecosystem is growing. More VANT applications will be introduced as they are ready.</p>
      </section>

      <section id="partners" className="vt-partners vt-section">
        <div className="vt-section-kicker vt-reveal"><span>03</span> / POWERED BY VANT</div>
        <div className="vt-partners-grid"><div className="vt-reveal"><h2>Good technology<br />goes <em>beyond itself.</em></h2><p>We work with businesses to design and build tailored integrations around real workflows and needs. We are now onboarding our first pilot partners and exploring practical ways VANT technology can support their operations.</p><a className="vt-inline-link" href="#contact">Become a partner <Arrow /></a></div><article className="vt-partner-card vt-reveal"><div className="vt-partner-top"><span className="vt-partner-symbol">V</span><span className="vt-partner-status">PILOT PARTNERS</span></div><div className="vt-partner-wordmark">BUILD WITH VANT<span>CUSTOM AI INTEGRATIONS.</span></div><p>Collaborate with VANT Technologies on tailored AI and software experiences designed around your business, your people, and your workflows.</p><div className="vt-partner-divider"/><div className="vt-partner-bottom"><span><i className="vt-live-dot"/> NOW ONBOARDING</span><a href="#contact">Start a conversation <Arrow diagonal /></a></div></article></div>
        <p className="vt-disclaimer vt-reveal">Partnership and integration details are presented transparently. Planned capabilities are identified as future integrations and are not represented as live services.</p>
      </section>

      <section id="journey" className="vt-journey vt-section">
        <div className="vt-section-kicker vt-reveal"><span>04</span> / THE JOURNEY</div><div className="vt-journey-grid"><h2 className="vt-reveal">Not a finish line.<br /><em>A direction.</em></h2><div className="vt-journey-copy vt-reveal"><p>VANT is being built with a long view: create useful products, learn from the people who use them, and grow through thoughtful technology and collaboration.</p><div className="vt-journey-stages"><div><span>NOW</span><p>Building and refining core applications</p></div><div><span>NEXT</span><p>Growing the ecosystem and listening to users</p></div><div><span>ALWAYS</span><p>Exploring new ways technology can help</p></div></div><small>Our roadmap evolves as products develop and opportunities become real.</small></div></div>
      </section>

      <section id="contact" className="vt-contact vt-section"><div className="vt-contact-glow"/><div className="vt-section-kicker vt-reveal"><span>05</span> / THE NEXT CONVERSATION</div><div className="vt-contact-grid"><div className="vt-reveal"><h2>Have something<br />in <em>mind?</em></h2><p>Whether you're exploring our products, considering a collaboration, or curious about what we're building, we'd like to hear from you.</p><a className="vt-contact-email" href="mailto:VANT.CLIENSUPPORT@GMAIL.COM">VANT.CLIENSUPPORT@GMAIL.COM <Arrow diagonal /></a></div><div className="vt-access-card vt-reveal"><span className="vt-access-label">STAY CLOSE TO WHAT'S NEXT</span><h3>Be part of the next chapter.</h3><p>Request early access and follow the evolution of VANT's applications.</p><WaitlistForm/><small>Product access and availability may vary by application.</small></div></div></section>
    </main>
    <footer className="vt-footer"><a className="vt-brand" href="#top"><span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span></a><p>Intelligence in motion.</p><div className="vt-footer-links"><a href="#about">Our Thinking</a><a href="#products">Ecosystem</a><a href="#partners">Partners</a><a href="https://vant-ai.vercel.app/">Sign in</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div><span className="vt-copyright">© {new Date().getFullYear()} VANT TECHNOLOGIES</span></footer>
  </div>;
}

export default function CorporateHome() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/privacy" || path === "/privacy-policy") return <LegalPages page="privacy" />;
  if (path === "/terms" || path === "/terms-of-service") return <LegalPages page="terms" />;
  return <CorporateHomeView />;
}
