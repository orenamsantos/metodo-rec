function generateEventId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'evt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);
}

function pushToDataLayer(payload) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function trackStepChange(slug, stepIndex) {
  const detail = { slug, stepIndex, timestamp: Date.now() };

  window.dispatchEvent(new CustomEvent('quiz:step', { detail }));

  pushToDataLayer({
    event: 'quiz_step_view',
    event_id: generateEventId(),
    step_slug: slug,
    step_index: stepIndex,
  });
}

export function trackQuizComplete(leadData) {
  const hasEmail = !!(leadData && leadData.email);

  window.dispatchEvent(new CustomEvent('quiz:complete', { detail: { hasEmail } }));

  pushToDataLayer({
    event: 'quiz_complete',
    event_id: generateEventId(),
    lead_status: hasEmail ? 'with_email' : 'no_email',
  });
}

export function trackOfferView({ isFirstView, viewCount, delaySkipped }) {
  const detail = {
    is_first_view: isFirstView,
    view_count: viewCount,
    delay_skipped: delaySkipped,
  };

  window.dispatchEvent(new CustomEvent('quiz:offer_view', { detail }));

  pushToDataLayer({
    event: 'offer_view',
    event_id: generateEventId(),
    is_first_view: isFirstView,
    view_count: viewCount,
    delay_skipped: delaySkipped,
  });
}

// Dispara no submit da captura. Empurra o lead (telefone + nome) pro dataLayer
// pra alimentar o advanced matching server-side: vira o evento Lead e enriquece
// o InitiateCheckout (a pessoa já deu nome+WhatsApp antes do checkout).
// PII vai CRUA pro dataLayer/server (first-party); o server hasheia (SHA-256)
// antes de mandar pra Meta. Telefone normalizado pra só dígitos, preservando o
// código de país que a pessoa digitou (LATAM: México 52, Colômbia 57, etc.).
export function trackLead({ name, phone } = {}) {
  const digits = (phone || '').replace(/\D/g, '');
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  const fn = parts[0] || '';
  const ln = parts.slice(1).join(' ') || '';

  window.dispatchEvent(new CustomEvent('quiz:lead', { detail: { hasPhone: digits.length >= 8 } }));

  pushToDataLayer({
    event: 'generate_lead',
    event_id: generateEventId(),
    lead_phone: digits,
    lead_fn: fn,
    lead_ln: ln,
  });
}

export function trackPurchaseIntent(productSlug, priceUSD) {
  window.dispatchEvent(new CustomEvent('quiz:purchase_intent', {
    detail: { productSlug, priceUSD },
  }));
}
