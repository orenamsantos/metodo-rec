import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import PrimaryButton from '../components/PrimaryButton';
import Em from '../components/Em';

export default function Landing({ onStart }) {
  const { c, isLight } = useTheme();
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
      <FadeIn delay={0.05}>
        <div style={{
          fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          fontSize: 12, color: c.textSoft,
          textAlign: 'center', marginBottom: 24,
        }}>
          Por la Dra. Sofía Restrepo · Terapeuta de pareja
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(32px, 7vw, 46px)',
          fontWeight: 400, lineHeight: 1.1, textAlign: 'center',
          margin: '0 0 24px', letterSpacing: '-0.015em',
        }}>
          Tu matrimonio no se está <Em>rompiendo</Em>.<br />
          Se está apagando en <Em>silencio</Em>.
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p style={{
          textAlign: 'center', color: c.textSoft, fontSize: 16, lineHeight: 1.6,
          maxWidth: 480, margin: '0 auto 36px',
        }}>
          Descubre cuál de los <strong style={{ color: c.text, fontWeight: 500 }}>3 patrones invisibles</strong> está alejando a tu pareja — y la <strong style={{ color: c.text, fontWeight: 500 }}>probabilidad real</strong> de revertirlo en los próximos 30 días.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div style={{
          padding: 22,
          border: `1px solid ${c.border}`,
          borderRadius: isLight ? 8 : 2,
          marginBottom: 28,
          background: isLight ? c.bgWarm : c.bgSoft,
          boxShadow: isLight ? `0 4px 12px ${c.shadow}10` : 'none',
        }}>
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
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
            <img
              src="/images/retratos/camila-mexico-47.png"
              alt="Camila R., México"
              loading="lazy"
              style={{
                width: 36, height: 36, borderRadius: '50%',
                objectFit: 'cover', flexShrink: 0,
                border: `1px solid ${c.borderSoft}`,
              }}
            />
            <span style={{
              fontSize: 12, color: c.textDim, fontFamily: "'Manrope', sans-serif",
            }}>
              — Camila R., casada hace 11 años · México
            </span>
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.4}>
        <PrimaryButton onClick={onStart}>Quiero entender qué pasa →</PrimaryButton>
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {[
              { src: '/images/retratos/carolina-colombia-38.png', alt: 'Carolina, Colombia' },
              { src: '/images/retratos/marina-argentina-42.png', alt: 'Marina, Argentina' },
              { src: '/images/retratos/leticia-brasil-35.png', alt: 'Letícia, Brasil' },
              { src: '/images/retratos/alejandra-peru-49.png', alt: 'Alejandra, Peru' },
              { src: '/images/retratos/patricia-chile-44.png', alt: 'Patrícia, Chile' },
            ].map((p, i) => (
              <img
                key={p.src}
                src={p.src}
                alt={p.alt}
                loading="lazy"
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  objectFit: 'cover',
                  border: `1.5px solid ${c.bg}`,
                  marginLeft: i > 0 ? -12 : 0,
                  boxShadow: isLight ? `0 2px 6px ${c.shadow}20` : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
