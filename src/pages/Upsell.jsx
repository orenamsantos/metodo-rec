import { useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import HotmartFunnelWidget from '../components/HotmartFunnelWidget';
import Em from '../components/Em';
import { trackStepChange } from '../lib/tracking';
import { getStepBySlug } from '../lib/steps';

// Vídeo da Dra. Sofía (68s, clipes U1-U7 do Théo, editado no remotion-studio).
// Master no Tynk. Vazio = a página rende sem o slot.
const UPSELL_VIDEO_URL = 'https://play.tynk.ai/p/6b3baf0f-df5c-497c-a49a-8381e9793305';

export default function Upsell() {
  const { c } = useTheme();
  useEffect(() => {
    const step = getStepBySlug('upsell-cartas');
    if (step) trackStepChange(step.slug, step.id);
  }, []);

  return (
    <div style={{ paddingTop: 24 }}>
      <FadeIn>
        <div style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.success, fontWeight: 500, marginBottom: 14, textAlign: 'center',
        }}>
          ✓ Compra Confirmada · Espera...
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px, 5.5vw, 34px)',
          fontWeight: 400, lineHeight: 1.15, textAlign: 'center',
          margin: '0 0 16px', letterSpacing: '-0.015em',
        }}>
          El método abre la puerta. <Em>Estas son las palabras para cruzarla.</Em>
        </h1>
      </FadeIn>
      {UPSELL_VIDEO_URL ? (
        <FadeIn delay={0.15}>
          <div style={{
            position: 'relative', width: '100%', aspectRatio: '9 / 16',
            maxWidth: 380, margin: '0 auto 10px',
            background: '#000', border: `1px solid ${c.border}`,
            borderRadius: 12, overflow: 'hidden',
          }}>
            <iframe
              src={UPSELL_VIDEO_URL}
              title="Mensaje de la Dra. Sofía · Cartas y Guiones"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, display: 'block' }}
            />
          </div>
          <p style={{
            textAlign: 'center', fontSize: 12, color: c.textDim,
            margin: '0 0 24px', fontStyle: 'italic', fontFamily: "'Fraunces', serif",
          }}>
            Son 60 segundos. La Dra. Sofía te explica por qué creó esto después de 14 años de consulta.
          </p>
        </FadeIn>
      ) : null}
      <FadeIn delay={0.2}>
        <p style={{
          textAlign: 'center', fontSize: 16, color: c.textSoft,
          lineHeight: 1.6, marginBottom: 32,
        }}>
          Tu plan de 30 días ya es tuyo. Y el plan funciona: invierte el ciclo y él va a volver a abrirse. Pero justo ahí, en el momento que esperaste durante meses, pasa algo que la Dra. Sofía vio miles de veces: la emoción sube, y tu cerebro pierde acceso a las palabras. Sabes <strong style={{ color: c.text }}>QUÉ hacer</strong>. Te falta saber <strong style={{ color: c.text }}>QUÉ DECIR</strong>. Esto resuelve exactamente eso.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div style={{
          padding: 28, border: `2px solid ${c.gold}`,
          background: `linear-gradient(135deg, ${c.gold}15 0%, ${c.bg} 100%)`,
          marginBottom: 28,
        }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: c.gold, fontWeight: 600, marginBottom: 12,
          }}>
            Oferta Única · Solo Aquí
          </div>
          <h2 style={{
            fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 500,
            margin: '0 0 16px', letterSpacing: '-0.01em',
          }}>
            Las 30 Cartas y Guiones para los Momentos Exactos
          </h2>
          <p style={{ fontSize: 14, color: c.textSoft, lineHeight: 1.65, marginBottom: 20 }}>
            Cartas escritas, mensajes listos para mandar y guiones de conversación, palabra por palabra, para las situaciones donde más miedo da equivocarse. Cada herramienta viene en 3 versiones (suave, media y firme, tú eliges según la gravedad) y con el protocolo de qué hacer en las 48 horas siguientes. No improvisas nada: abres, eliges tu versión, la usas.
          </p>
          <ul style={{ margin: '0 0 20px', paddingLeft: 18, fontSize: 14, lineHeight: 1.8, color: c.text }}>
            <li>La carta para cuando él dice "ya no sé si te amo" (la respuesta que salva lo que queda, sin suplicar y sin amenazar)</li>
            <li>El guion para cuando él se cierra completamente y vive en automático</li>
            <li>El guion para iniciar una conversación importante sin el "tenemos que hablar" que lo cierra desde la primera palabra</li>
            <li>El mensaje para mandar después de un día entero sin hablarse, sin drama y sin pedir perdón por algo que no sabes qué fue</li>
            <li>La carta para cuando descubriste algo sospechoso (antes de acusar, antes de explotar)</li>
            <li>La carta para reabrir la conversación sobre el sexo, sin presionar y sin pasar vergüenza</li>
          </ul>
          <div style={{
            padding: '12px 14px', background: c.bgSoft,
            border: `1px solid ${c.borderSoft}`, marginBottom: 20,
          }}>
            <div style={{
              fontSize: 12, color: c.gold, marginBottom: 4, letterSpacing: '0.05em',
              fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            }}>
              Por qué existe este material:
            </div>
            <div style={{ fontSize: 13, color: c.textSoft, lineHeight: 1.55 }}>
              "Durante años, la pregunta más frecuente en mi consulta fue: <em style={{ color: c.text }}>Doctora, ¿usted me puede dar las palabras exactas? Yo entiendo lo que tengo que hacer, pero cuando llega el momento, me quedo sin saber qué decir.</em>" · Dra. Sofía Restrepo. Estas 30 herramientas son su respuesta a esa pregunta.
            </div>
          </div>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              fontSize: 12, color: c.textSoft, marginBottom: 4,
              fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            }}>
              Son 90 textos listos (30 herramientas, 3 versiones cada una). Una sola sesión para "aprender a comunicarte" cuesta $80.
            </div>
            <div style={{
              fontSize: 18, color: c.textSoft, textDecoration: 'line-through',
              textDecorationColor: c.danger, marginBottom: 14,
              fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            }}>
              $97
            </div>
            <div style={{
              fontSize: 11, color: c.gold, marginBottom: 6,
              letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500,
            }}>
              Solo aquí, por
            </div>
            <div style={{
              fontFamily: "'Fraunces', serif", fontSize: 64, fontWeight: 400,
              lineHeight: 1, letterSpacing: '-0.03em',
              background: `linear-gradient(135deg, ${c.goldDeep} 0%, ${c.goldBright} 50%, ${c.gold} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: `drop-shadow(0 2px 12px ${c.gold}40)`,
            }}>
              $37
            </div>
          </div>
          <HotmartFunnelWidget purchaseSlug="upsell-cartas" purchaseValue={37} />
        </div>
      </FadeIn>
      <FadeIn delay={0.5}>
        <div style={{
          marginTop: 24, padding: 14, background: c.bgSoft,
          border: `1px solid ${c.borderSoft}`, fontSize: 11, color: c.textDim,
          textAlign: 'center', lineHeight: 1.6,
        }}>
          ⓘ Esta oferta NO se repetirá. Si sales ahora, no podrás acceder a este precio después.
        </div>
      </FadeIn>
    </div>
  );
}
