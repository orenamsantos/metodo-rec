import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import PrimaryButton from '../components/PrimaryButton';
import Em from '../components/Em';

export default function VideoMiddle({ onNext }) {
  const { c } = useTheme();
  return (
    <div style={{ paddingTop: 24 }}>
      <FadeIn>
        <div style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 500, marginBottom: 16,
        }}>
          Pausa · Mensaje de la Especialista
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(22px, 4.8vw, 28px)',
          fontWeight: 400, lineHeight: 1.25, margin: '0 0 24px', letterSpacing: '-0.01em',
        }}>
          Antes de la siguiente pregunta, necesito decirte algo que <Em>puede cambiarlo todo.</Em>
        </h2>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div style={{
          position: 'relative', width: '100%', aspectRatio: '9 / 16',
          maxWidth: 380, margin: '0 auto 28px',
          background: `linear-gradient(180deg, #2a1f17 0%, #1a1310 100%)`,
          border: `1px solid ${c.border}`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', overflow: 'hidden',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            border: `2px solid ${c.gold}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 16, background: `${c.gold}15`,
          }}>
            <span style={{ color: c.gold, fontSize: 22, marginLeft: 4 }}>▶</span>
          </div>
          <div style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            color: c.goldBright, fontSize: 14, letterSpacing: '0.1em', marginBottom: 6,
          }}>
            [ VIDEO DE LA ESPECIALISTA ]
          </div>
          <div style={{
            color: c.textDim, fontSize: 11,
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            ~3 min · Avatar HeyGen + B-roll Veo3
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.35}>
        <p style={{
          color: c.textSoft, fontSize: 14, lineHeight: 1.65, textAlign: 'center',
          margin: '0 0 28px', fontStyle: 'italic', fontFamily: "'Fraunces', serif",
        }}>
          Mira el video completo antes de seguir.<br />
          Lo que viene solo tiene sentido después de esto.
        </p>
      </FadeIn>
      <FadeIn delay={0.5}>
        <PrimaryButton onClick={onNext}>Ya lo Vi, Continuar →</PrimaryButton>
      </FadeIn>
    </div>
  );
}
