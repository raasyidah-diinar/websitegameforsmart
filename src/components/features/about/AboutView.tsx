"use client";
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const stats = [
    { value: '50K+', label: 'Pelajar Aktif', icon: 'ti ti-users' },
    { value: '1.2K+', label: 'Kompetisi Digelar', icon: 'ti ti-trophy' },
    { value: '34', label: 'Provinsi Terjangkau', icon: 'ti ti-map-pin' },
    { value: '98%', label: 'Tingkat Kepuasan', icon: 'ti ti-star-filled' },
];

const values = [
    {
        icon: 'ti ti-brain',
        title: 'Kecerdasan',
        desc: 'Kami percaya setiap pelajar memiliki potensi luar biasa. Platform kami dirancang untuk mengasah dan menampilkan kecerdasan mereka.',
    },
    {
        icon: 'ti ti-shield-check',
        title: 'Sportivitas',
        desc: 'Kompetisi sehat adalah fondasi kami. Setiap pertandingan dijalankan dengan integritas, kejujuran, dan rasa hormat antar peserta.',
    },
    {
        icon: 'ti ti-device-gamepad-2',
        title: 'Inovasi',
        desc: 'Belajar tidak harus membosankan. Kami memadukan game dan edukasi menjadi pengalaman yang menyenangkan dan berkesan.',
    },
    {
        icon: 'ti ti-world',
        title: 'Inklusivitas',
        desc: 'Dari Sabang sampai Merauke. Platform kami terbuka untuk semua pelajar Indonesia tanpa terkecuali.',
    },
];

