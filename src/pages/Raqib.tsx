import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const RAQIB_URLS: Record<'fr' | 'ar', string> = {
  fr: '/raqib-landing.html',
  ar: 'https://bahe1953.github.io/raqib-ar/',
};

export default function Raqib() {
  const { lang } = useLanguage();
  const url = RAQIB_URLS[lang] || RAQIB_URLS.fr;

  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center justify-center text-center px-6">
      <p className="text-ink-soft">
        Redirection vers RAQIB...{' '}
        <a href={url} className="text-cyan-700 font-semibold underline">
          Cliquez ici si rien ne se passe
        </a>
      </p>
    </div>
  );
}
