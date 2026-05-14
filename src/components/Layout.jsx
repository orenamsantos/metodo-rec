import { useTheme } from '../ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {
  const { c, grain, grainOpacity, grainBlend, background } = useTheme();

  return (
    <div
      style={{
        minHeight: '100vh',
        background,
        color: c.text,
        fontFamily: "'Manrope', sans-serif",
        position: 'relative',
        transition: 'background 0.5s ease, color 0.5s ease',
      }}
    >
      <div
        style={{
          position: 'fixed', inset: 0,
          backgroundImage: `url("${grain}")`,
          opacity: grainOpacity,
          pointerEvents: 'none',
          mixBlendMode: grainBlend,
          zIndex: 1,
        }}
      />
      <ThemeToggle />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 640,
          margin: '0 auto',
          padding: 'max(20px, env(safe-area-inset-top)) clamp(18px, 5vw, 24px) max(60px, env(safe-area-inset-bottom)) clamp(18px, 5vw, 24px)',
        }}
      >
        {children}
      </div>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes glow-pulse-dark {
          0%, 100% { box-shadow: 0 8px 28px rgba(212, 165, 116, 0.35), 0 0 0 1px rgba(240, 212, 168, 0.6), inset 0 1px 0 rgba(240, 212, 168, 0.4); }
          50% { box-shadow: 0 12px 38px rgba(212, 165, 116, 0.55), 0 0 0 1px rgba(240, 212, 168, 0.8), inset 0 1px 0 rgba(240, 212, 168, 0.5); }
        }
        @keyframes glow-pulse-light {
          0%, 100% { box-shadow: 0 10px 32px rgba(184, 153, 104, 0.28), 0 4px 12px rgba(58, 38, 24, 0.12), 0 0 0 1px rgba(122, 95, 58, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 14px 42px rgba(184, 153, 104, 0.42), 0 6px 16px rgba(58, 38, 24, 0.18), 0 0 0 1px rgba(122, 95, 58, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4); }
        }
        @keyframes price-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes seal-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        ::selection { background: rgba(184, 153, 104, 0.3); }
      `}</style>
    </div>
  );
}
