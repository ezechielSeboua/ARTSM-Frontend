import { useState } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Validation basique de l'email
  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isValidEmail(email)) {
      setStatus('error');
      setErrorMessage('Veuillez entrer une adresse email valide.');
      return;
    }

    setStatus('loading');

    try {
      // Simulation d'un appel API (remplace par ton endpoint réel)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <section
      className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 py-12 sm:py-20 px-4 sm:px-6 overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Motif discret d'arrière-plan */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-5" />

      <div className="relative max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10">
        {/* Zone texte */}
        <div className="text-center lg:text-left flex-1 space-y-2 sm:space-y-3">
          <h2
            id="newsletter-heading"
            className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight"
          >
            📬 Recevez nos actualités
          </h2>
          <p className="text-blue-200 text-xs sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
            Rejoignez la communauté ARSTM. Soyez informé des dates de concours
            et des nouvelles formations en avant-première.
          </p>
        </div>

        {/* Carte formulaire */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full lg:max-w-xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-blue-950/30 p-1.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 ring-1 ring-white/20 transition-all hover:ring-2 hover:ring-amber-400/50"
        >
          {/* Champ email avec label accessible */}
          <div className="relative flex-grow">
            <label htmlFor="newsletter-email" className="sr-only">
              Votre adresse email
            </label>
            <div className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="votre.email@exemple.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              disabled={status === 'loading' || status === 'success'}
              className="w-full h-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-xs sm:text-base rounded-2xl sm:rounded-r-none disabled:opacity-60 transition"
              aria-describedby={status === 'error' ? 'email-error' : undefined}
              aria-invalid={status === 'error' ? 'true' : undefined}
            />
          </div>

          {/* Bouton d'abonnement */}
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`
              flex-shrink-0 w-full sm:w-auto bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-blue-950 
              px-5 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-l-none font-bold text-xs sm:text-base
              transition-all duration-200 ease-in-out
              disabled:opacity-70 disabled:cursor-not-allowed
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/80
              flex items-center justify-center gap-2
              ${status === 'success' ? 'bg-green-500 hover:bg-green-400 text-white' : ''}
            `}
          >
            {status === 'loading' ? (
              <svg
                className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : status === 'success' ? (
              '✓ Inscrit !'
            ) : (
              "S'abonner"
            )}
          </button>
        </form>
      </div>

      {/* Messages de retour */}
      {status === 'success' && (
        <div className="max-w-5xl mx-auto mt-3 sm:mt-4 text-center lg:text-left" aria-live="polite">
          <p className="text-green-300 text-xs sm:text-sm font-medium">
            🎉 Merci ! Vous êtes désormais inscrit à la newsletter.
          </p>
        </div>
      )}

      {status === 'error' && errorMessage && (
        <div
          className="max-w-5xl mx-auto mt-3 sm:mt-4 text-center lg:text-left"
          id="email-error"
          aria-live="assertive"
        >
          <p className="text-red-300 text-xs sm:text-sm font-medium">{errorMessage}</p>
        </div>
      )}
    </section>
  );
};

export default NewsletterSection;