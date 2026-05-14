import { useTheme } from '../ThemeContext';

export default function ProgressBar({ step, total = 8 }) {
  const { c, isLight } = useTheme();
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        padding: '20px 0 0',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        marginBottom: 8,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          maxWidth: 640,
          margin: '0 auto 10px',
        }}
      >
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 11,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: c.textDim,
          }}
        >
          R.E.C. · Diagnóstico
        </div>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic',
            fontSize: 12,
            color: c.textSoft,
          }}
        >
          Etapa {Math.min(step, total)} de {total}
        </div>
      </div>
      <div style={{ height: 1, background: c.borderSoft, maxWidth: 640, margin: '0 auto' }}>
        <div
          style={{
            height: 1,
            background: isLight ? c.goldDeep : c.gold,
            width: `${(step / total) * 100}%`,
            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  );
}
