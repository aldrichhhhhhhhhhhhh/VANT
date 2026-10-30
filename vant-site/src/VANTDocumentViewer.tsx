import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

type ViewerDocument = { kind:string; title:string; summary:string; date:string; body:string[]; relatedHref:string; relatedLabel:string };
const documents: Record<string,ViewerDocument> = {
  "news-vant-ecosystem": {kind:"COMPANY / FEATURE",title:"Building an ecosystem for work and learning",summary:"An introduction to VANT's connected approach to intelligent products, work, and education.",date:"VANT TECHNOLOGIES · NEWSROOM",body:["VANT Technologies is building a connected ecosystem of intelligent products for work, learning, and everyday progress.","The ecosystem brings together the VANT AI Work Platform, VANT Education, and MOTE.EXE—each with a distinct role in helping people think, create, organize, and learn.","This story is part of our company overview and will evolve as the ecosystem develops."],relatedHref:"/libraries#vant-technologies",relatedLabel:"VANT Technologies collection"},
  "news-vant-education": {kind:"PRODUCT / SPOTLIGHT",title:"Making learning more personal with VANT Education",summary:"A look at the study tools being developed to help learners turn notes into structured resources.",date:"VANT TECHNOLOGIES · NEWSROOM",body:["VANT Education is designed to help learners work with their study materials in more useful ways.","Its planned toolset includes notes summarization, study-guide generation, flashcards, practice quizzes, study planning, and assignment tracking.","The aim is to make learning more structured and personal, while keeping the learner in control of their progress."],relatedHref:"/libraries#vant-education",relatedLabel:"VANT Education collection"},
  "news-mote-exe": {kind:"PRODUCT / SPOTLIGHT",title:"Meet MOTE.EXE, a watchful presence in the VANT ecosystem",summary:"Discover the role and identity of VANT's guardian assistant concept.",date:"VANT TECHNOLOGIES · NEWSROOM",body:["MOTE.EXE is the guardian and assistant identity within the VANT ecosystem.","Designed with a serious, watchful presence, MOTE represents a focused interface between people and intelligent workflows.","Its identity and experiences will continue to develop alongside the products it supports."],relatedHref:"/libraries#vant-technologies",relatedLabel:"VANT Technologies collection"},
  "patch-notes": {kind:"PRODUCT CHANGELOG",title:"VANT patch notes",summary:"A versioned record of product releases, improvements, and fixes across the VANT ecosystem.",date:"VANT TECHNOLOGIES · RELEASE NOTES",body:["Patch notes will document meaningful product changes in a consistent format.","Each published release will include a version number, release date, affected product, and clearly grouped additions, improvements, and fixes.","There are no public release entries published in this section yet. This space will be updated as releases are announced."],relatedHref:"/libraries#vant-knowledge",relatedLabel:"VANT Knowledge collection"},
  "library-knowledge": {kind:"VANT LIBRARIES / COLLECTION",title:"VANT Knowledge",summary:"Product guides, practical documentation, and resources to help people get more from VANT.",date:"VANT LIBRARIES",body:["The VANT Knowledge collection is intended to bring together practical product documentation and guidance.","As resources are published, this collection will become a central place to understand VANT products, features, and workflows."],relatedHref:"/news",relatedLabel:"Visit the VANT Newsroom"},
  "library-education": {kind:"VANT LIBRARIES / COLLECTION",title:"VANT Education",summary:"Study resources, learning guides, and tools designed to make knowledge easier to work with.",date:"VANT LIBRARIES",body:["The VANT Education collection will gather learning materials, study guides, and resources connected to VANT Education.","New resources will appear here as they are prepared for publication."],relatedHref:"/news?document=news-vant-education",relatedLabel:"Read the VANT Education story"},
  "library-company": {kind:"VANT LIBRARIES / COLLECTION",title:"VANT Technologies",summary:"Company updates, product announcements, release notes, and the thinking behind our work.",date:"VANT LIBRARIES",body:["The VANT Technologies collection connects company information with newsroom updates and product announcements.","Stories and release notes are cross-linked so readers can move between announcements and the resources that provide more context."],relatedHref:"/news",relatedLabel:"Visit the VANT Newsroom"},
  "library-research": {kind:"VANT LIBRARIES / COLLECTION",title:"VANT Research",summary:"Perspectives on AI, emerging technology, and the ideas shaping tomorrow's experiences.",date:"VANT LIBRARIES",body:["The VANT Research collection is intended for perspectives and research on intelligent technology, thoughtful design, and the future of work and learning.","Research resources will be added as they are ready to share."],relatedHref:"/research",relatedLabel:"Explore VANT Research"}
};

export default function VANTDocumentViewer({children}:{children:ReactNode}) {
  const [activeId,setActiveId]=useState<string|null>(()=>new URLSearchParams(window.location.search).get("document"));
  const active=activeId ? documents[activeId] : undefined;
  useEffect(()=>{
    const onPop=()=>setActiveId(new URLSearchParams(window.location.search).get("document"));
    window.addEventListener("popstate",onPop);
    return ()=>window.removeEventListener("popstate",onPop);
  },[]);
  useEffect(()=>{
    if(!active)return;
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape")close();};
    window.addEventListener("keydown",onKey);
    return ()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",onKey);};
  },[activeId]);
  const open=(id:string)=>{const url=new URL(window.location.href);url.searchParams.set("document",id);window.history.pushState({vantDocument:id},"",url);setActiveId(id);};
  const close=()=>{const url=new URL(window.location.href);url.searchParams.delete("document");window.history.replaceState({}, "", url);setActiveId(null);};
  const handleClick=(event:MouseEvent<HTMLDivElement>)=>{
    const target=event.target as HTMLElement;
    const trigger=target.closest<HTMLElement>("[data-vant-document-id]");
    const id=trigger?.dataset.vantDocumentId;
    if(id && documents[id]){event.preventDefault();open(id);}
  };
  return <div className="vt-document-system" onClick={handleClick}>{children}{active ? <div className="vt-document-backdrop" onMouseDown={(event)=>{if(event.target===event.currentTarget)close();}}>
    <section className="vt-document-window" role="dialog" aria-modal="true" aria-labelledby="vt-document-title">
      <header className="vt-document-toolbar"><div className="vt-document-brand">VANT <span>/ DOCUMENT VIEWER</span></div><span className="vt-document-preview">PREVIEW</span></header>
      <div className="vt-document-paper">
        <div className="vt-document-paper-top"><span>{active.kind} · 01</span><button type="button" className="vt-document-close" onClick={close} aria-label="Close document">×</button></div>
        <h2 id="vt-document-title">{active.title}</h2>
        <div className="vt-document-byline">{active.date}</div>
        <div className="vt-document-rule" />
        <p className="vt-document-summary">{active.summary}</p>
        <section className="vt-document-content"><div className="vt-document-content-label">DOCUMENT CONTENT</div>{active.body.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</section>
        <a className="vt-document-related" href={active.relatedHref}><span>RELATED RESOURCE · {active.relatedLabel}</span><b>↗</b></a>
      </div>
    </section>
  </div> : null}</div>;
}
