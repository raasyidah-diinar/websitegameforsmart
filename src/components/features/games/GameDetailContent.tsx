"use client";

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
        color: '#c084fc',
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
        color: '#60a5fa',
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
        color: '#34d399',
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
        color: '#fb923c',
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
        color: '#f472b6',
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

const reviewCardBase: React.CSSProperties = {
    background: 'rgba(255,255,255,0.025)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '20px',
    transition: 'all 0.25s ease',
};

const reviewCardHover: React.CSSProperties = {
    background: 'rgba(255,255,255,0.045)',
    border: '1px solid rgba(255,255,255,0.13)',
    borderRadius: '20px',
    transition: 'all 0.25s ease',
};

const inputBase: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '12px',
    outline: 'none',
    transition: 'all 0.2s ease',
    width: '100%',
    padding: '8px 12px',
};

const inputFocused: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255, 107, 53, 0.35)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '12px',
    outline: 'none',
    transition: 'all 0.2s ease',
    width: '100%',
    padding: '8px 12px',
};

const sideCardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.025)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '20px',
    padding: '24px',
};

export default function GameDetailContent({ game }: GameDetailContentProps) {
    const [activeTab, setActiveTab] = useState('detail');
    const [modalRating, setModalRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [helpfulMap, setHelpfulMap] = useState<Record<number, boolean>>({});
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<'terbaru' | 'tertinggi' | 'terendah'>('terbaru');
    const [filterStar, setFilterStar] = useState<number | null>(null);
    const [reviewText, setReviewText] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showAllFeatures, setShowAllFeatures] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isLightboxOpen]);

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

    const openLightbox = (index: number) => { setLightboxIndex(index); setIsLightboxOpen(true); };
    const closeLightbox = () => { setIsLightboxOpen(false); };
    const nextLightboxImage = () => { if (game.screenshots) setLightboxIndex((prev) => (prev + 1) % game.screenshots!.length); };
    const prevLightboxImage = () => { if (game.screenshots) setLightboxIndex((prev) => (prev - 1 + game.screenshots!.length) % game.screenshots!.length); };

    useEffect(() => {
        if (!isLightboxOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextLightboxImage();
            if (e.key === 'ArrowLeft') prevLightboxImage();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isLightboxOpen]);

    const renderStars = (count: number, size = 'text-sm') => (
        <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(s => (
                <i key={s} className={`ti ${s <= count ? 'ti-star-filled text-amber-400' : 'ti-star text-white/10'} ${size}`}></i>
            ))}
        </div>
    );

    return (
        <article className="main-content mt-4 animate-fade-in-up flex-1 min-w-0">

            {/* HERO */}
            <div className="container-fluid px-3 px-md-6 px-lg-10">
                <div className="row g-3 hover-none">
                    <div className="col-12 d-flex align-items-stretch">
                        <section
                            className="relative w-full overflow-hidden shadow-lg border border-secondary border-opacity-10 flex-fill"
                            style={{ borderRadius: '24px', height: 'clamp(260px, 45vw, 420px)' }}
                        >
                            {/* Back Button */}
                            <div className="absolute top-4 left-4 z-20">
                                <Link
                                    href="/home"
                                    className="inline-flex items-center gap-1.5 text-white/60 hover:text-[#FF6B35] transition-colors group px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-full"
                                    style={{ border: '2px solid #333333' }}
                                >
                                    <i className="ti ti-arrow-left text-base group-hover:-translate-x-1 transition-transform"></i>
                                    <span className="font-bold uppercase tracking-widest text-[9px] hidden sm:inline">Kembali</span>
                                </Link>
                            </div>

                            {/* Background media */}
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                {game.videoUrl ? (
                                    <iframe
                                        src={(() => {
                                            const videoId = game.videoUrl!.split('/embed/')[1]?.split('?')[0] ?? '';
                                            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${videoId}&start=3`;
                                        })()}
                                        allow="autoplay; encrypted-media"
                                        className="absolute"
                                        style={{ top: '50%', left: '50%', width: '177.78vh', height: '100%', minWidth: '100%', minHeight: '56.25vw', transform: 'translate(-50%, -50%)', border: 'none', pointerEvents: 'none', opacity: 0.55 }}
                                        title={game.title}
                                        frameBorder="0"
                                    />
                                ) : (
                                    <Image src={game.image} alt={game.title} fill className="object-cover opacity-60 brightness-50 scale-100" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/70 to-transparent"></div>
                            </div>

                            {/* ✅ FIX 1: justify-center agar teks berada di tengah vertikal hero. Tambahkan padding kiri yang lebih besar agar tidak menempel ke pinggir */}
                            <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:pl-20 lg:pr-12">
                                <div className="ml-0 sm:ml-8 lg:ml-16 max-w-[800px]">
                                    <h1
                                        className="hero-title tcn-1 mb-2 sm:mb-3"
                                        style={{
                                            fontSize: 'clamp(1.6rem, 5vw, 3.5rem)',
                                            lineHeight: '1.05',
                                            fontWeight: '900',
                                            letterSpacing: '-1px',
                                        }}
                                    >
                                        {game.title}
                                    </h1>

                                    {/* ✅ FIX 2: mb-16/20 agar jarak deskripsi ke button lebih lapang (space banyak) */}
                                    <p
                                        className="tcn-1 mb-16 sm:mb-20 opacity-75 fs-six fw-normal line-clamp-2 sm:line-clamp-none"
                                        style={{ maxWidth: '600px', fontSize: 'clamp(12px, 2vw, 15px)' }}
                                    >
                                        {game.description}
                                    </p>

                                    {/* ✅ Container vertikal — dikurangi gap & marginnya agar lebih rapat */}
                                    <div className="flex flex-col gap-4 mt-6 sm:mt-8">
                                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                            <button
                                                onClick={() => { if (game.gameUrl) window.open(game.gameUrl, '_blank'); }}
                                                className="flex-shrink-0 bg-gradient-to-r from-[#FF6B35] to-[#FF8C00] text-white px-6 sm:px-8 h-[36px] sm:h-[42px] rounded-full font-bold text-[11px] sm:text-[13px] uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_rgba(255,107,53,0.3)] hover:shadow-[0_15px_35px_rgba(255,107,53,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2"
                                                style={{ borderRadius: '9999px' }}
                                            >
                                                <i className="ti ti-player-play-filled text-sm sm:text-base"></i>
                                                <span>MAIN SEKARANG</span>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(window.location.href);
                                                    alert('Link berhasil disalin!');
                                                }}
                                                className="flex-shrink-0 bg-black/40 backdrop-blur-md text-white px-4 sm:px-6 h-[36px] sm:h-[42px] rounded-full font-bold text-[11px] sm:text-[13px] uppercase tracking-wider transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 flex items-center justify-center gap-2"
                                                style={{ borderRadius: '9999px', border: '2px solid #333333' }}
                                                title="Bagikan"
                                            >
                                                <i className="ti ti-share text-sm sm:text-base"></i>
                                                <span className="hidden sm:inline">Bagikan</span>
                                            </button>
                                        </div>

                                        {/* Info Panel — lebih tipis dan font lebih kecil */}
                                        <div className="flex-[1.5] flex items-center justify-around py-2.5 px-4 bg-black/40 rounded-xl backdrop-blur-md"
                                            style={{ border: '1.5px solid #333333' }}>
                                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-8">
                                                <i className="ti ti-device-gamepad-2 text-[#FF6B35] text-sm sm:text-base"></i>
                                                <span className="text-white font-bold text-[11px] sm:text-[12px] uppercase tracking-wider whitespace-nowrap">{game.platform.replace('Mobile & ', '')}</span>
                                            </div>
                                            <div className="w-[1px] h-4 sm:h-5 bg-white/10"></div>
                                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-8">
                                                <i className="ti ti-star-filled text-[#FFB800] text-sm sm:text-base"></i>
                                                <span className="text-white font-bold text-[11px] sm:text-[12px] uppercase tracking-wider">{game.rating}</span>
                                            </div>
                                            <div className="w-[1px] h-4 sm:h-5 bg-white/10"></div>
                                            <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-8">
                                                <i className="ti ti-eye text-sm sm:text-base text-[#b0b0b0]"></i>
                                                <span className="text-[#e2e2e2] font-bold text-[11px] sm:text-[12px] uppercase tracking-wider whitespace-nowrap">{game.players}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* TABS — dikurangi margin atasnya */}
            <div className="px-4 sm:px-8 lg:px-16 mt-6 border-b border-white/5">
                <div className="flex justify-center gap-8 sm:gap-10">
                    {[{ id: 'detail', label: 'Detail' }, { id: 'ulasan', label: 'Ulasan' }].map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`pb-3 text-[11px] font-bold tracking-widest transition-all relative ${activeTab === tab.id ? 'text-white' : 'text-white/40 hover:text-white/60'}`}>
                            {tab.label}
                            {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6B35]"></div>}
                        </button>
                    ))}
                </div>
            </div>

            {/* CONTENT — dikurangi padding vertikalnya */}
            <div className="px-4 sm:px-8 lg:px-16 py-6 sm:py-8">

                {/* TAB: DETAIL */}
                {activeTab === 'detail' && (
                    <div className="max-w-[1600px] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 animate-fade-in relative">

                        {/* Main content — dirapatkan gap antar section */}
                        <div className="lg:col-span-9 space-y-8 lg:space-y-12">

                            {/* Gallery — dirapatkan headingnya */}
                            {game.screenshots && game.screenshots.length > 0 && (
                                <section className="group/gallery relative mb-10 sm:mb-14">
                                    <h2 className="text-base sm:text-lg font-bold text-white mb-5 sm:mb-6">Tampilan Permainan</h2>
                                    <div className="relative gallery-wrapper overflow-visible">
                                        <button onClick={() => { if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' }); }}
                                            className={`absolute left-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all cursor-pointer group gallery-nav-btn ${canScrollLeft ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
                                            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '50%', color: 'white' }}>
                                            <i className="ti ti-chevron-left text-xl"></i>
                                        </button>
                                        <button onClick={() => { if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' }); }}
                                            className={`absolute right-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all cursor-pointer group gallery-nav-btn ${canScrollRight ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
                                            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '50%', color: 'white' }}>
                                            <i className="ti ti-chevron-right text-xl"></i>
                                        </button>
                                        <style jsx>{`.gallery-nav-btn:hover { background-color: #FF6B35 !important; border-color: #FF6B35 !important; }`}</style>
                                        <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory" style={{ scrollBehavior: 'smooth' }}>
                                            {game.screenshots.map((ss: string, idx: number) => (
                                                <div key={idx}
                                                    className="flex-shrink-0 relative rounded-xl sm:rounded-[24px] overflow-hidden group cursor-pointer shadow-lg snap-start transition-all duration-300 border-0 active:scale-95 active:brightness-90"
                                                    style={{ width: 'clamp(220px, 60vw, 360px)', aspectRatio: '16/9' }}
                                                    onClick={() => openLightbox(idx)}
                                                >
                                                    <Image src={ss} alt={`Screenshot ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center">
                                                            <i className="ti ti-zoom-in text-white text-xl"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* About */}
                            <section className="mb-10 sm:mb-14">
                                <h2 className="text-base sm:text-lg font-bold text-white mb-5 sm:mb-6">Tentang Game Ini</h2>
                                <div className="space-y-4 sm:space-y-6">
                                    <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-3xl pl-4 sm:pl-5">{game.description}</p>
                                {game.features && game.features.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 pl-4 sm:pl-5">
                                        {game.features.map((feature: any, idx: number) => (
                                            <div key={idx} 
                                                className="flex items-start gap-3 p-3 sm:p-4 bg-white/[0.03] rounded-2xl hover:border-[#FF6B35]/30 transition-colors"
                                                style={{ border: '1.5px solid #333333' }}
                                            >
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center text-[#FF6B35]">
                                                    <i className={`${feature.icon || 'ti ti-circle-check'} text-base sm:text-lg`}></i>
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-[13px] mb-0.5">{feature.title}</h4>
                                                    <p className="text-white/40 text-[10px] leading-tight">{feature.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                </div>
                            </section>

                            {/* Rules */}
                            <section className="mb-10 sm:mb-14">
                                <div className="flex flex-wrap items-center gap-3 mb-5 sm:mb-6">
                                    <h2 className="text-base sm:text-lg font-bold text-white">Aturan &amp; Cara Bermain</h2>
                                    <span className="text-[10px] font-bold tracking-widest text-[#FF6B35] bg-[#FF6B35]/10 px-3 py-1 rounded-full uppercase"
                                        style={{ border: '2px solid #333333' }}>{game.rules.length} Aturan</span>
                                </div>
                                <div className="flex flex-col px-4 sm:px-5">
                                    {game.rules.map((rule: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-5 py-4 border-b border-white/10 last:border-b-0 group">
                                            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-[11px] sm:text-xs shrink-0 transition-all duration-300 ${
                                                idx === 0 
                                                ? "bg-[#FF6B35] text-white shadow-[0_4px_12px_rgba(255,107,53,0.4)] border-transparent" 
                                                : "bg-[#0A0A0A] !text-[#FF6B35]"
                                            }`}
                                            style={idx !== 0 ? { border: '2px solid #333333' } : {}}>
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </div>
                                            <p className="text-[13px] leading-relaxed text-white/70">{rule}</p>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-4 mt-8">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 flex items-center justify-center">
                                            <i className="ti ti-flag-3-filled text-[#FF6B35] text-sm"></i>
                                        </div>
                                        <p className="text-[11px] font-bold tracking-widest text-white/30 uppercase">Selamat bermain &amp; jaga sportivitas!</p>
                                    </div>
                                </div>
                            </section>

                            {/* Pemain Terakhir — disamakan spacingnya */}
                            <section className="mb-10 sm:mb-14">
                                <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
                                    <h2 className="text-base sm:text-lg font-bold text-white">Pemain Terakhir</h2>
                                    <button className="flex items-center gap-2 text-sm font-semibold text-[#FF6B35] transition-colors hover:text-[#FF8C00]">
                                        Lihat semua <i className="ti ti-arrow-right"></i>
                                    </button>
                                </div>
                                <div className="flex flex-col px-4 sm:px-5">
                                    {[
                                        { name: "Budi Santoso", time: "2 menit yang lalu" },
                                        { name: "Siti Aminah", time: "5 menit yang lalu" },
                                        { name: "Andi Wijaya", time: "12 menit yang lalu" },
                                        { name: "Rina Maharani", time: "28 menit yang lalu" },
                                        { name: "Joko Anwar", time: "45 menit yang lalu" },
                                        { name: "Nadia Putri", time: "1 jam yang lalu" }
                                    ].map((player, idx) => (
                                        <div key={idx} className="flex items-center justify-between py-4 border-b border-white/10 last:border-b-0 group hover:bg-white/[0.02] transition-all px-2 -mx-2 rounded-lg cursor-default">
                                            <div className="flex items-center gap-5 sm:gap-6">
                                                <span className="text-white/20 font-medium text-sm sm:text-base w-6">
                                                    {(idx + 1).toString().padStart(2, '0')}
                                                </span>
                                                <p className="text-white font-medium text-sm">{player.name}</p>
                                            </div>
                                            <span className="text-white/40 text-xs sm:text-[13px]">{player.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar — Game Serupa */}
                        <aside className="lg:col-span-3 order-last lg:order-none animate-fade-in-right">
                            {(() => {
                                const similarGames = allItemsData.filter(item => item.type === 'game' && item.id !== game.id).slice(0, 6);
                                const isTwoCol = similarGames.length >= 4;
                                return (
                                    <div className="w-full lg:max-w-[320px] lg:ml-auto">
                                        <div className="flex items-center justify-between mb-5">
                                            <h2 className="font-bold text-white" style={{ fontSize: 'clamp(18px, 3vw, 22px)' }}>Game serupa</h2>
                                            <Link href="/games" className="text-white/40 hover:text-[#FF6B35] transition-colors">
                                                <i className="ti ti-arrow-right text-xl"></i>
                                            </Link>
                                        </div>
                                        <div className={isTwoCol ? 'grid grid-cols-2 gap-x-4 gap-y-5' : 'flex flex-col gap-5'}>
                                            {similarGames.map((rg) => (
                                                <Link key={rg.id} href={rg.href} className="flex items-center gap-3 group/item cursor-pointer">
                                                    <div className="relative w-12 h-12 flex-shrink-0 rounded-[14px] overflow-hidden shadow-xl group-hover/item:scale-105 transition-all duration-300">
                                                        <Image src={rg.image} alt={rg.title} fill className="object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h5 className="text-white font-bold text-[10px] truncate group-hover/item:text-[#FF6B35] transition-colors leading-tight mb-0.5">{rg.title}</h5>
                                                        <p className="text-white/40 text-[8.5px] font-semibold tracking-wide truncate mb-1">{rg.subtitle || rg.genre}</p>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-white/60 text-[10px] font-black">{rg.rating}</span>
                                                            <i className="ti ti-star-filled text-yellow-500 text-[8px]"></i>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
            })()}
                        </aside>
                    </div>
                )}

                {/* TAB: ULASAN */}
                {activeTab === 'ulasan' && (
                    <div className="animate-fade-in flex flex-col-reverse lg:grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">

                        {/* LEFT — Review List */}
                        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 sm:pb-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                <div>
                                    <p className="text-[9px] font-semibold tracking-[0.2em] text-white/25 uppercase mb-1">Suara Komunitas</p>
                                    <h2 className="text-[20px] sm:text-[24px] font-bold text-white tracking-tight leading-none">
                                        {totalReviews.toLocaleString()}
                                        {' '}
                                        <span className="text-white/20 font-light text-lg sm:text-xl ml-1">ulasan</span>
                                    </h2>
                                </div>
                                <div className="flex items-center gap-1 rounded-full p-1 self-start sm:self-auto" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    {(['terbaru', 'tertinggi', 'terendah'] as const).map(opt => (
                                        <button key={opt} onClick={() => setSortBy(opt)}
                                            className="px-3 sm:px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-all duration-200"
                                            style={sortBy === opt
                                                ? { background: '#FF6B35', color: '#ffffff', borderRadius: '100px', boxShadow: '0 2px 8px rgba(255,107,53,0.25)' }
                                                : { color: 'rgba(255,255,255,0.4)', background: 'transparent' }
                                            }>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center flex-wrap gap-2">
                                    <span className="text-[9px] font-semibold text-white/20 uppercase tracking-[0.2em] mr-1">Bintang</span>
                                    {[5, 4, 3, 2, 1].map(s => (
                                        <button key={s} onClick={() => setFilterStar(filterStar === s ? null : s)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium transition-all duration-200"
                                            style={filterStar === s
                                                ? { background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.4)', color: '#FF6B35', borderRadius: '8px' }
                                                : { background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)', borderRadius: '8px' }
                                            }>
                                            <i className="ti ti-star-filled text-[9px]" style={{ color: filterStar === s ? '#FF6B35' : 'rgba(251,191,36,0.5)' }}></i>
                                            {s}
                                        </button>
                                    ))}
                                </div>
                                {filterStar !== null && (
                                    <button
                                        onClick={() => setFilterStar(null)}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,107,53,0.12)';
                                            (e.currentTarget as HTMLButtonElement).style.border = '1px solid rgba(255,107,53,0.4)';
                                            (e.currentTarget as HTMLButtonElement).style.color = '#FF6B35';
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
                                            (e.currentTarget as HTMLButtonElement).style.border = '1px solid rgba(255,255,255,0.08)';
                                            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.25)';
                                        }}
                                        className="flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-medium transition-all duration-200"
                                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: 'rgba(255,255,255,0.25)' }}
                                    >
                                        <i className="ti ti-x text-[9px]"></i> Reset
                                    </button>
                                )}
                            </div>

                            <div className="space-y-3">
                                {sortedReviews.length === 0 ? (
                                    <div className="text-center py-20 text-white/15 text-sm font-light tracking-wide">
                                        <i className="ti ti-mood-empty text-4xl block mb-4 opacity-30"></i>
                                        Tidak ada ulasan untuk filter ini.
                                    </div>
                                ) : sortedReviews.map((review, idx) => (
                                    <div key={idx}
                                        className="p-3.5 sm:p-5 cursor-default"
                                        style={hoveredCard === idx ? reviewCardHover : reviewCardBase}
                                        onMouseEnter={() => setHoveredCard(idx)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <div className="flex items-start justify-between gap-3 mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative flex-shrink-0">
                                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
                                                        style={{ background: `${review.color}18`, color: review.color, border: `1.5px solid ${review.color}30` }}>
                                                        {review.avatar}
                                                    </div>
                                                    {review.verified && (
                                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full flex items-center justify-center"
                                                            style={{ background: '#10b981', border: '1.5px solid rgba(0,0,0,0.6)' }}>
                                                            <i className="ti ti-check text-white" style={{ fontSize: '5px' }}></i>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-white text-[12px] font-semibold leading-none mb-1">{review.name}</p>
                                                    <p className="text-white/25 text-[9px] tracking-wide">{review.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                {renderStars(review.rating, 'text-xs')}
                                                <span className="text-[11px] font-semibold text-white/30 ml-1">{review.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-[12px] sm:text-[12.5px] text-white/55 leading-[1.75] mb-4 sm:mb-5 pl-0 sm:pl-[2.75rem]">{review.text}</p>
                                        <div className="flex items-center gap-2 pl-0 sm:pl-[3.25rem]">
                                            <button onClick={() => toggleHelpful(idx)}
                                                className="flex items-center gap-1.5 text-[10px] font-medium px-3 py-1.5 rounded-full transition-all duration-200"
                                                style={helpfulMap[idx]
                                                    ? { background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.25)', color: '#FF6B35' }
                                                    : { background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.25)' }
                                                }>
                                                <i className="ti ti-thumb-up text-[11px]"></i>
                                                {helpfulMap[idx] ? review.likes + 1 : review.likes}
                                            </button>
                                            <button className="flex items-center gap-1.5 text-[10px] font-medium px-3 py-1.5 rounded-full transition-all"
                                                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.18)' }}>
                                                <i className="ti ti-thumb-down text-[11px]"></i>
                                            </button>
                                            <button className="ml-auto flex items-center gap-1.5 text-[10px] text-white/15 hover:text-white/30 transition-colors">
                                                <i className="ti ti-flag text-[10px]"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT — Rating Summary + Form */}
                        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-[140px]">
                            <div style={sideCardStyle}>
                                <div className="flex items-end gap-3 mb-6">
                                    <span className="text-[48px] sm:text-[56px] font-bold text-white leading-none tracking-tighter">{game.rating}</span>
                                    <div className="pb-2 space-y-1.5">
                                        {renderStars(Math.round(parseFloat(game.rating)), 'text-sm')}
                                        <p className="text-[10px] text-white/25 font-medium">{totalReviews.toLocaleString()} ulasan</p>
                                    </div>
                                </div>
                                <div className="space-y-2.5 mb-6">
                                    {ratingBars.map(({ star, count, percent }) => (
                                        <div key={star} className="w-full flex items-center gap-3">
                                            <span className="text-[11px] font-medium text-white/40 w-2.5 text-right shrink-0">{star}</span>
                                            <i className="ti ti-star-filled text-amber-400/60 text-[9px] shrink-0"></i>
                                            <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                                <div className="h-full rounded-full" style={{ width: `${percent}%`, background: 'rgba(255,107,53,0.6)' }}></div>
                                            </div>
                                            <span className="text-[10px] font-medium text-white/20 w-10 text-right shrink-0">
                                                {count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={sideCardStyle}>
                                <p className="text-[11px] font-semibold tracking-[0.18em] text-white/30 uppercase mb-5">Tulis Ulasan</p>
                                {submitted ? (
                                    <div className="flex flex-col items-center gap-5 py-8 text-center"
                                         style={{ 
                                             animation: 'successAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                                             opacity: 0 
                                         }}>
                                        <style>{`
                                            @keyframes successAppear {
                                                0% { opacity: 0; transform: scale(0.8); }
                                                100% { opacity: 1; transform: scale(1); }
                                            }
                                        `}</style>
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-[#FF6B35] blur-2xl opacity-40 rounded-full animate-pulse"></div>
                                            <div className="w-12 h-12 rounded-full bg-[#FF6B35] flex items-center justify-center shadow-[0_0_20px_rgba(255,107,53,0.4)] border-4 border-white/20 relative z-10">
                                                <i className="ti ti-check text-white text-2xl"></i>
                                            </div>
                                        </div>
                                        <div className="space-y-0.5">
                                            <h3 className="text-white font-bold text-base tracking-tight">Ulasan terkirim!</h3>
                                            <p className="text-[#FF6B35] text-[8px] font-bold uppercase tracking-[0.2em] animate-pulse">Berhasil Terpublikasi</p>
                                        </div>
                                        <p className="text-white/40 text-[9px] leading-relaxed max-w-[170px]">Terima kasih! Ulasanmu sangat berarti bagi komunitas.</p>
                                        <button onClick={() => setSubmitted(false)} 
                                                className="mt-3 px-5 py-1.5 rounded-full border border-white/10 text-[8px] font-bold text-white/40 hover:text-white hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-all uppercase tracking-widest shadow-lg active:scale-95"
                                                style={{ borderRadius: '9999px' }}>
                                            Tulis Ulasan Lain
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[9px] font-semibold text-white/20 uppercase tracking-[0.2em] mb-2.5">Rating</p>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <button key={s}
                                                        onMouseEnter={() => setHoverRating(s)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        onClick={() => setModalRating(s)}
                                                        className="transition-transform hover:scale-125 active:scale-95">
                                                        <i className={`ti ${s <= (hoverRating || modalRating) ? 'ti-star-filled text-amber-400' : 'ti-star text-white/10'} text-xl transition-colors`}></i>
                                                    </button>
                                                ))}
                                                {modalRating > 0 && (
                                                    <span className="text-[10px] text-[#FF6B35]/80 font-medium ml-1">
                                                        {['', 'Sangat Buruk', 'Kurang', 'Lumayan', 'Bagus', 'Sempurna'][modalRating]}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-[9px] font-semibold text-white/20 uppercase tracking-[0.2em] mb-2">Ulasan</p>
                                            <textarea placeholder="Ceritakan pengalamanmu..." value={reviewText}
                                                onChange={e => setReviewText(e.target.value)}
                                                onFocus={() => setFocusedField('review')}
                                                onBlur={() => setFocusedField(null)}
                                                rows={4}
                                                className="placeholder-white/15 resize-none"
                                                style={focusedField === 'review' ? inputFocused : inputBase}
                                            />
                                            <div className="flex justify-end mt-1">
                                                <span className="text-[9px] text-white/15">{reviewText.length}<span className="text-white/8">/500</span></span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => { if (modalRating && reviewText.length > 10) setSubmitted(true); }}
                                            disabled={!modalRating || reviewText.length <= 10}
                                            className="w-full py-3 rounded-xl text-white font-semibold text-[11px] uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 disabled:opacity-20 disabled:cursor-not-allowed hover:-translate-y-0.5"
                                            style={{ background: 'linear-gradient(135deg, #FF4D00, #FF8C00)', boxShadow: '0 6px 24px rgba(255,77,0,0.2)' }}>
                                            <i className="ti ti-send text-sm"></i>
                                            Kirim Ulasan
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* LIGHTBOX MODAL */}
            {mounted && isLightboxOpen && game.screenshots && createPortal(
                <div className="fixed inset-0 z-[99999999] flex items-center justify-center bg-black/98 backdrop-blur-3xl" onClick={closeLightbox}>
                    <button className="fixed top-4 left-4 sm:top-8 sm:left-8 z-[100000000] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all shadow-2xl"
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
                        onClick={closeLightbox}
                        onMouseEnter={e => (e.currentTarget.style.background = '#FF6B35')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
                        <i className="ti ti-x text-white text-xl sm:text-2xl"></i>
                    </button>
                    <div className="relative animate-zoom-in" style={{ width: 'min(94vw, 1100px)', aspectRatio: '16/9' }} onClick={(e) => e.stopPropagation()}>
                        <div className="w-full h-full rounded-[16px] sm:rounded-[20px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)]">
                            <Image src={game.screenshots![lightboxIndex]} alt="Gallery Preview" fill className="object-cover" priority />
                        </div>
                        {game.screenshots!.length > 1 && (
                            <>
                                <button className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-all"
                                    style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                                    onClick={prevLightboxImage}
                                    onMouseEnter={e => (e.currentTarget.style.background = '#FF6B35')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.6)')}>
                                    <i className="ti ti-chevron-left text-white text-lg sm:text-xl"></i>
                                </button>
                                <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-all"
                                    style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                                    onClick={nextLightboxImage}
                                    onMouseEnter={e => (e.currentTarget.style.background = '#FF6B35')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.6)')}>
                                    <i className="ti ti-chevron-right text-white text-lg sm:text-xl"></i>
                                </button>
                                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-1.5 rounded-full"
                                    style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                                    {lightboxIndex + 1} / {game.screenshots!.length}
                                </div>
                            </>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </article>
    );
}