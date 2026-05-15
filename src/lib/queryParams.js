export function getQueryParams() {
  try {
    const params = new URLSearchParams(window.location.search);
    const truthy = (v) => v === '1' || v === 'true';
    return {
      nodelay: truthy(params.get('nodelay')),
      step:    params.get('step'),
      reset:   truthy(params.get('reset')),
      debug:   truthy(params.get('debug')),
    };
  } catch {
    return { nodelay: false, step: null, reset: false, debug: false };
  }
}

export function removeQueryParam(name) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete(name);
    window.history.replaceState(null, '', url.toString());
  } catch {}
}

/**
 * If ?reset=1 is present, wipe quiz-related localStorage, remove the
 * param from the URL, and force a reload so the fresh state takes effect.
 * Must be called before any code reads localStorage.
 */
export function handleResetParam(storageKeys) {
  try {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('reset');
    if (v !== '1' && v !== 'true') return false;

    for (const key of storageKeys) {
      try { window.localStorage.removeItem(key); } catch {}
    }
    const url = new URL(window.location.href);
    url.searchParams.delete('reset');
    window.location.replace(url.toString());
    return true;
  } catch {
    return false;
  }
}
