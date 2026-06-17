export interface Actualite {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'academic' | 'events' | 'campus-life';
  date: string;
  image: string;
  readTime: string;
}
