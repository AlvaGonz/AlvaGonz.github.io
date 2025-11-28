export {};

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: any;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
