import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { FeaturesMegaMenu } from './FeaturesMegaMenu';
import { DropdownMenu } from './DropdownMenu';
import { MobileNavDrawer } from './MobileNavDrawer';
import {
  SOLUTIONS_ITEMS,
  RESOURCES_ITEMS,
  LABS_ITEMS,
  FeatureItem,
} from './navData';

interface NavbarProps {
  onOpenPricing: () => void;
  onOpenTrial: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenFeatureModal?: (feature: FeatureItem) => void;
  onOpenInfoModal?: (title: string, content: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPricing,
  onOpenTrial,
  onNavigateSection,
  onOpenFeatureModal,
  onOpenInfoModal,
}) => {
  const [activeMenu, setActiveMenu] = useState<'features' | 'solutions' | 'resources' | 'labs' | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor scroll position to transform symmetrically between transparent top state and floating morphism card
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY ?? document.documentElement?.scrollTop ?? 0;
      setIsScrolled(scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hover handlers with debounce grace period
  const handleMouseEnter = (menuName: 'features' | 'solutions' | 'resources' | 'labs') => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const toggleMenu = (menuName: 'features' | 'solutions' | 'resources' | 'labs') => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleDropdownItemModal = (title: string, description: string) => {
    if (onOpenInfoModal) {
      onOpenInfoModal(title, `${description}\n\nThis capability is fully integrated into Bikin Video's AI video generation engine. You can test and configure it in the interactive demo workspace above.`);
    }
  };

  return (
    <header
      ref={navRef}
      className="site-navbar-wrapper"
    >
      <nav
        aria-label="Site Navigation"
        className={`site-navbar ${isScrolled ? 'is-floating is-scrolled' : ''}`}
      >
        <div className="navbar-inner">
        
        {/* ================= LEFT: BRAND ================= */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-lg py-1 pr-2"
          >
            {/* Official Brand Logo from brand-design (white version for dark navbar) */}
            <img
              src="/brand-design/bikin-video-logo.png"
              alt="Bikin Video"
              className="h-[28px] sm:h-[32px] w-auto object-contain group-hover:brightness-110 transition-all drop-shadow-sm"
            />
          </a>
        </div>

        {/* ================= CENTER: PRIMARY NAVIGATION ================= */}
        <div
          aria-label="Desktop Primary Navigation"
          className="hidden md:flex items-center gap-0.5 lg:gap-1 relative"
          onMouseLeave={handleMouseLeave}
        >
          {/* 1. Features */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('features')}
          >
            <button
              type="button"
              onClick={() => toggleMenu('features')}
              aria-expanded={activeMenu === 'features'}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-2 lg:px-2.5 py-1.5 rounded-[9px] text-[12px] lg:text-[13px] whitespace-nowrap font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                activeMenu === 'features'
                  ? 'bg-white/10 text-white shadow-sm border border-white/10'
                  : 'text-[#E6E6E6] hover:bg-white/[0.07] hover:text-white'
              }`}
            >
              <span>Features</span>
              <ChevronDown
                className={`w-3 h-3 text-[#999999] transition-transform duration-200 ${
                  activeMenu === 'features' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Features Mega Menu */}
            <FeaturesMegaMenu
              isOpen={activeMenu === 'features'}
              onClose={() => setActiveMenu(null)}
              onNavigate={onNavigateSection}
              onOpenFeatureModal={onOpenFeatureModal}
            />
          </div>

          {/* 2. Solutions */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('solutions')}
          >
            <button
              type="button"
              onClick={() => toggleMenu('solutions')}
              aria-expanded={activeMenu === 'solutions'}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-2 lg:px-2.5 py-1.5 rounded-[9px] text-[12px] lg:text-[13px] whitespace-nowrap font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                activeMenu === 'solutions'
                  ? 'bg-white/10 text-white shadow-sm border border-white/10'
                  : 'text-[#E6E6E6] hover:bg-white/[0.07] hover:text-white'
              }`}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`w-3 h-3 text-[#999999] transition-transform duration-200 ${
                  activeMenu === 'solutions' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Solutions Dropdown */}
            <DropdownMenu
              isOpen={activeMenu === 'solutions'}
              title="Solutions"
              items={SOLUTIONS_ITEMS}
              align="center"
              onClose={() => setActiveMenu(null)}
              onNavigate={onNavigateSection}
              onOpenItemModal={handleDropdownItemModal}
            />
          </div>

          {/* 3. Resources */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('resources')}
          >
            <button
              type="button"
              onClick={() => toggleMenu('resources')}
              aria-expanded={activeMenu === 'resources'}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-2 lg:px-2.5 py-1.5 rounded-[9px] text-[12px] lg:text-[13px] whitespace-nowrap font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                activeMenu === 'resources'
                  ? 'bg-white/10 text-white shadow-sm border border-white/10'
                  : 'text-[#E6E6E6] hover:bg-white/[0.07] hover:text-white'
              }`}
            >
              <span>Resources</span>
              <ChevronDown
                className={`w-3 h-3 text-[#999999] transition-transform duration-200 ${
                  activeMenu === 'resources' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Resources Dropdown */}
            <DropdownMenu
              isOpen={activeMenu === 'resources'}
              title="Resources"
              items={RESOURCES_ITEMS}
              align="center"
              onClose={() => setActiveMenu(null)}
              onNavigate={onNavigateSection}
              onOpenItemModal={handleDropdownItemModal}
            />
          </div>

          {/* 4. Pricing (direct link) */}
          <button
            type="button"
            onClick={onOpenPricing}
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
              setActiveMenu(null);
            }}
            className="px-2 lg:px-2.5 py-1.5 rounded-[9px] text-[12px] lg:text-[13px] whitespace-nowrap font-medium text-[#E6E6E6] hover:bg-white/[0.07] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            Pricing
          </button>

          {/* 5. For business (direct link) */}
          <button
            type="button"
            onClick={onOpenPricing}
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
              setActiveMenu(null);
            }}
            className="px-2 lg:px-2.5 py-1.5 rounded-[9px] text-[12px] lg:text-[13px] whitespace-nowrap font-medium text-[#E6E6E6] hover:bg-white/[0.07] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            For business
          </button>

          {/* 6. Bikin Video Labs */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('labs')}
          >
            <button
              type="button"
              onClick={() => toggleMenu('labs')}
              aria-expanded={activeMenu === 'labs'}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-2 lg:px-2.5 py-1.5 rounded-[9px] text-[12px] lg:text-[13px] whitespace-nowrap font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                activeMenu === 'labs'
                  ? 'bg-white/10 text-white shadow-sm border border-white/10'
                  : 'text-[#E6E6E6] hover:bg-white/[0.07] hover:text-white'
              }`}
            >
              <span className="hidden lg:inline">Bikin Video Labs</span>
              <span className="lg:hidden">Labs</span>
              <ChevronDown
                className={`w-3 h-3 text-[#999999] transition-transform duration-200 ${
                  activeMenu === 'labs' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Bikin Video Labs Dropdown */}
            <DropdownMenu
              isOpen={activeMenu === 'labs'}
              title="Bikin Video Labs"
              items={LABS_ITEMS}
              align="center"
              onClose={() => setActiveMenu(null)}
              onNavigate={onNavigateSection}
              onOpenItemModal={handleDropdownItemModal}
            />
          </div>
        </div>

        {/* ================= RIGHT: ACCOUNT ACTION ================= */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://bikinvideo.com/editor"
            className="text-[11.5px] xs:text-[12px] lg:text-[13px] font-medium text-[#E6E6E6] hover:text-white px-2 lg:px-2.5 py-1.5 rounded-[8px] whitespace-nowrap hover:bg-white/[0.07] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            Start Editing
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close Navigation' : 'Open Navigation'}
            className="md:hidden w-9 h-9 rounded-lg bg-[#1F1F1F] text-[#CCCCCC] hover:text-white flex items-center justify-center border border-white/[0.08] transition-colors cursor-pointer"
          >
            {isMobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileNavDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        onNavigate={onNavigateSection}
        onOpenPricing={onOpenPricing}
        onOpenDashboard={onOpenTrial}
      />
    </header>
  );
};
