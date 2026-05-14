import { useState } from 'react';
import { c } from '../theme';

export default function BuyButton({ children, onClick, subtitle }) {
  const [hover, setHover] = useState(false);
  return (
    <div>
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: '100%', padding: '24px 28px',
          background: `linear-gradient(135deg, ${c.goldDeep} 0%, ${c.gold} 25%, ${c.goldBright} 50%, ${c.gold} 75%, ${c.goldDeep} 100%)`,
          backgroundSize: '300% 100%',
          backgroundPosition: hover ? '100% 50%' : '0% 50%',
          color: c.bgDeep, border: 'none',
          fontFamily: "'Manrope', sans-serif", fontSize: 16, fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          cursor: 'pointer', borderRadius: 2,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: 'glow-pulse 2.4s ease-in-out infinite',
          transform: hover ? 'translateY(-2px)' : 'translateY(0)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: c.bgDeep, opacity: 0.6, fontSize: 12 }}>✦</span>
          {children}
          <span style={{ color: c.bgDeep, opacity: 0.6, fontSize: 12 }}>✦</span>
        </span>
      </button>
      {subtitle && (
        <div style={{
          textAlign: 'center', marginTop: 12,
          fontFamily: "'Fraunces', serif", fontStyle: 'italic',
          fontSize: 13, color: c.goldGlow, letterSpacing: '0.02em',
        }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
