import { useEffect, useState, type PointerEvent } from "react";
import LegalPages from "./LegalPages";
import MoteProductPage from "./MoteProductPage";
import LibrariesPage from "./LibrariesPage";
import ConnectPage from "./ConnectPage";
import CorporateSectionPage from "./CorporateSectionPage";
import "./corporate.css";



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

function CorporateHomeView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  useEffect(() => {
    document.title = "VANT Technologies — Intelligence in motion";
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("vt-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".vt-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!activeDropdown) return;
    const handleOutsidePointer = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const openGroup = document.querySelector(".vt-nav-group-open");
      if (!target || !openGroup?.contains(target)) setActiveDropdown("");
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveDropdown("");
    };
    document.addEventListener("pointerdown", handleOutsidePointer);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeDropdown]);
  const closeMenu = () => { setMenuOpen(false); setActiveDropdown(""); };
  const toggleDropdown = (name: string) => setActiveDropdown(current => current === name ? "" : name);
  return <div className="vt-site vt-home-v2">
    <style>{`
      .vt-home-v2 .vt-nav-group { position: relative; }
      .vt-home-v2 .vt-nav-dropdown {
        top: calc(100% + 10px); left: 50%; right: auto;
        width: min(814px, calc(100vw - 48px));
        grid-template-columns: minmax(280px, .9fr) minmax(320px, 1.1fr);
        align-items: stretch; gap: 10px; padding: 16px;
        transform: translate(-50%, 8px);
      }
      .vt-home-v2 .vt-dropdown-intro { grid-row: 1; min-height: 216px; padding: 28px; }
      .vt-home-v2 .vt-dropdown-links { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
      .vt-home-v2 .vt-dropdown-links > a { flex: 1; min-height: 64px; }
      .vt-home-v2 .vt-nav-dropdown > a { min-height: 80px; }
      .vt-home-v2 .vt-nav-group-open > .vt-nav-dropdown {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translate(-50%, 0);
      }
      .vt-home-v2 .vt-nav-group:not(.vt-nav-group-open) > .vt-nav-dropdown {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }

      @media (max-width: 760px) {
        .vt-home-v2 .vt-dropdown-intro { min-height: 110px; padding: 18px; }
        .vt-home-v2 .vt-dropdown-links { gap: 7px; }
        .vt-home-v2 .vt-nav-dropdown,
        .vt-home-v2 .vt-nav-group-open > .vt-nav-dropdown,
        .vt-home-v2 .vt-nav-products-dropdown,
        .vt-home-v2 .vt-nav-group-open > .vt-nav-products-dropdown {
          top: auto; left: auto; right: auto; width: 100%;
          transform: none; grid-template-columns: 1fr; padding: 8px;
        }
      }
    `}</style>
    <header className="vt-header vt-header-editorial">
      <a className="vt-brand" href="#top" onClick={closeMenu} aria-label="VANT Technologies home"><span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span></a>
      <button className="vt-menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
      <nav className={menuOpen ? "vt-nav vt-nav-open vt-nav-editorial" : "vt-nav vt-nav-editorial"} aria-label="Main navigation">
        <a className="vt-nav-news" href="/news" onClick={closeMenu}>News</a>
        <div className={activeDropdown === "research" ? "vt-nav-group vt-nav-group-open" : "vt-nav-group"}>
          <button type="button" aria-expanded={activeDropdown === "research"} onClick={() => toggleDropdown("research")}>Research <span>⌄</span></button>
          <div className="vt-nav-dropdown">
            <div className="vt-dropdown-intro"><small>EXPLORE IDEAS</small><a className="vt-dropdown-intro-link" href="/research" onClick={closeMenu}>Research & knowledge ↗</a><p>Perspectives, learning resources, and the thinking behind our technology.</p></div>
            <div className="vt-dropdown-links">
              <a href="/libraries" onClick={closeMenu}><b>VANT Libraries</b><small>Documentation, resources, and research</small></a>
              <a href="/perspectives" onClick={closeMenu}><b>Technology perspectives</b><small>Ideas shaping what comes next</small></a>
            </div>
          </div>
        </div>
        <div className={activeDropdown === "policy" ? "vt-nav-group vt-nav-group-open" : "vt-nav-group"}>
          <button type="button" aria-expanded={activeDropdown === "policy"} onClick={() => toggleDropdown("policy")}>Policy <span>⌄</span></button>
          <div className="vt-nav-dropdown">
            <div className="vt-dropdown-intro"><small>TRUST & RESPONSIBILITY</small><a className="vt-dropdown-intro-link" href="/policy" onClick={closeMenu}>Our policies ↗</a><p>Clear principles for protecting people, supporting safe use, and building trust in our technology.</p></div>
            <div className="vt-dropdown-links">
              <a href="/privacy" onClick={closeMenu}><b>Privacy</b><small>How we approach personal information</small></a>
              <a href="/terms" onClick={closeMenu}><b>Terms & policies</b><small>Terms governing our services</small></a>
              <a href="/connect" onClick={closeMenu}><b>Help & security</b><small>Get support from our team</small></a>
            </div>
          </div>
        </div>
        <a href="/commitments" onClick={closeMenu}>Commitments</a>
        <div className={activeDropdown === "company" ? "vt-nav-group vt-nav-group-open" : "vt-nav-group"}>
          <button type="button" aria-expanded={activeDropdown === "company"} onClick={() => toggleDropdown("company")}>Company <span>⌄</span></button>
          <div className="vt-nav-dropdown">
            <div className="vt-dropdown-intro"><small>ABOUT VANT</small><a className="vt-dropdown-intro-link" href="/company" onClick={closeMenu}>People & purpose ↗</a><p>Discover the principles, ambitions, and relationships shaping VANT Technologies.</p></div>
            <div className="vt-dropdown-links">
              <a href="/mission" onClick={closeMenu}><b>Our mission & vision</b><small>What VANT Technologies stands for</small></a>
              <a href="/vision" onClick={closeMenu}><b>Our future</b><small>Where we're heading</small></a>
              <a href="/partnerships" onClick={closeMenu}><b>Partnerships</b><small>Build something meaningful together</small></a>
            </div>
          </div>
        </div>
        <div className={activeDropdown === "products" ? "vt-nav-group vt-nav-group-open" : "vt-nav-group"}>
          <button type="button" aria-expanded={activeDropdown === "products"} onClick={() => toggleDropdown("products")}>Products <span>⌄</span></button>
          <div className="vt-nav-dropdown">
            <div className="vt-dropdown-intro"><small>THE VANT ECOSYSTEM</small><a className="vt-dropdown-intro-link" href="/products" onClick={closeMenu}>Products & experiences ↗</a><p>Purpose-built experiences for work, learning, and a more capable relationship with AI.</p></div>
            <div className="vt-dropdown-links">
              <a href="https://vant-ai.vercel.app/" onClick={closeMenu}><b>VANT AI Work Platform</b><small>Intelligence for work and teams</small></a>
              <a href="/education" onClick={closeMenu}><b>VANT Education</b><small>Tools for learning and progress</small></a>
              <a href="/mote-exe" onClick={closeMenu}><b>MOTE.EXE</b><small>Your VANT intelligence companion</small></a>
            </div>
          </div>
        </div>
        <a className="vt-nav-sellspace" href="https://sellspace-corporate.vercel.app/" target="_blank" rel="noreferrer" onClick={closeMenu}><span className="vt-sellspace-dot"/> SELLSPACE</a>
        <a className="vt-nav-cta" href="/connect" onClick={closeMenu}>Let's connect <Arrow diagonal /></a>
      </nav>
    </header>

    <main id="top">
      <section id="mission" className="vt-mission-block vt-section">
        <div className="vt-section-kicker vt-reveal"><span>01</span> / OUR MISSION & VISION</div>
        <div className="vt-mission-statement vt-reveal">
          <p><strong>We build intelligent technology that moves people forward.</strong> We believe AI and thoughtful design can make work more capable, learning more personal, and ambitious ideas more achievable. <em>Our vision is a future where technology expands human possibility — with purpose, responsibility, and room for everyone to grow.</em></p>
          <div className="vt-mission-labels"><span>OUR MISSION</span><span>OUR VISION</span></div>
        </div>
        <div className="vt-mission-art" aria-label="Abstract visual collection representing ideas, research, and technology">
          <div className="vt-art-tile vt-art-one"><span className="vt-art-orbit"/><span className="vt-art-orbit"/><span className="vt-art-orbit"/></div>
          <div className="vt-art-tile vt-art-two"><span className="vt-art-sun"/><span className="vt-art-grid"/></div>
          <div className="vt-art-tile vt-art-three"><span className="vt-art-lines"/></div>
          <div className="vt-art-tile vt-art-four"><span className="vt-art-circles"><i/><i/><i/><i/><i/><i/><i/></span></div>
          <div className="vt-art-tile vt-art-five"><span className="vt-art-fragments"><i/><i/><i/><i/></span></div>
          <div className="vt-art-tile vt-art-six"><span className="vt-art-symbol">V</span></div>
          <div className="vt-art-tile vt-art-seven"><span className="vt-art-wave"/></div>
          <div className="vt-art-tile vt-art-eight"><span className="vt-art-crosses">＋　＋<br/>　＋　＋</span></div>
        </div>
      </section>

      <section id="mote" className="vt-hero vt-hero-v2 vt-mote-feature">
        <div className="vt-hero-copy">
          <div className="vt-eyebrow"><span className="vt-eyebrow-line" /> MEET VANT'S INTELLIGENCE COMPANION</div>
          <h1>Mote<span>.exe</span></h1>
          <p className="vt-hero-lede">A personal AI Guardian — quietly watchful, ready to help, and built to bring intelligence wherever your work takes you.</p>
          <div className="vt-mote-version">VERSION 1.0 <span className="vt-live-dot" /> INTRODUCING MOTE.EXE</div>
          <div className="vt-hero-actions"><a className="vt-button-primary" href="/mote-exe">Discover MOTE <Arrow /></a><a className="vt-text-link" href="/mote-exe">Explore its capabilities <Arrow diagonal /></a></div>
          <div className="vt-hero-foot"><span className="vt-live-dot" /> A VANT TECHNOLOGIES INTELLIGENCE COMPANION</div>
        </div>
        <WindowScene />
        <div className="vt-hero-bottom"><span>02 / THE INTELLIGENCE COMPANION</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section id="products" className="vt-products vt-section vt-products-v2">
        <div className="vt-section-heading vt-reveal"><div><div className="vt-section-kicker"><span>03</span> / THE PRODUCT ECOSYSTEM</div><h2>Three experiences.<br /><em>One connected vision.</em></h2></div><p>Purpose-built applications designed to support the way people work, learn, and interact with intelligent technology.</p></div>
        <div className="vt-product-cards">
          <article className="vt-product-card vt-reveal"><div className="vt-card-topline"><span>01 / WORK</span><span>VANT APPLICATION</span></div><div className="vt-card-symbol vt-symbol-work">V.</div><h3>VANT AI<br /><em>Work Platform</em></h3><p>An AI workspace for thinking, planning, analyzing, and getting meaningful work done across projects and everyday workflows.</p><div className="vt-card-tags"><span>AI workspace</span><span>Projects</span><span>CoWork</span></div><a href="https://vant-ai.vercel.app/" className="vt-product-link">Explore VANT AI <Arrow diagonal /></a></article>
          <article className="vt-product-card vt-reveal"><div className="vt-card-topline"><span>02 / LEARNING</span><span>VANT APPLICATION</span></div><div className="vt-card-symbol vt-symbol-education">V<span>EDU</span></div><h3>VANT<br /><em>Education</em></h3><p>Learning tools designed to turn notes into study resources, support practice, and help learners plan their progress.</p><div className="vt-card-tags"><span>Study guides</span><span>Flashcards</span><span>Learning tools</span></div><a href="/connect" className="vt-product-link">Discover VANT Education <Arrow diagonal /></a></article>
          <article className="vt-product-card vt-product-card-mote vt-reveal"><div className="vt-card-topline"><span>03 / INTELLIGENCE</span><span>VANT COMPANION</span></div><div className="vt-card-symbol vt-symbol-mote">M.</div><h3>MOTE<span>.EXE</span></h3><p>A watchful AI companion designed to bring helpful intelligence and a distinct presence into the VANT ecosystem.</p><div className="vt-card-tags"><span>AI companion</span><span>Guardian identity</span></div><a href="/mote-exe" className="vt-product-link">Meet MOTE <Arrow diagonal /></a></article>
        </div>
      </section>

      <section id="learn" className="vt-learn-block vt-section">
        <div className="vt-section-kicker vt-reveal"><span>04</span> / LEARN MORE ABOUT VANT TECHNOLOGIES</div>
        <div className="vt-learn-heading vt-reveal"><h2>Explore the thinking<br /><em>behind what we build.</em></h2><p>Go beyond the products and discover the knowledge, relationships, and long-term direction shaping VANT Technologies.</p></div>
        <div className="vt-learn-cards">
          <a className="vt-learn-card vt-reveal" href="/libraries"><span>01 / KNOWLEDGE</span><strong>VANT Libraries</strong><p>Explore our collections of product knowledge, learning resources, company updates, and research.</p><b>Explore the libraries <Arrow diagonal /></b></a>
          <a className="vt-learn-card vt-reveal" href="/connect"><span>02 / COLLABORATION</span><strong>Partnerships</strong><p>Connect with VANT Technologies to explore ideas, opportunities, and potential collaborations.</p><b>Start a conversation <Arrow diagonal /></b></a>
          <a className="vt-learn-card vt-learn-future vt-reveal" href="/libraries"><span>03 / THE ROAD AHEAD</span><strong>Our vision for the future</strong><p>We aim to grow a connected technology ecosystem through useful products, responsible intelligence, and meaningful collaboration.</p><b>Discover our thinking <Arrow diagonal /></b></a>
        </div>
      </section>
    </main>

    <footer className="vt-mega-footer">
      <div className="vt-mega-footer-top"><a className="vt-brand" href="#top"><span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span></a><p>Intelligence in motion.<br />Building technology for what comes next.</p><a className="vt-mega-contact" href="/connect">Connect with VANT <Arrow diagonal /></a></div>
      <div className="vt-mega-columns">
        <div><h4>Research</h4><a href="/libraries">Research library</a><a href="/perspectives">Perspectives</a></div>
        <div><h4>Policy</h4><a href="/libraries">Our approach</a><a href="/privacy">Privacy</a></div>
        <div><h4>Commitments</h4><a href="/mission">Our mission</a><a href="/vision">Our vision</a></div>
        <div><h4>Company</h4><a href="/company">About VANT</a><a href="/partnerships">Partnerships</a><a href="/connect">Contact</a></div>
        <div><h4>Products</h4><a href="https://vant-ai.vercel.app/">VANT AI Work Platform</a><a href="/education">VANT Education</a><a href="/mote-exe">MOTE.EXE</a></div>
        <div><h4>Models</h4><a href="/libraries">VANT intelligence</a><a href="/mote-exe">MOTE.EXE</a></div>
        <div><h4>Solutions</h4><a href="https://vant-ai.vercel.app/">Work platform</a><a href="/connect">Learning technology</a></div>
        <div><h4>Help & Security</h4><a href="/connect">Help center</a><a href="/connect">Contact support</a></div>
        <div><h4>Terms & Policies</h4><a href="/terms">Terms of service</a><a href="/privacy">Privacy policy</a></div>
      </div>
      <div className="vt-mega-footer-bottom"><span>© {new Date().getFullYear()} VANT TECHNOLOGIES</span><span>INDEPENDENT TECHNOLOGY / BUILT WITH PURPOSE</span><a href="#top">Back to top ↑</a></div>
    </footer>
  </div>;
}
export default function CorporateHome() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const sectionSlug = path.slice(1);
  const sectionRoutes = ["news","research","policy","commitments","company","products","perspectives","our-approach","mission","vision","partnerships","education"];
  if (sectionRoutes.includes(sectionSlug)) return <CorporateSectionPage slug={sectionSlug} />;
  if (path === "/mote-exe" || path === "/mote") return <MoteProductPage />;
  if (path === "/libraries") return <LibrariesPage />;
  if (path === "/connect" || path === "/contact" || path === "/support") return <ConnectPage />;
  if (path === "/privacy" || path === "/privacy-policy") return <LegalPages page="privacy" />;
  if (path === "/terms" || path === "/terms-of-service") return <LegalPages page="terms" />;
  return <CorporateHomeView />;
}
