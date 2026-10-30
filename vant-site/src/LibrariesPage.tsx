import { useEffect } from "react";
import "./corporate.css";

const libraries = [
  { number: "01", category: "KNOWLEDGE BASE", symbol: "⌘", title: "VANT Knowledge", description: "Product guides, practical documentation, and resources to help you get more from VANT.", status: "COMING INTO FOCUS" },
  { number: "02", category: "LEARNING", symbol: "✳", title: "VANT Education", description: "Study resources, learning guides, and tools designed to make knowledge easier to work with.", status: "GROWING COLLECTION" },
  { number: "03", category: "COMPANY", symbol: "V", title: "VANT Technologies", description: "Company updates, product announcements, release notes, and the thinking behind our work.", status: "GROWING COLLECTION" },
  { number: "04", category: "IDEAS & RESEARCH", symbol: "⌁", title: "VANT Research", description: "Perspectives on AI, emerging technology, and the ideas shaping tomorrow's experiences.", status: "GROWING COLLECTION" },
];

export default function LibrariesPage() {
  useEffect(() => { document.title = "VANT Libraries — Knowledge for what's next"; }, []);
  return <div className="vt-site vt-libraries-page">
    <header className="vt-header">
      <a className="vt-brand" href="/" aria-label="VANT Technologies home"><span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span></a>
      <nav className="vt-nav" aria-label="Libraries navigation"><a href="/">Home</a><a className="vt-nav-cta" href="/connect">Contact <span className="vt-arrow">↗</span></a></nav>
    </header>
    <main className="vt-libraries-main">
      <section className="vt-libraries-hero">
        <p className="vt-libraries-kicker"><span className="vt-live-dot" /> THE VANT KNOWLEDGE ECOSYSTEM</p>
        <h1>Knowledge for<br/><em>what comes next.</em></h1>
        <p className="vt-libraries-intro">A growing collection of resources, guides, and ideas from across the VANT ecosystem — made to help people work, learn, and explore.</p>
        <div className="vt-libraries-meta"><span>VANT LIBRARIES</span><span>01 — 04 / COLLECTIONS</span></div>
      </section>
      <section className="vt-libraries-collections" aria-label="VANT library collections">
        {libraries.map((library) => <article className="vt-libraries-collection" id={library.title === "VANT Technologies" ? "vant-technologies" : library.title === "VANT Education" ? "vant-education" : undefined} key={library.number}>
          <div className="vt-libraries-collection-top"><span>{library.number} / {library.category}</span><span>{library.status}</span></div>
          <div className="vt-libraries-collection-body"><span className="vt-libraries-symbol">{library.symbol}</span><div><h2>{library.title}</h2><p>{library.description}</p></div><span className="vt-libraries-arrow">↗</span></div>
        </article>)}
      </section>
      <p className="vt-libraries-footnote">THE COLLECTIONS ARE BEING BUILT. INDIVIDUAL RESOURCES WILL APPEAR HERE AS THEY ARE PUBLISHED.</p>
    </main>
    <footer className="vt-footer"><a className="vt-brand" href="/"><span className="vt-brand-mark">V</span><span>VANT <i>TECHNOLOGIES</i></span></a><p>Intelligence in motion.</p><span className="vt-copyright">© {new Date().getFullYear()} VANT TECHNOLOGIES</span></footer>
  </div>;
}
