import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import Em from '../components/Em';

const STEPS = [
  'Leyendo tus respuestas, una por una',
  'Comparando con 12.847 casos reales',
  'Identificando cuál de los 3 bloqueos es el tuyo',
  'Preparando tu plan para ese bloqueo',
];

const TOTAL_MS = 4200;

export default function Loading() {
  const { c } = useTheme();
  const [step, setStep] = useState(0);

  // Contador % subindo (valor percebido do diagnóstico)
  const count = useMotionValue(0);
  const pct = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, 100, { duration: TOTAL_MS / 1000, ease: 'easeInOut' });
    const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length)), TOTAL_MS / STEPS.length);
    return () => { controls.stop(); clearInterval(t); };
  }, [count]);

  return (
    <div style={{ paddingTop: '13vh', minHeight: '60vh', textAlign: 'center' }}>
      <FadeIn>
        <div style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 500, marginBottom: 18,
        }}>
          Procesando · Espera un momento
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <h2 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px, 5vw, 32px)',
          fontWeight: 400, margin: '0 0 24px', letterSpacing: '-0.01em', lineHeight: 1.2,
        }}>
          Preparando tu <Em>diagnóstico</Em>...
        </h2>
      </FadeIn>

      {/* Contador % + barra de progresso */}
      <FadeIn delay={0.25}>
        <div style={{ maxWidth: 380, margin: '0 auto 34px' }}>
          <div style={{
            fontFamily: "'Fraunces', serif", fontSize: 52, fontWeight: 400,
            color: c.gold, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 14,
          }}>
            <motion.span>{pct}</motion.span>%
          </div>
          <div style={{
            height: 8, borderRadius: 999, background: c.borderSoft, overflow: 'hidden',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: TOTAL_MS / 1000, ease: 'easeInOut' }}
              style={{
                height: '100%', borderRadius: 999,
                background: `linear-gradient(90deg, ${c.gold}, ${c.goldBright})`,
              }}
            />
          </div>
        </div>
      </FadeIn>

      <div style={{ maxWidth: 380, margin: '0 auto', textAlign: 'left' }}>
        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            animate={{ opacity: i <= step ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 0',
              borderBottom: i < STEPS.length - 1 ? `1px solid ${c.borderSoft}` : 'none',
            }}
          >
            <motion.div
              animate={i === step ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={i === step ? { duration: 1, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
              style={{
                width: 18, height: 18, borderRadius: '50%',
                border: `1.5px solid ${i < step ? c.gold : c.textDim}`,
                background: i < step ? c.gold : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {i < step && <span style={{ color: c.bg, fontSize: 10, fontWeight: 700 }}>✓</span>}
            </motion.div>
            <span style={{ fontSize: 14, color: i <= step ? c.text : c.textDim }}>
              {s}{i === step ? '...' : ''}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
