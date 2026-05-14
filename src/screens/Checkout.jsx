import { c } from '../theme';
import FadeIn from '../components/FadeIn';
import PrimaryButton from '../components/PrimaryButton';
import Em from '../components/Em';

export default function Checkout({ onComplete }) {
  return (
    <div style={{ paddingTop: 24 }}>
      <FadeIn>
        <div style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: c.gold, fontWeight: 500, marginBottom: 14, textAlign: 'center',
        }}>
          Finalizando tu acceso
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: 'clamp(24px, 5vw, 30px)',
          fontWeight: 400, textAlign: 'center',
          margin: '0 0 28px', letterSpacing: '-0.01em',
        }}>
          Estás a <Em>un paso</Em>.
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div style={{
          padding: 28, border: `1px solid ${c.gold}`,
          background: `${c.gold}10`, textAlign: 'center', marginBottom: 20,
        }}>
          <div style={{ fontSize: 12, color: c.textSoft, marginBottom: 16, letterSpacing: '0.05em' }}>
            [ AQUÍ VA EL IFRAME DEL CHECKOUT DE HOTMART / KIWIFY ]
          </div>
          <div style={{
            padding: 40, background: c.bg, border: `1px dashed ${c.border}`,
            fontSize: 12, color: c.textDim, letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            Embed del Checkout
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div style={{
          padding: 18, background: c.bgSoft,
          border: `1px solid ${c.gold}60`, marginBottom: 14,
        }}>
          <label style={{ display: 'flex', gap: 14, cursor: 'pointer' }}>
            <input type="checkbox" style={{ marginTop: 4, accentColor: c.gold }} />
            <div>
              <div style={{
                fontSize: 12, fontWeight: 600, marginBottom: 6, color: c.gold,
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                + ORDER BUMP · $47 → $19
              </div>
              <div style={{ fontSize: 14, color: c.text, marginBottom: 6, fontWeight: 500 }}>
                Audios Guiados de Reconexión + Audiolibro Premium
              </div>
              <div style={{ fontSize: 13, color: c.textSoft, lineHeight: 1.5 }}>
                5 audios guiados (12-18 min cada uno) para escuchar en los momentos más difíciles. Más el audiolibro narrado completo en español, ideal para escuchar mientras trabajas o conduces.
              </div>
            </div>
          </label>
        </div>
      </FadeIn>
      <FadeIn delay={0.35}>
        <PrimaryButton onClick={onComplete}>Simular Compra Exitosa →</PrimaryButton>
      </FadeIn>
      <FadeIn delay={0.4}>
        <div style={{
          marginTop: 18, textAlign: 'center', fontSize: 11, color: c.textDim,
          letterSpacing: '0.05em', lineHeight: 1.7,
        }}>
          🔒 Compra 100% segura · Acceso inmediato después del pago<br />
          Garantía incondicional de 30 días
        </div>
      </FadeIn>
    </div>
  );
}
