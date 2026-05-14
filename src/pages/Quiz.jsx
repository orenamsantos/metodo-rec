import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProgressBar from '../components/ProgressBar';
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

// Mapeia screen → step da progress bar (1-8)
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

export default function Quiz() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState(0);
  const [a, setA] = useState({
    timeAgo: null,
    feelings: [],
    triedTalking: null,
    commitment: null,
    timeLeft: null,
    name: '',
    phone: '',
  });

  // Loading screen auto-advances after 4.2s
  useEffect(() => {
    if (screen === 9) {
      const t = setTimeout(() => setScreen(10), 4200);
      return () => clearTimeout(t);
    }
  }, [screen]);

  // Scroll to top on every screen change
  useEffect(() => { window.scrollTo(0, 0); }, [screen]);

  const next = () => setScreen((s) => s + 1);
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
