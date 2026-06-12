import { useTheme } from '../ThemeContext';
import FadeIn from '../components/FadeIn';
import PrimaryButton from '../components/PrimaryButton';
import { BUCKETS } from '../lib/buckets';

// Copy literal do laudo do Caio (caio-copy-rec-v2.md, Tela 10).
// As 3 versões citam a forma do patrón com o nome que a Dra. Sofía fala nos
// vídeos (ponte de taxonomia). ZONA CRÍTICA segue como guarda-chuva visual.
// Opção A (videos-produccion-FINAL.md): "Ciclo de Persecución" é o mecanismo
// guarda-chuva (a dinâmica dos dois); o Bloqueo de X é o lado dela que o
// alimenta. O box do perfil nomeia o Ciclo pros 3 baldes.
const COPY = {
  deseo: {
    paragraph: (fn, Strong) => (
      <>
        {fn && `${fn}, `}según lo que marcaste, el deseo se apagó antes que el amor.
        Se acuestan en la misma cama y hay treinta centímetros que se sienten como un
        muro. Él está ahí, y a la vez no está. Es lo que la Dra. Sofía llama{' '}
        <Strong>anestesia emocional</Strong>: el cuerpo deja de reaccionar antes que el
        corazón. Y cada semana que pasa, ese muro se vuelve un poco más normal.
      </>
    ),
    goodNews: (Strong) => (
      <>
        El Bloqueo de Deseo es el que más rápido responde cuando se trabaja en el orden
        correcto: <Strong>78% de las mujeres con tu mismo bloqueo</Strong> revierten el
        cuadro en hasta 60 días. Pero es también el que más castiga los intentos a ciegas.
      </>
    ),
    notWorking: [
      'Insinuarte o provocarlo más (la presión apaga, no enciende)',
      'Esperar a que él dé el primer paso (la anestesia no se cura sola)',
      'Sentarlo a "hablar de nosotros" (lo cierra todavía más)',
      'Resignarte a vivir como compañeros de casa',
    ],
    transition: (Strong) => (
      <>
        Existe <Strong>una secuencia específica</Strong> para reactivar el deseo de él
        hacia ti, sin perseguirlo y sin rogarle. Fue diseñada exactamente para tu
        bloqueo, en la etapa en que estás ahora.
      </>
    ),
  },
  conexion: {
    paragraph: (fn, Strong) => (
      <>
        {fn && `${fn}, `}según lo que marcaste, ya no es que peleen. Comen en la misma
        mesa y el silencio pesa más que cualquier pelea. Hablan de los niños, de las
        cuentas, de la logística. De ustedes dos, nada. Es lo que la Dra. Sofía llama{' '}
        <Strong>distancia funcional</Strong>: la casa funciona, el matrimonio se apaga.
        Y lo más peligroso de este bloqueo es que se disfraza de paz.
      </>
    ),
    goodNews: (Strong) => (
      <>
        El Bloqueo de Conexión es el más común y el mejor mapeado de los tres:{' '}
        <Strong>78% de las mujeres con tu mismo bloqueo</Strong> revierten el cuadro en
        hasta 60 días, cuando actúan sobre el bloqueo y no sobre los síntomas.
      </>
    ),
    notWorking: [
      'Hablar más (él ya se desconectó de esas conversaciones)',
      'Planear una cena o un viaje "para reconectar" (cambia el lugar, el patrón viaja con ustedes)',
      'Darle más espacio (profundiza el silencio)',
      'Terapia de pareja genérica en esta etapa',
    ],
    transition: (Strong) => (
      <>
        Existe <Strong>una secuencia específica</Strong> para que vuelvan a ser dos
        personas que se eligen, no dos socios que administran una casa. Fue diseñada
        exactamente para tu bloqueo, en la etapa en que estás ahora.
      </>
    ),
  },
  confianza: {
    paragraph: (fn, Strong) => (
      <>
        {fn && `${fn}, `}según lo que marcaste, hay algo que te desgasta más que la
        distancia: no saber con qué versión de él vas a amanecer. Un día se acerca y
        parece que vuelve, al otro se apaga sin explicación. Y tú ya mides cada palabra
        antes de hablarle. Es lo que la Dra. Sofía llama{' '}
        <Strong>silencio acumulado</Strong>: todo lo que no se dijeron durante meses se
        volvió un campo minado. Por eso discuten por tonterías. La tontería es la
        chispa; la pólvora es lo que llevan callado.
      </>
    ),
    goodNews: (Strong) => (
      <>
        El Bloqueo de Confianza parece el más confuso, pero es el más predecible de los
        tres: el Ciclo de Persecución, alejarse y volver, sigue reglas exactas.{' '}
        <Strong>78% de las mujeres con tu mismo bloqueo</Strong> revierten el cuadro en
        hasta 60 días cuando dejan de reaccionar al ciclo y empiezan a romperlo.
      </>
    ),
    notWorking: [
      'Exigir definiciones ("¿todavía me amas?" lo empuja a la defensiva)',
      'Revisar su celular o buscar señales (alimenta tu miedo, no te da la verdad)',
      'La conversación definitiva para "aclarar todo de una vez"',
      'Castigarlo con tu propio silencio cuando él se aleja',
    ],
    transition: (Strong) => (
      <>
        Existe <Strong>una secuencia específica</Strong> para salir del Ciclo de
        Persecución, y que la próxima vez que él se acerque, se quede. Fue
        diseñada exactamente para tu bloqueo, en la etapa en que estás ahora.
      </>
    ),
  },
};

