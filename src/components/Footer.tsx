import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-paper-soft border-t border-gold-600/15 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo-itrim.jpg" alt="IT-RIM" className="w-10 h-10 rounded-full" />
              <span className="font-bold text-xl text-ink">IT-RIM</span>
            </div>
            <p className="text-ink-soft text-sm max-w-md leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-ink mb-4">{t.footer.contactTitle}</h3>
            <ul className="space-y-3 text-sm text-ink-soft">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-cyan-700" />
                <a href="mailto:contact@it-rim.net" className="hover:text-cyan-700">contact@it-rim.net</a>
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#25D366]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-3 h-3"
                  >
                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.4 0 .04 5.36.04 11.98a11.9 11.9 0 0 0 1.6 5.98L0 24l6.2-1.62a11.96 11.96 0 0 0 5.82 1.48h.01c6.62 0 11.98-5.36 11.98-11.98 0-3.2-1.25-6.2-3.49-8.4zM12.03 21.8h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.68.96.98-3.59-.23-.37a9.83 9.83 0 0 1-1.51-5.24c0-5.44 4.43-9.86 9.87-9.86 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.89 6.97c0 5.44-4.43 9.86-9.92 9.81zm5.42-7.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.49-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
                  </svg>
                </span>
                <a href="https://wa.me/22243459222" className="hover:text-cyan-700">+22243459222</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-cyan-700" />
                {t.footer.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-600/15 mt-10 pt-6 text-center text-sm text-ink-faint">
          © {new Date().getFullYear()} IT-RIM. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
