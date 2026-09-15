import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
];

const FEATURES = [
  {
    tag: "AI Chat",
    headline: "Ask anything.\nGet it done.",
    body: "VANT's AI Chat is your always-on work partner. Analyze spreadsheets, summarize reports, review emails, research topics — just describe the work and VANT handles it.",
    accent: "#7c3aed",
    accentLight: "#a78bfa",
    mockType: "chat",
  },
  {
    tag: "Dashboard",
    headline: "Every signal.\nOne surface.",
    body: "An executive command center that surfaces what needs your attention — KPIs, meetings, tasks, AI activity, and live operational insights — all before your first coffee.",
    accent: "#0891b2",
    accentLight: "#67e8f9",
    mockType: "dashboard",
  },
  {
    tag: "Cowork",
    headline: "Give VANT\nthe work.",
    body: "Delegate entire workflows. VANT runs tasks in parallel, checks permissions, takes action, and reports back. You stay in the loop without staying in the weeds.",
    accent: "#059669",
    accentLight: "#6ee7b7",
    mockType: "cowork",
  },
  {
    tag: "Integrations",
    headline: "Connected to\nhow you work.",
    body: "Google Drive, Gmail, Calendar, Docs, Sheets. OneDrive, Excel, Outlook, Teams. Slack, Notion, Salesforce, HubSpot. One AI across every tool you already use.",
    accent: "#d97706",
    accentLight: "#fcd34d",
    mockType: "integrations",
  },
];

const INTEGRATIONS = [
  { name: "Google Drive", icon: "G", color: "#4285F4" },
  { name: "Gmail", icon: "M", color: "#EA4335" },
  { name: "Calendar", icon: "C", color: "#0F9D58" },
  { name: "Sheets", icon: "S", color: "#0F9D58" },
  { name: "OneDrive", icon: "O", color: "#0078D4" },
  { name: "Excel", icon: "X", color: "#217346" },
  { name: "Outlook", icon: "O", color: "#0078D4" },
  { name: "Teams", icon: "T", color: "#5558AF" },
  { name: "Slack", icon: "S", color: "#E01E5A" },
  { name: "Notion", icon: "N", color: "#ffffff" },
  { name: "Salesforce", icon: "S", color: "#00A1E0" },
  { name: "HubSpot", icon: "H", color: "#FF7A59" },
];

const PLANS = [
  {
    name: "Personal",
    price: "$0",
    period: "forever",
    desc: "For individuals exploring AI-powered work.",
    features: ["AI Chat — 50 messages/day", "Cowork — 5 tasks/day", "2 integrations", "Community support"],
    cta: "Start free",
    highlight: false,
    action: "waitlist" as const,
  },
  {
    name: "Pro",
    price: "$18",
    period: "per month",
    desc: "For professionals who need AI working full-time.",
    features: ["Unlimited AI Chat", "Unlimited Cowork tasks", "All integrations", "Dashboard & analytics", "Priority support"],
    cta: "Get early access",
    highlight: true,
    action: "waitlist" as const,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "per seat",
    desc: "For teams and organizations at scale.",
    features: ["Everything in Pro", "SSO & advanced security", "Custom permissions & approvals", "Dedicated workspace", "SLA & onboarding"],
    cta: "Contact sales",
    highlight: false,
    action: "contact" as const,
  },
];

