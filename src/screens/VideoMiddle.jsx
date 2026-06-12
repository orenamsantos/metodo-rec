import { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import PrimaryButton from '../components/PrimaryButton';
import Em from '../components/Em';

// Gate suave (prescrição do Cauã/Théo): o botão de continuar aparece aos 25s,
// depois que a Dra. Sofía nomeia o Ciclo de Persecución (blocos M1-M3 do
// vídeo novo de 60s). Antes disso, contador discreto. Sem gate duro: o vídeo
// inteiro dura 1 minuto e ela pode assistir até o fim e continuar quando quiser.
const SKIP_DELAY_S = 25;

export default function VideoMiddle({ onNext }) {
  const { c } = useTheme();
  const [videoMountKey] = useState(() => `mid-${Date.now()}`);
  const [secondsLeft, setSecondsLeft] = useState(SKIP_DELAY_S);

  useEffect(() => {
    const t = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(t);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  const unlocked = secondsLeft === 0;
  const progress = (SKIP_DELAY_S - secondsLeft) / SKIP_DELAY_S;

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
            src="https://play.tynk.ai/p/22ce6312-0c7f-41f9-a9ca-2321e5b3a949"
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
          Es un minuto. La Dra. Sofía te muestra por qué nada de lo que intentaste funcionó, y qué va a identificar en tus últimas respuestas.
        </p>
      </FadeIn>
      {unlocked ? (
        <FadeIn>
          <PrimaryButton onClick={onNext}>Continuar con mi diagnóstico →</PrimaryButton>
        </FadeIn>
      ) : (
        <div aria-live="polite" style={{ textAlign: 'center' }}>
          <div style={{
            width: '100%', maxWidth: 380, height: 3, margin: '0 auto 12px',
            background: c.borderSoft, borderRadius: 999, overflow: 'hidden',
          }}>
            <div style={{
              width: `${Math.round(progress * 100)}%`, height: '100%',
              background: c.gold, borderRadius: 999,
              transition: 'width 1s linear',
            }} />
          </div>
          <div style={{
            fontSize: 13, color: c.textDim, letterSpacing: '0.05em',
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          }}>
            Tu diagnóstico continúa en {secondsLeft}s
          </div>
        </div>
      )}
    </div>
  );
}
