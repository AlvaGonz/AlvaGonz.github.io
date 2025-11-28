import { useEffect } from 'react';

/**
 * Google Analytics component that dynamically injects the gtag.js script
 * Uses environment variable VITE_GA_TRACKING_ID for the tracking ID
 * 
 * Follows the standard Google Analytics implementation pattern:
 * https://developers.google.com/analytics/devguides/collection/gtagjs
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

    // Check if Google Analytics is already initialized
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
    if (existingScript) {
      // Script already exists, just ensure configuration
      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('config', trackingId);
      }
      return;
    }

    // Initialize dataLayer (matches Google's standard pattern)
    window.dataLayer = window.dataLayer || [];
    
    // Define gtag function to queue commands (matches Google's exact implementation)
    // This matches: function gtag(){dataLayer.push(arguments);}
    if (!window.gtag) {
      function gtag() {
        window.dataLayer?.push(arguments);
      }
      window.gtag = gtag;
    }

    // Execute configuration commands IMMEDIATELY (they queue in dataLayer)
    // This matches the standard Google Analytics pattern
    window.gtag('js', new Date());
    window.gtag('config', trackingId);

    // Load gtag.js script asynchronously
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    
    // Handle script load errors gracefully
    // ERR_BLOCKED_BY_CLIENT usually means an ad blocker is active
    script.onerror = () => {
      if (import.meta.env.DEV) {
        console.warn(
          'Google Analytics script blocked. This is normal if you have an ad blocker enabled. ' +
          'Analytics will work for users without ad blockers.'
        );
      }
      // Commands are still queued in dataLayer, so if script loads later, they'll be processed
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

