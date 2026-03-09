"use client";
import React, { useState } from 'react';
import TournamentCard from '@/components/features/tournaments/components/TournamentCard';
import { allItemsData } from '@/data/allItemsData';

export default function GamesView() {
    const [activeTab, setActiveTab] = useState('All');

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
