import FadeIn from '../components/FadeIn';
import OptionCard from '../components/OptionCard';
import ScreenTitle from '../components/ScreenTitle';
import Em from '../components/Em';

const OPTIONS = [
  'Sí, haría lo que fuera por recuperar lo que tengo',
  'Sí, si es algo realista y no imposible',
  'Tal vez, depende de lo que implique',
  'Ya no estoy segura de si lo quiero',
];

export default function Q4({ v, onSel }) {
  const { c } = useTheme();
  return (
    <div style={{ paddingTop: 24 }}>
      <ScreenTitle eyebrow="Pregunta 04">
        Si existiera un <Em>camino comprobado</Em> para reavivar tu matrimonio en 30 días con aplicación diaria, ¿te comprometerías?
      </ScreenTitle>
      <FadeIn delay={0.2}>
        <div>
          {OPTIONS.map((opt, i) => (
            <OptionCard key={opt} idx={i + 1} label={opt} sel={v === opt} onClick={() => onSel(opt)} />
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
