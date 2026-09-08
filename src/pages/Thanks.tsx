import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, ArrowRight } from 'lucide-react';

export default function Thanks() {
  const [params] = useSearchParams();
  const email = params.get('email') || 'votre boîte mail';
  const downloadUrl = params.get('dl') || '';

  useEffect(() => {
    if (!downloadUrl) return;
    const t = setTimeout(() => {
      window.location.href = downloadUrl;
    }, 800);
    return () => clearTimeout(t);
  }, [downloadUrl]);

  return (
    <div className="pt-20 min-h-screen flex items-center">
      <section className="w-full py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="glass-card rounded-3xl p-12"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-400" />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Merci ! <span className="gradient-text">C'est parti</span>
            </h1>

            <p className="text-lg text-slate-300 mb-6">
              {downloadUrl ? 'Votre téléchargement démarre automatiquement...' : 'Votre demande a bien été enregistrée.'}
            </p>

            {downloadUrl && (
              <a
                href={downloadUrl}
                className="btn-primary text-base justify-center mb-8"
              >
                <Download size={18} /> Télécharger maintenant
              </a>
            )}

            <div className="bg-marine-900 rounded-xl p-6 mb-8 border border-cyan-500/20">
              <div className="flex items-center gap-3 justify-center mb-1">
                <span className="text-slate-300 text-sm">Une confirmation a aussi été envoyée à</span>
              </div>
              <div className="text-cyan-500 font-mono font-semibold">{email}</div>
            </div>

            <div className="space-y-3 mb-8 text-left bg-marine-800/50 rounded-xl p-6">
              <h3 className="font-bold text-white mb-3">Prochaines étapes :</h3>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-cyan-500 text-marine-900 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                <p className="text-sm text-slate-300">Ouvrez le fichier téléchargé (<code>Mouhassib-Setup.exe</code>) dans votre dossier Téléchargements.</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-cyan-500 text-marine-900 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                <p className="text-sm text-slate-300">Autorisez l'installation si Windows affiche un avertissement (SmartScreen).</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-cyan-500 text-marine-900 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                <p className="text-sm text-slate-300">Installez Mouhassib sur votre PC Windows et lancez votre essai gratuit de 30 jours.</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-8">
              Le téléchargement n'a pas démarré ?<br />
              Utilisez le bouton ci-dessus, ou <Link to="/contact" className="text-cyan-500 underline">contactez-nous</Link>.
            </p>

            <Link to="/" className="btn-secondary text-base">
              Retour à l'accueil <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
