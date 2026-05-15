import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ProgressBar from '../components/ProgressBar';
import BackButton from '../components/BackButton';
import Landing from '../screens/Landing';
import Q1 from '../screens/Q1';
import Q2 from '../screens/Q2';
import Interrupt from '../screens/Interrupt';
import Q3 from '../screens/Q3';
import VideoMiddle from '../screens/VideoMiddle';
import Q4 from '../screens/Q4';
import Q5 from '../screens/Q5';
import Capture from '../screens/Capture';
import Loading from '../screens/Loading';
import Result from '../screens/Result';
import PriceAnchor from '../screens/PriceAnchor';
import Offer from '../screens/Offer';
import Checkout from '../screens/Checkout';

import { STEPS, QUIZ_INTERNAL_MAX_ID, isInternalStep } from '../lib/steps';
import { trackStepChange } from '../lib/tracking';
import useQuizState from '../hooks/useQuizState';
import { getQueryParams } from '../lib/queryParams';

function stepFromScreen(s) {
  if (s === 0) return 0;
  if (s === 1) return 1;
  if (s === 2 || s === 3) return 2;
  if (s === 4 || s === 5) return 3;
  if (s === 6) return 4;
  if (s === 7) return 5;
  if (s === 8) return 6;
  return 7;
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

  useEffect(() => { window.scrollTo(0, 0); }, [screen]);

  useEffect(() => {
    if (screen > QUIZ_INTERNAL_MAX_ID) return;
    const step = STEPS[screen];
    if (!step) return;
    writeSlugToHash(step.slug);
    trackStepChange(step.slug, step.id);
  }, [screen]);

  const handleBack = () => {
    window.dispatchEvent(new CustomEvent('quiz:back', { detail: { from: screen, to: Math.max(0, screen - 1) } }));
    goBack();
  };

  const set = (k, v) => setA((p) => ({ ...p, [k]: v }));
  const toggle = (f) =>
    setA((p) => ({
      ...p,
      feelings: p.feelings.includes(f) ? p.feelings.filter((x) => x !== f) : [...p.feelings, f],
    }));

  const showProgress = screen > 0 && screen < 9;
  const BACK_BLOCKED = new Set([0, 9, 13]);
  const canGoBack = !BACK_BLOCKED.has(screen);
  const goToUpsell = () => navigate('/upsell');

  return (
    <>
      {canGoBack && <BackButton onClick={handleBack} />}
      {showProgress && <ProgressBar step={stepFromScreen(screen)} />}

      {screen === 0 && <Landing onStart={goNext} />}
      {screen === 1 && <Q1 v={a.timeAgo} onSel={(v) => { set('timeAgo', v); goNext(); }} />}
      {screen === 2 && <Q2 sel={a.feelings} onTog={toggle} onNext={goNext} />}
      {screen === 3 && <Interrupt onNext={goNext} />}
      {screen === 4 && <Q3 v={a.triedTalking} onSel={(v) => { set('triedTalking', v); goNext(); }} />}
      {screen === 5 && <VideoMiddle onNext={goNext} />}
      {screen === 6 && <Q4 v={a.commitment} onSel={(v) => { set('commitment', v); goNext(); }} />}
      {screen === 7 && <Q5 v={a.timeLeft} onSel={(v) => { set('timeLeft', v); goNext(); }} />}
      {screen === 8 && (
        <Capture
          a={a}
          setName={(v) => set('name', v)}
          setPhone={(v) => set('phone', v)}
          onSubmit={goNext}
        />
      )}
      {screen === 9 && <Loading />}
      {screen === 10 && <Result name={a.name} onNext={goNext} />}
      {screen === 11 && <PriceAnchor onNext={goNext} />}
      {screen === 12 && <Offer onBuy={goNext} />}
      {screen === 13 && <Checkout onComplete={goToUpsell} />}
    </>
  );
}
