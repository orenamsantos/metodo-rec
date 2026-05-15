export function trackStepChange(slug, stepIndex) {
  const detail = { slug, stepIndex, timestamp: Date.now() };

  window.dispatchEvent(new CustomEvent('quiz:step', { detail }));

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'quiz_step_view', {
      step_slug: slug,
      step_index: stepIndex,
    });
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'quiz_step_view',
      step_slug: slug,
      step_index: stepIndex,
    });
  }

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'QuizStep', {
      step_slug: slug,
      step_index: stepIndex,
    });
  }
}

export function trackQuizComplete(leadData) {
  const hasEmail = !!(leadData && leadData.email);

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'quiz_complete', { lead: hasEmail ? 'with_email' : 'no_email' });
  }
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'QuizComplete');
  }
  window.dispatchEvent(new CustomEvent('quiz:complete', { detail: { hasEmail } }));
}

export function trackPurchaseIntent(productSlug, priceUSD) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', {
      product: productSlug,
      value: priceUSD,
      currency: 'USD',
    });
  }
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      value: priceUSD,
      currency: 'USD',
      content_name: productSlug,
    });
  }
  window.dispatchEvent(new CustomEvent('quiz:purchase_intent', {
    detail: { productSlug, priceUSD },
  }));
}
