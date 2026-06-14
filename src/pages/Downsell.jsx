import { useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import HotmartFunnelWidget from '../components/HotmartFunnelWidget';
import Em from '../components/Em';
import { trackStepChange } from '../lib/tracking';
import { getStepBySlug } from '../lib/steps';

export default function Downsell() {
  const { c } = useTheme();
  useEffect(() => {
    const step = getStepBySlug('downsell-guiones');
    if (step) trackStepChange(step.slug, step.id);
  }, []);

  return (
    <div style={{ paddingTop: 24 }}>
      <FadeIn>
        <div style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.rose, fontWeight: 500, marginBottom: 14, textAlign: 'center',
        }}>
          Espera · Última Opción
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(24px, 5.5vw, 32px)',
          fontWeight: 400, lineHeight: 1.2, textAlign: 'center',
          margin: '0 0 16px', letterSpacing: '-0.015em',
        }}>
          Entiendo. <Em>$37 no era el momento, y está bien.</Em>
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p style={{
          textAlign: 'center', fontSize: 16, color: c.textSoft,
          lineHeight: 1.6, marginBottom: 32,
        }}>
          Entonces quédate solo con lo innegociable: las 7 conversaciones que pueden salvar o hacer retroceder todo lo que vas a construir en estos 30 días.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div style={{
          padding: 28, border: `1.5px solid ${c.rose}`,
          background: `linear-gradient(135deg, ${c.rose}10 0%, ${c.bg} 100%)`,
          marginBottom: 28,
        }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: c.rose, fontWeight: 600, marginBottom: 12,
          }}>
            Versión Esencial
          </div>
          <h2 style={{
            fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 500,
            margin: '0 0 16px', letterSpacing: '-0.01em',
          }}>
            Los 7 Guiones Críticos
          </h2>
          <p style={{ fontSize: 14, color: c.textSoft, lineHeight: 1.65, marginBottom: 20 }}>
            De las 30 herramientas, la Dra. Sofía separó las <strong style={{ color: c.text }}>7 que no pueden esperar</strong>: los puntos de inflexión donde una sola respuesta equivocada deshace meses. Cada una en 3 niveles de intensidad (suave, media y firme, según la gravedad de tu caso). Son <strong style={{ color: c.text }}>21 respuestas exactas</strong>, palabra por palabra.
          </p>
          <ul style={{ margin: '0 0 24px', paddingLeft: 18, fontSize: 14, lineHeight: 1.8, color: c.text }}>
            <li>Iniciar la conversación importante sin que él se cierre (sin "tenemos que hablar")</li>
            <li>Cuando él te grita: el límite que frena sin escalar</li>
            <li>Cuando dijo algo que te hirió profundamente</li>
            <li>Cuando se cierra emocionalmente por completo</li>
            <li>Cuando dice "ya no sé si te amo" (la carta más importante que vas a escribir)</li>
            <li>Cuando te toca reconocer tu parte, sin humillarte</li>
            <li>La declaración honesta que sella la reconstrucción</li>
          </ul>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              fontSize: 12, color: c.textSoft, marginBottom: 4,
              fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            }}>
              La versión completa era
            </div>
            <div style={{
              fontSize: 17, color: c.textSoft, textDecoration: 'line-through',
              textDecorationColor: c.danger, marginBottom: 14,
              fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            }}>
              $37
            </div>
            <div style={{
              fontSize: 11, color: c.rose, marginBottom: 6,
              letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500,
            }}>
              Solo los 7 críticos, por
            </div>
            <div style={{
              fontFamily: "'Fraunces', serif", fontSize: 60, fontWeight: 400,
              lineHeight: 1, letterSpacing: '-0.03em',
              background: `linear-gradient(135deg, ${c.roseDeep} 0%, ${c.rose} 50%, ${c.goldBright} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: `drop-shadow(0 2px 10px ${c.rose}40)`,
            }}>
              $19
            </div>
          </div>
          <HotmartFunnelWidget purchaseSlug="downsell-guiones" purchaseValue={19} />
        </div>
      </FadeIn>
    </div>
  );
}
