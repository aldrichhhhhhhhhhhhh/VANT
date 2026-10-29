import { useEffect } from "react";
import MoteSection from "./MoteSection";
import "./corporate.css";

export default function MoteProductPage() {
  useEffect(() => {
    document.title = "MOTE.EXE — Your Personal AI Guardian | VANT Technologies";
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("vt-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.1 });
    document.querySelectorAll(".vt-reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="vt-site vt-mote-product-page">
      <header className="vt-header">
        <a className="vt-brand" href="/" aria-label="VANT Technologies home">
          <span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span>
        </a>
        <nav className="vt-nav" aria-label="MOTE navigation">
          <a href="/">Home</a>
          <a className="vt-nav-cta" href="#interactive">Meet MOTE <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      <main id="top">
        <MoteSection />
      </main>
      <footer className="vt-footer">
        <a className="vt-brand" href="/"><span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span></a>
        <p>MOTE.EXE · Your personal AI Guardian.</p>
        <div className="vt-footer-links"><a href="/">VANT Technologies</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
        <span className="vt-copyright">© {new Date().getFullYear()} VANT TECHNOLOGIES</span>
      </footer>
    </div>
  );
}
