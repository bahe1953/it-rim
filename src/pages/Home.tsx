import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Lightbulb, Users, Sparkles, Package, Layers } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-marine-900" />

        {/* Animated circles background */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-gold-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
              <Sparkles size={16} className="text-cyan-500" />
              <span className="text-sm text-slate-300">Solutions logicielles professionnelles</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            <span className="text-white">La technologie au service</span>
            <br />
            <span className="gradient-text">de votre réussite</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            IT-RIM développe des logiciels sur mesure pour commerçants et entreprises.
            Découvrez Mouhassib et GestCommerce, nos solutions phares de gestion commerciale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/mouhassib" className="btn-primary text-base justify-center">
              Découvrir Mouhassib <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-secondary text-base justify-center">
              Nous contacter
            </Link>
          </motion.div>
        </div>
      </section>

      {/* NOS PRODUITS */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <span className="text-cyan-500 text-sm font-semibold">Nos produits</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Des solutions <span className="gradient-text">clé en main</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Deux logiciels professionnels pour digitaliser votre gestion commerciale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* MOUHASSIB - Vedette */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold-300/20 border border-gold-300/30">
                <span className="text-gold-300 text-xs font-bold uppercase tracking-wide">Vedette</span>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-6">
                <Package size={28} className="text-marine-900" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Mouhassib</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Gestion commerciale complète avec comptabilité intégrée, entièrement en arabe.
                Ventes, stock, factures, comptabilité, zakat — tout dans une seule application.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Arabe RTL', 'Compta', 'Offline', 'Trial 30j'].map(tag => (
                  <span key={tag} className="text-xs bg-cyan-500/10 text-cyan-500 px-2.5 py-1 rounded-md border border-cyan-500/20">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to="/mouhassib" className="inline-flex items-center gap-2 text-cyan-500 font-semibold group-hover:gap-3 transition-all">
                Découvrir Mouhassib <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* GESTCOMMERCE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-8 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-marine-700 to-marine-800 flex items-center justify-center mb-6 border border-cyan-500/20">
                <Layers size={28} className="text-cyan-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">GestCommerce</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Solution de gestion commerciale simple et efficace : ventes, achats, stock,
                clients, fournisseurs. La version essentielle sans le module comptabilité.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Simple', 'Rapide', 'Offline', 'Trial 30j'].map(tag => (
                  <span key={tag} className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to="/gestcommerce" className="inline-flex items-center gap-2 text-slate-300 font-semibold group-hover:gap-3 group-hover:text-cyan-500 transition-all">
                Découvrir GestCommerce <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NOS SERVICES */}
      <section className="py-24 relative bg-marine-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <span className="text-cyan-500 text-sm font-semibold">Nos services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ce que nous <span className="gradient-text">faisons</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Code, title: 'Développement sur mesure', desc: 'Applications web, desktop et mobiles adaptées à vos besoins spécifiques.' },
              { icon: Lightbulb, title: 'Conseil et audit', desc: 'Analyse de vos processus et recommandations pour la transformation digitale.' },
              { icon: Users, title: 'Formation', desc: 'Accompagnement de vos équipes pour maîtriser nos outils.' },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <service.icon size={22} className="text-cyan-500" />
                </div>
                <h3 className="font-bold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à transformer votre <span className="gradient-text">activité</span> ?
            </h2>
            <p className="text-slate-400 mb-8">
              Essayez Mouhassib gratuitement pendant 30 jours. Aucune carte bancaire requise.
            </p>
            <Link to="/mouhassib" className="btn-primary text-base">
              Télécharger l'essai gratuit <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
