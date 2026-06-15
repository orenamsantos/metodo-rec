import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';

// CTA da landing: sentence case (diferente do PrimaryButton, que é uppercase),
// fill chapado terracota conforme o mockup aprovado do Warm Editorial.
function CtaButton({ onClick, children }) {
  const { c } = useTheme();
  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = '0 10px 24px rgba(192, 81, 47, 0.32)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(192, 81, 47, 0.24)';
      }}
      style={{
        width: '100%',
        minHeight: 56,
        padding: '18px 24px',
        background: c.gold,
        color: c.bg,
        border: 'none',
        borderRadius: 12,
        fontFamily: "'Manrope', sans-serif",
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: '0.02em',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 6px 16px rgba(192, 81, 47, 0.24)',
      }}
    >
      {children}
    </button>
  );
}

export default function Landing({ onStart }) {
  const { c } = useTheme();
  return (
    <div style={{ paddingTop: 40 }}>
      <FadeIn>
        <div style={{
          fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 600, marginBottom: 14, textAlign: 'center',
        }}>
          Método R.E.C. · Diagnóstico
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div style={{
          fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          fontSize: 13, color: c.textDim, textAlign: 'center', marginBottom: 26,
        }}>
          Por la Dra. Sofía Restrepo · Terapeuta de pareja
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(31px, 7vw, 44px)',
          fontWeight: 400, lineHeight: 1.12, textAlign: 'center',
          margin: '0 0 22px', letterSpacing: '-0.015em', color: c.text,
        }}>
          Él no se está alejando.<br />
          Está <em style={{ color: c.gold }}>probando</em> si todavía le importas.
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p style={{
          textAlign: 'center', color: c.textSoft, fontSize: 16, lineHeight: 1.6,
          maxWidth: 480, margin: '0 auto 34px',
        }}>
          Si tu esposo <strong style={{ color: c.text, fontWeight: 600 }}>se aleja y vuelve</strong>,
          no es frialdad: es un patrón con nombre. Descubre cuál de los{' '}
          <strong style={{ color: c.text, fontWeight: 600 }}>3 patrones</strong> domina tu
          matrimonio y la probabilidad real de revertirlo, en 90 segundos.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div style={{
          padding: 22,
          background: c.bgWarm,
          border: `1px solid ${c.borderSoft}`,
          borderRadius: 14,
          marginBottom: 28,
          boxShadow: c.shadowBox,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} style={{ color: c.gold, fontSize: 14 }}>★</span>
              ))}
            </div>
            <span style={{ fontSize: 12, color: c.textDim }}>4.9 · 12.847 mujeres atendidas</span>
          </div>
          <p style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            fontSize: 15, lineHeight: 1.55, color: c.text, margin: 0,
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
            <span style={{ fontSize: 12, color: c.textDim, fontFamily: "'Manrope', sans-serif" }}>
              Camila R. · casada hace 11 años · México
            </span>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <CtaButton onClick={onStart}>Quiero entender qué pasa →</CtaButton>
        <p style={{
          textAlign: 'center', fontSize: 11, color: c.textDim, marginTop: 14,
          letterSpacing: '0.05em',
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
              { src: '/images/retratos/marina-argentina-42.png', alt: 'Marina, Colombia' },
              { src: '/images/retratos/leticia-brasil-35.png', alt: 'Leticia, Argentina' },
              { src: '/images/retratos/alejandra-peru-49.png', alt: 'Alejandra, Perú' },
              { src: '/images/retratos/patricia-chile-44.png', alt: 'Patricia, Chile' },
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
                  boxShadow: '0 2px 6px rgba(28, 26, 23, 0.12)',
                }}
              />
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
