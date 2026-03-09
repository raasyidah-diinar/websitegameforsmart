"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { TournamentInfo } from '@/data/allItemsData';

interface CompetitionDetailViewProps {
    tournament: TournamentInfo;
}

export default function CompetitionDetailView({ tournament }: CompetitionDetailViewProps) {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);

    // Limits for truncation
    const CHAR_LIMIT = 200;
    const isLong = tournament.description.length > CHAR_LIMIT;

    const toggleDescription = () => setIsExpanded(!isExpanded);

    const renderDescription = (text: string) => {
        if (!isLong || isExpanded) {
            return text.split('\n\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
            ));
        }
        return <p className="mb-0">{text.substring(0, CHAR_LIMIT)}...</p>;
    };

    const maxQuota = 100;
    const currentRegistered = 64;
    const progressPercent = (currentRegistered / maxQuota) * 100;
    const isFull = currentRegistered >= maxQuota;

    return (
        <>
            <article className="main-content mt-lg-10 mt-6 animate-fade-in-up flex-1 min-w-0">
            <div className="container-fluid px-lg-15 px-md-10 px-6">
                <section className="tournament-details pb-120">
                            <Breadcrumbs />

                            {/* PREMIUM HERO SECTION (TOURNAMENT) */}
                            <div className="row mb-12">
                                <div className="col-12 mb-12 position-relative animate-fade-in-up">
                                    <div className="hero-glow-bg position-absolute top-50 start-0 translate-middle-y w-100 h-100" style={{ pointerEvents: 'none', zIndex: -1 }}>
                                        <div style={{ position: 'absolute', top: '50%', left: '0%', transform: 'translate(0, -50%)', width: '60%', height: '150%', background: 'radial-gradient(circle, rgba(255, 140, 0, 0.1) 0%, rgba(0, 0, 0, 0) 70%)', filter: 'blur(50px)' }}></div>
                                    </div>
                                    
                                    <h1 className="premium-title text-uppercase fw-extrabold display-three mb-4 tracking-tighter position-relative z-1" style={{ textShadow: '0 0 30px rgba(255, 140, 0, 0.2)', fontSize: '3rem' }}>
                                        {tournament.title.includes(' - ') ? (
                                            <>
                                                {tournament.title.split(' - ')[0]} - <span className="text-orange-gradient">{tournament.title.split(' - ')[1]}</span>
                                            </>
                                        ) : tournament.title}
                                    </h1>
                                    <p className="tcn-6 fs-five position-relative z-1" style={{ maxWidth: '700px' }}>
                                        Ajang Kompetisi Bergengsi dengan Hadiah Puluhan Juta Rupiah
                                    </p>
                                </div>
                                <div className="col-12 px-xl-20">
                                    <div className="video-hero-wrapper rounded-4 overflow-hidden shadow-premium-orange animate-zoom-in">
                                        <div className="ratio ratio-16x9">
                                            <iframe
                                                src="https://www.youtube.com/embed/_FCYtKCGMjk"
                                                title="Tournament Preview"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{ border: 'none' }}
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-10">
                                {/* LEFT CONTENT: Description, Highlight Box & Rules */}
                                <div className="col-lg-8 animate-slide-up">
                                    {/* DESKRIPSI COMPETITION VISUAL */}
                                    <div className="content-card-premium mb-8 p-sm-10 p-6 position-relative border" style={{ background: 'linear-gradient(145deg, rgba(20,20,20,0.95), rgba(10,10,10,0.9))', borderColor: 'rgba(255,140,0,0.3)', boxShadow: '0 0 20px rgba(255,140,0,0.05)' }}>
                                        <h3 className="premium-section-title mb-8 d-flex align-items-center gap-3">
                                            <i className="ti ti-target text-orange-glow fs-two"></i>
                                            Deskripsi Competition
                                        </h3>

                                        <div className="row g-4 mb-8">
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-start gap-3 p-4 rounded-4 h-100" style={{ background: 'rgba(255,140,0,0.05)', border: '1px solid rgba(255,140,0,0.15)' }}>
                                                    <div className="icon-circle bg-orange-gradient text-white mt-1" style={{ width: '48px', height: '48px', flexShrink: 0, boxShadow: '0 0 15px rgba(255,140,0,0.2)' }}>
                                                        <i className="ti ti-bulb fs-2xl"></i>
                                                    </div>
                                                    <div>
                                                        <h5 className="tcn-1 fw-bold fs-md mb-2">Tujuan Kompetisi</h5>
                                                        <p className="tcn-6 fs-sm mb-0">Menguji kemampuan akademik, mental juara, dan ketepatan siswa/i secara real-time.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-start gap-3 p-4 rounded-4 h-100" style={{ background: 'rgba(255,140,0,0.05)', border: '1px solid rgba(255,140,0,0.15)' }}>
                                                    <div className="icon-circle bg-orange-gradient text-white mt-1" style={{ width: '48px', height: '48px', flexShrink: 0, boxShadow: '0 0 15px rgba(255,140,0,0.2)' }}>
                                                        <i className="ti ti-trophy fs-2xl"></i>
                                                    </div>
                                                    <div>
                                                        <h5 className="tcn-1 fw-bold fs-md mb-2">Tingkat Kompetisi</h5>
                                                        <p className="tcn-6 fs-sm mb-0">Persaingan skala besar antar siswa-siswi terbaik.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-start gap-3 p-4 rounded-4 h-100" style={{ background: 'rgba(255,140,0,0.05)', border: '1px solid rgba(255,140,0,0.15)' }}>
                                                    <div className="icon-circle bg-orange-gradient text-white mt-1" style={{ width: '48px', height: '48px', flexShrink: 0, boxShadow: '0 0 15px rgba(255,140,0,0.2)' }}>
                                                        <i className="ti ti-rocket fs-2xl"></i>
                                                    </div>
                                                    <div>
                                                        <h5 className="tcn-1 fw-bold fs-md mb-2">Manfaat Peserta</h5>
                                                        <p className="tcn-6 fs-sm mb-0">Sertifikat nasional & relasi komunitas eksklusif.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-start gap-3 p-4 rounded-4 h-100" style={{ background: 'rgba(255,140,0,0.05)', border: '1px solid rgba(255,140,0,0.15)' }}>
                                                    <div className="icon-circle bg-orange-gradient text-white mt-1" style={{ width: '48px', height: '48px', flexShrink: 0, boxShadow: '0 0 15px rgba(255,140,0,0.2)' }}>
                                                        <i className="ti ti-ticket fs-2xl"></i>
                                                    </div>
                                                    <div>
                                                        <h5 className="tcn-1 fw-bold fs-md mb-2">Biaya Daftar</h5>
                                                        <p className="tcp-1 fw-bold fs-md mb-0">{tournament.ticketFee || 'Gratis'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tcn-6 fs-lg premium-description pt-6 border-top border-secondary border-opacity-10 position-relative">
                                            {renderDescription(tournament.description)}
                                            {isLong && (
                                                <button
                                                    onClick={toggleDescription}
                                                    className="btn-show-hide mt-4 d-flex align-items-center gap-2"
                                                >
                                                    {isExpanded ? (
                                                        <i className="ti ti-chevron-up"></i>
                                                    ) : (
                                                        <i className="ti ti-chevron-down"></i>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>


                                    <div className="content-card-premium mb-10 p-sm-10 p-6">
                                        <h3 className="premium-section-title mb-8">Syarat & Ketentuan</h3>
                                        <div className="rules-grid">
                                            {tournament.rules?.map((rule, index) => (
                                                <div key={index} className="rule-item d-flex align-items-center gap-4 p-4 rounded-3 mb-3 transition-all">
                                                    <div className="icon-circle-check bg-orange-gradient">
                                                        <i className="ti ti-check fs-xl"></i>
                                                    </div>
                                                    <span className="tcn-1 fs-lg fw-medium">{rule}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT CONTENT: Premium Info Card */}
                                <div className="col-lg-4">
                                    <div className="sticky-info-card" style={{ top: '120px' }}>
                                        <div className="premium-info-card p-8 rounded-4 shadow-orange-intense">
                                            <div className="status-badge-area d-flex justify-content-between align-items-center mb-8">
                                                <span className="premium-status-pill text-uppercase">Registration Open</span>
                                                <div className="live-dot-wrapper d-flex align-items-center gap-2">
                                                    <span className="live-dot"></span>
                                                    <span className="tcn-6 fs-xs fw-bold text-uppercase">Online</span>
                                                </div>
                                            </div>

                                            <div className="prize-main-area mb-8">
                                                <span className="tcn-6 fs-sm text-uppercase tracking-widest d-block mb-1">Total Hadiah</span>
                                                <h1 className="display-five fw-extrabold text-orange-gradient m-0">
                                                    {tournament.prizeMoney} <span className="fs-two">+ Grand Prize</span>
                                                </h1>
                                            </div>

                                            <div className="premium-divider mb-6"></div>

                                            <div className="features-list d-grid gap-6 mb-10">
                                                <div className="d-flex align-items-center gap-4 mb-6">
                                                    <div className="icon-circle bgn-3 tcn-1">
                                                        <i className="ti ti-calendar fs-2xl"></i>
                                                    </div>
                                                    <div>
                                                        <label className="d-block tcn-6 fs-xs text-uppercase fw-bold">Babak Penyisihan</label>
                                                        <span className="tcn-1 fw-bold fs-four">{tournament.date}</span>
                                                    </div>
                                                </div>

                                                {tournament.finalRound && (
                                                    <div className="d-flex align-items-center gap-4 mb-6">
                                                        <div className="icon-circle bgn-3" style={{ border: '1px solid rgba(255, 172, 5, 0.4)' }}>
                                                            <i className="ti ti-trophy fs-2xl text-orange-glow"></i>
                                                        </div>
                                                        <div>
                                                            <label className="d-block tcn-6 fs-xs text-uppercase fw-bold">Babak Final</label>
                                                            <span className="tcn-1 fw-bold fs-four text-orange-glow">{tournament.finalRound}</span>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="d-flex align-items-center gap-4 mb-6">
                                                    <div className="icon-circle bgn-3 tcn-1">
                                                        <i className="ti ti-ticket fs-2xl"></i>
                                                    </div>
                                                    <div>
                                                        <label className="d-block tcn-6 fs-xs text-uppercase fw-bold">Biaya Pendaftaran</label>
                                                        <span className="tcn-1 fw-bold fs-four text-orange-gradient">{tournament.ticketFee || 'Gratis'}</span>
                                                    </div>
                                                </div>

                                                <div className="d-flex align-items-center gap-4 mb-10">
                                                    <div className="icon-circle bgn-3 tcn-1">
                                                        <i className="ti ti-users fs-2xl"></i>
                                                    </div>
                                                    <div>
                                                        <label className="d-block tcn-6 fs-xs text-uppercase fw-bold">Total Kuota</label>
                                                        <span className="tcn-1 fw-bold fs-four">{tournament.teams}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="quota-logic mb-10">
                                                <div className="d-flex justify-content-between align-items-end mb-3">
                                                    <span className="tcn-6 fs-xs text-uppercase fw-bold">Kapasitas Terisi</span>
                                                    <span className="tcn-1 fw-bold fs-five">{progressPercent}%</span>
                                                </div>
                                                <div className="premium-progress-bar">
                                                    <div className="progress-fill shadow-glow-orange" style={{ width: `${progressPercent}%` }}></div>
                                                </div>
                                            </div>

                                            {isFull ? (
                                                <button
                                                    className="premium-cta-btn w-100 py-2 rounded-pill text-uppercase fw-bold tracking-widest transition-all d-flex justify-content-center align-items-center btn-disabled"
                                                    disabled
                                                >
                                                    Kuota Penuh
                                                </button>
                                            ) : (
                                                <Link
                                                    href={`/competitions/${tournament.slug}/register`}
                                                    className="premium-cta-btn w-100 py-2 rounded-pill text-uppercase fw-bold tracking-widest transition-all d-flex justify-content-center align-items-center bg-orange-gradient hover-lift shadow-btn text-white text-decoration-none"
                                                >
                                                    Daftar <i className="ti ti-chevron-right ms-2 animate-bounce-right"></i>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* TIMELINE KOMPETISI SECTION */}
                            <div className="row mt-15 animate-slide-up">
                                <div className="col-12 mb-10">
                                    <h2 className="display-six tcn-1 fw-extrabold text-uppercase m-0 d-inline-flex align-items-center gap-3">
                                        <i className="ti ti-calendar-stats text-orange-gradient"></i> Timeline Kompetisi
                                    </h2>
                                    <div className="title-underline mt-4" style={{ width: '80px', height: '4px', background: '#ff8c00', borderRadius: '2px' }}></div>
                                </div>
                                <div className="col-12">
                                    <div className="timeline-horizontal-premium p-10 rounded-4 border border-secondary border-opacity-10 position-relative overflow-hidden" style={{ background: 'rgba(20,20,20,0.8)' }}>
                                        <div className="timeline-line position-absolute top-50 start-0 w-100" style={{ height: '4px', background: 'rgba(255,255,255,0.05)', transform: 'translateY(-50%)', zIndex: 0 }}></div>
                                        <div className="timeline-line-active position-absolute top-50 start-0" style={{ height: '4px', width: '50%', background: 'linear-gradient(90deg, #ff8c00, #ff4500)', transform: 'translateY(-50%)', zIndex: 1, boxShadow: '0 0 15px rgba(255,140,0,0.5)' }}></div>

                                        <div className="row position-relative z-2 text-center">
                                            <div className="col-4">
                                                <div className="timeline-step">
                                                    <div className="mb-4 tcn-6 fs-md fw-bold text-uppercase">Tahap 1</div>
                                                    <div className="timeline-dot mx-auto mb-4 bg-orange-gradient neon-orange-glow" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '4px solid #111' }}></div>
                                                    <h4 className="tcn-1 fw-bold fs-lg mb-1">Pendaftaran</h4>
                                                    <p className="tcp-1 fs-sm fw-bold">Dibuka</p>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="timeline-step">
                                                    <div className="mb-4 tcn-6 fs-md fw-bold text-uppercase">Tahap 2</div>
                                                    <div className="timeline-dot mx-auto mb-4 bg-orange-gradient neon-orange-glow" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '4px solid #111' }}></div>
                                                    <h4 className="tcn-1 fw-bold fs-lg mb-1">Penyisihan</h4>
                                                    <p className="tcp-1 fs-sm fw-bold">{tournament.date}</p>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="timeline-step">
                                                    <div className="mb-4 tcn-6 fs-md fw-bold text-uppercase">Tahap 3</div>
                                                    <div className="timeline-dot mx-auto mb-4 bgn-3" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.2)' }}></div>
                                                    <h4 className="tcn-6 fw-bold fs-lg mb-1">Grand Final</h4>
                                                    <p className="tcn-6 fs-sm opacity-50">{tournament.finalRound}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* HADIAH & PENGHARGAAN SECTION */}
                            <div className="row mt-15 animate-slide-up">
                                <div className="col-12 mb-12">
                                    <h2 className="display-five tcn-1 fw-extrabold text-uppercase m-0 d-inline-flex align-items-center gap-3">
                                        <i className="ti ti-gift text-orange-gradient"></i> Hadiah & Penghargaan
                                    </h2>
                                    <div className="title-underline mt-4" style={{ width: '100px', height: '4px', background: '#ff8c00', borderRadius: '2px' }}></div>
                                </div>
                                <div className="col-12">
                                    <div className="row g-6 justify-content-center">
                                        {/* Juara 1 */}
                                        <div className="col-xl-4 col-md-6">
                                            <div className="glass-prize-card prize-gold text-center transition-all p-10 h-100 rounded-5" style={{ background: 'linear-gradient(180deg, rgba(255,140,0,0.1) 0%, rgba(20,20,20,0.8) 100%)', border: '1px solid rgba(255,140,0,0.3)', boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,140,0,0.05)' }}>
                                                <div className="prize-visual mb-6 position-relative z-1">
                                                    <i className="ti ti-trophy fs-display-one text-orange-glow d-inline-block hover-float" style={{ filter: 'drop-shadow(0 0 20px rgba(255,140,0,0.6))' }}></i>
                                                </div>
                                                <h4 className="fw-extrabold mb-2 text-uppercase tracking-widest text-warning">{tournament.prizes?.[0]?.place || 'JUARA 1'}</h4>
                                                <h2 className="display-five fw-extrabold text-orange-gradient mb-4">{tournament.prizes?.[0]?.amount || 'Rp 7.500.000'}</h2>
                                                <p className="tcn-6 fs-md mb-0">{tournament.prizes?.[0]?.reward || 'Trofi Eksklusif & Sertifikat Nasional Gold'}</p>
                                            </div>
                                        </div>
                                        {/* Juara 2 */}
                                        <div className="col-xl-4 col-md-6 mt-xl-10">
                                            <div className="glass-prize-card prize-silver text-center transition-all p-10 h-100 rounded-5" style={{ background: 'linear-gradient(180deg, rgba(200,200,200,0.05) 0%, rgba(20,20,20,0.8) 100%)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                                <div className="prize-visual mb-6 position-relative z-1">
                                                    <i className="ti ti-medal fs-display-two tcn-1 d-inline-block hover-float" style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' }}></i>
                                                </div>
                                                <h4 className="tcn-1 fw-extrabold mb-2 text-uppercase tracking-widest text-secondary">{tournament.prizes?.[1]?.place || 'JUARA 2'}</h4>
                                                <h2 className="display-six fw-extrabold tcn-1 mb-4">{tournament.prizes?.[1]?.amount || 'Rp 5.000.000'}</h2>
                                                <p className="tcn-6 fs-md mb-0">{tournament.prizes?.[1]?.reward || 'Medali Perak & Sertifikat Nasional Silver'}</p>
                                            </div>
                                        </div>
                                        {/* Juara 3 */}
                                        <div className="col-xl-4 col-md-6 mt-xl-14">
                                            <div className="glass-prize-card prize-bronze text-center transition-all p-10 h-100 rounded-5" style={{ background: 'linear-gradient(180deg, rgba(205,127,50,0.05) 0%, rgba(20,20,20,0.8) 100%)', border: '1px solid rgba(205,127,50,0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                                                <div className="prize-visual mb-6 position-relative z-1">
                                                    <i className="ti ti-medal fs-display-two d-inline-block hover-float" style={{ color: '#cd7f32', filter: 'drop-shadow(0 0 20px rgba(205,127,50,0.3))' }}></i>
                                                </div>
                                                <h4 className="fw-extrabold mb-2 text-uppercase tracking-widest" style={{ color: '#cd7f32' }}>{tournament.prizes?.[2]?.place || 'JUARA 3'}</h4>
                                                <h2 className="display-six fw-extrabold mb-4" style={{ color: '#e89e5a' }}>{tournament.prizes?.[2]?.amount || 'Rp 2.500.000'}</h2>
                                                <p className="tcn-6 fs-md mb-0">{tournament.prizes?.[2]?.reward || 'Medali Perunggu & Sertifikat Nasional Bronze'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </section>
            </div>
        </article>

            <style jsx>{`
                .animate-fade-in-up {
                    animation: fadeInUp 1s ease-out forwards;
                }
                .animate-slide-up {
                    animation: fadeInUp 0.8s ease-out 0.3s forwards;
                }
                .animate-zoom-in {
                    animation: zoomIn 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                }
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out forwards;
                }
                .d-center {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes zoomIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .tracking-tighter { letter-spacing: -0.05em; }
                .tracking-widest { letter-spacing: 0.2em; }
                
                .text-orange-gradient {
                    background: linear-gradient(90deg, #ff7a00, #ff4500);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .bg-orange-gradient {
                    background: linear-gradient(90deg, #ff7a00, #ff4500);
                }

                .premium-title {
                    font-size: 4rem;
                    line-height: 1;
                    background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 10px 20px rgba(0,0,0,0.5);
                }

                .shadow-premium-orange {
                    box-shadow: 0 30px 60px rgba(255, 122, 0, 0.1), 0 0 20px rgba(255, 122, 0, 0.05);
                }

                .glass-content-layer {
                    background: rgba(15, 15, 15, 0.8);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .text-orange-glow {
                    color: #ff8c00;
                    text-shadow: 0 0 15px rgba(255, 140, 0, 0.5);
                }

                .btn-show-hide {
                    background: rgba(255, 140, 0, 0.1);
                    border: 1px solid rgba(255, 140, 0, 0.3);
                    color: #ff8c00;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    cursor: pointer;
                    backdrop-filter: blur(12px);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }
                .btn-show-hide:hover {
                    background: #ff8c00;
                    color: #fff;
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 8px 25px rgba(255, 140, 0, 0.4);
                    border-color: #ff8c00;
                }

                .btn-back-floating {
                    position: absolute;
                    z-index: 100;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: rgba(255, 140, 0, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 140, 0, 0.3);
                    color: #ff8c00;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                .btn-back-floating:hover {
                    background: #ff8c00;
                    border-color: #ff8c00;
                    box-shadow: 0 0 15px rgba(255, 140, 0, 0.5);
                    transform: scale(1.1);
                }

                .glass-prize-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 32px;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .glass-prize-card:hover {
                    transform: translateY(-15px) scale(1.02);
                }
                .prize-gold:hover {
                    border-color: #ffaa00 !important;
                    box-shadow: 0 15px 40px rgba(255, 140, 0, 0.4), inset 0 0 30px rgba(255, 140, 0, 0.1) !important;
                }
                .prize-silver:hover {
                    border-color: rgba(255, 255, 255, 0.6) !important;
                    box-shadow: 0 15px 40px rgba(255, 255, 255, 0.2), inset 0 0 30px rgba(255, 255, 255, 0.1) !important;
                }
                .prize-bronze:hover {
                    border-color: #e89e5a !important;
                    box-shadow: 0 15px 40px rgba(205, 127, 50, 0.3), inset 0 0 30px rgba(205, 127, 50, 0.1) !important;
                }
                .hover-float {
                    transition: transform 0.4s ease;
                }
                .glass-prize-card:hover .hover-float {
                    transform: translateY(-8px) scale(1.1);
                }

                .shadow-orange-intense {
                    box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 50px rgba(255, 122, 0, 0.2);
                }

                .shadow-btn:hover {
                    box-shadow: 0 8px 20px rgba(255, 140, 0, 0.3);
                }

                @media (max-width: 991px) {
                    .premium-title { font-size: 2.5rem; }
                }
            `}</style>
        </>
    );
}
