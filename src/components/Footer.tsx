import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-marine-900 border-t border-cyan-500/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo-itrim.jpg" alt="IT-RIM" className="w-10 h-10 rounded-full" />
              <span className="font-bold text-xl text-white">IT-RIM</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t.footer.productsTitle}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mouhassib" className="text-slate-400 hover:text-cyan-500 transition">{t.nav.mouhassib}</Link></li>
              <li><Link to="/gestcommerce" className="text-slate-400 hover:text-cyan-500 transition">{t.nav.gestcommerce}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t.footer.contactTitle}</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-cyan-500" />
                <a href="mailto:contact@it-rim.net" className="hover:text-cyan-500">contact@it-rim.net</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-cyan-500" />
                <a href="tel:+22200000000" className="hover:text-cyan-500">+222 XX XX XX XX</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-cyan-500" />
                {t.footer.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cyan-500/10 mt-10 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} IT-RIM. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
