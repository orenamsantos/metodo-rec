import { c } from '../theme';
import FadeIn from '../components/FadeIn';
import PrimaryButton from '../components/PrimaryButton';
import Em from '../components/Em';

const COSTS = [
  { label: '1 sesión de terapia de pareja', value: '$80 — $150' },
  { label: '6 meses de terapia (mínimo recomendado)', value: '$1.200 — $2.400' },
  { label: 'Curso online tradicional con coach', value: '$200 — $500' },
  { label: 'Costo promedio de un divorcio', value: '$5.000 — $15.000' },
  { label: 'Impacto emocional en los hijos', value: 'Incalculable' },
];

export default function PriceAnchor({ onNext }) {
  return (
    <div style={{ paddingTop: 24 }}>
      <FadeIn>
        <div style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 500, marginBottom: 14,
        }}>
          Antes de mostrarte el plan
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 6vw, 36px)',
          fontWeight: 400, lineHeight: 1.15, margin: '0 0 28px', letterSpacing: '-0.015em',
        }}>
          Una pregunta honesta: <br />
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
          {COSTS.map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              gap: 16, padding: '16px 0',
              borderBottom: i < COSTS.length - 1 ? `1px solid ${c.borderSoft}` : 'none',
            }}>
              <div style={{ fontSize: 14, color: c.text, lineHeight: 1.4, flex: 1 }}>{item.label}</div>
              <div style={{
                fontFamily: "'Fraunces', serif", fontStyle: 'italic',
                fontSize: 14, color: c.danger, flexShrink: 0, textAlign: 'right',
              }}>
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
          <div style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            fontSize: 16, color: c.text, lineHeight: 1.6, marginBottom: 12,
          }}>
            "El costo de esperar siempre es más alto que el costo de actuar."
          </div>
          <div style={{
            fontSize: 11, color: c.textDim,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
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
}
