import { c } from '../theme';

export default function OptionCard({ idx, label, sel, onClick, multi }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => { if (!sel) e.currentTarget.style.borderColor = c.goldBright; }}
      onMouseLeave={(e) => { if (!sel) e.currentTarget.style.borderColor = c.border; }}
      style={{
        width: '100%', textAlign: 'left', padding: '20px 22px',
        background: sel ? `${c.gold}15` : 'transparent',
        border: `1px solid ${sel ? c.gold : c.border}`,
        color: c.text, fontFamily: "'Manrope', sans-serif",
        fontSize: 15, cursor: 'pointer', transition: 'all 0.3s ease',
        borderRadius: 2, display: 'flex', alignItems: 'center',
        gap: 18, marginBottom: 10,
      }}
    >
      {multi ? (
        <span style={{
          width: 18, height: 18,
          border: `1px solid ${sel ? c.gold : c.textDim}`,
          background: sel ? c.gold : 'transparent', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {sel && <span style={{ color: c.bg, fontSize: 11, fontWeight: 700 }}>✓</span>}
        </span>
      ) : (
        <span style={{
          fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          fontSize: 14, color: sel ? c.gold : c.textDim, width: 20, flexShrink: 0,
        }}>
          {String(idx).padStart(2, '0')}
        </span>
      )}
      <span style={{ lineHeight: 1.5, flex: 1 }}>{label}</span>
    </button>
  );
}
