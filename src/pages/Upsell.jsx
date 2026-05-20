import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import BuyButton from '../components/BuyButton';
import GhostButton from '../components/GhostButton';
import Em from '../components/Em';
import { trackStepChange, trackPurchaseIntent } from '../lib/tracking';
import { getStepBySlug } from '../lib/steps';

export default function Upsell() {
  const { c } = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    const step = getStepBySlug('upsell-cartas');
    if (step) trackStepChange(step.slug, step.id);
  }, []);
  const onAccept = () => {
    trackPurchaseIntent('upsell-cartas', 37);
    navigate('/acceso');
  };
  const onDecline = () => navigate('/downsell');

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
          Espera, esto solo lo verás <Em>una vez</Em>.
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p style={{
          textAlign: 'center', fontSize: 16, color: c.textSoft,
          lineHeight: 1.6, marginBottom: 32,
        }}>
          Tienes el método. Ahora necesitas <strong style={{ color: c.text }}>las palabras exactas</strong> para los momentos críticos.
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
            Cartas y Guiones Listos para Usar
          </h2>
          <p style={{ fontSize: 14, color: c.textSoft, lineHeight: 1.65, marginBottom: 20 }}>
            30 mensajes y guiones de conversación escritos exactamente para los momentos donde no sabes qué decir — o tienes miedo de equivocarte:
          </p>
          <ul style={{ margin: '0 0 20px', paddingLeft: 18, fontSize: 14, lineHeight: 1.8, color: c.text }}>
            <li>Qué decirle después de una discusión grave</li>
            <li>Cómo iniciar una conversación cuando él está distante</li>
            <li>Mensajes para "reactivar" la conexión por WhatsApp</li>
            <li>Las palabras exactas si descubres una traición</li>
            <li>Cómo responder cuando él dice "necesito tiempo"</li>
            <li>Guiones para reconectar en fechas importantes</li>
          </ul>
          <div style={{
            padding: '12px 14px', background: c.bgSoft,
            border: `1px solid ${c.borderSoft}`, marginBottom: 20,
          }}>
            <div style={{
              fontSize: 12, color: c.gold, marginBottom: 4, letterSpacing: '0.05em',
              fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            }}>
              Por qué importa:
            </div>
            <div style={{ fontSize: 13, color: c.textSoft, lineHeight: 1.55 }}>
              El 67% de las mujeres que aplican el Método R.E.C. pierden oportunidades por <em style={{ color: c.text }}>no saber qué decir en el momento exacto</em>. Esto resuelve eso.
            </div>
          </div>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              fontSize: 12, color: c.textSoft, marginBottom: 4,
              fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            }}>
              Precio normal
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
          <BuyButton onClick={onAccept} subtitle="Agregar con un clic, sin volver a digitar tarjeta">
            Sí, Agregar a Mi Pedido
          </BuyButton>
        </div>
      </FadeIn>
      <FadeIn delay={0.4}>
        <GhostButton onClick={onDecline}>No gracias, continuar sin esto</GhostButton>
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
