"use client";
import React, { useState } from 'react';
import TournamentCard from '@/components/features/tournaments/components/TournamentCard';
const tournamentsData = [
    {
        id: 21,
        title: "Lomba Cerdas Cermat – Malangraya",
        type: "SD, SMP, SMK, SMA",
        image: "/assets/img/malang-raya-banner-v2.png",
        description: "Kompetisi Cerdas Cermat tingkat Malang Raya bagi siswa SD hingga SMK. • Penyisihan: April – Mei | Final...",
        status: "Upcoming",
        platform: "Web",
        rating: "5.0",
        players: "128",
        slug: "malang-raya",
        href: "/competitions/malang-raya"
    },
    {
        id: 22,
        title: "Lomba Cerdas Cermat – Jawa Timur",
        type: "SD, SMP, SMK, SMA",
        image: "/assets/img/lomba-cerdas-cermat-jawatimur.jpg",
        description: "Kompetisi Cerdas Cermat tingkat Jawa Timur yang mempertemukan sekolah terbaik antar wilayah...",
        status: "Upcoming",
        platform: "Web",
        rating: "5.0",
        players: "-",
        slug: "jawa-timur",
        href: "/competitions/jawa-timur"
    },
    {
        id: 23,
        title: "Lomba Cerdas Cermat – Nasional",
        type: "SD, SMP, SMK, SMA",
        image: "/assets/img/lomba-cerdas-cermat-nasional.jpg",
        description: "Kompetisi prestisius tingkat Nasional yang menghadirkan elite pelajar terbaik dari seluruh...",
        status: "Upcoming",
        platform: "Web",
        rating: "5.0",
        players: "512",
        slug: "nasional",
        href: "/competitions/nasional"
    }
];

export default function TournamentsPage() {
    const [activeTab, setActiveTab] = useState('All');
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const filteredTournaments = tournamentsData.filter(t => {
        return activeTab === 'All' || t.status === activeTab;
    });

    return (
        <div className="main-content animate-fade-in-up flex-1" style={{ minWidth: 0, overflow: 'visible' }}>
            <article style={{ flex: 1 }}>
                <section className="tournament-banner mb-lg-15 mb-sm-10 mb-4 pb-lg-10 pb-sm-6">
                    <div className="container-fluid">
                        <div className="parallax-banner-area parallax-container" style={{ height: '450px' }}>
                            <img className="w-100 h-100 rounded-5 parallax-img object-fit-cover" src="/assets/img/tournament-banner.png" alt="tournament banner" />
                        </div>
                    </div>
                </section>

                <section ref={sectionRef} className="tournament-section pb-120">
                    <div className="tournament-wrapper alt">
                        <div className="container-fluid px-lg-15 px-md-10 px-6">
                            <div className="row justify-content-between align-items-end mb-8">
                                <div className="col">
                                    <h1 className="display-four tcn-1 cursor-scale growUp title-anim text-uppercase">Competition</h1>
                                </div>
                            </div>
                            <div className="singletab tournaments-tab">
                                <div className="d-between gap-6 flex-wrap mb-lg-15 mb-sm-10 mb-6">
                                    <ul className="tablinks d-flex flex-wrap align-items-center gap-3">
                                        {['All', 'Active', 'Upcoming', 'Finished'].map((tab) => (
                                            <li key={tab} className={`nav-links ${activeTab === tab ? 'active' : ''}`}>
                                                <button
                                                    className="tablink py-sm-3 py-2 px-sm-8 px-6 rounded-pill tcn-1"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setActiveTab(tab);
                                                    }}
                                                >
                                                    {tab}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="tournament-tab-contents">
                                    <div className="tournament-tab-item active">
                                        <div className="row justify-content-md-start justify-content-center g-6">
                                            {filteredTournaments.length > 0 ? (
                                                filteredTournaments.map((tournament) => (
                                                    <div
                                                        key={`${activeTab}-${tournament.id}`}
                                                        className={`col-xxl-3 col-lg-4 col-md-6 col-sm-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                                                    >
                                                        <TournamentCard {...tournament} isDetailed />
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-12 text-center py-20">
                                                    <h3 className="tcn-1">Belum ada Competition</h3>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        </div>
    );
}
