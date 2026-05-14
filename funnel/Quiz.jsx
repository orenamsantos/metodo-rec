import React, { useState, useEffect } from 'react';

// ========================================================================
// QUIZ DIAGNÓSTICO MATRIMONIAL — Método R.E.C.
// Versión: Español neutro LATAM
// 17 telas (0-16): Landing → Quiz → Resultado → Oferta → Checkout → Upsell/Downsell
// ========================================================================

const c = {
  bg: '#241813', bgSoft: '#332218', bgDeep: '#1a0f0a', bgWarm: '#3a2620',
  gold: '#d4a574', goldBright: '#f0d4a8', goldDeep: '#9a7548', goldGlow: '#e8c898',
  rose: '#d4929c', roseDeep: '#a86670',
  text: '#faf0e0', textSoft: '#c4b09e', textDim: '#8a7868',
  border: '#4a3a30', borderSoft: '#3a2b22', borderGold: '#8a6d4a',
  danger: '#d18a7a', success: '#a8c094',
  shadow: '#0a0604',
};

const FONTS = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300;1,9..144,400&family=Manrope:wght@300;400;500;600;700&display=swap';

const GRAIN = `data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/><feColorMatrix values='0 0 0 0 0.85 0 0 0 0 0.75 0 0 0 0 0.6 0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`;

export default function Quiz() {
  const [screen, setScreen] = useState(0);
  const [a, setA] = useState({
    timeAgo: null, feelings: [], triedTalking: null,
    commitment: null, timeLeft: null, name: '', phone: '',
  });

  useEffect(() => {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = FONTS;
    document.head.appendChild(l);
    return () => document.head.removeChild(l);
  }, []);

  useEffect(() => {
    if (screen === 9) {
      const t = setTimeout(() => setScreen(10), 4200);
      return () => clearTimeout(t);
    }
  }, [screen]);

  useEffect(() => { window.scrollTo(0, 0); }, [screen]);

  const next = () => setScreen(s => s + 1);
  const goTo = (n) => setScreen(n);
  const set = (k, v) => setA(p => ({ ...p, [k]: v }));
  const toggle = (f) => setA(p => ({
    ...p, feelings: p.feelings.includes(f)
      ? p.feelings.filter(x => x !== f) : [...p.feelings, f]
  }));

  const stepFromScreen = (s) => {
    if (s === 0) return 0;
    if (s === 1) return 1;
    if (s === 2 || s === 3) return 2;
    if (s === 4 || s === 5) return 3;
    if (s === 6) return 4;
    if (s === 7) return 5;
    if (s === 8) return 6;
    return 7;
  };

  const showProgress = screen > 0 && screen < 9;

  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(ellipse at top, ${c.bgSoft} 0%, ${c.bg} 55%, #1a1009 100%)`,
      color: c.text, fontFamily: "'Manrope', sans-serif", position: 'relative',
    }}>
      <div style={{
        position: 'fixed', inset: 0, backgroundImage: `url("${GRAIN}")`,
        opacity: 0.4, pointerEvents: 'none', mixBlendMode: 'overlay', zIndex: 1,
      }} />

      {showProgress && (
        <div style={{ position: 'sticky', top: 0, zIndex: 10, padding: '20px 24px 0', backdropFilter: 'blur(8px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, maxWidth: 640, margin: '0 auto 10px' }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: c.textDim }}>
              R.E.C. · Diagnóstico
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 12, color: c.textSoft }}>
              Etapa {Math.min(stepFromScreen(screen), 8)} de 8
            </div>
          </div>
          <div style={{ height: 1, background: c.borderSoft, maxWidth: 640, margin: '0 auto' }}>
            <div style={{ height: 1, background: c.gold, width: `${(stepFromScreen(screen) / 8) * 100}%`, transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
          </div>
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 640, margin: '0 auto', padding: '24px 24px 80px' }}>
        {screen === 0 && <Landing onStart={next} />}
        {screen === 1 && <Q1 v={a.timeAgo} onSel={(v) => { set('timeAgo', v); next(); }} />}
        {screen === 2 && <Q2 sel={a.feelings} onTog={toggle} onNext={next} />}
        {screen === 3 && <Interrupt onNext={next} />}
        {screen === 4 && <Q3 v={a.triedTalking} onSel={(v) => { set('triedTalking', v); next(); }} />}
        {screen === 5 && <VideoMiddle onNext={next} />}
        {screen === 6 && <Q4 v={a.commitment} onSel={(v) => { set('commitment', v); next(); }} />}
        {screen === 7 && <Q5 v={a.timeLeft} onSel={(v) => { set('timeLeft', v); next(); }} />}
        {screen === 8 && <Capture a={a} setName={(v) => set('name', v)} setPhone={(v) => set('phone', v)} onSubmit={next} />}
        {screen === 9 && <Loading />}
        {screen === 10 && <Result name={a.name} onNext={next} />}
        {screen === 11 && <PriceAnchor onNext={next} />}
        {screen === 12 && <Offer onBuy={next} />}
        {screen === 13 && <Checkout onComplete={next} />}
        {screen === 14 && <Upsell onAccept={() => goTo(16)} onDecline={next} />}
        {screen === 15 && <Downsell onAccept={() => goTo(16)} onDecline={() => goTo(16)} />}
        {screen === 16 && <ThankYou />}
      </div>
    </div>
  );
}

// ========================================================================
// HELPERS
// ========================================================================

const FadeIn = ({ children, delay = 0 }) => (
  <div style={{ animation: `fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both` }}>
    {children}
    <style>{`
      @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes glow-pulse {
        0%, 100% { box-shadow: 0 8px 28px rgba(212, 165, 116, 0.35), 0 0 0 1px rgba(240, 212, 168, 0.6), inset 0 1px 0 rgba(240, 212, 168, 0.4); }
        50% { box-shadow: 0 12px 38px rgba(212, 165, 116, 0.55), 0 0 0 1px rgba(240, 212, 168, 0.8), inset 0 1px 0 rgba(240, 212, 168, 0.5); }
      }
      @keyframes price-shimmer {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
    `}</style>
  </div>
);

const PrimaryButton = ({ children, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}
    onMouseEnter={e => !disabled && (e.target.style.background = c.goldBright)}
    onMouseLeave={e => !disabled && (e.target.style.background = c.gold)}
    style={{
      width: '100%', padding: '18px 24px',
      background: disabled ? c.borderSoft : c.gold,
      color: disabled ? c.textDim : c.bg, border: 'none',
      fontFamily: "'Manrope', sans-serif", fontSize: 15, fontWeight: 600,
      letterSpacing: '0.04em', textTransform: 'uppercase',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease', borderRadius: 2,
    }}>{children}</button>
);

