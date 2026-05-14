import { c } from '../theme';

export default function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => !disabled && (e.target.style.background = c.goldBright)}
      onMouseLeave={(e) => !disabled && (e.target.style.background = c.gold)}
      style={{
        width: '100%', padding: '18px 24px',
        background: disabled ? c.borderSoft : c.gold,
        color: disabled ? c.textDim : c.bg, border: 'none',
        fontFamily: "'Manrope', sans-serif", fontSize: 15, fontWeight: 600,
        letterSpacing: '0.04em', textTransform: 'uppercase',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease', borderRadius: 2,
      }}
    >
      {children}
    </button>
  );
}
