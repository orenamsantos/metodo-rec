import { c } from '../theme';

export default function GhostButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => (e.target.style.color = c.text)}
      onMouseLeave={(e) => (e.target.style.color = c.textDim)}
      style={{
        width: '100%', padding: '14px 24px', background: 'transparent',
        color: c.textDim, border: 'none', fontFamily: "'Manrope', sans-serif",
        fontSize: 13, cursor: 'pointer', textDecoration: 'underline',
        textUnderlineOffset: 4, textDecorationColor: c.borderSoft, transition: 'color 0.2s',
      }}
    >
      {children}
    </button>
  );
}
