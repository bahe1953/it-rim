import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wallet, ShoppingCart, Smartphone, Boxes, Moon, Users,
  ArrowRight, ArrowLeft, Download, FileText,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const MANZEEL_FR_URL = '/downloads/Manzeel-Presentation-FR.pptx';
const MANZEEL_AR_URL = '/downloads/Manzeel-Presentation-AR.pptx';

export default function Manzeel() {
  const { t } = useLanguage();
  const featureIcons = [ShoppingCart, Wallet, Smartphone, Boxes, Moon, Users];

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
            <Wallet size={16} className="text-cyan-700" />
            <span className="text-sm font-semibold text-ink">{t.manzeelPage.badge}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-ink mb-6 leading-tight">
            {t.manzeelPage.title1}
            <br />
            <span className="gradient-text">{t.manzeelPage.titleHighlight}</span>
          </h1>

          <p className="text-lg text-ink-soft max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.manzeelPage.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#telecharger" className="btn-primary text-base justify-center">
              <Download size={18} /> {t.manzeelPage.downloadTitle1}
            </a>
            <Link to="/contact" className="btn-secondary text-base justify-center">
              {t.manzeelPage.ctaButton} <ArrowRight size={18} className="rtl:rotate-180" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FONCTIONNALITES */}
      <section className="relative max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <span className="text-cyan-700 text-sm font-semibold">{t.manzeelPage.featuresBadge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4">
            {t.manzeelPage.featuresTitle1} <span className="gradient-text">{t.manzeelPage.featuresTitleHighlight}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.manzeelPage.features.map((f, i) => {
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

      {/* TELECHARGEMENT DE LA PRESENTATION */}
      <section id="telecharger" className="relative max-w-4xl mx-auto px-6 mb-20 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <FileText size={14} className="text-cyan-700" />
            <span className="text-cyan-700 text-sm font-semibold">{t.manzeelPage.downloadBadge}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">
            {t.manzeelPage.downloadTitle1} <span className="gradient-text">{t.manzeelPage.downloadTitleHighlight}</span>
          </h2>
          <p className="text-ink-soft mb-8 max-w-xl mx-auto">{t.manzeelPage.downloadDesc}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={MANZEEL_FR_URL} download className="btn-primary text-base justify-center">
              <Download size={18} /> {t.manzeelPage.downloadButtonFr}
            </a>
            <a href={MANZEEL_AR_URL} download className="btn-secondary text-base justify-center">
              <Download size={18} /> {t.manzeelPage.downloadButtonAr}
            </a>
          </div>
          <p className="text-xs text-ink-faint mt-6">{t.manzeelPage.downloadFinePrint}</p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-8">{t.manzeelPage.ctaTitle}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-base justify-center">
              {t.manzeelPage.ctaButton} <ArrowRight size={18} className="rtl:rotate-180" />
            </Link>
            <Link to="/logiciels" className="btn-secondary text-base justify-center">
              <ArrowLeft size={18} className="rtl:rotate-180" /> {t.manzeelPage.backLink}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
