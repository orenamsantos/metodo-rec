import { c } from '../theme';
import FadeIn from '../components/FadeIn';
import PrimaryButton from '../components/PrimaryButton';

export default function Result({ name, onNext }) {
  const fn = (name || '').split(' ')[0] || '';
  return (
    <div style={{ paddingTop: 24 }}>
      <FadeIn>
        <div style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 500, marginBottom: 14,
        }}>
          Diagnóstico Completado
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(26px, 5.5vw, 34px)',
          fontWeight: 400, lineHeight: 1.2, margin: '0 0 28px', letterSpacing: '-0.01em',
        }}>
          {fn ? `${fn}, tu` : 'Tu'} diagnóstico está listo.
        </h1>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div style={{
          padding: '28px 24px', border: `1px solid ${c.gold}`,
          background: `linear-gradient(135deg, ${c.gold}15 0%, ${c.rose}10 100%)`,
          marginBottom: 28,
        }}>
          <div style={{
            fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: c.gold, marginBottom: 10, fontWeight: 600,
          }}>Tu Perfil</div>
          <h2 style={{
            fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 400,
            margin: '0 0 8px', color: c.text, letterSpacing: '-0.01em',
          }}>
            ZONA CRÍTICA
          </h2>
          <p style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            color: c.goldBright, fontSize: 15, margin: 0,
          }}>
            Bloqueo de Conexión Emocional
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.45}>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: c.text, marginBottom: 20 }}>
          {fn && `${fn}, `}según tus respuestas, estás en la etapa donde <strong style={{ color: c.gold, fontWeight: 500 }}>la desconexión ya se siente a diario</strong>, pero todavía existe espacio para revertirla — siempre que se actúe sobre el bloqueo correcto.
        </p>
      </FadeIn>
      <FadeIn delay={0.55}>
        <div style={{ padding: 20, background: c.bgSoft, border: `1px solid ${c.borderSoft}`, marginBottom: 20 }}>
          <div style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            color: c.gold, fontSize: 13, marginBottom: 12, letterSpacing: '0.05em',
          }}>
            La buena noticia
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: c.text, margin: 0 }}>
            <strong style={{ color: c.gold, fontWeight: 600 }}>78% de las mujeres en Zona Crítica</strong> logran revertir completamente el cuadro en hasta 60 días — siempre que actúen sobre el bloqueo correcto, y no sobre los síntomas.
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.65}>
        <div style={{
          padding: 20, background: `${c.danger}10`,
          border: `1px solid ${c.danger}40`, marginBottom: 28,
        }}>
          <div style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            color: c.danger, fontSize: 13, marginBottom: 12, letterSpacing: '0.05em',
          }}>
            Lo que NO va a funcionar
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.8, color: c.textSoft }}>
            <li>Hablar más (él ya se desconectó de la conversación)</li>
            <li>Darle más espacio (aumenta la distancia)</li>
            <li>Terapia de pareja genérica en esta etapa</li>
            <li>Fingir que todo está bien y esperar que pase</li>
          </ul>
        </div>
      </FadeIn>
      <FadeIn delay={0.75}>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: c.text, marginBottom: 28 }}>
          Existe <strong style={{ color: c.gold, fontWeight: 500 }}>un camino específico</strong> para mujeres en tu perfil. No es genérico, no es "común". Fue diseñado exactamente para la etapa en que estás ahora.
        </p>
      </FadeIn>
      <FadeIn delay={0.85}>
        <PrimaryButton onClick={onNext}>Ver mi Plan Personalizado →</PrimaryButton>
      </FadeIn>
    </div>
  );
}
