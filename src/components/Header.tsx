import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/logiciels', label: t.nav.software },
    { to: '/solutions-entreprises', label: t.nav.enterprise },
    { to: '/services', label: t.nav.services },
    { to: '/contact', label: t.nav.contact },
  ];

  const LangButton = ({ className = '' }: { className?: string }) => (
    <button
      type="button"
      onClick={toggleLang}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card text-sm font-medium text-slate-300 hover:text-cyan-500 transition-colors ${className}`}
      aria-label="Changer de langue / تغيير اللغة"
    >
      <Languages size={14} />
      {lang === 'fr' ? 'العربية' : 'Français'}
    </button>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-marine-900/90 backdrop-blur-lg border-b border-cyan-500/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/logo-itrim.jpg" alt="IT-RIM" className="w-10 h-10 rounded-full group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xl text-white tracking-tight">IT-RIM</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors whitespace-nowrap ${
                location.pathname === link.to
                  ? 'text-cyan-500'
                  : 'text-slate-300 hover:text-cyan-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LangButton />
          <Link to="/mouhassib" className="btn-primary text-sm">
            {t.nav.downloadCta}
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LangButton />
          <button className="text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-marine-800 border-t border-cyan-500/10">
          <nav className="flex flex-col p-6 gap-4">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-base font-medium ${
                  location.pathname === link.to ? 'text-cyan-500' : 'text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/mouhassib" className="btn-primary text-sm justify-center">
              {t.nav.downloadCta}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
