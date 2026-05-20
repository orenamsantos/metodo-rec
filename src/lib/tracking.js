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

export function trackPurchaseIntent(productSlug, priceUSD) {
  window.dispatchEvent(new CustomEvent('quiz:purchase_intent', {
    detail: { productSlug, priceUSD },
  }));

  pushToDataLayer({ ecommerce: null });
  pushToDataLayer({
    event: 'begin_checkout',
    event_id: generateEventId(),
    ecommerce: {
      currency: 'USD',
      value: priceUSD,
      items: [{
        item_name: productSlug,
        item_id: productSlug,
        price: priceUSD,
        quantity: 1,
      }],
    },
  });
}
