import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import PrimaryButton from '../components/PrimaryButton';
import Em from '../components/Em';

export default function Interrupt({ onNext }) {
  const { c } = useTheme();
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
      <FadeIn delay={0.15}>
        <h2 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px, 5.5vw, 34px)',
          fontWeight: 400, lineHeight: 1.25, margin: '0 0 28px',
          maxWidth: 460, letterSpacing: '-0.01em',
        }}>
          Respira.<br /><Em>No estás sola.</Em>
        </h2>
      </FadeIn>
      <FadeIn delay={0.3}>
        <p style={{ color: c.textSoft, fontSize: 16, lineHeight: 1.7, maxWidth: 440, margin: '0 0 40px' }}>
          <strong style={{ color: c.text, fontWeight: 500 }}>73,4%</strong> de las mujeres que marcan lo mismo que tú sienten que necesitan hacer algo antes de que sea tarde. Y casi ninguna sabe qué es ese algo, porque nadie les mostró el patrón que tienen enfrente.
        </p>
      </FadeIn>
      <FadeIn delay={0.4}>
        <p style={{
          fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          color: c.gold, fontSize: 17, marginBottom: 36,
        }}>
          Las próximas preguntas lo van a poner frente a tus ojos.
        </p>
      </FadeIn>
      <FadeIn delay={0.5}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <PrimaryButton onClick={onNext}>Continuar →</PrimaryButton>
        </div>
      </FadeIn>
    </div>
  );
}
