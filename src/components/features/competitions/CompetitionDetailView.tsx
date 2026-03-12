"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { TournamentInfo } from '@/data/allItemsData';

interface CompetitionDetailViewProps {
    tournament: TournamentInfo;
}

export default function CompetitionDetailView({ tournament }: CompetitionDetailViewProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<'desc' | 'rules'>('desc');

    const CHAR_LIMIT = 300;
    const isLong = tournament.description.length > CHAR_LIMIT;

    const maxQuota = 100;
    const currentRegistered = 64;
    const progressPercent = Math.round((currentRegistered / maxQuota) * 100);
    const isFull = currentRegistered >= maxQuota;

    const highlights = [
        { icon: 'ti-target', label: 'Tujuan', value: 'Menguji kemampuan akademik & mental juara siswa/i secara real-time.' },
        { icon: 'ti-trophy', label: 'Level', value: 'Persaingan skala besar antar siswa-siswi terbaik se-Malangraya.' },
        { icon: 'ti-certificate', label: 'Benefit', value: 'Sertifikat nasional & akses komunitas eksklusif alumni kompetisi.' },
        { icon: 'ti-ticket', label: 'Biaya Daftar', value: tournament.ticketFee || 'Gratis', accent: true },
    ];

    const prizes = [
        { rank: '01', label: tournament.prizes?.[0]?.place || 'JUARA 1', amount: tournament.prizes?.[0]?.amount || 'Rp 7.500.000', reward: tournament.prizes?.[0]?.reward || 'Trofi Eksklusif & Sertifikat Nasional Gold', tier: 'gold' },
        { rank: '02', label: tournament.prizes?.[1]?.place || 'JUARA 2', amount: tournament.prizes?.[1]?.amount || 'Rp 5.000.000', reward: tournament.prizes?.[1]?.reward || 'Medali Perak & Sertifikat Nasional Silver', tier: 'silver' },
        { rank: '03', label: tournament.prizes?.[2]?.place || 'JUARA 3', amount: tournament.prizes?.[2]?.amount || 'Rp 2.500.000', reward: tournament.prizes?.[2]?.reward || 'Medali Perunggu & Sertifikat Nasional Bronze', tier: 'bronze' },
    ];

    const timelineSteps = [
        { num: '01', label: 'Pendaftaran', date: 'Dibuka', done: true },
        { num: '02', label: 'Penyisihan', date: tournament.date, done: true },
        { num: '03', label: 'Grand Final', date: tournament.finalRound || '—', done: false },
    ];

    return (
        <>
            <div className="page-root">

                {/* ════ HERO ════════════════════════════════════ */}
                <div className="hero-strip">
                    <div className="hero-orb hero-orb-1" aria-hidden />
                    <div className="hero-orb hero-orb-2" aria-hidden />

                    <div className="hero-inner">
                        <div className="hero-left">
                            <div className="hero-eyebrow">
                                <span className="dot-live" />
                                Kompetisi Akademik · Malangraya
                            </div>
                            <h1 className="hero-title">
                                Lomba Cerdas <span className="grad-text">Cermat</span>
                            </h1>
                            <p className="hero-sub">
                                Ajang Kompetisi Bergengsi dengan Hadiah Puluhan Juta Rupiah
                            </p>
                            <div className="hero-meta-row">
                                {[
                                    { icon: 'ti-calendar-event', label: 'Penyisihan', val: tournament.date },
                                    { icon: 'ti-flag-3', label: 'Grand Final', val: tournament.finalRound || '—', accent: true },
                                    { icon: 'ti-users', label: 'Kuota', val: tournament.teams },
                                    { icon: 'ti-coin', label: 'Biaya', val: tournament.ticketFee || 'Gratis', accent: true },
                                ].map((m, i) => (
                                    <div key={i} className="meta-pill">
                                        <i className={`ti ${m.icon} meta-icon`} />
                                        <div>
                                            <span className="meta-label">{m.label}</span>
                                            <span className={`meta-val ${m.accent ? 'grad-text' : ''}`}>{m.val}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hero-right">
                            <div className="video-frame">
                                <div className="ratio ratio-16x9">
                                    <iframe
                                        src="https://www.youtube.com/embed/_FCYtKCGMjk?autoplay=1&mute=1&loop=1&playlist=_FCYtKCGMjk"
                                        title="Tournament Preview"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ border: 'none' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ════ BODY ════════════════════════════════════ */}
                <div className="body-wrap">

                    {/* Highlight cards */}
                    <div className="hl-grid">
                        {highlights.map((h, i) => (
                            <div key={i} className={`hl-card ${h.accent ? 'hl-card--accent' : ''}`}>
                                <i className={`ti ${h.icon} hl-icon`} />
                                <span className="hl-label">{h.label}</span>
                                <span className={`hl-value ${h.accent ? 'grad-text' : ''}`}>{h.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* 3-col grid */}
                    <div className="triple-grid">

                        {/* Content tabs */}
                        <div className="col-content">
                            <div className="tab-bar">
                                {(['desc', 'rules'] as const).map(t => (
                                    <button key={t} className={`tab-btn ${activeTab === t ? 'tab-active' : ''}`} onClick={() => setActiveTab(t)}>
                                        {t === 'desc' ? 'Deskripsi' : 'Syarat & Ketentuan'}
                                    </button>
                                ))}
                            </div>

                            {activeTab === 'desc' && (
                                <div className="tab-panel">
                                    {(isExpanded ? tournament.description : tournament.description.substring(0, CHAR_LIMIT) + (isLong ? '…' : ''))
                                        .split('\n\n').map((p, i) => <p key={i} className="desc-p">{p}</p>)}
                                    {isLong && (
                                        <button className="btn-more" onClick={() => setIsExpanded(e => !e)}>
                                            {isExpanded ? '↑ Sembunyikan' : '↓ Selengkapnya'}
                                        </button>
                                    )}
                                </div>
                            )}

                            {activeTab === 'rules' && (
                                <div className="tab-panel">
                                    {tournament.rules?.map((r, i) => (
                                        <div key={i} className="rule-row">
                                            <span className="rule-num">{String(i + 1).padStart(2, '0')}</span>
                                            <span className="rule-text">{r}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Timeline */}
                        <div className="col-timeline">
                            <p className="col-label">Timeline</p>
                            <div className="tl-list">
                                {timelineSteps.map((t, i) => (
                                    <div key={i} className="tl-item">
                                        <div className="tl-line-col">
                                            <div className={`tl-dot ${t.done ? 'tl-dot--on' : ''}`}>
                                                {t.done ? '✓' : t.num}
                                            </div>
                                            {i < timelineSteps.length - 1 && (
                                                <div className={`tl-line ${t.done ? 'tl-line--on' : ''}`} />
                                            )}
                                        </div>
                                        <div className="tl-body">
                                            <span className={`tl-name ${!t.done ? 'tl-muted' : ''}`}>{t.label}</span>
                                            <span className={`tl-date ${t.done ? 'grad-text' : 'tl-muted'}`}>{t.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Registration card */}
                        <div className="col-reg">
                            <div className="reg-card">
                                <div className="reg-head">
                                    <span className="badge-open">Registration Open</span>
                                    <span className="badge-live"><span className="dot-green" />Online</span>
                                </div>
                                <div className="reg-prize">
                                    <span className="rp-label">Total Hadiah</span>
                                    <div className="rp-amount grad-text">{tournament.prizeMoney}</div>
                                    <span className="rp-note">+ Grand Prize Eksklusif</span>
                                </div>
                                <div className="reg-sep" />
                                <div className="quota-wrap">
                                    <div className="quota-top">
                                        <span>Kapasitas Terisi</span>
                                        <strong className="grad-text">{currentRegistered}/{maxQuota}</strong>
                                    </div>
                                    <div className="progress-bg">
                                        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
                                    </div>
                                    <p className="quota-note">{100 - currentRegistered} slot tersisa</p>
                                </div>
                                {isFull ? (
                                    <button className="cta cta--full" disabled>Kuota Penuh</button>
                                ) : (
                                    <Link href={`/competitions/${tournament.slug}/register`} className="btn-daftar" style={{ position: 'relative', zIndex: 10 }}>
                                        Daftar Sekarang
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Prizes */}
                    <div className="prizes-section">
                        <p className="section-label">Hadiah &amp; Penghargaan</p>
                        <div className="prizes-row">
                            {prizes.map((p, i) => (
                                <div key={i} className={`prize-card pz-${p.tier}`}>
                                    <span className="pz-rank">{p.rank}</span>
                                    <span className="pz-emoji">
                                        {p.tier === 'gold'
                                            ? <i className="ti ti-trophy" />
                                            : p.tier === 'silver'
                                            ? <i className="ti ti-medal" />
                                            : <i className="ti ti-award" />}
                                    </span>
                                    <span className={`pz-label pz-label--${p.tier}`}>{p.label}</span>
                                    <span className={`pz-amount pz-amount--${p.tier}`}>{p.amount}</span>
                                    <span className="pz-reward">{p.reward}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .page-root {
                    background: #0a0a0a;
                    color: #e0e0e0;
                    font-family: 'DM Sans', 'Segoe UI', sans-serif;
                    min-height: 100vh;
                    margin-top: -104px; /* Slightly offset so it leaves a small gap below the header */
                    margin-left: -110px; /* Offset the sidebar width to stretch background to left */
                }
                @media (max-width: 1280px) {
                    .page-root { margin-left: 0; }
                }
                
                .grad-text {
                    background: linear-gradient(90deg, #ff8c00, #ff4500);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                /* ── HERO ─────────────────── */
                .hero-strip {
                    position: relative; overflow: hidden;
                    background: #0d0d0d;
                    border-bottom: 1px solid rgba(255,255,255,.06);
                }
                .hero-orb {
                    position: absolute; border-radius: 50%;
                    pointer-events: none; filter: blur(90px);
                }
                .hero-orb-1 {
                    width: 550px; height: 550px;
                    background: radial-gradient(circle, rgba(255,140,0,.1), transparent 70%);
                    top: -120px; left: -60px;
                }
                .hero-orb-2 {
                    width: 350px; height: 350px;
                    background: radial-gradient(circle, rgba(255,69,0,.07), transparent 70%);
                    bottom: -80px; right: 300px;
                }
                .hero-inner {
                    max-width: 1600px; margin: 0 auto;
                    padding: 100px 40px 48px 150px; /* 40px + 110px sidebar offset = 150px left */
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 72px; align-items: center;
                    position: relative; z-index: 1;
                }
                @media (max-width: 1280px) {
                    .hero-inner { padding-left: 40px; }
                }
                @media (max-width: 900px) {
                    .hero-inner { grid-template-columns: 1fr; padding: 100px 20px 40px 20px; gap: 40px; }
                }

                .hero-left { display: flex; flex-direction: column; gap: 24px; }
                .hero-eyebrow {
                    display: flex; align-items: center; gap: 8px;
                    font-size: 11px; font-weight: 700; letter-spacing: .2em;
                    text-transform: uppercase; color: #ff8c00;
                }
                .dot-live {
                    width: 7px; height: 7px; border-radius: 50%;
                    background: #ff8c00; box-shadow: 0 0 8px #ff8c00;
                    animation: pulse 1.5s infinite;
                }
                @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.25} }

                .hero-title {
                    font-size: clamp(2.5rem, 5vw, 4.5rem);
                    font-weight: 900; line-height: .95;
                    letter-spacing: -.04em; color: #fff;
                }
                .hero-sub { font-size: .98rem; color: #777; line-height: 1.7; max-width: 420px; }

                .hero-meta-row { display: flex; flex-wrap: wrap; gap: 10px; }
                .meta-pill {
                    display: flex; align-items: center; gap: 10px;
                    background: rgba(255,255,255,.03);
                    border: 1px solid rgba(255,255,255,.07);
                    border-radius: 12px; padding: 10px 14px;
                    transition: border-color .2s;
                }
                .meta-pill:hover { border-color: rgba(255,140,0,.2); }
                .meta-icon { font-size: 1.2rem; flex-shrink: 0; color: #ff8c00; line-height: 1; }
                .meta-pill > div { display: flex; flex-direction: column; gap: 1px; }
                .meta-label { font-size: 9px; font-weight: 800; letter-spacing: .15em; text-transform: uppercase; color: #444; }
                .meta-val { font-size: .83rem; font-weight: 700; color: #ccc; white-space: nowrap; }

                .video-frame {
                    border-radius: 18px; overflow: hidden;
                    border: 1px solid rgba(255,140,0,.18);
                    box-shadow: 0 0 60px rgba(255,100,0,.07);
                }

                /* ── BODY ─────────────────── */
                .body-wrap {
                    max-width: 1600px; margin: 0 auto;
                    padding: 44px 40px 40px 150px; /* 40px + 110px sidebar offset = 150px left */
                    display: flex; flex-direction: column; gap: 36px;
                }
                @media (max-width: 1280px) {
                    .body-wrap { padding-left: 40px; }
                }
                @media (max-width: 900px) { .body-wrap { padding: 32px 20px 100px 20px; } }

                /* Highlight grid */
                .hl-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 14px;
                }
                @media (max-width: 900px) { .hl-grid { grid-template-columns: repeat(2, 1fr); } }
                .hl-card {
                    background: #111;
                    border: 1px solid rgba(255,255,255,.06);
                    border-radius: 14px; padding: 20px;
                    display: flex; flex-direction: column; gap: 5px;
                    transition: border-color .2s, transform .2s;
                    cursor: default;
                }
                .hl-card:hover { border-color: rgba(255,140,0,.22); transform: translateY(-2px); }
                .hl-card--accent { border-color: rgba(255,140,0,.15); background: rgba(255,100,0,.03); }
                .hl-icon { font-size: 1.5rem; margin-bottom: 4px; color: #ff8c00; line-height: 1; }
                .hl-label { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: .16em; color: #444; }
                .hl-value { font-size: .85rem; color: #aaa; line-height: 1.55; font-weight: 500; }

                /* Triple grid */
                .triple-grid {
                    display: grid;
                    grid-template-columns: 1fr 230px 300px;
                    gap: 20px; align-items: start;
                }
                @media (max-width: 1100px) { .triple-grid { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 700px) { .triple-grid { grid-template-columns: 1fr; } }

                /* Content card */
                .col-content {
                    background: #111;
                    border: 1px solid rgba(255,255,255,.06);
                    border-radius: 16px; overflow: hidden;
                }
                .tab-bar { display: flex; border-bottom: 1px solid rgba(255,255,255,.06); }
                .tab-btn {
                    flex: 1; padding: 15px 18px; background: none; border: none;
                    color: #444; font-size: .82rem; font-weight: 700;
                    cursor: pointer; letter-spacing: .03em;
                    border-bottom: 2px solid transparent; margin-bottom: -1px;
                    transition: color .2s, background .2s;
                }
                .tab-active { color: #ff8c00; border-bottom-color: #ff8c00; background: rgba(255,140,0,.03); }
                .tab-panel { padding: 28px; animation: fadeUp .22s ease both; }
                @keyframes fadeUp { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:none; } }

                .desc-p { font-size: .91rem; color: #888; line-height: 1.8; margin-bottom: 14px; }
                .btn-more {
                    display: inline-flex; padding: 6px 16px;
                    border-radius: 99px;
                    border: 1px solid rgba(255,140,0,.28);
                    background: rgba(255,140,0,.06);
                    color: #ff8c00; font-size: .78rem; font-weight: 700;
                    cursor: pointer; transition: all .2s; margin-top: 4px;
                }
                .btn-more:hover { background: rgba(255,140,0,.13); }

                .rule-row {
                    display: flex; align-items: flex-start; gap: 14px;
                    padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,.05);
                }
                .rule-row:last-child { border-bottom: none; }
                .rule-num { font-size: .72rem; font-weight: 800; color: #ff8c00; opacity: .65; flex-shrink: 0; margin-top: 2px; }
                .rule-text { font-size: .86rem; color: #999; line-height: 1.6; }

                /* Timeline */
                .col-timeline {
                    background: #111;
                    border: 1px solid rgba(255,255,255,.06);
                    border-radius: 16px; padding: 26px 22px;
                }
                .col-label {
                    font-size: .68rem; font-weight: 800; letter-spacing: .2em;
                    text-transform: uppercase; color: #3a3a3a; margin-bottom: 24px;
                }
                .tl-list { display: flex; flex-direction: column; }
                .tl-item { display: flex; gap: 14px; }
                .tl-line-col { display: flex; flex-direction: column; align-items: center; }
                .tl-dot {
                    width: 34px; height: 34px; border-radius: 50%;
                    background: rgba(255,255,255,.04);
                    border: 2px solid rgba(255,255,255,.08);
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0; font-size: .68rem; font-weight: 800; color: #333;
                }
                .tl-dot--on {
                    background: linear-gradient(135deg, #ff8c00, #ff4500);
                    border-color: transparent; color: #fff;
                    box-shadow: 0 0 14px rgba(255,120,0,.3);
                }
                .tl-line {
                    width: 2px; flex: 1; min-height: 24px;
                    background: rgba(255,255,255,.05); margin: 5px 0;
                }
                .tl-line--on { background: linear-gradient(180deg, #ff8c00, rgba(255,69,0,.25)); }
                .tl-body { padding-top: 6px; padding-bottom: 26px; }
                .tl-name { display: block; font-size: .86rem; font-weight: 700; color: #ccc; margin-bottom: 3px; }
                .tl-muted { color: #333 !important; }
                .tl-date { font-size: .76rem; font-weight: 600; }

                /* Reg card */
                .col-reg {}
                .reg-card {
                    background: #0e0e0e;
                    border: 1px solid rgba(255,140,0,.18);
                    border-radius: 16px; padding: 26px;
                    box-shadow: 0 0 50px rgba(255,100,0,.05);
                    position: sticky; top: 90px;
                }
                .reg-head {
                    display: flex; justify-content: space-between; align-items: center;
                    margin-bottom: 20px;
                }
                .badge-open {
                    font-size: 9px; font-weight: 800; letter-spacing: .14em;
                    text-transform: uppercase;
                    background: linear-gradient(90deg, #ff8c00, #ff4500);
                    color: #000; padding: 4px 11px; border-radius: 99px;
                }
                .badge-live {
                    display: flex; align-items: center; gap: 5px;
                    font-size: 9px; font-weight: 700; letter-spacing: .1em;
                    text-transform: uppercase; color: #3a3a3a;
                }
                .dot-green {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: #22c55e; box-shadow: 0 0 5px rgba(34,197,94,.7);
                    animation: pulse 2s infinite;
                }
                .reg-prize { margin-bottom: 20px; }
                .rp-label { display: block; font-size: 9px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: #333; margin-bottom: 7px; }
                .rp-amount { font-size: 1.8rem; font-weight: 900; letter-spacing: -.04em; line-height: 1; margin-bottom: 5px; }
                .rp-note { font-size: .72rem; color: #3a3a3a; }
                .reg-sep { height: 1px; background: rgba(255,255,255,.05); margin-bottom: 18px; }

                .quota-wrap { margin-bottom: 18px; }
                .quota-top {
                    display: flex; justify-content: space-between; align-items: center;
                    font-size: .72rem; font-weight: 700; color: #3a3a3a;
                    text-transform: uppercase; letter-spacing: .08em; margin-bottom: 9px;
                }
                .progress-bg { height: 4px; background: rgba(255,255,255,.05); border-radius: 99px; overflow: hidden; margin-bottom: 7px; }
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ff8c00, #ff4500);
                    border-radius: 99px;
                    box-shadow: 0 0 6px rgba(255,120,0,.4);
                }
                .quota-note { font-size: .7rem; color: #333; }

                :global(.btn-daftar) {
                    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
                    width: 100%; padding: 12px 20px;
                    border-radius: 99px; font-size: .84rem; font-weight: 800;
                    letter-spacing: .04em; text-transform: uppercase;
                    text-decoration: none; cursor: pointer; border: none;
                    background: linear-gradient(135deg, #ff8c00, #ff4500);
                    color: #fff;
                    box-shadow: 0 6px 22px rgba(255,100,0,.28);
                    margin-bottom: 10px; transition: all .25s;
                }
                :global(.btn-daftar:hover) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(255,100,0,.4); color: #fff; }
                .cta--full { 
                    display: flex; align-items: center; justify-content: center;
                    width: 100%; padding: 12px 20px;
                    border-radius: 12px; font-size: .84rem; font-weight: 800;
                    letter-spacing: .04em; text-transform: uppercase;
                    background: rgba(255,255,255,.03); color: #333; cursor: not-allowed; border: none; margin-bottom: 10px;
                }

                /* Prizes */
                .prizes-section { padding-bottom: 20px; margin-bottom: 0px; border-bottom: 1px solid rgba(255,255,255,.04); }
                .section-label {
                    font-size: .68rem; font-weight: 800;
                    text-transform: uppercase; letter-spacing: .2em; color: #333;
                    display: flex; align-items: center; gap: 14px; margin-bottom: 18px;
                }
                .section-label::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,.05); }

                .prizes-row {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 14px;
                }
                @media (max-width: 700px) { .prizes-row { grid-template-columns: 1fr; } }

                .prize-card {
                    border-radius: 16px; padding: 28px 22px; text-align: center;
                    border: 1px solid rgba(255,255,255,.06);
                    background: #111;
                    position: relative; overflow: hidden;
                    display: flex; flex-direction: column; align-items: center; gap: 7px;
                    transition: transform .3s, box-shadow .3s;
                }
                .prize-card::before {
                    content: ''; position: absolute;
                    top: 0; left: 0; right: 0; height: 2px;
                }
                .pz-gold::before { background: linear-gradient(90deg, #ff8c00, #ff4500); }
                .pz-silver::before { background: linear-gradient(90deg, #a8a8a8, #e0e0e0); }
                .pz-bronze::before { background: linear-gradient(90deg, #cd7f32, #e8a060); }

                .prize-card:hover { transform: translateY(-7px); }
                .pz-gold:hover { box-shadow: 0 18px 40px rgba(255,120,0,.15); border-color: rgba(255,140,0,.25); }
                .pz-silver:hover { box-shadow: 0 18px 40px rgba(200,200,200,.07); border-color: rgba(200,200,200,.18); }
                .pz-bronze:hover { box-shadow: 0 18px 40px rgba(200,120,50,.1); border-color: rgba(205,127,50,.2); }

                .pz-rank { font-size: .62rem; font-weight: 800; letter-spacing: .2em; color: #2e2e2e; }
                .pz-emoji { font-size: 2.4rem; transition: transform .3s; line-height: 1; display: flex; align-items: center; justify-content: center; }
                .pz-emoji i { font-size: 2.4rem; }
                .prize-card:hover .pz-emoji { transform: scale(1.15) translateY(-3px); }
                .pz-label { font-size: .68rem; font-weight: 800; text-transform: uppercase; letter-spacing: .18em; }
                .pz-label--gold { color: #ff8c00; }
                .pz-label--silver { color: #aaa; }
                .pz-label--bronze { color: #cd7f32; }
                .pz-amount { font-size: 1.5rem; font-weight: 900; letter-spacing: -.03em; }
                .pz-amount--gold { background: linear-gradient(90deg, #ff8c00, #ff4500); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
                .pz-amount--silver { color: #b0b0b0; }
                .pz-amount--bronze { color: #cd7f32; }
                .pz-reward { font-size: .76rem; color: #444; line-height: 1.5; max-width: 220px; }
            `}</style>
        </>
    );
}