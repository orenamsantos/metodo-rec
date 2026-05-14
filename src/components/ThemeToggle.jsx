import { useTheme } from '../ThemeContext';

export default function ThemeToggle() {
  const { c, isLight, toggle, name } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={`Cambiar a tema ${isLight ? 'oscuro' : 'luminoso'}`}
      title={`Tema actual: ${name}`}
      style={{
        position: 'fixed',
        top: 'max(12px, env(safe-area-inset-top))',
        right: 12,
        zIndex: 50,
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: isLight ? `${c.bgWarm}f0` : `${c.bgSoft}f0`,
        border: `1px solid ${c.borderGold}`,
        color: c.gold,
        fontFamily: "'Fraunces', serif",
        fontSize: 16,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: c.shadowBox,
        transition: 'transform 0.3s ease, background 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {isLight ? '☾' : '☀'}
    </button>
  );
}
