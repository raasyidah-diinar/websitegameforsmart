"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.push('/home');
    }, [router]);

    return (
        <div className="min-vh-100 bgn-4 d-flex align-items-center justify-content-center">
            {/* Redirecting to /home naturally */}
        </div>
    );
}
