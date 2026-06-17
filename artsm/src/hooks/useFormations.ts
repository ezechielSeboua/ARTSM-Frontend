'use client';

import { useState, useMemo } from 'react';
import { mockFormations } from '@/lib/api';

export function useFormations() {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedSchool, setSelectedSchool] = useState<string>('all');

  const filteredFormations = useMemo(() => {
    return mockFormations.filter((formation) => {
      const matchesSearch = 
        formation.title.toLowerCase().includes(search.toLowerCase()) ||
        formation.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesLevel = selectedLevel === 'all' || formation.level === selectedLevel;
      const matchesSchool = selectedSchool === 'all' || formation.ecoleId === selectedSchool;

      return matchesSearch && matchesLevel && matchesSchool;
    });
  }, [search, selectedLevel, selectedSchool]);

  return {
    search,
    setSearch,
    selectedLevel,
    setSelectedLevel,
    selectedSchool,
    setSelectedSchool,
    formations: filteredFormations,
  };
}
export default useFormations;
