"use client";
import React, { useEffect, useState } from 'react';

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="preloader">
            <div className="loader">
                <span></span>
            </div>
        </div>
    );
}
