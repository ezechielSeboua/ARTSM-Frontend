const ValueProposition = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col lg:flex-row gap-8 sm:gap-16 items-center">
      <div className="flex-1 space-y-4 sm:space-y-6">
        <h2 className="text-2xl sm:text-4xl font-black text-blue-950 leading-tight">
          L'excellence maritime au cœur de l'Afrique.
        </h2>
        <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
          Depuis plus de 35 ans, l'ARSTM forme les leaders de demain. Reconnue par l'Organisation Maritime Internationale, notre institution allie rigueur académique, technologies de pointe et une immersion professionnelle totale.
        </p>
        <ul className="space-y-3 sm:space-y-4">
          {['Certifications internationales STCW', 'Partenariats avec les armateurs mondiaux', 'Campus technologique moderne'].map((item, i) => (
            <li key={i} className="flex items-center gap-2 sm:gap-3 font-semibold text-blue-900 text-sm sm:text-base">
              <span className="w-5 h-5 sm:w-6 sm:h-6 bg-amber-400 rounded-full flex items-center justify-center text-white text-xs">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 w-full">
        <img 
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800" 
          alt="Campus ARSTM" 
          className="rounded-3xl shadow-2xl w-full h-56 sm:h-[400px] object-cover"
        />
      </div>
    </section>
  );
};
export default ValueProposition;