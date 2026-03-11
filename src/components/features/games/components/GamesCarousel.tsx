"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaGamepad, FaStar, FaUser, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';

const games = [
  {
    id: 1,
    title: "Crazy Race",
    type: "Racing Game",
    image: "/images/crazyrace.webp",
    rating: "4.9",
    played: "128",
    badge: "RACING",
    badgeColor: "#22c55e",
    href: "/games/1",
    gameUrl: "https://crazy-race-next.vercel.app",
  },
  {
    id: 2,
    title: "Quiz Rush",
    type: "Action Game",
    image: "/images/quizrush.webp",
    rating: "4.8",
    played: "256",
    badge: "ACTION",
    badgeColor: "#3b82f6",
    href: "/games/2",
    gameUrl: "https://quizrun.vercel.app",
  },
  {
    id: 3,
    title: "Space Quiz",
    type: "Trivia Game",
    image: "/images/spacequiz.webp",
    rating: "4.7",
    played: "64",
    badge: "TRIVIA",
    badgeColor: "#10b981",
    href: "/games/3",
    gameUrl: "https://spacequizv1.vercel.app",
  },
  {
    id: 4,
    title: "Memory Quiz",
    type: "Puzzle Game",
    image: "/images/memoryquiz.webp",
    rating: "5.0",
    played: "512",
    badge: "PUZZLE",
    badgeColor: "#9333ea",
    href: "/games/4",
    gameUrl: "https://memorygame-quiz.vercel.app",
  }
];