export default function AboutView() {
    return (
        <>
            <article className="main-content mt-lg-10 mt-6 flex-1 min-w-0">
                <div className="container-fluid px-lg-15 px-md-10 px-6">
                    <Breadcrumbs />

                    {/* ══════════════════════════════════
                        HERO SECTION
                    ══════════════════════════════════ */}
                    <div className="about-hero mb-16 sm:mb-20">
                        <div className="about-hero-inner">
                            {/* Decorative glow */}
                            <div className="about-glow"></div>

                            <span className="about-eyebrow">Tentang Kami</span>
                            <h1 className="about-title">
                                Tempat Cerdas<br />
                                <span className="about-title-accent">Bertemu Kompetisi</span>
                            </h1>
                            <p className="about-lead">
                                GameForSmart adalah platform kompetisi pendidikan digital yang dirancang
                                untuk mengasah kecerdasan dan sportivitas pelajar di seluruh Indonesia.
                                Kami percaya bahwa belajar dan bermain adalah dua hal yang bisa berjalan beriringan.
                            </p>
                        </div>
                    </div>

                    {/* ══════════════════════════════════
                        STATS
                    ══════════════════════════════════ */}
                    <div className="about-stats-grid mb-16 sm:mb-20">
                        {stats.map((s, i) => (
                            <div key={i} className="about-stat-card">
                                <div className="about-stat-icon">
                                    <i className={s.icon}></i>
                                </div>
                                <div className="about-stat-value">{s.value}</div>
                                <div className="about-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* ══════════════════════════════════
                        MISI & VISI
                    ══════════════════════════════════ */}
                    <div className="about-mission-grid mb-16 sm:mb-20">
                        <div className="about-mission-card about-mission-card--main">
                            <div className="about-section-tag">Misi Kami</div>
                            <h2 className="about-section-title">Membangun Generasi<br />Cerdas &amp; Berdaya Saing</h2>
                            <p className="about-section-body">
                                Kami hadir untuk membuktikan bahwa pendidikan yang menyenangkan bisa melahirkan
                                generasi yang lebih siap menghadapi tantangan global. Setiap kompetisi di platform
                                kami adalah kesempatan untuk tumbuh — bukan hanya menang.
                            </p>
                            <div className="about-mission-divider"></div>
                            <div className="about-section-tag">Visi Kami</div>
                            <p className="about-section-body mt-4">
                                Menjadi ekosistem edukasi berbasis game terbesar di Asia Tenggara pada 2030,
                                yang menghubungkan jutaan pelajar dengan kesempatan belajar yang setara dan menyenangkan.
                            </p>
                        </div>
                        <div className="about-mission-side">
                            <div className="about-badge-card">
                                <i className="ti ti-award about-badge-icon"></i>
                                <div className="about-badge-text">EdTech Terbaik<br />Indonesia 2024</div>
                            </div>
                            <div className="about-badge-card">
                                <i className="ti ti-certificate about-badge-icon"></i>
                                <div className="about-badge-text">Mitra Resmi<br />Kemendikbud</div>
                            </div>
                            <div className="about-badge-card">
                                <i className="ti ti-shield about-badge-icon"></i>
                                <div className="about-badge-text">Platform Aman<br />Bagi Pelajar</div>
                            </div>
                        </div>
                    </div>

                    {/* ══════════════════════════════════
                        VALUES
                    ══════════════════════════════════ */}
                    <div className="mb-16 sm:mb-20">
                        <div className="about-section-header">
                            <span className="about-eyebrow">Nilai Kami</span>
                            <h2 className="about-section-heading">Yang Kami Percaya</h2>
                        </div>
                        <div className="about-values-grid">
                            {values.map((v, i) => (
                                <div key={i} className="about-value-card">
                                    <div className="about-value-icon">
                                        <i className={v.icon}></i>
                                    </div>
                                    <h3 className="about-value-title">{v.title}</h3>
                                    <p className="about-value-desc">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ══════════════════════════════════
                        CTA BOTTOM
                    ══════════════════════════════════ */}
                    <div className="about-cta">
                        <div className="about-cta-glow"></div>
                        <span className="about-eyebrow">Bergabunglah</span>
                        <h2 className="about-cta-title">Siap Mulai Kompetisi?</h2>
                        <p className="about-cta-desc">
                            Bergabunglah bersama 50.000+ pelajar yang sudah membuktikan bahwa belajar bisa menjadi petualangan.
                        </p>
                        <div className="about-cta-buttons">
                            <a href="/register" className="about-cta-btn-primary">
                                <i className="ti ti-player-play-filled"></i>
                                Mulai Sekarang
                            </a>
                            <a href="/games" className="about-cta-btn-secondary">
                                Lihat Game
                                <i className="ti ti-arrow-right"></i>
                            </a>
                        </div>
                    </div>

                </div>
            </article>

            <style jsx>{`
                /* ─── HERO ─── */
                .about-hero {
                    position: relative;
                    padding: 60px 0 40px;
                }
                .about-hero-inner {
                    position: relative;
                    max-width: 760px;
                }
                .about-glow {
                    position: absolute;
                    top: -60px;
                    left: -80px;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: 0;
                }
                .about-eyebrow {
                    display: inline-block;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: #FF6B35;
                    background: rgba(255,107,53,0.1);
                    border: 1px solid rgba(255,107,53,0.2);
                    padding: 4px 14px;
                    border-radius: 100px;
                    margin-bottom: 20px;
                }
                .about-title {
                    font-size: clamp(2rem, 5vw, 3.5rem);
                    font-weight: 900;
                    letter-spacing: -1.5px;
                    line-height: 1.05;
                    color: #ffffff;
                    margin-bottom: 20px;
                    position: relative;
                    z-index: 1;
                }
                .about-title-accent {
                    background: linear-gradient(90deg, #FF6B35, #FF8C00);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .about-lead {
                    font-size: clamp(14px, 2vw, 16px);
                    line-height: 1.8;
                    color: rgba(255,255,255,0.55);
                    max-width: 620px;
                    position: relative;
                    z-index: 1;
                }

                /* ─── STATS ─── */
                .about-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                    gap: 12px;
                }
                .about-stat-card {
                    background: rgba(255,255,255,0.025);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px;
                    padding: 24px 20px;
                    text-align: center;
                    transition: border-color 0.25s, background 0.25s;
                }
                .about-stat-card:hover {
                    background: rgba(255,255,255,0.04);
                    border-color: rgba(255,107,53,0.25);
                }
                .about-stat-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    background: rgba(255,107,53,0.1);
                    border: 1px solid rgba(255,107,53,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 12px;
                    color: #FF6B35;
                    font-size: 18px;
                }
                .about-stat-value {
                    font-size: clamp(1.6rem, 3vw, 2.2rem);
                    font-weight: 900;
                    color: #ffffff;
                    letter-spacing: -1px;
                    line-height: 1;
                    margin-bottom: 6px;
                }
                .about-stat-label {
                    font-size: 11px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.35);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }

                /* ─── MISSION ─── */
                .about-mission-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 12px;
                }
                @media (min-width: 768px) {
                    .about-mission-grid {
                        grid-template-columns: 1fr 280px;
                    }
                }
                .about-mission-card {
                    background: rgba(255,255,255,0.025);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 24px;
                    padding: 36px 32px;
                }
                .about-section-tag {
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(255,107,53,0.7);
                    margin-bottom: 12px;
                }
                .about-section-title {
                    font-size: clamp(1.3rem, 2.5vw, 1.8rem);
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: -0.5px;
                    line-height: 1.2;
                    margin-bottom: 16px;
                }
                .about-section-body {
                    font-size: 14px;
                    line-height: 1.8;
                    color: rgba(255,255,255,0.5);
                }
                .about-mission-divider {
                    height: 1px;
                    background: rgba(255,255,255,0.06);
                    margin: 28px 0;
                }
                .about-mission-side {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .about-badge-card {
                    background: rgba(255,255,255,0.025);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 18px;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    flex: 1;
                    transition: border-color 0.25s;
                }
                .about-badge-card:hover {
                    border-color: rgba(255,107,53,0.25);
                }
                .about-badge-icon {
                    font-size: 22px;
                    color: #FF6B35;
                    flex-shrink: 0;
                }
                .about-badge-text {
                    font-size: 12px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.6);
                    line-height: 1.5;
                }

                /* ─── SECTION HEADER ─── */
                .about-section-header {
                    margin-bottom: 32px;
                }
                .about-section-heading {
                    font-size: clamp(1.4rem, 3vw, 2rem);
                    font-weight: 800;
                    color: #ffffff;
                    letter-spacing: -0.5px;
                    margin-top: 10px;
                }

                /* ─── VALUES ─── */
                .about-values-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 12px;
                }
                .about-value-card {
                    background: rgba(255,255,255,0.025);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 20px;
                    padding: 28px 24px;
                    transition: border-color 0.25s, transform 0.25s;
                }
                .about-value-card:hover {
                    border-color: rgba(255,107,53,0.3);
                    transform: translateY(-2px);
                }
                .about-value-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    background: rgba(255,107,53,0.1);
                    border: 1px solid rgba(255,107,53,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #FF6B35;
                    font-size: 20px;
                    margin-bottom: 16px;
                }
                .about-value-title {
                    font-size: 15px;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 8px;
                }
                .about-value-desc {
                    font-size: 13px;
                    line-height: 1.75;
                    color: rgba(255,255,255,0.4);
                }

                /* ─── CTA ─── */
                .about-cta {
                    position: relative;
                    background: rgba(255,255,255,0.025);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 28px;
                    padding: 60px 48px;
                    text-align: center;
                    overflow: hidden;
                    margin-bottom: 48px;
                }
                .about-cta-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 500px;
                    height: 300px;
                    background: radial-gradient(ellipse, rgba(255,107,53,0.07) 0%, transparent 70%);
                    pointer-events: none;
                }
                .about-cta-title {
                    font-size: clamp(1.6rem, 3.5vw, 2.5rem);
                    font-weight: 900;
                    color: #ffffff;
                    letter-spacing: -1px;
                    margin: 12px 0 16px;
                    position: relative;
                }
                .about-cta-desc {
                    font-size: 14px;
                    line-height: 1.8;
                    color: rgba(255,255,255,0.45);
                    max-width: 480px;
                    margin: 0 auto 32px;
                    position: relative;
                }
                .about-cta-buttons {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    flex-wrap: wrap;
                    position: relative;
                }
                .about-cta-btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #FF4D00, #FF8C00);
                    color: #ffffff;
                    font-size: 13px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 12px 28px;
                    border-radius: 100px;
                    text-decoration: none;
                    box-shadow: 0 10px 30px rgba(255,107,53,0.3);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .about-cta-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 16px 40px rgba(255,107,53,0.45);
                    color: #fff;
                    text-decoration: none;
                }
                .about-cta-btn-secondary {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: transparent;
                    color: rgba(255,255,255,0.6);
                    font-size: 13px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    padding: 12px 28px;
                    border-radius: 100px;
                    border: 1px solid rgba(120,120,120,0.4);
                    text-decoration: none;
                    transition: border-color 0.2s, color 0.2s, transform 0.2s;
                }
                .about-cta-btn-secondary:hover {
                    border-color: rgba(255,107,53,0.4);
                    color: #FF6B35;
                    transform: translateY(-2px);
                    text-decoration: none;
                }

                /* ─── RESPONSIVE ─── */
                @media (max-width: 640px) {
                    .about-cta { padding: 40px 24px; }
                }
            `}</style>
        </>
    );
}