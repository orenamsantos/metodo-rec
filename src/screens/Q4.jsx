import FadeIn from '../components/FadeIn';
import { useTheme } from '../ThemeContext';
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
        Si hubiera un camino claro, paso a paso, para romper ese patrón y que <Em>él vuelva a buscarte a ti</Em>, ¿lo seguirías?
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
