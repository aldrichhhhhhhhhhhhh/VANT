import React from "react";
import "./corporate.css";

type Item = { title: string; description: string; href: string; eyebrow?: string };
type PageData = { number: string; kicker: string; title: string; lead: string; items: Item[] };

const pages: Record<string, PageData> = {
  news: { number:"01", kicker:"LATEST FROM VANT", title:"News & updates", lead:"Announcements, product updates, and important developments from VANT Technologies.", items:[
    {title:"VANT Libraries",description:"Explore knowledge, resources, and research from across the VANT ecosystem.",href:"/libraries",eyebrow:"KNOWLEDGE"},
    {title:"Technology perspectives",description:"Ideas and perspectives on useful, responsible intelligent technology.",href:"/perspectives",eyebrow:"PERSPECTIVES"}
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

export default function CorporateSectionPage({ slug }: { slug: string }) {
  const data = pages[slug];
  if (!data) return null;
  return <div className="vt-section-page">
    <header className="vt-section-page-header">
      <a className="vt-section-page-brand" href="/"><span className="vt-section-page-mark">V</span><span>VANT <small>TECHNOLOGIES</small></span></a>
      <a className="vt-section-page-home" href="/">Back to homepage ↗</a>
    </header>
    <main className="vt-section-page-main">
      <div className="vt-section-page-kicker">{data.number} / {data.kicker}</div>
      <h1>{data.title}</h1>
      <p className="vt-section-page-lead">{data.lead}</p>
      <div className="vt-section-page-rule" />
      <div className="vt-section-page-grid">
        {data.items.map((item) => <a className="vt-section-page-card" href={item.href} key={item.title}>
          <span>{item.eyebrow}</span><h2>{item.title}</h2><p>{item.description}</p><b>Explore <i>↗</i></b>
        </a>)}
      </div>
    </main>
    <footer className="vt-section-page-footer"><span>© {new Date().getFullYear()} VANT TECHNOLOGIES</span><a href="/connect">Connect with VANT ↗</a></footer>
  </div>;
}
