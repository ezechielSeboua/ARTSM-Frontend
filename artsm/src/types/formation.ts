export interface CursusYear {
  year: number;
  semesters: {
    name: string;
    modules: string[];
  }[];
}

export interface Formation {
  id: string;
  title: string;
  level: 'Bachelor' | 'Master' | 'Engineer' | 'Licence' | 'Doctorate';
  duration: string;
  description: string;
  ecoleId: string;
  careers: string[];
  program: CursusYear[];
}
