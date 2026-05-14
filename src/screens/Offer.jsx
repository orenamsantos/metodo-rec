import { useEffect, useState } from 'react';
import { c } from '../theme';
import FadeIn from '../components/FadeIn';
import BuyButton from '../components/BuyButton';
import Em from '../components/Em';

// ============ REVELACIÓN PROGRESIVA ============
// En producción: cambiar este valor (en ms) para el tiempo donde tu VSL
// empieza a presentar la oferta. Para VSL de 4-6 min, suele ser entre
// 150000 (2:30) y 240000 (4:00).
const REVEAL_DELAY_MS = 5000;

const ITEMS = [
  { title: 'Ebook "Método R.E.C." completo', desc: 'El paso a paso de las 3 fases para reavivar la conexión emocional en 30 días. 120 páginas, sin relleno.', value: '$97' },
  { title: 'Planner Diario de 30 días', desc: 'Workbook con ejercicios paso a paso, espacios para registrar avances y reflexiones diarias.', value: '$47' },
  { title: 'Bonus 1: Guía de Primeros Auxilios Emocionales', desc: 'Qué hacer en las primeras 72 horas si la situación está crítica. Para aplicar HOY mismo.', value: '$27' },
  { title: 'Bonus 2: Mapa de Comunicación de Pareja', desc: 'Infografía PDF que identifica los 5 estilos de comunicación y cómo adaptarte al de él.', value: '$19' },
  { title: 'Bonus 3: Calendario Visual de la Reconexión', desc: 'Tu progreso en una sola página. Imprimible, para pegar en un lugar visible cada día.', value: '$17' },
];

const TESTIMONIALS = [
  { quote: 'En 23 días, mi marido me invitó a cenar fuera por primera vez en más de un año. Lloré.', author: 'Marina S.', meta: 'Casada hace 8 años · Colombia' },
  { quote: 'Estaba a punto de pedir el divorcio. Hoy estamos empezando de nuevo — y está MEJOR que antes.', author: 'Camila R.', meta: 'Casada hace 11 años · México' },
  { quote: 'El método es diferente. No es "darle espacio" ni "valorarte". Es algo que nadie habla en otro lado.', author: 'Leticia M.', meta: 'Casada hace 6 años · Argentina' },
];

export default function Offer({ onBuy }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), REVEAL_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const stack = ITEMS.reduce((sum, it) => sum + parseInt(it.value.replace(/\D/g, ''), 10), 0);
  const price = 27;

  return (
    <div style={{ paddingTop: 24 }}>
      <FadeIn>
        <div style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 500, marginBottom: 14, textAlign: 'center',
        }}>
          Tu Plan · Método R.E.C.
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 6vw, 36px)',
          fontWeight: 400, lineHeight: 1.15, textAlign: 'center',
          margin: '0 0 28px', letterSpacing: '-0.015em',
        }}>
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
          <div style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            color: c.goldBright, fontSize: 13, letterSpacing: '0.1em', marginBottom: 4,
          }}>
            [ VSL DE OFERTA ]
          </div>
          <div style={{ color: c.textDim, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            4-6 min · Avatar HeyGen presenta el método
          </div>
        </div>
      </FadeIn>

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
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 6 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: c.gold,
                  animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        </FadeIn>
      )}

      {revealed && (
        <>
          <FadeIn>
            <h2 style={{
              fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500,
              margin: '24px 0 20px', letterSpacing: '-0.01em',
            }}>
              Lo que recibes hoy:
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ marginBottom: 24 }}>
              {ITEMS.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 14, padding: '16px 0',
                  borderBottom: i < ITEMS.length - 1 ? `1px solid ${c.borderSoft}` : 'none',
                }}>
                  <div style={{
                    fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                    fontSize: 13, color: c.gold, flexShrink: 0, width: 24, paddingTop: 2,
                  }}>
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
              <div style={{
                fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                fontSize: 24, color: c.text, textDecoration: 'line-through',
                textDecorationColor: c.danger, textDecorationThickness: 1.5,
              }}>
                ${stack}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{
              fontFamily: "'Fraunces', serif", fontStyle: 'italic',
              color: c.gold, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: 16, textAlign: 'center',
            }}>
              Quien ya aplicó
            </div>
            <div style={{ marginBottom: 32 }}>
              {TESTIMONIALS.map((t, i) => (
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
                  <div style={{
                    fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                    fontSize: 15, lineHeight: 1.6, color: c.text, marginBottom: 14, paddingLeft: 14,
                  }}>
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
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div style={{
              position: 'relative',
              padding: '40px 28px 32px',
              background: `radial-gradient(ellipse at top, ${c.gold}18 0%, transparent 60%), linear-gradient(180deg, ${c.bgWarm} 0%, ${c.bgDeep} 100%)`,
              border: `1px solid ${c.borderGold}`,
              textAlign: 'center', marginBottom: 24,
              boxShadow: `0 20px 60px ${c.shadow}cc, 0 0 80px ${c.gold}15, inset 0 1px 0 ${c.goldBright}30`,
            }}>
              {[
                { top: 10, left: 10 },
                { top: 10, right: 10 },
                { bottom: 10, left: 10 },
                { bottom: 10, right: 10 },
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
                  color: c.text, fontSize: 20, marginBottom: 10, letterSpacing: '-0.01em', lineHeight: 1.2,
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
}
