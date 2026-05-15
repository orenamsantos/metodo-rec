import { useTheme } from '../ThemeContext';

export default function BackButton({ onClick }) {
  const { c } = useTheme();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Volver al paso anterior"
      style={{
        position: 'fixed',
        top: 'calc(env(safe-area-inset-top, 0px) + 12px)',
        left: 'calc(env(safe-area-inset-left, 0px) + 12px)',
        zIndex: 50,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '6px 10px',
        background: 'transparent',
        color: c.textDim,
        border: 'none',
        borderRadius: 6,
        fontFamily: "'Manrope', sans-serif",
        fontSize: 12,
        letterSpacing: '0.05em',
        cursor: 'pointer',
        opacity: 0.7,
        transition: 'opacity 0.15s ease, background 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.background = `${c.borderSoft}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.7';
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <span style={{ fontSize: 16, lineHeight: 1, marginTop: -1 }}>‹</span>
      <span>Atrás</span>
    </button>
  );
}
