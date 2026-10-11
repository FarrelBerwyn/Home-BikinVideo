/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/navbar/Navbar';
import { FeatureItem } from './components/navbar/navData';
import { HeroSection } from './components/HeroSection';
import { InteractiveDemoSection } from './components/InteractiveDemoSection';
import { WorkflowPipelineSection } from './components/WorkflowPipelineSection';
import { IntelligenceSection } from './components/IntelligenceSection';
import { EditorControlSection } from './components/EditorControlSection';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { FeaturesBenefitSection } from './components/FeaturesBenefitSection';
import { FeaturesSection } from './components/FeaturesSection';
import { SocialToolsSection } from './components/SocialToolsSection';
import { UseCasesSection } from './components/UseCasesSection';
import { TeamWorkflowSection } from './components/TeamWorkflowSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

import { TrialModal } from './components/TrialModal';
import { PricingModal } from './components/PricingModal';
import { AffiliateModal } from './components/AffiliateModal';
import { VideoPreviewModal } from './components/VideoPreviewModal';
import { InfoModal } from './components/InfoModal';
import { useScrollBackgroundFade } from './hooks/useScrollBackgroundFade';

export default function App() {
  // Smooth scroll-driven background fade (650px transition range, center-balanced, zero re-renders)
  useScrollBackgroundFade(650);

  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isAffiliateOpen, setIsAffiliateOpen] = useState(false);

  const [previewData, setPreviewData] = useState<{
    isOpen: boolean;
    title: string;
    type: string;
  }>({
    isOpen: false,
    title: '',
    type: 'Explainer Videos',
  });

  const [infoData, setInfoData] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
  }>({
    isOpen: false,
    title: '',
    content: '',
  });

  const handleOpenPreview = (title: string, type: string) => {
    setPreviewData({
      isOpen: true,
      title,
      type,
    });
  };

  const handleOpenInfo = (title: string, content: string) => {
    setInfoData({
      isOpen: true,
      title,
      content,
    });
  };

  const handleSelectSocialPlatform = (platform: string) => {
    const demoEl = document.getElementById('hero-demo');
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080914] text-[#F1F0F6] selection:bg-purple-500/30 selection:text-white overflow-x-hidden">
      {/* 5-Layer Ambient Lighting & Star Field */}
      <AmbientBackground />

      {/* SaaS Navbar with OpusClip-Style Mega Menu */}
      <Navbar
        onOpenPricing={() => {
          const pricingEl = document.getElementById('pricing');
          if (pricingEl) {
            pricingEl.scrollIntoView({ behavior: 'smooth' });
          } else {
            setIsPricingOpen(true);
          }
        }}
        onOpenTrial={() => setIsTrialOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenFeatureModal={(feature: FeatureItem) => {
          handleOpenInfo(
            feature.title,
            `${feature.description}\n\nFeature status: ${feature.badge || 'Active in Engine'}\n\nYou can configure and test this AI video capability directly inside the interactive studio generator above.`
          );
        }}
        onOpenInfoModal={handleOpenInfo}
      />

      {/* Main Page Flow */}
      <main className="relative z-10">
        {/* Section 1: Hero & Interactive Studio Card with Live Timeline */}
        <HeroSection
          onOpenTrial={() => setIsTrialOpen(true)}
          onNavigateSection={handleNavigateSection}
        />


        {/* Section 3: OpusClip-Style Interactive Before/After Comparison Demo */}
        <InteractiveDemoSection
          onOpenTrial={() => setIsTrialOpen(true)}
        />

        {/* Section 4: 5-Stage Autonomous Editing Pipeline (Understand, Plan, Execute, Verify, Repair) */}
        <WorkflowPipelineSection />

        {/* Section 5: Deep Video Understanding & Scene Intelligence */}
        <IntelligenceSection />

        {/* Section 6: Deterministic Timeline Control & Non-destructive Editing */}
        <EditorControlSection />

        {/* Section 7: Real Creator Case Studies Gallery */}
        <BeforeAfterGallery onOpenTrial={() => setIsTrialOpen(true)} />

        {/* Section 8: Three Pillars Feature Deep-Dive (Speed, Quality, Control) */}
        <FeaturesBenefitSection
          onOpenTrial={() => setIsTrialOpen(true)}
        />

        {/* Section 9: Features Asymmetric Bento Grid */}
        <FeaturesSection
          onOpenTrial={() => setIsTrialOpen(true)}
          onOpenPreviewModal={handleOpenPreview}
        />

        {/* Section 10: Multi-Platform Social Tools & Optimization Presets */}
        <SocialToolsSection
          onOpenTrial={() => setIsTrialOpen(true)}
          onSelectPlatform={handleSelectSocialPlatform}
        />

        {/* Section 11: Tailored Workflows by Creator Persona */}
        <UseCasesSection
          onOpenTrial={() => setIsTrialOpen(true)}
        />

        {/* Section 12: Team & Agency Scale Infrastructure */}
        <TeamWorkflowSection />

        {/* Section 13: High-Trust Verified Creator Testimonials */}
        <TestimonialsSection />

        {/* Section 14: On-Page Interactive Pricing Table */}
        <PricingSection
          onOpenTrial={() => setIsTrialOpen(true)}
        />

        {/* Section 15: Comprehensive Accordion FAQ */}
        <FAQSection />

        {/* Section 16: Final High-Conversion Cosmic CTA */}
        <FinalCTA
          onOpenTrial={() => setIsTrialOpen(true)}
          onExploreEditor={() => handleNavigateSection('hero-demo')}
        />
      </main>

      {/* Section 17: Editorial SaaS Footer */}
      <Footer onOpenModal={handleOpenInfo} />

      {/* Modals & Dialogs */}
      <TrialModal isOpen={isTrialOpen} onClose={() => setIsTrialOpen(false)} />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onSelectPlan={(_plan) => {
          setIsPricingOpen(false);
          setIsTrialOpen(true);
        }}
      />

      <AffiliateModal
        isOpen={isAffiliateOpen}
        onClose={() => setIsAffiliateOpen(false)}
      />

      <VideoPreviewModal
        isOpen={previewData.isOpen}
        onClose={() => setPreviewData((prev) => ({ ...prev, isOpen: false }))}
        title={previewData.title}
        videoType={previewData.type}
      />

      <InfoModal
        isOpen={infoData.isOpen}
        onClose={() => setInfoData((prev) => ({ ...prev, isOpen: false }))}
        title={infoData.title}
        content={infoData.content}
      />
    </div>
  );
}
