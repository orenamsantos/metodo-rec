// Dois temas para o funil Método R.E.C.
// - dark: "Editorial Oscuro" (versão original)
// - light: "Editorial Luminoso" (premium boutique — creme + champagne)

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
    name: 'Editorial Luminoso',
    grain: GRAIN_LIGHT,
    grainOpacity: 0.35,
    grainBlend: 'multiply',
    background: 'radial-gradient(ellipse at top, #fff8e8 0%, #fbf3e0 50%, #f3e6c8 100%)',
    metaColor: '#fbf3e0',
    c: {
      bg: '#fbf6ec', bgSoft: '#f5ebd7', bgDeep: '#ead8b8', bgWarm: '#fff8e8',
      gold: '#b89968', goldBright: '#d4b683', goldDeep: '#7a5f3a', goldGlow: '#c9a974',
      rose: '#c49095', roseDeep: '#9c6a6f',
      text: '#3a2618', textSoft: '#6f5440', textDim: '#a89580',
      border: '#ddc9a8', borderSoft: '#ebdac0', borderGold: '#a88a5a',
      danger: '#a85540', success: '#6a8458',
      shadow: '#3a2618',
      shadowBox: '0 8px 28px rgba(58, 38, 24, 0.12), 0 1px 3px rgba(58, 38, 24, 0.06)',
      shadowPremium: '0 24px 60px rgba(58, 38, 24, 0.18), 0 6px 20px rgba(184, 153, 104, 0.15), 0 0 0 1px rgba(168, 138, 90, 0.15)',
      accentOnLight: '#7a5f3a',
    },
  },
};

export const DEFAULT_THEME = 'light';
