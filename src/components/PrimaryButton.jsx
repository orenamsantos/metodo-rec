import { useTheme } from '../ThemeContext';

export default function PrimaryButton({ children, onClick, disabled }) {
  const { c, isLight } = useTheme();

  // Warm Editorial: fill chapado (sem gradiente); label = papel/fundo do tema.
  const bg = disabled ? c.borderSoft : c.gold;

  const color = disabled ? c.textDim : c.bg;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = isLight
          ? '0 10px 24px rgba(192, 81, 47, 0.32)'
          : '0 10px 28px rgba(212, 165, 116, 0.25)';
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = isLight
          ? '0 6px 16px rgba(192, 81, 47, 0.24)'
          : 'none';
      }}
      style={{
        width: '100%',
        minHeight: 56,
        padding: '18px 24px',
        background: bg,
        color,
        border: 'none',
        fontFamily: "'Manrope', sans-serif",
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        borderRadius: isLight ? 12 : 2,
        boxShadow: disabled ? 'none' : isLight ? '0 6px 16px rgba(192, 81, 47, 0.24)' : 'none',
      }}
    >
      {children}
    </button>
  );
}
