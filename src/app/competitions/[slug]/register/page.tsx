import { Metadata } from 'next';
import { allItemsData } from '@/data/allItemsData';
import { notFound } from 'next/navigation';
import RegistrationView from '@/components/features/registration/RegistrationView';


export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const item = allItemsData.find(
        (t) => t.slug === params.slug || String(t.id) === String(params.slug)
    );

    if (!item) {
        return {
            title: 'Not Found | GameForSmart 2026',
        };
    }

    return {
        title: `Register: ${item.title} | GameForSmart 2026`,
        description: `Daftar untuk ${item.title} di GameForSmart 2026.`,
    };
}

export default async function RegistrationPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const item = allItemsData.find(
        (t) => t.slug === params.slug || String(t.id) === String(params.slug)
    );

    if (!item || item.type === 'game') {
        // We only allow registration for tournaments, not games
        notFound();
    }

    return (
        <div className="main-content animate-fade-in-up flex-1" style={{ minWidth: 0 }}>
            <RegistrationView
                competitionTitle={item.title}
                competitionSlug={item.slug}
                fee={item.ticketFee || 'Free Entry'}
            />
        </div>
    );
}