// Botão premium pra ações de compra (oferta, upsell, downsell)
const BuyButton = ({ children, onClick, subtitle }) => {
  const [hover, setHover] = useState(false);
  return (
    <div>
      <button onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: '100%', padding: '24px 28px',
          background: `linear-gradient(135deg, ${c.goldDeep} 0%, ${c.gold} 25%, ${c.goldBright} 50%, ${c.gold} 75%, ${c.goldDeep} 100%)`,
          backgroundSize: '300% 100%',
          backgroundPosition: hover ? '100% 50%' : '0% 50%',
          color: c.bgDeep, border: 'none',
          fontFamily: "'Manrope', sans-serif", fontSize: 16, fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          cursor: 'pointer', borderRadius: 2,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: 'glow-pulse 2.4s ease-in-out infinite',
          transform: hover ? 'translateY(-2px)' : 'translateY(0)',
          position: 'relative', overflow: 'hidden',
        }}>
        <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: c.bgDeep, opacity: 0.6, fontSize: 12 }}>✦</span>
          {children}
          <span style={{ color: c.bgDeep, opacity: 0.6, fontSize: 12 }}>✦</span>
        </span>
      </button>
      {subtitle && (
        <div style={{
          textAlign: 'center', marginTop: 12,
          fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          fontSize: 13, color: c.goldGlow, letterSpacing: '0.02em',
        }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

const GhostButton = ({ children, onClick }) => (
  <button onClick={onClick}
    onMouseEnter={e => e.target.style.color = c.text}
    onMouseLeave={e => e.target.style.color = c.textDim}
    style={{
      width: '100%', padding: '14px 24px', background: 'transparent',
      color: c.textDim, border: 'none', fontFamily: "'Manrope', sans-serif",
      fontSize: 13, cursor: 'pointer', textDecoration: 'underline',
      textUnderlineOffset: 4, textDecorationColor: c.borderSoft, transition: 'color 0.2s',
    }}>{children}</button>
);

const OptionCard = ({ idx, label, sel, onClick, multi }) => (
  <button onClick={onClick}
    onMouseEnter={e => { if (!sel) e.currentTarget.style.borderColor = c.goldBright; }}
    onMouseLeave={e => { if (!sel) e.currentTarget.style.borderColor = c.border; }}
    style={{
      width: '100%', textAlign: 'left', padding: '20px 22px',
      background: sel ? `${c.gold}15` : 'transparent',
      border: `1px solid ${sel ? c.gold : c.border}`,
      color: c.text, fontFamily: "'Manrope', sans-serif",
      fontSize: 15, cursor: 'pointer', transition: 'all 0.3s ease',
      borderRadius: 2, display: 'flex', alignItems: 'center',
      gap: 18, marginBottom: 10,
    }}>
    {multi ? (
      <span style={{
        width: 18, height: 18,
        border: `1px solid ${sel ? c.gold : c.textDim}`,
        background: sel ? c.gold : 'transparent', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{sel && <span style={{ color: c.bg, fontSize: 11, fontWeight: 700 }}>✓</span>}</span>
    ) : (
      <span style={{
        fontFamily: "'Fraunces', serif", fontStyle: 'italic',
        fontSize: 14, color: sel ? c.gold : c.textDim, width: 20, flexShrink: 0,
      }}>{String(idx).padStart(2, '0')}</span>
    )}
    <span style={{ lineHeight: 1.5, flex: 1 }}>{label}</span>
  </button>
);

const ScreenTitle = ({ eyebrow, children }) => (
  <>
    {eyebrow && <FadeIn>
      <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
        color: c.gold, fontWeight: 500, marginBottom: 20, marginTop: 24 }}>{eyebrow}</div>
    </FadeIn>}
    <FadeIn delay={0.1}>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 6vw, 38px)',
        fontWeight: 400, lineHeight: 1.15, margin: '0 0 32px', letterSpacing: '-0.01em' }}>
        {children}
      </h1>
    </FadeIn>
  </>
);

const Em = ({ children }) => <em style={{ color: c.gold, fontStyle: 'italic' }}>{children}</em>;

