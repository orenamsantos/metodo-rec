import { c } from '../theme';
import FadeIn from '../components/FadeIn';
import PrimaryButton from '../components/PrimaryButton';
import Em from '../components/Em';

export default function Interrupt({ onNext }) {
  return (
    <div style={{
      paddingTop: '15vh', minHeight: '70vh', display: 'flex',
      flexDirection: 'column', alignItems: 'center', textAlign: 'center',
    }}>
      <FadeIn>
        <div style={{
          fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          fontSize: 56, color: c.gold, marginBottom: 30, lineHeight: 1,
        }}>·</div>
      </FadeIn>
      <FadeIn delay={0.3}>
        <h2 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px, 5.5vw, 34px)',
          fontWeight: 400, lineHeight: 1.25, margin: '0 0 28px',
          maxWidth: 460, letterSpacing: '-0.01em',
        }}>
          Respira.<br /><Em>No estás sola.</Em>
        </h2>
      </FadeIn>
      <FadeIn delay={0.7}>
        <p style={{ color: c.textSoft, fontSize: 16, lineHeight: 1.7, maxWidth: 440, margin: '0 0 40px' }}>
          <strong style={{ color: c.text, fontWeight: 500 }}>73,4%</strong> de las mujeres que responden como tú sienten que necesitan hacer algo antes de que sea tarde — y la mayoría no sabe por dónde empezar.
        </p>
      </FadeIn>
      <FadeIn delay={1.0}>
        <p style={{
          fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          color: c.gold, fontSize: 17, marginBottom: 36,
        }}>
          Vamos a descubrirlo juntas.
        </p>
      </FadeIn>
      <FadeIn delay={1.3}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <PrimaryButton onClick={onNext}>Continuar →</PrimaryButton>
        </div>
      </FadeIn>
    </div>
  );
}
