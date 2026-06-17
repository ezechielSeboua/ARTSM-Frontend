import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import EcolesGrid from '@/components/sections/EcolesGrid';
import FormationsGrid from '@/components/sections/FormationsGrid';
import ActualitesGrid from '@/components/sections/ActualitesGrid';
import PartenairesMap from '@/components/sections/PartenairesMap';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <HeroSection />
      <StatsSection />
      <EcolesGrid />
      <FormationsGrid />
      <ActualitesGrid />
      <PartenairesMap />
      <CTASection />
    </div>
  );
}