export default function Result({ name, bucket, onNext }) {
  const { c } = useTheme();
  const fn = (name || '').split(' ')[0] || '';
  const b = bucket && COPY[bucket.id] ? bucket : BUCKETS.conexion;
  const copy = COPY[b.id];

  const Strong = ({ children }) => (
    <strong style={{ color: c.gold, fontWeight: 600 }}>{children}</strong>
  );

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
          borderRadius: 12,
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
            color: c.goldBright, fontSize: 15, margin: '0 0 6px',
          }}>
            El Ciclo de Persecución ya está activo en tu matrimonio.
          </p>
          <p style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            color: c.goldBright, fontSize: 15, margin: 0,
          }}>
            Lo que lo alimenta de tu lado: <em style={{ color: c.gold }}>{b.label}</em>
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.45}>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: c.text, marginBottom: 20 }}>
          {copy.paragraph(fn, Strong)}
        </p>
      </FadeIn>
      <FadeIn delay={0.55}>
        <div style={{ padding: 20, background: c.bgSoft, border: `1px solid ${c.borderSoft}`, borderRadius: 12, marginBottom: 20 }}>
          <div style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            color: c.gold, fontSize: 13, marginBottom: 12, letterSpacing: '0.05em',
          }}>
            La buena noticia
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: c.text, margin: 0 }}>
            {copy.goodNews(Strong)}
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.65}>
        <div style={{
          padding: 20, background: `${c.danger}10`,
          border: `1px solid ${c.danger}40`, borderRadius: 12, marginBottom: 28,
        }}>
          <div style={{
            fontFamily: "'Fraunces', serif", fontStyle: 'italic',
            color: c.danger, fontSize: 13, marginBottom: 12, letterSpacing: '0.05em',
          }}>
            Lo que NO va a funcionar
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.8, color: c.textSoft }}>
            {copy.notWorking.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </FadeIn>
      <FadeIn delay={0.75}>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: c.text, marginBottom: 28 }}>
          {copy.transition(Strong)}
        </p>
      </FadeIn>
      <FadeIn delay={0.85}>
        <PrimaryButton onClick={onNext}>Ver mi Plan para el {b.label} →</PrimaryButton>
      </FadeIn>
    </div>
  );
}