export default function GamesCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === games.length - 1 ? 0 : prev + 1));
  };

  // Responsive transform – centers the active card relative to its parent container
  const getTransform = () => {
    // Inactive card width: clamp(200px, 25vw, 300px)
    // Gap: 24px (gap-6)
    // Active card width: clamp(260px, 35vw, 400px)
    const inactiveWidth = isMobile ? 'clamp(200px, 60vw, 300px)' : 'clamp(200px, 25vw, 300px)';
    const gap = '24px';
    const activeWidth = isMobile ? 'clamp(260px, 80vw, 400px)' : 'clamp(260px, 35vw, 400px)';

    // Offset calculation: 
    // We position the track at left: 50% (of its parent) then shift it left by:
    // (all previous inactive cards' width + gaps) + (half of the active card's width)
    return `translateX(calc(-1 * (${activeIndex} * (${inactiveWidth} + ${gap}) + (${activeWidth} / 2))))`;
  };

  // --- Layout ---
  return (
    <section className="py-10 md:py-20 overflow-hidden w-full bg-transparent">
      <div className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 md:mb-12 px-lg-15 px-md-10 px-6">
          <h2 className="text-white fw-bold mb-0" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.25rem)' }}>Games</h2>
          <a
            href="/games"
            className="text-white px-6 md:px-8 py-2 md:py-2.5 rounded-full font-bold border border-white/20 transition-all duration-300 hover:bg-white/10 hover:border-white/40"
            style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}
          >
            View More
          </a>
        </div>

        {/* Carousel Viewport */}
        <div className="relative flex items-center w-full" style={{ height: 'clamp(400px, 60vh, 600px)' }}>
          {/* Nav buttons - Hidden on very small screens or styled smaller */}
          <button
            onClick={handlePrev}
            className="absolute z-30 flex items-center justify-center transition-all cursor-pointer group carousel-nav-btn"
            style={{
              left: 'clamp(10px, 2vw, 40px)',
              width: 'clamp(32px, 4vw, 48px)',
              height: 'clamp(32px, 4vw, 48px)',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              color: 'white',
              backdropFilter: 'blur(4px)'
            }}
          >
            <FaChevronLeft className="group-hover:scale-110 transition-transform" style={{ fontSize: 'clamp(0.7rem, 1.5vw, 1.1rem)' }} />
          </button>
          <button
            onClick={handleNext}
            className="absolute z-30 flex items-center justify-center transition-all cursor-pointer group carousel-nav-btn"
            style={{
              right: 'clamp(10px, 2vw, 40px)',
              width: 'clamp(32px, 4vw, 48px)',
              height: 'clamp(32px, 4vw, 48px)',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              color: 'white',
              backdropFilter: 'blur(4px)'
            }}
          >
            <FaChevronRight className="group-hover:scale-110 transition-transform" style={{ fontSize: 'clamp(0.7rem, 1.5vw, 1.1rem)' }} />
          </button>

          <style jsx>{`
            .carousel-nav-btn:hover {
              background-color: #FF6B35 !important;
              border-color: #FF6B35 !important;
            }
          `}</style>

          {/* Cards Track */}
          <div
            className="absolute left-1/2 top-1/2 -translate-y-1/2 flex items-center gap-6 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ transform: getTransform(), width: 'max-content' }}
          >
            {games.map((game, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={game.id}
                  className={`relative transition-all duration-500 ease-out cursor-pointer shrink-0
                    ${isActive ? 'z-10 scale-105 md:scale-110 opacity-100' : 'z-0 scale-90 opacity-20'}
                  `}
                  style={{
                    width: isActive
                      ? (isMobile ? 'clamp(260px, 80vw, 400px)' : 'clamp(260px, 35vw, 400px)')
                      : (isMobile ? 'clamp(200px, 60vw, 300px)' : 'clamp(200px, 25vw, 300px)')
                  }}
                  onClick={() => isActive ? router.push(game.href) : setActiveIndex(index)}
                >
                  <div
                    className={`bg-[#0a0a0a]/80 backdrop-blur-sm rounded-[30px] overflow-hidden transition-all duration-500 group
                        ${isActive ? 'border-2 border-[#FF6B35] shadow-[0_0_25px_rgba(255,107,53,0.3)]' : 'border border-white/5'}
                        hover:brightness-110
                      `}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={game.image}
                        alt={game.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
                    </div>
                    {/* Content */}
                    <div className="p-5 md:p-8">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg md:text-xl font-bold text-white tracking-wide truncate">{game.title}</h3>
                        <div
                          className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[8px] md:text-[9px] font-bold ${isActive ? 'border border-white/10' : 'border-0'}`}
                          style={{ color: game.badgeColor, backgroundColor: `${game.badgeColor}15` }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {game.badge}
                        </div>
                      </div>
                      <p className="text-[10px] md:text-xs text-white/40 mb-4 md:mb-6 font-medium">{game.type}</p>
                      <div className="flex justify-between items-center mb-4 md:mb-6">
                        <div className="flex items-center gap-2 text-white/90">
                          <FaGamepad className={`text-base md:text-lg ${isActive ? 'text-[#FF6B35]' : 'text-white/20'}`} />
                          <span className={`text-sm md:text-base font-bold ${isActive ? 'text-white' : 'text-white/20'}`}>Web</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white">
                          <FaStar className={`text-sm md:text-base ${isActive ? 'text-[#FFB800]' : 'text-white/20'}`} />
                          <span className={`text-sm md:text-base font-bold ${isActive ? 'text-white' : 'text-white/20'}`}>{game.rating}</span>
                        </div>
                      </div>
                      <div className={`h-[1px] -mx-5 md:-mx-8 mb-4 md:mb-6 ${isActive ? 'bg-white/5' : 'bg-transparent'}`}></div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                          <FaUser className={`${isActive ? 'text-white/60' : 'text-white/20'} text-xs`} />
                          <span className={`text-[10px] md:text-xs font-bold ${isActive ? 'text-white/90' : 'text-white/20'}`}>Played {game.played}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isActive) router.push(game.href);
                          }}
                          className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white transition-all overflow-hidden
                            ${isActive ? 'bg-[#FF6B35] hover:scale-110 hover:shadow-[0_0_25px_rgba(255,107,53,0.5)]' : 'bg-transparent text-white/10 cursor-default'}
                          `}
                          style={{ borderRadius: '50%' }}
                        >
                          <FaArrowRight className="text-sm md:text-base" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
