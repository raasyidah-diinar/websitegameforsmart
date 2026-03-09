import type { Metadata } from "next";

import Header from '@/components/shared/Header';
import Sidebar from '@/components/shared/Sidebar';
import Footer from '@/components/shared/Footer';

export const metadata: Metadata = {
    title: 'Terms & Conditions | GameForSmart 2026',
    description: 'Syarat dan ketentuan penggunaan platform GameForSmart 2026.',
};

export default function TermsConditionPage() {
    return (
        <>
            <Header />
            <main className="main-container container-fluid d-flex pt-32 px-0 position-relative mb-10">
                <Sidebar />
                <article className="main-content mt-lg-10 mt-6">
                    <section className="terms-section pb-120">
                        <div className="container-fluid">
                            <h2 className="display-four tcn-1">Terms & Conditions</h2>
                            <p className="tcn-6 mt-6">Content coming soon...</p>
                        </div>
                    </section>
                </article>
            </main>
            <Footer />
        </>
    );
}
