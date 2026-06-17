export interface Grade {
  subject: string;
  grade: number;
  coefficient: number;
  semester: number;
}

export interface TimetableItem {
  day: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi';
  time: string;
  subject: string;
  room: string;
  teacher: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'guest';
  matricule?: string;
  cohort?: string;
  schoolId?: string;
  avatar?: string;
  grades?: Grade[];
  timetable?: TimetableItem[];
}
