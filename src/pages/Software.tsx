import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Layers, Building2, Fuel, Sparkles, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const ICONS: Record<string, typeof Package> = {
  Mouhassib: Package,
  GestCommerce: Layers,
  RAQIB: Building2,
  Waqood: Fuel,
};

export default function Software() {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <section className="relative max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Sparkles size={14} className="text-cyan-700" />
            <span className="text-cyan-700 text-sm font-semibold">{t.software.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
            {t.software.title1} <span className="gradient-text">{t.software.title2}</span>
          </h1>
          <p className="text-ink-soft max-w-2xl mx-auto text-lg">{t.software.subtitle}</p>
        </motion.div>
      </section>

      <section className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {t.software.cards.map((card, i) => {
            const Icon = ICONS[card.name] || Package;
            const isSoon = card.status === 'soon';
            return (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass-card rounded-2xl p-8 relative overflow-hidden group ${
                  isSoon ? 'opacity-90' : ''
                }`}
              >
                {isSoon && (
                  <div className="absolute top-4 end-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-soft border border-ink-faint/25">
                    <Clock size={12} className="text-ink-faint" />
                    <span className="text-ink-faint text-xs font-bold uppercase tracking-wide">
                      {t.software.comingSoonBadge}
                    </span>
                  </div>
                )}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    isSoon
                      ? 'bg-marine-700 border border-marine-700'
                      : 'bg-gradient-to-br from-cyan-500 to-cyan-600'
                  }`}
                >
                  <Icon size={28} className={isSoon ? 'text-slate-300' : 'text-marine-900'} />
                </div>
                <h3 className="text-2xl font-bold text-ink mb-3">{card.name}</h3>
                <p className="text-ink-soft mb-6 leading-relaxed">{card.tagline}</p>
                {isSoon && !card.hasPage ? (
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-ink-soft font-semibold group-hover:gap-3 group-hover:text-cyan-700 transition-all"
                  >
                    {t.software.ctaDemo} <ArrowRight size={16} />
                  </Link>
                ) : (
                  <Link
                    to={card.href}
                    className={`inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all ${
                      isSoon ? 'text-ink-soft group-hover:text-cyan-700' : 'text-cyan-700'
                    }`}
                  >
                    {t.software.ctaDiscover} <ArrowRight size={16} />
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
