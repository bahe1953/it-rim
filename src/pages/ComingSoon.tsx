import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ComingSoonProps {
  name: string;
  tagline: string;
}

export default function ComingSoon({ name, tagline }: ComingSoonProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-32 pb-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-gold-300/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl mx-auto px-6 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 mb-6">
          <Clock size={14} className="text-cyan-500" />
          <span className="text-slate-300 text-sm font-semibold">{t.comingSoon.badgeLabel}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">{name}</h1>
        <p className="text-lg text-cyan-500 font-medium mb-6">{tagline}</p>
        <p className="text-slate-400 max-w-md mx-auto mb-10 leading-relaxed">{t.comingSoon.bodyText}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="btn-primary text-base justify-center">
            {t.comingSoon.contactCta} <ArrowRight size={18} />
          </Link>
          <Link to="/logiciels" className="btn-secondary text-base justify-center">
            <ArrowLeft size={18} className="rtl:rotate-180" /> {t.comingSoon.backLink}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
