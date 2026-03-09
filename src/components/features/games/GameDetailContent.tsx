"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TournamentInfo, allItemsData } from '@/data/allItemsData';

interface GameDetailContentProps {
    game: TournamentInfo;
}

const dummyReviews = [
    {
        name: 'Olivia Sanchez',
        avatar: 'OS',
        color: '#FF6B35',
        rating: 4,
        date: '2 hari lalu',
        platform: 'Android',
        playtime: '120 jam',
        verified: true,
        text: 'Gamenya seru banget! Grafis bagus dan gameplay-nya bikin nagih. Tapi ada beberapa bug kecil di mode multiplayer yang kadang bikin frustasi. Semoga segera diperbaiki di update berikutnya.',
        likes: 24,
    },
    {
        name: 'Kevin Robinson',
        avatar: 'KR',
        color: '#4A90D9',
        rating: 5,
        date: '1 minggu lalu',
        platform: 'iOS',
        playtime: '340 jam',
        verified: true,
        text: 'Salah satu game terbaik yang pernah saya main! Sistem ranking-nya adil, komunitas playernya asik, dan developer aktif banget dengerin feedback. Udah mabar sama temen-temen hampir setiap hari.',
        likes: 87,
    },
    {
        name: 'Samantha Jones',
        avatar: 'SJ',
        color: '#9B59B6',
        rating: 5,
        date: '20 hari lalu',
        platform: 'PC',
        playtime: '55 jam',
        verified: false,
        text: 'Kontrol-nya responsif dan smooth. Buat pemula pun bisa langsung nyaman. Tutorial-nya jelas dan nggak bikin bosen. Recommended banget buat yang baru mau coba genre ini!',
        likes: 41,
    },
    {
        name: 'Budi Santoso',
        avatar: 'BS',
        color: '#2ECC71',
        rating: 4,
        date: '3 minggu lalu',
        platform: 'Android',
        playtime: '200 jam',
        verified: true,
        text: 'Grafis emang keren, tapi baterai hape boros banget. Overall masih worth it lah, gameplaynya engaging dan event-eventnya sering banget. Tim developer juga cepet response.',
        likes: 19,
    },
    {
        name: 'Rina Maharani',
        avatar: 'RM',
        color: '#E74C3C',
        rating: 3,
        date: '1 bulan lalu',
        platform: 'iOS',
        playtime: '30 jam',
        verified: false,
        text: 'Lumayan sih, tapi matchmaking-nya kadang nggak balance. Sering ketemu player yang jauh lebih tinggi level-nya. Semoga bisa diperbaiki ke depannya.',
        likes: 8,
    },
];

const ratingBars = [
    { star: 5, count: 1240, percent: 78 },
    { star: 4, count: 312,  percent: 20 },
    { star: 3, count: 58,   percent: 4  },
    { star: 2, count: 12,   percent: 1  },
    { star: 1, count: 8,    percent: 1  },
];

const totalReviews = ratingBars.reduce((a, b) => a + b.count, 0);

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

