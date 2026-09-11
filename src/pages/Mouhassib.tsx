import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package, BarChart3, ShoppingCart, Boxes, Calculator, Globe, Download,
  Check, HardDrive, Clock, Shield, Users
} from 'lucide-react';
import { MOUHASSIB_DOWNLOAD_URL } from '../config';
import { useLanguage } from '../i18n/LanguageContext';

export default function Mouhassib() {
  const { t, lang } = useLanguage();
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/download-count')
      .then((r) => r.json())
      .then((d) => setCount(typeof d.count === 'number' ? d.count : null))
      .catch(() => {});
  }, []);

  const handleDownload = () => {
    // Ping silencieux pour compter le telechargement (n'attend pas la reponse).
    fetch('/api/download-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ produit: 'mouhassib' }),
    }).catch(() => {});

    if (MOUHASSIB_DOWNLOAD_URL) {
      window.location.href = MOUHASSIB_DOWNLOAD_URL;
    }
    setClicked(true);
    setCount((c) => (c !== null ? c + 1 : c));
  };

  const featureIcons = [BarChart3, ShoppingCart, Boxes, Calculator, Globe, HardDrive];
  const chipIcons = [Clock, Shield, HardDrive];

  const countLabel =
    count !== null
      ? lang === 'fr'
        ? `${count.toLocaleString('fr-FR')} ${count > 1 ? t.mouhassib.downloadCountSuffix : t.mouhassib.downloadCountSuffixOne}`
        : `${count.toLocaleString('ar-EG')} ${count > 1 ? t.mouhassib.downloadCountSuffix : t.mouhassib.downloadCountSuffixOne}`
      : '';

  return (
    <div className="pt-20">
      {/* HERO */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-slate-300">{t.mouhassib.badge}</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                <span className="gradient-text">Mouhassib</span>
                <br />
                <span className="text-3xl md:text-4xl text-slate-300 font-bold">
                  {t.mouhassib.heroTitleLine1}
                  <br />{t.mouhassib.heroTitleLine2}
                </span>
              </h1>

              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                {t.mouhassib.heroDesc}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {t.mouhassib.chips.map((text, i) => {
                  const Icon = chipIcons[i];
                  return (
                    <div key={text} className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card text-sm">
                      <Icon size={14} className="text-cyan-500" />
                      <span className="text-slate-300">{text}</span>
                    </div>
                  );
                })}
              </div>

              <a href="#telecharger" className="btn-primary text-base">
                <Download size={18} /> {t.mouhassib.ctaFree}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-4 shadow-2xl">
                <div className="bg-marine-900 rounded-xl aspect-video flex items-center justify-center border border-cyan-500/10">
                  <div className="text-center p-8">
                    <Package size={64} className="text-cyan-500 mx-auto mb-4" />
                    <div className="text-slate-400 text-sm">{t.mouhassib.previewLabel}</div>
                    <div className="text-slate-500 text-xs mt-1">{t.mouhassib.previewSub}</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 end-4 glass-card px-4 py-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-slate-300 font-medium">{t.mouhassib.liveLabel}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FONCTIONNALITÉS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <span className="text-cyan-500 text-sm font-semibold">{t.mouhassib.featuresBadge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.mouhassib.featuresTitle1} <span className="gradient-text">{t.mouhassib.featuresTitleHighlight}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.mouhassib.features.map((f, i) => {
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
                    <Icon size={22} className="text-cyan-500" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TÉLÉCHARGEMENT */}
      <section id="telecharger" className="py-24 relative bg-marine-800/30">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gold-300/10 border border-gold-300/20 mb-4">
              <span className="text-gold-300 text-sm font-semibold">{t.mouhassib.downloadBadge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.mouhassib.downloadTitle1} <span className="gradient-text">{t.mouhassib.downloadTitleHighlight}</span>
            </h2>
            <p className="text-slate-400">
              {t.mouhassib.downloadDesc1}
              <br />
              {t.mouhassib.downloadDesc2}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-10 text-center"
          >
            {count !== null && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                <Users size={14} className="text-cyan-500" />
                <span className="text-sm text-slate-300">{countLabel}</span>
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={handleDownload}
                className="btn-primary text-base justify-center mx-auto"
              >
                <Download size={18} /> {t.mouhassib.downloadButton}
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center mt-4">
              {t.mouhassib.downloadFinePrint}
            </p>

            {clicked && (
              <div className="mt-4 text-sm text-cyan-400">
                {t.mouhassib.downloadedMsg}
              </div>
            )}
          </motion.div>

          {/* Ce qui est inclus */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.mouhassib.includes.map(item => (
              <div key={item} className="glass-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <Check size={16} className="text-cyan-500" />
                </div>
                <span className="text-sm text-slate-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
