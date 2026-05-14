import { useTheme } from '../ThemeContext';

export default function PrimaryButton({ children, onClick, disabled }) {
  const { c, isLight } = useTheme();

  const bg = disabled
    ? c.borderSoft
    : isLight
    ? `linear-gradient(135deg, ${c.goldDeep} 0%, ${c.gold} 50%, ${c.goldDeep} 100%)`
    : c.gold;

  const color = disabled ? c.textDim : isLight ? '#fffaf0' : c.bg;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = isLight
          ? '0 12px 28px rgba(122, 95, 58, 0.28), 0 4px 8px rgba(58, 38, 24, 0.12)'
          : '0 10px 28px rgba(212, 165, 116, 0.25)';
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = isLight
          ? '0 6px 16px rgba(122, 95, 58, 0.18)'
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
        borderRadius: isLight ? 4 : 2,
        boxShadow: disabled ? 'none' : isLight ? '0 6px 16px rgba(122, 95, 58, 0.18)' : 'none',
      }}
    >
      {children}
    </button>
  );
}
