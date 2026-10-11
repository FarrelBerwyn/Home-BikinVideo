import React from 'react';
import {
  Wand2,
  Film,
  Palette,
  AppWindow,
  Clapperboard,
  Sparkles,
  Images,
  Captions,
  Languages,
  Crop,
  Mic,
  Image,
  Workflow,
  CalendarDays,
  UsersRound,
  FileCode2,
  Binary,
  Bot,
  PanelsTopLeft,
  LayoutGrid,
  Video,
  Users,
  Briefcase,
  Building2,
  HelpCircle,
  GraduationCap,
  BookOpen,
  FlaskConical,
  History,
} from 'lucide-react';

export interface FeatureItem {
  id: string;
  title: string;
  badge?: 'New' | 'Updated' | 'Pro' | 'Core';
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isCustomIcon?: boolean;
  customIconLabel?: string;
  targetSection?: string;
  href?: string;
}

export interface DropdownLinkItem {
  id: string;
  title: string;
  badge?: 'New' | 'Updated';
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  targetSection?: string;
}

// =========================================================================
// 1. MAIN PRODUCTS (Produk Utama)
// Produk inti Bikin Video dengan prioritas & visual hierarchy tertinggi
// =========================================================================
export const MAIN_PRODUCTS: FeatureItem[] = [
  {
    id: 'bikin-ai-video',
    title: 'Bikin Video',
    badge: 'Core',
    description: 'Edit video dengan bantuan AI dari awal hingga siap dipublikasikan.',
    icon: Wand2,
    href: 'https://bikinvideo.com/Bikin-AI-Video',
  },
  {
    id: 'bikin-shorts',
    title: 'Bikin Shorts',
    badge: 'New',
    description: 'Ubah video panjang menjadi Shorts yang menarik dan siap dibagikan.',
    icon: Film,
    href: 'https://bikinvideo.com/Bikin-Short',
  },
  {
    id: 'bikin-brand',
    title: 'Bikin Brand',
    description: 'Buat video yang konsisten dengan identitas dan gaya merek.',
    icon: Palette,
    href: 'https://bikinvideo.com/Bikin-Brand',
  },
  {
    id: 'bikin-editor',
    title: 'Bikin Editor',
    badge: 'Updated',
    description: 'Edit video secara manual dengan bantuan fitur AI.',
    icon: AppWindow,
    href: 'https://bikinvideo.com/editor',
  },
];

// =========================================================================
// 2. AI TOOLS (Tools AI)
// Fitur AI pendukung proses pembuatan dan penyuntingan video
// =========================================================================
export const AI_TOOLS: FeatureItem[] = [
  {
    id: 'ai-producer',
    title: 'AI Producer',
    badge: 'New',
    description: 'Ubah raw footage menjadi video yang tersusun rapi.',
    icon: Clapperboard,
    targetSection: 'hero-demo',
  },
  {
    id: 'clip-anything',
    title: 'ClipAnything',
    description: 'Temukan dan buat klip menarik dari berbagai jenis video.',
    icon: Sparkles,
    targetSection: 'hero-demo',
  },
  {
    id: 'ai-b-roll',
    title: 'AI B-Roll',
    description: 'Tambahkan visual pendukung yang relevan secara otomatis.',
    icon: Images,
    targetSection: 'features',
  },
  {
    id: 'animated-captions',
    title: 'Animated Captions',
    description: 'Buat subtitle animasi untuk meningkatkan keterlibatan penonton.',
    icon: Captions,
    targetSection: 'features',
  },
  {
    id: 'ai-video-dubbing',
    title: 'AI Video Dubbing',
    badge: 'New',
    description: 'Buat dubbing video dengan bahasa yang berbeda.',
    icon: Languages,
    targetSection: 'features',
  },
  {
    id: 'ai-reframe',
    title: 'AI Reframe',
    badge: 'Updated',
    description: 'Sesuaikan rasio video untuk berbagai platform.',
    icon: Crop,
    targetSection: 'hero-demo',
  },
  {
    id: 'enhance-speech',
    title: 'Enhance Speech',
    badge: 'New',
    description: 'Tingkatkan kualitas suara dan kejernihan dialog.',
    icon: Mic,
    targetSection: 'features',
  },
  {
    id: 'thumbnail-generator',
    title: 'Thumbnail Generator',
    badge: 'New',
    description: 'Buat thumbnail menarik untuk video Anda.',
    icon: Image,
    targetSection: 'social-tools',
  },
];

