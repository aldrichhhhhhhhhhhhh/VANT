import { useEffect } from "react";
import "./mote.css";

function Orb() {
  return <div className="mote-orb-stage" role="img" aria-label="A dark, reflective orb representing MOTE.EXE">
    <div className="mote-orbit mote-orbit-a" /><div className="mote-orbit mote-orbit-b" />
    <div className="mote-orb-shadow" />
    <div className="mote-orb"><div className="mote-orb-sheen" /><div className="mote-orb-core" /><div className="mote-orb-highlight" /><div className="mote-orb-glint" /></div>
    <div className="mote-orb-ring" />
    <span className="mote-coordinate mote-coordinate-a">AWARENESS / 001</span><span className="mote-coordinate mote-coordinate-b">VANT DIGITAL GUARDIAN</span>
  </div>;
}
function SignalMark() { return <span className="mote-mark" aria-hidden="true"><i /><i /><i /></span>; }
export default function MoteHome() {
  useEffect(() => { document.title = "MOTE.EXE — VANT's Digital Guardian"; }, []);
  return <div className="mote-page">
    <header className="mote-header">
      <a className="mote-wordmark" href="/" aria-label="VANT Technologies home"><span className="mote-v-mark">V</span><span>VANT <small>TECHNOLOGIES</small></span></a>
      <div className="mote-header-center"><span className="mote-status-dot" /> AN INTELLIGENCE WITHIN VANT</div>
      <a className="mote-back-link" href="/">BACK TO VANT <span>↗</span></a>
    </header>
    <main>
      <section className="mote-hero">
        <div className="mote-hero-copy">
          <div className="mote-overline"><SignalMark /> INTRODUCING <span>·</span> VANT DIGITAL GUARDIAN</div>
          <p className="mote-designation">MOTE.EXE <span>— 001</span></p>
          <h1>Awareness,<br /><em>by design.</em></h1>
          <p className="mote-lede">An intelligent presence built to help VANT stay aware of the work, connections, and moments that matter.</p>
          <div className="mote-actions"><a className="mote-primary" href="#purpose">Discover MOTE <span>↓</span></a><a className="mote-secondary" href="mailto:VANT.CLIENSUPPORT@GMAIL.COM">Connect with VANT <span>↗</span></a></div>
          <div className="mote-hero-foot"><span className="mote-status-dot" /> OBSERVANT BY NATURE <span>·</span> PURPOSEFUL BY DESIGN</div>
        </div>
        <Orb />
        <div className="mote-hero-index"><span>01 / THE PRESENCE</span><span>VANT TECHNOLOGIES <b>×</b> MOTE.EXE</span></div>
      </section>
      <section className="mote-purpose" id="purpose">
        <div className="mote-section-label"><span>02</span> / THE PURPOSE</div>
        <div className="mote-purpose-grid"><h2>Not just another assistant.<br /><em>A guardian of context.</em></h2><div><p>MOTE is envisioned as a digital guardian inside the VANT ecosystem — attentive to context, thoughtful about what needs attention, and designed to help people stay one step ahead.</p><p>It is not here to take the place of human judgment. It is here to make important signals easier to notice, understand, and act on.</p></div></div>
        <div className="mote-principles">
          <article><span>01</span><div><h3>Awareness</h3><p>Recognize meaningful activity, context, and changes across a workspace.</p></div></article>
          <article><span>02</span><div><h3>Protection</h3><p>Help surface risks, overlooked details, and moments that deserve attention.</p></div></article>
          <article><span>03</span><div><h3>Continuity</h3><p>Keep tasks, connections, and next steps from slipping out of view.</p></div></article>
        </div>
      </section>
      <section className="mote-systems">
        <div className="mote-section-label"><span>03</span> / WHERE MOTE BELONGS</div>
        <div className="mote-systems-heading"><h2>One presence.<br /><em>Across the work.</em></h2><p>MOTE's role is to bring awareness across the places where work happens — with clear boundaries and human direction.</p></div>
        <div className="mote-system-list">
          <article><span className="mote-system-number">01</span><div><h3>CoWork</h3><p>Stay attentive to agent coordination, task progress, and decisions that need a human eye.</p></div><span className="mote-system-tag">COLLABORATION</span></article>
          <article><span className="mote-system-number">02</span><div><h3>Integrations</h3><p>Help make connected services and important changes easier to keep track of.</p></div><span className="mote-system-tag">CONNECTION</span></article>
          <article><span className="mote-system-number">03</span><div><h3>Safety &amp; policy</h3><p>Surface boundary concerns and help keep actions aligned with workspace rules.</p></div><span className="mote-system-tag">GUARDRAILS</span></article>
          <article><span className="mote-system-number">04</span><div><h3>Deadlines &amp; continuity</h3><p>Bring upcoming commitments and stalled next steps into view before they are missed.</p></div><span className="mote-system-tag">AWARENESS</span></article>
        </div>
      </section>
      <section className="mote-ethos">
        <div className="mote-ethos-orb"><div /></div>
        <div><div className="mote-section-label"><span>04</span> / THE PRINCIPLE</div><h2>Quiet when all is well.<br /><em>Present when it matters.</em></h2><p>MOTE should not create noise to prove that it is working. Its value is in noticing what matters, communicating with clarity, and leaving the final decision where it belongs: with people.</p></div>
      </section>
      <section className="mote-contact">
        <div className="mote-section-label"><span>05</span> / THE NEXT CHAPTER</div>
        <div className="mote-contact-grid"><h2>Awareness is<br /><em>only the beginning.</em></h2><div><p>MOTE.EXE is part of VANT's evolving technology ecosystem. Follow the journey as its capabilities take shape.</p><a href="https://vant-xi.vercel.app/" className="mote-primary">Explore VANT Technologies <span>↗</span></a></div></div>
      </section>
    </main>
    <footer className="mote-footer"><a className="mote-wordmark" href="/"><span className="mote-v-mark">V</span><span>VANT <small>TECHNOLOGIES</small></span></a><p>MOTE.EXE — A digital guardian by VANT.</p><span>© {new Date().getFullYear()} VANT TECHNOLOGIES</span></footer>
  </div>;
}
