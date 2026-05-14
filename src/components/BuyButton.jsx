import { useState } from 'react';
import { useTheme } from '../ThemeContext';

export default function BuyButton({ children, onClick, subtitle }) {
  const { c, isLight } = useTheme();
  const [hover, setHover] = useState(false);

  const gradient = isLight
    ? `linear-gradient(135deg, ${c.goldDeep} 0%, ${c.gold} 30%, ${c.goldBright} 50%, ${c.gold} 70%, ${c.goldDeep} 100%)`
    : `linear-gradient(135deg, ${c.goldDeep} 0%, ${c.gold} 25%, ${c.goldBright} 50%, ${c.gold} 75%, ${c.goldDeep} 100%)`;

  const textColor = isLight ? '#fffaf0' : c.bgDeep;
  const animation = isLight ? 'glow-pulse-light 2.4s ease-in-out infinite' : 'glow-pulse-dark 2.4s ease-in-out infinite';

  return (
    <div>
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: '100%',
          minHeight: 64,
          padding: '22px 28px',
          background: gradient,
          backgroundSize: '300% 100%',
          backgroundPosition: hover ? '100% 50%' : '0% 50%',
          color: textColor,
          border: 'none',
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(14px, 3.8vw, 16px)',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          borderRadius: isLight ? 6 : 2,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          animation,
          transform: hover ? 'translateY(-2px)' : 'translateY(0)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: textColor, opacity: 0.65, fontSize: 12 }}>✦</span>
          {children}
          <span style={{ color: textColor, opacity: 0.65, fontSize: 12 }}>✦</span>
        </span>
      </button>
      {subtitle && (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            fontFamily: "'Fraunces', serif",
            fontStyle: 'italic',
            fontSize: 13,
            color: isLight ? c.goldDeep : c.goldGlow,
            letterSpacing: '0.02em',
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}
