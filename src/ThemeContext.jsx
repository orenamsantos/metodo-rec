import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { themes, DEFAULT_THEME } from './themes';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'metodo-rec:theme:v2';

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && themes[saved]) return saved;
    } catch {
      // Ignora — usa default
    }
    return DEFAULT_THEME;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, themeKey);
    } catch {
      // Ignora se localStorage não disponível
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', themes[themeKey].metaColor);
  }, [themeKey]);

  const value = useMemo(() => {
    const t = themes[themeKey];
    return {
      themeKey,
      name: t.name,
      c: t.c,
      grain: t.grain,
      grainOpacity: t.grainOpacity,
      grainBlend: t.grainBlend,
      background: t.background,
      isLight: themeKey === 'light',
      setTheme: setThemeKey,
      toggle: () => setThemeKey((k) => (k === 'light' ? 'dark' : 'light')),
    };
  }, [themeKey]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme deve ser usado dentro de <ThemeProvider>');
  return ctx;
}
