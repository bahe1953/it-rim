import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function GestCommerce() {
  const { t } = useLanguage();

  return (
    <div className="pt-20 min-h-screen">
      <section className="relative py-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-marine-700 to-marine-800 flex items-center justify-center mx-auto mb-6 border border-cyan-500/20">
              <Layers size={40} className="text-cyan-500" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              <span className="gradient-text">GestCommerce</span>
            </h1>
            <p className="text-lg text-slate-400 mb-10">
              {t.gestcommerce.desc}
            </p>
            <div className="glass-card rounded-2xl p-8">
              <p className="text-slate-300 mb-6">
                {t.gestcommerce.cardText1}
                <br />{t.gestcommerce.cardText2} <strong className="text-cyan-500">Mouhassib</strong>.
              </p>
              <Link to="/mouhassib" className="btn-primary text-base">
                {t.gestcommerce.ctaButton} <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
