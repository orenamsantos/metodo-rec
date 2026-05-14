import { c } from '../theme';
import FadeIn from '../components/FadeIn';
import OptionCard from '../components/OptionCard';
import PrimaryButton from '../components/PrimaryButton';
import ScreenTitle from '../components/ScreenTitle';
import Em from '../components/Em';

const OPTIONS = [
  'Me siento invisible para él',
  'Parecemos dos extraños viviendo bajo el mismo techo',
  'Tengo miedo de que se interese por otra',
  'La intimidad prácticamente desapareció',
  'Está siempre en el celular, distante',
  'Discutimos por cualquier tontería',
  'Yo todavía lo amo, pero no sé si él aún me ama',
];

export default function Q2({ sel, onTog, onNext }) {
  return (
    <div style={{ paddingTop: 24 }}>
      <ScreenTitle eyebrow="Pregunta 02">
        Marca todo lo que sientes <Em>hoy</Em>
      </ScreenTitle>
      <FadeIn delay={0.15}>
        <p style={{
          color: c.textSoft, fontSize: 13, marginTop: -20, marginBottom: 24,
          fontStyle: 'italic', fontFamily: "'Fraunces', serif",
        }}>
          Puedes marcar más de una. Sé honesta — nadie más va a verlo.
        </p>
      </FadeIn>
      <FadeIn delay={0.25}>
        <div>
          {OPTIONS.map((opt, i) => (
            <OptionCard key={opt} idx={i + 1} label={opt} sel={sel.includes(opt)} onClick={() => onTog(opt)} multi />
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.4}>
        <div style={{ marginTop: 24 }}>
          <PrimaryButton onClick={onNext} disabled={sel.length === 0}>Continuar →</PrimaryButton>
        </div>
      </FadeIn>
    </div>
  );
}
