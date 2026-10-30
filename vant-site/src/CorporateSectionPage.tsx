import React from "react";
import VANTDocumentViewer from "./VANTDocumentViewer";
import VANTJamboard from "./VANTJamboard";
import "./corporate.css";

type Item = { title: string; description: string; href: string; eyebrow?: string };
type PageData = { number: string; kicker: string; title: string; lead: string; items: Item[] };

const pages: Record<string, PageData> = {
  "about-us": { number:"04", kicker:"VANT TECHNOLOGIES / ABOUT US", title:"About Us", lead:"The people, purpose, principles, and ideas behind VANT Technologies — from the journey that brought us here to the future we aim to build.", items:[
    {title:"Company Story",description:"Discover who built VANT, our journey from day one, the roadmap ahead, and what we aim to make possible in the future.",href:"/company-story",eyebrow:"OUR JOURNEY"},
    {title:"Company Profile",description:"Get to know VANT Technologies through our company information, mission, vision, commitments, and principles.",href:"/company-profile",eyebrow:"WHO WE ARE"},
    {title:"Business Theory",description:"Explore how ideas move beyond concepts and become functional, useful realities.",href:"/business-theory",eyebrow:"IDEAS INTO REALITY"}
  ]},
  "company-story": { number:"04.1", kicker:"ABOUT US / COMPANY JOURNAL", title:"The VANT Story", lead:"A chapter-by-chapter account of the ideas, setbacks, experiments, and ambitions shaping VANT Technologies. Open an episode in the VANT Document Viewer.", items:[
    {title:"Who built VANT",description:"Meet the founder and the people, skills, and ideas contributing to VANT Technologies.",href:"/connect",eyebrow:"THE PEOPLE"},
    {title:"Our journey from day one",description:"Follow the origins, experiments, decisions, and milestones behind VANT.",href:"/news",eyebrow:"OUR HISTORY"},
    {title:"The roadmap",description:"Explore the direction, priorities, and planned stages of VANT's development.",href:"/libraries",eyebrow:"WHAT'S NEXT"},
    {title:"Our future ambitions",description:"Understand what VANT aims to build and the possibilities we want to help unlock.",href:"/vision",eyebrow:"THE FUTURE"}
  ]},
  "company-profile": { number:"04.2", kicker:"ABOUT US / COMPANY INFORMATION", title:"Company Profile", lead:"An overview of VANT Technologies — the organization, the purpose behind our work, and the commitments and principles intended to guide it.", items:[
    {title:"Company information",description:"An introduction to VANT Technologies, its focus, ecosystem, and areas of work.",href:"/about-us",eyebrow:"OVERVIEW"},
    {title:"Mission & vision",description:"Why we build intelligent technology and the future we want it to help make possible.",href:"/mission",eyebrow:"PURPOSE & DIRECTION"},
    {title:"Our commitments",description:"The responsibilities and standards we aim to uphold as we build and grow.",href:"/our-approach",eyebrow:"RESPONSIBILITY"},
    {title:"Our principles",description:"The values and practical principles that inform our decisions and product experiences.",href:"/our-approach",eyebrow:"HOW WE WORK"}
  ]},
  "business-theory": { number:"04.3", kicker:"ABOUT US / IDEAS INTO REALITY", title:"Business Theory", lead:"Ideas become valuable when they can be tested, built, used, and improved. Explore how VANT thinks about moving concepts into functional real-world solutions.", items:[
    {title:"From idea to problem",description:"Start with a real need, understand who experiences it, and define the outcome worth pursuing.",href:"/libraries",eyebrow:"01 / DISCOVER"},
    {title:"From concept to system",description:"Shape the idea into a workable model, product experience, and technical approach.",href:"/research",eyebrow:"02 / DESIGN"},
    {title:"From system to reality",description:"Build, test, learn from use, and refine the solution based on practical feedback.",href:"/products",eyebrow:"03 / BUILD"}
  ]},
  news: { number:"01", kicker:"VANT TECHNOLOGIES / NEWSROOM", title:"News & updates", lead:"What we're building. What's changing. What's next. Follow product releases, patch notes, company announcements, and milestones across VANT Technologies.", items:[
    {title:"Latest updates",description:"The newest releases, announcements, and developments from across VANT Technologies.",href:"#news-latest",eyebrow:"LATEST"},
    {title:"Patch notes",description:"A clear record of product changes, new features, improvements, and fixes.",href:"#news-patches",eyebrow:"PRODUCT UPDATES"},
    {title:"Company news",description:"Milestones, partnerships, launches, and important updates from the company.",href:"#news-company",eyebrow:"ANNOUNCEMENTS"}
  ]},
  research: { number:"02", kicker:"IDEAS & KNOWLEDGE", title:"Research", lead:"A place for the ideas, learning resources, and technical perspectives informing what we build.", items:[
    {title:"VANT Libraries",description:"A growing collection of product knowledge, learning resources, and company materials.",href:"/libraries",eyebrow:"LIBRARY"},
    {title:"Technology perspectives",description:"Explore the questions and ideas shaping our approach to intelligent technology.",href:"/perspectives",eyebrow:"PERSPECTIVES"}
  ]},
  policy: { number:"03", kicker:"TRUST & RESPONSIBILITY", title:"Policy", lead:"Our policies explain how we approach privacy, responsible use, service terms, and support.", items:[
    {title:"Privacy",description:"How VANT approaches the information entrusted to its services.",href:"/privacy",eyebrow:"PRIVACY"},
    {title:"Terms & policies",description:"The terms that govern access to VANT websites and services.",href:"/terms",eyebrow:"TERMS"},
    {title:"Help & security",description:"Reach the VANT team for assistance and security-related questions.",href:"/connect",eyebrow:"SUPPORT"}
  ]},
  commitments: { number:"04", kicker:"WHAT GUIDES US", title:"Our commitments", lead:"We aim to build technology that expands human possibility with purpose, responsibility, and room for everyone to grow.", items:[
    {title:"Our mission",description:"We build intelligent technology that moves people forward.",href:"/mission",eyebrow:"PURPOSE"},
    {title:"Our vision",description:"A future where technology expands human possibility.",href:"/vision",eyebrow:"DIRECTION"},
    {title:"Responsible technology",description:"Our commitment to thoughtful design and responsible intelligence.",href:"/our-approach",eyebrow:"RESPONSIBILITY"}
  ]},
  company: { number:"05", kicker:"ABOUT VANT TECHNOLOGIES", title:"The company", lead:"VANT Technologies is building a connected ecosystem of intelligent products for work, learning, and everyday progress.", items:[
    {title:"Our mission & vision",description:"The purpose behind VANT and the future we are working toward.",href:"/mission",eyebrow:"PURPOSE"},
    {title:"Partnerships",description:"Connect with us to explore meaningful opportunities and collaborations.",href:"/partnerships",eyebrow:"COLLABORATION"},
    {title:"Contact the team",description:"Start a conversation with VANT Technologies.",href:"/connect",eyebrow:"CONNECT"}
  ]},
  products: { number:"06", kicker:"THE VANT ECOSYSTEM", title:"Products", lead:"Purpose-built experiences designed to support the way people work, learn, and interact with intelligent technology.", items:[
    {title:"VANT AI Work Platform",description:"An AI workspace for thinking, planning, analyzing, and getting work done.",href:"https://vant-ai.vercel.app/",eyebrow:"WORK"},
    {title:"VANT Education",description:"Learning tools for study resources, practice, and progress.",href:"/education",eyebrow:"LEARNING"},
    {title:"MOTE.EXE",description:"A watchful AI companion within the VANT ecosystem.",href:"/mote-exe",eyebrow:"INTELLIGENCE"}
  ]},
  perspectives: { number:"02.1", kicker:"RESEARCH & DEVELOPMENT / ENGINEERING", title:"Engineering what comes next.", lead:"Explore the systems, methods, and architecture behind VANT—from multi-agent orchestration to intelligent products designed around people.", items:[{title:"VANT CoWork architecture",description:"A technical case study on specialized agents, task coordination, persistence, and human-reviewed execution.",href:"/research?document=research-cowork-architecture",eyebrow:"ENGINEERING / 004"},{title:"VANT Research",description:"Explore the wider research domains and technical perspectives behind VANT.",href:"/research",eyebrow:"RESEARCH"}]},
  "our-approach": { number:"03.1", kicker:"POLICY / RESPONSIBILITY", title:"Our approach", lead:"We believe useful technology should be designed thoughtfully, communicate clearly, and respect the people who use it.", items:[{title:"Privacy",description:"Read our privacy policy.",href:"/privacy",eyebrow:"PRIVACY"},{title:"Terms & policies",description:"Review the terms governing our services.",href:"/terms",eyebrow:"TERMS"}]},
  mission: { number:"04.1", kicker:"COMMITMENTS / PURPOSE", title:"Our mission", lead:"We build intelligent technology that moves people forward. We believe AI and thoughtful design can make work more capable, learning more personal, and ambitious ideas more achievable.", items:[{title:"Our vision",description:"The future we are working toward.",href:"/vision",eyebrow:"DIRECTION"},{title:"About VANT",description:"Learn more about the company behind the ecosystem.",href:"/company",eyebrow:"COMPANY"}]},
  vision: { number:"04.2", kicker:"COMMITMENTS / DIRECTION", title:"Our vision", lead:"A future where technology expands human possibility — with purpose, responsibility, and room for everyone to grow.", items:[{title:"Our mission",description:"The purpose that guides what we build.",href:"/mission",eyebrow:"PURPOSE"},{title:"Our approach",description:"How we think about responsible technology.",href:"/our-approach",eyebrow:"RESPONSIBILITY"}]},
  partnerships: { number:"05.1", kicker:"COMPANY / COLLABORATION", title:"Partnerships", lead:"We welcome conversations with people and organizations who share an interest in building useful, thoughtful technology.", items:[{title:"Connect with VANT",description:"Tell us about your organization, idea, or potential collaboration.",href:"/connect",eyebrow:"START A CONVERSATION"}]},
  education: { number:"06.1", kicker:"PRODUCTS / LEARNING", title:"VANT Education", lead:"Learning tools designed to turn notes into study resources, support practice, and help learners plan their progress.", items:[{title:"Talk to our team",description:"Get in touch for product information and early access updates.",href:"/connect",eyebrow:"GET IN TOUCH"}]}
};


