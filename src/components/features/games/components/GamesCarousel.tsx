"use client";

import React, { useState } from 'react';
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
  }
];

export default function GamesCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === games.length - 1 ? 0 : prev + 1));
  };

  const getTransform = () => {
    const cardWidth = 300; // Smoother logic with base width
    const gap = 24;
    const offset = activeIndex * (cardWidth + gap);
    // Center logic
    return `translateX(calc(50% - ${offset}px - ${cardWidth / 2}px))`;
  };

  return (
    <section className="py-20 overflow-hidden w-full bg-transparent">
      <div className="w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12 px-lg-15 px-md-10 px-6">
          <h2 className="text-4xl font-bold text-white tracking-tight">Games</h2>
          <a
            href="/games"
            className="text-white px-8 py-2.5 rounded-full font-bold border border-white/20 transition-all duration-300 hover:bg-white/10 hover:border-white/40"
          >
            View More
          </a>
        </div>

        {/* Carousel Viewport - Full Width Area */}
        <div className="relative h-[600px] flex items-center w-full">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-10 z-30 w-12 h-12 flex items-center justify-center border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-[#FF6B35] hover:border-[#FF6B35] group"
            style={{ borderRadius: '50%' }}
          >
            <FaChevronLeft className="text-xl group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-10 z-30 w-12 h-12 flex items-center justify-center border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-[#FF6B35] hover:border-[#FF6B35] group"
            style={{ borderRadius: '50%' }}
          >
            <FaChevronRight className="text-xl group-hover:scale-110 transition-transform" />
          </button>

          {/* Cards Track */}
          <div
            className="flex items-center gap-6 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ transform: getTransform(), width: 'max-content' }}
          >
            {games.map((game, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={game.id}
                  className={`relative transition-all duration-500 ease-out cursor-pointer shrink-0
                    ${isActive ? 'z-10 scale-110 opacity-100 w-[380px]' : 'z-0 scale-90 opacity-20 w-[300px]'}
                  `}
                  onClick={() => isActive ? router.push(game.href) : setActiveIndex(index)}
                >
                    <div
                      className={`bg-transparent rounded-[30px] overflow-hidden transition-all duration-500 group
                        ${isActive ? 'border-2 border-[#FF6B35] shadow-[0_0_25px_rgba(255,107,53,0.3)]' : 'border-0'}
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
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      {/* Title & Badge Row */}
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-bold text-white tracking-wide">{game.title}</h3>
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-bold ${isActive ? 'border border-white/10' : 'border-0'}`}
                          style={{ color: game.badgeColor, backgroundColor: `${game.badgeColor}15` }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {game.badge}
                        </div>
                      </div>

                      {/* Subtitle */}
                      <p className="text-xs text-white/40 mb-6 font-medium">{game.type}</p>

                      {/* Icons Row */}
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2.5 text-white/90">
                          <FaGamepad className={`text-lg ${isActive ? 'text-[#FF6B35]' : 'text-white/20'}`} />
                          <span className={`text-base font-bold ${isActive ? 'text-white' : 'text-white/20'}`}>Web</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <FaStar className={`text-base ${isActive ? 'text-[#FFB800]' : 'text-white/20'}`} />
                          <span className={`text-base font-bold ${isActive ? 'text-white' : 'text-white/20'}`}>{game.rating}</span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className={`h-[1px] -mx-8 mb-6 ${isActive ? 'bg-white/5' : 'bg-transparent'}`}></div>

                      {/* Bottom Row */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <FaUser className={`${isActive ? 'text-white/60' : 'text-white/20'} text-sm`} />
                          <span className={`text-xs font-bold ${isActive ? 'text-white/90' : 'text-white/20'}`}>Played {game.played}</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); if (isActive) router.push(game.href); }}
                          className={`w-10 h-10 flex items-center justify-center text-white transition-all overflow-hidden
                            ${isActive ? 'bg-[#FF6B35] hover:scale-110 hover:shadow-[0_0_25px_rgba(255,107,53,0.5)]' : 'bg-transparent text-white/10 cursor-default'}
                          `}
                          style={{ borderRadius: '50%' }}
                        >
                          <FaArrowRight className="text-base" />
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
