// Dois temas para o funil Método R.E.C.
// - dark: "Editorial Oscuro" (versão original)
// - light: "Warm Editorial" (design system Open Design: papel quente + terracota;
//   ver docs/superpowers/specs/2026-06-11-landing-rec-warm-editorial-design.md)

const GRAIN_DARK = `data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/><feColorMatrix values='0 0 0 0 0.85 0 0 0 0 0.75 0 0 0 0 0.6 0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`;

const GRAIN_LIGHT = `data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.55 0 0 0 0 0.42 0 0 0 0 0.28 0 0 0 0.08 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`;

export const themes = {
  dark: {
    name: 'Editorial Oscuro',
    grain: GRAIN_DARK,
    grainOpacity: 0.4,
    grainBlend: 'overlay',
    background: 'radial-gradient(ellipse at top, #332218 0%, #241813 55%, #1a1009 100%)',
    metaColor: '#241813',
    c: {
      bg: '#241813', bgSoft: '#332218', bgDeep: '#1a0f0a', bgWarm: '#3a2620',
      gold: '#d4a574', goldBright: '#f0d4a8', goldDeep: '#9a7548', goldGlow: '#e8c898',
      rose: '#d4929c', roseDeep: '#a86670',
      text: '#faf0e0', textSoft: '#c4b09e', textDim: '#8a7868',
      border: '#4a3a30', borderSoft: '#3a2b22', borderGold: '#8a6d4a',
      danger: '#d18a7a', success: '#a8c094',
      shadow: '#0a0604',
      // Sombras pre-calculadas
      shadowBox: '0 8px 28px rgba(0,0,0,0.45)',
      shadowPremium: '0 20px 60px rgba(10, 6, 4, 0.8), 0 0 80px rgba(212, 165, 116, 0.08)',
      // Acentos
      accentOnLight: '#9a7548', // pra textos sobre fundo claro (não usado no dark)
    },
  },
  light: {
    name: 'Warm Editorial',
    grain: GRAIN_LIGHT,
    grainOpacity: 0.25,
    grainBlend: 'multiply',
    background: '#FAF7F2',
    metaColor: '#FAF7F2',
    c: {
      bg: '#FAF7F2', bgSoft: '#F2EDE4', bgDeep: '#E9E1D3', bgWarm: '#FFFFFF',
      gold: '#C0512F', goldBright: '#D8845F', goldDeep: '#9A3F24', goldGlow: '#CE6B45',
      rose: '#C49095', roseDeep: '#9C6A6F',
      text: '#1C1A17', textSoft: '#5D564F', textDim: '#8A817A',
      border: '#E0D8CA', borderSoft: '#EBE4D8', borderGold: '#C9846B',
      danger: '#A8442F', success: '#2F5B4F',
      shadow: '#1C1A17',
      shadowBox: '0 8px 28px rgba(28, 26, 23, 0.10), 0 1px 3px rgba(28, 26, 23, 0.05)',
      shadowPremium: '0 24px 60px rgba(28, 26, 23, 0.14), 0 6px 20px rgba(192, 81, 47, 0.10), 0 0 0 1px rgba(192, 81, 47, 0.10)',
      accentOnLight: '#9A3F24',
    },
  },
};

export const DEFAULT_THEME = 'light';
