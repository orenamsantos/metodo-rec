import { useTheme } from '../ThemeContext';

export default function Em({ children }) {
  const { c, isLight } = useTheme();
  return (
    <em style={{ color: isLight ? c.goldDeep : c.gold, fontStyle: 'italic' }}>{children}</em>
  );
}
