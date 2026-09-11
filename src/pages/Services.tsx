import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Lightbulb, Users } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Services() {
  const { t } = useLanguage();
  const icons = [Code, Lightbulb, Users];

  return (
    <div className="pt-32 pb-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <section className="relative max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <span className="text-cyan-500 text-sm font-semibold">{t.services.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.services.title1} <span className="gradient-text">{t.services.titleHighlight}</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">{t.services.subtitle}</p>
        </motion.div>
      </section>

      <section className="relative max-w-7xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {t.services.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                  <Icon size={26} className="text-cyan-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{t.services.ctaTitle}</h2>
          <Link to="/contact" className="btn-primary text-base">
            {t.services.ctaButton} <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
