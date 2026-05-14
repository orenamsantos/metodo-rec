import FadeIn from '../components/FadeIn';
import OptionCard from '../components/OptionCard';
import ScreenTitle from '../components/ScreenTitle';
import Em from '../components/Em';

const OPTIONS = [
  'Menos de 3 meses',
  'Tal vez unos 6 meses',
  'Un año, como máximo',
  'No quiero ni pensarlo...',
];

export default function Q5({ v, onSel }) {
  const { c } = useTheme();
  return (
    <div style={{ paddingTop: 24 }}>
      <ScreenTitle eyebrow="Pregunta 05 · La última">
        Siendo honesta contigo misma: <Em>¿cuánto tiempo</Em> aguanta tu matrimonio así como está?
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
