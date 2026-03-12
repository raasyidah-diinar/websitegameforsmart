"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 'clamp(0.7rem, 1.5vw, 1.1rem)', height: 'clamp(0.7rem, 1.5vw, 1.1rem)' }} className="group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: 'clamp(0.7rem, 1.5vw, 1.1rem)', height: 'clamp(0.7rem, 1.5vw, 1.1rem)' }} className="group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
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
                    className={`bg-[#0a0a0a]/80 backdrop-blur-sm flex flex-col h-full rounded-[30px] overflow-hidden transition-all duration-500 group
                        ${isActive ? 'border-2 border-[#FF6B35] shadow-[0_0_25px_rgba(255,107,53,0.3)]' : 'border border-white/5'}
                        hover:brightness-110
                      `}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden flex-shrink-0">
                      <Image
                        src={game.image}
                        alt={game.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
                      {/* Badge Top-Right */}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-bold shadow-lg"
                        style={{ color: game.badgeColor, backgroundColor: `rgba(10, 10, 10, 0.7)`, border: `1px solid ${game.badgeColor}40`, backdropFilter: 'blur(4px)' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                        {game.badge}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-4 md:p-6 flex flex-col flex-1">
                      <div className="mb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide truncate">{game.title}</h3>
                        <p className="text-xs md:text-sm text-white/40 mt-1 font-medium">{game.type}</p>
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center justify-between text-white/70 mb-5 text-[10px] md:text-xs font-semibold px-2">
                        <div className="flex flex-col items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-white/40">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>Web</span>
                        </div>
                        <div className="w-px h-6 bg-white/10"></div>
                        <div className="flex flex-col items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-white/40">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span>{game.played} Played</span>
                        </div>
                        <div className="w-px h-6 bg-white/10"></div>
                        <div className="flex flex-col items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FFB800">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <span>{game.rating}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-3 mt-auto">
                        <button 
                          onClick={(e) => { e.stopPropagation(); isActive ? router.push(game.href) : setActiveIndex(index); }}
                          className="flex-1 flex items-center justify-center gap-2 py-2 md:py-2.5 rounded-[12px] bg-transparent text-white/70 hover:text-white transition-colors text-xs md:text-sm font-bold"
                          style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Detail</span>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); isActive && game.gameUrl ? window.open(game.gameUrl, '_blank') : setActiveIndex(index); }}
                          className="flex-1 flex items-center justify-center gap-2 py-2 md:py-2.5 rounded-[12px] text-white transition-all text-xs md:text-sm font-bold opacity-90 hover:opacity-100 shadow-[0_0_15px_rgba(255,107,53,0.4)] hover:shadow-[0_0_25px_rgba(255,107,53,0.6)]"
                          style={{ background: 'linear-gradient(135deg, #FF6B35, #ff8c00)' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span>Play Now</span>
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
