import { useEffect } from "react";
import VANTDocumentViewer from "./VANTDocumentViewer";
import VANTLibraryWorkspace from "./VANTLibraryWorkspace";
import "./corporate.css";

export default function LibrariesPage() {
  useEffect(() => { document.title = "VANT Libraries — Knowledge for what's next"; }, []);
  return <VANTDocumentViewer><div className="vt-site vt-libraries-page vt-libraries-workspace-page">
    <header className="vt-header">
      <a className="vt-brand" href="/" aria-label="VANT Technologies home"><span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span></a>
      <nav className="vt-nav" aria-label="Libraries navigation"><a href="/">Home</a><a className="vt-nav-cta" href="/connect">Contact <span className="vt-arrow">↗</span></a></nav>
    </header>
    <main className="vt-libraries-main vt-libraries-main-workspace">
      <section className="vt-libraries-hero vt-libraries-hero-compact">
        <p className="vt-libraries-kicker"><span className="vt-live-dot" /> THE VANT KNOWLEDGE ECOSYSTEM</p>
        <h1>Knowledge for <em>what comes next.</em></h1>
        <p className="vt-libraries-intro">Explore VANT news, architectures, engineering notes, policies, and practical resources in one searchable library.</p>
      </section>
      <VANTLibraryWorkspace />
    </main>
    <footer className="vt-footer"><a className="vt-brand" href="/"><span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span></a><p>Intelligence in motion.</p><span className="vt-copyright">© {new Date().getFullYear()} VANT TECHNOLOGIES</span></footer>
  </div></VANTDocumentViewer>;
}
