/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BikinCursorAnimation } from './BikinCursorAnimation';

// =====================================================================
// CONSTANTS & 9:16 GEOMETRY WITH EXACT 4PX GAP
// =====================================================================
export const CARD_HEIGHT = 250;
export const CARD_WIDTH = (CARD_HEIGHT * 9) / 16; // 171.5625px — portrait 9:16 video ratio (1080 x 1920)
export const CARD_GAP = 10; // 12px gap (added 8px additional gap from 4px) between adjacent banners
const N = 20; // 20 orbital slots (2 smooth cycles of the 10 unique clips)
const STEP = 360 / N; // 18°
// Radius calculated so chord distance between card centers is exactly CARD_WIDTH + CARD_GAP (183.5625px):
const R = (CARD_WIDTH + CARD_GAP) / (2 * Math.sin(((STEP / 2) * Math.PI) / 180)); // 586.71px
const PERSPECTIVE = 1000;
const CULL_ANGLE = 75; // Roughly 8-9 cards visible across full width
const SPEED_DEG_PER_SEC = 1.8;

// =====================================================================
// DATA INTERFACE: TIKTOK PODCAST CLIPS
// =====================================================================
export interface TikTokClipBanner {
  id: string;
  creator: string;
  title: string;
  headline: string;
  category: string;
  imageUrl: string;
  fallbackImage: string;
  videoUrl: string;
  thumbnailSourceUrl: string;
  alt: string;
}

