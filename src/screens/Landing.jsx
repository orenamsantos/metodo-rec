import FadeIn from '../components/FadeIn';

// Tokens do design system Warm Editorial, ESCOPADOS nesta tela.
// Não usar useTheme para cores aqui: a Landing impõe o papel quente nos dois
// temas do app de propósito (ver spec 2026-06-11-landing-rec-warm-editorial).
const W = {
  bg: '#FAF7F2',
  text: '#1C1A17',
  soft: '#5D564F',
  muted: '#8A817A',
  terracotta: '#C0512F',
  forestBorder: 'rgba(47, 91, 79, 0.12)',
  surface: '#FFFFFF',
};

function CtaButton({ onClick, children }) {
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
        background: W.terracotta,
        color: W.bg,
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
  return (
    <div
      style={{
        // Full-bleed: anula o maxWidth/padding do Layout e impõe o papel
        // Warm Editorial apenas nesta tela (grain do tema fica coberto).
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginTop: 'calc(-1 * max(20px, env(safe-area-inset-top)))',
        marginBottom: 'calc(-1 * max(60px, env(safe-area-inset-bottom)))',
        minHeight: '100vh',
        background: W.bg,
        color: W.text,
      }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: 'max(44px, env(safe-area-inset-top)) clamp(18px, 5vw, 24px) 64px',
        }}
      >
        <FadeIn>
          <div style={{
            fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: W.terracotta, fontWeight: 600, marginBottom: 14, textAlign: 'center',
          }}>
            Método R.E.C. · Diagnóstico
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            fontSize: 13, color: W.muted, textAlign: 'center', marginBottom: 26,
          }}>
            Por la Dra. Sofía Restrepo · Terapeuta de pareja
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 style={{
            fontFamily: "'Fraunces', serif", fontSize: 'clamp(31px, 7vw, 44px)',
            fontWeight: 400, lineHeight: 1.12, textAlign: 'center',
            margin: '0 0 22px', letterSpacing: '-0.015em', color: W.text,
          }}>
            Él no se está alejando.<br />
            Está <em style={{ color: W.terracotta }}>probando</em> si todavía le importas.
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{
            textAlign: 'center', color: W.soft, fontSize: 16, lineHeight: 1.6,
            maxWidth: 480, margin: '0 auto 34px',
          }}>
            Si tu esposo <strong style={{ color: W.text, fontWeight: 600 }}>se aleja y vuelve</strong>,
            no es frialdad: es un patrón con nombre. Descubre cuál de los{' '}
            <strong style={{ color: W.text, fontWeight: 600 }}>3 patrones</strong> domina tu
            matrimonio y la probabilidad real de revertirlo, en 90 segundos.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div style={{
            padding: 22,
            background: W.surface,
            border: `1px solid ${W.forestBorder}`,
            borderRadius: 14,
            marginBottom: 28,
            boxShadow: '0 2px 16px rgba(28, 26, 23, 0.06)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} style={{ color: W.terracotta, fontSize: 14 }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: 12, color: W.muted }}>4.9 · 12.847 mujeres atendidas</span>
            </div>
            <p style={{
              fontFamily: "'Fraunces', serif", fontStyle: 'italic',
              fontSize: 15, lineHeight: 1.55, color: W.text, margin: 0,
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
                  border: `1px solid ${W.forestBorder}`,
                }}
              />
              <span style={{ fontSize: 12, color: W.muted, fontFamily: "'Manrope', sans-serif" }}>
                — Camila R., casada hace 11 años · México
              </span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <CtaButton onClick={onStart}>Quiero entender qué pasa →</CtaButton>
          <p style={{
            textAlign: 'center', fontSize: 11, color: W.muted, marginTop: 14,
            letterSpacing: '0.05em',
          }}>
            90 segundos · 100% confidencial · Sin registro inicial
          </p>
        </FadeIn>

        <FadeIn delay={0.55}>
          <div style={{
            marginTop: 48, paddingTop: 32,
            borderTop: `1px solid ${W.forestBorder}`, textAlign: 'center',
          }}>
            <p style={{
              fontSize: 12, color: W.muted, marginBottom: 14,
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
                    border: `1.5px solid ${W.bg}`,
                    marginLeft: i > 0 ? -12 : 0,
                    boxShadow: '0 2px 6px rgba(28, 26, 23, 0.12)',
                  }}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
