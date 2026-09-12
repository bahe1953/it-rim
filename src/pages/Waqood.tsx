import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Fuel, Eye, Users, Wallet, HandCoins, FileSpreadsheet, ShieldCheck,
  ArrowRight, ArrowLeft, Clock,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Waqood() {
  const { t } = useLanguage();
  const featureIcons = [Eye, Fuel, Users, Wallet, HandCoins, FileSpreadsheet, ShieldCheck];

  return (
    <div className="pt-32 pb-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-gold-300/10 rounded-full blur-3xl pointer-events-none" />

      {/* HERO */}
      <section className="relative max-w-5xl mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-6">
            <Fuel size={16} className="text-cyan-700" />
            <span className="text-sm font-semibold text-ink">{t.waqoodPage.badge}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-ink mb-6 leading-tight">
            {t.waqoodPage.title1}
            <br />
            <span className="gradient-text">{t.waqoodPage.titleHighlight}</span>
          </h1>

          <p className="text-lg text-ink-soft max-w-2xl mx-auto mb-4 leading-relaxed">
            {t.waqoodPage.subtitle}
          </p>

          <p className="text-sm text-ink-faint font-medium mb-8">{t.waqoodPage.developedBy}</p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper-soft border border-ink-faint/25 mb-8">
            <Clock size={14} className="text-ink-faint" />
            <span className="text-ink-faint text-xs font-bold uppercase tracking-wide">
              {t.comingSoon.badgeLabel}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-base justify-center">
              {t.waqoodPage.ctaButton} <ArrowRight size={18} />
            </Link>
            <Link to="/logiciels" className="btn-secondary text-base justify-center">
              <ArrowLeft size={18} className="rtl:rotate-180" /> {t.waqoodPage.backLink}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* POURQUOI CHOISIR WAQOOD */}
      <section className="relative max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <span className="text-cyan-700 text-sm font-semibold">{t.waqoodPage.featuresBadge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4">
            {t.waqoodPage.featuresTitle1} <span className="gradient-text">{t.waqoodPage.featuresTitleHighlight}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.waqoodPage.features.map((f, i) => {
            const Icon = featureIcons[i];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-cyan-700" />
                </div>
                <h3 className="font-bold text-ink mb-2">{f.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-8">{t.waqoodPage.ctaTitle}</h2>
          <Link to="/contact" className="btn-primary text-base">
            {t.waqoodPage.ctaButton} <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