type NewsStory = { category: string; title: string; summary: string; body: string[]; library: string; icon: string };
const newsStories: Record<string, NewsStory> = {
  "news-vant-ecosystem": { category:"COMPANY / FEATURE", title:"Building an ecosystem for work and learning", summary:"An introduction to VANT's connected approach to intelligent products, work, and education.", body:["VANT Technologies is building a connected ecosystem of intelligent products for work, learning, and everyday progress.","The ecosystem brings together the VANT AI Work Platform, VANT Education, and MOTE.EXE—each with a distinct role in helping people think, create, organize, and learn.","This story is part of our company overview and will evolve as the ecosystem develops."], library:"VANT Technologies", icon:"⌘" },
  "news-vant-education": { category:"PRODUCT / SPOTLIGHT", title:"Making learning more personal with VANT Education", summary:"A look at the study tools being developed to help learners turn notes into structured resources.", body:["VANT Education is designed to help learners work with their study materials in more useful ways.","Its planned toolset includes notes summarization, study-guide generation, flashcards, practice quizzes, study planning, and assignment tracking.","The aim is to make learning more structured and personal, while keeping the learner in control of their progress."], library:"VANT Education", icon:"✳" },
  "news-mote-exe": { category:"PRODUCT / SPOTLIGHT", title:"Meet MOTE.EXE, a watchful presence in the VANT ecosystem", summary:"Discover the role and identity of VANT's guardian assistant concept.", body:["MOTE.EXE is the guardian and assistant identity within the VANT ecosystem.","Designed with a serious, watchful presence, MOTE represents a focused interface between people and intelligent workflows.","Its identity and experiences will continue to develop alongside the products it supports."], library:"VANT Technologies", icon:"◉" }
};

