import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-paper-soft border-t border-gold-600/15 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
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
            <h3 className="font-semibold text-ink mb-4">{t.footer.productsTitle}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/logiciels" className="text-ink-soft hover:text-cyan-700 transition">{t.nav.software}</Link></li>
              <li><Link to="/mouhassib" className="text-ink-soft hover:text-cyan-700 transition">Mouhassib</Link></li>
              <li><Link to="/gestcommerce" className="text-ink-soft hover:text-cyan-700 transition">GestCommerce</Link></li>
              <li><Link to="/services" className="text-ink-soft hover:text-cyan-700 transition">{t.nav.services}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-ink mb-4">{t.footer.contactTitle}</h3>
            <ul className="space-y-3 text-sm text-ink-soft">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-cyan-700" />
                <a href="mailto:contact@it-rim.net" className="hover:text-cyan-700">contact@it-rim.net</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-cyan-700" />
                <a href="tel:+22200000000" className="hover:text-cyan-700">+222 XX XX XX XX</a>
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
