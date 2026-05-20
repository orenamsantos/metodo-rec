import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import BuyButton from '../components/BuyButton';
import GhostButton from '../components/GhostButton';
import Em from '../components/Em';
import { trackStepChange, trackPurchaseIntent } from '../lib/tracking';
import { getStepBySlug } from '../lib/steps';

const HOTMART_DOWNSELL_URL = 'PLACEHOLDER_HOTMART_DOWNSELL_URL';
// TODO: substituir pela URL real do checkout do downsell na Hotmart

export default function Downsell() {
  const { c } = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    const step = getStepBySlug('downsell-guiones');
    if (step) trackStepChange(step.slug, step.id);
  }, []);
  const goAcceso = () => navigate('/acceso');

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
          Entiendo que <Em>$37 no era el momento.</Em>
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p style={{
          textAlign: 'center', fontSize: 16, color: c.textSoft,
          lineHeight: 1.6, marginBottom: 32,
        }}>
          Pero antes de irte, hay algo que sí necesitas tener — y a un precio que cualquiera puede permitirse.
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
            De las 30 cartas, separamos las <strong style={{ color: c.text }}>7 más importantes</strong> — las que cubren los momentos donde un error de palabras puede destruir todo lo que construiste.
          </p>
          <ul style={{ margin: '0 0 24px', paddingLeft: 18, fontSize: 14, lineHeight: 1.8, color: c.text }}>
            <li>Después de una discusión grave</li>
            <li>Cuando él dice "necesito tiempo"</li>
            <li>Para reactivar la conexión por WhatsApp</li>
            <li>Si descubres una traición</li>
            <li>Cuando él se cierra emocionalmente</li>
            <li>Para reconectar en fechas importantes</li>
            <li>El primer mensaje después de los 30 días</li>
          </ul>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              fontSize: 12, color: c.textSoft, marginBottom: 4,
              fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            }}>
              Antes
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
              Solo aquí, por
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
          <BuyButton
            href={HOTMART_DOWNSELL_URL}
            id="cta-downsell"
            className="gtm-cta gtm-checkout-downsell"
            onClick={() => { trackPurchaseIntent('downsell-guiones', 19); }}
            subtitle="Tu última oportunidad de llevarlo"
          >
            Sí, Llevar los 7 Guiones
          </BuyButton>
        </div>
      </FadeIn>
      <FadeIn delay={0.4}>
        <GhostButton onClick={goAcceso}>No gracias, ir directo a mi acceso</GhostButton>
      </FadeIn>
    </div>
  );
}
