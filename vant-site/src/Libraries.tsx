import { useEffect } from "react";
import "./libraries.css";

const publication = {
  id: "BA-001",
  title: "Beyond Automation",
  subtitle: "Rethinking the Relationship Between Human Intelligence and Artificial Intelligence in the Future of Work",
  author: "Karl Aldrich Uy",
  affiliation: "Independent Researcher · Founder and CTO, VANT Technologies",
  category: "Artificial Intelligence & Society",
  type: "Philosophical Research Article",
  edition: "Version 1.0 · November 2026",
  abstract: [
    "The rapid development of artificial intelligence (AI) is transforming the nature of human work and challenging established assumptions about productivity, employment, professional identity, and the relationship between humans and technology. While AI is frequently presented as a mechanism for automating tasks and increasing efficiency, its implications extend beyond technical performance. It raises fundamental questions about human agency, economic participation, the distribution of opportunity, and the meaning of work in contemporary society.",
    "This article examines the evolving relationship between human intelligence and artificial intelligence, with particular attention to developing economies. Using conceptual analysis and secondary research, it considers three connected processes: the automation of tasks, the augmentation of human capabilities, and the restructuring of professional responsibilities. It draws on philosophical perspectives concerning labor, action, alienation, and human agency, and evaluates empirical and institutional research on occupational exposure, productivity, and the global distribution of AI capabilities.",
    "The article argues that the future of work should not be understood solely through the capacity of machines to replace human tasks. Rather, it should be evaluated through the changing distribution of responsibilities, opportunities, and decision-making power between people and technological systems. Although AI can expand productivity and access to knowledge, these benefits are neither automatic nor evenly distributed. In developing economies, infrastructure gaps, unequal access to skills, institutional capacity, and dependence on external technology providers shape who can benefit from AI and who bears its risks. Technological progress should therefore be assessed not only by what machines can accomplish, but also by whether their use strengthens human agency, decent work, and inclusive development."
  ],
  keywords: ["Artificial intelligence", "Future of work", "Human intelligence", "Automation", "Labor transformation", "Developing economies", "Digital inequality", "Human agency", "Human–AI collaboration", "Technological development"],
  contents: [
    "1. Introduction and Thesis",
    "2. Conceptual Clarification and Background",
    "3. Human Contribution Beyond Task Performance",
    "4. AI, Work, and the Conditions of Developing Economies",
    "5. Objections and Qualifications",
    "6. Conclusion and Implications",
    "Methodological Note and Limitations",
    "References",
    "Author Note"
  ]
};

function LibraryHeader() {
  return <header className="vl-header">
    <a className="vl-brand" href="/"> <span>V</span> VANT <small>TECHNOLOGIES</small></a>
    <nav><a href="/">Home</a><a href="/libraries" aria-current="page">Libraries</a><a href="mailto:VANT.CLIENSUPPORT@GMAIL.COM">Contact</a></nav>
  </header>;
}

