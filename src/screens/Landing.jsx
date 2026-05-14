import { c } from '../theme';
import FadeIn from '../components/FadeIn';
import PrimaryButton from '../components/PrimaryButton';
import Em from '../components/Em';

export default function Landing({ onStart }) {
  return (
    <div style={{ paddingTop: 40 }}>
      <FadeIn>
        <div style={{
          fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 500, marginBottom: 14, textAlign: 'center',
        }}>
          Método R.E.C. · Diagnóstico
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(32px, 7vw, 46px)',
          fontWeight: 400, lineHeight: 1.1, textAlign: 'center',
          margin: '0 0 24px', letterSpacing: '-0.015em',
        }}>
          Descubre la <Em>probabilidad real</Em> de reavivar tu matrimonio
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p style={{
          textAlign: 'center', color: c.textSoft, fontSize: 16, lineHeight: 1.6,
          maxWidth: 480, margin: '0 auto 36px',
        }}>
          Y cuál es el <strong style={{ color: c.text, fontWeight: 500 }}>bloqueo invisible</strong> que está alejando a tu pareja — antes de que sea demasiado tarde.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div style={{ padding: 20, border: `1px solid ${c.border}`, marginBottom: 28, background: c.bgSoft }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} style={{ color: c.gold, fontSize: 14 }}>★</span>
              ))}
            </div>
            <span style={{ fontSize: 12, color: c.textSoft }}>4.9 · 12.847 mujeres atendidas</span>
          </div>
          <p style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            fontSize: 14, lineHeight: 1.55, color: c.text, margin: 0,
          }}>
            "Estaba perdida. Este diagnóstico fue el primer paso que realmente tuvo sentido en meses."
            <span style={{
              display: 'block', marginTop: 8, fontStyle: 'normal', fontSize: 12,
              color: c.textDim, fontFamily: "'Manrope', sans-serif",
            }}>
              — Camila R., casada hace 11 años · México
            </span>
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.4}>
        <PrimaryButton onClick={onStart}>Iniciar mi Diagnóstico →</PrimaryButton>
        <p style={{
          textAlign: 'center', fontSize: 11, color: c.textDim, marginTop: 14, letterSpacing: '0.05em',
        }}>
          90 segundos · 100% confidencial · Sin registro inicial
        </p>
      </FadeIn>
      <FadeIn delay={0.55}>
        <div style={{
          marginTop: 48, paddingTop: 32,
          borderTop: `1px solid ${c.borderSoft}`, textAlign: 'center',
        }}>
          <p style={{
            fontSize: 12, color: c.textDim, marginBottom: 14,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            + 9.000 mujeres en los últimos 30 días
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{
                width: 40, height: 40, borderRadius: '50%',
                background: `linear-gradient(135deg, ${c.gold}40, ${c.rose}40)`,
                border: `1.5px solid ${c.bg}`, marginLeft: i > 1 ? -12 : 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Fraunces', serif", fontSize: 14, color: c.text, fontStyle: 'italic',
              }}>
                {['C', 'M', 'L', 'A', 'P'][i - 1]}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
