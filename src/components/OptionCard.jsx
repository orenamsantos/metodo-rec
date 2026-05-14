import { useTheme } from '../ThemeContext';

export default function OptionCard({ idx, label, sel, onClick, multi }) {
  const { c, isLight } = useTheme();

  const selectedBg = isLight ? `${c.gold}1f` : `${c.gold}15`;
  const baseBg = isLight ? c.bgWarm : 'transparent';

  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!sel) {
          e.currentTarget.style.borderColor = c.goldBright;
          if (isLight) e.currentTarget.style.boxShadow = `0 6px 16px ${c.shadow}14`;
        }
      }}
      onMouseLeave={(e) => {
        if (!sel) {
          e.currentTarget.style.borderColor = c.border;
          if (isLight) e.currentTarget.style.boxShadow = `0 1px 2px ${c.shadow}0a`;
        }
      }}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '20px 22px',
        minHeight: 64,
        background: sel ? selectedBg : baseBg,
        border: `1px solid ${sel ? c.gold : c.border}`,
        color: c.text,
        fontFamily: "'Manrope', sans-serif",
        fontSize: 15,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderRadius: isLight ? 6 : 2,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        marginBottom: 10,
        boxShadow: isLight ? (sel ? `0 8px 20px ${c.shadow}1a` : `0 1px 2px ${c.shadow}0a`) : 'none',
      }}
    >
      {multi ? (
        <span
          style={{
            width: 20,
            height: 20,
            borderRadius: isLight ? 4 : 0,
            border: `1.5px solid ${sel ? c.gold : c.textDim}`,
            background: sel ? c.gold : 'transparent',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {sel && (
            <span style={{ color: isLight ? '#fffaf0' : c.bg, fontSize: 12, fontWeight: 700 }}>
              ✓
            </span>
          )}
        </span>
      ) : (
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic',
            fontSize: 14,
            color: sel ? (isLight ? c.goldDeep : c.gold) : c.textDim,
            width: 20,
            flexShrink: 0,
          }}
        >
          {String(idx).padStart(2, '0')}
        </span>
      )}
      <span style={{ lineHeight: 1.5, flex: 1 }}>{label}</span>
    </button>
  );
}
