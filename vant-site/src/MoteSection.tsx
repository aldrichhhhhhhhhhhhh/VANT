import "./mote.css";

function MoteFigure() {
  return (
    <div className="mote-stage" aria-label="Animated MOTE.EXE mascot" role="img">
      <div className="mote-aura" />
      <div className="mote-ring mote-ring-outer" />
      <div className="mote-ring mote-ring-inner" />
      <div className="mote-scan-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <svg className="mote-figure" viewBox="0 0 240 250" aria-hidden="true">
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
          <polygon points="76,130 164,120 152,150 92,154" fill="#f4f5f7" />
          <rect x="115" y="126" width="10" height="26" fill="#050608" />
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
      </svg>
      <div className="mote-coordinate mote-coordinate-a">M-01 / ACTIVE</div>
      <div className="mote-coordinate mote-coordinate-b">SIGNAL: STABLE</div>
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
