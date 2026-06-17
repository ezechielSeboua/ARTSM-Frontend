const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-auto font-sans border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* 1. À PROPOS & RÉSEAUX SOCIAUX */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide mb-3">
              ARSTM<span className="text-blue-500">.</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Académie Régionale des Sciences et Techniques de la Mer. L'institution de référence régionale pour la formation maritime, portuaire et industrielle en Afrique de l'Ouest.
            </p>
          </div>
          
          {/* Liens Réseaux Sociaux */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Suivez-nous
            </h3>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-blue-600 hover:text-white rounded-full transition-colors duration-300" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-gray-700 hover:text-white rounded-full transition-colors duration-300" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-blue-700 hover:text-white rounded-full transition-colors duration-300" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 2. LIENS RAPIDES ACCORDÉS AU HEADER */}
        <div className="flex flex-col space-y-4 md:pl-10">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Navigation
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="/" className="hover:text-blue-400 transition-colors duration-200">Accueil</a>
            </li>
            <li>
              <a href="/institution" className="hover:text-blue-400 transition-colors duration-200">L'Institution</a>
            </li>
            <li>
              <a href="/ecoles" className="hover:text-blue-400 transition-colors duration-200">Nos Écoles</a>
            </li>
            <li>
              <a href="/actualites" className="hover:text-blue-400 transition-colors duration-200">Actualités</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400 transition-colors duration-200">Contact</a>
            </li>
          </ul>
        </div>

        {/* 3. LOCALISATION DE L'ARSTM & MAP */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            Notre Localisation
          </h3>
          <p className="text-sm text-gray-400 leading-snug">
            Yopougon Niangon Lokoa, Route de Jacqueville,<br />
            Abidjan, Côte d'Ivoire
          </p>
          
          {/* Google Maps Iframe pointée sur l'ARSTM Abidjan */}
          <div className="w-full h-44 rounded-lg overflow-hidden shadow-md border border-gray-800">
            <iframe
              title="Localisation ARSTM"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.643329976378!2d-4.095594925828882!3d5.318251335555462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1f3f3893370f7d59%3A0x8686f0ea925ffec2!2sARSTM%20(Acad%C3%A9mie%20R%C3%A9gionale%20des%20Sciences%20et%20Techniques%20de%20la%20Mer)!5e0!3m2!1sfr!2sci!4v1710000000000!5m2!1sfr!2sci"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>

      {/* BARRE DE COPYRIGHT */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <div>
          © {new Date().getFullYear()} ARSTM. Tous droits réservés.
        </div>
        <div className="flex space-x-6">
          <a href="/terms" className="hover:text-gray-400 transition-colors">Mentions légales</a>
          <a href="/privacy" className="hover:text-gray-400 transition-colors">Confidentialité</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;