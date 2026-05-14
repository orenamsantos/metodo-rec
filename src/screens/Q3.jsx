import FadeIn from '../components/FadeIn';
import { useTheme } from '../ThemeContext';
import OptionCard from '../components/OptionCard';
import ScreenTitle from '../components/ScreenTitle';
import Em from '../components/Em';

const OPTIONS = [
  'Sí, muchas veces — y él no cambia',
  'Sí, pero solo empeora cuando hablo',
  'Tengo miedo de su reacción',
  'Todavía no he tenido el valor',
];

export default function Q3({ v, onSel }) {
  const { c } = useTheme();
  return (
    <div style={{ paddingTop: 24 }}>
      <ScreenTitle eyebrow="Pregunta 03">
        ¿Has intentado <Em>hablar abiertamente</Em> con él sobre lo que sientes?
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
