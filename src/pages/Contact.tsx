import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
              <span className="gradient-text">Contactez-nous</span>
            </h1>
            <p className="text-slate-400">Une question ? Une demande sur mesure ? Écrivez-nous.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Mail, title: 'Email', value: 'contact@it-rim.net', href: 'mailto:contact@it-rim.net' },
              { icon: Phone, title: 'Téléphone', value: '+222 XX XX XX XX', href: 'tel:+22200000000' },
              { icon: MessageCircle, title: 'WhatsApp', value: '+222 XX XX XX XX', href: 'https://wa.me/22200000000' },
            ].map((c, i) => (
              <motion.a
                key={c.title}
                href={c.href}
                target={c.title === 'WhatsApp' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <c.icon size={22} className="text-cyan-500" />
                </div>
                <h3 className="font-semibold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-slate-400">{c.value}</p>
              </motion.a>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-8 mt-8 text-center">
            <MapPin size={40} className="text-cyan-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nouakchott, Mauritanie</h3>
            <p className="text-slate-400">Nous accompagnons commerçants et entreprises en Mauritanie et dans toute l'Afrique de l'Ouest.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
