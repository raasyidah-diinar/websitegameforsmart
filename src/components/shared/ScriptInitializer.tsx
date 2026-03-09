"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    initMainJS?: () => void;
    initGSAP?: () => void;
  }
}

export default function ScriptInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to ensure DOM is fully rendered by React before JQuery/GSAP scripts run
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        if (window.initMainJS) window.initMainJS();
        if (window.initGSAP) window.initGSAP();
        
        // Force a layout recalculation for GSAP/ScrollTrigger
        if ((window as any).ScrollTrigger) {
          (window as any).ScrollTrigger.refresh();
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