// ---------------------------------------------------------------------------
// Data layer
//
// This site has no backend. Signups and contact requests are validated and
// stored in the visitor's own browser (localStorage), so the UI is fully
// functional to interact with, but entries won't land anywhere you can see
// centrally until you connect a real endpoint.
//
// To actually collect these across all visitors, set WAITLIST_ENDPOINT /
// CONTACT_ENDPOINT below to a form-backend URL (e.g. a free Formspree
// endpoint, a Google Sheet via a small Apps Script, or your own API route)
// that accepts a POST with a JSON body. When set, submissions POST there
// instead of only saving locally.
// ---------------------------------------------------------------------------
const WAITLIST_ENDPOINT = "https://formspree.io/f/xeaqydzd";
const CONTACT_ENDPOINT = "";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function readList<T>(key: string): T[] {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function appendToList<T>(key: string, entry: T) {
  try {
    const current = readList<T>(key);
    window.localStorage.setItem(key, JSON.stringify([...current, entry]));
  } catch {
    // Storage unavailable (private browsing, quota, etc.) — fail silently,
    // the UI still confirms success to the visitor.
  }
}

async function submitEntry(endpoint: string, payload: Record<string, unknown>): Promise<boolean> {
  if (!endpoint) return true;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function ChatMock() {
  const messages = [
    { from: "user", text: "Summarize the Q3 operations report and flag anything critical." },
    { from: "ai", text: "Analyzing your Q3 report across 847 pages…", status: "done" },
    { from: "ai", text: "Found 3 critical items: throughput down 12%, 2 compliance flags in Section 4, budget variance of $214K in logistics.", highlight: true },
    { from: "user", text: "Draft a response email to the logistics team." },
    { from: "ai", text: "Drafting email to logistics@company.com with proposed corrective actions…", status: "typing" },
  ];

  return (
    <div className="flex flex-col gap-3 p-4 h-full">
      <div className="flex items-center gap-2 mb-2 pb-3 border-b border-white/10">
        <div className="w-7 h-7 rounded-full bg-violet-500/20 flex items-center justify-center">
          <span className="text-violet-300 text-xs font-mono">V</span>
        </div>
        <span className="text-white/70 text-xs font-medium">VANT · AI Chat</span>
        <span className="ml-auto text-emerald-400 text-[10px] font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
          Active
        </span>
      </div>
      {messages.map((msg, i) => (
        <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
          {msg.from === "ai" && (
            <div className={`max-w-[85%] rounded-xl px-3 py-2 text-[11px] leading-relaxed ${
              msg.highlight
                ? "bg-violet-500/15 border border-violet-500/30 text-violet-100"
                : "bg-white/6 text-white/70"
            }`}>
              {msg.text}
              {msg.status === "typing" && (
                <span className="inline-flex gap-0.5 ml-2 align-middle">
                  {[0,1,2].map(j => (
                    <span key={j} className="w-1 h-1 bg-violet-400 rounded-full"
                      style={{ animation: `blink 1s ${j*0.2}s step-end infinite` }} />
                  ))}
                </span>
              )}
            </div>
          )}
          {msg.from === "user" && (
            <div className="max-w-[85%] bg-white/10 rounded-xl px-3 py-2 text-[11px] text-white/80">
              {msg.text}
            </div>
          )}
        </div>
      ))}
      <div className="mt-auto pt-2 border-t border-white/8 flex items-center gap-2">
        <input
          readOnly
          placeholder="Ask anything, or tell me what you need done…"
          className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-[11px] text-white/40 placeholder-white/30 outline-none"
        />
        <button className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center" aria-label="Send message (preview only)">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}

function DashboardMock() {
  const kpis = [
    { label: "Emails", value: "47", change: "+3", up: true },
    { label: "Tasks", value: "12", change: "-2", up: false },
    { label: "Meetings", value: "4", change: "+1", up: true },
    { label: "AI Activity", value: "23", change: "+8", up: true },
  ];
  const bars = [65, 82, 71, 90, 68, 85, 78];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="flex flex-col gap-3 p-4 h-full">
      <div className="pb-2 border-b border-white/10">
        <p className="text-white/40 text-[10px] font-mono">DASHBOARD · ALDRICH</p>
        <p className="text-white/80 text-sm font-medium mt-0.5">Good evening, Aldrich.</p>
        <p className="text-white/40 text-xs">{"Here's what needs your attention."}</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white/5 rounded-lg p-2">
            <p className="text-white/40 text-[9px] font-mono mb-1">{k.label}</p>
            <p className="text-white text-lg font-semibold leading-none">{k.value}</p>
            <p className={`text-[10px] mt-0.5 ${k.up ? "text-emerald-400" : "text-red-400"}`}>{k.change}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/5 rounded-lg p-3 flex-1">
        <p className="text-white/40 text-[9px] font-mono mb-3">PRODUCTIVITY · SEPT</p>
        <div className="flex items-end gap-1.5 h-16">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-sm"
                style={{
                  height: `${h}%`,
                  background: i === 5 ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.12)"
                }}
              />
              <span className="text-[8px] text-white/30">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/5 rounded-lg p-2">
        <p className="text-white/40 text-[9px] font-mono mb-2">AI INSIGHTS</p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0"></div>
          <p className="text-white/60 text-[10px]">3 reports summarized · 2 emails drafted · 1 meeting prepped</p>
        </div>
      </div>
    </div>
  );
}

function CoworkMock() {
  const tasks = [
    { name: "Analyze spreadsheet", status: "done", time: "2m ago" },
    { name: "Review emails", status: "done", time: "5m ago" },
    { name: "Prepare management report", status: "running", time: "now" },
    { name: "Research market trends", status: "queued", time: "next" },
    { name: "Create presentation", status: "queued", time: "queued" },
  ];

  const statusConfig: Record<string, { color: string; dot: string }> = {
    done: { color: "text-emerald-400", dot: "bg-emerald-400" },
    running: { color: "text-cyan-400", dot: "bg-cyan-400" },
    queued: { color: "text-white/30", dot: "bg-white/20" },
  };

  return (
    <div className="flex flex-col gap-3 p-4 h-full">
      <div className="pb-2 border-b border-white/10">
        <p className="text-white/40 text-[10px] font-mono">COWORK · ACTIVE SESSION</p>
        <p className="text-white/80 text-sm font-medium mt-0.5">Give VANT the work.</p>
      </div>
      <div className="bg-white/5 rounded-lg p-2 flex items-center gap-2">
        <input readOnly value="Prepare the weekly ops review package" className="flex-1 bg-transparent text-[11px] text-white/70 outline-none" />
        <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          RUNNING
        </div>
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        {tasks.map((t, i) => {
          const cfg = statusConfig[t.status];
          return (
            <div key={i} className="flex items-center gap-2 px-2 py-2 rounded-lg bg-white/3 hover:bg-white/6 transition-colors">
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${t.status === "running" ? "animate-pulse" : ""}`}></span>
              <span className="flex-1 text-[11px] text-white/70">{t.name}</span>
              <span className={`text-[10px] font-mono ${cfg.color}`}>{t.time}</span>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2 mt-auto">
        <button className="flex-1 py-1.5 rounded-lg bg-white/6 text-white/50 text-[10px] font-medium">Pause</button>
        <button className="flex-1 py-1.5 rounded-lg bg-violet-500/20 text-violet-300 text-[10px] font-medium">New Task</button>
      </div>
    </div>
  );
}

function IntegrationsMock() {
  return (
    <div className="flex flex-col gap-3 p-4 h-full">
      <div className="pb-2 border-b border-white/10">
        <p className="text-white/40 text-[10px] font-mono">INTEGRATIONS</p>
        <p className="text-white/80 text-sm font-medium mt-0.5">Connected to how you work.</p>
      </div>
      <div className="grid grid-cols-3 gap-2 flex-1 content-start">
        {INTEGRATIONS.map((int, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-2.5 flex flex-col items-center gap-1.5 hover:bg-white/8 transition-colors">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: `${int.color}22`, color: int.color }}>
              {int.icon}
            </div>
            <span className="text-white/50 text-[9px] text-center leading-tight">{int.name}</span>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
              <span className="text-emerald-400 text-[8px]">Connected</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureMock({ type }: { type: string }) {
  if (type === "chat") return <ChatMock />;
  if (type === "dashboard") return <DashboardMock />;
  if (type === "cowork") return <CoworkMock />;
  return <IntegrationsMock />;
}

function HeroVideoMock({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <div
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group"
      style={{ background: "linear-gradient(135deg, #0e0614 0%, #07090f 50%, #061218 100%)" }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-pressed={playing}
      aria-label={playing ? "Hide product preview overlay" : "Show product preview"}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-cyan-500/8 blur-3xl" />
      </div>

      <div className="absolute inset-4 rounded-xl overflow-hidden border border-white/8 bg-[#0e1117]">
        <div className="flex h-full">
          <div className="w-12 border-r border-white/8 flex flex-col items-center gap-4 pt-4 bg-[#0a0c12]">
            <div className="w-6 h-6 rounded-md bg-violet-500/20 flex items-center justify-center">
              <span className="text-violet-300 text-[10px] font-bold font-mono">V</span>
            </div>
            {["chat","grid","briefcase","folder","plug"].map((icon, i) => (
              <div key={i} className={`w-6 h-6 rounded-md flex items-center justify-center ${i === 0 ? "bg-white/10" : ""}`}>
                <div className="w-3 h-3 rounded-sm bg-white/20" />
              </div>
            ))}
          </div>
          <div className="flex-1 p-3 flex flex-col gap-2">
            <p className="text-white/30 text-[10px] font-mono">AI CHAT · DEFAULT</p>
            <p className="text-white/80 text-sm font-medium">Good evening, Aldrich.</p>
            <p className="text-white/40 text-xs">What should we work on?</p>
            <div className="flex gap-2 mt-1 flex-wrap">
              {["Analyze spreadsheet", "Summarize reports", "Review emails", "Prepare report"].map((s, i) => (
                <span key={i} className="px-2 py-1 rounded-full bg-white/6 text-white/50 text-[9px] border border-white/8">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-2">
              <div className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-[10px] text-white/30">
                Ask anything, or tell me what you need done…
              </div>
            </div>
          </div>
        </div>
      </div>

      {!playing && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent scan-line" />
        </div>
      )}

      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`}>
        <div className="relative">
          <div className="absolute inset-0 rounded-full border border-white/20 pulse-ring" />
          <div className="absolute inset-0 rounded-full border border-white/10 pulse-ring" style={{ animationDelay: "0.5s" }} />
          <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-1">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
        <span className="text-white/30 text-[10px] font-mono">VANT · LIVE PREVIEW</span>
        <span className="text-white/30 text-[10px] font-mono">{playing ? "Interface revealed" : "2:47"}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Modal shell + concrete modals
// ---------------------------------------------------------------------------

function ModalShell({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(4,5,9,0.75)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 p-6"
        style={{ background: "#0e1117", boxShadow: "0 0 60px rgba(124,58,237,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/6 hover:bg-white/12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

function WaitlistModal({ context, onClose }: { context: string; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setStatus("loading");
    const ok = await submitEntry(WAITLIST_ENDPOINT, { email, context, at: new Date().toISOString() });
    appendToList("vant_waitlist", { email, context, at: new Date().toISOString() });
    setStatus(ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <ModalShell onClose={onClose}>
        <div className="text-center py-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
            <span className="text-emerald-400 text-xl">✓</span>
          </div>
          <h3 className="font-display text-2xl font-medium mb-2">{"You're on the list"}</h3>
          <p className="text-white/50 text-sm">{"We'll email"} <span className="text-white/80">{email}</span> {"as soon as your spot opens up."}</p>
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell onClose={onClose}>
      <p className="text-violet-300 text-xs font-mono tracking-widest mb-2">{context.toUpperCase()}</p>
      <h3 className="font-display text-2xl font-medium mb-2">Get early access</h3>
      <p className="text-white/50 text-sm mb-5">{"Drop your email and we'll let you know the moment it's your turn."}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-full bg-white/8 border border-white/15 text-white placeholder-white/30 text-sm outline-none focus:border-violet-400/50 transition-colors"
        />
        {error && <p className="text-red-400 text-xs -mt-1">{error}</p>}
        {status === "error" && <p className="text-red-400 text-xs -mt-1">{"Something went wrong sending that — saved locally instead. Try again shortly."}</p>}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-full bg-white text-[#07090f] font-medium hover:bg-white/90 transition-colors text-sm disabled:opacity-60"
        >
          {status === "loading" ? "Joining…" : "Join the waitlist"}
        </button>
      </form>
    </ModalShell>
  );
}

function ContactSalesModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.company.trim()) {
      setError("Name and company are required.");
      return;
    }
    if (!isValidEmail(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setStatus("loading");
    const ok = await submitEntry(CONTACT_ENDPOINT, { ...form, at: new Date().toISOString() });
    appendToList("vant_contact_requests", { ...form, at: new Date().toISOString() });
    setStatus(ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <ModalShell onClose={onClose}>
        <div className="text-center py-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
            <span className="text-emerald-400 text-xl">✓</span>
          </div>
          <h3 className="font-display text-2xl font-medium mb-2">Request sent</h3>
          <p className="text-white/50 text-sm">Our team will reach out to <span className="text-white/80">{form.email}</span> shortly.</p>
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell onClose={onClose}>
      <p className="text-amber-300 text-xs font-mono tracking-widest mb-2">ENTERPRISE</p>
      <h3 className="font-display text-2xl font-medium mb-2">Contact sales</h3>
      <p className="text-white/50 text-sm mb-5">Tell us a bit about your team and we'll follow up.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full name"
          className="w-full px-4 py-2.5 rounded-xl bg-white/8 border border-white/15 text-white placeholder-white/30 text-sm outline-none focus:border-amber-400/50 transition-colors" />
        <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Work email"
          className="w-full px-4 py-2.5 rounded-xl bg-white/8 border border-white/15 text-white placeholder-white/30 text-sm outline-none focus:border-amber-400/50 transition-colors" />
        <input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Company"
          className="w-full px-4 py-2.5 rounded-xl bg-white/8 border border-white/15 text-white placeholder-white/30 text-sm outline-none focus:border-amber-400/50 transition-colors" />
        <textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="What are you hoping to solve? (optional)" rows={3}
          className="w-full px-4 py-2.5 rounded-xl bg-white/8 border border-white/15 text-white placeholder-white/30 text-sm outline-none focus:border-amber-400/50 transition-colors resize-none" />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        {status === "error" && <p className="text-red-400 text-xs">{"Something went wrong sending that — saved locally instead. Try again shortly."}</p>}
        <button type="submit" disabled={status === "loading"}
          className="w-full py-3 rounded-full bg-white text-[#07090f] font-medium hover:bg-white/90 transition-colors text-sm disabled:opacity-60">
          {status === "loading" ? "Sending…" : "Send request"}
        </button>
      </form>
    </ModalShell>
  );
}

function LegalModal({ title, body, onClose }: { title: string; body: string; onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h3 className="font-display text-2xl font-medium mb-3">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{body}</p>
    </ModalShell>
  );
}

type ModalState =
  | { type: "waitlist"; context: string }
  | { type: "contact" }
  | { type: "legal"; title: string; body: string }
  | null;

export default function App() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroPlaying, setHeroPlaying] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);

  const [ctaEmail, setCtaEmail] = useState("");
  const [ctaStatus, setCtaStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [ctaError, setCtaError] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const feat = FEATURES[activeFeature];

  function openWaitlist(context: string) {
    setMobileMenuOpen(false);
    setModal({ type: "waitlist", context });
  }
  function openContact() {
    setMobileMenuOpen(false);
    setModal({ type: "contact" });
  }
  function openLegal(title: string, body: string) {
    setModal({ type: "legal", title, body });
  }

  async function handleCtaSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(ctaEmail)) {
      setCtaError("Enter a valid email address.");
      return;
    }
    setCtaError("");
    setCtaStatus("loading");
    const ok = await submitEntry(WAITLIST_ENDPOINT, { email: ctaEmail, context: "CTA section", at: new Date().toISOString() });
    appendToList("vant_waitlist", { email: ctaEmail, context: "CTA section", at: new Date().toISOString() });
    setCtaStatus(ok ? "success" : "error");
  }

  return (
    <div className="min-h-screen bg-[#07090f] text-white overflow-x-hidden">

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? "bg-[#07090f]/80 backdrop-blur-md border-b border-white/6" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-8">
          <span className="font-display text-xl font-semibold tracking-tight">Vant</span>
          <div className="hidden md:flex items-center gap-6 ml-4">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="text-white/50 hover:text-white/80 text-sm transition-colors">{l.label}</a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={() => openWaitlist("Sign in")} className="text-white/50 hover:text-white/80 text-sm transition-colors hidden md:block">Sign in</button>
            <button onClick={() => openWaitlist("Early access")} className="px-4 py-1.5 rounded-full bg-white text-[#07090f] text-sm font-medium hover:bg-white/90 transition-colors">
              Get early access
            </button>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            >
              <span className={`block w-5 h-px bg-white/70 transition-transform ${mobileMenuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`block w-5 h-px bg-white/70 transition-transform ${mobileMenuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3 border-t border-white/6 pt-3">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white text-sm transition-colors py-1">{l.label}</a>
            ))}
            <button onClick={() => openWaitlist("Sign in")} className="text-white/60 hover:text-white text-sm text-left py-1">Sign in</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="product" className="relative pt-32 pb-24 px-6 mesh-bg overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/8 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
            <span className="text-violet-300 text-xs font-mono tracking-wide">Intelligence. In action.</span>
          </div>

          <h1 className="fade-up-delay-1 font-display text-6xl md:text-8xl font-medium leading-[1.02] tracking-tight mb-6">
            One AI.<br />
            <em className="not-italic text-glow-violet" style={{ color: "#a78bfa" }}>Every workflow.</em>
          </h1>

          <p className="fade-up-delay-2 text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            VANT is the AI work platform for individuals, teams, and enterprises who need to do more than ask questions — they need to get things done.
          </p>

          <div className="fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <button onClick={() => openWaitlist("Early access")} className="px-6 py-3 rounded-full bg-white text-[#07090f] font-medium hover:bg-white/90 transition-colors text-sm">
              Get early access
            </button>
            <button onClick={() => setHeroPlaying((v) => !v)} className="px-6 py-3 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors text-sm flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"></polygon>
              </svg>
              {heroPlaying ? "Hide preview" : "Watch the demo"}
            </button>
          </div>

          <div className="fade-up-delay-3">
            <HeroVideoMock playing={heroPlaying} onToggle={() => setHeroPlaying((v) => !v)} />
          </div>
        </div>
      </section>

      {/* Philosophy strip — real marquee */}
      <section className="border-y border-white/8 py-5 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, gi) => (
            <div key={`group-${gi}`} className="flex gap-16 items-center flex-shrink-0" aria-hidden={gi === 1}>
              {["Don't just ask AI.", "Let AI work.", "One AI.", "Every workflow.", "Intelligence. In action."].map((phrase, i) => (
                <span key={`${gi}-${i}`} className={`text-sm font-mono tracking-widest ${i % 2 === 0 ? "text-white/20" : "text-white/40"}`}>
                  {phrase}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-white/30 text-xs font-mono tracking-widest mb-3">CAPABILITIES</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium mb-16 max-w-lg leading-tight">
            Built for real work, not just conversation.
          </h2>

          <div className="flex gap-1 mb-10 p-1 rounded-xl bg-white/5 border border-white/8 w-fit overflow-x-auto max-w-full">
            {FEATURES.map((f, i) => (
              <button
                key={i}
                onClick={() => setActiveFeature(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  i === activeFeature
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                {f.tag}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            <div className="lg:col-span-2 flex flex-col justify-center gap-6">
              <div className="inline-flex items-center gap-2 w-fit">
                <span className="w-2 h-2 rounded-full" style={{ background: feat.accentLight }}></span>
                <span className="font-mono text-xs tracking-widest" style={{ color: feat.accentLight }}>
                  {feat.tag.toUpperCase()}
                </span>
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-medium leading-tight whitespace-pre-line">
                {feat.headline}
              </h3>
              <p className="text-white/50 text-base leading-relaxed">{feat.body}</p>
              <button
                onClick={() => openWaitlist(`Early access — ${feat.tag}`)}
                className="self-start px-5 py-2.5 rounded-full border text-sm font-medium transition-all hover:bg-white/5"
                style={{ borderColor: `${feat.accentLight}40`, color: feat.accentLight }}
              >
                Get early access →
              </button>
            </div>

            <div className="lg:col-span-3">
              <div
                className="rounded-2xl border overflow-hidden h-80 lg:h-96 transition-all duration-300"
                style={{
                  background: "#0e1117",
                  borderColor: `${feat.accent}30`,
                  boxShadow: `0 0 60px ${feat.accent}15, 0 0 120px ${feat.accent}08`,
                }}
              >
                <FeatureMock type={feat.mockType} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations grid */}
      <section id="integrations" className="py-24 px-6 border-t border-white/6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white/30 text-xs font-mono tracking-widest mb-3">INTEGRATIONS</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium mb-4">Connects to everything.</h2>
          <p className="text-white/40 text-base mb-14 max-w-lg mx-auto">
            Google Workspace, Microsoft 365, Slack, Notion, Salesforce and more — VANT works where you already work.
          </p>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {INTEGRATIONS.map((int, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/8 hover:border-white/16 hover:bg-white/3 transition-all duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                  style={{ background: `${int.color}18`, color: int.color }}
                >
                  {int.icon}
                </div>
                <span className="text-white/40 text-[10px] leading-tight text-center">{int.name}</span>
              </div>
            ))}
          </div>
          <p className="text-white/25 text-xs mt-6 font-mono">+ Dropbox, HubSpot, and more coming soon</p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 border-t border-white/6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white/30 text-xs font-mono tracking-widest mb-3">PRICING</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium mb-4">Simple, honest pricing.</h2>
          <p className="text-white/40 text-base mb-14 max-w-lg mx-auto">
            Start free. Scale as your team grows. No hidden fees.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-6 text-left flex flex-col gap-5 border transition-all duration-200 ${
                  plan.highlight
                    ? "bg-violet-500/10 border-violet-500/40 shadow-[0_0_60px_rgba(124,58,237,0.15)]"
                    : "bg-white/4 border-white/10 hover:border-white/20"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-violet-500 text-white text-[10px] font-mono tracking-wider">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-white/40 text-xs font-mono tracking-widest mb-2">{plan.name.toUpperCase()}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-medium">{plan.price}</span>
                    <span className="text-white/40 text-sm">/ {plan.period}</span>
                  </div>
                  <p className="text-white/40 text-sm mt-2 leading-snug">{plan.desc}</p>
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="mt-0.5 flex-shrink-0 text-emerald-400">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => plan.action === "contact" ? openContact() : openWaitlist(`${plan.name} plan`)}
                  className={`w-full py-2.5 rounded-full text-sm font-medium transition-colors ${
                    plan.highlight
                      ? "bg-white text-[#07090f] hover:bg-white/90"
                      : "border border-white/15 text-white/70 hover:text-white hover:border-white/30"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 mesh-bg pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-tight mb-6">
            {"Don't just ask AI."}<br />
            <em className="not-italic text-glow-violet" style={{ color: "#a78bfa" }}>Let AI work.</em>
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-md mx-auto">
            Join the early access program and be first to experience the future of AI-powered work.
          </p>
          {ctaStatus === "success" ? (
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm">
              <span>✓</span>
              <span>{"You're on the list — check "}{ctaEmail}{" soon."}</span>
            </div>
          ) : (
            <form onSubmit={handleCtaSubmit} className="flex flex-col items-center gap-3">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <input
                  type="email"
                  value={ctaEmail}
                  onChange={(e) => setCtaEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-72 px-4 py-3 rounded-full bg-white/8 border border-white/15 text-white placeholder-white/30 text-sm outline-none focus:border-white/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={ctaStatus === "loading"}
                  className="px-6 py-3 rounded-full bg-white text-[#07090f] font-medium hover:bg-white/90 transition-colors text-sm disabled:opacity-60"
                >
                  {ctaStatus === "loading" ? "Sending…" : "Request access"}
                </button>
              </div>
              {ctaError && <p className="text-red-400 text-xs">{ctaError}</p>}
              {ctaStatus === "error" && <p className="text-red-400 text-xs">{"Couldn't reach the server — saved locally instead."}</p>}
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-semibold">Vant</span>
          <p className="text-white/25 text-xs font-mono">© 2026 VANT. Intelligence. In action.</p>
          <div className="flex gap-6">
            <button onClick={() => openLegal("Privacy Policy", "This is a placeholder. Replace this with your real privacy policy before launch — cover what data you collect (like waitlist emails), how it's stored, and how people can ask you to delete it.")} className="text-white/30 hover:text-white/60 text-xs transition-colors">Privacy</button>
            <button onClick={() => openLegal("Terms of Service", "This is a placeholder. Replace this with your real terms before launch — covering acceptable use, your service's current beta status, and liability.")} className="text-white/30 hover:text-white/60 text-xs transition-colors">Terms</button>
            <button onClick={openContact} className="text-white/30 hover:text-white/60 text-xs transition-colors">Contact</button>
          </div>
        </div>
      </footer>

      {modal?.type === "waitlist" && <WaitlistModal context={modal.context} onClose={() => setModal(null)} />}
      {modal?.type === "contact" && <ContactSalesModal onClose={() => setModal(null)} />}
      {modal?.type === "legal" && <LegalModal title={modal.title} body={modal.body} onClose={() => setModal(null)} />}
    </div>
  );
}
