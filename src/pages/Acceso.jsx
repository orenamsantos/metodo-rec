import { useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import Em from '../components/Em';
import { trackStepChange, trackQuizComplete } from '../lib/tracking';
import { getStepBySlug } from '../lib/steps';
import { clearQuizStorage } from '../hooks/useQuizState';

export default function Acceso() {
  const { c } = useTheme();
  useEffect(() => {
    const step = getStepBySlug('gracias');
    if (step) trackStepChange(step.slug, step.id);
    trackQuizComplete();
    clearQuizStorage();
  }, []);
  return (
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
        <div style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 500, marginBottom: 14,
        }}>
          Acceso Liberado
        </div>
      </FadeIn>
      <FadeIn delay={0.3}>
        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 6vw, 38px)',
          fontWeight: 400, lineHeight: 1.15,
          margin: '0 0 24px', letterSpacing: '-0.015em',
        }}>
          Bienvenida al <Em>Método R.E.C.</Em>
        </h1>
      </FadeIn>
      <FadeIn delay={0.4}>
        <p style={{
          fontSize: 16, color: c.textSoft, lineHeight: 1.7,
          maxWidth: 480, margin: '0 auto 32px',
        }}>
          En los próximos 5 minutos vas a recibir todo en tu WhatsApp y email. Revisa tu bandeja de entrada (y la carpeta de spam, por las dudas).
        </p>
      </FadeIn>
      <FadeIn delay={0.5}>
        <div style={{
          padding: 24, background: c.bgSoft,
          border: `1px solid ${c.borderSoft}`,
          maxWidth: 480, margin: '0 auto', textAlign: 'left',
        }}>
          <div style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            color: c.gold, fontSize: 13, marginBottom: 14, letterSpacing: '0.05em',
          }}>
            Tus próximos pasos:
          </div>
          <ol style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.9, color: c.text }}>
            <li>Descarga el ebook y el planner desde el email</li>
            <li>Lee la introducción HOY (15 minutos)</li>
            <li>Empieza el día 1 mañana por la mañana</li>
            <li>Aplica con disciplina los 30 días</li>
          </ol>
        </div>
      </FadeIn>
      <FadeIn delay={0.6}>
        <p style={{
          marginTop: 32, fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          color: c.gold, fontSize: 15,
        }}>
          El cambio empieza hoy.
        </p>
      </FadeIn>
    </div>
  );
}
