import { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import BuyButton from '../components/BuyButton';
import Em from '../components/Em';
import { trackPurchaseIntent, trackOfferView } from '../lib/tracking';
import { STORAGE_KEY as QUIZ_STATE_KEY } from '../hooks/useQuizState';
import { getQueryParams } from '../lib/queryParams';

const OFFER_SEEN_KEY = 'metodorec_offer_seen';
const OFFER_SEEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

function readOfferSeen() {
  try {
    const raw = window.localStorage.getItem(OFFER_SEEN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.firstSeenAt !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeOfferSeen(payload) {
  try { window.localStorage.setItem(OFFER_SEEN_KEY, JSON.stringify(payload)); } catch {}
}

function arrivedViaQuizFlow() {
  try {
    const raw = window.localStorage.getItem(QUIZ_STATE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return typeof parsed?.currentStep === 'number' && parsed.currentStep >= 11;
  } catch {
    return false;
  }
}

// ============ REVELACIÓN PROGRESIVA ============
// En producción: cambiar este valor (en ms) para el tiempo donde tu VSL
// empieza a presentar la oferta. Para VSL de 4-6 min, suele ser entre
// 150000 (2:30) y 240000 (4:00).
const REVEAL_DELAY_MS = 195000;

const ITEMS = [
  { title: 'Ebook "Método R.E.C." completo', desc: 'El paso a paso de las 3 fases para reavivar la conexión emocional en 30 días. 120 páginas, sin relleno.', value: '$97' },
  { title: 'Planner Diario de 30 días', desc: 'Workbook con ejercicios paso a paso, espacios para registrar avances y reflexiones diarias.', value: '$47' },
  { title: 'Bonus 1: Guía de Primeros Auxilios Emocionales', desc: 'Qué hacer en las primeras 72 horas si la situación está crítica. Para aplicar HOY mismo.', value: '$27' },
  { title: 'Bonus 2: Mapa de Comunicación de Pareja', desc: 'Infografía PDF que identifica los 5 estilos de comunicación y cómo adaptarte al de él.', value: '$19' },
  { title: 'Bonus 3: Calendario Visual de la Reconexión', desc: 'Tu progreso en una sola página. Imprimible, para pegar en un lugar visible cada día.', value: '$17' },
];

const TESTIMONIALS = [
  { quote: 'En 23 días, mi marido me invitó a cenar fuera por primera vez en más de un año. Lloré.', author: 'Marina S.', meta: 'Casada hace 8 años · Colombia', photo: '/images/retratos/marina-s-colombia-40.png' },
  { quote: 'Estaba a punto de pedir el divorcio. Hoy estamos empezando de nuevo — y está MEJOR que antes.', author: 'Camila R.', meta: 'Casada hace 11 años · México', photo: '/images/retratos/camila-mexico-47.png' },
  { quote: 'El método es diferente. No es "darle espacio" ni "valorarte". Es algo que nadie habla en otro lado.', author: 'Leticia M.', meta: 'Casada hace 6 años · Argentina', photo: '/images/retratos/leticia-m-argentina-33.png' },
  { quote: 'Llevábamos meses sin tocarnos. Una tarde, después de aplicar la fase 2, mi marido me abrazó por la espalda en la cocina. Sin decir nada. Lloré.', author: 'Carolina', meta: 'Casada hace 9 años · Colombia', photo: '/images/retratos/carolina-colombia-38.png' },
  { quote: 'Pensé que ya no había nada que rescatar. El método me mostró que el problema no era él — era el patrón en el que ambos caímos. Hoy hablamos de verdad.', author: 'Patricia', meta: 'Casada hace 14 años · Chile', photo: '/images/retratos/patricia-chile-44.png' },
];

const SOCIAL_PROOF_PRINTS = [
  { src: '/images/prints/whatsapp-roberto-intima.png', alt: 'Conversación íntima con Roberto — WhatsApp' },
  { src: '/images/prints/whatsapp-mi-amor-gratidao.png', alt: 'Mensaje "Mi amor" de gratitud — WhatsApp' },
  { src: '/images/prints/instagram-story-camila.png', alt: 'Story de Camila — Instagram' },
  { src: '/images/prints/whatsapp-sofi-amiga.png', alt: 'Conversación con la amiga Sofi — WhatsApp' },
  { src: '/images/prints/instagram-comment-anabel.png', alt: 'Comentario de Anabel — Instagram' },
  { src: '/images/prints/whatsapp-patricia-audio.png', alt: 'Audio enviado por Patricia — WhatsApp' },
];

function CornerOrnaments({ color }) {
  return (
    <>
      {[
        { top: 12, left: 12 },
        { top: 12, right: 12 },
        { bottom: 12, left: 12 },
        { bottom: 12, right: 12 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...pos,
            width: 20,
            height: 20,
            borderTop: pos.top !== undefined ? `1.5px solid ${color}` : 'none',
            borderBottom: pos.bottom !== undefined ? `1.5px solid ${color}` : 'none',
            borderLeft: pos.left !== undefined ? `1.5px solid ${color}` : 'none',
            borderRight: pos.right !== undefined ? `1.5px solid ${color}` : 'none',
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

function GuaranteeSeal({ c, isLight }) {
  const ringColor = isLight ? c.goldDeep : c.gold;
  const innerBg = isLight ? c.bgWarm : `${c.gold}10`;
  return (
    <div
      style={{
        position: 'relative',
        width: 'clamp(120px, 28vw, 140px)',
        height: 'clamp(120px, 28vw, 140px)',
        flexShrink: 0,
      }}
    >
      {/* Anel externo decorativo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `2px solid ${ringColor}`,
          opacity: 0.4,
        }}
      />
      {/* Anel interno */}
      <div
        style={{
          position: 'absolute',
          inset: 8,
          borderRadius: '50%',
          border: `1px solid ${ringColor}`,
          background: `radial-gradient(circle, ${innerBg} 0%, transparent 80%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isLight
            ? `0 4px 16px ${c.shadow}15, inset 0 1px 2px rgba(255,255,255,0.5)`
            : `0 0 24px ${c.gold}40, inset 0 0 12px ${c.gold}20`,
        }}
      >
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(34px, 8vw, 40px)',
            fontWeight: 400,
            color: isLight ? c.goldDeep : c.goldBright,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          30
        </div>
        <div
          style={{
            fontSize: 9,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: isLight ? c.goldDeep : c.gold,
            fontWeight: 600,
            marginTop: 2,
          }}
        >
          días
        </div>
        <div
          style={{
            width: 22,
            height: 1,
            background: ringColor,
            margin: '6px 0 4px',
            opacity: 0.5,
          }}
        />
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic',
            fontSize: 11,
            color: c.textSoft,
            letterSpacing: '0.05em',
          }}
        >
          garantía
        </div>
      </div>
    </div>
  );
}

export default function Offer({ onBuy }) {
  const { c, isLight } = useTheme();

  const { nodelay } = getQueryParams();

  const decideInitialReveal = () => {
    if (nodelay) return true;
    const seen = readOfferSeen();
    const within30d = seen && Date.now() - seen.firstSeenAt < OFFER_SEEN_TTL_MS;
    return !!within30d;
  };

  const [revealed, setRevealed] = useState(decideInitialReveal);

  useEffect(() => {
    // ?nodelay=1 bypasses everything — view param, doesn't touch localStorage
    if (nodelay) {
      trackOfferView({ isFirstView: false, viewCount: 0, delaySkipped: true });
      return;
    }

    const seen = readOfferSeen();
    const within30d = seen && Date.now() - seen.firstSeenAt < OFFER_SEEN_TTL_MS;
    const viaQuiz = arrivedViaQuizFlow();

    if (within30d) {
      writeOfferSeen({ firstSeenAt: seen.firstSeenAt, viewCount: (seen.viewCount || 1) + 1 });
      trackOfferView({ isFirstView: false, viewCount: (seen.viewCount || 1) + 1, delaySkipped: true });
      return;
    }

    if (viaQuiz) {
      writeOfferSeen({ firstSeenAt: Date.now(), viewCount: 1 });
    }
    trackOfferView({ isFirstView: true, viewCount: 1, delaySkipped: false });

    const t = setTimeout(() => setRevealed(true), REVEAL_DELAY_MS);
    return () => clearTimeout(t);
  }, [nodelay]);

  const stack = ITEMS.reduce((sum, it) => sum + parseInt(it.value.replace(/\D/g, ''), 10), 0);
  const price = 27;

  const goldText = isLight ? c.goldDeep : c.gold;
  const priceGradient = isLight
    ? `linear-gradient(135deg, ${c.goldDeep} 0%, ${c.goldBright} 35%, #f6d8a3 50%, ${c.goldBright} 65%, ${c.goldDeep} 100%)`
    : `linear-gradient(135deg, ${c.goldDeep} 0%, ${c.goldBright} 45%, ${c.gold} 55%, ${c.goldDeep} 100%)`;

  return (
    <div style={{ paddingTop: 24 }}>
      <FadeIn>
        <div style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: goldText, fontWeight: 600, marginBottom: 14, textAlign: 'center',
        }}>
          Tu Plan · Método R.E.C.
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 6vw, 36px)',
          fontWeight: 400, lineHeight: 1.15, textAlign: 'center',
          margin: '0 0 28px', letterSpacing: '-0.015em', color: c.text,
        }}>
          El camino para mujeres en <Em>Zona Crítica</Em>
        </h1>
      </FadeIn>

      {/* VSL — Tynk.ai */}
      <FadeIn delay={0.2}>
        <div style={{
          position: 'relative', width: '100%', aspectRatio: '9 / 16',
          maxWidth: 420, margin: '0 auto 24px',
          background: '#000',
          border: `1px solid ${c.border}`,
          borderRadius: 12,
          boxShadow: isLight ? `0 12px 32px ${c.shadow}18` : 'none',
          overflow: 'hidden',
        }}>
          <iframe
            src="https://play.tynk.ai/embed/6310476e-80e4-4769-b08d-c3919eb202f5"
            title="VSL — Método R.E.C."
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              border: 0, display: 'block',
            }}
          />
        </div>
      </FadeIn>

      {!revealed && (
        <FadeIn delay={0.3}>
          <div style={{
            padding: '32px 24px', textAlign: 'center',
            background: c.bgSoft, border: `1px solid ${c.borderSoft}`,
            borderRadius: isLight ? 8 : 2,
            marginBottom: 20,
          }}>
            <div style={{
              fontFamily: "'Fraunces', serif", fontStyle: 'italic',
              fontSize: 17, color: goldText, marginBottom: 10, lineHeight: 1.4,
            }}>
              Mira el video hasta el final.
            </div>
            <div style={{ fontSize: 13, color: c.textSoft, lineHeight: 1.6 }}>
              Tu plan completo aparece automáticamente cuando llegues a la parte importante.
            </div>
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 6 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: goldText,
                  animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {revealed && (
        <>
          {/* Lista de itens */}
          <FadeIn>
            <h2 style={{
              fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500,
              margin: '24px 0 20px', letterSpacing: '-0.01em', color: c.text,
            }}>
              Lo que recibes hoy:
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ marginBottom: 24 }}>
              {ITEMS.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 14, padding: '18px 0',
                  borderBottom: i < ITEMS.length - 1 ? `1px solid ${c.borderSoft}` : 'none',
                }}>
                  <div style={{
                    fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                    fontSize: 13, color: goldText, flexShrink: 0, width: 24, paddingTop: 2,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: c.text }}>{item.title}</div>
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
              background: isLight
                ? `linear-gradient(90deg, ${c.bgWarm} 0%, ${c.bgSoft} 100%)`
                : `linear-gradient(90deg, ${c.bgDeep} 0%, ${c.bgSoft} 100%)`,
              border: `1px solid ${c.borderSoft}`,
              borderLeft: `3px solid ${c.danger}`,
              borderRadius: isLight ? 4 : 0,
              marginBottom: 32,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ fontSize: 12, color: c.textSoft, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Valor total
              </div>
              <div style={{
                fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                fontSize: 24, color: c.text, textDecoration: 'line-through',
                textDecorationColor: c.danger, textDecorationThickness: 1.5,
              }}>
                ${stack}
              </div>
            </div>
          </FadeIn>

          {/* Depoimentos */}
          <FadeIn delay={0.3}>
            <div style={{
              fontFamily: "'Fraunces', serif", fontStyle: 'italic',
              color: goldText, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase',
              marginBottom: 16, textAlign: 'center',
            }}>
              Quien ya aplicó
            </div>
            <div style={{ marginBottom: 36 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{
                  padding: '22px 22px 18px',
                  background: isLight
                    ? (i % 2 === 0 ? c.bgWarm : c.bgSoft)
                    : (i % 2 === 0
                        ? `linear-gradient(135deg, ${c.bgWarm} 0%, ${c.bgSoft} 100%)`
                        : `linear-gradient(135deg, ${c.bgSoft} 0%, ${c.bgDeep} 100%)`),
                  border: `1px solid ${c.borderSoft}`,
                  borderRadius: isLight ? 8 : 2,
                  marginBottom: 12,
                  position: 'relative',
                  boxShadow: isLight ? `0 4px 12px ${c.shadow}10` : 'none',
                }}>
                  <div style={{
                    position: 'absolute', top: 8, left: 18,
                    fontFamily: "'Fraunces', serif", fontSize: 48,
                    color: goldText, opacity: 0.25, lineHeight: 0.5, fontStyle: 'italic',
                  }}>"</div>
                  <div style={{
                    fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                    fontSize: 15, lineHeight: 1.6, color: c.text, marginBottom: 16, paddingLeft: 16,
                  }}>
                    {t.quote}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 16 }}>
                    <img
                      src={t.photo}
                      alt={t.author}
                      loading="lazy"
                      style={{
                        width: 34, height: 34, borderRadius: '50%',
                        objectFit: 'cover', flexShrink: 0,
                        border: `1px solid ${c.borderSoft}`,
                      }}
                    />
                    <div>
                      <div style={{ fontSize: 13, color: c.text, fontWeight: 500 }}>{t.author}</div>
                      <div style={{ fontSize: 10.5, color: c.textDim, letterSpacing: '0.05em', marginTop: 2 }}>{t.meta}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* ============ PROVA SOCIAL — PRINTS ============ */}
          <FadeIn delay={0.35}>
            <div style={{ padding: '48px 0' }}>
              <div style={{
                fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                color: goldText, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase',
                marginBottom: 10, textAlign: 'center',
              }}>
                Pruebas Reales
              </div>
              <h3 style={{
                fontFamily: "'Fraunces', serif", fontWeight: 400,
                fontSize: 'clamp(24px, 5.5vw, 30px)', lineHeight: 1.2,
                textAlign: 'center', margin: '0 0 28px', color: c.text,
                letterSpacing: '-0.01em',
              }}>
                <Em>Lo que están diciendo</Em>
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
                  gap: 16,
                  maxWidth: 720,
                  margin: '0 auto',
                }}
              >
                {SOCIAL_PROOF_PRINTS.map((p) => (
                  <div
                    key={p.src}
                    style={{
                      aspectRatio: '9 / 16',
                      maxHeight: 600,
                      background: isLight ? c.bgWarm : c.bgSoft,
                      border: `1px solid ${c.borderSoft}`,
                      borderRadius: isLight ? 8 : 2,
                      overflow: 'hidden',
                      boxShadow: isLight ? `0 4px 12px ${c.shadow}15` : `0 4px 16px rgba(0,0,0,0.3)`,
                    }}
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'contain', display: 'block',
                      }}
                    />
                  </div>
                ))}
              </div>
              <p style={{
                marginTop: 18, textAlign: 'center',
                fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                fontSize: 12, color: c.textDim, lineHeight: 1.5,
              }}>
                Capturas compartidas con autorización. Nombres modificados para proteger la identidad.
              </p>
            </div>
          </FadeIn>

          {/* ============ CAIXA DE PREÇO PREMIUM ============ */}
          <FadeIn delay={0.4}>
            <div style={{
              position: 'relative',
              padding: 'clamp(36px, 9vw, 48px) clamp(22px, 6vw, 32px) clamp(28px, 7vw, 36px)',
              background: isLight
                ? `radial-gradient(ellipse at top, ${c.bgWarm} 0%, ${c.bg} 60%, ${c.bgSoft} 100%)`
                : `radial-gradient(ellipse at top, ${c.gold}18 0%, transparent 60%), linear-gradient(180deg, ${c.bgWarm} 0%, ${c.bgDeep} 100%)`,
              border: `1px solid ${c.borderGold}`,
              borderRadius: isLight ? 12 : 2,
              textAlign: 'center',
              marginBottom: 28,
              boxShadow: c.shadowPremium,
              overflow: 'hidden',
            }}>
              {/* Borda interna sutil */}
              <div
                style={{
                  position: 'absolute',
                  inset: 6,
                  borderRadius: isLight ? 8 : 0,
                  border: `1px solid ${c.borderGold}`,
                  opacity: 0.3,
                  pointerEvents: 'none',
                }}
              />
              <CornerOrnaments color={goldText} />

              {/* Linha decorativa superior */}
              <div style={{
                position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 12, marginBottom: 18,
              }}>
                <div style={{ height: 1, width: 40, background: `linear-gradient(90deg, transparent, ${goldText})` }} />
                <div style={{ color: goldText, fontSize: 11 }}>✦</div>
                <div style={{ height: 1, width: 40, background: `linear-gradient(90deg, ${goldText}, transparent)` }} />
              </div>

              <div style={{
                position: 'relative',
                fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase',
                color: goldText, fontWeight: 700, marginBottom: 28,
              }}>
                Oferta del Diagnóstico
              </div>

              <div style={{
                position: 'relative',
                fontSize: 12, color: c.textSoft, marginBottom: 6,
                fontFamily: "'Fraunces', serif", fontStyle: 'italic',
              }}>
                De
              </div>
              <div style={{
                position: 'relative',
                fontFamily: "'Fraunces', serif", fontSize: 22, color: c.textSoft,
                textDecoration: 'line-through', textDecorationColor: c.danger,
                textDecorationThickness: 1.5, marginBottom: 22, fontStyle: 'italic',
              }}>
                ${stack}
              </div>

              <div style={{
                position: 'relative',
                fontSize: 11, color: goldText, marginBottom: 8,
                letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600,
              }}>
                Hoy, por solo
              </div>

              {/* PREÇO HERO */}
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 12 }}>
                <span
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 'clamp(80px, 22vw, 110px)',
                    fontWeight: 400,
                    lineHeight: 0.95,
                    letterSpacing: '-0.05em',
                    background: priceGradient,
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'price-shimmer 4s ease-in-out infinite',
                    filter: isLight
                      ? `drop-shadow(0 6px 20px ${c.gold}55) drop-shadow(0 2px 4px ${c.shadow}20)`
                      : `drop-shadow(0 4px 20px ${c.gold}50)`,
                  }}
                >
                  ${price}
                </span>
              </div>

              <div style={{
                position: 'relative',
                fontSize: 13, color: c.textSoft, marginBottom: 10,
                fontStyle: 'italic', fontFamily: "'Fraunces', serif",
              }}>
                o en 12 cuotas sin interés
              </div>

              <div style={{
                position: 'relative',
                display: 'inline-block',
                padding: '8px 16px',
                background: isLight ? `${c.gold}1a` : `${c.gold}15`,
                border: `1px solid ${goldText}40`,
                borderRadius: 999,
                fontSize: 11, color: isLight ? c.goldDeep : c.goldGlow,
                marginBottom: 30, letterSpacing: '0.05em',
              }}>
                Equivale a <strong style={{ color: isLight ? c.goldDeep : c.goldBright }}>menos del 25%</strong> de una sesión de terapia
              </div>

              <div style={{ position: 'relative' }}>
                <BuyButton onClick={() => { trackPurchaseIntent('oferta-vsl', 27); onBuy(); }} subtitle="Acceso inmediato · Sin compromiso">
                  Acceder al Método
                </BuyButton>
              </div>

              <div style={{
                position: 'relative',
                marginTop: 24,
                display: 'flex', justifyContent: 'center',
                gap: 14, flexWrap: 'wrap',
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

          {/* ============ GARANTIA — SELO PREMIUM ============ */}
          <FadeIn delay={0.5}>
            <div style={{
              position: 'relative',
              padding: 'clamp(24px, 6vw, 32px) clamp(20px, 5vw, 28px)',
              background: isLight
                ? `linear-gradient(135deg, ${c.bgWarm} 0%, ${c.bgSoft} 100%)`
                : `linear-gradient(135deg, ${c.bgWarm} 0%, ${c.bgSoft} 100%)`,
              border: `1px solid ${c.borderGold}`,
              borderRadius: isLight ? 12 : 2,
              boxShadow: isLight
                ? `0 12px 32px ${c.shadow}15, 0 2px 6px ${c.shadow}08`
                : 'none',
              display: 'flex',
              gap: 'clamp(16px, 4vw, 24px)',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              <GuaranteeSeal c={c} isLight={isLight} />
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{
                  fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: goldText, fontWeight: 700, marginBottom: 8,
                }}>
                  Garantía Blindada
                </div>
                <div style={{
                  fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                  color: c.text, fontSize: 'clamp(18px, 4.5vw, 22px)',
                  marginBottom: 12, letterSpacing: '-0.01em', lineHeight: 1.2,
                }}>
                  Pruébalo sin riesgo, <em style={{ color: goldText }}>por 30 días.</em>
                </div>
                <div style={{ fontSize: 13.5, color: c.textSoft, lineHeight: 1.65 }}>
                  Aplica el método completo. Si no sientes ningún cambio en la conexión, escríbenos y te devolvemos el <strong style={{ color: c.text }}>100%</strong>. Sin preguntas, sin papeleo.
                </div>
              </div>
            </div>
          </FadeIn>
        </>
      )}
    </div>
  );
}