export default function GameDetailContent({ game }: GameDetailContentProps) {
    const [activeTab, setActiveTab] = useState('detail');
    const [modalRating, setModalRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [helpfulMap, setHelpfulMap] = useState<Record<number, boolean>>({});
    const [sortBy, setSortBy] = useState<'terbaru' | 'tertinggi' | 'terendah'>('terbaru');
    const [filterStar, setFilterStar] = useState<number | null>(null);
    const [reviewName, setReviewName] = useState('');
    const [reviewEmail, setReviewEmail] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [submitted, setSubmitted] = useState(false);

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
            checkScroll();
            window.addEventListener('load', checkScroll);
            return () => {
                container.removeEventListener('scroll', checkScroll);
                window.removeEventListener('load', checkScroll);
            };
        }
    }, [activeTab]);

    const toggleHelpful = (idx: number) => {
        setHelpfulMap(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const sortedReviews = [...dummyReviews]
        .filter(r => filterStar === null || r.rating === filterStar)
        .sort((a, b) => {
            if (sortBy === 'tertinggi') return b.rating - a.rating;
            if (sortBy === 'terendah') return a.rating - b.rating;
            return 0;
        });

    return (
        <article className="main-content mt-4 animate-fade-in-up flex-1 min-w-0">

            {/* ══════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════ */}
            <div className="container-fluid px-lg-15 px-md-10 px-6">
                <div className="row g-3 hover-none">
                    <div className="col-12 d-flex align-items-stretch">
                        <section
                            className="relative w-full h-[550px] overflow-hidden shadow-lg border border-secondary border-opacity-10 flex-fill"
                            style={{ borderRadius: '40px' }}
                        >
                            {/* Back Button */}
                            <div className="absolute top-6 left-10 z-20">
                                <Link
                                    href="/games"
                                    className="inline-flex items-center gap-2 text-white/60 hover:text-[#FF6B35] transition-colors group px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/5"
                                >
                                    <i className="ti ti-arrow-left text-xl group-hover:-translate-x-1 transition-transform"></i>
                                    <span className="font-bold uppercase tracking-widest text-[9px]">Kembali</span>
                                </Link>
                            </div>

                            {/* Background Media */}
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
                                    <Image
                                        src={game.image}
                                        alt={game.title}
                                        fill
                                        className="object-cover opacity-60 brightness-50 scale-100"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 via-[#000000]/20 to-transparent"></div>
                            </div>

                            {/* Hero Content */}
                            <div className="relative z-10 h-full flex flex-col justify-center ps-lg-15 px-md-10 px-6 pt-14">
                                <h1
                                    className="hero-title tcn-1 mb-lg-5 mb-4"
                                    style={{ fontSize: '3.5rem', lineHeight: '100%', fontWeight: '900', letterSpacing: '-1.5px' }}
                                >
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
                                            <span className="text-white/90 font-bold text-[9px] uppercase tracking-wide whitespace-nowrap">
                                                {game.platform.replace('Mobile & ', '')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 border-r border-white/10 pr-8 h-1/2">
                                            <i className="ti ti-star-filled text-[#FFB800] text-md"></i>
                                            <span className="text-white/90 font-bold text-[9px] uppercase tracking-wide whitespace-nowrap">{game.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <i className="ti ti-user-circle text-lg text-white/40"></i>
                                            <span className="text-white/90 font-bold text-[9px] uppercase tracking-wide whitespace-nowrap">{game.players}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════
                TABS NAVIGATION
            ══════════════════════════════════════ */}
            <div className="pl-lg-15 pl-md-10 pl-6 pr-0 mt-12 border-b border-white/5">
                <div className="flex justify-center gap-10">
                    {[
                        { id: 'detail', label: 'Detail' },
                        { id: 'ulasan', label: 'Ulasan' },
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

            {/* ══════════════════════════════════════
                MAIN CONTENT AREA
            ══════════════════════════════════════ */}
            <div className="pl-lg-15 pl-md-10 pl-6 pr-6 pr-lg-20 py-12">

                {/* ── TAB: DETAIL ── */}
                {activeTab === 'detail' && (
                    <div className="max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in relative">

                        {/* Left Column */}
                        <div className="lg:col-span-9 space-y-16 pl-lg-10">

                            {/* Screenshots Gallery */}
                            {game.screenshots && game.screenshots.length > 0 && (
                                <section className="space-y-10 group/gallery relative">
                                    <h2 className="text-lg font-bold text-white tracking-wide border-l-4 border-[#FF6B35] pl-4">
                                        Tampilan Permainan
                                    </h2>
                                    <div className="relative mt-8 gallery-wrapper overflow-visible">
                                        <button
                                            onClick={() => { if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' }); }}
                                            className={`absolute left-2 top-1/2 -translate-y-1/2 z-50 w-14 h-14 flex items-center justify-center text-black transition-all hover:bg-[#FF6B35] hover:text-white border-0 cursor-pointer bg-white shadow-2xl rounded-full ${canScrollLeft ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
                                        >
                                            <i className="ti ti-chevron-left text-3xl"></i>
                                        </button>
                                        <button
                                            onClick={() => { if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' }); }}
                                            className={`absolute right-2 top-1/2 -translate-y-1/2 z-50 w-14 h-14 flex items-center justify-center text-black transition-all hover:bg-[#FF6B35] hover:text-white border-0 cursor-pointer bg-white shadow-2xl rounded-full ${canScrollRight ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
                                        >
                                            <i className="ti ti-chevron-right text-3xl"></i>
                                        </button>
                                        <div
                                            ref={scrollRef}
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
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* About */}
                            <section className="space-y-6">
                                <h2 className="text-lg font-bold text-white tracking-wide border-l-4 border-[#FF6B35] pl-4">Tentang Game Ini</h2>
                                <p className="text-white/70 text-base leading-relaxed max-w-3xl pl-5 mt-4">{game.description}</p>
                                {game.features && game.features.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 pl-5">
                                        {game.features.map((feature: any, idx: number) => (
                                            <div
                                                key={idx}
                                                className="flex items-start gap-4 p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-[#FF6B35]/30 transition-colors"
                                            >
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

                            {/* Rules */}
                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-lg font-bold text-white tracking-wide border-l-4 border-[#FF6B35] pl-4">Aturan & Cara Bermain</h2>
                                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
                                    <span className="text-[10px] font-bold tracking-widest text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/20 px-3 py-1 rounded-full uppercase">
                                        {game.rules.length} Aturan
                                    </span>
                                </div>
                                <div className="relative pl-5 mt-4">
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
                                                <div
                                                    className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-[11px] transition-all duration-300"
                                                    style={{
                                                        background: idx === 0 ? 'linear-gradient(135deg, #FF4D00, #FF8C00)' : 'rgba(255,255,255,0.04)',
                                                        border: idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                                                        boxShadow: idx === 0 ? '0 0 20px rgba(255,77,0,0.4)' : 'none',
                                                        color: idx === 0 ? '#fff' : 'rgba(255,107,53,0.7)',
                                                    }}
                                                >
                                                    {String(idx + 1).padStart(2, '0')}
                                                </div>
                                                <div
                                                    className="flex-1 p-4 rounded-2xl border transition-all duration-300 group-hover:border-[#FF6B35]/30 group-hover:bg-white/[0.04]"
                                                    style={{
                                                        background: idx === 0 ? 'rgba(255,77,0,0.06)' : 'rgba(255,255,255,0.02)',
                                                        border: idx === 0 ? '1px solid rgba(255,107,53,0.25)' : '1px solid rgba(255,255,255,0.05)',
                                                    }}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex-shrink-0 mt-0.5">
                                                            <i
                                                                className={`${getStepIcon(idx)} text-base`}
                                                                style={{ color: idx === 0 ? '#FF6B35' : 'rgba(255,107,53,0.5)' }}
                                                            ></i>
                                                        </div>
                                                        <p
                                                            className="text-sm leading-relaxed"
                                                            style={{ color: idx === 0 ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.60)' }}
                                                        >
                                                            {rule}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-5 mt-6 pl-5">
                                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center">
                                            <i className="ti ti-flag-3-filled text-[#FF6B35] text-sm"></i>
                                        </div>
                                        <p className="text-[11px] font-bold tracking-widest text-white/30 uppercase">Selamat bermain & jaga sportivitas!</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column — Similar Games */}
                        <aside className="lg:col-span-3 space-y-10 animate-fade-in-right flex flex-col items-end">
                            <div className="w-full max-w-[320px]">
                                <div className="flex items-center justify-between mb-10">
                                    <h2 className="text-lg font-bold text-white tracking-wide">Game serupa</h2>
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
                                                <div className="relative w-16 h-16 flex-shrink-0 rounded-[22px] overflow-hidden shadow-2xl group-hover/item:scale-110 transition-all duration-500">
                                                    <Image src={rg.image} alt={rg.title} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-bold text-[13px] truncate group-hover/item:text-[#FF6B35] transition-colors leading-tight mb-1">
                                                        {rg.title}
                                                    </h4>
                                                    <p className="text-white/40 text-[10px] uppercase font-black tracking-widest truncate">{rg.subtitle || rg.genre}</p>
                                                    <div className="flex items-center gap-1.5 mt-1.5">
                                                        <span className="text-white/60 text-[11px] font-black">{rg.rating}</span>
                                                        <i className="ti ti-star-filled text-yellow-500 text-[10px]"></i>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                )}

                {/* ══════════════════════════════════════
                    TAB: ULASAN
                ══════════════════════════════════════ */}
                {activeTab === 'ulasan' && (
                    <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                        {/* ── LEFT: Review List ────────────────── */}
                        <div className="lg:col-span-8 space-y-6">

                            {/* Section Header */}
                            <div className="flex items-end justify-between pb-6 border-b border-white/[0.04]">
                                <div>
                                    <p className="text-[10px] font-black tracking-[0.3em] text-[#FF6B35]/60 uppercase mb-2">
                                        Suara Komunitas
                                    </p>
                                    <h2 className="text-2xl font-black text-white tracking-tight leading-none">
                                        {totalReviews.toLocaleString()}{' '}
                                        <span className="text-white/20 font-light">Ulasan</span>
                                    </h2>
                                </div>
                                {/* Sort Controls */}
                                <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                                    {(['terbaru', 'tertinggi', 'terendah'] as const).map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => setSortBy(opt)}
                                            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all ${
                                                sortBy === opt
                                                    ? 'bg-white/10 text-white shadow-sm'
                                                    : 'text-white/20 hover:text-white/50'
                                            }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filter Pills */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mr-1">Filter:</span>
                                {[5, 4, 3, 2, 1].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setFilterStar(filterStar === s ? null : s)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black border transition-all duration-200 ${
                                            filterStar === s
                                                ? 'bg-[#FF6B35] border-[#FF6B35] text-white shadow-[0_4px_16px_rgba(255,107,53,0.3)]'
                                                : 'border-white/[0.07] text-white/30 hover:border-white/20 hover:text-white/60'
                                        }`}
                                    >
                                        <i className="ti ti-star-filled text-[9px]"></i>
                                        {s}
                                    </button>
                                ))}
                                {filterStar && (
                                    <button
                                        onClick={() => setFilterStar(null)}
                                        className="text-[10px] text-white/20 hover:text-[#FF6B35] transition-colors ml-1 flex items-center gap-1"
                                    >
                                        <i className="ti ti-x text-[10px]"></i> Reset
                                    </button>
                                )}
                            </div>

                            {/* Review Cards */}
                            <div className="space-y-3">
                                {sortedReviews.length === 0 ? (
                                    <div className="text-center py-20 text-white/15 text-sm font-light tracking-wide">
                                        <i className="ti ti-mood-empty text-4xl block mb-4 opacity-30"></i>
                                        Tidak ada ulasan untuk filter ini.
                                    </div>
                                ) : (
                                    sortedReviews.map((review, idx) => (
                                        <div
                                            key={idx}
                                            className="group/review relative p-6 rounded-3xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-500 overflow-hidden"
                                        >
                                            {/* Per-reviewer accent glow */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover/review:opacity-100 transition-opacity duration-700 pointer-events-none"
                                                style={{
                                                    background: `radial-gradient(ellipse at top left, ${review.color}08 0%, transparent 65%)`,
                                                }}
                                            ></div>

                                            <div className="relative z-10">
                                                {/* Top Row */}
                                                <div className="flex items-start justify-between gap-4 mb-4">
                                                    <div className="flex items-center gap-3.5">
                                                        {/* Avatar with verified badge */}
                                                        <div className="relative flex-shrink-0">
                                                            <div
                                                                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-[11px]"
                                                                style={{
                                                                    background: `linear-gradient(135deg, ${review.color}55, ${review.color}22)`,
                                                                    border: `1px solid ${review.color}30`,
                                                                }}
                                                            >
                                                                {review.avatar}
                                                            </div>
                                                            {review.verified && (
                                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0a0a0a] flex items-center justify-center">
                                                                    <i className="ti ti-check text-white" style={{ fontSize: '7px' }}></i>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <span className="text-white font-bold text-sm block leading-tight">{review.name}</span>
                                                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                                                <span className="text-white/25 text-[10px]">{review.date}</span>
                                                                <span className="text-white/10">·</span>
                                                                <span className="text-white/25 text-[10px] flex items-center gap-1">
                                                                    <i className="ti ti-device-gamepad-2 text-[9px]"></i>
                                                                    {review.platform}
                                                                </span>
                                                                <span className="text-white/10">·</span>
                                                                <span className="text-white/25 text-[10px] flex items-center gap-1">
                                                                    <i className="ti ti-clock text-[9px]"></i>
                                                                    {review.playtime}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Stars */}
                                                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                                        <div className="flex items-center gap-0.5">
                                                            {[1, 2, 3, 4, 5].map(s => (
                                                                <i
                                                                    key={s}
                                                                    className={`ti ${
                                                                        s <= review.rating
                                                                            ? 'ti-star-filled text-yellow-400'
                                                                            : 'ti-star text-white/[0.07]'
                                                                    } text-sm`}
                                                                ></i>
                                                            ))}
                                                        </div>
                                                        <span className="text-[9px] font-black text-white/20 tracking-widest">
                                                            {review.rating}.0 / 5
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Review Text — indented to align with name */}
                                                <p className="text-white/55 text-[13px] leading-[1.8] mb-5 pl-[3.375rem]">
                                                    {review.text}
                                                </p>

                                                {/* Action Row */}
                                                <div className="flex items-center gap-2 pl-[3.375rem] pt-4 border-t border-white/[0.03]">
                                                    <span className="text-[9px] text-white/15 font-black uppercase tracking-[0.2em] mr-2">
                                                        Membantu?
                                                    </span>
                                                    <button
                                                        onClick={() => toggleHelpful(idx)}
                                                        className={`flex items-center gap-1.5 text-[10px] font-bold px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                                                            helpfulMap[idx]
                                                                ? 'bg-[#FF6B35]/10 border-[#FF6B35]/30 text-[#FF6B35]'
                                                                : 'border-white/[0.05] text-white/20 hover:border-white/15 hover:text-white/40'
                                                        }`}
                                                    >
                                                        <i className="ti ti-thumb-up text-xs"></i>
                                                        Ya ({helpfulMap[idx] ? review.likes + 1 : review.likes})
                                                    </button>
                                                    <button className="flex items-center gap-1.5 text-[10px] font-bold px-3.5 py-1.5 rounded-full border border-white/[0.04] text-white/15 hover:border-white/10 hover:text-white/30 transition-all">
                                                        <i className="ti ti-thumb-down text-xs"></i> Tidak
                                                    </button>
                                                    <button className="ml-auto flex items-center gap-1.5 text-[9px] font-bold text-white/10 hover:text-white/30 transition-colors">
                                                        <i className="ti ti-flag text-xs"></i> Laporkan
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* ── RIGHT: Rating Summary + Review Form ── */}
                        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-[140px]">

                            {/* Rating Summary Card */}
                            <div className="p-6 rounded-3xl border border-white/[0.05] bg-white/[0.015] space-y-6">
                                {/* Big Score */}
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <span className="text-[72px] font-black text-white leading-none tracking-tighter">4.5</span>
                                        <span className="absolute -top-1 -right-5 text-[14px] font-black text-white/20 leading-none">/5</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <i
                                                    key={s}
                                                    className={`ti ${s <= 4 ? 'ti-star-filled' : 'ti-star-half-filled'} text-yellow-400 text-base`}
                                                ></i>
                                            ))}
                                        </div>
                                        <p className="text-[10px] font-bold text-white/25 tracking-wider">
                                            {totalReviews.toLocaleString()} total ulasan
                                        </p>
                                    </div>
                                </div>

                                {/* Rating Bars */}
                                <div className="space-y-2.5">
                                    {ratingBars.map(({ star, count, percent }) => (
                                        <button
                                            key={star}
                                            onClick={() => setFilterStar(filterStar === star ? null : star)}
                                            className={`w-full flex items-center gap-3 transition-all duration-200 ${
                                                filterStar === star ? 'opacity-100' : 'opacity-40 hover:opacity-75'
                                            }`}
                                        >
                                            <span className="text-[11px] font-black text-white/60 w-2.5 text-right shrink-0">{star}</span>
                                            <i className="ti ti-star-filled text-yellow-400 text-[9px] shrink-0"></i>
                                            <div className="flex-1 h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-700 ${
                                                        filterStar === star ? 'bg-[#FF6B35]' : 'bg-white/20'
                                                    }`}
                                                    style={{ width: `${percent}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-white/20 w-10 text-right shrink-0">
                                                {count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* Badges */}
                                <div className="pt-2 border-t border-white/[0.04] flex flex-wrap gap-2">
                                    {[
                                        { icon: 'ti-shield-check', label: 'Terverifikasi', color: '#4CAF50', bg: 'rgba(76,175,80,0.06)', border: 'rgba(76,175,80,0.15)' },
                                        { icon: 'ti-star', label: 'Top Rated', color: '#FFB800', bg: 'rgba(255,184,0,0.06)', border: 'rgba(255,184,0,0.15)' },
                                        { icon: 'ti-device-gamepad-2', label: 'In-game', color: '#FF6B35', bg: 'rgba(255,107,53,0.06)', border: 'rgba(255,107,53,0.15)' },
                                    ].map(({ icon, label, color, bg, border }) => (
                                        <div
                                            key={label}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase"
                                            style={{ background: bg, border: `1px solid ${border}`, color }}
                                        >
                                            <i className={`ti ${icon} text-[9px]`}></i>
                                            {label}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Review Form Card */}
                            <div className="p-6 rounded-3xl border border-white/[0.05] bg-white/[0.015]">
                                <p className="text-[9px] font-black tracking-[0.25em] text-white/25 uppercase mb-5">
                                    Tulis Ulasanmu
                                </p>

                                {submitted ? (
                                    <div className="flex flex-col items-center gap-3 py-10 text-center">
                                        <div className="w-14 h-14 rounded-2xl bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center">
                                            <i className="ti ti-check text-[#FF6B35] text-2xl"></i>
                                        </div>
                                        <p className="text-white font-bold text-sm tracking-tight">Ulasan terkirim!</p>
                                        <p className="text-white/30 text-xs">Sedang ditinjau oleh tim kami.</p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="text-[10px] text-white/20 hover:text-[#FF6B35] transition-colors underline underline-offset-4 mt-2"
                                        >
                                            Tulis ulasan lain
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Star Rating Picker */}
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Rating *</p>
                                            <div className="flex items-center gap-2">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <button
                                                        key={s}
                                                        onMouseEnter={() => setHoverRating(s)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        onClick={() => setModalRating(s)}
                                                        className="transition-transform hover:scale-125 active:scale-95"
                                                    >
                                                        <i
                                                            className={`ti ${
                                                                s <= (hoverRating || modalRating) ? 'ti-star-filled' : 'ti-star'
                                                            } text-2xl transition-colors ${
                                                                s <= (hoverRating || modalRating)
                                                                    ? 'text-yellow-400'
                                                                    : 'text-white/[0.07]'
                                                            }`}
                                                        ></i>
                                                    </button>
                                                ))}
                                                {modalRating > 0 && (
                                                    <span className="text-[10px] text-[#FF6B35] font-black ml-1 tracking-wide">
                                                        {['', 'Sangat Buruk', 'Kurang', 'Lumayan', 'Bagus', 'Sempurna!'][modalRating]}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Name + Email fields */}
                                        {[
                                            {
                                                label: 'Nama *',
                                                type: 'text',
                                                placeholder: 'Nama kamu',
                                                value: reviewName,
                                                setter: setReviewName,
                                            },
                                            {
                                                label: 'Email *',
                                                type: 'email',
                                                placeholder: 'mail@example.com',
                                                value: reviewEmail,
                                                setter: setReviewEmail,
                                            },
                                        ].map(({ label, type, placeholder, value, setter }) => (
                                            <div key={label} className="space-y-1.5">
                                                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{label}</p>
                                                <input
                                                    type={type}
                                                    placeholder={placeholder}
                                                    value={value}
                                                    onChange={e => setter(e.target.value)}
                                                    className="w-full bg-black/20 border border-white/[0.05] rounded-xl px-4 py-2.5 text-[12px] text-white placeholder-white/10 outline-none focus:border-[#FF6B35]/30 focus:bg-black/30 transition-all"
                                                />
                                            </div>
                                        ))}

                                        {/* Textarea */}
                                        <div className="space-y-1.5">
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Ulasan *</p>
                                            <textarea
                                                placeholder="Ceritakan pengalamanmu..."
                                                value={reviewText}
                                                onChange={e => setReviewText(e.target.value)}
                                                rows={4}
                                                className="w-full bg-black/20 border border-white/[0.05] rounded-xl px-4 py-2.5 text-[12px] text-white placeholder-white/10 outline-none focus:border-[#FF6B35]/30 focus:bg-black/30 transition-all resize-none"
                                            />
                                            <div className="flex justify-end">
                                                <span
                                                    className={`text-[9px] font-black tracking-wide ${
                                                        reviewText.length > 20 ? 'text-white/25' : 'text-white/10'
                                                    }`}
                                                >
                                                    {reviewText.length}
                                                    <span className="text-white/10">/500</span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <button
                                            onClick={() => {
                                                if (modalRating && reviewName && reviewEmail && reviewText.length > 10) {
                                                    setSubmitted(true);
                                                }
                                            }}
                                            disabled={!modalRating || !reviewName || !reviewEmail || reviewText.length <= 10}
                                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF4D00] to-[#FF8C00] text-white font-black text-[9px] uppercase tracking-[0.2em] transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:shadow-[0_8px_32px_rgba(255,77,0,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                        >
                                            <i className="ti ti-send text-sm"></i>
                                            Kirim Ulasan
                                        </button>
                                        <p className="text-[9px] text-center text-white/15 tracking-wide">
                                            Email tidak akan ditampilkan publik.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}