import { useEffect } from 'react';

/**
 * Google Analytics component that dynamically injects the gtag.js script
 * Uses environment variable VITE_GA_TRACKING_ID for the tracking ID
 */
export function GoogleAnalytics(): null {
  useEffect(() => {
    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;

    // Only initialize if tracking ID is provided
    if (!trackingId) {
      if (import.meta.env.DEV) {
        console.warn('Google Analytics tracking ID not found. Set VITE_GA_TRACKING_ID in your .env.local file.');
      }
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    const dataLayer = window.dataLayer;
    function gtag(...args: unknown[]) {
      dataLayer.push(args);
    }

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Configure gtag
    gtag('js', new Date());
    gtag('config', trackingId);

    // Cleanup function (though script will remain in DOM)
    return () => {
      // Note: We don't remove the script as it's already loaded
      // This is intentional for analytics tracking
    };
  }, []);

  return null;
}

