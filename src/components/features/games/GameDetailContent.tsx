"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TournamentInfo, allItemsData } from '@/data/allItemsData';

interface GameDetailContentProps {
    game: TournamentInfo;
}

export default function GameDetailContent({ game }: GameDetailContentProps) {
    const [activeTab, setActiveTab] = useState('detail');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalRating, setModalRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedbackType, setFeedbackType] = useState('Idea');

    const dummyReviews = [
        { name: 'Olivia Sanchez', rating: 4, date: '2 days ago', text: '"Impressed by the range and quality of furniture available at this store. The pieces I bought are not only stylish but also durable. Great value for money!"' },
        { name: 'Kevin Robinson', rating: 5, date: '1 week ago', text: '"Absolutely love the furniture I purchased here! The quality is superb, and it looks even better in my home than I imagined. Will definitely be back for more!"' },
        { name: 'Samantha Jones', rating: 5, date: '20 days ago', text: '"Highly recommend this furniture store! The customer service was excellent, and the delivery process was smooth."' }
    ];
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 5);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
    };

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            // Initial check
            checkScroll();
            // Check again after image loading
            window.addEventListener('load', checkScroll);
            return () => {
                container.removeEventListener('scroll', checkScroll);
                window.removeEventListener('load', checkScroll);
            };
        }
    }, [activeTab]);

    return (
        <article className="main-content mt-4 animate-fade-in-up flex-1 min-w-0">
            {/* Hero Section */}
            <div className="container-fluid px-lg-15 px-md-10 px-6">
                <div className="row g-3 hover-none">
                    <div className="col-12 d-flex align-items-stretch">
                        <section className="relative w-full h-[550px] overflow-hidden shadow-lg border border-secondary border-opacity-10 flex-fill" style={{ borderRadius: '40px' }}>
                            <div className="absolute top-6 left-10 z-20">
                                <Link
                                    href="/games"
                                    className="inline-flex items-center gap-2 text-white/60 hover:text-[#FF6B35] transition-colors group px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/5"
                                >
                                    <i className="ti ti-arrow-left text-xl group-hover:-translate-x-1 transition-transform"></i>
                                    <span className="font-bold uppercase tracking-widest text-[9px]">Kembali</span>
                                </Link>
                            </div>

                            <div className="absolute inset-0 z-0 overflow-hidden">
                                {game.videoUrl ? (
                                    <iframe
                                        src={(() => {
                                            const videoId = game.videoUrl!.split('/embed/')[1]?.split('?')[0] ?? '';
                                            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${videoId}&start=3`;
                                        })()}
                                        allow="autoplay; encrypted-media"
                                        className="absolute"
                                        style={{
                                            top: '50%', left: '50%',
                                            width: '177.78vh', height: '100%',
                                            minWidth: '100%', minHeight: '56.25vw',
                                            transform: 'translate(-50%, -50%)',
                                            border: 'none', pointerEvents: 'none', opacity: 0.55,
                                        }}
                                        title={game.title}
                                        frameBorder="0"
                                    />
                                ) : (
                                    <Image src={game.image} alt={game.title} fill className="object-cover opacity-60 brightness-50 scale-100" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 via-[#000000]/20 to-transparent"></div>
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-center ps-lg-15 px-md-10 px-6 pt-14">
                                <h1 className="hero-title tcn-1 mb-lg-5 mb-4" style={{ fontSize: '3.5rem', lineHeight: '100%', fontWeight: '900', letterSpacing: '-1.5px' }}>
                                    {game.title}
                                </h1>
                                <p className="tcn-1 mb-lg-6 mb-5 opacity-75 fs-six fw-normal" style={{ maxWidth: '600px' }}>
                                    {game.description}
                                </p>
                                <div className="flex items-center gap-4 mt-16">
                                    <button className="flex-shrink-0 bg-gradient-to-r from-[#FF4D00] to-[#FF8C00] text-white px-8 !h-[48px] !rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-[0_10px_25px_rgba(255,77,0,0.25)] hover:shadow-[0_15px_35px_rgba(255,77,0,0.45)] hover:-translate-y-1 flex items-center gap-2">
                                        <i className="ti ti-player-play-filled text-lg"></i>
                                        MAIN SEKARANG
                                    </button>
                                    <div className="flex-shrink-0 flex items-center bg-white/[0.03] backdrop-blur-md border border-white/10 !rounded-full h-[48px] px-8 gap-8">
                                        <div className="flex items-center gap-2 border-r border-white/10 pr-8 h-1/2">
                                            <i className="ti ti-device-gamepad-2 text-[#FF6B35] text-lg"></i>
                                            <span className="text-white/90 font-bold text-[9px] uppercase tracking-wide whitespace-nowrap">{game.platform.replace('Mobile & ', '')}</span>
                                        </div>
                                        <div className="flex items-center gap-2 border-r border-white/10 pr-8 h-1/2">
                                            <i className="ti ti-star-filled text-[#FFB800] text-md"></i>
                                            <span className="text-white/90 font-bold text-[9px] uppercase tracking-wide whitespace-nowrap">{game.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                                            <i className="ti ti-user-circle text-lg"></i>
                                            <span className="text-white/90 font-bold text-[9px] uppercase tracking-wide whitespace-nowrap">{game.players}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="pl-lg-15 pl-md-10 pl-6 pr-0 mt-12 border-b border-white/5">
                <div className="flex justify-center gap-10">
                    {[
                        { id: 'detail', label: 'Detail' },
                        { id: 'ulasan', label: 'Ulasan' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 text-xs font-bold tracking-widest transition-all relative ${
                                activeTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white/60'
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6B35]"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="pl-lg-15 pl-md-10 pl-6 pr-6 pr-lg-20 py-12">
                {activeTab === 'detail' && (
                    <div className="max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in relative">
                        {/* Left Column: Game Details */}
                        <div className="lg:col-span-9 space-y-16 pl-lg-10">
                        {/* Screenshot Gallery - Scrollable Carousel */}
                            {game.screenshots && game.screenshots.length > 0 && (
                                <section className="space-y-10 group/gallery relative">
                                    <h2 className="text-lg font-bold text-white tracking-wide border-l-4 border-[#FF6B35] pl-4">
                                        Tampilan Permainan
                                    </h2>
                                    
                                    <div className="relative mt-8 gallery-wrapper overflow-visible">
                                        {/* Navigation Buttons */}
                                        <button 
                                            onClick={() => {
                                                if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                                            }}
                                            className={`absolute left-2 top-1/2 -translate-y-1/2 z-50 w-14 h-14 flex items-center justify-center text-black transition-all hover:bg-[#FF6B35] hover:text-white border-0 cursor-pointer bg-white shadow-2xl rounded-full ${canScrollLeft ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
                                            style={{ borderRadius: '50%' }}
                                        >
                                            <i className="ti ti-chevron-left text-3xl"></i>
                                        </button>

                                        <button 
                                            onClick={() => {
                                                if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                                            }}
                                            className={`absolute right-2 top-1/2 -translate-y-1/2 z-50 w-14 h-14 flex items-center justify-center text-black transition-all hover:bg-[#FF6B35] hover:text-white border-0 cursor-pointer bg-white shadow-2xl rounded-full ${canScrollRight ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
                                            style={{ borderRadius: '50%' }}
                                        >
                                            <i className="ti ti-chevron-right text-3xl"></i>
                                        </button>

                                        <div 
                                            ref={scrollRef}
                                            id="screenshot-container"
                                            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
                                            style={{ scrollBehavior: 'smooth' }}
                                        >
                                            {game.screenshots.map((ss: string, idx: number) => (
                                                <div 
                                                    key={idx} 
                                                    className="flex-shrink-0 w-[220px] relative rounded-[32px] overflow-hidden group cursor-pointer shadow-lg snap-start transition-all duration-300" 
                                                    style={{ aspectRatio: '9/16' }}
                                                >
                                                    <Image src={ss} alt={`Screenshot ${idx + 1}`} fill className="object-cover" />
                                                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* About Game */}
                            <section className="space-y-6">
                                <h2 className="text-lg font-bold text-white tracking-wide border-l-4 border-[#FF6B35] pl-4">
                                    Tentang Game Ini
                                </h2>
                                <p className="text-white/70 text-base leading-relaxed max-w-3xl pl-5 mt-4">
                                    {game.description}
                                </p>

                                {/* Features grid */}
                                {game.features && game.features.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 pl-5">
                                        {game.features.map((feature: any, idx: number) => (
                                            <div key={idx} className="flex items-start gap-4 p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-[#FF6B35]/30 transition-colors">
                                                <div className="w-10 h-10 flex-shrink-0 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center text-[#FF6B35]">
                                                    <i className={`${feature.icon || 'ti ti-circle-check'} text-xl`}></i>
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm mb-1">{feature.title}</h4>
                                                    <p className="text-white/40 text-[11px] leading-tight">{feature.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* ===== RULES TIMELINE ===== */}
                            <section className="space-y-8">
                                {/* Header */}
                                <div className="flex items-center gap-4">
                                    <h2 className="text-lg font-bold text-white tracking-wide border-l-4 border-[#FF6B35] pl-4">
                                        Aturan & Cara Bermain
                                    </h2>
                                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
                                    <span className="text-[10px] font-bold tracking-widest text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20 px-3 py-1 rounded-full uppercase">
                                        {game.rules.length} Aturan
                                    </span>
                                </div>

                                {/* Timeline */}
                                <div className="relative pl-5 mt-4">
                                    {/* Vertical line */}
                                    <div
                                        className="absolute left-[19px] top-0 w-px bg-gradient-to-b from-[#FF6B35] via-[#FF6B35]/30 to-transparent"
                                        style={{ height: `calc(100% - 32px)` }}
                                    ></div>

                                    <div className="space-y-3">
                                        {game.rules.map((rule: string, idx: number) => (
                                            <div
                                                key={idx}
                                                className="relative flex items-start gap-5 group"
                                                style={{ animationDelay: `${idx * 80}ms` }}
                                            >
                                                {/* Step Bubble */}
                                                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-[11px] transition-all duration-300"
                                                    style={{
                                                        background: idx === 0
                                                            ? 'linear-gradient(135deg, #FF4D00, #FF8C00)'
                                                            : 'rgba(255,255,255,0.04)',
                                                        border: idx === 0
                                                            ? 'none'
                                                            : '1px solid rgba(255,255,255,0.08)',
                                                        boxShadow: idx === 0
                                                            ? '0 0 20px rgba(255,77,0,0.4)'
                                                            : 'none',
                                                        color: idx === 0 ? '#fff' : 'rgba(255,107,53,0.7)',
                                                    }}
                                                >
                                                    {String(idx + 1).padStart(2, '0')}
                                                </div>

                                                {/* Content Card */}
                                                <div
                                                    className="flex-1 p-4 rounded-2xl border transition-all duration-300 group-hover:border-[#FF6B35]/30 group-hover:bg-white/[0.04]"
                                                    style={{
                                                        background: idx === 0
                                                            ? 'rgba(255,77,0,0.06)'
                                                            : 'rgba(255,255,255,0.02)',
                                                        border: idx === 0
                                                            ? '1px solid rgba(255,107,53,0.25)'
                                                            : '1px solid rgba(255,255,255,0.05)',
                                                    }}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        {/* Icon per step */}
                                                        <div className="flex-shrink-0 mt-0.5">
                                                            <i className={`${getStepIcon(idx)} text-base`}
                                                                style={{ color: idx === 0 ? '#FF6B35' : 'rgba(255,107,53,0.5)' }}
                                                            ></i>
                                                        </div>
                                                        <p className="text-sm leading-relaxed"
                                                            style={{ color: idx === 0 ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.60)' }}
                                                        >
                                                            {rule}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bottom cap */}
                                    <div className="flex items-center gap-5 mt-6 pl-5">
                                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center">
                                            <i className="ti ti-flag-3-filled text-[#FF6B35] text-sm"></i>
                                        </div>
                                        <p className="text-[11px] font-bold tracking-widest text-white/30 uppercase">
                                            Selamat bermain & jaga sportivitas!
                                        </p>
                                    </div>
                                </div>
                            </section>
                            {/* ===== END RULES TIMELINE ===== */}
                        </div>

                        {/* Right Column: Related Games Sidebar */}
                        <aside className="lg:col-span-3 space-y-10 animate-fade-in-right flex flex-col items-end">
                            <div className="w-full max-w-[320px]">
                                <div className="flex items-center justify-between mb-10">
                                    <h2 className="text-lg font-bold text-white tracking-wide">
                                        Game serupa
                                    </h2>
                                    <Link href="/games" className="text-white/40 hover:text-[#FF6B35] transition-colors">
                                        <i className="ti ti-arrow-right text-xl"></i>
                                    </Link>
                                </div>

                                <div className="flex flex-col gap-8">
                                    {allItemsData
                                        .filter(item => item.type === 'game' && item.id !== game.id)
                                        .slice(0, 6)
                                        .map((rg) => (
                                            <Link key={rg.id} href={rg.href} className="flex items-center gap-5 group/item cursor-pointer">
                                                <div className="relative w-16 h-16 flex-shrink-0 rounded-[22px] overflow-hidden shadow-2xl group-hover/item:scale-110 transition-all duration-500 shadow-white/5 group-hover/item:shadow-[#FF6B35]/20">
                                                    <Image src={rg.image} alt={rg.title} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-bold text-[13px] truncate group-hover/item:text-[#FF6B35] transition-colors leading-tight mb-1">{rg.title}</h4>
                                                    <p className="text-white/40 text-[10px] uppercase font-black tracking-widest truncate">{rg.subtitle || rg.genre}</p>
                                                    <div className="flex items-center gap-1.5 mt-1.5">
                                                        <span className="text-white/60 text-[11px] font-black">{rg.rating}</span>
                                                        <i className="ti ti-star-filled text-yellow-500 text-[10px] filter drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]"></i>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                )}

                {activeTab === 'ulasan' && (
                    <div className="animate-fade-in py-12 flex items-center justify-center min-h-[70vh] w-full">
                        <div className="max-w-6xl w-full mx-auto px-6">
                                {/* Top Grid: Summary + Form */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                    {/* Average Rating Section */}
                                    <div className="lg:col-span-4 bg-white/[0.02] border border-white/[0.03] hover:border-[#FF6B35]/30 hover:bg-[#FF6B35]/5 rounded-[32px] p-8 space-y-6 transition-all duration-500 group/card shadow-2xl">
                                        <div className="space-y-3">
                                            <h2 className="text-[5px] font-black text-white/30 uppercase tracking-[0.2em]">
                                                Average Rating
                                            </h2>
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl font-black text-white group-hover/card:text-[#FF6B35] transition-colors duration-500">4.5</span>
                                                <div className="flex text-yellow-500 text-xs filter drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]">
                                                    {[...Array(5)].map((_, i) => (
                                                        <i key={i} className={`ti ${i < 4 ? 'ti-star-filled' : 'ti-star-half-filled'}`}></i>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Rating Bars */}
                                        <div className="space-y-3">
                                            {[
                                                { star: 5, percent: 90 },
                                                { star: 4, percent: 60 },
                                                { star: 3, percent: 40 },
                                                { star: 2, percent: 30 },
                                                { star: 1, percent: 5 }
                                            ].map((item) => (
                                                <div key={item.star} className="flex items-center gap-4 text-[10px] font-bold text-white/40">
                                                    <span className="w-2">{item.star}</span>
                                                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-[#FF6B35] rounded-full transition-all duration-1000 group-hover/card:shadow-[0_0_10px_rgba(255,107,53,0.5)]" style={{ width: `${item.percent}%` }}></div>
                                                    </div>
                                                    <span className="w-8 text-white/20 text-right">{item.percent}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Submit Review Section */}
                                    <div className="lg:col-span-8 bg-white/[0.02] border border-white/[0.03] hover:border-[#FF6B35]/30 hover:bg-[#FF6B35]/5 rounded-[32px] p-8 space-y-6 transition-all duration-500 group/form shadow-2xl">
                                        <div className="space-y-3">
                                            <h2 className="text-[5px] font-black text-white/30 uppercase tracking-[0.2em]">
                                                Submit Your Review
                                            </h2>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Rating Stars at Top */}
                                            <div className="space-y-2">
                                                <p className="text-[#FF6B35] text-[10px] font-bold uppercase tracking-wider">Add Your Rating *</p>
                                                <div className="flex gap-1.5 h-6 items-center">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <button 
                                                            key={s}
                                                            onMouseEnter={() => setHoverRating(s)}
                                                            onMouseLeave={() => setHoverRating(0)}
                                                            onClick={() => setModalRating(s)}
                                                            className="transition-all hover:scale-110"
                                                        >
                                                            <i className={`ti ${s <= (hoverRating || modalRating) ? 'ti-star-filled' : 'ti-star'} text-lg ${s <= (hoverRating || modalRating) ? 'text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'text-white/10'}`}></i>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Name *</p>
                                                    <input type="text" placeholder="Name" className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-[11px] text-white placeholder-white/10 outline-none focus:border-[#FF6B35]/50 transition-all focus:bg-black/40" />
                                                </div>

                                                <div className="space-y-2">
                                                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Email *</p>
                                                    <input type="email" placeholder="mail@example.com" className="w-full bg-black/20 border border-white/5 rounded-xl p-3 text-[11px] text-white placeholder-white/10 outline-none focus:border-[#FF6B35]/50 transition-all focus:bg-black/40" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Write Your Review *</p>
                                            <textarea placeholder="Write here..." className="w-full h-24 bg-black/20 border border-white/5 rounded-xl p-3 text-[11px] text-white placeholder-white/10 outline-none focus:border-[#FF6B35]/50 transition-all focus:bg-black/40 resize-none" />
                                        </div>

                                    </div>
                                </div>

                                {/* Customer Feedbacks Section */}
                                <div className="mt-20 space-y-10">
                                    <h2 className="text-xl font-bold text-white tracking-wide">
                                        Customer Feedbacks
                                    </h2>

                                    <div className="grid grid-cols-1 gap-8">
                                        {dummyReviews.map((review, idx) => (
                                            <div key={idx} className="bg-white/[0.02] border border-white/[0.03] px-8 py-5 rounded-[32px] space-y-5 hover:border-[#FF6B35]/30 hover:bg-[#FF6B35]/5 transition-all duration-500 group/feedback shadow-xl flex flex-col">
                                                <div className="space-y-4">
                                                    {/* Header: Name and Time */}
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-white font-black text-sm tracking-tight">{review.name}</p>
                                                        <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{review.date}</span>
                                                    </div>

                                                    {/* Stars below name */}
                                                    <div className="flex text-yellow-500 text-xs">
                                                        {[...Array(5)].map((_, i) => (
                                                            <i key={i} className={`ti ${i < review.rating ? 'ti-star-filled' : 'ti-star'} ${i < review.rating ? 'drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]' : 'text-white/10'}`}></i>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Review Text */}
                                                <p className="text-white/50 text-[13px] leading-relaxed italic flex-1 border-t border-white/5 pt-5">
                                                    {review.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </article>
    );
}

// Helper: icon per step index (cycles jika rules > 8)
function getStepIcon(idx: number): string {
    const icons = [
        'ti ti-shield-check',
        'ti ti-sword',
        'ti ti-wifi',
        'ti ti-clock',
        'ti ti-trophy',
        'ti ti-users',
        'ti ti-device-gamepad-2',
        'ti ti-alert-triangle',
    ];
    return icons[idx % icons.length];
}