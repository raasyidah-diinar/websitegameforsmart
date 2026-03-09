import Banner from '@/components/features/home/sections/Banner';
import TournamentSection from '@/components/features/home/sections/TournamentSection';
import GamesSection from '@/components/features/home/sections/GamesSection';
import CTA from '@/components/shared/CTA';

export const metadata = {
    title: 'Home | GameForSmart 2026',
    description: 'Mainkan berbagai game seru dan ikuti turnamen berhadiah di GameForSmart 2026.',
};

export default function Home() {
    return (
        <article className="main-content mt-4 animate-fade-in-up flex-1 min-w-0">
            <Banner />
            <GamesSection />
            <TournamentSection />
            <CTA />
        </article>
    );
}
