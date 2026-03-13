"use client";
import React, { useEffect } from 'react';
import { winnersData } from '@/data/winnersData';

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

const formatPoints = (amountStr: string) => {
    return amountStr;
};

export default function Banner() {
    useEffect(() => {
        let swiperInstance: any = null;
        let retryCount = 0;
        const maxRetries = 20;

        const initSwiper = () => {
            if (typeof window !== 'undefined' && (window as any).Swiper) {
                const Swiper = (window as any).Swiper;
                if (swiperInstance) {
                    swiperInstance.destroy();
                }
                swiperInstance = new Swiper(".banner-swiper", {
                    direction: "vertical",
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    speed: 800,
                    parallax: true,
                    autoplay: {
                        delay: 3200,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: ".banner-swiper-pagination",
                        clickable: true,
                    },
                    observer: true,
                    observeParents: true,
                });
                return true;
            }
            return false;
        };

        if (!initSwiper()) {
            const interval = setInterval(() => {
                retryCount++;
                if (initSwiper() || retryCount >= maxRetries) {
                    clearInterval(interval);
                }
            }, 500);
            return () => clearInterval(interval);
        }

        return () => {
            if (swiperInstance) {
                swiperInstance.destroy();
            }
        };
    }, []);

    return (
        <section className="banner-section pb-6">
            <style jsx>{`
                /* ============================= */
                /* BANNER RESPONSIVE STYLES      */
                /* ============================= */

                .banner-row {
                    min-height: 405px;
                }

                /* On small screens, banner stacks vertically */
                @media (max-width: 991px) {
                    .banner-row {
                        height: auto !important;
                        min-height: unset !important;
                    }
                    .banner-swiper-col {
                        height: 340px !important;
                        order: 1;
                    }
                    .winners-col {
                        height: auto !important;
                        min-height: 220px;
                        order: 2;
                        margin-top: 0.5rem;
                        margin-bottom: 0.5rem;
                    }
                }

                @media (max-width: 575px) {
                    .banner-swiper-col {
                        height: 280px !important;
                    }
                }

                /* Hero title responsive font */
                .hero-title {
                    font-size: clamp(0.85rem, 8vw, 3.5rem) !important;
                    line-height: 105% !important;
                    font-weight: 900 !important;
                    letter-spacing: -1px !important;
                }

                /* Hero content padding adjustments */
                @media (max-width: 575px) {
                    .hero-content {
                        padding-left: 0.5rem !important;
                        padding-right: 0.25rem !important;
                    }
                    .hero-content p.fs-six {
                        font-size: 8.5px !important;
                        margin-bottom: 0.35rem !important;
                    }
                    .hero-title {
                        margin-bottom: 0.5rem !important;
                    }
                    .float-mascot {
                        height: 140px !important;
                        transform: scale(1.1) translateY(12px) !important;
                    }
                    .btn-half-border {
                        padding: 6px 14px !important;
                        font-size: 8px !important;
                    }
                }

                @media (max-width: 400px) {
                    .float-mascot {
                        height: 120px !important;
                    }
                    .hero-title {
                        font-size: 0.8rem !important;
                    }
                }

                /* Winner list item hover */
                .winner-list-item:hover {
                    background-color: rgba(255, 255, 255, 0.03);
                }

                .hover-scale:hover {
                    transform: scale(1.05);
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 140, 0, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 140, 0, 0.4);
                }

                .float-mascot {
                    animation: float 4s ease-in-out infinite;
                }

                @media (max-width: 575px) {
                    .float-mascot {
                        height: 220px !important;
                        transform: scale(1.1) translateY(10px) !important;
                    }
                    .hero-content {
                        padding-left: 1rem !important;
                        padding-right: 0.5rem !important;
                    }
                }

                @media (max-width: 400px) {
                    .float-mascot {
                        height: 180px !important;
                    }
                }

                @keyframes float {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0); }
                }

                /* Banner swiper border-radius responsive */
                .banner-swiper-wrap {
                    border-radius: 40px;
                }

                @media (max-width: 575px) {
                    .banner-swiper-wrap {
                        border-radius: 24px;
                    }
                    .winners-card-wrap {
                        border-radius: 24px !important;
                    }
                }
            `}</style>
            <div className="container-fluid px-lg-15 px-md-10 px-6">
                <div className="row g-3 align-items-stretch banner-row" style={{ height: '405px' }}>
                    {/* Main Swiper – takes full width on <lg, partial on lg+ */}
                    <div className="col-lg-7 col-xl-8 col-xxl-9 d-flex banner-swiper-col">
                        <div
                            className="swiper banner-swiper banner-swiper-wrap position-relative w-100 h-100 overflow-hidden shadow-lg border border-secondary border-opacity-10 flex-fill"
                            style={{ backgroundColor: '#000000', height: '100% !important' }}
                            data-observer="true"
                            data-observe-parents="true"
                        >
                            <div className="banner-bg-img position-absolute w-100 h-100" style={{ opacity: '0.4' }}>
                                <img className="w-100 h-100 object-fit-cover" src="/assets/img/hero-banner-bg.png" alt="banner" style={{ objectPosition: 'center top', transform: 'translateY(0%) scale(1.2)' }} />
                            </div>
                            <div className="banner-swiper-pagination"></div>
                            <div className="swiper-wrapper h-100">
                                {/* Slide 1 */}
                                <div className="swiper-slide h-100">
                                    <div className="banner-content h-100 d-flex align-items-center">
                                        <div className="row justify-content-center gy-3 align-items-center w-100 gx-0">
                                            <div className="col-lg-6 col-md-7 col-7">
                                                <div className="hero-content ps-lg-15 ps-0">
                                                    <p data-swiper-parallax="-200" className="tcn-1 mb-lg-4 mb-3 opacity-75 fw-medium fs-six text-uppercase tracking-wider">
                                                        READY • SET • PLAY
                                                    </p>
                                                    <h2 data-swiper-parallax="-300" className="hero-title tcn-1 mb-lg-5 mb-3">
                                                        THE ULTIMATE <span className="tcp-1">GAMING ARENA</span>
                                                    </h2>
                                                    <p data-swiper-parallax="-350" className="tcn-1 mb-lg-6 mb-5 opacity-75 fs-six d-none d-md-block" style={{ maxWidth: '600px' }}>
                                                        Gabung di arena cerdas cermat dengan sensasi gaming yang seru. Tantang pengetahuanmu dan kuasai panggung turnamen!
                                                    </p>
                                                    <div data-swiper-parallax="-400" className="d-flex align-items-center flex-wrap gap-xl-4 gap-3 mb-1">
                                                        <a href="/competitions" className="btn-half-border position-relative d-inline-block py-2.5 px-8 bgp-1 rounded-pill text-nowrap fs-six shadow-primary fw-bold transition-all hover-scale">Masuk Arena</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-5 position-relative d-flex align-items-center justify-content-center p-0" style={{ zIndex: 10 }}>
                                                <div data-swiper-parallax="-500" className="banner-characters position-relative d-flex align-items-center justify-content-center w-100" style={{ minHeight: '180px' }}>
                                                    <img src="/assets/img/astronaut-mascot-transparent.png" alt="Mascot" className="float-mascot" style={{ height: '520px', width: 'auto', zIndex: 20, filter: 'drop-shadow(0 0 60px rgba(0, 209, 255, 0.4))', transform: 'scale(1.4) translateY(5px)', objectFit: 'contain', display: 'block', opacity: 1 }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Slide 2 */}
                                <div className="swiper-slide h-100">
                                    <div className="banner-content h-100 d-flex align-items-center">
                                        <div className="row justify-content-center gy-3 align-items-center w-100 gx-0">
                                            <div className="col-lg-6 col-md-7 col-7">
                                                <div className="hero-content ps-lg-15 ps-0">
                                                    <p data-swiper-parallax="-200" className="tcn-1 mb-lg-4 mb-3 opacity-75 fw-medium fs-six text-uppercase tracking-wider">
                                                        LEVEL UP • SKILL ONLY
                                                    </p>
                                                    <h2 data-swiper-parallax="-300" className="hero-title tcn-1 mb-lg-5 mb-3">
                                                        GAIN THE <span className="tcp-1">WINNING STREAK</span>
                                                    </h2>
                                                    <p data-swiper-parallax="-350" className="tcn-1 mb-lg-6 mb-5 opacity-75 fs-six d-none d-md-block" style={{ maxWidth: '600px' }}>
                                                        Mainkan quiz layaknya pro gamer. Jawab cepat, kumpulkan combo poin, dan rebut posisi pertama di leaderboard.
                                                    </p>
                                                    <div data-swiper-parallax="-400" className="d-flex align-items-center flex-wrap gap-xl-4 gap-3 mb-1">
                                                        <a href="/leaderboard" className="btn-half-border position-relative d-inline-block py-2.5 px-8 bgp-1 rounded-pill text-nowrap fs-six shadow-primary fw-bold transition-all hover-scale">Cek Leaderboard</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-5 position-relative d-flex align-items-center justify-content-center p-0" style={{ zIndex: 10 }}>
                                                <div data-swiper-parallax="-500" className="banner-characters position-relative d-flex align-items-center justify-content-center w-100" style={{ minHeight: '180px' }}>
                                                    <img src="/assets/img/new-boy-mascot.png" alt="Mascot" className="float-mascot" style={{ height: '460px', width: 'auto', zIndex: 20, filter: 'drop-shadow(0 0 30px rgba(255, 140, 0, 0.3))', borderRadius: '30px', transform: 'scale(1.2) translateY(5px)', objectFit: 'contain', display: 'block', opacity: 1 }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Slide 3 */}
                                <div className="swiper-slide h-100">
                                    <div className="banner-content h-100 d-flex align-items-center">
                                        <div className="row justify-content-center gy-3 align-items-center w-100 gx-0">
                                            <div className="col-lg-6 col-md-7 col-7">
                                                <div className="hero-content ps-lg-15 ps-0">
                                                    <p data-swiper-parallax="-200" className="tcn-1 mb-lg-4 mb-3 opacity-75 fw-medium fs-six text-uppercase tracking-wider">
                                                        SPEED RUN • NO LAG
                                                    </p>
                                                    <h2 data-swiper-parallax="-300" className="hero-title tcn-1 mb-lg-5 mb-3">
                                                        FASTEST <span className="tcp-1">REFLEX WINS</span>
                                                    </h2>
                                                    <p data-swiper-parallax="-350" className="tcn-1 mb-lg-6 mb-5 opacity-75 fs-six d-none d-md-block" style={{ maxWidth: '600px' }}>
                                                        Buktikan kecepatan jarimu dan ketajaman otakmu. Di mode ini, setiap detik adalah penentu kemenanganmu!
                                                    </p>
                                                    <div data-swiper-parallax="-400" className="d-flex align-items-center flex-wrap gap-xl-4 gap-3 mb-1">
                                                        <a href="/games" className="btn-half-border position-relative d-inline-block py-2.5 px-8 bgp-1 rounded-pill text-nowrap fs-six shadow-primary fw-bold transition-all hover-scale">Main Sekarang</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-5 position-relative d-flex align-items-center justify-content-center p-0" style={{ zIndex: 10 }}>
                                                <div data-swiper-parallax="-500" className="banner-characters position-relative d-flex align-items-center justify-content-center w-100" style={{ minHeight: '180px' }}>
                                                    <img src="/assets/img/astronaut-mascot-transparent.png" alt="Mascot" className="float-mascot" style={{ height: '520px', width: 'auto', zIndex: 20, filter: 'drop-shadow(0 0 60px rgba(0, 209, 255, 0.4))', transform: 'scale(1.4) rotate(-5deg) translateY(5px)', objectFit: 'contain', display: 'block', opacity: 1 }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Slide 4 */}
                                <div className="swiper-slide h-100">
                                    <div className="banner-content h-100 d-flex align-items-center">
                                        <div className="row justify-content-center gy-3 align-items-center w-100 gx-0">
                                            <div className="col-lg-6 col-md-7 col-7">
                                                <div className="hero-content ps-lg-15 ps-0">
                                                    <p data-swiper-parallax="-200" className="tcn-1 mb-lg-4 mb-3 opacity-75 fw-medium fs-six text-uppercase tracking-wider">
                                                        EPIC LOOT • MVP STATUS
                                                    </p>
                                                    <h2 data-swiper-parallax="-300" className="hero-title tcn-1 mb-lg-5 mb-3">
                                                        BECOME THE <span className="tcp-1">LEGENDARY CHAMPION</span>
                                                    </h2>
                                                    <p data-swiper-parallax="-350" className="tcn-1 mb-lg-6 mb-5 opacity-75 fs-six d-none d-md-block" style={{ maxWidth: '600px' }}>
                                                        Raih trophy eksklusif, sertifikat nasional, dan total hadiah jutaan Rupiah. Inilah saatnya jadi MVP di GameForSmart!
                                                    </p>
                                                    <div data-swiper-parallax="-400" className="d-flex align-items-center flex-wrap gap-xl-4 gap-3 mb-1">
                                                        <a href="/register" className="btn-half-border position-relative d-inline-block py-2.5 px-8 bgp-1 rounded-pill text-nowrap fs-six shadow-primary fw-bold transition-all hover-scale">Check Leaderboard</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-5 position-relative d-flex align-items-center justify-content-center p-0" style={{ zIndex: 10 }}>
                                                <div data-swiper-parallax="-500" className="banner-characters position-relative d-flex align-items-center justify-content-center w-100" style={{ minHeight: '180px' }}>
                                                    <img src="/assets/img/new-boy-mascot.png" alt="Mascot" className="float-mascot" style={{ height: '460px', width: 'auto', zIndex: 20, filter: 'drop-shadow(0 0 30px rgba(255, 140, 0, 0.3))', borderRadius: '30px', transform: 'scale(1.2) translateY(5px)', objectFit: 'contain', display: 'block', opacity: 1 }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Winners card – hidden on mobile (xs/sm), visible from md+ */}
                    <div className="col-12 col-lg-5 col-xl-4 col-xxl-3 d-flex winners-col">
                        <div className="winners-card-wrap card-area w-100 h-100 d-flex flex-column overflow-hidden shadow-lg border border-secondary border-opacity-10 px-0" style={{ backgroundColor: '#000000', borderRadius: '40px' }}>
                            <div className="card-header pt-4 px-4 pb-2">
                                <h3 className="tcn-1 dot-icon mb-0 fs-six fw-bold text-uppercase d-flex align-items-center">
                                    <span className="d-flex gap-1 me-2">
                                        <span className="otp-dots" style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--tcp-1)', boxShadow: '0 0 10px var(--tcp-1)' }}></span>
                                        <span className="otp-dots" style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--tcp-1)', boxShadow: '0 0 10px var(--tcp-1)' }}></span>
                                    </span>
                                    Pemain Terakhir
                                </h3>
                            </div>
                            <div className="card-items d-flex flex-column flex-grow-1 overflow-auto custom-scrollbar">
                                {winnersData.slice(0, 5).map((winner, i, arr) => (
                                    <div key={winner.id} className="winner-list-item px-4 py-3 transition d-flex flex-column justify-content-center" style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', cursor: 'pointer' }}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="card-img-area rounded-circle overflow-hidden border border-2 border-dark d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', minWidth: '42px', backgroundColor: winner.img ? 'transparent' : 'rgba(255,255,255,0.1)' }}>
                                                    {winner.img ? (
                                                        <img className="w-100 h-100 object-fit-cover" src={`/assets/img/${winner.img}`} alt="profile" />
                                                    ) : (
                                                        <span className="tcn-1 fs-seven fw-bold">{getInitials(winner.name)}</span>
                                                    )}
                                                </div>
                                                <div className="card-info">
                                                    <h4 className="card-title fw-bold tcn-1 mb-0" style={{ fontSize: '0.95rem' }}>{winner.name}</h4>
                                                    <span className="tcn-1 opacity-50" style={{ fontSize: '0.75rem' }}>{winner.time}</span>
                                                </div>
                                            </div>
                                            <div className="card-data text-end">
                                                <p className="card-text fw-medium mb-0" style={{ fontSize: '0.85rem', color: 'rgba(255,107,53,0.8)', fontStyle: 'italic' }}>{formatPoints(winner.amount)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
