import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Package, BarChart3, ShoppingCart, Boxes, Calculator, Globe, Download,
  Check, HardDrive, Clock, Shield, Loader2
} from 'lucide-react';
import { MOUHASSIB_DOWNLOAD_URL } from '../config';

export default function Mouhassib() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', ville: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.nom || !form.email || !form.telephone) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/download-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, produit: 'mouhassib' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur inconnue');
      const params = new URLSearchParams({ email: form.email });
      if (MOUHASSIB_DOWNLOAD_URL) params.set('dl', MOUHASSIB_DOWNLOAD_URL);
      navigate(`/merci?${params.toString()}`);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: BarChart3, title: 'Dashboard temps réel', desc: 'Vue globale de votre activité : ventes, achats, résultat, alertes stock et péremption.' },
    { icon: ShoppingCart, title: 'Ventes & factures', desc: 'Enregistrement des ventes, génération de tickets et factures professionnelles.' },
    { icon: Boxes, title: 'Stock & péremption', desc: 'Suivi du stock, alertes automatiques sur seuils et dates de péremption.' },
    { icon: Calculator, title: 'Comptabilité intégrée', desc: 'Journaux, balance, bilan, export Sage 100. Gestion complète de la zakat.' },
    { icon: Globe, title: '100% arabe RTL', desc: 'Interface entièrement en arabe, adaptée aux commerçants arabophones.' },
    { icon: HardDrive, title: 'Fonctionne hors ligne', desc: 'Base SQLite locale. Aucun besoin d\'internet pour utiliser Mouhassib.' },
  ];

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
                <span className="text-sm text-slate-300">Version 1.0.0 disponible</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                <span className="gradient-text">Mouhassib</span>
                <br />
                <span className="text-3xl md:text-4xl text-slate-300 font-bold">
                  La gestion commerciale
                  <br />qui parle votre langue
                </span>
              </h1>

              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Logiciel complet de gestion pour commerçants et TPE : ventes, stock, achats,
                clients, factures et comptabilité. Entièrement en arabe, avec support RTL natif.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: Clock, text: 'Trial 30 jours gratuit' },
                  { icon: Shield, text: 'Aucune carte requise' },
                  { icon: HardDrive, text: 'Fonctionne hors ligne' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card text-sm">
                    <item.icon size={14} className="text-cyan-500" />
                    <span className="text-slate-300">{item.text}</span>
                  </div>
                ))}
              </div>

              <a href="#telecharger" className="btn-primary text-base">
                <Download size={18} /> Télécharger gratuitement
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
                    <div className="text-slate-400 text-sm">Aperçu de Mouhassib</div>
                    <div className="text-slate-500 text-xs mt-1">(Screenshot à venir)</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 glass-card px-4 py-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-slate-300 font-medium">Live production</span>
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
              <span className="text-cyan-500 text-sm font-semibold">Fonctionnalités</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tout ce dont votre commerce <span className="gradient-text">a besoin</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                  <f.icon size={22} className="text-cyan-500" />
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉLÉCHARGEMENT */}
      <section id="telecharger" className="py-24 relative bg-marine-800/30">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gold-300/10 border border-gold-300/20 mb-4">
              <span className="text-gold-300 text-sm font-semibold">Téléchargement</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Essayez Mouhassib <span className="gradient-text">gratuitement</span>
            </h2>
            <p className="text-slate-400">
              Remplissez le formulaire ci-dessous : le téléchargement démarre immédiatement.
              <br />
              Trial 30 jours complet, sans engagement.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={submit}
            className="glass-card rounded-2xl p-8"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nom complet <span className="text-cyan-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  className="w-full px-4 py-3 bg-marine-900 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition"
                  placeholder="Mohamed Ahmed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email <span className="text-cyan-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 bg-marine-900 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Téléphone / WhatsApp <span className="text-cyan-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.telephone}
                  onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  className="w-full px-4 py-3 bg-marine-900 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition"
                  placeholder="+222 XX XX XX XX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Ville
                </label>
                <input
                  type="text"
                  value={form.ville}
                  onChange={(e) => setForm({ ...form, ville: e.target.value })}
                  className="w-full px-4 py-3 bg-marine-900 border border-cyan-500/20 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition"
                  placeholder="Nouakchott"
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6 justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Préparation du téléchargement...</>
              ) : (
                <><Download size={18} /> Télécharger Mouhassib</>
              )}
            </button>

            <p className="text-xs text-slate-500 text-center mt-4">
              En cliquant, le téléchargement démarre immédiatement et vous recevez aussi un email de confirmation.
              Vos données sont utilisées uniquement pour vous fournir Mouhassib.
            </p>
          </motion.form>

          {/* Ce qui est inclus */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Trial complet 30 jours',
              'Toutes les fonctionnalités',
              'Support par email',
            ].map(item => (
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
