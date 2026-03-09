import { Metadata } from 'next';
import { allItemsData } from '@/data/allItemsData';
import GameDetailContent from '@/components/features/games/GameDetailContent';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const item = allItemsData.find(
    (t) => (t.slug === params.slug || String(t.id) === String(params.slug)) && t.type === 'game'
  );

  if (!item) {
    return {
      title: 'Game Not Found | GameForSmart 2026',
    };
  }

  const baseTitle = "GameForSmart 2026";
  return {
    title: `${item.title} | ${baseTitle}`,
    description: item.description.substring(0, 160),
    openGraph: {
      title: item.title,
      description: item.description.substring(0, 160),
      images: [item.image],
    },
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const item = allItemsData.find(
    (t) => (t.slug === params.slug || String(t.id) === String(params.slug)) && t.type === 'game'
  );

  if (!item) {
    notFound();
  }

  return <GameDetailContent game={item} />;
}
