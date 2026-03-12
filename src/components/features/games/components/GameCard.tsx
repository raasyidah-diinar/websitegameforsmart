'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface GameCardProps {
  title: string;
  image: string;
  href: string;
  type?: string;
  badge?: string;
  badgeColor?: string;
  rating?: string;
  played?: string;
  gameUrl?: string;
  isActive?: boolean;
}

export default function GameCard({ 
  title, 
  image, 
  href,
  type = "Game",
  badge = "NEW",
  badgeColor = "#22c55e",
  rating = "4.5",
  played = "10k",
  gameUrl,
  isActive = false
}: GameCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] w-full max-w-[420px] mx-auto group"
      style={{
        transform: (hovered || isActive) ? 'translateY(-10px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer Card — NO overflow-hidden to allow button roundness at corners */}
      <div
        className="bg-[#111111] transition-all duration-500 h-full"
        style={{
          borderRadius: '20px',
          border: (hovered || isActive) 
            ? '1.5px solid rgba(255, 107, 53, 0.6)' 
            : '1.5px solid rgba(255, 255, 255, 0.05)',
          boxShadow: (hovered || isActive) 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 107, 53, 0.25)' 
            : '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Thumbnail Wrapper — overflow-hidden here only */}
        <div 
          className="relative overflow-hidden" 
          style={{ borderRadius: '26px 26px 0 0', height: 'clamp(220px, 30vw, 300px)' }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80"></div>

          {/* Badge Top-Right */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold shadow-lg bg-black/50 backdrop-blur-md"
            style={{ 
              border: `1px solid ${badgeColor}30`,
              color: badgeColor
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: badgeColor }}></span>
            <span>{badge}</span>
          </div>

          {/* Stats overlay at the bottom of the image */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span className="text-white/70 text-[11px]">{played}</span>
            </div>
            <span className="text-white/30 text-[10px]">|</span>
            <div className="flex items-center gap-1">
              <span className="text-[#FFB800] text-[13px]">⭐</span>
              <span className="text-white/80 text-[11px] font-semibold">{rating}</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 flex flex-col">
          <div className="mb-2">
            <h3 className="text-[20px] md:text-[22px] font-bold text-white mb-1 leading-tight">
              {title}
            </h3>
            <p className="text-[11px] text-white/40 tracking-widest mb-3">
              {type}
            </p>
            {/* Short description */}
            <p className="text-[10px] text-white/30 leading-relaxed line-clamp-2">
              Tantang kemampuanmu dalam game seru ini. Raih skor tertinggi dan buktikan keahlianmu!
            </p>
          </div>

          {/* Buttons Group — Detail smaller, Play Now larger */}
          <div className="flex items-center gap-3 mt-5">
            <Link 
              href={href} 
              className="flex-[0.7] flex items-center justify-center py-2.5 rounded-[100px] border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all text-[11px] font-semibold"
            >
              Detail
            </Link>
            
            <Link 
              href={gameUrl || href}
              target={gameUrl ? "_blank" : "_self"}
              className="flex-1 flex items-center justify-center py-2.5 rounded-[100px] text-white transition-all text-[12px] font-semibold shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #FF6B35 0%, #E8561F 100%)',
              }}
            >
              Play Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
