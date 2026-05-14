import { c } from '../theme';
import FadeIn from '../components/FadeIn';
import PrimaryButton from '../components/PrimaryButton';
import ScreenTitle from '../components/ScreenTitle';
import Em from '../components/Em';

export default function Capture({ a, setName, setPhone, onSubmit }) {
  const valid = a.name.trim().length >= 2 && a.phone.replace(/\D/g, '').length >= 8;

  const inputStyle = {
    width: '100%', padding: '16px 18px', background: 'transparent',
    border: `1px solid ${c.border}`, color: c.text, fontSize: 16,
    fontFamily: "'Manrope', sans-serif", outline: 'none', borderRadius: 2,
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  };
  const labelStyle = {
    display: 'block', fontSize: 11, letterSpacing: '0.2em',
    textTransform: 'uppercase', color: c.gold, marginBottom: 8, fontWeight: 500,
  };

  return (
    <div style={{ paddingTop: 24 }}>
      <ScreenTitle eyebrow="Casi listo">
        Todo listo. Vamos a preparar tu <Em>diagnóstico personalizado.</Em>
      </ScreenTitle>
      <FadeIn delay={0.2}>
        <p style={{ color: c.textSoft, marginTop: -16, marginBottom: 32, fontSize: 15, lineHeight: 1.6 }}>
          Te vamos a enviar tu resultado completo y un contenido de regalo, incluso si no haces nada más después de esto. Sin spam, prometido.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Tu nombre</label>
          <input
            type="text" value={a.name} onChange={(e) => setName(e.target.value)}
            placeholder="¿Cómo te llamas?" style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = c.gold)}
            onBlur={(e) => (e.target.style.borderColor = c.border)}
          />
        </div>
      </FadeIn>
      <FadeIn delay={0.4}>
        <div style={{ marginBottom: 28 }}>
          <label style={labelStyle}>WhatsApp (con código de país)</label>
          <input
            type="tel" value={a.phone} onChange={(e) => setPhone(e.target.value)}
            placeholder="+52 1 55 0000 0000" style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = c.gold)}
            onBlur={(e) => (e.target.style.borderColor = c.border)}
          />
        </div>
      </FadeIn>
      <FadeIn delay={0.5}>
        <PrimaryButton onClick={onSubmit} disabled={!valid}>Ver mi Diagnóstico →</PrimaryButton>
        <div style={{
          marginTop: 18, padding: '12px 14px', background: c.bgSoft,
          border: `1px solid ${c.borderSoft}`, fontSize: 11, color: c.textDim,
          lineHeight: 1.6, textAlign: 'center',
        }}>
          🔒 Tus datos están protegidos. No compartimos con nadie.
        </div>
      </FadeIn>
    </div>
  );
}