export default function CorporateSectionPage({ slug }: { slug: string }) {
  const story = newsStories[slug];
  const data = pages[slug];
  if (story) return <VANTJamboard><VANTDocumentViewer><div className="vt-section-page vt-news-story-page">
    <header className="vt-section-page-header"><a className="vt-section-page-brand" href="/"><span className="vt-section-page-mark">V</span><span>VANT <small>TECHNOLOGIES</small></span></a><a className="vt-section-page-home" href="/news">← Back to news</a></header>
    <main className="vt-section-page-main vt-news-story-main">
      <div className="vt-section-page-kicker">NEWSROOM / {story.category}</div>
      <div className="vt-news-story-icon" aria-hidden="true">{story.icon}</div>
      <h1>{story.title}</h1><p className="vt-section-page-lead">{story.summary}</p>
      <div className="vt-news-story-meta"><span>VANT TECHNOLOGIES</span><span>EDITORIAL</span></div>
      <article className="vt-news-story-body">{story.body.map((paragraph,i)=><p key={i}>{paragraph}</p>)}</article>
      <a className="vt-news-library-link" href={story.library === "VANT Education" ? "/libraries#vant-education" : "/libraries#vant-technologies"}>Explore related resources in VANT Libraries <span>↗</span></a>
      {slug === "news" ? <section className="vt-news-patches" id="news-patches"><div className="vt-news-section-heading"><span>03 / PRODUCT CHANGELOG</span><span>RELEASE NOTES</span></div><h2>Patch notes</h2><p>Versioned records of product changes, new features, improvements, and fixes.</p><div className="vt-news-empty">No public patch notes have been published yet.</div><a className="vt-news-patch-open" href="/news?document=patch-notes" data-vant-document-id="patch-notes">Open patch notes <span>↗</span></a></section> : null}
    </main>
    <footer className="vt-section-page-footer"><span>© {new Date().getFullYear()} VANT TECHNOLOGIES</span><a href="/news">More news ↗</a></footer>
  </div></VANTDocumentViewer></VANTJamboard>;
  if (!data) return null;
  return <VANTJamboard><VANTDocumentViewer><div className="vt-section-page">
    <header className="vt-section-page-header">
      <a className="vt-section-page-brand" href="/"><span className="vt-section-page-mark">V</span><span>VANT <small>TECHNOLOGIES</small></span></a>
      <a className="vt-section-page-home" href="/">Back to homepage ↗</a>
    </header>
    <main className="vt-section-page-main">
      <div className="vt-section-page-kicker">{data.number} / {data.kicker}</div>
      <h1>{data.title}</h1>
      <p className="vt-section-page-lead">{data.lead}</p>
      <div className="vt-section-page-rule" />
      {slug === "company-profile" ? <div className="vt-company-profile">
        <section className="vt-profile-overview">
          <div className="vt-profile-section-label"><span>01 / COMPANY OVERVIEW</span><span>VANT TECHNOLOGIES</span></div>
          <div className="vt-profile-overview-grid">
            <div><h2>Intelligent technology, built to move people forward.</h2></div>
            <div><p>VANT Technologies is building an AI work platform and a connected ecosystem of experiences for work, learning, and exploration.</p><p>Our focus is on making intelligent technology useful in everyday contexts — helping people work with information, organize their efforts, develop ideas, and make learning more accessible.</p><p>We are an evolving technology company. Our products, research, and long-term ambitions will continue to develop as we learn, build, and grow.</p></div>
          </div>
        </section>
        <section className="vt-profile-purpose">
          <div className="vt-profile-section-label"><span>02 / PURPOSE & DIRECTION</span><span>MISSION · VISION</span></div>
          <div className="vt-profile-purpose-grid">
            <article><small>OUR MISSION</small><h2>We build intelligent technology that moves people forward.</h2><p>We believe AI and thoughtful design can make work more capable, learning more personal, and ambitious ideas more achievable.</p></article>
            <article><small>OUR VISION</small><h2>A future where technology expands human possibility.</h2><p>With purpose, responsibility, and room for everyone to grow.</p></article>
          </div>
        </section>
        <section className="vt-profile-ecosystem">
          <div className="vt-profile-section-label"><span>03 / THE VANT ECOSYSTEM</span><span>CONNECTED EXPERIENCES</span></div>
          <h2>Different experiences. A shared direction.</h2>
          <p className="vt-profile-section-lead">The VANT ecosystem brings together products and knowledge initiatives designed around different needs.</p>
          <div className="vt-profile-product-grid">
            <a href="https://vant-ai.vercel.app/"><span>01 / WORK</span><h3>VANT AI Work Platform</h3><p>An AI workspace designed to help people think through tasks, work with information, organize projects, and get everyday work done.</p><b>Explore platform ↗</b></a>
            <a href="/education"><span>02 / LEARNING</span><h3>VANT Education</h3><p>Learning-focused tools designed to help students turn notes into study resources, practice, and plan their progress.</p><b>Explore education ↗</b></a>
            <a href="/mote-exe"><span>03 / INTELLIGENCE</span><h3>MOTE.EXE</h3><p>An AI identity within the VANT ecosystem, representing a focused and watchful interface for intelligent experiences.</p><b>Meet MOTE ↗</b></a>
            <a href="/libraries"><span>04 / KNOWLEDGE</span><h3>VANT Libraries & Research</h3><p>A knowledge space for product resources, learning materials, company information, and developing research perspectives.</p><b>Explore libraries ↗</b></a>
          </div>
        </section>
        <section className="vt-profile-commitments">
          <div className="vt-profile-section-label"><span>04 / OUR COMMITMENTS</span><span>WHAT WE AIM TO UPHOLD</span></div>
          <h2>Build with purpose. Communicate with clarity. Keep people in the picture.</h2>
          <div className="vt-profile-commitment-grid">
            <article><b>01</b><h3>Human possibility</h3><p>We aim to create technology that helps people develop their capabilities and move their ideas forward.</p></article>
            <article><b>02</b><h3>Thoughtful responsibility</h3><p>We aim to consider the impact of what we build and approach intelligent technology with care.</p></article>
            <article><b>03</b><h3>Useful by design</h3><p>We aim to make our products understandable, practical, and grounded in real needs.</p></article>
            <article><b>04</b><h3>Open to learning</h3><p>We aim to keep questioning, researching, improving, and learning from the people who use our work.</p></article>
          </div>
        </section>
        <section className="vt-profile-principles">
          <div className="vt-profile-section-label"><span>05 / OUR PRINCIPLES</span><span>HOW WE APPROACH THE WORK</span></div>
          <div className="vt-profile-principles-grid">
            <h2>Principles that guide the way we build.</h2>
            <ul><li><b>Start with the problem.</b> Understand the need before choosing the technology.</li><li><b>Keep people in control.</b> Design experiences that support human judgment and direction.</li><li><b>Make complexity clearer.</b> Use thoughtful design to make powerful tools easier to understand.</li><li><b>Build, test, and improve.</b> Treat progress as an ongoing process of learning and refinement.</li><li><b>Be honest about the work.</b> Communicate capabilities, limitations, and future ambitions clearly.</li></ul>
          </div>
        </section>
        <section className="vt-profile-closing"><span>VANT TECHNOLOGIES</span><h2>We build intelligent technology that moves people forward.</h2><a href="/company-story">Read our Company Story ↗</a></section>
      </div> :       {slug === "company-story" ? <section className="vt-story-episodes">
        <div className="vt-story-episodes-heading"><div><span>THE COMPANY JOURNAL</span><h2>Every journey has a beginning.</h2><p>Read the story one chapter at a time. Each published episode opens in VANT Document Viewer.</p></div><small>VANT JOURNAL / VOL. 01</small></div>
        <div className="vt-story-episode-grid">
          <a className="vt-story-episode-card vt-story-episode-featured" href="/company-story?document=company-story-inception" data-vant-document-id="company-story-inception">
            <div className="vt-story-episode-card-top"><span>CHAPTER 01</span><i>INCEPTION</i></div>
            <div className="vt-story-episode-art"><span>V</span><i>01</i><b>THE BEGINNING</b></div>
            <div className="vt-story-episode-copy"><small>THE FOUNDER'S JOURNEY</small><h2>From Searching for Direction to Building What Comes Next.</h2><p>A small experiment, an unfamiliar world of software development, and the determination to build something that could help people.</p><strong>READ CHAPTER <i>↗</i></strong></div>
          </a>
          <div className="vt-story-episode-card vt-story-episode-upcoming">
            <div className="vt-story-episode-card-top"><span>CHAPTER 02</span><i>COMING NEXT</i></div>
            <div className="vt-story-episode-art"><span>02</span><b>THE NEXT CHAPTER</b></div>
            <div className="vt-story-episode-copy"><small>THE STORY CONTINUES</small><h2>What happens after the beginning?</h2><p>The next episode will continue the journey as VANT grows, changes, and takes shape.</p><strong>NOT YET PUBLISHED</strong></div>
          </div>
          <div className="vt-story-episode-card vt-story-episode-upcoming">
            <div className="vt-story-episode-card-top"><span>CHAPTER 03</span><i>COMING SOON</i></div>
            <div className="vt-story-episode-art"><span>03</span><b>BUILDING WHAT COMES NEXT</b></div>
            <div className="vt-story-episode-copy"><small>THE VANT JOURNEY</small><h2>A vision still being built.</h2><p>Future chapters will document the people, products, lessons, and ambitions ahead.</p><strong>NOT YET PUBLISHED</strong></div>
          </div>
        </div>
        <div className="vt-story-episodes-foot"><span>ONE JOURNEY. MANY CHAPTERS.</span><span>VANT TECHNOLOGIES · COMPANY JOURNAL</span></div>
      </section> : (slug === "research" || slug === "perspectives") ? <div className="vt-research-hub">
        <section className="vt-research-intro">
          <div className="vt-news-section-heading"><span>01 / RESEARCH & DEVELOPMENT</span><span>INTELLIGENCE · SYSTEMS · ENGINEERING</span></div>
          <div className="vt-research-hero-grid">
            <div className="vt-research-hero-copy"><span className="vt-research-overline">VANT RESEARCH DIVISION <i> / EST. 2026</i></span><h2>Engineering what comes next.</h2><p>Exploring the systems, methods, and ideas shaping intelligent technology. From human-centered AI to applied engineering, this is where we examine the principles behind what we build.</p><div className="vt-research-hero-index"><span>RESEARCH AREAS <b>03</b></span><span>KNOWLEDGE BASE <b>V.01</b></span></div></div>
            <div className="vt-research-blueprint" aria-label="Abstract engineering schematic">
              <div className="vt-blueprint-top"><span>VNT / SYS-001</span><span>FIG. 01 — SYSTEM MAP</span></div>
              <svg viewBox="0 0 420 300" role="img" aria-label="Abstract connected systems schematic"><defs><pattern id="vtResearchGrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(196,210,224,.13)" strokeWidth="1"/></pattern></defs><rect width="420" height="300" fill="url(#vtResearchGrid)"/><g fill="none" stroke="#aebdca" strokeWidth="1.2"><circle cx="210" cy="145" r="66"/><circle cx="210" cy="145" r="48" strokeDasharray="4 5"/><path d="M210 24V79 M210 211V276 M70 145H144 M276 145H350 M111 46L164 99 M256 191L309 244 M309 46L256 99 M164 191L111 244"/><rect x="181" y="116" width="58" height="58"/><path d="M190 145h40M210 126v38M70 145h28m252 0h-28M210 24v18m0 216v18"/></g><g fill="#d7e0e8" fontSize="9" fontFamily="monospace" letterSpacing="1"><text x="210" y="12" textAnchor="middle">INPUT</text><text x="210" y="294" textAnchor="middle">OUTPUT</text><text x="18" y="149">DATA</text><text x="354" y="149">MODEL</text><text x="210" y="151" textAnchor="middle" fontSize="11">VANT</text><text x="20" y="282">FIG 001-A</text><text x="340" y="282">NTS / 01</text></g></svg>
              <div className="vt-blueprint-bottom"><span>CONCEPTUAL SYSTEMS DIAGRAM</span><span>NOT TO SCALE</span></div>
            </div>
          </div>
        </section>
        <section className="vt-research-themes">
          <div className="vt-news-section-heading"><span>02 / RESEARCH DOMAINS</span><span>TECHNICAL NOTES · CONCEPTS</span></div>
          <div className="vt-research-grid">
            <a className="vt-research-card" href="/research?document=research-human-capability" data-vant-document-id="research-human-capability"><span className="vt-research-card-index">R&D / 001</span><span className="vt-research-symbol">⌘</span><small>COMPUTATIONAL SYSTEMS</small><h3>AI and human capability</h3><p>How intelligent tools can extend human ability while keeping people at the center of decisions.</p><b>Open research note <i>↗</i></b></a>
            <a className="vt-research-card" href="/research?document=research-thoughtful-design" data-vant-document-id="research-thoughtful-design"><span className="vt-research-card-index">R&D / 002</span><span className="vt-research-symbol">◇</span><small>HUMAN FACTORS ENGINEERING</small><h3>Thoughtful technology by design</h3><p>Why clarity, usefulness, and responsibility should shape intelligent product experiences.</p><b>Read perspective <i>↗</i></b></a>
            <a className="vt-research-card" href="/research?document=research-future-learning" data-vant-document-id="research-future-learning"><span className="vt-research-card-index">R&D / 003</span><span className="vt-research-symbol">⌁</span><small>ADAPTIVE SYSTEMS</small><h3>The future of work and learning</h3><p>Exploring how adaptable AI experiences can support different goals and ways of learning.</p><b>Read perspective <i>↗</i></b></a>
            <a className="vt-research-card vt-research-card-featured" href="/research?document=research-cowork-architecture" data-vant-document-id="research-cowork-architecture"><span className="vt-research-card-index">ENGINEERING / 004</span><span className="vt-research-symbol">⎇</span><small>MULTI-AGENT ORCHESTRATION</small><h3>Inside VANT CoWork</h3><p>Explore the architecture behind specialized agents, task coordination, persistent profiles, and human-reviewed execution.</p><b>Explore system architecture <i>↗</i></b></a>
            <a className="vt-research-card vt-research-card-featured vt-research-card-jam" href="/research?jamboard=vant-semantic-architecture" data-vant-jamboard-id="vant-semantic-architecture"><span className="vt-research-card-index">SYSTEMS / 001 · JAMBOARD</span><span className="vt-research-symbol">◎</span><small>SHARED INTELLIGENCE LAYER</small><h3>VANT Semantic Architecture</h3><p>Explore the proposed central intelligence layer connecting context, reasoning, memory, orchestration, capabilities, and interfaces.</p><b>Open in VANT / Jamboard <i>↗</i></b></a>
            <a className="vt-research-card vt-research-card-jam" href="/research?jamboard=vant-cowork-architecture" data-vant-jamboard-id="vant-cowork-architecture"><span className="vt-research-card-index">SYSTEMS / 002 · JAMBOARD</span><span className="vt-research-symbol">⎇</span><small>MULTI-AGENT WORKFLOW</small><h3>CoWork orchestration map</h3><p>Inspect the conceptual flow from task planning through specialist agents, integration, and human review.</p><b>Open in VANT / Jamboard <i>↗</i></b></a>
          </div>
          <p className="vt-research-disclaimer">These are VANT editorial perspectives and developing research themes, not peer-reviewed studies or published scientific findings.</p>
        </section>
        <section className="vt-research-library">
          <div><span className="vt-research-library-kicker">03 / KNOWLEDGE COLLECTION</span><h2>Continue exploring.</h2><p>Find product knowledge, learning resources, company materials, and future research publications in VANT Libraries.</p></div>
          <a href="/libraries?document=library-research" data-vant-document-id="library-research">Open VANT Research collection <span>↗</span></a>
        </section>
      </div> : slug === "news" ? <div className="vt-newsroom">
        <section className="vt-news-feature" id="news-latest">
          <div className="vt-news-section-heading"><span>01 / THE NEWSROOM</span><span>STORIES & ANNOUNCEMENTS</span></div>
          <h2>Latest updates</h2><p>Stories, product spotlights, and developments from across the VANT ecosystem.</p>
          <div className="vt-news-story-grid">{Object.entries(newsStories).map(([storySlug, item])=><a className="vt-news-story-card" href={"/news?document=" + storySlug} data-vant-document-id={storySlug} key={storySlug}><span className="vt-news-story-card-icon">{item.icon}</span><span className="vt-news-story-card-category">{item.category}</span><h3>{item.title}</h3><p>{item.summary}</p><b>Read story <i>↗</i></b><small>RELATED LIBRARY · {item.library}</small></a>)}</div>
        </section>
        <section className="vt-news-section" id="news-company"><div className="vt-news-section-heading"><span>02 / COMPANY JOURNAL</span><span>VANT TECHNOLOGIES</span></div><h2>Company news</h2><p>Milestones, partnerships, launches, and news about the people and ideas behind VANT.</p><a className="vt-news-library-link" href="/libraries#vant-technologies">Explore the VANT Technologies collection in Libraries <span>↗</span></a></section>
      </div> : <div className="vt-section-page-grid">
        {data.items.map((item) => <a className="vt-section-page-card" href={item.href} key={item.title}>
          <span>{item.eyebrow}</span><h2>{item.title}</h2><p>{item.description}</p><b>Explore <i>↗</i></b>
        </a>)}
      </div>}
      {slug === "news" ? <section className="vt-news-patches" id="news-patches"><div className="vt-news-section-heading"><span>03 / PRODUCT CHANGELOG</span><span>RELEASE NOTES</span></div><h2>Patch notes</h2><p>Versioned records of product changes, new features, improvements, and fixes.</p><div className="vt-news-empty">No public patch notes have been published yet.</div><a className="vt-news-patch-open" href="/news?document=patch-notes" data-vant-document-id="patch-notes">Open patch notes <span>↗</span></a></section> : null}
    </main>
    <footer className="vt-section-page-footer"><span>© {new Date().getFullYear()} VANT TECHNOLOGIES</span><a href="/connect">Connect with VANT ↗</a></footer>
  </div></VANTDocumentViewer></VANTJamboard>;
}
