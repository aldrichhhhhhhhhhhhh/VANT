import React from "react";
import VANTDocumentViewer from "./VANTDocumentViewer";
import "./corporate.css";

type Item = { title: string; description: string; href: string; eyebrow?: string };
type PageData = { number: string; kicker: string; title: string; lead: string; items: Item[] };

const pages: Record<string, PageData> = {
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
  perspectives: { number:"02.1", kicker:"RESEARCH / PERSPECTIVES", title:"Technology perspectives", lead:"A developing space for VANT's thinking on intelligent technology, thoughtful design, and the future of work and learning.", items:[{title:"Explore VANT Libraries",description:"Browse the knowledge and resources currently available.",href:"/libraries",eyebrow:"EXPLORE"}]},
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
  if (story) return <VANTDocumentViewer><div className="vt-section-page vt-news-story-page">
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
  </div></VANTDocumentViewer>;
  if (!data) return null;
  return <VANTDocumentViewer><div className="vt-section-page">
    <header className="vt-section-page-header">
      <a className="vt-section-page-brand" href="/"><span className="vt-section-page-mark">V</span><span>VANT <small>TECHNOLOGIES</small></span></a>
      <a className="vt-section-page-home" href="/">Back to homepage ↗</a>
    </header>
    <main className="vt-section-page-main">
      <div className="vt-section-page-kicker">{data.number} / {data.kicker}</div>
      <h1>{data.title}</h1>
      <p className="vt-section-page-lead">{data.lead}</p>
      <div className="vt-section-page-rule" />
      {slug === "news" ? <div className="vt-newsroom">
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
  </div></VANTDocumentViewer>;
}