export default function Libraries() {
  const path = window.location.pathname.replace(/\\/+$/, "") || "/libraries";
  const isArticle = path === "/libraries/beyond-automation";
  useEffect(() => {
    document.title = isArticle
      ? "Beyond Automation — VANT Libraries"
      : "VANT Libraries — Research & Publications";
  }, [isArticle]);

  return <div className="vl-site">
    <LibraryHeader />
    {isArticle ? <main className="vl-main vl-article-page">
      <a className="vl-back" href="/libraries">← Back to VANT Libraries</a>
      <div className="vl-eyebrow">VANT LIBRARIES <span>/</span> RESEARCH &amp; PUBLICATIONS</div>
      <div className="vl-article-topline"><span>PUBLICATION RECORD · {publication.id}</span><span>{publication.edition}</span></div>
      <h1>{publication.title}</h1>
      <p className="vl-subtitle">{publication.subtitle}</p>
      <div className="vl-author-row"><div className="vl-avatar">KU</div><div><strong>{publication.author}</strong><span>{publication.affiliation}</span></div></div>
      <div className="vl-meta-grid">
        <div><small>COLLECTION</small><strong>{publication.category}</strong></div>
        <div><small>DOCUMENT TYPE</small><strong>{publication.type}</strong></div>
        <div><small>EDITION</small><strong>{publication.edition}</strong></div>
      </div>
      <section className="vl-abstract">
        <div className="vl-section-label">ABSTRACT</div>
        {publication.abstract.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </section>
      <section className="vl-contents">
        <div className="vl-section-label">IN THIS ARTICLE</div>
        <ol>{publication.contents.map(item => <li key={item}>{item}</li>)}</ol>
      </section>
      <section className="vl-keywords"><div className="vl-section-label">KEYWORDS</div><div className="vl-tags">{publication.keywords.map(word => <span key={word}>{word}</span>)}</div></section>
      <section className="vl-author-note"><div className="vl-section-label">AUTHOR NOTE</div><p>Karl Aldrich Uy is an independent researcher and the Founder and Chief Technology Officer of VANT Technologies, a technology venture based in the Philippines focused on developing AI-enabled work experiences and tools. His interests lie at the intersection of artificial intelligence, organizational operations, human-computer collaboration, and the changing nature of professional work. His perspective brings together an interest in the practical realities of operational environments and the opportunities created by designing and building technology products. He is particularly interested in how intelligent systems can support better decision-making, improve productivity, and expand access to knowledge while preserving human agency, accountability, and meaningful participation. His writing examines the broader philosophical, social, and organizational implications of technological change, with particular attention to the opportunities and constraints facing developing economies. The views expressed in this article are his own and do not necessarily represent the views of VANT Technologies.</p></section>
      <div className="vl-copyright"><strong>© 2026 Karl Aldrich Uy. All rights reserved.</strong><span>Published by VANT Technologies.</span></div>
      <div className="vl-file-note"><span className="vl-file-icon">PDF</span><div className="vl-file-details"><strong>Full-text PDF edition</strong><p>Read or download the complete 16-page article.</p></div><a className="vl-download-link" href="/documents/beyond-automation-v1.pdf" download="beyond-automation-v1.pdf">Download PDF <span>↓</span></a></div>
    </main> : <main className="vl-main">
      <div className="vl-eyebrow">VANT TECHNOLOGIES <span>/</span> KNOWLEDGE &amp; DOCUMENTATION</div>
      <div className="vl-hero"><div><p className="vl-kicker">THE VANT LIBRARIES</p><h1>Ideas worth<br/><em>keeping.</em></h1></div><p className="vl-hero-copy">A growing collection of research, technical documentation, and perspectives exploring the systems and ideas shaping tomorrow.</p></div>
      <div className="vl-collection-head"><div><span className="vl-section-label">COLLECTION 01</span><h2>Research &amp; Publications</h2></div><span className="vl-count">01 PUBLICATION</span></div>
      <article className="vl-publication-card">
        <div className="vl-card-index">BA-001 <span>·</span> NOV 2026</div>
        <div className="vl-card-body"><div className="vl-card-category">ARTIFICIAL INTELLIGENCE &amp; SOCIETY</div><h3>{publication.title}</h3><p className="vl-card-subtitle">{publication.subtitle}</p><p className="vl-card-abstract">{publication.abstract[0]}</p><div className="vl-card-footer"><div><strong>{publication.author}</strong><span>{publication.type} · Version 1.0</span></div><a href="/libraries/beyond-automation">View publication <span>↗</span></a></div></div>
      </article>
      <div className="vl-library-note"><span>V</span><p>VANT Libraries is an evolving public archive. New research and technical materials will be added as they are prepared for publication.</p></div>
    </main>}
    <footer className="vl-footer"><a href="/">VANT <span>TECHNOLOGIES</span></a><p>© 2026 Karl Aldrich Uy. Article copyright remains with the author. Published by VANT Technologies.</p><a href="/">VANT TECHNOLOGIES ↗</a></footer>
  </div>;
}