// ========================================================================
// TELA 0 — LANDING
// ========================================================================
const Landing = ({ onStart }) => (
  <div style={{ paddingTop: 40 }}>
    <FadeIn>
      <div style={{ fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
        color: c.gold, fontWeight: 500, marginBottom: 14, textAlign: 'center' }}>
        Método R.E.C. · Diagnóstico
      </div>
    </FadeIn>
    <FadeIn delay={0.1}>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(32px, 7vw, 46px)',
        fontWeight: 400, lineHeight: 1.1, textAlign: 'center',
        margin: '0 0 24px', letterSpacing: '-0.015em' }}>
        Descubre la <Em>probabilidad real</Em> de reavivar tu matrimonio
      </h1>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p style={{ textAlign: 'center', color: c.textSoft, fontSize: 16, lineHeight: 1.6,
        maxWidth: 480, margin: '0 auto 36px' }}>
        Y cuál es el <strong style={{ color: c.text, fontWeight: 500 }}>bloqueo invisible</strong> que está alejando a tu pareja — antes de que sea demasiado tarde.
      </p>
    </FadeIn>
    <FadeIn delay={0.3}>
      <div style={{ padding: 20, border: `1px solid ${c.border}`, marginBottom: 28, background: c.bgSoft }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ color: c.gold, fontSize: 14 }}>★</span>)}
          </div>
          <span style={{ fontSize: 12, color: c.textSoft }}>4.9 · 12.847 mujeres atendidas</span>
        </div>
        <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          fontSize: 14, lineHeight: 1.55, color: c.text, margin: 0 }}>
          "Estaba perdida. Este diagnóstico fue el primer paso que realmente tuvo sentido en meses."
          <span style={{ display: 'block', marginTop: 8, fontStyle: 'normal', fontSize: 12,
            color: c.textDim, fontFamily: "'Manrope', sans-serif" }}>
            — Camila R., casada hace 11 años · México
          </span>
        </p>
      </div>
    </FadeIn>
    <FadeIn delay={0.4}>
      <PrimaryButton onClick={onStart}>Iniciar mi Diagnóstico →</PrimaryButton>
      <p style={{ textAlign: 'center', fontSize: 11, color: c.textDim, marginTop: 14, letterSpacing: '0.05em' }}>
        90 segundos · 100% confidencial · Sin registro inicial
      </p>
    </FadeIn>
    <FadeIn delay={0.55}>
      <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${c.borderSoft}`, textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: c.textDim, marginBottom: 14, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          + 9.000 mujeres en los últimos 30 días
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{
              width: 40, height: 40, borderRadius: '50%',
              background: `linear-gradient(135deg, ${c.gold}40, ${c.rose}40)`,
              border: `1.5px solid ${c.bg}`, marginLeft: i > 1 ? -12 : 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Fraunces', serif", fontSize: 14, color: c.text, fontStyle: 'italic',
            }}>{['C','M','L','A','P'][i-1]}</div>
          ))}
        </div>
      </div>
    </FadeIn>
  </div>
);

// ========================================================================
// TELA 1 — Q1: TEMPO
// ========================================================================
const Q1 = ({ v, onSel }) => (
  <div style={{ paddingTop: 24 }}>
    <ScreenTitle eyebrow="Pregunta 01">
      ¿Hace cuánto sientes que <Em>algo cambió</Em> entre ustedes?
    </ScreenTitle>
    <FadeIn delay={0.2}>
      <div>{[
        'Menos de 3 meses',
        'Entre 3 meses y 1 año',
        'Más de 1 año',
        'Sinceramente, ya no recuerdo cómo era antes',
      ].map((opt, i) => (
        <OptionCard key={opt} idx={i+1} label={opt} sel={v === opt} onClick={() => onSel(opt)} />
      ))}</div>
    </FadeIn>
  </div>
);

// ========================================================================
// TELA 2 — Q2: SENTIMIENTOS (MULTI)
// ========================================================================
const Q2 = ({ sel, onTog, onNext }) => (
  <div style={{ paddingTop: 24 }}>
    <ScreenTitle eyebrow="Pregunta 02">
      Marca todo lo que sientes <Em>hoy</Em>
    </ScreenTitle>
    <FadeIn delay={0.15}>
      <p style={{ color: c.textSoft, fontSize: 13, marginTop: -20, marginBottom: 24,
        fontStyle: 'italic', fontFamily: "'Fraunces', serif" }}>
        Puedes marcar más de una. Sé honesta — nadie más va a verlo.
      </p>
    </FadeIn>
    <FadeIn delay={0.25}>
      <div>{[
        'Me siento invisible para él',
        'Parecemos dos extraños viviendo bajo el mismo techo',
        'Tengo miedo de que se interese por otra',
        'La intimidad prácticamente desapareció',
        'Está siempre en el celular, distante',
        'Discutimos por cualquier tontería',
        'Yo todavía lo amo, pero no sé si él aún me ama',
      ].map((opt, i) => (
        <OptionCard key={opt} idx={i+1} label={opt}
          sel={sel.includes(opt)} onClick={() => onTog(opt)} multi />
      ))}</div>
    </FadeIn>
    <FadeIn delay={0.4}>
      <div style={{ marginTop: 24 }}>
        <PrimaryButton onClick={onNext} disabled={sel.length === 0}>Continuar →</PrimaryButton>
      </div>
    </FadeIn>
  </div>
);

// ========================================================================
// TELA 3 — INTERRUPCIÓN
// ========================================================================
const Interrupt = ({ onNext }) => (
  <div style={{ paddingTop: '15vh', minHeight: '70vh', display: 'flex',
    flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
    <FadeIn>
      <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
        fontSize: 56, color: c.gold, marginBottom: 30, lineHeight: 1 }}>·</div>
    </FadeIn>
    <FadeIn delay={0.3}>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px, 5.5vw, 34px)',
        fontWeight: 400, lineHeight: 1.25, margin: '0 0 28px',
        maxWidth: 460, letterSpacing: '-0.01em' }}>
        Respira.<br /><Em>No estás sola.</Em>
      </h2>
    </FadeIn>
    <FadeIn delay={0.7}>
      <p style={{ color: c.textSoft, fontSize: 16, lineHeight: 1.7,
        maxWidth: 440, margin: '0 0 40px' }}>
        <strong style={{ color: c.text, fontWeight: 500 }}>73,4%</strong> de las mujeres que responden como tú sienten que necesitan hacer algo antes de que sea tarde — y la mayoría no sabe por dónde empezar.
      </p>
    </FadeIn>
    <FadeIn delay={1.0}>
      <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
        color: c.gold, fontSize: 17, marginBottom: 36 }}>
        Vamos a descubrirlo juntas.
      </p>
    </FadeIn>
    <FadeIn delay={1.3}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <PrimaryButton onClick={onNext}>Continuar →</PrimaryButton>
      </div>
    </FadeIn>
  </div>
);

// ========================================================================
// TELA 4 — Q3: TENTATIVAS
// ========================================================================
const Q3 = ({ v, onSel }) => (
  <div style={{ paddingTop: 24 }}>
    <ScreenTitle eyebrow="Pregunta 03">
      ¿Has intentado <Em>hablar abiertamente</Em> con él sobre lo que sientes?
    </ScreenTitle>
    <FadeIn delay={0.2}>
      <div>{[
        'Sí, muchas veces — y él no cambia',
        'Sí, pero solo empeora cuando hablo',
        'Tengo miedo de su reacción',
        'Todavía no he tenido el valor',
      ].map((opt, i) => (
        <OptionCard key={opt} idx={i+1} label={opt} sel={v === opt} onClick={() => onSel(opt)} />
      ))}</div>
    </FadeIn>
  </div>
);

// ========================================================================
// TELA 5 — VIDEO DEL MEDIO (HeyGen — Especialista)
// ========================================================================
const VideoMiddle = ({ onNext }) => (
  <div style={{ paddingTop: 24 }}>
    <FadeIn>
      <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
        color: c.gold, fontWeight: 500, marginBottom: 16 }}>
        Pausa · Mensaje de la Especialista
      </div>
    </FadeIn>
    <FadeIn delay={0.1}>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(22px, 4.8vw, 28px)',
        fontWeight: 400, lineHeight: 1.25, margin: '0 0 24px', letterSpacing: '-0.01em' }}>
        Antes de la siguiente pregunta, necesito decirte algo que <Em>puede cambiarlo todo.</Em>
      </h2>
    </FadeIn>
    <FadeIn delay={0.2}>
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '9 / 16',
        maxWidth: 380, margin: '0 auto 28px',
        background: `linear-gradient(180deg, #2a1f17 0%, #1a1310 100%)`,
        border: `1px solid ${c.border}`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', overflow: 'hidden',
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          border: `2px solid ${c.gold}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16, background: `${c.gold}15`,
        }}>
          <span style={{ color: c.gold, fontSize: 22, marginLeft: 4 }}>▶</span>
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          color: c.goldBright, fontSize: 14, letterSpacing: '0.1em', marginBottom: 6 }}>
          [ VIDEO DE LA ESPECIALISTA ]
        </div>
        <div style={{ color: c.textDim, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          ~3 min · Avatar HeyGen + B-roll Veo3
        </div>
        <div style={{
          position: 'absolute', bottom: 16, left: 16, right: 16,
          padding: '12px 14px', background: '#00000095',
          border: `1px solid ${c.borderSoft}`,
          fontSize: 10.5, color: c.textSoft, lineHeight: 1.55, textAlign: 'left',
        }}>
          <strong style={{ color: c.gold, display: 'block', marginBottom: 4,
            fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Guión voz off (español neutro)
          </strong>
          "Espera. Antes de la siguiente pregunta, necesito decirte algo. Soy [nombre], terapeuta de parejas hace [X] años, y he atendido a más de 12.000 mujeres exactamente donde tú estás. Yo también estuve ahí... Lo que descubrí: el problema casi nunca es falta de amor. Es un <em style={{ color: c.goldBright }}>bloqueo específico</em>, con nombre y solución. En las próximas 3 preguntas voy a identificar el tuyo. Necesito honestidad total."
        </div>
      </div>
    </FadeIn>
    <FadeIn delay={0.35}>
      <p style={{ color: c.textSoft, fontSize: 14, lineHeight: 1.65, textAlign: 'center',
        margin: '0 0 28px', fontStyle: 'italic', fontFamily: "'Fraunces', serif" }}>
        Mira el video completo antes de seguir.<br/>
        Lo que viene solo tiene sentido después de esto.
      </p>
    </FadeIn>
    <FadeIn delay={0.5}>
      <PrimaryButton onClick={onNext}>Ya lo Vi, Continuar →</PrimaryButton>
    </FadeIn>
  </div>
);

// ========================================================================
// TELA 6 — Q4: COMPROMETIMENTO
// ========================================================================
const Q4 = ({ v, onSel }) => (
  <div style={{ paddingTop: 24 }}>
    <ScreenTitle eyebrow="Pregunta 04">
      Si existiera un <Em>camino comprobado</Em> para reavivar tu matrimonio en 30 días con aplicación diaria, ¿te comprometerías?
    </ScreenTitle>
    <FadeIn delay={0.2}>
      <div>{[
        'Sí, haría lo que fuera por recuperar lo que tengo',
        'Sí, si es algo realista y no imposible',
        'Tal vez, depende de lo que implique',
        'Ya no estoy segura de si lo quiero',
      ].map((opt, i) => (
        <OptionCard key={opt} idx={i+1} label={opt} sel={v === opt} onClick={() => onSel(opt)} />
      ))}</div>
    </FadeIn>
  </div>
);

// ========================================================================
// TELA 7 — Q5: URGÊNCIA
// ========================================================================
const Q5 = ({ v, onSel }) => (
  <div style={{ paddingTop: 24 }}>
    <ScreenTitle eyebrow="Pregunta 05 · La última">
      Siendo honesta contigo misma: <Em>¿cuánto tiempo</Em> aguanta tu matrimonio así como está?
    </ScreenTitle>
    <FadeIn delay={0.2}>
      <div>{[
        'Menos de 3 meses',
        'Tal vez unos 6 meses',
        'Un año, como máximo',
        'No quiero ni pensarlo...',
      ].map((opt, i) => (
        <OptionCard key={opt} idx={i+1} label={opt} sel={v === opt} onClick={() => onSel(opt)} />
      ))}</div>
    </FadeIn>
  </div>
);

// ========================================================================
// TELA 8 — CAPTURA
// ========================================================================
const Capture = ({ a, setName, setPhone, onSubmit }) => {
  const valid = a.name.trim().length >= 2 && a.phone.replace(/\D/g, '').length >= 8;
  const inputStyle = {
    width: '100%', padding: '16px 18px', background: 'transparent',
    border: `1px solid ${c.border}`, color: c.text, fontSize: 16,
    fontFamily: "'Manrope', sans-serif", outline: 'none', borderRadius: 2,
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  };
  const labelStyle = {
    display: 'block', fontSize: 11, letterSpacing: '0.2em',
    textTransform: 'uppercase', color: c.gold, marginBottom: 8, fontWeight: 500,
  };
  return (
    <div style={{ paddingTop: 24 }}>
      <ScreenTitle eyebrow="Casi listo">
        Todo listo. Vamos a preparar tu <Em>diagnóstico personalizado.</Em>
      </ScreenTitle>
      <FadeIn delay={0.2}>
        <p style={{ color: c.textSoft, marginTop: -16, marginBottom: 32, fontSize: 15, lineHeight: 1.6 }}>
          Te vamos a enviar tu resultado completo y un contenido de regalo, incluso si no haces nada más después de esto. Sin spam, prometido.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Tu nombre</label>
          <input type="text" value={a.name} onChange={(e) => setName(e.target.value)}
            placeholder="¿Cómo te llamas?" style={inputStyle}
            onFocus={e => e.target.style.borderColor = c.gold}
            onBlur={e => e.target.style.borderColor = c.border} />
        </div>
      </FadeIn>
      <FadeIn delay={0.4}>
        <div style={{ marginBottom: 28 }}>
          <label style={labelStyle}>WhatsApp (con código de país)</label>
          <input type="tel" value={a.phone} onChange={(e) => setPhone(e.target.value)}
            placeholder="+52 1 55 0000 0000" style={inputStyle}
            onFocus={e => e.target.style.borderColor = c.gold}
            onBlur={e => e.target.style.borderColor = c.border} />
        </div>
      </FadeIn>
      <FadeIn delay={0.5}>
        <PrimaryButton onClick={onSubmit} disabled={!valid}>Ver mi Diagnóstico →</PrimaryButton>
        <div style={{ marginTop: 18, padding: '12px 14px', background: c.bgSoft,
          border: `1px solid ${c.borderSoft}`, fontSize: 11, color: c.textDim,
          lineHeight: 1.6, textAlign: 'center' }}>
          🔒 Tus datos están protegidos. No compartimos con nadie.
        </div>
      </FadeIn>
    </div>
  );
};

// ========================================================================
// TELA 9 — LOADING
// ========================================================================
const Loading = () => {
  const [step, setStep] = useState(0);
  const steps = [
    'Analizando patrones emocionales',
    'Comparando con 12.847 casos reales',
    'Identificando tu bloqueo específico',
    'Generando plan personalizado',
  ];
  useEffect(() => {
    const t = setInterval(() => setStep(s => Math.min(s + 1, steps.length)), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ paddingTop: '15vh', minHeight: '60vh', textAlign: 'center' }}>
      <FadeIn>
        <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 500, marginBottom: 20 }}>
          Procesando · Espera un momento
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px, 5vw, 32px)',
          fontWeight: 400, margin: '0 0 48px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
          Preparando tu <Em>diagnóstico</Em>...
        </h2>
      </FadeIn>
      <div style={{ maxWidth: 380, margin: '0 auto', textAlign: 'left' }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 0',
            borderBottom: i < steps.length - 1 ? `1px solid ${c.borderSoft}` : 'none',
            opacity: i <= step ? 1 : 0.3, transition: 'opacity 0.4s' }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%',
              border: `1.5px solid ${i < step ? c.gold : c.textDim}`,
              background: i < step ? c.gold : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, animation: i === step ? 'pulse 1s ease-in-out infinite' : 'none',
            }}>{i < step && <span style={{ color: c.bg, fontSize: 10, fontWeight: 700 }}>✓</span>}</div>
            <span style={{ fontSize: 14, color: i <= step ? c.text : c.textDim }}>
              {s}{i === step ? '...' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ========================================================================
// TELA 10 — RESULTADO
// ========================================================================
const Result = ({ name, onNext }) => {
  const fn = (name || '').split(' ')[0] || '';
  return (
    <div style={{ paddingTop: 24 }}>
      <FadeIn>
        <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 500, marginBottom: 14 }}>
          Diagnóstico Completado
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px, 5.5vw, 34px)',
          fontWeight: 400, lineHeight: 1.2, margin: '0 0 28px', letterSpacing: '-0.01em' }}>
          {fn ? `${fn}, tu` : 'Tu'} diagnóstico está listo.
        </h1>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div style={{
          padding: '28px 24px', border: `1px solid ${c.gold}`,
          background: `linear-gradient(135deg, ${c.gold}15 0%, ${c.rose}10 100%)`,
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: c.gold, marginBottom: 10, fontWeight: 600 }}>Tu Perfil</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 400,
            margin: '0 0 8px', color: c.text, letterSpacing: '-0.01em' }}>
            ZONA CRÍTICA
          </h2>
          <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            color: c.goldBright, fontSize: 15, margin: 0 }}>
            Bloqueo de Conexión Emocional
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.45}>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: c.text, marginBottom: 20 }}>
          {fn && `${fn}, `}según tus respuestas, estás en la etapa donde <strong style={{ color: c.gold, fontWeight: 500 }}>la desconexión ya se siente a diario</strong>, pero todavía existe espacio para revertirla — siempre que se actúe sobre el bloqueo correcto.
        </p>
      </FadeIn>
      <FadeIn delay={0.55}>
        <div style={{ padding: 20, background: c.bgSoft, border: `1px solid ${c.borderSoft}`, marginBottom: 20 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            color: c.gold, fontSize: 13, marginBottom: 12, letterSpacing: '0.05em' }}>
            La buena noticia
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: c.text, margin: 0 }}>
            <strong style={{ color: c.gold, fontWeight: 600 }}>78% de las mujeres en Zona Crítica</strong> logran revertir completamente el cuadro en hasta 60 días — siempre que actúen sobre el bloqueo correcto, y no sobre los síntomas.
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.65}>
        <div style={{ padding: 20, background: `${c.danger}10`,
          border: `1px solid ${c.danger}40`, marginBottom: 28 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            color: c.danger, fontSize: 13, marginBottom: 12, letterSpacing: '0.05em' }}>
            Lo que NO va a funcionar
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.8, color: c.textSoft }}>
            <li>Hablar más (él ya se desconectó de la conversación)</li>
            <li>Darle más espacio (aumenta la distancia)</li>
            <li>Terapia de pareja genérica en esta etapa</li>
            <li>Fingir que todo está bien y esperar que pase</li>
          </ul>
        </div>
      </FadeIn>
      <FadeIn delay={0.75}>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: c.text, marginBottom: 28 }}>
          Existe <strong style={{ color: c.gold, fontWeight: 500 }}>un camino específico</strong> para mujeres en tu perfil. No es genérico, no es "común". Fue diseñado exactamente para la etapa en que estás ahora.
        </p>
      </FadeIn>
      <FadeIn delay={0.85}>
        <PrimaryButton onClick={onNext}>Ver mi Plan Personalizado →</PrimaryButton>
      </FadeIn>
    </div>
  );
};

// ========================================================================
// TELA 11 — ANCORAGEM DE PREÇO
// ========================================================================
const PriceAnchor = ({ onNext }) => (
  <div style={{ paddingTop: 24 }}>
    <FadeIn>
      <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
        color: c.gold, fontWeight: 500, marginBottom: 14 }}>
        Antes de mostrarte el plan
      </div>
    </FadeIn>
    <FadeIn delay={0.1}>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 6vw, 36px)',
        fontWeight: 400, lineHeight: 1.15, margin: '0 0 28px', letterSpacing: '-0.015em' }}>
        Una pregunta honesta: <br/>
        <Em>¿cuánto vale tu matrimonio?</Em>
      </h1>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p style={{ fontSize: 16, lineHeight: 1.7, color: c.textSoft, marginBottom: 32 }}>
        No es retórica. Es matemática. Esto es lo que la mayoría termina pagando — después de meses esperando que las cosas mejoren solas:
      </p>
    </FadeIn>
    <FadeIn delay={0.3}>
      <div style={{ marginBottom: 32 }}>
        {[
          { label: '1 sesión de terapia de pareja', value: '$80 — $150' },
          { label: '6 meses de terapia (mínimo recomendado)', value: '$1.200 — $2.400' },
          { label: 'Curso online tradicional con coach', value: '$200 — $500' },
          { label: 'Costo promedio de un divorcio', value: '$5.000 — $15.000' },
          { label: 'Impacto emocional en los hijos', value: 'Incalculable' },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            gap: 16, padding: '16px 0',
            borderBottom: i < 4 ? `1px solid ${c.borderSoft}` : 'none',
          }}>
            <div style={{ fontSize: 14, color: c.text, lineHeight: 1.4, flex: 1 }}>{item.label}</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
              fontSize: 14, color: c.danger, flexShrink: 0, textAlign: 'right' }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
    <FadeIn delay={0.45}>
      <div style={{
        padding: 24,
        background: `linear-gradient(135deg, ${c.gold}10 0%, ${c.bg} 100%)`,
        border: `1px solid ${c.gold}40`, marginBottom: 28, textAlign: 'center',
      }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          fontSize: 16, color: c.text, lineHeight: 1.6, marginBottom: 12 }}>
          "El costo de esperar siempre es más alto que el costo de actuar."
        </div>
        <div style={{ fontSize: 11, color: c.textDim, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          — Centro R.E.C.
        </div>
      </div>
    </FadeIn>
    <FadeIn delay={0.55}>
      <p style={{ fontSize: 16, lineHeight: 1.7, color: c.text, marginBottom: 28 }}>
        El Método R.E.C. existe para que ese no sea tu camino. Por una <strong style={{ color: c.gold, fontWeight: 500 }}>fracción del costo de una sola sesión de terapia</strong>, vas a recibir el sistema completo — diseñado específicamente para mujeres en <Em>Zona Crítica</Em>.
      </p>
    </FadeIn>
    <FadeIn delay={0.7}>
      <PrimaryButton onClick={onNext}>Mostrar mi Plan →</PrimaryButton>
    </FadeIn>
  </div>
);

// ========================================================================
// TELA 12 — OFERTA
// ========================================================================
const Offer = ({ onBuy }) => {
  // ============ REVELACIÓN PROGRESIVA ============
  // En producción: cambiar 5000 por el tiempo (en ms) donde tu VSL
  // empieza a presentar la oferta. Para VSL de 4-6 min, suele ser entre
  // 150000 (2:30) y 240000 (4:00).
  const REVEAL_DELAY_MS = 5000;
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), REVEAL_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const items = [
    { title: 'Ebook "Método R.E.C." completo', desc: 'El paso a paso de las 3 fases para reavivar la conexión emocional en 30 días. 120 páginas, sin relleno.', value: '$97' },
    { title: 'Planner Diario de 30 días', desc: 'Workbook con ejercicios paso a paso, espacios para registrar avances y reflexiones diarias.', value: '$47' },
    { title: 'Bonus 1: Guía de Primeros Auxilios Emocionales', desc: 'Qué hacer en las primeras 72 horas si la situación está crítica. Para aplicar HOY mismo.', value: '$27' },
    { title: 'Bonus 2: Mapa de Comunicación de Pareja', desc: 'Infografía PDF que identifica los 5 estilos de comunicación y cómo adaptarte al de él.', value: '$19' },
    { title: 'Bonus 3: Calendario Visual de la Reconexión', desc: 'Tu progreso en una sola página. Imprimible, para pegar en un lugar visible cada día.', value: '$17' },
  ];
  const stack = items.reduce((sum, it) => sum + parseInt(it.value.replace(/\D/g, '')), 0);
  const price = 27;

  return (
    <div style={{ paddingTop: 24 }}>
      {/* HEADER + VSL — siempre visibles */}
      <FadeIn>
        <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 500, marginBottom: 14, textAlign: 'center' }}>
          Tu Plan · Método R.E.C.
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 6vw, 36px)',
          fontWeight: 400, lineHeight: 1.15, textAlign: 'center',
          margin: '0 0 28px', letterSpacing: '-0.015em' }}>
          El camino para mujeres en <Em>Zona Crítica</Em>
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div style={{
          position: 'relative', width: '100%', aspectRatio: '16 / 9',
          background: `linear-gradient(180deg, #3a2820 0%, #241813 100%)`,
          border: `1px solid ${c.border}`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', marginBottom: 24,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            border: `2px solid ${c.gold}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 14, background: `${c.gold}15`,
          }}>
            <span style={{ color: c.gold, fontSize: 26, marginLeft: 4 }}>▶</span>
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            color: c.goldBright, fontSize: 13, letterSpacing: '0.1em', marginBottom: 4 }}>
            [ VSL DE OFERTA ]
          </div>
          <div style={{ color: c.textDim, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            4-6 min · Avatar HeyGen presenta el método
          </div>
        </div>
      </FadeIn>

      {/* MENSAJE MIENTRAS EL RESTO ESTÁ OCULTO */}
      {!revealed && (
        <FadeIn delay={0.3}>
          <div style={{
            padding: '32px 24px', textAlign: 'center',
            background: c.bgSoft, border: `1px solid ${c.borderSoft}`,
            marginBottom: 20,
          }}>
            <div style={{
              fontFamily: "'Fraunces', serif", fontStyle: 'italic',
              fontSize: 17, color: c.gold, marginBottom: 10, lineHeight: 1.4,
            }}>
              Mira el video hasta el final.
            </div>
            <div style={{ fontSize: 13, color: c.textSoft, lineHeight: 1.6 }}>
              Tu plan completo aparece automáticamente cuando llegues a la parte importante.
            </div>
            <div style={{
              marginTop: 20, display: 'flex', justifyContent: 'center', gap: 6,
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: c.gold,
                  animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {/* CONTENIDO REVELADO */}
      {revealed && (
        <>
          <FadeIn>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500,
              margin: '24px 0 20px', letterSpacing: '-0.01em' }}>
              Lo que recibes hoy:
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ marginBottom: 24 }}>
              {items.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 14, padding: '16px 0',
                  borderBottom: i < items.length - 1 ? `1px solid ${c.borderSoft}` : 'none',
                }}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                    fontSize: 13, color: c.gold, flexShrink: 0, width: 24, paddingTop: 2 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: c.textSoft, lineHeight: 1.55 }}>{item.desc}</div>
                  </div>
                  <div style={{ fontSize: 12, color: c.textDim, textDecoration: 'line-through', flexShrink: 0 }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{
              padding: '16px 20px',
              background: `linear-gradient(90deg, ${c.bgDeep} 0%, ${c.bgSoft} 100%)`,
              border: `1px solid ${c.borderSoft}`, borderLeft: `2px solid ${c.danger}`,
              marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ fontSize: 12, color: c.textSoft, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Valor total
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                fontSize: 24, color: c.text, textDecoration: 'line-through', textDecorationColor: c.danger, textDecorationThickness: 1.5 }}>
                ${stack}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
              color: c.gold, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: 16, textAlign: 'center' }}>
              Quien ya aplicó
            </div>
            <div style={{ marginBottom: 32 }}>
              {[
                { quote: 'En 23 días, mi marido me invitó a cenar fuera por primera vez en más de un año. Lloré.', author: 'Marina S.', meta: 'Casada hace 8 años · Colombia' },
                { quote: 'Estaba a punto de pedir el divorcio. Hoy estamos empezando de nuevo — y está MEJOR que antes.', author: 'Camila R.', meta: 'Casada hace 11 años · México' },
                { quote: 'El método es diferente. No es "darle espacio" ni "valorarte". Es algo que nadie habla en otro lado.', author: 'Leticia M.', meta: 'Casada hace 6 años · Argentina' },
              ].map((t, i) => (
                <div key={i} style={{
                  padding: 20,
                  background: i % 2 === 0
                    ? `linear-gradient(135deg, ${c.bgWarm} 0%, ${c.bgSoft} 100%)`
                    : `linear-gradient(135deg, ${c.bgSoft} 0%, ${c.bgDeep} 100%)`,
                  border: `1px solid ${c.borderSoft}`, marginBottom: 12,
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', top: 10, left: 16,
                    fontFamily: "'Fraunces', serif", fontSize: 42,
                    color: c.gold, opacity: 0.25, lineHeight: 0.5, fontStyle: 'italic',
                  }}>"</div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                    fontSize: 15, lineHeight: 1.6, color: c.text, marginBottom: 14, paddingLeft: 14 }}>
                    {t.quote}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 14 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${c.gold} 0%, ${c.rose} 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Fraunces', serif", fontSize: 13, color: c.bg, fontWeight: 600,
                    }}>{t.author[0]}</div>
                    <div>
                      <div style={{ fontSize: 13, color: c.text, fontWeight: 500 }}>{t.author}</div>
                      <div style={{ fontSize: 10.5, color: c.textDim, letterSpacing: '0.05em', marginTop: 2 }}>{t.meta}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, padding: '6px 10px', background: c.bgDeep,
                    fontSize: 10, color: c.textDim, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    [ Foto del testimonio — Midjourney o real ]
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* ============ CAJA DE OFERTA PREMIUM ============ */}
          <FadeIn delay={0.4}>
            <div style={{
              position: 'relative',
              padding: '40px 28px 32px',
              background: `
                radial-gradient(ellipse at top, ${c.gold}18 0%, transparent 60%),
                linear-gradient(180deg, ${c.bgWarm} 0%, ${c.bgDeep} 100%)
              `,
              border: `1px solid ${c.borderGold}`,
              textAlign: 'center', marginBottom: 24,
              boxShadow: `
                0 20px 60px ${c.shadow}cc,
                0 0 80px ${c.gold}15,
                inset 0 1px 0 ${c.goldBright}30
              `,
            }}>
              {/* Ornamentos decorativos nos cantos */}
              {[
                { top: 10, left: 10, b: 'top left' },
                { top: 10, right: 10, b: 'top right' },
                { bottom: 10, left: 10, b: 'bottom left' },
                { bottom: 10, right: 10, b: 'bottom right' },
              ].map((pos, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  ...pos,
                  width: 18, height: 18,
                  borderTop: pos.top !== undefined ? `1px solid ${c.gold}` : 'none',
                  borderBottom: pos.bottom !== undefined ? `1px solid ${c.gold}` : 'none',
                  borderLeft: pos.left !== undefined ? `1px solid ${c.gold}` : 'none',
                  borderRight: pos.right !== undefined ? `1px solid ${c.gold}` : 'none',
                  opacity: 0.6,
                }} />
              ))}

              {/* Linha decorativa superior */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 12, marginBottom: 16,
              }}>
                <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, transparent, ${c.gold})` }} />
                <div style={{ color: c.gold, fontSize: 10 }}>✦</div>
                <div style={{ height: 1, width: 32, background: `linear-gradient(90deg, ${c.gold}, transparent)` }} />
              </div>

              <div style={{
                fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase',
                color: c.gold, fontWeight: 600, marginBottom: 24,
              }}>
                Oferta del Diagnóstico
              </div>

              <div style={{
                fontSize: 13, color: c.textSoft, marginBottom: 4,
                fontFamily: "'Fraunces', serif", fontStyle: 'italic',
              }}>
                De
              </div>
              <div style={{
                fontFamily: "'Fraunces', serif", fontSize: 22, color: c.textSoft,
                textDecoration: 'line-through', textDecorationColor: c.danger,
                textDecorationThickness: 1.5, marginBottom: 18, fontStyle: 'italic',
              }}>
                ${stack}
              </div>

              <div style={{
                fontSize: 12, color: c.gold, marginBottom: 8,
                letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500,
              }}>
                Hoy, por solo
              </div>

              <div style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 'clamp(72px, 18vw, 92px)',
                fontWeight: 400, lineHeight: 0.95,
                marginBottom: 12, letterSpacing: '-0.04em',
                background: `linear-gradient(135deg, ${c.goldDeep} 0%, ${c.goldBright} 45%, ${c.gold} 55%, ${c.goldDeep} 100%)`,
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'price-shimmer 4s ease-in-out infinite',
                filter: `drop-shadow(0 4px 20px ${c.gold}40)`,
              }}>
                ${price}
              </div>

              <div style={{ fontSize: 13, color: c.textSoft, marginBottom: 8, fontStyle: 'italic', fontFamily: "'Fraunces', serif" }}>
                o en 12 cuotas sin interés
              </div>

              <div style={{
                display: 'inline-block',
                padding: '6px 14px',
                background: `${c.gold}15`,
                border: `1px solid ${c.gold}40`,
                fontSize: 11, color: c.goldGlow,
                marginBottom: 28, letterSpacing: '0.04em',
              }}>
                Equivale a <strong style={{ color: c.goldBright }}>menos del 25%</strong> de una sesión de terapia
              </div>

              <BuyButton onClick={onBuy} subtitle="Acceso inmediato · Sin compromiso">
                Acceder al Método
              </BuyButton>

              <div style={{
                marginTop: 24,
                display: 'flex', justifyContent: 'center',
                gap: 18, flexWrap: 'wrap',
                fontSize: 11, color: c.textDim, letterSpacing: '0.05em',
              }}>
                <span>🔒 Pago seguro</span>
                <span style={{ color: c.borderSoft }}>·</span>
                <span>⚡ Acceso al instante</span>
                <span style={{ color: c.borderSoft }}>·</span>
                <span>✓ Garantía 30 días</span>
              </div>
            </div>
          </FadeIn>

          {/* ============ GARANTIA PREMIUM ============ */}
          <FadeIn delay={0.5}>
            <div style={{
              position: 'relative',
              padding: '28px 24px',
              background: `linear-gradient(135deg, ${c.bgWarm} 0%, ${c.bgSoft} 100%)`,
              border: `1px solid ${c.borderGold}`,
              borderLeft: `3px solid ${c.gold}`,
              display: 'flex', gap: 20, alignItems: 'flex-start',
            }}>
              <div style={{
                flexShrink: 0,
                width: 64, height: 64, borderRadius: '50%',
                background: `radial-gradient(circle, ${c.gold}30 0%, ${c.gold}10 70%, transparent 100%)`,
                border: `2px solid ${c.gold}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 24px ${c.gold}40, inset 0 0 12px ${c.gold}20`,
              }}>
                <span style={{ color: c.goldBright, fontSize: 28, fontWeight: 300 }}>✓</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: c.gold, fontWeight: 600, marginBottom: 6,
                }}>
                  Garantía Blindada
                </div>
                <div style={{
                  fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                  color: c.text, fontSize: 20, marginBottom: 10, letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}>
                  30 días para probarlo, <em style={{ color: c.gold }}>sin riesgo.</em>
                </div>
                <div style={{ fontSize: 13, color: c.textSoft, lineHeight: 1.65 }}>
                  Aplica el método completo. Si no sientes ningún cambio en la conexión, escríbenos y te devolvemos el 100%. Sin preguntas, sin papeleo.
                </div>
              </div>
            </div>
          </FadeIn>
        </>
      )}
    </div>
  );
};

// ========================================================================
// TELA 13 — CHECKOUT
// ========================================================================
const Checkout = ({ onComplete }) => (
  <div style={{ paddingTop: 24 }}>
    <FadeIn>
      <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
        color: c.gold, fontWeight: 500, marginBottom: 14, textAlign: 'center' }}>
        Finalizando tu acceso
      </div>
    </FadeIn>
    <FadeIn delay={0.1}>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(24px, 5vw, 30px)',
        fontWeight: 400, textAlign: 'center',
        margin: '0 0 28px', letterSpacing: '-0.01em' }}>
        Estás a <Em>un paso</Em>.
      </h1>
    </FadeIn>
    <FadeIn delay={0.2}>
      <div style={{
        padding: 28, border: `1px solid ${c.gold}`,
        background: `${c.gold}10`, textAlign: 'center', marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, color: c.textSoft, marginBottom: 16, letterSpacing: '0.05em' }}>
          [ AQUÍ VA EL IFRAME DEL CHECKOUT DE HOTMART / KIWIFY ]
        </div>
        <div style={{ padding: 40, background: c.bg, border: `1px dashed ${c.border}`,
          fontSize: 12, color: c.textDim, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Embed del Checkout
        </div>
      </div>
    </FadeIn>
    <FadeIn delay={0.3}>
      <div style={{
        padding: 18, background: c.bgSoft,
        border: `1px solid ${c.gold}60`, marginBottom: 14,
      }}>
        <label style={{ display: 'flex', gap: 14, cursor: 'pointer' }}>
          <input type="checkbox" style={{ marginTop: 4, accentColor: c.gold }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, color: c.gold,
              letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              + ORDER BUMP · $47 → $19
            </div>
            <div style={{ fontSize: 14, color: c.text, marginBottom: 6, fontWeight: 500 }}>
              Audios Guiados de Reconexión + Audiolibro Premium
            </div>
            <div style={{ fontSize: 13, color: c.textSoft, lineHeight: 1.5 }}>
              5 audios guiados (12-18 min cada uno) para escuchar en los momentos más difíciles. Más el audiolibro narrado completo en español, ideal para escuchar mientras trabajas o conduces.
            </div>
          </div>
        </label>
      </div>
    </FadeIn>
    <FadeIn delay={0.35}>
      <PrimaryButton onClick={onComplete}>Simular Compra Exitosa →</PrimaryButton>
    </FadeIn>
    <FadeIn delay={0.4}>
      <div style={{ marginTop: 18, textAlign: 'center', fontSize: 11, color: c.textDim,
        letterSpacing: '0.05em', lineHeight: 1.7 }}>
        🔒 Compra 100% segura · Acceso inmediato después del pago<br/>
        Garantía incondicional de 30 días
      </div>
    </FadeIn>
  </div>
);

// ========================================================================
// TELA 14 — UPSELL (Cartas y Guiones)
// ========================================================================
const Upsell = ({ onAccept, onDecline }) => (
  <div style={{ paddingTop: 24 }}>
    <FadeIn>
      <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
        color: c.success, fontWeight: 500, marginBottom: 14, textAlign: 'center' }}>
        ✓ Compra Confirmada · Espera...
      </div>
    </FadeIn>
    <FadeIn delay={0.1}>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px, 5.5vw, 34px)',
        fontWeight: 400, lineHeight: 1.15, textAlign: 'center',
        margin: '0 0 16px', letterSpacing: '-0.015em' }}>
        Espera, esto solo lo verás <Em>una vez</Em>.
      </h1>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p style={{ textAlign: 'center', fontSize: 16, color: c.textSoft,
        lineHeight: 1.6, marginBottom: 32 }}>
        Tienes el método. Ahora necesitas <strong style={{ color: c.text }}>las palabras exactas</strong> para los momentos críticos.
      </p>
    </FadeIn>
    <FadeIn delay={0.3}>
      <div style={{
        padding: 28, border: `2px solid ${c.gold}`,
        background: `linear-gradient(135deg, ${c.gold}15 0%, ${c.bg} 100%)`,
        marginBottom: 28,
      }}>
        <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 600, marginBottom: 12 }}>
          Oferta Única · Solo Aquí
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 500,
          margin: '0 0 16px', letterSpacing: '-0.01em' }}>
          Cartas y Guiones Listos para Usar
        </h2>
        <p style={{ fontSize: 14, color: c.textSoft, lineHeight: 1.65, marginBottom: 20 }}>
          30 mensajes y guiones de conversación escritos exactamente para los momentos donde no sabes qué decir — o tienes miedo de equivocarte:
        </p>
        <ul style={{ margin: '0 0 20px', paddingLeft: 18, fontSize: 14,
          lineHeight: 1.8, color: c.text }}>
          <li>Qué decirle después de una discusión grave</li>
          <li>Cómo iniciar una conversación cuando él está distante</li>
          <li>Mensajes para "reactivar" la conexión por WhatsApp</li>
          <li>Las palabras exactas si descubres una traición</li>
          <li>Cómo responder cuando él dice "necesito tiempo"</li>
          <li>Guiones para reconectar en fechas importantes</li>
        </ul>
        <div style={{ padding: '12px 14px', background: c.bgSoft,
          border: `1px solid ${c.borderSoft}`, marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: c.gold, marginBottom: 4, letterSpacing: '0.05em',
            fontFamily: "'Fraunces', serif", fontStyle: 'italic' }}>
            Por qué importa:
          </div>
          <div style={{ fontSize: 13, color: c.textSoft, lineHeight: 1.55 }}>
            El 67% de las mujeres que aplican el Método R.E.C. pierden oportunidades por <em style={{ color: c.text }}>no saber qué decir en el momento exacto</em>. Esto resuelve eso.
          </div>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: c.textSoft, marginBottom: 4,
            fontFamily: "'Fraunces', serif", fontStyle: 'italic' }}>
            Precio normal
          </div>
          <div style={{ fontSize: 18, color: c.textSoft, textDecoration: 'line-through',
            textDecorationColor: c.danger, marginBottom: 14, fontFamily: "'Fraunces', serif", fontStyle: 'italic' }}>
            $97
          </div>
          <div style={{ fontSize: 11, color: c.gold, marginBottom: 6,
            letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
            Solo aquí, por
          </div>
          <div style={{
            fontFamily: "'Fraunces', serif", fontSize: 64, fontWeight: 400,
            lineHeight: 1, letterSpacing: '-0.03em',
            background: `linear-gradient(135deg, ${c.goldDeep} 0%, ${c.goldBright} 50%, ${c.gold} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: `drop-shadow(0 2px 12px ${c.gold}40)`,
          }}>
            $47
          </div>
        </div>
        <BuyButton onClick={onAccept} subtitle="Agregar con un clic, sin volver a digitar tarjeta">
          Sí, Agregar a Mi Pedido
        </BuyButton>
      </div>
    </FadeIn>
    <FadeIn delay={0.4}>
      <GhostButton onClick={onDecline}>No gracias, continuar sin esto</GhostButton>
    </FadeIn>
    <FadeIn delay={0.5}>
      <div style={{ marginTop: 24, padding: 14, background: c.bgSoft,
        border: `1px solid ${c.borderSoft}`, fontSize: 11, color: c.textDim,
        textAlign: 'center', lineHeight: 1.6 }}>
        ⓘ Esta oferta NO se repetirá. Si sales ahora, no podrás acceder a este precio después.
      </div>
    </FadeIn>
  </div>
);