// =========================================================================
// 3. WORKFLOWS & INTEGRATIONS (Workflow & Integrasi)
// Fitur kolaborasi, otomatisasi, ekspor, dan integrasi teknis
// =========================================================================
export const WORKFLOWS_INTEGRATIONS: FeatureItem[] = [
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    badge: 'New',
    description: 'Susun alur kerja video yang lebih efisien.',
    icon: Workflow,
    targetSection: 'features',
  },
  {
    id: 'social-scheduler',
    title: 'Social Scheduler',
    description: 'Jadwalkan publikasi konten ke berbagai platform.',
    icon: CalendarDays,
    targetSection: 'social-tools',
  },
  {
    id: 'team-workspace',
    title: 'Team Workspace',
    description: 'Kolaborasi dengan tim dalam satu workspace.',
    icon: UsersRound,
    targetSection: 'features',
  },
  {
    id: 'export-to-xml',
    title: 'Export to XML',
    description: 'Ekspor proyek untuk digunakan di software editing profesional.',
    icon: FileCode2,
    targetSection: 'how-it-works',
  },
  {
    id: 'api',
    title: 'API',
    description: 'Integrasikan kemampuan video Bikin Video ke aplikasi Anda.',
    icon: Binary,
    isCustomIcon: true,
    customIconLabel: 'API',
    targetSection: 'features',
  },
  {
    id: 'mcp',
    title: 'MCP',
    badge: 'New',
    description: 'Hubungkan Bikin Video dengan AI agent melalui MCP.',
    icon: Bot,
    isCustomIcon: true,
    customIconLabel: 'MCP',
    targetSection: 'features',
  },
  {
    id: 'brand-templates',
    title: 'Brand Templates',
    description: 'Gunakan template yang konsisten dengan identitas merek.',
    icon: PanelsTopLeft,
    targetSection: 'how-it-works',
  },
  {
    id: 'inspiration-gallery',
    title: 'Inspiration Gallery',
    description: 'Temukan inspirasi dan contoh workflow kreatif.',
    icon: LayoutGrid,
    targetSection: 'hero-demo',
  },
];

// Compatibility exports
export const FEATURES_COL_1 = MAIN_PRODUCTS;
export const FEATURES_COL_2 = AI_TOOLS;
export const FEATURES_COL_3 = WORKFLOWS_INTEGRATIONS;
export const AGENTIC_WORKFLOWS = WORKFLOWS_INTEGRATIONS;

// =========================================================================
// SOLUTIONS DROPDOWN
// =========================================================================
export const SOLUTIONS_ITEMS: DropdownLinkItem[] = [
  {
    id: 'creators',
    title: 'Content creators',
    description: 'Turn long-form podcasts and streams into viral TikToks and Reels',
    icon: Video,
    targetSection: 'social-tools',
  },
  {
    id: 'marketing-teams',
    title: 'Marketing teams',
    description: 'Multiply organic social reach and repurpose customer webinars',
    icon: Users,
    targetSection: 'social-tools',
  },
  {
    id: 'agencies',
    title: 'Agencies',
    description: 'Scale video delivery across dozens of client accounts seamlessly',
    icon: Briefcase,
    targetSection: 'how-it-works',
  },
  {
    id: 'businesses',
    title: 'Businesses',
    description: 'Enterprise security, brand compliance, and centralized billing',
    icon: Building2,
    targetSection: 'pricing',
  },
];

// =========================================================================
// RESOURCES DROPDOWN
// =========================================================================
export const RESOURCES_ITEMS: DropdownLinkItem[] = [
  {
    id: 'help-center',
    title: 'Help center',
    description: 'Step-by-step guides, FAQs, and developer documentation',
    icon: HelpCircle,
    targetSection: 'how-it-works',
  },
  {
    id: 'tutorials',
    title: 'Tutorials',
    description: 'Masterclass video lessons on viral short-form editing',
    icon: GraduationCap,
    targetSection: 'features',
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Weekly insights on social video algorithms and AI workflows',
    icon: BookOpen,
    targetSection: 'testimonials',
  },
  {
    id: 'inspiration',
    title: 'Inspiration gallery',
    description: 'Discover trending viral shorts crafted with Bikin Video',
    icon: LayoutGrid,
    targetSection: 'hero-demo',
  },
];

// =========================================================================
// BIKIN VIDEO LABS DROPDOWN
// =========================================================================
export const LABS_ITEMS: DropdownLinkItem[] = [
  {
    id: 'experimental-tools',
    title: 'Experimental tools',
    badge: 'New',
    description: 'Sneak preview access to generative 3D and multi-camera AI',
    icon: FlaskConical,
    targetSection: 'hero-demo',
  },
  {
    id: 'ai-video-research',
    title: 'AI video research',
    description: 'Published model benchmarks, latency optimizations, and papers',
    icon: Binary,
    targetSection: 'features',
  },
  {
    id: 'product-updates',
    title: 'Product updates',
    badge: 'Updated',
    description: 'Weekly platform changelog and upcoming community roadmap',
    icon: History,
    targetSection: 'features',
  },
];
