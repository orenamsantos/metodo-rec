export const STEPS = [
  { id: 0,  slug: 'landing',            name: 'Landing' },
  { id: 1,  slug: 'q1-tiempo-cambio',   name: 'Q1 — Cuánto tiempo' },
  { id: 2,  slug: 'q2-sentimientos',    name: 'Q2 — Sentimientos actuales' },
  { id: 3,  slug: 'interrupcion-1',     name: 'Interrupción emocional 1' },
  { id: 4,  slug: 'q3-conversacion',    name: 'Q3 — Conversación con él' },
  { id: 5,  slug: 'video-especialista', name: 'Video especialista (Dra. Sofía)' },
  { id: 6,  slug: 'q4-compromiso',      name: 'Q4 — Compromiso' },
  { id: 7,  slug: 'q5-urgencia',        name: 'Q5 — Urgencia interna' },
  { id: 8,  slug: 'captura-lead',       name: 'Captura de lead' },
  { id: 9,  slug: 'analisis-loading',   name: 'Loading / Análisis' },
  { id: 10, slug: 'resultado-zona',     name: 'Resultado Zona Crítica' },
  { id: 11, slug: 'anclaje-precio',     name: 'Anclaje de precio' },
  { id: 12, slug: 'oferta-vsl',         name: 'Oferta + VSL' },
  { id: 14, slug: 'upsell-cartas',      name: 'Upsell — Cartas y Guiones' },
  { id: 15, slug: 'downsell-guiones',   name: 'Downsell — 7 Guiones' },
  { id: 16, slug: 'gracias',            name: 'Thank You' },
];

export const QUIZ_INTERNAL_MAX_ID = 12;

export const getStepBySlug  = (slug) => STEPS.find((s) => s.slug === slug);
export const getStepById    = (id)   => STEPS.find((s) => s.id === id);
export const getStepIndex   = (slug) => STEPS.findIndex((s) => s.slug === slug);
export const isValidSlug    = (slug) => STEPS.some((s) => s.slug === slug);
export const isInternalStep = (id)   => id >= 0 && id <= QUIZ_INTERNAL_MAX_ID;
