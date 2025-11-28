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

    // Initialize dataLayer before script loads (allows queuing commands)
    window.dataLayer = window.dataLayer || [];
    const dataLayer = window.dataLayer;
    
    // Define gtag function to queue commands until script loads
    function gtag(...args: unknown[]) {
      dataLayer.push(args);
    }
    window.gtag = gtag;

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    
    // Wait for script to load before configuring
    script.onload = () => {
      // Use window.gtag (now replaced by GA script) or fallback to local function
      const gtagFn = window.gtag || gtag;
      // Configure gtag after script has loaded
      gtagFn('js', new Date());
      gtagFn('config', trackingId);
    };
    
    // Handle script load errors
    script.onerror = () => {
      if (import.meta.env.DEV) {
        console.error('Failed to load Google Analytics script');
      }
    };
    
    document.head.appendChild(script);

    // Cleanup function (though script will remain in DOM)
    return () => {
      // Note: We don't remove the script as it's already loaded
      // This is intentional for analytics tracking
    };
  }, []);

  return null;
}