// =====================================================================
// CURATED 10 INDONESIAN TIKTOK PODCAST CLIPS DATASET
// =====================================================================
export const TIKTOK_CLIPS: TikTokClipBanner[] = [
  {
    id: 'clip-1-timothy-ronald',
    creator: 'Timothy Ronald',
    title: 'Manfaat Uang Bagi Orang',
    headline: 'JANGAN MATI SEBELUM KAYA!',
    category: 'FINANCE / MINDSET',
    imageUrl: 'https://images.openai.com/static-rsc-4/We7S51K8FRnUQJQfU_J36fjtoh_NNV1Qs33MkGK_B5zwWO2IaS-Nlz3f8lngPqaXan2pPiGQ6NRkeltZKkzRiU0Gd1hmWoDEQeYHJ0mqO2AHl9KsoElXg5aQMMso7E1LUOkpB3Lpp6V4KM8X5cvKqJTLG1wtH6kr-d2da201Sdc?purpose=inline',
    fallbackImage: '/thumbnails/timothy_ronald.jpg',
    videoUrl: 'https://www.tiktok.com/@timothyronald22/video/7501254346877766930',
    thumbnailSourceUrl: 'https://urlebird.com/video/manfaat-uang-bagi-orang-7501254346877766930/',
    alt: 'Timothy Ronald TikTok clip about money and financial mindset.',
  },
  {
    id: 'clip-2-raymond-modal-hp',
    creator: 'Raymond Chin',
    title: 'Cuma Modal HP Bisa Dapat Penghasilan',
    headline: 'MODAL HP BISA DAPAT PENGHASILAN',
    category: 'BUSINESS / ENTREPRENEURSHIP',
    imageUrl: 'https://images.openai.com/static-rsc-4/uA3tV1UXRoLqTNNFJ0Xp-5kA2DSmfwbK6FRmyMGCG04OA_QGtIIl977g-75_8UzlpTQWBDxMBR5mm_u-vk3-d_1xBf-5_di8ARHZSpNbnAhetom9j3WNX4pby6FcvBQkLAI2EwOt10a7Y5hUnRu31SMi8tSul2QUsYR5y44FV_c?purpose=inline',
    fallbackImage: '/thumbnails/raymond_chin_modal_hp.jpg',
    videoUrl: 'https://www.tiktok.com/@raymondchins/video/7561775744150555925',
    thumbnailSourceUrl: 'https://urlebird.com/video/cuma-modal-hp-bisa-dapat-penghasilan-7561775744150555925/',
    alt: 'Raymond Chin TikTok clip about digital business and income opportunities.',
  },
  {
    id: 'clip-3-gabriel-rey-podcast',
    creator: 'Gabriel Rey',
    title: 'Cangkruk Bareng Andy Sugar',
    headline: 'PERSONAL BRANDING & INFLUENCER GROWTH',
    category: 'CREATOR / PERSONAL BRANDING',
    imageUrl: 'https://images.openai.com/static-rsc-4/78EJZtX6xFPtmlYFwfuBJq4UV-8K49GFpEm8eCTArwYt8o1ZuL_qfTEp0GJoc7gF6C8S_EFwrNR9-S5XeNfdt6N5wUxWQlckyGxfFJko3NfC1Azs-mBJvv5yI1dop7-qvpyPVksCmIyb8WLOeWV42_be5u7sLbyYb58CijV-rpM?purpose=inline',
    fallbackImage: '/thumbnails/gabriel_rey.jpg',
    videoUrl: 'https://www.tiktok.com/@gabrielrey99/video/7555448923347848460',
    thumbnailSourceUrl: 'https://urlebird.com/video/kali-ini-kita-cangkruk-bareng-andy-sugar-influencer-hits-kebangg-7555448923347848460/',
    alt: 'Gabriel Rey TikTok clip about personal branding and creator growth.',
  },
  {
    id: 'clip-4-raymond-peluang-ai',
    creator: 'Raymond Chin',
    title: '4 Tangga Minimal 100 Juta Dari AI',
    headline: 'PELUANG EMAS BISNIS AI',
    category: 'ARTIFICIAL INTELLIGENCE',
    imageUrl: 'https://i.ytimg.com/vi/aey4xkrz7zE/hqdefault.jpg',
    fallbackImage: '/thumbnails/raymond_peluang_ai.jpg',
    videoUrl: 'https://www.tiktok.com/@raymondchins/video/7692302310621416712',
    thumbnailSourceUrl: 'https://urlebird.com/video/ini-4-tangga-yang-harus-kalian-tau-kalo-mau-hasilin-minimal-bang-7692302310621416712/',
    alt: 'Raymond Chin TikTok clip about AI roadmap and monetization opportunities.',
  },
  {
    id: 'clip-5-raymond-ai-produktivitas',
    creator: 'Raymond Chin',
    title: 'AI Bikin Jauh Lebih Produktif',
    headline: 'PRODUKTIVITAS EXPONENTIAL DENGAN AI',
    category: 'TECH & PRODUCTIVITY',
    imageUrl: 'https://i.ytimg.com/vi/0xtuUiuxLKw/hqdefault.jpg',
    fallbackImage: '/thumbnails/raymond_ai_produktivitas.jpg',
    videoUrl: 'https://www.tiktok.com/@raymondchins/video/7689390523471121685',
    thumbnailSourceUrl: 'https://urlebird.com/video/ai-punya-potensi-bikin-kita-jauh-lebih-produktif-tapi-di-saat-ya-7689390523471121685/',
    alt: 'Raymond Chin TikTok clip about AI tools and workflow productivity.',
  },
  {
    id: 'clip-6-raymond-ekosistem',
    creator: 'Raymond Chin',
    title: 'Katanya Ekosistem Itu Segalanya',
    headline: 'RAHASIA EKOSISTEM TEKNOLOGI',
    category: 'TECH ECOSYSTEM',
    imageUrl: 'https://i.ytimg.com/vi/aey4xkrz7zE/maxresdefault.jpg',
    fallbackImage: '/thumbnails/raymond_ekosistem.jpg',
    videoUrl: 'https://www.tiktok.com/@raymondchins/video/7691256731896204565',
    thumbnailSourceUrl: 'https://urlebird.com/video/katanya-ekosistem-itu-segalanya-tapi-pas-nyoba-smart-switch-di-z-7691256731896204565/',
    alt: 'Raymond Chin TikTok clip about smartphone ecosystem and switching technology.',
  },
  {
    id: 'clip-7-dery-kasisolusi',
    creator: 'Dery Kasisolusi',
    title: 'Ilmu Dari 2010 Membangun Bisnis',
    headline: 'FORMULA RAHASIA KASISOLUSI',
    category: 'PODCAST / MARKETING',
    imageUrl: 'https://i.ytimg.com/vi/udcRQzxiohw/hqdefault.jpg',
    fallbackImage: '/thumbnails/dery_kasisolusi.jpg',
    videoUrl: 'https://www.tiktok.com/@deryanshaa/video/7526354575666842885',
    thumbnailSourceUrl: 'https://urlebird.com/video/sejujurnya-ilmu-ini-gue-dapet-dari-tahun-2010-ketika-gue-menjadi-7526354575666842885/',
    alt: 'Deryansha Kasisolusi podcast clip discussing business principles since 2010.',
  },
  {
    id: 'clip-8-dery-bisnis-mental',
    creator: 'Dery Kasisolusi',
    title: 'Bangun Bisnis Butuh Mental Kuat',
    headline: 'MENTAL PEBISNIS & FOKUS KELUARGA',
    category: 'ENTREPRENEUR MINDSET',
    imageUrl: 'https://i.ytimg.com/vi/IE_vWYncDrs/hqdefault.jpg',
    fallbackImage: '/thumbnails/dery_bisnis_mental.jpg',
    videoUrl: 'https://www.tiktok.com/@deryanshaa/video/7623780314820742421',
    thumbnailSourceUrl: 'https://urlebird.com/video/bangun-bisnis-butuh-mental-tapi-ngawal-anak-sepedaan-jam-5-sore-7623780314820742421/',
    alt: 'Deryansha Kasisolusi clip about entrepreneur mental endurance and parenting.',
  },
  {
    id: 'clip-9-dery-konten-viral',
    creator: 'Dery Kasisolusi',
    title: 'Ini Organik Atau Settingan Demi Viral?',
    headline: 'BONGKAR STRATEGI VIRAL BRAND',
    category: 'VIRAL MARKETING',
    imageUrl: 'https://i.ytimg.com/vi/jzeGGxMUVW8/hqdefault.jpg',
    fallbackImage: '/thumbnails/dery_konten_viral.jpg',
    videoUrl: 'https://www.tiktok.com/@deryanshaa/video/7623421038897974549',
    thumbnailSourceUrl: 'https://urlebird.com/video/ini-organik-atau-settingan-banyak-brand-pengen-viral-tapi-dikit-7623421038897974549/',
    alt: 'Deryansha Kasisolusi clip analyzing whether viral brand content is organic or engineered.',
  },
  {
    id: 'clip-10-dery-personal-branding',
    creator: 'Dery Kasisolusi',
    title: 'Cara Bangun Personal Branding Di 2026',
    headline: 'SPILL PERSONAL BRANDING 2026',
    category: 'PERSONAL BRANDING',
    imageUrl: 'https://i.ytimg.com/vi/eGBUArZwkN8/hqdefault.jpg',
    fallbackImage: '/thumbnails/dery_personal_branding.jpg',
    videoUrl: 'https://www.tiktok.com/@deryanshaa/video/7588837349912579348',
    thumbnailSourceUrl: 'https://urlebird.com/video/cara-bangun-personal-branding-di-2026-akan-gue-spill-hari-senin-7588837349912579348/',
    alt: 'Deryansha Kasisolusi clip giving a guide to personal branding in 2026.',
  },
];

