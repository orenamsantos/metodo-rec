import { useCallback, useEffect, useRef, useState } from 'react';
import { STEPS, isInternalStep, getStepBySlug } from '../lib/steps';

export const STORAGE_KEY = 'metodorec_quiz_state';
const STATE_VERSION = 1;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const ONE_HOUR_MS  = 60 * 60 * 1000;
const POST_PURCHASE_MIN_STEP = 13;

const ANSWER_KEY_BY_FIELD = {
  timeAgo:      'q1-tiempo-cambio',
  feelings:     'q2-sentimientos',
  triedTalking: 'q3-conversacion',
  commitment:   'q4-compromiso',
  timeLeft:     'q5-urgencia',
};

const FIELD_BY_ANSWER_KEY = Object.fromEntries(
  Object.entries(ANSWER_KEY_BY_FIELD).map(([f, s]) => [s, f])
);

const DEFAULT_ANSWERS = {
  timeAgo: null,
  feelings: [],
  triedTalking: null,
  commitment: null,
  timeLeft: null,
  name: '',
  phone: '',
};

function serialize(screen, a, startedAt) {
  const answers = {};
  for (const [field, slug] of Object.entries(ANSWER_KEY_BY_FIELD)) {
    answers[slug] = a[field] === undefined ? null : a[field];
  }
  const step = STEPS[screen];
  return {
    version: STATE_VERSION,
    currentStep: screen,
    currentSlug: step ? step.slug : null,
    answers,
    lead: { firstName: a.name || null, whatsapp: a.phone || null },
    startedAt,
    lastActiveAt: Date.now(),
  };
}

function deserialize(raw) {
  if (!raw || raw.version !== STATE_VERSION) return null;
  const a = { ...DEFAULT_ANSWERS };
  if (raw.answers) {
    for (const [slug, value] of Object.entries(raw.answers)) {
      const field = FIELD_BY_ANSWER_KEY[slug];
      if (field) a[field] = value === null ? DEFAULT_ANSWERS[field] : value;
    }
  }
  if (raw.lead) {
    a.name = raw.lead.firstName || '';
    a.phone = raw.lead.whatsapp || '';
  }
  return {
    screen: typeof raw.currentStep === 'number' ? raw.currentStep : 0,
    a,
    startedAt: raw.startedAt || Date.now(),
    lastActiveAt: raw.lastActiveAt || Date.now(),
  };
}

function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return deserialize(JSON.parse(raw));
  } catch {
    return null;
  }
}

function writeStorage(payload) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // storage unavailable (private mode, quota) — fail silently
  }
}

function clearStorage() {
  try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
}

/**
 * Load initial state honoring priority:
 *   1. forcedSlug (e.g. ?step=X from query params, validated by caller)
 *   2. hash slug
 *   3. localStorage (within TTL)
 *   4. fresh start
 */
function loadInitialState({ forcedSlug, hashSlug }) {
  const stored = readStorage();
  const fresh = { screen: 0, a: { ...DEFAULT_ANSWERS }, startedAt: Date.now() };

  const storedIsFresh = stored && Date.now() - stored.lastActiveAt < SEVEN_DAYS_MS;
  let base = storedIsFresh ? { screen: stored.screen, a: stored.a, startedAt: stored.startedAt } : fresh;

  // Post-purchase steps expire after 1 hour
  if (storedIsFresh && stored.screen >= POST_PURCHASE_MIN_STEP && Date.now() - stored.lastActiveAt > ONE_HOUR_MS) {
    base = { screen: 12, a: stored.a, startedAt: stored.startedAt };
  }

  if (forcedSlug) {
    const step = getStepBySlug(forcedSlug);
    if (step && isInternalStep(step.id)) return { ...base, screen: step.id };
  }
  if (hashSlug) {
    const step = getStepBySlug(hashSlug);
    if (step && isInternalStep(step.id)) return { ...base, screen: step.id };
  }
  return base;
}

export default function useQuizState({ forcedSlug = null, hashSlug = null } = {}) {
  const initialRef = useRef(loadInitialState({ forcedSlug, hashSlug }));
  const [screen, setScreen] = useState(initialRef.current.screen);
  const [a, setA] = useState(initialRef.current.a);
  const startedAtRef = useRef(initialRef.current.startedAt);

  // Auto-persist on every change
  useEffect(() => {
    writeStorage(serialize(screen, a, startedAtRef.current));
  }, [screen, a]);

  // Clear when user reaches Thank You step (16) — handled in external Acceso page,
  // but also clear if Quiz somehow renders past last internal step
  useEffect(() => {
    if (screen > 13) clearStorage();
  }, [screen]);

  // Dev helper
  useEffect(() => {
    window.__quizReset = () => {
      clearStorage();
      setScreen(0);
      setA({ ...DEFAULT_ANSWERS });
    };
    return () => { delete window.__quizReset; };
  }, []);

  const setAnswer = useCallback((field, value) => {
    setA((p) => ({ ...p, [field]: value }));
  }, []);

  const setLead = useCallback((lead) => {
    setA((p) => ({ ...p, name: lead.firstName ?? p.name, phone: lead.whatsapp ?? p.phone }));
  }, []);

  const goNext = useCallback(() => setScreen((s) => Math.min(s + 1, 13)), []);
  const goBack = useCallback(() => setScreen((s) => Math.max(s - 1, 0)), []);
  const jumpTo = useCallback((stepId) => {
    if (typeof stepId === 'number' && isInternalStep(stepId)) setScreen(stepId);
  }, []);
  const reset = useCallback(() => {
    clearStorage();
    setScreen(0);
    setA({ ...DEFAULT_ANSWERS });
  }, []);

  return { screen, setScreen, a, setA, setAnswer, setLead, goNext, goBack, jumpTo, reset };
}

export function clearQuizStorage() {
  clearStorage();
}
