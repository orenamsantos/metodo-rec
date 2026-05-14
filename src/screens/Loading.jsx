import { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import Em from '../components/Em';

const STEPS = [
  'Analizando patrones emocionales',
  'Comparando con 12.847 casos reales',
  'Identificando tu bloqueo específico',
  'Generando plan personalizado',
];

export default function Loading() {
  const { c } = useTheme();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ paddingTop: '15vh', minHeight: '60vh', textAlign: 'center' }}>
      <FadeIn>
        <div style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 500, marginBottom: 20,
        }}>
          Procesando · Espera un momento
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <h2 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px, 5vw, 32px)',
          fontWeight: 400, margin: '0 0 48px', letterSpacing: '-0.01em', lineHeight: 1.2,
        }}>
          Preparando tu <Em>diagnóstico</Em>...
        </h2>
      </FadeIn>
      <div style={{ maxWidth: 380, margin: '0 auto', textAlign: 'left' }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 0',
            borderBottom: i < STEPS.length - 1 ? `1px solid ${c.borderSoft}` : 'none',
            opacity: i <= step ? 1 : 0.3, transition: 'opacity 0.4s',
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%',
              border: `1.5px solid ${i < step ? c.gold : c.textDim}`,
              background: i < step ? c.gold : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, animation: i === step ? 'pulse 1s ease-in-out infinite' : 'none',
            }}>
              {i < step && <span style={{ color: c.bg, fontSize: 10, fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{ fontSize: 14, color: i <= step ? c.text : c.textDim }}>
              {s}{i === step ? '...' : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
