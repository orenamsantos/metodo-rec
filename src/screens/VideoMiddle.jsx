import { useState } from 'react';
import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import PrimaryButton from '../components/PrimaryButton';
import Em from '../components/Em';

export default function VideoMiddle({ onNext }) {
  const { c } = useTheme();
  const [videoMountKey] = useState(() => `mid-${Date.now()}`);
  return (
    <div style={{ paddingTop: 24 }}>
      <FadeIn>
        <div style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 500, marginBottom: 16,
        }}>
          Pausa · Mensaje de la Dra. Sofía
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
          background: '#000',
          border: `1px solid ${c.border}`,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          <iframe
            key={videoMountKey}
            src="https://play.tynk.ai/p/64584f35-69ed-4d88-822f-09156159a24e"
            title="Video de la especialista · Dra. Sofía Restrepo"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              border: 0, display: 'block',
            }}
          />
        </div>
      </FadeIn>
      <FadeIn delay={0.35}>
        <p style={{
          color: c.textSoft, fontSize: 14, lineHeight: 1.65, textAlign: 'center',
          margin: '0 0 28px', fontStyle: 'italic', fontFamily: "'Fraunces', serif",
        }}>
          Son 3 minutos. Es donde la Dra. Sofía te muestra por qué nada de lo que intentaste funcionó, y qué va a identificar en tus últimas respuestas.
        </p>
      </FadeIn>
      <FadeIn delay={0.5}>
        <PrimaryButton onClick={onNext}>Continuar con mi diagnóstico →</PrimaryButton>
      </FadeIn>
    </div>
  );
}