// =====================================================================
// INDIVIDUAL BANNER CARD COMPONENT (CLICKABLE TIKTOK PODCAST THUMBNAIL)
// =====================================================================
const ThumbnailCard: React.FC<{
  clip: TikTokClipBanner;
  isHovered: boolean;
}> = ({ clip, isHovered }) => {
  const [imgSrc, setImgSrc] = useState(clip.imageUrl);

  return (
    <a
      href={clip.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${clip.creator} - ${clip.title} (Buka di TikTok)`}
      title={`${clip.creator}: ${clip.title} — Klik untuk tonton di TikTok`}
      className="relative w-full h-full block rounded-[14px] overflow-hidden select-none cursor-pointer group bg-[#0d1117]"
      onClick={(e) => {
        // Allow default link navigation to new tab
        e.stopPropagation();
      }}
    >
      {/* Authentic Podcast Clip Thumbnail */}
      <img
        src={imgSrc}
        onError={() => {
          if (imgSrc !== clip.fallbackImage) {
            setImgSrc(clip.fallbackImage);
          }
        }}
        alt={clip.alt}
        className={`w-full h-full object-cover select-none transition-transform duration-300 ease-out ${
          isHovered ? 'scale-105' : 'group-hover:scale-105'
        }`}
        loading="eager"
        draggable={false}
      />

      {/* Subtle bottom vignette to frame the portrait clip */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

      {/* Top minimal badge: Creator tag & TikTok icon */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
        <span className="px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[9px] font-bold tracking-wider text-white/95 border border-white/15 uppercase">
          {clip.creator}
        </span>
        <div className="w-5 h-5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/95 shadow-sm">
          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.86-4.47V8.71a8.21 8.21 0 0 0 4.91 1.63V6.9a4.86 4.86 0 0 1-1-.21z" />
          </svg>
        </div>
      </div>

      {/* Bottom minimal label: Title & category */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none z-10">
        <div className="text-[8px] font-mono tracking-wider text-amber-400 font-bold uppercase mb-0.5">
          {clip.category}
        </div>
        <div className="text-[11px] font-bold text-white line-clamp-1 leading-tight drop-shadow-md">
          {clip.title}
        </div>
      </div>

      {/* Clean hover border */}
      <div
        className={`absolute inset-0 rounded-[14px] pointer-events-none transition-opacity duration-200 border-2 ${
          isHovered
            ? 'opacity-100 border-purple-400/85 shadow-[0_0_12px_rgba(168,85,247,0.35)]'
            : 'opacity-0 border-transparent'
        }`}
      />
    </a>
  );
};

// =====================================================================
// COMPONENT: THE 3D CAROUSEL PERSPECTIVE RING
// =====================================================================
export const AnimatedCarouselBackground: React.FC = () => {
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<number>(-2);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);
  const isUserHoveringRef = useRef(false);
  isUserHoveringRef.current = isUserHovering;

  const handleCursorHoverBanner = useCallback((idx: number | null) => {
    if (!isUserHoveringRef.current) {
      setHoveredIndex(idx);
    }
  }, []);

  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const isReducedMotionRef = useRef(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Continuous animation loop using MotionSites §6 speed (1.8 deg/s)
  useEffect(() => {
    const tick = (t: number) => {
      const dt = Math.min((t - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = t;

      if (!isReducedMotionRef.current && dt > 0) {
        setPhase((prev) => prev - SPEED_DEG_PER_SEC * dt);
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    animFrameIdRef.current = requestAnimationFrame(tick);

    // On visibilitychange, reset last timestamp so backgrounded tab does not jump
    const handleVisibilityChange = () => {
      lastTimeRef.current = performance.now();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Randomized / shuffled content for carousel banners
  const shuffledClips = React.useMemo(() => {
    const shuffle = <T,>(arr: T[]): T[] => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    const pass1 = shuffle(TIKTOK_CLIPS);
    const pass2 = shuffle(TIKTOK_CLIPS);
    const list = [...pass1, ...pass2];
    if (list[pass1.length - 1]?.id === list[pass1.length]?.id && list.length > pass1.length + 1) {
      [list[pass1.length], list[pass1.length + 1]] = [list[pass1.length + 1], list[pass1.length]];
    }
    return list;
  }, []);

  // Calculate 3D transforms and culling for cards
  // Banners continuously move with the carousel — smoothly orbiting in 3D
  const cards = Array.from({ length: N }, (_, i) => {
    const d = shuffledClips[i % shuffledClips.length] || TIKTOK_CLIPS[i % TIKTOK_CLIPS.length];
    const isHovered = hoveredIndex === i;

    // Calculate signed angle (-180..180 deg) continuously from phase
    const a = ((((i * STEP + phase) % 360) + 540) % 360) - 180;
    const isVisible = Math.abs(a) <= CULL_ANGLE;

    if (!isVisible) {
      return {
        i,
        d,
        isVisible: false,
        isHovered: false,
        transform: '',
        filter: '',
      };
    }

    const r = (a * Math.PI) / 180;
    const c = Math.cos(r);

    // translate3d(R*sin(r) px, 0, R*(1-c) px) rotateY(-a deg)
    const tx = R * Math.sin(r);
    const tz = R * (1 - c);
    const transform = `translate3d(${tx.toFixed(2)}px, 0px, ${tz.toFixed(2)}px) rotateY(${(-a).toFixed(2)}deg)`;
    const filter = `brightness(${(0.86 + 0.45 * (1 / c - 1)).toFixed(3)})`;
    const absA = Math.abs(a);
    // Smooth cinematic opacity fade so cards never get cut off at the edges
    const opacity = absA > 54 ? Math.max(0, 1 - (absA - 54) / (CULL_ANGLE - 54)) : 1;

    return {
      i,
      d,
      isVisible: true,
      isHovered,
      transform,
      filter,
      opacity,
    };
  });

  return (
    <div
      ref={stageContainerRef}
      aria-hidden="false"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-10 flex items-center justify-center overflow-visible bg-transparent"
      style={{
        perspective: `${PERSPECTIVE}px`,
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* 3D Ring container centered in stage via parent flex */}
      <div
        className="relative w-0 h-0"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {cards.map((card) => {
          if (!card.isVisible) return null;

          return (
            <div
              key={card.i}
              data-card-index={card.i}
              onMouseEnter={() => {
                setIsUserHovering(true);
                setHoveredIndex(card.i);
              }}
              onMouseLeave={() => {
                setIsUserHovering(false);
                setHoveredIndex((curr) => (curr === card.i ? null : curr));
              }}
              onPointerEnter={(e) => {
                if (e.pointerType !== 'touch') {
                  setIsUserHovering(true);
                  setHoveredIndex(card.i);
                }
              }}
              onPointerLeave={(e) => {
                if (e.pointerType !== 'touch') {
                  setIsUserHovering(false);
                  setHoveredIndex((curr) => (curr === card.i ? null : curr));
                }
              }}
              className="absolute left-0 top-0 pointer-events-auto cursor-pointer"
              style={{
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
                margin: `${-CARD_HEIGHT / 2}px 0 0 ${-CARD_WIDTH / 2}px`,
                transform: card.transform,
                opacity: card.opacity,
                backfaceVisibility: 'hidden',
                willChange: 'transform, opacity',
                zIndex: card.isHovered ? 40 : 10,
              }}
            >
              {/* Inner Animated Card: scales up smoothly while following carousel orbit */}
              <div
                className="w-full h-full relative"
                style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: '#0d1117',
                  boxShadow: card.isHovered
                    ? '0 28px 65px rgba(0,0,0,.92), 0 0 0 1.5px rgba(168,85,247,.75)'
                    : '0 24px 46px rgba(0,0,0,.68), 0 4px 14px rgba(0,0,0,.55)',
                  filter: card.isHovered ? 'brightness(1.12)' : card.filter,
                  transform: card.isHovered ? 'scale(1.065)' : 'scale(1)',
                  transformOrigin: 'center center',
                  transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease, filter 200ms ease',
                }}
              >
                {/* Clickable TikTok Podcast Clip Banner */}
                <ThumbnailCard clip={card.d} isHovered={card.isHovered} />

                {/* Edge highlight ring */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[14px]"
                  style={{
                    boxShadow: card.isHovered
                      ? 'inset 0 0 0 1.5px rgba(255,255,255,.4), inset 0 16px 30px rgba(255,255,255,.12)'
                      : 'inset 0 0 0 1px rgba(255,255,255,.16), inset 0 16px 30px rgba(255,255,255,.06)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Autonomous BIKIN Cursor for Carousel Banners (Bikin Primary Blue Color) */}
      <BikinCursorAnimation
        mode="carousel"
        colorScheme="primary"
        carouselContainerRef={stageContainerRef}
        onHoverBanner={handleCursorHoverBanner}
        isUserInteracting={isUserHovering}
      />
    </div>
  );
};
