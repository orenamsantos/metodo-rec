import { c, GRAIN } from '../theme';

export default function Layout({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(ellipse at top, ${c.bgSoft} 0%, ${c.bg} 55%, #1a1009 100%)`,
      color: c.text, fontFamily: "'Manrope', sans-serif", position: 'relative',
    }}>
      <div style={{
        position: 'fixed', inset: 0, backgroundImage: `url("${GRAIN}")`,
        opacity: 0.4, pointerEvents: 'none', mixBlendMode: 'overlay', zIndex: 1,
      }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 640, margin: '0 auto', padding: '24px 24px 80px' }}>
        {children}
      </div>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 8px 28px rgba(212, 165, 116, 0.35), 0 0 0 1px rgba(240, 212, 168, 0.6), inset 0 1px 0 rgba(240, 212, 168, 0.4); }
          50% { box-shadow: 0 12px 38px rgba(212, 165, 116, 0.55), 0 0 0 1px rgba(240, 212, 168, 0.8), inset 0 1px 0 rgba(240, 212, 168, 0.5); }
        }
        @keyframes price-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
