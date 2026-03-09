"use client";
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface TournamentCardProps {
    id: number;
    title: string;
    type: string;
    image: string;
    status: string;
    rating: string;
    platform: string;
    players: string;
    prizeMoney?: string;
    ticketFee?: string;
    date?: string;
    teams?: string;
    description?: string;
    slug?: string;
    practiceAttempts?: number;
    competitionAttempts?: number;
    isDetailed?: boolean;
    link?: string;
}

export default function TournamentCard({
    id,
    title,
    type,
    image,
    status,
    rating,
    platform,
    players,
    prizeMoney = "Rp 0",
    ticketFee = "GRATIS",
    date = "15 April 2026",
    teams = "100 Player",
    description,
    slug,
    practiceAttempts,
    competitionAttempts,
    isDetailed = false,
    link
}: TournamentCardProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    const fullDescription = description || "Kompetisi menguji kemampuan siswa dalam menyelesaikan tantangan yang tersedia sebagai latihan.";

    useEffect(() => {
        if (textRef.current) {
            const element = textRef.current;
            setIsTruncated(element.scrollHeight > element.clientHeight);
        }
    }, [fullDescription]);

    return (
        <div className="tournament-card p-xl-5 p-4 bgn-4 h-100 d-flex flex-column" style={{ border: 'none', borderRadius: '24px' }}>
            <div className="tournament-img mb-8 position-relative">
                <div className="img-area overflow-hidden position-relative rounded-3" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <img className="w-100 h-auto object-fit-contain transition-all" src={image} alt="tournament" style={status === 'Coming Soon' ? { filter: 'blur(4px) brightness(0.4)' } : {}} />
                    {status === 'Coming Soon' && (
                        <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                            <i className="ti ti-lock display-four tcn-1 mb-2"></i>
                            <h5 className="tcn-1 text-uppercase fw-bold">Coming Soon</h5>
                        </div>
                    )}
                </div>
            </div>
            <div className="tournament-content px-xxl-2 flex-grow-1 d-flex flex-column">
                <div className="tournament-info mb-4">
                    <div className="d-flex align-items-center mb-3 mt-1">
                        <span className="py-1 px-3 tcn-1 d-flex align-items-center gap-2" style={{ 
                            backgroundColor: 'rgba(114, 255, 0, 0.1)', 
                            border: '1px solid #72ff00', 
                            borderRadius: '20px' 
                        }}>
                            <span style={{ 
                                width: '6px', 
                                height: '6px', 
                                backgroundColor: '#72ff00', 
                                borderRadius: '50%' 
                            }}></span>
                            <span className="fs-xs text-nowrap fw-bold" style={{ fontSize: '10px', textTransform: 'capitalize' }}>{status}</span>
                        </span>
                    </div>

                    <Link href={link || `/competitions/${slug || id}`} className="d-block mb-3">
                        <h4 className="tournament-title tcn-1 mb-3 fs-five fw-bold">
                            {title}
                        </h4>
                    </Link>

                    <span className="tcn-6 fs-sm d-block mb-4">{type}</span>

                    <div className="hr-line opacity-10 mb-4"></div>
                    
                    <p
                        className="tcn-6 fs-sm mb-0 overflow-hidden"
                        style={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: '1.5',
                            height: '3em'
                        }}
                    >
                        {fullDescription}
                    </p>
                </div>

                <div className="card-more-info mt-auto pt-4 d-flex align-items-center justify-content-between">
                    <Link href={link || `/competitions/${slug || id}`} className="px-6 py-2 rounded-pill bgp-1 text-white fw-bold transition-all hover-scale shadow-sm" style={{ fontSize: '14px', background: 'linear-gradient(90deg, #FF6B35 0%, #FF8C42 100%)' }}>
                        Daftar
                    </Link>
                    <Link href={link || `/competitions/${slug || id}`} className="d-center p-2 rounded-circle transition-all hover-scale" style={{ width: '38px', height: '38px', border: '1px solid #72ff00', background: 'transparent' }}>
                        <i className="ti ti-arrow-right fw-bold" style={{ color: '#72ff00', fontSize: '18px' }}></i>
                    </Link>
                </div>
            </div>
            <style jsx>{`
                .tournament-card:hover {
                    border-color: rgba(114, 255, 0, 0.4) !important;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    transform: translateY(-5px);
                    transition: all 0.3s ease;
                }
                .tournament-card:hover .img-area img {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
}

