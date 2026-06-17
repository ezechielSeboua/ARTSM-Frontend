import { User, Grade, TimetableItem } from '@/types/user';

const mockGrades: Grade[] = [
  { subject: 'Algorithmique & Structures de Données', grade: 15.5, coefficient: 3, semester: 1 },
  { subject: 'Bases du Développement Web (React)', grade: 17.0, coefficient: 4, semester: 1 },
  { subject: 'Réseaux IP et Routage', grade: 12.0, coefficient: 3, semester: 1 },
  { subject: 'Gestion de Projet Agile', grade: 14.5, coefficient: 2, semester: 1 },
  { subject: 'Base de données NoSQL', grade: 16.0, coefficient: 3, semester: 2 },
  { subject: 'Anglais Professionnel', grade: 14.0, coefficient: 2, semester: 2 }
];

const mockTimetable: TimetableItem[] = [
  { day: 'Lundi', time: '08:00 - 12:00', subject: 'Algorithmique & Structures de Données', room: 'Salle 204 (ESN)', teacher: 'Dr. Jean-Pierre Kouamé' },
  { day: 'Mardi', time: '13:00 - 17:00', subject: 'Bases du Développement Web (React)', room: 'Labo Info 3 (ESN)', teacher: 'Mme. Sarah Koné' },
  { day: 'Jeudi', time: '08:00 - 12:00', subject: 'Réseaux IP et Routage', room: 'Salle 105 (ESN)', teacher: 'M. Ali Traoré' },
  { day: 'Vendredi', time: '14:00 - 16:00', subject: 'Gestion de Projet Agile', room: 'Amphi A', teacher: 'Prof. Amadou Diallo' }
];

export const mockStudentUser: User = {
  id: 'std-10029',
  name: 'Seydou Keïta',
  email: 'seydou.keita@artsm-edu.net',
  role: 'student',
  matricule: 'ART-2024-10029',
  cohort: 'Bachelor Génie Logiciel - 2ème Année',
  schoolId: 'esn',
  avatar: '👨‍🎓',
  grades: mockGrades,
  timetable: mockTimetable,
};

export const loginMock = async (email: string, password: string): Promise<User> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (email.toLowerCase().includes('student') || email.toLowerCase().includes('keita')) {
    return mockStudentUser;
  }
  
  // Generic user fallback
  return {
    id: 'guest-1',
    name: email.split('@')[0],
    email,
    role: 'guest',
  };
};
