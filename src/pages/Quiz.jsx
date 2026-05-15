import { useEffect, useState } from 'react';
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

import { STEPS, getStepBySlug, isInternalStep, QUIZ_INTERNAL_MAX_ID } from '../lib/steps';
import { trackStepChange } from '../lib/tracking';

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
  const target = slug === 'landing' ? window.location.pathname + window.location.search : `${window.location.pathname}${window.location.search}#/${slug}`;
  if (window.location.href !== window.location.origin + target) {
    window.history.replaceState(null, '', target);
  }
}

export default function Quiz() {
  const navigate = useNavigate();

  const [screen, setScreen] = useState(() => {
    const slug = readSlugFromHash();
    if (slug) {
      const step = getStepBySlug(slug);
      if (step && isInternalStep(step.id)) return step.id;
    }
    return 0;
  });

  const [a, setA] = useState({
    timeAgo: null,
    feelings: [],
    triedTalking: null,
    commitment: null,
    timeLeft: null,
    name: '',
    phone: '',
  });

  useEffect(() => {
    if (screen === 9) {
      const t = setTimeout(() => setScreen(10), 4200);
      return () => clearTimeout(t);
    }
  }, [screen]);

  useEffect(() => { window.scrollTo(0, 0); }, [screen]);

  useEffect(() => {
    if (screen > QUIZ_INTERNAL_MAX_ID) return;
    const step = STEPS[screen];
    if (!step) return;
    writeSlugToHash(step.slug);
    trackStepChange(step.slug, step.id);
  }, [screen]);

  const next = () => setScreen((s) => s + 1);
  const goBack = () => {
    setScreen((s) => {
      const target = Math.max(0, s - 1);
      window.dispatchEvent(new CustomEvent('quiz:back', { detail: { from: s, to: target } }));
      return target;
    });
  };
  const BACK_BLOCKED = new Set([0, 9, 13]);
  const canGoBack = !BACK_BLOCKED.has(screen);

  const set = (k, v) => setA((p) => ({ ...p, [k]: v }));
  const toggle = (f) =>
    setA((p) => ({
      ...p,
      feelings: p.feelings.includes(f) ? p.feelings.filter((x) => x !== f) : [...p.feelings, f],
    }));

  const showProgress = screen > 0 && screen < 9;
  const goToUpsell = () => navigate('/upsell');

  return (
    <>
      {canGoBack && <BackButton onClick={goBack} />}
      {showProgress && <ProgressBar step={stepFromScreen(screen)} />}

      {screen === 0 && <Landing onStart={next} />}
      {screen === 1 && <Q1 v={a.timeAgo} onSel={(v) => { set('timeAgo', v); next(); }} />}
      {screen === 2 && <Q2 sel={a.feelings} onTog={toggle} onNext={next} />}
      {screen === 3 && <Interrupt onNext={next} />}
      {screen === 4 && <Q3 v={a.triedTalking} onSel={(v) => { set('triedTalking', v); next(); }} />}
      {screen === 5 && <VideoMiddle onNext={next} />}
      {screen === 6 && <Q4 v={a.commitment} onSel={(v) => { set('commitment', v); next(); }} />}
      {screen === 7 && <Q5 v={a.timeLeft} onSel={(v) => { set('timeLeft', v); next(); }} />}
      {screen === 8 && (
        <Capture
          a={a}
          setName={(v) => set('name', v)}
          setPhone={(v) => set('phone', v)}
          onSubmit={next}
        />
      )}
      {screen === 9 && <Loading />}
      {screen === 10 && <Result name={a.name} onNext={next} />}
      {screen === 11 && <PriceAnchor onNext={next} />}
      {screen === 12 && <Offer onBuy={next} />}
      {screen === 13 && <Checkout onComplete={goToUpsell} />}
    </>
  );
}
