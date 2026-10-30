import { useEffect, useState, type FormEvent } from "react";
import MoteSection from "./MoteSection";
import "./corporate.css";

export default function MoteProductPage() {
  const [prompt, setPrompt] = useState("");
  const [demoAnswer, setDemoAnswer] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");

  function handleDemoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = prompt.trim();
    if (!question) return;
    setSubmittedPrompt(question);
    const normalized = question.toLowerCase();
    if (normalized.includes("vant")) {
      setDemoAnswer("VANT is the platform behind MOTE, bringing AI tools and workflows together for work and learning. Explore the VANT homepage to see the wider ecosystem.");
    } else if (normalized.includes("task") || normalized.includes("cowork") || normalized.includes("workflow")) {
      setDemoAnswer("MOTE is designed to help bring context and coordination to work. In this preview, this is an illustrative response; task execution is not connected to a live AI engine yet.");
    } else if (normalized.includes("security") || normalized.includes("safe") || normalized.includes("permission")) {
      setDemoAnswer("Trust starts with clear permissions and user control. The live security and approval capabilities should be confirmed in the VANT product before being represented as active.");
    } else if (normalized.includes("who") || normalized.includes("found")) {
      setDemoAnswer("MOTE.EXE is VANT Technologies’ digital guardian character. Visit the VANT homepage to learn more about the team and platform.");
    } else {
      setDemoAnswer("Thanks for the signal. This console is currently a product preview with sample responses, not a live AI chat. The next step is connecting it to VANT’s supported AI experience.");
    }
    setPrompt("");
  }

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

        <section className="mote-product-section mp-capabilities" id="capabilities">
          <div className="mp-section-head vt-reveal">
            <p className="mp-kicker">01 / WHAT MOTE REPRESENTS</p>
            <h2>Intelligence with<br /><em>a sense of purpose.</em></h2>
            <p className="mp-intro">MOTE is the guardian identity for the VANT ecosystem: a clear signal for awareness, coordination, and thoughtful control around the work you do.</p>
          </div>
          <div className="mp-capability-grid">
            <article className="mp-capability vt-reveal"><span className="mp-index">A / 01</span><span className="mp-line-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="17" /><circle cx="24" cy="24" r="9" /><path d="M24 3v8M45 24h-8M24 45v-8M3 24h8M24 24l11-11" /><circle cx="35" cy="13" r="2.5" /></svg></span><h3>Awareness</h3><p>Keep tasks, context, and the next thing that needs attention in view.</p></article>
            <article className="mp-capability vt-reveal"><span className="mp-index">A / 02</span><span className="mp-line-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><circle cx="10" cy="24" r="4" /><circle cx="38" cy="10" r="4" /><circle cx="38" cy="38" r="4" /><path d="M14 22l20-10M14 26l20 10M24 17v14" /><circle cx="24" cy="24" r="4" /></svg></span><h3>Coordination</h3><p>Bring structure to workflows and help connect work across the VANT ecosystem.</p></article>
            <article className="mp-capability vt-reveal"><span className="mp-index">A / 03</span><span className="mp-line-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M24 4l16 6v12c0 10-6.8 17.3-16 22-9.2-4.7-16-12-16-22V10l16-6Z" /><path d="m16 24 5 5 11-12" /></svg></span><h3>Guardrails</h3><p>Keep permissions, approvals, and user control central as connected capabilities evolve.</p></article>
          </div>
          <p className="mp-footnote">These describe MOTE’s design direction. Specific capabilities depend on the features currently available in VANT.</p>
        </section>

        <section className="mote-product-section mp-console" id="mote-console">
          <div className="mp-console-copy vt-reveal">
            <p className="mp-kicker">02 / OPEN A CHANNEL</p><h2>Got a task or<br />idea in your mind?</h2>
            <p className="mp-intro">Send MOTE a signal. Try a question about VANT, workflows, or the guardian concept.</p>
            <div className="mp-suggestions" aria-label="Suggested prompts">
              {["What is VANT?", "How can MOTE help with workflows?", "How should MOTE handle security?"].map((item) => <button type="button" key={item} onClick={() => setPrompt(item)}>{item}<span aria-hidden="true">↗</span></button>)}
            </div>
          </div>
          <div className="mp-console-panel vt-reveal">
            <div className="mp-console-top"><span>M-01 / INPUT CHANNEL</span><span><i /> DEMO MODE</span></div>
            <form className="mp-prompt-form" onSubmit={handleDemoSubmit}>
              <label htmlFor="mote-demo-prompt">MESSAGE MOTE</label>
              <div className="mp-prompt-row"><input id="mote-demo-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Ask about VANT or workflows..." maxLength={400} /><button type="submit" aria-label="Send prompt" disabled={!prompt.trim()}>↗</button></div>
              <p>Enter a question to preview the interaction. Responses below are sample responses, not live AI output.</p>
            </form>
            {demoAnswer && <div className="mp-demo-response" role="status" aria-live="polite"><span>YOU / {submittedPrompt}</span><p>{demoAnswer}</p></div>}
            <div className="mp-console-foot"><span>LOCAL PREVIEW</span><span>LIVE ENGINE NOT CONNECTED</span></div>
          </div>
        </section>

        <section className="mote-product-section mp-workflow" id="workflow">
          <div className="mp-section-head vt-reveal"><p className="mp-kicker">03 / A SIGNAL BECOMES ACTION</p><h2>From intent<br /><em>to a clearer next step.</em></h2><p className="mp-intro">A simple illustration of how an AI-supported workflow can be organized. This is a concept demonstration, not a live task run.</p></div>
          <div className="mp-workflow-track">
            {[
              ["01", "RECEIVED", "A task or idea is captured."],
              ["02", "UNDERSTOOD", "Context and desired outcome are clarified."],
              ["03", "ORGANIZED", "Possible steps and tools are identified."],
              ["04", "READY FOR REVIEW", "The user reviews the plan before action."]
            ].map(([number, title, description]) => <article className="mp-workflow-step vt-reveal" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><i aria-hidden="true">↗</i></article>)}
          </div>
        </section>

        <section className="mote-product-section mp-ecosystem" id="ecosystem">
          <div className="mp-ecosystem-copy vt-reveal"><p className="mp-kicker">04 / PART OF A BIGGER SYSTEM</p><h2>A personality<br /><em>in the system.</em></h2><p className="mp-intro">MOTE is the guardian identity. VANT is the platform where the work, tools, and intelligence come together.</p></div>
          <div className="mp-ecosystem-grid">
            <a href="/#products" className="mp-ecosystem-item vt-reveal"><span>01 / INTELLIGENCE</span><h3>VANT AI</h3><p>Explore the AI experience behind the platform.</p><b>EXPLORE VANT ↗</b></a>
            <a href="/#products" className="mp-ecosystem-item vt-reveal"><span>02 / WORKFLOW</span><h3>CoWork</h3><p>Discover the workflow-focused side of VANT.</p><b>EXPLORE VANT ↗</b></a>
            <a href="/#products" className="mp-ecosystem-item vt-reveal"><span>03 / CONNECTIONS</span><h3>Integrations</h3><p>Learn about the tools and services VANT can connect with.</p><b>EXPLORE VANT ↗</b></a>
          </div>
        </section>

        <section className="mote-product-section mp-final-cta">
          <p className="mp-kicker">05 / YOUR NEXT MOVE</p><h2>Ready when<br /><em>you are.</em></h2><p>Meet the intelligence behind the work. Explore VANT and see where your next idea can go.</p>
          <div className="mp-cta-row"><a className="mp-primary-cta" href="/#products">Explore VANT AI <span>↗</span></a><a className="mp-secondary-cta" href="#mote-console">Ask MOTE a question</a></div>
        </section>
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
