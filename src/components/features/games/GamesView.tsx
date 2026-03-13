"use client";
import React, { useState, useRef, useEffect } from 'react';
import TournamentCard from '@/components/features/tournaments/components/TournamentCard';
import { allItemsData } from '@/data/allItemsData';

export default function GamesView() {
    const [activeTab, setActiveTab] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const games = allItemsData.filter(item => item.type === 'game');

    const filteredGames = activeTab === 'All'
        ? games
        : games.filter(game => game.status === activeTab);

    return (
        <>
            <div className="main-content animate-fade-in-up flex-1" style={{ minWidth: 0, overflow: 'visible' }}>
                <article style={{ flex: 1 }}>
                    <section className="tournament-section game-section pb-120">
                        <div className="tournament-wrapper alt">
                            <div className="container-fluid py-10 px-lg-15 px-md-10 px-6">
                                <div className="row align-items-center justify-content-between mb-8">
                                    <div className="col-12 text-center">
                                        <h2 className="display-four tcn-1 cursor-scale growUp title-anim">Games</h2>
                                    </div>
                                </div>

                                {isMobile ? (
                                    <div className="singletab tournaments-tab mb-10 d-flex justify-content-center">
                                        <div className="position-relative" style={{ width: '100%', maxWidth: '300px' }} ref={dropdownRef}>
                                            <button 
                                                className="d-flex align-items-center justify-content-between bg-black text-white border-secondary rounded-pill py-3 ps-6 pe-5 cursor-pointer w-100 transition-all hover:border-primary active:scale-95"
                                                style={{ 
                                                    backgroundColor: '#0a0a0a',
                                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    color: 'white'
                                                }}
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            >
                                                <span className="text-secondary-cus">Category: <span className="text-white">{activeTab}</span></span>
                                                <i 
                                                    className={`ti ti-chevron-down ms-2 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                                    style={{ fontSize: '1.2rem', color: 'rgb(var(--p1))' }}
                                                ></i>
                                            </button>
                                            
                                            {isDropdownOpen && (
                                                <div 
                                                    className="position-absolute start-0 w-100 mt-2 rounded-4 overflow-hidden animate-zoom-in shadow-lg"
                                                    style={{ 
                                                        zIndex: 1000,
                                                        backgroundColor: 'rgba(10, 10, 10, 0.98)',
                                                        backdropFilter: 'blur(15px)',
                                                        border: '1px solid rgba(255, 255, 255, 0.15)',
                                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
                                                    }}
                                                >
                                                    {['All', 'Action', 'Racing', 'Puzzle', 'Trivia', 'Coming Soon'].map((tab) => (
                                                        <button
                                                            key={tab}
                                                            className={`w-100 text-start py-3 px-6 transition-all hover:bg-primary-fade ${activeTab === tab ? 'active-option' : ''}`}
                                                            style={{ 
                                                                fontSize: '0.9rem',
                                                                fontWeight: '600',
                                                                backgroundColor: activeTab === tab ? 'rgba(246, 71, 28, 0.15)' : 'transparent',
                                                                color: activeTab === tab ? 'rgb(var(--p1))' : 'white',
                                                                border: 'none',
                                                                display: 'block'
                                                            }}
                                                            onClick={() => {
                                                                setActiveTab(tab);
                                                                setIsDropdownOpen(false);
                                                            }}
                                                        >
                                                            {tab}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="singletab tournaments-tab mb-10">
                                        <div className="d-center flex-wrap gap-6 mb-lg-15 mb-sm-10 mb-6">
                                            <ul className="tablinks d-flex flex-wrap align-items-center justify-content-center gap-3">
                                                {['All', 'Action', 'Racing', 'Puzzle', 'Trivia', 'Coming Soon'].map((tab) => (
                                                    <li key={tab} className={`nav-links ${activeTab === tab ? 'active' : ''}`}>
                                                        <button
                                                            className="tablink py-sm-3 py-2 px-sm-8 px-6 rounded-pill tcn-1"
                                                            onClick={() => setActiveTab(tab)}
                                                        >
                                                            {tab}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                <div className="row gy-lg-10 gy-6 justify-content-center">
                                    {filteredGames.map((game) => (
                                        <div key={game.id} className="col-xxl-3 col-lg-4 col-md-6 col-sm-10">
                                            <TournamentCard
                                                id={game.id}
                                                title={game.title}
                                                type={game.genre}
                                                image={game.image}
                                                status={game.status}
                                                platform={game.platform}
                                                rating={game.rating}
                                                players={game.players}
                                                link={`/games/${game.slug}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        </>
    );
}
