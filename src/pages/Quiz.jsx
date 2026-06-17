import { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ProgressBar from '../components/ProgressBar';
import BackButton from '../components/BackButton';
import Landing from '../screens/Landing';

import { STEPS, QUIZ_INTERNAL_MAX_ID, isInternalStep } from '../lib/steps';
import { computeBucket } from '../lib/buckets';
import { trackStepChange } from '../lib/tracking';
import useQuizState from '../hooks/useQuizState';
import { getQueryParams } from '../lib/queryParams';

// Só a Landing entra no bundle inicial (é a primeira pintura / LCP). As demais
// telas carregam sob demanda (code-splitting) e são pré-buscadas no idle logo
// após o load, então quando a pessoa avança o chunk já está em cache (sem flash).
const loaders = {
  Q1: () => import('../screens/Q1'),
  Q2: () => import('../screens/Q2'),
  Interrupt: () => import('../screens/Interrupt'),
  Q3: () => import('../screens/Q3'),
  VideoMiddle: () => import('../screens/VideoMiddle'),
  Q4: () => import('../screens/Q4'),
  Q5: () => import('../screens/Q5'),
  // Captura de lead removida do fluxo (gate sangrava ~34%). O componente
  // Capture.jsx segue no repo para reativar fácil se voltarmos a pedir o lead.
  Loading: () => import('../screens/Loading'),
  Result: () => import('../screens/Result'),
  PriceAnchor: () => import('../screens/PriceAnchor'),
  Offer: () => import('../screens/Offer'),
};
const Q1 = lazy(loaders.Q1);
const Q2 = lazy(loaders.Q2);
const Interrupt = lazy(loaders.Interrupt);
const Q3 = lazy(loaders.Q3);
const VideoMiddle = lazy(loaders.VideoMiddle);
const Q4 = lazy(loaders.Q4);
const Q5 = lazy(loaders.Q5);
const Loading = lazy(loaders.Loading);
const Result = lazy(loaders.Result);
const PriceAnchor = lazy(loaders.PriceAnchor);
const Offer = lazy(loaders.Offer);

function stepFromScreen(s) {
  if (s === 0) return 0;
  if (s === 1) return 1;
  if (s === 2 || s === 3) return 2;
  if (s === 4 || s === 5) return 3;
  if (s === 6) return 4;
  if (s === 7) return 5;
  return 5;
}

function readSlugFromHash() {
  const hash = window.location.hash;
  if (!hash || !hash.startsWith('#/')) return null;
  return hash.slice(2).split('?')[0];
}

function writeSlugToHash(slug) {
  const target = slug === 'landing'
    ? window.location.pathname + window.location.search
    : `${window.location.pathname}${window.location.search}#/${slug}`;
  if (window.location.href !== window.location.origin + target) {
    window.history.replaceState(null, '', target);
  }
}

export default function Quiz() {
  const navigate = useNavigate();
  const hashSlug = readSlugFromHash();
  const { step: forcedSlug } = getQueryParams();
  const { screen, setScreen, a, setA, goNext, goBack, jumpTo, reset } = useQuizState({ forcedSlug, hashSlug });

  // Pré-busca todas as telas seguintes no idle (chunk pronto antes do clique).
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 300));
    const id = idle(() => { Object.values(loaders).forEach((fn) => fn()); });
    return () => (window.cancelIdleCallback || window.clearTimeout)(id);
  }, []);

  useEffect(() => {
    const onJump = (e) => {
      const id = e.detail?.stepId;
      if (typeof id === 'number' && isInternalStep(id)) jumpTo(id);
    };
    const onReset = () => reset();
    window.addEventListener('quiz:debug:jump', onJump);
    window.addEventListener('quiz:debug:reset', onReset);
    return () => {
      window.removeEventListener('quiz:debug:jump', onJump);
      window.removeEventListener('quiz:debug:reset', onReset);
    };
  }, [jumpTo, reset]);

  useEffect(() => {
    if (screen === 9) {
      const t = setTimeout(() => setScreen(10), 4200);
      return () => clearTimeout(t);
    }
  }, [screen, setScreen]);

  // Captura de lead removida: qualquer um que caia na tela 8 (localStorage de
  // sessão antiga ou deep-link #/captura-lead) segue direto pro Loading.
  useEffect(() => {
    if (screen === 8) setScreen(9);
  }, [screen, setScreen]);

  useEffect(() => { window.scrollTo(0, 0); }, [screen]);

  useEffect(() => {
    if (screen > QUIZ_INTERNAL_MAX_ID) return;
    if (screen === 8) return; // tela de captura removida do fluxo
    const step = STEPS[screen];
    if (!step) return;
    writeSlugToHash(step.slug);
    trackStepChange(step.slug, step.id);
  }, [screen]);

  const handleBack = () => {
    // Q1 foi fundida na Landing (screen 0); voltar do Q2 (screen 2) cai na
    // Landing, não na Q1 órfã (screen 1).
    const to = screen === 2 ? 0 : Math.max(0, screen - 1);
    window.dispatchEvent(new CustomEvent('quiz:back', { detail: { from: screen, to } }));
    if (screen === 2) jumpTo(0); else goBack();
  };

  const set = (k, v) => setA((p) => ({ ...p, [k]: v }));
  const toggle = (f) =>
    setA((p) => ({
      ...p,
      feelings: p.feelings.includes(f) ? p.feelings.filter((x) => x !== f) : [...p.feelings, f],
    }));

  // Balde do diagnóstico: derivado das respostas já persistidas (Q2 + Q3).
  const bucket = computeBucket({ feelings: a.feelings, triedTalking: a.triedTalking });

  const showProgress = screen > 0 && screen < 9;
  const BACK_BLOCKED = new Set([0, 9, 12]);
  const canGoBack = !BACK_BLOCKED.has(screen);

  return (
    <>
      {canGoBack && <BackButton onClick={handleBack} />}
      {showProgress && <ProgressBar step={stepFromScreen(screen)} total={5} />}

      <Suspense fallback={null}>
        {screen === 0 && (
          <Landing
            value={a.timeAgo}
            onSelectTime={(v) => { set('timeAgo', v); trackStepChange('q1-tiempo-cambio', 1); jumpTo(2); }}
          />
        )}
        {screen === 1 && <Q1 v={a.timeAgo} onSel={(v) => { set('timeAgo', v); goNext(); }} />}
        {screen === 2 && <Q2 sel={a.feelings} onTog={toggle} onNext={goNext} />}
        {screen === 3 && <Interrupt onNext={goNext} />}
        {screen === 4 && <Q3 v={a.triedTalking} onSel={(v) => { set('triedTalking', v); goNext(); }} />}
        {screen === 5 && <VideoMiddle onNext={goNext} />}
        {screen === 6 && <Q4 v={a.commitment} onSel={(v) => { set('commitment', v); goNext(); }} />}
        {screen === 7 && <Q5 v={a.timeLeft} onSel={(v) => { set('timeLeft', v); jumpTo(9); }} />}
        {screen === 9 && <Loading />}
        {screen === 10 && <Result name={a.name} bucket={bucket} onNext={goNext} />}
        {screen === 11 && <PriceAnchor bucket={bucket} onNext={goNext} />}
        {screen === 12 && <Offer bucket={bucket} commitment={a.commitment} onBuy={goNext} />}
      </Suspense>
    </>
  );
}
