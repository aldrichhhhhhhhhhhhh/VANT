import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import "./mote.css";

type MoteMood = "idle" | "calm" | "thinking" | "error";

function MoteFigure() {
  const [mood, setMood] = useState<MoteMood>("idle");
  const [message, setMessage] = useState("");
  const [founderAnswered, setFounderAnswered] = useState(false);
  const lastClickAt = useRef(0);
  const timers = useRef<number[]>([]);
  const calmTimer = useRef<number | undefined>(undefined);

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    if (calmTimer.current !== undefined) window.clearTimeout(calmTimer.current);
  };

  useEffect(() => () => clearTimers(), []);

  function setCalm() {
    setMood((current) => current === "thinking" || current === "error" ? current : "calm");
    if (calmTimer.current !== undefined) window.clearTimeout(calmTimer.current);
    calmTimer.current = window.setTimeout(() => {
      setMood((current) => current === "calm" ? "idle" : current);
      setMessage((current) => current === "Hello" || current === "I'm Mote" || current === "Created by VANT Technologies" ? "" : current);
    }, 4500);
  }

  function trackPointer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    setCalm();
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    event.currentTarget.style.setProperty("--mote-follow-x", `${x * 10}px`);
    event.currentTarget.style.setProperty("--mote-follow-y", `${y * 8}px`);
    event.currentTarget.style.setProperty("--mote-tilt-x", `${x * 7}deg`);
    event.currentTarget.style.setProperty("--mote-tilt-y", `${y * -6}deg`);
    event.currentTarget.style.setProperty("--mote-eye-x", `${x * 4}px`);
    event.currentTarget.style.setProperty("--mote-eye-y", `${y * 2}px`);
  }

  function resetPointer(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--mote-follow-x", "0px");
    event.currentTarget.style.setProperty("--mote-follow-y", "0px");
    event.currentTarget.style.setProperty("--mote-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--mote-tilt-y", "0deg");
    event.currentTarget.style.setProperty("--mote-eye-x", "0px");
    event.currentTarget.style.setProperty("--mote-eye-y", "0px");
  }

  function handleClick() {
    const now = Date.now();
    const rapidDoubleClick = now - lastClickAt.current < 380;
    lastClickAt.current = now;
    clearTimers();

    if (rapidDoubleClick) {
      setMood("error");
      setMessage("Whoa—easy there! My circuits are getting tangled.");
      timers.current.push(window.setTimeout(() => {
        setMood("calm");
        setMessage("");
        calmTimer.current = window.setTimeout(() => setMood("idle"), 3500);
      }, 2400));
      return;
    }

    setMood("thinking");
    setMessage("Hello");
    timers.current.push(window.setTimeout(() => setMessage("I'm Mote"), 1000));
    timers.current.push(window.setTimeout(() => setMessage("Created by VANT Technologies"), 2000));
    timers.current.push(window.setTimeout(() => {
      setMessage("");
      setMood("calm");
      calmTimer.current = window.setTimeout(() => setMood("idle"), 4000);
    }, 3300));
  }


  function askMoto(question: string, answer: string) {
    clearTimers();
    lastClickAt.current = 0;
    setMood("thinking");
    setMessage(answer);
    timers.current.push(window.setTimeout(() => {
      if (question === "Who founded VANT Technologies?") setFounderAnswered(true);
      setMood("calm");
      calmTimer.current = window.setTimeout(() => {
        setMood("idle");
        setMessage("");
      }, 5000);
    }, 6500));
  }

  const prompts = [
    {
      label: "What is VANT?",
      answer: "VANT Technologies envisions a future where intelligence empowers everyone to build, learn, and achieve more. We strive to turn ambitious ideas into meaningful innovations, making technology more accessible, practical, and impactful for businesses, students, and the people shaping tomorrow."
    },
    {
      label: "Who founded VANT Technologies?",
      answer: "VANT Technologies was founded by Karl Aldrich Uy, its Founder and Chief Technology Officer. He started VANT with a clear ambition: make AI genuinely useful in everyday work and learning by turning ambitious ideas into practical tools people can actually use."
    },
    {
      label: "What is VANT's vision?",
      answer: "Our vision is to make practical intelligence more accessible—helping businesses work smarter, helping students learn with confidence, and giving people better tools to turn ideas into real progress."
    },
    {
      label: "Who's Karl Aldrich Uy?",
      answer: "Now that's a story still being written. Karl Aldrich Uy is the founder behind VANT Technologies—and the person working to turn this little signal into something much bigger. Keep an eye on what comes next."
    }
  ];

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  }

  const moodLabel = mood === "idle" ? "IDLE / RESTING" : mood === "calm" ? "CALM / AWARE" : mood === "thinking" ? "THINKING / PROCESSING" : "ERROR / OVERLOADED";

  return (
    <div
      className={`mote-stage mote-mood-${mood}`}
      aria-label={`MOTE.EXE mascot, currently ${mood}. Move your cursor over MOTE or click to interact.`}
      role="button"
      tabIndex={0}
      onPointerEnter={(event) => { if (event.pointerType === "touch") setCalm(); else setCalm(); }}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {mood !== "idle" && mood !== "thinking" && <div className="mote-prompts" aria-label="Ask MOTE.EXE about VANT">
        {prompts.filter((prompt) => prompt.label !== "Who's Karl Aldrich Uy?" || founderAnswered).map((prompt, index) => (
          <button
            key={prompt.label}
            type="button"
            className={`mote-prompt ${index === 3 ? "mote-prompt-easter" : ""}`}
            onClick={(event) => {
              event.stopPropagation();
              askMoto(prompt.label, prompt.answer);
            }}
          >
            {prompt.label}
          </button>
        ))}
      </div>}
      <div className="mote-aura" />
      <div className="mote-ring mote-ring-outer" />
      <div className="mote-ring mote-ring-inner" />
      <div className="mote-scan-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="mote-follow"><svg className="mote-figure" viewBox="0 0 240 250" aria-hidden="true">
        <defs>
          <radialGradient id="moteGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4f5f7" stopOpacity=".3" />
            <stop offset="65%" stopColor="#f4f5f7" stopOpacity=".06" />
            <stop offset="100%" stopColor="#f4f5f7" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="moteOrb" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#242830" />
            <stop offset="55%" stopColor="#090a0d" />
            <stop offset="100%" stopColor="#020203" />
          </linearGradient>
        </defs>
        <circle cx="120" cy="136" r="116" fill="url(#moteGlow)" />
        <g className="mote-halo">
          <circle cx="120" cy="136" r="102" fill="none" stroke="#aeb4bf" strokeOpacity=".42" strokeWidth="1.4" strokeDasharray="2 12" />
          <circle cx="120" cy="136" r="84" fill="none" stroke="#d6d9de" strokeOpacity=".55" strokeWidth="2" strokeDasharray="15 22 38 18" />
        </g>
        <g className="mote-body">
          <polygon points="84,100 62,36 112,80" fill="#0b0c0f" stroke="#aeb4bf" strokeWidth="2.5" />
          <polygon points="156,100 178,36 128,80" fill="#0b0c0f" stroke="#aeb4bf" strokeWidth="2.5" />
          <circle cx="120" cy="136" r="58" fill="url(#moteOrb)" stroke="#d6d9de" strokeWidth="3" />
          <polygon className="mote-eye-shape" points="76,130 164,120 152,150 92,154" fill="#f4f5f7" />
          <rect className="mote-eye-pupil" x="115" y="126" width="10" height="26" fill="#050608" />
          <path d="M66 112 L110 130" fill="none" stroke="#0b0c0f" strokeWidth="9" />
          <path d="M174 104 L130 126" fill="none" stroke="#0b0c0f" strokeWidth="9" />
        </g>
        <g className="mote-glitch" fill="#d6d9de">
          <rect x="176" y="75" width="23" height="3" opacity=".8" />
          <rect x="185" y="61" width="15" height="3" opacity=".45" />
          <rect x="194" y="49" width="8" height="3" opacity=".25" />
          <rect x="32" y="166" width="16" height="2" opacity=".45" />
        </g>
        <g stroke="#aeb4bf" strokeOpacity=".45" strokeWidth="1.2" strokeDasharray="2 5">
          <line className="mote-dash" x1="62" y1="0" x2="62" y2="34" />
          <line className="mote-dash" x1="96" y1="0" x2="96" y2="72" />
          <line className="mote-dash" x1="144" y1="0" x2="144" y2="72" />
          <line className="mote-dash" x1="178" y1="0" x2="178" y2="34" />
        </g>
      </svg></div>
      <div className="mote-coordinate mote-coordinate-a">M-01 / {moodLabel}</div>
      <div className="mote-coordinate mote-coordinate-b">{mood === "error" ? "SIGNAL: UNSTABLE" : mood === "thinking" ? "SIGNAL: PROCESSING" : "SIGNAL: STABLE"}</div>
      {message && <div className={`mote-speech ${message.length > 90 ? "mote-speech-long" : ""}`} role="status" aria-live="polite">{message}</div>}
      <span className="mote-interact-hint" aria-hidden="true">{mood === "idle" ? "WAKE MOTE" : mood === "thinking" ? "PROCESSING" : mood === "error" ? "SIGNAL INTERRUPTED" : "MOTE IS AWARE"}</span>
    </div>
  );
}

