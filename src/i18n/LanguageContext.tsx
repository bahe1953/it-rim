import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations, Lang, Dictionary } from './translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: Dictionary;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'itrim-lang';

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'ar';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'fr' || stored === 'ar') return stored;
  return 'ar';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage indisponible (navigation privee stricte) : on ignore.
    }
  }, [lang, dir]);

  const setLang = (next: Lang) => setLangState(next);
  const toggleLang = () => setLangState((prev) => (prev === 'fr' ? 'ar' : 'fr'));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t: translations[lang], dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage doit etre utilise a l\'interieur de LanguageProvider');
  return ctx;
}
