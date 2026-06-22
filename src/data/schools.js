export const SCHOOLS_DATA = [
  {
    slug: "esn",
    abbreviation: "ESN",
    title: "École Supérieure de Navigation",
    category: "ECOLE",
    tag: "Enseignement Supérieur",
    color: "blue",
    description:
      "Dédiée à la formation des personnels navigants (Officiers de la Marine Marchande). Elle couvre les compétences d'ingénierie en navigation et en mécanique navale.",
    longDescription:
      "L'École Supérieure de Navigation forme les officiers navigants et mécaniciens de la marine marchande au niveau supérieur. Disposant de simulateurs de navigation NTPRO de dernière génération, elle prépare les étudiants aux rigueurs de la passerelle et des salles des machines des navires commerciaux modernes. Ses diplômés exercent au sein des plus grandes compagnies maritimes mondiales.",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1600",
    features: ["Pont & Navigation", "Machine & Énergie Navale", "Sécurité à bord"],
    programs: [
      { level: "Licence", name: "Licence en Sciences Nautiques", duration: "3 ans" },
      { level: "Master", name: "Master Professionnel en Navigation Maritime", duration: "2 ans" },
      { level: "Certificat", name: "Brevet de Capitaine 200", duration: "6 mois" },
    ],
    careers: ["Officier de pont", "Capitaine de navire", "Pilote maritime", "Officier de sécurité"],
    certifications: ["STCW", "OMI", "Ministère de l'Enseignement Supérieur"],
  },
  {
    slug: "estm",
    abbreviation: "ESTM",
    title: "École Supérieure des Transports Maritimes",
    category: "ECOLE",
    tag: "Enseignement Supérieur",
    color: "indigo",
    description:
      "Forme les cadres moyens et supérieurs sédentaires aux métiers de la logistique, de la gestion portuaire, du commerce international et du transport maritime.",
    longDescription:
      "L'École Supérieure des Transports Maritimes est la référence régionale pour la formation des cadres sédentaires du secteur maritime et portuaire. Elle forme aux métiers de la gestion, du commerce international, de la logistique et du droit maritime. Ses diplômés occupent des postes à responsabilité dans les autorités portuaires, les transitaires, les armateurs et les administrations maritimes.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600",
    features: ["Management Portuaire", "Logistique & Supply Chain", "Commerce International"],
    programs: [
      { level: "Licence", name: "Licence en Transport Maritime et Logistique", duration: "3 ans" },
      { level: "Master", name: "Master en Gestion Portuaire", duration: "2 ans" },
      { level: "Master", name: "Master en Commerce Maritime International", duration: "2 ans" },
    ],
    careers: ["Responsable logistique", "Agent maritime", "Gestionnaire portuaire", "Commissionnaire en douane"],
    certifications: ["FIATA", "Ministère de l'Enseignement Supérieur", "ISO 9001"],
  },
  {
    slug: "ceam",
    abbreviation: "CEAM",
    title: "Centre d'Enseignement et d'Apprentissage Maritime",
    category: "CENTRE",
    tag: "Formation Métiers / Apprentissage",
    color: "cyan",
    description:
      "Dédié aux formations techniques de courte et moyenne durée pour l'acquisition de compétences pratiques immédiates requises par les chantiers navals et les ports.",
    longDescription:
      "Le CEAM forme les officiers subalternes et les équipages des services pont et machine ainsi que les professionnels de la pêche. Centre d'apprentissage par excellence, il dispense des formations pratiques et certifiantes adaptées aux besoins immédiats de l'industrie maritime. Ses formations courtes permettent une insertion professionnelle rapide.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600",
    features: ["Métiers de l'Artisanat Marin", "Certifications Pratiques", "Techniciens Surface Portuaire"],
    programs: [
      { level: "CAP/BEP", name: "C 500 — Capitaine 500 Tonneaux", duration: "1 an" },
      { level: "BT", name: "CAM Polyvalent", duration: "2 ans" },
      { level: "Certificat", name: "Formations STCW de base", duration: "2 semaines" },
    ],
    careers: ["Officier subalterne", "Matelot qualifié", "Technicien de surface", "Mécanicien naval"],
    certifications: ["STCW", "OMI", "Ministère de l'Enseignement Technique"],
  },
  {
    slug: "foad",
    abbreviation: "FOAD",
    title: "Formation à Distance",
    category: "CENTRE",
    tag: "E-Learning",
    color: "emerald",
    description:
      "Plateforme numérique moderne de l'ARSTM permettant aux professionnels en activité de monter en compétences à distance sur les modules maritimes et industriels.",
    longDescription:
      "La Plateforme de Formation à Distance (FOAD) de l'ARSTM permet aux professionnels en activité de suivre des formations diplômantes et certifiantes sans interrompre leur carrière. Grâce à une pédagogie innovante alliant cours asynchrones, classes virtuelles et tutorat personnalisé, la FOAD démocratise l'accès à l'excellence maritime pour toute l'Afrique.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600",
    features: ["Cours 100% en ligne", "Flexibilité Professionnelle", "Suivi Tutoré"],
    programs: [
      { level: "Certificat", name: "Sensibilisation à la Sûreté Maritime", duration: "4 semaines" },
      { level: "Module", name: "Logistique Portuaire Fondamentaux", duration: "6 semaines" },
      { level: "Module", name: "Droit Maritime International", duration: "8 semaines" },
    ],
    careers: ["Mise à niveau professionnelle", "Reconversion maritime", "Certification continue"],
    certifications: ["Attestations ARSTM", "Modules OMI reconnus"],
  },
  {
    slug: "ismi",
    abbreviation: "ISMI",
    title: "Institut de Sécurité Maritime Interrégional",
    category: "INSTITUT",
    tag: "Dimension Régionale",
    color: "red",
    description:
      "Structure d'envergure interrégionale axée sur le renforcement des capacités de l'État en mer, la lutte contre la piraterie, la sûreté et la protection du milieu marin.",
    longDescription:
      "L'Institut de Sécurité Maritime Interrégional forme les cadres civils et militaires d'Afrique de l'Ouest et du Centre en matière de sûreté maritime, de lutte contre la piraterie et de gouvernance de l'économie bleue. Ses programmes répondent aux exigences du Code ISPS et aux conventions de l'OMI.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1600",
    features: ["Sûreté Maritime", "Gouvernance Économie Bleue", "Droit de la Mer"],
    programs: [
      { level: "Certificat", name: "Code ISPS — Agent de Sûreté", duration: "1 semaine" },
      { level: "Formation", name: "Lutte contre la piraterie maritime", duration: "2 semaines" },
      { level: "Séminaire", name: "Gouvernance et droit maritime", duration: "3 jours" },
    ],
    careers: ["Agent de sûreté portuaire", "Officier de sécurité", "Cadre maritime militaire"],
    certifications: ["OMI", "Code ISPS", "CEDEAO"],
  },
  {
    slug: "crempol",
    abbreviation: "CREMPOL",
    title: "Centre de Recherche Maritime Portuaire et Logistique",
    category: "CENTRE",
    tag: "Recherche & Innovation",
    color: "amber",
    description:
      "Pôle d'excellence scientifique chargé de mener des études stratégiques, des audits et des recherches appliquées pour moderniser les secteurs portuaires africains.",
    longDescription:
      "Le Centre de Recherche Maritime Portuaire et Logistique apporte des solutions pragmatiques aux défis logistiques auxquels sont confrontés les États africains : offres de transport, passages portuaires et gestion des corridors. Il produit des publications scientifiques et réalise des audits pour les gouvernements et organisations régionales.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600",
    features: ["Études Stratégiques", "Audits Portuaires", "Publications Scientifiques"],
    programs: [
      { level: "Programme", name: "Audit de performance portuaire", duration: "Variable" },
      { level: "Programme", name: "Études de corridors logistiques", duration: "Variable" },
      { level: "Doctorat", name: "Recherche en sciences maritimes", duration: "3 ans" },
    ],
    careers: ["Chercheur maritime", "Consultant portuaire", "Expert logistique"],
    certifications: ["Publications indexées", "Partenariats UEMOA", "CEDEAO"],
  },
];

export const getSchoolBySlug = (slug) =>
  SCHOOLS_DATA.find((s) => s.slug === slug);
