import FadeIn from '../components/FadeIn';
import { useTheme } from '../ThemeContext';
import OptionCard from '../components/OptionCard';
import ScreenTitle from '../components/ScreenTitle';
import Em from '../components/Em';

const OPTIONS = [
  'Menos de 3 meses',
  'Entre 3 meses y 1 año',
  'Más de 1 año',
  'Sinceramente, ya no recuerdo cómo era antes',
];

export default function Q1({ v, onSel }) {
  const { c } = useTheme();
  return (
    <div style={{ paddingTop: 24 }}>
      <ScreenTitle eyebrow="Pregunta 01">
        ¿Hace cuánto sientes que <Em>se aleja y vuelve</Em>?
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
