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
    <div className="vt-scene vt-mote-hero" role="img" aria-label="MOTE.EXE: black orb mascot with angular horns, a sharp white eye, glitch effects, and animated signal rings">
      <div className="vt-mote-kit-label">M-01 / CALM / AWARE</div>
      <svg className="vt-mote-kit-svg" viewBox="0 0 420 440" aria-hidden="true">
        <defs>
          <radialGradient id="moteShell" cx="32%" cy="22%" r="82%"><stop offset="0%" stopColor="#45464a"/><stop offset="18%" stopColor="#202125"/><stop offset="48%" stopColor="#090a0c"/><stop offset="82%" stopColor="#020203"/><stop offset="100%" stopColor="#17181b"/></radialGradient>
          <linearGradient id="moteMetal" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fafafa"/><stop offset="18%" stopColor="#5c6067"/><stop offset="38%" stopColor="#17191d"/><stop offset="57%" stopColor="#a9adb4"/><stop offset="76%" stopColor="#25272c"/><stop offset="100%" stopColor="#050506"/></linearGradient>
          <linearGradient id="moteEar" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#36383d"/><stop offset="48%" stopColor="#030304"/><stop offset="80%" stopColor="#181a1e"/><stop offset="100%" stopColor="#858991"/></linearGradient>
          <linearGradient id="moteVisor" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#fff"/><stop offset="48%" stopColor="#e8eaee"/><stop offset="100%" stopColor="#9ea3ab"/></linearGradient>
          <filter id="moteDrop" x="-35%" y="-35%" width="170%" height="180%"><feGaussianBlur in="SourceAlpha" stdDeviation="8"/><feOffset dy="10"/><feComponentTransfer><feFuncA type="linear" slope=".42"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="moteGlow"><feGaussianBlur stdDeviation="3"/></filter>
        </defs>
        <ellipse cx="210" cy="405" rx="126" ry="17" fill="#34312a" opacity=".13" filter="url(#moteGlow)"/>
        <g filter="url(#moteDrop)" strokeLinejoin="round">
          <path d="M106 150 L55 18 L174 111 L203 139 Z" fill="url(#moteEar)" stroke="url(#moteMetal)" strokeWidth="3"/>
          <path d="M314 150 L365 18 L246 111 L217 139 Z" fill="url(#moteEar)" stroke="url(#moteMetal)" strokeWidth="3"/>
          <path d="M78 58 L142 119 L103 126 Z" fill="#090a0c" stroke="#555960" strokeWidth="1.4"/>
          <path d="M342 58 L278 119 L317 126 Z" fill="#090a0c" stroke="#555960" strokeWidth="1.4"/>
          <path d="M104 129 Q210 68 316 129 L345 220 Q350 309 291 363 Q250 396 210 398 Q170 396 129 363 Q70 309 75 220 Z" fill="url(#moteShell)" stroke="url(#moteMetal)" strokeWidth="4"/>
          <path d="M107 143 Q210 88 313 143 L329 207 Q275 183 210 187 Q145 183 91 207 Z" fill="#111216" stroke="#3d4046" strokeWidth="2"/>
          <path d="M107 146 Q210 92 313 146" fill="none" stroke="#d9dce1" strokeOpacity=".48" strokeWidth="2"/>
          <path d="M91 208 L156 222 L190 256 L115 244 Z" fill="#020203" stroke="#5b5f66" strokeWidth="2"/>
          <path d="M329 208 L264 222 L230 256 L305 244 Z" fill="#020203" stroke="#5b5f66" strokeWidth="2"/>
          <path d="M91 218 L190 249 L179 285 L108 268 Z" fill="#07080a" stroke="url(#moteMetal)" strokeWidth="2.5"/>
          <path d="M329 218 L230 249 L241 285 L312 268 Z" fill="#07080a" stroke="url(#moteMetal)" strokeWidth="2.5"/>
          <path d="M100 262 L175 278 L191 302 L128 299 Z" fill="url(#moteVisor)" stroke="#fff" strokeWidth="2"/>
          <path d="M320 262 L245 278 L229 302 L292 299 Z" fill="url(#moteVisor)" stroke="#fff" strokeWidth="2"/>
          <path d="M194 257 L210 267 L226 257 L224 306 L210 317 L196 306 Z" fill="#060709" stroke="#858a93" strokeWidth="1.5"/>
          <path d="M80 225 Q68 286 112 342" fill="none" stroke="#aeb2b9" strokeOpacity=".75" strokeWidth="2"/>
          <path d="M340 225 Q352 286 308 342" fill="none" stroke="#aeb2b9" strokeOpacity=".55" strokeWidth="2"/>
          <path d="M128 326 Q210 355 292 326 L270 363 Q210 388 150 363 Z" fill="#08090b" stroke="#555961" strokeWidth="2"/>
          <path d="M241 348 L278 340 M237 357 L274 349 M233 366 L268 358" stroke="#d4d7dc" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="89" cy="287" r="17" fill="#07080a" stroke="url(#moteMetal)" strokeWidth="4"/><circle cx="89" cy="287" r="7" fill="#202226" stroke="#969ba3" strokeWidth="2"/>
          <path d="M126 161 L175 176 M294 161 L245 176" stroke="#aeb2b9" strokeOpacity=".6" strokeWidth="2"/>
          <path d="M144 119 Q174 94 205 96" fill="none" stroke="#f3f4f6" strokeOpacity=".5" strokeWidth="2"/>
          <path d="M276 119 Q246 94 215 96" fill="none" stroke="#f3f4f6" strokeOpacity=".35" strokeWidth="2"/>
          <path d="M112 244 L179 265 M308 244 L241 265" stroke="#020203" strokeWidth="5"/>
          <path d="M152 376 Q210 392 268 376" fill="none" stroke="#aeb2b9" strokeOpacity=".3" strokeWidth="2"/>
        </g>
      </svg>
      <div className="vt-mote-data mote-data-left"><span className="vt-live-dot"/> MOTE IS AWARE</div>
      <div className="vt-mote-data mote-data-right">SIGNAL: <b>STABLE</b></div>
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
          <div className="vt-hero-actions"><a className="vt-button-primary" href="#mote">Read More <Arrow /></a><a className="vt-text-link vt-chat-mote-link" href="#mote">Chat with Mote <Arrow diagonal /></a></div>
          <div className="vt-hero-foot"><span className="vt-live-dot" /> A VANT Technologies intelligence companion</div>
        </div>
        <WindowScene />
        <div className="vt-hero-bottom"><span>01 / A NEW WAY FORWARD</span><span>SCROLL TO EXPLORE ↓</span></div>
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
  if (path === "/privacy" || path === "/privacy-policy") return <LegalPages page="privacy" />;
  if (path === "/terms" || path === "/terms-of-service") return <LegalPages page="terms" />;
  return <CorporateHomeView />;
}
