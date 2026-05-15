import { useEffect, useState } from 'react';
import { STEPS, getStepBySlug, isInternalStep } from '../lib/steps';
import { STORAGE_KEY, clearQuizStorage } from '../hooks/useQuizState';

function hasDebugFlag() {
  try {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('debug');
    return v === '1' || v === 'true';
  } catch {
    return false;
  }
}

export default function DebugPanel() {
  const [enabled] = useState(hasDebugFlag);
  const [currentSlug, setCurrentSlug] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [stepStartedAt, setStepStartedAt] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [showJson, setShowJson] = useState(false);
  const [stateJson, setStateJson] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const onStep = (e) => {
      setCurrentSlug(e.detail.slug);
      setCurrentIndex(e.detail.stepIndex);
      setStepStartedAt(Date.now());
    };
    window.addEventListener('quiz:step', onStep);
    return () => window.removeEventListener('quiz:step', onStep);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - stepStartedAt) / 1000)), 500);
    return () => clearInterval(t);
  }, [enabled, stepStartedAt]);

  if (!enabled) return null;

  const prev = currentIndex != null ? STEPS[currentIndex - 1] : null;
  const next = currentIndex != null ? STEPS[currentIndex + 1] : null;

  const jumpTo = (slug) => {
    const step = getStepBySlug(slug);
    if (!step) return;
    if (isInternalStep(step.id)) {
      window.dispatchEvent(new CustomEvent('quiz:debug:jump', { detail: { stepId: step.id, slug: step.slug } }));
    } else if (step.slug === 'upsell-cartas') {
      window.location.href = '/upsell';
    } else if (step.slug === 'downsell-guiones') {
      window.location.href = '/downsell';
    } else if (step.slug === 'gracias') {
      window.location.href = '/acceso';
    }
  };

  const resetQuiz = () => {
    window.dispatchEvent(new CustomEvent('quiz:debug:reset'));
  };

  const clearStorageManually = () => {
    clearQuizStorage();
    try { window.localStorage.removeItem('metodorec_offer_seen'); } catch {}
  };

  const dumpJson = () => {
    let raw = null;
    try { raw = window.localStorage.getItem(STORAGE_KEY); } catch {}
    setStateJson(raw ? JSON.stringify(JSON.parse(raw), null, 2) : '(empty)');
    setShowJson(true);
  };

  const baseBtn = {
    appearance: 'none',
    border: '1px solid #444',
    background: '#1a1a1a',
    color: '#eee',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: 11,
    padding: '4px 8px',
    borderRadius: 4,
    cursor: 'pointer',
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 12,
      right: 12,
      zIndex: 9999,
      maxWidth: 320,
      background: 'rgba(15, 15, 15, 0.95)',
      color: '#eee',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: 11,
      border: '1px solid #444',
      borderRadius: 6,
      padding: collapsed ? '6px 10px' : 12,
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
      lineHeight: 1.4,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: collapsed ? 0 : 8 }}>
        <strong style={{ color: '#f0c674' }}>debug</strong>
        <button onClick={() => setCollapsed((v) => !v)} style={{ ...baseBtn, padding: '2px 6px', fontSize: 10 }}>
          {collapsed ? '▲' : '▼'}
        </button>
      </div>

      {!collapsed && (
        <>
          <div style={{ marginBottom: 8 }}>
            <div>step: <span style={{ color: '#8be9fd' }}>{currentSlug ?? '?'}</span> <span style={{ color: '#888' }}>(#{currentIndex ?? '?'})</span></div>
            <div>elapsed: <span style={{ color: '#50fa7b' }}>{elapsed}s</span></div>
            {prev && <div style={{ color: '#888' }}>← prev: {prev.slug}</div>}
            {next && <div style={{ color: '#888' }}>→ next: {next.slug}</div>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
            <select
              onChange={(e) => { if (e.target.value) { jumpTo(e.target.value); e.target.value = ''; } }}
              style={{ ...baseBtn, padding: '4px 6px' }}
              defaultValue=""
            >
              <option value="">jump to…</option>
              {STEPS.map((s) => (
                <option key={s.slug} value={s.slug}>#{s.id} · {s.slug}</option>
              ))}
            </select>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={resetQuiz} style={{ ...baseBtn, flex: 1 }}>reset</button>
              <button onClick={clearStorageManually} style={{ ...baseBtn, flex: 1 }}>clear LS</button>
              <button onClick={dumpJson} style={{ ...baseBtn, flex: 1 }}>json</button>
            </div>
          </div>

          {showJson && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ color: '#888' }}>localStorage:</span>
                <button onClick={() => setShowJson(false)} style={{ ...baseBtn, padding: '2px 6px' }}>×</button>
              </div>
              <pre style={{
                margin: 0,
                padding: 8,
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: 4,
                fontSize: 10,
                maxHeight: 220,
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}>{stateJson}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}
