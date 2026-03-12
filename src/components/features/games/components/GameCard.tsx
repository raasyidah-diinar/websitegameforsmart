import Link from 'next/link';

interface GameCardProps {
    title: string;
    image: string;
    href: string;
}

export default function GameCard({ title, image, href }: GameCardProps) {
    // Provide default mappings to match the visual design requested
    const type = "Game";
    const badge = "NEW";
    const badgeColor = "#22c55e";
    const rating = "4.5";
    const played = "10k";

    return (
        <div className="mx-auto w-full max-w-[320px] transition-all duration-300 hover:-translate-y-2">
            <div className="bg-[#0a0a0a] rounded-[24px] overflow-hidden transition-all duration-300 group flex flex-col h-full border border-white/10 hover:border-[#FF6B35]/50 hover:shadow-[0_0_20px_rgba(255,107,53,0.2)]">
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden flex-shrink-0">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
                    {/* Badge Top-Right */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold shadow-lg"
                        style={{ color: badgeColor, backgroundColor: `rgba(10, 10, 10, 0.7)`, border: `1px solid ${badgeColor}40`, backdropFilter: 'blur(4px)' }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                        {badge}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-white tracking-wide truncate">{title}</h3>
                        <p className="text-xs text-white/40 mt-1 font-medium">{type}</p>
                    </div>

                    {/* Meta row */}
                    <div className="flex items-center justify-between text-white/70 mb-5 text-[10px] font-semibold px-2">
                        <div className="flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-white/40">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>Web</span>
                        </div>
                        <div className="w-px h-6 bg-white/10"></div>
                        <div className="flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-white/40">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <span>{played} Played</span>
                        </div>
                        <div className="w-px h-6 bg-white/10"></div>
                        <div className="flex flex-col items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFB800">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span>{rating}</span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 mt-auto">
                        <Link href={href} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[12px] bg-transparent text-white/70 hover:text-white transition-colors text-xs font-bold" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Detail</span>
                        </Link>
                        <Link href={href} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[12px] text-white transition-all text-xs font-bold opacity-90 hover:opacity-100 shadow-[0_0_15px_rgba(255,107,53,0.4)] hover:shadow-[0_0_25px_rgba(255,107,53,0.6)]" style={{ background: 'linear-gradient(135deg, #FF6B35, #ff8c00)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            <span>Play Now</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