export default function MoteSection() {
  return (
    <section id="mote" className="mote-section vt-section">
      <div className="mote-section-top vt-reveal">
        <div className="vt-section-kicker"><span>01.5</span> / A SIGNAL FROM VANT</div>
        <span className="mote-live-label"><i /> CHARACTER SYSTEM / ONLINE</span>
      </div>
      <div className="mote-grid">
        <div className="mote-copy vt-reveal">
          <p className="mote-overline">INTRODUCING MOTE.EXE</p>
          <h2>A little<br />different.<br /><em>By design.</em></h2>
          <p className="mote-description">Meet MOTE.EXE — VANT’s digital mascot, built to bring a distinct personality to the technology we create. A small signal from a much bigger system.</p>
          <div className="mote-specs">
            <div><span>IDENTITY</span><b>Curious by nature</b></div>
            <div><span>HOME</span><b>The VANT ecosystem</b></div>
            <div><span>MODE</span><b>Always evolving</b></div>
          </div>
          <a className="mote-link" href="#products">Explore the VANT ecosystem <span aria-hidden="true">↗</span></a>
        </div>
        <div className="mote-visual vt-reveal">
          <MoteFigure />
          <div className="mote-visual-caption"><span>MOTE.EXE</span><span>VANT TECHNOLOGIES / DIGITAL CHARACTER</span></div>
        </div>
      </div>
      <div className="mote-footerline vt-reveal"><span>NOT JUST AN INTERFACE.</span><span>A PERSONALITY IN THE SYSTEM.</span><span>V / 001</span></div>
    </section>
  );
}