// ========================================================================
// TELA 15 — DOWNSELL (versión reducida)
// ========================================================================
const Downsell = ({ onAccept, onDecline }) => (
  <div style={{ paddingTop: 24 }}>
    <FadeIn>
      <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
        color: c.rose, fontWeight: 500, marginBottom: 14, textAlign: 'center' }}>
        Espera · Última Opción
      </div>
    </FadeIn>
    <FadeIn delay={0.1}>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(24px, 5.5vw, 32px)',
        fontWeight: 400, lineHeight: 1.2, textAlign: 'center',
        margin: '0 0 16px', letterSpacing: '-0.015em' }}>
        Entiendo que <Em>$47 no era el momento.</Em>
      </h1>
    </FadeIn>
    <FadeIn delay={0.2}>
      <p style={{ textAlign: 'center', fontSize: 16, color: c.textSoft,
        lineHeight: 1.6, marginBottom: 32 }}>
        Pero antes de irte, hay algo que sí necesitas tener — y a un precio que cualquiera puede permitirse.
      </p>
    </FadeIn>
    <FadeIn delay={0.3}>
      <div style={{
        padding: 28, border: `1.5px solid ${c.rose}`,
        background: `linear-gradient(135deg, ${c.rose}10 0%, ${c.bg} 100%)`,
        marginBottom: 28,
      }}>
        <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.rose, fontWeight: 600, marginBottom: 12 }}>
          Versión Esencial
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500,
          margin: '0 0 16px', letterSpacing: '-0.01em' }}>
          Los 7 Guiones Críticos
        </h2>
        <p style={{ fontSize: 14, color: c.textSoft, lineHeight: 1.65, marginBottom: 20 }}>
          De las 30 cartas, separamos las <strong style={{ color: c.text }}>7 más importantes</strong> — las que cubren los momentos donde un error de palabras puede destruir todo lo que construiste.
        </p>
        <ul style={{ margin: '0 0 24px', paddingLeft: 18, fontSize: 14,
          lineHeight: 1.8, color: c.text }}>
          <li>Después de una discusión grave</li>
          <li>Cuando él dice "necesito tiempo"</li>
          <li>Para reactivar la conexión por WhatsApp</li>
          <li>Si descubres una traición</li>
          <li>Cuando él se cierra emocionalmente</li>
          <li>Para reconectar en fechas importantes</li>
          <li>El primer mensaje después de los 30 días</li>
        </ul>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: c.textSoft, marginBottom: 4,
            fontFamily: "'Fraunces', serif", fontStyle: 'italic' }}>
            Antes
          </div>
          <div style={{ fontSize: 17, color: c.textSoft, textDecoration: 'line-through',
            textDecorationColor: c.danger, marginBottom: 14, fontFamily: "'Fraunces', serif", fontStyle: 'italic' }}>
            $47
          </div>
          <div style={{ fontSize: 11, color: c.rose, marginBottom: 6,
            letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
            Solo aquí, por
          </div>
          <div style={{
            fontFamily: "'Fraunces', serif", fontSize: 60, fontWeight: 400,
            lineHeight: 1, letterSpacing: '-0.03em',
            background: `linear-gradient(135deg, ${c.roseDeep} 0%, ${c.rose} 50%, ${c.goldBright} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: `drop-shadow(0 2px 10px ${c.rose}40)`,
          }}>
            $27
          </div>
        </div>
        <BuyButton onClick={onAccept} subtitle="Tu última oportunidad de llevarlo">
          Sí, Llevar los 7 Guiones
        </BuyButton>
      </div>
    </FadeIn>
    <FadeIn delay={0.4}>
      <GhostButton onClick={onDecline}>No gracias, ir directo a mi acceso</GhostButton>
    </FadeIn>
  </div>
);

// ========================================================================
// TELA 16 — THANK YOU
// ========================================================================
const ThankYou = () => (
  <div style={{ paddingTop: '8vh', textAlign: 'center' }}>
    <FadeIn>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        border: `2px solid ${c.gold}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 32px', background: `${c.gold}15`,
      }}>
        <span style={{ color: c.gold, fontSize: 30 }}>✓</span>
      </div>
    </FadeIn>
    <FadeIn delay={0.2}>
      <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
        color: c.gold, fontWeight: 500, marginBottom: 14 }}>
        Acceso Liberado
      </div>
    </FadeIn>
    <FadeIn delay={0.3}>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 6vw, 38px)',
        fontWeight: 400, lineHeight: 1.15,
        margin: '0 0 24px', letterSpacing: '-0.015em' }}>
        Bienvenida al <Em>Método R.E.C.</Em>
      </h1>
    </FadeIn>
    <FadeIn delay={0.4}>
      <p style={{ fontSize: 16, color: c.textSoft, lineHeight: 1.7,
        maxWidth: 480, margin: '0 auto 32px' }}>
        En los próximos 5 minutos vas a recibir todo en tu WhatsApp y email. Revisa tu bandeja de entrada (y la carpeta de spam, por las dudas).
      </p>
    </FadeIn>
    <FadeIn delay={0.5}>
      <div style={{
        padding: 24, background: c.bgSoft,
        border: `1px solid ${c.borderSoft}`,
        maxWidth: 480, margin: '0 auto', textAlign: 'left',
      }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          color: c.gold, fontSize: 13, marginBottom: 14, letterSpacing: '0.05em' }}>
          Tus próximos pasos:
        </div>
        <ol style={{ margin: 0, paddingLeft: 18, fontSize: 14,
          lineHeight: 1.9, color: c.text }}>
          <li>Descarga el ebook y el planner desde el email</li>
          <li>Lee la introducción HOY (15 minutos)</li>
          <li>Empieza el día 1 mañana por la mañana</li>
          <li>Aplica con disciplina los 30 días</li>
        </ol>
      </div>
    </FadeIn>
    <FadeIn delay={0.6}>
      <p style={{ marginTop: 32, fontFamily: "'Fraunces', serif", fontStyle: 'italic',
        color: c.gold, fontSize: 15 }}>
        El cambio empieza hoy.
      </p>
    </FadeIn>
  </div>
);
