import { c } from '../theme';
import FadeIn from './FadeIn';

export default function ScreenTitle({ eyebrow, children }) {
  return (
    <>
      {eyebrow && (
        <FadeIn>
          <div style={{
            fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: c.gold, fontWeight: 500, marginBottom: 20, marginTop: 24,
          }}>
            {eyebrow}
          </div>
        </FadeIn>
      )}
      <FadeIn delay={0.1}>
        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 6vw, 38px)',
          fontWeight: 400, lineHeight: 1.15, margin: '0 0 32px', letterSpacing: '-0.01em',
        }}>
          {children}
        </h1>
      </FadeIn>
    </>
  );
}
