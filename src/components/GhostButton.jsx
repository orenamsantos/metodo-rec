import { useTheme } from '../ThemeContext';

export default function GhostButton({ children, onClick }) {
  const { c } = useTheme();
  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.color = c.text)}
      onMouseLeave={(e) => (e.currentTarget.style.color = c.textDim)}
      style={{
        width: '100%',
        minHeight: 44,
        padding: '14px 24px',
        background: 'transparent',
        color: c.textDim,
        border: 'none',
        fontFamily: "'Manrope', sans-serif",
        fontSize: 13,
        cursor: 'pointer',
        textDecoration: 'underline',
        textUnderlineOffset: 4,
        textDecorationColor: c.borderSoft,
        transition: 'color 0.2s',
      }}
    >
      {children}
    </button>
  );
}
